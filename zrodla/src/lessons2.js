/* lekcje 12–23 */
/* programy: te same co w szkicach dla Arduino, delay to yield */
function* pressed(io,p){if(io.read(p))return false;yield 30;while(!io.read(p))yield 1;yield 30;return true}
function* gBlink(io,get){io.mode(9,'out');for(;;){io.write(9,1);yield get();io.write(9,0);yield get()}}
function* gTraffic(io){[9,10,11].forEach(p=>io.mode(p,'out'));io.mode(2,'pu');yield 2;const sw=(c,z,g)=>{io.write(9,c);io.write(10,z);io.write(11,g)};for(;;){sw(0,0,1);for(let i=0;i<80;i++){if(!io.read(2))break;yield 100}sw(0,1,0);yield 2000;sw(1,0,0);yield 5000;sw(1,1,0);yield 1000}}
function* gLeon(io,Z){const D=[9,10,11],B=[2,3,4];D.forEach(p=>io.mode(p,'out'));B.forEach(p=>io.mode(p,'pu'));io.mode(5,'pu');yield 2;const zap=function*(k,t){io.write(D[k],1);yield t;io.write(D[k],0)};for(;;){for(let k=0;k<3;k++){if(yield* pressed(io,B[k])){if(Z.played){Z.prog=[];Z.played=false}if(Z.prog.length<30)Z.prog.push(k);io.ev('draw');yield* zap(k,150)}}if(yield* pressed(io,5)){yield 500;for(let i=0;i<Z.prog.length;i++){Z.cur=i;io.ev('draw');yield* zap(Z.prog[i],600);yield 200}Z.cur=-1;Z.played=true;io.ev('done')}yield 1}}
function* gMem(io){const D=[9,10,11],B=[2,3,4];D.forEach(p=>io.mode(p,'out'));B.forEach(p=>io.mode(p,'pu'));io.mode(5,'pu');yield 2;const all=s=>D.forEach(p=>io.write(p,s)),zap=function*(k,t){io.write(D[k],1);io.ev('zap',[k,t]);yield t;io.write(D[k],0)},blink=function*(n,t){for(let i=0;i<n;i++){all(1);yield t;all(0);yield t}};let seq=[],len=2;const fresh=function*(){all(1);while(!(yield* pressed(io,5)))yield 1;all(0);seq=Array.from({length:20},()=>Math.floor(Math.random()*3));len=2};yield* fresh();for(;;){io.ev('len',len);yield 800;for(let i=0;i<len;i++){yield* zap(seq[i],600);yield 250}io.ev('turn');let ok=true;for(let i=0;i<len&&ok;i++){let got=-1;while(got<0){for(let k=0;k<3&&got<0;k++)if(yield* pressed(io,B[k])){yield* zap(k,200);got=k}yield 1}if(got!==seq[i])ok=false}if(!ok){yield* blink(3,250);io.ev('bad',len);yield* fresh();continue}yield* blink(1,400);io.ev('good');if(len<20)len++}}
function* gGate(io){io.mode(9,'out');io.mode(11,'out');io.mode(2,'pu');io.servo(6,0);io.write(9,1);yield 2;const turn=function*(a,b){const s=b>a?1:-1;for(let k=a;k!==b;k+=s){io.servo(6,k);yield 15}io.servo(6,b)};for(;;){if(!io.read(2)){yield* turn(0,90);io.write(9,0);io.write(11,1);yield 4000;io.write(11,0);io.write(9,1);yield* turn(90,0)}yield 1}}
function* gPi22(io){io.mode(11,'pu');io.mode(13,'out');yield 2;for(;;){while(io.read(11))yield 5;io.write(13,1);io.ev('play');yield Mic.rec?Mic.rec.duration*1000:1500;io.write(13,0);while(!io.read(11))yield 5;yield 200}}
function* gPi23(io){io.mode(13,'out');for(;;)yield 100}
const PLAC={n:0,t:'Plac zabaw',scene:'board',view:[1,30],parts:{BAT:BAT9('+3','-3')},pre:['BAT'],steps:[{s:'Plac zabaw. Bierz części z pudełka i łącz je, jak chcesz.'}]};
const DARL={Q2:QN('c8','c9','c10'),Q1:QN('c12','c13','c14'),K1:W('a8','-8','k'),J1:W('a12','a9','o'),J2:W('b10','b14','v'),J3:W('a14','a18','g'),RL:R('+19','b19','1k'),D:LD('c19','c18','r','Dioda czerwona'),RB:R('e13','h13','1k'),RP:R('i13','i18','1M'),K2:W('j18','-18','k'),BAT:BAT9('+3','-3')};
LS({n:12,w:2,t:'Czujnik dotyku',scene:'board',view:[1,24],parts:{...DARL,F:{k:'foil',h:['j13','+16'],x:210,y:450}},steps:[
 {s:'Dwa tranzystory. Płaska strona do Ciebie.',put:['Q2','Q1']},
 {s:'Trzy kable łączą tranzystory w parę, a czarny idzie do minusa.',put:['K1','J1','J2','J3']},
 {s:'Rezystor i dioda.',put:['RL','D']},
 {s:'Dwa rezystory pilnują bramy.',put:['RB','RP','K2']},
 {s:'Dwa paski folii na tekturze i bateria.',cam:[-175,-4,1000,720],put:['BAT','F'],back:false},
 {s:'Połóż palec na obu paskach.',cam:[-175,-4,1000,720],live:c=>{const b=c.b,pn=c.panel(gateSvg(),'Mały prąd otwiera bramę',true);c.onTick(()=>{const o=clamp(c.w.cur('D')/.005,0,1);$('#gate',pn).setAttribute('transform',`rotate(${-74*o} 90 70)`);$('#stream',pn).setAttribute('opacity',.06+.94*o)});const r=c.row();c.hold(r,'Palec','sp',()=>{b.touch('F',1e6);Snd.pyk()},()=>b.touch('F',0))}},
 {s:'Tata dotyka jednego paska, Ty drugiego. Złapcie się za ręce. Bateria jest nasza, gniazdko nie.',cam:[-175,-4,1000,720],live:c=>{const b=c.b,r=c.row();c.hold(r,'Razem','sp',()=>{b.touch('F',3e6);Snd.pyk()},()=>b.touch('F',0))}}
]});
const gateSvg=()=>`<svg viewBox="0 0 200 130"><rect x="0" y="52" width="200" height="36" fill="#14505E"/><rect id="stream" x="0" y="56" width="200" height="28" fill="#59B7FF" opacity=".06"/><rect x="82" y="0" width="14" height="52" fill="#59B7FF"/><path d="M89 30v-6" stroke="#fff"/><rect id="gate" x="84" y="52" width="12" height="36" fill="#E9BC55"/><text x="104" y="24" font-size="15" font-weight="800" fill="#F2F6EC" font-family="Nunito,sans-serif">mały prąd</text><text x="130" y="114" font-size="15" font-weight="800" fill="#F2F6EC" font-family="Nunito,sans-serif">duży prąd</text></svg>`;

LS({n:13,w:2,t:'Lampka nocna',scene:'board',view:[1,29],pre:Object.keys(DARL),parts:{...DARL,A:W('b13','b22','o'),F:{k:'photo',h:['e22','e21'],name:'Fototranzystor'},N:W('a21','-21','k'),T:{k:'trim',h:['c24','c26','d25'],v:'1 MΩ'},R4:R('+24','b24','47k'),Z:W('a25','a22','v')},steps:[
 {s:'Zostawiamy układ z dotyku. Zamiast palca dostanie oko.',cam:viewOf([1,29])},
 {s:'Kabel prowadzi od bramy w prawo.',put:['A']},
 {s:'To oko na światło. Krótka nóżka przy kablu.',put:['F','N']},
 {s:'Pokrętło ustawia, kiedy jest noc.',put:['T','R4','Z']},
 {s:'Zgaś światło. Dioda się zapali.',live:c=>{const b=c.b;let night=false,lamp=false;const up=()=>{c.w.setLight(night&&!lamp?0:1);b.dim(night?(lamp?.45:.82):0)};const r=c.row();c.btn(r,'Noc','sp',e=>{night=!night;e.textContent=night?'Dzień':'Noc';Snd.klik();up()});c.hold(r,'Latarka','b',()=>{lamp=true;up()},()=>{lamp=false;up()})}}
]});

const relayPanel=()=>`<svg viewBox="0 0 220 140"><rect x="16" y="56" width="70" height="56" rx="6" fill="#B56A24"/><path d="M26 56v56M38 56v56M50 56v56M62 56v56M74 56v56" stroke="#7A4413" stroke-width="3"/><circle id="zap" cx="51" cy="84" r="46" fill="#FFD23F" opacity="0"/><g id="arm"><path d="M100 118L178 62" stroke="#C9CFD4" stroke-width="9" stroke-linecap="round"/></g><circle cx="100" cy="118" r="8" fill="#6E757B"/><circle cx="190" cy="42" r="10" fill="#37E283"/><circle cx="196" cy="108" r="10" fill="#FF4B3E"/></svg>`;
const relayShow=(c,p)=>c.onTick(()=>{const on=c.b.parts.K.st.on;$('#arm',p).setAttribute('transform',on?'rotate(38 100 118)':'');$('#zap',p).setAttribute('opacity',on?.35:0)});
const REL={K:{k:'relay',c1:10},S:BT(2,4),A:W('a2','+2','r'),B:W('h4','b10','v'),C:W('h10','-10','k'),DZ:{k:'diode',h:['a10','a6']},E:W('b6','-6','k'),F:W('a13','+14','r'),R1:R('a15','a19','1k'),DG:LD('c19','c20','g','Dioda zielona'),G:W('a20','-20','k'),R2:R('b17','b22','1k'),DR:LD('d22','d23','r','Dioda czerwona'),H:W('a23','-23','k'),BAT:BAT9('+3','-3'),H2:W('h15','b10','o'),I:W('+9','i9','r'),R3:R('j9','j13','100'),CK:CP('d7','d6','100µ'),CW:W('b7','c10','g')};
LS({n:14,w:2,t:'Klik',scene:'board',view:[1,42],parts:REL,steps:[
 {s:'Przekaźnik stoi nad rowkiem. Biały znacznik po lewej.',put:['K']},
 {s:'Przycisk i kable do przekaźnika.',put:['S','A','B','C']},
 {s:'Dioda z paskiem pilnuje cewki.',put:['DZ','E']},
 {s:'Plus do środka przełącznika.',put:['F']},
 {s:'Zielona dioda świeci, gdy przekaźnik śpi.',put:['R1','DG','G']},
 {s:'Czerwona, gdy się obudzi.',put:['R2','DR','H']},
 {s:'Bateria.',put:['BAT']},
 {s:'Naciśnij. Słychać klik!',live:c=>{const p=c.panel(relayPanel(),'Prąd robi magnes');relayShow(c,p);HB(c,c.row(),'S','Naciśnij','sp')}},
 {s:'Klikacz. Tata przepina kable i przekaźnik klika sam.',take:['B','S','A'],put:['H2','I','R3','CK','CW'],live:c=>{const p=c.panel(relayPanel(),'Prąd sam się przerywa');relayShow(c,p)}}
]});

const MIG={Q1:{k:'npn',h:['g3','g4','g5'],flat:'down'},Q2:{k:'npn',h:['g11','g10','g9'],flat:'up'},WE1:W('j3','B-3','k'),WE2:W('j11','B-11','k'),D1:LD('e6','f5','r','Dioda czerwona'),D2:LD('e8','f9','g','Dioda zielona'),R1:R('+6','b6','470'),R2:R('+8','b8','470'),Rb1:R('+4','b4','47k'),Rb2:R('+10','b10','47k'),J1:W('e4','f4','v'),J2:W('e10','f10','g'),C1:CP('i5','i6','10µ'),C2:CP('i9','i8','10µ'),W1:W('g6','h10','g',7),W2:W('g8','h4','v',-7),BAT:BAT9('+2','B-2')};
LS({n:15,w:2,t:'Migacz',scene:'board',view:[1,16],parts:MIG,steps:[
 {s:'Dwa tranzystory. Patrzą w przeciwne strony.',put:['Q1','Q2']},
 {s:'Czarne kable do minusa na dole.',put:['WE1','WE2']},
 {s:'Dwie diody nad rowkiem.',put:['D1','D2']},
 {s:'Dwa rezystory do diod.',put:['R1','R2']},
 {s:'Dwa rezystory do bram.',put:['Rb1','Rb2']},
 {s:'Dwie zworki przez rowek.',put:['J1','J2']},
 {s:'Dwa kondensatory. Paski patrzą na siebie.',put:['C1','C2']},
 {s:'Dwa kable na krzyż. Tu dzieje się magia.',put:['W1','W2']},
 {s:'Leon, wepnij baterię!',put:['BAT'],live:c=>{mig(c)}},
 {s:'Czerwona to przysiad, zielona to skok. Tańczymy!',live:c=>{mig(c,true)}}
]});
function mig(c,dance){const b=c.b,P=b.parts;let slow=!!c.st.slow,was=0;const pn=dance?c.panel(`<svg viewBox="0 0 200 130"><g id="man" stroke="#F2F6EC" stroke-width="7" stroke-linecap="round" fill="none"><circle cx="100" cy="30" r="14"/><path d="M100 44v42M100 56L70 70M100 56L130 70M100 86L78 118M100 86L122 118"/></g></svg>`,'<span id="dt"></span>',true):null;
 const r=c.row();c.btn(r,slow?'Szybko: 10 µF':'Wolno: 100 µF','sp',e=>{slow=c.st.slow=!slow;e.textContent=slow?'Szybko: 10 µF':'Wolno: 100 µF';['C1','C2'].forEach(k=>{P[k].d.v=slow?'100µ':'10µ';b.redraw(k)});c.w.dirty=1;Snd.pyk()});
 c.onTick(()=>{const on=c.w.led('D2')>c.w.led('D1')?1:0;if(on!==was){was=on;Snd.klik();if(pn){$('#man',pn).setAttribute('transform',on?'translate(0 -10)':'translate(100 40) scale(.5 .5) translate(-100 -14)');$('#dt',pn).textContent=on?'Skok':'Przysiad'}}})}

const D0={0:'abcdef',1:'bc',2:'abdeg',3:'abcdg',4:'bcfg',5:'acdfg',6:'acdefg',7:'abc',8:'abcdefg',9:'abcdfg'};
const SEGW={a:['a18','a33','r'],b:['a16','a34','o'],c:['a15','j33','y'],d:['a19','j31','g'],e:['a17','j30','b'],f:['j17','a31','v'],g:['j18','a30','p']};
const K16={U:{k:'ic',n:8,c1:3,t:'NE555'},L:{k:'ic',n:16,c1:12,t:'CD4026'},Y:{k:'disp',c1:30},
 P1:W('+27','B+27','r'),P2:W('-27','B-27','k'),CD:{k:'cap',h:['+26','-26'],v:'100n'},
 A1:W('a3','+3','r'),A2:W('j3','B-3','k'),A3:W('j6','B+6','r'),R1:R('+4','b4','1k'),R2:R('a4','a8','2k2'),A4:W('b8','b5','v'),A5:W('c5','h4','v'),CT:CP('i4','i3','10µ'),CLK:W('g5','g12','y'),
 B1:W('a12','+12','r'),B2:W('j19','B-19','k'),B3:W('a13','-13','k'),B4:W('j14','B+14','r'),RI:{...R('h13','B+15','10k')},S:BT(22,24),B5:W('g13','g24','o'),B6:W('a22','-22','k'),RC:R('b32','-32','470'),BAT:BAT9('+2','-2')};
for(const k in SEGW){const[a,b,cl]=SEGW[k];K16['S'+k]=W(a,b,cl)}
LS({n:16,w:2,t:'Kostka do gry',scene:'board',view:[1,37],parts:K16,steps:[
 {s:'Zegar NE555. Wycięcie w lewo, nóżki nad rowkiem i pod nim.',put:['U']},
 {s:'Licznik CD4026.',put:['L']},
 {s:'Wyświetlacz. Kropka na dole po prawej.',put:['Y']},
 {s:'Łączymy szyny góra z dołem i dajemy mały kondensator.',put:['P1','P2','CD'],nozoom:true},
 {s:'Zegar dostaje prąd.',put:['A1','A2','A3']},
 {s:'Dwa rezystory i kondensator ustawiają rytm zegara.',put:['R1','R2','A4','A5','CT'],slow:700},
 {s:'Ten kabel niesie rytm do licznika.',put:['CLK']},
 {s:'Licznik dostaje prąd.',put:['B1','B2','B3','B4'],slow:700},
 {s:'Przycisk Leona i rezystor.',put:['RI','S','B5','B6'],slow:700},
 {s:'Siedem kabli, po jednym na każdy kawałek cyfry.',put:['Sa','Sb','Sc','Sd','Se','Sf','Sg'],slow:500},
 {s:'Rezystor przy wyświetlaczu i bateria.',put:['RC','BAT']},
 {s:'Naciśnij i puść. Jaka liczba?',live:c=>kosc(c)},
 {s:'Wyścig! Leon i tata. Zero to rzut jeszcze raz.',live:c=>kosc(c,true)}
]});
function kosc(c,game){const w=c.w;const pad=[0,0];let who=0,pn;
 const draw=()=>{if(!pn)return;let s='';for(let i=0;i<30;i++){const col=i%6,row=Math.floor(i/6),x=(row%2?5-col:col)*32+6,y=row*24+4;s+=`<rect x="${x}" y="${y}" width="30" height="22" rx="4" fill="${i===29?'#FFD23F':'#14505E'}"/>`}const q=(i,dx,cl)=>{i=Math.min(29,i);const col=i%6,row=Math.floor(i/6),x=(row%2?5-col:col)*32+6+dx,y=row*24+15;return`<circle cx="${x}" cy="${y}" r="7" fill="${cl}" stroke="#000"/>`};pn.innerHTML=`<svg viewBox="0 0 200 132">${s}${q(pad[0],10,'#FF5A4E')}${q(pad[1],22,'#59B7FF')}</svg><p>${who?'Tata':'Leon'}</p>`};
 if(game){pn=c.panel('','',true);draw()}
 w.onpress=(id,on)=>{if(id!=='S'||on)return;c.after(90,()=>{const n=w.st('L').n;Snd.pyk();if(game){if(n>0){pad[who]+=n;if(pad[who]>=29){Snd.gwiazda();burst(innerWidth/2,innerHeight/2);c.talk((who?'Tata':'Leon')+' wygrywa!')}who=1-who}else c.talk('Zero! Rzut jeszcze raz.');draw()}else c.talk('Wypadło '+n+'!')})};c.unbind.push(()=>{w.onpress=null});HB(c,c.row(),'S','Rzut','sp')}

/* blok 4 */
const ARDP={AR:{k:'ard',h:[]},GN:W('A:GND','-44','k',0),GL:W('-46','B-46','k'),
 W9:W('A:D9','b2','r',0),R9:R('a2','a6','330'),D9:LD('c6','c7','r','Dioda czerwona'),K9:W('b7','-7','k'),P2:W('A:D2','a9','r',0),S2:BT(9,11,{tape:'r'}),G2:W('g11','B-11','k'),
 W10:W('A:D10','b13','y',0),R10:R('a13','a17','330'),D10:LD('c17','c18','y','Dioda żółta'),K10:W('b18','-18','k'),P3:W('A:D3','a20','y',0),S3:BT(20,22,{tape:'y'}),G3:W('g22','B-22','k'),
 W11:W('A:D11','b24','g',0),R11:R('a24','a28','330'),D11:LD('c28','c29','g','Dioda zielona'),K11:W('b29','-29','k'),P4:W('A:D4','a31','g',0),S4:BT(31,33,{tape:'g'}),G4:W('g33','B-33','k'),
 P5:W('A:D5','a40','w',0),S5:BT(40,42),G5:W('g42','B-42','k')};
const ARV=[60,-290,960,720];
const pads=c=>{const r=c.row();[['S2','r'],['S3','y'],['S4','g']].forEach(([id,cl])=>HB(c,r,id,'','sq '+cl));return r};
const LP=['D9','D10','D11'];
LS({n:17,w:3,t:'Program to lista poleceń',scene:'board',view:ARV,parts:ARDP,steps:[
 {s:'Najpierw zabawa bez prądu. Tata jest robotem. Ty mówisz, co ma robić.',live:c=>robot(c)},
 {s:'A to Arduino. Mały mózg. Sprawdza listę poleceń od góry.',put:['AR'],nozoom:true},
 {s:'Czarny kabel z GND do minusa i łącznik szyn.',put:['GN','GL'],nozoom:true},
 {s:'Stacja czerwona: pin D9, rezystor, dioda, kabel do minusa.',put:['W9','R9','D9','K9'],slow:600},
 {s:'Czerwony przycisk: pin D2.',put:['P2','S2','G2'],slow:600},
 {s:'Stacja żółta: pin D10 i D3.',put:['W10','R10','D10','K10','P3','S3','G3'],slow:500},
 {s:'Stacja zielona: pin D11 i D4.',put:['W11','R11','D11','K11','P4','S4','G4'],slow:500},
 {s:'Przycisk Start: pin D5.',put:['P5','S5','G5'],slow:500},
 {s:'Tata wgrywa program. Wybierz, jak szybko ma migać.',live:c=>{let ms=500;const r=c.row();[['Szybko',100],['Średnio',500],['Wolno',1000],['Bardzo wolno',2000]].forEach(([l,v])=>c.btn(r,l,'',()=>{ms=v;c.p.sub('czekaj = '+v,['int czekaj = '+v+';']);Snd.pyk()}));c.w.program('AR',m=>gBlink(m,()=>ms))}}
]});
function robot(c){const N=5,M=4;let pos,dir,prog=[],busy=false;const reset=()=>{pos=[0,3];dir=0};reset();const star=[3,0];const pn=c.panel('');pn.style.width='min(62%,420px)';const draw=()=>{let s='';for(let y=0;y<M;y++)for(let x=0;x<N;x++)s+=`<rect x="${x*42+4}" y="${y*42+4}" width="38" height="38" rx="6" fill="#14505E"/>`;const[sx,sy]=star,[rx,ry2]=pos;pn.innerHTML=`<svg viewBox="0 0 218 176">${s}<path transform="translate(${sx*42+7} ${sy*42+7}) scale(.5)" d="M32 3C35 20 44 29 61 32 44 35 35 44 32 61 29 44 20 35 3 32 20 29 29 20 32 3Z" fill="#FFD23F"/><g transform="translate(${rx*42+23} ${ry2*42+23}) rotate(${dir*90})"><rect x="-14" y="-14" width="28" height="28" rx="6" fill="#59B7FF"/><circle cx="-6" cy="-5" r="3.2" fill="#08283F"/><circle cx="6" cy="-5" r="3.2" fill="#08283F"/><path d="M-6 -14l6-9 6 9z" fill="#FFD23F"/></g></svg><p>${prog.map(p=>({f:'↑',l:'↶',r:'↷'}[p])).join(' ')||'Ułóż polecenia'}</p>`};draw();
 const r=c.row();const add=k=>{if(busy||prog.length>=10)return;prog.push(k);Snd.klik();draw()};c.btn(r,'↑ Idź','',()=>add('f'));c.btn(r,'↶ Lewo','',()=>add('l'));c.btn(r,'↷ Prawo','',()=>add('r'));c.btn(r,'Start','sp',async()=>{if(busy)return;busy=true;reset();draw();const tok=c.alive;for(const k of prog){await c.wait(520);if(!c.ok(tok))return;if(k==='f'){const d=[[0,-1],[1,0],[0,1],[-1,0]][dir];pos=[clamp(pos[0]+d[0],0,N-1),clamp(pos[1]+d[1],0,M-1)]}else dir=(dir+(k==='r'?1:3))%4;Snd.pyk();draw()}busy=false;if(pos[0]===star[0]&&pos[1]===star[1]){Snd.dobrze();burst(innerWidth/2,innerHeight/2,24);c.talk('Brawo! Robot zrobił dokładnie to, co kazałeś.')}else c.talk('Robot zrobił to, co kazałeś, ale gwiazdka dalej. Popraw listę.');prog=[]});c.btn(r,'Wyczyść','',()=>{prog=[];reset();draw()})}

LS({n:18,w:3,t:'Skrzyżowanie',scene:'board',view:ARV,pre:Object.keys(ARDP),parts:ARDP,steps:[
 {s:'Płytka zostaje. Tata wgrywa nowy program. Czerwone stoi, zielone jedzie.',live:c=>traffic(c)}
]});
function traffic(c){const w=c.w,pn=c.panel(`<svg viewBox="0 0 240 150"><rect y="86" width="240" height="44" fill="#333A3F"/><path d="M0 108h240" stroke="#F4F2EA" stroke-width="3" stroke-dasharray="14 12"/><rect x="150" y="86" width="16" height="44" fill="#F4F2EA"/><rect x="174" y="10" width="26" height="66" rx="5" fill="#1B1E21"/><circle id="tr" cx="187" cy="24" r="8" fill="#422"/><circle id="ty" cx="187" cy="43" r="8" fill="#432"/><circle id="tg" cx="187" cy="62" r="8" fill="#243"/><g id="car"><rect x="-44" y="-20" width="58" height="22" rx="7" fill="#59B7FF"/><rect x="-34" y="-34" width="34" height="18" rx="6" fill="#9AD2FF"/><circle cx="-30" cy="3" r="7" fill="#111"/><circle cx="2" cy="3" r="7" fill="#111"/></g></svg>`);let x=-40;
 w.program('AR',gTraffic);w.onpress=(id,on)=>{if(id==='S2'&&on)c.talk('Pieszy nacisnął. Zielone zaraz się skończy.')};c.unbind.push(()=>{w.onpress=null});HB(c,c.row(),'S2','Pieszy','r');
 c.onTick(dt=>{const r=w.led('D9')>.2,y=w.led('D10')>.2,g=w.led('D11')>.2;$('#tr',pn).setAttribute('fill',r?'#FF4B3E':'#422');$('#ty',pn).setAttribute('fill',y?'#FFD23F':'#432');$('#tg',pn).setAttribute('fill',g?'#37E283':'#243');const go=g||x>150||x<100;if(go){x+=dt*70;if(x>290)x=-40}$('#car',pn).setAttribute('transform',`translate(${x} 104)`)})}

LS({n:19,w:3,t:'Leon programuje',scene:'board',view:ARV,pre:Object.keys(ARDP),parts:ARDP,steps:[
 {s:'Naciskaj kolory po kolei, a potem Start. To Twój program!',live:c=>{const pn=c.panel('','Twój program'),Z={prog:[],played:false,cur:-1},COL=['#FF4B3E','#FFD23F','#37E283'];const draw=()=>{let s='';Z.prog.forEach((k,i)=>{const x=i%6,y=Math.floor(i/6),on=i===Z.cur;s+=`<circle cx="${x*32+24}" cy="${y*32+22}" r="${on?15:12}" fill="${COL[k]}" stroke="#fff" stroke-width="${on?3:0}"/>`});pn.innerHTML=`<svg viewBox="0 0 208 ${Math.max(44,Math.ceil(Z.prog.length/6)*32+12)}">${s}</svg><p>${Z.prog.length?Z.prog.length+' kroków':'Naciśnij kolor'}</p>`};draw();c.w.program('AR',m=>gLeon(m,Z),t=>{draw();if(t==='done')Snd.dobrze()});const r=pads(c);HB(c,r,'S5','Start','sp')}}
]});

LS({n:20,w:3,t:'Gra w pamięć',scene:'board',view:ARV,pre:Object.keys(ARDP),parts:ARDP,steps:[
 {s:'Patrz na kolory i powtórz je. Co runda jeden więcej.',live:c=>{const pn=c.panel(`<svg viewBox="0 0 200 54"><text id="lv" x="100" y="40" text-anchor="middle" font-size="34" font-weight="800" fill="#FFD23F" font-family="Baloo 2,sans-serif"></text></svg>`,'kolorów');c.w.program('AR',gMem,(t,v)=>{if(t==='len')$('#lv',pn).textContent=v;else if(t==='zap')Snd.tone(330+v[0]*150,v[1]/1000*.7,'triangle',.1);else if(t==='turn')c.talk('Teraz Ty!');else if(t==='good'){Snd.dobrze();c.talk('Brawo! Jeszcze jeden kolor.')}else if(t==='bad'){Snd.zle();c.talk('Pomyłka. Doszliśmy do '+v+'. Jeszcze raz?',null,'Pomyłka. Jeszcze raz?')}});const r=pads(c);HB(c,r,'S5','Start','sp')}}
]});

const SERWO={...ARDP,V:W('A:5V','B+46','r',0),SV:{k:'servo',h:['A:D6','B+48','B-48'],x:1040,y:-150},CS:{k:'cap',h:['B+50','B-50'],v:'100µ'}};
LS({n:21,w:3,t:'Szlaban',scene:'board',view:[-14,-290,1314,720],pre:Object.keys(ARDP),parts:SERWO,steps:[
 {s:'Pin 5V idzie do dolnej szyny plus.',put:['V'],nozoom:true},
 {s:'Serwo ma trzy kable: sygnał, plus i minus.',put:['SV','CS'],nozoom:true},
 {s:'Do serwa przyklejamy patyczek po lodach. Naciśnij czerwony przycisk.',live:c=>{c.w.program('AR',gGate);HB(c,c.row(),'S2','Otwórz','r')}}
]});

/* blok 5 */
const PIP={PI:{k:'pi',h:[]},W9:W('P:9','-16','k',0),W13:W('P:13','a2','y',0),R:R('b2','b6','330'),D:LD('d6','d7','r','Dioda czerwona'),K:W('a7','-7','k'),W11:W('P:11','a10','b',0),S:BT(10,12),H:W('h12','-12','k')};
PIP.SP={k:'usb',t:'Głośnik',lab:'HDMI, USB albo Bluetooth',x:640,y:470,svg:(x,y)=>`<rect x="${x}" y="${y}" width="120" height="170" rx="14" fill="#23272B" stroke="#000"/><circle cx="${x+60}" cy="${y+100}" r="42" fill="#3D4349" stroke="#111" stroke-width="3"/><circle cx="${x+60}" cy="${y+100}" r="14" fill="#6E757B"/><circle cx="${x+60}" cy="${y+36}" r="15" fill="#3D4349"/>`};
PIP.MI={k:'usb',t:'Mikrofon USB',lab:'mikrofon do portu USB',x:640,y:660,svg:(x,y)=>`<rect x="${x+42}" y="${y}" width="36" height="66" rx="18" fill="#C9CFD4" stroke="#6E757B" stroke-width="2"/><path d="M${x+30} ${y+44}a30 30 0 0 0 60 0M${x+60} ${y+74}v22" fill="none" stroke="#C9CFD4" stroke-width="5"/>`};
const PIV=[-10,-10,830,780];
LS({n:22,w:4,t:'Gadający przycisk',scene:'board',view:PIV,parts:PIP,steps:[
 {s:'To Raspberry Pi. Mały komputer.',put:['PI'],nozoom:true},
 {s:'Czarny kabel z pinu dziewięć do minusa.',put:['W9'],nozoom:true},
 {s:'Żółty kabel z pinu trzynaście, rezystor i dioda.',put:['W13','R','D','K'],nozoom:true,slow:600},
 {s:'Niebieski kabel z pinu jedenaście do przycisku.',put:['W11','S','H'],nozoom:true,slow:600},
 {s:'Mikrofon i głośnik.',put:['SP','MI'],nozoom:true},
 {s:'Leon, powiedz coś do mikrofonu. Tata nagrywa.',ch:['arecord -f S16_LE -r 44100 -c 1 -d 3 ~/leon.wav'],live:c=>{if(!Mic.ok())return;const r=c.row();c.btn(r,'Nagraj','sp',async b=>{if(b.disabled)return;b.disabled=true;Voice.stop();b.textContent='Mów!';try{await Mic.record(3000,m=>{b.style.transform=`scale(${1+Math.min(.5,m)})`});b.style.transform='';b.textContent='Jeszcze raz';Snd.dobrze();await Mic.play()}catch(e){b.style.transform='';b.textContent='Pozwól na mikrofon'}b.disabled=false})}},
 {s:'Naciśnij przycisk. Pi odda Twój głos.',live:c=>{c.w.program('PI',gPi22,async t=>{if(t!=='play')return;const wave=S('g',{},c.p.lyTop);for(let i=0;i<3;i++)S('circle',{cx:700,cy:570,r:50+i*24,fill:'none',stroke:'#FFD23F','stroke-width':4,opacity:.8-i*.25},wave);if(!(await Mic.play()))await Voice.say('Cześć, tu Leon!');wave.remove()});HB(c,c.row(),'S','Naciśnij','sp');c.p.sub(Mic.rec?'Naciśnij przycisk. To Twój głos!':'Naciśnij przycisk. Na prawdziwym Pi usłyszysz swój głos.')}}
]});
LS({n:23,w:4,t:'Lampka na głos',scene:'board',view:PIV,pre:Object.keys(PIP),parts:PIP,steps:[
 {s:'Płytka zostaje. Tata uruchamia program, który rozumie dwa słowa.'},
 {s:'Powiedz do mikrofonu: zapal. Albo: zgaś.',live:c=>{const r=c.row();c.w.program('PI',gPi23);const wv=async(t,v,cicho)=>{Snd.pyk();c.p.sub('Komputer usłyszał: '+t);if(!cicho)Voice.say(t);const w=S('g',{},c.p.lyTop);for(let i=0;i<3;i++){const e=S('circle',{cx:700,cy:700,r:30+i*20,fill:'none',stroke:'#59B7FF','stroke-width':4,opacity:.8-i*.25},w)}await c.wait(500);w.remove();c.w.st('PI').o[13]=v};c.btn(r,'zapal','sp',()=>wv('zapal',1));c.btn(r,'zgaś','',()=>wv('zgaś',0));if(Mic.ok()){const tok=c.alive,m=c.btn(r,'Mikrofon','b',async()=>{if(m.disabled)return;m.disabled=true;Voice.stop();m.textContent='Ładuję słowa…';try{await Ear.start(t=>{if(/zapal/.test(t))wv('zapal',1,true);else if(/zgaś/.test(t))wv('zgaś',0,true)});if(c.ok(tok)){m.textContent='Słucham';c.unbind.push(()=>Ear.stop())}else Ear.stop()}catch(e){m.textContent='Bez mikrofonu'}})}}},
 {s:'Działa bez internetu. Komputer nauczył się słów z wielu nagrań. To koniec kursu, Leon!'}
]});
