#!/usr/bin/env python3
# Składa jeden plik HTML: styl, skrypty i tekst dla taty wzięty z dokumentu.
import json, re, html, pathlib, base64, sys, shutil
import markdown
B = pathlib.Path(__file__).parent
md = (B / 'kurs.md').read_text()
md = re.sub(r'^&#91;embedded content:.*$', '', md, flags=re.M)
md = re.sub(r'^Pokaż Leonowi ten obrazek.*$', '', md, flags=re.M)
md = re.sub(r'^Taki sam jest zapis.*$', '', md, flags=re.M)
md = re.sub(r'^Zegar chodzi cały czas.*$', '', md, flags=re.M)
md = md.replace('- [ ] ', '- \\[ \\] ')
def mdhtml(t):
    t = t.replace('\\[ \\]', '[ ]')
    return markdown.markdown(t, extensions=['tables', 'fenced_code', 'sane_lists'])
parts = re.split(r'^## ', md, flags=re.M)
sec = {}
for p in parts[1:]:
    head, _, body = p.partition('\n')
    sec[head.strip()] = body
DAD = {}
guide = ''
for name, title in [('Jak to działa', 'Jak prowadzić'), ('Bezpieczeństwo', 'Bezpieczeństwo'), ('Pudełko', 'Pudełko'), ('Ściąga dla taty', 'Ściąga')]:
    guide += f'<h3>{title}</h3>' + mdhtml(sec[name])
guide = ('<h3>Plac zabaw i symulacja</h3><p>Każda lampka, prąd i klik na stronie wynikają z obliczeń obwodu, a nie ze skryptu. Solver liczy napięcia w węzłach z modelami diody, tranzystora 2N3904, kondensatora, przekaźnika G5V-2, NE555 i CD4026. Modele porównałem z ngspice na układach z kursu. Programy Arduino i Pi działają jak szkice z lekcji, piny są normalną częścią obwodu.</p><p>Przycisk z dłonią na płytce pokazuje uchwyty: nóżki i końce kabli przenosisz palcem, korpus przesuwa całą część, a część odłożona poza płytkę wraca do pudełka. Krokodylki na stole przenosi się zawsze. Dwa palce przybliżają i przesuwają widok. Dioda bez rezystora się spali, odwrócona nie zaświeci, kabel z plusa na minus robi zwarcie.</p><p>To dalej symulacja: nie ma szumów, zużycia baterii ani luźnych styków, więc prawdziwy układ może zachować się trochę inaczej. Na zwarciu czy z baterią tak się nie baw, tylko tutaj.</p>') + guide
DAD['0'] = guide
blocks = [k for k in sec if k.startswith('Blok')]
LBL = {'Przygotuj': 'Przygotuj', 'Lekcja': 'Lekcja', 'Zostaje w głowie': 'Zostaje w głowie', 'Zabawa': 'Zabawa', 'Gdy nie działa': 'Gdy nie działa', 'Dla Ciebie': 'Dla Ciebie'}
for bname in blocks:
    body = sec[bname]
    chunks = re.split(r'^### Lekcja (\d+)\. (.*)$', body, flags=re.M)
    intro = chunks[0]
    for i in range(1, len(chunks), 3):
        n, title, txt = chunks[i], chunks[i + 1], chunks[i + 2]
        lines = txt.strip('\n').split('\n')
        items, rest = [], []
        for ln in lines:
            m = re.match(r'^- (Przygotuj|Lekcja|Zostaje w głowie|Zabawa|Gdy nie działa|Dla Ciebie): (.*)$', ln)
            if m:
                items.append((m.group(1), m.group(2)))
            else:
                rest.append(ln)
        h = ''
        for k, v in items:
            h += f'<h4>{LBL[k]}</h4>' + mdhtml(v)
        r = '\n'.join(rest).strip()
        if r:
            h += '<h4>Plan i kod</h4>' + mdhtml(r)
        if i == 1 or bname.startswith(('Blok 4', 'Blok 5')):
            h += f'<h4>O tym bloku</h4>' + mdhtml(intro)
        DAD[n] = h
idx = json.load(open(B / 'audio_index.json', encoding='utf8'))
VOICE = {t: base64.b64encode((B / 'audio' / f).read_bytes()).decode() for t, f in idx.items()}
shell = (B / 'src/shell.html').read_text()
css = (B / 'src/style.css').read_text()
icons = (B / 'src/icons.js').read_text()
js = ''.join((B / f'src/{f}').read_text() + '\n' for f in ['sim.js', 'core.js', 'board.js', 'desk.js', 'world.js', 'mic.js', 'lessons1.js', 'lessons2.js'])
DADJS = 'const DAD=' + json.dumps(DAD, ensure_ascii=False).replace('</', '<\\/') + ';\n'
page = shell.replace('/*CSS*/', css).replace('/*JS*/', 'const SITE=0;\nconst VOICE=' + json.dumps(VOICE, ensure_ascii=False) + ';\n' + DADJS + icons + js + '\nboot();')
(B / 'elektronika-z-leonem.html').write_text(page)
print('ok', len(page))
if 'site' in sys.argv:
    S = B.parent / 'site'
    (S / 'voice').mkdir(parents=True, exist_ok=True)
    (S / 'vosk').mkdir(exist_ok=True)
    for f in set(idx.values()):
        shutil.copy(B / 'audio' / f, S / 'voice' / f)
    head = '''<!doctype html>
<html lang="pl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="description" content="Kurs elektroniki dla pięciolatka: 23 lekcje i plac zabaw z prawdziwą symulacją obwodu.">
<meta name="theme-color" content="#0B3F35">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Elektronika">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="icon-180.png">
<style>body{margin:0}[hidden]{display:none!important}</style>
'''
    sh = shell.replace('<meta name="claude:viewport-fit-sides" content="cover">\n', '')
    top, rest = sh.split('<div id="app">', 1)
    html_ = head + top.replace('/*CSS*/', css) + '</head>\n<body>\n<div id="app">' + rest.replace('/*JS*/', 'const SITE=1;\nconst VOICE=' + json.dumps(idx, ensure_ascii=False) + ';\n' + DADJS + icons + js + '\nboot();') + '</body>\n</html>\n'
    (S / 'index.html').write_text(html_)
    V = sorted(set(idx.values()))
    (S / 'sw.js').write_text((B / 'src/sw.js').read_text().replace('__V__', 'e' + str(len(html_))).replace('__VOICE__', json.dumps(['voice/' + f for f in V])))
    (S / 'manifest.webmanifest').write_text(json.dumps({'name': 'Elektronika z Leonem', 'short_name': 'Elektronika', 'lang': 'pl', 'start_url': '.', 'scope': '.', 'display': 'standalone', 'background_color': '#072C26', 'theme_color': '#0B3F35', 'icons': [{'src': 'icon-192.png', 'sizes': '192x192', 'type': 'image/png'}, {'src': 'icon-512.png', 'sizes': '512x512', 'type': 'image/png', 'purpose': 'any maskable'}]}, ensure_ascii=False))
    print('site ok', len(html_))
