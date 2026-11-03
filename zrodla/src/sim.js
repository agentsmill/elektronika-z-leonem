/* symulator obwodu: analiza węzłowa, Newton dla elementów nieliniowych, Euler wsteczny w czasie */
const VT=.02585,GMIN=1e-10;
const omega=x=>{if(x<-30)return Math.exp(x);let w=x>1?x-Math.log(x):Math.exp(x)/(1+Math.exp(x)*.6);for(let i=0;i<7;i++){w=w*(1+x-Math.log(w))/(1+w);if(!(w>0)){w=1e-30;break}}return w};
/* dioda z rezystancją szeregową, postać zamknięta: nie trzeba dodatkowego węzła */
const diodeIV=(v,Is,a,Rs)=>{const x=Math.log(Is*Rs/a)+(v+Is*Rs)/a,w=omega(x),I=a/Rs*w-Is;return[I,1/(Rs+a/(I+Is+1e-30))+GMIN]};
const pnj=(v,o,vt,vc)=>{if(v>vc&&Math.abs(v-o)>2*vt){if(o>0){const k=1+(v-o)/vt;v=k>0?o+vt*Math.log(k):vc}else v=vt*Math.log(v/vt)}return v};

/* modele z kart katalogowych i z models.inc */
const LEDM={r:{Is:1e-20,n:1.75,Rs:4},y:{Is:1e-20,n:1.82,Rs:6},g:{Is:1e-20,n:1.95,Rs:8}};
const D1N4001={Is:1.4e-8,n:1.7,Rs:.04};
const Q3904={Is:6.734e-15,Bf:416,Br:.7371,Ise:6.59e-15,Ne:1.259};

class Sim{
 constructor(){this.names=new Map();this.n=1;this.els=[];this.t=0;this.dt=.001;this.x=null;this.ev=[];this.fail=0}
 node(s){let i=this.names.get(s);if(i==null){i=this.n++;this.names.set(s,i)}return i}
 add(e){this.els.push(e);return e}
 ready(){const n=this.n;if(!this.x||this.x.length!==n)this.x=new Float64Array(n);this.A=new Float64Array(n*n);this.b=new Float64Array(n);this.w=new Float64Array(n);this.pv=new Int32Array(n)}
 g(a,b,v){const A=this.A,n=this.n;A[a*n+a]+=v;A[b*n+b]+=v;A[a*n+b]-=v;A[b*n+a]-=v}
 i(a,b,v){this.b[a]-=v;this.b[b]+=v}
 /* gałąź y o prądzie sterowanym: wiersz r, kolumna c */
 m(r,c,v){this.A[r*this.n+c]+=v}
 solve(){const n=this.n,A=this.A,b=this.b;
  for(let i=1;i<n;i++)A[i*n+i]+=1e-11;
  for(let k=1;k<n;k++){let p=k,mx=Math.abs(A[k*n+k]);for(let r=k+1;r<n;r++){const v=Math.abs(A[r*n+k]);if(v>mx){mx=v;p=r}}if(mx<1e-18)continue;
   if(p!==k){for(let c=k;c<n;c++){const t=A[k*n+c];A[k*n+c]=A[p*n+c];A[p*n+c]=t}const t=b[k];b[k]=b[p];b[p]=t}
   const d=A[k*n+k];for(let r=k+1;r<n;r++){const f=A[r*n+k]/d;if(f===0)continue;for(let c=k+1;c<n;c++)A[r*n+c]-=f*A[k*n+c];b[r]-=f*b[k]}}
  const w=this.w;for(let k=n-1;k>=1;k--){let s=b[k];for(let c=k+1;c<n;c++)s-=A[k*n+c]*w[c];const d=A[k*n+k];w[k]=Math.abs(d)<1e-18?0:s/d}w[0]=0}
 iterate(dt){const n=this.n,x=this.x;let conv=false;for(let it=0;it<80&&!conv;it++){this.lim=0;this.A.fill(0);this.b.fill(0);for(const e of this.els)e.stamp(this,x,dt);this.solve();const w=this.w;let mx=0;for(let i=1;i<n;i++){let d=w[i]-x[i];const ad=Math.abs(d);if(ad>mx)mx=ad;if(ad>3)d=Math.sign(d)*3;x[i]+=d}conv=mx<2e-6&&!this.lim}if(!conv)this.fail++;return conv}
 step(dt=this.dt,d=0){const ok=this.iterate(dt);if(!ok&&d<3){for(let i=0;i<4;i++)this.step(dt/4,d+1);return}this.ok=ok;for(const e of this.els)e.commit&&e.commit(this,this.x,dt);this.t+=dt}
 /* stan ustalony po zmianie układu */
 settle(n=30,dt=.001){for(let i=0;i<n;i++)this.step(dt)}
 v(s){const i=this.names.get(s);return i==null?0:this.x[i]}
}

/* elementy: a,b to numery węzłów, cur(x) to prąd od a do b */
const eRes=(a,b,r)=>{const g=1/r;return{a,b,r,stamp(S){S.g(a,b,g)},cur:x=>(x[a]-x[b])*g}};
const eSw=(a,b,st,ron=.05)=>{const off=1e-10,on=1/ron,G=()=>st.on?on:off;return{a,b,st,stamp(S){S.g(a,b,G())},cur:x=>(x[a]-x[b])*G()}};
const eBat=(a,b,V,R,st={})=>{const g=1/R;return{a,b,st,stamp(S){S.g(a,b,g);S.i(b,a,V*g)},commit(S,x,dt){const I=(x[a]-x[b]-V)*-g;st.i=I;st.heat=clamp((st.heat||0)+(Math.abs(I)>1.2?dt*2:-dt*.5),0,2);if(st.heat>.5&&!st.short){st.short=1;S.ev.push(['short',st])}if(st.heat<=0)st.short=0},cur:x=>(x[a]-x[b]-V)*g}};
const eCap=(a,b,C,st,esr=.3)=>{st.v=st.v||0;const G=dt=>1/(esr+dt/C);return{a,b,st,stamp(S,x,dt){const g=G(dt);S.g(a,b,g);S.i(a,b,-g*st.v)},commit(S,x,dt){const g=G(dt),i=g*(x[a]-x[b]-st.v);st.i=i;st.v+=i*dt/C},cur:()=>st.i||0}};
const eCoil=(a,b,R,L,st)=>{st.i=st.i||0;return{a,b,st,stamp(S,x,dt){const z=R+L/dt,g=1/z;S.g(a,b,g);S.i(a,b,g*L/dt*st.i)},commit(S,x,dt){const z=R+L/dt;st.i=((x[a]-x[b])+L/dt*st.i)/z},cur:()=>st.i}};
const eLed=(a,k,c,st)=>{const M=LEDM[c]||LEDM.r,nv=M.n*VT;st.i=st.i||0;return{a,b:k,st,stamp(S,x){if(st.burnt){S.g(a,k,GMIN);return}const v=x[a]-x[k],[I,g]=diodeIV(v,M.Is,nv,M.Rs);S.g(a,k,g);S.i(a,k,I-g*v)},commit(S,x,dt){if(st.burnt){st.i=0;return}const v=x[a]-x[k],[I]=diodeIV(v,M.Is,nv,M.Rs);st.i=I;st.v=v;const o=I/.05;if(S.ok)st.heat=Math.max(0,(st.heat||0)+dt*(o*o-1));if(st.heat>1){st.burnt=1;st.i=0;S.ev.push(['burn',st])}},cur:()=>st.i}};
const eDiode=(a,k,st)=>{const M=D1N4001,nv=M.n*VT;st.i=0;return{a,b:k,st,stamp(S,x){const v=x[a]-x[k],[I,g]=diodeIV(v,M.Is,nv,M.Rs);S.g(a,k,g);S.i(a,k,I-g*v)},commit(S,x){st.i=diodeIV(x[a]-x[k],M.Is,nv,M.Rs)[0]},cur:()=>st.i}};
const ePhoto=(c,e,st)=>{const IV=v=>{const l=(st.il||0)+1e-9;if(v>=0){const k=Math.exp(-v/.12);return[l*(1-k),l*k/.12+GMIN]}return[v*1e-9,1e-9]};return{a:c,b:e,st,stamp(S,x){const v=x[c]-x[e],[I,g]=IV(v);S.g(c,e,g);S.i(c,e,I-g*v)},commit(S,x){st.i=IV(x[c]-x[e])[0]},cur:()=>st.i||0}};
const eNpn=(c,b,e,st,M=Q3904)=>{st.vbe=st.vbe||0;st.vbc=st.vbc||0;const Bf=M.Bf*(st.bk||1),Br=M.Br,Is=M.Is,vc=VT*Math.log(VT/(1.414*Is));
 const Ise=M.Ise,nv=M.Ne*VT;const ev=(vbe,vbc)=>{const ef=Math.exp(Math.min(vbe/VT,48)),er=Math.exp(Math.min(vbc/VT,48)),el=Math.exp(Math.min(vbe/nv,48)),If=Is*(ef-1),Ir=Is*(er-1);return{If,Ir,gf:Is/VT*ef+GMIN,gr:Is/VT*er+GMIN,Il:Ise*(el-1),gl:Ise/nv*el}};
 return{c,b,e,st,stamp(S,x){if(st.burnt){S.g(c,e,GMIN);return}const vbe=pnj(x[b]-x[e],st.vbe,VT,vc),vbc=pnj(x[b]-x[c],st.vbc,VT,vc);if(Math.abs(vbe-x[b]+x[e])>1e-6||Math.abs(vbc-x[b]+x[c])>1e-6)S.lim=1;st.vbe=vbe;st.vbc=vbc;const{If,Ir,gf,gr,Il,gl}=ev(vbe,vbc),k=1+1/Br,Ic=If-Ir*k,Ib=If/Bf+Ir/Br+Il,gcr=gr*k,gbf=gf/Bf+gl,gbr=gr/Br,ieqc=Ic-gf*vbe+gcr*vbc,ieqb=Ib-gbf*vbe-gbr*vbc;
   S.m(c,b,gf-gcr);S.m(c,e,-gf);S.m(c,c,gcr);S.b[c]-=ieqc;
   S.m(b,b,gbf+gbr);S.m(b,e,-gbf);S.m(b,c,-gbr);S.b[b]-=ieqb;
   S.m(e,b,-gf+gcr-gbf-gbr);S.m(e,e,gf+gbf);S.m(e,c,-gcr+gbr);S.b[e]+=ieqc+ieqb},
  commit(S,x,dt){if(st.burnt){st.ic=st.ib=0;return}const vbe=x[b]-x[e],vbc=x[b]-x[c],{If,Ir,Il}=ev(vbe,vbc),k=1+1/Br;st.ic=If-Ir*k;st.ib=If/Bf+Ir/Br+Il;const P=Math.abs(st.ic*(x[c]-x[e]));if(S.ok)st.heat=Math.max(0,(st.heat||0)+dt*(P/.6-1));if(st.heat>1){st.burnt=1;S.ev.push(['burn',st])}}}};

/* przekaźnik G5V-2: cewka i dwa przełączniki, opóźnienia z karty katalogowej */
const eRelay=(c1,c2,st,S,com1,nc1,no1,com2,nc2,no2)=>{st.on=st.on||0;st.t=0;const R=540,L=.45,Ipull=6.75/R,Idrop=.9/R,coil=eCoil(c1,c2,R,L,st),sN=[{},{}],sO=[{},{}],els=[coil,eSw(com1,nc1,sN[0]),eSw(com1,no1,sO[0]),eSw(com2,nc2,sN[1]),eSw(com2,no2,sO[1])];const sync=()=>{sN[0].on=sN[1].on=!st.on;sO[0].on=sO[1].on=!!st.on};sync();
 const core={st,els,stamp(){},commit(Sm,x,dt){const i=Math.abs(st.i);if(!st.on){st.t=i>Ipull?st.t+dt:0;if(st.t>=.005){st.on=1;st.t=0;sync();Sm.ev.push(['relay',st])}}else{st.t=i<Idrop?st.t+dt:0;if(st.t>=.003){st.on=0;st.t=0;sync();Sm.ev.push(['relay',st])}}}};return core};

/* NE555: dzielnik, dwa komparatory, zatrzask, wyjście i rozładowanie */
const e555=(S,id,gnd,trg,out,rst,ctl,thr,dis,vcc,st)=>{st.q=st.q||0;const m=S.node(id+':m'),hi=1/25,lo=1/12,dg=1/12;const out_on=()=>st.pw&&st.q,dis_on=()=>st.pw&&!st.q;
 const r=[eRes(vcc,ctl,5e3),eRes(ctl,m,5e3),eRes(m,gnd,5e3),eRes(vcc,gnd,1800)];
 return{els:r,stamp(Sm,x){if(out_on())Sm.g(out,vcc,hi);else if(st.pw)Sm.g(out,gnd,lo);if(dis_on())Sm.g(dis,gnd,dg)},commit(Sm,x){const V=x[vcc]-x[gnd];st.pw=V>3.5;if(!st.pw){st.q=0;return}if(x[rst]-x[gnd]<.8)st.q=0;else if(x[trg]<x[m])st.q=1;else if(x[thr]>x[ctl])st.q=0}}};

/* CD4026: licznik dziesiętny z dekoderem 7 segmentów */
const SEG4026={a:10,b:12,c:13,d:9,e:11,f:6,g:7},DIG='abcdef|bc|abdeg|abcdg|bcfg|acdfg|acdefg|abc|abcdefg|abcdfg'.split('|');
const e4026=(pin,st)=>{st.n=st.n||0;st.clk=st.clk||0;const vss=pin[8],vdd=pin[16],R=350,g=1/R,lo=1/250;return{st,stamp(S,x){const V=x[vdd]-x[vss];if(V<3)return;const de=x[pin[3]]-x[vss]>V/2;for(const k in SEG4026){const p=pin[SEG4026[k]];if(de&&DIG[st.n].includes(k))S.g(p,vdd,g);else S.g(p,vss,lo)}},
 commit(S,x){const V=x[vdd]-x[vss];if(V<3){st.n=0;return}const c=x[pin[1]]-x[vss]>V/2,inh=x[pin[2]]-x[vss]>V/2,rs=x[pin[15]]-x[vss]>V/2;if(rs)st.n=0;else if(c&&!st.clk&&!inh){st.n=(st.n+1)%10;S.ev.push(['count',st])}st.clk=c}}};

/* mikrokontroler: piny jako źródła z rezystancją, program jako generator z delay przez yield */
class Mcu{
 constructor(V,gnd,vcc,pins,prog,st){this.V=V;this.gnd=gnd;this.vcc=vcc;this.p=pins;this.prog=prog;this.st=st;st.m=st.m||{};st.o=st.o||{};st.an=st.an||{};this.t=0;this.x=null;this.cb=null}
 mode(n,m){this.st.m[n]=m}
 write(n,v){this.st.o[n]=v;delete this.st.an[n]}
 servo(n,a){this.st.m[n]='out';this.st.an[n]=5*(.544+a/180*1.856)/20}
 ev(t,v){this.cb&&this.cb(t,v)}
 read(n){const i=this.p[n];if(i==null||!this.x)return 1;return this.x[i]-this.x[this.gnd]>this.V/2?1:0}
 stamp(S,x){this.x=x;const Vcc=this.V;S.g(this.vcc,this.gnd,1/.3);S.i(this.gnd,this.vcc,Vcc/.3);for(const n in this.p){const i=this.p[n],m=this.st.m[n];if(m==='out'){const an=this.st.an[n],g=1/25;S.g(i,this.gnd,g);S.i(this.gnd,i,(an!=null?an:this.st.o[n]?Vcc:0)*g)}else if(m==='pu'){S.g(i,this.vcc,1/35e3)}}}
 commit(S,x,dt){this.x=x;this.t+=dt;const st=this.st;if(!st.gen&&this.prog&&!st.ended){st.gen=this.prog(this);st.wake=this.t}let g=0;while(st.gen&&this.t>=st.wake&&g++<400){const r=st.gen.next();if(r.done){st.gen=null;st.ended=1;break}st.wake=this.t+(r.value||0)/1000}}
}
const pinI=(a,b,g)=>x=>(x[a]-x[b])*g;
if(typeof module!=='undefined')module.exports={Sim,eRes,eSw,eBat,eCap,eCoil,eLed,eDiode,ePhoto,eNpn,eRelay,e555,e4026,Mcu,LEDM};
