'use strict';
/* narzędzia */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const NS='http://www.w3.org/2000/svg';
const S=(t,a={},p)=>{const e=document.createElementNS(NS,t);for(const k in a)if(a[k]!=null)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e};
const H=(t,a={},p,h)=>{const e=document.createElement(t);for(const k in a)if(a[k]!=null)e.setAttribute(k,a[k]);if(h!=null)e.innerHTML=h;if(p)p.appendChild(e);return e};
const clamp=(v,a,b)=>v<a?a:v>b?b:v,lerp=(a,b,t)=>a+(b-a)*t,easeIO=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const Store={k:'elektronika-leon',d:{done:[],voice:true,checks:{}},load(){try{const r=localStorage.getItem(this.k);if(r)Object.assign(this.d,JSON.parse(r))}catch(e){}},save(){try{localStorage.setItem(this.k,JSON.stringify(this.d))}catch(e){}}};
Store.load();

/* dźwięk */
const Snd={ctx:null,init(){if(!this.ctx){try{this.ctx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){return}}if(this.ctx.state==='suspended')this.ctx.resume().catch(()=>{})},
 tone(f,d=.08,type='square',g=.05,w=0){const c=this.ctx;if(!c)return;const t=c.currentTime+w,o=c.createOscillator(),a=c.createGain();o.type=type;o.frequency.value=f;a.gain.setValueAtTime(g,t);a.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(a).connect(c.destination);o.start(t);o.stop(t+d+.02)},
 klik(){this.tone(1900,.025,'square',.12);this.tone(320,.04,'square',.1,.008)},
 pyk(){this.tone(740,.06,'triangle',.14);this.tone(1180,.06,'triangle',.08,.05)},
 dobrze(){[660,880,1175].forEach((f,i)=>this.tone(f,.13,'triangle',.13,i*.09))},
 zle(){this.tone(220,.2,'sawtooth',.06)},
 gwiazda(){[523,659,784,1047,1319].forEach((f,i)=>this.tone(f,.18,'triangle',.13,i*.08))}};

/* głos: nagrania Iskry osadzone w stronie, grane przez WebAudio */
const Voice={cur:null,n:0,
 buf(t){const v=VOICE[t],c=Snd.ctx;if(!v||!c)return Promise.resolve(null);if(SITE)return fetch('voice/'+v).then(r=>r.arrayBuffer()).then(a=>new Promise(ok=>c.decodeAudioData(a,ok,()=>ok(null)))).catch(()=>null);const bin=atob(v),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return new Promise(ok=>c.decodeAudioData(u.buffer,ok,()=>ok(null)))},
 stop(){const k=this.cur;this.cur=null;this.n++;if(k){try{k.src&&k.src.stop()}catch(e){}k.fin()}},
 say(t){this.stop();const isk=$('#iskra'),id=this.n;return new Promise(res=>{let done=false;const fin=()=>{if(done)return;done=true;if(this.cur===me)this.cur=null;if(!this.cur&&isk)isk.classList.remove('talk');res()},me={fin,src:null};this.cur=me;isk&&isk.classList.add('talk');
  const quiet=()=>setTimeout(fin,Math.min(2600,700+t.length*38));
  if(!Store.d.voice){quiet();return}
  if(!VOICE[t]){(window.__miss=window.__miss||[]).push(t);quiet();return}
  Snd.init();const c=Snd.ctx;if(!c){quiet();return}
  const run=c.state==='running';Promise.race([run?null:c.resume().catch(()=>{}),new Promise(r=>setTimeout(r,run?0:300))]).then(()=>this.buf(t)).then(b=>{if(done||id!==this.n)return;if(!b||c.state!=='running'){quiet();return}const s=c.createBufferSource(),g=c.createGain();g.gain.value=1.25;s.buffer=b;s.connect(g).connect(c.destination);s.onended=fin;me.src=s;s.start();setTimeout(fin,b.duration*1000+500)})})}};

const ISKRA=`<svg viewBox="0 0 64 64" aria-hidden="true"><g class="body"><path d="M32 3C35 20 44 29 61 32 44 35 35 44 32 61 29 44 20 35 3 32 20 29 29 20 32 3Z" fill="#FFD23F" stroke="#E2A400" stroke-width="2" stroke-linejoin="round"/><circle cx="26" cy="29" r="3.4" fill="#332500"/><circle cx="38" cy="29" r="3.4" fill="#332500"/><circle cx="27" cy="28" r="1.1" fill="#fff"/><circle cx="39" cy="28" r="1.1" fill="#fff"/><path class="mouth" d="M27 37Q32 41 37 37" fill="#332500" stroke="#332500" stroke-width="1.6" stroke-linecap="round"/></g></svg>`;

/* elektrony: tablica punktów liczona raz, potem tani ruch */
class Flow{
 constructor(parent,d,o={}){this.n=o.n||10;this.r=o.r||5;this.speed=o.speed||120;this.rate=0;this.p=Math.random()*40;
  const pth=S('path',{d,fill:'none'});S('g',{},parent).appendChild(pth);const L=pth.getTotalLength();this.len=L;this.pts=[];const st=Math.max(1,L/1200);for(let s=0;s<=L;s+=st){const q=pth.getPointAtLength(s);this.pts.push([q.x,q.y])}this.st=st;pth.parentNode.remove();
  this.g=S('g',{'pointer-events':'none',opacity:0},parent);this.dots=[];
  for(let i=0;i<this.n;i++){const g=S('g',{},this.g);S('circle',{r:this.r*1.9,fill:'#FFD23F',opacity:.22},g);S('circle',{r:this.r,fill:'#FFD23F',stroke:'#E2A400','stroke-width':this.r>6?1.5:.8},g);if(this.r>=7){S('circle',{cx:-this.r*.34,cy:-this.r*.16,r:this.r*.19,fill:'#332500'},g);S('circle',{cx:this.r*.34,cy:-this.r*.16,r:this.r*.19,fill:'#332500'},g)}this.dots.push(g)}}
 set(r){this.rate=r;this.g.setAttribute('opacity',r>0?1:0)}
 tick(dt){if(this.rate<=0)return;this.p=(this.p+dt*this.speed*this.rate)%this.len;const gap=this.len/this.n;for(let i=0;i<this.n;i++){const s=(this.p+i*gap)%this.len,q=this.pts[Math.min(this.pts.length-1,Math.floor(s/this.st))];this.dots[i].setAttribute('transform',`translate(${q[0].toFixed(1)} ${q[1].toFixed(1)})`)}}
 remove(){this.g.remove()}
}

/* gwiazdki */
function burst(x,y,n=26){if(RM)return;const fx=$('#fx');for(let i=0;i<n;i++){const b=H('i',{class:'sparkbit'},fx);b.style.left=x+'px';b.style.top=y+'px';const a=Math.random()*6.28,d=80+Math.random()*220;const an=b.animate([{transform:'translate(0,0) scale(1.3)',opacity:1},{transform:`translate(${Math.cos(a)*d}px,${Math.sin(a)*d+90}px) rotate(${Math.random()*360}deg) scale(.5)`,opacity:0}],{duration:800+Math.random()*700,easing:'cubic-bezier(.15,.7,.4,1)'});an.onfinish=()=>b.remove()}}

/* kontekst lekcji i odtwarzacz */
const ICON={back:'<svg viewBox="0 0 24 24"><path d="M15 4l-8 8 8 8"/></svg>',next:'<svg viewBox="0 0 24 24"><path d="M5 12h13M12 5l7 7-7 7"/></svg>',again:'<svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 1 0 3-6.2M4 4v5h5"/></svg>',voice:'<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9H4zM17 8a6 6 0 0 1 0 8"/></svg>',map:'<svg viewBox="0 0 24 24"><path d="M4 11l8-7 8 7M6 10v10h12V10"/></svg>',close:'<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',play:'<svg viewBox="0 0 24 24"><path d="M7 4l13 8-13 8z"/></svg>',hand:'<svg viewBox="0 0 24 24"><path d="M8 12V5.5a1.6 1.6 0 0 1 3.2 0V11m0-1V4.2a1.6 1.6 0 0 1 3.2 0V11m0-.5V5.8a1.6 1.6 0 0 1 3.2 0V15c0 4-2.4 6-5.6 6-3 0-4.4-1.2-6-4l-2.2-3.8a1.6 1.6 0 0 1 2.8-1.6L8 14"/></svg>',pause:'<svg viewBox="0 0 24 24"><path d="M8 5v14M16 5v14"/></svg>'};

class Ctx{
 constructor(p){this.p=p;this.alive=0;this.ticks=[];this.timers=[];this.anim=true;this.flows={};this.st={};this.hud=$('#hud')}
 ok(tok){return tok===this.alive}
 wait(ms){if(!this.anim)return Promise.resolve();const t=this.alive;return new Promise(r=>{const id=setTimeout(()=>{if(t===this.alive)r()},RM?Math.min(ms,120):ms);this.timers.push(id)})}
 after(ms,f){const id=setTimeout(f,ms);this.timers.push(id);return id}
 every(ms,f){const id=setInterval(f,ms);this.timers.push(id+'i');this.ivs=(this.ivs||[]);this.ivs.push(id);return id}
 onTick(f){this.ticks.push(f)}
 clearStep(){this.alive++;this.vp=null;this.timers.forEach(i=>{if(typeof i==='number')clearTimeout(i)});this.timers=[];(this.ivs||[]).forEach(clearInterval);this.ivs=[];this.ticks=[];this.hud.innerHTML='';$('#card').hidden=true;(this.unbind||[]).forEach(f=>f());this.unbind=[]}
 cam(b,ms=700){this.p.camTo(b,this.anim?ms:0);return this.wait(ms)}
 say(t,ch){if(!this.anim){this.p.sub(t,ch);return Promise.resolve()}const tok=this.alive;return Promise.resolve(this.vp).then(()=>{if(!this.ok(tok))return;this.p.sub(t,ch);return Voice.say(t)})}
 talk(t,ch,key){this.p.sub(t,ch);return Voice.say(key||t)}
 row(){return H('div',{class:'hudrow'},this.hud)}
 btn(row,label,cls,fn){const b=H('button',{class:'big '+(cls||''),type:'button'},row,label);b.onclick=()=>{Snd.init();fn&&fn(b)};return b}
 hold(row,label,cls,d,u){const b=H('button',{class:'big '+(cls||''),type:'button'},row,label);const dn=e=>{e.preventDefault();Snd.init();try{b.setPointerCapture(e.pointerId)}catch(_){}b.classList.add('on');d()},up=()=>{if(b.classList.contains('on')){b.classList.remove('on');u&&u()}};b.addEventListener('pointerdown',dn);b.addEventListener('pointerup',up);b.addEventListener('pointercancel',up);b.addEventListener('contextmenu',e=>e.preventDefault());return b}
 ask(q,opts){const t=this.alive;return new Promise(res=>{this.say(q);const r=this.row();opts.forEach((o,i)=>this.btn(r,o[0],o[1],()=>{if(t===this.alive){r.remove();res(i)}}))})}
 panel(html,cap,left){const d=H('div',{class:'panel pop'+(left?' left':'')},this.hud,html+(cap?`<p>${cap}</p>`:''));return d}
 range(min,max,val,fn,lab){const d=H('div',{class:'rangebox'},this.hud,`${lab||''}<input id="rng" type="range" min="${min}" max="${max}" value="${val}" aria-label="Pokrętło">`);const i=$('input',d);i.oninput=()=>fn(+i.value);fn(val);return i}
 flow(id,d,o){if(this.flows[id])this.flows[id].remove();const f=new Flow(o&&o.parent||this.p.lyFlow,d,o);this.flows[id]=f;return f}
 flowSet(id,r){this.flows[id]&&this.flows[id].set(r)}
 card(kind,name,val){const c=$('#card');c.hidden=false;c.className='pop';c.innerHTML=(typeof closeup==='function'?closeup(kind,val):'')+`<b>${name}</b>`;void c.offsetWidth}
 cardHide(){$('#card').hidden=true}
 bindTap(el,fn){const f=e=>{e.stopPropagation();Snd.init();fn(e)};el.addEventListener('click',f);el.classList.add('tap');this.unbind.push(()=>{el.removeEventListener('click',f);el.classList.remove('tap')})}
 bindHold(el,d,u){let on=false;const dn=e=>{e.preventDefault();e.stopPropagation();Snd.init();on=true;d()},up=()=>{if(on){on=false;u()}};el.addEventListener('pointerdown',dn);addEventListener('pointerup',up);addEventListener('pointercancel',up);el.classList.add('tap');this.unbind.push(()=>{el.removeEventListener('pointerdown',dn);removeEventListener('pointerup',up);removeEventListener('pointercancel',up);el.classList.remove('tap')})}
}

class Player{
 constructor(){this.stage=$('#stage');this.c=new Ctx(this);this.vb=[0,0,1000,620];this.raf=0;this.last=0;this.loop=this.loop.bind(this);
  $('#next').innerHTML=ICON.next;$('#prev').innerHTML=ICON.back;$('#again').innerHTML=ICON.again;$('#home').innerHTML=ICON.map;$('#mute').innerHTML=ICON.voice;$('#auto').innerHTML=ICON.play;this.auto=false;$('#dclose').innerHTML=ICON.close;
  $('#next').onclick=()=>{Snd.init();this.next()};$('#prev').onclick=()=>{Snd.init();this.go(this.i-1,false)};$('#again').onclick=()=>{Snd.init();this.go(this.i,true)};$('#home').onclick=()=>{location.hash='';};
  const m=$('#mute');const sm=()=>m.classList.toggle('off',!Store.d.voice);sm();m.onclick=()=>{Store.d.voice=!Store.d.voice;Store.save();sm();if(!Store.d.voice)Voice.stop()};
  const au=$('#auto');au.onclick=()=>{Snd.init();this.auto=!this.auto;au.classList.toggle('on',this.auto);au.innerHTML=this.auto?ICON.pause:ICON.play;au.setAttribute('aria-label',this.auto?'Zatrzymaj':'Oglądaj samo');au.setAttribute('aria-pressed',this.auto);if(this.auto&&!this.L.steps[this.i].live)this.go(this.i,true)};
  this.hand=new Hand(this);this.hand.box();$('#hand').innerHTML=ICON.hand;$('#hand').onclick=()=>{Snd.init();if(this.c.desk)return;this.hand.set(!this.hand.on);if(this.hand.on)Voice.say('Chwyć nóżkę albo kabel i przenieś go w inne miejsce.')};
  $('#tata').onclick=()=>openDrawer(this.L?this.L.n:0)}
 open(L){this.L=L;$('#map').hidden=true;$('#lesson').hidden=false;$('#ltitle').textContent=L.n?`${L.n}. ${L.t}`:L.t;this.i=0;this.go(0,true);if(!this.raf){this.last=performance.now();this.raf=requestAnimationFrame(this.loop)}}
 close(){this.hand.set(false);cancelAnimationFrame(this.raf);this.raf=0;Voice.stop();this.c.clearStep();this.L=null;$('#lesson').hidden=true;$('#map').hidden=false;renderMap()}
 build(){const s=this.stage;s.innerHTML='';const c=this.c;c.flows={};c.st={};this.lyScene=S('g',{},s);this.lyFlow=S('g',{},s);this.lyTop=S('g',{},s);c.b=null;c.desk=null;c.w=null;const L=this.L;if(L.scene==='board'){c.b=new Board(this.lyScene,this.lyFlow,this.lyTop,L);this.vb=L.view?viewOf(L.view):[-170,-40,800,500];c.w=new BoardWorld(c.b,c)}else{this.vb=(L.dv||[0,0,1000,655]).slice();c.desk=new Desk(this.lyScene,this.lyFlow,this.lyTop);c.desk.top=this.lyTop;c.w=new DeskWorld(c.desk,c)}this.camNow(this.vb);$('#hand').hidden=L.scene!=='board';L.setup&&L.setup(c);if(L.pre)L.pre.forEach(id=>c.b.put(id,false))}
 camNow(b){this.vb=b.slice();this.stage.setAttribute('viewBox',b.join(' '));this.camAnim=null}
 camTo(b,ms){if(!ms||RM){this.camNow(b);return}this.camAnim={a:this.vb.slice(),b,t:0,ms}}
 loop(t){const dt=Math.min(.05,(t-this.last)/1000);this.last=t;const ca=this.camAnim;if(ca){ca.t+=dt*1000;const k=easeIO(clamp(ca.t/ca.ms,0,1));this.vb=ca.a.map((v,i)=>lerp(v,ca.b[i],k));this.stage.setAttribute('viewBox',this.vb.map(v=>v.toFixed(1)).join(' '));if(k>=1)this.camAnim=null}
  const c=this.c;c.w&&c.w.frame(dt);c.ticks.forEach(f=>f(dt));this.raf=requestAnimationFrame(this.loop)}
 sub(t,ch){$('#saytext').textContent=t;const e=$('#chips');e.innerHTML='';(ch||[]).forEach(x=>H('span',{},e).textContent=x)}
 marks(){const e=$('#ticks');e.innerHTML='';this.L.steps.forEach((_,j)=>H('i',{class:j<this.i?'d':j===this.i?'c':''},e))}
 async go(i,anim){const L=this.L,c=this.c;i=clamp(i,0,L.steps.length-1);Voice.stop();c.clearStep();const back=i<=this.i||!this.built||!this.done;this.done=false;this.i=i;this.marks();$('#prev').disabled=i===0;$('#prev').style.visibility=i===0?'hidden':'';
  if(back){this.build();this.built=true;c.anim=false;for(let j=0;j<i;j++){const st=L.steps[j];if(st.put)st.put.forEach(id=>c.b.put(id,false));if(st.take)st.take.forEach(id=>c.b.take(id,false));if(st.run)await st.run(c)}if(st0(L,i))this.camNow(st0(L,i));c.w&&c.w.settle()}
  c.anim=anim;if(c.b)c.b.clearHl();$('#next').classList.remove('wait');const st=L.steps[i],tok=c.alive;this.sub(st.s,st.ch||(st.put&&c.b?st.put.map(id=>c.b.label(id)).filter(Boolean):[]));
  const vp=anim?Voice.say(st.s):null;c.vp=vp;
  if(st.take)st.take.forEach(id=>c.b.take(id,anim));
  if(st.cam)await c.cam(st.cam);
  if(st.put&&c.b){for(const id of st.put){if(!c.ok(tok))return;await c.b.step(c,id,anim,st)}}
  if(!c.ok(tok))return;
  if(st.run)await st.run(c);
  if(!c.ok(tok))return;
  this.done=true;if(this.hand.on)this.hand.sync();
  if(st.live)st.live(c);
  if(anim&&st.back!==false&&L.view&&st.put)c.cam(viewOf(L.view));
  c.after(anim?1200:100,()=>{if(c.ok(tok))$('#next').classList.add('wait')});
  if(this.auto&&anim&&!st.live&&i<L.steps.length-1){await vp;await c.wait(900);if(c.ok(tok))this.next()}}
 next(){const L=this.L;if(this.i<L.steps.length-1){this.go(this.i+1,true);return}finish(L)}
}
const st0=(L,i)=>{for(let j=i-1;j>=0;j--)if(L.steps[j].cam)return L.steps[j].cam;return null};
function viewOf(v){if(v.length===4)return v;const [a,b]=v,x0=a<3?-175:cx(a)-44,x1=cx(b)+44;return[x0,-4,x1-x0,430]}

function finish(L){if(!L.n){location.hash='';return}if(!Store.d.done.includes(L.n)){Store.d.done.push(L.n);Store.save()}Snd.gwiazda();burst(innerWidth/2,innerHeight*.45,46);Voice.say(L.n===23?'Brawo Leon! Cały kurs zrobiony!':'Brawo! Masz gwiazdkę!');if(L.n===23){$('#dip').hidden=false}else setTimeout(()=>{location.hash=''},2600)}

/* szuflada dla taty */
function openDrawer(n){const d=$('#drawer'),b=$('#dbody');const key=n?String(n):'0';$('#dtitle').textContent=n?`Lekcja ${n}: dla taty`:'Dla taty';b.innerHTML=DAD[key]||'';
 $$('pre',b).forEach(p=>{const w=H('div',{class:'cw'});p.parentNode.insertBefore(w,p);w.appendChild(p);const c=H('button',{class:'copy',type:'button'},w,'Kopiuj');c.onclick=()=>{const t=p.textContent;const okk=()=>{c.textContent='Skopiowane';setTimeout(()=>c.textContent='Kopiuj',1400)};if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(t).then(okk,()=>sel(p));else sel(p)}});
 $$('table',b).forEach(t=>{const w=H('div',{class:'tw'});t.parentNode.insertBefore(w,t);w.appendChild(t)});
 $$('li',b).forEach((li,i)=>{const m=li.innerHTML.match(/^(<p>)?\[ \]\s*/);if(m){const id='chk'+key+'-'+i;li.classList.add('task');const rest=li.innerHTML.replace(/^(<p>)?\[ \]\s*/,'').replace(/<\/p>$/,'');li.innerHTML=`<input type="checkbox" id="${id}"><label for="${id}">${rest}</label>`;const c=$('input',li);c.checked=!!Store.d.checks[id];c.onchange=()=>{Store.d.checks[id]=c.checked;Store.save()}}});
 d.hidden=false;b.scrollTop=0}
function sel(p){const r=document.createRange();r.selectNodeContents(p);const s=getSelection();s.removeAllRanges();s.addRange(r)}

/* mapa jako płytka drukowana */
const WORLDS=[{t:'U1 PRĄD BIEGA W KÓŁKO',a:1,b:5,c:'#FF5A4E'},{t:'U2 PŁYTKA',a:6,b:11,c:'#FFC93C'},{t:'U3 UKŁADY SAME DZIAŁAJĄ',a:12,b:16,c:'#3CE08A'},{t:'U4 ARDUINO',a:17,b:21,c:'#59B7FF'},{t:'U5 RASPBERRY PI',a:22,b:23,c:'#FF8BD0'}];
const MW=()=>innerWidth<620?600:1000;
function padPos(){const Wd=MW(),sm=Wd===600,per=sm?3:6,out=[];let y=70,row=0;WORLDS.forEach((w,wi)=>{const ns=[];for(let n=w.a;n<=w.b;n++)ns.push(n);w.y=y-44;for(let i=0;i<ns.length;i+=per){const chunk=ns.slice(i,i+per),m=chunk.length,step=Math.min(sm?180:190,(Wd-120)/Math.max(m-1,1)),wd=step*(m-1),x0=(Wd-wd)/2;chunk.forEach((n,j)=>{const k=row%2?m-1-j:j;out.push({n,x:x0+k*step,y:y+40+(j%2?30:0),w:wi,row})});row++;y+=sm?150:176}y+=sm?44:34});out.H=y+10;return out}
function tracePath(ps,upto){let d='';const Wd=MW();ps.slice(0,upto).forEach((p,i)=>{if(i===0){d=`M${p.x} ${p.y}`;return}const q=ps[i-1];if(q.row===p.row)d+=`L${(p.x+q.x)/2} ${q.y}L${(p.x+q.x)/2} ${p.y}L${p.x} ${p.y}`;else{const ex=q.row%2?20:Wd-20;d+=`L${ex} ${q.y}L${ex} ${p.y}L${p.x} ${p.y}`}});return d}
function renderMap(){const svg=$('#mapsvg'),Wd=MW(),ps=padPos(),done=new Set(Store.d.done);svg.setAttribute('viewBox',`0 0 ${Wd} ${ps.H}`);const d=tracePath(ps,23);let lastDone=0;for(let n=1;n<=23;n++){if(done.has(n))lastDone=n;else break}const dl=lastDone?tracePath(ps,lastDone+1):'';
 let h=`<defs><radialGradient id="padglow"><stop offset=".2" stop-color="#FFD23F" stop-opacity=".55"/><stop offset="1" stop-color="#FFD23F" stop-opacity="0"/></radialGradient></defs><path d="${d}" fill="none" stroke="#000" stroke-opacity=".3" stroke-width="22" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="#9C7426" stroke-width="13" stroke-linejoin="round"/>`;
 if(dl)h+=`<path d="${dl}" fill="none" stroke="#FFD23F" stroke-width="13" stroke-linejoin="round"/>`;
 WORLDS.forEach(w=>{h+=`<text class="silk" x="44" y="${w.y}" font-size="23">${w.t}</text>`});
 const nextN=[...Array(23).keys()].map(i=>i+1).find(n=>!done.has(n));
 ps.forEach(p=>{const L=LESSONS.find(x=>x.n===p.n),isD=done.has(p.n),isN=p.n===nextN,col=WORLDS[p.w].c;
  h+=`<g class="pad" data-n="${p.n}" tabindex="0" role="button" aria-label="Lekcja ${p.n}: ${L?L.t:''}">`;
  if(isD||isN)h+=`<circle cx="${p.x}" cy="${p.y}" r="82" fill="url(#padglow)" ${isN?'class="pulse"':''}/>`;
  h+=`<circle class="ring" cx="${p.x}" cy="${p.y}" r="46" fill="${isD?col:'#E9BC55'}" stroke="#000" stroke-opacity=".3" stroke-width="4"/><circle cx="${p.x}" cy="${p.y}" r="33" fill="${isD?'#fff':'#0B3F35'}" fill-opacity="${isD?.9:1}"/><g transform="translate(${p.x-22} ${p.y-22}) scale(.73)" fill="none" stroke="${isD?'#20302B':'#F2F6EC'}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">${MAPICON[p.n]||''}</g><text x="${p.x+36}" y="${p.y+44}" text-anchor="middle" font-size="24" font-weight="800" fill="#F2F6EC" stroke="#072C26" stroke-width="5" paint-order="stroke">${p.n}</text>`;
  if(isD)h+=`<path transform="translate(${p.x-44} ${p.y-54}) scale(.42)" d="M32 3C35 20 44 29 61 32 44 35 35 44 32 61 29 44 20 35 3 32 20 29 29 20 32 3Z" fill="#FFD23F" stroke="#9C7426" stroke-width="3"/>`;
  h+='</g>'});
 svg.innerHTML=h;
 const go=$('#gonext');const nl=LESSONS.find(x=>x.n===(nextN||1));go.textContent=done.size?`Dalej: ${nl.n}. ${nl.t}`:`Zaczynamy: ${nl.t}`;go.onclick=()=>{Snd.init();location.hash='lekcja-'+nl.n};
 $$('.pad',svg).forEach(g=>{const f=()=>{Snd.init();location.hash='lekcja-'+g.dataset.n};g.onclick=f;g.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();f()}}})}

let PL;
function route(){const m=location.hash.match(/^#lekcja-(\d+)$/);$('#drawer').hidden=true;if(location.hash==='#plac'){if(PL.L)PL.close();PL.built=false;PL.open(PLAC);PL.hand.set(true);return}if(m){const L=LESSONS.find(x=>x.n===+m[1]);if(L){if(PL.L)PL.close();PL.built=false;PL.open(L);return}}if(PL.L)PL.close();else renderMap()}
function boot(){$('#brandmark').innerHTML=ISKRA;$('#iskra').innerHTML=ISKRA;PL=new Player();window.__pl=PL;$('#dadmap').onclick=()=>openDrawer(0);$('#gofree').onclick=()=>{Snd.init();location.hash='plac'};$('#dclose').onclick=()=>$('#drawer').hidden=true;$('#dipclose').onclick=()=>{$('#dip').hidden=true;location.hash=''};addEventListener('pointerdown',()=>Snd.init(),true);if(SITE&&'serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});addEventListener('hashchange',route);let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(()=>{if(!PL.L)renderMap()},200)});route()}
