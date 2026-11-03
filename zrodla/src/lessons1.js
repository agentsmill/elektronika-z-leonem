/* lekcje 1–11 */
const R=(a,b,v)=>({k:'res',h:[a,b],v}),W=(a,b,c='g',bow)=>({k:'wire',h:[a,b],c,bow}),LD=(a,k,c='r',name)=>({k:'led',h:[a,k],c,name}),BT=(c1,c2,o={})=>({k:'btn',c1,c2,...o}),CP=(p,n,v)=>({k:'cap',h:[p,n],v}),QN=(e,b,c,flat)=>({k:'npn',h:[e,b,c],flat}),BAT9=(p,n)=>({k:'bat',h:[p,n]});
const LESSONS=[];const LS=o=>LESSONS.push(o);
const ROT=(el,x,y,a)=>el.setAttribute('transform',`translate(${x} ${y}) rotate(${a})`);

const HB=(c,r,id,label,cls)=>c.hold(r,label,cls,()=>c.w.press(id,1),()=>c.w.press(id,0));
function deskBase(c){const D=c.desk;D.battery();D.lamp('L',500,120,'r');D.clip('c1','r',{x:90,y:440},{x:200,y:470});D.clip('c2','k',{x:910,y:440},{x:800,y:470})}
const close1=(c,a)=>c.desk.pair('c1','BP','L:l',{...c,anim:a,ok:t=>c.ok(t),alive:c.alive});
const close2=(c,a)=>c.desk.pair('c2','L:r','BN',{...c,anim:a,ok:t=>c.ok(t),alive:c.alive});
const closed=c=>c.desk.clips.c1.at[0]==='BP'&&c.desk.clips.c1.at[1]==='L:l'&&c.desk.clips.c2.at[0]==='L:r'&&c.desk.clips.c2.at[1]==='BN';

LS({n:1,w:0,t:'Lampka się świeci',scene:'desk',setup:deskBase,steps:[
 {s:'To jest bateria. Tu mieszka prąd.',run:async c=>{c.anim&&c.desk.batG.animate([{transform:'scale(1)'},{transform:'scale(1.05)'},{transform:'scale(1)'}],{duration:700,iterations:2});c.card('bat','Bateria 9 V')}},
 {s:'A to lampka. Ma czerwony znaczek.',run:async c=>{const L=c.desk.lamps.L;c.anim&&L.g.animate([{opacity:1},{opacity:.4},{opacity:1}],{duration:600,iterations:2})}},
 {s:'Krokodylek łączy czerwony kabel z czerwonym znaczkiem.',ch:['czerwony kabel','znaczek lampki'],run:c=>close1(c,c.anim)},
 {s:'Drugi krokodylek łączy lampkę z czarnym kablem.',ch:['lampka','czarny kabel'],run:c=>close2(c,c.anim)},
 {s:'Świeci! Prąd biega w kółko. Stuknij krokodylka.'},
 {s:'Naciśnij i trzymaj guzik. Prąd staje wszędzie naraz, jak sznurek w kółku.',run:async c=>{if(!closed(c)){await close1(c,false);await close2(c,false)}},live:c=>{const r=c.row();c.hold(r,'Zatrzymaj prąd','sp',()=>{c.w.brk.on=0},()=>{c.w.brk.on=1})}},
 {s:'Bateria jest nasza. Gniazdko nie.',run:async c=>{const g=S('g',{},c.desk.front);g.innerHTML=`<circle cx="830" cy="150" r="104" fill="#F4F2EA" stroke="#B4AF9D" stroke-width="6"/><circle cx="830" cy="150" r="72" fill="#E4E1D4"/><circle cx="804" cy="150" r="11" fill="#333"/><circle cx="856" cy="150" r="11" fill="#333"/><rect x="822" y="86" width="16" height="22" rx="3" fill="#B8BEC4"/><path d="M746 66L914 234M914 66L746 234" stroke="#FF5A4E" stroke-width="20" stroke-linecap="round"/>`;c.anim&&g.animate([{opacity:0,transform:'scale(.7)'},{opacity:1,transform:'none'}],{duration:400})}}
]});

LS({n:2,w:0,t:'Lampka ma swoją stronę',scene:'desk',setup:async c=>{deskBase(c)},steps:[
 {s:'Lampka świeci. Co będzie, jak ją odwrócimy?',run:async c=>{await close1(c,false);await close2(c,false)},live:async c=>{const i=await c.ask('Zaświeci czy nie?',[['Zaświeci','g'],['Nie zaświeci','r']]);c.st.g=i;c.p.next()}},
 {s:'Nie świeci! Lampka to ulica jednokierunkowa.',run:async c=>{await c.desk.flipLamp('L',true,c);if(c.anim)Snd.zle()}},
 {s:'Stuknij lampkę i odwróć ją sam.',live:c=>{const D=c.desk;c.bindTap(D.lamps.L.hit,async()=>{await D.flipLamp('L',!D.lamps.L.flip,c);Snd.klik()})}},
 {s:'Pociąg z dwóch lampek. Drogę mają wspólną.',ch:['znaczek do wolnego końca poprzedniej'],run:async c=>{const D=c.desk;D.lamps.L.off=1;D.lamps.L.g.setAttribute('opacity',0);D.setLamp('L',0);D.lamps.L.hit.setAttribute('pointer-events','none');if(D.bd.LL){D.bd.LL.remove();delete D.bd.LL}delete D.slots['L:l'];delete D.slots['L:r'];['c1','c2'].forEach(k=>{D.clips[k].off=1;D.clips[k].g.setAttribute('opacity',0);D.clips[k].g.setAttribute('pointer-events','none')});
   D.lamp('A',270,130,'y',.8);D.lamp('B',730,130,'g',.8);D.clip('a','r','BP','A:l');D.clip('b','k','B:r','BN');D.clip('m','g','A:r','B:l')},
  live:c=>{const D=c.desk;c.say('Stuknij jedną lampkę. Co będzie z drugą?');['A','B'].forEach(k=>c.bindTap(D.lamps[k].hit,async()=>{await D.flipLamp(k,!D.lamps[k].flip,c);Snd.klik()}))}}
]});

LS({n:3,w:0,t:'Co puszcza prąd',scene:'desk',dv:[0,0,1000,760],setup:c=>{const D=c.desk;D.battery(230,130);D.lamp('L',330,90,'r',.7);D.clip('c1','r','BP','L:l');D.clip('c2','k','L:r',{x:790,y:330});D.clip('c3','g','BN',{x:610,y:330});c.st.slot=S('g',{},D.front);c.st.o={a:'Hc21',b:'Hc31',st:{on:0},pa:{x:790,y:330},pb:{x:610,y:330}};c.w.sw=[c.st.o]},steps:[
 {s:'W kółku jest dziura. Stykamy krokodylki i lampka świeci.',run:async c=>{const D=c.desk;D.to('c2',1,{x:716,y:330},c);await D.to('c3',1,{x:684,y:330},c);await c.wait(1200);D.to('c2',1,{x:790,y:330},c);await D.to('c3',1,{x:610,y:330},c)}},
 {s:'Stuknij rzecz i złap ją krokodylkami. Zgadnij, zanim zobaczysz.',live:c=>{const wrap=H('div',{class:'hudrow'},c.hud);const res=c.st.res=c.st.res||{};ITEMS.forEach(it=>{const b=H('button',{class:'big sq',type:'button','aria-label':it.n},wrap,`<svg viewBox="0 0 160 120">${it.s}</svg>`);b.style.background=res[it.id]==null?'':res[it.id]?'#BFF3D6':'#FFD0CC';b.onclick=async()=>{Snd.init();c.st.slot.innerHTML=`<g transform="translate(620 232)">${it.s}</g>`;Snd.pyk();c.st.o.st.on=0;await c.wait(420);c.st.o.st.on=it.ok;res[it.id]=it.ok;b.style.background=it.ok?'#BFF3D6':'#FFD0CC';if(!it.ok)Snd.zle();c.talk(it.n+(it.ok?' puszcza prąd.':' nie puszcza prądu.'))}})}},
 {s:'Metal puszcza prąd. Plastik, drewno i papier nie. Kabel to metal w plastikowym ubraniu.',run:async c=>{c.st.o.st.on=0;c.st.slot.innerHTML=`<g transform="translate(540 240)"><rect x="0" y="40" width="210" height="44" rx="22" fill="#D6312B"/><rect x="170" y="52" width="150" height="20" rx="8" fill="#D9863C"/></g>`}}
]});

LS({n:4,w:0,t:'Świecąca książka',scene:'desk',setup:c=>{const D=c.desk;D.battery(230,130);D.lamp('L',230,90,'r',.62);c.st.book=S('g',{},D.main);c.st.T1={x:590,y:400};c.st.T2={x:790,y:400};D.slot('T1',c.st.T1);D.slot('T2',c.st.T2);c.st.sw={a:'T1',b:'T2',st:{on:0}};c.w.sw=[c.st.sw];D.clip('c1','r',{x:70,y:540},{x:160,y:560});D.clip('c2','g',{x:560,y:540},{x:620,y:540});D.clip('c3','k',{x:800,y:540},{x:880,y:540})},steps:[
 {s:'Składamy tekturę na pół, jak książkę.',run:async c=>{drawBook(c,false,0)}},
 {s:'Naklejamy dwa paski folii. Mają się dotykać, gdy książka się zamknie.',run:async c=>{drawBook(c,false,1)}},
 {s:'Trzy krokodylki robią kółko.',ch:['czerwony kabel z lampką','lampka z paskiem','drugi pasek z czarnym kablem'],run:async c=>{const D=c.desk;await D.pair('c1','BP','L:l',c);await D.pair('c2','L:r','T1',c);await D.pair('c3','T2','BN',c)}},
 {s:'Stuknij książkę. Zamknij ją i otwórz.',live:c=>{c.bindTap(c.st.book,()=>{const s=c.st.sw.st;s.on=s.on?0:1;drawBook(c,!!s.on,1);Snd.klik()})}},
 {s:'Włącznik to most. Zamknięty puszcza prąd, otwarty przerywa drogę.',run:async c=>{c.st.sw.st.on=1;drawBook(c,true,1)}}
]});
function drawBook(c,closed,foil){const g=c.st.book,x=690,y=250,T=c.st.T1.y;const tails=`<rect x="${c.st.T1.x-16}" y="${y+40}" width="32" height="${T-y-30}" fill="#D5DADF" stroke="#8F979D" stroke-width="2"/><rect x="${c.st.T2.x-16}" y="${y+40}" width="32" height="${T-y-30}" fill="#D5DADF" stroke="#8F979D" stroke-width="2"/>`;if(closed){g.innerHTML=tails+`<rect x="${x-160}" y="${y-110}" width="320" height="176" rx="10" fill="#B8884E" stroke="#6E4E22" stroke-width="4"/><rect x="${x-150}" y="${y+48}" width="300" height="12" fill="#E9DFC6"/>`;return}
 g.innerHTML=(foil?tails:'')+`<path d="M${x} ${y-90}L${x-200} ${y-108}V${y+50}L${x} ${y+68}Z" fill="#C9A878" stroke="#6E4E22" stroke-width="4"/><path d="M${x} ${y-90}L${x+200} ${y-108}V${y+50}L${x} ${y+68}Z" fill="#D9BC8C" stroke="#6E4E22" stroke-width="4"/>`+(foil?`<rect x="${c.st.T1.x-16}" y="${y-40}" width="32" height="96" fill="#D5DADF" stroke="#8F979D" stroke-width="2"/><rect x="${c.st.T2.x-16}" y="${y-40}" width="32" height="96" fill="#D5DADF" stroke="#8F979D" stroke-width="2"/><rect x="${c.st.T1.x-16}" y="${y-56}" width="${x-c.st.T1.x-10}" height="30" fill="#D5DADF" stroke="#8F979D" stroke-width="2"/><rect x="${x+10}" y="${y-56}" width="${c.st.T2.x-x+6}" height="30" fill="#D5DADF" stroke="#8F979D" stroke-width="2"/>`:'')}


LS({n:5,w:0,t:'Alarm w drzwiach',scene:'desk',setup:c=>{const D=c.desk;D.battery(200,120);D.lamp('L',200,90,'r',.6);c.st.g=S('g',{},D.main);D.slot('F1',{x:440,y:400});D.slot('F2',{x:540,y:400});c.st.sw={a:'F1',b:'F2',st:{on:0}};c.w.sw=[c.st.sw];D.clip('c1','r',{x:70,y:540},{x:150,y:560});D.clip('c2','g',{x:440,y:540},{x:500,y:540});D.clip('c3','k',{x:580,y:540},{x:640,y:540})},steps:[
 {s:'Końce klamerki owijamy folią.',run:async c=>{drawDoor(c,0,1,0,0)}},
 {s:'Trzy krokodylki robią kółko. Dwa łapią folię.',ch:['czerwony kabel z lampką','lampka z folią','druga folia z czarnym kablem'],run:async c=>{const D=c.desk;await D.pair('c1','BP','L:l',c);await D.pair('c2','L:r','F1',c);await D.pair('c3','F2','BN',c)}},
 {s:'Klamerka się zamyka. Lampka świeci. Wkładamy tekturkę i gaśnie.',run:async c=>{drawDoor(c,0,1,0,1);c.st.sw.st.on=1;await c.wait(1100);drawDoor(c,0,1,1,1);c.st.sw.st.on=0;if(c.anim)Snd.klik()}},
 {s:'Sznurek idzie od tekturki do drzwi.',run:async c=>{drawDoor(c,0,1,1,1,1)}},
 {s:'Otwórz drzwi! Stuknij je.',live:c=>{let open=false;const f=async()=>{open=!open;if(open){drawDoor(c,1,1,0,1,1);Snd.klik();await c.wait(180);c.st.sw.st.on=1;c.talk('Alarm! Ktoś otworzył drzwi!')}else{drawDoor(c,0,1,1,1,1);c.st.sw.st.on=0;c.talk('Stuknij jeszcze raz.')}};c.bindTap(c.st.g,f)}}
]});
function drawDoor(c,open,foil,card,closed,str){const g=c.st.g,X=660,jaw=card?12:0;const door=open?`<path d="M${X+40} 70V560L${X+150} 500V130Z" fill="#8E5B2C" stroke="#4E3115" stroke-width="4"/>`:`<rect x="${X+40}" y="70" width="240" height="490" fill="#A8703A" stroke="#4E3115" stroke-width="4"/><circle cx="${X+66}" cy="300" r="13" fill="#E9BC55" stroke="#9C7426" stroke-width="3"/>`;
 g.innerHTML=`<rect x="${X+24}" y="54" width="272" height="522" fill="#3B2A1A"/>${door}<g transform="translate(490 250)"><rect x="-30" y="${-34-jaw}" width="170" height="22" rx="7" fill="#C9A878" stroke="#6E4E22" stroke-width="3" transform="rotate(${-jaw*.45} 130 ${-22-jaw})"/><rect x="-30" y="${12+jaw}" width="170" height="22" rx="7" fill="#C9A878" stroke="#6E4E22" stroke-width="3" transform="rotate(${jaw*.45} 130 ${22+jaw})"/><circle cx="118" cy="0" r="24" fill="none" stroke="#AEB5BA" stroke-width="8"/>${foil?`<path d="M-24 ${-14-jaw}H-52V150H-34" fill="none" stroke="#D5DADF" stroke-width="12" stroke-linejoin="round"/><path d="M-24 ${14+jaw}H26V150H44" fill="none" stroke="#D5DADF" stroke-width="12" stroke-linejoin="round"/>`:''}${card?`<rect x="-92" y="-10" width="120" height="20" fill="#F4F2EA" stroke="#B4AF9D" stroke-width="2"/>`:''}</g>`+(str?`<path d="M${398} 250C330 150 640 170 ${open?X+150:X+66} 300" fill="none" stroke="#F4F2EA" stroke-width="4"/>`+(open?`<rect x="340" y="500" width="120" height="20" fill="#F4F2EA" stroke="#B4AF9D" stroke-width="2" transform="rotate(14 400 510)"/>`:''):'')}

/* blok 2 */
LS({n:6,w:1,t:'Ukryte druty',scene:'board',view:[1,12],parts:{BAT:BAT9('+3','-3'),R:R('+5','b5','1k'),D:LD('d5','d6','r','Dioda czerwona'),W:W('b6','-6','k')},steps:[
 {s:'To płytka. Pod plastikiem są ukryte druty.',run:async c=>{const b=c.b;for(const k of[3,5,6,8]){b.strip('a'+k,'#FF8A1F');await c.wait(260)}}},
 {s:'Pięć dziurek w jednym słupku to jeden drut. Rowek rozcina słupek na dwa.',run:async c=>{c.b.clearHl();c.b.strip('a5');c.b.strip('f5','#59B7FF');await c.cam(c.b.fit(['a5','j5']),700)}},
 {s:'Rezystor idzie z czerwonej szyny do słupka numer pięć.',put:['R']},
 {s:'Długa nóżka diody do słupka pięć. Krótka do słupka sześć.',put:['D']},
 {s:'Podpinamy baterię. Czerwony do plusa, czarny do minusa.',put:['BAT']},
 {s:'Teraz Ty, Leon. Włóż ostatni kabel.',put:['W'],run:async c=>{await c.wait(450);if(c.anim)Snd.dobrze()}},
 {s:'Stuknij inną dziurkę. Zapali się?',live:c=>{const b=c.b,g=S('g',{},b.lyParts);c.unbind.push(()=>g.remove());const P=b.parts.W;const set=h=>{P.d.h=[h,'-6'];b.redraw('W');c.w.dirty=1;Snd.pyk();c.after(260,()=>{const ok=c.w.led('D')>.15;ok?Snd.dobrze():Snd.zle();c.talk(ok?'Świeci! To ten sam ukryty drut.':'Nie świeci. To inny drut.',[h])})};for(const col of[3,4,5,6,7,8,9])for(const r of'abcefghij'){if(`${r}${col}`==='b5')continue;const q=pt(r+col);if(col===5&&'d'.includes(r))continue;const e=S('circle',{class:'hit',cx:q.x,cy:q.y,r:10},g);c.bindTap(e,()=>set(r+col))}c.cam([-20,0,300,410])}}
]});

const L7={BAT:BAT9('+3','-3'),R:R('+5','b5','1k'),D:LD('d5','d6','r','Dioda czerwona'),A:W('a6','a10','g'),S:BT(10,12),H:W('h12','-12','k')};
LS({n:7,w:1,t:'Przycisk',scene:'board',view:[1,16],parts:L7,steps:[
 {s:'Zaczynamy jak ostatnio: rezystor, dioda, bateria.',put:['R','D','BAT'],fast:true},
 {s:'Kabel prowadzi od krótkiej nóżki do przycisku.',put:['A']},
 {s:'Przycisk stoi nad rowkiem. Cztery nóżki, cztery dziurki.',put:['S']},
 {s:'Ostatni kabel wraca do minusa. Włóż go.',put:['H']},
 {s:'Naciśnij przycisk!',live:c=>{HB(c,c.row(),'S','Naciśnij','sp')}},
 {s:'Dioda nadaje rytm. Powtórz go przyciskiem.',live:c=>{const w=c.w,pat=[1,1,3];let n=0,auto=false;const play=async()=>{const tok=c.alive;auto=true;for(const k of pat){w.press('S',1);await c.wait(k*180);if(!c.ok(tok))return;w.press('S',0);await c.wait(220)}auto=false};w.onpress=(id,on)=>{if(!on&&!auto){n++;if(n===3){Snd.dobrze();burst(innerWidth/2,innerHeight/2,18);c.talk('Brawo! Trzy razy, jak dioda.');n=0}}};c.unbind.push(()=>{w.onpress=null});const r=c.row();c.btn(r,'Pokaż rytm','',play);HB(c,r,'S','Naciśnij','sp');play()}}
]});

LS({n:8,w:1,t:'Sejf na dwa klucze',scene:'board',view:[1,21],parts:{...L7,G:W('g12','g16','o'),S2:{k:'btn',c1:16,c2:18,h:['f16','f18','e16','e18'],name:'Drugi przycisk'},T:W('a18','-18','k'),O1:W('g12','-12','k'),O2:W('b10','g16','v')},pre:['R','D','BAT','A','S'],steps:[
 {s:'Zamiast kabla do minusa dajemy drugi przycisk. Stoi dalej, nad rowkiem.',put:['S2']},
 {s:'Żółty kabel łączy przyciski jeden za drugim.',put:['G']},
 {s:'Czarny kabel wraca do minusa.',put:['T']},
 {s:'Żeby otworzyć sejf, potrzeba dwóch kluczy. Naciśnij oba.',live:c=>safe(c,false)},
 {s:'Tata przepina dwa kable. Teraz wystarczy jeden przycisk.',take:['G'],put:['O1','O2'],live:c=>safe(c,true)}
]});
function safe(c,or){const P=c.panel(`<svg viewBox="0 0 200 150"><rect x="30" y="16" width="140" height="124" rx="10" fill="#5C6670" stroke="#2E353B" stroke-width="4"/><path id="sgold" d="M84 104l16-44 16 44z" fill="#FFD23F" opacity="0"/><g id="sdoor"><rect x="42" y="28" width="116" height="100" rx="6" fill="#7E8A94"/><circle cx="100" cy="78" r="26" fill="#3A4249" stroke="#1F2428" stroke-width="3"/><path d="M100 54v48M76 78h48" stroke="#C9CFD4" stroke-width="5"/></g></svg>`,'',true);c.onTick(()=>{const on=c.w.led('D')>.2;$('#sdoor',P).setAttribute('opacity',on?.15:1);$('#sgold',P).setAttribute('opacity',on?1:0);if(on&&!c.st.was){Snd.dobrze();c.st.was=1}if(!on)c.st.was=0});const r=c.row();HB(c,r,'S','Leon','sp');HB(c,r,'S2','Tata','b')}

const COLS9=[5,11,17,23],VS9=['470','4k7','47k','470k'];
const P9={BAT:BAT9('+3','-3')};COLS9.forEach((k,i)=>{P9['R'+i]=R('+'+k,'b'+k,VS9[i]);P9['D'+i]=LD('d'+k,'d'+(k+1),'r','Dioda');P9['W'+i]=W('a'+(k+1),'-'+(k+1),'k')});
LS({n:9,w:1,t:'Wąska droga',scene:'board',view:[1,28],parts:P9,steps:[
 {s:'Pierwsza droga: rezystor, dioda, kabel do minusa.',put:['R0','D0','W0']},
 {s:'Jeszcze trzy takie drogi. Każda ma inny rezystor.',put:['R1','D1','W1','R2','D2','W2','R3','D3','W3'],fast:true},
 {s:'Podpinamy baterię.',put:['BAT'],run:async c=>{if(c.anim)Snd.dobrze()}},
 {s:'Która dioda świeci najmocniej? Stuknij ją.',live:c=>{['D0','D1','D2','D3'].forEach((id,i)=>{const q=pt('d'+COLS9[i]);const e=S('circle',{class:'hit',cx:q.x+10,cy:q.y,r:32},c.b.lyParts);c.unbind.push(()=>e.remove());c.bindTap(e,()=>{const m=Math.max(...[0,1,2,3].map(j=>c.w.cur('D'+j))),best=c.w.cur(id)>=m*.98;best?(Snd.dobrze(),c.talk('Tak! Rezystor to szeroka droga, biegnie dużo prądu.')):(Snd.zle(),c.talk('Spróbuj jeszcze raz.'))})})}},
 {s:'Zamień dwa rezystory miejscami. Jasność zamieni się razem z nimi.',live:c=>{const r=c.row();c.btn(r,'Zamień','sp',()=>{const P=c.b.parts,t=P.R0.d.v;P.R0.d.v=P.R1.d.v;P.R1.d.v=t;c.b.redraw('R0');c.b.redraw('R1');c.w.dirty=1;Snd.pyk()})}},
 {s:'Wejdź pod koc. Po ciemku widać nawet najsłabszą diodę.',live:c=>{const r=c.row();c.btn(r,'Koc','sp',b=>{c.st.dark=!c.st.dark;c.b.dim(c.st.dark?.92:0);b.textContent=c.st.dark?'Zdejmij koc':'Koc'})}}
]});

LS({n:10,w:1,t:'Pokrętło',scene:'board',view:[1,14],parts:{BAT:BAT9('+3','-3'),R:R('+5','b5','470'),T:{k:'trim',h:['c5','c7','d6'],v:'100 kΩ'},A:W('b6','b8','o'),D:LD('d8','d9','r','Dioda czerwona'),K:W('a9','-9','k')},steps:[
 {s:'Rezystor pilnuje diody, gdy pokrętło jest na zero.',put:['R']},
 {s:'Trymer ma trzy nóżki w trójkącie. Niebieska kostka z pokrętłem.',put:['T']},
 {s:'Kabel idzie od środkowej nóżki do diody.',put:['A']},
 {s:'Dioda i kabel do minusa.',put:['D','K']},
 {s:'Podpinamy baterię.',put:['BAT']},
 {s:'Kręć pokrętłem. Wschód słońca!',live:c=>{c.range(0,100,50,v=>c.w.trim('T',1-v/100),'<b style="font:800 22px var(--display)">Ciemno</b>');H('b',{style:'font:800 22px var(--display)'},$('.rangebox',c.hud),'Jasno')}}
]});

LS({n:11,w:1,t:'Wiaderko na prąd',scene:'board',view:[1,22],parts:{BAT:BAT9('+3','-3'),R:R('+10','b10','100'),S:BT(10,12),C1:CP('g12','g13','100µ'),C2:CP('j12','j13','100µ'),RL:R('h12','h16','10k'),D:LD('j16','j17','r','Dioda czerwona'),K1:W('i13','-13','k'),K2:W('g17','-17','k')},steps:[
 {s:'Rezystor i przycisk, jak w lekcji siódmej.',put:['R','S']},
 {s:'To kondensator, czyli wiaderko na prąd. Pasek to minus.',put:['C1']},
 {s:'Rezystor prowadzi do diody.',put:['RL','D']},
 {s:'Dwa czarne kable wracają do minusa.',put:['K1','K2']},
 {s:'Podpinamy baterię.',put:['BAT']},
 {s:'Trzymaj przycisk i policz do dwóch. Potem puść.',live:c=>wiad(c,1)},
 {s:'Dokładamy drugie wiaderko. Starczy na dłużej?',put:['C2'],live:c=>wiad(c,2)}
]});
function wiad(c,n){const b=c.b,P=b.parts;let tr=0,cnt=false;const Pn=c.panel(`<svg viewBox="0 0 200 150"><path d="M58 30L72 136H128L142 30" fill="#123" stroke="#C9CFD4" stroke-width="5"/><clipPath id="wc"><path d="M58 30L72 136H128L142 30Z"/></clipPath><rect id="wl" clip-path="url(#wc)" x="50" y="136" width="100" height="0" fill="#FFD23F"/><path d="M58 30A44 26 0 0 1 142 30" fill="none" stroke="#C9CFD4" stroke-width="4"/>${n>1?'<text x="168" y="60" font-size="26" font-weight="800" fill="#FFD23F" font-family="Baloo 2,sans-serif">x2</text>':''}</svg>`,'<span id="wt">0</span> s',true),wl=$('#wl',Pn),wt=$('#wt',Pn);c.w.onpress=(id,on)=>{if(on){cnt=false;wt.textContent='0'}else{tr=0;cnt=true}};c.unbind.push(()=>{c.w.onpress=null});HB(c,c.row(),'S','Trzymaj','sp');
 c.onTick(dt=>{const V=(P.C1.st&&P.C1.st.v)||0,h=clamp(V/8.9,0,1)*106;wl.setAttribute('y',136-h);wl.setAttribute('height',h);if(cnt&&c.w.led('D')>.05){tr+=dt;wt.textContent=Math.floor(tr)}})}
