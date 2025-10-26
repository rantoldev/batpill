(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();/**
* @vue/shared v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function wc(t){const e=Object.create(null);for(const n of t.split(","))e[n]=1;return n=>n in e}const be={},Us=[],tn=()=>{},ld=()=>!1,Yo=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),_c=t=>t.startsWith("onUpdate:"),dt=Object.assign,Ec=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},By=Object.prototype.hasOwnProperty,we=(t,e)=>By.call(t,e),X=Array.isArray,Fs=t=>Xo(t)==="[object Map]",cd=t=>Xo(t)==="[object Set]",ee=t=>typeof t=="function",qe=t=>typeof t=="string",Zn=t=>typeof t=="symbol",Ne=t=>t!==null&&typeof t=="object",ud=t=>(Ne(t)||ee(t))&&ee(t.then)&&ee(t.catch),hd=Object.prototype.toString,Xo=t=>hd.call(t),$y=t=>Xo(t).slice(8,-1),fd=t=>Xo(t)==="[object Object]",Ic=t=>qe(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,Or=wc(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Jo=t=>{const e=Object.create(null);return n=>e[n]||(e[n]=t(n))},jy=/-\w/g,Bt=Jo(t=>t.replace(jy,e=>e.slice(1).toUpperCase())),Hy=/\B([A-Z])/g,Ts=Jo(t=>t.replace(Hy,"-$1").toLowerCase()),Zo=Jo(t=>t.charAt(0).toUpperCase()+t.slice(1)),Ka=Jo(t=>t?`on${Zo(t)}`:""),Bn=(t,e)=>!Object.is(t,e),so=(t,...e)=>{for(let n=0;n<t.length;n++)t[n](...e)},dd=(t,e,n,s=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:s,value:n})},Sl=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let Qu;const ea=()=>Qu||(Qu=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function zr(t){if(X(t)){const e={};for(let n=0;n<t.length;n++){const s=t[n],r=qe(s)?zy(s):zr(s);if(r)for(const i in r)e[i]=r[i]}return e}else if(qe(t)||Ne(t))return t}const Ky=/;(?![^(]*\))/g,Wy=/:([^]+)/,qy=/\/\*[^]*?\*\//g;function zy(t){const e={};return t.replace(qy,"").split(Ky).forEach(n=>{if(n){const s=n.split(Wy);s.length>1&&(e[s[0].trim()]=s[1].trim())}}),e}function vi(t){let e="";if(qe(t))e=t;else if(X(t))for(let n=0;n<t.length;n++){const s=vi(t[n]);s&&(e+=s+" ")}else if(Ne(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const Gy="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Qy=wc(Gy);function pd(t){return!!t||t===""}const md=t=>!!(t&&t.__v_isRef===!0),Ft=t=>qe(t)?t:t==null?"":X(t)||Ne(t)&&(t.toString===hd||!ee(t.toString))?md(t)?Ft(t.value):JSON.stringify(t,gd,2):String(t),gd=(t,e)=>md(e)?gd(t,e.value):Fs(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[s,r],i)=>(n[Wa(s,i)+" =>"]=r,n),{})}:cd(e)?{[`Set(${e.size})`]:[...e.values()].map(n=>Wa(n))}:Zn(e)?Wa(e):Ne(e)&&!X(e)&&!fd(e)?String(e):e,Wa=(t,e="")=>{var n;return Zn(t)?`Symbol(${(n=t.description)!=null?n:e})`:t};/**
* @vue/reactivity v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let St;class Yy{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=St,!e&&St&&(this.index=(St.scopes||(St.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].pause();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].resume();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].resume()}}run(e){if(this._active){const n=St;try{return St=this,e()}finally{St=n}}}on(){++this._on===1&&(this.prevScope=St,St=this)}off(){this._on>0&&--this._on===0&&(St=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let n,s;for(n=0,s=this.effects.length;n<s;n++)this.effects[n].stop();for(this.effects.length=0,n=0,s=this.cleanups.length;n<s;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,s=this.scopes.length;n<s;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0}}}function Xy(){return St}let ke;const qa=new WeakSet;class yd{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,St&&St.active&&St.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,qa.has(this)&&(qa.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||wd(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Yu(this),_d(this);const e=ke,n=jt;ke=this,jt=!0;try{return this.fn()}finally{Ed(this),ke=e,jt=n,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Sc(e);this.deps=this.depsTail=void 0,Yu(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?qa.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Al(this)&&this.run()}get dirty(){return Al(this)}}let vd=0,Pr,Mr;function wd(t,e=!1){if(t.flags|=8,e){t.next=Mr,Mr=t;return}t.next=Pr,Pr=t}function Tc(){vd++}function bc(){if(--vd>0)return;if(Mr){let e=Mr;for(Mr=void 0;e;){const n=e.next;e.next=void 0,e.flags&=-9,e=n}}let t;for(;Pr;){let e=Pr;for(Pr=void 0;e;){const n=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(s){t||(t=s)}e=n}}if(t)throw t}function _d(t){for(let e=t.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function Ed(t){let e,n=t.depsTail,s=n;for(;s;){const r=s.prevDep;s.version===-1?(s===n&&(n=r),Sc(s),Jy(s)):e=s,s.dep.activeLink=s.prevActiveLink,s.prevActiveLink=void 0,s=r}t.deps=e,t.depsTail=n}function Al(t){for(let e=t.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(Id(e.dep.computed)||e.dep.version!==e.version))return!0;return!!t._dirty}function Id(t){if(t.flags&4&&!(t.flags&16)||(t.flags&=-17,t.globalVersion===Gr)||(t.globalVersion=Gr,!t.isSSR&&t.flags&128&&(!t.deps&&!t._dirty||!Al(t))))return;t.flags|=2;const e=t.dep,n=ke,s=jt;ke=t,jt=!0;try{_d(t);const r=t.fn(t._value);(e.version===0||Bn(r,t._value))&&(t.flags|=128,t._value=r,e.version++)}catch(r){throw e.version++,r}finally{ke=n,jt=s,Ed(t),t.flags&=-3}}function Sc(t,e=!1){const{dep:n,prevSub:s,nextSub:r}=t;if(s&&(s.nextSub=r,t.prevSub=void 0),r&&(r.prevSub=s,t.nextSub=void 0),n.subs===t&&(n.subs=s,!s&&n.computed)){n.computed.flags&=-5;for(let i=n.computed.deps;i;i=i.nextDep)Sc(i,!0)}!e&&!--n.sc&&n.map&&n.map.delete(n.key)}function Jy(t){const{prevDep:e,nextDep:n}=t;e&&(e.nextDep=n,t.prevDep=void 0),n&&(n.prevDep=e,t.nextDep=void 0)}let jt=!0;const Td=[];function En(){Td.push(jt),jt=!1}function In(){const t=Td.pop();jt=t===void 0?!0:t}function Yu(t){const{cleanup:e}=t;if(t.cleanup=void 0,e){const n=ke;ke=void 0;try{e()}finally{ke=n}}}let Gr=0;class Zy{constructor(e,n){this.sub=e,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Ac{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!ke||!jt||ke===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==ke)n=this.activeLink=new Zy(ke,this),ke.deps?(n.prevDep=ke.depsTail,ke.depsTail.nextDep=n,ke.depsTail=n):ke.deps=ke.depsTail=n,bd(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const s=n.nextDep;s.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=s),n.prevDep=ke.depsTail,n.nextDep=void 0,ke.depsTail.nextDep=n,ke.depsTail=n,ke.deps===n&&(ke.deps=s)}return n}trigger(e){this.version++,Gr++,this.notify(e)}notify(e){Tc();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{bc()}}}function bd(t){if(t.dep.sc++,t.sub.flags&4){const e=t.dep.computed;if(e&&!t.dep.subs){e.flags|=20;for(let s=e.deps;s;s=s.nextDep)bd(s)}const n=t.dep.subs;n!==t&&(t.prevSub=n,n&&(n.nextSub=t)),t.dep.subs=t}}const Cl=new WeakMap,hs=Symbol(""),Rl=Symbol(""),Qr=Symbol("");function ot(t,e,n){if(jt&&ke){let s=Cl.get(t);s||Cl.set(t,s=new Map);let r=s.get(n);r||(s.set(n,r=new Ac),r.map=s,r.key=n),r.track()}}function pn(t,e,n,s,r,i){const o=Cl.get(t);if(!o){Gr++;return}const a=l=>{l&&l.trigger()};if(Tc(),e==="clear")o.forEach(a);else{const l=X(t),c=l&&Ic(n);if(l&&n==="length"){const u=Number(s);o.forEach((h,f)=>{(f==="length"||f===Qr||!Zn(f)&&f>=u)&&a(h)})}else switch((n!==void 0||o.has(void 0))&&a(o.get(n)),c&&a(o.get(Qr)),e){case"add":l?c&&a(o.get("length")):(a(o.get(hs)),Fs(t)&&a(o.get(Rl)));break;case"delete":l||(a(o.get(hs)),Fs(t)&&a(o.get(Rl)));break;case"set":Fs(t)&&a(o.get(hs));break}}bc()}function Rs(t){const e=ve(t);return e===t?e:(ot(e,"iterate",Qr),Vt(t)?e:e.map(et))}function ta(t){return ot(t=ve(t),"iterate",Qr),t}const ev={__proto__:null,[Symbol.iterator](){return za(this,Symbol.iterator,et)},concat(...t){return Rs(this).concat(...t.map(e=>X(e)?Rs(e):e))},entries(){return za(this,"entries",t=>(t[1]=et(t[1]),t))},every(t,e){return hn(this,"every",t,e,void 0,arguments)},filter(t,e){return hn(this,"filter",t,e,n=>n.map(et),arguments)},find(t,e){return hn(this,"find",t,e,et,arguments)},findIndex(t,e){return hn(this,"findIndex",t,e,void 0,arguments)},findLast(t,e){return hn(this,"findLast",t,e,et,arguments)},findLastIndex(t,e){return hn(this,"findLastIndex",t,e,void 0,arguments)},forEach(t,e){return hn(this,"forEach",t,e,void 0,arguments)},includes(...t){return Ga(this,"includes",t)},indexOf(...t){return Ga(this,"indexOf",t)},join(t){return Rs(this).join(t)},lastIndexOf(...t){return Ga(this,"lastIndexOf",t)},map(t,e){return hn(this,"map",t,e,void 0,arguments)},pop(){return Er(this,"pop")},push(...t){return Er(this,"push",t)},reduce(t,...e){return Xu(this,"reduce",t,e)},reduceRight(t,...e){return Xu(this,"reduceRight",t,e)},shift(){return Er(this,"shift")},some(t,e){return hn(this,"some",t,e,void 0,arguments)},splice(...t){return Er(this,"splice",t)},toReversed(){return Rs(this).toReversed()},toSorted(t){return Rs(this).toSorted(t)},toSpliced(...t){return Rs(this).toSpliced(...t)},unshift(...t){return Er(this,"unshift",t)},values(){return za(this,"values",et)}};function za(t,e,n){const s=ta(t),r=s[e]();return s!==t&&!Vt(t)&&(r._next=r.next,r.next=()=>{const i=r._next();return i.done||(i.value=n(i.value)),i}),r}const tv=Array.prototype;function hn(t,e,n,s,r,i){const o=ta(t),a=o!==t&&!Vt(t),l=o[e];if(l!==tv[e]){const h=l.apply(t,i);return a?et(h):h}let c=n;o!==t&&(a?c=function(h,f){return n.call(this,et(h),f,t)}:n.length>2&&(c=function(h,f){return n.call(this,h,f,t)}));const u=l.call(o,c,s);return a&&r?r(u):u}function Xu(t,e,n,s){const r=ta(t);let i=n;return r!==t&&(Vt(t)?n.length>3&&(i=function(o,a,l){return n.call(this,o,a,l,t)}):i=function(o,a,l){return n.call(this,o,et(a),l,t)}),r[e](i,...s)}function Ga(t,e,n){const s=ve(t);ot(s,"iterate",Qr);const r=s[e](...n);return(r===-1||r===!1)&&kc(n[0])?(n[0]=ve(n[0]),s[e](...n)):r}function Er(t,e,n=[]){En(),Tc();const s=ve(t)[e].apply(t,n);return bc(),In(),s}const nv=wc("__proto__,__v_isRef,__isVue"),Sd=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(Zn));function sv(t){Zn(t)||(t=String(t));const e=ve(this);return ot(e,"has",t),e.hasOwnProperty(t)}class Ad{constructor(e=!1,n=!1){this._isReadonly=e,this._isShallow=n}get(e,n,s){if(n==="__v_skip")return e.__v_skip;const r=this._isReadonly,i=this._isShallow;if(n==="__v_isReactive")return!r;if(n==="__v_isReadonly")return r;if(n==="__v_isShallow")return i;if(n==="__v_raw")return s===(r?i?dv:xd:i?kd:Rd).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(s)?e:void 0;const o=X(e);if(!r){let l;if(o&&(l=ev[n]))return l;if(n==="hasOwnProperty")return sv}const a=Reflect.get(e,n,ct(e)?e:s);if((Zn(n)?Sd.has(n):nv(n))||(r||ot(e,"get",n),i))return a;if(ct(a)){const l=o&&Ic(n)?a:a.value;return r&&Ne(l)?xl(l):l}return Ne(a)?r?xl(a):wi(a):a}}class Cd extends Ad{constructor(e=!1){super(!1,e)}set(e,n,s,r){let i=e[n];if(!this._isShallow){const l=zn(i);if(!Vt(s)&&!zn(s)&&(i=ve(i),s=ve(s)),!X(e)&&ct(i)&&!ct(s))return l||(i.value=s),!0}const o=X(e)&&Ic(n)?Number(n)<e.length:we(e,n),a=Reflect.set(e,n,s,ct(e)?e:r);return e===ve(r)&&(o?Bn(s,i)&&pn(e,"set",n,s):pn(e,"add",n,s)),a}deleteProperty(e,n){const s=we(e,n);e[n];const r=Reflect.deleteProperty(e,n);return r&&s&&pn(e,"delete",n,void 0),r}has(e,n){const s=Reflect.has(e,n);return(!Zn(n)||!Sd.has(n))&&ot(e,"has",n),s}ownKeys(e){return ot(e,"iterate",X(e)?"length":hs),Reflect.ownKeys(e)}}class rv extends Ad{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const iv=new Cd,ov=new rv,av=new Cd(!0);const kl=t=>t,Ki=t=>Reflect.getPrototypeOf(t);function lv(t,e,n){return function(...s){const r=this.__v_raw,i=ve(r),o=Fs(i),a=t==="entries"||t===Symbol.iterator&&o,l=t==="keys"&&o,c=r[t](...s),u=n?kl:e?go:et;return!e&&ot(i,"iterate",l?Rl:hs),{next(){const{value:h,done:f}=c.next();return f?{value:h,done:f}:{value:a?[u(h[0]),u(h[1])]:u(h),done:f}},[Symbol.iterator](){return this}}}}function Wi(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function cv(t,e){const n={get(r){const i=this.__v_raw,o=ve(i),a=ve(r);t||(Bn(r,a)&&ot(o,"get",r),ot(o,"get",a));const{has:l}=Ki(o),c=e?kl:t?go:et;if(l.call(o,r))return c(i.get(r));if(l.call(o,a))return c(i.get(a));i!==o&&i.get(r)},get size(){const r=this.__v_raw;return!t&&ot(ve(r),"iterate",hs),r.size},has(r){const i=this.__v_raw,o=ve(i),a=ve(r);return t||(Bn(r,a)&&ot(o,"has",r),ot(o,"has",a)),r===a?i.has(r):i.has(r)||i.has(a)},forEach(r,i){const o=this,a=o.__v_raw,l=ve(a),c=e?kl:t?go:et;return!t&&ot(l,"iterate",hs),a.forEach((u,h)=>r.call(i,c(u),c(h),o))}};return dt(n,t?{add:Wi("add"),set:Wi("set"),delete:Wi("delete"),clear:Wi("clear")}:{add(r){!e&&!Vt(r)&&!zn(r)&&(r=ve(r));const i=ve(this);return Ki(i).has.call(i,r)||(i.add(r),pn(i,"add",r,r)),this},set(r,i){!e&&!Vt(i)&&!zn(i)&&(i=ve(i));const o=ve(this),{has:a,get:l}=Ki(o);let c=a.call(o,r);c||(r=ve(r),c=a.call(o,r));const u=l.call(o,r);return o.set(r,i),c?Bn(i,u)&&pn(o,"set",r,i):pn(o,"add",r,i),this},delete(r){const i=ve(this),{has:o,get:a}=Ki(i);let l=o.call(i,r);l||(r=ve(r),l=o.call(i,r)),a&&a.call(i,r);const c=i.delete(r);return l&&pn(i,"delete",r,void 0),c},clear(){const r=ve(this),i=r.size!==0,o=r.clear();return i&&pn(r,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(r=>{n[r]=lv(r,t,e)}),n}function Cc(t,e){const n=cv(t,e);return(s,r,i)=>r==="__v_isReactive"?!t:r==="__v_isReadonly"?t:r==="__v_raw"?s:Reflect.get(we(n,r)&&r in s?n:s,r,i)}const uv={get:Cc(!1,!1)},hv={get:Cc(!1,!0)},fv={get:Cc(!0,!1)};const Rd=new WeakMap,kd=new WeakMap,xd=new WeakMap,dv=new WeakMap;function pv(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function mv(t){return t.__v_skip||!Object.isExtensible(t)?0:pv($y(t))}function wi(t){return zn(t)?t:Rc(t,!1,iv,uv,Rd)}function Dd(t){return Rc(t,!1,av,hv,kd)}function xl(t){return Rc(t,!0,ov,fv,xd)}function Rc(t,e,n,s,r){if(!Ne(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const i=mv(t);if(i===0)return t;const o=r.get(t);if(o)return o;const a=new Proxy(t,i===2?s:n);return r.set(t,a),a}function Vs(t){return zn(t)?Vs(t.__v_raw):!!(t&&t.__v_isReactive)}function zn(t){return!!(t&&t.__v_isReadonly)}function Vt(t){return!!(t&&t.__v_isShallow)}function kc(t){return t?!!t.__v_raw:!1}function ve(t){const e=t&&t.__v_raw;return e?ve(e):t}function gv(t){return!we(t,"__v_skip")&&Object.isExtensible(t)&&dd(t,"__v_skip",!0),t}const et=t=>Ne(t)?wi(t):t,go=t=>Ne(t)?xl(t):t;function ct(t){return t?t.__v_isRef===!0:!1}function yv(t){return Nd(t,!1)}function vv(t){return Nd(t,!0)}function Nd(t,e){return ct(t)?t:new wv(t,e)}class wv{constructor(e,n){this.dep=new Ac,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?e:ve(e),this._value=n?e:et(e),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(e){const n=this._rawValue,s=this.__v_isShallow||Vt(e)||zn(e);e=s?e:ve(e),Bn(e,n)&&(this._rawValue=e,this._value=s?e:et(e),this.dep.trigger())}}function Bs(t){return ct(t)?t.value:t}const _v={get:(t,e,n)=>e==="__v_raw"?t:Bs(Reflect.get(t,e,n)),set:(t,e,n,s)=>{const r=t[e];return ct(r)&&!ct(n)?(r.value=n,!0):Reflect.set(t,e,n,s)}};function Od(t){return Vs(t)?t:new Proxy(t,_v)}class Ev{constructor(e,n,s){this.fn=e,this.setter=n,this._value=void 0,this.dep=new Ac(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Gr-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=s}notify(){if(this.flags|=16,!(this.flags&8)&&ke!==this)return wd(this,!0),!0}get value(){const e=this.dep.track();return Id(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function Iv(t,e,n=!1){let s,r;return ee(t)?s=t:(s=t.get,r=t.set),new Ev(s,r,n)}const qi={},yo=new WeakMap;let is;function Tv(t,e=!1,n=is){if(n){let s=yo.get(n);s||yo.set(n,s=[]),s.push(t)}}function bv(t,e,n=be){const{immediate:s,deep:r,once:i,scheduler:o,augmentJob:a,call:l}=n,c=C=>r?C:Vt(C)||r===!1||r===0?mn(C,1):mn(C);let u,h,f,d,y=!1,w=!1;if(ct(t)?(h=()=>t.value,y=Vt(t)):Vs(t)?(h=()=>c(t),y=!0):X(t)?(w=!0,y=t.some(C=>Vs(C)||Vt(C)),h=()=>t.map(C=>{if(ct(C))return C.value;if(Vs(C))return c(C);if(ee(C))return l?l(C,2):C()})):ee(t)?e?h=l?()=>l(t,2):t:h=()=>{if(f){En();try{f()}finally{In()}}const C=is;is=u;try{return l?l(t,3,[d]):t(d)}finally{is=C}}:h=tn,e&&r){const C=h,ne=r===!0?1/0:r;h=()=>mn(C(),ne)}const b=Xy(),x=()=>{u.stop(),b&&b.active&&Ec(b.effects,u)};if(i&&e){const C=e;e=(...ne)=>{C(...ne),x()}}let R=w?new Array(t.length).fill(qi):qi;const M=C=>{if(!(!(u.flags&1)||!u.dirty&&!C))if(e){const ne=u.run();if(r||y||(w?ne.some((he,ie)=>Bn(he,R[ie])):Bn(ne,R))){f&&f();const he=is;is=u;try{const ie=[ne,R===qi?void 0:w&&R[0]===qi?[]:R,d];R=ne,l?l(e,3,ie):e(...ie)}finally{is=he}}}else u.run()};return a&&a(M),u=new yd(h),u.scheduler=o?()=>o(M,!1):M,d=C=>Tv(C,!1,u),f=u.onStop=()=>{const C=yo.get(u);if(C){if(l)l(C,4);else for(const ne of C)ne();yo.delete(u)}},e?s?M(!0):R=u.run():o?o(M.bind(null,!0),!0):u.run(),x.pause=u.pause.bind(u),x.resume=u.resume.bind(u),x.stop=x,x}function mn(t,e=1/0,n){if(e<=0||!Ne(t)||t.__v_skip||(n=n||new Map,(n.get(t)||0)>=e))return t;if(n.set(t,e),e--,ct(t))mn(t.value,e,n);else if(X(t))for(let s=0;s<t.length;s++)mn(t[s],e,n);else if(cd(t)||Fs(t))t.forEach(s=>{mn(s,e,n)});else if(fd(t)){for(const s in t)mn(t[s],e,n);for(const s of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,s)&&mn(t[s],e,n)}return t}/**
* @vue/runtime-core v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function _i(t,e,n,s){try{return s?t(...s):t()}catch(r){na(r,e,n)}}function ln(t,e,n,s){if(ee(t)){const r=_i(t,e,n,s);return r&&ud(r)&&r.catch(i=>{na(i,e,n)}),r}if(X(t)){const r=[];for(let i=0;i<t.length;i++)r.push(ln(t[i],e,n,s));return r}}function na(t,e,n,s=!0){const r=e?e.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||be;if(e){let a=e.parent;const l=e.proxy,c=`https://vuejs.org/error-reference/#runtime-${n}`;for(;a;){const u=a.ec;if(u){for(let h=0;h<u.length;h++)if(u[h](t,l,c)===!1)return}a=a.parent}if(i){En(),_i(i,null,10,[t,l,c]),In();return}}Sv(t,n,r,s,o)}function Sv(t,e,n,s=!0,r=!1){if(r)throw t;console.error(t)}const wt=[];let Yt=-1;const $s=[];let Nn=null,xs=0;const Pd=Promise.resolve();let vo=null;function Md(t){const e=vo||Pd;return t?e.then(this?t.bind(this):t):e}function Av(t){let e=Yt+1,n=wt.length;for(;e<n;){const s=e+n>>>1,r=wt[s],i=Yr(r);i<t||i===t&&r.flags&2?e=s+1:n=s}return e}function xc(t){if(!(t.flags&1)){const e=Yr(t),n=wt[wt.length-1];!n||!(t.flags&2)&&e>=Yr(n)?wt.push(t):wt.splice(Av(e),0,t),t.flags|=1,Ld()}}function Ld(){vo||(vo=Pd.then(Fd))}function Cv(t){X(t)?$s.push(...t):Nn&&t.id===-1?Nn.splice(xs+1,0,t):t.flags&1||($s.push(t),t.flags|=1),Ld()}function Ju(t,e,n=Yt+1){for(;n<wt.length;n++){const s=wt[n];if(s&&s.flags&2){if(t&&s.id!==t.uid)continue;wt.splice(n,1),n--,s.flags&4&&(s.flags&=-2),s(),s.flags&4||(s.flags&=-2)}}}function Ud(t){if($s.length){const e=[...new Set($s)].sort((n,s)=>Yr(n)-Yr(s));if($s.length=0,Nn){Nn.push(...e);return}for(Nn=e,xs=0;xs<Nn.length;xs++){const n=Nn[xs];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}Nn=null,xs=0}}const Yr=t=>t.id==null?t.flags&2?-1:1/0:t.id;function Fd(t){try{for(Yt=0;Yt<wt.length;Yt++){const e=wt[Yt];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),_i(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;Yt<wt.length;Yt++){const e=wt[Yt];e&&(e.flags&=-2)}Yt=-1,wt.length=0,Ud(),vo=null,(wt.length||$s.length)&&Fd()}}let Ot=null,Vd=null;function wo(t){const e=Ot;return Ot=t,Vd=t&&t.type.__scopeId||null,e}function At(t,e=Ot,n){if(!e||t._n)return t;const s=(...r)=>{s._d&&Io(-1);const i=wo(e);let o;try{o=t(...r)}finally{wo(i),s._d&&Io(1)}return o};return s._n=!0,s._c=!0,s._d=!0,s}function js(t,e){if(Ot===null)return t;const n=oa(Ot),s=t.dirs||(t.dirs=[]);for(let r=0;r<e.length;r++){let[i,o,a,l=be]=e[r];i&&(ee(i)&&(i={mounted:i,updated:i}),i.deep&&mn(o),s.push({dir:i,instance:n,value:o,oldValue:void 0,arg:a,modifiers:l}))}return t}function ss(t,e,n,s){const r=t.dirs,i=e&&e.dirs;for(let o=0;o<r.length;o++){const a=r[o];i&&(a.oldValue=i[o].value);let l=a.dir[s];l&&(En(),ln(l,n,8,[t.el,a,t,e]),In())}}const Rv=Symbol("_vte"),kv=t=>t.__isTeleport,xv=Symbol("_leaveCb");function Dc(t,e){t.shapeFlag&6&&t.component?(t.transition=e,Dc(t.component.subTree,e)):t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}function Bd(t,e){return ee(t)?dt({name:t.name},e,{setup:t}):t}function $d(t){t.ids=[t.ids[0]+t.ids[2]+++"-",0,0]}const _o=new WeakMap;function Lr(t,e,n,s,r=!1){if(X(t)){t.forEach((y,w)=>Lr(y,e&&(X(e)?e[w]:e),n,s,r));return}if(Ur(s)&&!r){s.shapeFlag&512&&s.type.__asyncResolved&&s.component.subTree.component&&Lr(t,e,n,s.component.subTree);return}const i=s.shapeFlag&4?oa(s.component):s.el,o=r?null:i,{i:a,r:l}=t,c=e&&e.r,u=a.refs===be?a.refs={}:a.refs,h=a.setupState,f=ve(h),d=h===be?ld:y=>we(f,y);if(c!=null&&c!==l){if(Zu(e),qe(c))u[c]=null,d(c)&&(h[c]=null);else if(ct(c)){c.value=null;const y=e;y.k&&(u[y.k]=null)}}if(ee(l))_i(l,a,12,[o,u]);else{const y=qe(l),w=ct(l);if(y||w){const b=()=>{if(t.f){const x=y?d(l)?h[l]:u[l]:l.value;if(r)X(x)&&Ec(x,i);else if(X(x))x.includes(i)||x.push(i);else if(y)u[l]=[i],d(l)&&(h[l]=u[l]);else{const R=[i];l.value=R,t.k&&(u[t.k]=R)}}else y?(u[l]=o,d(l)&&(h[l]=o)):w&&(l.value=o,t.k&&(u[t.k]=o))};if(o){const x=()=>{b(),_o.delete(t)};x.id=-1,_o.set(t,x),Nt(x,n)}else Zu(t),b()}}}function Zu(t){const e=_o.get(t);e&&(e.flags|=8,_o.delete(t))}ea().requestIdleCallback;ea().cancelIdleCallback;const Ur=t=>!!t.type.__asyncLoader,jd=t=>t.type.__isKeepAlive;function Dv(t,e){Hd(t,"a",e)}function Nv(t,e){Hd(t,"da",e)}function Hd(t,e,n=lt){const s=t.__wdc||(t.__wdc=()=>{let r=n;for(;r;){if(r.isDeactivated)return;r=r.parent}return t()});if(sa(e,s,n),n){let r=n.parent;for(;r&&r.parent;)jd(r.parent.vnode)&&Ov(s,e,n,r),r=r.parent}}function Ov(t,e,n,s){const r=sa(e,t,s,!0);Kd(()=>{Ec(s[e],r)},n)}function sa(t,e,n=lt,s=!1){if(n){const r=n[t]||(n[t]=[]),i=e.__weh||(e.__weh=(...o)=>{En();const a=Ei(n),l=ln(e,n,t,o);return a(),In(),l});return s?r.unshift(i):r.push(i),i}}const Rn=t=>(e,n=lt)=>{(!Jr||t==="sp")&&sa(t,(...s)=>e(...s),n)},Pv=Rn("bm"),Mv=Rn("m"),Lv=Rn("bu"),Uv=Rn("u"),Fv=Rn("bum"),Kd=Rn("um"),Vv=Rn("sp"),Bv=Rn("rtg"),$v=Rn("rtc");function jv(t,e=lt){sa("ec",t,e)}const Hv="components";function Xs(t,e){return Wv(Hv,t,!0,e)||t}const Kv=Symbol.for("v-ndc");function Wv(t,e,n=!0,s=!1){const r=Ot||lt;if(r){const i=r.type;{const a=Mw(i,!1);if(a&&(a===e||a===Bt(e)||a===Zo(Bt(e))))return i}const o=eh(r[t]||i[t],e)||eh(r.appContext[t],e);return!o&&s?i:o}}function eh(t,e){return t&&(t[e]||t[Bt(e)]||t[Zo(Bt(e))])}function qv(t,e,n,s){let r;const i=n,o=X(t);if(o||qe(t)){const a=o&&Vs(t);let l=!1,c=!1;a&&(l=!Vt(t),c=zn(t),t=ta(t)),r=new Array(t.length);for(let u=0,h=t.length;u<h;u++)r[u]=e(l?c?go(et(t[u])):et(t[u]):t[u],u,void 0,i)}else if(typeof t=="number"){r=new Array(t);for(let a=0;a<t;a++)r[a]=e(a+1,a,void 0,i)}else if(Ne(t))if(t[Symbol.iterator])r=Array.from(t,(a,l)=>e(a,l,void 0,i));else{const a=Object.keys(t);r=new Array(a.length);for(let l=0,c=a.length;l<c;l++){const u=a[l];r[l]=e(t[u],u,l,i)}}else r=[];return r}const Dl=t=>t?up(t)?oa(t):Dl(t.parent):null,Fr=dt(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>Dl(t.parent),$root:t=>Dl(t.root),$host:t=>t.ce,$emit:t=>t.emit,$options:t=>qd(t),$forceUpdate:t=>t.f||(t.f=()=>{xc(t.update)}),$nextTick:t=>t.n||(t.n=Md.bind(t.proxy)),$watch:t=>dw.bind(t)}),Qa=(t,e)=>t!==be&&!t.__isScriptSetup&&we(t,e),zv={get({_:t},e){if(e==="__v_skip")return!0;const{ctx:n,setupState:s,data:r,props:i,accessCache:o,type:a,appContext:l}=t;let c;if(e[0]!=="$"){const d=o[e];if(d!==void 0)switch(d){case 1:return s[e];case 2:return r[e];case 4:return n[e];case 3:return i[e]}else{if(Qa(s,e))return o[e]=1,s[e];if(r!==be&&we(r,e))return o[e]=2,r[e];if((c=t.propsOptions[0])&&we(c,e))return o[e]=3,i[e];if(n!==be&&we(n,e))return o[e]=4,n[e];Nl&&(o[e]=0)}}const u=Fr[e];let h,f;if(u)return e==="$attrs"&&ot(t.attrs,"get",""),u(t);if((h=a.__cssModules)&&(h=h[e]))return h;if(n!==be&&we(n,e))return o[e]=4,n[e];if(f=l.config.globalProperties,we(f,e))return f[e]},set({_:t},e,n){const{data:s,setupState:r,ctx:i}=t;return Qa(r,e)?(r[e]=n,!0):s!==be&&we(s,e)?(s[e]=n,!0):we(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(i[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:s,appContext:r,propsOptions:i,type:o}},a){let l,c;return!!(n[a]||t!==be&&a[0]!=="$"&&we(t,a)||Qa(e,a)||(l=i[0])&&we(l,a)||we(s,a)||we(Fr,a)||we(r.config.globalProperties,a)||(c=o.__cssModules)&&c[a])},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:we(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function th(t){return X(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let Nl=!0;function Gv(t){const e=qd(t),n=t.proxy,s=t.ctx;Nl=!1,e.beforeCreate&&nh(e.beforeCreate,t,"bc");const{data:r,computed:i,methods:o,watch:a,provide:l,inject:c,created:u,beforeMount:h,mounted:f,beforeUpdate:d,updated:y,activated:w,deactivated:b,beforeDestroy:x,beforeUnmount:R,destroyed:M,unmounted:C,render:ne,renderTracked:he,renderTriggered:ie,errorCaptured:B,serverPrefetch:W,expose:oe,inheritAttrs:Ae,components:Ie,directives:pe,filters:Te}=e;if(c&&Qv(c,s,null),o)for(const Z in o){const se=o[Z];ee(se)&&(s[Z]=se.bind(n))}if(r){const Z=r.call(n,n);Ne(Z)&&(t.data=wi(Z))}if(Nl=!0,i)for(const Z in i){const se=i[Z],me=ee(se)?se.bind(n,n):ee(se.get)?se.get.bind(n,n):tn,Oe=!ee(se)&&ee(se.set)?se.set.bind(n):tn,je=$t({get:me,set:Oe});Object.defineProperty(s,Z,{enumerable:!0,configurable:!0,get:()=>je.value,set:Ce=>je.value=Ce})}if(a)for(const Z in a)Wd(a[Z],s,n,Z);if(l){const Z=ee(l)?l.call(n):l;Reflect.ownKeys(Z).forEach(se=>{ro(se,Z[se])})}u&&nh(u,t,"c");function fe(Z,se){X(se)?se.forEach(me=>Z(me.bind(n))):se&&Z(se.bind(n))}if(fe(Pv,h),fe(Mv,f),fe(Lv,d),fe(Uv,y),fe(Dv,w),fe(Nv,b),fe(jv,B),fe($v,he),fe(Bv,ie),fe(Fv,R),fe(Kd,C),fe(Vv,W),X(oe))if(oe.length){const Z=t.exposed||(t.exposed={});oe.forEach(se=>{Object.defineProperty(Z,se,{get:()=>n[se],set:me=>n[se]=me,enumerable:!0})})}else t.exposed||(t.exposed={});ne&&t.render===tn&&(t.render=ne),Ae!=null&&(t.inheritAttrs=Ae),Ie&&(t.components=Ie),pe&&(t.directives=pe),W&&$d(t)}function Qv(t,e,n=tn){X(t)&&(t=Ol(t));for(const s in t){const r=t[s];let i;Ne(r)?"default"in r?i=wn(r.from||s,r.default,!0):i=wn(r.from||s):i=wn(r),ct(i)?Object.defineProperty(e,s,{enumerable:!0,configurable:!0,get:()=>i.value,set:o=>i.value=o}):e[s]=i}}function nh(t,e,n){ln(X(t)?t.map(s=>s.bind(e.proxy)):t.bind(e.proxy),e,n)}function Wd(t,e,n,s){let r=s.includes(".")?ip(n,s):()=>n[s];if(qe(t)){const i=e[t];ee(i)&&io(r,i)}else if(ee(t))io(r,t.bind(n));else if(Ne(t))if(X(t))t.forEach(i=>Wd(i,e,n,s));else{const i=ee(t.handler)?t.handler.bind(n):e[t.handler];ee(i)&&io(r,i,t)}}function qd(t){const e=t.type,{mixins:n,extends:s}=e,{mixins:r,optionsCache:i,config:{optionMergeStrategies:o}}=t.appContext,a=i.get(e);let l;return a?l=a:!r.length&&!n&&!s?l=e:(l={},r.length&&r.forEach(c=>Eo(l,c,o,!0)),Eo(l,e,o)),Ne(e)&&i.set(e,l),l}function Eo(t,e,n,s=!1){const{mixins:r,extends:i}=e;i&&Eo(t,i,n,!0),r&&r.forEach(o=>Eo(t,o,n,!0));for(const o in e)if(!(s&&o==="expose")){const a=Yv[o]||n&&n[o];t[o]=a?a(t[o],e[o]):e[o]}return t}const Yv={data:sh,props:rh,emits:rh,methods:Ar,computed:Ar,beforeCreate:yt,created:yt,beforeMount:yt,mounted:yt,beforeUpdate:yt,updated:yt,beforeDestroy:yt,beforeUnmount:yt,destroyed:yt,unmounted:yt,activated:yt,deactivated:yt,errorCaptured:yt,serverPrefetch:yt,components:Ar,directives:Ar,watch:Jv,provide:sh,inject:Xv};function sh(t,e){return e?t?function(){return dt(ee(t)?t.call(this,this):t,ee(e)?e.call(this,this):e)}:e:t}function Xv(t,e){return Ar(Ol(t),Ol(e))}function Ol(t){if(X(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function yt(t,e){return t?[...new Set([].concat(t,e))]:e}function Ar(t,e){return t?dt(Object.create(null),t,e):e}function rh(t,e){return t?X(t)&&X(e)?[...new Set([...t,...e])]:dt(Object.create(null),th(t),th(e??{})):e}function Jv(t,e){if(!t)return e;if(!e)return t;const n=dt(Object.create(null),t);for(const s in e)n[s]=yt(t[s],e[s]);return n}function zd(){return{app:null,config:{isNativeTag:ld,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Zv=0;function ew(t,e){return function(s,r=null){ee(s)||(s=dt({},s)),r!=null&&!Ne(r)&&(r=null);const i=zd(),o=new WeakSet,a=[];let l=!1;const c=i.app={_uid:Zv++,_component:s,_props:r,_container:null,_context:i,_instance:null,version:Uw,get config(){return i.config},set config(u){},use(u,...h){return o.has(u)||(u&&ee(u.install)?(o.add(u),u.install(c,...h)):ee(u)&&(o.add(u),u(c,...h))),c},mixin(u){return i.mixins.includes(u)||i.mixins.push(u),c},component(u,h){return h?(i.components[u]=h,c):i.components[u]},directive(u,h){return h?(i.directives[u]=h,c):i.directives[u]},mount(u,h,f){if(!l){const d=c._ceVNode||Se(s,r);return d.appContext=i,f===!0?f="svg":f===!1&&(f=void 0),t(d,u,f),l=!0,c._container=u,u.__vue_app__=c,oa(d.component)}},onUnmount(u){a.push(u)},unmount(){l&&(ln(a,c._instance,16),t(null,c._container),delete c._container.__vue_app__)},provide(u,h){return i.provides[u]=h,c},runWithContext(u){const h=Hs;Hs=c;try{return u()}finally{Hs=h}}};return c}}let Hs=null;function ro(t,e){if(lt){let n=lt.provides;const s=lt.parent&&lt.parent.provides;s===n&&(n=lt.provides=Object.create(s)),n[t]=e}}function wn(t,e,n=!1){const s=xw();if(s||Hs){let r=Hs?Hs._context.provides:s?s.parent==null||s.ce?s.vnode.appContext&&s.vnode.appContext.provides:s.parent.provides:void 0;if(r&&t in r)return r[t];if(arguments.length>1)return n&&ee(e)?e.call(s&&s.proxy):e}}const Gd={},Qd=()=>Object.create(Gd),Yd=t=>Object.getPrototypeOf(t)===Gd;function tw(t,e,n,s=!1){const r={},i=Qd();t.propsDefaults=Object.create(null),Xd(t,e,r,i);for(const o in t.propsOptions[0])o in r||(r[o]=void 0);n?t.props=s?r:Dd(r):t.type.props?t.props=r:t.props=i,t.attrs=i}function nw(t,e,n,s){const{props:r,attrs:i,vnode:{patchFlag:o}}=t,a=ve(r),[l]=t.propsOptions;let c=!1;if((s||o>0)&&!(o&16)){if(o&8){const u=t.vnode.dynamicProps;for(let h=0;h<u.length;h++){let f=u[h];if(ra(t.emitsOptions,f))continue;const d=e[f];if(l)if(we(i,f))d!==i[f]&&(i[f]=d,c=!0);else{const y=Bt(f);r[y]=Pl(l,a,y,d,t,!1)}else d!==i[f]&&(i[f]=d,c=!0)}}}else{Xd(t,e,r,i)&&(c=!0);let u;for(const h in a)(!e||!we(e,h)&&((u=Ts(h))===h||!we(e,u)))&&(l?n&&(n[h]!==void 0||n[u]!==void 0)&&(r[h]=Pl(l,a,h,void 0,t,!0)):delete r[h]);if(i!==a)for(const h in i)(!e||!we(e,h))&&(delete i[h],c=!0)}c&&pn(t.attrs,"set","")}function Xd(t,e,n,s){const[r,i]=t.propsOptions;let o=!1,a;if(e)for(let l in e){if(Or(l))continue;const c=e[l];let u;r&&we(r,u=Bt(l))?!i||!i.includes(u)?n[u]=c:(a||(a={}))[u]=c:ra(t.emitsOptions,l)||(!(l in s)||c!==s[l])&&(s[l]=c,o=!0)}if(i){const l=ve(n),c=a||be;for(let u=0;u<i.length;u++){const h=i[u];n[h]=Pl(r,l,h,c[h],t,!we(c,h))}}return o}function Pl(t,e,n,s,r,i){const o=t[n];if(o!=null){const a=we(o,"default");if(a&&s===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&ee(l)){const{propsDefaults:c}=r;if(n in c)s=c[n];else{const u=Ei(r);s=c[n]=l.call(null,e),u()}}else s=l;r.ce&&r.ce._setProp(n,s)}o[0]&&(i&&!a?s=!1:o[1]&&(s===""||s===Ts(n))&&(s=!0))}return s}const sw=new WeakMap;function Jd(t,e,n=!1){const s=n?sw:e.propsCache,r=s.get(t);if(r)return r;const i=t.props,o={},a=[];let l=!1;if(!ee(t)){const u=h=>{l=!0;const[f,d]=Jd(h,e,!0);dt(o,f),d&&a.push(...d)};!n&&e.mixins.length&&e.mixins.forEach(u),t.extends&&u(t.extends),t.mixins&&t.mixins.forEach(u)}if(!i&&!l)return Ne(t)&&s.set(t,Us),Us;if(X(i))for(let u=0;u<i.length;u++){const h=Bt(i[u]);ih(h)&&(o[h]=be)}else if(i)for(const u in i){const h=Bt(u);if(ih(h)){const f=i[u],d=o[h]=X(f)||ee(f)?{type:f}:dt({},f),y=d.type;let w=!1,b=!0;if(X(y))for(let x=0;x<y.length;++x){const R=y[x],M=ee(R)&&R.name;if(M==="Boolean"){w=!0;break}else M==="String"&&(b=!1)}else w=ee(y)&&y.name==="Boolean";d[0]=w,d[1]=b,(w||we(d,"default"))&&a.push(h)}}const c=[o,a];return Ne(t)&&s.set(t,c),c}function ih(t){return t[0]!=="$"&&!Or(t)}const Nc=t=>t==="_"||t==="_ctx"||t==="$stable",Oc=t=>X(t)?t.map(Xt):[Xt(t)],rw=(t,e,n)=>{if(e._n)return e;const s=At((...r)=>Oc(e(...r)),n);return s._c=!1,s},Zd=(t,e,n)=>{const s=t._ctx;for(const r in t){if(Nc(r))continue;const i=t[r];if(ee(i))e[r]=rw(r,i,s);else if(i!=null){const o=Oc(i);e[r]=()=>o}}},ep=(t,e)=>{const n=Oc(e);t.slots.default=()=>n},tp=(t,e,n)=>{for(const s in e)(n||!Nc(s))&&(t[s]=e[s])},iw=(t,e,n)=>{const s=t.slots=Qd();if(t.vnode.shapeFlag&32){const r=e._;r?(tp(s,e,n),n&&dd(s,"_",r,!0)):Zd(e,s)}else e&&ep(t,e)},ow=(t,e,n)=>{const{vnode:s,slots:r}=t;let i=!0,o=be;if(s.shapeFlag&32){const a=e._;a?n&&a===1?i=!1:tp(r,e,n):(i=!e.$stable,Zd(e,r)),o=e}else e&&(ep(t,e),o={default:1});if(i)for(const a in r)!Nc(a)&&o[a]==null&&delete r[a]},Nt=Ew;function aw(t){return lw(t)}function lw(t,e){const n=ea();n.__VUE__=!0;const{insert:s,remove:r,patchProp:i,createElement:o,createText:a,createComment:l,setText:c,setElementText:u,parentNode:h,nextSibling:f,setScopeId:d=tn,insertStaticContent:y}=t,w=(p,m,g,E=null,I=null,_=null,L=void 0,N=null,D=!!m.dynamicChildren)=>{if(p===m)return;p&&!Ir(p,m)&&(E=v(p),Ce(p,I,_,!0),p=null),m.patchFlag===-2&&(D=!1,m.dynamicChildren=null);const{type:S,ref:q,shapeFlag:U}=m;switch(S){case ia:b(p,m,g,E);break;case Gn:x(p,m,g,E);break;case Xa:p==null&&R(m,g,E,L);break;case Ct:Ie(p,m,g,E,I,_,L,N,D);break;default:U&1?ne(p,m,g,E,I,_,L,N,D):U&6?pe(p,m,g,E,I,_,L,N,D):(U&64||U&128)&&S.process(p,m,g,E,I,_,L,N,D,$)}q!=null&&I?Lr(q,p&&p.ref,_,m||p,!m):q==null&&p&&p.ref!=null&&Lr(p.ref,null,_,p,!0)},b=(p,m,g,E)=>{if(p==null)s(m.el=a(m.children),g,E);else{const I=m.el=p.el;m.children!==p.children&&c(I,m.children)}},x=(p,m,g,E)=>{p==null?s(m.el=l(m.children||""),g,E):m.el=p.el},R=(p,m,g,E)=>{[p.el,p.anchor]=y(p.children,m,g,E,p.el,p.anchor)},M=({el:p,anchor:m},g,E)=>{let I;for(;p&&p!==m;)I=f(p),s(p,g,E),p=I;s(m,g,E)},C=({el:p,anchor:m})=>{let g;for(;p&&p!==m;)g=f(p),r(p),p=g;r(m)},ne=(p,m,g,E,I,_,L,N,D)=>{m.type==="svg"?L="svg":m.type==="math"&&(L="mathml"),p==null?he(m,g,E,I,_,L,N,D):W(p,m,I,_,L,N,D)},he=(p,m,g,E,I,_,L,N)=>{let D,S;const{props:q,shapeFlag:U,transition:j,dirs:G}=p;if(D=p.el=o(p.type,_,q&&q.is,q),U&8?u(D,p.children):U&16&&B(p.children,D,null,E,I,Ya(p,_),L,N),G&&ss(p,null,E,"created"),ie(D,p,p.scopeId,L,E),q){for(const Re in q)Re!=="value"&&!Or(Re)&&i(D,Re,null,q[Re],_,E);"value"in q&&i(D,"value",null,q.value,_),(S=q.onVnodeBeforeMount)&&Qt(S,E,p)}G&&ss(p,null,E,"beforeMount");const ce=cw(I,j);ce&&j.beforeEnter(D),s(D,m,g),((S=q&&q.onVnodeMounted)||ce||G)&&Nt(()=>{S&&Qt(S,E,p),ce&&j.enter(D),G&&ss(p,null,E,"mounted")},I)},ie=(p,m,g,E,I)=>{if(g&&d(p,g),E)for(let _=0;_<E.length;_++)d(p,E[_]);if(I){let _=I.subTree;if(m===_||ap(_.type)&&(_.ssContent===m||_.ssFallback===m)){const L=I.vnode;ie(p,L,L.scopeId,L.slotScopeIds,I.parent)}}},B=(p,m,g,E,I,_,L,N,D=0)=>{for(let S=D;S<p.length;S++){const q=p[S]=N?On(p[S]):Xt(p[S]);w(null,q,m,g,E,I,_,L,N)}},W=(p,m,g,E,I,_,L)=>{const N=m.el=p.el;let{patchFlag:D,dynamicChildren:S,dirs:q}=m;D|=p.patchFlag&16;const U=p.props||be,j=m.props||be;let G;if(g&&rs(g,!1),(G=j.onVnodeBeforeUpdate)&&Qt(G,g,m,p),q&&ss(m,p,g,"beforeUpdate"),g&&rs(g,!0),(U.innerHTML&&j.innerHTML==null||U.textContent&&j.textContent==null)&&u(N,""),S?oe(p.dynamicChildren,S,N,g,E,Ya(m,I),_):L||se(p,m,N,null,g,E,Ya(m,I),_,!1),D>0){if(D&16)Ae(N,U,j,g,I);else if(D&2&&U.class!==j.class&&i(N,"class",null,j.class,I),D&4&&i(N,"style",U.style,j.style,I),D&8){const ce=m.dynamicProps;for(let Re=0;Re<ce.length;Re++){const _e=ce[Re],Tt=U[_e],bt=j[_e];(bt!==Tt||_e==="value")&&i(N,_e,Tt,bt,I,g)}}D&1&&p.children!==m.children&&u(N,m.children)}else!L&&S==null&&Ae(N,U,j,g,I);((G=j.onVnodeUpdated)||q)&&Nt(()=>{G&&Qt(G,g,m,p),q&&ss(m,p,g,"updated")},E)},oe=(p,m,g,E,I,_,L)=>{for(let N=0;N<m.length;N++){const D=p[N],S=m[N],q=D.el&&(D.type===Ct||!Ir(D,S)||D.shapeFlag&198)?h(D.el):g;w(D,S,q,null,E,I,_,L,!0)}},Ae=(p,m,g,E,I)=>{if(m!==g){if(m!==be)for(const _ in m)!Or(_)&&!(_ in g)&&i(p,_,m[_],null,I,E);for(const _ in g){if(Or(_))continue;const L=g[_],N=m[_];L!==N&&_!=="value"&&i(p,_,N,L,I,E)}"value"in g&&i(p,"value",m.value,g.value,I)}},Ie=(p,m,g,E,I,_,L,N,D)=>{const S=m.el=p?p.el:a(""),q=m.anchor=p?p.anchor:a("");let{patchFlag:U,dynamicChildren:j,slotScopeIds:G}=m;G&&(N=N?N.concat(G):G),p==null?(s(S,g,E),s(q,g,E),B(m.children||[],g,q,I,_,L,N,D)):U>0&&U&64&&j&&p.dynamicChildren?(oe(p.dynamicChildren,j,g,I,_,L,N),(m.key!=null||I&&m===I.subTree)&&np(p,m,!0)):se(p,m,g,q,I,_,L,N,D)},pe=(p,m,g,E,I,_,L,N,D)=>{m.slotScopeIds=N,p==null?m.shapeFlag&512?I.ctx.activate(m,g,E,L,D):Te(m,g,E,I,_,L,D):Be(p,m,D)},Te=(p,m,g,E,I,_,L)=>{const N=p.component=kw(p,E,I);if(jd(p)&&(N.ctx.renderer=$),Dw(N,!1,L),N.asyncDep){if(I&&I.registerDep(N,fe,L),!p.el){const D=N.subTree=Se(Gn);x(null,D,m,g),p.placeholder=D.el}}else fe(N,p,m,g,I,_,L)},Be=(p,m,g)=>{const E=m.component=p.component;if(ww(p,m,g))if(E.asyncDep&&!E.asyncResolved){Z(E,m,g);return}else E.next=m,E.update();else m.el=p.el,E.vnode=m},fe=(p,m,g,E,I,_,L)=>{const N=()=>{if(p.isMounted){let{next:U,bu:j,u:G,parent:ce,vnode:Re}=p;{const zt=sp(p);if(zt){U&&(U.el=Re.el,Z(p,U,L)),zt.asyncDep.then(()=>{p.isUnmounted||N()});return}}let _e=U,Tt;rs(p,!1),U?(U.el=Re.el,Z(p,U,L)):U=Re,j&&so(j),(Tt=U.props&&U.props.onVnodeBeforeUpdate)&&Qt(Tt,ce,U,Re),rs(p,!0);const bt=ah(p),qt=p.subTree;p.subTree=bt,w(qt,bt,h(qt.el),v(qt),p,I,_),U.el=bt.el,_e===null&&_w(p,bt.el),G&&Nt(G,I),(Tt=U.props&&U.props.onVnodeUpdated)&&Nt(()=>Qt(Tt,ce,U,Re),I)}else{let U;const{el:j,props:G}=m,{bm:ce,m:Re,parent:_e,root:Tt,type:bt}=p,qt=Ur(m);rs(p,!1),ce&&so(ce),!qt&&(U=G&&G.onVnodeBeforeMount)&&Qt(U,_e,m),rs(p,!0);{Tt.ce&&Tt.ce._def.shadowRoot!==!1&&Tt.ce._injectChildStyle(bt);const zt=p.subTree=ah(p);w(null,zt,g,E,p,I,_),m.el=zt.el}if(Re&&Nt(Re,I),!qt&&(U=G&&G.onVnodeMounted)){const zt=m;Nt(()=>Qt(U,_e,zt),I)}(m.shapeFlag&256||_e&&Ur(_e.vnode)&&_e.vnode.shapeFlag&256)&&p.a&&Nt(p.a,I),p.isMounted=!0,m=g=E=null}};p.scope.on();const D=p.effect=new yd(N);p.scope.off();const S=p.update=D.run.bind(D),q=p.job=D.runIfDirty.bind(D);q.i=p,q.id=p.uid,D.scheduler=()=>xc(q),rs(p,!0),S()},Z=(p,m,g)=>{m.component=p;const E=p.vnode.props;p.vnode=m,p.next=null,nw(p,m.props,E,g),ow(p,m.children,g),En(),Ju(p),In()},se=(p,m,g,E,I,_,L,N,D=!1)=>{const S=p&&p.children,q=p?p.shapeFlag:0,U=m.children,{patchFlag:j,shapeFlag:G}=m;if(j>0){if(j&128){Oe(S,U,g,E,I,_,L,N,D);return}else if(j&256){me(S,U,g,E,I,_,L,N,D);return}}G&8?(q&16&&$e(S,I,_),U!==S&&u(g,U)):q&16?G&16?Oe(S,U,g,E,I,_,L,N,D):$e(S,I,_,!0):(q&8&&u(g,""),G&16&&B(U,g,E,I,_,L,N,D))},me=(p,m,g,E,I,_,L,N,D)=>{p=p||Us,m=m||Us;const S=p.length,q=m.length,U=Math.min(S,q);let j;for(j=0;j<U;j++){const G=m[j]=D?On(m[j]):Xt(m[j]);w(p[j],G,g,null,I,_,L,N,D)}S>q?$e(p,I,_,!0,!1,U):B(m,g,E,I,_,L,N,D,U)},Oe=(p,m,g,E,I,_,L,N,D)=>{let S=0;const q=m.length;let U=p.length-1,j=q-1;for(;S<=U&&S<=j;){const G=p[S],ce=m[S]=D?On(m[S]):Xt(m[S]);if(Ir(G,ce))w(G,ce,g,null,I,_,L,N,D);else break;S++}for(;S<=U&&S<=j;){const G=p[U],ce=m[j]=D?On(m[j]):Xt(m[j]);if(Ir(G,ce))w(G,ce,g,null,I,_,L,N,D);else break;U--,j--}if(S>U){if(S<=j){const G=j+1,ce=G<q?m[G].el:E;for(;S<=j;)w(null,m[S]=D?On(m[S]):Xt(m[S]),g,ce,I,_,L,N,D),S++}}else if(S>j)for(;S<=U;)Ce(p[S],I,_,!0),S++;else{const G=S,ce=S,Re=new Map;for(S=ce;S<=j;S++){const Dt=m[S]=D?On(m[S]):Xt(m[S]);Dt.key!=null&&Re.set(Dt.key,S)}let _e,Tt=0;const bt=j-ce+1;let qt=!1,zt=0;const _r=new Array(bt);for(S=0;S<bt;S++)_r[S]=0;for(S=G;S<=U;S++){const Dt=p[S];if(Tt>=bt){Ce(Dt,I,_,!0);continue}let Gt;if(Dt.key!=null)Gt=Re.get(Dt.key);else for(_e=ce;_e<=j;_e++)if(_r[_e-ce]===0&&Ir(Dt,m[_e])){Gt=_e;break}Gt===void 0?Ce(Dt,I,_,!0):(_r[Gt-ce]=S+1,Gt>=zt?zt=Gt:qt=!0,w(Dt,m[Gt],g,null,I,_,L,N,D),Tt++)}const qu=qt?uw(_r):Us;for(_e=qu.length-1,S=bt-1;S>=0;S--){const Dt=ce+S,Gt=m[Dt],zu=m[Dt+1],Gu=Dt+1<q?zu.el||zu.placeholder:E;_r[S]===0?w(null,Gt,g,Gu,I,_,L,N,D):qt&&(_e<0||S!==qu[_e]?je(Gt,g,Gu,2):_e--)}}},je=(p,m,g,E,I=null)=>{const{el:_,type:L,transition:N,children:D,shapeFlag:S}=p;if(S&6){je(p.component.subTree,m,g,E);return}if(S&128){p.suspense.move(m,g,E);return}if(S&64){L.move(p,m,g,$);return}if(L===Ct){s(_,m,g);for(let U=0;U<D.length;U++)je(D[U],m,g,E);s(p.anchor,m,g);return}if(L===Xa){M(p,m,g);return}if(E!==2&&S&1&&N)if(E===0)N.beforeEnter(_),s(_,m,g),Nt(()=>N.enter(_),I);else{const{leave:U,delayLeave:j,afterLeave:G}=N,ce=()=>{p.ctx.isUnmounted?r(_):s(_,m,g)},Re=()=>{_._isLeaving&&_[xv](!0),U(_,()=>{ce(),G&&G()})};j?j(_,ce,Re):Re()}else s(_,m,g)},Ce=(p,m,g,E=!1,I=!1)=>{const{type:_,props:L,ref:N,children:D,dynamicChildren:S,shapeFlag:q,patchFlag:U,dirs:j,cacheIndex:G}=p;if(U===-2&&(I=!1),N!=null&&(En(),Lr(N,null,g,p,!0),In()),G!=null&&(m.renderCache[G]=void 0),q&256){m.ctx.deactivate(p);return}const ce=q&1&&j,Re=!Ur(p);let _e;if(Re&&(_e=L&&L.onVnodeBeforeUnmount)&&Qt(_e,m,p),q&6)Qe(p.component,g,E);else{if(q&128){p.suspense.unmount(g,E);return}ce&&ss(p,null,m,"beforeUnmount"),q&64?p.type.remove(p,m,g,$,E):S&&!S.hasOnce&&(_!==Ct||U>0&&U&64)?$e(S,m,g,!1,!0):(_===Ct&&U&384||!I&&q&16)&&$e(D,m,g),E&&It(p)}(Re&&(_e=L&&L.onVnodeUnmounted)||ce)&&Nt(()=>{_e&&Qt(_e,m,p),ce&&ss(p,null,m,"unmounted")},g)},It=p=>{const{type:m,el:g,anchor:E,transition:I}=p;if(m===Ct){xt(g,E);return}if(m===Xa){C(p);return}const _=()=>{r(g),I&&!I.persisted&&I.afterLeave&&I.afterLeave()};if(p.shapeFlag&1&&I&&!I.persisted){const{leave:L,delayLeave:N}=I,D=()=>L(g,_);N?N(p.el,_,D):D()}else _()},xt=(p,m)=>{let g;for(;p!==m;)g=f(p),r(p),p=g;r(m)},Qe=(p,m,g)=>{const{bum:E,scope:I,job:_,subTree:L,um:N,m:D,a:S}=p;oh(D),oh(S),E&&so(E),I.stop(),_&&(_.flags|=8,Ce(L,p,m,g)),N&&Nt(N,m),Nt(()=>{p.isUnmounted=!0},m)},$e=(p,m,g,E=!1,I=!1,_=0)=>{for(let L=_;L<p.length;L++)Ce(p[L],m,g,E,I)},v=p=>{if(p.shapeFlag&6)return v(p.component.subTree);if(p.shapeFlag&128)return p.suspense.next();const m=f(p.anchor||p.el),g=m&&m[Rv];return g?f(g):m};let F=!1;const P=(p,m,g)=>{p==null?m._vnode&&Ce(m._vnode,null,null,!0):w(m._vnode||null,p,m,null,null,null,g),m._vnode=p,F||(F=!0,Ju(),Ud(),F=!1)},$={p:w,um:Ce,m:je,r:It,mt:Te,mc:B,pc:se,pbc:oe,n:v,o:t};return{render:P,hydrate:void 0,createApp:ew(P)}}function Ya({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function rs({effect:t,job:e},n){n?(t.flags|=32,e.flags|=4):(t.flags&=-33,e.flags&=-5)}function cw(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function np(t,e,n=!1){const s=t.children,r=e.children;if(X(s)&&X(r))for(let i=0;i<s.length;i++){const o=s[i];let a=r[i];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=r[i]=On(r[i]),a.el=o.el),!n&&a.patchFlag!==-2&&np(o,a)),a.type===ia&&a.patchFlag!==-1&&(a.el=o.el),a.type===Gn&&!a.el&&(a.el=o.el)}}function uw(t){const e=t.slice(),n=[0];let s,r,i,o,a;const l=t.length;for(s=0;s<l;s++){const c=t[s];if(c!==0){if(r=n[n.length-1],t[r]<c){e[s]=r,n.push(s);continue}for(i=0,o=n.length-1;i<o;)a=i+o>>1,t[n[a]]<c?i=a+1:o=a;c<t[n[i]]&&(i>0&&(e[s]=n[i-1]),n[i]=s)}}for(i=n.length,o=n[i-1];i-- >0;)n[i]=o,o=e[o];return n}function sp(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:sp(e)}function oh(t){if(t)for(let e=0;e<t.length;e++)t[e].flags|=8}const hw=Symbol.for("v-scx"),fw=()=>wn(hw);function io(t,e,n){return rp(t,e,n)}function rp(t,e,n=be){const{immediate:s,deep:r,flush:i,once:o}=n,a=dt({},n),l=e&&s||!e&&i!=="post";let c;if(Jr){if(i==="sync"){const d=fw();c=d.__watcherHandles||(d.__watcherHandles=[])}else if(!l){const d=()=>{};return d.stop=tn,d.resume=tn,d.pause=tn,d}}const u=lt;a.call=(d,y,w)=>ln(d,u,y,w);let h=!1;i==="post"?a.scheduler=d=>{Nt(d,u&&u.suspense)}:i!=="sync"&&(h=!0,a.scheduler=(d,y)=>{y?d():xc(d)}),a.augmentJob=d=>{e&&(d.flags|=4),h&&(d.flags|=2,u&&(d.id=u.uid,d.i=u))};const f=bv(t,e,a);return Jr&&(c?c.push(f):l&&f()),f}function dw(t,e,n){const s=this.proxy,r=qe(t)?t.includes(".")?ip(s,t):()=>s[t]:t.bind(s,s);let i;ee(e)?i=e:(i=e.handler,n=e);const o=Ei(this),a=rp(r,i.bind(s),n);return o(),a}function ip(t,e){const n=e.split(".");return()=>{let s=t;for(let r=0;r<n.length&&s;r++)s=s[n[r]];return s}}const pw=(t,e)=>e==="modelValue"||e==="model-value"?t.modelModifiers:t[`${e}Modifiers`]||t[`${Bt(e)}Modifiers`]||t[`${Ts(e)}Modifiers`];function mw(t,e,...n){if(t.isUnmounted)return;const s=t.vnode.props||be;let r=n;const i=e.startsWith("update:"),o=i&&pw(s,e.slice(7));o&&(o.trim&&(r=n.map(u=>qe(u)?u.trim():u)),o.number&&(r=n.map(Sl)));let a,l=s[a=Ka(e)]||s[a=Ka(Bt(e))];!l&&i&&(l=s[a=Ka(Ts(e))]),l&&ln(l,t,6,r);const c=s[a+"Once"];if(c){if(!t.emitted)t.emitted={};else if(t.emitted[a])return;t.emitted[a]=!0,ln(c,t,6,r)}}const gw=new WeakMap;function op(t,e,n=!1){const s=n?gw:e.emitsCache,r=s.get(t);if(r!==void 0)return r;const i=t.emits;let o={},a=!1;if(!ee(t)){const l=c=>{const u=op(c,e,!0);u&&(a=!0,dt(o,u))};!n&&e.mixins.length&&e.mixins.forEach(l),t.extends&&l(t.extends),t.mixins&&t.mixins.forEach(l)}return!i&&!a?(Ne(t)&&s.set(t,null),null):(X(i)?i.forEach(l=>o[l]=null):dt(o,i),Ne(t)&&s.set(t,o),o)}function ra(t,e){return!t||!Yo(e)?!1:(e=e.slice(2).replace(/Once$/,""),we(t,e[0].toLowerCase()+e.slice(1))||we(t,Ts(e))||we(t,e))}function ah(t){const{type:e,vnode:n,proxy:s,withProxy:r,propsOptions:[i],slots:o,attrs:a,emit:l,render:c,renderCache:u,props:h,data:f,setupState:d,ctx:y,inheritAttrs:w}=t,b=wo(t);let x,R;try{if(n.shapeFlag&4){const C=r||s,ne=C;x=Xt(c.call(ne,C,u,h,d,f,y)),R=a}else{const C=e;x=Xt(C.length>1?C(h,{attrs:a,slots:o,emit:l}):C(h,null)),R=e.props?a:yw(a)}}catch(C){Vr.length=0,na(C,t,1),x=Se(Gn)}let M=x;if(R&&w!==!1){const C=Object.keys(R),{shapeFlag:ne}=M;C.length&&ne&7&&(i&&C.some(_c)&&(R=vw(R,i)),M=Js(M,R,!1,!0))}return n.dirs&&(M=Js(M,null,!1,!0),M.dirs=M.dirs?M.dirs.concat(n.dirs):n.dirs),n.transition&&Dc(M,n.transition),x=M,wo(b),x}const yw=t=>{let e;for(const n in t)(n==="class"||n==="style"||Yo(n))&&((e||(e={}))[n]=t[n]);return e},vw=(t,e)=>{const n={};for(const s in t)(!_c(s)||!(s.slice(9)in e))&&(n[s]=t[s]);return n};function ww(t,e,n){const{props:s,children:r,component:i}=t,{props:o,children:a,patchFlag:l}=e,c=i.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&l>=0){if(l&1024)return!0;if(l&16)return s?lh(s,o,c):!!o;if(l&8){const u=e.dynamicProps;for(let h=0;h<u.length;h++){const f=u[h];if(o[f]!==s[f]&&!ra(c,f))return!0}}}else return(r||a)&&(!a||!a.$stable)?!0:s===o?!1:s?o?lh(s,o,c):!0:!!o;return!1}function lh(t,e,n){const s=Object.keys(e);if(s.length!==Object.keys(t).length)return!0;for(let r=0;r<s.length;r++){const i=s[r];if(e[i]!==t[i]&&!ra(n,i))return!0}return!1}function _w({vnode:t,parent:e},n){for(;e;){const s=e.subTree;if(s.suspense&&s.suspense.activeBranch===t&&(s.el=t.el),s===t)(t=e.vnode).el=n,e=e.parent;else break}}const ap=t=>t.__isSuspense;function Ew(t,e){e&&e.pendingBranch?X(t)?e.effects.push(...t):e.effects.push(t):Cv(t)}const Ct=Symbol.for("v-fgt"),ia=Symbol.for("v-txt"),Gn=Symbol.for("v-cmt"),Xa=Symbol.for("v-stc"),Vr=[];let Pt=null;function Pe(t=!1){Vr.push(Pt=t?null:[])}function Iw(){Vr.pop(),Pt=Vr[Vr.length-1]||null}let Xr=1;function Io(t,e=!1){Xr+=t,t<0&&Pt&&e&&(Pt.hasOnce=!0)}function lp(t){return t.dynamicChildren=Xr>0?Pt||Us:null,Iw(),Xr>0&&Pt&&Pt.push(t),t}function Ue(t,e,n,s,r,i){return lp(k(t,e,n,s,r,i,!0))}function Tw(t,e,n,s,r){return lp(Se(t,e,n,s,r,!0))}function To(t){return t?t.__v_isVNode===!0:!1}function Ir(t,e){return t.type===e.type&&t.key===e.key}const cp=({key:t})=>t??null,oo=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?qe(t)||ct(t)||ee(t)?{i:Ot,r:t,k:e,f:!!n}:t:null);function k(t,e=null,n=null,s=0,r=null,i=t===Ct?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&cp(e),ref:e&&oo(e),scopeId:Vd,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:s,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:Ot};return a?(Pc(l,n),i&128&&t.normalize(l)):n&&(l.shapeFlag|=qe(n)?8:16),Xr>0&&!o&&Pt&&(l.patchFlag>0||i&6)&&l.patchFlag!==32&&Pt.push(l),l}const Se=bw;function bw(t,e=null,n=null,s=0,r=null,i=!1){if((!t||t===Kv)&&(t=Gn),To(t)){const a=Js(t,e,!0);return n&&Pc(a,n),Xr>0&&!i&&Pt&&(a.shapeFlag&6?Pt[Pt.indexOf(t)]=a:Pt.push(a)),a.patchFlag=-2,a}if(Lw(t)&&(t=t.__vccOpts),e){e=Sw(e);let{class:a,style:l}=e;a&&!qe(a)&&(e.class=vi(a)),Ne(l)&&(kc(l)&&!X(l)&&(l=dt({},l)),e.style=zr(l))}const o=qe(t)?1:ap(t)?128:kv(t)?64:Ne(t)?4:ee(t)?2:0;return k(t,e,n,s,r,o,i,!0)}function Sw(t){return t?kc(t)||Yd(t)?dt({},t):t:null}function Js(t,e,n=!1,s=!1){const{props:r,ref:i,patchFlag:o,children:a,transition:l}=t,c=e?Aw(r||{},e):r,u={__v_isVNode:!0,__v_skip:!0,type:t.type,props:c,key:c&&cp(c),ref:e&&e.ref?n&&i?X(i)?i.concat(oo(e)):[i,oo(e)]:oo(e):i,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:a,target:t.target,targetStart:t.targetStart,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==Ct?o===-1?16:o|16:o,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:l,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&Js(t.ssContent),ssFallback:t.ssFallback&&Js(t.ssFallback),placeholder:t.placeholder,el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce};return l&&s&&Dc(u,l.clone(u)),u}function nn(t=" ",e=0){return Se(ia,null,t,e)}function _n(t="",e=!1){return e?(Pe(),Tw(Gn,null,t)):Se(Gn,null,t)}function Xt(t){return t==null||typeof t=="boolean"?Se(Gn):X(t)?Se(Ct,null,t.slice()):To(t)?On(t):Se(ia,null,String(t))}function On(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:Js(t)}function Pc(t,e){let n=0;const{shapeFlag:s}=t;if(e==null)e=null;else if(X(e))n=16;else if(typeof e=="object")if(s&65){const r=e.default;r&&(r._c&&(r._d=!1),Pc(t,r()),r._c&&(r._d=!0));return}else{n=32;const r=e._;!r&&!Yd(e)?e._ctx=Ot:r===3&&Ot&&(Ot.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else ee(e)?(e={default:e,_ctx:Ot},n=32):(e=String(e),s&64?(n=16,e=[nn(e)]):n=8);t.children=e,t.shapeFlag|=n}function Aw(...t){const e={};for(let n=0;n<t.length;n++){const s=t[n];for(const r in s)if(r==="class")e.class!==s.class&&(e.class=vi([e.class,s.class]));else if(r==="style")e.style=zr([e.style,s.style]);else if(Yo(r)){const i=e[r],o=s[r];o&&i!==o&&!(X(i)&&i.includes(o))&&(e[r]=i?[].concat(i,o):o)}else r!==""&&(e[r]=s[r])}return e}function Qt(t,e,n,s=null){ln(t,e,7,[n,s])}const Cw=zd();let Rw=0;function kw(t,e,n){const s=t.type,r=(e?e.appContext:t.appContext)||Cw,i={uid:Rw++,vnode:t,type:s,parent:e,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Yy(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(r.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Jd(s,r),emitsOptions:op(s,r),emit:null,emitted:null,propsDefaults:be,inheritAttrs:s.inheritAttrs,ctx:be,data:be,props:be,attrs:be,slots:be,refs:be,setupState:be,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=e?e.root:i,i.emit=mw.bind(null,i),t.ce&&t.ce(i),i}let lt=null;const xw=()=>lt||Ot;let bo,Ml;{const t=ea(),e=(n,s)=>{let r;return(r=t[n])||(r=t[n]=[]),r.push(s),i=>{r.length>1?r.forEach(o=>o(i)):r[0](i)}};bo=e("__VUE_INSTANCE_SETTERS__",n=>lt=n),Ml=e("__VUE_SSR_SETTERS__",n=>Jr=n)}const Ei=t=>{const e=lt;return bo(t),t.scope.on(),()=>{t.scope.off(),bo(e)}},ch=()=>{lt&&lt.scope.off(),bo(null)};function up(t){return t.vnode.shapeFlag&4}let Jr=!1;function Dw(t,e=!1,n=!1){e&&Ml(e);const{props:s,children:r}=t.vnode,i=up(t);tw(t,s,i,e),iw(t,r,n||e);const o=i?Nw(t,e):void 0;return e&&Ml(!1),o}function Nw(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=new Proxy(t.ctx,zv);const{setup:s}=n;if(s){En();const r=t.setupContext=s.length>1?Pw(t):null,i=Ei(t),o=_i(s,t,0,[t.props,r]),a=ud(o);if(In(),i(),(a||t.sp)&&!Ur(t)&&$d(t),a){if(o.then(ch,ch),e)return o.then(l=>{uh(t,l)}).catch(l=>{na(l,t,0)});t.asyncDep=o}else uh(t,o)}else hp(t)}function uh(t,e,n){ee(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:Ne(e)&&(t.setupState=Od(e)),hp(t)}function hp(t,e,n){const s=t.type;t.render||(t.render=s.render||tn);{const r=Ei(t);En();try{Gv(t)}finally{In(),r()}}}const Ow={get(t,e){return ot(t,"get",""),t[e]}};function Pw(t){const e=n=>{t.exposed=n||{}};return{attrs:new Proxy(t.attrs,Ow),slots:t.slots,emit:t.emit,expose:e}}function oa(t){return t.exposed?t.exposeProxy||(t.exposeProxy=new Proxy(Od(gv(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in Fr)return Fr[n](t)},has(e,n){return n in e||n in Fr}})):t.proxy}function Mw(t,e=!0){return ee(t)?t.displayName||t.name:t.name||e&&t.__name}function Lw(t){return ee(t)&&"__vccOpts"in t}const $t=(t,e)=>Iv(t,e,Jr);function fp(t,e,n){try{Io(-1);const s=arguments.length;return s===2?Ne(e)&&!X(e)?To(e)?Se(t,null,[e]):Se(t,e):Se(t,null,e):(s>3?n=Array.prototype.slice.call(arguments,2):s===3&&To(n)&&(n=[n]),Se(t,e,n))}finally{Io(1)}}const Uw="3.5.22";/**
* @vue/runtime-dom v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Ll;const hh=typeof window<"u"&&window.trustedTypes;if(hh)try{Ll=hh.createPolicy("vue",{createHTML:t=>t})}catch{}const dp=Ll?t=>Ll.createHTML(t):t=>t,Fw="http://www.w3.org/2000/svg",Vw="http://www.w3.org/1998/Math/MathML",dn=typeof document<"u"?document:null,fh=dn&&dn.createElement("template"),Bw={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,s)=>{const r=e==="svg"?dn.createElementNS(Fw,t):e==="mathml"?dn.createElementNS(Vw,t):n?dn.createElement(t,{is:n}):dn.createElement(t);return t==="select"&&s&&s.multiple!=null&&r.setAttribute("multiple",s.multiple),r},createText:t=>dn.createTextNode(t),createComment:t=>dn.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>dn.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,s,r,i){const o=n?n.previousSibling:e.lastChild;if(r&&(r===i||r.nextSibling))for(;e.insertBefore(r.cloneNode(!0),n),!(r===i||!(r=r.nextSibling)););else{fh.innerHTML=dp(s==="svg"?`<svg>${t}</svg>`:s==="mathml"?`<math>${t}</math>`:t);const a=fh.content;if(s==="svg"||s==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}e.insertBefore(a,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},$w=Symbol("_vtc");function jw(t,e,n){const s=t[$w];s&&(e=(e?[e,...s]:[...s]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const dh=Symbol("_vod"),Hw=Symbol("_vsh"),Kw=Symbol(""),Ww=/(?:^|;)\s*display\s*:/;function qw(t,e,n){const s=t.style,r=qe(n);let i=!1;if(n&&!r){if(e)if(qe(e))for(const o of e.split(";")){const a=o.slice(0,o.indexOf(":")).trim();n[a]==null&&ao(s,a,"")}else for(const o in e)n[o]==null&&ao(s,o,"");for(const o in n)o==="display"&&(i=!0),ao(s,o,n[o])}else if(r){if(e!==n){const o=s[Kw];o&&(n+=";"+o),s.cssText=n,i=Ww.test(n)}}else e&&t.removeAttribute("style");dh in t&&(t[dh]=i?s.display:"",t[Hw]&&(s.display="none"))}const ph=/\s*!important$/;function ao(t,e,n){if(X(n))n.forEach(s=>ao(t,e,s));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const s=zw(t,e);ph.test(n)?t.setProperty(Ts(s),n.replace(ph,""),"important"):t[s]=n}}const mh=["Webkit","Moz","ms"],Ja={};function zw(t,e){const n=Ja[e];if(n)return n;let s=Bt(e);if(s!=="filter"&&s in t)return Ja[e]=s;s=Zo(s);for(let r=0;r<mh.length;r++){const i=mh[r]+s;if(i in t)return Ja[e]=i}return e}const gh="http://www.w3.org/1999/xlink";function yh(t,e,n,s,r,i=Qy(e)){s&&e.startsWith("xlink:")?n==null?t.removeAttributeNS(gh,e.slice(6,e.length)):t.setAttributeNS(gh,e,n):n==null||i&&!pd(n)?t.removeAttribute(e):t.setAttribute(e,i?"":Zn(n)?String(n):n)}function vh(t,e,n,s,r){if(e==="innerHTML"||e==="textContent"){n!=null&&(t[e]=e==="innerHTML"?dp(n):n);return}const i=t.tagName;if(e==="value"&&i!=="PROGRESS"&&!i.includes("-")){const a=i==="OPTION"?t.getAttribute("value")||"":t.value,l=n==null?t.type==="checkbox"?"on":"":String(n);(a!==l||!("_value"in t))&&(t.value=l),n==null&&t.removeAttribute(e),t._value=n;return}let o=!1;if(n===""||n==null){const a=typeof t[e];a==="boolean"?n=pd(n):n==null&&a==="string"?(n="",o=!0):a==="number"&&(n=0,o=!0)}try{t[e]=n}catch{}o&&t.removeAttribute(r||e)}function Ds(t,e,n,s){t.addEventListener(e,n,s)}function Gw(t,e,n,s){t.removeEventListener(e,n,s)}const wh=Symbol("_vei");function Qw(t,e,n,s,r=null){const i=t[wh]||(t[wh]={}),o=i[e];if(s&&o)o.value=s;else{const[a,l]=Yw(e);if(s){const c=i[e]=Zw(s,r);Ds(t,a,c,l)}else o&&(Gw(t,a,o,l),i[e]=void 0)}}const _h=/(?:Once|Passive|Capture)$/;function Yw(t){let e;if(_h.test(t)){e={};let s;for(;s=t.match(_h);)t=t.slice(0,t.length-s[0].length),e[s[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):Ts(t.slice(2)),e]}let Za=0;const Xw=Promise.resolve(),Jw=()=>Za||(Xw.then(()=>Za=0),Za=Date.now());function Zw(t,e){const n=s=>{if(!s._vts)s._vts=Date.now();else if(s._vts<=n.attached)return;ln(e_(s,n.value),e,5,[s])};return n.value=t,n.attached=Jw(),n}function e_(t,e){if(X(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(s=>r=>!r._stopped&&s&&s(r))}else return e}const Eh=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,t_=(t,e,n,s,r,i)=>{const o=r==="svg";e==="class"?jw(t,s,o):e==="style"?qw(t,n,s):Yo(e)?_c(e)||Qw(t,e,n,s,i):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):n_(t,e,s,o))?(vh(t,e,s),!t.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&yh(t,e,s,o,i,e!=="value")):t._isVueCE&&(/[A-Z]/.test(e)||!qe(s))?vh(t,Bt(e),s,i,e):(e==="true-value"?t._trueValue=s:e==="false-value"&&(t._falseValue=s),yh(t,e,s,o))};function n_(t,e,n,s){if(s)return!!(e==="innerHTML"||e==="textContent"||e in t&&Eh(e)&&ee(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const r=t.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return Eh(e)&&qe(n)?!1:e in t}const Ih=t=>{const e=t.props["onUpdate:modelValue"]||!1;return X(e)?n=>so(e,n):e};function s_(t){t.target.composing=!0}function Th(t){const e=t.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const el=Symbol("_assign"),Ks={created(t,{modifiers:{lazy:e,trim:n,number:s}},r){t[el]=Ih(r);const i=s||r.props&&r.props.type==="number";Ds(t,e?"change":"input",o=>{if(o.target.composing)return;let a=t.value;n&&(a=a.trim()),i&&(a=Sl(a)),t[el](a)}),n&&Ds(t,"change",()=>{t.value=t.value.trim()}),e||(Ds(t,"compositionstart",s_),Ds(t,"compositionend",Th),Ds(t,"change",Th))},mounted(t,{value:e}){t.value=e??""},beforeUpdate(t,{value:e,oldValue:n,modifiers:{lazy:s,trim:r,number:i}},o){if(t[el]=Ih(o),t.composing)return;const a=(i||t.type==="number")&&!/^0\d/.test(t.value)?Sl(t.value):t.value,l=e??"";a!==l&&(document.activeElement===t&&t.type!=="range"&&(s&&e===n||r&&t.value.trim()===l)||(t.value=l))}},r_=["ctrl","shift","alt","meta"],i_={stop:t=>t.stopPropagation(),prevent:t=>t.preventDefault(),self:t=>t.target!==t.currentTarget,ctrl:t=>!t.ctrlKey,shift:t=>!t.shiftKey,alt:t=>!t.altKey,meta:t=>!t.metaKey,left:t=>"button"in t&&t.button!==0,middle:t=>"button"in t&&t.button!==1,right:t=>"button"in t&&t.button!==2,exact:(t,e)=>r_.some(n=>t[`${n}Key`]&&!e.includes(n))},pp=(t,e)=>{const n=t._withMods||(t._withMods={}),s=e.join(".");return n[s]||(n[s]=(r,...i)=>{for(let o=0;o<e.length;o++){const a=i_[e[o]];if(a&&a(r,e))return}return t(r,...i)})},o_=dt({patchProp:t_},Bw);let bh;function a_(){return bh||(bh=aw(o_))}const l_=(...t)=>{const e=a_().createApp(...t),{mount:n}=e;return e.mount=s=>{const r=u_(s);if(!r)return;const i=e._component;!ee(i)&&!i.render&&!i.template&&(i.template=r.innerHTML),r.nodeType===1&&(r.textContent="");const o=n(r,!1,c_(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),o},e};function c_(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function u_(t){return qe(t)?document.querySelector(t):t}const h_="modulepreload",f_=function(t){return"/"+t},Sh={},So=function(e,n,s){let r=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),a=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));r=Promise.allSettled(n.map(l=>{if(l=f_(l),l in Sh)return;Sh[l]=!0;const c=l.endsWith(".css"),u=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${u}`))return;const h=document.createElement("link");if(h.rel=c?"stylesheet":h_,c||(h.as="script"),h.crossOrigin="",h.href=l,a&&h.setAttribute("nonce",a),document.head.appendChild(h),c)return new Promise((f,d)=>{h.addEventListener("load",f),h.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${l}`)))})}))}function i(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return r.then(o=>{for(const a of o||[])a.status==="rejected"&&i(a.reason);return e().catch(i)})};var Ah={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mp=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let r=t.charCodeAt(s);r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):(r&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(r=65536+((r&1023)<<10)+(t.charCodeAt(++s)&1023),e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},d_=function(t){const e=[];let n=0,s=0;for(;n<t.length;){const r=t[n++];if(r<128)e[s++]=String.fromCharCode(r);else if(r>191&&r<224){const i=t[n++];e[s++]=String.fromCharCode((r&31)<<6|i&63)}else if(r>239&&r<365){const i=t[n++],o=t[n++],a=t[n++],l=((r&7)<<18|(i&63)<<12|(o&63)<<6|a&63)-65536;e[s++]=String.fromCharCode(55296+(l>>10)),e[s++]=String.fromCharCode(56320+(l&1023))}else{const i=t[n++],o=t[n++];e[s++]=String.fromCharCode((r&15)<<12|(i&63)<<6|o&63)}}return e.join("")},gp={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let r=0;r<t.length;r+=3){const i=t[r],o=r+1<t.length,a=o?t[r+1]:0,l=r+2<t.length,c=l?t[r+2]:0,u=i>>2,h=(i&3)<<4|a>>4;let f=(a&15)<<2|c>>6,d=c&63;l||(d=64,o||(f=64)),s.push(n[u],n[h],n[f],n[d])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(mp(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):d_(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let r=0;r<t.length;){const i=n[t.charAt(r++)],a=r<t.length?n[t.charAt(r)]:0;++r;const c=r<t.length?n[t.charAt(r)]:64;++r;const h=r<t.length?n[t.charAt(r)]:64;if(++r,i==null||a==null||c==null||h==null)throw new p_;const f=i<<2|a>>4;if(s.push(f),c!==64){const d=a<<4&240|c>>2;if(s.push(d),h!==64){const y=c<<6&192|h;s.push(y)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class p_ extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const m_=function(t){const e=mp(t);return gp.encodeByteArray(e,!0)},Ao=function(t){return m_(t).replace(/\./g,"")},yp=function(t){try{return gp.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function g_(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const y_=()=>g_().__FIREBASE_DEFAULTS__,v_=()=>{if(typeof process>"u"||typeof Ah>"u")return;const t=Ah.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},w_=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&yp(t[1]);return e&&JSON.parse(e)},Mc=()=>{try{return y_()||v_()||w_()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},vp=t=>{var e,n;return(n=(e=Mc())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},__=t=>{const e=vp(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),s]:[e.substring(0,n),s]},wp=()=>{var t;return(t=Mc())===null||t===void 0?void 0:t.config},_p=t=>{var e;return(e=Mc())===null||e===void 0?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class E_{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function I_(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},s=e||"demo-project",r=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${s}`,aud:s,iat:r,exp:r+3600,auth_time:r,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},t);return[Ao(JSON.stringify(n)),Ao(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function T_(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(pt())}function b_(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function S_(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function A_(){const t=pt();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function C_(){try{return typeof indexedDB=="object"}catch{return!1}}function R_(){return new Promise((t,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{var i;e(((i=r.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const k_="FirebaseError";class kn extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=k_,Object.setPrototypeOf(this,kn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ii.prototype.create)}}class Ii{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){const s=n[0]||{},r=`${this.service}/${e}`,i=this.errors[e],o=i?x_(i,s):"Error",a=`${this.serviceName}: ${o} (${r}).`;return new kn(r,a,s)}}function x_(t,e){return t.replace(D_,(n,s)=>{const r=e[s];return r!=null?String(r):`<${s}?>`})}const D_=/\{\$([^}]+)}/g;function N_(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Co(t,e){if(t===e)return!0;const n=Object.keys(t),s=Object.keys(e);for(const r of n){if(!s.includes(r))return!1;const i=t[r],o=e[r];if(Ch(i)&&Ch(o)){if(!Co(i,o))return!1}else if(i!==o)return!1}for(const r of s)if(!n.includes(r))return!1;return!0}function Ch(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ti(t){const e=[];for(const[n,s]of Object.entries(t))Array.isArray(s)?s.forEach(r=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(r))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}function Cr(t){const e={};return t.replace(/^\?/,"").split("&").forEach(s=>{if(s){const[r,i]=s.split("=");e[decodeURIComponent(r)]=decodeURIComponent(i)}}),e}function Rr(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function O_(t,e){const n=new P_(t,e);return n.subscribe.bind(n)}class P_{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,s){let r;if(e===void 0&&n===void 0&&s===void 0)throw new Error("Missing Observer.");M_(e,["next","error","complete"])?r=e:r={next:e,error:n,complete:s},r.next===void 0&&(r.next=tl),r.error===void 0&&(r.error=tl),r.complete===void 0&&(r.complete=tl);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function M_(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function tl(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mt(t){return t&&t._delegate?t._delegate:t}class ps{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const os="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L_{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const s=new E_;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:n});r&&s.resolve(r)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const s=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(s)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:s})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(F_(e))try{this.getOrInitializeService({instanceIdentifier:os})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:r});s.resolve(i)}catch{}}}}clearInstance(e=os){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=os){return this.instances.has(e)}getOptions(e=os){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[i,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(i);s===a&&o.resolve(r)}return r}onInit(e,n){var s;const r=this.normalizeInstanceIdentifier(n),i=(s=this.onInitCallbacks.get(r))!==null&&s!==void 0?s:new Set;i.add(e),this.onInitCallbacks.set(r,i);const o=this.instances.get(r);return o&&e(o,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const s=this.onInitCallbacks.get(n);if(s)for(const r of s)try{r(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:U_(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=os){return this.component?this.component.multipleInstances?e:os:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function U_(t){return t===os?void 0:t}function F_(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V_{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new L_(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var de;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(de||(de={}));const B_={debug:de.DEBUG,verbose:de.VERBOSE,info:de.INFO,warn:de.WARN,error:de.ERROR,silent:de.SILENT},$_=de.INFO,j_={[de.DEBUG]:"log",[de.VERBOSE]:"log",[de.INFO]:"info",[de.WARN]:"warn",[de.ERROR]:"error"},H_=(t,e,...n)=>{if(e<t.logLevel)return;const s=new Date().toISOString(),r=j_[e];if(r)console[r](`[${s}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Lc{constructor(e){this.name=e,this._logLevel=$_,this._logHandler=H_,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in de))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?B_[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,de.DEBUG,...e),this._logHandler(this,de.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,de.VERBOSE,...e),this._logHandler(this,de.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,de.INFO,...e),this._logHandler(this,de.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,de.WARN,...e),this._logHandler(this,de.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,de.ERROR,...e),this._logHandler(this,de.ERROR,...e)}}const K_=(t,e)=>e.some(n=>t instanceof n);let Rh,kh;function W_(){return Rh||(Rh=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function q_(){return kh||(kh=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Ep=new WeakMap,Ul=new WeakMap,Ip=new WeakMap,nl=new WeakMap,Uc=new WeakMap;function z_(t){const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n($n(t.result)),r()},o=()=>{s(t.error),r()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&Ep.set(n,t)}).catch(()=>{}),Uc.set(e,t),e}function G_(t){if(Ul.has(t))return;const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),r()},o=()=>{s(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});Ul.set(t,e)}let Fl={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Ul.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Ip.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return $n(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Q_(t){Fl=t(Fl)}function Y_(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const s=t.call(sl(this),e,...n);return Ip.set(s,e.sort?e.sort():[e]),$n(s)}:q_().includes(t)?function(...e){return t.apply(sl(this),e),$n(Ep.get(this))}:function(...e){return $n(t.apply(sl(this),e))}}function X_(t){return typeof t=="function"?Y_(t):(t instanceof IDBTransaction&&G_(t),K_(t,W_())?new Proxy(t,Fl):t)}function $n(t){if(t instanceof IDBRequest)return z_(t);if(nl.has(t))return nl.get(t);const e=X_(t);return e!==t&&(nl.set(t,e),Uc.set(e,t)),e}const sl=t=>Uc.get(t);function J_(t,e,{blocked:n,upgrade:s,blocking:r,terminated:i}={}){const o=indexedDB.open(t,e),a=$n(o);return s&&o.addEventListener("upgradeneeded",l=>{s($n(o.result),l.oldVersion,l.newVersion,$n(o.transaction),l)}),n&&o.addEventListener("blocked",l=>n(l.oldVersion,l.newVersion,l)),a.then(l=>{i&&l.addEventListener("close",()=>i()),r&&l.addEventListener("versionchange",c=>r(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const Z_=["get","getKey","getAll","getAllKeys","count"],e0=["put","add","delete","clear"],rl=new Map;function xh(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(rl.get(e))return rl.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,r=e0.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(r||Z_.includes(n)))return;const i=async function(o,...a){const l=this.transaction(o,r?"readwrite":"readonly");let c=l.store;return s&&(c=c.index(a.shift())),(await Promise.all([c[n](...a),r&&l.done]))[0]};return rl.set(e,i),i}Q_(t=>({...t,get:(e,n,s)=>xh(e,n)||t.get(e,n,s),has:(e,n)=>!!xh(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t0{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(n0(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function n0(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Vl="@firebase/app",Dh="0.9.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ms=new Lc("@firebase/app"),s0="@firebase/app-compat",r0="@firebase/analytics-compat",i0="@firebase/analytics",o0="@firebase/app-check-compat",a0="@firebase/app-check",l0="@firebase/auth",c0="@firebase/auth-compat",u0="@firebase/database",h0="@firebase/database-compat",f0="@firebase/functions",d0="@firebase/functions-compat",p0="@firebase/installations",m0="@firebase/installations-compat",g0="@firebase/messaging",y0="@firebase/messaging-compat",v0="@firebase/performance",w0="@firebase/performance-compat",_0="@firebase/remote-config",E0="@firebase/remote-config-compat",I0="@firebase/storage",T0="@firebase/storage-compat",b0="@firebase/firestore",S0="@firebase/firestore-compat",A0="firebase",C0="9.23.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bl="[DEFAULT]",R0={[Vl]:"fire-core",[s0]:"fire-core-compat",[i0]:"fire-analytics",[r0]:"fire-analytics-compat",[a0]:"fire-app-check",[o0]:"fire-app-check-compat",[l0]:"fire-auth",[c0]:"fire-auth-compat",[u0]:"fire-rtdb",[h0]:"fire-rtdb-compat",[f0]:"fire-fn",[d0]:"fire-fn-compat",[p0]:"fire-iid",[m0]:"fire-iid-compat",[g0]:"fire-fcm",[y0]:"fire-fcm-compat",[v0]:"fire-perf",[w0]:"fire-perf-compat",[_0]:"fire-rc",[E0]:"fire-rc-compat",[I0]:"fire-gcs",[T0]:"fire-gcs-compat",[b0]:"fire-fst",[S0]:"fire-fst-compat","fire-js":"fire-js",[A0]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ro=new Map,$l=new Map;function k0(t,e){try{t.container.addComponent(e)}catch(n){ms.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Zs(t){const e=t.name;if($l.has(e))return ms.debug(`There were multiple attempts to register component ${e}.`),!1;$l.set(e,t);for(const n of Ro.values())k0(n,t);return!0}function Fc(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const x0={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."},jn=new Ii("app","Firebase",x0);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class D0{constructor(e,n,s){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new ps("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw jn.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hr=C0;function Tp(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const s=Object.assign({name:Bl,automaticDataCollectionEnabled:!1},e),r=s.name;if(typeof r!="string"||!r)throw jn.create("bad-app-name",{appName:String(r)});if(n||(n=wp()),!n)throw jn.create("no-options");const i=Ro.get(r);if(i){if(Co(n,i.options)&&Co(s,i.config))return i;throw jn.create("duplicate-app",{appName:r})}const o=new V_(r);for(const l of $l.values())o.addComponent(l);const a=new D0(n,s,o);return Ro.set(r,a),a}function bp(t=Bl){const e=Ro.get(t);if(!e&&t===Bl&&wp())return Tp();if(!e)throw jn.create("no-app",{appName:t});return e}function Hn(t,e,n){var s;let r=(s=R0[t])!==null&&s!==void 0?s:t;n&&(r+=`-${n}`);const i=r.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const a=[`Unable to register library "${r}" with version "${e}":`];i&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ms.warn(a.join(" "));return}Zs(new ps(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const N0="firebase-heartbeat-database",O0=1,Zr="firebase-heartbeat-store";let il=null;function Sp(){return il||(il=J_(N0,O0,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(Zr)}}}).catch(t=>{throw jn.create("idb-open",{originalErrorMessage:t.message})})),il}async function P0(t){try{return await(await Sp()).transaction(Zr).objectStore(Zr).get(Ap(t))}catch(e){if(e instanceof kn)ms.warn(e.message);else{const n=jn.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});ms.warn(n.message)}}}async function Nh(t,e){try{const s=(await Sp()).transaction(Zr,"readwrite");await s.objectStore(Zr).put(e,Ap(t)),await s.done}catch(n){if(n instanceof kn)ms.warn(n.message);else{const s=jn.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});ms.warn(s.message)}}}function Ap(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const M0=1024,L0=30*24*60*60*1e3;class U0{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new V0(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Oh();if(this._heartbeatsCache===null&&(this._heartbeatsCache=await this._heartbeatsCachePromise),!(this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(r=>r.date===s)))return this._heartbeatsCache.heartbeats.push({date:s,agent:n}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(r=>{const i=new Date(r.date).valueOf();return Date.now()-i<=L0}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache===null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Oh(),{heartbeatsToSend:n,unsentEntries:s}=F0(this._heartbeatsCache.heartbeats),r=Ao(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}}function Oh(){return new Date().toISOString().substring(0,10)}function F0(t,e=M0){const n=[];let s=t.slice();for(const r of t){const i=n.find(o=>o.agent===r.agent);if(i){if(i.dates.push(r.date),Ph(n)>e){i.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),Ph(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}class V0{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return C_()?R_().then(()=>!0).catch(()=>!1):!1}async read(){return await this._canUseIndexedDBPromise?await P0(this.app)||{heartbeats:[]}:{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const r=await this.read();return Nh(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const r=await this.read();return Nh(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Ph(t){return Ao(JSON.stringify({version:2,heartbeats:t})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function B0(t){Zs(new ps("platform-logger",e=>new t0(e),"PRIVATE")),Zs(new ps("heartbeat",e=>new U0(e),"PRIVATE")),Hn(Vl,Dh,t),Hn(Vl,Dh,"esm2017"),Hn("fire-js","")}B0("");var $0="firebase",j0="9.23.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Hn($0,j0,"app");function Vc(t,e){var n={};for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&e.indexOf(s)<0&&(n[s]=t[s]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,s=Object.getOwnPropertySymbols(t);r<s.length;r++)e.indexOf(s[r])<0&&Object.prototype.propertyIsEnumerable.call(t,s[r])&&(n[s[r]]=t[s[r]]);return n}function Cp(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const H0=Cp,Rp=new Ii("auth","Firebase",Cp());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ko=new Lc("@firebase/auth");function K0(t,...e){ko.logLevel<=de.WARN&&ko.warn(`Auth (${hr}): ${t}`,...e)}function lo(t,...e){ko.logLevel<=de.ERROR&&ko.error(`Auth (${hr}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ht(t,...e){throw Bc(t,...e)}function sn(t,...e){return Bc(t,...e)}function W0(t,e,n){const s=Object.assign(Object.assign({},H0()),{[e]:n});return new Ii("auth","Firebase",s).create(e,{appName:t.name})}function Bc(t,...e){if(typeof t!="string"){const n=e[0],s=[...e.slice(1)];return s[0]&&(s[0].appName=t.name),t._errorFactory.create(n,...s)}return Rp.create(t,...e)}function z(t,e,...n){if(!t)throw Bc(e,...n)}function gn(t){const e="INTERNAL ASSERTION FAILED: "+t;throw lo(e),new Error(e)}function Tn(t,e){t||gn(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jl(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function q0(){return Mh()==="http:"||Mh()==="https:"}function Mh(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function z0(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(q0()||b_()||"connection"in navigator)?navigator.onLine:!0}function G0(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bi{constructor(e,n){this.shortDelay=e,this.longDelay=n,Tn(n>e,"Short delay should be less than long delay!"),this.isMobile=T_()||S_()}get(){return z0()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $c(t,e){Tn(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kp{static initialize(e,n,s){this.fetchImpl=e,n&&(this.headersImpl=n),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;gn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;gn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;gn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Q0={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Y0=new bi(3e4,6e4);function fr(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function bs(t,e,n,s,r={}){return xp(t,r,async()=>{let i={},o={};s&&(e==="GET"?o=s:i={body:JSON.stringify(s)});const a=Ti(Object.assign({key:t.config.apiKey},o)).slice(1),l=await t._getAdditionalHeaders();return l["Content-Type"]="application/json",t.languageCode&&(l["X-Firebase-Locale"]=t.languageCode),kp.fetch()(Dp(t,t.config.apiHost,n,a),Object.assign({method:e,headers:l,referrerPolicy:"no-referrer"},i))})}async function xp(t,e,n){t._canInitEmulator=!1;const s=Object.assign(Object.assign({},Q0),e);try{const r=new X0(t),i=await Promise.race([n(),r.promise]);r.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw zi(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const a=i.ok?o.errorMessage:o.error.message,[l,c]=a.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw zi(t,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw zi(t,"email-already-in-use",o);if(l==="USER_DISABLED")throw zi(t,"user-disabled",o);const u=s[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw W0(t,u,c);Ht(t,u)}}catch(r){if(r instanceof kn)throw r;Ht(t,"network-request-failed",{message:String(r)})}}async function Si(t,e,n,s,r={}){const i=await bs(t,e,n,s,r);return"mfaPendingCredential"in i&&Ht(t,"multi-factor-auth-required",{_serverResponse:i}),i}function Dp(t,e,n,s){const r=`${e}${n}?${s}`;return t.config.emulator?$c(t.config,r):`${t.config.apiScheme}://${r}`}class X0{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,s)=>{this.timer=setTimeout(()=>s(sn(this.auth,"network-request-failed")),Y0.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function zi(t,e,n){const s={appName:t.name};n.email&&(s.email=n.email),n.phoneNumber&&(s.phoneNumber=n.phoneNumber);const r=sn(t,e,s);return r.customData._tokenResponse=n,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function J0(t,e){return bs(t,"POST","/v1/accounts:delete",e)}async function Z0(t,e){return bs(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Br(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function eE(t,e=!1){const n=mt(t),s=await n.getIdToken(e),r=jc(s);z(r&&r.exp&&r.auth_time&&r.iat,n.auth,"internal-error");const i=typeof r.firebase=="object"?r.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:r,token:s,authTime:Br(ol(r.auth_time)),issuedAtTime:Br(ol(r.iat)),expirationTime:Br(ol(r.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function ol(t){return Number(t)*1e3}function jc(t){const[e,n,s]=t.split(".");if(e===void 0||n===void 0||s===void 0)return lo("JWT malformed, contained fewer than 3 sections"),null;try{const r=yp(n);return r?JSON.parse(r):(lo("Failed to decode base64 JWT payload"),null)}catch(r){return lo("Caught error parsing JWT payload as JSON",r==null?void 0:r.toString()),null}}function tE(t){const e=jc(t);return z(e,"internal-error"),z(typeof e.exp<"u","internal-error"),z(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function er(t,e,n=!1){if(n)return e;try{return await e}catch(s){throw s instanceof kn&&nE(s)&&t.auth.currentUser===t&&await t.auth.signOut(),s}}function nE({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sE{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const s=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),s}else{this.errorBackoff=3e4;const r=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Np{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Br(this.lastLoginAt),this.creationTime=Br(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xo(t){var e;const n=t.auth,s=await t.getIdToken(),r=await er(t,Z0(n,{idToken:s}));z(r==null?void 0:r.users.length,n,"internal-error");const i=r.users[0];t._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?oE(i.providerUserInfo):[],a=iE(t.providerData,o),l=t.isAnonymous,c=!(t.email&&i.passwordHash)&&!(a!=null&&a.length),u=l?c:!1,h={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:a,metadata:new Np(i.createdAt,i.lastLoginAt),isAnonymous:u};Object.assign(t,h)}async function rE(t){const e=mt(t);await xo(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function iE(t,e){return[...t.filter(s=>!e.some(r=>r.providerId===s.providerId)),...e]}function oE(t){return t.map(e=>{var{providerId:n}=e,s=Vc(e,["providerId"]);return{providerId:n,uid:s.rawId||"",displayName:s.displayName||null,email:s.email||null,phoneNumber:s.phoneNumber||null,photoURL:s.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function aE(t,e){const n=await xp(t,{},async()=>{const s=Ti({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:r,apiKey:i}=t.config,o=Dp(t,r,"/v1/token",`key=${i}`),a=await t._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",kp.fetch()(o,{method:"POST",headers:a,body:s})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ei{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){z(e.idToken,"internal-error"),z(typeof e.idToken<"u","internal-error"),z(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):tE(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}async getToken(e,n=!1){return z(!this.accessToken||this.refreshToken,e,"user-token-expired"),!n&&this.accessToken&&!this.isExpired?this.accessToken:this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:s,refreshToken:r,expiresIn:i}=await aE(e,n);this.updateTokensAndExpiration(s,r,Number(i))}updateTokensAndExpiration(e,n,s){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(e,n){const{refreshToken:s,accessToken:r,expirationTime:i}=n,o=new ei;return s&&(z(typeof s=="string","internal-error",{appName:e}),o.refreshToken=s),r&&(z(typeof r=="string","internal-error",{appName:e}),o.accessToken=r),i&&(z(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ei,this.toJSON())}_performRefresh(){return gn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xn(t,e){z(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class fs{constructor(e){var{uid:n,auth:s,stsTokenManager:r}=e,i=Vc(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new sE(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=s,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new Np(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await er(this,this.stsTokenManager.getToken(this.auth,e));return z(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return eE(this,e)}reload(){return rE(this)}_assign(e){this!==e&&(z(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new fs(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){z(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let s=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),s=!0),n&&await xo(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){const e=await this.getIdToken();return await er(this,J0(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var s,r,i,o,a,l,c,u;const h=(s=n.displayName)!==null&&s!==void 0?s:void 0,f=(r=n.email)!==null&&r!==void 0?r:void 0,d=(i=n.phoneNumber)!==null&&i!==void 0?i:void 0,y=(o=n.photoURL)!==null&&o!==void 0?o:void 0,w=(a=n.tenantId)!==null&&a!==void 0?a:void 0,b=(l=n._redirectEventId)!==null&&l!==void 0?l:void 0,x=(c=n.createdAt)!==null&&c!==void 0?c:void 0,R=(u=n.lastLoginAt)!==null&&u!==void 0?u:void 0,{uid:M,emailVerified:C,isAnonymous:ne,providerData:he,stsTokenManager:ie}=n;z(M&&ie,e,"internal-error");const B=ei.fromJSON(this.name,ie);z(typeof M=="string",e,"internal-error"),xn(h,e.name),xn(f,e.name),z(typeof C=="boolean",e,"internal-error"),z(typeof ne=="boolean",e,"internal-error"),xn(d,e.name),xn(y,e.name),xn(w,e.name),xn(b,e.name),xn(x,e.name),xn(R,e.name);const W=new fs({uid:M,auth:e,email:f,emailVerified:C,displayName:h,isAnonymous:ne,photoURL:y,phoneNumber:d,tenantId:w,stsTokenManager:B,createdAt:x,lastLoginAt:R});return he&&Array.isArray(he)&&(W.providerData=he.map(oe=>Object.assign({},oe))),b&&(W._redirectEventId=b),W}static async _fromIdTokenResponse(e,n,s=!1){const r=new ei;r.updateFromServerResponse(n);const i=new fs({uid:n.localId,auth:e,stsTokenManager:r,isAnonymous:s});return await xo(i),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lh=new Map;function yn(t){Tn(t instanceof Function,"Expected a class definition");let e=Lh.get(t);return e?(Tn(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Lh.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Op{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Op.type="NONE";const Uh=Op;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function co(t,e,n){return`firebase:${t}:${e}:${n}`}class Ws{constructor(e,n,s){this.persistence=e,this.auth=n,this.userKey=s;const{config:r,name:i}=this.auth;this.fullUserKey=co(this.userKey,r.apiKey,i),this.fullPersistenceKey=co("persistence",r.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?fs._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,s="authUser"){if(!n.length)return new Ws(yn(Uh),e,s);const r=(await Promise.all(n.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let i=r[0]||yn(Uh);const o=co(s,e.config.apiKey,e.name);let a=null;for(const c of n)try{const u=await c._get(o);if(u){const h=fs._fromJSON(e,u);c!==i&&(a=h),i=c;break}}catch{}const l=r.filter(c=>c._shouldAllowMigration);return!i._shouldAllowMigration||!l.length?new Ws(i,e,s):(i=l[0],a&&await i._set(o,a.toJSON()),await Promise.all(n.map(async c=>{if(c!==i)try{await c._remove(o)}catch{}})),new Ws(i,e,s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fh(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Lp(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Pp(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Fp(e))return"Blackberry";if(Vp(e))return"Webos";if(Hc(e))return"Safari";if((e.includes("chrome/")||Mp(e))&&!e.includes("edge/"))return"Chrome";if(Up(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=t.match(n);if((s==null?void 0:s.length)===2)return s[1]}return"Other"}function Pp(t=pt()){return/firefox\//i.test(t)}function Hc(t=pt()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Mp(t=pt()){return/crios\//i.test(t)}function Lp(t=pt()){return/iemobile/i.test(t)}function Up(t=pt()){return/android/i.test(t)}function Fp(t=pt()){return/blackberry/i.test(t)}function Vp(t=pt()){return/webos/i.test(t)}function aa(t=pt()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function lE(t=pt()){var e;return aa(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function cE(){return A_()&&document.documentMode===10}function Bp(t=pt()){return aa(t)||Up(t)||Vp(t)||Fp(t)||/windows phone/i.test(t)||Lp(t)}function uE(){try{return!!(window&&window!==window.top)}catch{return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $p(t,e=[]){let n;switch(t){case"Browser":n=Fh(pt());break;case"Worker":n=`${Fh(pt())}-${t}`;break;default:n=t}const s=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${hr}/${s}`}async function jp(t,e){return bs(t,"GET","/v2/recaptchaConfig",fr(t,e))}function Vh(t){return t!==void 0&&t.enterprise!==void 0}class Hp{constructor(e){if(this.siteKey="",this.emailPasswordEnabled=!1,e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.emailPasswordEnabled=e.recaptchaEnforcementState.some(n=>n.provider==="EMAIL_PASSWORD_PROVIDER"&&n.enforcementState!=="OFF")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hE(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}function Kp(t){return new Promise((e,n)=>{const s=document.createElement("script");s.setAttribute("src",t),s.onload=e,s.onerror=r=>{const i=sn("internal-error");i.customData=r,n(i)},s.type="text/javascript",s.charset="UTF-8",hE().appendChild(s)})}function fE(t){return`__${t}${Math.floor(Math.random()*1e6)}`}const dE="https://www.google.com/recaptcha/enterprise.js?render=",pE="recaptcha-enterprise",mE="NO_RECAPTCHA";class Wp{constructor(e){this.type=pE,this.auth=dr(e)}async verify(e="verify",n=!1){async function s(i){if(!n){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,a)=>{jp(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)a(new Error("recaptcha Enterprise site key undefined"));else{const c=new Hp(l);return i.tenantId==null?i._agentRecaptchaConfig=c:i._tenantRecaptchaConfigs[i.tenantId]=c,o(c.siteKey)}}).catch(l=>{a(l)})})}function r(i,o,a){const l=window.grecaptcha;Vh(l)?l.enterprise.ready(()=>{l.enterprise.execute(i,{action:e}).then(c=>{o(c)}).catch(()=>{o(mE)})}):a(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((i,o)=>{s(this.auth).then(a=>{if(!n&&Vh(window.grecaptcha))r(a,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}Kp(dE+a).then(()=>{r(a,i,o)}).catch(l=>{o(l)})}}).catch(a=>{o(a)})})}}async function Do(t,e,n,s=!1){const r=new Wp(t);let i;try{i=await r.verify(n)}catch{i=await r.verify(n,!0)}const o=Object.assign({},e);return s?Object.assign(o,{captchaResp:i}):Object.assign(o,{captchaResponse:i}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gE{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const s=i=>new Promise((o,a)=>{try{const l=e(i);o(l)}catch(l){a(l)}});s.onAbort=n,this.queue.push(s);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const s of this.queue)await s(e),s.onAbort&&n.push(s.onAbort)}catch(s){n.reverse();for(const r of n)try{r()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s==null?void 0:s.message})}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yE{constructor(e,n,s,r){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=s,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Bh(this),this.idTokenSubscription=new Bh(this),this.beforeStateQueue=new gE(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Rp,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=yn(n)),this._initializationPromise=this.queue(async()=>{var s,r;if(!this._deleted&&(this.persistenceManager=await Ws.create(this,e),!this._deleted)){if(!((s=this._popupRedirectResolver)===null||s===void 0)&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((r=this.currentUser)===null||r===void 0?void 0:r.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUser(e){var n;const s=await this.assertedPersistence.getCurrentUser();let r=s,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,a=r==null?void 0:r._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===a)&&(l!=null&&l.user)&&(r=l.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(o){r=s,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return z(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await xo(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=G0()}async _delete(){this._deleted=!0}async updateCurrentUser(e){const n=e?mt(e):null;return n&&z(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&z(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0)}setPersistence(e){return this.queue(async()=>{await this.assertedPersistence.setPersistence(yn(e))})}async initializeRecaptchaConfig(){const e=await jp(this,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),n=new Hp(e);this.tenantId==null?this._agentRecaptchaConfig=n:this._tenantRecaptchaConfigs[this.tenantId]=n,n.emailPasswordEnabled&&new Wp(this).verify()}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Ii("auth","Firebase",e())}onAuthStateChanged(e,n,s){return this.registerStateListener(this.authStateSubscription,e,n,s)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,s){return this.registerStateListener(this.idTokenSubscription,e,n,s)}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const s=await this.getOrInitRedirectPersistenceManager(n);return e===null?s.removeCurrentUser():s.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&yn(e)||this._popupRedirectResolver;z(n,this,"argument-error"),this.redirectPersistenceManager=await Ws.create(this,[yn(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,s;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((s=this.redirectUser)===null||s===void 0?void 0:s._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const s=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==s&&(this.lastNotifiedUid=s,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,s,r){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n),o=this._isInitialized?Promise.resolve():this._initializationPromise;return z(o,this,"internal-error"),o.then(()=>i(this.currentUser)),typeof n=="function"?e.addObserver(n,s,r):e.addObserver(n)}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return z(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=$p(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const s=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());s&&(n["X-Firebase-Client"]=s);const r=await this._getAppCheckToken();return r&&(n["X-Firebase-AppCheck"]=r),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&K0(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function dr(t){return mt(t)}class Bh{constructor(e){this.auth=e,this.observer=null,this.addObserver=O_(n=>this.observer=n)}get next(){return z(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vE(t,e){const n=Fc(t,"auth");if(n.isInitialized()){const r=n.getImmediate(),i=n.getOptions();if(Co(i,e??{}))return r;Ht(r,"already-initialized")}return n.initialize({options:e})}function wE(t,e){const n=(e==null?void 0:e.persistence)||[],s=(Array.isArray(n)?n:[n]).map(yn);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(s,e==null?void 0:e.popupRedirectResolver)}function _E(t,e,n){const s=dr(t);z(s._canInitEmulator,s,"emulator-config-failed"),z(/^https?:\/\//.test(e),s,"invalid-emulator-scheme");const r=!1,i=qp(e),{host:o,port:a}=EE(e),l=a===null?"":`:${a}`;s.config.emulator={url:`${i}//${o}${l}/`},s.settings.appVerificationDisabledForTesting=!0,s.emulatorConfig=Object.freeze({host:o,port:a,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:r})}),IE()}function qp(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function EE(t){const e=qp(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const s=n[2].split("@").pop()||"",r=/^(\[[^\]]+\])(:|$)/.exec(s);if(r){const i=r[1];return{host:i,port:$h(s.substr(i.length+1))}}else{const[i,o]=s.split(":");return{host:i,port:$h(o)}}}function $h(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function IE(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kc{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return gn("not implemented")}_getIdTokenResponse(e){return gn("not implemented")}_linkToIdToken(e,n){return gn("not implemented")}_getReauthenticationResolver(e){return gn("not implemented")}}async function TE(t,e){return bs(t,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function al(t,e){return Si(t,"POST","/v1/accounts:signInWithPassword",fr(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bE(t,e){return Si(t,"POST","/v1/accounts:signInWithEmailLink",fr(t,e))}async function SE(t,e){return Si(t,"POST","/v1/accounts:signInWithEmailLink",fr(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ti extends Kc{constructor(e,n,s,r=null){super("password",s),this._email=e,this._password=n,this._tenantId=r}static _fromEmailAndPassword(e,n){return new ti(e,n,"password")}static _fromEmailAndCode(e,n,s=null){return new ti(e,n,"emailLink",s)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){var n;switch(this.signInMethod){case"password":const s={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};if(!((n=e._getRecaptchaConfig())===null||n===void 0)&&n.emailPasswordEnabled){const r=await Do(e,s,"signInWithPassword");return al(e,r)}else return al(e,s).catch(async r=>{if(r.code==="auth/missing-recaptcha-token"){console.log("Sign-in with email address and password is protected by reCAPTCHA for this project. Automatically triggering the reCAPTCHA flow and restarting the sign-in flow.");const i=await Do(e,s,"signInWithPassword");return al(e,i)}else return Promise.reject(r)});case"emailLink":return bE(e,{email:this._email,oobCode:this._password});default:Ht(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":return TE(e,{idToken:n,returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return SE(e,{idToken:n,email:this._email,oobCode:this._password});default:Ht(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qs(t,e){return Si(t,"POST","/v1/accounts:signInWithIdp",fr(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AE="http://localhost";class gs extends Kc{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new gs(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):Ht("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:s,signInMethod:r}=n,i=Vc(n,["providerId","signInMethod"]);if(!s||!r)return null;const o=new gs(s,r);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return qs(e,n)}_linkToIdToken(e,n){const s=this.buildRequest();return s.idToken=n,qs(e,s)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,qs(e,n)}buildRequest(){const e={requestUri:AE,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Ti(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function CE(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function RE(t){const e=Cr(Rr(t)).link,n=e?Cr(Rr(e)).deep_link_id:null,s=Cr(Rr(t)).deep_link_id;return(s?Cr(Rr(s)).link:null)||s||n||e||t}class Wc{constructor(e){var n,s,r,i,o,a;const l=Cr(Rr(e)),c=(n=l.apiKey)!==null&&n!==void 0?n:null,u=(s=l.oobCode)!==null&&s!==void 0?s:null,h=CE((r=l.mode)!==null&&r!==void 0?r:null);z(c&&u&&h,"argument-error"),this.apiKey=c,this.operation=h,this.code=u,this.continueUrl=(i=l.continueUrl)!==null&&i!==void 0?i:null,this.languageCode=(o=l.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(a=l.tenantId)!==null&&a!==void 0?a:null}static parseLink(e){const n=RE(e);try{return new Wc(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pr{constructor(){this.providerId=pr.PROVIDER_ID}static credential(e,n){return ti._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const s=Wc.parseLink(n);return z(s,"argument-error"),ti._fromEmailAndCode(e,s.code,s.tenantId)}}pr.PROVIDER_ID="password";pr.EMAIL_PASSWORD_SIGN_IN_METHOD="password";pr.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zp{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ai extends zp{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mn extends Ai{constructor(){super("facebook.com")}static credential(e){return gs._fromParams({providerId:Mn.PROVIDER_ID,signInMethod:Mn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Mn.credentialFromTaggedObject(e)}static credentialFromError(e){return Mn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Mn.credential(e.oauthAccessToken)}catch{return null}}}Mn.FACEBOOK_SIGN_IN_METHOD="facebook.com";Mn.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ln extends Ai{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return gs._fromParams({providerId:Ln.PROVIDER_ID,signInMethod:Ln.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Ln.credentialFromTaggedObject(e)}static credentialFromError(e){return Ln.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:s}=e;if(!n&&!s)return null;try{return Ln.credential(n,s)}catch{return null}}}Ln.GOOGLE_SIGN_IN_METHOD="google.com";Ln.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Un extends Ai{constructor(){super("github.com")}static credential(e){return gs._fromParams({providerId:Un.PROVIDER_ID,signInMethod:Un.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Un.credentialFromTaggedObject(e)}static credentialFromError(e){return Un.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Un.credential(e.oauthAccessToken)}catch{return null}}}Un.GITHUB_SIGN_IN_METHOD="github.com";Un.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fn extends Ai{constructor(){super("twitter.com")}static credential(e,n){return gs._fromParams({providerId:Fn.PROVIDER_ID,signInMethod:Fn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Fn.credentialFromTaggedObject(e)}static credentialFromError(e){return Fn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:s}=e;if(!n||!s)return null;try{return Fn.credential(n,s)}catch{return null}}}Fn.TWITTER_SIGN_IN_METHOD="twitter.com";Fn.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ll(t,e){return Si(t,"POST","/v1/accounts:signUp",fr(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ys{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,s,r=!1){const i=await fs._fromIdTokenResponse(e,s,r),o=jh(s);return new ys({user:i,providerId:o,_tokenResponse:s,operationType:n})}static async _forOperation(e,n,s){await e._updateTokensIfNecessary(s,!0);const r=jh(s);return new ys({user:e,providerId:r,_tokenResponse:s,operationType:n})}}function jh(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class No extends kn{constructor(e,n,s,r){var i;super(n.code,n.message),this.operationType=s,this.user=r,Object.setPrototypeOf(this,No.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:n.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(e,n,s,r){return new No(e,n,s,r)}}function Gp(t,e,n,s){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?No._fromErrorAndOperation(t,i,e,s):i})}async function kE(t,e,n=!1){const s=await er(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return ys._forOperation(t,"link",s)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xE(t,e,n=!1){const{auth:s}=t,r="reauthenticate";try{const i=await er(t,Gp(s,r,e,t),n);z(i.idToken,s,"internal-error");const o=jc(i.idToken);z(o,s,"internal-error");const{sub:a}=o;return z(t.uid===a,s,"user-mismatch"),ys._forOperation(t,r,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&Ht(s,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qp(t,e,n=!1){const s="signIn",r=await Gp(t,s,e),i=await ys._fromIdTokenResponse(t,s,r);return n||await t._updateCurrentUser(i.user),i}async function DE(t,e){return Qp(dr(t),e)}async function NE(t,e,n){var s;const r=dr(t),i={returnSecureToken:!0,email:e,password:n,clientType:"CLIENT_TYPE_WEB"};let o;if(!((s=r._getRecaptchaConfig())===null||s===void 0)&&s.emailPasswordEnabled){const c=await Do(r,i,"signUpPassword");o=ll(r,c)}else o=ll(r,i).catch(async c=>{if(c.code==="auth/missing-recaptcha-token"){console.log("Sign-up is protected by reCAPTCHA for this project. Automatically triggering the reCAPTCHA flow and restarting the sign-up flow.");const u=await Do(r,i,"signUpPassword");return ll(r,u)}else return Promise.reject(c)});const a=await o.catch(c=>Promise.reject(c)),l=await ys._fromIdTokenResponse(r,"signIn",a);return await r._updateCurrentUser(l.user),l}function OE(t,e,n){return DE(mt(t),pr.credential(e,n))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function PE(t,e){return bs(t,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ME(t,{displayName:e,photoURL:n}){if(e===void 0&&n===void 0)return;const s=mt(t),i={idToken:await s.getIdToken(),displayName:e,photoUrl:n,returnSecureToken:!0},o=await er(s,PE(s.auth,i));s.displayName=o.displayName||null,s.photoURL=o.photoUrl||null;const a=s.providerData.find(({providerId:l})=>l==="password");a&&(a.displayName=s.displayName,a.photoURL=s.photoURL),await s._updateTokensIfNecessary(o)}function LE(t,e,n,s){return mt(t).onIdTokenChanged(e,n,s)}function UE(t,e,n){return mt(t).beforeAuthStateChanged(e,n)}function Yp(t){return mt(t).signOut()}const Oo="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xp{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Oo,"1"),this.storage.removeItem(Oo),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function FE(){const t=pt();return Hc(t)||aa(t)}const VE=1e3,BE=10;class Jp extends Xp{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=FE()&&uE(),this.fallbackToPolling=Bp(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const s=this.storage.getItem(n),r=this.localCache[n];s!==r&&e(n,r,s)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,l)=>{this.notifyListeners(o,l)});return}const s=e.key;if(n?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const o=this.storage.getItem(s);if(e.newValue!==o)e.newValue!==null?this.storage.setItem(s,e.newValue):this.storage.removeItem(s);else if(this.localCache[s]===e.newValue&&!n)return}const r=()=>{const o=this.storage.getItem(s);!n&&this.localCache[s]===o||this.notifyListeners(s,o)},i=this.storage.getItem(s);cE()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,BE):r()}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:s}),!0)})},VE)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}Jp.type="LOCAL";const $E=Jp;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zp extends Xp{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}Zp.type="SESSION";const em=Zp;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jE(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class la{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(r=>r.isListeningto(e));if(n)return n;const s=new la(e);return this.receivers.push(s),s}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:s,eventType:r,data:i}=n.data,o=this.handlersMap[r];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:s,eventType:r});const a=Array.from(o).map(async c=>c(n.origin,i)),l=await jE(a);n.ports[0].postMessage({status:"done",eventId:s,eventType:r,response:l})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}la.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qc(t="",e=10){let n="";for(let s=0;s<e;s++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HE{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,s=50){const r=typeof MessageChannel<"u"?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let i,o;return new Promise((a,l)=>{const c=qc("",20);r.port1.start();const u=setTimeout(()=>{l(new Error("unsupported_event"))},s);o={messageChannel:r,onMessage(h){const f=h;if(f.data.eventId===c)switch(f.data.status){case"ack":clearTimeout(u),i=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),a(f.data.response);break;default:clearTimeout(u),clearTimeout(i),l(new Error("invalid_response"));break}}},this.handlers.add(o),r.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:c,data:n},[r.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rn(){return window}function KE(t){rn().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tm(){return typeof rn().WorkerGlobalScope<"u"&&typeof rn().importScripts=="function"}async function WE(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function qE(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function zE(){return tm()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nm="firebaseLocalStorageDb",GE=1,Po="firebaseLocalStorage",sm="fbase_key";class Ci{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function ca(t,e){return t.transaction([Po],e?"readwrite":"readonly").objectStore(Po)}function QE(){const t=indexedDB.deleteDatabase(nm);return new Ci(t).toPromise()}function Hl(){const t=indexedDB.open(nm,GE);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const s=t.result;try{s.createObjectStore(Po,{keyPath:sm})}catch(r){n(r)}}),t.addEventListener("success",async()=>{const s=t.result;s.objectStoreNames.contains(Po)?e(s):(s.close(),await QE(),e(await Hl()))})})}async function Hh(t,e,n){const s=ca(t,!0).put({[sm]:e,value:n});return new Ci(s).toPromise()}async function YE(t,e){const n=ca(t,!1).get(e),s=await new Ci(n).toPromise();return s===void 0?null:s.value}function Kh(t,e){const n=ca(t,!0).delete(e);return new Ci(n).toPromise()}const XE=800,JE=3;class rm{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Hl(),this.db)}async _withRetries(e){let n=0;for(;;)try{const s=await this._openDb();return await e(s)}catch(s){if(n++>JE)throw s;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return tm()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=la._getInstance(zE()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await WE(),!this.activeServiceWorker)return;this.sender=new HE(this.activeServiceWorker);const s=await this.sender._send("ping",{},800);s&&!((e=s[0])===null||e===void 0)&&e.fulfilled&&!((n=s[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||qE()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Hl();return await Hh(e,Oo,"1"),await Kh(e,Oo),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(s=>Hh(s,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(s=>YE(s,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Kh(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(r=>{const i=ca(r,!1).getAll();return new Ci(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],s=new Set;for(const{fbase_key:r,value:i}of e)s.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),n.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!s.has(r)&&(this.notifyListeners(r,null),n.push(r));return n}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),XE)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}rm.type="LOCAL";const ZE=rm;new bi(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eI(t,e){return e?yn(e):(z(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zc extends Kc{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return qs(e,this._buildIdpRequest())}_linkToIdToken(e,n){return qs(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return qs(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function tI(t){return Qp(t.auth,new zc(t),t.bypassAuthState)}function nI(t){const{auth:e,user:n}=t;return z(n,e,"internal-error"),xE(n,new zc(t),t.bypassAuthState)}async function sI(t){const{auth:e,user:n}=t;return z(n,e,"internal-error"),kE(n,new zc(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class im{constructor(e,n,s,r,i=!1){this.auth=e,this.resolver=s,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:s,postBody:r,tenantId:i,error:o,type:a}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:n,sessionId:s,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(l))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return tI;case"linkViaPopup":case"linkViaRedirect":return sI;case"reauthViaPopup":case"reauthViaRedirect":return nI;default:Ht(this.auth,"internal-error")}}resolve(e){Tn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Tn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rI=new bi(2e3,1e4);class Ms extends im{constructor(e,n,s,r,i){super(e,n,r,i),this.provider=s,this.authWindow=null,this.pollId=null,Ms.currentPopupAction&&Ms.currentPopupAction.cancel(),Ms.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return z(e,this.auth,"internal-error"),e}async onExecution(){Tn(this.filter.length===1,"Popup operations only handle one event");const e=qc();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(sn(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(sn(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Ms.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,s;if(!((s=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||s===void 0)&&s.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(sn(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,rI.get())};e()}}Ms.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iI="pendingRedirect",uo=new Map;class oI extends im{constructor(e,n,s=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,s),this.eventId=null}async execute(){let e=uo.get(this.auth._key());if(!e){try{const s=await aI(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(s)}catch(n){e=()=>Promise.reject(n)}uo.set(this.auth._key(),e)}return this.bypassAuthState||uo.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function aI(t,e){const n=uI(e),s=cI(t);if(!await s._isAvailable())return!1;const r=await s._get(n)==="true";return await s._remove(n),r}function lI(t,e){uo.set(t._key(),e)}function cI(t){return yn(t._redirectPersistence)}function uI(t){return co(iI,t.config.apiKey,t.name)}async function hI(t,e,n=!1){const s=dr(t),r=eI(s,e),o=await new oI(s,r,n).execute();return o&&!n&&(delete o.user._redirectEventId,await s._persistUserIfCurrent(o.user),await s._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fI=10*60*1e3;class dI{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(e,s)&&(n=!0,this.sendToConsumer(e,s),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!pI(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var s;if(e.error&&!om(e)){const r=((s=e.error.code)===null||s===void 0?void 0:s.split("auth/")[1])||"internal-error";n.onError(sn(this.auth,r))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const s=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&s}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=fI&&this.cachedEventUids.clear(),this.cachedEventUids.has(Wh(e))}saveEventToCache(e){this.cachedEventUids.add(Wh(e)),this.lastProcessedEventTime=Date.now()}}function Wh(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function om({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function pI(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return om(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mI(t,e={}){return bs(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gI=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,yI=/^https?/;async function vI(t){if(t.config.emulator)return;const{authorizedDomains:e}=await mI(t);for(const n of e)try{if(wI(n))return}catch{}Ht(t,"unauthorized-domain")}function wI(t){const e=jl(),{protocol:n,hostname:s}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&s===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===s}if(!yI.test(n))return!1;if(gI.test(t))return s===t;const r=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+r+"|"+r+")$","i").test(s)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _I=new bi(3e4,6e4);function qh(){const t=rn().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function EI(t){return new Promise((e,n)=>{var s,r,i;function o(){qh(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{qh(),n(sn(t,"network-request-failed"))},timeout:_I.get()})}if(!((r=(s=rn().gapi)===null||s===void 0?void 0:s.iframes)===null||r===void 0)&&r.Iframe)e(gapi.iframes.getContext());else if(!((i=rn().gapi)===null||i===void 0)&&i.load)o();else{const a=fE("iframefcb");return rn()[a]=()=>{gapi.load?o():n(sn(t,"network-request-failed"))},Kp(`https://apis.google.com/js/api.js?onload=${a}`).catch(l=>n(l))}}).catch(e=>{throw ho=null,e})}let ho=null;function II(t){return ho=ho||EI(t),ho}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TI=new bi(5e3,15e3),bI="__/auth/iframe",SI="emulator/auth/iframe",AI={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},CI=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function RI(t){const e=t.config;z(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?$c(e,SI):`https://${t.config.authDomain}/${bI}`,s={apiKey:e.apiKey,appName:t.name,v:hr},r=CI.get(t.config.apiHost);r&&(s.eid=r);const i=t._getFrameworks();return i.length&&(s.fw=i.join(",")),`${n}?${Ti(s).slice(1)}`}async function kI(t){const e=await II(t),n=rn().gapi;return z(n,t,"internal-error"),e.open({where:document.body,url:RI(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:AI,dontclear:!0},s=>new Promise(async(r,i)=>{await s.restyle({setHideOnLeave:!1});const o=sn(t,"network-request-failed"),a=rn().setTimeout(()=>{i(o)},TI.get());function l(){rn().clearTimeout(a),r(s)}s.ping(l).then(l,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xI={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},DI=500,NI=600,OI="_blank",PI="http://localhost";class zh{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function MI(t,e,n,s=DI,r=NI){const i=Math.max((window.screen.availHeight-r)/2,0).toString(),o=Math.max((window.screen.availWidth-s)/2,0).toString();let a="";const l=Object.assign(Object.assign({},xI),{width:s.toString(),height:r.toString(),top:i,left:o}),c=pt().toLowerCase();n&&(a=Mp(c)?OI:n),Pp(c)&&(e=e||PI,l.scrollbars="yes");const u=Object.entries(l).reduce((f,[d,y])=>`${f}${d}=${y},`,"");if(lE(c)&&a!=="_self")return LI(e||"",a),new zh(null);const h=window.open(e||"",a,u);z(h,t,"popup-blocked");try{h.focus()}catch{}return new zh(h)}function LI(t,e){const n=document.createElement("a");n.href=t,n.target=e;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const UI="__/auth/handler",FI="emulator/auth/handler",VI=encodeURIComponent("fac");async function Gh(t,e,n,s,r,i){z(t.config.authDomain,t,"auth-domain-config-required"),z(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:s,v:hr,eventId:r};if(e instanceof zp){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",N_(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[u,h]of Object.entries({}))o[u]=h}if(e instanceof Ai){const u=e.getScopes().filter(h=>h!=="");u.length>0&&(o.scopes=u.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const u of Object.keys(a))a[u]===void 0&&delete a[u];const l=await t._getAppCheckToken(),c=l?`#${VI}=${encodeURIComponent(l)}`:"";return`${BI(t)}?${Ti(a).slice(1)}${c}`}function BI({config:t}){return t.emulator?$c(t,FI):`https://${t.authDomain}/${UI}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cl="webStorageSupport";class $I{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=em,this._completeRedirectFn=hI,this._overrideRedirectResult=lI}async _openPopup(e,n,s,r){var i;Tn((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=await Gh(e,n,s,jl(),r);return MI(e,o,qc())}async _openRedirect(e,n,s,r){await this._originValidation(e);const i=await Gh(e,n,s,jl(),r);return KE(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:r,promise:i}=this.eventManagers[n];return r?Promise.resolve(r):(Tn(i,"If manager is not set, promise should be"),i)}const s=this.initAndGetManager(e);return this.eventManagers[n]={promise:s},s.catch(()=>{delete this.eventManagers[n]}),s}async initAndGetManager(e){const n=await kI(e),s=new dI(e);return n.register("authEvent",r=>(z(r==null?void 0:r.authEvent,e,"invalid-auth-event"),{status:s.onEvent(r.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:s},this.iframes[e._key()]=n,s}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(cl,{type:cl},r=>{var i;const o=(i=r==null?void 0:r[0])===null||i===void 0?void 0:i[cl];o!==void 0&&n(!!o),Ht(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=vI(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Bp()||Hc()||aa()}}const jI=$I;var Qh="@firebase/auth",Yh="0.23.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HI{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(s=>{e((s==null?void 0:s.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){z(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function KI(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}function WI(t){Zs(new ps("auth",(e,{options:n})=>{const s=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=s.options;z(o&&!o.includes(":"),"invalid-api-key",{appName:s.name});const l={apiKey:o,authDomain:a,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:$p(t)},c=new yE(s,r,i,l);return wE(c,n),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,s)=>{e.getProvider("auth-internal").initialize()})),Zs(new ps("auth-internal",e=>{const n=dr(e.getProvider("auth").getImmediate());return(s=>new HI(s))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Hn(Qh,Yh,KI(t)),Hn(Qh,Yh,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qI=5*60,zI=_p("authIdTokenMaxAge")||qI;let Xh=null;const GI=t=>async e=>{const n=e&&await e.getIdTokenResult(),s=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(s&&s>zI)return;const r=n==null?void 0:n.token;Xh!==r&&(Xh=r,await fetch(t,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))};function QI(t=bp()){const e=Fc(t,"auth");if(e.isInitialized())return e.getImmediate();const n=vE(t,{popupRedirectResolver:jI,persistence:[ZE,$E,em]}),s=_p("authTokenSyncURL");if(s){const i=GI(s);UE(n,i,()=>i(n.currentUser)),LE(n,o=>i(o))}const r=vp("auth");return r&&_E(n,`http://${r}`),n}WI("Browser");var YI=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},O,Gc=Gc||{},Q=YI||self;function ua(t){var e=typeof t;return e=e!="object"?e:t?Array.isArray(t)?"array":e:"null",e=="array"||e=="object"&&typeof t.length=="number"}function ha(t){var e=typeof t;return e=="object"&&t!=null||e=="function"}function XI(t,e,n){return t.call.apply(t.bind,arguments)}function JI(t,e,n){if(!t)throw Error();if(2<arguments.length){var s=Array.prototype.slice.call(arguments,2);return function(){var r=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(r,s),t.apply(e,r)}}return function(){return t.apply(e,arguments)}}function ut(t,e,n){return Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?ut=XI:ut=JI,ut.apply(null,arguments)}function Gi(t,e){var n=Array.prototype.slice.call(arguments,1);return function(){var s=n.slice();return s.push.apply(s,arguments),t.apply(this,s)}}function Je(t,e){function n(){}n.prototype=e.prototype,t.$=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.ac=function(s,r,i){for(var o=Array(arguments.length-2),a=2;a<arguments.length;a++)o[a-2]=arguments[a];return e.prototype[r].apply(s,o)}}function es(){this.s=this.s,this.o=this.o}var ZI=0;es.prototype.s=!1;es.prototype.sa=function(){!this.s&&(this.s=!0,this.N(),ZI!=0)};es.prototype.N=function(){if(this.o)for(;this.o.length;)this.o.shift()()};const am=Array.prototype.indexOf?function(t,e){return Array.prototype.indexOf.call(t,e,void 0)}:function(t,e){if(typeof t=="string")return typeof e!="string"||e.length!=1?-1:t.indexOf(e,0);for(let n=0;n<t.length;n++)if(n in t&&t[n]===e)return n;return-1};function Qc(t){const e=t.length;if(0<e){const n=Array(e);for(let s=0;s<e;s++)n[s]=t[s];return n}return[]}function Jh(t,e){for(let n=1;n<arguments.length;n++){const s=arguments[n];if(ua(s)){const r=t.length||0,i=s.length||0;t.length=r+i;for(let o=0;o<i;o++)t[r+o]=s[o]}else t.push(s)}}function ht(t,e){this.type=t,this.g=this.target=e,this.defaultPrevented=!1}ht.prototype.h=function(){this.defaultPrevented=!0};var eT=function(){if(!Q.addEventListener||!Object.defineProperty)return!1;var t=!1,e=Object.defineProperty({},"passive",{get:function(){t=!0}});try{Q.addEventListener("test",()=>{},e),Q.removeEventListener("test",()=>{},e)}catch{}return t}();function ni(t){return/^[\s\xa0]*$/.test(t)}function fa(){var t=Q.navigator;return t&&(t=t.userAgent)?t:""}function Jt(t){return fa().indexOf(t)!=-1}function Yc(t){return Yc[" "](t),t}Yc[" "]=function(){};function tT(t,e){var n=GT;return Object.prototype.hasOwnProperty.call(n,t)?n[t]:n[t]=e(t)}var nT=Jt("Opera"),tr=Jt("Trident")||Jt("MSIE"),lm=Jt("Edge"),Kl=lm||tr,cm=Jt("Gecko")&&!(fa().toLowerCase().indexOf("webkit")!=-1&&!Jt("Edge"))&&!(Jt("Trident")||Jt("MSIE"))&&!Jt("Edge"),sT=fa().toLowerCase().indexOf("webkit")!=-1&&!Jt("Edge");function um(){var t=Q.document;return t?t.documentMode:void 0}var Wl;e:{var ul="",hl=function(){var t=fa();if(cm)return/rv:([^\);]+)(\)|;)/.exec(t);if(lm)return/Edge\/([\d\.]+)/.exec(t);if(tr)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(t);if(sT)return/WebKit\/(\S+)/.exec(t);if(nT)return/(?:Version)[ \/]?(\S+)/.exec(t)}();if(hl&&(ul=hl?hl[1]:""),tr){var fl=um();if(fl!=null&&fl>parseFloat(ul)){Wl=String(fl);break e}}Wl=ul}var ql;if(Q.document&&tr){var Zh=um();ql=Zh||parseInt(Wl,10)||void 0}else ql=void 0;var rT=ql;function si(t,e){if(ht.call(this,t?t.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,t){var n=this.type=t.type,s=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:null;if(this.target=t.target||t.srcElement,this.g=e,e=t.relatedTarget){if(cm){e:{try{Yc(e.nodeName);var r=!0;break e}catch{}r=!1}r||(e=null)}}else n=="mouseover"?e=t.fromElement:n=="mouseout"&&(e=t.toElement);this.relatedTarget=e,s?(this.clientX=s.clientX!==void 0?s.clientX:s.pageX,this.clientY=s.clientY!==void 0?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0):(this.clientX=t.clientX!==void 0?t.clientX:t.pageX,this.clientY=t.clientY!==void 0?t.clientY:t.pageY,this.screenX=t.screenX||0,this.screenY=t.screenY||0),this.button=t.button,this.key=t.key||"",this.ctrlKey=t.ctrlKey,this.altKey=t.altKey,this.shiftKey=t.shiftKey,this.metaKey=t.metaKey,this.pointerId=t.pointerId||0,this.pointerType=typeof t.pointerType=="string"?t.pointerType:iT[t.pointerType]||"",this.state=t.state,this.i=t,t.defaultPrevented&&si.$.h.call(this)}}Je(si,ht);var iT={2:"touch",3:"pen",4:"mouse"};si.prototype.h=function(){si.$.h.call(this);var t=this.i;t.preventDefault?t.preventDefault():t.returnValue=!1};var da="closure_listenable_"+(1e6*Math.random()|0),oT=0;function aT(t,e,n,s,r){this.listener=t,this.proxy=null,this.src=e,this.type=n,this.capture=!!s,this.la=r,this.key=++oT,this.fa=this.ia=!1}function pa(t){t.fa=!0,t.listener=null,t.proxy=null,t.src=null,t.la=null}function Xc(t,e,n){for(const s in t)e.call(n,t[s],s,t)}function lT(t,e){for(const n in t)e.call(void 0,t[n],n,t)}function hm(t){const e={};for(const n in t)e[n]=t[n];return e}const ef="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function fm(t,e){let n,s;for(let r=1;r<arguments.length;r++){s=arguments[r];for(n in s)t[n]=s[n];for(let i=0;i<ef.length;i++)n=ef[i],Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=s[n])}}function ma(t){this.src=t,this.g={},this.h=0}ma.prototype.add=function(t,e,n,s,r){var i=t.toString();t=this.g[i],t||(t=this.g[i]=[],this.h++);var o=Gl(t,e,s,r);return-1<o?(e=t[o],n||(e.ia=!1)):(e=new aT(e,this.src,i,!!s,r),e.ia=n,t.push(e)),e};function zl(t,e){var n=e.type;if(n in t.g){var s=t.g[n],r=am(s,e),i;(i=0<=r)&&Array.prototype.splice.call(s,r,1),i&&(pa(e),t.g[n].length==0&&(delete t.g[n],t.h--))}}function Gl(t,e,n,s){for(var r=0;r<t.length;++r){var i=t[r];if(!i.fa&&i.listener==e&&i.capture==!!n&&i.la==s)return r}return-1}var Jc="closure_lm_"+(1e6*Math.random()|0),dl={};function dm(t,e,n,s,r){if(Array.isArray(e)){for(var i=0;i<e.length;i++)dm(t,e[i],n,s,r);return null}return n=gm(n),t&&t[da]?t.O(e,n,ha(s)?!!s.capture:!1,r):cT(t,e,n,!1,s,r)}function cT(t,e,n,s,r,i){if(!e)throw Error("Invalid event type");var o=ha(r)?!!r.capture:!!r,a=eu(t);if(a||(t[Jc]=a=new ma(t)),n=a.add(e,n,s,o,i),n.proxy)return n;if(s=uT(),n.proxy=s,s.src=t,s.listener=n,t.addEventListener)eT||(r=o),r===void 0&&(r=!1),t.addEventListener(e.toString(),s,r);else if(t.attachEvent)t.attachEvent(mm(e.toString()),s);else if(t.addListener&&t.removeListener)t.addListener(s);else throw Error("addEventListener and attachEvent are unavailable.");return n}function uT(){function t(n){return e.call(t.src,t.listener,n)}const e=hT;return t}function pm(t,e,n,s,r){if(Array.isArray(e))for(var i=0;i<e.length;i++)pm(t,e[i],n,s,r);else s=ha(s)?!!s.capture:!!s,n=gm(n),t&&t[da]?(t=t.i,e=String(e).toString(),e in t.g&&(i=t.g[e],n=Gl(i,n,s,r),-1<n&&(pa(i[n]),Array.prototype.splice.call(i,n,1),i.length==0&&(delete t.g[e],t.h--)))):t&&(t=eu(t))&&(e=t.g[e.toString()],t=-1,e&&(t=Gl(e,n,s,r)),(n=-1<t?e[t]:null)&&Zc(n))}function Zc(t){if(typeof t!="number"&&t&&!t.fa){var e=t.src;if(e&&e[da])zl(e.i,t);else{var n=t.type,s=t.proxy;e.removeEventListener?e.removeEventListener(n,s,t.capture):e.detachEvent?e.detachEvent(mm(n),s):e.addListener&&e.removeListener&&e.removeListener(s),(n=eu(e))?(zl(n,t),n.h==0&&(n.src=null,e[Jc]=null)):pa(t)}}}function mm(t){return t in dl?dl[t]:dl[t]="on"+t}function hT(t,e){if(t.fa)t=!0;else{e=new si(e,this);var n=t.listener,s=t.la||t.src;t.ia&&Zc(t),t=n.call(s,e)}return t}function eu(t){return t=t[Jc],t instanceof ma?t:null}var pl="__closure_events_fn_"+(1e9*Math.random()>>>0);function gm(t){return typeof t=="function"?t:(t[pl]||(t[pl]=function(e){return t.handleEvent(e)}),t[pl])}function Xe(){es.call(this),this.i=new ma(this),this.S=this,this.J=null}Je(Xe,es);Xe.prototype[da]=!0;Xe.prototype.removeEventListener=function(t,e,n,s){pm(this,t,e,n,s)};function st(t,e){var n,s=t.J;if(s)for(n=[];s;s=s.J)n.push(s);if(t=t.S,s=e.type||e,typeof e=="string")e=new ht(e,t);else if(e instanceof ht)e.target=e.target||t;else{var r=e;e=new ht(s,t),fm(e,r)}if(r=!0,n)for(var i=n.length-1;0<=i;i--){var o=e.g=n[i];r=Qi(o,s,!0,e)&&r}if(o=e.g=t,r=Qi(o,s,!0,e)&&r,r=Qi(o,s,!1,e)&&r,n)for(i=0;i<n.length;i++)o=e.g=n[i],r=Qi(o,s,!1,e)&&r}Xe.prototype.N=function(){if(Xe.$.N.call(this),this.i){var t=this.i,e;for(e in t.g){for(var n=t.g[e],s=0;s<n.length;s++)pa(n[s]);delete t.g[e],t.h--}}this.J=null};Xe.prototype.O=function(t,e,n,s){return this.i.add(String(t),e,!1,n,s)};Xe.prototype.P=function(t,e,n,s){return this.i.add(String(t),e,!0,n,s)};function Qi(t,e,n,s){if(e=t.i.g[String(e)],!e)return!0;e=e.concat();for(var r=!0,i=0;i<e.length;++i){var o=e[i];if(o&&!o.fa&&o.capture==n){var a=o.listener,l=o.la||o.src;o.ia&&zl(t.i,o),r=a.call(l,s)!==!1&&r}}return r&&!s.defaultPrevented}var tu=Q.JSON.stringify;class fT{constructor(e,n){this.i=e,this.j=n,this.h=0,this.g=null}get(){let e;return 0<this.h?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}}function dT(){var t=nu;let e=null;return t.g&&(e=t.g,t.g=t.g.next,t.g||(t.h=null),e.next=null),e}class pT{constructor(){this.h=this.g=null}add(e,n){const s=ym.get();s.set(e,n),this.h?this.h.next=s:this.g=s,this.h=s}}var ym=new fT(()=>new mT,t=>t.reset());class mT{constructor(){this.next=this.g=this.h=null}set(e,n){this.h=e,this.g=n,this.next=null}reset(){this.next=this.g=this.h=null}}function gT(t){var e=1;t=t.split(":");const n=[];for(;0<e&&t.length;)n.push(t.shift()),e--;return t.length&&n.push(t.join(":")),n}function yT(t){Q.setTimeout(()=>{throw t},0)}let ri,ii=!1,nu=new pT,vm=()=>{const t=Q.Promise.resolve(void 0);ri=()=>{t.then(vT)}};var vT=()=>{for(var t;t=dT();){try{t.h.call(t.g)}catch(n){yT(n)}var e=ym;e.j(t),100>e.h&&(e.h++,t.next=e.g,e.g=t)}ii=!1};function ga(t,e){Xe.call(this),this.h=t||1,this.g=e||Q,this.j=ut(this.qb,this),this.l=Date.now()}Je(ga,Xe);O=ga.prototype;O.ga=!1;O.T=null;O.qb=function(){if(this.ga){var t=Date.now()-this.l;0<t&&t<.8*this.h?this.T=this.g.setTimeout(this.j,this.h-t):(this.T&&(this.g.clearTimeout(this.T),this.T=null),st(this,"tick"),this.ga&&(su(this),this.start()))}};O.start=function(){this.ga=!0,this.T||(this.T=this.g.setTimeout(this.j,this.h),this.l=Date.now())};function su(t){t.ga=!1,t.T&&(t.g.clearTimeout(t.T),t.T=null)}O.N=function(){ga.$.N.call(this),su(this),delete this.g};function ru(t,e,n){if(typeof t=="function")n&&(t=ut(t,n));else if(t&&typeof t.handleEvent=="function")t=ut(t.handleEvent,t);else throw Error("Invalid listener argument");return 2147483647<Number(e)?-1:Q.setTimeout(t,e||0)}function wm(t){t.g=ru(()=>{t.g=null,t.i&&(t.i=!1,wm(t))},t.j);const e=t.h;t.h=null,t.m.apply(null,e)}class wT extends es{constructor(e,n){super(),this.m=e,this.j=n,this.h=null,this.i=!1,this.g=null}l(e){this.h=arguments,this.g?this.i=!0:wm(this)}N(){super.N(),this.g&&(Q.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function oi(t){es.call(this),this.h=t,this.g={}}Je(oi,es);var tf=[];function _m(t,e,n,s){Array.isArray(n)||(n&&(tf[0]=n.toString()),n=tf);for(var r=0;r<n.length;r++){var i=dm(e,n[r],s||t.handleEvent,!1,t.h||t);if(!i)break;t.g[i.key]=i}}function Em(t){Xc(t.g,function(e,n){this.g.hasOwnProperty(n)&&Zc(e)},t),t.g={}}oi.prototype.N=function(){oi.$.N.call(this),Em(this)};oi.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};function ya(){this.g=!0}ya.prototype.Ea=function(){this.g=!1};function _T(t,e,n,s,r,i){t.info(function(){if(t.g)if(i)for(var o="",a=i.split("&"),l=0;l<a.length;l++){var c=a[l].split("=");if(1<c.length){var u=c[0];c=c[1];var h=u.split("_");o=2<=h.length&&h[1]=="type"?o+(u+"="+c+"&"):o+(u+"=redacted&")}}else o=null;else o=i;return"XMLHTTP REQ ("+s+") [attempt "+r+"]: "+e+`
`+n+`
`+o})}function ET(t,e,n,s,r,i,o){t.info(function(){return"XMLHTTP RESP ("+s+") [ attempt "+r+"]: "+e+`
`+n+`
`+i+" "+o})}function Ls(t,e,n,s){t.info(function(){return"XMLHTTP TEXT ("+e+"): "+TT(t,n)+(s?" "+s:"")})}function IT(t,e){t.info(function(){return"TIMEOUT: "+e})}ya.prototype.info=function(){};function TT(t,e){if(!t.g)return e;if(!e)return null;try{var n=JSON.parse(e);if(n){for(t=0;t<n.length;t++)if(Array.isArray(n[t])){var s=n[t];if(!(2>s.length)){var r=s[1];if(Array.isArray(r)&&!(1>r.length)){var i=r[0];if(i!="noop"&&i!="stop"&&i!="close")for(var o=1;o<r.length;o++)r[o]=""}}}}return tu(n)}catch{return e}}var Ss={},nf=null;function va(){return nf=nf||new Xe}Ss.Ta="serverreachability";function Im(t){ht.call(this,Ss.Ta,t)}Je(Im,ht);function ai(t){const e=va();st(e,new Im(e))}Ss.STAT_EVENT="statevent";function Tm(t,e){ht.call(this,Ss.STAT_EVENT,t),this.stat=e}Je(Tm,ht);function _t(t){const e=va();st(e,new Tm(e,t))}Ss.Ua="timingevent";function bm(t,e){ht.call(this,Ss.Ua,t),this.size=e}Je(bm,ht);function Ri(t,e){if(typeof t!="function")throw Error("Fn must not be null and must be a function");return Q.setTimeout(function(){t()},e)}var wa={NO_ERROR:0,rb:1,Eb:2,Db:3,yb:4,Cb:5,Fb:6,Qa:7,TIMEOUT:8,Ib:9},Sm={wb:"complete",Sb:"success",Ra:"error",Qa:"abort",Kb:"ready",Lb:"readystatechange",TIMEOUT:"timeout",Gb:"incrementaldata",Jb:"progress",zb:"downloadprogress",$b:"uploadprogress"};function iu(){}iu.prototype.h=null;function sf(t){return t.h||(t.h=t.i())}function Am(){}var ki={OPEN:"a",vb:"b",Ra:"c",Hb:"d"};function ou(){ht.call(this,"d")}Je(ou,ht);function au(){ht.call(this,"c")}Je(au,ht);var Ql;function _a(){}Je(_a,iu);_a.prototype.g=function(){return new XMLHttpRequest};_a.prototype.i=function(){return{}};Ql=new _a;function xi(t,e,n,s){this.l=t,this.j=e,this.m=n,this.W=s||1,this.U=new oi(this),this.P=bT,t=Kl?125:void 0,this.V=new ga(t),this.I=null,this.i=!1,this.s=this.A=this.v=this.L=this.G=this.Y=this.B=null,this.F=[],this.g=null,this.C=0,this.o=this.u=null,this.ca=-1,this.J=!1,this.O=0,this.M=null,this.ba=this.K=this.aa=this.S=!1,this.h=new Cm}function Cm(){this.i=null,this.g="",this.h=!1}var bT=45e3,Yl={},Mo={};O=xi.prototype;O.setTimeout=function(t){this.P=t};function Xl(t,e,n){t.L=1,t.v=Ia(bn(e)),t.s=n,t.S=!0,Rm(t,null)}function Rm(t,e){t.G=Date.now(),Di(t),t.A=bn(t.v);var n=t.A,s=t.W;Array.isArray(s)||(s=[String(s)]),Lm(n.i,"t",s),t.C=0,n=t.l.J,t.h=new Cm,t.g=sg(t.l,n?e:null,!t.s),0<t.O&&(t.M=new wT(ut(t.Pa,t,t.g),t.O)),_m(t.U,t.g,"readystatechange",t.nb),e=t.I?hm(t.I):{},t.s?(t.u||(t.u="POST"),e["Content-Type"]="application/x-www-form-urlencoded",t.g.ha(t.A,t.u,t.s,e)):(t.u="GET",t.g.ha(t.A,t.u,null,e)),ai(),_T(t.j,t.u,t.A,t.m,t.W,t.s)}O.nb=function(t){t=t.target;const e=this.M;e&&Zt(t)==3?e.l():this.Pa(t)};O.Pa=function(t){try{if(t==this.g)e:{const u=Zt(this.g);var e=this.g.Ia();const h=this.g.da();if(!(3>u)&&(u!=3||Kl||this.g&&(this.h.h||this.g.ja()||lf(this.g)))){this.J||u!=4||e==7||(e==8||0>=h?ai(3):ai(2)),Ea(this);var n=this.g.da();this.ca=n;t:if(km(this)){var s=lf(this.g);t="";var r=s.length,i=Zt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){as(this),$r(this);var o="";break t}this.h.i=new Q.TextDecoder}for(e=0;e<r;e++)this.h.h=!0,t+=this.h.i.decode(s[e],{stream:i&&e==r-1});s.splice(0,r),this.h.g+=t,this.C=0,o=this.h.g}else o=this.g.ja();if(this.i=n==200,ET(this.j,this.u,this.A,this.m,this.W,u,n),this.i){if(this.aa&&!this.K){t:{if(this.g){var a,l=this.g;if((a=l.g?l.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!ni(a)){var c=a;break t}}c=null}if(n=c)Ls(this.j,this.m,n,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Jl(this,n);else{this.i=!1,this.o=3,_t(12),as(this),$r(this);break e}}this.S?(xm(this,u,o),Kl&&this.i&&u==3&&(_m(this.U,this.V,"tick",this.mb),this.V.start())):(Ls(this.j,this.m,o,null),Jl(this,o)),u==4&&as(this),this.i&&!this.J&&(u==4?Zm(this.l,this):(this.i=!1,Di(this)))}else WT(this.g),n==400&&0<o.indexOf("Unknown SID")?(this.o=3,_t(12)):(this.o=0,_t(13)),as(this),$r(this)}}}catch{}finally{}};function km(t){return t.g?t.u=="GET"&&t.L!=2&&t.l.Ha:!1}function xm(t,e,n){let s=!0,r;for(;!t.J&&t.C<n.length;)if(r=ST(t,n),r==Mo){e==4&&(t.o=4,_t(14),s=!1),Ls(t.j,t.m,null,"[Incomplete Response]");break}else if(r==Yl){t.o=4,_t(15),Ls(t.j,t.m,n,"[Invalid Chunk]"),s=!1;break}else Ls(t.j,t.m,r,null),Jl(t,r);km(t)&&r!=Mo&&r!=Yl&&(t.h.g="",t.C=0),e!=4||n.length!=0||t.h.h||(t.o=1,_t(16),s=!1),t.i=t.i&&s,s?0<n.length&&!t.ba&&(t.ba=!0,e=t.l,e.g==t&&e.ca&&!e.M&&(e.l.info("Great, no buffering proxy detected. Bytes received: "+n.length),du(e),e.M=!0,_t(11))):(Ls(t.j,t.m,n,"[Invalid Chunked Response]"),as(t),$r(t))}O.mb=function(){if(this.g){var t=Zt(this.g),e=this.g.ja();this.C<e.length&&(Ea(this),xm(this,t,e),this.i&&t!=4&&Di(this))}};function ST(t,e){var n=t.C,s=e.indexOf(`
`,n);return s==-1?Mo:(n=Number(e.substring(n,s)),isNaN(n)?Yl:(s+=1,s+n>e.length?Mo:(e=e.slice(s,s+n),t.C=s+n,e)))}O.cancel=function(){this.J=!0,as(this)};function Di(t){t.Y=Date.now()+t.P,Dm(t,t.P)}function Dm(t,e){if(t.B!=null)throw Error("WatchDog timer not null");t.B=Ri(ut(t.lb,t),e)}function Ea(t){t.B&&(Q.clearTimeout(t.B),t.B=null)}O.lb=function(){this.B=null;const t=Date.now();0<=t-this.Y?(IT(this.j,this.A),this.L!=2&&(ai(),_t(17)),as(this),this.o=2,$r(this)):Dm(this,this.Y-t)};function $r(t){t.l.H==0||t.J||Zm(t.l,t)}function as(t){Ea(t);var e=t.M;e&&typeof e.sa=="function"&&e.sa(),t.M=null,su(t.V),Em(t.U),t.g&&(e=t.g,t.g=null,e.abort(),e.sa())}function Jl(t,e){try{var n=t.l;if(n.H!=0&&(n.g==t||Zl(n.i,t))){if(!t.K&&Zl(n.i,t)&&n.H==3){try{var s=n.Ja.g.parse(e)}catch{s=null}if(Array.isArray(s)&&s.length==3){var r=s;if(r[0]==0){e:if(!n.u){if(n.g)if(n.g.G+3e3<t.G)Fo(n),Sa(n);else break e;fu(n),_t(18)}}else n.Fa=r[1],0<n.Fa-n.V&&37500>r[2]&&n.G&&n.A==0&&!n.v&&(n.v=Ri(ut(n.ib,n),6e3));if(1>=Vm(n.i)&&n.oa){try{n.oa()}catch{}n.oa=void 0}}else ls(n,11)}else if((t.K||n.g==t)&&Fo(n),!ni(e))for(r=n.Ja.g.parse(e),e=0;e<r.length;e++){let c=r[e];if(n.V=c[0],c=c[1],n.H==2)if(c[0]=="c"){n.K=c[1],n.pa=c[2];const u=c[3];u!=null&&(n.ra=u,n.l.info("VER="+n.ra));const h=c[4];h!=null&&(n.Ga=h,n.l.info("SVER="+n.Ga));const f=c[5];f!=null&&typeof f=="number"&&0<f&&(s=1.5*f,n.L=s,n.l.info("backChannelRequestTimeoutMs_="+s)),s=n;const d=t.g;if(d){const y=d.g?d.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(y){var i=s.i;i.g||y.indexOf("spdy")==-1&&y.indexOf("quic")==-1&&y.indexOf("h2")==-1||(i.j=i.l,i.g=new Set,i.h&&(lu(i,i.h),i.h=null))}if(s.F){const w=d.g?d.g.getResponseHeader("X-HTTP-Session-Id"):null;w&&(s.Da=w,xe(s.I,s.F,w))}}n.H=3,n.h&&n.h.Ba(),n.ca&&(n.S=Date.now()-t.G,n.l.info("Handshake RTT: "+n.S+"ms")),s=n;var o=t;if(s.wa=ng(s,s.J?s.pa:null,s.Y),o.K){Bm(s.i,o);var a=o,l=s.L;l&&a.setTimeout(l),a.B&&(Ea(a),Di(a)),s.g=o}else Xm(s);0<n.j.length&&Aa(n)}else c[0]!="stop"&&c[0]!="close"||ls(n,7);else n.H==3&&(c[0]=="stop"||c[0]=="close"?c[0]=="stop"?ls(n,7):hu(n):c[0]!="noop"&&n.h&&n.h.Aa(c),n.A=0)}}ai(4)}catch{}}function AT(t){if(t.Z&&typeof t.Z=="function")return t.Z();if(typeof Map<"u"&&t instanceof Map||typeof Set<"u"&&t instanceof Set)return Array.from(t.values());if(typeof t=="string")return t.split("");if(ua(t)){for(var e=[],n=t.length,s=0;s<n;s++)e.push(t[s]);return e}e=[],n=0;for(s in t)e[n++]=t[s];return e}function CT(t){if(t.ta&&typeof t.ta=="function")return t.ta();if(!t.Z||typeof t.Z!="function"){if(typeof Map<"u"&&t instanceof Map)return Array.from(t.keys());if(!(typeof Set<"u"&&t instanceof Set)){if(ua(t)||typeof t=="string"){var e=[];t=t.length;for(var n=0;n<t;n++)e.push(n);return e}e=[],n=0;for(const s in t)e[n++]=s;return e}}}function Nm(t,e){if(t.forEach&&typeof t.forEach=="function")t.forEach(e,void 0);else if(ua(t)||typeof t=="string")Array.prototype.forEach.call(t,e,void 0);else for(var n=CT(t),s=AT(t),r=s.length,i=0;i<r;i++)e.call(void 0,s[i],n&&n[i],t)}var Om=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function RT(t,e){if(t){t=t.split("&");for(var n=0;n<t.length;n++){var s=t[n].indexOf("="),r=null;if(0<=s){var i=t[n].substring(0,s);r=t[n].substring(s+1)}else i=t[n];e(i,r?decodeURIComponent(r.replace(/\+/g," ")):"")}}}function ds(t){if(this.g=this.s=this.j="",this.m=null,this.o=this.l="",this.h=!1,t instanceof ds){this.h=t.h,Lo(this,t.j),this.s=t.s,this.g=t.g,Uo(this,t.m),this.l=t.l;var e=t.i,n=new li;n.i=e.i,e.g&&(n.g=new Map(e.g),n.h=e.h),rf(this,n),this.o=t.o}else t&&(e=String(t).match(Om))?(this.h=!1,Lo(this,e[1]||"",!0),this.s=kr(e[2]||""),this.g=kr(e[3]||"",!0),Uo(this,e[4]),this.l=kr(e[5]||"",!0),rf(this,e[6]||"",!0),this.o=kr(e[7]||"")):(this.h=!1,this.i=new li(null,this.h))}ds.prototype.toString=function(){var t=[],e=this.j;e&&t.push(xr(e,of,!0),":");var n=this.g;return(n||e=="file")&&(t.push("//"),(e=this.s)&&t.push(xr(e,of,!0),"@"),t.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),n=this.m,n!=null&&t.push(":",String(n))),(n=this.l)&&(this.g&&n.charAt(0)!="/"&&t.push("/"),t.push(xr(n,n.charAt(0)=="/"?DT:xT,!0))),(n=this.i.toString())&&t.push("?",n),(n=this.o)&&t.push("#",xr(n,OT)),t.join("")};function bn(t){return new ds(t)}function Lo(t,e,n){t.j=n?kr(e,!0):e,t.j&&(t.j=t.j.replace(/:$/,""))}function Uo(t,e){if(e){if(e=Number(e),isNaN(e)||0>e)throw Error("Bad port number "+e);t.m=e}else t.m=null}function rf(t,e,n){e instanceof li?(t.i=e,PT(t.i,t.h)):(n||(e=xr(e,NT)),t.i=new li(e,t.h))}function xe(t,e,n){t.i.set(e,n)}function Ia(t){return xe(t,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),t}function kr(t,e){return t?e?decodeURI(t.replace(/%25/g,"%2525")):decodeURIComponent(t):""}function xr(t,e,n){return typeof t=="string"?(t=encodeURI(t).replace(e,kT),n&&(t=t.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t):null}function kT(t){return t=t.charCodeAt(0),"%"+(t>>4&15).toString(16)+(t&15).toString(16)}var of=/[#\/\?@]/g,xT=/[#\?:]/g,DT=/[#\?]/g,NT=/[#\?@]/g,OT=/#/g;function li(t,e){this.h=this.g=null,this.i=t||null,this.j=!!e}function ts(t){t.g||(t.g=new Map,t.h=0,t.i&&RT(t.i,function(e,n){t.add(decodeURIComponent(e.replace(/\+/g," ")),n)}))}O=li.prototype;O.add=function(t,e){ts(this),this.i=null,t=mr(this,t);var n=this.g.get(t);return n||this.g.set(t,n=[]),n.push(e),this.h+=1,this};function Pm(t,e){ts(t),e=mr(t,e),t.g.has(e)&&(t.i=null,t.h-=t.g.get(e).length,t.g.delete(e))}function Mm(t,e){return ts(t),e=mr(t,e),t.g.has(e)}O.forEach=function(t,e){ts(this),this.g.forEach(function(n,s){n.forEach(function(r){t.call(e,r,s,this)},this)},this)};O.ta=function(){ts(this);const t=Array.from(this.g.values()),e=Array.from(this.g.keys()),n=[];for(let s=0;s<e.length;s++){const r=t[s];for(let i=0;i<r.length;i++)n.push(e[s])}return n};O.Z=function(t){ts(this);let e=[];if(typeof t=="string")Mm(this,t)&&(e=e.concat(this.g.get(mr(this,t))));else{t=Array.from(this.g.values());for(let n=0;n<t.length;n++)e=e.concat(t[n])}return e};O.set=function(t,e){return ts(this),this.i=null,t=mr(this,t),Mm(this,t)&&(this.h-=this.g.get(t).length),this.g.set(t,[e]),this.h+=1,this};O.get=function(t,e){return t?(t=this.Z(t),0<t.length?String(t[0]):e):e};function Lm(t,e,n){Pm(t,e),0<n.length&&(t.i=null,t.g.set(mr(t,e),Qc(n)),t.h+=n.length)}O.toString=function(){if(this.i)return this.i;if(!this.g)return"";const t=[],e=Array.from(this.g.keys());for(var n=0;n<e.length;n++){var s=e[n];const i=encodeURIComponent(String(s)),o=this.Z(s);for(s=0;s<o.length;s++){var r=i;o[s]!==""&&(r+="="+encodeURIComponent(String(o[s]))),t.push(r)}}return this.i=t.join("&")};function mr(t,e){return e=String(e),t.j&&(e=e.toLowerCase()),e}function PT(t,e){e&&!t.j&&(ts(t),t.i=null,t.g.forEach(function(n,s){var r=s.toLowerCase();s!=r&&(Pm(this,s),Lm(this,r,n))},t)),t.j=e}var MT=class{constructor(t,e){this.g=t,this.map=e}};function Um(t){this.l=t||LT,Q.PerformanceNavigationTiming?(t=Q.performance.getEntriesByType("navigation"),t=0<t.length&&(t[0].nextHopProtocol=="hq"||t[0].nextHopProtocol=="h2")):t=!!(Q.g&&Q.g.Ka&&Q.g.Ka()&&Q.g.Ka().ec),this.j=t?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}var LT=10;function Fm(t){return t.h?!0:t.g?t.g.size>=t.j:!1}function Vm(t){return t.h?1:t.g?t.g.size:0}function Zl(t,e){return t.h?t.h==e:t.g?t.g.has(e):!1}function lu(t,e){t.g?t.g.add(e):t.h=e}function Bm(t,e){t.h&&t.h==e?t.h=null:t.g&&t.g.has(e)&&t.g.delete(e)}Um.prototype.cancel=function(){if(this.i=$m(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const t of this.g.values())t.cancel();this.g.clear()}};function $m(t){if(t.h!=null)return t.i.concat(t.h.F);if(t.g!=null&&t.g.size!==0){let e=t.i;for(const n of t.g.values())e=e.concat(n.F);return e}return Qc(t.i)}var UT=class{stringify(t){return Q.JSON.stringify(t,void 0)}parse(t){return Q.JSON.parse(t,void 0)}};function FT(){this.g=new UT}function VT(t,e,n){const s=n||"";try{Nm(t,function(r,i){let o=r;ha(r)&&(o=tu(r)),e.push(s+i+"="+encodeURIComponent(o))})}catch(r){throw e.push(s+"type="+encodeURIComponent("_badmap")),r}}function BT(t,e){const n=new ya;if(Q.Image){const s=new Image;s.onload=Gi(Yi,n,s,"TestLoadImage: loaded",!0,e),s.onerror=Gi(Yi,n,s,"TestLoadImage: error",!1,e),s.onabort=Gi(Yi,n,s,"TestLoadImage: abort",!1,e),s.ontimeout=Gi(Yi,n,s,"TestLoadImage: timeout",!1,e),Q.setTimeout(function(){s.ontimeout&&s.ontimeout()},1e4),s.src=t}else e(!1)}function Yi(t,e,n,s,r){try{e.onload=null,e.onerror=null,e.onabort=null,e.ontimeout=null,r(s)}catch{}}function Ni(t){this.l=t.fc||null,this.j=t.ob||!1}Je(Ni,iu);Ni.prototype.g=function(){return new Ta(this.l,this.j)};Ni.prototype.i=function(t){return function(){return t}}({});function Ta(t,e){Xe.call(this),this.F=t,this.u=e,this.m=void 0,this.readyState=cu,this.status=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.v=new Headers,this.h=null,this.C="GET",this.B="",this.g=!1,this.A=this.j=this.l=null}Je(Ta,Xe);var cu=0;O=Ta.prototype;O.open=function(t,e){if(this.readyState!=cu)throw this.abort(),Error("Error reopening a connection");this.C=t,this.B=e,this.readyState=1,ci(this)};O.send=function(t){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const e={headers:this.v,method:this.C,credentials:this.m,cache:void 0};t&&(e.body=t),(this.F||Q).fetch(new Request(this.B,e)).then(this.$a.bind(this),this.ka.bind(this))};O.abort=function(){this.response=this.responseText="",this.v=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Oi(this)),this.readyState=cu};O.$a=function(t){if(this.g&&(this.l=t,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=t.headers,this.readyState=2,ci(this)),this.g&&(this.readyState=3,ci(this),this.g)))if(this.responseType==="arraybuffer")t.arrayBuffer().then(this.Ya.bind(this),this.ka.bind(this));else if(typeof Q.ReadableStream<"u"&&"body"in t){if(this.j=t.body.getReader(),this.u){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.A=new TextDecoder;jm(this)}else t.text().then(this.Za.bind(this),this.ka.bind(this))};function jm(t){t.j.read().then(t.Xa.bind(t)).catch(t.ka.bind(t))}O.Xa=function(t){if(this.g){if(this.u&&t.value)this.response.push(t.value);else if(!this.u){var e=t.value?t.value:new Uint8Array(0);(e=this.A.decode(e,{stream:!t.done}))&&(this.response=this.responseText+=e)}t.done?Oi(this):ci(this),this.readyState==3&&jm(this)}};O.Za=function(t){this.g&&(this.response=this.responseText=t,Oi(this))};O.Ya=function(t){this.g&&(this.response=t,Oi(this))};O.ka=function(){this.g&&Oi(this)};function Oi(t){t.readyState=4,t.l=null,t.j=null,t.A=null,ci(t)}O.setRequestHeader=function(t,e){this.v.append(t,e)};O.getResponseHeader=function(t){return this.h&&this.h.get(t.toLowerCase())||""};O.getAllResponseHeaders=function(){if(!this.h)return"";const t=[],e=this.h.entries();for(var n=e.next();!n.done;)n=n.value,t.push(n[0]+": "+n[1]),n=e.next();return t.join(`\r
`)};function ci(t){t.onreadystatechange&&t.onreadystatechange.call(t)}Object.defineProperty(Ta.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(t){this.m=t?"include":"same-origin"}});var $T=Q.JSON.parse;function Ve(t){Xe.call(this),this.headers=new Map,this.u=t||null,this.h=!1,this.C=this.g=null,this.I="",this.m=0,this.j="",this.l=this.G=this.v=this.F=!1,this.B=0,this.A=null,this.K=Hm,this.L=this.M=!1}Je(Ve,Xe);var Hm="",jT=/^https?$/i,HT=["POST","PUT"];O=Ve.prototype;O.Oa=function(t){this.M=t};O.ha=function(t,e,n,s){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.I+"; newUri="+t);e=e?e.toUpperCase():"GET",this.I=t,this.j="",this.m=0,this.F=!1,this.h=!0,this.g=this.u?this.u.g():Ql.g(),this.C=this.u?sf(this.u):sf(Ql),this.g.onreadystatechange=ut(this.La,this);try{this.G=!0,this.g.open(e,String(t),!0),this.G=!1}catch(i){af(this,i);return}if(t=n||"",n=new Map(this.headers),s)if(Object.getPrototypeOf(s)===Object.prototype)for(var r in s)n.set(r,s[r]);else if(typeof s.keys=="function"&&typeof s.get=="function")for(const i of s.keys())n.set(i,s.get(i));else throw Error("Unknown input type for opt_headers: "+String(s));s=Array.from(n.keys()).find(i=>i.toLowerCase()=="content-type"),r=Q.FormData&&t instanceof Q.FormData,!(0<=am(HT,e))||s||r||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[i,o]of n)this.g.setRequestHeader(i,o);this.K&&(this.g.responseType=this.K),"withCredentials"in this.g&&this.g.withCredentials!==this.M&&(this.g.withCredentials=this.M);try{qm(this),0<this.B&&((this.L=KT(this.g))?(this.g.timeout=this.B,this.g.ontimeout=ut(this.ua,this)):this.A=ru(this.ua,this.B,this)),this.v=!0,this.g.send(t),this.v=!1}catch(i){af(this,i)}};function KT(t){return tr&&typeof t.timeout=="number"&&t.ontimeout!==void 0}O.ua=function(){typeof Gc<"u"&&this.g&&(this.j="Timed out after "+this.B+"ms, aborting",this.m=8,st(this,"timeout"),this.abort(8))};function af(t,e){t.h=!1,t.g&&(t.l=!0,t.g.abort(),t.l=!1),t.j=e,t.m=5,Km(t),ba(t)}function Km(t){t.F||(t.F=!0,st(t,"complete"),st(t,"error"))}O.abort=function(t){this.g&&this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1,this.m=t||7,st(this,"complete"),st(this,"abort"),ba(this))};O.N=function(){this.g&&(this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1),ba(this,!0)),Ve.$.N.call(this)};O.La=function(){this.s||(this.G||this.v||this.l?Wm(this):this.kb())};O.kb=function(){Wm(this)};function Wm(t){if(t.h&&typeof Gc<"u"&&(!t.C[1]||Zt(t)!=4||t.da()!=2)){if(t.v&&Zt(t)==4)ru(t.La,0,t);else if(st(t,"readystatechange"),Zt(t)==4){t.h=!1;try{const o=t.da();e:switch(o){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var e=!0;break e;default:e=!1}var n;if(!(n=e)){var s;if(s=o===0){var r=String(t.I).match(Om)[1]||null;!r&&Q.self&&Q.self.location&&(r=Q.self.location.protocol.slice(0,-1)),s=!jT.test(r?r.toLowerCase():"")}n=s}if(n)st(t,"complete"),st(t,"success");else{t.m=6;try{var i=2<Zt(t)?t.g.statusText:""}catch{i=""}t.j=i+" ["+t.da()+"]",Km(t)}}finally{ba(t)}}}}function ba(t,e){if(t.g){qm(t);const n=t.g,s=t.C[0]?()=>{}:null;t.g=null,t.C=null,e||st(t,"ready");try{n.onreadystatechange=s}catch{}}}function qm(t){t.g&&t.L&&(t.g.ontimeout=null),t.A&&(Q.clearTimeout(t.A),t.A=null)}O.isActive=function(){return!!this.g};function Zt(t){return t.g?t.g.readyState:0}O.da=function(){try{return 2<Zt(this)?this.g.status:-1}catch{return-1}};O.ja=function(){try{return this.g?this.g.responseText:""}catch{return""}};O.Wa=function(t){if(this.g){var e=this.g.responseText;return t&&e.indexOf(t)==0&&(e=e.substring(t.length)),$T(e)}};function lf(t){try{if(!t.g)return null;if("response"in t.g)return t.g.response;switch(t.K){case Hm:case"text":return t.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in t.g)return t.g.mozResponseArrayBuffer}return null}catch{return null}}function WT(t){const e={};t=(t.g&&2<=Zt(t)&&t.g.getAllResponseHeaders()||"").split(`\r
`);for(let s=0;s<t.length;s++){if(ni(t[s]))continue;var n=gT(t[s]);const r=n[0];if(n=n[1],typeof n!="string")continue;n=n.trim();const i=e[r]||[];e[r]=i,i.push(n)}lT(e,function(s){return s.join(", ")})}O.Ia=function(){return this.m};O.Sa=function(){return typeof this.j=="string"?this.j:String(this.j)};function zm(t){let e="";return Xc(t,function(n,s){e+=s,e+=":",e+=n,e+=`\r
`}),e}function uu(t,e,n){e:{for(s in n){var s=!1;break e}s=!0}s||(n=zm(n),typeof t=="string"?n!=null&&encodeURIComponent(String(n)):xe(t,e,n))}function Tr(t,e,n){return n&&n.internalChannelParams&&n.internalChannelParams[t]||e}function Gm(t){this.Ga=0,this.j=[],this.l=new ya,this.pa=this.wa=this.I=this.Y=this.g=this.Da=this.F=this.na=this.o=this.U=this.s=null,this.fb=this.W=0,this.cb=Tr("failFast",!1,t),this.G=this.v=this.u=this.m=this.h=null,this.aa=!0,this.Fa=this.V=-1,this.ba=this.A=this.C=0,this.ab=Tr("baseRetryDelayMs",5e3,t),this.hb=Tr("retryDelaySeedMs",1e4,t),this.eb=Tr("forwardChannelMaxRetries",2,t),this.xa=Tr("forwardChannelRequestTimeoutMs",2e4,t),this.va=t&&t.xmlHttpFactory||void 0,this.Ha=t&&t.dc||!1,this.L=void 0,this.J=t&&t.supportsCrossDomainXhr||!1,this.K="",this.i=new Um(t&&t.concurrentRequestLimit),this.Ja=new FT,this.P=t&&t.fastHandshake||!1,this.O=t&&t.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.bb=t&&t.bc||!1,t&&t.Ea&&this.l.Ea(),t&&t.forceLongPolling&&(this.aa=!1),this.ca=!this.P&&this.aa&&t&&t.detectBufferingProxy||!1,this.qa=void 0,t&&t.longPollingTimeout&&0<t.longPollingTimeout&&(this.qa=t.longPollingTimeout),this.oa=void 0,this.S=0,this.M=!1,this.ma=this.B=null}O=Gm.prototype;O.ra=8;O.H=1;function hu(t){if(Qm(t),t.H==3){var e=t.W++,n=bn(t.I);if(xe(n,"SID",t.K),xe(n,"RID",e),xe(n,"TYPE","terminate"),Pi(t,n),e=new xi(t,t.l,e),e.L=2,e.v=Ia(bn(n)),n=!1,Q.navigator&&Q.navigator.sendBeacon)try{n=Q.navigator.sendBeacon(e.v.toString(),"")}catch{}!n&&Q.Image&&(new Image().src=e.v,n=!0),n||(e.g=sg(e.l,null),e.g.ha(e.v)),e.G=Date.now(),Di(e)}tg(t)}function Sa(t){t.g&&(du(t),t.g.cancel(),t.g=null)}function Qm(t){Sa(t),t.u&&(Q.clearTimeout(t.u),t.u=null),Fo(t),t.i.cancel(),t.m&&(typeof t.m=="number"&&Q.clearTimeout(t.m),t.m=null)}function Aa(t){if(!Fm(t.i)&&!t.m){t.m=!0;var e=t.Na;ri||vm(),ii||(ri(),ii=!0),nu.add(e,t),t.C=0}}function qT(t,e){return Vm(t.i)>=t.i.j-(t.m?1:0)?!1:t.m?(t.j=e.F.concat(t.j),!0):t.H==1||t.H==2||t.C>=(t.cb?0:t.eb)?!1:(t.m=Ri(ut(t.Na,t,e),eg(t,t.C)),t.C++,!0)}O.Na=function(t){if(this.m)if(this.m=null,this.H==1){if(!t){this.W=Math.floor(1e5*Math.random()),t=this.W++;const r=new xi(this,this.l,t);let i=this.s;if(this.U&&(i?(i=hm(i),fm(i,this.U)):i=this.U),this.o!==null||this.O||(r.I=i,i=null),this.P)e:{for(var e=0,n=0;n<this.j.length;n++){t:{var s=this.j[n];if("__data__"in s.map&&(s=s.map.__data__,typeof s=="string")){s=s.length;break t}s=void 0}if(s===void 0)break;if(e+=s,4096<e){e=n;break e}if(e===4096||n===this.j.length-1){e=n+1;break e}}e=1e3}else e=1e3;e=Ym(this,r,e),n=bn(this.I),xe(n,"RID",t),xe(n,"CVER",22),this.F&&xe(n,"X-HTTP-Session-Id",this.F),Pi(this,n),i&&(this.O?e="headers="+encodeURIComponent(String(zm(i)))+"&"+e:this.o&&uu(n,this.o,i)),lu(this.i,r),this.bb&&xe(n,"TYPE","init"),this.P?(xe(n,"$req",e),xe(n,"SID","null"),r.aa=!0,Xl(r,n,null)):Xl(r,n,e),this.H=2}}else this.H==3&&(t?cf(this,t):this.j.length==0||Fm(this.i)||cf(this))};function cf(t,e){var n;e?n=e.m:n=t.W++;const s=bn(t.I);xe(s,"SID",t.K),xe(s,"RID",n),xe(s,"AID",t.V),Pi(t,s),t.o&&t.s&&uu(s,t.o,t.s),n=new xi(t,t.l,n,t.C+1),t.o===null&&(n.I=t.s),e&&(t.j=e.F.concat(t.j)),e=Ym(t,n,1e3),n.setTimeout(Math.round(.5*t.xa)+Math.round(.5*t.xa*Math.random())),lu(t.i,n),Xl(n,s,e)}function Pi(t,e){t.na&&Xc(t.na,function(n,s){xe(e,s,n)}),t.h&&Nm({},function(n,s){xe(e,s,n)})}function Ym(t,e,n){n=Math.min(t.j.length,n);var s=t.h?ut(t.h.Va,t.h,t):null;e:{var r=t.j;let i=-1;for(;;){const o=["count="+n];i==-1?0<n?(i=r[0].g,o.push("ofs="+i)):i=0:o.push("ofs="+i);let a=!0;for(let l=0;l<n;l++){let c=r[l].g;const u=r[l].map;if(c-=i,0>c)i=Math.max(0,r[l].g-100),a=!1;else try{VT(u,o,"req"+c+"_")}catch{s&&s(u)}}if(a){s=o.join("&");break e}}}return t=t.j.splice(0,n),e.F=t,s}function Xm(t){if(!t.g&&!t.u){t.ba=1;var e=t.Ma;ri||vm(),ii||(ri(),ii=!0),nu.add(e,t),t.A=0}}function fu(t){return t.g||t.u||3<=t.A?!1:(t.ba++,t.u=Ri(ut(t.Ma,t),eg(t,t.A)),t.A++,!0)}O.Ma=function(){if(this.u=null,Jm(this),this.ca&&!(this.M||this.g==null||0>=this.S)){var t=2*this.S;this.l.info("BP detection timer enabled: "+t),this.B=Ri(ut(this.jb,this),t)}};O.jb=function(){this.B&&(this.B=null,this.l.info("BP detection timeout reached."),this.l.info("Buffering proxy detected and switch to long-polling!"),this.G=!1,this.M=!0,_t(10),Sa(this),Jm(this))};function du(t){t.B!=null&&(Q.clearTimeout(t.B),t.B=null)}function Jm(t){t.g=new xi(t,t.l,"rpc",t.ba),t.o===null&&(t.g.I=t.s),t.g.O=0;var e=bn(t.wa);xe(e,"RID","rpc"),xe(e,"SID",t.K),xe(e,"AID",t.V),xe(e,"CI",t.G?"0":"1"),!t.G&&t.qa&&xe(e,"TO",t.qa),xe(e,"TYPE","xmlhttp"),Pi(t,e),t.o&&t.s&&uu(e,t.o,t.s),t.L&&t.g.setTimeout(t.L);var n=t.g;t=t.pa,n.L=1,n.v=Ia(bn(e)),n.s=null,n.S=!0,Rm(n,t)}O.ib=function(){this.v!=null&&(this.v=null,Sa(this),fu(this),_t(19))};function Fo(t){t.v!=null&&(Q.clearTimeout(t.v),t.v=null)}function Zm(t,e){var n=null;if(t.g==e){Fo(t),du(t),t.g=null;var s=2}else if(Zl(t.i,e))n=e.F,Bm(t.i,e),s=1;else return;if(t.H!=0){if(e.i)if(s==1){n=e.s?e.s.length:0,e=Date.now()-e.G;var r=t.C;s=va(),st(s,new bm(s,n)),Aa(t)}else Xm(t);else if(r=e.o,r==3||r==0&&0<e.ca||!(s==1&&qT(t,e)||s==2&&fu(t)))switch(n&&0<n.length&&(e=t.i,e.i=e.i.concat(n)),r){case 1:ls(t,5);break;case 4:ls(t,10);break;case 3:ls(t,6);break;default:ls(t,2)}}}function eg(t,e){let n=t.ab+Math.floor(Math.random()*t.hb);return t.isActive()||(n*=2),n*e}function ls(t,e){if(t.l.info("Error code "+e),e==2){var n=null;t.h&&(n=null);var s=ut(t.pb,t);n||(n=new ds("//www.google.com/images/cleardot.gif"),Q.location&&Q.location.protocol=="http"||Lo(n,"https"),Ia(n)),BT(n.toString(),s)}else _t(2);t.H=0,t.h&&t.h.za(e),tg(t),Qm(t)}O.pb=function(t){t?(this.l.info("Successfully pinged google.com"),_t(2)):(this.l.info("Failed to ping google.com"),_t(1))};function tg(t){if(t.H=0,t.ma=[],t.h){const e=$m(t.i);(e.length!=0||t.j.length!=0)&&(Jh(t.ma,e),Jh(t.ma,t.j),t.i.i.length=0,Qc(t.j),t.j.length=0),t.h.ya()}}function ng(t,e,n){var s=n instanceof ds?bn(n):new ds(n);if(s.g!="")e&&(s.g=e+"."+s.g),Uo(s,s.m);else{var r=Q.location;s=r.protocol,e=e?e+"."+r.hostname:r.hostname,r=+r.port;var i=new ds(null);s&&Lo(i,s),e&&(i.g=e),r&&Uo(i,r),n&&(i.l=n),s=i}return n=t.F,e=t.Da,n&&e&&xe(s,n,e),xe(s,"VER",t.ra),Pi(t,s),s}function sg(t,e,n){if(e&&!t.J)throw Error("Can't create secondary domain capable XhrIo object.");return e=n&&t.Ha&&!t.va?new Ve(new Ni({ob:!0})):new Ve(t.va),e.Oa(t.J),e}O.isActive=function(){return!!this.h&&this.h.isActive(this)};function rg(){}O=rg.prototype;O.Ba=function(){};O.Aa=function(){};O.za=function(){};O.ya=function(){};O.isActive=function(){return!0};O.Va=function(){};function Vo(){if(tr&&!(10<=Number(rT)))throw Error("Environmental error: no available transport.")}Vo.prototype.g=function(t,e){return new Lt(t,e)};function Lt(t,e){Xe.call(this),this.g=new Gm(e),this.l=t,this.h=e&&e.messageUrlParams||null,t=e&&e.messageHeaders||null,e&&e.clientProtocolHeaderRequired&&(t?t["X-Client-Protocol"]="webchannel":t={"X-Client-Protocol":"webchannel"}),this.g.s=t,t=e&&e.initMessageHeaders||null,e&&e.messageContentType&&(t?t["X-WebChannel-Content-Type"]=e.messageContentType:t={"X-WebChannel-Content-Type":e.messageContentType}),e&&e.Ca&&(t?t["X-WebChannel-Client-Profile"]=e.Ca:t={"X-WebChannel-Client-Profile":e.Ca}),this.g.U=t,(t=e&&e.cc)&&!ni(t)&&(this.g.o=t),this.A=e&&e.supportsCrossDomainXhr||!1,this.v=e&&e.sendRawJson||!1,(e=e&&e.httpSessionIdParam)&&!ni(e)&&(this.g.F=e,t=this.h,t!==null&&e in t&&(t=this.h,e in t&&delete t[e])),this.j=new gr(this)}Je(Lt,Xe);Lt.prototype.m=function(){this.g.h=this.j,this.A&&(this.g.J=!0);var t=this.g,e=this.l,n=this.h||void 0;_t(0),t.Y=e,t.na=n||{},t.G=t.aa,t.I=ng(t,null,t.Y),Aa(t)};Lt.prototype.close=function(){hu(this.g)};Lt.prototype.u=function(t){var e=this.g;if(typeof t=="string"){var n={};n.__data__=t,t=n}else this.v&&(n={},n.__data__=tu(t),t=n);e.j.push(new MT(e.fb++,t)),e.H==3&&Aa(e)};Lt.prototype.N=function(){this.g.h=null,delete this.j,hu(this.g),delete this.g,Lt.$.N.call(this)};function ig(t){ou.call(this),t.__headers__&&(this.headers=t.__headers__,this.statusCode=t.__status__,delete t.__headers__,delete t.__status__);var e=t.__sm__;if(e){e:{for(const n in e){t=n;break e}t=void 0}(this.i=t)&&(t=this.i,e=e!==null&&t in e?e[t]:void 0),this.data=e}else this.data=t}Je(ig,ou);function og(){au.call(this),this.status=1}Je(og,au);function gr(t){this.g=t}Je(gr,rg);gr.prototype.Ba=function(){st(this.g,"a")};gr.prototype.Aa=function(t){st(this.g,new ig(t))};gr.prototype.za=function(t){st(this.g,new og)};gr.prototype.ya=function(){st(this.g,"b")};function zT(){this.blockSize=-1}function Kt(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.m=Array(this.blockSize),this.i=this.h=0,this.reset()}Je(Kt,zT);Kt.prototype.reset=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.i=this.h=0};function ml(t,e,n){n||(n=0);var s=Array(16);if(typeof e=="string")for(var r=0;16>r;++r)s[r]=e.charCodeAt(n++)|e.charCodeAt(n++)<<8|e.charCodeAt(n++)<<16|e.charCodeAt(n++)<<24;else for(r=0;16>r;++r)s[r]=e[n++]|e[n++]<<8|e[n++]<<16|e[n++]<<24;e=t.g[0],n=t.g[1],r=t.g[2];var i=t.g[3],o=e+(i^n&(r^i))+s[0]+3614090360&4294967295;e=n+(o<<7&4294967295|o>>>25),o=i+(r^e&(n^r))+s[1]+3905402710&4294967295,i=e+(o<<12&4294967295|o>>>20),o=r+(n^i&(e^n))+s[2]+606105819&4294967295,r=i+(o<<17&4294967295|o>>>15),o=n+(e^r&(i^e))+s[3]+3250441966&4294967295,n=r+(o<<22&4294967295|o>>>10),o=e+(i^n&(r^i))+s[4]+4118548399&4294967295,e=n+(o<<7&4294967295|o>>>25),o=i+(r^e&(n^r))+s[5]+1200080426&4294967295,i=e+(o<<12&4294967295|o>>>20),o=r+(n^i&(e^n))+s[6]+2821735955&4294967295,r=i+(o<<17&4294967295|o>>>15),o=n+(e^r&(i^e))+s[7]+4249261313&4294967295,n=r+(o<<22&4294967295|o>>>10),o=e+(i^n&(r^i))+s[8]+1770035416&4294967295,e=n+(o<<7&4294967295|o>>>25),o=i+(r^e&(n^r))+s[9]+2336552879&4294967295,i=e+(o<<12&4294967295|o>>>20),o=r+(n^i&(e^n))+s[10]+4294925233&4294967295,r=i+(o<<17&4294967295|o>>>15),o=n+(e^r&(i^e))+s[11]+2304563134&4294967295,n=r+(o<<22&4294967295|o>>>10),o=e+(i^n&(r^i))+s[12]+1804603682&4294967295,e=n+(o<<7&4294967295|o>>>25),o=i+(r^e&(n^r))+s[13]+4254626195&4294967295,i=e+(o<<12&4294967295|o>>>20),o=r+(n^i&(e^n))+s[14]+2792965006&4294967295,r=i+(o<<17&4294967295|o>>>15),o=n+(e^r&(i^e))+s[15]+1236535329&4294967295,n=r+(o<<22&4294967295|o>>>10),o=e+(r^i&(n^r))+s[1]+4129170786&4294967295,e=n+(o<<5&4294967295|o>>>27),o=i+(n^r&(e^n))+s[6]+3225465664&4294967295,i=e+(o<<9&4294967295|o>>>23),o=r+(e^n&(i^e))+s[11]+643717713&4294967295,r=i+(o<<14&4294967295|o>>>18),o=n+(i^e&(r^i))+s[0]+3921069994&4294967295,n=r+(o<<20&4294967295|o>>>12),o=e+(r^i&(n^r))+s[5]+3593408605&4294967295,e=n+(o<<5&4294967295|o>>>27),o=i+(n^r&(e^n))+s[10]+38016083&4294967295,i=e+(o<<9&4294967295|o>>>23),o=r+(e^n&(i^e))+s[15]+3634488961&4294967295,r=i+(o<<14&4294967295|o>>>18),o=n+(i^e&(r^i))+s[4]+3889429448&4294967295,n=r+(o<<20&4294967295|o>>>12),o=e+(r^i&(n^r))+s[9]+568446438&4294967295,e=n+(o<<5&4294967295|o>>>27),o=i+(n^r&(e^n))+s[14]+3275163606&4294967295,i=e+(o<<9&4294967295|o>>>23),o=r+(e^n&(i^e))+s[3]+4107603335&4294967295,r=i+(o<<14&4294967295|o>>>18),o=n+(i^e&(r^i))+s[8]+1163531501&4294967295,n=r+(o<<20&4294967295|o>>>12),o=e+(r^i&(n^r))+s[13]+2850285829&4294967295,e=n+(o<<5&4294967295|o>>>27),o=i+(n^r&(e^n))+s[2]+4243563512&4294967295,i=e+(o<<9&4294967295|o>>>23),o=r+(e^n&(i^e))+s[7]+1735328473&4294967295,r=i+(o<<14&4294967295|o>>>18),o=n+(i^e&(r^i))+s[12]+2368359562&4294967295,n=r+(o<<20&4294967295|o>>>12),o=e+(n^r^i)+s[5]+4294588738&4294967295,e=n+(o<<4&4294967295|o>>>28),o=i+(e^n^r)+s[8]+2272392833&4294967295,i=e+(o<<11&4294967295|o>>>21),o=r+(i^e^n)+s[11]+1839030562&4294967295,r=i+(o<<16&4294967295|o>>>16),o=n+(r^i^e)+s[14]+4259657740&4294967295,n=r+(o<<23&4294967295|o>>>9),o=e+(n^r^i)+s[1]+2763975236&4294967295,e=n+(o<<4&4294967295|o>>>28),o=i+(e^n^r)+s[4]+1272893353&4294967295,i=e+(o<<11&4294967295|o>>>21),o=r+(i^e^n)+s[7]+4139469664&4294967295,r=i+(o<<16&4294967295|o>>>16),o=n+(r^i^e)+s[10]+3200236656&4294967295,n=r+(o<<23&4294967295|o>>>9),o=e+(n^r^i)+s[13]+681279174&4294967295,e=n+(o<<4&4294967295|o>>>28),o=i+(e^n^r)+s[0]+3936430074&4294967295,i=e+(o<<11&4294967295|o>>>21),o=r+(i^e^n)+s[3]+3572445317&4294967295,r=i+(o<<16&4294967295|o>>>16),o=n+(r^i^e)+s[6]+76029189&4294967295,n=r+(o<<23&4294967295|o>>>9),o=e+(n^r^i)+s[9]+3654602809&4294967295,e=n+(o<<4&4294967295|o>>>28),o=i+(e^n^r)+s[12]+3873151461&4294967295,i=e+(o<<11&4294967295|o>>>21),o=r+(i^e^n)+s[15]+530742520&4294967295,r=i+(o<<16&4294967295|o>>>16),o=n+(r^i^e)+s[2]+3299628645&4294967295,n=r+(o<<23&4294967295|o>>>9),o=e+(r^(n|~i))+s[0]+4096336452&4294967295,e=n+(o<<6&4294967295|o>>>26),o=i+(n^(e|~r))+s[7]+1126891415&4294967295,i=e+(o<<10&4294967295|o>>>22),o=r+(e^(i|~n))+s[14]+2878612391&4294967295,r=i+(o<<15&4294967295|o>>>17),o=n+(i^(r|~e))+s[5]+4237533241&4294967295,n=r+(o<<21&4294967295|o>>>11),o=e+(r^(n|~i))+s[12]+1700485571&4294967295,e=n+(o<<6&4294967295|o>>>26),o=i+(n^(e|~r))+s[3]+2399980690&4294967295,i=e+(o<<10&4294967295|o>>>22),o=r+(e^(i|~n))+s[10]+4293915773&4294967295,r=i+(o<<15&4294967295|o>>>17),o=n+(i^(r|~e))+s[1]+2240044497&4294967295,n=r+(o<<21&4294967295|o>>>11),o=e+(r^(n|~i))+s[8]+1873313359&4294967295,e=n+(o<<6&4294967295|o>>>26),o=i+(n^(e|~r))+s[15]+4264355552&4294967295,i=e+(o<<10&4294967295|o>>>22),o=r+(e^(i|~n))+s[6]+2734768916&4294967295,r=i+(o<<15&4294967295|o>>>17),o=n+(i^(r|~e))+s[13]+1309151649&4294967295,n=r+(o<<21&4294967295|o>>>11),o=e+(r^(n|~i))+s[4]+4149444226&4294967295,e=n+(o<<6&4294967295|o>>>26),o=i+(n^(e|~r))+s[11]+3174756917&4294967295,i=e+(o<<10&4294967295|o>>>22),o=r+(e^(i|~n))+s[2]+718787259&4294967295,r=i+(o<<15&4294967295|o>>>17),o=n+(i^(r|~e))+s[9]+3951481745&4294967295,t.g[0]=t.g[0]+e&4294967295,t.g[1]=t.g[1]+(r+(o<<21&4294967295|o>>>11))&4294967295,t.g[2]=t.g[2]+r&4294967295,t.g[3]=t.g[3]+i&4294967295}Kt.prototype.j=function(t,e){e===void 0&&(e=t.length);for(var n=e-this.blockSize,s=this.m,r=this.h,i=0;i<e;){if(r==0)for(;i<=n;)ml(this,t,i),i+=this.blockSize;if(typeof t=="string"){for(;i<e;)if(s[r++]=t.charCodeAt(i++),r==this.blockSize){ml(this,s),r=0;break}}else for(;i<e;)if(s[r++]=t[i++],r==this.blockSize){ml(this,s),r=0;break}}this.h=r,this.i+=e};Kt.prototype.l=function(){var t=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);t[0]=128;for(var e=1;e<t.length-8;++e)t[e]=0;var n=8*this.i;for(e=t.length-8;e<t.length;++e)t[e]=n&255,n/=256;for(this.j(t),t=Array(16),e=n=0;4>e;++e)for(var s=0;32>s;s+=8)t[n++]=this.g[e]>>>s&255;return t};function Ee(t,e){this.h=e;for(var n=[],s=!0,r=t.length-1;0<=r;r--){var i=t[r]|0;s&&i==e||(n[r]=i,s=!1)}this.g=n}var GT={};function pu(t){return-128<=t&&128>t?tT(t,function(e){return new Ee([e|0],0>e?-1:0)}):new Ee([t|0],0>t?-1:0)}function en(t){if(isNaN(t)||!isFinite(t))return zs;if(0>t)return tt(en(-t));for(var e=[],n=1,s=0;t>=n;s++)e[s]=t/n|0,n*=ec;return new Ee(e,0)}function ag(t,e){if(t.length==0)throw Error("number format error: empty string");if(e=e||10,2>e||36<e)throw Error("radix out of range: "+e);if(t.charAt(0)=="-")return tt(ag(t.substring(1),e));if(0<=t.indexOf("-"))throw Error('number format error: interior "-" character');for(var n=en(Math.pow(e,8)),s=zs,r=0;r<t.length;r+=8){var i=Math.min(8,t.length-r),o=parseInt(t.substring(r,r+i),e);8>i?(i=en(Math.pow(e,i)),s=s.R(i).add(en(o))):(s=s.R(n),s=s.add(en(o)))}return s}var ec=4294967296,zs=pu(0),tc=pu(1),uf=pu(16777216);O=Ee.prototype;O.ea=function(){if(Ut(this))return-tt(this).ea();for(var t=0,e=1,n=0;n<this.g.length;n++){var s=this.D(n);t+=(0<=s?s:ec+s)*e,e*=ec}return t};O.toString=function(t){if(t=t||10,2>t||36<t)throw Error("radix out of range: "+t);if(vn(this))return"0";if(Ut(this))return"-"+tt(this).toString(t);for(var e=en(Math.pow(t,6)),n=this,s="";;){var r=$o(n,e).g;n=Bo(n,r.R(e));var i=((0<n.g.length?n.g[0]:n.h)>>>0).toString(t);if(n=r,vn(n))return i+s;for(;6>i.length;)i="0"+i;s=i+s}};O.D=function(t){return 0>t?0:t<this.g.length?this.g[t]:this.h};function vn(t){if(t.h!=0)return!1;for(var e=0;e<t.g.length;e++)if(t.g[e]!=0)return!1;return!0}function Ut(t){return t.h==-1}O.X=function(t){return t=Bo(this,t),Ut(t)?-1:vn(t)?0:1};function tt(t){for(var e=t.g.length,n=[],s=0;s<e;s++)n[s]=~t.g[s];return new Ee(n,~t.h).add(tc)}O.abs=function(){return Ut(this)?tt(this):this};O.add=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],s=0,r=0;r<=e;r++){var i=s+(this.D(r)&65535)+(t.D(r)&65535),o=(i>>>16)+(this.D(r)>>>16)+(t.D(r)>>>16);s=o>>>16,i&=65535,o&=65535,n[r]=o<<16|i}return new Ee(n,n[n.length-1]&-2147483648?-1:0)};function Bo(t,e){return t.add(tt(e))}O.R=function(t){if(vn(this)||vn(t))return zs;if(Ut(this))return Ut(t)?tt(this).R(tt(t)):tt(tt(this).R(t));if(Ut(t))return tt(this.R(tt(t)));if(0>this.X(uf)&&0>t.X(uf))return en(this.ea()*t.ea());for(var e=this.g.length+t.g.length,n=[],s=0;s<2*e;s++)n[s]=0;for(s=0;s<this.g.length;s++)for(var r=0;r<t.g.length;r++){var i=this.D(s)>>>16,o=this.D(s)&65535,a=t.D(r)>>>16,l=t.D(r)&65535;n[2*s+2*r]+=o*l,Xi(n,2*s+2*r),n[2*s+2*r+1]+=i*l,Xi(n,2*s+2*r+1),n[2*s+2*r+1]+=o*a,Xi(n,2*s+2*r+1),n[2*s+2*r+2]+=i*a,Xi(n,2*s+2*r+2)}for(s=0;s<e;s++)n[s]=n[2*s+1]<<16|n[2*s];for(s=e;s<2*e;s++)n[s]=0;return new Ee(n,0)};function Xi(t,e){for(;(t[e]&65535)!=t[e];)t[e+1]+=t[e]>>>16,t[e]&=65535,e++}function br(t,e){this.g=t,this.h=e}function $o(t,e){if(vn(e))throw Error("division by zero");if(vn(t))return new br(zs,zs);if(Ut(t))return e=$o(tt(t),e),new br(tt(e.g),tt(e.h));if(Ut(e))return e=$o(t,tt(e)),new br(tt(e.g),e.h);if(30<t.g.length){if(Ut(t)||Ut(e))throw Error("slowDivide_ only works with positive integers.");for(var n=tc,s=e;0>=s.X(t);)n=hf(n),s=hf(s);var r=ks(n,1),i=ks(s,1);for(s=ks(s,2),n=ks(n,2);!vn(s);){var o=i.add(s);0>=o.X(t)&&(r=r.add(n),i=o),s=ks(s,1),n=ks(n,1)}return e=Bo(t,r.R(e)),new br(r,e)}for(r=zs;0<=t.X(e);){for(n=Math.max(1,Math.floor(t.ea()/e.ea())),s=Math.ceil(Math.log(n)/Math.LN2),s=48>=s?1:Math.pow(2,s-48),i=en(n),o=i.R(e);Ut(o)||0<o.X(t);)n-=s,i=en(n),o=i.R(e);vn(i)&&(i=tc),r=r.add(i),t=Bo(t,o)}return new br(r,t)}O.gb=function(t){return $o(this,t).h};O.and=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],s=0;s<e;s++)n[s]=this.D(s)&t.D(s);return new Ee(n,this.h&t.h)};O.or=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],s=0;s<e;s++)n[s]=this.D(s)|t.D(s);return new Ee(n,this.h|t.h)};O.xor=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],s=0;s<e;s++)n[s]=this.D(s)^t.D(s);return new Ee(n,this.h^t.h)};function hf(t){for(var e=t.g.length+1,n=[],s=0;s<e;s++)n[s]=t.D(s)<<1|t.D(s-1)>>>31;return new Ee(n,t.h)}function ks(t,e){var n=e>>5;e%=32;for(var s=t.g.length-n,r=[],i=0;i<s;i++)r[i]=0<e?t.D(i+n)>>>e|t.D(i+n+1)<<32-e:t.D(i+n);return new Ee(r,t.h)}Vo.prototype.createWebChannel=Vo.prototype.g;Lt.prototype.send=Lt.prototype.u;Lt.prototype.open=Lt.prototype.m;Lt.prototype.close=Lt.prototype.close;wa.NO_ERROR=0;wa.TIMEOUT=8;wa.HTTP_ERROR=6;Sm.COMPLETE="complete";Am.EventType=ki;ki.OPEN="a";ki.CLOSE="b";ki.ERROR="c";ki.MESSAGE="d";Xe.prototype.listen=Xe.prototype.O;Ve.prototype.listenOnce=Ve.prototype.P;Ve.prototype.getLastError=Ve.prototype.Sa;Ve.prototype.getLastErrorCode=Ve.prototype.Ia;Ve.prototype.getStatus=Ve.prototype.da;Ve.prototype.getResponseJson=Ve.prototype.Wa;Ve.prototype.getResponseText=Ve.prototype.ja;Ve.prototype.send=Ve.prototype.ha;Ve.prototype.setWithCredentials=Ve.prototype.Oa;Kt.prototype.digest=Kt.prototype.l;Kt.prototype.reset=Kt.prototype.reset;Kt.prototype.update=Kt.prototype.j;Ee.prototype.add=Ee.prototype.add;Ee.prototype.multiply=Ee.prototype.R;Ee.prototype.modulo=Ee.prototype.gb;Ee.prototype.compare=Ee.prototype.X;Ee.prototype.toNumber=Ee.prototype.ea;Ee.prototype.toString=Ee.prototype.toString;Ee.prototype.getBits=Ee.prototype.D;Ee.fromNumber=en;Ee.fromString=ag;var QT=function(){return new Vo},YT=function(){return va()},gl=wa,XT=Sm,JT=Ss,ff={xb:0,Ab:1,Bb:2,Ub:3,Zb:4,Wb:5,Xb:6,Vb:7,Tb:8,Yb:9,PROXY:10,NOPROXY:11,Rb:12,Nb:13,Ob:14,Mb:15,Pb:16,Qb:17,tb:18,sb:19,ub:20},ZT=Ni,Ji=Am,eb=Ve,tb=Kt,Gs=Ee;const df="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class it{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}it.UNAUTHENTICATED=new it(null),it.GOOGLE_CREDENTIALS=new it("google-credentials-uid"),it.FIRST_PARTY=new it("first-party-uid"),it.MOCK_USER=new it("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let yr="9.23.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vs=new Lc("@firebase/firestore");function pf(){return vs.logLevel}function V(t,...e){if(vs.logLevel<=de.DEBUG){const n=e.map(mu);vs.debug(`Firestore (${yr}): ${t}`,...n)}}function Sn(t,...e){if(vs.logLevel<=de.ERROR){const n=e.map(mu);vs.error(`Firestore (${yr}): ${t}`,...n)}}function ws(t,...e){if(vs.logLevel<=de.WARN){const n=e.map(mu);vs.warn(`Firestore (${yr}): ${t}`,...n)}}function mu(t){if(typeof t=="string")return t;try{return e=t,JSON.stringify(e)}catch{return t}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Y(t="Unexpected state"){const e=`FIRESTORE (${yr}) INTERNAL ASSERTION FAILED: `+t;throw Sn(e),new Error(e)}function De(t,e){t||Y()}function te(t,e){return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const T={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class H extends kn{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kn{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lg{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class cg{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(it.UNAUTHENTICATED))}shutdown(){}}class nb{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class sb{constructor(e){this.t=e,this.currentUser=it.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){let s=this.i;const r=l=>this.i!==s?(s=this.i,n(l)):Promise.resolve();let i=new Kn;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Kn,e.enqueueRetryable(()=>r(this.currentUser))};const o=()=>{const l=i;e.enqueueRetryable(async()=>{await l.promise,await r(this.currentUser)})},a=l=>{V("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.auth.addAuthTokenListener(this.o),o()};this.t.onInit(l=>a(l)),setTimeout(()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?a(l):(V("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Kn)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(s=>this.i!==e?(V("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):s?(De(typeof s.accessToken=="string"),new lg(s.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){const e=this.auth&&this.auth.getUid();return De(e===null||typeof e=="string"),new it(e)}}class rb{constructor(e,n,s){this.h=e,this.l=n,this.m=s,this.type="FirstParty",this.user=it.FIRST_PARTY,this.g=new Map}p(){return this.m?this.m():null}get headers(){this.g.set("X-Goog-AuthUser",this.h);const e=this.p();return e&&this.g.set("Authorization",e),this.l&&this.g.set("X-Goog-Iam-Authorization-Token",this.l),this.g}}class ib{constructor(e,n,s){this.h=e,this.l=n,this.m=s}getToken(){return Promise.resolve(new rb(this.h,this.l,this.m))}start(e,n){e.enqueueRetryable(()=>n(it.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class ob{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class ab{constructor(e){this.I=e,this.forceRefresh=!1,this.appCheck=null,this.T=null}start(e,n){const s=i=>{i.error!=null&&V("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.T;return this.T=i.token,V("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>s(i))};const r=i=>{V("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.appCheck.addTokenListener(this.o)};this.I.onInit(i=>r(i)),setTimeout(()=>{if(!this.appCheck){const i=this.I.getImmediate({optional:!0});i?r(i):V("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(De(typeof n.token=="string"),this.T=n.token,new ob(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lb(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let s=0;s<t;s++)n[s]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ug{static A(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/e.length)*e.length;let s="";for(;s.length<20;){const r=lb(40);for(let i=0;i<r.length;++i)s.length<20&&r[i]<n&&(s+=e.charAt(r[i]%e.length))}return s}}function ge(t,e){return t<e?-1:t>e?1:0}function nr(t,e,n){return t.length===e.length&&t.every((s,r)=>n(s,e[r]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class We{constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new H(T.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new H(T.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<-62135596800)throw new H(T.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new H(T.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return We.fromMillis(Date.now())}static fromDate(e){return We.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),s=Math.floor(1e6*(e-1e3*n));return new We(n,s)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?ge(this.nanoseconds,e.nanoseconds):ge(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J{constructor(e){this.timestamp=e}static fromTimestamp(e){return new J(e)}static min(){return new J(new We(0,0))}static max(){return new J(new We(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ui{constructor(e,n,s){n===void 0?n=0:n>e.length&&Y(),s===void 0?s=e.length-n:s>e.length-n&&Y(),this.segments=e,this.offset=n,this.len=s}get length(){return this.len}isEqual(e){return ui.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof ui?e.forEach(s=>{n.push(s)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,s=this.limit();n<s;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const s=Math.min(e.length,n.length);for(let r=0;r<s;r++){const i=e.get(r),o=n.get(r);if(i<o)return-1;if(i>o)return 1}return e.length<n.length?-1:e.length>n.length?1:0}}class Fe extends ui{construct(e,n,s){return new Fe(e,n,s)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...e){const n=[];for(const s of e){if(s.indexOf("//")>=0)throw new H(T.INVALID_ARGUMENT,`Invalid segment (${s}). Paths must not contain // in them.`);n.push(...s.split("/").filter(r=>r.length>0))}return new Fe(n)}static emptyPath(){return new Fe([])}}const cb=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class nt extends ui{construct(e,n,s){return new nt(e,n,s)}static isValidIdentifier(e){return cb.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),nt.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new nt(["__name__"])}static fromServerFormat(e){const n=[];let s="",r=0;const i=()=>{if(s.length===0)throw new H(T.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(s),s=""};let o=!1;for(;r<e.length;){const a=e[r];if(a==="\\"){if(r+1===e.length)throw new H(T.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[r+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new H(T.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);s+=l,r+=2}else a==="`"?(o=!o,r++):a!=="."||o?(s+=a,r++):(i(),r++)}if(i(),o)throw new H(T.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new nt(n)}static emptyPath(){return new nt([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K{constructor(e){this.path=e}static fromPath(e){return new K(Fe.fromString(e))}static fromName(e){return new K(Fe.fromString(e).popFirst(5))}static empty(){return new K(Fe.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Fe.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return Fe.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new K(new Fe(e.slice()))}}function ub(t,e){const n=t.toTimestamp().seconds,s=t.toTimestamp().nanoseconds+1,r=J.fromTimestamp(s===1e9?new We(n+1,0):new We(n,s));return new Qn(r,K.empty(),e)}function hb(t){return new Qn(t.readTime,t.key,-1)}class Qn{constructor(e,n,s){this.readTime=e,this.documentKey=n,this.largestBatchId=s}static min(){return new Qn(J.min(),K.empty(),-1)}static max(){return new Qn(J.max(),K.empty(),-1)}}function fb(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=K.comparator(t.documentKey,e.documentKey),n!==0?n:ge(t.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const db="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class pb{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Mi(t){if(t.code!==T.FAILED_PRECONDITION||t.message!==db)throw t;V("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&Y(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new A((s,r)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(s,r)},this.catchCallback=i=>{this.wrapFailure(n,i).next(s,r)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof A?n:A.resolve(n)}catch(n){return A.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):A.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):A.reject(n)}static resolve(e){return new A((n,s)=>{n(e)})}static reject(e){return new A((n,s)=>{s(e)})}static waitFor(e){return new A((n,s)=>{let r=0,i=0,o=!1;e.forEach(a=>{++r,a.next(()=>{++i,o&&i===r&&n()},l=>s(l))}),o=!0,i===r&&n()})}static or(e){let n=A.resolve(!1);for(const s of e)n=n.next(r=>r?A.resolve(r):s());return n}static forEach(e,n){const s=[];return e.forEach((r,i)=>{s.push(n.call(this,r,i))}),this.waitFor(s)}static mapArray(e,n){return new A((s,r)=>{const i=e.length,o=new Array(i);let a=0;for(let l=0;l<i;l++){const c=l;n(e[c]).next(u=>{o[c]=u,++a,a===i&&s(o)},u=>r(u))}})}static doWhile(e,n){return new A((s,r)=>{const i=()=>{e()===!0?n().next(()=>{i()},r):s()};i()})}}function Li(t){return t.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gu{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=s=>this.ot(s),this.ut=s=>n.writeSequenceNumber(s))}ot(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ut&&this.ut(e),e}}gu.ct=-1;function Ca(t){return t==null}function jo(t){return t===0&&1/t==-1/0}function mb(t){return typeof t=="number"&&Number.isInteger(t)&&!jo(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mf(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function As(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function hg(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Me{constructor(e,n){this.comparator=e,this.root=n||Ze.EMPTY}insert(e,n){return new Me(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,Ze.BLACK,null,null))}remove(e){return new Me(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ze.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const s=this.comparator(e,n.key);if(s===0)return n.value;s<0?n=n.left:s>0&&(n=n.right)}return null}indexOf(e){let n=0,s=this.root;for(;!s.isEmpty();){const r=this.comparator(e,s.key);if(r===0)return n+s.left.size;r<0?s=s.left:(n+=s.left.size+1,s=s.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,s)=>(e(n,s),!1))}toString(){const e=[];return this.inorderTraversal((n,s)=>(e.push(`${n}:${s}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Zi(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Zi(this.root,e,this.comparator,!1)}getReverseIterator(){return new Zi(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Zi(this.root,e,this.comparator,!0)}}class Zi{constructor(e,n,s,r){this.isReverse=r,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=n?s(e.key,n):1,n&&r&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Ze{constructor(e,n,s,r,i){this.key=e,this.value=n,this.color=s??Ze.RED,this.left=r??Ze.EMPTY,this.right=i??Ze.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,s,r,i){return new Ze(e??this.key,n??this.value,s??this.color,r??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,s){let r=this;const i=s(e,r.key);return r=i<0?r.copy(null,null,null,r.left.insert(e,n,s),null):i===0?r.copy(null,n,null,null,null):r.copy(null,null,null,null,r.right.insert(e,n,s)),r.fixUp()}removeMin(){if(this.left.isEmpty())return Ze.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let s,r=this;if(n(e,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,n),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),n(e,r.key)===0){if(r.right.isEmpty())return Ze.EMPTY;s=r.right.min(),r=r.copy(s.key,s.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,n))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Ze.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Ze.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw Y();const e=this.left.check();if(e!==this.right.check())throw Y();return e+(this.isRed()?0:1)}}Ze.EMPTY=null,Ze.RED=!0,Ze.BLACK=!1;Ze.EMPTY=new class{constructor(){this.size=0}get key(){throw Y()}get value(){throw Y()}get color(){throw Y()}get left(){throw Y()}get right(){throw Y()}copy(t,e,n,s,r){return this}insert(t,e,n){return new Ze(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ft{constructor(e){this.comparator=e,this.data=new Me(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,s)=>(e(n),!1))}forEachInRange(e,n){const s=this.data.getIteratorFrom(e[0]);for(;s.hasNext();){const r=s.getNext();if(this.comparator(r.key,e[1])>=0)return;n(r.key)}}forEachWhile(e,n){let s;for(s=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();s.hasNext();)if(!e(s.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new gf(this.data.getIterator())}getIteratorFrom(e){return new gf(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(s=>{n=n.add(s)}),n}isEqual(e){if(!(e instanceof ft)||this.size!==e.size)return!1;const n=this.data.getIterator(),s=e.data.getIterator();for(;n.hasNext();){const r=n.getNext().key,i=s.getNext().key;if(this.comparator(r,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new ft(this.comparator);return n.data=e,n}}class gf{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mt{constructor(e){this.fields=e,e.sort(nt.comparator)}static empty(){return new Mt([])}unionWith(e){let n=new ft(nt.comparator);for(const s of this.fields)n=n.add(s);for(const s of e)n=n.add(s);return new Mt(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return nr(this.fields,e.fields,(n,s)=>n.isEqual(s))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fg extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(s){try{return atob(s)}catch(r){throw typeof DOMException<"u"&&r instanceof DOMException?new fg("Invalid base64 string: "+r):r}}(e);return new gt(n)}static fromUint8Array(e){const n=function(s){let r="";for(let i=0;i<s.length;++i)r+=String.fromCharCode(s[i]);return r}(e);return new gt(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return e=this.binaryString,btoa(e);var e}toUint8Array(){return function(e){const n=new Uint8Array(e.length);for(let s=0;s<e.length;s++)n[s]=e.charCodeAt(s);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ge(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}gt.EMPTY_BYTE_STRING=new gt("");const gb=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Yn(t){if(De(!!t),typeof t=="string"){let e=0;const n=gb.exec(t);if(De(!!n),n[1]){let r=n[1];r=(r+"000000000").substr(0,9),e=Number(r)}const s=new Date(t);return{seconds:Math.floor(s.getTime()/1e3),nanos:e}}return{seconds:Ke(t.seconds),nanos:Ke(t.nanos)}}function Ke(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function _s(t){return typeof t=="string"?gt.fromBase64String(t):gt.fromUint8Array(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yu(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function vu(t){const e=t.mapValue.fields.__previous_value__;return yu(e)?vu(e):e}function hi(t){const e=Yn(t.mapValue.fields.__local_write_time__.timestampValue);return new We(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yb{constructor(e,n,s,r,i,o,a,l,c){this.databaseId=e,this.appId=n,this.persistenceKey=s,this.host=r,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.longPollingOptions=l,this.useFetchStreams=c}}class sr{constructor(e,n){this.projectId=e,this.database=n||"(default)"}static empty(){return new sr("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof sr&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eo={mapValue:{}};function Es(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?yu(t)?4:vb(t)?9007199254740991:10:Y()}function cn(t,e){if(t===e)return!0;const n=Es(t);if(n!==Es(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return hi(t).isEqual(hi(e));case 3:return function(s,r){if(typeof s.timestampValue=="string"&&typeof r.timestampValue=="string"&&s.timestampValue.length===r.timestampValue.length)return s.timestampValue===r.timestampValue;const i=Yn(s.timestampValue),o=Yn(r.timestampValue);return i.seconds===o.seconds&&i.nanos===o.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(s,r){return _s(s.bytesValue).isEqual(_s(r.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(s,r){return Ke(s.geoPointValue.latitude)===Ke(r.geoPointValue.latitude)&&Ke(s.geoPointValue.longitude)===Ke(r.geoPointValue.longitude)}(t,e);case 2:return function(s,r){if("integerValue"in s&&"integerValue"in r)return Ke(s.integerValue)===Ke(r.integerValue);if("doubleValue"in s&&"doubleValue"in r){const i=Ke(s.doubleValue),o=Ke(r.doubleValue);return i===o?jo(i)===jo(o):isNaN(i)&&isNaN(o)}return!1}(t,e);case 9:return nr(t.arrayValue.values||[],e.arrayValue.values||[],cn);case 10:return function(s,r){const i=s.mapValue.fields||{},o=r.mapValue.fields||{};if(mf(i)!==mf(o))return!1;for(const a in i)if(i.hasOwnProperty(a)&&(o[a]===void 0||!cn(i[a],o[a])))return!1;return!0}(t,e);default:return Y()}}function fi(t,e){return(t.values||[]).find(n=>cn(n,e))!==void 0}function rr(t,e){if(t===e)return 0;const n=Es(t),s=Es(e);if(n!==s)return ge(n,s);switch(n){case 0:case 9007199254740991:return 0;case 1:return ge(t.booleanValue,e.booleanValue);case 2:return function(r,i){const o=Ke(r.integerValue||r.doubleValue),a=Ke(i.integerValue||i.doubleValue);return o<a?-1:o>a?1:o===a?0:isNaN(o)?isNaN(a)?0:-1:1}(t,e);case 3:return yf(t.timestampValue,e.timestampValue);case 4:return yf(hi(t),hi(e));case 5:return ge(t.stringValue,e.stringValue);case 6:return function(r,i){const o=_s(r),a=_s(i);return o.compareTo(a)}(t.bytesValue,e.bytesValue);case 7:return function(r,i){const o=r.split("/"),a=i.split("/");for(let l=0;l<o.length&&l<a.length;l++){const c=ge(o[l],a[l]);if(c!==0)return c}return ge(o.length,a.length)}(t.referenceValue,e.referenceValue);case 8:return function(r,i){const o=ge(Ke(r.latitude),Ke(i.latitude));return o!==0?o:ge(Ke(r.longitude),Ke(i.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return function(r,i){const o=r.values||[],a=i.values||[];for(let l=0;l<o.length&&l<a.length;++l){const c=rr(o[l],a[l]);if(c)return c}return ge(o.length,a.length)}(t.arrayValue,e.arrayValue);case 10:return function(r,i){if(r===eo.mapValue&&i===eo.mapValue)return 0;if(r===eo.mapValue)return 1;if(i===eo.mapValue)return-1;const o=r.fields||{},a=Object.keys(o),l=i.fields||{},c=Object.keys(l);a.sort(),c.sort();for(let u=0;u<a.length&&u<c.length;++u){const h=ge(a[u],c[u]);if(h!==0)return h;const f=rr(o[a[u]],l[c[u]]);if(f!==0)return f}return ge(a.length,c.length)}(t.mapValue,e.mapValue);default:throw Y()}}function yf(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return ge(t,e);const n=Yn(t),s=Yn(e),r=ge(n.seconds,s.seconds);return r!==0?r:ge(n.nanos,s.nanos)}function ir(t){return nc(t)}function nc(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(s){const r=Yn(s);return`time(${r.seconds},${r.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?_s(t.bytesValue).toBase64():"referenceValue"in t?(n=t.referenceValue,K.fromName(n).toString()):"geoPointValue"in t?`geo(${(e=t.geoPointValue).latitude},${e.longitude})`:"arrayValue"in t?function(s){let r="[",i=!0;for(const o of s.values||[])i?i=!1:r+=",",r+=nc(o);return r+"]"}(t.arrayValue):"mapValue"in t?function(s){const r=Object.keys(s.fields||{}).sort();let i="{",o=!0;for(const a of r)o?o=!1:i+=",",i+=`${a}:${nc(s.fields[a])}`;return i+"}"}(t.mapValue):Y();var e,n}function sc(t){return!!t&&"integerValue"in t}function wu(t){return!!t&&"arrayValue"in t}function vf(t){return!!t&&"nullValue"in t}function wf(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function fo(t){return!!t&&"mapValue"in t}function jr(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return As(t.mapValue.fields,(n,s)=>e.mapValue.fields[n]=jr(s)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=jr(t.arrayValue.values[n]);return e}return Object.assign({},t)}function vb(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(e){this.value=e}static empty(){return new Rt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let s=0;s<e.length-1;++s)if(n=(n.mapValue.fields||{})[e.get(s)],!fo(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=jr(n)}setAll(e){let n=nt.emptyPath(),s={},r=[];e.forEach((o,a)=>{if(!n.isImmediateParentOf(a)){const l=this.getFieldsMap(n);this.applyChanges(l,s,r),s={},r=[],n=a.popLast()}o?s[a.lastSegment()]=jr(o):r.push(a.lastSegment())});const i=this.getFieldsMap(n);this.applyChanges(i,s,r)}delete(e){const n=this.field(e.popLast());fo(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return cn(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let s=0;s<e.length;++s){let r=n.mapValue.fields[e.get(s)];fo(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},n.mapValue.fields[e.get(s)]=r),n=r}return n.mapValue.fields}applyChanges(e,n,s){As(n,(r,i)=>e[r]=i);for(const r of s)delete e[r]}clone(){return new Rt(jr(this.value))}}function dg(t){const e=[];return As(t.fields,(n,s)=>{const r=new nt([n]);if(fo(s)){const i=dg(s.mapValue).fields;if(i.length===0)e.push(r);else for(const o of i)e.push(r.child(o))}else e.push(r)}),new Mt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class at{constructor(e,n,s,r,i,o,a){this.key=e,this.documentType=n,this.version=s,this.readTime=r,this.createTime=i,this.data=o,this.documentState=a}static newInvalidDocument(e){return new at(e,0,J.min(),J.min(),J.min(),Rt.empty(),0)}static newFoundDocument(e,n,s,r){return new at(e,1,n,J.min(),s,r,0)}static newNoDocument(e,n){return new at(e,2,n,J.min(),J.min(),Rt.empty(),0)}static newUnknownDocument(e,n){return new at(e,3,n,J.min(),J.min(),Rt.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(J.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Rt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Rt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=J.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof at&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new at(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ho{constructor(e,n){this.position=e,this.inclusive=n}}function _f(t,e,n){let s=0;for(let r=0;r<t.position.length;r++){const i=e[r],o=t.position[r];if(i.field.isKeyField()?s=K.comparator(K.fromName(o.referenceValue),n.key):s=rr(o,n.data.field(i.field)),i.dir==="desc"&&(s*=-1),s!==0)break}return s}function Ef(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!cn(t.position[n],e.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hr{constructor(e,n="asc"){this.field=e,this.dir=n}}function wb(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pg{}class Ge extends pg{constructor(e,n,s){super(),this.field=e,this.op=n,this.value=s}static create(e,n,s){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,s):new Eb(e,n,s):n==="array-contains"?new bb(e,s):n==="in"?new Sb(e,s):n==="not-in"?new Ab(e,s):n==="array-contains-any"?new Cb(e,s):new Ge(e,n,s)}static createKeyFieldInFilter(e,n,s){return n==="in"?new Ib(e,s):new Tb(e,s)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&this.matchesComparison(rr(n,this.value)):n!==null&&Es(this.value)===Es(n)&&this.matchesComparison(rr(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return Y()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}getFirstInequalityField(){return this.isInequality()?this.field:null}}class un extends pg{constructor(e,n){super(),this.filters=e,this.op=n,this.lt=null}static create(e,n){return new un(e,n)}matches(e){return mg(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.lt!==null||(this.lt=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.lt}getFilters(){return Object.assign([],this.filters)}getFirstInequalityField(){const e=this.ft(n=>n.isInequality());return e!==null?e.field:null}ft(e){for(const n of this.getFlattenedFilters())if(e(n))return n;return null}}function mg(t){return t.op==="and"}function gg(t){return _b(t)&&mg(t)}function _b(t){for(const e of t.filters)if(e instanceof un)return!1;return!0}function rc(t){if(t instanceof Ge)return t.field.canonicalString()+t.op.toString()+ir(t.value);if(gg(t))return t.filters.map(e=>rc(e)).join(",");{const e=t.filters.map(n=>rc(n)).join(",");return`${t.op}(${e})`}}function yg(t,e){return t instanceof Ge?function(n,s){return s instanceof Ge&&n.op===s.op&&n.field.isEqual(s.field)&&cn(n.value,s.value)}(t,e):t instanceof un?function(n,s){return s instanceof un&&n.op===s.op&&n.filters.length===s.filters.length?n.filters.reduce((r,i,o)=>r&&yg(i,s.filters[o]),!0):!1}(t,e):void Y()}function vg(t){return t instanceof Ge?function(e){return`${e.field.canonicalString()} ${e.op} ${ir(e.value)}`}(t):t instanceof un?function(e){return e.op.toString()+" {"+e.getFilters().map(vg).join(" ,")+"}"}(t):"Filter"}class Eb extends Ge{constructor(e,n,s){super(e,n,s),this.key=K.fromName(s.referenceValue)}matches(e){const n=K.comparator(e.key,this.key);return this.matchesComparison(n)}}class Ib extends Ge{constructor(e,n){super(e,"in",n),this.keys=wg("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class Tb extends Ge{constructor(e,n){super(e,"not-in",n),this.keys=wg("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function wg(t,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(s=>K.fromName(s.referenceValue))}class bb extends Ge{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return wu(n)&&fi(n.arrayValue,this.value)}}class Sb extends Ge{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&fi(this.value.arrayValue,n)}}class Ab extends Ge{constructor(e,n){super(e,"not-in",n)}matches(e){if(fi(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&!fi(this.value.arrayValue,n)}}class Cb extends Ge{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!wu(n)||!n.arrayValue.values)&&n.arrayValue.values.some(s=>fi(this.value.arrayValue,s))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rb{constructor(e,n=null,s=[],r=[],i=null,o=null,a=null){this.path=e,this.collectionGroup=n,this.orderBy=s,this.filters=r,this.limit=i,this.startAt=o,this.endAt=a,this.dt=null}}function If(t,e=null,n=[],s=[],r=null,i=null,o=null){return new Rb(t,e,n,s,r,i,o)}function _u(t){const e=te(t);if(e.dt===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(s=>rc(s)).join(","),n+="|ob:",n+=e.orderBy.map(s=>function(r){return r.field.canonicalString()+r.dir}(s)).join(","),Ca(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(s=>ir(s)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(s=>ir(s)).join(",")),e.dt=n}return e.dt}function Eu(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!wb(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!yg(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!Ef(t.startAt,e.startAt)&&Ef(t.endAt,e.endAt)}function ic(t){return K.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ra{constructor(e,n=null,s=[],r=[],i=null,o="F",a=null,l=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=s,this.filters=r,this.limit=i,this.limitType=o,this.startAt=a,this.endAt=l,this.wt=null,this._t=null,this.startAt,this.endAt}}function kb(t,e,n,s,r,i,o,a){return new Ra(t,e,n,s,r,i,o,a)}function Iu(t){return new Ra(t)}function Tf(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function xb(t){return t.explicitOrderBy.length>0?t.explicitOrderBy[0].field:null}function Db(t){for(const e of t.filters){const n=e.getFirstInequalityField();if(n!==null)return n}return null}function Nb(t){return t.collectionGroup!==null}function Qs(t){const e=te(t);if(e.wt===null){e.wt=[];const n=Db(e),s=xb(e);if(n!==null&&s===null)n.isKeyField()||e.wt.push(new Hr(n)),e.wt.push(new Hr(nt.keyField(),"asc"));else{let r=!1;for(const i of e.explicitOrderBy)e.wt.push(i),i.field.isKeyField()&&(r=!0);if(!r){const i=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";e.wt.push(new Hr(nt.keyField(),i))}}}return e.wt}function An(t){const e=te(t);if(!e._t)if(e.limitType==="F")e._t=If(e.path,e.collectionGroup,Qs(e),e.filters,e.limit,e.startAt,e.endAt);else{const n=[];for(const i of Qs(e)){const o=i.dir==="desc"?"asc":"desc";n.push(new Hr(i.field,o))}const s=e.endAt?new Ho(e.endAt.position,e.endAt.inclusive):null,r=e.startAt?new Ho(e.startAt.position,e.startAt.inclusive):null;e._t=If(e.path,e.collectionGroup,n,e.filters,e.limit,s,r)}return e._t}function oc(t,e,n){return new Ra(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function ka(t,e){return Eu(An(t),An(e))&&t.limitType===e.limitType}function _g(t){return`${_u(An(t))}|lt:${t.limitType}`}function ac(t){return`Query(target=${function(e){let n=e.path.canonicalString();return e.collectionGroup!==null&&(n+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(n+=`, filters: [${e.filters.map(s=>vg(s)).join(", ")}]`),Ca(e.limit)||(n+=", limit: "+e.limit),e.orderBy.length>0&&(n+=`, orderBy: [${e.orderBy.map(s=>function(r){return`${r.field.canonicalString()} (${r.dir})`}(s)).join(", ")}]`),e.startAt&&(n+=", startAt: ",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(s=>ir(s)).join(",")),e.endAt&&(n+=", endAt: ",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(s=>ir(s)).join(",")),`Target(${n})`}(An(t))}; limitType=${t.limitType})`}function xa(t,e){return e.isFoundDocument()&&function(n,s){const r=s.key.path;return n.collectionGroup!==null?s.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(r):K.isDocumentKey(n.path)?n.path.isEqual(r):n.path.isImmediateParentOf(r)}(t,e)&&function(n,s){for(const r of Qs(n))if(!r.field.isKeyField()&&s.data.field(r.field)===null)return!1;return!0}(t,e)&&function(n,s){for(const r of n.filters)if(!r.matches(s))return!1;return!0}(t,e)&&function(n,s){return!(n.startAt&&!function(r,i,o){const a=_f(r,i,o);return r.inclusive?a<=0:a<0}(n.startAt,Qs(n),s)||n.endAt&&!function(r,i,o){const a=_f(r,i,o);return r.inclusive?a>=0:a>0}(n.endAt,Qs(n),s))}(t,e)}function Ob(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function Eg(t){return(e,n)=>{let s=!1;for(const r of Qs(t)){const i=Pb(r,e,n);if(i!==0)return i;s=s||r.field.isKeyField()}return 0}}function Pb(t,e,n){const s=t.field.isKeyField()?K.comparator(e.key,n.key):function(r,i,o){const a=i.data.field(r),l=o.data.field(r);return a!==null&&l!==null?rr(a,l):Y()}(t.field,e,n);switch(t.dir){case"asc":return s;case"desc":return-1*s;default:return Y()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vr{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),s=this.inner[n];if(s!==void 0){for(const[r,i]of s)if(this.equalsFn(r,e))return i}}has(e){return this.get(e)!==void 0}set(e,n){const s=this.mapKeyFn(e),r=this.inner[s];if(r===void 0)return this.inner[s]=[[e,n]],void this.innerSize++;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return void(r[i]=[e,n]);r.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),s=this.inner[n];if(s===void 0)return!1;for(let r=0;r<s.length;r++)if(this.equalsFn(s[r][0],e))return s.length===1?delete this.inner[n]:s.splice(r,1),this.innerSize--,!0;return!1}forEach(e){As(this.inner,(n,s)=>{for(const[r,i]of s)e(r,i)})}isEmpty(){return hg(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mb=new Me(K.comparator);function Cn(){return Mb}const Ig=new Me(K.comparator);function Dr(...t){let e=Ig;for(const n of t)e=e.insert(n.key,n);return e}function Tg(t){let e=Ig;return t.forEach((n,s)=>e=e.insert(n,s.overlayedDocument)),e}function cs(){return Kr()}function bg(){return Kr()}function Kr(){return new vr(t=>t.toString(),(t,e)=>t.isEqual(e))}const Lb=new Me(K.comparator),Ub=new ft(K.comparator);function ae(...t){let e=Ub;for(const n of t)e=e.add(n);return e}const Fb=new ft(ge);function Vb(){return Fb}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sg(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:jo(e)?"-0":e}}function Ag(t){return{integerValue:""+t}}function Bb(t,e){return mb(e)?Ag(e):Sg(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Da{constructor(){this._=void 0}}function $b(t,e,n){return t instanceof Ko?function(s,r){const i={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return r&&yu(r)&&(r=vu(r)),r&&(i.fields.__previous_value__=r),{mapValue:i}}(n,e):t instanceof di?Rg(t,e):t instanceof pi?kg(t,e):function(s,r){const i=Cg(s,r),o=bf(i)+bf(s.gt);return sc(i)&&sc(s.gt)?Ag(o):Sg(s.serializer,o)}(t,e)}function jb(t,e,n){return t instanceof di?Rg(t,e):t instanceof pi?kg(t,e):n}function Cg(t,e){return t instanceof Wo?sc(n=e)||function(s){return!!s&&"doubleValue"in s}(n)?e:{integerValue:0}:null;var n}class Ko extends Da{}class di extends Da{constructor(e){super(),this.elements=e}}function Rg(t,e){const n=xg(e);for(const s of t.elements)n.some(r=>cn(r,s))||n.push(s);return{arrayValue:{values:n}}}class pi extends Da{constructor(e){super(),this.elements=e}}function kg(t,e){let n=xg(e);for(const s of t.elements)n=n.filter(r=>!cn(r,s));return{arrayValue:{values:n}}}class Wo extends Da{constructor(e,n){super(),this.serializer=e,this.gt=n}}function bf(t){return Ke(t.integerValue||t.doubleValue)}function xg(t){return wu(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}function Hb(t,e){return t.field.isEqual(e.field)&&function(n,s){return n instanceof di&&s instanceof di||n instanceof pi&&s instanceof pi?nr(n.elements,s.elements,cn):n instanceof Wo&&s instanceof Wo?cn(n.gt,s.gt):n instanceof Ko&&s instanceof Ko}(t.transform,e.transform)}class Kb{constructor(e,n){this.version=e,this.transformResults=n}}class on{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new on}static exists(e){return new on(void 0,e)}static updateTime(e){return new on(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function po(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class Na{}function Dg(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new Og(t.key,on.none()):new Ui(t.key,t.data,on.none());{const n=t.data,s=Rt.empty();let r=new ft(nt.comparator);for(let i of e.fields)if(!r.has(i)){let o=n.field(i);o===null&&i.length>1&&(i=i.popLast(),o=n.field(i)),o===null?s.delete(i):s.set(i,o),r=r.add(i)}return new ns(t.key,s,new Mt(r.toArray()),on.none())}}function Wb(t,e,n){t instanceof Ui?function(s,r,i){const o=s.value.clone(),a=Af(s.fieldTransforms,r,i.transformResults);o.setAll(a),r.convertToFoundDocument(i.version,o).setHasCommittedMutations()}(t,e,n):t instanceof ns?function(s,r,i){if(!po(s.precondition,r))return void r.convertToUnknownDocument(i.version);const o=Af(s.fieldTransforms,r,i.transformResults),a=r.data;a.setAll(Ng(s)),a.setAll(o),r.convertToFoundDocument(i.version,a).setHasCommittedMutations()}(t,e,n):function(s,r,i){r.convertToNoDocument(i.version).setHasCommittedMutations()}(0,e,n)}function Wr(t,e,n,s){return t instanceof Ui?function(r,i,o,a){if(!po(r.precondition,i))return o;const l=r.value.clone(),c=Cf(r.fieldTransforms,a,i);return l.setAll(c),i.convertToFoundDocument(i.version,l).setHasLocalMutations(),null}(t,e,n,s):t instanceof ns?function(r,i,o,a){if(!po(r.precondition,i))return o;const l=Cf(r.fieldTransforms,a,i),c=i.data;return c.setAll(Ng(r)),c.setAll(l),i.convertToFoundDocument(i.version,c).setHasLocalMutations(),o===null?null:o.unionWith(r.fieldMask.fields).unionWith(r.fieldTransforms.map(u=>u.field))}(t,e,n,s):function(r,i,o){return po(r.precondition,i)?(i.convertToNoDocument(i.version).setHasLocalMutations(),null):o}(t,e,n)}function qb(t,e){let n=null;for(const s of t.fieldTransforms){const r=e.data.field(s.field),i=Cg(s.transform,r||null);i!=null&&(n===null&&(n=Rt.empty()),n.set(s.field,i))}return n||null}function Sf(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(n,s){return n===void 0&&s===void 0||!(!n||!s)&&nr(n,s,(r,i)=>Hb(r,i))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class Ui extends Na{constructor(e,n,s,r=[]){super(),this.key=e,this.value=n,this.precondition=s,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class ns extends Na{constructor(e,n,s,r,i=[]){super(),this.key=e,this.data=n,this.fieldMask=s,this.precondition=r,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Ng(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const s=t.data.field(n);e.set(n,s)}}),e}function Af(t,e,n){const s=new Map;De(t.length===n.length);for(let r=0;r<n.length;r++){const i=t[r],o=i.transform,a=e.data.field(i.field);s.set(i.field,jb(o,a,n[r]))}return s}function Cf(t,e,n){const s=new Map;for(const r of t){const i=r.transform,o=n.data.field(r.field);s.set(r.field,$b(i,o,e))}return s}class Og extends Na{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class zb extends Na{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gb{constructor(e,n,s,r){this.batchId=e,this.localWriteTime=n,this.baseMutations=s,this.mutations=r}applyToRemoteDocument(e,n){const s=n.mutationResults;for(let r=0;r<this.mutations.length;r++){const i=this.mutations[r];i.key.isEqual(e.key)&&Wb(i,e,s[r])}}applyToLocalView(e,n){for(const s of this.baseMutations)s.key.isEqual(e.key)&&(n=Wr(s,e,n,this.localWriteTime));for(const s of this.mutations)s.key.isEqual(e.key)&&(n=Wr(s,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const s=bg();return this.mutations.forEach(r=>{const i=e.get(r.key),o=i.overlayedDocument;let a=this.applyToLocalView(o,i.mutatedFields);a=n.has(r.key)?null:a;const l=Dg(o,a);l!==null&&s.set(r.key,l),o.isValidDocument()||o.convertToNoDocument(J.min())}),s}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),ae())}isEqual(e){return this.batchId===e.batchId&&nr(this.mutations,e.mutations,(n,s)=>Sf(n,s))&&nr(this.baseMutations,e.baseMutations,(n,s)=>Sf(n,s))}}class Tu{constructor(e,n,s,r){this.batch=e,this.commitVersion=n,this.mutationResults=s,this.docVersions=r}static from(e,n,s){De(e.mutations.length===s.length);let r=Lb;const i=e.mutations;for(let o=0;o<i.length;o++)r=r.insert(i[o].key,s[o].version);return new Tu(e,n,s,r)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qb{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yb{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var He,ue;function Xb(t){switch(t){default:return Y();case T.CANCELLED:case T.UNKNOWN:case T.DEADLINE_EXCEEDED:case T.RESOURCE_EXHAUSTED:case T.INTERNAL:case T.UNAVAILABLE:case T.UNAUTHENTICATED:return!1;case T.INVALID_ARGUMENT:case T.NOT_FOUND:case T.ALREADY_EXISTS:case T.PERMISSION_DENIED:case T.FAILED_PRECONDITION:case T.ABORTED:case T.OUT_OF_RANGE:case T.UNIMPLEMENTED:case T.DATA_LOSS:return!0}}function Pg(t){if(t===void 0)return Sn("GRPC error has no .code"),T.UNKNOWN;switch(t){case He.OK:return T.OK;case He.CANCELLED:return T.CANCELLED;case He.UNKNOWN:return T.UNKNOWN;case He.DEADLINE_EXCEEDED:return T.DEADLINE_EXCEEDED;case He.RESOURCE_EXHAUSTED:return T.RESOURCE_EXHAUSTED;case He.INTERNAL:return T.INTERNAL;case He.UNAVAILABLE:return T.UNAVAILABLE;case He.UNAUTHENTICATED:return T.UNAUTHENTICATED;case He.INVALID_ARGUMENT:return T.INVALID_ARGUMENT;case He.NOT_FOUND:return T.NOT_FOUND;case He.ALREADY_EXISTS:return T.ALREADY_EXISTS;case He.PERMISSION_DENIED:return T.PERMISSION_DENIED;case He.FAILED_PRECONDITION:return T.FAILED_PRECONDITION;case He.ABORTED:return T.ABORTED;case He.OUT_OF_RANGE:return T.OUT_OF_RANGE;case He.UNIMPLEMENTED:return T.UNIMPLEMENTED;case He.DATA_LOSS:return T.DATA_LOSS;default:return Y()}}(ue=He||(He={}))[ue.OK=0]="OK",ue[ue.CANCELLED=1]="CANCELLED",ue[ue.UNKNOWN=2]="UNKNOWN",ue[ue.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ue[ue.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ue[ue.NOT_FOUND=5]="NOT_FOUND",ue[ue.ALREADY_EXISTS=6]="ALREADY_EXISTS",ue[ue.PERMISSION_DENIED=7]="PERMISSION_DENIED",ue[ue.UNAUTHENTICATED=16]="UNAUTHENTICATED",ue[ue.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ue[ue.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ue[ue.ABORTED=10]="ABORTED",ue[ue.OUT_OF_RANGE=11]="OUT_OF_RANGE",ue[ue.UNIMPLEMENTED=12]="UNIMPLEMENTED",ue[ue.INTERNAL=13]="INTERNAL",ue[ue.UNAVAILABLE=14]="UNAVAILABLE",ue[ue.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oa{constructor(){this.onExistenceFilterMismatchCallbacks=new Map}static get instance(){return to}static getOrCreateInstance(){return to===null&&(to=new Oa),to}onExistenceFilterMismatch(e){const n=Symbol();return this.onExistenceFilterMismatchCallbacks.set(n,e),()=>this.onExistenceFilterMismatchCallbacks.delete(n)}notifyOnExistenceFilterMismatch(e){this.onExistenceFilterMismatchCallbacks.forEach(n=>n(e))}}let to=null;/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jb(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zb=new Gs([4294967295,4294967295],0);function Rf(t){const e=Jb().encode(t),n=new tb;return n.update(e),new Uint8Array(n.digest())}function kf(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),s=e.getUint32(4,!0),r=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Gs([n,s],0),new Gs([r,i],0)]}class bu{constructor(e,n,s){if(this.bitmap=e,this.padding=n,this.hashCount=s,n<0||n>=8)throw new Nr(`Invalid padding: ${n}`);if(s<0)throw new Nr(`Invalid hash count: ${s}`);if(e.length>0&&this.hashCount===0)throw new Nr(`Invalid hash count: ${s}`);if(e.length===0&&n!==0)throw new Nr(`Invalid padding when bitmap length is 0: ${n}`);this.It=8*e.length-n,this.Tt=Gs.fromNumber(this.It)}Et(e,n,s){let r=e.add(n.multiply(Gs.fromNumber(s)));return r.compare(Zb)===1&&(r=new Gs([r.getBits(0),r.getBits(1)],0)),r.modulo(this.Tt).toNumber()}At(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}vt(e){if(this.It===0)return!1;const n=Rf(e),[s,r]=kf(n);for(let i=0;i<this.hashCount;i++){const o=this.Et(s,r,i);if(!this.At(o))return!1}return!0}static create(e,n,s){const r=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new bu(i,r,n);return s.forEach(a=>o.insert(a)),o}insert(e){if(this.It===0)return;const n=Rf(e),[s,r]=kf(n);for(let i=0;i<this.hashCount;i++){const o=this.Et(s,r,i);this.Rt(o)}}Rt(e){const n=Math.floor(e/8),s=e%8;this.bitmap[n]|=1<<s}}class Nr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pa{constructor(e,n,s,r,i){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=s,this.documentUpdates=r,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,n,s){const r=new Map;return r.set(e,Fi.createSynthesizedTargetChangeForCurrentChange(e,n,s)),new Pa(J.min(),r,new Me(ge),Cn(),ae())}}class Fi{constructor(e,n,s,r,i){this.resumeToken=e,this.current=n,this.addedDocuments=s,this.modifiedDocuments=r,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,n,s){return new Fi(s,n,ae(),ae(),ae())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mo{constructor(e,n,s,r){this.Pt=e,this.removedTargetIds=n,this.key=s,this.bt=r}}class Mg{constructor(e,n){this.targetId=e,this.Vt=n}}class Lg{constructor(e,n,s=gt.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=n,this.resumeToken=s,this.cause=r}}class xf{constructor(){this.St=0,this.Dt=Nf(),this.Ct=gt.EMPTY_BYTE_STRING,this.xt=!1,this.Nt=!0}get current(){return this.xt}get resumeToken(){return this.Ct}get kt(){return this.St!==0}get Mt(){return this.Nt}$t(e){e.approximateByteSize()>0&&(this.Nt=!0,this.Ct=e)}Ot(){let e=ae(),n=ae(),s=ae();return this.Dt.forEach((r,i)=>{switch(i){case 0:e=e.add(r);break;case 2:n=n.add(r);break;case 1:s=s.add(r);break;default:Y()}}),new Fi(this.Ct,this.xt,e,n,s)}Ft(){this.Nt=!1,this.Dt=Nf()}Bt(e,n){this.Nt=!0,this.Dt=this.Dt.insert(e,n)}Lt(e){this.Nt=!0,this.Dt=this.Dt.remove(e)}qt(){this.St+=1}Ut(){this.St-=1}Kt(){this.Nt=!0,this.xt=!0}}class eS{constructor(e){this.Gt=e,this.Qt=new Map,this.jt=Cn(),this.zt=Df(),this.Wt=new Me(ge)}Ht(e){for(const n of e.Pt)e.bt&&e.bt.isFoundDocument()?this.Jt(n,e.bt):this.Yt(n,e.key,e.bt);for(const n of e.removedTargetIds)this.Yt(n,e.key,e.bt)}Xt(e){this.forEachTarget(e,n=>{const s=this.Zt(n);switch(e.state){case 0:this.te(n)&&s.$t(e.resumeToken);break;case 1:s.Ut(),s.kt||s.Ft(),s.$t(e.resumeToken);break;case 2:s.Ut(),s.kt||this.removeTarget(n);break;case 3:this.te(n)&&(s.Kt(),s.$t(e.resumeToken));break;case 4:this.te(n)&&(this.ee(n),s.$t(e.resumeToken));break;default:Y()}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.Qt.forEach((s,r)=>{this.te(r)&&n(r)})}ne(e){var n;const s=e.targetId,r=e.Vt.count,i=this.se(s);if(i){const o=i.target;if(ic(o))if(r===0){const a=new K(o.path);this.Yt(s,a,at.newNoDocument(a,J.min()))}else De(r===1);else{const a=this.ie(s);if(a!==r){const l=this.re(e,a);if(l!==0){this.ee(s);const c=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Wt=this.Wt.insert(s,c)}(n=Oa.instance)===null||n===void 0||n.notifyOnExistenceFilterMismatch(function(c,u,h){var f,d,y,w,b,x;const R={localCacheCount:u,existenceFilterCount:h.count},M=h.unchangedNames;return M&&(R.bloomFilter={applied:c===0,hashCount:(f=M==null?void 0:M.hashCount)!==null&&f!==void 0?f:0,bitmapLength:(w=(y=(d=M==null?void 0:M.bits)===null||d===void 0?void 0:d.bitmap)===null||y===void 0?void 0:y.length)!==null&&w!==void 0?w:0,padding:(x=(b=M==null?void 0:M.bits)===null||b===void 0?void 0:b.padding)!==null&&x!==void 0?x:0}),R}(l,a,e.Vt))}}}}re(e,n){const{unchangedNames:s,count:r}=e.Vt;if(!s||!s.bits)return 1;const{bits:{bitmap:i="",padding:o=0},hashCount:a=0}=s;let l,c;try{l=_s(i).toUint8Array()}catch(u){if(u instanceof fg)return ws("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),1;throw u}try{c=new bu(l,o,a)}catch(u){return ws(u instanceof Nr?"BloomFilter error: ":"Applying bloom filter failed: ",u),1}return c.It===0?1:r!==n-this.oe(e.targetId,c)?2:0}oe(e,n){const s=this.Gt.getRemoteKeysForTarget(e);let r=0;return s.forEach(i=>{const o=this.Gt.ue(),a=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;n.vt(a)||(this.Yt(e,i,null),r++)}),r}ce(e){const n=new Map;this.Qt.forEach((i,o)=>{const a=this.se(o);if(a){if(i.current&&ic(a.target)){const l=new K(a.target.path);this.jt.get(l)!==null||this.ae(o,l)||this.Yt(o,l,at.newNoDocument(l,e))}i.Mt&&(n.set(o,i.Ot()),i.Ft())}});let s=ae();this.zt.forEach((i,o)=>{let a=!0;o.forEachWhile(l=>{const c=this.se(l);return!c||c.purpose==="TargetPurposeLimboResolution"||(a=!1,!1)}),a&&(s=s.add(i))}),this.jt.forEach((i,o)=>o.setReadTime(e));const r=new Pa(e,n,this.Wt,this.jt,s);return this.jt=Cn(),this.zt=Df(),this.Wt=new Me(ge),r}Jt(e,n){if(!this.te(e))return;const s=this.ae(e,n.key)?2:0;this.Zt(e).Bt(n.key,s),this.jt=this.jt.insert(n.key,n),this.zt=this.zt.insert(n.key,this.he(n.key).add(e))}Yt(e,n,s){if(!this.te(e))return;const r=this.Zt(e);this.ae(e,n)?r.Bt(n,1):r.Lt(n),this.zt=this.zt.insert(n,this.he(n).delete(e)),s&&(this.jt=this.jt.insert(n,s))}removeTarget(e){this.Qt.delete(e)}ie(e){const n=this.Zt(e).Ot();return this.Gt.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}qt(e){this.Zt(e).qt()}Zt(e){let n=this.Qt.get(e);return n||(n=new xf,this.Qt.set(e,n)),n}he(e){let n=this.zt.get(e);return n||(n=new ft(ge),this.zt=this.zt.insert(e,n)),n}te(e){const n=this.se(e)!==null;return n||V("WatchChangeAggregator","Detected inactive target",e),n}se(e){const n=this.Qt.get(e);return n&&n.kt?null:this.Gt.le(e)}ee(e){this.Qt.set(e,new xf),this.Gt.getRemoteKeysForTarget(e).forEach(n=>{this.Yt(e,n,null)})}ae(e,n){return this.Gt.getRemoteKeysForTarget(e).has(n)}}function Df(){return new Me(K.comparator)}function Nf(){return new Me(K.comparator)}const tS={asc:"ASCENDING",desc:"DESCENDING"},nS={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},sS={and:"AND",or:"OR"};class rS{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function lc(t,e){return t.useProto3Json||Ca(e)?e:{value:e}}function qo(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Ug(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function iS(t,e){return qo(t,e.toTimestamp())}function an(t){return De(!!t),J.fromTimestamp(function(e){const n=Yn(e);return new We(n.seconds,n.nanos)}(t))}function Su(t,e){return function(n){return new Fe(["projects",n.projectId,"databases",n.database])}(t).child("documents").child(e).canonicalString()}function Fg(t){const e=Fe.fromString(t);return De(jg(e)),e}function cc(t,e){return Su(t.databaseId,e.path)}function yl(t,e){const n=Fg(e);if(n.get(1)!==t.databaseId.projectId)throw new H(T.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new H(T.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new K(Vg(n))}function uc(t,e){return Su(t.databaseId,e)}function oS(t){const e=Fg(t);return e.length===4?Fe.emptyPath():Vg(e)}function hc(t){return new Fe(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function Vg(t){return De(t.length>4&&t.get(4)==="documents"),t.popFirst(5)}function Of(t,e,n){return{name:cc(t,e),fields:n.value.mapValue.fields}}function aS(t,e){let n;if("targetChange"in e){e.targetChange;const s=function(l){return l==="NO_CHANGE"?0:l==="ADD"?1:l==="REMOVE"?2:l==="CURRENT"?3:l==="RESET"?4:Y()}(e.targetChange.targetChangeType||"NO_CHANGE"),r=e.targetChange.targetIds||[],i=function(l,c){return l.useProto3Json?(De(c===void 0||typeof c=="string"),gt.fromBase64String(c||"")):(De(c===void 0||c instanceof Uint8Array),gt.fromUint8Array(c||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,a=o&&function(l){const c=l.code===void 0?T.UNKNOWN:Pg(l.code);return new H(c,l.message||"")}(o);n=new Lg(s,r,i,a||null)}else if("documentChange"in e){e.documentChange;const s=e.documentChange;s.document,s.document.name,s.document.updateTime;const r=yl(t,s.document.name),i=an(s.document.updateTime),o=s.document.createTime?an(s.document.createTime):J.min(),a=new Rt({mapValue:{fields:s.document.fields}}),l=at.newFoundDocument(r,i,o,a),c=s.targetIds||[],u=s.removedTargetIds||[];n=new mo(c,u,l.key,l)}else if("documentDelete"in e){e.documentDelete;const s=e.documentDelete;s.document;const r=yl(t,s.document),i=s.readTime?an(s.readTime):J.min(),o=at.newNoDocument(r,i),a=s.removedTargetIds||[];n=new mo([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const s=e.documentRemove;s.document;const r=yl(t,s.document),i=s.removedTargetIds||[];n=new mo([],i,r,null)}else{if(!("filter"in e))return Y();{e.filter;const s=e.filter;s.targetId;const{count:r=0,unchangedNames:i}=s,o=new Yb(r,i),a=s.targetId;n=new Mg(a,o)}}return n}function lS(t,e){let n;if(e instanceof Ui)n={update:Of(t,e.key,e.value)};else if(e instanceof Og)n={delete:cc(t,e.key)};else if(e instanceof ns)n={update:Of(t,e.key,e.data),updateMask:yS(e.fieldMask)};else{if(!(e instanceof zb))return Y();n={verify:cc(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(s=>function(r,i){const o=i.transform;if(o instanceof Ko)return{fieldPath:i.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(o instanceof di)return{fieldPath:i.field.canonicalString(),appendMissingElements:{values:o.elements}};if(o instanceof pi)return{fieldPath:i.field.canonicalString(),removeAllFromArray:{values:o.elements}};if(o instanceof Wo)return{fieldPath:i.field.canonicalString(),increment:o.gt};throw Y()}(0,s))),e.precondition.isNone||(n.currentDocument=function(s,r){return r.updateTime!==void 0?{updateTime:iS(s,r.updateTime)}:r.exists!==void 0?{exists:r.exists}:Y()}(t,e.precondition)),n}function cS(t,e){return t&&t.length>0?(De(e!==void 0),t.map(n=>function(s,r){let i=s.updateTime?an(s.updateTime):an(r);return i.isEqual(J.min())&&(i=an(r)),new Kb(i,s.transformResults||[])}(n,e))):[]}function uS(t,e){return{documents:[uc(t,e.path)]}}function hS(t,e){const n={structuredQuery:{}},s=e.path;e.collectionGroup!==null?(n.parent=uc(t,s),n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(n.parent=uc(t,s.popLast()),n.structuredQuery.from=[{collectionId:s.lastSegment()}]);const r=function(l){if(l.length!==0)return $g(un.create(l,"and"))}(e.filters);r&&(n.structuredQuery.where=r);const i=function(l){if(l.length!==0)return l.map(c=>function(u){return{field:Ns(u.field),direction:pS(u.dir)}}(c))}(e.orderBy);i&&(n.structuredQuery.orderBy=i);const o=lc(t,e.limit);var a;return o!==null&&(n.structuredQuery.limit=o),e.startAt&&(n.structuredQuery.startAt={before:(a=e.startAt).inclusive,values:a.position}),e.endAt&&(n.structuredQuery.endAt=function(l){return{before:!l.inclusive,values:l.position}}(e.endAt)),n}function fS(t){let e=oS(t.parent);const n=t.structuredQuery,s=n.from?n.from.length:0;let r=null;if(s>0){De(s===1);const u=n.from[0];u.allDescendants?r=u.collectionId:e=e.child(u.collectionId)}let i=[];n.where&&(i=function(u){const h=Bg(u);return h instanceof un&&gg(h)?h.getFilters():[h]}(n.where));let o=[];n.orderBy&&(o=n.orderBy.map(u=>function(h){return new Hr(Os(h.field),function(f){switch(f){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(h.direction))}(u)));let a=null;n.limit&&(a=function(u){let h;return h=typeof u=="object"?u.value:u,Ca(h)?null:h}(n.limit));let l=null;n.startAt&&(l=function(u){const h=!!u.before,f=u.values||[];return new Ho(f,h)}(n.startAt));let c=null;return n.endAt&&(c=function(u){const h=!u.before,f=u.values||[];return new Ho(f,h)}(n.endAt)),kb(e,r,o,i,a,"F",l,c)}function dS(t,e){const n=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return Y()}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function Bg(t){return t.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const n=Os(e.unaryFilter.field);return Ge.create(n,"==",{doubleValue:NaN});case"IS_NULL":const s=Os(e.unaryFilter.field);return Ge.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=Os(e.unaryFilter.field);return Ge.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const i=Os(e.unaryFilter.field);return Ge.create(i,"!=",{nullValue:"NULL_VALUE"});default:return Y()}}(t):t.fieldFilter!==void 0?function(e){return Ge.create(Os(e.fieldFilter.field),function(n){switch(n){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return Y()}}(e.fieldFilter.op),e.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(e){return un.create(e.compositeFilter.filters.map(n=>Bg(n)),function(n){switch(n){case"AND":return"and";case"OR":return"or";default:return Y()}}(e.compositeFilter.op))}(t):Y()}function pS(t){return tS[t]}function mS(t){return nS[t]}function gS(t){return sS[t]}function Ns(t){return{fieldPath:t.canonicalString()}}function Os(t){return nt.fromServerFormat(t.fieldPath)}function $g(t){return t instanceof Ge?function(e){if(e.op==="=="){if(wf(e.value))return{unaryFilter:{field:Ns(e.field),op:"IS_NAN"}};if(vf(e.value))return{unaryFilter:{field:Ns(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(wf(e.value))return{unaryFilter:{field:Ns(e.field),op:"IS_NOT_NAN"}};if(vf(e.value))return{unaryFilter:{field:Ns(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Ns(e.field),op:mS(e.op),value:e.value}}}(t):t instanceof un?function(e){const n=e.getFilters().map(s=>$g(s));return n.length===1?n[0]:{compositeFilter:{op:gS(e.op),filters:n}}}(t):Y()}function yS(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function jg(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vn{constructor(e,n,s,r,i=J.min(),o=J.min(),a=gt.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=n,this.purpose=s,this.sequenceNumber=r,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=a,this.expectedCount=l}withSequenceNumber(e){return new Vn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new Vn(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Vn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Vn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vS{constructor(e){this.fe=e}}function wS(t){const e=fS({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?oc(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _S{constructor(){this.rn=new ES}addToCollectionParentIndex(e,n){return this.rn.add(n),A.resolve()}getCollectionParents(e,n){return A.resolve(this.rn.getEntries(n))}addFieldIndex(e,n){return A.resolve()}deleteFieldIndex(e,n){return A.resolve()}getDocumentsMatchingTarget(e,n){return A.resolve(null)}getIndexType(e,n){return A.resolve(0)}getFieldIndexes(e,n){return A.resolve([])}getNextCollectionGroupToUpdate(e){return A.resolve(null)}getMinOffset(e,n){return A.resolve(Qn.min())}getMinOffsetFromCollectionGroup(e,n){return A.resolve(Qn.min())}updateCollectionGroup(e,n,s){return A.resolve()}updateIndexEntries(e,n){return A.resolve()}}class ES{constructor(){this.index={}}add(e){const n=e.lastSegment(),s=e.popLast(),r=this.index[n]||new ft(Fe.comparator),i=!r.has(s);return this.index[n]=r.add(s),i}has(e){const n=e.lastSegment(),s=e.popLast(),r=this.index[n];return r&&r.has(s)}getEntries(e){return(this.index[e]||new ft(Fe.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class or{constructor(e){this.Nn=e}next(){return this.Nn+=2,this.Nn}static kn(){return new or(0)}static Mn(){return new or(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IS{constructor(){this.changes=new vr(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,at.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const s=this.changes.get(n);return s!==void 0?A.resolve(s):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TS{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bS{constructor(e,n,s,r){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=s,this.indexManager=r}getDocument(e,n){let s=null;return this.documentOverlayCache.getOverlay(e,n).next(r=>(s=r,this.remoteDocumentCache.getEntry(e,n))).next(r=>(s!==null&&Wr(s.mutation,r,Mt.empty(),We.now()),r))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(s=>this.getLocalViewOfDocuments(e,s,ae()).next(()=>s))}getLocalViewOfDocuments(e,n,s=ae()){const r=cs();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,s).next(i=>{let o=Dr();return i.forEach((a,l)=>{o=o.insert(a,l.overlayedDocument)}),o}))}getOverlayedDocuments(e,n){const s=cs();return this.populateOverlays(e,s,n).next(()=>this.computeViews(e,n,s,ae()))}populateOverlays(e,n,s){const r=[];return s.forEach(i=>{n.has(i)||r.push(i)}),this.documentOverlayCache.getOverlays(e,r).next(i=>{i.forEach((o,a)=>{n.set(o,a)})})}computeViews(e,n,s,r){let i=Cn();const o=Kr(),a=Kr();return n.forEach((l,c)=>{const u=s.get(c.key);r.has(c.key)&&(u===void 0||u.mutation instanceof ns)?i=i.insert(c.key,c):u!==void 0?(o.set(c.key,u.mutation.getFieldMask()),Wr(u.mutation,c,u.mutation.getFieldMask(),We.now())):o.set(c.key,Mt.empty())}),this.recalculateAndSaveOverlays(e,i).next(l=>(l.forEach((c,u)=>o.set(c,u)),n.forEach((c,u)=>{var h;return a.set(c,new TS(u,(h=o.get(c))!==null&&h!==void 0?h:null))}),a))}recalculateAndSaveOverlays(e,n){const s=Kr();let r=new Me((o,a)=>o-a),i=ae();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(o=>{for(const a of o)a.keys().forEach(l=>{const c=n.get(l);if(c===null)return;let u=s.get(l)||Mt.empty();u=a.applyToLocalView(c,u),s.set(l,u);const h=(r.get(a.batchId)||ae()).add(l);r=r.insert(a.batchId,h)})}).next(()=>{const o=[],a=r.getReverseIterator();for(;a.hasNext();){const l=a.getNext(),c=l.key,u=l.value,h=bg();u.forEach(f=>{if(!i.has(f)){const d=Dg(n.get(f),s.get(f));d!==null&&h.set(f,d),i=i.add(f)}}),o.push(this.documentOverlayCache.saveOverlays(e,c,h))}return A.waitFor(o)}).next(()=>s)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(s=>this.recalculateAndSaveOverlays(e,s))}getDocumentsMatchingQuery(e,n,s){return function(r){return K.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):Nb(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,s):this.getDocumentsMatchingCollectionQuery(e,n,s)}getNextDocuments(e,n,s,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,s,r).next(i=>{const o=r-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,s.largestBatchId,r-i.size):A.resolve(cs());let a=-1,l=i;return o.next(c=>A.forEach(c,(u,h)=>(a<h.largestBatchId&&(a=h.largestBatchId),i.get(u)?A.resolve():this.remoteDocumentCache.getEntry(e,u).next(f=>{l=l.insert(u,f)}))).next(()=>this.populateOverlays(e,c,i)).next(()=>this.computeViews(e,l,c,ae())).next(u=>({batchId:a,changes:Tg(u)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new K(n)).next(s=>{let r=Dr();return s.isFoundDocument()&&(r=r.insert(s.key,s)),r})}getDocumentsMatchingCollectionGroupQuery(e,n,s){const r=n.collectionGroup;let i=Dr();return this.indexManager.getCollectionParents(e,r).next(o=>A.forEach(o,a=>{const l=function(c,u){return new Ra(u,null,c.explicitOrderBy.slice(),c.filters.slice(),c.limit,c.limitType,c.startAt,c.endAt)}(n,a.child(r));return this.getDocumentsMatchingCollectionQuery(e,l,s).next(c=>{c.forEach((u,h)=>{i=i.insert(u,h)})})}).next(()=>i))}getDocumentsMatchingCollectionQuery(e,n,s){let r;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,s.largestBatchId).next(i=>(r=i,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,s,r))).next(i=>{r.forEach((a,l)=>{const c=l.getKey();i.get(c)===null&&(i=i.insert(c,at.newInvalidDocument(c)))});let o=Dr();return i.forEach((a,l)=>{const c=r.get(a);c!==void 0&&Wr(c.mutation,l,Mt.empty(),We.now()),xa(n,l)&&(o=o.insert(a,l))}),o})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SS{constructor(e){this.serializer=e,this.cs=new Map,this.hs=new Map}getBundleMetadata(e,n){return A.resolve(this.cs.get(n))}saveBundleMetadata(e,n){var s;return this.cs.set(n.id,{id:(s=n).id,version:s.version,createTime:an(s.createTime)}),A.resolve()}getNamedQuery(e,n){return A.resolve(this.hs.get(n))}saveNamedQuery(e,n){return this.hs.set(n.name,function(s){return{name:s.name,query:wS(s.bundledQuery),readTime:an(s.readTime)}}(n)),A.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AS{constructor(){this.overlays=new Me(K.comparator),this.ls=new Map}getOverlay(e,n){return A.resolve(this.overlays.get(n))}getOverlays(e,n){const s=cs();return A.forEach(n,r=>this.getOverlay(e,r).next(i=>{i!==null&&s.set(r,i)})).next(()=>s)}saveOverlays(e,n,s){return s.forEach((r,i)=>{this.we(e,n,i)}),A.resolve()}removeOverlaysForBatchId(e,n,s){const r=this.ls.get(s);return r!==void 0&&(r.forEach(i=>this.overlays=this.overlays.remove(i)),this.ls.delete(s)),A.resolve()}getOverlaysForCollection(e,n,s){const r=cs(),i=n.length+1,o=new K(n.child("")),a=this.overlays.getIteratorFrom(o);for(;a.hasNext();){const l=a.getNext().value,c=l.getKey();if(!n.isPrefixOf(c.path))break;c.path.length===i&&l.largestBatchId>s&&r.set(l.getKey(),l)}return A.resolve(r)}getOverlaysForCollectionGroup(e,n,s,r){let i=new Me((c,u)=>c-u);const o=this.overlays.getIterator();for(;o.hasNext();){const c=o.getNext().value;if(c.getKey().getCollectionGroup()===n&&c.largestBatchId>s){let u=i.get(c.largestBatchId);u===null&&(u=cs(),i=i.insert(c.largestBatchId,u)),u.set(c.getKey(),c)}}const a=cs(),l=i.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((c,u)=>a.set(c,u)),!(a.size()>=r)););return A.resolve(a)}we(e,n,s){const r=this.overlays.get(s.key);if(r!==null){const o=this.ls.get(r.largestBatchId).delete(s.key);this.ls.set(r.largestBatchId,o)}this.overlays=this.overlays.insert(s.key,new Qb(n,s));let i=this.ls.get(n);i===void 0&&(i=ae(),this.ls.set(n,i)),this.ls.set(n,i.add(s.key))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Au{constructor(){this.fs=new ft(Ye.ds),this.ws=new ft(Ye._s)}isEmpty(){return this.fs.isEmpty()}addReference(e,n){const s=new Ye(e,n);this.fs=this.fs.add(s),this.ws=this.ws.add(s)}gs(e,n){e.forEach(s=>this.addReference(s,n))}removeReference(e,n){this.ys(new Ye(e,n))}ps(e,n){e.forEach(s=>this.removeReference(s,n))}Is(e){const n=new K(new Fe([])),s=new Ye(n,e),r=new Ye(n,e+1),i=[];return this.ws.forEachInRange([s,r],o=>{this.ys(o),i.push(o.key)}),i}Ts(){this.fs.forEach(e=>this.ys(e))}ys(e){this.fs=this.fs.delete(e),this.ws=this.ws.delete(e)}Es(e){const n=new K(new Fe([])),s=new Ye(n,e),r=new Ye(n,e+1);let i=ae();return this.ws.forEachInRange([s,r],o=>{i=i.add(o.key)}),i}containsKey(e){const n=new Ye(e,0),s=this.fs.firstAfterOrEqual(n);return s!==null&&e.isEqual(s.key)}}class Ye{constructor(e,n){this.key=e,this.As=n}static ds(e,n){return K.comparator(e.key,n.key)||ge(e.As,n.As)}static _s(e,n){return ge(e.As,n.As)||K.comparator(e.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CS{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.vs=1,this.Rs=new ft(Ye.ds)}checkEmpty(e){return A.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,s,r){const i=this.vs;this.vs++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new Gb(i,n,s,r);this.mutationQueue.push(o);for(const a of r)this.Rs=this.Rs.add(new Ye(a.key,i)),this.indexManager.addToCollectionParentIndex(e,a.key.path.popLast());return A.resolve(o)}lookupMutationBatch(e,n){return A.resolve(this.Ps(n))}getNextMutationBatchAfterBatchId(e,n){const s=n+1,r=this.bs(s),i=r<0?0:r;return A.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return A.resolve(this.mutationQueue.length===0?-1:this.vs-1)}getAllMutationBatches(e){return A.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const s=new Ye(n,0),r=new Ye(n,Number.POSITIVE_INFINITY),i=[];return this.Rs.forEachInRange([s,r],o=>{const a=this.Ps(o.As);i.push(a)}),A.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,n){let s=new ft(ge);return n.forEach(r=>{const i=new Ye(r,0),o=new Ye(r,Number.POSITIVE_INFINITY);this.Rs.forEachInRange([i,o],a=>{s=s.add(a.As)})}),A.resolve(this.Vs(s))}getAllMutationBatchesAffectingQuery(e,n){const s=n.path,r=s.length+1;let i=s;K.isDocumentKey(i)||(i=i.child(""));const o=new Ye(new K(i),0);let a=new ft(ge);return this.Rs.forEachWhile(l=>{const c=l.key.path;return!!s.isPrefixOf(c)&&(c.length===r&&(a=a.add(l.As)),!0)},o),A.resolve(this.Vs(a))}Vs(e){const n=[];return e.forEach(s=>{const r=this.Ps(s);r!==null&&n.push(r)}),n}removeMutationBatch(e,n){De(this.Ss(n.batchId,"removed")===0),this.mutationQueue.shift();let s=this.Rs;return A.forEach(n.mutations,r=>{const i=new Ye(r.key,n.batchId);return s=s.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)}).next(()=>{this.Rs=s})}Cn(e){}containsKey(e,n){const s=new Ye(n,0),r=this.Rs.firstAfterOrEqual(s);return A.resolve(n.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,A.resolve()}Ss(e,n){return this.bs(e)}bs(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Ps(e){const n=this.bs(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RS{constructor(e){this.Ds=e,this.docs=new Me(K.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const s=n.key,r=this.docs.get(s),i=r?r.size:0,o=this.Ds(n);return this.docs=this.docs.insert(s,{document:n.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,s.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const s=this.docs.get(n);return A.resolve(s?s.document.mutableCopy():at.newInvalidDocument(n))}getEntries(e,n){let s=Cn();return n.forEach(r=>{const i=this.docs.get(r);s=s.insert(r,i?i.document.mutableCopy():at.newInvalidDocument(r))}),A.resolve(s)}getDocumentsMatchingQuery(e,n,s,r){let i=Cn();const o=n.path,a=new K(o.child("")),l=this.docs.getIteratorFrom(a);for(;l.hasNext();){const{key:c,value:{document:u}}=l.getNext();if(!o.isPrefixOf(c.path))break;c.path.length>o.length+1||fb(hb(u),s)<=0||(r.has(u.key)||xa(n,u))&&(i=i.insert(u.key,u.mutableCopy()))}return A.resolve(i)}getAllFromCollectionGroup(e,n,s,r){Y()}Cs(e,n){return A.forEach(this.docs,s=>n(s))}newChangeBuffer(e){return new kS(this)}getSize(e){return A.resolve(this.size)}}class kS extends IS{constructor(e){super(),this.os=e}applyChanges(e){const n=[];return this.changes.forEach((s,r)=>{r.isValidDocument()?n.push(this.os.addEntry(e,r)):this.os.removeEntry(s)}),A.waitFor(n)}getFromCache(e,n){return this.os.getEntry(e,n)}getAllFromCache(e,n){return this.os.getEntries(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xS{constructor(e){this.persistence=e,this.xs=new vr(n=>_u(n),Eu),this.lastRemoteSnapshotVersion=J.min(),this.highestTargetId=0,this.Ns=0,this.ks=new Au,this.targetCount=0,this.Ms=or.kn()}forEachTarget(e,n){return this.xs.forEach((s,r)=>n(r)),A.resolve()}getLastRemoteSnapshotVersion(e){return A.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return A.resolve(this.Ns)}allocateTargetId(e){return this.highestTargetId=this.Ms.next(),A.resolve(this.highestTargetId)}setTargetsMetadata(e,n,s){return s&&(this.lastRemoteSnapshotVersion=s),n>this.Ns&&(this.Ns=n),A.resolve()}Fn(e){this.xs.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.Ms=new or(n),this.highestTargetId=n),e.sequenceNumber>this.Ns&&(this.Ns=e.sequenceNumber)}addTargetData(e,n){return this.Fn(n),this.targetCount+=1,A.resolve()}updateTargetData(e,n){return this.Fn(n),A.resolve()}removeTargetData(e,n){return this.xs.delete(n.target),this.ks.Is(n.targetId),this.targetCount-=1,A.resolve()}removeTargets(e,n,s){let r=0;const i=[];return this.xs.forEach((o,a)=>{a.sequenceNumber<=n&&s.get(a.targetId)===null&&(this.xs.delete(o),i.push(this.removeMatchingKeysForTargetId(e,a.targetId)),r++)}),A.waitFor(i).next(()=>r)}getTargetCount(e){return A.resolve(this.targetCount)}getTargetData(e,n){const s=this.xs.get(n)||null;return A.resolve(s)}addMatchingKeys(e,n,s){return this.ks.gs(n,s),A.resolve()}removeMatchingKeys(e,n,s){this.ks.ps(n,s);const r=this.persistence.referenceDelegate,i=[];return r&&n.forEach(o=>{i.push(r.markPotentiallyOrphaned(e,o))}),A.waitFor(i)}removeMatchingKeysForTargetId(e,n){return this.ks.Is(n),A.resolve()}getMatchingKeysForTargetId(e,n){const s=this.ks.Es(n);return A.resolve(s)}containsKey(e,n){return A.resolve(this.ks.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DS{constructor(e,n){this.$s={},this.overlays={},this.Os=new gu(0),this.Fs=!1,this.Fs=!0,this.referenceDelegate=e(this),this.Bs=new xS(this),this.indexManager=new _S,this.remoteDocumentCache=function(s){return new RS(s)}(s=>this.referenceDelegate.Ls(s)),this.serializer=new vS(n),this.qs=new SS(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Fs=!1,Promise.resolve()}get started(){return this.Fs}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new AS,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let s=this.$s[e.toKey()];return s||(s=new CS(n,this.referenceDelegate),this.$s[e.toKey()]=s),s}getTargetCache(){return this.Bs}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.qs}runTransaction(e,n,s){V("MemoryPersistence","Starting transaction:",e);const r=new NS(this.Os.next());return this.referenceDelegate.Us(),s(r).next(i=>this.referenceDelegate.Ks(r).next(()=>i)).toPromise().then(i=>(r.raiseOnCommittedEvent(),i))}Gs(e,n){return A.or(Object.values(this.$s).map(s=>()=>s.containsKey(e,n)))}}class NS extends pb{constructor(e){super(),this.currentSequenceNumber=e}}class Cu{constructor(e){this.persistence=e,this.Qs=new Au,this.js=null}static zs(e){return new Cu(e)}get Ws(){if(this.js)return this.js;throw Y()}addReference(e,n,s){return this.Qs.addReference(s,n),this.Ws.delete(s.toString()),A.resolve()}removeReference(e,n,s){return this.Qs.removeReference(s,n),this.Ws.add(s.toString()),A.resolve()}markPotentiallyOrphaned(e,n){return this.Ws.add(n.toString()),A.resolve()}removeTarget(e,n){this.Qs.Is(n.targetId).forEach(r=>this.Ws.add(r.toString()));const s=this.persistence.getTargetCache();return s.getMatchingKeysForTargetId(e,n.targetId).next(r=>{r.forEach(i=>this.Ws.add(i.toString()))}).next(()=>s.removeTargetData(e,n))}Us(){this.js=new Set}Ks(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return A.forEach(this.Ws,s=>{const r=K.fromPath(s);return this.Hs(e,r).next(i=>{i||n.removeEntry(r,J.min())})}).next(()=>(this.js=null,n.apply(e)))}updateLimboDocument(e,n){return this.Hs(e,n).next(s=>{s?this.Ws.delete(n.toString()):this.Ws.add(n.toString())})}Ls(e){return 0}Hs(e,n){return A.or([()=>A.resolve(this.Qs.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Gs(e,n)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ru{constructor(e,n,s,r){this.targetId=e,this.fromCache=n,this.Fi=s,this.Bi=r}static Li(e,n){let s=ae(),r=ae();for(const i of n.docChanges)switch(i.type){case 0:s=s.add(i.doc.key);break;case 1:r=r.add(i.doc.key)}return new Ru(e,n.fromCache,s,r)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OS{constructor(){this.qi=!1}initialize(e,n){this.Ui=e,this.indexManager=n,this.qi=!0}getDocumentsMatchingQuery(e,n,s,r){return this.Ki(e,n).next(i=>i||this.Gi(e,n,r,s)).next(i=>i||this.Qi(e,n))}Ki(e,n){if(Tf(n))return A.resolve(null);let s=An(n);return this.indexManager.getIndexType(e,s).next(r=>r===0?null:(n.limit!==null&&r===1&&(n=oc(n,null,"F"),s=An(n)),this.indexManager.getDocumentsMatchingTarget(e,s).next(i=>{const o=ae(...i);return this.Ui.getDocuments(e,o).next(a=>this.indexManager.getMinOffset(e,s).next(l=>{const c=this.ji(n,a);return this.zi(n,c,o,l.readTime)?this.Ki(e,oc(n,null,"F")):this.Wi(e,c,n,l)}))})))}Gi(e,n,s,r){return Tf(n)||r.isEqual(J.min())?this.Qi(e,n):this.Ui.getDocuments(e,s).next(i=>{const o=this.ji(n,i);return this.zi(n,o,s,r)?this.Qi(e,n):(pf()<=de.DEBUG&&V("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),ac(n)),this.Wi(e,o,n,ub(r,-1)))})}ji(e,n){let s=new ft(Eg(e));return n.forEach((r,i)=>{xa(e,i)&&(s=s.add(i))}),s}zi(e,n,s,r){if(e.limit===null)return!1;if(s.size!==n.size)return!0;const i=e.limitType==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(r)>0)}Qi(e,n){return pf()<=de.DEBUG&&V("QueryEngine","Using full collection scan to execute query:",ac(n)),this.Ui.getDocumentsMatchingQuery(e,n,Qn.min())}Wi(e,n,s,r){return this.Ui.getDocumentsMatchingQuery(e,s,r).next(i=>(n.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PS{constructor(e,n,s,r){this.persistence=e,this.Hi=n,this.serializer=r,this.Ji=new Me(ge),this.Yi=new vr(i=>_u(i),Eu),this.Xi=new Map,this.Zi=e.getRemoteDocumentCache(),this.Bs=e.getTargetCache(),this.qs=e.getBundleCache(),this.tr(s)}tr(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new bS(this.Zi,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Zi.setIndexManager(this.indexManager),this.Hi.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.Ji))}}function MS(t,e,n,s){return new PS(t,e,n,s)}async function Hg(t,e){const n=te(t);return await n.persistence.runTransaction("Handle user change","readonly",s=>{let r;return n.mutationQueue.getAllMutationBatches(s).next(i=>(r=i,n.tr(e),n.mutationQueue.getAllMutationBatches(s))).next(i=>{const o=[],a=[];let l=ae();for(const c of r){o.push(c.batchId);for(const u of c.mutations)l=l.add(u.key)}for(const c of i){a.push(c.batchId);for(const u of c.mutations)l=l.add(u.key)}return n.localDocuments.getDocuments(s,l).next(c=>({er:c,removedBatchIds:o,addedBatchIds:a}))})})}function LS(t,e){const n=te(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",s=>{const r=e.batch.keys(),i=n.Zi.newChangeBuffer({trackRemovals:!0});return function(o,a,l,c){const u=l.batch,h=u.keys();let f=A.resolve();return h.forEach(d=>{f=f.next(()=>c.getEntry(a,d)).next(y=>{const w=l.docVersions.get(d);De(w!==null),y.version.compareTo(w)<0&&(u.applyToRemoteDocument(y,l),y.isValidDocument()&&(y.setReadTime(l.commitVersion),c.addEntry(y)))})}),f.next(()=>o.mutationQueue.removeMutationBatch(a,u))}(n,s,e,i).next(()=>i.apply(s)).next(()=>n.mutationQueue.performConsistencyCheck(s)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(s,r,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(s,function(o){let a=ae();for(let l=0;l<o.mutationResults.length;++l)o.mutationResults[l].transformResults.length>0&&(a=a.add(o.batch.mutations[l].key));return a}(e))).next(()=>n.localDocuments.getDocuments(s,r))})}function Kg(t){const e=te(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.Bs.getLastRemoteSnapshotVersion(n))}function US(t,e){const n=te(t),s=e.snapshotVersion;let r=n.Ji;return n.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=n.Zi.newChangeBuffer({trackRemovals:!0});r=n.Ji;const a=[];e.targetChanges.forEach((u,h)=>{const f=r.get(h);if(!f)return;a.push(n.Bs.removeMatchingKeys(i,u.removedDocuments,h).next(()=>n.Bs.addMatchingKeys(i,u.addedDocuments,h)));let d=f.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(h)!==null?d=d.withResumeToken(gt.EMPTY_BYTE_STRING,J.min()).withLastLimboFreeSnapshotVersion(J.min()):u.resumeToken.approximateByteSize()>0&&(d=d.withResumeToken(u.resumeToken,s)),r=r.insert(h,d),function(y,w,b){return y.resumeToken.approximateByteSize()===0||w.snapshotVersion.toMicroseconds()-y.snapshotVersion.toMicroseconds()>=3e8?!0:b.addedDocuments.size+b.modifiedDocuments.size+b.removedDocuments.size>0}(f,d,u)&&a.push(n.Bs.updateTargetData(i,d))});let l=Cn(),c=ae();if(e.documentUpdates.forEach(u=>{e.resolvedLimboDocuments.has(u)&&a.push(n.persistence.referenceDelegate.updateLimboDocument(i,u))}),a.push(FS(i,o,e.documentUpdates).next(u=>{l=u.nr,c=u.sr})),!s.isEqual(J.min())){const u=n.Bs.getLastRemoteSnapshotVersion(i).next(h=>n.Bs.setTargetsMetadata(i,i.currentSequenceNumber,s));a.push(u)}return A.waitFor(a).next(()=>o.apply(i)).next(()=>n.localDocuments.getLocalViewOfDocuments(i,l,c)).next(()=>l)}).then(i=>(n.Ji=r,i))}function FS(t,e,n){let s=ae(),r=ae();return n.forEach(i=>s=s.add(i)),e.getEntries(t,s).next(i=>{let o=Cn();return n.forEach((a,l)=>{const c=i.get(a);l.isFoundDocument()!==c.isFoundDocument()&&(r=r.add(a)),l.isNoDocument()&&l.version.isEqual(J.min())?(e.removeEntry(a,l.readTime),o=o.insert(a,l)):!c.isValidDocument()||l.version.compareTo(c.version)>0||l.version.compareTo(c.version)===0&&c.hasPendingWrites?(e.addEntry(l),o=o.insert(a,l)):V("LocalStore","Ignoring outdated watch update for ",a,". Current version:",c.version," Watch version:",l.version)}),{nr:o,sr:r}})}function VS(t,e){const n=te(t);return n.persistence.runTransaction("Get next mutation batch","readonly",s=>(e===void 0&&(e=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(s,e)))}function BS(t,e){const n=te(t);return n.persistence.runTransaction("Allocate target","readwrite",s=>{let r;return n.Bs.getTargetData(s,e).next(i=>i?(r=i,A.resolve(r)):n.Bs.allocateTargetId(s).next(o=>(r=new Vn(e,o,"TargetPurposeListen",s.currentSequenceNumber),n.Bs.addTargetData(s,r).next(()=>r))))}).then(s=>{const r=n.Ji.get(s.targetId);return(r===null||s.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(n.Ji=n.Ji.insert(s.targetId,s),n.Yi.set(e,s.targetId)),s})}async function fc(t,e,n){const s=te(t),r=s.Ji.get(e),i=n?"readwrite":"readwrite-primary";try{n||await s.persistence.runTransaction("Release target",i,o=>s.persistence.referenceDelegate.removeTarget(o,r))}catch(o){if(!Li(o))throw o;V("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}s.Ji=s.Ji.remove(e),s.Yi.delete(r.target)}function Pf(t,e,n){const s=te(t);let r=J.min(),i=ae();return s.persistence.runTransaction("Execute query","readonly",o=>function(a,l,c){const u=te(a),h=u.Yi.get(c);return h!==void 0?A.resolve(u.Ji.get(h)):u.Bs.getTargetData(l,c)}(s,o,An(e)).next(a=>{if(a)return r=a.lastLimboFreeSnapshotVersion,s.Bs.getMatchingKeysForTargetId(o,a.targetId).next(l=>{i=l})}).next(()=>s.Hi.getDocumentsMatchingQuery(o,e,n?r:J.min(),n?i:ae())).next(a=>($S(s,Ob(e),a),{documents:a,ir:i})))}function $S(t,e,n){let s=t.Xi.get(e)||J.min();n.forEach((r,i)=>{i.readTime.compareTo(s)>0&&(s=i.readTime)}),t.Xi.set(e,s)}class Mf{constructor(){this.activeTargetIds=Vb()}lr(e){this.activeTargetIds=this.activeTargetIds.add(e)}dr(e){this.activeTargetIds=this.activeTargetIds.delete(e)}hr(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class jS{constructor(){this.Hr=new Mf,this.Jr={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,s){}addLocalQueryTarget(e){return this.Hr.lr(e),this.Jr[e]||"not-current"}updateQueryState(e,n,s){this.Jr[e]=n}removeLocalQueryTarget(e){this.Hr.dr(e)}isLocalQueryTarget(e){return this.Hr.activeTargetIds.has(e)}clearQueryState(e){delete this.Jr[e]}getAllActiveQueryTargets(){return this.Hr.activeTargetIds}isActiveQueryTarget(e){return this.Hr.activeTargetIds.has(e)}start(){return this.Hr=new Mf,Promise.resolve()}handleUserChange(e,n,s){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HS{Yr(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lf{constructor(){this.Xr=()=>this.Zr(),this.eo=()=>this.no(),this.so=[],this.io()}Yr(e){this.so.push(e)}shutdown(){window.removeEventListener("online",this.Xr),window.removeEventListener("offline",this.eo)}io(){window.addEventListener("online",this.Xr),window.addEventListener("offline",this.eo)}Zr(){V("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.so)e(0)}no(){V("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.so)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let no=null;function vl(){return no===null?no=268435456+Math.round(2147483648*Math.random()):no++,"0x"+no.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const KS={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WS{constructor(e){this.ro=e.ro,this.oo=e.oo}uo(e){this.co=e}ao(e){this.ho=e}onMessage(e){this.lo=e}close(){this.oo()}send(e){this.ro(e)}fo(){this.co()}wo(e){this.ho(e)}_o(e){this.lo(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rt="WebChannelConnection";class qS extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const n=e.ssl?"https":"http";this.mo=n+"://"+e.host,this.yo="projects/"+this.databaseId.projectId+"/databases/"+this.databaseId.database+"/documents"}get po(){return!1}Io(e,n,s,r,i){const o=vl(),a=this.To(e,n);V("RestConnection",`Sending RPC '${e}' ${o}:`,a,s);const l={};return this.Eo(l,r,i),this.Ao(e,a,l,s).then(c=>(V("RestConnection",`Received RPC '${e}' ${o}: `,c),c),c=>{throw ws("RestConnection",`RPC '${e}' ${o} failed with error: `,c,"url: ",a,"request:",s),c})}vo(e,n,s,r,i,o){return this.Io(e,n,s,r,i)}Eo(e,n,s){e["X-Goog-Api-Client"]="gl-js/ fire/"+yr,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((r,i)=>e[i]=r),s&&s.headers.forEach((r,i)=>e[i]=r)}To(e,n){const s=KS[e];return`${this.mo}/v1/${n}:${s}`}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Ao(e,n,s,r){const i=vl();return new Promise((o,a)=>{const l=new eb;l.setWithCredentials(!0),l.listenOnce(XT.COMPLETE,()=>{try{switch(l.getLastErrorCode()){case gl.NO_ERROR:const u=l.getResponseJson();V(rt,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(u)),o(u);break;case gl.TIMEOUT:V(rt,`RPC '${e}' ${i} timed out`),a(new H(T.DEADLINE_EXCEEDED,"Request time out"));break;case gl.HTTP_ERROR:const h=l.getStatus();if(V(rt,`RPC '${e}' ${i} failed with status:`,h,"response text:",l.getResponseText()),h>0){let f=l.getResponseJson();Array.isArray(f)&&(f=f[0]);const d=f==null?void 0:f.error;if(d&&d.status&&d.message){const y=function(w){const b=w.toLowerCase().replace(/_/g,"-");return Object.values(T).indexOf(b)>=0?b:T.UNKNOWN}(d.status);a(new H(y,d.message))}else a(new H(T.UNKNOWN,"Server responded with status "+l.getStatus()))}else a(new H(T.UNAVAILABLE,"Connection failed."));break;default:Y()}}finally{V(rt,`RPC '${e}' ${i} completed.`)}});const c=JSON.stringify(r);V(rt,`RPC '${e}' ${i} sending request:`,r),l.send(n,"POST",c,s,15)})}Ro(e,n,s){const r=vl(),i=[this.mo,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=QT(),a=YT(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;c!==void 0&&(l.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(l.xmlHttpFactory=new ZT({})),this.Eo(l.initMessageHeaders,n,s),l.encodeInitMessageHeaders=!0;const u=i.join("");V(rt,`Creating RPC '${e}' stream ${r}: ${u}`,l);const h=o.createWebChannel(u,l);let f=!1,d=!1;const y=new WS({ro:b=>{d?V(rt,`Not sending because RPC '${e}' stream ${r} is closed:`,b):(f||(V(rt,`Opening RPC '${e}' stream ${r} transport.`),h.open(),f=!0),V(rt,`RPC '${e}' stream ${r} sending:`,b),h.send(b))},oo:()=>h.close()}),w=(b,x,R)=>{b.listen(x,M=>{try{R(M)}catch(C){setTimeout(()=>{throw C},0)}})};return w(h,Ji.EventType.OPEN,()=>{d||V(rt,`RPC '${e}' stream ${r} transport opened.`)}),w(h,Ji.EventType.CLOSE,()=>{d||(d=!0,V(rt,`RPC '${e}' stream ${r} transport closed`),y.wo())}),w(h,Ji.EventType.ERROR,b=>{d||(d=!0,ws(rt,`RPC '${e}' stream ${r} transport errored:`,b),y.wo(new H(T.UNAVAILABLE,"The operation could not be completed")))}),w(h,Ji.EventType.MESSAGE,b=>{var x;if(!d){const R=b.data[0];De(!!R);const M=R,C=M.error||((x=M[0])===null||x===void 0?void 0:x.error);if(C){V(rt,`RPC '${e}' stream ${r} received error:`,C);const ne=C.status;let he=function(B){const W=He[B];if(W!==void 0)return Pg(W)}(ne),ie=C.message;he===void 0&&(he=T.INTERNAL,ie="Unknown error status: "+ne+" with message "+C.message),d=!0,y.wo(new H(he,ie)),h.close()}else V(rt,`RPC '${e}' stream ${r} received:`,R),y._o(R)}}),w(a,JT.STAT_EVENT,b=>{b.stat===ff.PROXY?V(rt,`RPC '${e}' stream ${r} detected buffering proxy`):b.stat===ff.NOPROXY&&V(rt,`RPC '${e}' stream ${r} detected no buffering proxy`)}),setTimeout(()=>{y.fo()},0),y}}function wl(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ma(t){return new rS(t,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wg{constructor(e,n,s=1e3,r=1.5,i=6e4){this.ii=e,this.timerId=n,this.Po=s,this.bo=r,this.Vo=i,this.So=0,this.Do=null,this.Co=Date.now(),this.reset()}reset(){this.So=0}xo(){this.So=this.Vo}No(e){this.cancel();const n=Math.floor(this.So+this.ko()),s=Math.max(0,Date.now()-this.Co),r=Math.max(0,n-s);r>0&&V("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.So} ms, delay with jitter: ${n} ms, last attempt: ${s} ms ago)`),this.Do=this.ii.enqueueAfterDelay(this.timerId,r,()=>(this.Co=Date.now(),e())),this.So*=this.bo,this.So<this.Po&&(this.So=this.Po),this.So>this.Vo&&(this.So=this.Vo)}Mo(){this.Do!==null&&(this.Do.skipDelay(),this.Do=null)}cancel(){this.Do!==null&&(this.Do.cancel(),this.Do=null)}ko(){return(Math.random()-.5)*this.So}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qg{constructor(e,n,s,r,i,o,a,l){this.ii=e,this.$o=s,this.Oo=r,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=a,this.listener=l,this.state=0,this.Fo=0,this.Bo=null,this.Lo=null,this.stream=null,this.qo=new Wg(e,n)}Uo(){return this.state===1||this.state===5||this.Ko()}Ko(){return this.state===2||this.state===3}start(){this.state!==4?this.auth():this.Go()}async stop(){this.Uo()&&await this.close(0)}Qo(){this.state=0,this.qo.reset()}jo(){this.Ko()&&this.Bo===null&&(this.Bo=this.ii.enqueueAfterDelay(this.$o,6e4,()=>this.zo()))}Wo(e){this.Ho(),this.stream.send(e)}async zo(){if(this.Ko())return this.close(0)}Ho(){this.Bo&&(this.Bo.cancel(),this.Bo=null)}Jo(){this.Lo&&(this.Lo.cancel(),this.Lo=null)}async close(e,n){this.Ho(),this.Jo(),this.qo.cancel(),this.Fo++,e!==4?this.qo.reset():n&&n.code===T.RESOURCE_EXHAUSTED?(Sn(n.toString()),Sn("Using maximum backoff delay to prevent overloading the backend."),this.qo.xo()):n&&n.code===T.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.Yo(),this.stream.close(),this.stream=null),this.state=e,await this.listener.ao(n)}Yo(){}auth(){this.state=1;const e=this.Xo(this.Fo),n=this.Fo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([s,r])=>{this.Fo===n&&this.Zo(s,r)},s=>{e(()=>{const r=new H(T.UNKNOWN,"Fetching auth token failed: "+s.message);return this.tu(r)})})}Zo(e,n){const s=this.Xo(this.Fo);this.stream=this.eu(e,n),this.stream.uo(()=>{s(()=>(this.state=2,this.Lo=this.ii.enqueueAfterDelay(this.Oo,1e4,()=>(this.Ko()&&(this.state=3),Promise.resolve())),this.listener.uo()))}),this.stream.ao(r=>{s(()=>this.tu(r))}),this.stream.onMessage(r=>{s(()=>this.onMessage(r))})}Go(){this.state=5,this.qo.No(async()=>{this.state=0,this.start()})}tu(e){return V("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}Xo(e){return n=>{this.ii.enqueueAndForget(()=>this.Fo===e?n():(V("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class zS extends qg{constructor(e,n,s,r,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,s,r,o),this.serializer=i}eu(e,n){return this.connection.Ro("Listen",e,n)}onMessage(e){this.qo.reset();const n=aS(this.serializer,e),s=function(r){if(!("targetChange"in r))return J.min();const i=r.targetChange;return i.targetIds&&i.targetIds.length?J.min():i.readTime?an(i.readTime):J.min()}(e);return this.listener.nu(n,s)}su(e){const n={};n.database=hc(this.serializer),n.addTarget=function(r,i){let o;const a=i.target;if(o=ic(a)?{documents:uS(r,a)}:{query:hS(r,a)},o.targetId=i.targetId,i.resumeToken.approximateByteSize()>0){o.resumeToken=Ug(r,i.resumeToken);const l=lc(r,i.expectedCount);l!==null&&(o.expectedCount=l)}else if(i.snapshotVersion.compareTo(J.min())>0){o.readTime=qo(r,i.snapshotVersion.toTimestamp());const l=lc(r,i.expectedCount);l!==null&&(o.expectedCount=l)}return o}(this.serializer,e);const s=dS(this.serializer,e);s&&(n.labels=s),this.Wo(n)}iu(e){const n={};n.database=hc(this.serializer),n.removeTarget=e,this.Wo(n)}}class GS extends qg{constructor(e,n,s,r,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,s,r,o),this.serializer=i,this.ru=!1}get ou(){return this.ru}start(){this.ru=!1,this.lastStreamToken=void 0,super.start()}Yo(){this.ru&&this.uu([])}eu(e,n){return this.connection.Ro("Write",e,n)}onMessage(e){if(De(!!e.streamToken),this.lastStreamToken=e.streamToken,this.ru){this.qo.reset();const n=cS(e.writeResults,e.commitTime),s=an(e.commitTime);return this.listener.cu(s,n)}return De(!e.writeResults||e.writeResults.length===0),this.ru=!0,this.listener.au()}hu(){const e={};e.database=hc(this.serializer),this.Wo(e)}uu(e){const n={streamToken:this.lastStreamToken,writes:e.map(s=>lS(this.serializer,s))};this.Wo(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QS extends class{}{constructor(e,n,s,r){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=s,this.serializer=r,this.lu=!1}fu(){if(this.lu)throw new H(T.FAILED_PRECONDITION,"The client has already been terminated.")}Io(e,n,s){return this.fu(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([r,i])=>this.connection.Io(e,n,s,r,i)).catch(r=>{throw r.name==="FirebaseError"?(r.code===T.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),r):new H(T.UNKNOWN,r.toString())})}vo(e,n,s,r){return this.fu(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.vo(e,n,s,i,o,r)).catch(i=>{throw i.name==="FirebaseError"?(i.code===T.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new H(T.UNKNOWN,i.toString())})}terminate(){this.lu=!0}}class YS{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.wu=0,this._u=null,this.mu=!0}gu(){this.wu===0&&(this.yu("Unknown"),this._u=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._u=null,this.pu("Backend didn't respond within 10 seconds."),this.yu("Offline"),Promise.resolve())))}Iu(e){this.state==="Online"?this.yu("Unknown"):(this.wu++,this.wu>=1&&(this.Tu(),this.pu(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.yu("Offline")))}set(e){this.Tu(),this.wu=0,e==="Online"&&(this.mu=!1),this.yu(e)}yu(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}pu(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.mu?(Sn(n),this.mu=!1):V("OnlineStateTracker",n)}Tu(){this._u!==null&&(this._u.cancel(),this._u=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XS{constructor(e,n,s,r,i){this.localStore=e,this.datastore=n,this.asyncQueue=s,this.remoteSyncer={},this.Eu=[],this.Au=new Map,this.vu=new Set,this.Ru=[],this.Pu=i,this.Pu.Yr(o=>{s.enqueueAndForget(async()=>{Cs(this)&&(V("RemoteStore","Restarting streams for network reachability change."),await async function(a){const l=te(a);l.vu.add(4),await Vi(l),l.bu.set("Unknown"),l.vu.delete(4),await La(l)}(this))})}),this.bu=new YS(s,r)}}async function La(t){if(Cs(t))for(const e of t.Ru)await e(!0)}async function Vi(t){for(const e of t.Ru)await e(!1)}function zg(t,e){const n=te(t);n.Au.has(e.targetId)||(n.Au.set(e.targetId,e),Du(n)?xu(n):wr(n).Ko()&&ku(n,e))}function Gg(t,e){const n=te(t),s=wr(n);n.Au.delete(e),s.Ko()&&Qg(n,e),n.Au.size===0&&(s.Ko()?s.jo():Cs(n)&&n.bu.set("Unknown"))}function ku(t,e){if(t.Vu.qt(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(J.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}wr(t).su(e)}function Qg(t,e){t.Vu.qt(e),wr(t).iu(e)}function xu(t){t.Vu=new eS({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),le:e=>t.Au.get(e)||null,ue:()=>t.datastore.serializer.databaseId}),wr(t).start(),t.bu.gu()}function Du(t){return Cs(t)&&!wr(t).Uo()&&t.Au.size>0}function Cs(t){return te(t).vu.size===0}function Yg(t){t.Vu=void 0}async function JS(t){t.Au.forEach((e,n)=>{ku(t,e)})}async function ZS(t,e){Yg(t),Du(t)?(t.bu.Iu(e),xu(t)):t.bu.set("Unknown")}async function eA(t,e,n){if(t.bu.set("Online"),e instanceof Lg&&e.state===2&&e.cause)try{await async function(s,r){const i=r.cause;for(const o of r.targetIds)s.Au.has(o)&&(await s.remoteSyncer.rejectListen(o,i),s.Au.delete(o),s.Vu.removeTarget(o))}(t,e)}catch(s){V("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),s),await zo(t,s)}else if(e instanceof mo?t.Vu.Ht(e):e instanceof Mg?t.Vu.ne(e):t.Vu.Xt(e),!n.isEqual(J.min()))try{const s=await Kg(t.localStore);n.compareTo(s)>=0&&await function(r,i){const o=r.Vu.ce(i);return o.targetChanges.forEach((a,l)=>{if(a.resumeToken.approximateByteSize()>0){const c=r.Au.get(l);c&&r.Au.set(l,c.withResumeToken(a.resumeToken,i))}}),o.targetMismatches.forEach((a,l)=>{const c=r.Au.get(a);if(!c)return;r.Au.set(a,c.withResumeToken(gt.EMPTY_BYTE_STRING,c.snapshotVersion)),Qg(r,a);const u=new Vn(c.target,a,l,c.sequenceNumber);ku(r,u)}),r.remoteSyncer.applyRemoteEvent(o)}(t,n)}catch(s){V("RemoteStore","Failed to raise snapshot:",s),await zo(t,s)}}async function zo(t,e,n){if(!Li(e))throw e;t.vu.add(1),await Vi(t),t.bu.set("Offline"),n||(n=()=>Kg(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{V("RemoteStore","Retrying IndexedDB access"),await n(),t.vu.delete(1),await La(t)})}function Xg(t,e){return e().catch(n=>zo(t,n,e))}async function Ua(t){const e=te(t),n=Xn(e);let s=e.Eu.length>0?e.Eu[e.Eu.length-1].batchId:-1;for(;tA(e);)try{const r=await VS(e.localStore,s);if(r===null){e.Eu.length===0&&n.jo();break}s=r.batchId,nA(e,r)}catch(r){await zo(e,r)}Jg(e)&&Zg(e)}function tA(t){return Cs(t)&&t.Eu.length<10}function nA(t,e){t.Eu.push(e);const n=Xn(t);n.Ko()&&n.ou&&n.uu(e.mutations)}function Jg(t){return Cs(t)&&!Xn(t).Uo()&&t.Eu.length>0}function Zg(t){Xn(t).start()}async function sA(t){Xn(t).hu()}async function rA(t){const e=Xn(t);for(const n of t.Eu)e.uu(n.mutations)}async function iA(t,e,n){const s=t.Eu.shift(),r=Tu.from(s,e,n);await Xg(t,()=>t.remoteSyncer.applySuccessfulWrite(r)),await Ua(t)}async function oA(t,e){e&&Xn(t).ou&&await async function(n,s){if(r=s.code,Xb(r)&&r!==T.ABORTED){const i=n.Eu.shift();Xn(n).Qo(),await Xg(n,()=>n.remoteSyncer.rejectFailedWrite(i.batchId,s)),await Ua(n)}var r}(t,e),Jg(t)&&Zg(t)}async function Uf(t,e){const n=te(t);n.asyncQueue.verifyOperationInProgress(),V("RemoteStore","RemoteStore received new credentials");const s=Cs(n);n.vu.add(3),await Vi(n),s&&n.bu.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.vu.delete(3),await La(n)}async function aA(t,e){const n=te(t);e?(n.vu.delete(2),await La(n)):e||(n.vu.add(2),await Vi(n),n.bu.set("Unknown"))}function wr(t){return t.Su||(t.Su=function(e,n,s){const r=te(e);return r.fu(),new zS(n,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,s)}(t.datastore,t.asyncQueue,{uo:JS.bind(null,t),ao:ZS.bind(null,t),nu:eA.bind(null,t)}),t.Ru.push(async e=>{e?(t.Su.Qo(),Du(t)?xu(t):t.bu.set("Unknown")):(await t.Su.stop(),Yg(t))})),t.Su}function Xn(t){return t.Du||(t.Du=function(e,n,s){const r=te(e);return r.fu(),new GS(n,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,s)}(t.datastore,t.asyncQueue,{uo:sA.bind(null,t),ao:oA.bind(null,t),au:rA.bind(null,t),cu:iA.bind(null,t)}),t.Ru.push(async e=>{e?(t.Du.Qo(),await Ua(t)):(await t.Du.stop(),t.Eu.length>0&&(V("RemoteStore",`Stopping write stream with ${t.Eu.length} pending writes`),t.Eu=[]))})),t.Du}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nu{constructor(e,n,s,r,i){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=s,this.op=r,this.removalCallback=i,this.deferred=new Kn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}static createAndSchedule(e,n,s,r,i){const o=Date.now()+s,a=new Nu(e,n,o,r,i);return a.start(s),a}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new H(T.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Ou(t,e){if(Sn("AsyncQueue",`${e}: ${t}`),Li(t))return new H(T.UNAVAILABLE,`${e}: ${t}`);throw t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ys{constructor(e){this.comparator=e?(n,s)=>e(n,s)||K.comparator(n.key,s.key):(n,s)=>K.comparator(n.key,s.key),this.keyedMap=Dr(),this.sortedSet=new Me(this.comparator)}static emptySet(e){return new Ys(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,s)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof Ys)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),s=e.sortedSet.getIterator();for(;n.hasNext();){const r=n.getNext().key,i=s.getNext().key;if(!r.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const s=new Ys;return s.comparator=this.comparator,s.keyedMap=e,s.sortedSet=n,s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ff{constructor(){this.Cu=new Me(K.comparator)}track(e){const n=e.doc.key,s=this.Cu.get(n);s?e.type!==0&&s.type===3?this.Cu=this.Cu.insert(n,e):e.type===3&&s.type!==1?this.Cu=this.Cu.insert(n,{type:s.type,doc:e.doc}):e.type===2&&s.type===2?this.Cu=this.Cu.insert(n,{type:2,doc:e.doc}):e.type===2&&s.type===0?this.Cu=this.Cu.insert(n,{type:0,doc:e.doc}):e.type===1&&s.type===0?this.Cu=this.Cu.remove(n):e.type===1&&s.type===2?this.Cu=this.Cu.insert(n,{type:1,doc:s.doc}):e.type===0&&s.type===1?this.Cu=this.Cu.insert(n,{type:2,doc:e.doc}):Y():this.Cu=this.Cu.insert(n,e)}xu(){const e=[];return this.Cu.inorderTraversal((n,s)=>{e.push(s)}),e}}class ar{constructor(e,n,s,r,i,o,a,l,c){this.query=e,this.docs=n,this.oldDocs=s,this.docChanges=r,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=a,this.excludesMetadataChanges=l,this.hasCachedResults=c}static fromInitialDocuments(e,n,s,r,i){const o=[];return n.forEach(a=>{o.push({type:0,doc:a})}),new ar(e,n,Ys.emptySet(n),o,s,r,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&ka(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,s=e.docChanges;if(n.length!==s.length)return!1;for(let r=0;r<n.length;r++)if(n[r].type!==s[r].type||!n[r].doc.isEqual(s[r].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lA{constructor(){this.Nu=void 0,this.listeners=[]}}class cA{constructor(){this.queries=new vr(e=>_g(e),ka),this.onlineState="Unknown",this.ku=new Set}}async function uA(t,e){const n=te(t),s=e.query;let r=!1,i=n.queries.get(s);if(i||(r=!0,i=new lA),r)try{i.Nu=await n.onListen(s)}catch(o){const a=Ou(o,`Initialization of query '${ac(e.query)}' failed`);return void e.onError(a)}n.queries.set(s,i),i.listeners.push(e),e.Mu(n.onlineState),i.Nu&&e.$u(i.Nu)&&Pu(n)}async function hA(t,e){const n=te(t),s=e.query;let r=!1;const i=n.queries.get(s);if(i){const o=i.listeners.indexOf(e);o>=0&&(i.listeners.splice(o,1),r=i.listeners.length===0)}if(r)return n.queries.delete(s),n.onUnlisten(s)}function fA(t,e){const n=te(t);let s=!1;for(const r of e){const i=r.query,o=n.queries.get(i);if(o){for(const a of o.listeners)a.$u(r)&&(s=!0);o.Nu=r}}s&&Pu(n)}function dA(t,e,n){const s=te(t),r=s.queries.get(e);if(r)for(const i of r.listeners)i.onError(n);s.queries.delete(e)}function Pu(t){t.ku.forEach(e=>{e.next()})}class pA{constructor(e,n,s){this.query=e,this.Ou=n,this.Fu=!1,this.Bu=null,this.onlineState="Unknown",this.options=s||{}}$u(e){if(!this.options.includeMetadataChanges){const s=[];for(const r of e.docChanges)r.type!==3&&s.push(r);e=new ar(e.query,e.docs,e.oldDocs,s,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.Fu?this.Lu(e)&&(this.Ou.next(e),n=!0):this.qu(e,this.onlineState)&&(this.Uu(e),n=!0),this.Bu=e,n}onError(e){this.Ou.error(e)}Mu(e){this.onlineState=e;let n=!1;return this.Bu&&!this.Fu&&this.qu(this.Bu,e)&&(this.Uu(this.Bu),n=!0),n}qu(e,n){if(!e.fromCache)return!0;const s=n!=="Offline";return(!this.options.Ku||!s)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}Lu(e){if(e.docChanges.length>0)return!0;const n=this.Bu&&this.Bu.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}Uu(e){e=ar.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Fu=!0,this.Ou.next(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ey{constructor(e){this.key=e}}class ty{constructor(e){this.key=e}}class mA{constructor(e,n){this.query=e,this.Yu=n,this.Xu=null,this.hasCachedResults=!1,this.current=!1,this.Zu=ae(),this.mutatedKeys=ae(),this.tc=Eg(e),this.ec=new Ys(this.tc)}get nc(){return this.Yu}sc(e,n){const s=n?n.ic:new Ff,r=n?n.ec:this.ec;let i=n?n.mutatedKeys:this.mutatedKeys,o=r,a=!1;const l=this.query.limitType==="F"&&r.size===this.query.limit?r.last():null,c=this.query.limitType==="L"&&r.size===this.query.limit?r.first():null;if(e.inorderTraversal((u,h)=>{const f=r.get(u),d=xa(this.query,h)?h:null,y=!!f&&this.mutatedKeys.has(f.key),w=!!d&&(d.hasLocalMutations||this.mutatedKeys.has(d.key)&&d.hasCommittedMutations);let b=!1;f&&d?f.data.isEqual(d.data)?y!==w&&(s.track({type:3,doc:d}),b=!0):this.rc(f,d)||(s.track({type:2,doc:d}),b=!0,(l&&this.tc(d,l)>0||c&&this.tc(d,c)<0)&&(a=!0)):!f&&d?(s.track({type:0,doc:d}),b=!0):f&&!d&&(s.track({type:1,doc:f}),b=!0,(l||c)&&(a=!0)),b&&(d?(o=o.add(d),i=w?i.add(u):i.delete(u)):(o=o.delete(u),i=i.delete(u)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const u=this.query.limitType==="F"?o.last():o.first();o=o.delete(u.key),i=i.delete(u.key),s.track({type:1,doc:u})}return{ec:o,ic:s,zi:a,mutatedKeys:i}}rc(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,s){const r=this.ec;this.ec=e.ec,this.mutatedKeys=e.mutatedKeys;const i=e.ic.xu();i.sort((c,u)=>function(h,f){const d=y=>{switch(y){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return Y()}};return d(h)-d(f)}(c.type,u.type)||this.tc(c.doc,u.doc)),this.oc(s);const o=n?this.uc():[],a=this.Zu.size===0&&this.current?1:0,l=a!==this.Xu;return this.Xu=a,i.length!==0||l?{snapshot:new ar(this.query,e.ec,r,i,e.mutatedKeys,a===0,l,!1,!!s&&s.resumeToken.approximateByteSize()>0),cc:o}:{cc:o}}Mu(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({ec:this.ec,ic:new Ff,mutatedKeys:this.mutatedKeys,zi:!1},!1)):{cc:[]}}ac(e){return!this.Yu.has(e)&&!!this.ec.has(e)&&!this.ec.get(e).hasLocalMutations}oc(e){e&&(e.addedDocuments.forEach(n=>this.Yu=this.Yu.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Yu=this.Yu.delete(n)),this.current=e.current)}uc(){if(!this.current)return[];const e=this.Zu;this.Zu=ae(),this.ec.forEach(s=>{this.ac(s.key)&&(this.Zu=this.Zu.add(s.key))});const n=[];return e.forEach(s=>{this.Zu.has(s)||n.push(new ty(s))}),this.Zu.forEach(s=>{e.has(s)||n.push(new ey(s))}),n}hc(e){this.Yu=e.ir,this.Zu=ae();const n=this.sc(e.documents);return this.applyChanges(n,!0)}lc(){return ar.fromInitialDocuments(this.query,this.ec,this.mutatedKeys,this.Xu===0,this.hasCachedResults)}}class gA{constructor(e,n,s){this.query=e,this.targetId=n,this.view=s}}class yA{constructor(e){this.key=e,this.fc=!1}}class vA{constructor(e,n,s,r,i,o){this.localStore=e,this.remoteStore=n,this.eventManager=s,this.sharedClientState=r,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.dc={},this.wc=new vr(a=>_g(a),ka),this._c=new Map,this.mc=new Set,this.gc=new Me(K.comparator),this.yc=new Map,this.Ic=new Au,this.Tc={},this.Ec=new Map,this.Ac=or.Mn(),this.onlineState="Unknown",this.vc=void 0}get isPrimaryClient(){return this.vc===!0}}async function wA(t,e){const n=kA(t);let s,r;const i=n.wc.get(e);if(i)s=i.targetId,n.sharedClientState.addLocalQueryTarget(s),r=i.view.lc();else{const o=await BS(n.localStore,An(e)),a=n.sharedClientState.addLocalQueryTarget(o.targetId);s=o.targetId,r=await _A(n,e,s,a==="current",o.resumeToken),n.isPrimaryClient&&zg(n.remoteStore,o)}return r}async function _A(t,e,n,s,r){t.Rc=(h,f,d)=>async function(y,w,b,x){let R=w.view.sc(b);R.zi&&(R=await Pf(y.localStore,w.query,!1).then(({documents:ne})=>w.view.sc(ne,R)));const M=x&&x.targetChanges.get(w.targetId),C=w.view.applyChanges(R,y.isPrimaryClient,M);return Bf(y,w.targetId,C.cc),C.snapshot}(t,h,f,d);const i=await Pf(t.localStore,e,!0),o=new mA(e,i.ir),a=o.sc(i.documents),l=Fi.createSynthesizedTargetChangeForCurrentChange(n,s&&t.onlineState!=="Offline",r),c=o.applyChanges(a,t.isPrimaryClient,l);Bf(t,n,c.cc);const u=new gA(e,n,o);return t.wc.set(e,u),t._c.has(n)?t._c.get(n).push(e):t._c.set(n,[e]),c.snapshot}async function EA(t,e){const n=te(t),s=n.wc.get(e),r=n._c.get(s.targetId);if(r.length>1)return n._c.set(s.targetId,r.filter(i=>!ka(i,e))),void n.wc.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(s.targetId),n.sharedClientState.isActiveQueryTarget(s.targetId)||await fc(n.localStore,s.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(s.targetId),Gg(n.remoteStore,s.targetId),dc(n,s.targetId)}).catch(Mi)):(dc(n,s.targetId),await fc(n.localStore,s.targetId,!0))}async function IA(t,e,n){const s=xA(t);try{const r=await function(i,o){const a=te(i),l=We.now(),c=o.reduce((f,d)=>f.add(d.key),ae());let u,h;return a.persistence.runTransaction("Locally write mutations","readwrite",f=>{let d=Cn(),y=ae();return a.Zi.getEntries(f,c).next(w=>{d=w,d.forEach((b,x)=>{x.isValidDocument()||(y=y.add(b))})}).next(()=>a.localDocuments.getOverlayedDocuments(f,d)).next(w=>{u=w;const b=[];for(const x of o){const R=qb(x,u.get(x.key).overlayedDocument);R!=null&&b.push(new ns(x.key,R,dg(R.value.mapValue),on.exists(!0)))}return a.mutationQueue.addMutationBatch(f,l,b,o)}).next(w=>{h=w;const b=w.applyToLocalDocumentSet(u,y);return a.documentOverlayCache.saveOverlays(f,w.batchId,b)})}).then(()=>({batchId:h.batchId,changes:Tg(u)}))}(s.localStore,e);s.sharedClientState.addPendingMutation(r.batchId),function(i,o,a){let l=i.Tc[i.currentUser.toKey()];l||(l=new Me(ge)),l=l.insert(o,a),i.Tc[i.currentUser.toKey()]=l}(s,r.batchId,n),await Bi(s,r.changes),await Ua(s.remoteStore)}catch(r){const i=Ou(r,"Failed to persist write");n.reject(i)}}async function ny(t,e){const n=te(t);try{const s=await US(n.localStore,e);e.targetChanges.forEach((r,i)=>{const o=n.yc.get(i);o&&(De(r.addedDocuments.size+r.modifiedDocuments.size+r.removedDocuments.size<=1),r.addedDocuments.size>0?o.fc=!0:r.modifiedDocuments.size>0?De(o.fc):r.removedDocuments.size>0&&(De(o.fc),o.fc=!1))}),await Bi(n,s,e)}catch(s){await Mi(s)}}function Vf(t,e,n){const s=te(t);if(s.isPrimaryClient&&n===0||!s.isPrimaryClient&&n===1){const r=[];s.wc.forEach((i,o)=>{const a=o.view.Mu(e);a.snapshot&&r.push(a.snapshot)}),function(i,o){const a=te(i);a.onlineState=o;let l=!1;a.queries.forEach((c,u)=>{for(const h of u.listeners)h.Mu(o)&&(l=!0)}),l&&Pu(a)}(s.eventManager,e),r.length&&s.dc.nu(r),s.onlineState=e,s.isPrimaryClient&&s.sharedClientState.setOnlineState(e)}}async function TA(t,e,n){const s=te(t);s.sharedClientState.updateQueryState(e,"rejected",n);const r=s.yc.get(e),i=r&&r.key;if(i){let o=new Me(K.comparator);o=o.insert(i,at.newNoDocument(i,J.min()));const a=ae().add(i),l=new Pa(J.min(),new Map,new Me(ge),o,a);await ny(s,l),s.gc=s.gc.remove(i),s.yc.delete(e),Mu(s)}else await fc(s.localStore,e,!1).then(()=>dc(s,e,n)).catch(Mi)}async function bA(t,e){const n=te(t),s=e.batch.batchId;try{const r=await LS(n.localStore,e);ry(n,s,null),sy(n,s),n.sharedClientState.updateMutationState(s,"acknowledged"),await Bi(n,r)}catch(r){await Mi(r)}}async function SA(t,e,n){const s=te(t);try{const r=await function(i,o){const a=te(i);return a.persistence.runTransaction("Reject batch","readwrite-primary",l=>{let c;return a.mutationQueue.lookupMutationBatch(l,o).next(u=>(De(u!==null),c=u.keys(),a.mutationQueue.removeMutationBatch(l,u))).next(()=>a.mutationQueue.performConsistencyCheck(l)).next(()=>a.documentOverlayCache.removeOverlaysForBatchId(l,c,o)).next(()=>a.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(l,c)).next(()=>a.localDocuments.getDocuments(l,c))})}(s.localStore,e);ry(s,e,n),sy(s,e),s.sharedClientState.updateMutationState(e,"rejected",n),await Bi(s,r)}catch(r){await Mi(r)}}function sy(t,e){(t.Ec.get(e)||[]).forEach(n=>{n.resolve()}),t.Ec.delete(e)}function ry(t,e,n){const s=te(t);let r=s.Tc[s.currentUser.toKey()];if(r){const i=r.get(e);i&&(n?i.reject(n):i.resolve(),r=r.remove(e)),s.Tc[s.currentUser.toKey()]=r}}function dc(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const s of t._c.get(e))t.wc.delete(s),n&&t.dc.Pc(s,n);t._c.delete(e),t.isPrimaryClient&&t.Ic.Is(e).forEach(s=>{t.Ic.containsKey(s)||iy(t,s)})}function iy(t,e){t.mc.delete(e.path.canonicalString());const n=t.gc.get(e);n!==null&&(Gg(t.remoteStore,n),t.gc=t.gc.remove(e),t.yc.delete(n),Mu(t))}function Bf(t,e,n){for(const s of n)s instanceof ey?(t.Ic.addReference(s.key,e),AA(t,s)):s instanceof ty?(V("SyncEngine","Document no longer in limbo: "+s.key),t.Ic.removeReference(s.key,e),t.Ic.containsKey(s.key)||iy(t,s.key)):Y()}function AA(t,e){const n=e.key,s=n.path.canonicalString();t.gc.get(n)||t.mc.has(s)||(V("SyncEngine","New document in limbo: "+n),t.mc.add(s),Mu(t))}function Mu(t){for(;t.mc.size>0&&t.gc.size<t.maxConcurrentLimboResolutions;){const e=t.mc.values().next().value;t.mc.delete(e);const n=new K(Fe.fromString(e)),s=t.Ac.next();t.yc.set(s,new yA(n)),t.gc=t.gc.insert(n,s),zg(t.remoteStore,new Vn(An(Iu(n.path)),s,"TargetPurposeLimboResolution",gu.ct))}}async function Bi(t,e,n){const s=te(t),r=[],i=[],o=[];s.wc.isEmpty()||(s.wc.forEach((a,l)=>{o.push(s.Rc(l,e,n).then(c=>{if((c||n)&&s.isPrimaryClient&&s.sharedClientState.updateQueryState(l.targetId,c!=null&&c.fromCache?"not-current":"current"),c){r.push(c);const u=Ru.Li(l.targetId,c);i.push(u)}}))}),await Promise.all(o),s.dc.nu(r),await async function(a,l){const c=te(a);try{await c.persistence.runTransaction("notifyLocalViewChanges","readwrite",u=>A.forEach(l,h=>A.forEach(h.Fi,f=>c.persistence.referenceDelegate.addReference(u,h.targetId,f)).next(()=>A.forEach(h.Bi,f=>c.persistence.referenceDelegate.removeReference(u,h.targetId,f)))))}catch(u){if(!Li(u))throw u;V("LocalStore","Failed to update sequence numbers: "+u)}for(const u of l){const h=u.targetId;if(!u.fromCache){const f=c.Ji.get(h),d=f.snapshotVersion,y=f.withLastLimboFreeSnapshotVersion(d);c.Ji=c.Ji.insert(h,y)}}}(s.localStore,i))}async function CA(t,e){const n=te(t);if(!n.currentUser.isEqual(e)){V("SyncEngine","User change. New user:",e.toKey());const s=await Hg(n.localStore,e);n.currentUser=e,function(r,i){r.Ec.forEach(o=>{o.forEach(a=>{a.reject(new H(T.CANCELLED,i))})}),r.Ec.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,s.removedBatchIds,s.addedBatchIds),await Bi(n,s.er)}}function RA(t,e){const n=te(t),s=n.yc.get(e);if(s&&s.fc)return ae().add(s.key);{let r=ae();const i=n._c.get(e);if(!i)return r;for(const o of i){const a=n.wc.get(o);r=r.unionWith(a.view.nc)}return r}}function kA(t){const e=te(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=ny.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=RA.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=TA.bind(null,e),e.dc.nu=fA.bind(null,e.eventManager),e.dc.Pc=dA.bind(null,e.eventManager),e}function xA(t){const e=te(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=bA.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=SA.bind(null,e),e}class $f{constructor(){this.synchronizeTabs=!1}async initialize(e){this.serializer=Ma(e.databaseInfo.databaseId),this.sharedClientState=this.createSharedClientState(e),this.persistence=this.createPersistence(e),await this.persistence.start(),this.localStore=this.createLocalStore(e),this.gcScheduler=this.createGarbageCollectionScheduler(e,this.localStore),this.indexBackfillerScheduler=this.createIndexBackfillerScheduler(e,this.localStore)}createGarbageCollectionScheduler(e,n){return null}createIndexBackfillerScheduler(e,n){return null}createLocalStore(e){return MS(this.persistence,new OS,e.initialUser,this.serializer)}createPersistence(e){return new DS(Cu.zs,this.serializer)}createSharedClientState(e){return new jS}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class DA{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=s=>Vf(this.syncEngine,s,1),this.remoteStore.remoteSyncer.handleCredentialChange=CA.bind(null,this.syncEngine),await aA(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new cA}createDatastore(e){const n=Ma(e.databaseInfo.databaseId),s=(r=e.databaseInfo,new qS(r));var r;return function(i,o,a,l){return new QS(i,o,a,l)}(e.authCredentials,e.appCheckCredentials,s,n)}createRemoteStore(e){return n=this.localStore,s=this.datastore,r=e.asyncQueue,i=a=>Vf(this.syncEngine,a,0),o=Lf.D()?new Lf:new HS,new XS(n,s,r,i,o);var n,s,r,i,o}createSyncEngine(e,n){return function(s,r,i,o,a,l,c){const u=new vA(s,r,i,o,a,l);return c&&(u.vc=!0),u}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}terminate(){return async function(e){const n=te(e);V("RemoteStore","RemoteStore shutting down."),n.vu.add(5),await Vi(n),n.Pu.shutdown(),n.bu.set("Unknown")}(this.remoteStore)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NA{constructor(e){this.observer=e,this.muted=!1}next(e){this.observer.next&&this.Sc(this.observer.next,e)}error(e){this.observer.error?this.Sc(this.observer.error,e):Sn("Uncaught Error in snapshot listener:",e.toString())}Dc(){this.muted=!0}Sc(e,n){this.muted||setTimeout(()=>{this.muted||e(n)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OA{constructor(e,n,s,r){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=s,this.databaseInfo=r,this.user=it.UNAUTHENTICATED,this.clientId=ug.A(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(s,async i=>{V("FirestoreClient","Received user=",i.uid),await this.authCredentialListener(i),this.user=i}),this.appCheckCredentials.start(s,i=>(V("FirestoreClient","Received new app check token=",i),this.appCheckCredentialListener(i,this.user)))}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new H(T.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Kn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const s=Ou(n,"Failed to shutdown persistence");e.reject(s)}}),e.promise}}async function _l(t,e){t.asyncQueue.verifyOperationInProgress(),V("FirestoreClient","Initializing OfflineComponentProvider");const n=await t.getConfiguration();await e.initialize(n);let s=n.initialUser;t.setCredentialChangeListener(async r=>{s.isEqual(r)||(await Hg(e.localStore,r),s=r)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function jf(t,e){t.asyncQueue.verifyOperationInProgress();const n=await MA(t);V("FirestoreClient","Initializing OnlineComponentProvider");const s=await t.getConfiguration();await e.initialize(n,s),t.setCredentialChangeListener(r=>Uf(e.remoteStore,r)),t.setAppCheckTokenChangeListener((r,i)=>Uf(e.remoteStore,i)),t._onlineComponents=e}function PA(t){return t.name==="FirebaseError"?t.code===T.FAILED_PRECONDITION||t.code===T.UNIMPLEMENTED:!(typeof DOMException<"u"&&t instanceof DOMException)||t.code===22||t.code===20||t.code===11}async function MA(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){V("FirestoreClient","Using user provided OfflineComponentProvider");try{await _l(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!PA(n))throw n;ws("Error using user provided cache. Falling back to memory cache: "+n),await _l(t,new $f)}}else V("FirestoreClient","Using default OfflineComponentProvider"),await _l(t,new $f);return t._offlineComponents}async function oy(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(V("FirestoreClient","Using user provided OnlineComponentProvider"),await jf(t,t._uninitializedComponentsProvider._online)):(V("FirestoreClient","Using default OnlineComponentProvider"),await jf(t,new DA))),t._onlineComponents}function LA(t){return oy(t).then(e=>e.syncEngine)}async function UA(t){const e=await oy(t),n=e.eventManager;return n.onListen=wA.bind(null,e.syncEngine),n.onUnlisten=EA.bind(null,e.syncEngine),n}function FA(t,e,n={}){const s=new Kn;return t.asyncQueue.enqueueAndForget(async()=>function(r,i,o,a,l){const c=new NA({next:h=>{i.enqueueAndForget(()=>hA(r,u));const f=h.docs.has(o);!f&&h.fromCache?l.reject(new H(T.UNAVAILABLE,"Failed to get document because the client is offline.")):f&&h.fromCache&&a&&a.source==="server"?l.reject(new H(T.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):l.resolve(h)},error:h=>l.reject(h)}),u=new pA(Iu(o.path),c,{includeMetadataChanges:!0,Ku:!0});return uA(r,u)}(await UA(t),t.asyncQueue,e,n,s)),s.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ay(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hf=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function VA(t,e,n){if(!n)throw new H(T.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function ly(t,e,n,s){if(e===!0&&s===!0)throw new H(T.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function Kf(t){if(!K.isDocumentKey(t))throw new H(T.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function Lu(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(n){return n.constructor?n.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":Y()}function Jn(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new H(T.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Lu(t);throw new H(T.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wf{constructor(e){var n,s;if(e.host===void 0){if(e.ssl!==void 0)throw new H(T.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(n=e.ssl)===null||n===void 0||n;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.cache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new H(T.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}ly("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=ay((s=e.experimentalLongPollingOptions)!==null&&s!==void 0?s:{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new H(T.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new H(T.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new H(T.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(n=this.experimentalLongPollingOptions,s=e.experimentalLongPollingOptions,n.timeoutSeconds===s.timeoutSeconds)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams;var n,s}}class Uu{constructor(e,n,s,r){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=s,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Wf({}),this._settingsFrozen=!1}get app(){if(!this._app)throw new H(T.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!==void 0}_setSettings(e){if(this._settingsFrozen)throw new H(T.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Wf(e),e.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new cg;switch(n.type){case"firstParty":return new ib(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new H(T.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const n=Hf.get(e);n&&(V("ComponentProvider","Removing Datastore"),Hf.delete(e),n.terminate())}(this),Promise.resolve()}}function cy(t,e,n,s={}){var r;const i=(t=Jn(t,Uu))._getSettings(),o=`${e}:${n}`;if(i.host!=="firestore.googleapis.com"&&i.host!==o&&ws("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),t._setSettings(Object.assign(Object.assign({},i),{host:o,ssl:!1})),s.mockUserToken){let a,l;if(typeof s.mockUserToken=="string")a=s.mockUserToken,l=it.MOCK_USER;else{a=I_(s.mockUserToken,(r=t._app)===null||r===void 0?void 0:r.options.projectId);const c=s.mockUserToken.sub||s.mockUserToken.user_id;if(!c)throw new H(T.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");l=new it(c)}t._authCredentials=new nb(new lg(a,l))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kt{constructor(e,n,s){this.converter=n,this._key=s,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new lr(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new kt(this.firestore,e,this._key)}}class Fa{constructor(e,n,s){this.converter=n,this._query=s,this.type="query",this.firestore=e}withConverter(e){return new Fa(this.firestore,e,this._query)}}class lr extends Fa{constructor(e,n,s){super(e,n,Iu(s)),this._path=s,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new kt(this.firestore,null,new K(e))}withConverter(e){return new lr(this.firestore,e,this._path)}}function Wn(t,e,...n){if(t=mt(t),arguments.length===1&&(e=ug.A()),VA("doc","path",e),t instanceof Uu){const s=Fe.fromString(e,...n);return Kf(s),new kt(t,null,new K(s))}{if(!(t instanceof kt||t instanceof lr))throw new H(T.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=t._path.child(Fe.fromString(e,...n));return Kf(s),new kt(t.firestore,t instanceof lr?t.converter:null,new K(s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BA{constructor(){this.Gc=Promise.resolve(),this.Qc=[],this.jc=!1,this.zc=[],this.Wc=null,this.Hc=!1,this.Jc=!1,this.Yc=[],this.qo=new Wg(this,"async_queue_retry"),this.Xc=()=>{const n=wl();n&&V("AsyncQueue","Visibility state changed to "+n.visibilityState),this.qo.Mo()};const e=wl();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.Xc)}get isShuttingDown(){return this.jc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Zc(),this.ta(e)}enterRestrictedMode(e){if(!this.jc){this.jc=!0,this.Jc=e||!1;const n=wl();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Xc)}}enqueue(e){if(this.Zc(),this.jc)return new Promise(()=>{});const n=new Kn;return this.ta(()=>this.jc&&this.Jc?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Qc.push(e),this.ea()))}async ea(){if(this.Qc.length!==0){try{await this.Qc[0](),this.Qc.shift(),this.qo.reset()}catch(e){if(!Li(e))throw e;V("AsyncQueue","Operation failed with retryable error: "+e)}this.Qc.length>0&&this.qo.No(()=>this.ea())}}ta(e){const n=this.Gc.then(()=>(this.Hc=!0,e().catch(s=>{this.Wc=s,this.Hc=!1;const r=function(i){let o=i.message||"";return i.stack&&(o=i.stack.includes(i.message)?i.stack:i.message+`
`+i.stack),o}(s);throw Sn("INTERNAL UNHANDLED ERROR: ",r),s}).then(s=>(this.Hc=!1,s))));return this.Gc=n,n}enqueueAfterDelay(e,n,s){this.Zc(),this.Yc.indexOf(e)>-1&&(n=0);const r=Nu.createAndSchedule(this,e,n,s,i=>this.na(i));return this.zc.push(r),r}Zc(){this.Wc&&Y()}verifyOperationInProgress(){}async sa(){let e;do e=this.Gc,await e;while(e!==this.Gc)}ia(e){for(const n of this.zc)if(n.timerId===e)return!0;return!1}ra(e){return this.sa().then(()=>{this.zc.sort((n,s)=>n.targetTimeMs-s.targetTimeMs);for(const n of this.zc)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.sa()})}oa(e){this.Yc.push(e)}na(e){const n=this.zc.indexOf(e);this.zc.splice(n,1)}}class $i extends Uu{constructor(e,n,s,r){super(e,n,s,r),this.type="firestore",this._queue=new BA,this._persistenceKey=(r==null?void 0:r.name)||"[DEFAULT]"}_terminate(){return this._firestoreClient||hy(this),this._firestoreClient.terminate()}}function uy(t,e){const n=typeof t=="object"?t:bp(),s=typeof t=="string"?t:"(default)",r=Fc(n,"firestore").getImmediate({identifier:s});if(!r._initialized){const i=__("firestore");i&&cy(r,...i)}return r}function Fu(t){return t._firestoreClient||hy(t),t._firestoreClient.verifyNotTerminated(),t._firestoreClient}function hy(t){var e,n,s;const r=t._freezeSettings(),i=function(o,a,l,c){return new yb(o,a,l,c.host,c.ssl,c.experimentalForceLongPolling,c.experimentalAutoDetectLongPolling,ay(c.experimentalLongPollingOptions),c.useFetchStreams)}(t._databaseId,((e=t._app)===null||e===void 0?void 0:e.options.appId)||"",t._persistenceKey,r);t._firestoreClient=new OA(t._authCredentials,t._appCheckCredentials,t._queue,i),!((n=r.cache)===null||n===void 0)&&n._offlineComponentProvider&&(!((s=r.cache)===null||s===void 0)&&s._onlineComponentProvider)&&(t._firestoreClient._uninitializedComponentsProvider={_offlineKind:r.cache.kind,_offline:r.cache._offlineComponentProvider,_online:r.cache._onlineComponentProvider})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Is{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Is(gt.fromBase64String(e))}catch(n){throw new H(T.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new Is(gt.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ji{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new H(T.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new nt(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Va{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ba{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new H(T.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new H(T.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return ge(this._lat,e._lat)||ge(this._long,e._long)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $A=/^__.*__$/;class jA{constructor(e,n,s){this.data=e,this.fieldMask=n,this.fieldTransforms=s}toMutation(e,n){return this.fieldMask!==null?new ns(e,this.data,this.fieldMask,n,this.fieldTransforms):new Ui(e,this.data,n,this.fieldTransforms)}}class fy{constructor(e,n,s){this.data=e,this.fieldMask=n,this.fieldTransforms=s}toMutation(e,n){return new ns(e,this.data,this.fieldMask,n,this.fieldTransforms)}}function dy(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw Y()}}class Vu{constructor(e,n,s,r,i,o){this.settings=e,this.databaseId=n,this.serializer=s,this.ignoreUndefinedProperties=r,i===void 0&&this.ua(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get ca(){return this.settings.ca}aa(e){return new Vu(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}ha(e){var n;const s=(n=this.path)===null||n===void 0?void 0:n.child(e),r=this.aa({path:s,la:!1});return r.fa(e),r}da(e){var n;const s=(n=this.path)===null||n===void 0?void 0:n.child(e),r=this.aa({path:s,la:!1});return r.ua(),r}wa(e){return this.aa({path:void 0,la:!0})}_a(e){return Go(e,this.settings.methodName,this.settings.ma||!1,this.path,this.settings.ga)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}ua(){if(this.path)for(let e=0;e<this.path.length;e++)this.fa(this.path.get(e))}fa(e){if(e.length===0)throw this._a("Document fields must not be empty");if(dy(this.ca)&&$A.test(e))throw this._a('Document fields cannot begin and end with "__"')}}class HA{constructor(e,n,s){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=s||Ma(e)}ya(e,n,s,r=!1){return new Vu({ca:e,methodName:n,ga:s,path:nt.emptyPath(),la:!1,ma:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function py(t){const e=t._freezeSettings(),n=Ma(t._databaseId);return new HA(t._databaseId,!!e.ignoreUndefinedProperties,n)}function KA(t,e,n,s,r,i={}){const o=t.ya(i.merge||i.mergeFields?2:0,e,n,r);Bu("Data must be an object, but it was:",o,s);const a=my(s,o);let l,c;if(i.merge)l=new Mt(o.fieldMask),c=o.fieldTransforms;else if(i.mergeFields){const u=[];for(const h of i.mergeFields){const f=pc(e,h,n);if(!o.contains(f))throw new H(T.INVALID_ARGUMENT,`Field '${f}' is specified in your field mask but missing from your input data.`);yy(u,f)||u.push(f)}l=new Mt(u),c=o.fieldTransforms.filter(h=>l.covers(h.field))}else l=null,c=o.fieldTransforms;return new jA(new Rt(a),l,c)}class $a extends Va{_toFieldTransform(e){if(e.ca!==2)throw e.ca===1?e._a(`${this._methodName}() can only appear at the top level of your update data`):e._a(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof $a}}function WA(t,e,n,s){const r=t.ya(1,e,n);Bu("Data must be an object, but it was:",r,s);const i=[],o=Rt.empty();As(s,(l,c)=>{const u=$u(e,l,n);c=mt(c);const h=r.da(u);if(c instanceof $a)i.push(u);else{const f=ja(c,h);f!=null&&(i.push(u),o.set(u,f))}});const a=new Mt(i);return new fy(o,a,r.fieldTransforms)}function qA(t,e,n,s,r,i){const o=t.ya(1,e,n),a=[pc(e,s,n)],l=[r];if(i.length%2!=0)throw new H(T.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let f=0;f<i.length;f+=2)a.push(pc(e,i[f])),l.push(i[f+1]);const c=[],u=Rt.empty();for(let f=a.length-1;f>=0;--f)if(!yy(c,a[f])){const d=a[f];let y=l[f];y=mt(y);const w=o.da(d);if(y instanceof $a)c.push(d);else{const b=ja(y,w);b!=null&&(c.push(d),u.set(d,b))}}const h=new Mt(c);return new fy(u,h,o.fieldTransforms)}function ja(t,e){if(gy(t=mt(t)))return Bu("Unsupported field value:",e,t),my(t,e);if(t instanceof Va)return function(n,s){if(!dy(s.ca))throw s._a(`${n._methodName}() can only be used with update() and set()`);if(!s.path)throw s._a(`${n._methodName}() is not currently supported inside arrays`);const r=n._toFieldTransform(s);r&&s.fieldTransforms.push(r)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.la&&e.ca!==4)throw e._a("Nested arrays are not supported");return function(n,s){const r=[];let i=0;for(const o of n){let a=ja(o,s.wa(i));a==null&&(a={nullValue:"NULL_VALUE"}),r.push(a),i++}return{arrayValue:{values:r}}}(t,e)}return function(n,s){if((n=mt(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return Bb(s.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const r=We.fromDate(n);return{timestampValue:qo(s.serializer,r)}}if(n instanceof We){const r=new We(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:qo(s.serializer,r)}}if(n instanceof Ba)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof Is)return{bytesValue:Ug(s.serializer,n._byteString)};if(n instanceof kt){const r=s.databaseId,i=n.firestore._databaseId;if(!i.isEqual(r))throw s._a(`Document reference is for database ${i.projectId}/${i.database} but should be for database ${r.projectId}/${r.database}`);return{referenceValue:Su(n.firestore._databaseId||s.databaseId,n._key.path)}}throw s._a(`Unsupported field value: ${Lu(n)}`)}(t,e)}function my(t,e){const n={};return hg(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):As(t,(s,r)=>{const i=ja(r,e.ha(s));i!=null&&(n[s]=i)}),{mapValue:{fields:n}}}function gy(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof We||t instanceof Ba||t instanceof Is||t instanceof kt||t instanceof Va)}function Bu(t,e,n){if(!gy(n)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(n)){const s=Lu(n);throw s==="an object"?e._a(t+" a custom object"):e._a(t+" "+s)}}function pc(t,e,n){if((e=mt(e))instanceof ji)return e._internalPath;if(typeof e=="string")return $u(t,e);throw Go("Field path arguments must be of type string or ",t,!1,void 0,n)}const zA=new RegExp("[~\\*/\\[\\]]");function $u(t,e,n){if(e.search(zA)>=0)throw Go(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new ji(...e.split("."))._internalPath}catch{throw Go(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Go(t,e,n,s,r){const i=s&&!s.isEmpty(),o=r!==void 0;let a=`Function ${e}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let l="";return(i||o)&&(l+=" (found",i&&(l+=` in field ${s}`),o&&(l+=` in document ${r}`),l+=")"),new H(T.INVALID_ARGUMENT,a+t+l)}function yy(t,e){return t.some(n=>n.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vy{constructor(e,n,s,r,i){this._firestore=e,this._userDataWriter=n,this._key=s,this._document=r,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new kt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new GA(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(wy("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class GA extends vy{data(){return super.data()}}function wy(t,e){return typeof e=="string"?$u(t,e):e instanceof ji?e._internalPath:e._delegate._internalPath}class _y{convertValue(e,n="none"){switch(Es(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Ke(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(_s(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 10:return this.convertObject(e.mapValue,n);default:throw Y()}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const s={};return As(e,(r,i)=>{s[r]=this.convertValue(i,n)}),s}convertGeoPoint(e){return new Ba(Ke(e.latitude),Ke(e.longitude))}convertArray(e,n){return(e.values||[]).map(s=>this.convertValue(s,n))}convertServerTimestamp(e,n){switch(n){case"previous":const s=vu(e);return s==null?null:this.convertValue(s,n);case"estimate":return this.convertTimestamp(hi(e));default:return null}}convertTimestamp(e){const n=Yn(e);return new We(n.seconds,n.nanos)}convertDocumentKey(e,n){const s=Fe.fromString(e);De(jg(s));const r=new sr(s.get(1),s.get(3)),i=new K(s.popFirst(5));return r.isEqual(n)||Sn(`Document ${i} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function QA(t,e,n){let s;return s=t?t.toFirestore(e):e,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ey{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class ju extends vy{constructor(e,n,s,r,i,o){super(e,n,s,r,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new Iy(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const s=this._document.data.field(wy("DocumentSnapshot.get",e));if(s!==null)return this._userDataWriter.convertValue(s,n.serverTimestamps)}}}class Iy extends ju{data(e={}){return super.data(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mi(t){t=Jn(t,kt);const e=Jn(t.firestore,$i);return FA(Fu(e),t._key).then(n=>XA(e,t,n))}class YA extends _y{constructor(e){super(),this.firestore=e}convertBytes(e){return new Is(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new kt(this.firestore,null,n)}}function gi(t,e,n){t=Jn(t,kt);const s=Jn(t.firestore,$i),r=QA(t.converter,e);return Hu(s,[KA(py(s),"setDoc",t._key,r,t.converter!==null,n).toMutation(t._key,on.none())])}function Qo(t,e,n,...s){t=Jn(t,kt);const r=Jn(t.firestore,$i),i=py(r);let o;return o=typeof(e=mt(e))=="string"||e instanceof ji?qA(i,"updateDoc",t._key,e,n,s):WA(i,"updateDoc",t._key,e),Hu(r,[o.toMutation(t._key,on.exists(!0))])}function Hu(t,e){return function(n,s){const r=new Kn;return n.asyncQueue.enqueueAndForget(async()=>IA(await LA(n),s,r)),r.promise}(Fu(t),e)}function XA(t,e,n){const s=n.docs.get(e._key),r=new YA(t);return new ju(t,r,e._key,s,new Ey(n.hasPendingWrites,n.fromCache),e.converter)}(function(t,e=!0){(function(n){yr=n})(hr),Zs(new ps("firestore",(n,{instanceIdentifier:s,options:r})=>{const i=n.getProvider("app").getImmediate(),o=new $i(new sb(n.getProvider("auth-internal")),new ab(n.getProvider("app-check-internal")),function(a,l){if(!Object.prototype.hasOwnProperty.apply(a.options,["projectId"]))throw new H(T.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new sr(a.options.projectId,l)}(i,s),i);return r=Object.assign({useFetchStreams:e},r),o._setSettings(r),o},"PUBLIC").setMultipleInstances(!0)),Hn(df,"3.13.0",t),Hn(df,"3.13.0","esm2017")})();const JA=Object.freeze(Object.defineProperty({__proto__:null,AbstractUserDataWriter:_y,Bytes:Is,CollectionReference:lr,DocumentReference:kt,DocumentSnapshot:ju,FieldPath:ji,FieldValue:Va,Firestore:$i,FirestoreError:H,GeoPoint:Ba,Query:Fa,QueryDocumentSnapshot:Iy,SnapshotMetadata:Ey,Timestamp:We,_DatabaseId:sr,_DocumentKey:K,_EmptyAuthCredentialsProvider:cg,_FieldPath:nt,_TestingHooks:Oa,_cast:Jn,_logWarn:ws,_validateIsNotUsedTogether:ly,connectFirestoreEmulator:cy,doc:Wn,ensureFirestoreConfigured:Fu,executeWrite:Hu,getDoc:mi,getFirestore:uy,setDoc:gi,updateDoc:Qo},Symbol.toStringTag,{value:"Module"})),ZA={apiKey:"AIzaSyD96WBzgcd9atRLOoV3iiUxacYPoO1mZyM",authDomain:"batpill.firebaseapp.com",projectId:"batpill",storageBucket:"batpill.firebasestorage.app",messagingSenderId:"818277389275",appId:"1:818277389275:web:2a56d1688914f483e34dfe",measurementId:"G-79452D2EEY"},Ty=Tp(ZA),Et=QI(Ty),qn=uy(Ty),eC=Object.freeze(Object.defineProperty({__proto__:null,auth:Et,db:qn},Symbol.toStringTag,{value:"Module"})),re=wi({user:null,score:0,toast:{show:!1,text:"",medalDelta:0},setUser(t){this.user=t},setScore(t){this.score=t},showToast(t,e=0){this.toast.text=t,this.toast.medalDelta=e,this.toast.show=!0,setTimeout(()=>{this.toast.show=!1},3e3)}}),by="/assets/batpill-Ci4MPlm-.png",tC="/assets/pumpfun%20logo-CMyXD5Oj.png",Hi=(t,e)=>{const n=t.__vccOpts||t;for(const[s,r]of e)n[s]=r;return n},nC={name:"App",data(){return{user:Et.currentUser,store:re,menuOpen:!1,showScoreForGuests:!0}},async mounted(){Et.onAuthStateChanged(async t=>{if(this.user=t,t)try{const{db:e}=await So(async()=>{const{db:a}=await Promise.resolve().then(()=>eC);return{db:a}},void 0),{doc:n,getDoc:s}=await So(async()=>{const{doc:a,getDoc:l}=await Promise.resolve().then(()=>JA);return{doc:a,getDoc:l}},void 0),r=n(e,"users",t.uid),i=await s(r),o=i.exists()?i.data():null;re.user={uid:t.uid,email:t.email,username:(o==null?void 0:o.username)||t.email,totalScore:(o==null?void 0:o.totalScore)||0,medals:(o==null?void 0:o.medals)||0}}catch{re.user=re.user||{uid:t.uid,email:t.email}}else re.user=null})},methods:{async logout(){await Yp(Et),re.user=null,this.menuOpen=!1,this.$router.push("/login")},toggleMenu(){this.menuOpen=!this.menuOpen}},computed:{storeScore(){return this.store.score||0}}},sC={id:"app",class:"min-h-screen relative overflow-hidden"},rC={class:"p-4 header-bar shadow flex items-center z-30 fixed top-0 left-0 right-0"},iC={class:"flex-1 flex items-center space-x-4"},oC={class:"flex-1 flex justify-center"},aC={key:0,class:"score-pill"},lC={class:"score-value"},cC={key:1,class:"medals-pill",style:{"margin-left":"80px",display:"flex","align-items":"center"}},uC={class:"medal-value"},hC={class:"flex-1 flex items-center justify-end space-x-4 header-actions header-shift"},fC={key:0,class:"guest-actions"},dC={key:1,class:"flex items-center space-x-3"},pC={class:"text-white px-2 py-1 username"},mC={class:"pt-20 p-4 relative z-10 min-h-screen bg-transparent"},gC={class:"medal-text"};function yC(t,e,n,s,r,i){const o=Xs("router-link"),a=Xs("router-view");return Pe(),Ue("div",sC,[e[13]||(e[13]=k("div",{class:"bg-loop"},null,-1)),k("nav",rC,[k("div",iC,[Se(o,{to:"/",class:"flex items-center space-x-3"},{default:At(()=>[...e[2]||(e[2]=[k("img",{src:by,alt:"logo",class:"logo-img"},null,-1),k("h1",{class:"text-xl font-bold cursor-pointer text-white"},"batpill",-1)])]),_:1}),e[3]||(e[3]=k("a",{href:"https://pump.fun/profile/rantoldev",target:"_blank",class:"pump-link pl-16 inline-flex items-center ml-4"},[k("span",{class:"pump-text"},"batpill in pump.fun"),k("img",{src:tC,alt:"Pumpfun",class:"pump-logo"})],-1))]),k("div",oC,[r.store.user||r.showScoreForGuests?(Pe(),Ue("div",aC,[e[4]||(e[4]=k("div",{class:"score-label"},"SCORE",-1)),k("div",lC,Ft(i.storeScore),1)])):_n("",!0),r.store.user?(Pe(),Ue("div",cC,[e[5]||(e[5]=k("div",{class:"medal-icon-header",style:{"margin-right":"8px"}},"🏅",-1)),k("div",uC,Ft(r.store.user.medals||0),1)])):_n("",!0)]),k("div",hC,[r.store.user?(Pe(),Ue("div",dC,[k("div",pC,Ft(r.store.user.username||"Player"),1),Se(o,{to:"/profile",class:"px-3 py-1 btn-secondary desktop-only"},{default:At(()=>[...e[10]||(e[10]=[nn("Profile",-1)])]),_:1}),k("button",{onClick:e[0]||(e[0]=(...l)=>i.logout&&i.logout(...l)),class:"px-3 py-1 btn-secondary desktop-only"},"Logout"),Se(o,{to:"/profile",class:"mobile-icon","aria-label":"Profile"},{default:At(()=>[...e[11]||(e[11]=[k("button",{class:"icon-btn",title:"Profile"},"👤",-1)])]),_:1}),k("button",{onClick:e[1]||(e[1]=(...l)=>i.logout&&i.logout(...l)),class:"mobile-icon icon-btn",title:"Logout","aria-label":"Logout"},"🚪")])):(Pe(),Ue("div",fC,[Se(o,{to:"/login",class:"px-3 py-1 btn-secondary desktop-only"},{default:At(()=>[...e[6]||(e[6]=[nn("Login",-1)])]),_:1}),Se(o,{to:"/register",class:"px-3 py-1 btn-secondary desktop-only",style:{"margin-left":"10px"}},{default:At(()=>[...e[7]||(e[7]=[nn("Register",-1)])]),_:1}),Se(o,{to:"/login",class:"mobile-icon","aria-label":"Login"},{default:At(()=>[...e[8]||(e[8]=[k("button",{class:"icon-btn",title:"Login"},"🔐",-1)])]),_:1}),Se(o,{to:"/register",class:"mobile-icon","aria-label":"Register"},{default:At(()=>[...e[9]||(e[9]=[k("button",{class:"icon-btn",title:"Register"},"✍️",-1)])]),_:1})]))])]),k("main",mC,[Se(a)]),r.store.toast?(Pe(),Ue("div",{key:0,class:vi(["medal-toast",r.store.toast.show?"show":""])},[e[12]||(e[12]=k("div",{class:"medal-icon"},"🏅",-1)),k("div",gC,Ft(r.store.toast.text),1)],2)):_n("",!0),e[14]||(e[14]=k("footer",{class:"fixed bottom-0 left-0 right-0 p-2 footer-bar text-sm text-center z-30"},[k("div",null,"© batpill — use arrows or WASD to move. Space to pause.")],-1))])}const vC=Hi(nC,[["render",yC],["__scopeId","data-v-43f6502b"]]);/*!
 * vue-router v4.6.3
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const Ps=typeof document<"u";function Sy(t){return typeof t=="object"||"displayName"in t||"props"in t||"__vccOpts"in t}function wC(t){return t.__esModule||t[Symbol.toStringTag]==="Module"||t.default&&Sy(t.default)}const ye=Object.assign;function El(t,e){const n={};for(const s in e){const r=e[s];n[s]=Wt(r)?r.map(t):t(r)}return n}const qr=()=>{},Wt=Array.isArray;function qf(t,e){const n={};for(const s in t)n[s]=s in e?e[s]:t[s];return n}const Ay=/#/g,_C=/&/g,EC=/\//g,IC=/=/g,TC=/\?/g,Cy=/\+/g,bC=/%5B/g,SC=/%5D/g,Ry=/%5E/g,AC=/%60/g,ky=/%7B/g,CC=/%7C/g,xy=/%7D/g,RC=/%20/g;function Ku(t){return t==null?"":encodeURI(""+t).replace(CC,"|").replace(bC,"[").replace(SC,"]")}function kC(t){return Ku(t).replace(ky,"{").replace(xy,"}").replace(Ry,"^")}function mc(t){return Ku(t).replace(Cy,"%2B").replace(RC,"+").replace(Ay,"%23").replace(_C,"%26").replace(AC,"`").replace(ky,"{").replace(xy,"}").replace(Ry,"^")}function xC(t){return mc(t).replace(IC,"%3D")}function DC(t){return Ku(t).replace(Ay,"%23").replace(TC,"%3F")}function NC(t){return DC(t).replace(EC,"%2F")}function yi(t){if(t==null)return null;try{return decodeURIComponent(""+t)}catch{}return""+t}const OC=/\/$/,PC=t=>t.replace(OC,"");function Il(t,e,n="/"){let s,r={},i="",o="";const a=e.indexOf("#");let l=e.indexOf("?");return l=a>=0&&l>a?-1:l,l>=0&&(s=e.slice(0,l),i=e.slice(l,a>0?a:e.length),r=t(i.slice(1))),a>=0&&(s=s||e.slice(0,a),o=e.slice(a,e.length)),s=FC(s??e,n),{fullPath:s+i+o,path:s,query:r,hash:yi(o)}}function MC(t,e){const n=e.query?t(e.query):"";return e.path+(n&&"?")+n+(e.hash||"")}function zf(t,e){return!e||!t.toLowerCase().startsWith(e.toLowerCase())?t:t.slice(e.length)||"/"}function LC(t,e,n){const s=e.matched.length-1,r=n.matched.length-1;return s>-1&&s===r&&cr(e.matched[s],n.matched[r])&&Dy(e.params,n.params)&&t(e.query)===t(n.query)&&e.hash===n.hash}function cr(t,e){return(t.aliasOf||t)===(e.aliasOf||e)}function Dy(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(const n in t)if(!UC(t[n],e[n]))return!1;return!0}function UC(t,e){return Wt(t)?Gf(t,e):Wt(e)?Gf(e,t):t===e}function Gf(t,e){return Wt(e)?t.length===e.length&&t.every((n,s)=>n===e[s]):t.length===1&&t[0]===e}function FC(t,e){if(t.startsWith("/"))return t;if(!t)return e;const n=e.split("/"),s=t.split("/"),r=s[s.length-1];(r===".."||r===".")&&s.push("");let i=n.length-1,o,a;for(o=0;o<s.length;o++)if(a=s[o],a!==".")if(a==="..")i>1&&i--;else break;return n.slice(0,i).join("/")+"/"+s.slice(o).join("/")}const Dn={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};let gc=function(t){return t.pop="pop",t.push="push",t}({}),Tl=function(t){return t.back="back",t.forward="forward",t.unknown="",t}({});function VC(t){if(!t)if(Ps){const e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^\w+:\/\/[^\/]+/,"")}else t="/";return t[0]!=="/"&&t[0]!=="#"&&(t="/"+t),PC(t)}const BC=/^[^#]+#/;function $C(t,e){return t.replace(BC,"#")+e}function jC(t,e){const n=document.documentElement.getBoundingClientRect(),s=t.getBoundingClientRect();return{behavior:e.behavior,left:s.left-n.left-(e.left||0),top:s.top-n.top-(e.top||0)}}const Ha=()=>({left:window.scrollX,top:window.scrollY});function HC(t){let e;if("el"in t){const n=t.el,s=typeof n=="string"&&n.startsWith("#"),r=typeof n=="string"?s?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!r)return;e=jC(r,t)}else e=t;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.scrollX,e.top!=null?e.top:window.scrollY)}function Qf(t,e){return(history.state?history.state.position-e:-1)+t}const yc=new Map;function KC(t,e){yc.set(t,e)}function WC(t){const e=yc.get(t);return yc.delete(t),e}function qC(t){return typeof t=="string"||t&&typeof t=="object"}function Ny(t){return typeof t=="string"||typeof t=="symbol"}let Le=function(t){return t[t.MATCHER_NOT_FOUND=1]="MATCHER_NOT_FOUND",t[t.NAVIGATION_GUARD_REDIRECT=2]="NAVIGATION_GUARD_REDIRECT",t[t.NAVIGATION_ABORTED=4]="NAVIGATION_ABORTED",t[t.NAVIGATION_CANCELLED=8]="NAVIGATION_CANCELLED",t[t.NAVIGATION_DUPLICATED=16]="NAVIGATION_DUPLICATED",t}({});const Oy=Symbol("");Le.MATCHER_NOT_FOUND+"",Le.NAVIGATION_GUARD_REDIRECT+"",Le.NAVIGATION_ABORTED+"",Le.NAVIGATION_CANCELLED+"",Le.NAVIGATION_DUPLICATED+"";function ur(t,e){return ye(new Error,{type:t,[Oy]:!0},e)}function fn(t,e){return t instanceof Error&&Oy in t&&(e==null||!!(t.type&e))}const zC=["params","query","hash"];function GC(t){if(typeof t=="string")return t;if(t.path!=null)return t.path;const e={};for(const n of zC)n in t&&(e[n]=t[n]);return JSON.stringify(e,null,2)}function QC(t){const e={};if(t===""||t==="?")return e;const n=(t[0]==="?"?t.slice(1):t).split("&");for(let s=0;s<n.length;++s){const r=n[s].replace(Cy," "),i=r.indexOf("="),o=yi(i<0?r:r.slice(0,i)),a=i<0?null:yi(r.slice(i+1));if(o in e){let l=e[o];Wt(l)||(l=e[o]=[l]),l.push(a)}else e[o]=a}return e}function Yf(t){let e="";for(let n in t){const s=t[n];if(n=xC(n),s==null){s!==void 0&&(e+=(e.length?"&":"")+n);continue}(Wt(s)?s.map(r=>r&&mc(r)):[s&&mc(s)]).forEach(r=>{r!==void 0&&(e+=(e.length?"&":"")+n,r!=null&&(e+="="+r))})}return e}function YC(t){const e={};for(const n in t){const s=t[n];s!==void 0&&(e[n]=Wt(s)?s.map(r=>r==null?null:""+r):s==null?s:""+s)}return e}const XC=Symbol(""),Xf=Symbol(""),Wu=Symbol(""),Py=Symbol(""),vc=Symbol("");function Sr(){let t=[];function e(s){return t.push(s),()=>{const r=t.indexOf(s);r>-1&&t.splice(r,1)}}function n(){t=[]}return{add:e,list:()=>t.slice(),reset:n}}function Pn(t,e,n,s,r,i=o=>o()){const o=s&&(s.enterCallbacks[r]=s.enterCallbacks[r]||[]);return()=>new Promise((a,l)=>{const c=f=>{f===!1?l(ur(Le.NAVIGATION_ABORTED,{from:n,to:e})):f instanceof Error?l(f):qC(f)?l(ur(Le.NAVIGATION_GUARD_REDIRECT,{from:e,to:f})):(o&&s.enterCallbacks[r]===o&&typeof f=="function"&&o.push(f),a())},u=i(()=>t.call(s&&s.instances[r],e,n,c));let h=Promise.resolve(u);t.length<3&&(h=h.then(c)),h.catch(f=>l(f))})}function bl(t,e,n,s,r=i=>i()){const i=[];for(const o of t)for(const a in o.components){let l=o.components[a];if(!(e!=="beforeRouteEnter"&&!o.instances[a]))if(Sy(l)){const c=(l.__vccOpts||l)[e];c&&i.push(Pn(c,n,s,o,a,r))}else{let c=l();i.push(()=>c.then(u=>{if(!u)throw new Error(`Couldn't resolve component "${a}" at "${o.path}"`);const h=wC(u)?u.default:u;o.mods[a]=u,o.components[a]=h;const f=(h.__vccOpts||h)[e];return f&&Pn(f,n,s,o,a,r)()}))}}return i}function JC(t,e){const n=[],s=[],r=[],i=Math.max(e.matched.length,t.matched.length);for(let o=0;o<i;o++){const a=e.matched[o];a&&(t.matched.find(c=>cr(c,a))?s.push(a):n.push(a));const l=t.matched[o];l&&(e.matched.find(c=>cr(c,l))||r.push(l))}return[n,s,r]}/*!
 * vue-router v4.6.3
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let ZC=()=>location.protocol+"//"+location.host;function My(t,e){const{pathname:n,search:s,hash:r}=e,i=t.indexOf("#");if(i>-1){let o=r.includes(t.slice(i))?t.slice(i).length:1,a=r.slice(o);return a[0]!=="/"&&(a="/"+a),zf(a,"")}return zf(n,t)+s+r}function eR(t,e,n,s){let r=[],i=[],o=null;const a=({state:f})=>{const d=My(t,location),y=n.value,w=e.value;let b=0;if(f){if(n.value=d,e.value=f,o&&o===y){o=null;return}b=w?f.position-w.position:0}else s(d);r.forEach(x=>{x(n.value,y,{delta:b,type:gc.pop,direction:b?b>0?Tl.forward:Tl.back:Tl.unknown})})};function l(){o=n.value}function c(f){r.push(f);const d=()=>{const y=r.indexOf(f);y>-1&&r.splice(y,1)};return i.push(d),d}function u(){if(document.visibilityState==="hidden"){const{history:f}=window;if(!f.state)return;f.replaceState(ye({},f.state,{scroll:Ha()}),"")}}function h(){for(const f of i)f();i=[],window.removeEventListener("popstate",a),window.removeEventListener("pagehide",u),document.removeEventListener("visibilitychange",u)}return window.addEventListener("popstate",a),window.addEventListener("pagehide",u),document.addEventListener("visibilitychange",u),{pauseListeners:l,listen:c,destroy:h}}function Jf(t,e,n,s=!1,r=!1){return{back:t,current:e,forward:n,replaced:s,position:window.history.length,scroll:r?Ha():null}}function tR(t){const{history:e,location:n}=window,s={value:My(t,n)},r={value:e.state};r.value||i(s.value,{back:null,current:s.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function i(l,c,u){const h=t.indexOf("#"),f=h>-1?(n.host&&document.querySelector("base")?t:t.slice(h))+l:ZC()+t+l;try{e[u?"replaceState":"pushState"](c,"",f),r.value=c}catch(d){console.error(d),n[u?"replace":"assign"](f)}}function o(l,c){i(l,ye({},e.state,Jf(r.value.back,l,r.value.forward,!0),c,{position:r.value.position}),!0),s.value=l}function a(l,c){const u=ye({},r.value,e.state,{forward:l,scroll:Ha()});i(u.current,u,!0),i(l,ye({},Jf(s.value,l,null),{position:u.position+1},c),!1),s.value=l}return{location:s,state:r,push:a,replace:o}}function nR(t){t=VC(t);const e=tR(t),n=eR(t,e.state,e.location,e.replace);function s(i,o=!0){o||n.pauseListeners(),history.go(i)}const r=ye({location:"",base:t,go:s,createHref:$C.bind(null,t)},e,n);return Object.defineProperty(r,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(r,"state",{enumerable:!0,get:()=>e.state.value}),r}let us=function(t){return t[t.Static=0]="Static",t[t.Param=1]="Param",t[t.Group=2]="Group",t}({});var ze=function(t){return t[t.Static=0]="Static",t[t.Param=1]="Param",t[t.ParamRegExp=2]="ParamRegExp",t[t.ParamRegExpEnd=3]="ParamRegExpEnd",t[t.EscapeNext=4]="EscapeNext",t}(ze||{});const sR={type:us.Static,value:""},rR=/[a-zA-Z0-9_]/;function iR(t){if(!t)return[[]];if(t==="/")return[[sR]];if(!t.startsWith("/"))throw new Error(`Invalid path "${t}"`);function e(d){throw new Error(`ERR (${n})/"${c}": ${d}`)}let n=ze.Static,s=n;const r=[];let i;function o(){i&&r.push(i),i=[]}let a=0,l,c="",u="";function h(){c&&(n===ze.Static?i.push({type:us.Static,value:c}):n===ze.Param||n===ze.ParamRegExp||n===ze.ParamRegExpEnd?(i.length>1&&(l==="*"||l==="+")&&e(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`),i.push({type:us.Param,value:c,regexp:u,repeatable:l==="*"||l==="+",optional:l==="*"||l==="?"})):e("Invalid state to consume buffer"),c="")}function f(){c+=l}for(;a<t.length;){if(l=t[a++],l==="\\"&&n!==ze.ParamRegExp){s=n,n=ze.EscapeNext;continue}switch(n){case ze.Static:l==="/"?(c&&h(),o()):l===":"?(h(),n=ze.Param):f();break;case ze.EscapeNext:f(),n=s;break;case ze.Param:l==="("?n=ze.ParamRegExp:rR.test(l)?f():(h(),n=ze.Static,l!=="*"&&l!=="?"&&l!=="+"&&a--);break;case ze.ParamRegExp:l===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+l:n=ze.ParamRegExpEnd:u+=l;break;case ze.ParamRegExpEnd:h(),n=ze.Static,l!=="*"&&l!=="?"&&l!=="+"&&a--,u="";break;default:e("Unknown state");break}}return n===ze.ParamRegExp&&e(`Unfinished custom RegExp for param "${c}"`),h(),o(),r}const Zf="[^/]+?",oR={sensitive:!1,strict:!1,start:!0,end:!0};var vt=function(t){return t[t._multiplier=10]="_multiplier",t[t.Root=90]="Root",t[t.Segment=40]="Segment",t[t.SubSegment=30]="SubSegment",t[t.Static=40]="Static",t[t.Dynamic=20]="Dynamic",t[t.BonusCustomRegExp=10]="BonusCustomRegExp",t[t.BonusWildcard=-50]="BonusWildcard",t[t.BonusRepeatable=-20]="BonusRepeatable",t[t.BonusOptional=-8]="BonusOptional",t[t.BonusStrict=.7000000000000001]="BonusStrict",t[t.BonusCaseSensitive=.25]="BonusCaseSensitive",t}(vt||{});const aR=/[.+*?^${}()[\]/\\]/g;function lR(t,e){const n=ye({},oR,e),s=[];let r=n.start?"^":"";const i=[];for(const c of t){const u=c.length?[]:[vt.Root];n.strict&&!c.length&&(r+="/");for(let h=0;h<c.length;h++){const f=c[h];let d=vt.Segment+(n.sensitive?vt.BonusCaseSensitive:0);if(f.type===us.Static)h||(r+="/"),r+=f.value.replace(aR,"\\$&"),d+=vt.Static;else if(f.type===us.Param){const{value:y,repeatable:w,optional:b,regexp:x}=f;i.push({name:y,repeatable:w,optional:b});const R=x||Zf;if(R!==Zf){d+=vt.BonusCustomRegExp;try{`${R}`}catch(C){throw new Error(`Invalid custom RegExp for param "${y}" (${R}): `+C.message)}}let M=w?`((?:${R})(?:/(?:${R}))*)`:`(${R})`;h||(M=b&&c.length<2?`(?:/${M})`:"/"+M),b&&(M+="?"),r+=M,d+=vt.Dynamic,b&&(d+=vt.BonusOptional),w&&(d+=vt.BonusRepeatable),R===".*"&&(d+=vt.BonusWildcard)}u.push(d)}s.push(u)}if(n.strict&&n.end){const c=s.length-1;s[c][s[c].length-1]+=vt.BonusStrict}n.strict||(r+="/?"),n.end?r+="$":n.strict&&!r.endsWith("/")&&(r+="(?:/|$)");const o=new RegExp(r,n.sensitive?"":"i");function a(c){const u=c.match(o),h={};if(!u)return null;for(let f=1;f<u.length;f++){const d=u[f]||"",y=i[f-1];h[y.name]=d&&y.repeatable?d.split("/"):d}return h}function l(c){let u="",h=!1;for(const f of t){(!h||!u.endsWith("/"))&&(u+="/"),h=!1;for(const d of f)if(d.type===us.Static)u+=d.value;else if(d.type===us.Param){const{value:y,repeatable:w,optional:b}=d,x=y in c?c[y]:"";if(Wt(x)&&!w)throw new Error(`Provided param "${y}" is an array but it is not repeatable (* or + modifiers)`);const R=Wt(x)?x.join("/"):x;if(!R)if(b)f.length<2&&(u.endsWith("/")?u=u.slice(0,-1):h=!0);else throw new Error(`Missing required param "${y}"`);u+=R}}return u||"/"}return{re:o,score:s,keys:i,parse:a,stringify:l}}function cR(t,e){let n=0;for(;n<t.length&&n<e.length;){const s=e[n]-t[n];if(s)return s;n++}return t.length<e.length?t.length===1&&t[0]===vt.Static+vt.Segment?-1:1:t.length>e.length?e.length===1&&e[0]===vt.Static+vt.Segment?1:-1:0}function Ly(t,e){let n=0;const s=t.score,r=e.score;for(;n<s.length&&n<r.length;){const i=cR(s[n],r[n]);if(i)return i;n++}if(Math.abs(r.length-s.length)===1){if(ed(s))return 1;if(ed(r))return-1}return r.length-s.length}function ed(t){const e=t[t.length-1];return t.length>0&&e[e.length-1]<0}const uR={strict:!1,end:!0,sensitive:!1};function hR(t,e,n){const s=lR(iR(t.path),n),r=ye(s,{record:t,parent:e,children:[],alias:[]});return e&&!r.record.aliasOf==!e.record.aliasOf&&e.children.push(r),r}function fR(t,e){const n=[],s=new Map;e=qf(uR,e);function r(h){return s.get(h)}function i(h,f,d){const y=!d,w=nd(h);w.aliasOf=d&&d.record;const b=qf(e,h),x=[w];if("alias"in h){const C=typeof h.alias=="string"?[h.alias]:h.alias;for(const ne of C)x.push(nd(ye({},w,{components:d?d.record.components:w.components,path:ne,aliasOf:d?d.record:w})))}let R,M;for(const C of x){const{path:ne}=C;if(f&&ne[0]!=="/"){const he=f.record.path,ie=he[he.length-1]==="/"?"":"/";C.path=f.record.path+(ne&&ie+ne)}if(R=hR(C,f,b),d?d.alias.push(R):(M=M||R,M!==R&&M.alias.push(R),y&&h.name&&!sd(R)&&o(h.name)),Uy(R)&&l(R),w.children){const he=w.children;for(let ie=0;ie<he.length;ie++)i(he[ie],R,d&&d.children[ie])}d=d||R}return M?()=>{o(M)}:qr}function o(h){if(Ny(h)){const f=s.get(h);f&&(s.delete(h),n.splice(n.indexOf(f),1),f.children.forEach(o),f.alias.forEach(o))}else{const f=n.indexOf(h);f>-1&&(n.splice(f,1),h.record.name&&s.delete(h.record.name),h.children.forEach(o),h.alias.forEach(o))}}function a(){return n}function l(h){const f=mR(h,n);n.splice(f,0,h),h.record.name&&!sd(h)&&s.set(h.record.name,h)}function c(h,f){let d,y={},w,b;if("name"in h&&h.name){if(d=s.get(h.name),!d)throw ur(Le.MATCHER_NOT_FOUND,{location:h});b=d.record.name,y=ye(td(f.params,d.keys.filter(M=>!M.optional).concat(d.parent?d.parent.keys.filter(M=>M.optional):[]).map(M=>M.name)),h.params&&td(h.params,d.keys.map(M=>M.name))),w=d.stringify(y)}else if(h.path!=null)w=h.path,d=n.find(M=>M.re.test(w)),d&&(y=d.parse(w),b=d.record.name);else{if(d=f.name?s.get(f.name):n.find(M=>M.re.test(f.path)),!d)throw ur(Le.MATCHER_NOT_FOUND,{location:h,currentLocation:f});b=d.record.name,y=ye({},f.params,h.params),w=d.stringify(y)}const x=[];let R=d;for(;R;)x.unshift(R.record),R=R.parent;return{name:b,path:w,params:y,matched:x,meta:pR(x)}}t.forEach(h=>i(h));function u(){n.length=0,s.clear()}return{addRoute:i,resolve:c,removeRoute:o,clearRoutes:u,getRoutes:a,getRecordMatcher:r}}function td(t,e){const n={};for(const s of e)s in t&&(n[s]=t[s]);return n}function nd(t){const e={path:t.path,redirect:t.redirect,name:t.name,meta:t.meta||{},aliasOf:t.aliasOf,beforeEnter:t.beforeEnter,props:dR(t),children:t.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in t?t.components||null:t.component&&{default:t.component}};return Object.defineProperty(e,"mods",{value:{}}),e}function dR(t){const e={},n=t.props||!1;if("component"in t)e.default=n;else for(const s in t.components)e[s]=typeof n=="object"?n[s]:n;return e}function sd(t){for(;t;){if(t.record.aliasOf)return!0;t=t.parent}return!1}function pR(t){return t.reduce((e,n)=>ye(e,n.meta),{})}function mR(t,e){let n=0,s=e.length;for(;n!==s;){const i=n+s>>1;Ly(t,e[i])<0?s=i:n=i+1}const r=gR(t);return r&&(s=e.lastIndexOf(r,s-1)),s}function gR(t){let e=t;for(;e=e.parent;)if(Uy(e)&&Ly(t,e)===0)return e}function Uy({record:t}){return!!(t.name||t.components&&Object.keys(t.components).length||t.redirect)}function rd(t){const e=wn(Wu),n=wn(Py),s=$t(()=>{const l=Bs(t.to);return e.resolve(l)}),r=$t(()=>{const{matched:l}=s.value,{length:c}=l,u=l[c-1],h=n.matched;if(!u||!h.length)return-1;const f=h.findIndex(cr.bind(null,u));if(f>-1)return f;const d=id(l[c-2]);return c>1&&id(u)===d&&h[h.length-1].path!==d?h.findIndex(cr.bind(null,l[c-2])):f}),i=$t(()=>r.value>-1&&ER(n.params,s.value.params)),o=$t(()=>r.value>-1&&r.value===n.matched.length-1&&Dy(n.params,s.value.params));function a(l={}){if(_R(l)){const c=e[Bs(t.replace)?"replace":"push"](Bs(t.to)).catch(qr);return t.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>c),c}return Promise.resolve()}return{route:s,href:$t(()=>s.value.href),isActive:i,isExactActive:o,navigate:a}}function yR(t){return t.length===1?t[0]:t}const vR=Bd({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:rd,setup(t,{slots:e}){const n=wi(rd(t)),{options:s}=wn(Wu),r=$t(()=>({[od(t.activeClass,s.linkActiveClass,"router-link-active")]:n.isActive,[od(t.exactActiveClass,s.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const i=e.default&&yR(e.default(n));return t.custom?i:fp("a",{"aria-current":n.isExactActive?t.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:r.value},i)}}}),wR=vR;function _R(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)){if(t.currentTarget&&t.currentTarget.getAttribute){const e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function ER(t,e){for(const n in e){const s=e[n],r=t[n];if(typeof s=="string"){if(s!==r)return!1}else if(!Wt(r)||r.length!==s.length||s.some((i,o)=>i!==r[o]))return!1}return!0}function id(t){return t?t.aliasOf?t.aliasOf.path:t.path:""}const od=(t,e,n)=>t??e??n,IR=Bd({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(t,{attrs:e,slots:n}){const s=wn(vc),r=$t(()=>t.route||s.value),i=wn(Xf,0),o=$t(()=>{let c=Bs(i);const{matched:u}=r.value;let h;for(;(h=u[c])&&!h.components;)c++;return c}),a=$t(()=>r.value.matched[o.value]);ro(Xf,$t(()=>o.value+1)),ro(XC,a),ro(vc,r);const l=yv();return io(()=>[l.value,a.value,t.name],([c,u,h],[f,d,y])=>{u&&(u.instances[h]=c,d&&d!==u&&c&&c===f&&(u.leaveGuards.size||(u.leaveGuards=d.leaveGuards),u.updateGuards.size||(u.updateGuards=d.updateGuards))),c&&u&&(!d||!cr(u,d)||!f)&&(u.enterCallbacks[h]||[]).forEach(w=>w(c))},{flush:"post"}),()=>{const c=r.value,u=t.name,h=a.value,f=h&&h.components[u];if(!f)return ad(n.default,{Component:f,route:c});const d=h.props[u],y=d?d===!0?c.params:typeof d=="function"?d(c):d:null,b=fp(f,ye({},y,e,{onVnodeUnmounted:x=>{x.component.isUnmounted&&(h.instances[u]=null)},ref:l}));return ad(n.default,{Component:b,route:c})||b}}});function ad(t,e){if(!t)return null;const n=t(e);return n.length===1?n[0]:n}const TR=IR;function bR(t){const e=fR(t.routes,t),n=t.parseQuery||QC,s=t.stringifyQuery||Yf,r=t.history,i=Sr(),o=Sr(),a=Sr(),l=vv(Dn);let c=Dn;Ps&&t.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=El.bind(null,v=>""+v),h=El.bind(null,NC),f=El.bind(null,yi);function d(v,F){let P,$;return Ny(v)?(P=e.getRecordMatcher(v),$=F):$=v,e.addRoute($,P)}function y(v){const F=e.getRecordMatcher(v);F&&e.removeRoute(F)}function w(){return e.getRoutes().map(v=>v.record)}function b(v){return!!e.getRecordMatcher(v)}function x(v,F){if(F=ye({},F||l.value),typeof v=="string"){const g=Il(n,v,F.path),E=e.resolve({path:g.path},F),I=r.createHref(g.fullPath);return ye(g,E,{params:f(E.params),hash:yi(g.hash),redirectedFrom:void 0,href:I})}let P;if(v.path!=null)P=ye({},v,{path:Il(n,v.path,F.path).path});else{const g=ye({},v.params);for(const E in g)g[E]==null&&delete g[E];P=ye({},v,{params:h(g)}),F.params=h(F.params)}const $=e.resolve(P,F),le=v.hash||"";$.params=u(f($.params));const p=MC(s,ye({},v,{hash:kC(le),path:$.path})),m=r.createHref(p);return ye({fullPath:p,hash:le,query:s===Yf?YC(v.query):v.query||{}},$,{redirectedFrom:void 0,href:m})}function R(v){return typeof v=="string"?Il(n,v,l.value.path):ye({},v)}function M(v,F){if(c!==v)return ur(Le.NAVIGATION_CANCELLED,{from:F,to:v})}function C(v){return ie(v)}function ne(v){return C(ye(R(v),{replace:!0}))}function he(v,F){const P=v.matched[v.matched.length-1];if(P&&P.redirect){const{redirect:$}=P;let le=typeof $=="function"?$(v,F):$;return typeof le=="string"&&(le=le.includes("?")||le.includes("#")?le=R(le):{path:le},le.params={}),ye({query:v.query,hash:v.hash,params:le.path!=null?{}:v.params},le)}}function ie(v,F){const P=c=x(v),$=l.value,le=v.state,p=v.force,m=v.replace===!0,g=he(P,$);if(g)return ie(ye(R(g),{state:typeof g=="object"?ye({},le,g.state):le,force:p,replace:m}),F||P);const E=P;E.redirectedFrom=F;let I;return!p&&LC(s,$,P)&&(I=ur(Le.NAVIGATION_DUPLICATED,{to:E,from:$}),je($,$,!0,!1)),(I?Promise.resolve(I):oe(E,$)).catch(_=>fn(_)?fn(_,Le.NAVIGATION_GUARD_REDIRECT)?_:Oe(_):se(_,E,$)).then(_=>{if(_){if(fn(_,Le.NAVIGATION_GUARD_REDIRECT))return ie(ye({replace:m},R(_.to),{state:typeof _.to=="object"?ye({},le,_.to.state):le,force:p}),F||E)}else _=Ie(E,$,!0,m,le);return Ae(E,$,_),_})}function B(v,F){const P=M(v,F);return P?Promise.reject(P):Promise.resolve()}function W(v){const F=xt.values().next().value;return F&&typeof F.runWithContext=="function"?F.runWithContext(v):v()}function oe(v,F){let P;const[$,le,p]=JC(v,F);P=bl($.reverse(),"beforeRouteLeave",v,F);for(const g of $)g.leaveGuards.forEach(E=>{P.push(Pn(E,v,F))});const m=B.bind(null,v,F);return P.push(m),$e(P).then(()=>{P=[];for(const g of i.list())P.push(Pn(g,v,F));return P.push(m),$e(P)}).then(()=>{P=bl(le,"beforeRouteUpdate",v,F);for(const g of le)g.updateGuards.forEach(E=>{P.push(Pn(E,v,F))});return P.push(m),$e(P)}).then(()=>{P=[];for(const g of p)if(g.beforeEnter)if(Wt(g.beforeEnter))for(const E of g.beforeEnter)P.push(Pn(E,v,F));else P.push(Pn(g.beforeEnter,v,F));return P.push(m),$e(P)}).then(()=>(v.matched.forEach(g=>g.enterCallbacks={}),P=bl(p,"beforeRouteEnter",v,F,W),P.push(m),$e(P))).then(()=>{P=[];for(const g of o.list())P.push(Pn(g,v,F));return P.push(m),$e(P)}).catch(g=>fn(g,Le.NAVIGATION_CANCELLED)?g:Promise.reject(g))}function Ae(v,F,P){a.list().forEach($=>W(()=>$(v,F,P)))}function Ie(v,F,P,$,le){const p=M(v,F);if(p)return p;const m=F===Dn,g=Ps?history.state:{};P&&($||m?r.replace(v.fullPath,ye({scroll:m&&g&&g.scroll},le)):r.push(v.fullPath,le)),l.value=v,je(v,F,P,m),Oe()}let pe;function Te(){pe||(pe=r.listen((v,F,P)=>{if(!Qe.listening)return;const $=x(v),le=he($,Qe.currentRoute.value);if(le){ie(ye(le,{replace:!0,force:!0}),$).catch(qr);return}c=$;const p=l.value;Ps&&KC(Qf(p.fullPath,P.delta),Ha()),oe($,p).catch(m=>fn(m,Le.NAVIGATION_ABORTED|Le.NAVIGATION_CANCELLED)?m:fn(m,Le.NAVIGATION_GUARD_REDIRECT)?(ie(ye(R(m.to),{force:!0}),$).then(g=>{fn(g,Le.NAVIGATION_ABORTED|Le.NAVIGATION_DUPLICATED)&&!P.delta&&P.type===gc.pop&&r.go(-1,!1)}).catch(qr),Promise.reject()):(P.delta&&r.go(-P.delta,!1),se(m,$,p))).then(m=>{m=m||Ie($,p,!1),m&&(P.delta&&!fn(m,Le.NAVIGATION_CANCELLED)?r.go(-P.delta,!1):P.type===gc.pop&&fn(m,Le.NAVIGATION_ABORTED|Le.NAVIGATION_DUPLICATED)&&r.go(-1,!1)),Ae($,p,m)}).catch(qr)}))}let Be=Sr(),fe=Sr(),Z;function se(v,F,P){Oe(v);const $=fe.list();return $.length?$.forEach(le=>le(v,F,P)):console.error(v),Promise.reject(v)}function me(){return Z&&l.value!==Dn?Promise.resolve():new Promise((v,F)=>{Be.add([v,F])})}function Oe(v){return Z||(Z=!v,Te(),Be.list().forEach(([F,P])=>v?P(v):F()),Be.reset()),v}function je(v,F,P,$){const{scrollBehavior:le}=t;if(!Ps||!le)return Promise.resolve();const p=!P&&WC(Qf(v.fullPath,0))||($||!P)&&history.state&&history.state.scroll||null;return Md().then(()=>le(v,F,p)).then(m=>m&&HC(m)).catch(m=>se(m,v,F))}const Ce=v=>r.go(v);let It;const xt=new Set,Qe={currentRoute:l,listening:!0,addRoute:d,removeRoute:y,clearRoutes:e.clearRoutes,hasRoute:b,getRoutes:w,resolve:x,options:t,push:C,replace:ne,go:Ce,back:()=>Ce(-1),forward:()=>Ce(1),beforeEach:i.add,beforeResolve:o.add,afterEach:a.add,onError:fe.add,isReady:me,install(v){v.component("RouterLink",wR),v.component("RouterView",TR),v.config.globalProperties.$router=Qe,Object.defineProperty(v.config.globalProperties,"$route",{enumerable:!0,get:()=>Bs(l)}),Ps&&!It&&l.value===Dn&&(It=!0,C(r.location).catch($=>{}));const F={};for(const $ in Dn)Object.defineProperty(F,$,{get:()=>l.value[$],enumerable:!0});v.provide(Wu,Qe),v.provide(Py,Dd(F)),v.provide(vc,l);const P=v.unmount;xt.add(v),v.unmount=function(){xt.delete(v),xt.size<1&&(c=Dn,pe&&pe(),pe=null,l.value=Dn,It=!1,Z=!1),P()}}};function $e(v){return v.reduce((F,P)=>F.then(()=>W(P)),Promise.resolve())}return Qe}const SR={data(){return{player:{x:920,y:725},items:[],score:0,baseItemSpeed:2,basePlayerSpeed:6,paused:!1,gameOver:!1,showWelcome:!0,guestMode:!1,gameLoop:null,spawnLoop:null,idCounter:0,keys:{},localMedals:0,touchActive:!1,lastTouchX:0,lastTouchY:0,touchId:null,initialMedalsBase:0,store:re,autopilotEnabled:!1,autopilotConfig:{safetyMinPx:1,fixedSpriteSizes:!1,fixedPlayerW:300,fixedItemW:300,predictionTime:5,predictionStep:.1,targetLockTime:800,ignoreBottomPct:.08,hazardClearance:60},autopilotTargetId:null,autopilotTargetLockedAt:0,playerVel:{x:0,y:0},autopilotRuntime:{maxSpeed:14,minSpeed:6,accelLerp:.18,turnLerp:.12,jitterDeadzone:.3},audio:{start:null,collect:null,medal:null,gameover:null},patrolXSmoothed:window.innerWidth*.5,autorestartTimer:null}},showGameOverOverlay:!1,computed:{playerImg(){return new URL("/assets/batpill-Ci4MPlm-.png",import.meta.url).href},gameOverName(){try{if(this.store&&this.store.user){const e=this.store.user.username||this.store.user.displayName||(this.store.user.email?this.store.user.email.split("@")[0]:null);if(e)return e}const t=Et.currentUser;if(t)return t.displayName||(t.email?t.email.split("@")[0]:"Player")}catch{}return"Player"}},methods:{getImg(t){if(t==="b-point")return new URL("/assets/b-point-GO7tDDgm.png",import.meta.url).href;if(t==="rock")return new URL("/assets/rock-DiNvUDZC.gif",import.meta.url).href;if(t==="rocket")return new URL("/assets/rocket-CjVDSsKP.gif",import.meta.url).href},startGame(){if(this.baseItemSpeed=2,this.basePlayerSpeed=6,this.gameLoop=setInterval(this.update,20),this.spawnLoop=setInterval(this.spawnItem,500),this.audio.start)try{this.audio.start.currentTime=0,this.audio.start.play()}catch{}},handleTouchStart(t){if(this.gameOver||this.showWelcome||this.paused||!t.touches||t.touches.length===0)return;const e=t.touches[0];this.touchActive=!0,this.touchId=e.identifier,this.lastTouchX=e.clientX,this.lastTouchY=e.clientY},handleTouchMove(t){if(this.gameOver||this.showWelcome||this.paused||!this.touchActive)return;let e=null;for(let a=0;a<t.touches.length;a++)if(this.touchId==null||t.touches[a].identifier===this.touchId){e=t.touches[a];break}if(!e)return;const n=e.clientX-this.lastTouchX,s=e.clientY-this.lastTouchY,r=Math.min(1,window.innerWidth<640?.6:1);this.player.x+=n*r,this.player.y+=s*r;const i=parseInt(getComputedStyle(document.documentElement).getPropertyValue("--player-width"))||64,o=40;this.player.x=Math.max(0,Math.min(window.innerWidth-i,this.player.x)),this.player.y=Math.max(0,Math.min(window.innerHeight-i-o,this.player.y)),this.lastTouchX=e.clientX,this.lastTouchY=e.clientY;try{t.preventDefault()}catch{}},handleTouchEnd(t){this.touchActive=!1,this.touchId=null},startAsPlayer(){this.guestMode=!1,this.showWelcome=!1,this.gameOver=!1,this.paused=!1,this.player={x:Math.max(20,Math.floor(window.innerWidth/2)-40),y:Math.max(60,Math.floor(window.innerHeight/2)-40)},this.items=[],this.score=0,re.setScore(0),this.startGame()},startAsGuest(){this.guestMode=!0,this.showWelcome=!1,this.gameOver=!1,this.paused=!1,this.player={x:Math.max(20,Math.floor(window.innerWidth/2)-40),y:Math.max(60,Math.floor(window.innerHeight/2)-40)},this.items=[],this.score=0,re.setScore(0),this.startGame()},spawnItem(){if(this.paused||this.gameOver)return;const t=Math.random();let e="b-point";t<.3?e="b-point":t<.75?e="rock":e="rocket";const n=60,s=Math.floor(this.score/8),r=this.baseItemSpeed+s*.9+Math.random()*1.8;this.items.push({id:this.idCounter++,type:e,x:Math.random()*(window.innerWidth-n),y:-n,speed:r})},spawnSol(){const e=Math.floor(this.score/8),n=this.baseItemSpeed+e*.9+Math.random()*1.2;this.items.push({id:this.idCounter++,type:"b-point",x:Math.random()*(window.innerWidth-60),y:-60,speed:n})},update(){if(this.paused||this.gameOver)return;const t=Math.floor(this.score/6),e=this.basePlayerSpeed+t*1;if(this.autopilotEnabled){const d=this.autopilotConfig.fixedSpriteSizes?this.autopilotConfig.fixedItemW:parseInt(getComputedStyle(document.documentElement).getPropertyValue("--item-width"))||60,y=this.autopilotConfig.fixedSpriteSizes?this.autopilotConfig.fixedPlayerW:parseInt(getComputedStyle(document.documentElement).getPropertyValue("--player-width"))||80,w=Math.max(8,Math.floor(window.innerHeight*.08)),b=window.innerHeight-120,x=100,R=window.innerHeight*(1-(this.autopilotConfig.ignoreBottomPct||.08)),M=this.items.filter(B=>B.type==="b-point"&&B.y<=R);let C=null;const ne=B=>{if(B.y<w||B.y>R)return null;const W=this.items.filter(Ce=>Ce.type!=="b-point"),oe=Math.max(6,this.autopilotRuntime.maxSpeed||14),Ae=Math.max(.01,B.speed||0),Ie=(window.innerHeight-B.y)/Ae,pe=B.x-this.player.x,Te=B.y-this.player.y,fe=Math.hypot(pe,Te)/oe;if(fe>Ie+.25)return null;const Z=Math.min(fe,Ie),se=B.x,me=B.y+Ae*Z;if(me>R)return null;let Oe=1/0;for(const Ce of W){const It=Ce.x,xt=Ce.y+(Ce.speed||0)*Z,Qe=Math.hypot(It-se,xt-me);Qe<Oe&&(Oe=Qe);const $e=this.autopilotConfig.hazardClearance||60;if(Qe<$e)return null}return{score:1/(.01+Z),time:Z,minHazardDist:Oe}};for(const B of M){const W=ne(B);W&&(!C||W.score>C.score)&&(C={item:B,score:W.score})}if(!C){let B=null;for(const W of this.items.filter(oe=>oe.type==="b-point")){if(W.y>R)continue;const oe=W.x-this.player.x,Ae=W.y-this.player.y,Ie=Math.hypot(oe,Ae);(!B||Ie<B.dist)&&(B={item:W,dist:Ie})}if(B)C={item:B.item,score:.001};else{let W=null;for(const oe of this.items.filter(Ae=>Ae.type==="b-point")){const Ae=oe.x-this.player.x,Ie=oe.y-this.player.y,pe=Math.hypot(Ae,Ie);(!W||pe<W.dist)&&(W={item:oe,dist:pe})}W&&(C={item:W.item,score:5e-4})}}if(this.autopilotTargetId&&C){const B=this.items.find(W=>W.id===this.autopilotTargetId);if(B){const W=ne(B);W&&C.score<=W.score*1.03&&(C={item:B,score:W.score})}}if(this.autopilotTargetId){const B=this.items.find(oe=>oe.id===this.autopilotTargetId),W=Date.now();B&&W-this.autopilotTargetLockedAt<this.autopilotConfig.targetLockTime?C={item:B,dist:Math.hypot(B.x-this.player.x,B.y-this.player.y)}:(this.autopilotTargetId=null,this.autopilotTargetLockedAt=0)}const he={x:0,y:0},ie=this.items.filter(B=>B.type!=="b-point");for(const B of ie){const W=B.x+d/2,oe=B.y+d/2,Ae=this.player.x+y/2,Ie=this.player.y+y/2,pe=Ae-W,Te=Ie-oe,Be=Math.hypot(pe,Te)||.001,fe=x+160;if(Be<fe){const Z=Math.max(0,(fe-Be)/fe),se=Math.pow(Z,1.6)*3.5;he.x+=pe/Be*se,he.y+=Te/Be*se}}if(C){this.autopilotTargetId=C.item.id,this.autopilotTargetLockedAt=Date.now();const B=Math.max(0,Math.min(window.innerWidth-y,C.item.x)),W=Math.max(w,C.item.y),oe={x:B-this.player.x,y:W-this.player.y},Ae=Math.hypot(oe.x,oe.y)||.001,Ie=3,pe=1.5,Te={x:oe.x/Ae*Ie+he.x*pe,y:oe.y/Ae*Ie+he.y*pe};let Be=Math.hypot(Te.x,Te.y)||.001;if(Be<.08){let me=null;for(const Oe of ie){const je=Oe.x+d/2,Ce=Oe.y+d/2,It=this.player.x+y/2,xt=this.player.y+y/2,Qe=It-je,$e=xt-Ce,v=Math.hypot(Qe,$e)||.001;(!me||v<me.d)&&(me={dx:Qe,dy:$e,d:v})}me&&(Te.x=me.dx/me.d*2.2,Te.y=me.dy/me.d*2.2,Be=Math.hypot(Te.x,Te.y))}const fe=Math.max(this.autopilotRuntime.minSpeed,Math.min(this.autopilotRuntime.maxSpeed,e*1.6*Math.max(.7,Math.min(1.2,Ae/180)))),Z={x:Te.x/Be*fe,y:Te.y/Be*fe};this.playerVel.x=this.playerVel.x*(1-this.autopilotRuntime.turnLerp)+Z.x*this.autopilotRuntime.turnLerp,this.playerVel.y=this.playerVel.y*(1-this.autopilotRuntime.turnLerp)+Z.y*this.autopilotRuntime.turnLerp,this.playerVel.x=this.playerVel.x*(1-this.autopilotRuntime.accelLerp)+Z.x*this.autopilotRuntime.accelLerp,this.playerVel.y=this.playerVel.y*(1-this.autopilotRuntime.accelLerp)+Z.y*this.autopilotRuntime.accelLerp,Math.abs(this.playerVel.x)<this.autopilotRuntime.jitterDeadzone&&(this.playerVel.x=0),Math.abs(this.playerVel.y)<this.autopilotRuntime.jitterDeadzone&&(this.playerVel.y=0);let se=!1;for(const me of ie){const Oe=me.x,je=me.y+(me.speed||0),Ce=Oe+d/2-(this.player.x+y/2),It=je+d/2-(this.player.y+y/2);if(Math.hypot(Ce,It)<36){se=!0;break}}if(se){const me=-this.playerVel.y||0,Oe=this.playerVel.x||0,je=Math.hypot(me,Oe)||1;this.player.x+=me/je*14,this.player.y+=Oe/je*10,this.playerVel.x*=.22,this.playerVel.y*=.22}this.player.x+=this.playerVel.x,this.player.y+=this.playerVel.y,this.player.x=Math.max(0,Math.min(window.innerWidth-y,this.player.x)),this.player.y=Math.max(w,Math.min(b,this.player.y))}else{let B={x:0,y:0},W=null;for(const Oe of ie){const je=Oe.x+d/2,Ce=Oe.y+d/2,It=this.player.x+y/2,xt=this.player.y+y/2,Qe=It-je,$e=xt-Ce,v=Math.hypot(Qe,$e)||.001,F=x+80;if((!W||v<W.d)&&(W={dx:Qe,dy:$e,d:v}),v<F){const P=(F-v)/F*2;B.x+=Qe/v*P,B.y+=$e/v*P}}const oe=Date.now()/2e3,Ae=window.innerWidth*(.5+.3*Math.sin(oe)),Ie=w+(b-w)*(.5+.2*Math.sin(oe*2));this.patrolXSmoothed=(this.patrolXSmoothed||window.innerWidth*.5)*.96+Ae*.04;const pe=this.patrolXSmoothed-this.player.x,Te=Ie-this.player.y,Be=Math.hypot(pe,Te)||.001,fe={x:B.x*2.2+pe/Be*.9,y:B.y*2.2+Te/Be*.9},Z=Math.hypot(fe.x,fe.y)||.001,se=Math.max(this.autopilotRuntime.minSpeed,Math.min(this.autopilotRuntime.maxSpeed,e*1.1)),me={x:fe.x/Z*se,y:fe.y/Z*se};this.playerVel.x=this.playerVel.x*(1-this.autopilotRuntime.turnLerp)+me.x*this.autopilotRuntime.turnLerp,this.playerVel.y=this.playerVel.y*(1-this.autopilotRuntime.turnLerp)+me.y*this.autopilotRuntime.turnLerp,Math.abs(this.playerVel.x)<this.autopilotRuntime.jitterDeadzone&&(this.playerVel.x=0),Math.abs(this.playerVel.y)<this.autopilotRuntime.jitterDeadzone&&(this.playerVel.y=0),this.player.x+=this.playerVel.x,this.player.y+=this.playerVel.y,this.player.x=Math.max(0,Math.min(window.innerWidth-y,this.player.x)),this.player.y=Math.max(w,Math.min(b,this.player.y))}}else(this.keys.ArrowLeft||this.keys.a)&&(this.player.x-=e),(this.keys.ArrowRight||this.keys.d)&&(this.player.x+=e),(this.keys.ArrowUp||this.keys.w)&&(this.player.y-=e),(this.keys.ArrowDown||this.keys.s)&&(this.player.y+=e);const n=80,s=80,r=40;this.player.x=Math.max(0,Math.min(window.innerWidth-n,this.player.x)),this.player.y=Math.max(0,Math.min(window.innerHeight-s-r,this.player.y)),this.items.forEach(d=>{d.y+=d.speed}),this.items=this.items.filter(d=>d.y<window.innerHeight+30);const i=this.items.filter(d=>d.type==="b-point"&&d.y>=-120),o=2;if(i.length<o)for(let d=0;d<o-i.length;d++)this.spawnSol();const a=8,l=8,c=this.player.x+a,u=this.player.y+l,h=this.player.x+n-a,f=this.player.y+s-l;for(let d=this.items.length-1;d>=0;d--){const y=this.items[d],w=parseInt(getComputedStyle(document.documentElement).getPropertyValue("--item-width"))||60,b=w,x=y.x,R=y.y,M=y.x+w,C=y.y+b,ne=Math.min(14,Math.floor(w*.25)),he=Math.min(14,Math.floor(b*.25)),ie=x+ne,B=R+he,W=M-ne,oe=C-he;if(!(h<ie||c>W||f<B||u>oe))if(y.type==="b-point"){if(this.score,this.score+=1,re.setScore(this.score),this.audio.collect)try{this.audio.collect.currentTime=0,this.audio.collect.play()}catch{}const Ie=Math.floor(this.score/20),pe=this.initialMedalsBase+Ie;if(pe>this.localMedals){const Te=pe-this.localMedals;if(this.localMedals=pe,this.saveMedals(pe),re.user&&(re.user=Object.assign({},re.user,{medals:pe})),re.showToast(`Congratulations — you earned ${Te} new medal${Te>1?"s":""}! Total medals ${pe}.`,Te),this.audio.medal)try{this.audio.medal.currentTime=0,this.audio.medal.play()}catch{}}this.items.splice(d,1)}else{this.gameOver=!0;try{clearInterval(this.gameLoop),this.gameLoop=null}catch{}try{clearInterval(this.spawnLoop),this.spawnLoop=null}catch{}if(this.audio.gameover)try{this.audio.gameover.currentTime=0,this.audio.gameover.play()}catch{}this.saveScore(),this.autopilotEnabled&&(this.autorestartTimer&&clearTimeout(this.autorestartTimer),this.autorestartTimer=setTimeout(()=>{this.autorestartTimer=null,this.gameOver=!1,this.restart()},3e3))}}},async saveScore(){var e;const t=Et.currentUser;if(!this.guestMode&&t){const n=Wn(qn,"users",t.uid),i=(((e=(await mi(n)).data())==null?void 0:e.totalScore)||0)+this.score;await Qo(n,{totalScore:i,medals:Math.floor(i/20)}),re.user=Object.assign({},re.user,{totalScore:i,medals:Math.floor(i/20)})}},async saveMedals(t){const e=Et.currentUser;if(!e)return;const n=Wn(qn,"users",e.uid);try{await Qo(n,{medals:t}),re.user=Object.assign({},re.user,{medals:t})}catch{await gi(n,{username:e.displayName||e.email,totalScore:this.score,medals:t}),re.user=Object.assign({},re.user,{medals:t,totalScore:this.score})}},restart(){clearInterval(this.gameLoop),clearInterval(this.spawnLoop),this.autorestartTimer&&(clearTimeout(this.autorestartTimer),this.autorestartTimer=null),this.player={x:Math.max(20,Math.floor(window.innerWidth/2)-40),y:Math.max(60,Math.floor(window.innerHeight/2)-40)},this.items=[],this.score=0,this.baseItemSpeed=2,this.basePlayerSpeed=6,re.setScore(0),this.gameOver=!1,this.paused=!1,!this.showWelcome&&this.startGame()},handleKeyDown(t){if(!(this.autopilotEnabled&&t.key.toLowerCase()!=="l"&&t.key!==" ")){if(this.keys[t.key]=!0,t.key===" "){if(this.showWelcome){this.store&&this.store.user?this.startAsPlayer():this.startAsGuest();return}if(this.gameOver){this.restart();return}this.paused=!this.paused}else if(t.key.toLowerCase()==="l"){if(this.showWelcome){this.autopilotEnabled=!0,this.store&&this.store.user?this.startAsPlayer():this.startAsGuest();return}this.autopilotEnabled=!this.autopilotEnabled}}},handleKeyUp(t){this.keys[t.key]=!1},goHome(){clearInterval(this.gameLoop),clearInterval(this.spawnLoop),this.autorestartTimer&&(clearTimeout(this.autorestartTimer),this.autorestartTimer=null),this.gameLoop=null,this.spawnLoop=null,this.autopilotEnabled=!1,this.gameOver=!1,this.paused=!1,this.showWelcome=!0,re.setScore(0),this.$router.push("/")},shareOnX(){const t=this.store.user&&this.store.user.username?this.store.user.username:"mbuser",e=this.store.user&&typeof this.store.user.medals=="number"?this.store.user.medals:this.localMedals,n=`I'm ${t} and I collected ${this.score} scores and ${e} medals in #batpill`;So(()=>import("./share-CZf0hCKX.js"),[]).then(async s=>{try{const r=await s.generateShareImage({username:t,score:this.score,medals:e});await s.shareImageAndText({text:n,blob:r})}catch{const i=`https://x.com/intent/tweet?text=${encodeURIComponent(n)}`;window.open(i,"_blank")}})}},mounted(){window.addEventListener("keydown",this.handleKeyDown),window.addEventListener("keyup",this.handleKeyUp),window.addEventListener("touchstart",this.handleTouchStart,{passive:!1}),window.addEventListener("touchmove",this.handleTouchMove,{passive:!1}),window.addEventListener("touchend",this.handleTouchEnd);try{this.audio.start=new Audio(new URL("/assets/start-wav-Cw-JSbq5.wav",import.meta.url).href),this.audio.collect=new Audio(new URL("/assets/earn-wav-CRKdZc3k.wav",import.meta.url).href),this.audio.medal=new Audio(new URL("/assets/medal-wav-DMKI6lC-.wav",import.meta.url).href),this.audio.gameover=new Audio(new URL("/assets/gameover-wav-bRSROlHz.wav",import.meta.url).href),this.audio.start.preload="auto",this.audio.collect.preload="auto",this.audio.medal.preload="auto",this.audio.gameover.preload="auto"}catch{}const t=()=>{try{this.audio.start&&this.audio.start.play().then(()=>this.audio.start.pause()).catch(()=>{}),this.audio.collect&&this.audio.collect.play().then(()=>this.audio.collect.pause()).catch(()=>{}),this.audio.medal&&this.audio.medal.play().then(()=>this.audio.medal.pause()).catch(()=>{}),this.audio.gameover&&this.audio.gameover.play().then(()=>this.audio.gameover.pause()).catch(()=>{})}catch{}window.removeEventListener("pointerdown",t)};window.addEventListener("pointerdown",t);const e=Et.currentUser;if(e){const n=Wn(qn,"users",e.uid);mi(n).then(async s=>{const r=s.exists()?s.data():null;if(r){const i=r.medals||Math.floor((r.totalScore||0)/20);this.initialMedalsBase=i,this.localMedals=i,re.user=Object.assign({},re.user,{username:r.username,totalScore:r.totalScore||0,medals:this.localMedals,email:r.email||e.email})}else{try{await gi(n,{username:e.email,email:e.email,totalScore:0,medals:0})}catch{}re.user=Object.assign({},re.user,{username:e.email,totalScore:0,medals:0}),this.initialMedalsBase=0,this.localMedals=0}}).catch(()=>{})}re.setScore(this.score)},beforeUnmount(){window.removeEventListener("keydown",this.handleKeyDown),window.removeEventListener("keyup",this.handleKeyUp),window.removeEventListener("touchstart",this.handleTouchStart),window.removeEventListener("touchmove",this.handleTouchMove),window.removeEventListener("touchend",this.handleTouchEnd),clearInterval(this.gameLoop),clearInterval(this.spawnLoop)}},AR={class:"relative h-screen w-full overflow-hidden"},CR={key:0,class:"absolute inset-0 z-20 flex items-center justify-center"},RR={class:"welcome-box p-6 rounded-lg shadow-lg"},kR={class:"flex items-center justify-center space-x-4 mt-6"},xR=["src"],DR=["src"],NR={key:1,class:"absolute inset-0 flex items-center justify-center z-30"},OR={key:2,class:"absolute inset-0 flex items-center justify-center"},PR={class:"welcome-box text-center p-8"},MR={class:"text-4xl font-bold mb-4"},LR={class:"text-2xl mt-4 mb-6"},UR={class:"flex items-center justify-center space-x-6"};function FR(t,e,n,s,r,i){const o=Xs("router-link");return Pe(),Ue("div",AR,[r.showWelcome?(Pe(),Ue("div",CR,[k("div",RR,[e[7]||(e[7]=k("h2",{class:"text-4xl font-bold mb-4 text-white"},"Welcome to batpill",-1)),e[8]||(e[8]=k("p",{class:"mb-4 text-white"},"Welcome to batpill. Collect the b-points to gain scores. Avoid rocks and rockets. Use arrow keys or WASD to move. Press Space to pause.",-1)),e[9]||(e[9]=k("p",{class:"mb-6 text-sm text-gray-300"},"Play as a guest to avoid saving scores, or log in to save your progress.",-1)),k("div",kR,[r.store.user?(Pe(),Ue(Ct,{key:0},[k("button",{onClick:e[0]||(e[0]=(...a)=>i.startAsPlayer&&i.startAsPlayer(...a)),class:"px-6 py-2 btn-ghost"},"Play"),Se(o,{to:"/profile",class:"px-6 py-2 btn-ghost"},{default:At(()=>[...e[5]||(e[5]=[nn("Profile",-1)])]),_:1})],64)):(Pe(),Ue(Ct,{key:1},[k("button",{onClick:e[1]||(e[1]=(...a)=>i.startAsGuest&&i.startAsGuest(...a)),class:"px-6 py-2 btn-ghost"},"Play as Guest"),Se(o,{to:"/login",class:"px-6 py-2 btn-ghost"},{default:At(()=>[...e[6]||(e[6]=[nn("Login",-1)])]),_:1})],64))])])])):_n("",!0),k("img",{src:i.playerImg,class:"absolute player-sprite",style:zr({left:`${r.player.x}px`,top:`${r.player.y}px`})},null,12,xR),(Pe(!0),Ue(Ct,null,qv(r.items,a=>(Pe(),Ue("img",{key:a.id,src:i.getImg(a.type),class:"absolute item-sprite",style:zr({left:`${a.x}px`,top:`${a.y}px`})},null,12,DR))),128)),r.paused?(Pe(),Ue("div",NR,[...e[10]||(e[10]=[k("div",{class:"paused-card text-center"},[k("div",{class:"paused-title"},"PAUSED"),k("div",{class:"paused-sub"},"Press SPACE to continue")],-1)])])):_n("",!0),r.gameOver?(Pe(),Ue("div",OR,[k("div",PR,[k("div",MR," Game Over"+Ft(r.store.user?", "+i.gameOverName:"!"),1),k("div",LR,"Score: "+Ft(r.score),1),k("div",UR,[k("button",{onClick:e[2]||(e[2]=(...a)=>i.restart&&i.restart(...a)),class:"btn-ghost px-8 py-3"},"Restart"),k("button",{onClick:e[3]||(e[3]=(...a)=>i.goHome&&i.goHome(...a)),class:"btn-ghost px-8 py-3"},"Home"),k("button",{onClick:e[4]||(e[4]=(...a)=>i.shareOnX&&i.shareOnX(...a)),class:"btn-ghost px-6 py-3"},"Share on X")])])])):_n("",!0)])}const VR=Hi(SR,[["render",FR],["__scopeId","data-v-653b5ab4"]]);function Fy(t){const e=t&&t.code?t.code:null,n={"auth/email-already-in-use":"That email is already registered. Try logging in or use a different email.","auth/invalid-email":"Please enter a valid email address.","auth/wrong-password":"Login details you entered aren't correct!","auth/user-not-found":"Login details you entered aren't correct!","auth/weak-password":"Password is too weak. Try at least 6 characters.","auth/too-many-requests":"Too many attempts. Try again later.","auth/invalid-password":"Login details you entered aren't correct!",default:null};if(n[e])return n[e];if(t&&t.message){let s=t.message.replace(/^Firebase:\s*/i,"");if(s=s.replace(/\(auth\/[^)]+\)/i,""),s=s.replace(/\s*:\s*/g,": "),s=s.trim(),s&&s.length>0)return s}return"An unexpected error occurred. Please try again."}const BR={data(){return{email:"",password:"",error:null}},methods:{async login(){this.error=null;try{await OE(Et,this.email,this.password);const t=Et.currentUser;try{const e=Wn(qn,"users",t.uid),n=await mi(e),s=n.exists()?n.data():null;s?re.user={uid:t.uid,email:t.email,username:(s==null?void 0:s.username)||t.email,totalScore:(s==null?void 0:s.totalScore)||0,medals:(s==null?void 0:s.medals)||0}:(await gi(e,{username:t.email,email:t.email,totalScore:0,medals:0}),re.user={uid:t.uid,email:t.email,username:t.email,totalScore:0,medals:0})}catch{re.user={uid:t.uid,email:t.email}}this.$router.push("/")}catch(t){this.error=Fy(t)}}}},$R={class:"dark-card"},jR={class:"flex justify-between items-center mt-4"},HR={key:0,class:"text-red-600 mt-2"},KR={class:"mt-6 text-center"};function WR(t,e,n,s,r,i){const o=Xs("router-link");return Pe(),Ue(Ct,null,[k("div",$R,[e[7]||(e[7]=k("h2",{class:"text-xl font-bold mb-4"},"Login",-1)),k("form",{onSubmit:e[2]||(e[2]=pp((...a)=>i.login&&i.login(...a),["prevent"]))},[e[5]||(e[5]=k("label",null,"Email",-1)),js(k("input",{"onUpdate:modelValue":e[0]||(e[0]=a=>r.email=a)},null,512),[[Ks,r.email]]),e[6]||(e[6]=k("label",null,"Password",-1)),js(k("input",{type:"password","onUpdate:modelValue":e[1]||(e[1]=a=>r.password=a)},null,512),[[Ks,r.password]]),k("div",jR,[e[4]||(e[4]=k("button",{class:"btn-secondary"},"Login",-1)),Se(o,{to:"/register",class:"text-sm text-gray-400"},{default:At(()=>[...e[3]||(e[3]=[nn("Create account",-1)])]),_:1})]),r.error?(Pe(),Ue("p",HR,Ft(r.error),1)):_n("",!0)],32)]),k("div",KR,[Se(o,{to:"/",class:"btn-secondary"},{default:At(()=>[...e[8]||(e[8]=[nn("Home",-1)])]),_:1})])],64)}const qR=Hi(BR,[["render",WR]]),zR={data(){return{userDoc:null,saveMessage:""}},async mounted(){const t=Et.currentUser;if(!t){this.$router.push("/login");return}const e=Wn(qn,"users",t.uid),n=await mi(e);n.exists()?this.userDoc=n.data():this.userDoc={username:t.email,totalScore:0}},methods:{async share(){const t=this.userDoc&&this.userDoc.username?this.userDoc.username:re.user&&re.user.username?re.user.username:"Player",e=`I'm ${t} and I collected ${this.userDoc.totalScore} scores in #batpill`;try{const{generateShareImage:n,shareImageAndText:s}=await So(async()=>{const{generateShareImage:i,shareImageAndText:o}=await import("./share-CZf0hCKX.js");return{generateShareImage:i,shareImageAndText:o}},[]),r=await n({username:t,score:this.userDoc.totalScore||0,medals:this.userDoc.medals||Math.floor(this.userDoc.totalScore/20)});await s({text:e,blob:r})}catch{const s=`https://x.com/intent/tweet?text=${encodeURIComponent(e)}`;window.open(s,"_blank")}},async logout(){await Yp(Et),re.user=null,this.$router.push("/login")},async saveUsername(){const t=Et.currentUser;if(!t)return;const e=Wn(qn,"users",t.uid);await Qo(e,{username:this.userDoc.username}),re.user=Object.assign({},re.user,{username:this.userDoc.username}),this.saveMessage="Username updated successfully!",re.showToast("Username updated successfully!",0),setTimeout(()=>{this.saveMessage=""},3e3)}}},GR={class:"profile-wrapper"},QR={class:"profile-card"},YR={key:0,class:"card-body"},XR={class:"stats-row"},JR={class:"stat"},ZR={class:"stat-value"},ek={class:"stat"},tk={class:"stat-value"},nk={class:"actions"},sk={key:1,class:"loading"},rk={class:"mt-6 text-center"};function ik(t,e,n,s,r,i){const o=Xs("router-link");return Pe(),Ue("div",GR,[k("div",QR,[e[7]||(e[7]=k("div",{class:"card-header"},[k("img",{src:by,alt:"pill",class:"card-logo"}),k("h2",null,"Profile")],-1)),r.userDoc?(Pe(),Ue("div",YR,[r.saveMessage?(Pe(),Ue("div",{key:0,class:vi(["username-success",r.saveMessage?"show":""])},Ft(r.saveMessage),3)):_n("",!0),e[6]||(e[6]=k("label",null,"Username",-1)),js(k("input",{"onUpdate:modelValue":e[0]||(e[0]=a=>r.userDoc.username=a),class:"username-input"},null,512),[[Ks,r.userDoc.username]]),k("div",XR,[k("div",JR,[e[4]||(e[4]=k("div",{class:"stat-label"},"Total points collected",-1)),k("div",ZR,Ft(r.userDoc.totalScore),1)]),k("div",ek,[e[5]||(e[5]=k("div",{class:"stat-label"},"Medals",-1)),k("div",tk,Ft(r.userDoc.medals||Math.floor(r.userDoc.totalScore/20)),1)])]),k("div",nk,[k("button",{onClick:e[1]||(e[1]=(...a)=>i.saveUsername&&i.saveUsername(...a)),class:"btn-secondary"},"Save Username"),k("button",{onClick:e[2]||(e[2]=(...a)=>i.share&&i.share(...a)),class:"btn-secondary"},"Share to X"),k("button",{onClick:e[3]||(e[3]=(...a)=>i.logout&&i.logout(...a)),class:"btn-secondary"},"Logout")])])):(Pe(),Ue("p",sk,"Loading..."))]),k("div",rk,[Se(o,{to:"/",class:"btn-secondary"},{default:At(()=>[...e[8]||(e[8]=[nn("Home",-1)])]),_:1})])])}const ok=Hi(zR,[["render",ik],["__scopeId","data-v-a960752a"]]),ak={data(){return{username:"",email:"",password:"",error:null}},methods:{async register(){this.error=null;try{const t=await NE(Et,this.email,this.password),e=t.user.uid;try{await ME(t.user,{displayName:this.username})}catch{}await gi(Wn(qn,"users",e),{username:this.username,email:this.email,totalScore:0,medals:0}),re.user={uid:e,username:this.username,email:this.email,totalScore:0,medals:0},this.$router.push("/")}catch(t){this.error=Fy(t)}}}},lk={class:"dark-card"},ck={key:0,class:"text-red-600 mt-2"},uk={class:"mt-6 text-center"};function hk(t,e,n,s,r,i){const o=Xs("router-link");return Pe(),Ue(Ct,null,[k("div",lk,[e[8]||(e[8]=k("h2",{class:"text-xl font-bold mb-4"},"Register",-1)),k("form",{onSubmit:e[3]||(e[3]=pp((...a)=>i.register&&i.register(...a),["prevent"]))},[e[4]||(e[4]=k("label",null,"Username",-1)),js(k("input",{"onUpdate:modelValue":e[0]||(e[0]=a=>r.username=a)},null,512),[[Ks,r.username]]),e[5]||(e[5]=k("label",{class:"mt-2"},"Email",-1)),js(k("input",{"onUpdate:modelValue":e[1]||(e[1]=a=>r.email=a)},null,512),[[Ks,r.email]]),e[6]||(e[6]=k("label",{class:"mt-2"},"Password",-1)),js(k("input",{type:"password","onUpdate:modelValue":e[2]||(e[2]=a=>r.password=a)},null,512),[[Ks,r.password]]),e[7]||(e[7]=k("div",{class:"mt-4"},[k("button",{class:"btn-secondary"},"Create account")],-1)),r.error?(Pe(),Ue("p",ck,Ft(r.error),1)):_n("",!0)],32)]),k("div",uk,[Se(o,{to:"/",class:"btn-secondary"},{default:At(()=>[...e[9]||(e[9]=[nn("Home",-1)])]),_:1})])],64)}const fk=Hi(ak,[["render",hk]]),dk=[{path:"/",component:VR},{path:"/login",component:qR},{path:"/profile",component:ok},{path:"/register",component:fk}],Vy=bR({history:nR(),routes:dk}),pk=()=>new Promise(t=>{const e=Et.onAuthStateChanged(n=>{e(),t(n)})});Vy.beforeEach(async(t,e)=>await pk()&&(t.path==="/login"||t.path==="/register")?"/":!0);l_(vC).use(Vy).mount("#app");
