// Porównanie solvera z ngspice na układach z kursu
const {execSync}=require('child_process'),fs=require('fs');
global.clamp=(v,a,b)=>v<a?a:v>b?b:v;
const {Sim,eRes,eSw,eBat,eCap,eLed,eDiode,eNpn,eRelay,e555,e4026,ePhoto}=require('./src/sim.js');
const MOD=fs.readFileSync('../sp/models.inc','utf8');
const spice=(txt)=>{fs.writeFileSync('/tmp/claude-0/x.cir','* t\n'+MOD+txt+'\n.end\n');return execSync('ngspice -b /tmp/claude-0/x.cir 2>&1',{encoding:'utf8'})};
const vb=(S,a,b,V=9,R=.001)=>S.add(eBat(a,b,V,R));
const num=(o,re)=>{const m=o.match(re);return m?+m[1]:NaN};
const line=(t,a,b)=>console.log(t.padEnd(42),String(a).padEnd(14),String(b).padEnd(14),isFinite(a)&&isFinite(b)?((a-b)/b*100).toFixed(1)+'%':'');
console.log('test'.padEnd(42),'JS'.padEnd(14),'ngspice');

// 1. LED z rezystorem
for(const [R,name] of [[1000,'1k'],[470,'470'],[47000,'47k']]){const S=new Sim();const p=S.node('p'),a=S.node('a');vb(S,p,0);S.add(eRes(p,a,R));const st={};S.add(eLed(a,0,'r',st));S.ready();S.settle(5);
 const o=spice(`V1 p 0 9\nR1 p a ${R}\nD1 a 0 LEDR\n.op\n.print op v(a)\n.control\nop\nprint v(a)\nprint i(v1)\n.endc`);line('LED + R '+name+' napiecie V',+S.x[a].toFixed(3),+num(o,/v\(a\) = ([\d.e+-]+)/).toFixed(3))}
// 2. L11 gasniecie
{const S=new Sim();const x=S.node('x'),a=S.node('a');const c={v:9};S.add(eCap(x,0,100e-6,c,.0001));S.add(eRes(x,a,1e4));const st={};S.add(eLed(a,0,'r',st));S.ready();let t50=0,t20=0;for(let i=0;i<14000;i++){S.step(.001);if(!t50&&st.i<50e-6)t50=S.t;if(!t20&&st.i<20e-6)t20=S.t}
 const o=spice(fs.readFileSync('../sp/l11_100u.cir','utf8').split('\n').filter(l=>!/^\*|\.include|\.end$/.test(l)).join('\n'));line('L11 t do 50 uA s',+t50.toFixed(2),+num(o,/t50\s*=\s*([\d.e+-]+)/).toFixed(2));line('L11 t do 20 uA s',+t20.toFixed(2),+num(o,/t20\s*=\s*([\d.e+-]+)/).toFixed(2))}
// 3. L12 Darlington
for(const rf of [5e5,2e6,5e6,7e6,1e7]){const S=new Sim();const n=s=>S.node(s),p=n('p'),a=n('a'),c=n('c'),qb=n('qb'),e1=n('e1'),t=n('t');vb(S,p,0);S.add(eRes(p,a,1e3));const st={};S.add(eLed(a,c,'r',st));S.add(eNpn(c,qb,e1,{}));S.add(eNpn(c,e1,0,{}));S.add(eRes(qb,t,1e3));S.add(eRes(t,0,1e6));S.add(eRes(p,t,rf));S.ready();S.settle(30);
 const o=spice(`V1 p 0 9\nRL p a 1k\nV2 a b 0\nD1 b c LEDR\nQ1 c qb e1 Q2N3904\nQ2 c e1 0 Q2N3904\nRB qb t 1k\nRP t 0 1MEG\nRf p t ${rf}\n.control\nop\nprint i(v2)\n.endc`);line('L12 palec '+rf/1e6+' MOhm LED mA',+(st.i*1e3).toFixed(3),+(num(o,/i\(v2\) = ([\d.e+-]+)/)*1e3).toFixed(3))}
// 4. L15 przerzutnik
{const S=new Sim();const n=s=>S.node(s),p=n('p'),c1=n('c1'),c2=n('c2'),b1=n('b1'),b2=n('b2'),a1=n('a1'),a2=n('a2');vb(S,p,0);S.add(eRes(p,a1,470));S.add(eRes(p,a2,470));const L1={},L2={};S.add(eLed(a1,c1,'r',L1));S.add(eLed(a2,c2,'g',L2));S.add(eRes(p,b1,47e3));S.add(eRes(p,b2,47e3));S.add(eCap(c1,b2,10e-6,{v:.25}));S.add(eCap(c2,b1,10e-6,{v:-.1}));S.add(eNpn(c1,b1,0,{bk:1.1}));S.add(eNpn(c2,b2,0,{bk:.95}));S.ready();let last=0,on=0,ed=[];for(let i=0;i<6000;i++){S.step(.001);const v=L1.i>2e-3?1:0;if(v&&!on){ed.push(S.t)}on=v}
 const T=ed.length>2?ed[ed.length-1]-ed[ed.length-2]:NaN;
 const o=spice(`V1 p 0 9\nR1 p a1 470\nR2 p a2 470\nD1 a1 c1 LEDR\nD2 a2 c2 LEDR\nRb1 p b1 47k\nRb2 p b2 47k\nC1 c1 b2 10u\nC2 c2 b1 10u IC=0.2\nQ1 c1 b1 0 Q2N3904\nQ2 c2 b2 0 Q2N3904\n.control\ntran 0.5m 6 UIC\nmeas tran t1 when v(c1)=4 rise=4\nmeas tran t2 when v(c1)=4 rise=5\nprint t2-t1\n.endc`);line('L15 okres s',+T.toFixed(3),+num(o,/t2-t1 = ([\d.e+-]+)/).toFixed(3))}
// 5. 555
{const S=new Sim();const n=s=>S.node(s),p=n('p'),d=n('d'),t=n('t'),o=n('o'),ct=n('ct');vb(S,p,0);S.add(eRes(p,d,1e3));S.add(eRes(d,t,2200));S.add(eCap(t,0,10e-6,{}));const u=e555(S,'u',0,t,o,p,ct,t,d,p,{});u.els.forEach(e=>S.add(e));S.add(u);S.add(eRes(o,0,1e4));S.ready();let was=0,ed=[];for(let i=0;i<2000;i++){S.step(.0002);const v=S.x[o]>4?1:0;if(v&&!was)ed.push(S.t);was=v}const T=(ed[ed.length-1]-ed[1])/(ed.length-2);line('NE555 Hz (dt .2 ms) vs wzor',+(1/T).toFixed(1),+(1.44/((1e3+4400)*10e-6)).toFixed(1));
 const S2=new Sim(),m=s=>S2.node(s),p2=m('p'),d2=m('d'),t2=m('t'),o2=m('o'),c2=m('ct');vb(S2,p2,0);S2.add(eRes(p2,d2,1e3));S2.add(eRes(d2,t2,2200));S2.add(eCap(t2,0,10e-6,{}));const u2=e555(S2,'u',0,t2,o2,p2,c2,t2,d2,p2,{});u2.els.forEach(e=>S2.add(e));S2.add(u2);S2.ready();was=0;ed=[];for(let i=0;i<2000;i++){S2.step(.001);const v=S2.x[o2]>4?1:0;if(v&&!was)ed.push(S2.t);was=v}const T2=(ed[ed.length-1]-ed[1])/(ed.length-2);line('NE555 Hz (dt 1 ms) vs wzor',+(1/T2).toFixed(1),26.7)}
// 6. dioda odwrotnie, spalenie, zwarcie
{const S=new Sim();const p=S.node('p'),a=S.node('a');vb(S,p,0,9,1.7);S.add(eRes(p,a,1000));const st={};S.add(eLed(0,a,'r',st));S.ready();S.settle(10);console.log('LED odwrotnie I A',st.i.toExponential(2),'spalona',!!st.burnt);
 const S2=new Sim();const p2=S2.node('p');const b={};S2.add(eBat(p2,0,9,1.7,b));const s2={};S2.add(eLed(p2,0,'r',s2));S2.ready();let t=0;while(!s2.burnt&&t<1){S2.step(.001);t+=.001}console.log('LED bez rezystora na 9 V: pali sie po ms',(t*1e3).toFixed(0),'prad bylby A',(s2.heat,b.i).toFixed(3));
 const S3=new Sim();const p3=S3.node('p');const b3={};S3.add(eBat(p3,0,9,1.7,b3));S3.add(eRes(p3,0,.05));S3.ready();S3.settle(600);console.log('zwarcie A',b3.i.toFixed(2),'ev',S3.ev.length)}
// 7. przekaźnik
{const S=new Sim();const p=S.node('p'),c=S.node('c'),no=S.node('no'),nc=S.node('nc'),x=S.node('x'),y=S.node('y');vb(S,p,0);const sw={on:0};S.add(eSw(p,c,sw));const st={},r=eRelay(c,0,st,S,p,nc,no,x,x,y);r.els.forEach(e=>S.add(e));S.add(r);S.add(eDiode(0,c,{}));const G={},R={};S.add(eRes(no,S.node('n1'),1e3));S.add(eLed(S.node('n1'),0,'r',R));S.add(eRes(nc,S.node('n2'),1e3));S.add(eLed(S.node('n2'),0,'g',G));S.ready();S.settle(20);const a=G.i;sw.on=1;S.settle(40);const b=R.i;sw.on=0;S.settle(60);console.log('przekaznik NC mA',(a*1e3).toFixed(1),'NO mA',(b*1e3).toFixed(1),'po puszczeniu NC mA',(G.i*1e3).toFixed(1),'bledy',S.fail)}
