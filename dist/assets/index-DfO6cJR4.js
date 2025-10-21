(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();/**
* @vue/shared v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function dc(t){const e=Object.create(null);for(const n of t.split(","))e[n]=1;return n=>n in e}const pe={},Ds=[],Kt=()=>{},nd=()=>!1,Ho=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),pc=t=>t.startsWith("onUpdate:"),Ze=Object.assign,gc=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},Ry=Object.prototype.hasOwnProperty,ce=(t,e)=>Ry.call(t,e),Q=Array.isArray,Os=t=>Ko(t)==="[object Map]",sd=t=>Ko(t)==="[object Set]",J=t=>typeof t=="function",Ne=t=>typeof t=="string",Hn=t=>typeof t=="symbol",_e=t=>t!==null&&typeof t=="object",rd=t=>(_e(t)||J(t))&&J(t.then)&&J(t.catch),id=Object.prototype.toString,Ko=t=>id.call(t),ky=t=>Ko(t).slice(8,-1),od=t=>Ko(t)==="[object Object]",mc=t=>Ne(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,kr=dc(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),qo=t=>{const e=Object.create(null);return n=>e[n]||(e[n]=t(n))},Ny=/-\w/g,At=qo(t=>t.replace(Ny,e=>e.slice(1).toUpperCase())),Dy=/\B([A-Z])/g,gs=qo(t=>t.replace(Dy,"-$1").toLowerCase()),zo=qo(t=>t.charAt(0).toUpperCase()+t.slice(1)),La=qo(t=>t?`on${zo(t)}`:""),Dn=(t,e)=>!Object.is(t,e),Ji=(t,...e)=>{for(let n=0;n<t.length;n++)t[n](...e)},ad=(t,e,n,s=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:s,value:n})},yl=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let Ku;const Go=()=>Ku||(Ku=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Hr(t){if(Q(t)){const e={};for(let n=0;n<t.length;n++){const s=t[n],r=Ne(s)?My(s):Hr(s);if(r)for(const i in r)e[i]=r[i]}return e}else if(Ne(t)||_e(t))return t}const Oy=/;(?![^(]*\))/g,xy=/:([^]+)/,Py=/\/\*[^]*?\*\//g;function My(t){const e={};return t.replace(Py,"").split(Oy).forEach(n=>{if(n){const s=n.split(xy);s.length>1&&(e[s[0].trim()]=s[1].trim())}}),e}function Wo(t){let e="";if(Ne(t))e=t;else if(Q(t))for(let n=0;n<t.length;n++){const s=Wo(t[n]);s&&(e+=s+" ")}else if(_e(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const Ly="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Uy=dc(Ly);function ld(t){return!!t||t===""}const cd=t=>!!(t&&t.__v_isRef===!0),qt=t=>Ne(t)?t:t==null?"":Q(t)||_e(t)&&(t.toString===id||!J(t.toString))?cd(t)?qt(t.value):JSON.stringify(t,ud,2):String(t),ud=(t,e)=>cd(e)?ud(t,e.value):Os(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[s,r],i)=>(n[Ua(s,i)+" =>"]=r,n),{})}:sd(e)?{[`Set(${e.size})`]:[...e.values()].map(n=>Ua(n))}:Hn(e)?Ua(e):_e(e)&&!Q(e)&&!od(e)?String(e):e,Ua=(t,e="")=>{var n;return Hn(t)?`Symbol(${(n=t.description)!=null?n:e})`:t};/**
* @vue/reactivity v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let ft;class Fy{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=ft,!e&&ft&&(this.index=(ft.scopes||(ft.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].pause();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].resume();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].resume()}}run(e){if(this._active){const n=ft;try{return ft=this,e()}finally{ft=n}}}on(){++this._on===1&&(this.prevScope=ft,ft=this)}off(){this._on>0&&--this._on===0&&(ft=this.prevScope,this.prevScope=void 0)}stop(e){if(this._active){this._active=!1;let n,s;for(n=0,s=this.effects.length;n<s;n++)this.effects[n].stop();for(this.effects.length=0,n=0,s=this.cleanups.length;n<s;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,s=this.scopes.length;n<s;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0}}}function Vy(){return ft}let me;const Fa=new WeakSet;class hd{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,ft&&ft.active&&ft.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Fa.has(this)&&(Fa.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||dd(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,qu(this),pd(this);const e=me,n=Rt;me=this,Rt=!0;try{return this.fn()}finally{gd(this),me=e,Rt=n,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)wc(e);this.deps=this.depsTail=void 0,qu(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Fa.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){vl(this)&&this.run()}get dirty(){return vl(this)}}let fd=0,Nr,Dr;function dd(t,e=!1){if(t.flags|=8,e){t.next=Dr,Dr=t;return}t.next=Nr,Nr=t}function yc(){fd++}function vc(){if(--fd>0)return;if(Dr){let e=Dr;for(Dr=void 0;e;){const n=e.next;e.next=void 0,e.flags&=-9,e=n}}let t;for(;Nr;){let e=Nr;for(Nr=void 0;e;){const n=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(s){t||(t=s)}e=n}}if(t)throw t}function pd(t){for(let e=t.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function gd(t){let e,n=t.depsTail,s=n;for(;s;){const r=s.prevDep;s.version===-1?(s===n&&(n=r),wc(s),By(s)):e=s,s.dep.activeLink=s.prevActiveLink,s.prevActiveLink=void 0,s=r}t.deps=e,t.depsTail=n}function vl(t){for(let e=t.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(md(e.dep.computed)||e.dep.version!==e.version))return!0;return!!t._dirty}function md(t){if(t.flags&4&&!(t.flags&16)||(t.flags&=-17,t.globalVersion===Kr)||(t.globalVersion=Kr,!t.isSSR&&t.flags&128&&(!t.deps&&!t._dirty||!vl(t))))return;t.flags|=2;const e=t.dep,n=me,s=Rt;me=t,Rt=!0;try{pd(t);const r=t.fn(t._value);(e.version===0||Dn(r,t._value))&&(t.flags|=128,t._value=r,e.version++)}catch(r){throw e.version++,r}finally{me=n,Rt=s,gd(t),t.flags&=-3}}function wc(t,e=!1){const{dep:n,prevSub:s,nextSub:r}=t;if(s&&(s.nextSub=r,t.prevSub=void 0),r&&(r.prevSub=s,t.nextSub=void 0),n.subs===t&&(n.subs=s,!s&&n.computed)){n.computed.flags&=-5;for(let i=n.computed.deps;i;i=i.nextDep)wc(i,!0)}!e&&!--n.sc&&n.map&&n.map.delete(n.key)}function By(t){const{prevDep:e,nextDep:n}=t;e&&(e.nextDep=n,t.prevDep=void 0),n&&(n.prevDep=e,t.nextDep=void 0)}let Rt=!0;const yd=[];function un(){yd.push(Rt),Rt=!1}function hn(){const t=yd.pop();Rt=t===void 0?!0:t}function qu(t){const{cleanup:e}=t;if(t.cleanup=void 0,e){const n=me;me=void 0;try{e()}finally{me=n}}}let Kr=0;class $y{constructor(e,n){this.sub=e,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class _c{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!me||!Rt||me===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==me)n=this.activeLink=new $y(me,this),me.deps?(n.prevDep=me.depsTail,me.depsTail.nextDep=n,me.depsTail=n):me.deps=me.depsTail=n,vd(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const s=n.nextDep;s.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=s),n.prevDep=me.depsTail,n.nextDep=void 0,me.depsTail.nextDep=n,me.depsTail=n,me.deps===n&&(me.deps=s)}return n}trigger(e){this.version++,Kr++,this.notify(e)}notify(e){yc();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{vc()}}}function vd(t){if(t.dep.sc++,t.sub.flags&4){const e=t.dep.computed;if(e&&!t.dep.subs){e.flags|=20;for(let s=e.deps;s;s=s.nextDep)vd(s)}const n=t.dep.subs;n!==t&&(t.prevSub=n,n&&(n.nextSub=t)),t.dep.subs=t}}const wl=new WeakMap,rs=Symbol(""),_l=Symbol(""),qr=Symbol("");function qe(t,e,n){if(Rt&&me){let s=wl.get(t);s||wl.set(t,s=new Map);let r=s.get(n);r||(s.set(n,r=new _c),r.map=s,r.key=n),r.track()}}function sn(t,e,n,s,r,i){const o=wl.get(t);if(!o){Kr++;return}const a=l=>{l&&l.trigger()};if(yc(),e==="clear")o.forEach(a);else{const l=Q(t),c=l&&mc(n);if(l&&n==="length"){const u=Number(s);o.forEach((h,f)=>{(f==="length"||f===qr||!Hn(f)&&f>=u)&&a(h)})}else switch((n!==void 0||o.has(void 0))&&a(o.get(n)),c&&a(o.get(qr)),e){case"add":l?c&&a(o.get("length")):(a(o.get(rs)),Os(t)&&a(o.get(_l)));break;case"delete":l||(a(o.get(rs)),Os(t)&&a(o.get(_l)));break;case"set":Os(t)&&a(o.get(rs));break}}vc()}function Is(t){const e=le(t);return e===t?e:(qe(e,"iterate",qr),St(t)?e:e.map(Be))}function Qo(t){return qe(t=le(t),"iterate",qr),t}const jy={__proto__:null,[Symbol.iterator](){return Va(this,Symbol.iterator,Be)},concat(...t){return Is(this).concat(...t.map(e=>Q(e)?Is(e):e))},entries(){return Va(this,"entries",t=>(t[1]=Be(t[1]),t))},every(t,e){return en(this,"every",t,e,void 0,arguments)},filter(t,e){return en(this,"filter",t,e,n=>n.map(Be),arguments)},find(t,e){return en(this,"find",t,e,Be,arguments)},findIndex(t,e){return en(this,"findIndex",t,e,void 0,arguments)},findLast(t,e){return en(this,"findLast",t,e,Be,arguments)},findLastIndex(t,e){return en(this,"findLastIndex",t,e,void 0,arguments)},forEach(t,e){return en(this,"forEach",t,e,void 0,arguments)},includes(...t){return Ba(this,"includes",t)},indexOf(...t){return Ba(this,"indexOf",t)},join(t){return Is(this).join(t)},lastIndexOf(...t){return Ba(this,"lastIndexOf",t)},map(t,e){return en(this,"map",t,e,void 0,arguments)},pop(){return yr(this,"pop")},push(...t){return yr(this,"push",t)},reduce(t,...e){return zu(this,"reduce",t,e)},reduceRight(t,...e){return zu(this,"reduceRight",t,e)},shift(){return yr(this,"shift")},some(t,e){return en(this,"some",t,e,void 0,arguments)},splice(...t){return yr(this,"splice",t)},toReversed(){return Is(this).toReversed()},toSorted(t){return Is(this).toSorted(t)},toSpliced(...t){return Is(this).toSpliced(...t)},unshift(...t){return yr(this,"unshift",t)},values(){return Va(this,"values",Be)}};function Va(t,e,n){const s=Qo(t),r=s[e]();return s!==t&&!St(t)&&(r._next=r.next,r.next=()=>{const i=r._next();return i.done||(i.value=n(i.value)),i}),r}const Hy=Array.prototype;function en(t,e,n,s,r,i){const o=Qo(t),a=o!==t&&!St(t),l=o[e];if(l!==Hy[e]){const h=l.apply(t,i);return a?Be(h):h}let c=n;o!==t&&(a?c=function(h,f){return n.call(this,Be(h),f,t)}:n.length>2&&(c=function(h,f){return n.call(this,h,f,t)}));const u=l.call(o,c,s);return a&&r?r(u):u}function zu(t,e,n,s){const r=Qo(t);let i=n;return r!==t&&(St(t)?n.length>3&&(i=function(o,a,l){return n.call(this,o,a,l,t)}):i=function(o,a,l){return n.call(this,o,Be(a),l,t)}),r[e](i,...s)}function Ba(t,e,n){const s=le(t);qe(s,"iterate",qr);const r=s[e](...n);return(r===-1||r===!1)&&Tc(n[0])?(n[0]=le(n[0]),s[e](...n)):r}function yr(t,e,n=[]){un(),yc();const s=le(t)[e].apply(t,n);return vc(),hn(),s}const Ky=dc("__proto__,__v_isRef,__isVue"),wd=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(Hn));function qy(t){Hn(t)||(t=String(t));const e=le(this);return qe(e,"has",t),e.hasOwnProperty(t)}class _d{constructor(e=!1,n=!1){this._isReadonly=e,this._isShallow=n}get(e,n,s){if(n==="__v_skip")return e.__v_skip;const r=this._isReadonly,i=this._isShallow;if(n==="__v_isReactive")return!r;if(n==="__v_isReadonly")return r;if(n==="__v_isShallow")return i;if(n==="__v_raw")return s===(r?i?tv:Sd:i?Td:Id).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(s)?e:void 0;const o=Q(e);if(!r){let l;if(o&&(l=jy[n]))return l;if(n==="hasOwnProperty")return qy}const a=Reflect.get(e,n,Qe(e)?e:s);if((Hn(n)?wd.has(n):Ky(n))||(r||qe(e,"get",n),i))return a;if(Qe(a)){const l=o&&mc(n)?a:a.value;return r&&_e(l)?Il(l):l}return _e(a)?r?Il(a):gi(a):a}}class Ed extends _d{constructor(e=!1){super(!1,e)}set(e,n,s,r){let i=e[n];if(!this._isShallow){const l=Fn(i);if(!St(s)&&!Fn(s)&&(i=le(i),s=le(s)),!Q(e)&&Qe(i)&&!Qe(s))return l||(i.value=s),!0}const o=Q(e)&&mc(n)?Number(n)<e.length:ce(e,n),a=Reflect.set(e,n,s,Qe(e)?e:r);return e===le(r)&&(o?Dn(s,i)&&sn(e,"set",n,s):sn(e,"add",n,s)),a}deleteProperty(e,n){const s=ce(e,n);e[n];const r=Reflect.deleteProperty(e,n);return r&&s&&sn(e,"delete",n,void 0),r}has(e,n){const s=Reflect.has(e,n);return(!Hn(n)||!wd.has(n))&&qe(e,"has",n),s}ownKeys(e){return qe(e,"iterate",Q(e)?"length":rs),Reflect.ownKeys(e)}}class zy extends _d{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const Gy=new Ed,Wy=new zy,Qy=new Ed(!0);const El=t=>t,Fi=t=>Reflect.getPrototypeOf(t);function Yy(t,e,n){return function(...s){const r=this.__v_raw,i=le(r),o=Os(i),a=t==="entries"||t===Symbol.iterator&&o,l=t==="keys"&&o,c=r[t](...s),u=n?El:e?co:Be;return!e&&qe(i,"iterate",l?_l:rs),{next(){const{value:h,done:f}=c.next();return f?{value:h,done:f}:{value:a?[u(h[0]),u(h[1])]:u(h),done:f}},[Symbol.iterator](){return this}}}}function Vi(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function Jy(t,e){const n={get(r){const i=this.__v_raw,o=le(i),a=le(r);t||(Dn(r,a)&&qe(o,"get",r),qe(o,"get",a));const{has:l}=Fi(o),c=e?El:t?co:Be;if(l.call(o,r))return c(i.get(r));if(l.call(o,a))return c(i.get(a));i!==o&&i.get(r)},get size(){const r=this.__v_raw;return!t&&qe(le(r),"iterate",rs),r.size},has(r){const i=this.__v_raw,o=le(i),a=le(r);return t||(Dn(r,a)&&qe(o,"has",r),qe(o,"has",a)),r===a?i.has(r):i.has(r)||i.has(a)},forEach(r,i){const o=this,a=o.__v_raw,l=le(a),c=e?El:t?co:Be;return!t&&qe(l,"iterate",rs),a.forEach((u,h)=>r.call(i,c(u),c(h),o))}};return Ze(n,t?{add:Vi("add"),set:Vi("set"),delete:Vi("delete"),clear:Vi("clear")}:{add(r){!e&&!St(r)&&!Fn(r)&&(r=le(r));const i=le(this);return Fi(i).has.call(i,r)||(i.add(r),sn(i,"add",r,r)),this},set(r,i){!e&&!St(i)&&!Fn(i)&&(i=le(i));const o=le(this),{has:a,get:l}=Fi(o);let c=a.call(o,r);c||(r=le(r),c=a.call(o,r));const u=l.call(o,r);return o.set(r,i),c?Dn(i,u)&&sn(o,"set",r,i):sn(o,"add",r,i),this},delete(r){const i=le(this),{has:o,get:a}=Fi(i);let l=o.call(i,r);l||(r=le(r),l=o.call(i,r)),a&&a.call(i,r);const c=i.delete(r);return l&&sn(i,"delete",r,void 0),c},clear(){const r=le(this),i=r.size!==0,o=r.clear();return i&&sn(r,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(r=>{n[r]=Yy(r,t,e)}),n}function Ec(t,e){const n=Jy(t,e);return(s,r,i)=>r==="__v_isReactive"?!t:r==="__v_isReadonly"?t:r==="__v_raw"?s:Reflect.get(ce(n,r)&&r in s?n:s,r,i)}const Xy={get:Ec(!1,!1)},Zy={get:Ec(!1,!0)},ev={get:Ec(!0,!1)};const Id=new WeakMap,Td=new WeakMap,Sd=new WeakMap,tv=new WeakMap;function nv(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function sv(t){return t.__v_skip||!Object.isExtensible(t)?0:nv(ky(t))}function gi(t){return Fn(t)?t:Ic(t,!1,Gy,Xy,Id)}function bd(t){return Ic(t,!1,Qy,Zy,Td)}function Il(t){return Ic(t,!0,Wy,ev,Sd)}function Ic(t,e,n,s,r){if(!_e(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const i=sv(t);if(i===0)return t;const o=r.get(t);if(o)return o;const a=new Proxy(t,i===2?s:n);return r.set(t,a),a}function xs(t){return Fn(t)?xs(t.__v_raw):!!(t&&t.__v_isReactive)}function Fn(t){return!!(t&&t.__v_isReadonly)}function St(t){return!!(t&&t.__v_isShallow)}function Tc(t){return t?!!t.__v_raw:!1}function le(t){const e=t&&t.__v_raw;return e?le(e):t}function rv(t){return!ce(t,"__v_skip")&&Object.isExtensible(t)&&ad(t,"__v_skip",!0),t}const Be=t=>_e(t)?gi(t):t,co=t=>_e(t)?Il(t):t;function Qe(t){return t?t.__v_isRef===!0:!1}function iv(t){return Ad(t,!1)}function ov(t){return Ad(t,!0)}function Ad(t,e){return Qe(t)?t:new av(t,e)}class av{constructor(e,n){this.dep=new _c,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?e:le(e),this._value=n?e:Be(e),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(e){const n=this._rawValue,s=this.__v_isShallow||St(e)||Fn(e);e=s?e:le(e),Dn(e,n)&&(this._rawValue=e,this._value=s?e:Be(e),this.dep.trigger())}}function Ps(t){return Qe(t)?t.value:t}const lv={get:(t,e,n)=>e==="__v_raw"?t:Ps(Reflect.get(t,e,n)),set:(t,e,n,s)=>{const r=t[e];return Qe(r)&&!Qe(n)?(r.value=n,!0):Reflect.set(t,e,n,s)}};function Cd(t){return xs(t)?t:new Proxy(t,lv)}class cv{constructor(e,n,s){this.fn=e,this.setter=n,this._value=void 0,this.dep=new _c(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Kr-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=s}notify(){if(this.flags|=16,!(this.flags&8)&&me!==this)return dd(this,!0),!0}get value(){const e=this.dep.track();return md(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function uv(t,e,n=!1){let s,r;return J(t)?s=t:(s=t.get,r=t.set),new cv(s,r,n)}const Bi={},uo=new WeakMap;let Jn;function hv(t,e=!1,n=Jn){if(n){let s=uo.get(n);s||uo.set(n,s=[]),s.push(t)}}function fv(t,e,n=pe){const{immediate:s,deep:r,once:i,scheduler:o,augmentJob:a,call:l}=n,c=x=>r?x:St(x)||r===!1||r===0?rn(x,1):rn(x);let u,h,f,p,y=!1,E=!1;if(Qe(t)?(h=()=>t.value,y=St(t)):xs(t)?(h=()=>c(t),y=!0):Q(t)?(E=!0,y=t.some(x=>xs(x)||St(x)),h=()=>t.map(x=>{if(Qe(x))return x.value;if(xs(x))return c(x);if(J(x))return l?l(x,2):x()})):J(t)?e?h=l?()=>l(t,2):t:h=()=>{if(f){un();try{f()}finally{hn()}}const x=Jn;Jn=u;try{return l?l(t,3,[p]):t(p)}finally{Jn=x}}:h=Kt,e&&r){const x=h,ee=r===!0?1/0:r;h=()=>rn(x(),ee)}const A=Vy(),N=()=>{u.stop(),A&&A.active&&gc(A.effects,u)};if(i&&e){const x=e;e=(...ee)=>{x(...ee),N()}}let R=E?new Array(t.length).fill(Bi):Bi;const M=x=>{if(!(!(u.flags&1)||!u.dirty&&!x))if(e){const ee=u.run();if(r||y||(E?ee.some((ye,ue)=>Dn(ye,R[ue])):Dn(ee,R))){f&&f();const ye=Jn;Jn=u;try{const ue=[ee,R===Bi?void 0:E&&R[0]===Bi?[]:R,p];R=ee,l?l(e,3,ue):e(...ue)}finally{Jn=ye}}}else u.run()};return a&&a(M),u=new hd(h),u.scheduler=o?()=>o(M,!1):M,p=x=>hv(x,!1,u),f=u.onStop=()=>{const x=uo.get(u);if(x){if(l)l(x,4);else for(const ee of x)ee();uo.delete(u)}},e?s?M(!0):R=u.run():o?o(M.bind(null,!0),!0):u.run(),N.pause=u.pause.bind(u),N.resume=u.resume.bind(u),N.stop=N,N}function rn(t,e=1/0,n){if(e<=0||!_e(t)||t.__v_skip||(n=n||new Map,(n.get(t)||0)>=e))return t;if(n.set(t,e),e--,Qe(t))rn(t.value,e,n);else if(Q(t))for(let s=0;s<t.length;s++)rn(t[s],e,n);else if(sd(t)||Os(t))t.forEach(s=>{rn(s,e,n)});else if(od(t)){for(const s in t)rn(t[s],e,n);for(const s of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,s)&&rn(t[s],e,n)}return t}/**
* @vue/runtime-core v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function mi(t,e,n,s){try{return s?t(...s):t()}catch(r){Yo(r,e,n)}}function Yt(t,e,n,s){if(J(t)){const r=mi(t,e,n,s);return r&&rd(r)&&r.catch(i=>{Yo(i,e,n)}),r}if(Q(t)){const r=[];for(let i=0;i<t.length;i++)r.push(Yt(t[i],e,n,s));return r}}function Yo(t,e,n,s=!0){const r=e?e.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||pe;if(e){let a=e.parent;const l=e.proxy,c=`https://vuejs.org/error-reference/#runtime-${n}`;for(;a;){const u=a.ec;if(u){for(let h=0;h<u.length;h++)if(u[h](t,l,c)===!1)return}a=a.parent}if(i){un(),mi(i,null,10,[t,l,c]),hn();return}}dv(t,n,r,s,o)}function dv(t,e,n,s=!0,r=!1){if(r)throw t;console.error(t)}const it=[];let Ft=-1;const Ms=[];let Tn=null,Ss=0;const Rd=Promise.resolve();let ho=null;function kd(t){const e=ho||Rd;return t?e.then(this?t.bind(this):t):e}function pv(t){let e=Ft+1,n=it.length;for(;e<n;){const s=e+n>>>1,r=it[s],i=zr(r);i<t||i===t&&r.flags&2?e=s+1:n=s}return e}function Sc(t){if(!(t.flags&1)){const e=zr(t),n=it[it.length-1];!n||!(t.flags&2)&&e>=zr(n)?it.push(t):it.splice(pv(e),0,t),t.flags|=1,Nd()}}function Nd(){ho||(ho=Rd.then(Od))}function gv(t){Q(t)?Ms.push(...t):Tn&&t.id===-1?Tn.splice(Ss+1,0,t):t.flags&1||(Ms.push(t),t.flags|=1),Nd()}function Gu(t,e,n=Ft+1){for(;n<it.length;n++){const s=it[n];if(s&&s.flags&2){if(t&&s.id!==t.uid)continue;it.splice(n,1),n--,s.flags&4&&(s.flags&=-2),s(),s.flags&4||(s.flags&=-2)}}}function Dd(t){if(Ms.length){const e=[...new Set(Ms)].sort((n,s)=>zr(n)-zr(s));if(Ms.length=0,Tn){Tn.push(...e);return}for(Tn=e,Ss=0;Ss<Tn.length;Ss++){const n=Tn[Ss];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}Tn=null,Ss=0}}const zr=t=>t.id==null?t.flags&2?-1:1/0:t.id;function Od(t){try{for(Ft=0;Ft<it.length;Ft++){const e=it[Ft];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),mi(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;Ft<it.length;Ft++){const e=it[Ft];e&&(e.flags&=-2)}Ft=-1,it.length=0,Dd(),ho=null,(it.length||Ms.length)&&Od()}}let mt=null,xd=null;function fo(t){const e=mt;return mt=t,xd=t&&t.type.__scopeId||null,e}function Zn(t,e=mt,n){if(!e||t._n)return t;const s=(...r)=>{s._d&&yo(-1);const i=fo(e);let o;try{o=t(...r)}finally{fo(i),s._d&&yo(1)}return o};return s._n=!0,s._c=!0,s._d=!0,s}function Ls(t,e){if(mt===null)return t;const n=ea(mt),s=t.dirs||(t.dirs=[]);for(let r=0;r<e.length;r++){let[i,o,a,l=pe]=e[r];i&&(J(i)&&(i={mounted:i,updated:i}),i.deep&&rn(o),s.push({dir:i,instance:n,value:o,oldValue:void 0,arg:a,modifiers:l}))}return t}function Qn(t,e,n,s){const r=t.dirs,i=e&&e.dirs;for(let o=0;o<r.length;o++){const a=r[o];i&&(a.oldValue=i[o].value);let l=a.dir[s];l&&(un(),Yt(l,n,8,[t.el,a,t,e]),hn())}}const mv=Symbol("_vte"),yv=t=>t.__isTeleport,vv=Symbol("_leaveCb");function bc(t,e){t.shapeFlag&6&&t.component?(t.transition=e,bc(t.component.subTree,e)):t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}function Pd(t,e){return J(t)?Ze({name:t.name},e,{setup:t}):t}function Md(t){t.ids=[t.ids[0]+t.ids[2]+++"-",0,0]}const po=new WeakMap;function Or(t,e,n,s,r=!1){if(Q(t)){t.forEach((y,E)=>Or(y,e&&(Q(e)?e[E]:e),n,s,r));return}if(xr(s)&&!r){s.shapeFlag&512&&s.type.__asyncResolved&&s.component.subTree.component&&Or(t,e,n,s.component.subTree);return}const i=s.shapeFlag&4?ea(s.component):s.el,o=r?null:i,{i:a,r:l}=t,c=e&&e.r,u=a.refs===pe?a.refs={}:a.refs,h=a.setupState,f=le(h),p=h===pe?nd:y=>ce(f,y);if(c!=null&&c!==l){if(Wu(e),Ne(c))u[c]=null,p(c)&&(h[c]=null);else if(Qe(c)){c.value=null;const y=e;y.k&&(u[y.k]=null)}}if(J(l))mi(l,a,12,[o,u]);else{const y=Ne(l),E=Qe(l);if(y||E){const A=()=>{if(t.f){const N=y?p(l)?h[l]:u[l]:l.value;if(r)Q(N)&&gc(N,i);else if(Q(N))N.includes(i)||N.push(i);else if(y)u[l]=[i],p(l)&&(h[l]=u[l]);else{const R=[i];l.value=R,t.k&&(u[t.k]=R)}}else y?(u[l]=o,p(l)&&(h[l]=o)):E&&(l.value=o,t.k&&(u[t.k]=o))};if(o){const N=()=>{A(),po.delete(t)};N.id=-1,po.set(t,N),gt(N,n)}else Wu(t),A()}}}function Wu(t){const e=po.get(t);e&&(e.flags|=8,po.delete(t))}Go().requestIdleCallback;Go().cancelIdleCallback;const xr=t=>!!t.type.__asyncLoader,Ld=t=>t.type.__isKeepAlive;function wv(t,e){Ud(t,"a",e)}function _v(t,e){Ud(t,"da",e)}function Ud(t,e,n=Ge){const s=t.__wdc||(t.__wdc=()=>{let r=n;for(;r;){if(r.isDeactivated)return;r=r.parent}return t()});if(Jo(e,s,n),n){let r=n.parent;for(;r&&r.parent;)Ld(r.parent.vnode)&&Ev(s,e,n,r),r=r.parent}}function Ev(t,e,n,s){const r=Jo(e,t,s,!0);Fd(()=>{gc(s[e],r)},n)}function Jo(t,e,n=Ge,s=!1){if(n){const r=n[t]||(n[t]=[]),i=e.__weh||(e.__weh=(...o)=>{un();const a=yi(n),l=Yt(e,n,t,o);return a(),hn(),l});return s?r.unshift(i):r.push(i),i}}const yn=t=>(e,n=Ge)=>{(!Wr||t==="sp")&&Jo(t,(...s)=>e(...s),n)},Iv=yn("bm"),Tv=yn("m"),Sv=yn("bu"),bv=yn("u"),Av=yn("bum"),Fd=yn("um"),Cv=yn("sp"),Rv=yn("rtg"),kv=yn("rtc");function Nv(t,e=Ge){Jo("ec",t,e)}const Dv="components";function go(t,e){return xv(Dv,t,!0,e)||t}const Ov=Symbol.for("v-ndc");function xv(t,e,n=!0,s=!1){const r=mt||Ge;if(r){const i=r.type;{const a=Tw(i,!1);if(a&&(a===e||a===At(e)||a===zo(At(e))))return i}const o=Qu(r[t]||i[t],e)||Qu(r.appContext[t],e);return!o&&s?i:o}}function Qu(t,e){return t&&(t[e]||t[At(e)]||t[zo(At(e))])}function Pv(t,e,n,s){let r;const i=n,o=Q(t);if(o||Ne(t)){const a=o&&xs(t);let l=!1,c=!1;a&&(l=!St(t),c=Fn(t),t=Qo(t)),r=new Array(t.length);for(let u=0,h=t.length;u<h;u++)r[u]=e(l?c?co(Be(t[u])):Be(t[u]):t[u],u,void 0,i)}else if(typeof t=="number"){r=new Array(t);for(let a=0;a<t;a++)r[a]=e(a+1,a,void 0,i)}else if(_e(t))if(t[Symbol.iterator])r=Array.from(t,(a,l)=>e(a,l,void 0,i));else{const a=Object.keys(t);r=new Array(a.length);for(let l=0,c=a.length;l<c;l++){const u=a[l];r[l]=e(t[u],u,l,i)}}else r=[];return r}const Tl=t=>t?rp(t)?ea(t):Tl(t.parent):null,Pr=Ze(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>Tl(t.parent),$root:t=>Tl(t.root),$host:t=>t.ce,$emit:t=>t.emit,$options:t=>Bd(t),$forceUpdate:t=>t.f||(t.f=()=>{Sc(t.update)}),$nextTick:t=>t.n||(t.n=kd.bind(t.proxy)),$watch:t=>tw.bind(t)}),$a=(t,e)=>t!==pe&&!t.__isScriptSetup&&ce(t,e),Mv={get({_:t},e){if(e==="__v_skip")return!0;const{ctx:n,setupState:s,data:r,props:i,accessCache:o,type:a,appContext:l}=t;let c;if(e[0]!=="$"){const p=o[e];if(p!==void 0)switch(p){case 1:return s[e];case 2:return r[e];case 4:return n[e];case 3:return i[e]}else{if($a(s,e))return o[e]=1,s[e];if(r!==pe&&ce(r,e))return o[e]=2,r[e];if((c=t.propsOptions[0])&&ce(c,e))return o[e]=3,i[e];if(n!==pe&&ce(n,e))return o[e]=4,n[e];Sl&&(o[e]=0)}}const u=Pr[e];let h,f;if(u)return e==="$attrs"&&qe(t.attrs,"get",""),u(t);if((h=a.__cssModules)&&(h=h[e]))return h;if(n!==pe&&ce(n,e))return o[e]=4,n[e];if(f=l.config.globalProperties,ce(f,e))return f[e]},set({_:t},e,n){const{data:s,setupState:r,ctx:i}=t;return $a(r,e)?(r[e]=n,!0):s!==pe&&ce(s,e)?(s[e]=n,!0):ce(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(i[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:s,appContext:r,propsOptions:i,type:o}},a){let l,c;return!!(n[a]||t!==pe&&a[0]!=="$"&&ce(t,a)||$a(e,a)||(l=i[0])&&ce(l,a)||ce(s,a)||ce(Pr,a)||ce(r.config.globalProperties,a)||(c=o.__cssModules)&&c[a])},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:ce(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function Yu(t){return Q(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let Sl=!0;function Lv(t){const e=Bd(t),n=t.proxy,s=t.ctx;Sl=!1,e.beforeCreate&&Ju(e.beforeCreate,t,"bc");const{data:r,computed:i,methods:o,watch:a,provide:l,inject:c,created:u,beforeMount:h,mounted:f,beforeUpdate:p,updated:y,activated:E,deactivated:A,beforeDestroy:N,beforeUnmount:R,destroyed:M,unmounted:x,render:ee,renderTracked:ye,renderTriggered:ue,errorCaptured:lt,serverPrefetch:nt,expose:Et,inheritAttrs:wn,components:Gn,directives:Ot,filters:gr}=e;if(c&&Uv(c,s,null),o)for(const de in o){const oe=o[de];J(oe)&&(s[de]=oe.bind(n))}if(r){const de=r.call(n,n);_e(de)&&(t.data=gi(de))}if(Sl=!0,i)for(const de in i){const oe=i[de],Zt=J(oe)?oe.bind(n,n):J(oe.get)?oe.get.bind(n,n):Kt,_n=!J(oe)&&J(oe.set)?oe.set.bind(n):Kt,xt=Ct({get:Zt,set:_n});Object.defineProperty(s,de,{enumerable:!0,configurable:!0,get:()=>xt.value,set:ct=>xt.value=ct})}if(a)for(const de in a)Vd(a[de],s,n,de);if(l){const de=J(l)?l.call(n):l;Reflect.ownKeys(de).forEach(oe=>{Xi(oe,de[oe])})}u&&Ju(u,t,"c");function Me(de,oe){Q(oe)?oe.forEach(Zt=>de(Zt.bind(n))):oe&&de(oe.bind(n))}if(Me(Iv,h),Me(Tv,f),Me(Sv,p),Me(bv,y),Me(wv,E),Me(_v,A),Me(Nv,lt),Me(kv,ye),Me(Rv,ue),Me(Av,R),Me(Fd,x),Me(Cv,nt),Q(Et))if(Et.length){const de=t.exposed||(t.exposed={});Et.forEach(oe=>{Object.defineProperty(de,oe,{get:()=>n[oe],set:Zt=>n[oe]=Zt,enumerable:!0})})}else t.exposed||(t.exposed={});ee&&t.render===Kt&&(t.render=ee),wn!=null&&(t.inheritAttrs=wn),Gn&&(t.components=Gn),Ot&&(t.directives=Ot),nt&&Md(t)}function Uv(t,e,n=Kt){Q(t)&&(t=bl(t));for(const s in t){const r=t[s];let i;_e(r)?"default"in r?i=cn(r.from||s,r.default,!0):i=cn(r.from||s):i=cn(r),Qe(i)?Object.defineProperty(e,s,{enumerable:!0,configurable:!0,get:()=>i.value,set:o=>i.value=o}):e[s]=i}}function Ju(t,e,n){Yt(Q(t)?t.map(s=>s.bind(e.proxy)):t.bind(e.proxy),e,n)}function Vd(t,e,n,s){let r=s.includes(".")?Zd(n,s):()=>n[s];if(Ne(t)){const i=e[t];J(i)&&Zi(r,i)}else if(J(t))Zi(r,t.bind(n));else if(_e(t))if(Q(t))t.forEach(i=>Vd(i,e,n,s));else{const i=J(t.handler)?t.handler.bind(n):e[t.handler];J(i)&&Zi(r,i,t)}}function Bd(t){const e=t.type,{mixins:n,extends:s}=e,{mixins:r,optionsCache:i,config:{optionMergeStrategies:o}}=t.appContext,a=i.get(e);let l;return a?l=a:!r.length&&!n&&!s?l=e:(l={},r.length&&r.forEach(c=>mo(l,c,o,!0)),mo(l,e,o)),_e(e)&&i.set(e,l),l}function mo(t,e,n,s=!1){const{mixins:r,extends:i}=e;i&&mo(t,i,n,!0),r&&r.forEach(o=>mo(t,o,n,!0));for(const o in e)if(!(s&&o==="expose")){const a=Fv[o]||n&&n[o];t[o]=a?a(t[o],e[o]):e[o]}return t}const Fv={data:Xu,props:Zu,emits:Zu,methods:Ir,computed:Ir,beforeCreate:st,created:st,beforeMount:st,mounted:st,beforeUpdate:st,updated:st,beforeDestroy:st,beforeUnmount:st,destroyed:st,unmounted:st,activated:st,deactivated:st,errorCaptured:st,serverPrefetch:st,components:Ir,directives:Ir,watch:Bv,provide:Xu,inject:Vv};function Xu(t,e){return e?t?function(){return Ze(J(t)?t.call(this,this):t,J(e)?e.call(this,this):e)}:e:t}function Vv(t,e){return Ir(bl(t),bl(e))}function bl(t){if(Q(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function st(t,e){return t?[...new Set([].concat(t,e))]:e}function Ir(t,e){return t?Ze(Object.create(null),t,e):e}function Zu(t,e){return t?Q(t)&&Q(e)?[...new Set([...t,...e])]:Ze(Object.create(null),Yu(t),Yu(e??{})):e}function Bv(t,e){if(!t)return e;if(!e)return t;const n=Ze(Object.create(null),t);for(const s in e)n[s]=st(t[s],e[s]);return n}function $d(){return{app:null,config:{isNativeTag:nd,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let $v=0;function jv(t,e){return function(s,r=null){J(s)||(s=Ze({},s)),r!=null&&!_e(r)&&(r=null);const i=$d(),o=new WeakSet,a=[];let l=!1;const c=i.app={_uid:$v++,_component:s,_props:r,_container:null,_context:i,_instance:null,version:bw,get config(){return i.config},set config(u){},use(u,...h){return o.has(u)||(u&&J(u.install)?(o.add(u),u.install(c,...h)):J(u)&&(o.add(u),u(c,...h))),c},mixin(u){return i.mixins.includes(u)||i.mixins.push(u),c},component(u,h){return h?(i.components[u]=h,c):i.components[u]},directive(u,h){return h?(i.directives[u]=h,c):i.directives[u]},mount(u,h,f){if(!l){const p=c._ceVNode||ke(s,r);return p.appContext=i,f===!0?f="svg":f===!1&&(f=void 0),t(p,u,f),l=!0,c._container=u,u.__vue_app__=c,ea(p.component)}},onUnmount(u){a.push(u)},unmount(){l&&(Yt(a,c._instance,16),t(null,c._container),delete c._container.__vue_app__)},provide(u,h){return i.provides[u]=h,c},runWithContext(u){const h=Us;Us=c;try{return u()}finally{Us=h}}};return c}}let Us=null;function Xi(t,e){if(Ge){let n=Ge.provides;const s=Ge.parent&&Ge.parent.provides;s===n&&(n=Ge.provides=Object.create(s)),n[t]=e}}function cn(t,e,n=!1){const s=vw();if(s||Us){let r=Us?Us._context.provides:s?s.parent==null||s.ce?s.vnode.appContext&&s.vnode.appContext.provides:s.parent.provides:void 0;if(r&&t in r)return r[t];if(arguments.length>1)return n&&J(e)?e.call(s&&s.proxy):e}}const jd={},Hd=()=>Object.create(jd),Kd=t=>Object.getPrototypeOf(t)===jd;function Hv(t,e,n,s=!1){const r={},i=Hd();t.propsDefaults=Object.create(null),qd(t,e,r,i);for(const o in t.propsOptions[0])o in r||(r[o]=void 0);n?t.props=s?r:bd(r):t.type.props?t.props=r:t.props=i,t.attrs=i}function Kv(t,e,n,s){const{props:r,attrs:i,vnode:{patchFlag:o}}=t,a=le(r),[l]=t.propsOptions;let c=!1;if((s||o>0)&&!(o&16)){if(o&8){const u=t.vnode.dynamicProps;for(let h=0;h<u.length;h++){let f=u[h];if(Xo(t.emitsOptions,f))continue;const p=e[f];if(l)if(ce(i,f))p!==i[f]&&(i[f]=p,c=!0);else{const y=At(f);r[y]=Al(l,a,y,p,t,!1)}else p!==i[f]&&(i[f]=p,c=!0)}}}else{qd(t,e,r,i)&&(c=!0);let u;for(const h in a)(!e||!ce(e,h)&&((u=gs(h))===h||!ce(e,u)))&&(l?n&&(n[h]!==void 0||n[u]!==void 0)&&(r[h]=Al(l,a,h,void 0,t,!0)):delete r[h]);if(i!==a)for(const h in i)(!e||!ce(e,h))&&(delete i[h],c=!0)}c&&sn(t.attrs,"set","")}function qd(t,e,n,s){const[r,i]=t.propsOptions;let o=!1,a;if(e)for(let l in e){if(kr(l))continue;const c=e[l];let u;r&&ce(r,u=At(l))?!i||!i.includes(u)?n[u]=c:(a||(a={}))[u]=c:Xo(t.emitsOptions,l)||(!(l in s)||c!==s[l])&&(s[l]=c,o=!0)}if(i){const l=le(n),c=a||pe;for(let u=0;u<i.length;u++){const h=i[u];n[h]=Al(r,l,h,c[h],t,!ce(c,h))}}return o}function Al(t,e,n,s,r,i){const o=t[n];if(o!=null){const a=ce(o,"default");if(a&&s===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&J(l)){const{propsDefaults:c}=r;if(n in c)s=c[n];else{const u=yi(r);s=c[n]=l.call(null,e),u()}}else s=l;r.ce&&r.ce._setProp(n,s)}o[0]&&(i&&!a?s=!1:o[1]&&(s===""||s===gs(n))&&(s=!0))}return s}const qv=new WeakMap;function zd(t,e,n=!1){const s=n?qv:e.propsCache,r=s.get(t);if(r)return r;const i=t.props,o={},a=[];let l=!1;if(!J(t)){const u=h=>{l=!0;const[f,p]=zd(h,e,!0);Ze(o,f),p&&a.push(...p)};!n&&e.mixins.length&&e.mixins.forEach(u),t.extends&&u(t.extends),t.mixins&&t.mixins.forEach(u)}if(!i&&!l)return _e(t)&&s.set(t,Ds),Ds;if(Q(i))for(let u=0;u<i.length;u++){const h=At(i[u]);eh(h)&&(o[h]=pe)}else if(i)for(const u in i){const h=At(u);if(eh(h)){const f=i[u],p=o[h]=Q(f)||J(f)?{type:f}:Ze({},f),y=p.type;let E=!1,A=!0;if(Q(y))for(let N=0;N<y.length;++N){const R=y[N],M=J(R)&&R.name;if(M==="Boolean"){E=!0;break}else M==="String"&&(A=!1)}else E=J(y)&&y.name==="Boolean";p[0]=E,p[1]=A,(E||ce(p,"default"))&&a.push(h)}}const c=[o,a];return _e(t)&&s.set(t,c),c}function eh(t){return t[0]!=="$"&&!kr(t)}const Ac=t=>t==="_"||t==="_ctx"||t==="$stable",Cc=t=>Q(t)?t.map(Bt):[Bt(t)],zv=(t,e,n)=>{if(e._n)return e;const s=Zn((...r)=>Cc(e(...r)),n);return s._c=!1,s},Gd=(t,e,n)=>{const s=t._ctx;for(const r in t){if(Ac(r))continue;const i=t[r];if(J(i))e[r]=zv(r,i,s);else if(i!=null){const o=Cc(i);e[r]=()=>o}}},Wd=(t,e)=>{const n=Cc(e);t.slots.default=()=>n},Qd=(t,e,n)=>{for(const s in e)(n||!Ac(s))&&(t[s]=e[s])},Gv=(t,e,n)=>{const s=t.slots=Hd();if(t.vnode.shapeFlag&32){const r=e._;r?(Qd(s,e,n),n&&ad(s,"_",r,!0)):Gd(e,s)}else e&&Wd(t,e)},Wv=(t,e,n)=>{const{vnode:s,slots:r}=t;let i=!0,o=pe;if(s.shapeFlag&32){const a=e._;a?n&&a===1?i=!1:Qd(r,e,n):(i=!e.$stable,Gd(e,r)),o=e}else e&&(Wd(t,e),o={default:1});if(i)for(const a in r)!Ac(a)&&o[a]==null&&delete r[a]},gt=cw;function Qv(t){return Yv(t)}function Yv(t,e){const n=Go();n.__VUE__=!0;const{insert:s,remove:r,patchProp:i,createElement:o,createText:a,createComment:l,setText:c,setElementText:u,parentNode:h,nextSibling:f,setScopeId:p=Kt,insertStaticContent:y}=t,E=(d,g,m,w=null,I=null,v=null,O=void 0,k=null,C=!!g.dynamicChildren)=>{if(d===g)return;d&&!vr(d,g)&&(w=_(d),ct(d,I,v,!0),d=null),g.patchFlag===-2&&(C=!1,g.dynamicChildren=null);const{type:S,ref:K,shapeFlag:L}=g;switch(S){case Zo:A(d,g,m,w);break;case Vn:N(d,g,m,w);break;case Ha:d==null&&R(g,m,w,O);break;case Vt:Gn(d,g,m,w,I,v,O,k,C);break;default:L&1?ee(d,g,m,w,I,v,O,k,C):L&6?Ot(d,g,m,w,I,v,O,k,C):(L&64||L&128)&&S.process(d,g,m,w,I,v,O,k,C,B)}K!=null&&I?Or(K,d&&d.ref,v,g||d,!g):K==null&&d&&d.ref!=null&&Or(d.ref,null,v,d,!0)},A=(d,g,m,w)=>{if(d==null)s(g.el=a(g.children),m,w);else{const I=g.el=d.el;g.children!==d.children&&c(I,g.children)}},N=(d,g,m,w)=>{d==null?s(g.el=l(g.children||""),m,w):g.el=d.el},R=(d,g,m,w)=>{[d.el,d.anchor]=y(d.children,g,m,w,d.el,d.anchor)},M=({el:d,anchor:g},m,w)=>{let I;for(;d&&d!==g;)I=f(d),s(d,m,w),d=I;s(g,m,w)},x=({el:d,anchor:g})=>{let m;for(;d&&d!==g;)m=f(d),r(d),d=m;r(g)},ee=(d,g,m,w,I,v,O,k,C)=>{g.type==="svg"?O="svg":g.type==="math"&&(O="mathml"),d==null?ye(g,m,w,I,v,O,k,C):nt(d,g,I,v,O,k,C)},ye=(d,g,m,w,I,v,O,k)=>{let C,S;const{props:K,shapeFlag:L,transition:$,dirs:z}=d;if(C=d.el=o(d.type,v,K&&K.is,K),L&8?u(C,d.children):L&16&&lt(d.children,C,null,w,I,ja(d,v),O,k),z&&Qn(d,null,w,"created"),ue(C,d,d.scopeId,O,w),K){for(const ge in K)ge!=="value"&&!kr(ge)&&i(C,ge,null,K[ge],v,w);"value"in K&&i(C,"value",null,K.value,v),(S=K.onVnodeBeforeMount)&&Ut(S,w,d)}z&&Qn(d,null,w,"beforeMount");const ne=Jv(I,$);ne&&$.beforeEnter(C),s(C,g,m),((S=K&&K.onVnodeMounted)||ne||z)&&gt(()=>{S&&Ut(S,w,d),ne&&$.enter(C),z&&Qn(d,null,w,"mounted")},I)},ue=(d,g,m,w,I)=>{if(m&&p(d,m),w)for(let v=0;v<w.length;v++)p(d,w[v]);if(I){let v=I.subTree;if(g===v||tp(v.type)&&(v.ssContent===g||v.ssFallback===g)){const O=I.vnode;ue(d,O,O.scopeId,O.slotScopeIds,I.parent)}}},lt=(d,g,m,w,I,v,O,k,C=0)=>{for(let S=C;S<d.length;S++){const K=d[S]=k?Sn(d[S]):Bt(d[S]);E(null,K,g,m,w,I,v,O,k)}},nt=(d,g,m,w,I,v,O)=>{const k=g.el=d.el;let{patchFlag:C,dynamicChildren:S,dirs:K}=g;C|=d.patchFlag&16;const L=d.props||pe,$=g.props||pe;let z;if(m&&Yn(m,!1),(z=$.onVnodeBeforeUpdate)&&Ut(z,m,g,d),K&&Qn(g,d,m,"beforeUpdate"),m&&Yn(m,!0),(L.innerHTML&&$.innerHTML==null||L.textContent&&$.textContent==null)&&u(k,""),S?Et(d.dynamicChildren,S,k,m,w,ja(g,I),v):O||oe(d,g,k,null,m,w,ja(g,I),v,!1),C>0){if(C&16)wn(k,L,$,m,I);else if(C&2&&L.class!==$.class&&i(k,"class",null,$.class,I),C&4&&i(k,"style",L.style,$.style,I),C&8){const ne=g.dynamicProps;for(let ge=0;ge<ne.length;ge++){const he=ne[ge],ut=L[he],ht=$[he];(ht!==ut||he==="value")&&i(k,he,ut,ht,I,m)}}C&1&&d.children!==g.children&&u(k,g.children)}else!O&&S==null&&wn(k,L,$,m,I);((z=$.onVnodeUpdated)||K)&&gt(()=>{z&&Ut(z,m,g,d),K&&Qn(g,d,m,"updated")},w)},Et=(d,g,m,w,I,v,O)=>{for(let k=0;k<g.length;k++){const C=d[k],S=g[k],K=C.el&&(C.type===Vt||!vr(C,S)||C.shapeFlag&198)?h(C.el):m;E(C,S,K,null,w,I,v,O,!0)}},wn=(d,g,m,w,I)=>{if(g!==m){if(g!==pe)for(const v in g)!kr(v)&&!(v in m)&&i(d,v,g[v],null,I,w);for(const v in m){if(kr(v))continue;const O=m[v],k=g[v];O!==k&&v!=="value"&&i(d,v,k,O,I,w)}"value"in m&&i(d,"value",g.value,m.value,I)}},Gn=(d,g,m,w,I,v,O,k,C)=>{const S=g.el=d?d.el:a(""),K=g.anchor=d?d.anchor:a("");let{patchFlag:L,dynamicChildren:$,slotScopeIds:z}=g;z&&(k=k?k.concat(z):z),d==null?(s(S,m,w),s(K,m,w),lt(g.children||[],m,K,I,v,O,k,C)):L>0&&L&64&&$&&d.dynamicChildren?(Et(d.dynamicChildren,$,m,I,v,O,k),(g.key!=null||I&&g===I.subTree)&&Yd(d,g,!0)):oe(d,g,m,K,I,v,O,k,C)},Ot=(d,g,m,w,I,v,O,k,C)=>{g.slotScopeIds=k,d==null?g.shapeFlag&512?I.ctx.activate(g,m,w,O,C):gr(g,m,w,I,v,O,C):ws(d,g,C)},gr=(d,g,m,w,I,v,O)=>{const k=d.component=yw(d,w,I);if(Ld(d)&&(k.ctx.renderer=B),ww(k,!1,O),k.asyncDep){if(I&&I.registerDep(k,Me,O),!d.el){const C=k.subTree=ke(Vn);N(null,C,g,m),d.placeholder=C.el}}else Me(k,d,g,m,I,v,O)},ws=(d,g,m)=>{const w=g.component=d.component;if(aw(d,g,m))if(w.asyncDep&&!w.asyncResolved){de(w,g,m);return}else w.next=g,w.update();else g.el=d.el,w.vnode=g},Me=(d,g,m,w,I,v,O)=>{const k=()=>{if(d.isMounted){let{next:L,bu:$,u:z,parent:ne,vnode:ge}=d;{const Mt=Jd(d);if(Mt){L&&(L.el=ge.el,de(d,L,O)),Mt.asyncDep.then(()=>{d.isUnmounted||k()});return}}let he=L,ut;Yn(d,!1),L?(L.el=ge.el,de(d,L,O)):L=ge,$&&Ji($),(ut=L.props&&L.props.onVnodeBeforeUpdate)&&Ut(ut,ne,L,ge),Yn(d,!0);const ht=nh(d),Pt=d.subTree;d.subTree=ht,E(Pt,ht,h(Pt.el),_(Pt),d,I,v),L.el=ht.el,he===null&&lw(d,ht.el),z&&gt(z,I),(ut=L.props&&L.props.onVnodeUpdated)&&gt(()=>Ut(ut,ne,L,ge),I)}else{let L;const{el:$,props:z}=g,{bm:ne,m:ge,parent:he,root:ut,type:ht}=d,Pt=xr(g);Yn(d,!1),ne&&Ji(ne),!Pt&&(L=z&&z.onVnodeBeforeMount)&&Ut(L,he,g),Yn(d,!0);{ut.ce&&ut.ce._def.shadowRoot!==!1&&ut.ce._injectChildStyle(ht);const Mt=d.subTree=nh(d);E(null,Mt,m,w,d,I,v),g.el=Mt.el}if(ge&&gt(ge,I),!Pt&&(L=z&&z.onVnodeMounted)){const Mt=g;gt(()=>Ut(L,he,Mt),I)}(g.shapeFlag&256||he&&xr(he.vnode)&&he.vnode.shapeFlag&256)&&d.a&&gt(d.a,I),d.isMounted=!0,g=m=w=null}};d.scope.on();const C=d.effect=new hd(k);d.scope.off();const S=d.update=C.run.bind(C),K=d.job=C.runIfDirty.bind(C);K.i=d,K.id=d.uid,C.scheduler=()=>Sc(K),Yn(d,!0),S()},de=(d,g,m)=>{g.component=d;const w=d.vnode.props;d.vnode=g,d.next=null,Kv(d,g.props,w,m),Wv(d,g.children,m),un(),Gu(d),hn()},oe=(d,g,m,w,I,v,O,k,C=!1)=>{const S=d&&d.children,K=d?d.shapeFlag:0,L=g.children,{patchFlag:$,shapeFlag:z}=g;if($>0){if($&128){_n(S,L,m,w,I,v,O,k,C);return}else if($&256){Zt(S,L,m,w,I,v,O,k,C);return}}z&8?(K&16&&It(S,I,v),L!==S&&u(m,L)):K&16?z&16?_n(S,L,m,w,I,v,O,k,C):It(S,I,v,!0):(K&8&&u(m,""),z&16&&lt(L,m,w,I,v,O,k,C))},Zt=(d,g,m,w,I,v,O,k,C)=>{d=d||Ds,g=g||Ds;const S=d.length,K=g.length,L=Math.min(S,K);let $;for($=0;$<L;$++){const z=g[$]=C?Sn(g[$]):Bt(g[$]);E(d[$],z,m,null,I,v,O,k,C)}S>K?It(d,I,v,!0,!1,L):lt(g,m,w,I,v,O,k,C,L)},_n=(d,g,m,w,I,v,O,k,C)=>{let S=0;const K=g.length;let L=d.length-1,$=K-1;for(;S<=L&&S<=$;){const z=d[S],ne=g[S]=C?Sn(g[S]):Bt(g[S]);if(vr(z,ne))E(z,ne,m,null,I,v,O,k,C);else break;S++}for(;S<=L&&S<=$;){const z=d[L],ne=g[$]=C?Sn(g[$]):Bt(g[$]);if(vr(z,ne))E(z,ne,m,null,I,v,O,k,C);else break;L--,$--}if(S>L){if(S<=$){const z=$+1,ne=z<K?g[z].el:w;for(;S<=$;)E(null,g[S]=C?Sn(g[S]):Bt(g[S]),m,ne,I,v,O,k,C),S++}}else if(S>$)for(;S<=L;)ct(d[S],I,v,!0),S++;else{const z=S,ne=S,ge=new Map;for(S=ne;S<=$;S++){const pt=g[S]=C?Sn(g[S]):Bt(g[S]);pt.key!=null&&ge.set(pt.key,S)}let he,ut=0;const ht=$-ne+1;let Pt=!1,Mt=0;const mr=new Array(ht);for(S=0;S<ht;S++)mr[S]=0;for(S=z;S<=L;S++){const pt=d[S];if(ut>=ht){ct(pt,I,v,!0);continue}let Lt;if(pt.key!=null)Lt=ge.get(pt.key);else for(he=ne;he<=$;he++)if(mr[he-ne]===0&&vr(pt,g[he])){Lt=he;break}Lt===void 0?ct(pt,I,v,!0):(mr[Lt-ne]=S+1,Lt>=Mt?Mt=Lt:Pt=!0,E(pt,g[Lt],m,null,I,v,O,k,C),ut++)}const $u=Pt?Xv(mr):Ds;for(he=$u.length-1,S=ht-1;S>=0;S--){const pt=ne+S,Lt=g[pt],ju=g[pt+1],Hu=pt+1<K?ju.el||ju.placeholder:w;mr[S]===0?E(null,Lt,m,Hu,I,v,O,k,C):Pt&&(he<0||S!==$u[he]?xt(Lt,m,Hu,2):he--)}}},xt=(d,g,m,w,I=null)=>{const{el:v,type:O,transition:k,children:C,shapeFlag:S}=d;if(S&6){xt(d.component.subTree,g,m,w);return}if(S&128){d.suspense.move(g,m,w);return}if(S&64){O.move(d,g,m,B);return}if(O===Vt){s(v,g,m);for(let L=0;L<C.length;L++)xt(C[L],g,m,w);s(d.anchor,g,m);return}if(O===Ha){M(d,g,m);return}if(w!==2&&S&1&&k)if(w===0)k.beforeEnter(v),s(v,g,m),gt(()=>k.enter(v),I);else{const{leave:L,delayLeave:$,afterLeave:z}=k,ne=()=>{d.ctx.isUnmounted?r(v):s(v,g,m)},ge=()=>{v._isLeaving&&v[vv](!0),L(v,()=>{ne(),z&&z()})};$?$(v,ne,ge):ge()}else s(v,g,m)},ct=(d,g,m,w=!1,I=!1)=>{const{type:v,props:O,ref:k,children:C,dynamicChildren:S,shapeFlag:K,patchFlag:L,dirs:$,cacheIndex:z}=d;if(L===-2&&(I=!1),k!=null&&(un(),Or(k,null,m,d,!0),hn()),z!=null&&(g.renderCache[z]=void 0),K&256){g.ctx.deactivate(d);return}const ne=K&1&&$,ge=!xr(d);let he;if(ge&&(he=O&&O.onVnodeBeforeUnmount)&&Ut(he,g,d),K&6)Wn(d.component,m,w);else{if(K&128){d.suspense.unmount(m,w);return}ne&&Qn(d,null,g,"beforeUnmount"),K&64?d.type.remove(d,g,m,B,w):S&&!S.hasOnce&&(v!==Vt||L>0&&L&64)?It(S,g,m,!1,!0):(v===Vt&&L&384||!I&&K&16)&&It(C,g,m),w&&_s(d)}(ge&&(he=O&&O.onVnodeUnmounted)||ne)&&gt(()=>{he&&Ut(he,g,d),ne&&Qn(d,null,g,"unmounted")},m)},_s=d=>{const{type:g,el:m,anchor:w,transition:I}=d;if(g===Vt){Es(m,w);return}if(g===Ha){x(d);return}const v=()=>{r(m),I&&!I.persisted&&I.afterLeave&&I.afterLeave()};if(d.shapeFlag&1&&I&&!I.persisted){const{leave:O,delayLeave:k}=I,C=()=>O(m,v);k?k(d.el,v,C):C()}else v()},Es=(d,g)=>{let m;for(;d!==g;)m=f(d),r(d),d=m;r(g)},Wn=(d,g,m)=>{const{bum:w,scope:I,job:v,subTree:O,um:k,m:C,a:S}=d;th(C),th(S),w&&Ji(w),I.stop(),v&&(v.flags|=8,ct(O,d,g,m)),k&&gt(k,g),gt(()=>{d.isUnmounted=!0},g)},It=(d,g,m,w=!1,I=!1,v=0)=>{for(let O=v;O<d.length;O++)ct(d[O],g,m,w,I)},_=d=>{if(d.shapeFlag&6)return _(d.component.subTree);if(d.shapeFlag&128)return d.suspense.next();const g=f(d.anchor||d.el),m=g&&g[mv];return m?f(m):g};let U=!1;const P=(d,g,m)=>{d==null?g._vnode&&ct(g._vnode,null,null,!0):E(g._vnode||null,d,g,null,null,null,m),g._vnode=d,U||(U=!0,Gu(),Dd(),U=!1)},B={p:E,um:ct,m:xt,r:_s,mt:gr,mc:lt,pc:oe,pbc:Et,n:_,o:t};return{render:P,hydrate:void 0,createApp:jv(P)}}function ja({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function Yn({effect:t,job:e},n){n?(t.flags|=32,e.flags|=4):(t.flags&=-33,e.flags&=-5)}function Jv(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function Yd(t,e,n=!1){const s=t.children,r=e.children;if(Q(s)&&Q(r))for(let i=0;i<s.length;i++){const o=s[i];let a=r[i];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=r[i]=Sn(r[i]),a.el=o.el),!n&&a.patchFlag!==-2&&Yd(o,a)),a.type===Zo&&a.patchFlag!==-1&&(a.el=o.el),a.type===Vn&&!a.el&&(a.el=o.el)}}function Xv(t){const e=t.slice(),n=[0];let s,r,i,o,a;const l=t.length;for(s=0;s<l;s++){const c=t[s];if(c!==0){if(r=n[n.length-1],t[r]<c){e[s]=r,n.push(s);continue}for(i=0,o=n.length-1;i<o;)a=i+o>>1,t[n[a]]<c?i=a+1:o=a;c<t[n[i]]&&(i>0&&(e[s]=n[i-1]),n[i]=s)}}for(i=n.length,o=n[i-1];i-- >0;)n[i]=o,o=e[o];return n}function Jd(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:Jd(e)}function th(t){if(t)for(let e=0;e<t.length;e++)t[e].flags|=8}const Zv=Symbol.for("v-scx"),ew=()=>cn(Zv);function Zi(t,e,n){return Xd(t,e,n)}function Xd(t,e,n=pe){const{immediate:s,deep:r,flush:i,once:o}=n,a=Ze({},n),l=e&&s||!e&&i!=="post";let c;if(Wr){if(i==="sync"){const p=ew();c=p.__watcherHandles||(p.__watcherHandles=[])}else if(!l){const p=()=>{};return p.stop=Kt,p.resume=Kt,p.pause=Kt,p}}const u=Ge;a.call=(p,y,E)=>Yt(p,u,y,E);let h=!1;i==="post"?a.scheduler=p=>{gt(p,u&&u.suspense)}:i!=="sync"&&(h=!0,a.scheduler=(p,y)=>{y?p():Sc(p)}),a.augmentJob=p=>{e&&(p.flags|=4),h&&(p.flags|=2,u&&(p.id=u.uid,p.i=u))};const f=fv(t,e,a);return Wr&&(c?c.push(f):l&&f()),f}function tw(t,e,n){const s=this.proxy,r=Ne(t)?t.includes(".")?Zd(s,t):()=>s[t]:t.bind(s,s);let i;J(e)?i=e:(i=e.handler,n=e);const o=yi(this),a=Xd(r,i.bind(s),n);return o(),a}function Zd(t,e){const n=e.split(".");return()=>{let s=t;for(let r=0;r<n.length&&s;r++)s=s[n[r]];return s}}const nw=(t,e)=>e==="modelValue"||e==="model-value"?t.modelModifiers:t[`${e}Modifiers`]||t[`${At(e)}Modifiers`]||t[`${gs(e)}Modifiers`];function sw(t,e,...n){if(t.isUnmounted)return;const s=t.vnode.props||pe;let r=n;const i=e.startsWith("update:"),o=i&&nw(s,e.slice(7));o&&(o.trim&&(r=n.map(u=>Ne(u)?u.trim():u)),o.number&&(r=n.map(yl)));let a,l=s[a=La(e)]||s[a=La(At(e))];!l&&i&&(l=s[a=La(gs(e))]),l&&Yt(l,t,6,r);const c=s[a+"Once"];if(c){if(!t.emitted)t.emitted={};else if(t.emitted[a])return;t.emitted[a]=!0,Yt(c,t,6,r)}}const rw=new WeakMap;function ep(t,e,n=!1){const s=n?rw:e.emitsCache,r=s.get(t);if(r!==void 0)return r;const i=t.emits;let o={},a=!1;if(!J(t)){const l=c=>{const u=ep(c,e,!0);u&&(a=!0,Ze(o,u))};!n&&e.mixins.length&&e.mixins.forEach(l),t.extends&&l(t.extends),t.mixins&&t.mixins.forEach(l)}return!i&&!a?(_e(t)&&s.set(t,null),null):(Q(i)?i.forEach(l=>o[l]=null):Ze(o,i),_e(t)&&s.set(t,o),o)}function Xo(t,e){return!t||!Ho(e)?!1:(e=e.slice(2).replace(/Once$/,""),ce(t,e[0].toLowerCase()+e.slice(1))||ce(t,gs(e))||ce(t,e))}function nh(t){const{type:e,vnode:n,proxy:s,withProxy:r,propsOptions:[i],slots:o,attrs:a,emit:l,render:c,renderCache:u,props:h,data:f,setupState:p,ctx:y,inheritAttrs:E}=t,A=fo(t);let N,R;try{if(n.shapeFlag&4){const x=r||s,ee=x;N=Bt(c.call(ee,x,u,h,p,f,y)),R=a}else{const x=e;N=Bt(x.length>1?x(h,{attrs:a,slots:o,emit:l}):x(h,null)),R=e.props?a:iw(a)}}catch(x){Mr.length=0,Yo(x,t,1),N=ke(Vn)}let M=N;if(R&&E!==!1){const x=Object.keys(R),{shapeFlag:ee}=M;x.length&&ee&7&&(i&&x.some(pc)&&(R=ow(R,i)),M=Gs(M,R,!1,!0))}return n.dirs&&(M=Gs(M,null,!1,!0),M.dirs=M.dirs?M.dirs.concat(n.dirs):n.dirs),n.transition&&bc(M,n.transition),N=M,fo(A),N}const iw=t=>{let e;for(const n in t)(n==="class"||n==="style"||Ho(n))&&((e||(e={}))[n]=t[n]);return e},ow=(t,e)=>{const n={};for(const s in t)(!pc(s)||!(s.slice(9)in e))&&(n[s]=t[s]);return n};function aw(t,e,n){const{props:s,children:r,component:i}=t,{props:o,children:a,patchFlag:l}=e,c=i.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&l>=0){if(l&1024)return!0;if(l&16)return s?sh(s,o,c):!!o;if(l&8){const u=e.dynamicProps;for(let h=0;h<u.length;h++){const f=u[h];if(o[f]!==s[f]&&!Xo(c,f))return!0}}}else return(r||a)&&(!a||!a.$stable)?!0:s===o?!1:s?o?sh(s,o,c):!0:!!o;return!1}function sh(t,e,n){const s=Object.keys(e);if(s.length!==Object.keys(t).length)return!0;for(let r=0;r<s.length;r++){const i=s[r];if(e[i]!==t[i]&&!Xo(n,i))return!0}return!1}function lw({vnode:t,parent:e},n){for(;e;){const s=e.subTree;if(s.suspense&&s.suspense.activeBranch===t&&(s.el=t.el),s===t)(t=e.vnode).el=n,e=e.parent;else break}}const tp=t=>t.__isSuspense;function cw(t,e){e&&e.pendingBranch?Q(t)?e.effects.push(...t):e.effects.push(t):gv(t)}const Vt=Symbol.for("v-fgt"),Zo=Symbol.for("v-txt"),Vn=Symbol.for("v-cmt"),Ha=Symbol.for("v-stc"),Mr=[];let yt=null;function Re(t=!1){Mr.push(yt=t?null:[])}function uw(){Mr.pop(),yt=Mr[Mr.length-1]||null}let Gr=1;function yo(t,e=!1){Gr+=t,t<0&&yt&&e&&(yt.hasOnce=!0)}function np(t){return t.dynamicChildren=Gr>0?yt||Ds:null,uw(),Gr>0&&yt&&yt.push(t),t}function Oe(t,e,n,s,r,i){return np(F(t,e,n,s,r,i,!0))}function hw(t,e,n,s,r){return np(ke(t,e,n,s,r,!0))}function vo(t){return t?t.__v_isVNode===!0:!1}function vr(t,e){return t.type===e.type&&t.key===e.key}const sp=({key:t})=>t??null,eo=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?Ne(t)||Qe(t)||J(t)?{i:mt,r:t,k:e,f:!!n}:t:null);function F(t,e=null,n=null,s=0,r=null,i=t===Vt?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&sp(e),ref:e&&eo(e),scopeId:xd,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:s,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:mt};return a?(Rc(l,n),i&128&&t.normalize(l)):n&&(l.shapeFlag|=Ne(n)?8:16),Gr>0&&!o&&yt&&(l.patchFlag>0||i&6)&&l.patchFlag!==32&&yt.push(l),l}const ke=fw;function fw(t,e=null,n=null,s=0,r=null,i=!1){if((!t||t===Ov)&&(t=Vn),vo(t)){const a=Gs(t,e,!0);return n&&Rc(a,n),Gr>0&&!i&&yt&&(a.shapeFlag&6?yt[yt.indexOf(t)]=a:yt.push(a)),a.patchFlag=-2,a}if(Sw(t)&&(t=t.__vccOpts),e){e=dw(e);let{class:a,style:l}=e;a&&!Ne(a)&&(e.class=Wo(a)),_e(l)&&(Tc(l)&&!Q(l)&&(l=Ze({},l)),e.style=Hr(l))}const o=Ne(t)?1:tp(t)?128:yv(t)?64:_e(t)?4:J(t)?2:0;return F(t,e,n,s,r,o,i,!0)}function dw(t){return t?Tc(t)||Kd(t)?Ze({},t):t:null}function Gs(t,e,n=!1,s=!1){const{props:r,ref:i,patchFlag:o,children:a,transition:l}=t,c=e?pw(r||{},e):r,u={__v_isVNode:!0,__v_skip:!0,type:t.type,props:c,key:c&&sp(c),ref:e&&e.ref?n&&i?Q(i)?i.concat(eo(e)):[i,eo(e)]:eo(e):i,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:a,target:t.target,targetStart:t.targetStart,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==Vt?o===-1?16:o|16:o,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:l,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&Gs(t.ssContent),ssFallback:t.ssFallback&&Gs(t.ssFallback),placeholder:t.placeholder,el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce};return l&&s&&bc(u,l.clone(u)),u}function On(t=" ",e=0){return ke(Zo,null,t,e)}function xn(t="",e=!1){return e?(Re(),hw(Vn,null,t)):ke(Vn,null,t)}function Bt(t){return t==null||typeof t=="boolean"?ke(Vn):Q(t)?ke(Vt,null,t.slice()):vo(t)?Sn(t):ke(Zo,null,String(t))}function Sn(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:Gs(t)}function Rc(t,e){let n=0;const{shapeFlag:s}=t;if(e==null)e=null;else if(Q(e))n=16;else if(typeof e=="object")if(s&65){const r=e.default;r&&(r._c&&(r._d=!1),Rc(t,r()),r._c&&(r._d=!0));return}else{n=32;const r=e._;!r&&!Kd(e)?e._ctx=mt:r===3&&mt&&(mt.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else J(e)?(e={default:e,_ctx:mt},n=32):(e=String(e),s&64?(n=16,e=[On(e)]):n=8);t.children=e,t.shapeFlag|=n}function pw(...t){const e={};for(let n=0;n<t.length;n++){const s=t[n];for(const r in s)if(r==="class")e.class!==s.class&&(e.class=Wo([e.class,s.class]));else if(r==="style")e.style=Hr([e.style,s.style]);else if(Ho(r)){const i=e[r],o=s[r];o&&i!==o&&!(Q(i)&&i.includes(o))&&(e[r]=i?[].concat(i,o):o)}else r!==""&&(e[r]=s[r])}return e}function Ut(t,e,n,s=null){Yt(t,e,7,[n,s])}const gw=$d();let mw=0;function yw(t,e,n){const s=t.type,r=(e?e.appContext:t.appContext)||gw,i={uid:mw++,vnode:t,type:s,parent:e,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Fy(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(r.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:zd(s,r),emitsOptions:ep(s,r),emit:null,emitted:null,propsDefaults:pe,inheritAttrs:s.inheritAttrs,ctx:pe,data:pe,props:pe,attrs:pe,slots:pe,refs:pe,setupState:pe,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=e?e.root:i,i.emit=sw.bind(null,i),t.ce&&t.ce(i),i}let Ge=null;const vw=()=>Ge||mt;let wo,Cl;{const t=Go(),e=(n,s)=>{let r;return(r=t[n])||(r=t[n]=[]),r.push(s),i=>{r.length>1?r.forEach(o=>o(i)):r[0](i)}};wo=e("__VUE_INSTANCE_SETTERS__",n=>Ge=n),Cl=e("__VUE_SSR_SETTERS__",n=>Wr=n)}const yi=t=>{const e=Ge;return wo(t),t.scope.on(),()=>{t.scope.off(),wo(e)}},rh=()=>{Ge&&Ge.scope.off(),wo(null)};function rp(t){return t.vnode.shapeFlag&4}let Wr=!1;function ww(t,e=!1,n=!1){e&&Cl(e);const{props:s,children:r}=t.vnode,i=rp(t);Hv(t,s,i,e),Gv(t,r,n||e);const o=i?_w(t,e):void 0;return e&&Cl(!1),o}function _w(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=new Proxy(t.ctx,Mv);const{setup:s}=n;if(s){un();const r=t.setupContext=s.length>1?Iw(t):null,i=yi(t),o=mi(s,t,0,[t.props,r]),a=rd(o);if(hn(),i(),(a||t.sp)&&!xr(t)&&Md(t),a){if(o.then(rh,rh),e)return o.then(l=>{ih(t,l)}).catch(l=>{Yo(l,t,0)});t.asyncDep=o}else ih(t,o)}else ip(t)}function ih(t,e,n){J(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:_e(e)&&(t.setupState=Cd(e)),ip(t)}function ip(t,e,n){const s=t.type;t.render||(t.render=s.render||Kt);{const r=yi(t);un();try{Lv(t)}finally{hn(),r()}}}const Ew={get(t,e){return qe(t,"get",""),t[e]}};function Iw(t){const e=n=>{t.exposed=n||{}};return{attrs:new Proxy(t.attrs,Ew),slots:t.slots,emit:t.emit,expose:e}}function ea(t){return t.exposed?t.exposeProxy||(t.exposeProxy=new Proxy(Cd(rv(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in Pr)return Pr[n](t)},has(e,n){return n in e||n in Pr}})):t.proxy}function Tw(t,e=!0){return J(t)?t.displayName||t.name:t.name||e&&t.__name}function Sw(t){return J(t)&&"__vccOpts"in t}const Ct=(t,e)=>uv(t,e,Wr);function op(t,e,n){try{yo(-1);const s=arguments.length;return s===2?_e(e)&&!Q(e)?vo(e)?ke(t,null,[e]):ke(t,e):ke(t,null,e):(s>3?n=Array.prototype.slice.call(arguments,2):s===3&&vo(n)&&(n=[n]),ke(t,e,n))}finally{yo(1)}}const bw="3.5.22";/**
* @vue/runtime-dom v3.5.22
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Rl;const oh=typeof window<"u"&&window.trustedTypes;if(oh)try{Rl=oh.createPolicy("vue",{createHTML:t=>t})}catch{}const ap=Rl?t=>Rl.createHTML(t):t=>t,Aw="http://www.w3.org/2000/svg",Cw="http://www.w3.org/1998/Math/MathML",nn=typeof document<"u"?document:null,ah=nn&&nn.createElement("template"),Rw={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,s)=>{const r=e==="svg"?nn.createElementNS(Aw,t):e==="mathml"?nn.createElementNS(Cw,t):n?nn.createElement(t,{is:n}):nn.createElement(t);return t==="select"&&s&&s.multiple!=null&&r.setAttribute("multiple",s.multiple),r},createText:t=>nn.createTextNode(t),createComment:t=>nn.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>nn.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,s,r,i){const o=n?n.previousSibling:e.lastChild;if(r&&(r===i||r.nextSibling))for(;e.insertBefore(r.cloneNode(!0),n),!(r===i||!(r=r.nextSibling)););else{ah.innerHTML=ap(s==="svg"?`<svg>${t}</svg>`:s==="mathml"?`<math>${t}</math>`:t);const a=ah.content;if(s==="svg"||s==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}e.insertBefore(a,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},kw=Symbol("_vtc");function Nw(t,e,n){const s=t[kw];s&&(e=(e?[e,...s]:[...s]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const lh=Symbol("_vod"),Dw=Symbol("_vsh"),Ow=Symbol(""),xw=/(?:^|;)\s*display\s*:/;function Pw(t,e,n){const s=t.style,r=Ne(n);let i=!1;if(n&&!r){if(e)if(Ne(e))for(const o of e.split(";")){const a=o.slice(0,o.indexOf(":")).trim();n[a]==null&&to(s,a,"")}else for(const o in e)n[o]==null&&to(s,o,"");for(const o in n)o==="display"&&(i=!0),to(s,o,n[o])}else if(r){if(e!==n){const o=s[Ow];o&&(n+=";"+o),s.cssText=n,i=xw.test(n)}}else e&&t.removeAttribute("style");lh in t&&(t[lh]=i?s.display:"",t[Dw]&&(s.display="none"))}const ch=/\s*!important$/;function to(t,e,n){if(Q(n))n.forEach(s=>to(t,e,s));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const s=Mw(t,e);ch.test(n)?t.setProperty(gs(s),n.replace(ch,""),"important"):t[s]=n}}const uh=["Webkit","Moz","ms"],Ka={};function Mw(t,e){const n=Ka[e];if(n)return n;let s=At(e);if(s!=="filter"&&s in t)return Ka[e]=s;s=zo(s);for(let r=0;r<uh.length;r++){const i=uh[r]+s;if(i in t)return Ka[e]=i}return e}const hh="http://www.w3.org/1999/xlink";function fh(t,e,n,s,r,i=Uy(e)){s&&e.startsWith("xlink:")?n==null?t.removeAttributeNS(hh,e.slice(6,e.length)):t.setAttributeNS(hh,e,n):n==null||i&&!ld(n)?t.removeAttribute(e):t.setAttribute(e,i?"":Hn(n)?String(n):n)}function dh(t,e,n,s,r){if(e==="innerHTML"||e==="textContent"){n!=null&&(t[e]=e==="innerHTML"?ap(n):n);return}const i=t.tagName;if(e==="value"&&i!=="PROGRESS"&&!i.includes("-")){const a=i==="OPTION"?t.getAttribute("value")||"":t.value,l=n==null?t.type==="checkbox"?"on":"":String(n);(a!==l||!("_value"in t))&&(t.value=l),n==null&&t.removeAttribute(e),t._value=n;return}let o=!1;if(n===""||n==null){const a=typeof t[e];a==="boolean"?n=ld(n):n==null&&a==="string"?(n="",o=!0):a==="number"&&(n=0,o=!0)}try{t[e]=n}catch{}o&&t.removeAttribute(r||e)}function bs(t,e,n,s){t.addEventListener(e,n,s)}function Lw(t,e,n,s){t.removeEventListener(e,n,s)}const ph=Symbol("_vei");function Uw(t,e,n,s,r=null){const i=t[ph]||(t[ph]={}),o=i[e];if(s&&o)o.value=s;else{const[a,l]=Fw(e);if(s){const c=i[e]=$w(s,r);bs(t,a,c,l)}else o&&(Lw(t,a,o,l),i[e]=void 0)}}const gh=/(?:Once|Passive|Capture)$/;function Fw(t){let e;if(gh.test(t)){e={};let s;for(;s=t.match(gh);)t=t.slice(0,t.length-s[0].length),e[s[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):gs(t.slice(2)),e]}let qa=0;const Vw=Promise.resolve(),Bw=()=>qa||(Vw.then(()=>qa=0),qa=Date.now());function $w(t,e){const n=s=>{if(!s._vts)s._vts=Date.now();else if(s._vts<=n.attached)return;Yt(jw(s,n.value),e,5,[s])};return n.value=t,n.attached=Bw(),n}function jw(t,e){if(Q(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(s=>r=>!r._stopped&&s&&s(r))}else return e}const mh=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,Hw=(t,e,n,s,r,i)=>{const o=r==="svg";e==="class"?Nw(t,s,o):e==="style"?Pw(t,n,s):Ho(e)?pc(e)||Uw(t,e,n,s,i):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):Kw(t,e,s,o))?(dh(t,e,s),!t.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&fh(t,e,s,o,i,e!=="value")):t._isVueCE&&(/[A-Z]/.test(e)||!Ne(s))?dh(t,At(e),s,i,e):(e==="true-value"?t._trueValue=s:e==="false-value"&&(t._falseValue=s),fh(t,e,s,o))};function Kw(t,e,n,s){if(s)return!!(e==="innerHTML"||e==="textContent"||e in t&&mh(e)&&J(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="autocorrect"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const r=t.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return mh(e)&&Ne(n)?!1:e in t}const yh=t=>{const e=t.props["onUpdate:modelValue"]||!1;return Q(e)?n=>Ji(e,n):e};function qw(t){t.target.composing=!0}function vh(t){const e=t.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const za=Symbol("_assign"),Fs={created(t,{modifiers:{lazy:e,trim:n,number:s}},r){t[za]=yh(r);const i=s||r.props&&r.props.type==="number";bs(t,e?"change":"input",o=>{if(o.target.composing)return;let a=t.value;n&&(a=a.trim()),i&&(a=yl(a)),t[za](a)}),n&&bs(t,"change",()=>{t.value=t.value.trim()}),e||(bs(t,"compositionstart",qw),bs(t,"compositionend",vh),bs(t,"change",vh))},mounted(t,{value:e}){t.value=e??""},beforeUpdate(t,{value:e,oldValue:n,modifiers:{lazy:s,trim:r,number:i}},o){if(t[za]=yh(o),t.composing)return;const a=(i||t.type==="number")&&!/^0\d/.test(t.value)?yl(t.value):t.value,l=e??"";a!==l&&(document.activeElement===t&&t.type!=="range"&&(s&&e===n||r&&t.value.trim()===l)||(t.value=l))}},zw=["ctrl","shift","alt","meta"],Gw={stop:t=>t.stopPropagation(),prevent:t=>t.preventDefault(),self:t=>t.target!==t.currentTarget,ctrl:t=>!t.ctrlKey,shift:t=>!t.shiftKey,alt:t=>!t.altKey,meta:t=>!t.metaKey,left:t=>"button"in t&&t.button!==0,middle:t=>"button"in t&&t.button!==1,right:t=>"button"in t&&t.button!==2,exact:(t,e)=>zw.some(n=>t[`${n}Key`]&&!e.includes(n))},lp=(t,e)=>{const n=t._withMods||(t._withMods={}),s=e.join(".");return n[s]||(n[s]=(r,...i)=>{for(let o=0;o<e.length;o++){const a=Gw[e[o]];if(a&&a(r,e))return}return t(r,...i)})},Ww=Ze({patchProp:Hw},Rw);let wh;function Qw(){return wh||(wh=Qv(Ww))}const Yw=(...t)=>{const e=Qw().createApp(...t),{mount:n}=e;return e.mount=s=>{const r=Xw(s);if(!r)return;const i=e._component;!J(i)&&!i.render&&!i.template&&(i.template=r.innerHTML),r.nodeType===1&&(r.textContent="");const o=n(r,!1,Jw(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),o},e};function Jw(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function Xw(t){return Ne(t)?document.querySelector(t):t}var _h={};/**
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
 */const cp=function(t){const e=[];let n=0;for(let s=0;s<t.length;s++){let r=t.charCodeAt(s);r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):(r&64512)===55296&&s+1<t.length&&(t.charCodeAt(s+1)&64512)===56320?(r=65536+((r&1023)<<10)+(t.charCodeAt(++s)&1023),e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},Zw=function(t){const e=[];let n=0,s=0;for(;n<t.length;){const r=t[n++];if(r<128)e[s++]=String.fromCharCode(r);else if(r>191&&r<224){const i=t[n++];e[s++]=String.fromCharCode((r&31)<<6|i&63)}else if(r>239&&r<365){const i=t[n++],o=t[n++],a=t[n++],l=((r&7)<<18|(i&63)<<12|(o&63)<<6|a&63)-65536;e[s++]=String.fromCharCode(55296+(l>>10)),e[s++]=String.fromCharCode(56320+(l&1023))}else{const i=t[n++],o=t[n++];e[s++]=String.fromCharCode((r&15)<<12|(i&63)<<6|o&63)}}return e.join("")},up={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let r=0;r<t.length;r+=3){const i=t[r],o=r+1<t.length,a=o?t[r+1]:0,l=r+2<t.length,c=l?t[r+2]:0,u=i>>2,h=(i&3)<<4|a>>4;let f=(a&15)<<2|c>>6,p=c&63;l||(p=64,o||(f=64)),s.push(n[u],n[h],n[f],n[p])}return s.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(cp(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Zw(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let r=0;r<t.length;){const i=n[t.charAt(r++)],a=r<t.length?n[t.charAt(r)]:0;++r;const c=r<t.length?n[t.charAt(r)]:64;++r;const h=r<t.length?n[t.charAt(r)]:64;if(++r,i==null||a==null||c==null||h==null)throw new e_;const f=i<<2|a>>4;if(s.push(f),c!==64){const p=a<<4&240|c>>2;if(s.push(p),h!==64){const y=c<<6&192|h;s.push(y)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class e_ extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const t_=function(t){const e=cp(t);return up.encodeByteArray(e,!0)},_o=function(t){return t_(t).replace(/\./g,"")},hp=function(t){try{return up.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function n_(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const s_=()=>n_().__FIREBASE_DEFAULTS__,r_=()=>{if(typeof process>"u"||typeof _h>"u")return;const t=_h.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},i_=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&hp(t[1]);return e&&JSON.parse(e)},kc=()=>{try{return s_()||r_()||i_()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},fp=t=>{var e,n;return(n=(e=kc())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},o_=t=>{const e=fp(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),s]:[e.substring(0,n),s]},dp=()=>{var t;return(t=kc())===null||t===void 0?void 0:t.config},pp=t=>{var e;return(e=kc())===null||e===void 0?void 0:e[`_${t}`]};/**
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
 */class a_{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,s)=>{n?this.reject(n):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,s))}}}/**
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
 */function l_(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},s=e||"demo-project",r=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${s}`,aud:s,iat:r,exp:r+3600,auth_time:r,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},t);return[_o(JSON.stringify(n)),_o(JSON.stringify(o)),""].join(".")}/**
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
 */function et(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function c_(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(et())}function u_(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function h_(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function f_(){const t=et();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function d_(){try{return typeof indexedDB=="object"}catch{return!1}}function p_(){return new Promise((t,e)=>{try{let n=!0;const s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(s),t(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{var i;e(((i=r.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){e(n)}})}/**
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
 */const g_="FirebaseError";class vn extends Error{constructor(e,n,s){super(n),this.code=e,this.customData=s,this.name=g_,Object.setPrototypeOf(this,vn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,vi.prototype.create)}}class vi{constructor(e,n,s){this.service=e,this.serviceName=n,this.errors=s}create(e,...n){const s=n[0]||{},r=`${this.service}/${e}`,i=this.errors[e],o=i?m_(i,s):"Error",a=`${this.serviceName}: ${o} (${r}).`;return new vn(r,a,s)}}function m_(t,e){return t.replace(y_,(n,s)=>{const r=e[s];return r!=null?String(r):`<${s}?>`})}const y_=/\{\$([^}]+)}/g;function v_(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Eo(t,e){if(t===e)return!0;const n=Object.keys(t),s=Object.keys(e);for(const r of n){if(!s.includes(r))return!1;const i=t[r],o=e[r];if(Eh(i)&&Eh(o)){if(!Eo(i,o))return!1}else if(i!==o)return!1}for(const r of s)if(!n.includes(r))return!1;return!0}function Eh(t){return t!==null&&typeof t=="object"}/**
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
 */function wi(t){const e=[];for(const[n,s]of Object.entries(t))Array.isArray(s)?s.forEach(r=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(r))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}function Tr(t){const e={};return t.replace(/^\?/,"").split("&").forEach(s=>{if(s){const[r,i]=s.split("=");e[decodeURIComponent(r)]=decodeURIComponent(i)}}),e}function Sr(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function w_(t,e){const n=new __(t,e);return n.subscribe.bind(n)}class __{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,s){let r;if(e===void 0&&n===void 0&&s===void 0)throw new Error("Missing Observer.");E_(e,["next","error","complete"])?r=e:r={next:e,error:n,complete:s},r.next===void 0&&(r.next=Ga),r.error===void 0&&(r.error=Ga),r.complete===void 0&&(r.complete=Ga);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function E_(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function Ga(){}/**
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
 */function at(t){return t&&t._delegate?t._delegate:t}class as{constructor(e,n,s){this.name=e,this.instanceFactory=n,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const Xn="[DEFAULT]";/**
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
 */class I_{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const s=new a_;if(this.instancesDeferred.set(n,s),this.isInitialized(n)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:n});r&&s.resolve(r)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const s=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(s)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:s})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(S_(e))try{this.getOrInitializeService({instanceIdentifier:Xn})}catch{}for(const[n,s]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:r});s.resolve(i)}catch{}}}}clearInstance(e=Xn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Xn){return this.instances.has(e)}getOptions(e=Xn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:s,options:n});for(const[i,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(i);s===a&&o.resolve(r)}return r}onInit(e,n){var s;const r=this.normalizeInstanceIdentifier(n),i=(s=this.onInitCallbacks.get(r))!==null&&s!==void 0?s:new Set;i.add(e),this.onInitCallbacks.set(r,i);const o=this.instances.get(r);return o&&e(o,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const s=this.onInitCallbacks.get(n);if(s)for(const r of s)try{r(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:T_(e),options:n}),this.instances.set(e,s),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=Xn){return this.component?this.component.multipleInstances?e:Xn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function T_(t){return t===Xn?void 0:t}function S_(t){return t.instantiationMode==="EAGER"}/**
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
 */class b_{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new I_(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var re;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(re||(re={}));const A_={debug:re.DEBUG,verbose:re.VERBOSE,info:re.INFO,warn:re.WARN,error:re.ERROR,silent:re.SILENT},C_=re.INFO,R_={[re.DEBUG]:"log",[re.VERBOSE]:"log",[re.INFO]:"info",[re.WARN]:"warn",[re.ERROR]:"error"},k_=(t,e,...n)=>{if(e<t.logLevel)return;const s=new Date().toISOString(),r=R_[e];if(r)console[r](`[${s}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Nc{constructor(e){this.name=e,this._logLevel=C_,this._logHandler=k_,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in re))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?A_[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,re.DEBUG,...e),this._logHandler(this,re.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,re.VERBOSE,...e),this._logHandler(this,re.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,re.INFO,...e),this._logHandler(this,re.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,re.WARN,...e),this._logHandler(this,re.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,re.ERROR,...e),this._logHandler(this,re.ERROR,...e)}}const N_=(t,e)=>e.some(n=>t instanceof n);let Ih,Th;function D_(){return Ih||(Ih=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function O_(){return Th||(Th=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const gp=new WeakMap,kl=new WeakMap,mp=new WeakMap,Wa=new WeakMap,Dc=new WeakMap;function x_(t){const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(Pn(t.result)),r()},o=()=>{s(t.error),r()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&gp.set(n,t)}).catch(()=>{}),Dc.set(e,t),e}function P_(t){if(kl.has(t))return;const e=new Promise((n,s)=>{const r=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),r()},o=()=>{s(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});kl.set(t,e)}let Nl={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return kl.get(t);if(e==="objectStoreNames")return t.objectStoreNames||mp.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Pn(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function M_(t){Nl=t(Nl)}function L_(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const s=t.call(Qa(this),e,...n);return mp.set(s,e.sort?e.sort():[e]),Pn(s)}:O_().includes(t)?function(...e){return t.apply(Qa(this),e),Pn(gp.get(this))}:function(...e){return Pn(t.apply(Qa(this),e))}}function U_(t){return typeof t=="function"?L_(t):(t instanceof IDBTransaction&&P_(t),N_(t,D_())?new Proxy(t,Nl):t)}function Pn(t){if(t instanceof IDBRequest)return x_(t);if(Wa.has(t))return Wa.get(t);const e=U_(t);return e!==t&&(Wa.set(t,e),Dc.set(e,t)),e}const Qa=t=>Dc.get(t);function F_(t,e,{blocked:n,upgrade:s,blocking:r,terminated:i}={}){const o=indexedDB.open(t,e),a=Pn(o);return s&&o.addEventListener("upgradeneeded",l=>{s(Pn(o.result),l.oldVersion,l.newVersion,Pn(o.transaction),l)}),n&&o.addEventListener("blocked",l=>n(l.oldVersion,l.newVersion,l)),a.then(l=>{i&&l.addEventListener("close",()=>i()),r&&l.addEventListener("versionchange",c=>r(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const V_=["get","getKey","getAll","getAllKeys","count"],B_=["put","add","delete","clear"],Ya=new Map;function Sh(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Ya.get(e))return Ya.get(e);const n=e.replace(/FromIndex$/,""),s=e!==n,r=B_.includes(n);if(!(n in(s?IDBIndex:IDBObjectStore).prototype)||!(r||V_.includes(n)))return;const i=async function(o,...a){const l=this.transaction(o,r?"readwrite":"readonly");let c=l.store;return s&&(c=c.index(a.shift())),(await Promise.all([c[n](...a),r&&l.done]))[0]};return Ya.set(e,i),i}M_(t=>({...t,get:(e,n,s)=>Sh(e,n)||t.get(e,n,s),has:(e,n)=>!!Sh(e,n)||t.has(e,n)}));/**
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
 */class $_{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(j_(n)){const s=n.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(n=>n).join(" ")}}function j_(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Dl="@firebase/app",bh="0.9.13";/**
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
 */const ls=new Nc("@firebase/app"),H_="@firebase/app-compat",K_="@firebase/analytics-compat",q_="@firebase/analytics",z_="@firebase/app-check-compat",G_="@firebase/app-check",W_="@firebase/auth",Q_="@firebase/auth-compat",Y_="@firebase/database",J_="@firebase/database-compat",X_="@firebase/functions",Z_="@firebase/functions-compat",eE="@firebase/installations",tE="@firebase/installations-compat",nE="@firebase/messaging",sE="@firebase/messaging-compat",rE="@firebase/performance",iE="@firebase/performance-compat",oE="@firebase/remote-config",aE="@firebase/remote-config-compat",lE="@firebase/storage",cE="@firebase/storage-compat",uE="@firebase/firestore",hE="@firebase/firestore-compat",fE="firebase",dE="9.23.0";/**
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
 */const Ol="[DEFAULT]",pE={[Dl]:"fire-core",[H_]:"fire-core-compat",[q_]:"fire-analytics",[K_]:"fire-analytics-compat",[G_]:"fire-app-check",[z_]:"fire-app-check-compat",[W_]:"fire-auth",[Q_]:"fire-auth-compat",[Y_]:"fire-rtdb",[J_]:"fire-rtdb-compat",[X_]:"fire-fn",[Z_]:"fire-fn-compat",[eE]:"fire-iid",[tE]:"fire-iid-compat",[nE]:"fire-fcm",[sE]:"fire-fcm-compat",[rE]:"fire-perf",[iE]:"fire-perf-compat",[oE]:"fire-rc",[aE]:"fire-rc-compat",[lE]:"fire-gcs",[cE]:"fire-gcs-compat",[uE]:"fire-fst",[hE]:"fire-fst-compat","fire-js":"fire-js",[fE]:"fire-js-all"};/**
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
 */const Io=new Map,xl=new Map;function gE(t,e){try{t.container.addComponent(e)}catch(n){ls.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Ws(t){const e=t.name;if(xl.has(e))return ls.debug(`There were multiple attempts to register component ${e}.`),!1;xl.set(e,t);for(const n of Io.values())gE(n,t);return!0}function Oc(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}/**
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
 */const mE={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."},Mn=new vi("app","Firebase",mE);/**
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
 */class yE{constructor(e,n,s){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new as("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Mn.create("app-deleted",{appName:this._name})}}/**
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
 */const ir=dE;function yp(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const s=Object.assign({name:Ol,automaticDataCollectionEnabled:!1},e),r=s.name;if(typeof r!="string"||!r)throw Mn.create("bad-app-name",{appName:String(r)});if(n||(n=dp()),!n)throw Mn.create("no-options");const i=Io.get(r);if(i){if(Eo(n,i.options)&&Eo(s,i.config))return i;throw Mn.create("duplicate-app",{appName:r})}const o=new b_(r);for(const l of xl.values())o.addComponent(l);const a=new yE(n,s,o);return Io.set(r,a),a}function vp(t=Ol){const e=Io.get(t);if(!e&&t===Ol&&dp())return yp();if(!e)throw Mn.create("no-app",{appName:t});return e}function Ln(t,e,n){var s;let r=(s=pE[t])!==null&&s!==void 0?s:t;n&&(r+=`-${n}`);const i=r.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const a=[`Unable to register library "${r}" with version "${e}":`];i&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ls.warn(a.join(" "));return}Ws(new as(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
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
 */const vE="firebase-heartbeat-database",wE=1,Qr="firebase-heartbeat-store";let Ja=null;function wp(){return Ja||(Ja=F_(vE,wE,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(Qr)}}}).catch(t=>{throw Mn.create("idb-open",{originalErrorMessage:t.message})})),Ja}async function _E(t){try{return await(await wp()).transaction(Qr).objectStore(Qr).get(_p(t))}catch(e){if(e instanceof vn)ls.warn(e.message);else{const n=Mn.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});ls.warn(n.message)}}}async function Ah(t,e){try{const s=(await wp()).transaction(Qr,"readwrite");await s.objectStore(Qr).put(e,_p(t)),await s.done}catch(n){if(n instanceof vn)ls.warn(n.message);else{const s=Mn.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});ls.warn(s.message)}}}function _p(t){return`${t.name}!${t.options.appId}`}/**
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
 */const EE=1024,IE=30*24*60*60*1e3;class TE{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new bE(n),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Ch();if(this._heartbeatsCache===null&&(this._heartbeatsCache=await this._heartbeatsCachePromise),!(this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(r=>r.date===s)))return this._heartbeatsCache.heartbeats.push({date:s,agent:n}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(r=>{const i=new Date(r.date).valueOf();return Date.now()-i<=IE}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache===null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Ch(),{heartbeatsToSend:n,unsentEntries:s}=SE(this._heartbeatsCache.heartbeats),r=_o(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}}function Ch(){return new Date().toISOString().substring(0,10)}function SE(t,e=EE){const n=[];let s=t.slice();for(const r of t){const i=n.find(o=>o.agent===r.agent);if(i){if(i.dates.push(r.date),Rh(n)>e){i.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),Rh(n)>e){n.pop();break}s=s.slice(1)}return{heartbeatsToSend:n,unsentEntries:s}}class bE{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return d_()?p_().then(()=>!0).catch(()=>!1):!1}async read(){return await this._canUseIndexedDBPromise?await _E(this.app)||{heartbeats:[]}:{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const r=await this.read();return Ah(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const r=await this.read();return Ah(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Rh(t){return _o(JSON.stringify({version:2,heartbeats:t})).length}/**
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
 */function AE(t){Ws(new as("platform-logger",e=>new $_(e),"PRIVATE")),Ws(new as("heartbeat",e=>new TE(e),"PRIVATE")),Ln(Dl,bh,t),Ln(Dl,bh,"esm2017"),Ln("fire-js","")}AE("");var CE="firebase",RE="9.23.0";/**
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
 */Ln(CE,RE,"app");function xc(t,e){var n={};for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&e.indexOf(s)<0&&(n[s]=t[s]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,s=Object.getOwnPropertySymbols(t);r<s.length;r++)e.indexOf(s[r])<0&&Object.prototype.propertyIsEnumerable.call(t,s[r])&&(n[s[r]]=t[s[r]]);return n}function Ep(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const kE=Ep,Ip=new vi("auth","Firebase",Ep());/**
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
 */const To=new Nc("@firebase/auth");function NE(t,...e){To.logLevel<=re.WARN&&To.warn(`Auth (${ir}): ${t}`,...e)}function no(t,...e){To.logLevel<=re.ERROR&&To.error(`Auth (${ir}): ${t}`,...e)}/**
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
 */function kt(t,...e){throw Pc(t,...e)}function zt(t,...e){return Pc(t,...e)}function DE(t,e,n){const s=Object.assign(Object.assign({},kE()),{[e]:n});return new vi("auth","Firebase",s).create(e,{appName:t.name})}function Pc(t,...e){if(typeof t!="string"){const n=e[0],s=[...e.slice(1)];return s[0]&&(s[0].appName=t.name),t._errorFactory.create(n,...s)}return Ip.create(t,...e)}function q(t,e,...n){if(!t)throw Pc(e,...n)}function on(t){const e="INTERNAL ASSERTION FAILED: "+t;throw no(e),new Error(e)}function fn(t,e){t||on(e)}/**
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
 */function Pl(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function OE(){return kh()==="http:"||kh()==="https:"}function kh(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
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
 */function xE(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(OE()||u_()||"connection"in navigator)?navigator.onLine:!0}function PE(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
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
 */class _i{constructor(e,n){this.shortDelay=e,this.longDelay=n,fn(n>e,"Short delay should be less than long delay!"),this.isMobile=c_()||h_()}get(){return xE()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Mc(t,e){fn(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
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
 */class Tp{static initialize(e,n,s){this.fetchImpl=e,n&&(this.headersImpl=n),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;on("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;on("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;on("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const ME={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const LE=new _i(3e4,6e4);function or(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function ar(t,e,n,s,r={}){return Sp(t,r,async()=>{let i={},o={};s&&(e==="GET"?o=s:i={body:JSON.stringify(s)});const a=wi(Object.assign({key:t.config.apiKey},o)).slice(1),l=await t._getAdditionalHeaders();return l["Content-Type"]="application/json",t.languageCode&&(l["X-Firebase-Locale"]=t.languageCode),Tp.fetch()(bp(t,t.config.apiHost,n,a),Object.assign({method:e,headers:l,referrerPolicy:"no-referrer"},i))})}async function Sp(t,e,n){t._canInitEmulator=!1;const s=Object.assign(Object.assign({},ME),e);try{const r=new UE(t),i=await Promise.race([n(),r.promise]);r.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw $i(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const a=i.ok?o.errorMessage:o.error.message,[l,c]=a.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw $i(t,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw $i(t,"email-already-in-use",o);if(l==="USER_DISABLED")throw $i(t,"user-disabled",o);const u=s[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw DE(t,u,c);kt(t,u)}}catch(r){if(r instanceof vn)throw r;kt(t,"network-request-failed",{message:String(r)})}}async function Ei(t,e,n,s,r={}){const i=await ar(t,e,n,s,r);return"mfaPendingCredential"in i&&kt(t,"multi-factor-auth-required",{_serverResponse:i}),i}function bp(t,e,n,s){const r=`${e}${n}?${s}`;return t.config.emulator?Mc(t.config,r):`${t.config.apiScheme}://${r}`}class UE{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,s)=>{this.timer=setTimeout(()=>s(zt(this.auth,"network-request-failed")),LE.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function $i(t,e,n){const s={appName:t.name};n.email&&(s.email=n.email),n.phoneNumber&&(s.phoneNumber=n.phoneNumber);const r=zt(t,e,s);return r.customData._tokenResponse=n,r}/**
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
 */async function FE(t,e){return ar(t,"POST","/v1/accounts:delete",e)}async function VE(t,e){return ar(t,"POST","/v1/accounts:lookup",e)}/**
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
 */function Lr(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function BE(t,e=!1){const n=at(t),s=await n.getIdToken(e),r=Lc(s);q(r&&r.exp&&r.auth_time&&r.iat,n.auth,"internal-error");const i=typeof r.firebase=="object"?r.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:r,token:s,authTime:Lr(Xa(r.auth_time)),issuedAtTime:Lr(Xa(r.iat)),expirationTime:Lr(Xa(r.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function Xa(t){return Number(t)*1e3}function Lc(t){const[e,n,s]=t.split(".");if(e===void 0||n===void 0||s===void 0)return no("JWT malformed, contained fewer than 3 sections"),null;try{const r=hp(n);return r?JSON.parse(r):(no("Failed to decode base64 JWT payload"),null)}catch(r){return no("Caught error parsing JWT payload as JSON",r==null?void 0:r.toString()),null}}function $E(t){const e=Lc(t);return q(e,"internal-error"),q(typeof e.exp<"u","internal-error"),q(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Yr(t,e,n=!1){if(n)return e;try{return await e}catch(s){throw s instanceof vn&&jE(s)&&t.auth.currentUser===t&&await t.auth.signOut(),s}}function jE({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
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
 */class HE{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const s=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),s}else{this.errorBackoff=3e4;const r=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class Ap{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Lr(this.lastLoginAt),this.creationTime=Lr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function So(t){var e;const n=t.auth,s=await t.getIdToken(),r=await Yr(t,VE(n,{idToken:s}));q(r==null?void 0:r.users.length,n,"internal-error");const i=r.users[0];t._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?zE(i.providerUserInfo):[],a=qE(t.providerData,o),l=t.isAnonymous,c=!(t.email&&i.passwordHash)&&!(a!=null&&a.length),u=l?c:!1,h={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:a,metadata:new Ap(i.createdAt,i.lastLoginAt),isAnonymous:u};Object.assign(t,h)}async function KE(t){const e=at(t);await So(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function qE(t,e){return[...t.filter(s=>!e.some(r=>r.providerId===s.providerId)),...e]}function zE(t){return t.map(e=>{var{providerId:n}=e,s=xc(e,["providerId"]);return{providerId:n,uid:s.rawId||"",displayName:s.displayName||null,email:s.email||null,phoneNumber:s.phoneNumber||null,photoURL:s.photoUrl||null}})}/**
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
 */async function GE(t,e){const n=await Sp(t,{},async()=>{const s=wi({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:r,apiKey:i}=t.config,o=bp(t,r,"/v1/token",`key=${i}`),a=await t._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",Tp.fetch()(o,{method:"POST",headers:a,body:s})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}/**
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
 */class Jr{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){q(e.idToken,"internal-error"),q(typeof e.idToken<"u","internal-error"),q(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):$E(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}async getToken(e,n=!1){return q(!this.accessToken||this.refreshToken,e,"user-token-expired"),!n&&this.accessToken&&!this.isExpired?this.accessToken:this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:s,refreshToken:r,expiresIn:i}=await GE(e,n);this.updateTokensAndExpiration(s,r,Number(i))}updateTokensAndExpiration(e,n,s){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(e,n){const{refreshToken:s,accessToken:r,expirationTime:i}=n,o=new Jr;return s&&(q(typeof s=="string","internal-error",{appName:e}),o.refreshToken=s),r&&(q(typeof r=="string","internal-error",{appName:e}),o.accessToken=r),i&&(q(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Jr,this.toJSON())}_performRefresh(){return on("not implemented")}}/**
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
 */function En(t,e){q(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class is{constructor(e){var{uid:n,auth:s,stsTokenManager:r}=e,i=xc(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new HE(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=s,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new Ap(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await Yr(this,this.stsTokenManager.getToken(this.auth,e));return q(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return BE(this,e)}reload(){return KE(this)}_assign(e){this!==e&&(q(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new is(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){q(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let s=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),s=!0),n&&await So(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){const e=await this.getIdToken();return await Yr(this,FE(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var s,r,i,o,a,l,c,u;const h=(s=n.displayName)!==null&&s!==void 0?s:void 0,f=(r=n.email)!==null&&r!==void 0?r:void 0,p=(i=n.phoneNumber)!==null&&i!==void 0?i:void 0,y=(o=n.photoURL)!==null&&o!==void 0?o:void 0,E=(a=n.tenantId)!==null&&a!==void 0?a:void 0,A=(l=n._redirectEventId)!==null&&l!==void 0?l:void 0,N=(c=n.createdAt)!==null&&c!==void 0?c:void 0,R=(u=n.lastLoginAt)!==null&&u!==void 0?u:void 0,{uid:M,emailVerified:x,isAnonymous:ee,providerData:ye,stsTokenManager:ue}=n;q(M&&ue,e,"internal-error");const lt=Jr.fromJSON(this.name,ue);q(typeof M=="string",e,"internal-error"),En(h,e.name),En(f,e.name),q(typeof x=="boolean",e,"internal-error"),q(typeof ee=="boolean",e,"internal-error"),En(p,e.name),En(y,e.name),En(E,e.name),En(A,e.name),En(N,e.name),En(R,e.name);const nt=new is({uid:M,auth:e,email:f,emailVerified:x,displayName:h,isAnonymous:ee,photoURL:y,phoneNumber:p,tenantId:E,stsTokenManager:lt,createdAt:N,lastLoginAt:R});return ye&&Array.isArray(ye)&&(nt.providerData=ye.map(Et=>Object.assign({},Et))),A&&(nt._redirectEventId=A),nt}static async _fromIdTokenResponse(e,n,s=!1){const r=new Jr;r.updateFromServerResponse(n);const i=new is({uid:n.localId,auth:e,stsTokenManager:r,isAnonymous:s});return await So(i),i}}/**
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
 */const Nh=new Map;function an(t){fn(t instanceof Function,"Expected a class definition");let e=Nh.get(t);return e?(fn(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Nh.set(t,e),e)}/**
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
 */class Cp{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Cp.type="NONE";const Dh=Cp;/**
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
 */function so(t,e,n){return`firebase:${t}:${e}:${n}`}class Vs{constructor(e,n,s){this.persistence=e,this.auth=n,this.userKey=s;const{config:r,name:i}=this.auth;this.fullUserKey=so(this.userKey,r.apiKey,i),this.fullPersistenceKey=so("persistence",r.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?is._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,s="authUser"){if(!n.length)return new Vs(an(Dh),e,s);const r=(await Promise.all(n.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let i=r[0]||an(Dh);const o=so(s,e.config.apiKey,e.name);let a=null;for(const c of n)try{const u=await c._get(o);if(u){const h=is._fromJSON(e,u);c!==i&&(a=h),i=c;break}}catch{}const l=r.filter(c=>c._shouldAllowMigration);return!i._shouldAllowMigration||!l.length?new Vs(i,e,s):(i=l[0],a&&await i._set(o,a.toJSON()),await Promise.all(n.map(async c=>{if(c!==i)try{await c._remove(o)}catch{}})),new Vs(i,e,s))}}/**
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
 */function Oh(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Np(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Rp(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Op(e))return"Blackberry";if(xp(e))return"Webos";if(Uc(e))return"Safari";if((e.includes("chrome/")||kp(e))&&!e.includes("edge/"))return"Chrome";if(Dp(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=t.match(n);if((s==null?void 0:s.length)===2)return s[1]}return"Other"}function Rp(t=et()){return/firefox\//i.test(t)}function Uc(t=et()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function kp(t=et()){return/crios\//i.test(t)}function Np(t=et()){return/iemobile/i.test(t)}function Dp(t=et()){return/android/i.test(t)}function Op(t=et()){return/blackberry/i.test(t)}function xp(t=et()){return/webos/i.test(t)}function ta(t=et()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function WE(t=et()){var e;return ta(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function QE(){return f_()&&document.documentMode===10}function Pp(t=et()){return ta(t)||Dp(t)||xp(t)||Op(t)||/windows phone/i.test(t)||Np(t)}function YE(){try{return!!(window&&window!==window.top)}catch{return!1}}/**
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
 */function Mp(t,e=[]){let n;switch(t){case"Browser":n=Oh(et());break;case"Worker":n=`${Oh(et())}-${t}`;break;default:n=t}const s=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${ir}/${s}`}async function Lp(t,e){return ar(t,"GET","/v2/recaptchaConfig",or(t,e))}function xh(t){return t!==void 0&&t.enterprise!==void 0}class Up{constructor(e){if(this.siteKey="",this.emailPasswordEnabled=!1,e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.emailPasswordEnabled=e.recaptchaEnforcementState.some(n=>n.provider==="EMAIL_PASSWORD_PROVIDER"&&n.enforcementState!=="OFF")}}/**
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
 */function JE(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}function Fp(t){return new Promise((e,n)=>{const s=document.createElement("script");s.setAttribute("src",t),s.onload=e,s.onerror=r=>{const i=zt("internal-error");i.customData=r,n(i)},s.type="text/javascript",s.charset="UTF-8",JE().appendChild(s)})}function XE(t){return`__${t}${Math.floor(Math.random()*1e6)}`}const ZE="https://www.google.com/recaptcha/enterprise.js?render=",e0="recaptcha-enterprise",t0="NO_RECAPTCHA";class Vp{constructor(e){this.type=e0,this.auth=lr(e)}async verify(e="verify",n=!1){async function s(i){if(!n){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,a)=>{Lp(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)a(new Error("recaptcha Enterprise site key undefined"));else{const c=new Up(l);return i.tenantId==null?i._agentRecaptchaConfig=c:i._tenantRecaptchaConfigs[i.tenantId]=c,o(c.siteKey)}}).catch(l=>{a(l)})})}function r(i,o,a){const l=window.grecaptcha;xh(l)?l.enterprise.ready(()=>{l.enterprise.execute(i,{action:e}).then(c=>{o(c)}).catch(()=>{o(t0)})}):a(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((i,o)=>{s(this.auth).then(a=>{if(!n&&xh(window.grecaptcha))r(a,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}Fp(ZE+a).then(()=>{r(a,i,o)}).catch(l=>{o(l)})}}).catch(a=>{o(a)})})}}async function bo(t,e,n,s=!1){const r=new Vp(t);let i;try{i=await r.verify(n)}catch{i=await r.verify(n,!0)}const o=Object.assign({},e);return s?Object.assign(o,{captchaResp:i}):Object.assign(o,{captchaResponse:i}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}/**
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
 */class n0{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const s=i=>new Promise((o,a)=>{try{const l=e(i);o(l)}catch(l){a(l)}});s.onAbort=n,this.queue.push(s);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const s of this.queue)await s(e),s.onAbort&&n.push(s.onAbort)}catch(s){n.reverse();for(const r of n)try{r()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s==null?void 0:s.message})}}}/**
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
 */class s0{constructor(e,n,s,r){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=s,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Ph(this),this.idTokenSubscription=new Ph(this),this.beforeStateQueue=new n0(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Ip,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=an(n)),this._initializationPromise=this.queue(async()=>{var s,r;if(!this._deleted&&(this.persistenceManager=await Vs.create(this,e),!this._deleted)){if(!((s=this._popupRedirectResolver)===null||s===void 0)&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((r=this.currentUser)===null||r===void 0?void 0:r.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUser(e){var n;const s=await this.assertedPersistence.getCurrentUser();let r=s,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,a=r==null?void 0:r._redirectEventId,l=await this.tryRedirectSignIn(e);(!o||o===a)&&(l!=null&&l.user)&&(r=l.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(o){r=s,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return q(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await So(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=PE()}async _delete(){this._deleted=!0}async updateCurrentUser(e){const n=e?at(e):null;return n&&q(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&q(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0)}setPersistence(e){return this.queue(async()=>{await this.assertedPersistence.setPersistence(an(e))})}async initializeRecaptchaConfig(){const e=await Lp(this,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),n=new Up(e);this.tenantId==null?this._agentRecaptchaConfig=n:this._tenantRecaptchaConfigs[this.tenantId]=n,n.emailPasswordEnabled&&new Vp(this).verify()}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new vi("auth","Firebase",e())}onAuthStateChanged(e,n,s){return this.registerStateListener(this.authStateSubscription,e,n,s)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,s){return this.registerStateListener(this.idTokenSubscription,e,n,s)}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const s=await this.getOrInitRedirectPersistenceManager(n);return e===null?s.removeCurrentUser():s.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&an(e)||this._popupRedirectResolver;q(n,this,"argument-error"),this.redirectPersistenceManager=await Vs.create(this,[an(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,s;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((s=this.redirectUser)===null||s===void 0?void 0:s._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const s=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==s&&(this.lastNotifiedUid=s,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,s,r){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n),o=this._isInitialized?Promise.resolve():this._initializationPromise;return q(o,this,"internal-error"),o.then(()=>i(this.currentUser)),typeof n=="function"?e.addObserver(n,s,r):e.addObserver(n)}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return q(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Mp(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const s=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());s&&(n["X-Firebase-Client"]=s);const r=await this._getAppCheckToken();return r&&(n["X-Firebase-AppCheck"]=r),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&NE(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function lr(t){return at(t)}class Ph{constructor(e){this.auth=e,this.observer=null,this.addObserver=w_(n=>this.observer=n)}get next(){return q(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */function r0(t,e){const n=Oc(t,"auth");if(n.isInitialized()){const r=n.getImmediate(),i=n.getOptions();if(Eo(i,e??{}))return r;kt(r,"already-initialized")}return n.initialize({options:e})}function i0(t,e){const n=(e==null?void 0:e.persistence)||[],s=(Array.isArray(n)?n:[n]).map(an);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(s,e==null?void 0:e.popupRedirectResolver)}function o0(t,e,n){const s=lr(t);q(s._canInitEmulator,s,"emulator-config-failed"),q(/^https?:\/\//.test(e),s,"invalid-emulator-scheme");const r=!1,i=Bp(e),{host:o,port:a}=a0(e),l=a===null?"":`:${a}`;s.config.emulator={url:`${i}//${o}${l}/`},s.settings.appVerificationDisabledForTesting=!0,s.emulatorConfig=Object.freeze({host:o,port:a,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:r})}),l0()}function Bp(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function a0(t){const e=Bp(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const s=n[2].split("@").pop()||"",r=/^(\[[^\]]+\])(:|$)/.exec(s);if(r){const i=r[1];return{host:i,port:Mh(s.substr(i.length+1))}}else{const[i,o]=s.split(":");return{host:i,port:Mh(o)}}}function Mh(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function l0(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
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
 */class Fc{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return on("not implemented")}_getIdTokenResponse(e){return on("not implemented")}_linkToIdToken(e,n){return on("not implemented")}_getReauthenticationResolver(e){return on("not implemented")}}async function c0(t,e){return ar(t,"POST","/v1/accounts:update",e)}/**
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
 */async function Za(t,e){return Ei(t,"POST","/v1/accounts:signInWithPassword",or(t,e))}/**
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
 */async function u0(t,e){return Ei(t,"POST","/v1/accounts:signInWithEmailLink",or(t,e))}async function h0(t,e){return Ei(t,"POST","/v1/accounts:signInWithEmailLink",or(t,e))}/**
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
 */class Xr extends Fc{constructor(e,n,s,r=null){super("password",s),this._email=e,this._password=n,this._tenantId=r}static _fromEmailAndPassword(e,n){return new Xr(e,n,"password")}static _fromEmailAndCode(e,n,s=null){return new Xr(e,n,"emailLink",s)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){var n;switch(this.signInMethod){case"password":const s={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};if(!((n=e._getRecaptchaConfig())===null||n===void 0)&&n.emailPasswordEnabled){const r=await bo(e,s,"signInWithPassword");return Za(e,r)}else return Za(e,s).catch(async r=>{if(r.code==="auth/missing-recaptcha-token"){console.log("Sign-in with email address and password is protected by reCAPTCHA for this project. Automatically triggering the reCAPTCHA flow and restarting the sign-in flow.");const i=await bo(e,s,"signInWithPassword");return Za(e,i)}else return Promise.reject(r)});case"emailLink":return u0(e,{email:this._email,oobCode:this._password});default:kt(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":return c0(e,{idToken:n,returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return h0(e,{idToken:n,email:this._email,oobCode:this._password});default:kt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function Bs(t,e){return Ei(t,"POST","/v1/accounts:signInWithIdp",or(t,e))}/**
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
 */const f0="http://localhost";class cs extends Fc{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new cs(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):kt("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:s,signInMethod:r}=n,i=xc(n,["providerId","signInMethod"]);if(!s||!r)return null;const o=new cs(s,r);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Bs(e,n)}_linkToIdToken(e,n){const s=this.buildRequest();return s.idToken=n,Bs(e,s)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Bs(e,n)}buildRequest(){const e={requestUri:f0,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=wi(n)}return e}}/**
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
 */function d0(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function p0(t){const e=Tr(Sr(t)).link,n=e?Tr(Sr(e)).deep_link_id:null,s=Tr(Sr(t)).deep_link_id;return(s?Tr(Sr(s)).link:null)||s||n||e||t}class Vc{constructor(e){var n,s,r,i,o,a;const l=Tr(Sr(e)),c=(n=l.apiKey)!==null&&n!==void 0?n:null,u=(s=l.oobCode)!==null&&s!==void 0?s:null,h=d0((r=l.mode)!==null&&r!==void 0?r:null);q(c&&u&&h,"argument-error"),this.apiKey=c,this.operation=h,this.code=u,this.continueUrl=(i=l.continueUrl)!==null&&i!==void 0?i:null,this.languageCode=(o=l.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(a=l.tenantId)!==null&&a!==void 0?a:null}static parseLink(e){const n=p0(e);try{return new Vc(n)}catch{return null}}}/**
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
 */class cr{constructor(){this.providerId=cr.PROVIDER_ID}static credential(e,n){return Xr._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const s=Vc.parseLink(n);return q(s,"argument-error"),Xr._fromEmailAndCode(e,s.code,s.tenantId)}}cr.PROVIDER_ID="password";cr.EMAIL_PASSWORD_SIGN_IN_METHOD="password";cr.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class $p{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Ii extends $p{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class An extends Ii{constructor(){super("facebook.com")}static credential(e){return cs._fromParams({providerId:An.PROVIDER_ID,signInMethod:An.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return An.credentialFromTaggedObject(e)}static credentialFromError(e){return An.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return An.credential(e.oauthAccessToken)}catch{return null}}}An.FACEBOOK_SIGN_IN_METHOD="facebook.com";An.PROVIDER_ID="facebook.com";/**
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
 */class Cn extends Ii{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return cs._fromParams({providerId:Cn.PROVIDER_ID,signInMethod:Cn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Cn.credentialFromTaggedObject(e)}static credentialFromError(e){return Cn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:s}=e;if(!n&&!s)return null;try{return Cn.credential(n,s)}catch{return null}}}Cn.GOOGLE_SIGN_IN_METHOD="google.com";Cn.PROVIDER_ID="google.com";/**
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
 */class Rn extends Ii{constructor(){super("github.com")}static credential(e){return cs._fromParams({providerId:Rn.PROVIDER_ID,signInMethod:Rn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Rn.credentialFromTaggedObject(e)}static credentialFromError(e){return Rn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Rn.credential(e.oauthAccessToken)}catch{return null}}}Rn.GITHUB_SIGN_IN_METHOD="github.com";Rn.PROVIDER_ID="github.com";/**
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
 */class kn extends Ii{constructor(){super("twitter.com")}static credential(e,n){return cs._fromParams({providerId:kn.PROVIDER_ID,signInMethod:kn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return kn.credentialFromTaggedObject(e)}static credentialFromError(e){return kn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:s}=e;if(!n||!s)return null;try{return kn.credential(n,s)}catch{return null}}}kn.TWITTER_SIGN_IN_METHOD="twitter.com";kn.PROVIDER_ID="twitter.com";/**
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
 */async function el(t,e){return Ei(t,"POST","/v1/accounts:signUp",or(t,e))}/**
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
 */class us{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,s,r=!1){const i=await is._fromIdTokenResponse(e,s,r),o=Lh(s);return new us({user:i,providerId:o,_tokenResponse:s,operationType:n})}static async _forOperation(e,n,s){await e._updateTokensIfNecessary(s,!0);const r=Lh(s);return new us({user:e,providerId:r,_tokenResponse:s,operationType:n})}}function Lh(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
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
 */class Ao extends vn{constructor(e,n,s,r){var i;super(n.code,n.message),this.operationType=s,this.user=r,Object.setPrototypeOf(this,Ao.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:n.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(e,n,s,r){return new Ao(e,n,s,r)}}function jp(t,e,n,s){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Ao._fromErrorAndOperation(t,i,e,s):i})}async function g0(t,e,n=!1){const s=await Yr(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return us._forOperation(t,"link",s)}/**
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
 */async function m0(t,e,n=!1){const{auth:s}=t,r="reauthenticate";try{const i=await Yr(t,jp(s,r,e,t),n);q(i.idToken,s,"internal-error");const o=Lc(i.idToken);q(o,s,"internal-error");const{sub:a}=o;return q(t.uid===a,s,"user-mismatch"),us._forOperation(t,r,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&kt(s,"user-mismatch"),i}}/**
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
 */async function Hp(t,e,n=!1){const s="signIn",r=await jp(t,s,e),i=await us._fromIdTokenResponse(t,s,r);return n||await t._updateCurrentUser(i.user),i}async function y0(t,e){return Hp(lr(t),e)}async function v0(t,e,n){var s;const r=lr(t),i={returnSecureToken:!0,email:e,password:n,clientType:"CLIENT_TYPE_WEB"};let o;if(!((s=r._getRecaptchaConfig())===null||s===void 0)&&s.emailPasswordEnabled){const c=await bo(r,i,"signUpPassword");o=el(r,c)}else o=el(r,i).catch(async c=>{if(c.code==="auth/missing-recaptcha-token"){console.log("Sign-up is protected by reCAPTCHA for this project. Automatically triggering the reCAPTCHA flow and restarting the sign-up flow.");const u=await bo(r,i,"signUpPassword");return el(r,u)}else return Promise.reject(c)});const a=await o.catch(c=>Promise.reject(c)),l=await us._fromIdTokenResponse(r,"signIn",a);return await r._updateCurrentUser(l.user),l}function w0(t,e,n){return y0(at(t),cr.credential(e,n))}function _0(t,e,n,s){return at(t).onIdTokenChanged(e,n,s)}function E0(t,e,n){return at(t).beforeAuthStateChanged(e,n)}function Kp(t){return at(t).signOut()}const Co="__sak";/**
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
 */class qp{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Co,"1"),this.storage.removeItem(Co),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */function I0(){const t=et();return Uc(t)||ta(t)}const T0=1e3,S0=10;class zp extends qp{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=I0()&&YE(),this.fallbackToPolling=Pp(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const s=this.storage.getItem(n),r=this.localCache[n];s!==r&&e(n,r,s)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,a,l)=>{this.notifyListeners(o,l)});return}const s=e.key;if(n?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const o=this.storage.getItem(s);if(e.newValue!==o)e.newValue!==null?this.storage.setItem(s,e.newValue):this.storage.removeItem(s);else if(this.localCache[s]===e.newValue&&!n)return}const r=()=>{const o=this.storage.getItem(s);!n&&this.localCache[s]===o||this.notifyListeners(s,o)},i=this.storage.getItem(s);QE()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,S0):r()}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:s}),!0)})},T0)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}zp.type="LOCAL";const b0=zp;/**
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
 */class Gp extends qp{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}Gp.type="SESSION";const Wp=Gp;/**
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
 */function A0(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
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
 */class na{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(r=>r.isListeningto(e));if(n)return n;const s=new na(e);return this.receivers.push(s),s}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:s,eventType:r,data:i}=n.data,o=this.handlersMap[r];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:s,eventType:r});const a=Array.from(o).map(async c=>c(n.origin,i)),l=await A0(a);n.ports[0].postMessage({status:"done",eventId:s,eventType:r,response:l})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}na.receivers=[];/**
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
 */function Bc(t="",e=10){let n="";for(let s=0;s<e;s++)n+=Math.floor(Math.random()*10);return t+n}/**
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
 */class C0{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,s=50){const r=typeof MessageChannel<"u"?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let i,o;return new Promise((a,l)=>{const c=Bc("",20);r.port1.start();const u=setTimeout(()=>{l(new Error("unsupported_event"))},s);o={messageChannel:r,onMessage(h){const f=h;if(f.data.eventId===c)switch(f.data.status){case"ack":clearTimeout(u),i=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),a(f.data.response);break;default:clearTimeout(u),clearTimeout(i),l(new Error("invalid_response"));break}}},this.handlers.add(o),r.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:c,data:n},[r.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function Gt(){return window}function R0(t){Gt().location.href=t}/**
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
 */function Qp(){return typeof Gt().WorkerGlobalScope<"u"&&typeof Gt().importScripts=="function"}async function k0(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function N0(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function D0(){return Qp()?self:null}/**
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
 */const Yp="firebaseLocalStorageDb",O0=1,Ro="firebaseLocalStorage",Jp="fbase_key";class Ti{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function sa(t,e){return t.transaction([Ro],e?"readwrite":"readonly").objectStore(Ro)}function x0(){const t=indexedDB.deleteDatabase(Yp);return new Ti(t).toPromise()}function Ml(){const t=indexedDB.open(Yp,O0);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const s=t.result;try{s.createObjectStore(Ro,{keyPath:Jp})}catch(r){n(r)}}),t.addEventListener("success",async()=>{const s=t.result;s.objectStoreNames.contains(Ro)?e(s):(s.close(),await x0(),e(await Ml()))})})}async function Uh(t,e,n){const s=sa(t,!0).put({[Jp]:e,value:n});return new Ti(s).toPromise()}async function P0(t,e){const n=sa(t,!1).get(e),s=await new Ti(n).toPromise();return s===void 0?null:s.value}function Fh(t,e){const n=sa(t,!0).delete(e);return new Ti(n).toPromise()}const M0=800,L0=3;class Xp{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Ml(),this.db)}async _withRetries(e){let n=0;for(;;)try{const s=await this._openDb();return await e(s)}catch(s){if(n++>L0)throw s;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Qp()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=na._getInstance(D0()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await k0(),!this.activeServiceWorker)return;this.sender=new C0(this.activeServiceWorker);const s=await this.sender._send("ping",{},800);s&&!((e=s[0])===null||e===void 0)&&e.fulfilled&&!((n=s[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||N0()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Ml();return await Uh(e,Co,"1"),await Fh(e,Co),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(s=>Uh(s,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(s=>P0(s,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Fh(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(r=>{const i=sa(r,!1).getAll();return new Ti(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],s=new Set;for(const{fbase_key:r,value:i}of e)s.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),n.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!s.has(r)&&(this.notifyListeners(r,null),n.push(r));return n}notifyListeners(e,n){this.localCache[e]=n;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),M0)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Xp.type="LOCAL";const U0=Xp;new _i(3e4,6e4);/**
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
 */function F0(t,e){return e?an(e):(q(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
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
 */class $c extends Fc{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Bs(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Bs(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Bs(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function V0(t){return Hp(t.auth,new $c(t),t.bypassAuthState)}function B0(t){const{auth:e,user:n}=t;return q(n,e,"internal-error"),m0(n,new $c(t),t.bypassAuthState)}async function $0(t){const{auth:e,user:n}=t;return q(n,e,"internal-error"),g0(n,new $c(t),t.bypassAuthState)}/**
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
 */class Zp{constructor(e,n,s,r,i=!1){this.auth=e,this.resolver=s,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:s,postBody:r,tenantId:i,error:o,type:a}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:n,sessionId:s,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(l))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return V0;case"linkViaPopup":case"linkViaRedirect":return $0;case"reauthViaPopup":case"reauthViaRedirect":return B0;default:kt(this.auth,"internal-error")}}resolve(e){fn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){fn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const j0=new _i(2e3,1e4);class ks extends Zp{constructor(e,n,s,r,i){super(e,n,r,i),this.provider=s,this.authWindow=null,this.pollId=null,ks.currentPopupAction&&ks.currentPopupAction.cancel(),ks.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return q(e,this.auth,"internal-error"),e}async onExecution(){fn(this.filter.length===1,"Popup operations only handle one event");const e=Bc();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(zt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(zt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,ks.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,s;if(!((s=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||s===void 0)&&s.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(zt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,j0.get())};e()}}ks.currentPopupAction=null;/**
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
 */const H0="pendingRedirect",ro=new Map;class K0 extends Zp{constructor(e,n,s=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,s),this.eventId=null}async execute(){let e=ro.get(this.auth._key());if(!e){try{const s=await q0(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(s)}catch(n){e=()=>Promise.reject(n)}ro.set(this.auth._key(),e)}return this.bypassAuthState||ro.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function q0(t,e){const n=W0(e),s=G0(t);if(!await s._isAvailable())return!1;const r=await s._get(n)==="true";return await s._remove(n),r}function z0(t,e){ro.set(t._key(),e)}function G0(t){return an(t._redirectPersistence)}function W0(t){return so(H0,t.config.apiKey,t.name)}async function Q0(t,e,n=!1){const s=lr(t),r=F0(s,e),o=await new K0(s,r,n).execute();return o&&!n&&(delete o.user._redirectEventId,await s._persistUserIfCurrent(o.user),await s._setRedirectUser(null,e)),o}/**
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
 */const Y0=10*60*1e3;class J0{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(e,s)&&(n=!0,this.sendToConsumer(e,s),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!X0(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var s;if(e.error&&!eg(e)){const r=((s=e.error.code)===null||s===void 0?void 0:s.split("auth/")[1])||"internal-error";n.onError(zt(this.auth,r))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const s=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&s}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Y0&&this.cachedEventUids.clear(),this.cachedEventUids.has(Vh(e))}saveEventToCache(e){this.cachedEventUids.add(Vh(e)),this.lastProcessedEventTime=Date.now()}}function Vh(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function eg({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function X0(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return eg(t);default:return!1}}/**
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
 */async function Z0(t,e={}){return ar(t,"GET","/v1/projects",e)}/**
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
 */const eI=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,tI=/^https?/;async function nI(t){if(t.config.emulator)return;const{authorizedDomains:e}=await Z0(t);for(const n of e)try{if(sI(n))return}catch{}kt(t,"unauthorized-domain")}function sI(t){const e=Pl(),{protocol:n,hostname:s}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&s===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===s}if(!tI.test(n))return!1;if(eI.test(t))return s===t;const r=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+r+"|"+r+")$","i").test(s)}/**
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
 */const rI=new _i(3e4,6e4);function Bh(){const t=Gt().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function iI(t){return new Promise((e,n)=>{var s,r,i;function o(){Bh(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Bh(),n(zt(t,"network-request-failed"))},timeout:rI.get()})}if(!((r=(s=Gt().gapi)===null||s===void 0?void 0:s.iframes)===null||r===void 0)&&r.Iframe)e(gapi.iframes.getContext());else if(!((i=Gt().gapi)===null||i===void 0)&&i.load)o();else{const a=XE("iframefcb");return Gt()[a]=()=>{gapi.load?o():n(zt(t,"network-request-failed"))},Fp(`https://apis.google.com/js/api.js?onload=${a}`).catch(l=>n(l))}}).catch(e=>{throw io=null,e})}let io=null;function oI(t){return io=io||iI(t),io}/**
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
 */const aI=new _i(5e3,15e3),lI="__/auth/iframe",cI="emulator/auth/iframe",uI={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},hI=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function fI(t){const e=t.config;q(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Mc(e,cI):`https://${t.config.authDomain}/${lI}`,s={apiKey:e.apiKey,appName:t.name,v:ir},r=hI.get(t.config.apiHost);r&&(s.eid=r);const i=t._getFrameworks();return i.length&&(s.fw=i.join(",")),`${n}?${wi(s).slice(1)}`}async function dI(t){const e=await oI(t),n=Gt().gapi;return q(n,t,"internal-error"),e.open({where:document.body,url:fI(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:uI,dontclear:!0},s=>new Promise(async(r,i)=>{await s.restyle({setHideOnLeave:!1});const o=zt(t,"network-request-failed"),a=Gt().setTimeout(()=>{i(o)},aI.get());function l(){Gt().clearTimeout(a),r(s)}s.ping(l).then(l,()=>{i(o)})}))}/**
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
 */const pI={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},gI=500,mI=600,yI="_blank",vI="http://localhost";class $h{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function wI(t,e,n,s=gI,r=mI){const i=Math.max((window.screen.availHeight-r)/2,0).toString(),o=Math.max((window.screen.availWidth-s)/2,0).toString();let a="";const l=Object.assign(Object.assign({},pI),{width:s.toString(),height:r.toString(),top:i,left:o}),c=et().toLowerCase();n&&(a=kp(c)?yI:n),Rp(c)&&(e=e||vI,l.scrollbars="yes");const u=Object.entries(l).reduce((f,[p,y])=>`${f}${p}=${y},`,"");if(WE(c)&&a!=="_self")return _I(e||"",a),new $h(null);const h=window.open(e||"",a,u);q(h,t,"popup-blocked");try{h.focus()}catch{}return new $h(h)}function _I(t,e){const n=document.createElement("a");n.href=t,n.target=e;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(s)}/**
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
 */const EI="__/auth/handler",II="emulator/auth/handler",TI=encodeURIComponent("fac");async function jh(t,e,n,s,r,i){q(t.config.authDomain,t,"auth-domain-config-required"),q(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:s,v:ir,eventId:r};if(e instanceof $p){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",v_(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[u,h]of Object.entries({}))o[u]=h}if(e instanceof Ii){const u=e.getScopes().filter(h=>h!=="");u.length>0&&(o.scopes=u.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const u of Object.keys(a))a[u]===void 0&&delete a[u];const l=await t._getAppCheckToken(),c=l?`#${TI}=${encodeURIComponent(l)}`:"";return`${SI(t)}?${wi(a).slice(1)}${c}`}function SI({config:t}){return t.emulator?Mc(t,II):`https://${t.authDomain}/${EI}`}/**
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
 */const tl="webStorageSupport";class bI{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Wp,this._completeRedirectFn=Q0,this._overrideRedirectResult=z0}async _openPopup(e,n,s,r){var i;fn((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=await jh(e,n,s,Pl(),r);return wI(e,o,Bc())}async _openRedirect(e,n,s,r){await this._originValidation(e);const i=await jh(e,n,s,Pl(),r);return R0(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:r,promise:i}=this.eventManagers[n];return r?Promise.resolve(r):(fn(i,"If manager is not set, promise should be"),i)}const s=this.initAndGetManager(e);return this.eventManagers[n]={promise:s},s.catch(()=>{delete this.eventManagers[n]}),s}async initAndGetManager(e){const n=await dI(e),s=new J0(e);return n.register("authEvent",r=>(q(r==null?void 0:r.authEvent,e,"invalid-auth-event"),{status:s.onEvent(r.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:s},this.iframes[e._key()]=n,s}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(tl,{type:tl},r=>{var i;const o=(i=r==null?void 0:r[0])===null||i===void 0?void 0:i[tl];o!==void 0&&n(!!o),kt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=nI(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Pp()||Uc()||ta()}}const AI=bI;var Hh="@firebase/auth",Kh="0.23.2";/**
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
 */class CI{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(s=>{e((s==null?void 0:s.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){q(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function RI(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}function kI(t){Ws(new as("auth",(e,{options:n})=>{const s=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=s.options;q(o&&!o.includes(":"),"invalid-api-key",{appName:s.name});const l={apiKey:o,authDomain:a,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Mp(t)},c=new s0(s,r,i,l);return i0(c,n),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,s)=>{e.getProvider("auth-internal").initialize()})),Ws(new as("auth-internal",e=>{const n=lr(e.getProvider("auth").getImmediate());return(s=>new CI(s))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ln(Hh,Kh,RI(t)),Ln(Hh,Kh,"esm2017")}/**
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
 */const NI=5*60,DI=pp("authIdTokenMaxAge")||NI;let qh=null;const OI=t=>async e=>{const n=e&&await e.getIdTokenResult(),s=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(s&&s>DI)return;const r=n==null?void 0:n.token;qh!==r&&(qh=r,await fetch(t,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))};function xI(t=vp()){const e=Oc(t,"auth");if(e.isInitialized())return e.getImmediate();const n=r0(t,{popupRedirectResolver:AI,persistence:[U0,b0,Wp]}),s=pp("authTokenSyncURL");if(s){const i=OI(s);E0(n,i,()=>i(n.currentUser)),_0(n,o=>i(o))}const r=fp("auth");return r&&o0(n,`http://${r}`),n}kI("Browser");var PI=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},D,jc=jc||{},G=PI||self;function ra(t){var e=typeof t;return e=e!="object"?e:t?Array.isArray(t)?"array":e:"null",e=="array"||e=="object"&&typeof t.length=="number"}function ia(t){var e=typeof t;return e=="object"&&t!=null||e=="function"}function MI(t,e,n){return t.call.apply(t.bind,arguments)}function LI(t,e,n){if(!t)throw Error();if(2<arguments.length){var s=Array.prototype.slice.call(arguments,2);return function(){var r=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(r,s),t.apply(e,r)}}return function(){return t.apply(e,arguments)}}function Ye(t,e,n){return Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?Ye=MI:Ye=LI,Ye.apply(null,arguments)}function ji(t,e){var n=Array.prototype.slice.call(arguments,1);return function(){var s=n.slice();return s.push.apply(s,arguments),t.apply(this,s)}}function Fe(t,e){function n(){}n.prototype=e.prototype,t.$=e.prototype,t.prototype=new n,t.prototype.constructor=t,t.ac=function(s,r,i){for(var o=Array(arguments.length-2),a=2;a<arguments.length;a++)o[a-2]=arguments[a];return e.prototype[r].apply(s,o)}}function Kn(){this.s=this.s,this.o=this.o}var UI=0;Kn.prototype.s=!1;Kn.prototype.sa=function(){!this.s&&(this.s=!0,this.N(),UI!=0)};Kn.prototype.N=function(){if(this.o)for(;this.o.length;)this.o.shift()()};const tg=Array.prototype.indexOf?function(t,e){return Array.prototype.indexOf.call(t,e,void 0)}:function(t,e){if(typeof t=="string")return typeof e!="string"||e.length!=1?-1:t.indexOf(e,0);for(let n=0;n<t.length;n++)if(n in t&&t[n]===e)return n;return-1};function Hc(t){const e=t.length;if(0<e){const n=Array(e);for(let s=0;s<e;s++)n[s]=t[s];return n}return[]}function zh(t,e){for(let n=1;n<arguments.length;n++){const s=arguments[n];if(ra(s)){const r=t.length||0,i=s.length||0;t.length=r+i;for(let o=0;o<i;o++)t[r+o]=s[o]}else t.push(s)}}function Je(t,e){this.type=t,this.g=this.target=e,this.defaultPrevented=!1}Je.prototype.h=function(){this.defaultPrevented=!0};var FI=function(){if(!G.addEventListener||!Object.defineProperty)return!1;var t=!1,e=Object.defineProperty({},"passive",{get:function(){t=!0}});try{G.addEventListener("test",()=>{},e),G.removeEventListener("test",()=>{},e)}catch{}return t}();function Zr(t){return/^[\s\xa0]*$/.test(t)}function oa(){var t=G.navigator;return t&&(t=t.userAgent)?t:""}function $t(t){return oa().indexOf(t)!=-1}function Kc(t){return Kc[" "](t),t}Kc[" "]=function(){};function VI(t,e){var n=OT;return Object.prototype.hasOwnProperty.call(n,t)?n[t]:n[t]=e(t)}var BI=$t("Opera"),Qs=$t("Trident")||$t("MSIE"),ng=$t("Edge"),Ll=ng||Qs,sg=$t("Gecko")&&!(oa().toLowerCase().indexOf("webkit")!=-1&&!$t("Edge"))&&!($t("Trident")||$t("MSIE"))&&!$t("Edge"),$I=oa().toLowerCase().indexOf("webkit")!=-1&&!$t("Edge");function rg(){var t=G.document;return t?t.documentMode:void 0}var Ul;e:{var nl="",sl=function(){var t=oa();if(sg)return/rv:([^\);]+)(\)|;)/.exec(t);if(ng)return/Edge\/([\d\.]+)/.exec(t);if(Qs)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(t);if($I)return/WebKit\/(\S+)/.exec(t);if(BI)return/(?:Version)[ \/]?(\S+)/.exec(t)}();if(sl&&(nl=sl?sl[1]:""),Qs){var rl=rg();if(rl!=null&&rl>parseFloat(nl)){Ul=String(rl);break e}}Ul=nl}var Fl;if(G.document&&Qs){var Gh=rg();Fl=Gh||parseInt(Ul,10)||void 0}else Fl=void 0;var jI=Fl;function ei(t,e){if(Je.call(this,t?t.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,t){var n=this.type=t.type,s=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:null;if(this.target=t.target||t.srcElement,this.g=e,e=t.relatedTarget){if(sg){e:{try{Kc(e.nodeName);var r=!0;break e}catch{}r=!1}r||(e=null)}}else n=="mouseover"?e=t.fromElement:n=="mouseout"&&(e=t.toElement);this.relatedTarget=e,s?(this.clientX=s.clientX!==void 0?s.clientX:s.pageX,this.clientY=s.clientY!==void 0?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0):(this.clientX=t.clientX!==void 0?t.clientX:t.pageX,this.clientY=t.clientY!==void 0?t.clientY:t.pageY,this.screenX=t.screenX||0,this.screenY=t.screenY||0),this.button=t.button,this.key=t.key||"",this.ctrlKey=t.ctrlKey,this.altKey=t.altKey,this.shiftKey=t.shiftKey,this.metaKey=t.metaKey,this.pointerId=t.pointerId||0,this.pointerType=typeof t.pointerType=="string"?t.pointerType:HI[t.pointerType]||"",this.state=t.state,this.i=t,t.defaultPrevented&&ei.$.h.call(this)}}Fe(ei,Je);var HI={2:"touch",3:"pen",4:"mouse"};ei.prototype.h=function(){ei.$.h.call(this);var t=this.i;t.preventDefault?t.preventDefault():t.returnValue=!1};var aa="closure_listenable_"+(1e6*Math.random()|0),KI=0;function qI(t,e,n,s,r){this.listener=t,this.proxy=null,this.src=e,this.type=n,this.capture=!!s,this.la=r,this.key=++KI,this.fa=this.ia=!1}function la(t){t.fa=!0,t.listener=null,t.proxy=null,t.src=null,t.la=null}function qc(t,e,n){for(const s in t)e.call(n,t[s],s,t)}function zI(t,e){for(const n in t)e.call(void 0,t[n],n,t)}function ig(t){const e={};for(const n in t)e[n]=t[n];return e}const Wh="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function og(t,e){let n,s;for(let r=1;r<arguments.length;r++){s=arguments[r];for(n in s)t[n]=s[n];for(let i=0;i<Wh.length;i++)n=Wh[i],Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=s[n])}}function ca(t){this.src=t,this.g={},this.h=0}ca.prototype.add=function(t,e,n,s,r){var i=t.toString();t=this.g[i],t||(t=this.g[i]=[],this.h++);var o=Bl(t,e,s,r);return-1<o?(e=t[o],n||(e.ia=!1)):(e=new qI(e,this.src,i,!!s,r),e.ia=n,t.push(e)),e};function Vl(t,e){var n=e.type;if(n in t.g){var s=t.g[n],r=tg(s,e),i;(i=0<=r)&&Array.prototype.splice.call(s,r,1),i&&(la(e),t.g[n].length==0&&(delete t.g[n],t.h--))}}function Bl(t,e,n,s){for(var r=0;r<t.length;++r){var i=t[r];if(!i.fa&&i.listener==e&&i.capture==!!n&&i.la==s)return r}return-1}var zc="closure_lm_"+(1e6*Math.random()|0),il={};function ag(t,e,n,s,r){if(Array.isArray(e)){for(var i=0;i<e.length;i++)ag(t,e[i],n,s,r);return null}return n=ug(n),t&&t[aa]?t.O(e,n,ia(s)?!!s.capture:!1,r):GI(t,e,n,!1,s,r)}function GI(t,e,n,s,r,i){if(!e)throw Error("Invalid event type");var o=ia(r)?!!r.capture:!!r,a=Wc(t);if(a||(t[zc]=a=new ca(t)),n=a.add(e,n,s,o,i),n.proxy)return n;if(s=WI(),n.proxy=s,s.src=t,s.listener=n,t.addEventListener)FI||(r=o),r===void 0&&(r=!1),t.addEventListener(e.toString(),s,r);else if(t.attachEvent)t.attachEvent(cg(e.toString()),s);else if(t.addListener&&t.removeListener)t.addListener(s);else throw Error("addEventListener and attachEvent are unavailable.");return n}function WI(){function t(n){return e.call(t.src,t.listener,n)}const e=QI;return t}function lg(t,e,n,s,r){if(Array.isArray(e))for(var i=0;i<e.length;i++)lg(t,e[i],n,s,r);else s=ia(s)?!!s.capture:!!s,n=ug(n),t&&t[aa]?(t=t.i,e=String(e).toString(),e in t.g&&(i=t.g[e],n=Bl(i,n,s,r),-1<n&&(la(i[n]),Array.prototype.splice.call(i,n,1),i.length==0&&(delete t.g[e],t.h--)))):t&&(t=Wc(t))&&(e=t.g[e.toString()],t=-1,e&&(t=Bl(e,n,s,r)),(n=-1<t?e[t]:null)&&Gc(n))}function Gc(t){if(typeof t!="number"&&t&&!t.fa){var e=t.src;if(e&&e[aa])Vl(e.i,t);else{var n=t.type,s=t.proxy;e.removeEventListener?e.removeEventListener(n,s,t.capture):e.detachEvent?e.detachEvent(cg(n),s):e.addListener&&e.removeListener&&e.removeListener(s),(n=Wc(e))?(Vl(n,t),n.h==0&&(n.src=null,e[zc]=null)):la(t)}}}function cg(t){return t in il?il[t]:il[t]="on"+t}function QI(t,e){if(t.fa)t=!0;else{e=new ei(e,this);var n=t.listener,s=t.la||t.src;t.ia&&Gc(t),t=n.call(s,e)}return t}function Wc(t){return t=t[zc],t instanceof ca?t:null}var ol="__closure_events_fn_"+(1e9*Math.random()>>>0);function ug(t){return typeof t=="function"?t:(t[ol]||(t[ol]=function(e){return t.handleEvent(e)}),t[ol])}function Ue(){Kn.call(this),this.i=new ca(this),this.S=this,this.J=null}Fe(Ue,Kn);Ue.prototype[aa]=!0;Ue.prototype.removeEventListener=function(t,e,n,s){lg(this,t,e,n,s)};function je(t,e){var n,s=t.J;if(s)for(n=[];s;s=s.J)n.push(s);if(t=t.S,s=e.type||e,typeof e=="string")e=new Je(e,t);else if(e instanceof Je)e.target=e.target||t;else{var r=e;e=new Je(s,t),og(e,r)}if(r=!0,n)for(var i=n.length-1;0<=i;i--){var o=e.g=n[i];r=Hi(o,s,!0,e)&&r}if(o=e.g=t,r=Hi(o,s,!0,e)&&r,r=Hi(o,s,!1,e)&&r,n)for(i=0;i<n.length;i++)o=e.g=n[i],r=Hi(o,s,!1,e)&&r}Ue.prototype.N=function(){if(Ue.$.N.call(this),this.i){var t=this.i,e;for(e in t.g){for(var n=t.g[e],s=0;s<n.length;s++)la(n[s]);delete t.g[e],t.h--}}this.J=null};Ue.prototype.O=function(t,e,n,s){return this.i.add(String(t),e,!1,n,s)};Ue.prototype.P=function(t,e,n,s){return this.i.add(String(t),e,!0,n,s)};function Hi(t,e,n,s){if(e=t.i.g[String(e)],!e)return!0;e=e.concat();for(var r=!0,i=0;i<e.length;++i){var o=e[i];if(o&&!o.fa&&o.capture==n){var a=o.listener,l=o.la||o.src;o.ia&&Vl(t.i,o),r=a.call(l,s)!==!1&&r}}return r&&!s.defaultPrevented}var Qc=G.JSON.stringify;class YI{constructor(e,n){this.i=e,this.j=n,this.h=0,this.g=null}get(){let e;return 0<this.h?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}}function JI(){var t=Yc;let e=null;return t.g&&(e=t.g,t.g=t.g.next,t.g||(t.h=null),e.next=null),e}class XI{constructor(){this.h=this.g=null}add(e,n){const s=hg.get();s.set(e,n),this.h?this.h.next=s:this.g=s,this.h=s}}var hg=new YI(()=>new ZI,t=>t.reset());class ZI{constructor(){this.next=this.g=this.h=null}set(e,n){this.h=e,this.g=n,this.next=null}reset(){this.next=this.g=this.h=null}}function eT(t){var e=1;t=t.split(":");const n=[];for(;0<e&&t.length;)n.push(t.shift()),e--;return t.length&&n.push(t.join(":")),n}function tT(t){G.setTimeout(()=>{throw t},0)}let ti,ni=!1,Yc=new XI,fg=()=>{const t=G.Promise.resolve(void 0);ti=()=>{t.then(nT)}};var nT=()=>{for(var t;t=JI();){try{t.h.call(t.g)}catch(n){tT(n)}var e=hg;e.j(t),100>e.h&&(e.h++,t.next=e.g,e.g=t)}ni=!1};function ua(t,e){Ue.call(this),this.h=t||1,this.g=e||G,this.j=Ye(this.qb,this),this.l=Date.now()}Fe(ua,Ue);D=ua.prototype;D.ga=!1;D.T=null;D.qb=function(){if(this.ga){var t=Date.now()-this.l;0<t&&t<.8*this.h?this.T=this.g.setTimeout(this.j,this.h-t):(this.T&&(this.g.clearTimeout(this.T),this.T=null),je(this,"tick"),this.ga&&(Jc(this),this.start()))}};D.start=function(){this.ga=!0,this.T||(this.T=this.g.setTimeout(this.j,this.h),this.l=Date.now())};function Jc(t){t.ga=!1,t.T&&(t.g.clearTimeout(t.T),t.T=null)}D.N=function(){ua.$.N.call(this),Jc(this),delete this.g};function Xc(t,e,n){if(typeof t=="function")n&&(t=Ye(t,n));else if(t&&typeof t.handleEvent=="function")t=Ye(t.handleEvent,t);else throw Error("Invalid listener argument");return 2147483647<Number(e)?-1:G.setTimeout(t,e||0)}function dg(t){t.g=Xc(()=>{t.g=null,t.i&&(t.i=!1,dg(t))},t.j);const e=t.h;t.h=null,t.m.apply(null,e)}class sT extends Kn{constructor(e,n){super(),this.m=e,this.j=n,this.h=null,this.i=!1,this.g=null}l(e){this.h=arguments,this.g?this.i=!0:dg(this)}N(){super.N(),this.g&&(G.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function si(t){Kn.call(this),this.h=t,this.g={}}Fe(si,Kn);var Qh=[];function pg(t,e,n,s){Array.isArray(n)||(n&&(Qh[0]=n.toString()),n=Qh);for(var r=0;r<n.length;r++){var i=ag(e,n[r],s||t.handleEvent,!1,t.h||t);if(!i)break;t.g[i.key]=i}}function gg(t){qc(t.g,function(e,n){this.g.hasOwnProperty(n)&&Gc(e)},t),t.g={}}si.prototype.N=function(){si.$.N.call(this),gg(this)};si.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};function ha(){this.g=!0}ha.prototype.Ea=function(){this.g=!1};function rT(t,e,n,s,r,i){t.info(function(){if(t.g)if(i)for(var o="",a=i.split("&"),l=0;l<a.length;l++){var c=a[l].split("=");if(1<c.length){var u=c[0];c=c[1];var h=u.split("_");o=2<=h.length&&h[1]=="type"?o+(u+"="+c+"&"):o+(u+"=redacted&")}}else o=null;else o=i;return"XMLHTTP REQ ("+s+") [attempt "+r+"]: "+e+`
`+n+`
`+o})}function iT(t,e,n,s,r,i,o){t.info(function(){return"XMLHTTP RESP ("+s+") [ attempt "+r+"]: "+e+`
`+n+`
`+i+" "+o})}function Ns(t,e,n,s){t.info(function(){return"XMLHTTP TEXT ("+e+"): "+aT(t,n)+(s?" "+s:"")})}function oT(t,e){t.info(function(){return"TIMEOUT: "+e})}ha.prototype.info=function(){};function aT(t,e){if(!t.g)return e;if(!e)return null;try{var n=JSON.parse(e);if(n){for(t=0;t<n.length;t++)if(Array.isArray(n[t])){var s=n[t];if(!(2>s.length)){var r=s[1];if(Array.isArray(r)&&!(1>r.length)){var i=r[0];if(i!="noop"&&i!="stop"&&i!="close")for(var o=1;o<r.length;o++)r[o]=""}}}}return Qc(n)}catch{return e}}var ms={},Yh=null;function fa(){return Yh=Yh||new Ue}ms.Ta="serverreachability";function mg(t){Je.call(this,ms.Ta,t)}Fe(mg,Je);function ri(t){const e=fa();je(e,new mg(e))}ms.STAT_EVENT="statevent";function yg(t,e){Je.call(this,ms.STAT_EVENT,t),this.stat=e}Fe(yg,Je);function ot(t){const e=fa();je(e,new yg(e,t))}ms.Ua="timingevent";function vg(t,e){Je.call(this,ms.Ua,t),this.size=e}Fe(vg,Je);function Si(t,e){if(typeof t!="function")throw Error("Fn must not be null and must be a function");return G.setTimeout(function(){t()},e)}var da={NO_ERROR:0,rb:1,Eb:2,Db:3,yb:4,Cb:5,Fb:6,Qa:7,TIMEOUT:8,Ib:9},wg={wb:"complete",Sb:"success",Ra:"error",Qa:"abort",Kb:"ready",Lb:"readystatechange",TIMEOUT:"timeout",Gb:"incrementaldata",Jb:"progress",zb:"downloadprogress",$b:"uploadprogress"};function Zc(){}Zc.prototype.h=null;function Jh(t){return t.h||(t.h=t.i())}function _g(){}var bi={OPEN:"a",vb:"b",Ra:"c",Hb:"d"};function eu(){Je.call(this,"d")}Fe(eu,Je);function tu(){Je.call(this,"c")}Fe(tu,Je);var $l;function pa(){}Fe(pa,Zc);pa.prototype.g=function(){return new XMLHttpRequest};pa.prototype.i=function(){return{}};$l=new pa;function Ai(t,e,n,s){this.l=t,this.j=e,this.m=n,this.W=s||1,this.U=new si(this),this.P=lT,t=Ll?125:void 0,this.V=new ua(t),this.I=null,this.i=!1,this.s=this.A=this.v=this.L=this.G=this.Y=this.B=null,this.F=[],this.g=null,this.C=0,this.o=this.u=null,this.ca=-1,this.J=!1,this.O=0,this.M=null,this.ba=this.K=this.aa=this.S=!1,this.h=new Eg}function Eg(){this.i=null,this.g="",this.h=!1}var lT=45e3,jl={},ko={};D=Ai.prototype;D.setTimeout=function(t){this.P=t};function Hl(t,e,n){t.L=1,t.v=ma(dn(e)),t.s=n,t.S=!0,Ig(t,null)}function Ig(t,e){t.G=Date.now(),Ci(t),t.A=dn(t.v);var n=t.A,s=t.W;Array.isArray(s)||(s=[String(s)]),Ng(n.i,"t",s),t.C=0,n=t.l.J,t.h=new Eg,t.g=Jg(t.l,n?e:null,!t.s),0<t.O&&(t.M=new sT(Ye(t.Pa,t,t.g),t.O)),pg(t.U,t.g,"readystatechange",t.nb),e=t.I?ig(t.I):{},t.s?(t.u||(t.u="POST"),e["Content-Type"]="application/x-www-form-urlencoded",t.g.ha(t.A,t.u,t.s,e)):(t.u="GET",t.g.ha(t.A,t.u,null,e)),ri(),rT(t.j,t.u,t.A,t.m,t.W,t.s)}D.nb=function(t){t=t.target;const e=this.M;e&&jt(t)==3?e.l():this.Pa(t)};D.Pa=function(t){try{if(t==this.g)e:{const u=jt(this.g);var e=this.g.Ia();const h=this.g.da();if(!(3>u)&&(u!=3||Ll||this.g&&(this.h.h||this.g.ja()||tf(this.g)))){this.J||u!=4||e==7||(e==8||0>=h?ri(3):ri(2)),ga(this);var n=this.g.da();this.ca=n;t:if(Tg(this)){var s=tf(this.g);t="";var r=s.length,i=jt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){es(this),Ur(this);var o="";break t}this.h.i=new G.TextDecoder}for(e=0;e<r;e++)this.h.h=!0,t+=this.h.i.decode(s[e],{stream:i&&e==r-1});s.splice(0,r),this.h.g+=t,this.C=0,o=this.h.g}else o=this.g.ja();if(this.i=n==200,iT(this.j,this.u,this.A,this.m,this.W,u,n),this.i){if(this.aa&&!this.K){t:{if(this.g){var a,l=this.g;if((a=l.g?l.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!Zr(a)){var c=a;break t}}c=null}if(n=c)Ns(this.j,this.m,n,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Kl(this,n);else{this.i=!1,this.o=3,ot(12),es(this),Ur(this);break e}}this.S?(Sg(this,u,o),Ll&&this.i&&u==3&&(pg(this.U,this.V,"tick",this.mb),this.V.start())):(Ns(this.j,this.m,o,null),Kl(this,o)),u==4&&es(this),this.i&&!this.J&&(u==4?Gg(this.l,this):(this.i=!1,Ci(this)))}else kT(this.g),n==400&&0<o.indexOf("Unknown SID")?(this.o=3,ot(12)):(this.o=0,ot(13)),es(this),Ur(this)}}}catch{}finally{}};function Tg(t){return t.g?t.u=="GET"&&t.L!=2&&t.l.Ha:!1}function Sg(t,e,n){let s=!0,r;for(;!t.J&&t.C<n.length;)if(r=cT(t,n),r==ko){e==4&&(t.o=4,ot(14),s=!1),Ns(t.j,t.m,null,"[Incomplete Response]");break}else if(r==jl){t.o=4,ot(15),Ns(t.j,t.m,n,"[Invalid Chunk]"),s=!1;break}else Ns(t.j,t.m,r,null),Kl(t,r);Tg(t)&&r!=ko&&r!=jl&&(t.h.g="",t.C=0),e!=4||n.length!=0||t.h.h||(t.o=1,ot(16),s=!1),t.i=t.i&&s,s?0<n.length&&!t.ba&&(t.ba=!0,e=t.l,e.g==t&&e.ca&&!e.M&&(e.l.info("Great, no buffering proxy detected. Bytes received: "+n.length),au(e),e.M=!0,ot(11))):(Ns(t.j,t.m,n,"[Invalid Chunked Response]"),es(t),Ur(t))}D.mb=function(){if(this.g){var t=jt(this.g),e=this.g.ja();this.C<e.length&&(ga(this),Sg(this,t,e),this.i&&t!=4&&Ci(this))}};function cT(t,e){var n=t.C,s=e.indexOf(`
`,n);return s==-1?ko:(n=Number(e.substring(n,s)),isNaN(n)?jl:(s+=1,s+n>e.length?ko:(e=e.slice(s,s+n),t.C=s+n,e)))}D.cancel=function(){this.J=!0,es(this)};function Ci(t){t.Y=Date.now()+t.P,bg(t,t.P)}function bg(t,e){if(t.B!=null)throw Error("WatchDog timer not null");t.B=Si(Ye(t.lb,t),e)}function ga(t){t.B&&(G.clearTimeout(t.B),t.B=null)}D.lb=function(){this.B=null;const t=Date.now();0<=t-this.Y?(oT(this.j,this.A),this.L!=2&&(ri(),ot(17)),es(this),this.o=2,Ur(this)):bg(this,this.Y-t)};function Ur(t){t.l.H==0||t.J||Gg(t.l,t)}function es(t){ga(t);var e=t.M;e&&typeof e.sa=="function"&&e.sa(),t.M=null,Jc(t.V),gg(t.U),t.g&&(e=t.g,t.g=null,e.abort(),e.sa())}function Kl(t,e){try{var n=t.l;if(n.H!=0&&(n.g==t||ql(n.i,t))){if(!t.K&&ql(n.i,t)&&n.H==3){try{var s=n.Ja.g.parse(e)}catch{s=null}if(Array.isArray(s)&&s.length==3){var r=s;if(r[0]==0){e:if(!n.u){if(n.g)if(n.g.G+3e3<t.G)Oo(n),wa(n);else break e;ou(n),ot(18)}}else n.Fa=r[1],0<n.Fa-n.V&&37500>r[2]&&n.G&&n.A==0&&!n.v&&(n.v=Si(Ye(n.ib,n),6e3));if(1>=xg(n.i)&&n.oa){try{n.oa()}catch{}n.oa=void 0}}else ts(n,11)}else if((t.K||n.g==t)&&Oo(n),!Zr(e))for(r=n.Ja.g.parse(e),e=0;e<r.length;e++){let c=r[e];if(n.V=c[0],c=c[1],n.H==2)if(c[0]=="c"){n.K=c[1],n.pa=c[2];const u=c[3];u!=null&&(n.ra=u,n.l.info("VER="+n.ra));const h=c[4];h!=null&&(n.Ga=h,n.l.info("SVER="+n.Ga));const f=c[5];f!=null&&typeof f=="number"&&0<f&&(s=1.5*f,n.L=s,n.l.info("backChannelRequestTimeoutMs_="+s)),s=n;const p=t.g;if(p){const y=p.g?p.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(y){var i=s.i;i.g||y.indexOf("spdy")==-1&&y.indexOf("quic")==-1&&y.indexOf("h2")==-1||(i.j=i.l,i.g=new Set,i.h&&(nu(i,i.h),i.h=null))}if(s.F){const E=p.g?p.g.getResponseHeader("X-HTTP-Session-Id"):null;E&&(s.Da=E,ve(s.I,s.F,E))}}n.H=3,n.h&&n.h.Ba(),n.ca&&(n.S=Date.now()-t.G,n.l.info("Handshake RTT: "+n.S+"ms")),s=n;var o=t;if(s.wa=Yg(s,s.J?s.pa:null,s.Y),o.K){Pg(s.i,o);var a=o,l=s.L;l&&a.setTimeout(l),a.B&&(ga(a),Ci(a)),s.g=o}else qg(s);0<n.j.length&&_a(n)}else c[0]!="stop"&&c[0]!="close"||ts(n,7);else n.H==3&&(c[0]=="stop"||c[0]=="close"?c[0]=="stop"?ts(n,7):iu(n):c[0]!="noop"&&n.h&&n.h.Aa(c),n.A=0)}}ri(4)}catch{}}function uT(t){if(t.Z&&typeof t.Z=="function")return t.Z();if(typeof Map<"u"&&t instanceof Map||typeof Set<"u"&&t instanceof Set)return Array.from(t.values());if(typeof t=="string")return t.split("");if(ra(t)){for(var e=[],n=t.length,s=0;s<n;s++)e.push(t[s]);return e}e=[],n=0;for(s in t)e[n++]=t[s];return e}function hT(t){if(t.ta&&typeof t.ta=="function")return t.ta();if(!t.Z||typeof t.Z!="function"){if(typeof Map<"u"&&t instanceof Map)return Array.from(t.keys());if(!(typeof Set<"u"&&t instanceof Set)){if(ra(t)||typeof t=="string"){var e=[];t=t.length;for(var n=0;n<t;n++)e.push(n);return e}e=[],n=0;for(const s in t)e[n++]=s;return e}}}function Ag(t,e){if(t.forEach&&typeof t.forEach=="function")t.forEach(e,void 0);else if(ra(t)||typeof t=="string")Array.prototype.forEach.call(t,e,void 0);else for(var n=hT(t),s=uT(t),r=s.length,i=0;i<r;i++)e.call(void 0,s[i],n&&n[i],t)}var Cg=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function fT(t,e){if(t){t=t.split("&");for(var n=0;n<t.length;n++){var s=t[n].indexOf("="),r=null;if(0<=s){var i=t[n].substring(0,s);r=t[n].substring(s+1)}else i=t[n];e(i,r?decodeURIComponent(r.replace(/\+/g," ")):"")}}}function os(t){if(this.g=this.s=this.j="",this.m=null,this.o=this.l="",this.h=!1,t instanceof os){this.h=t.h,No(this,t.j),this.s=t.s,this.g=t.g,Do(this,t.m),this.l=t.l;var e=t.i,n=new ii;n.i=e.i,e.g&&(n.g=new Map(e.g),n.h=e.h),Xh(this,n),this.o=t.o}else t&&(e=String(t).match(Cg))?(this.h=!1,No(this,e[1]||"",!0),this.s=br(e[2]||""),this.g=br(e[3]||"",!0),Do(this,e[4]),this.l=br(e[5]||"",!0),Xh(this,e[6]||"",!0),this.o=br(e[7]||"")):(this.h=!1,this.i=new ii(null,this.h))}os.prototype.toString=function(){var t=[],e=this.j;e&&t.push(Ar(e,Zh,!0),":");var n=this.g;return(n||e=="file")&&(t.push("//"),(e=this.s)&&t.push(Ar(e,Zh,!0),"@"),t.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),n=this.m,n!=null&&t.push(":",String(n))),(n=this.l)&&(this.g&&n.charAt(0)!="/"&&t.push("/"),t.push(Ar(n,n.charAt(0)=="/"?gT:pT,!0))),(n=this.i.toString())&&t.push("?",n),(n=this.o)&&t.push("#",Ar(n,yT)),t.join("")};function dn(t){return new os(t)}function No(t,e,n){t.j=n?br(e,!0):e,t.j&&(t.j=t.j.replace(/:$/,""))}function Do(t,e){if(e){if(e=Number(e),isNaN(e)||0>e)throw Error("Bad port number "+e);t.m=e}else t.m=null}function Xh(t,e,n){e instanceof ii?(t.i=e,vT(t.i,t.h)):(n||(e=Ar(e,mT)),t.i=new ii(e,t.h))}function ve(t,e,n){t.i.set(e,n)}function ma(t){return ve(t,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),t}function br(t,e){return t?e?decodeURI(t.replace(/%25/g,"%2525")):decodeURIComponent(t):""}function Ar(t,e,n){return typeof t=="string"?(t=encodeURI(t).replace(e,dT),n&&(t=t.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t):null}function dT(t){return t=t.charCodeAt(0),"%"+(t>>4&15).toString(16)+(t&15).toString(16)}var Zh=/[#\/\?@]/g,pT=/[#\?:]/g,gT=/[#\?]/g,mT=/[#\?@]/g,yT=/#/g;function ii(t,e){this.h=this.g=null,this.i=t||null,this.j=!!e}function qn(t){t.g||(t.g=new Map,t.h=0,t.i&&fT(t.i,function(e,n){t.add(decodeURIComponent(e.replace(/\+/g," ")),n)}))}D=ii.prototype;D.add=function(t,e){qn(this),this.i=null,t=ur(this,t);var n=this.g.get(t);return n||this.g.set(t,n=[]),n.push(e),this.h+=1,this};function Rg(t,e){qn(t),e=ur(t,e),t.g.has(e)&&(t.i=null,t.h-=t.g.get(e).length,t.g.delete(e))}function kg(t,e){return qn(t),e=ur(t,e),t.g.has(e)}D.forEach=function(t,e){qn(this),this.g.forEach(function(n,s){n.forEach(function(r){t.call(e,r,s,this)},this)},this)};D.ta=function(){qn(this);const t=Array.from(this.g.values()),e=Array.from(this.g.keys()),n=[];for(let s=0;s<e.length;s++){const r=t[s];for(let i=0;i<r.length;i++)n.push(e[s])}return n};D.Z=function(t){qn(this);let e=[];if(typeof t=="string")kg(this,t)&&(e=e.concat(this.g.get(ur(this,t))));else{t=Array.from(this.g.values());for(let n=0;n<t.length;n++)e=e.concat(t[n])}return e};D.set=function(t,e){return qn(this),this.i=null,t=ur(this,t),kg(this,t)&&(this.h-=this.g.get(t).length),this.g.set(t,[e]),this.h+=1,this};D.get=function(t,e){return t?(t=this.Z(t),0<t.length?String(t[0]):e):e};function Ng(t,e,n){Rg(t,e),0<n.length&&(t.i=null,t.g.set(ur(t,e),Hc(n)),t.h+=n.length)}D.toString=function(){if(this.i)return this.i;if(!this.g)return"";const t=[],e=Array.from(this.g.keys());for(var n=0;n<e.length;n++){var s=e[n];const i=encodeURIComponent(String(s)),o=this.Z(s);for(s=0;s<o.length;s++){var r=i;o[s]!==""&&(r+="="+encodeURIComponent(String(o[s]))),t.push(r)}}return this.i=t.join("&")};function ur(t,e){return e=String(e),t.j&&(e=e.toLowerCase()),e}function vT(t,e){e&&!t.j&&(qn(t),t.i=null,t.g.forEach(function(n,s){var r=s.toLowerCase();s!=r&&(Rg(this,s),Ng(this,r,n))},t)),t.j=e}var wT=class{constructor(t,e){this.g=t,this.map=e}};function Dg(t){this.l=t||_T,G.PerformanceNavigationTiming?(t=G.performance.getEntriesByType("navigation"),t=0<t.length&&(t[0].nextHopProtocol=="hq"||t[0].nextHopProtocol=="h2")):t=!!(G.g&&G.g.Ka&&G.g.Ka()&&G.g.Ka().ec),this.j=t?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}var _T=10;function Og(t){return t.h?!0:t.g?t.g.size>=t.j:!1}function xg(t){return t.h?1:t.g?t.g.size:0}function ql(t,e){return t.h?t.h==e:t.g?t.g.has(e):!1}function nu(t,e){t.g?t.g.add(e):t.h=e}function Pg(t,e){t.h&&t.h==e?t.h=null:t.g&&t.g.has(e)&&t.g.delete(e)}Dg.prototype.cancel=function(){if(this.i=Mg(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const t of this.g.values())t.cancel();this.g.clear()}};function Mg(t){if(t.h!=null)return t.i.concat(t.h.F);if(t.g!=null&&t.g.size!==0){let e=t.i;for(const n of t.g.values())e=e.concat(n.F);return e}return Hc(t.i)}var ET=class{stringify(t){return G.JSON.stringify(t,void 0)}parse(t){return G.JSON.parse(t,void 0)}};function IT(){this.g=new ET}function TT(t,e,n){const s=n||"";try{Ag(t,function(r,i){let o=r;ia(r)&&(o=Qc(r)),e.push(s+i+"="+encodeURIComponent(o))})}catch(r){throw e.push(s+"type="+encodeURIComponent("_badmap")),r}}function ST(t,e){const n=new ha;if(G.Image){const s=new Image;s.onload=ji(Ki,n,s,"TestLoadImage: loaded",!0,e),s.onerror=ji(Ki,n,s,"TestLoadImage: error",!1,e),s.onabort=ji(Ki,n,s,"TestLoadImage: abort",!1,e),s.ontimeout=ji(Ki,n,s,"TestLoadImage: timeout",!1,e),G.setTimeout(function(){s.ontimeout&&s.ontimeout()},1e4),s.src=t}else e(!1)}function Ki(t,e,n,s,r){try{e.onload=null,e.onerror=null,e.onabort=null,e.ontimeout=null,r(s)}catch{}}function Ri(t){this.l=t.fc||null,this.j=t.ob||!1}Fe(Ri,Zc);Ri.prototype.g=function(){return new ya(this.l,this.j)};Ri.prototype.i=function(t){return function(){return t}}({});function ya(t,e){Ue.call(this),this.F=t,this.u=e,this.m=void 0,this.readyState=su,this.status=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.v=new Headers,this.h=null,this.C="GET",this.B="",this.g=!1,this.A=this.j=this.l=null}Fe(ya,Ue);var su=0;D=ya.prototype;D.open=function(t,e){if(this.readyState!=su)throw this.abort(),Error("Error reopening a connection");this.C=t,this.B=e,this.readyState=1,oi(this)};D.send=function(t){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const e={headers:this.v,method:this.C,credentials:this.m,cache:void 0};t&&(e.body=t),(this.F||G).fetch(new Request(this.B,e)).then(this.$a.bind(this),this.ka.bind(this))};D.abort=function(){this.response=this.responseText="",this.v=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,ki(this)),this.readyState=su};D.$a=function(t){if(this.g&&(this.l=t,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=t.headers,this.readyState=2,oi(this)),this.g&&(this.readyState=3,oi(this),this.g)))if(this.responseType==="arraybuffer")t.arrayBuffer().then(this.Ya.bind(this),this.ka.bind(this));else if(typeof G.ReadableStream<"u"&&"body"in t){if(this.j=t.body.getReader(),this.u){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.A=new TextDecoder;Lg(this)}else t.text().then(this.Za.bind(this),this.ka.bind(this))};function Lg(t){t.j.read().then(t.Xa.bind(t)).catch(t.ka.bind(t))}D.Xa=function(t){if(this.g){if(this.u&&t.value)this.response.push(t.value);else if(!this.u){var e=t.value?t.value:new Uint8Array(0);(e=this.A.decode(e,{stream:!t.done}))&&(this.response=this.responseText+=e)}t.done?ki(this):oi(this),this.readyState==3&&Lg(this)}};D.Za=function(t){this.g&&(this.response=this.responseText=t,ki(this))};D.Ya=function(t){this.g&&(this.response=t,ki(this))};D.ka=function(){this.g&&ki(this)};function ki(t){t.readyState=4,t.l=null,t.j=null,t.A=null,oi(t)}D.setRequestHeader=function(t,e){this.v.append(t,e)};D.getResponseHeader=function(t){return this.h&&this.h.get(t.toLowerCase())||""};D.getAllResponseHeaders=function(){if(!this.h)return"";const t=[],e=this.h.entries();for(var n=e.next();!n.done;)n=n.value,t.push(n[0]+": "+n[1]),n=e.next();return t.join(`\r
`)};function oi(t){t.onreadystatechange&&t.onreadystatechange.call(t)}Object.defineProperty(ya.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(t){this.m=t?"include":"same-origin"}});var bT=G.JSON.parse;function Se(t){Ue.call(this),this.headers=new Map,this.u=t||null,this.h=!1,this.C=this.g=null,this.I="",this.m=0,this.j="",this.l=this.G=this.v=this.F=!1,this.B=0,this.A=null,this.K=Ug,this.L=this.M=!1}Fe(Se,Ue);var Ug="",AT=/^https?$/i,CT=["POST","PUT"];D=Se.prototype;D.Oa=function(t){this.M=t};D.ha=function(t,e,n,s){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.I+"; newUri="+t);e=e?e.toUpperCase():"GET",this.I=t,this.j="",this.m=0,this.F=!1,this.h=!0,this.g=this.u?this.u.g():$l.g(),this.C=this.u?Jh(this.u):Jh($l),this.g.onreadystatechange=Ye(this.La,this);try{this.G=!0,this.g.open(e,String(t),!0),this.G=!1}catch(i){ef(this,i);return}if(t=n||"",n=new Map(this.headers),s)if(Object.getPrototypeOf(s)===Object.prototype)for(var r in s)n.set(r,s[r]);else if(typeof s.keys=="function"&&typeof s.get=="function")for(const i of s.keys())n.set(i,s.get(i));else throw Error("Unknown input type for opt_headers: "+String(s));s=Array.from(n.keys()).find(i=>i.toLowerCase()=="content-type"),r=G.FormData&&t instanceof G.FormData,!(0<=tg(CT,e))||s||r||n.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[i,o]of n)this.g.setRequestHeader(i,o);this.K&&(this.g.responseType=this.K),"withCredentials"in this.g&&this.g.withCredentials!==this.M&&(this.g.withCredentials=this.M);try{Bg(this),0<this.B&&((this.L=RT(this.g))?(this.g.timeout=this.B,this.g.ontimeout=Ye(this.ua,this)):this.A=Xc(this.ua,this.B,this)),this.v=!0,this.g.send(t),this.v=!1}catch(i){ef(this,i)}};function RT(t){return Qs&&typeof t.timeout=="number"&&t.ontimeout!==void 0}D.ua=function(){typeof jc<"u"&&this.g&&(this.j="Timed out after "+this.B+"ms, aborting",this.m=8,je(this,"timeout"),this.abort(8))};function ef(t,e){t.h=!1,t.g&&(t.l=!0,t.g.abort(),t.l=!1),t.j=e,t.m=5,Fg(t),va(t)}function Fg(t){t.F||(t.F=!0,je(t,"complete"),je(t,"error"))}D.abort=function(t){this.g&&this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1,this.m=t||7,je(this,"complete"),je(this,"abort"),va(this))};D.N=function(){this.g&&(this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1),va(this,!0)),Se.$.N.call(this)};D.La=function(){this.s||(this.G||this.v||this.l?Vg(this):this.kb())};D.kb=function(){Vg(this)};function Vg(t){if(t.h&&typeof jc<"u"&&(!t.C[1]||jt(t)!=4||t.da()!=2)){if(t.v&&jt(t)==4)Xc(t.La,0,t);else if(je(t,"readystatechange"),jt(t)==4){t.h=!1;try{const o=t.da();e:switch(o){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var e=!0;break e;default:e=!1}var n;if(!(n=e)){var s;if(s=o===0){var r=String(t.I).match(Cg)[1]||null;!r&&G.self&&G.self.location&&(r=G.self.location.protocol.slice(0,-1)),s=!AT.test(r?r.toLowerCase():"")}n=s}if(n)je(t,"complete"),je(t,"success");else{t.m=6;try{var i=2<jt(t)?t.g.statusText:""}catch{i=""}t.j=i+" ["+t.da()+"]",Fg(t)}}finally{va(t)}}}}function va(t,e){if(t.g){Bg(t);const n=t.g,s=t.C[0]?()=>{}:null;t.g=null,t.C=null,e||je(t,"ready");try{n.onreadystatechange=s}catch{}}}function Bg(t){t.g&&t.L&&(t.g.ontimeout=null),t.A&&(G.clearTimeout(t.A),t.A=null)}D.isActive=function(){return!!this.g};function jt(t){return t.g?t.g.readyState:0}D.da=function(){try{return 2<jt(this)?this.g.status:-1}catch{return-1}};D.ja=function(){try{return this.g?this.g.responseText:""}catch{return""}};D.Wa=function(t){if(this.g){var e=this.g.responseText;return t&&e.indexOf(t)==0&&(e=e.substring(t.length)),bT(e)}};function tf(t){try{if(!t.g)return null;if("response"in t.g)return t.g.response;switch(t.K){case Ug:case"text":return t.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in t.g)return t.g.mozResponseArrayBuffer}return null}catch{return null}}function kT(t){const e={};t=(t.g&&2<=jt(t)&&t.g.getAllResponseHeaders()||"").split(`\r
`);for(let s=0;s<t.length;s++){if(Zr(t[s]))continue;var n=eT(t[s]);const r=n[0];if(n=n[1],typeof n!="string")continue;n=n.trim();const i=e[r]||[];e[r]=i,i.push(n)}zI(e,function(s){return s.join(", ")})}D.Ia=function(){return this.m};D.Sa=function(){return typeof this.j=="string"?this.j:String(this.j)};function $g(t){let e="";return qc(t,function(n,s){e+=s,e+=":",e+=n,e+=`\r
`}),e}function ru(t,e,n){e:{for(s in n){var s=!1;break e}s=!0}s||(n=$g(n),typeof t=="string"?n!=null&&encodeURIComponent(String(n)):ve(t,e,n))}function wr(t,e,n){return n&&n.internalChannelParams&&n.internalChannelParams[t]||e}function jg(t){this.Ga=0,this.j=[],this.l=new ha,this.pa=this.wa=this.I=this.Y=this.g=this.Da=this.F=this.na=this.o=this.U=this.s=null,this.fb=this.W=0,this.cb=wr("failFast",!1,t),this.G=this.v=this.u=this.m=this.h=null,this.aa=!0,this.Fa=this.V=-1,this.ba=this.A=this.C=0,this.ab=wr("baseRetryDelayMs",5e3,t),this.hb=wr("retryDelaySeedMs",1e4,t),this.eb=wr("forwardChannelMaxRetries",2,t),this.xa=wr("forwardChannelRequestTimeoutMs",2e4,t),this.va=t&&t.xmlHttpFactory||void 0,this.Ha=t&&t.dc||!1,this.L=void 0,this.J=t&&t.supportsCrossDomainXhr||!1,this.K="",this.i=new Dg(t&&t.concurrentRequestLimit),this.Ja=new IT,this.P=t&&t.fastHandshake||!1,this.O=t&&t.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.bb=t&&t.bc||!1,t&&t.Ea&&this.l.Ea(),t&&t.forceLongPolling&&(this.aa=!1),this.ca=!this.P&&this.aa&&t&&t.detectBufferingProxy||!1,this.qa=void 0,t&&t.longPollingTimeout&&0<t.longPollingTimeout&&(this.qa=t.longPollingTimeout),this.oa=void 0,this.S=0,this.M=!1,this.ma=this.B=null}D=jg.prototype;D.ra=8;D.H=1;function iu(t){if(Hg(t),t.H==3){var e=t.W++,n=dn(t.I);if(ve(n,"SID",t.K),ve(n,"RID",e),ve(n,"TYPE","terminate"),Ni(t,n),e=new Ai(t,t.l,e),e.L=2,e.v=ma(dn(n)),n=!1,G.navigator&&G.navigator.sendBeacon)try{n=G.navigator.sendBeacon(e.v.toString(),"")}catch{}!n&&G.Image&&(new Image().src=e.v,n=!0),n||(e.g=Jg(e.l,null),e.g.ha(e.v)),e.G=Date.now(),Ci(e)}Qg(t)}function wa(t){t.g&&(au(t),t.g.cancel(),t.g=null)}function Hg(t){wa(t),t.u&&(G.clearTimeout(t.u),t.u=null),Oo(t),t.i.cancel(),t.m&&(typeof t.m=="number"&&G.clearTimeout(t.m),t.m=null)}function _a(t){if(!Og(t.i)&&!t.m){t.m=!0;var e=t.Na;ti||fg(),ni||(ti(),ni=!0),Yc.add(e,t),t.C=0}}function NT(t,e){return xg(t.i)>=t.i.j-(t.m?1:0)?!1:t.m?(t.j=e.F.concat(t.j),!0):t.H==1||t.H==2||t.C>=(t.cb?0:t.eb)?!1:(t.m=Si(Ye(t.Na,t,e),Wg(t,t.C)),t.C++,!0)}D.Na=function(t){if(this.m)if(this.m=null,this.H==1){if(!t){this.W=Math.floor(1e5*Math.random()),t=this.W++;const r=new Ai(this,this.l,t);let i=this.s;if(this.U&&(i?(i=ig(i),og(i,this.U)):i=this.U),this.o!==null||this.O||(r.I=i,i=null),this.P)e:{for(var e=0,n=0;n<this.j.length;n++){t:{var s=this.j[n];if("__data__"in s.map&&(s=s.map.__data__,typeof s=="string")){s=s.length;break t}s=void 0}if(s===void 0)break;if(e+=s,4096<e){e=n;break e}if(e===4096||n===this.j.length-1){e=n+1;break e}}e=1e3}else e=1e3;e=Kg(this,r,e),n=dn(this.I),ve(n,"RID",t),ve(n,"CVER",22),this.F&&ve(n,"X-HTTP-Session-Id",this.F),Ni(this,n),i&&(this.O?e="headers="+encodeURIComponent(String($g(i)))+"&"+e:this.o&&ru(n,this.o,i)),nu(this.i,r),this.bb&&ve(n,"TYPE","init"),this.P?(ve(n,"$req",e),ve(n,"SID","null"),r.aa=!0,Hl(r,n,null)):Hl(r,n,e),this.H=2}}else this.H==3&&(t?nf(this,t):this.j.length==0||Og(this.i)||nf(this))};function nf(t,e){var n;e?n=e.m:n=t.W++;const s=dn(t.I);ve(s,"SID",t.K),ve(s,"RID",n),ve(s,"AID",t.V),Ni(t,s),t.o&&t.s&&ru(s,t.o,t.s),n=new Ai(t,t.l,n,t.C+1),t.o===null&&(n.I=t.s),e&&(t.j=e.F.concat(t.j)),e=Kg(t,n,1e3),n.setTimeout(Math.round(.5*t.xa)+Math.round(.5*t.xa*Math.random())),nu(t.i,n),Hl(n,s,e)}function Ni(t,e){t.na&&qc(t.na,function(n,s){ve(e,s,n)}),t.h&&Ag({},function(n,s){ve(e,s,n)})}function Kg(t,e,n){n=Math.min(t.j.length,n);var s=t.h?Ye(t.h.Va,t.h,t):null;e:{var r=t.j;let i=-1;for(;;){const o=["count="+n];i==-1?0<n?(i=r[0].g,o.push("ofs="+i)):i=0:o.push("ofs="+i);let a=!0;for(let l=0;l<n;l++){let c=r[l].g;const u=r[l].map;if(c-=i,0>c)i=Math.max(0,r[l].g-100),a=!1;else try{TT(u,o,"req"+c+"_")}catch{s&&s(u)}}if(a){s=o.join("&");break e}}}return t=t.j.splice(0,n),e.F=t,s}function qg(t){if(!t.g&&!t.u){t.ba=1;var e=t.Ma;ti||fg(),ni||(ti(),ni=!0),Yc.add(e,t),t.A=0}}function ou(t){return t.g||t.u||3<=t.A?!1:(t.ba++,t.u=Si(Ye(t.Ma,t),Wg(t,t.A)),t.A++,!0)}D.Ma=function(){if(this.u=null,zg(this),this.ca&&!(this.M||this.g==null||0>=this.S)){var t=2*this.S;this.l.info("BP detection timer enabled: "+t),this.B=Si(Ye(this.jb,this),t)}};D.jb=function(){this.B&&(this.B=null,this.l.info("BP detection timeout reached."),this.l.info("Buffering proxy detected and switch to long-polling!"),this.G=!1,this.M=!0,ot(10),wa(this),zg(this))};function au(t){t.B!=null&&(G.clearTimeout(t.B),t.B=null)}function zg(t){t.g=new Ai(t,t.l,"rpc",t.ba),t.o===null&&(t.g.I=t.s),t.g.O=0;var e=dn(t.wa);ve(e,"RID","rpc"),ve(e,"SID",t.K),ve(e,"AID",t.V),ve(e,"CI",t.G?"0":"1"),!t.G&&t.qa&&ve(e,"TO",t.qa),ve(e,"TYPE","xmlhttp"),Ni(t,e),t.o&&t.s&&ru(e,t.o,t.s),t.L&&t.g.setTimeout(t.L);var n=t.g;t=t.pa,n.L=1,n.v=ma(dn(e)),n.s=null,n.S=!0,Ig(n,t)}D.ib=function(){this.v!=null&&(this.v=null,wa(this),ou(this),ot(19))};function Oo(t){t.v!=null&&(G.clearTimeout(t.v),t.v=null)}function Gg(t,e){var n=null;if(t.g==e){Oo(t),au(t),t.g=null;var s=2}else if(ql(t.i,e))n=e.F,Pg(t.i,e),s=1;else return;if(t.H!=0){if(e.i)if(s==1){n=e.s?e.s.length:0,e=Date.now()-e.G;var r=t.C;s=fa(),je(s,new vg(s,n)),_a(t)}else qg(t);else if(r=e.o,r==3||r==0&&0<e.ca||!(s==1&&NT(t,e)||s==2&&ou(t)))switch(n&&0<n.length&&(e=t.i,e.i=e.i.concat(n)),r){case 1:ts(t,5);break;case 4:ts(t,10);break;case 3:ts(t,6);break;default:ts(t,2)}}}function Wg(t,e){let n=t.ab+Math.floor(Math.random()*t.hb);return t.isActive()||(n*=2),n*e}function ts(t,e){if(t.l.info("Error code "+e),e==2){var n=null;t.h&&(n=null);var s=Ye(t.pb,t);n||(n=new os("//www.google.com/images/cleardot.gif"),G.location&&G.location.protocol=="http"||No(n,"https"),ma(n)),ST(n.toString(),s)}else ot(2);t.H=0,t.h&&t.h.za(e),Qg(t),Hg(t)}D.pb=function(t){t?(this.l.info("Successfully pinged google.com"),ot(2)):(this.l.info("Failed to ping google.com"),ot(1))};function Qg(t){if(t.H=0,t.ma=[],t.h){const e=Mg(t.i);(e.length!=0||t.j.length!=0)&&(zh(t.ma,e),zh(t.ma,t.j),t.i.i.length=0,Hc(t.j),t.j.length=0),t.h.ya()}}function Yg(t,e,n){var s=n instanceof os?dn(n):new os(n);if(s.g!="")e&&(s.g=e+"."+s.g),Do(s,s.m);else{var r=G.location;s=r.protocol,e=e?e+"."+r.hostname:r.hostname,r=+r.port;var i=new os(null);s&&No(i,s),e&&(i.g=e),r&&Do(i,r),n&&(i.l=n),s=i}return n=t.F,e=t.Da,n&&e&&ve(s,n,e),ve(s,"VER",t.ra),Ni(t,s),s}function Jg(t,e,n){if(e&&!t.J)throw Error("Can't create secondary domain capable XhrIo object.");return e=n&&t.Ha&&!t.va?new Se(new Ri({ob:!0})):new Se(t.va),e.Oa(t.J),e}D.isActive=function(){return!!this.h&&this.h.isActive(this)};function Xg(){}D=Xg.prototype;D.Ba=function(){};D.Aa=function(){};D.za=function(){};D.ya=function(){};D.isActive=function(){return!0};D.Va=function(){};function xo(){if(Qs&&!(10<=Number(jI)))throw Error("Environmental error: no available transport.")}xo.prototype.g=function(t,e){return new _t(t,e)};function _t(t,e){Ue.call(this),this.g=new jg(e),this.l=t,this.h=e&&e.messageUrlParams||null,t=e&&e.messageHeaders||null,e&&e.clientProtocolHeaderRequired&&(t?t["X-Client-Protocol"]="webchannel":t={"X-Client-Protocol":"webchannel"}),this.g.s=t,t=e&&e.initMessageHeaders||null,e&&e.messageContentType&&(t?t["X-WebChannel-Content-Type"]=e.messageContentType:t={"X-WebChannel-Content-Type":e.messageContentType}),e&&e.Ca&&(t?t["X-WebChannel-Client-Profile"]=e.Ca:t={"X-WebChannel-Client-Profile":e.Ca}),this.g.U=t,(t=e&&e.cc)&&!Zr(t)&&(this.g.o=t),this.A=e&&e.supportsCrossDomainXhr||!1,this.v=e&&e.sendRawJson||!1,(e=e&&e.httpSessionIdParam)&&!Zr(e)&&(this.g.F=e,t=this.h,t!==null&&e in t&&(t=this.h,e in t&&delete t[e])),this.j=new hr(this)}Fe(_t,Ue);_t.prototype.m=function(){this.g.h=this.j,this.A&&(this.g.J=!0);var t=this.g,e=this.l,n=this.h||void 0;ot(0),t.Y=e,t.na=n||{},t.G=t.aa,t.I=Yg(t,null,t.Y),_a(t)};_t.prototype.close=function(){iu(this.g)};_t.prototype.u=function(t){var e=this.g;if(typeof t=="string"){var n={};n.__data__=t,t=n}else this.v&&(n={},n.__data__=Qc(t),t=n);e.j.push(new wT(e.fb++,t)),e.H==3&&_a(e)};_t.prototype.N=function(){this.g.h=null,delete this.j,iu(this.g),delete this.g,_t.$.N.call(this)};function Zg(t){eu.call(this),t.__headers__&&(this.headers=t.__headers__,this.statusCode=t.__status__,delete t.__headers__,delete t.__status__);var e=t.__sm__;if(e){e:{for(const n in e){t=n;break e}t=void 0}(this.i=t)&&(t=this.i,e=e!==null&&t in e?e[t]:void 0),this.data=e}else this.data=t}Fe(Zg,eu);function em(){tu.call(this),this.status=1}Fe(em,tu);function hr(t){this.g=t}Fe(hr,Xg);hr.prototype.Ba=function(){je(this.g,"a")};hr.prototype.Aa=function(t){je(this.g,new Zg(t))};hr.prototype.za=function(t){je(this.g,new em)};hr.prototype.ya=function(){je(this.g,"b")};function DT(){this.blockSize=-1}function Nt(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.m=Array(this.blockSize),this.i=this.h=0,this.reset()}Fe(Nt,DT);Nt.prototype.reset=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.i=this.h=0};function al(t,e,n){n||(n=0);var s=Array(16);if(typeof e=="string")for(var r=0;16>r;++r)s[r]=e.charCodeAt(n++)|e.charCodeAt(n++)<<8|e.charCodeAt(n++)<<16|e.charCodeAt(n++)<<24;else for(r=0;16>r;++r)s[r]=e[n++]|e[n++]<<8|e[n++]<<16|e[n++]<<24;e=t.g[0],n=t.g[1],r=t.g[2];var i=t.g[3],o=e+(i^n&(r^i))+s[0]+3614090360&4294967295;e=n+(o<<7&4294967295|o>>>25),o=i+(r^e&(n^r))+s[1]+3905402710&4294967295,i=e+(o<<12&4294967295|o>>>20),o=r+(n^i&(e^n))+s[2]+606105819&4294967295,r=i+(o<<17&4294967295|o>>>15),o=n+(e^r&(i^e))+s[3]+3250441966&4294967295,n=r+(o<<22&4294967295|o>>>10),o=e+(i^n&(r^i))+s[4]+4118548399&4294967295,e=n+(o<<7&4294967295|o>>>25),o=i+(r^e&(n^r))+s[5]+1200080426&4294967295,i=e+(o<<12&4294967295|o>>>20),o=r+(n^i&(e^n))+s[6]+2821735955&4294967295,r=i+(o<<17&4294967295|o>>>15),o=n+(e^r&(i^e))+s[7]+4249261313&4294967295,n=r+(o<<22&4294967295|o>>>10),o=e+(i^n&(r^i))+s[8]+1770035416&4294967295,e=n+(o<<7&4294967295|o>>>25),o=i+(r^e&(n^r))+s[9]+2336552879&4294967295,i=e+(o<<12&4294967295|o>>>20),o=r+(n^i&(e^n))+s[10]+4294925233&4294967295,r=i+(o<<17&4294967295|o>>>15),o=n+(e^r&(i^e))+s[11]+2304563134&4294967295,n=r+(o<<22&4294967295|o>>>10),o=e+(i^n&(r^i))+s[12]+1804603682&4294967295,e=n+(o<<7&4294967295|o>>>25),o=i+(r^e&(n^r))+s[13]+4254626195&4294967295,i=e+(o<<12&4294967295|o>>>20),o=r+(n^i&(e^n))+s[14]+2792965006&4294967295,r=i+(o<<17&4294967295|o>>>15),o=n+(e^r&(i^e))+s[15]+1236535329&4294967295,n=r+(o<<22&4294967295|o>>>10),o=e+(r^i&(n^r))+s[1]+4129170786&4294967295,e=n+(o<<5&4294967295|o>>>27),o=i+(n^r&(e^n))+s[6]+3225465664&4294967295,i=e+(o<<9&4294967295|o>>>23),o=r+(e^n&(i^e))+s[11]+643717713&4294967295,r=i+(o<<14&4294967295|o>>>18),o=n+(i^e&(r^i))+s[0]+3921069994&4294967295,n=r+(o<<20&4294967295|o>>>12),o=e+(r^i&(n^r))+s[5]+3593408605&4294967295,e=n+(o<<5&4294967295|o>>>27),o=i+(n^r&(e^n))+s[10]+38016083&4294967295,i=e+(o<<9&4294967295|o>>>23),o=r+(e^n&(i^e))+s[15]+3634488961&4294967295,r=i+(o<<14&4294967295|o>>>18),o=n+(i^e&(r^i))+s[4]+3889429448&4294967295,n=r+(o<<20&4294967295|o>>>12),o=e+(r^i&(n^r))+s[9]+568446438&4294967295,e=n+(o<<5&4294967295|o>>>27),o=i+(n^r&(e^n))+s[14]+3275163606&4294967295,i=e+(o<<9&4294967295|o>>>23),o=r+(e^n&(i^e))+s[3]+4107603335&4294967295,r=i+(o<<14&4294967295|o>>>18),o=n+(i^e&(r^i))+s[8]+1163531501&4294967295,n=r+(o<<20&4294967295|o>>>12),o=e+(r^i&(n^r))+s[13]+2850285829&4294967295,e=n+(o<<5&4294967295|o>>>27),o=i+(n^r&(e^n))+s[2]+4243563512&4294967295,i=e+(o<<9&4294967295|o>>>23),o=r+(e^n&(i^e))+s[7]+1735328473&4294967295,r=i+(o<<14&4294967295|o>>>18),o=n+(i^e&(r^i))+s[12]+2368359562&4294967295,n=r+(o<<20&4294967295|o>>>12),o=e+(n^r^i)+s[5]+4294588738&4294967295,e=n+(o<<4&4294967295|o>>>28),o=i+(e^n^r)+s[8]+2272392833&4294967295,i=e+(o<<11&4294967295|o>>>21),o=r+(i^e^n)+s[11]+1839030562&4294967295,r=i+(o<<16&4294967295|o>>>16),o=n+(r^i^e)+s[14]+4259657740&4294967295,n=r+(o<<23&4294967295|o>>>9),o=e+(n^r^i)+s[1]+2763975236&4294967295,e=n+(o<<4&4294967295|o>>>28),o=i+(e^n^r)+s[4]+1272893353&4294967295,i=e+(o<<11&4294967295|o>>>21),o=r+(i^e^n)+s[7]+4139469664&4294967295,r=i+(o<<16&4294967295|o>>>16),o=n+(r^i^e)+s[10]+3200236656&4294967295,n=r+(o<<23&4294967295|o>>>9),o=e+(n^r^i)+s[13]+681279174&4294967295,e=n+(o<<4&4294967295|o>>>28),o=i+(e^n^r)+s[0]+3936430074&4294967295,i=e+(o<<11&4294967295|o>>>21),o=r+(i^e^n)+s[3]+3572445317&4294967295,r=i+(o<<16&4294967295|o>>>16),o=n+(r^i^e)+s[6]+76029189&4294967295,n=r+(o<<23&4294967295|o>>>9),o=e+(n^r^i)+s[9]+3654602809&4294967295,e=n+(o<<4&4294967295|o>>>28),o=i+(e^n^r)+s[12]+3873151461&4294967295,i=e+(o<<11&4294967295|o>>>21),o=r+(i^e^n)+s[15]+530742520&4294967295,r=i+(o<<16&4294967295|o>>>16),o=n+(r^i^e)+s[2]+3299628645&4294967295,n=r+(o<<23&4294967295|o>>>9),o=e+(r^(n|~i))+s[0]+4096336452&4294967295,e=n+(o<<6&4294967295|o>>>26),o=i+(n^(e|~r))+s[7]+1126891415&4294967295,i=e+(o<<10&4294967295|o>>>22),o=r+(e^(i|~n))+s[14]+2878612391&4294967295,r=i+(o<<15&4294967295|o>>>17),o=n+(i^(r|~e))+s[5]+4237533241&4294967295,n=r+(o<<21&4294967295|o>>>11),o=e+(r^(n|~i))+s[12]+1700485571&4294967295,e=n+(o<<6&4294967295|o>>>26),o=i+(n^(e|~r))+s[3]+2399980690&4294967295,i=e+(o<<10&4294967295|o>>>22),o=r+(e^(i|~n))+s[10]+4293915773&4294967295,r=i+(o<<15&4294967295|o>>>17),o=n+(i^(r|~e))+s[1]+2240044497&4294967295,n=r+(o<<21&4294967295|o>>>11),o=e+(r^(n|~i))+s[8]+1873313359&4294967295,e=n+(o<<6&4294967295|o>>>26),o=i+(n^(e|~r))+s[15]+4264355552&4294967295,i=e+(o<<10&4294967295|o>>>22),o=r+(e^(i|~n))+s[6]+2734768916&4294967295,r=i+(o<<15&4294967295|o>>>17),o=n+(i^(r|~e))+s[13]+1309151649&4294967295,n=r+(o<<21&4294967295|o>>>11),o=e+(r^(n|~i))+s[4]+4149444226&4294967295,e=n+(o<<6&4294967295|o>>>26),o=i+(n^(e|~r))+s[11]+3174756917&4294967295,i=e+(o<<10&4294967295|o>>>22),o=r+(e^(i|~n))+s[2]+718787259&4294967295,r=i+(o<<15&4294967295|o>>>17),o=n+(i^(r|~e))+s[9]+3951481745&4294967295,t.g[0]=t.g[0]+e&4294967295,t.g[1]=t.g[1]+(r+(o<<21&4294967295|o>>>11))&4294967295,t.g[2]=t.g[2]+r&4294967295,t.g[3]=t.g[3]+i&4294967295}Nt.prototype.j=function(t,e){e===void 0&&(e=t.length);for(var n=e-this.blockSize,s=this.m,r=this.h,i=0;i<e;){if(r==0)for(;i<=n;)al(this,t,i),i+=this.blockSize;if(typeof t=="string"){for(;i<e;)if(s[r++]=t.charCodeAt(i++),r==this.blockSize){al(this,s),r=0;break}}else for(;i<e;)if(s[r++]=t[i++],r==this.blockSize){al(this,s),r=0;break}}this.h=r,this.i+=e};Nt.prototype.l=function(){var t=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);t[0]=128;for(var e=1;e<t.length-8;++e)t[e]=0;var n=8*this.i;for(e=t.length-8;e<t.length;++e)t[e]=n&255,n/=256;for(this.j(t),t=Array(16),e=n=0;4>e;++e)for(var s=0;32>s;s+=8)t[n++]=this.g[e]>>>s&255;return t};function fe(t,e){this.h=e;for(var n=[],s=!0,r=t.length-1;0<=r;r--){var i=t[r]|0;s&&i==e||(n[r]=i,s=!1)}this.g=n}var OT={};function lu(t){return-128<=t&&128>t?VI(t,function(e){return new fe([e|0],0>e?-1:0)}):new fe([t|0],0>t?-1:0)}function Ht(t){if(isNaN(t)||!isFinite(t))return $s;if(0>t)return $e(Ht(-t));for(var e=[],n=1,s=0;t>=n;s++)e[s]=t/n|0,n*=zl;return new fe(e,0)}function tm(t,e){if(t.length==0)throw Error("number format error: empty string");if(e=e||10,2>e||36<e)throw Error("radix out of range: "+e);if(t.charAt(0)=="-")return $e(tm(t.substring(1),e));if(0<=t.indexOf("-"))throw Error('number format error: interior "-" character');for(var n=Ht(Math.pow(e,8)),s=$s,r=0;r<t.length;r+=8){var i=Math.min(8,t.length-r),o=parseInt(t.substring(r,r+i),e);8>i?(i=Ht(Math.pow(e,i)),s=s.R(i).add(Ht(o))):(s=s.R(n),s=s.add(Ht(o)))}return s}var zl=4294967296,$s=lu(0),Gl=lu(1),sf=lu(16777216);D=fe.prototype;D.ea=function(){if(Tt(this))return-$e(this).ea();for(var t=0,e=1,n=0;n<this.g.length;n++){var s=this.D(n);t+=(0<=s?s:zl+s)*e,e*=zl}return t};D.toString=function(t){if(t=t||10,2>t||36<t)throw Error("radix out of range: "+t);if(ln(this))return"0";if(Tt(this))return"-"+$e(this).toString(t);for(var e=Ht(Math.pow(t,6)),n=this,s="";;){var r=Mo(n,e).g;n=Po(n,r.R(e));var i=((0<n.g.length?n.g[0]:n.h)>>>0).toString(t);if(n=r,ln(n))return i+s;for(;6>i.length;)i="0"+i;s=i+s}};D.D=function(t){return 0>t?0:t<this.g.length?this.g[t]:this.h};function ln(t){if(t.h!=0)return!1;for(var e=0;e<t.g.length;e++)if(t.g[e]!=0)return!1;return!0}function Tt(t){return t.h==-1}D.X=function(t){return t=Po(this,t),Tt(t)?-1:ln(t)?0:1};function $e(t){for(var e=t.g.length,n=[],s=0;s<e;s++)n[s]=~t.g[s];return new fe(n,~t.h).add(Gl)}D.abs=function(){return Tt(this)?$e(this):this};D.add=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],s=0,r=0;r<=e;r++){var i=s+(this.D(r)&65535)+(t.D(r)&65535),o=(i>>>16)+(this.D(r)>>>16)+(t.D(r)>>>16);s=o>>>16,i&=65535,o&=65535,n[r]=o<<16|i}return new fe(n,n[n.length-1]&-2147483648?-1:0)};function Po(t,e){return t.add($e(e))}D.R=function(t){if(ln(this)||ln(t))return $s;if(Tt(this))return Tt(t)?$e(this).R($e(t)):$e($e(this).R(t));if(Tt(t))return $e(this.R($e(t)));if(0>this.X(sf)&&0>t.X(sf))return Ht(this.ea()*t.ea());for(var e=this.g.length+t.g.length,n=[],s=0;s<2*e;s++)n[s]=0;for(s=0;s<this.g.length;s++)for(var r=0;r<t.g.length;r++){var i=this.D(s)>>>16,o=this.D(s)&65535,a=t.D(r)>>>16,l=t.D(r)&65535;n[2*s+2*r]+=o*l,qi(n,2*s+2*r),n[2*s+2*r+1]+=i*l,qi(n,2*s+2*r+1),n[2*s+2*r+1]+=o*a,qi(n,2*s+2*r+1),n[2*s+2*r+2]+=i*a,qi(n,2*s+2*r+2)}for(s=0;s<e;s++)n[s]=n[2*s+1]<<16|n[2*s];for(s=e;s<2*e;s++)n[s]=0;return new fe(n,0)};function qi(t,e){for(;(t[e]&65535)!=t[e];)t[e+1]+=t[e]>>>16,t[e]&=65535,e++}function _r(t,e){this.g=t,this.h=e}function Mo(t,e){if(ln(e))throw Error("division by zero");if(ln(t))return new _r($s,$s);if(Tt(t))return e=Mo($e(t),e),new _r($e(e.g),$e(e.h));if(Tt(e))return e=Mo(t,$e(e)),new _r($e(e.g),e.h);if(30<t.g.length){if(Tt(t)||Tt(e))throw Error("slowDivide_ only works with positive integers.");for(var n=Gl,s=e;0>=s.X(t);)n=rf(n),s=rf(s);var r=Ts(n,1),i=Ts(s,1);for(s=Ts(s,2),n=Ts(n,2);!ln(s);){var o=i.add(s);0>=o.X(t)&&(r=r.add(n),i=o),s=Ts(s,1),n=Ts(n,1)}return e=Po(t,r.R(e)),new _r(r,e)}for(r=$s;0<=t.X(e);){for(n=Math.max(1,Math.floor(t.ea()/e.ea())),s=Math.ceil(Math.log(n)/Math.LN2),s=48>=s?1:Math.pow(2,s-48),i=Ht(n),o=i.R(e);Tt(o)||0<o.X(t);)n-=s,i=Ht(n),o=i.R(e);ln(i)&&(i=Gl),r=r.add(i),t=Po(t,o)}return new _r(r,t)}D.gb=function(t){return Mo(this,t).h};D.and=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],s=0;s<e;s++)n[s]=this.D(s)&t.D(s);return new fe(n,this.h&t.h)};D.or=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],s=0;s<e;s++)n[s]=this.D(s)|t.D(s);return new fe(n,this.h|t.h)};D.xor=function(t){for(var e=Math.max(this.g.length,t.g.length),n=[],s=0;s<e;s++)n[s]=this.D(s)^t.D(s);return new fe(n,this.h^t.h)};function rf(t){for(var e=t.g.length+1,n=[],s=0;s<e;s++)n[s]=t.D(s)<<1|t.D(s-1)>>>31;return new fe(n,t.h)}function Ts(t,e){var n=e>>5;e%=32;for(var s=t.g.length-n,r=[],i=0;i<s;i++)r[i]=0<e?t.D(i+n)>>>e|t.D(i+n+1)<<32-e:t.D(i+n);return new fe(r,t.h)}xo.prototype.createWebChannel=xo.prototype.g;_t.prototype.send=_t.prototype.u;_t.prototype.open=_t.prototype.m;_t.prototype.close=_t.prototype.close;da.NO_ERROR=0;da.TIMEOUT=8;da.HTTP_ERROR=6;wg.COMPLETE="complete";_g.EventType=bi;bi.OPEN="a";bi.CLOSE="b";bi.ERROR="c";bi.MESSAGE="d";Ue.prototype.listen=Ue.prototype.O;Se.prototype.listenOnce=Se.prototype.P;Se.prototype.getLastError=Se.prototype.Sa;Se.prototype.getLastErrorCode=Se.prototype.Ia;Se.prototype.getStatus=Se.prototype.da;Se.prototype.getResponseJson=Se.prototype.Wa;Se.prototype.getResponseText=Se.prototype.ja;Se.prototype.send=Se.prototype.ha;Se.prototype.setWithCredentials=Se.prototype.Oa;Nt.prototype.digest=Nt.prototype.l;Nt.prototype.reset=Nt.prototype.reset;Nt.prototype.update=Nt.prototype.j;fe.prototype.add=fe.prototype.add;fe.prototype.multiply=fe.prototype.R;fe.prototype.modulo=fe.prototype.gb;fe.prototype.compare=fe.prototype.X;fe.prototype.toNumber=fe.prototype.ea;fe.prototype.toString=fe.prototype.toString;fe.prototype.getBits=fe.prototype.D;fe.fromNumber=Ht;fe.fromString=tm;var xT=function(){return new xo},PT=function(){return fa()},ll=da,MT=wg,LT=ms,of={xb:0,Ab:1,Bb:2,Ub:3,Zb:4,Wb:5,Xb:6,Vb:7,Tb:8,Yb:9,PROXY:10,NOPROXY:11,Rb:12,Nb:13,Ob:14,Mb:15,Pb:16,Qb:17,tb:18,sb:19,ub:20},UT=Ri,zi=_g,FT=Se,VT=Nt,js=fe;const af="@firebase/firestore";/**
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
 */class Ke{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Ke.UNAUTHENTICATED=new Ke(null),Ke.GOOGLE_CREDENTIALS=new Ke("google-credentials-uid"),Ke.FIRST_PARTY=new Ke("first-party-uid"),Ke.MOCK_USER=new Ke("mock-user");/**
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
 */let fr="9.23.0";/**
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
 */const hs=new Nc("@firebase/firestore");function lf(){return hs.logLevel}function V(t,...e){if(hs.logLevel<=re.DEBUG){const n=e.map(cu);hs.debug(`Firestore (${fr}): ${t}`,...n)}}function pn(t,...e){if(hs.logLevel<=re.ERROR){const n=e.map(cu);hs.error(`Firestore (${fr}): ${t}`,...n)}}function Ys(t,...e){if(hs.logLevel<=re.WARN){const n=e.map(cu);hs.warn(`Firestore (${fr}): ${t}`,...n)}}function cu(t){if(typeof t=="string")return t;try{return e=t,JSON.stringify(e)}catch{return t}/**
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
 */function W(t="Unexpected state"){const e=`FIRESTORE (${fr}) INTERNAL ASSERTION FAILED: `+t;throw pn(e),new Error(e)}function we(t,e){t||W()}function X(t,e){return t}/**
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
 */const T={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class j extends vn{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class Un{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
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
 */class nm{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class BT{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(Ke.UNAUTHENTICATED))}shutdown(){}}class $T{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class jT{constructor(e){this.t=e,this.currentUser=Ke.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){let s=this.i;const r=l=>this.i!==s?(s=this.i,n(l)):Promise.resolve();let i=new Un;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Un,e.enqueueRetryable(()=>r(this.currentUser))};const o=()=>{const l=i;e.enqueueRetryable(async()=>{await l.promise,await r(this.currentUser)})},a=l=>{V("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.auth.addAuthTokenListener(this.o),o()};this.t.onInit(l=>a(l)),setTimeout(()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?a(l):(V("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Un)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(s=>this.i!==e?(V("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):s?(we(typeof s.accessToken=="string"),new nm(s.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){const e=this.auth&&this.auth.getUid();return we(e===null||typeof e=="string"),new Ke(e)}}class HT{constructor(e,n,s){this.h=e,this.l=n,this.m=s,this.type="FirstParty",this.user=Ke.FIRST_PARTY,this.g=new Map}p(){return this.m?this.m():null}get headers(){this.g.set("X-Goog-AuthUser",this.h);const e=this.p();return e&&this.g.set("Authorization",e),this.l&&this.g.set("X-Goog-Iam-Authorization-Token",this.l),this.g}}class KT{constructor(e,n,s){this.h=e,this.l=n,this.m=s}getToken(){return Promise.resolve(new HT(this.h,this.l,this.m))}start(e,n){e.enqueueRetryable(()=>n(Ke.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class qT{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class zT{constructor(e){this.I=e,this.forceRefresh=!1,this.appCheck=null,this.T=null}start(e,n){const s=i=>{i.error!=null&&V("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.T;return this.T=i.token,V("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>s(i))};const r=i=>{V("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.appCheck.addTokenListener(this.o)};this.I.onInit(i=>r(i)),setTimeout(()=>{if(!this.appCheck){const i=this.I.getImmediate({optional:!0});i?r(i):V("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(we(typeof n.token=="string"),this.T=n.token,new qT(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}}/**
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
 */function GT(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let s=0;s<t;s++)n[s]=Math.floor(256*Math.random());return n}/**
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
 */class sm{static A(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/e.length)*e.length;let s="";for(;s.length<20;){const r=GT(40);for(let i=0;i<r.length;++i)s.length<20&&r[i]<n&&(s+=e.charAt(r[i]%e.length))}return s}}function ie(t,e){return t<e?-1:t>e?1:0}function Js(t,e,n){return t.length===e.length&&t.every((s,r)=>n(s,e[r]))}/**
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
 */class Pe{constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new j(T.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new j(T.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<-62135596800)throw new j(T.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new j(T.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return Pe.fromMillis(Date.now())}static fromDate(e){return Pe.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),s=Math.floor(1e6*(e-1e3*n));return new Pe(n,s)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?ie(this.nanoseconds,e.nanoseconds):ie(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
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
 */class Y{constructor(e){this.timestamp=e}static fromTimestamp(e){return new Y(e)}static min(){return new Y(new Pe(0,0))}static max(){return new Y(new Pe(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */class ai{constructor(e,n,s){n===void 0?n=0:n>e.length&&W(),s===void 0?s=e.length-n:s>e.length-n&&W(),this.segments=e,this.offset=n,this.len=s}get length(){return this.len}isEqual(e){return ai.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof ai?e.forEach(s=>{n.push(s)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,s=this.limit();n<s;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const s=Math.min(e.length,n.length);for(let r=0;r<s;r++){const i=e.get(r),o=n.get(r);if(i<o)return-1;if(i>o)return 1}return e.length<n.length?-1:e.length>n.length?1:0}}class Te extends ai{construct(e,n,s){return new Te(e,n,s)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...e){const n=[];for(const s of e){if(s.indexOf("//")>=0)throw new j(T.INVALID_ARGUMENT,`Invalid segment (${s}). Paths must not contain // in them.`);n.push(...s.split("/").filter(r=>r.length>0))}return new Te(n)}static emptyPath(){return new Te([])}}const WT=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class We extends ai{construct(e,n,s){return new We(e,n,s)}static isValidIdentifier(e){return WT.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),We.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new We(["__name__"])}static fromServerFormat(e){const n=[];let s="",r=0;const i=()=>{if(s.length===0)throw new j(T.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(s),s=""};let o=!1;for(;r<e.length;){const a=e[r];if(a==="\\"){if(r+1===e.length)throw new j(T.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[r+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new j(T.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);s+=l,r+=2}else a==="`"?(o=!o,r++):a!=="."||o?(s+=a,r++):(i(),r++)}if(i(),o)throw new j(T.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new We(n)}static emptyPath(){return new We([])}}/**
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
 */class H{constructor(e){this.path=e}static fromPath(e){return new H(Te.fromString(e))}static fromName(e){return new H(Te.fromString(e).popFirst(5))}static empty(){return new H(Te.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Te.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return Te.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new H(new Te(e.slice()))}}function QT(t,e){const n=t.toTimestamp().seconds,s=t.toTimestamp().nanoseconds+1,r=Y.fromTimestamp(s===1e9?new Pe(n+1,0):new Pe(n,s));return new Bn(r,H.empty(),e)}function YT(t){return new Bn(t.readTime,t.key,-1)}class Bn{constructor(e,n,s){this.readTime=e,this.documentKey=n,this.largestBatchId=s}static min(){return new Bn(Y.min(),H.empty(),-1)}static max(){return new Bn(Y.max(),H.empty(),-1)}}function JT(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=H.comparator(t.documentKey,e.documentKey),n!==0?n:ie(t.largestBatchId,e.largestBatchId))}/**
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
 */const XT="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class ZT{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function Di(t){if(t.code!==T.FAILED_PRECONDITION||t.message!==XT)throw t;V("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class b{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&W(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new b((s,r)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(s,r)},this.catchCallback=i=>{this.wrapFailure(n,i).next(s,r)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof b?n:b.resolve(n)}catch(n){return b.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):b.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):b.reject(n)}static resolve(e){return new b((n,s)=>{n(e)})}static reject(e){return new b((n,s)=>{s(e)})}static waitFor(e){return new b((n,s)=>{let r=0,i=0,o=!1;e.forEach(a=>{++r,a.next(()=>{++i,o&&i===r&&n()},l=>s(l))}),o=!0,i===r&&n()})}static or(e){let n=b.resolve(!1);for(const s of e)n=n.next(r=>r?b.resolve(r):s());return n}static forEach(e,n){const s=[];return e.forEach((r,i)=>{s.push(n.call(this,r,i))}),this.waitFor(s)}static mapArray(e,n){return new b((s,r)=>{const i=e.length,o=new Array(i);let a=0;for(let l=0;l<i;l++){const c=l;n(e[c]).next(u=>{o[c]=u,++a,a===i&&s(o)},u=>r(u))}})}static doWhile(e,n){return new b((s,r)=>{const i=()=>{e()===!0?n().next(()=>{i()},r):s()};i()})}}function Oi(t){return t.name==="IndexedDbTransactionError"}/**
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
 */class uu{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=s=>this.ot(s),this.ut=s=>n.writeSequenceNumber(s))}ot(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ut&&this.ut(e),e}}uu.ct=-1;function Ea(t){return t==null}function Lo(t){return t===0&&1/t==-1/0}function eS(t){return typeof t=="number"&&Number.isInteger(t)&&!Lo(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
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
 */function cf(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function ys(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function rm(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
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
 */class Ee{constructor(e,n){this.comparator=e,this.root=n||Ve.EMPTY}insert(e,n){return new Ee(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,Ve.BLACK,null,null))}remove(e){return new Ee(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ve.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const s=this.comparator(e,n.key);if(s===0)return n.value;s<0?n=n.left:s>0&&(n=n.right)}return null}indexOf(e){let n=0,s=this.root;for(;!s.isEmpty();){const r=this.comparator(e,s.key);if(r===0)return n+s.left.size;r<0?s=s.left:(n+=s.left.size+1,s=s.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,s)=>(e(n,s),!1))}toString(){const e=[];return this.inorderTraversal((n,s)=>(e.push(`${n}:${s}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Gi(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Gi(this.root,e,this.comparator,!1)}getReverseIterator(){return new Gi(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Gi(this.root,e,this.comparator,!0)}}class Gi{constructor(e,n,s,r){this.isReverse=r,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=n?s(e.key,n):1,n&&r&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Ve{constructor(e,n,s,r,i){this.key=e,this.value=n,this.color=s??Ve.RED,this.left=r??Ve.EMPTY,this.right=i??Ve.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,s,r,i){return new Ve(e??this.key,n??this.value,s??this.color,r??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,s){let r=this;const i=s(e,r.key);return r=i<0?r.copy(null,null,null,r.left.insert(e,n,s),null):i===0?r.copy(null,n,null,null,null):r.copy(null,null,null,null,r.right.insert(e,n,s)),r.fixUp()}removeMin(){if(this.left.isEmpty())return Ve.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let s,r=this;if(n(e,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,n),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),n(e,r.key)===0){if(r.right.isEmpty())return Ve.EMPTY;s=r.right.min(),r=r.copy(s.key,s.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,n))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Ve.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Ve.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw W();const e=this.left.check();if(e!==this.right.check())throw W();return e+(this.isRed()?0:1)}}Ve.EMPTY=null,Ve.RED=!0,Ve.BLACK=!1;Ve.EMPTY=new class{constructor(){this.size=0}get key(){throw W()}get value(){throw W()}get color(){throw W()}get left(){throw W()}get right(){throw W()}copy(t,e,n,s,r){return this}insert(t,e,n){return new Ve(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class Xe{constructor(e){this.comparator=e,this.data=new Ee(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,s)=>(e(n),!1))}forEachInRange(e,n){const s=this.data.getIteratorFrom(e[0]);for(;s.hasNext();){const r=s.getNext();if(this.comparator(r.key,e[1])>=0)return;n(r.key)}}forEachWhile(e,n){let s;for(s=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();s.hasNext();)if(!e(s.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new uf(this.data.getIterator())}getIteratorFrom(e){return new uf(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(s=>{n=n.add(s)}),n}isEqual(e){if(!(e instanceof Xe)||this.size!==e.size)return!1;const n=this.data.getIterator(),s=e.data.getIterator();for(;n.hasNext();){const r=n.getNext().key,i=s.getNext().key;if(this.comparator(r,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new Xe(this.comparator);return n.data=e,n}}class uf{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class vt{constructor(e){this.fields=e,e.sort(We.comparator)}static empty(){return new vt([])}unionWith(e){let n=new Xe(We.comparator);for(const s of this.fields)n=n.add(s);for(const s of e)n=n.add(s);return new vt(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return Js(this.fields,e.fields,(n,s)=>n.isEqual(s))}}/**
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
 */class im extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class tt{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(s){try{return atob(s)}catch(r){throw typeof DOMException<"u"&&r instanceof DOMException?new im("Invalid base64 string: "+r):r}}(e);return new tt(n)}static fromUint8Array(e){const n=function(s){let r="";for(let i=0;i<s.length;++i)r+=String.fromCharCode(s[i]);return r}(e);return new tt(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return e=this.binaryString,btoa(e);var e}toUint8Array(){return function(e){const n=new Uint8Array(e.length);for(let s=0;s<e.length;s++)n[s]=e.charCodeAt(s);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ie(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}tt.EMPTY_BYTE_STRING=new tt("");const tS=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function $n(t){if(we(!!t),typeof t=="string"){let e=0;const n=tS.exec(t);if(we(!!n),n[1]){let r=n[1];r=(r+"000000000").substr(0,9),e=Number(r)}const s=new Date(t);return{seconds:Math.floor(s.getTime()/1e3),nanos:e}}return{seconds:Ce(t.seconds),nanos:Ce(t.nanos)}}function Ce(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function fs(t){return typeof t=="string"?tt.fromBase64String(t):tt.fromUint8Array(t)}/**
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
 */function hu(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function fu(t){const e=t.mapValue.fields.__previous_value__;return hu(e)?fu(e):e}function li(t){const e=$n(t.mapValue.fields.__local_write_time__.timestampValue);return new Pe(e.seconds,e.nanos)}/**
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
 */class nS{constructor(e,n,s,r,i,o,a,l,c){this.databaseId=e,this.appId=n,this.persistenceKey=s,this.host=r,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.longPollingOptions=l,this.useFetchStreams=c}}class ci{constructor(e,n){this.projectId=e,this.database=n||"(default)"}static empty(){return new ci("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof ci&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const Wi={mapValue:{}};function ds(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?hu(t)?4:sS(t)?9007199254740991:10:W()}function Jt(t,e){if(t===e)return!0;const n=ds(t);if(n!==ds(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return li(t).isEqual(li(e));case 3:return function(s,r){if(typeof s.timestampValue=="string"&&typeof r.timestampValue=="string"&&s.timestampValue.length===r.timestampValue.length)return s.timestampValue===r.timestampValue;const i=$n(s.timestampValue),o=$n(r.timestampValue);return i.seconds===o.seconds&&i.nanos===o.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(s,r){return fs(s.bytesValue).isEqual(fs(r.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(s,r){return Ce(s.geoPointValue.latitude)===Ce(r.geoPointValue.latitude)&&Ce(s.geoPointValue.longitude)===Ce(r.geoPointValue.longitude)}(t,e);case 2:return function(s,r){if("integerValue"in s&&"integerValue"in r)return Ce(s.integerValue)===Ce(r.integerValue);if("doubleValue"in s&&"doubleValue"in r){const i=Ce(s.doubleValue),o=Ce(r.doubleValue);return i===o?Lo(i)===Lo(o):isNaN(i)&&isNaN(o)}return!1}(t,e);case 9:return Js(t.arrayValue.values||[],e.arrayValue.values||[],Jt);case 10:return function(s,r){const i=s.mapValue.fields||{},o=r.mapValue.fields||{};if(cf(i)!==cf(o))return!1;for(const a in i)if(i.hasOwnProperty(a)&&(o[a]===void 0||!Jt(i[a],o[a])))return!1;return!0}(t,e);default:return W()}}function ui(t,e){return(t.values||[]).find(n=>Jt(n,e))!==void 0}function Xs(t,e){if(t===e)return 0;const n=ds(t),s=ds(e);if(n!==s)return ie(n,s);switch(n){case 0:case 9007199254740991:return 0;case 1:return ie(t.booleanValue,e.booleanValue);case 2:return function(r,i){const o=Ce(r.integerValue||r.doubleValue),a=Ce(i.integerValue||i.doubleValue);return o<a?-1:o>a?1:o===a?0:isNaN(o)?isNaN(a)?0:-1:1}(t,e);case 3:return hf(t.timestampValue,e.timestampValue);case 4:return hf(li(t),li(e));case 5:return ie(t.stringValue,e.stringValue);case 6:return function(r,i){const o=fs(r),a=fs(i);return o.compareTo(a)}(t.bytesValue,e.bytesValue);case 7:return function(r,i){const o=r.split("/"),a=i.split("/");for(let l=0;l<o.length&&l<a.length;l++){const c=ie(o[l],a[l]);if(c!==0)return c}return ie(o.length,a.length)}(t.referenceValue,e.referenceValue);case 8:return function(r,i){const o=ie(Ce(r.latitude),Ce(i.latitude));return o!==0?o:ie(Ce(r.longitude),Ce(i.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return function(r,i){const o=r.values||[],a=i.values||[];for(let l=0;l<o.length&&l<a.length;++l){const c=Xs(o[l],a[l]);if(c)return c}return ie(o.length,a.length)}(t.arrayValue,e.arrayValue);case 10:return function(r,i){if(r===Wi.mapValue&&i===Wi.mapValue)return 0;if(r===Wi.mapValue)return 1;if(i===Wi.mapValue)return-1;const o=r.fields||{},a=Object.keys(o),l=i.fields||{},c=Object.keys(l);a.sort(),c.sort();for(let u=0;u<a.length&&u<c.length;++u){const h=ie(a[u],c[u]);if(h!==0)return h;const f=Xs(o[a[u]],l[c[u]]);if(f!==0)return f}return ie(a.length,c.length)}(t.mapValue,e.mapValue);default:throw W()}}function hf(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return ie(t,e);const n=$n(t),s=$n(e),r=ie(n.seconds,s.seconds);return r!==0?r:ie(n.nanos,s.nanos)}function Zs(t){return Wl(t)}function Wl(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(s){const r=$n(s);return`time(${r.seconds},${r.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?fs(t.bytesValue).toBase64():"referenceValue"in t?(n=t.referenceValue,H.fromName(n).toString()):"geoPointValue"in t?`geo(${(e=t.geoPointValue).latitude},${e.longitude})`:"arrayValue"in t?function(s){let r="[",i=!0;for(const o of s.values||[])i?i=!1:r+=",",r+=Wl(o);return r+"]"}(t.arrayValue):"mapValue"in t?function(s){const r=Object.keys(s.fields||{}).sort();let i="{",o=!0;for(const a of r)o?o=!1:i+=",",i+=`${a}:${Wl(s.fields[a])}`;return i+"}"}(t.mapValue):W();var e,n}function Ql(t){return!!t&&"integerValue"in t}function du(t){return!!t&&"arrayValue"in t}function ff(t){return!!t&&"nullValue"in t}function df(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function oo(t){return!!t&&"mapValue"in t}function Fr(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return ys(t.mapValue.fields,(n,s)=>e.mapValue.fields[n]=Fr(s)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=Fr(t.arrayValue.values[n]);return e}return Object.assign({},t)}function sS(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
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
 */class dt{constructor(e){this.value=e}static empty(){return new dt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let s=0;s<e.length-1;++s)if(n=(n.mapValue.fields||{})[e.get(s)],!oo(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=Fr(n)}setAll(e){let n=We.emptyPath(),s={},r=[];e.forEach((o,a)=>{if(!n.isImmediateParentOf(a)){const l=this.getFieldsMap(n);this.applyChanges(l,s,r),s={},r=[],n=a.popLast()}o?s[a.lastSegment()]=Fr(o):r.push(a.lastSegment())});const i=this.getFieldsMap(n);this.applyChanges(i,s,r)}delete(e){const n=this.field(e.popLast());oo(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return Jt(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let s=0;s<e.length;++s){let r=n.mapValue.fields[e.get(s)];oo(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},n.mapValue.fields[e.get(s)]=r),n=r}return n.mapValue.fields}applyChanges(e,n,s){ys(n,(r,i)=>e[r]=i);for(const r of s)delete e[r]}clone(){return new dt(Fr(this.value))}}function om(t){const e=[];return ys(t.fields,(n,s)=>{const r=new We([n]);if(oo(s)){const i=om(s.mapValue).fields;if(i.length===0)e.push(r);else for(const o of i)e.push(r.child(o))}else e.push(r)}),new vt(e)}/**
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
 */class ze{constructor(e,n,s,r,i,o,a){this.key=e,this.documentType=n,this.version=s,this.readTime=r,this.createTime=i,this.data=o,this.documentState=a}static newInvalidDocument(e){return new ze(e,0,Y.min(),Y.min(),Y.min(),dt.empty(),0)}static newFoundDocument(e,n,s,r){return new ze(e,1,n,Y.min(),s,r,0)}static newNoDocument(e,n){return new ze(e,2,n,Y.min(),Y.min(),dt.empty(),0)}static newUnknownDocument(e,n){return new ze(e,3,n,Y.min(),Y.min(),dt.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(Y.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=dt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=dt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Y.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof ze&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new ze(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class Uo{constructor(e,n){this.position=e,this.inclusive=n}}function pf(t,e,n){let s=0;for(let r=0;r<t.position.length;r++){const i=e[r],o=t.position[r];if(i.field.isKeyField()?s=H.comparator(H.fromName(o.referenceValue),n.key):s=Xs(o,n.data.field(i.field)),i.dir==="desc"&&(s*=-1),s!==0)break}return s}function gf(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!Jt(t.position[n],e.position[n]))return!1;return!0}/**
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
 */class Vr{constructor(e,n="asc"){this.field=e,this.dir=n}}function rS(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
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
 */class am{}class xe extends am{constructor(e,n,s){super(),this.field=e,this.op=n,this.value=s}static create(e,n,s){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,s):new oS(e,n,s):n==="array-contains"?new cS(e,s):n==="in"?new uS(e,s):n==="not-in"?new hS(e,s):n==="array-contains-any"?new fS(e,s):new xe(e,n,s)}static createKeyFieldInFilter(e,n,s){return n==="in"?new aS(e,s):new lS(e,s)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&this.matchesComparison(Xs(n,this.value)):n!==null&&ds(this.value)===ds(n)&&this.matchesComparison(Xs(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return W()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}getFirstInequalityField(){return this.isInequality()?this.field:null}}class Xt extends am{constructor(e,n){super(),this.filters=e,this.op=n,this.lt=null}static create(e,n){return new Xt(e,n)}matches(e){return lm(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.lt!==null||(this.lt=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.lt}getFilters(){return Object.assign([],this.filters)}getFirstInequalityField(){const e=this.ft(n=>n.isInequality());return e!==null?e.field:null}ft(e){for(const n of this.getFlattenedFilters())if(e(n))return n;return null}}function lm(t){return t.op==="and"}function cm(t){return iS(t)&&lm(t)}function iS(t){for(const e of t.filters)if(e instanceof Xt)return!1;return!0}function Yl(t){if(t instanceof xe)return t.field.canonicalString()+t.op.toString()+Zs(t.value);if(cm(t))return t.filters.map(e=>Yl(e)).join(",");{const e=t.filters.map(n=>Yl(n)).join(",");return`${t.op}(${e})`}}function um(t,e){return t instanceof xe?function(n,s){return s instanceof xe&&n.op===s.op&&n.field.isEqual(s.field)&&Jt(n.value,s.value)}(t,e):t instanceof Xt?function(n,s){return s instanceof Xt&&n.op===s.op&&n.filters.length===s.filters.length?n.filters.reduce((r,i,o)=>r&&um(i,s.filters[o]),!0):!1}(t,e):void W()}function hm(t){return t instanceof xe?function(e){return`${e.field.canonicalString()} ${e.op} ${Zs(e.value)}`}(t):t instanceof Xt?function(e){return e.op.toString()+" {"+e.getFilters().map(hm).join(" ,")+"}"}(t):"Filter"}class oS extends xe{constructor(e,n,s){super(e,n,s),this.key=H.fromName(s.referenceValue)}matches(e){const n=H.comparator(e.key,this.key);return this.matchesComparison(n)}}class aS extends xe{constructor(e,n){super(e,"in",n),this.keys=fm("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class lS extends xe{constructor(e,n){super(e,"not-in",n),this.keys=fm("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function fm(t,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(s=>H.fromName(s.referenceValue))}class cS extends xe{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return du(n)&&ui(n.arrayValue,this.value)}}class uS extends xe{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&ui(this.value.arrayValue,n)}}class hS extends xe{constructor(e,n){super(e,"not-in",n)}matches(e){if(ui(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&!ui(this.value.arrayValue,n)}}class fS extends xe{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!du(n)||!n.arrayValue.values)&&n.arrayValue.values.some(s=>ui(this.value.arrayValue,s))}}/**
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
 */class dS{constructor(e,n=null,s=[],r=[],i=null,o=null,a=null){this.path=e,this.collectionGroup=n,this.orderBy=s,this.filters=r,this.limit=i,this.startAt=o,this.endAt=a,this.dt=null}}function mf(t,e=null,n=[],s=[],r=null,i=null,o=null){return new dS(t,e,n,s,r,i,o)}function pu(t){const e=X(t);if(e.dt===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(s=>Yl(s)).join(","),n+="|ob:",n+=e.orderBy.map(s=>function(r){return r.field.canonicalString()+r.dir}(s)).join(","),Ea(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(s=>Zs(s)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(s=>Zs(s)).join(",")),e.dt=n}return e.dt}function gu(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!rS(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!um(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!gf(t.startAt,e.startAt)&&gf(t.endAt,e.endAt)}function Jl(t){return H.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
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
 */class Ia{constructor(e,n=null,s=[],r=[],i=null,o="F",a=null,l=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=s,this.filters=r,this.limit=i,this.limitType=o,this.startAt=a,this.endAt=l,this.wt=null,this._t=null,this.startAt,this.endAt}}function pS(t,e,n,s,r,i,o,a){return new Ia(t,e,n,s,r,i,o,a)}function mu(t){return new Ia(t)}function yf(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function gS(t){return t.explicitOrderBy.length>0?t.explicitOrderBy[0].field:null}function mS(t){for(const e of t.filters){const n=e.getFirstInequalityField();if(n!==null)return n}return null}function yS(t){return t.collectionGroup!==null}function Hs(t){const e=X(t);if(e.wt===null){e.wt=[];const n=mS(e),s=gS(e);if(n!==null&&s===null)n.isKeyField()||e.wt.push(new Vr(n)),e.wt.push(new Vr(We.keyField(),"asc"));else{let r=!1;for(const i of e.explicitOrderBy)e.wt.push(i),i.field.isKeyField()&&(r=!0);if(!r){const i=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";e.wt.push(new Vr(We.keyField(),i))}}}return e.wt}function gn(t){const e=X(t);if(!e._t)if(e.limitType==="F")e._t=mf(e.path,e.collectionGroup,Hs(e),e.filters,e.limit,e.startAt,e.endAt);else{const n=[];for(const i of Hs(e)){const o=i.dir==="desc"?"asc":"desc";n.push(new Vr(i.field,o))}const s=e.endAt?new Uo(e.endAt.position,e.endAt.inclusive):null,r=e.startAt?new Uo(e.startAt.position,e.startAt.inclusive):null;e._t=mf(e.path,e.collectionGroup,n,e.filters,e.limit,s,r)}return e._t}function Xl(t,e,n){return new Ia(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function Ta(t,e){return gu(gn(t),gn(e))&&t.limitType===e.limitType}function dm(t){return`${pu(gn(t))}|lt:${t.limitType}`}function Zl(t){return`Query(target=${function(e){let n=e.path.canonicalString();return e.collectionGroup!==null&&(n+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(n+=`, filters: [${e.filters.map(s=>hm(s)).join(", ")}]`),Ea(e.limit)||(n+=", limit: "+e.limit),e.orderBy.length>0&&(n+=`, orderBy: [${e.orderBy.map(s=>function(r){return`${r.field.canonicalString()} (${r.dir})`}(s)).join(", ")}]`),e.startAt&&(n+=", startAt: ",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(s=>Zs(s)).join(",")),e.endAt&&(n+=", endAt: ",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(s=>Zs(s)).join(",")),`Target(${n})`}(gn(t))}; limitType=${t.limitType})`}function Sa(t,e){return e.isFoundDocument()&&function(n,s){const r=s.key.path;return n.collectionGroup!==null?s.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(r):H.isDocumentKey(n.path)?n.path.isEqual(r):n.path.isImmediateParentOf(r)}(t,e)&&function(n,s){for(const r of Hs(n))if(!r.field.isKeyField()&&s.data.field(r.field)===null)return!1;return!0}(t,e)&&function(n,s){for(const r of n.filters)if(!r.matches(s))return!1;return!0}(t,e)&&function(n,s){return!(n.startAt&&!function(r,i,o){const a=pf(r,i,o);return r.inclusive?a<=0:a<0}(n.startAt,Hs(n),s)||n.endAt&&!function(r,i,o){const a=pf(r,i,o);return r.inclusive?a>=0:a>0}(n.endAt,Hs(n),s))}(t,e)}function vS(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function pm(t){return(e,n)=>{let s=!1;for(const r of Hs(t)){const i=wS(r,e,n);if(i!==0)return i;s=s||r.field.isKeyField()}return 0}}function wS(t,e,n){const s=t.field.isKeyField()?H.comparator(e.key,n.key):function(r,i,o){const a=i.data.field(r),l=o.data.field(r);return a!==null&&l!==null?Xs(a,l):W()}(t.field,e,n);switch(t.dir){case"asc":return s;case"desc":return-1*s;default:return W()}}/**
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
 */class dr{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),s=this.inner[n];if(s!==void 0){for(const[r,i]of s)if(this.equalsFn(r,e))return i}}has(e){return this.get(e)!==void 0}set(e,n){const s=this.mapKeyFn(e),r=this.inner[s];if(r===void 0)return this.inner[s]=[[e,n]],void this.innerSize++;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return void(r[i]=[e,n]);r.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),s=this.inner[n];if(s===void 0)return!1;for(let r=0;r<s.length;r++)if(this.equalsFn(s[r][0],e))return s.length===1?delete this.inner[n]:s.splice(r,1),this.innerSize--,!0;return!1}forEach(e){ys(this.inner,(n,s)=>{for(const[r,i]of s)e(r,i)})}isEmpty(){return rm(this.inner)}size(){return this.innerSize}}/**
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
 */const _S=new Ee(H.comparator);function mn(){return _S}const gm=new Ee(H.comparator);function Cr(...t){let e=gm;for(const n of t)e=e.insert(n.key,n);return e}function mm(t){let e=gm;return t.forEach((n,s)=>e=e.insert(n,s.overlayedDocument)),e}function ns(){return Br()}function ym(){return Br()}function Br(){return new dr(t=>t.toString(),(t,e)=>t.isEqual(e))}const ES=new Ee(H.comparator),IS=new Xe(H.comparator);function Z(...t){let e=IS;for(const n of t)e=e.add(n);return e}const TS=new Xe(ie);function SS(){return TS}/**
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
 */function vm(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Lo(e)?"-0":e}}function wm(t){return{integerValue:""+t}}function bS(t,e){return eS(e)?wm(e):vm(t,e)}/**
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
 */class ba{constructor(){this._=void 0}}function AS(t,e,n){return t instanceof Fo?function(s,r){const i={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return r&&hu(r)&&(r=fu(r)),r&&(i.fields.__previous_value__=r),{mapValue:i}}(n,e):t instanceof hi?Em(t,e):t instanceof fi?Im(t,e):function(s,r){const i=_m(s,r),o=vf(i)+vf(s.gt);return Ql(i)&&Ql(s.gt)?wm(o):vm(s.serializer,o)}(t,e)}function CS(t,e,n){return t instanceof hi?Em(t,e):t instanceof fi?Im(t,e):n}function _m(t,e){return t instanceof Vo?Ql(n=e)||function(s){return!!s&&"doubleValue"in s}(n)?e:{integerValue:0}:null;var n}class Fo extends ba{}class hi extends ba{constructor(e){super(),this.elements=e}}function Em(t,e){const n=Tm(e);for(const s of t.elements)n.some(r=>Jt(r,s))||n.push(s);return{arrayValue:{values:n}}}class fi extends ba{constructor(e){super(),this.elements=e}}function Im(t,e){let n=Tm(e);for(const s of t.elements)n=n.filter(r=>!Jt(r,s));return{arrayValue:{values:n}}}class Vo extends ba{constructor(e,n){super(),this.serializer=e,this.gt=n}}function vf(t){return Ce(t.integerValue||t.doubleValue)}function Tm(t){return du(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}function RS(t,e){return t.field.isEqual(e.field)&&function(n,s){return n instanceof hi&&s instanceof hi||n instanceof fi&&s instanceof fi?Js(n.elements,s.elements,Jt):n instanceof Vo&&s instanceof Vo?Jt(n.gt,s.gt):n instanceof Fo&&s instanceof Fo}(t.transform,e.transform)}class kS{constructor(e,n){this.version=e,this.transformResults=n}}class Wt{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new Wt}static exists(e){return new Wt(void 0,e)}static updateTime(e){return new Wt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function ao(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class Aa{}function Sm(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new Am(t.key,Wt.none()):new xi(t.key,t.data,Wt.none());{const n=t.data,s=dt.empty();let r=new Xe(We.comparator);for(let i of e.fields)if(!r.has(i)){let o=n.field(i);o===null&&i.length>1&&(i=i.popLast(),o=n.field(i)),o===null?s.delete(i):s.set(i,o),r=r.add(i)}return new zn(t.key,s,new vt(r.toArray()),Wt.none())}}function NS(t,e,n){t instanceof xi?function(s,r,i){const o=s.value.clone(),a=_f(s.fieldTransforms,r,i.transformResults);o.setAll(a),r.convertToFoundDocument(i.version,o).setHasCommittedMutations()}(t,e,n):t instanceof zn?function(s,r,i){if(!ao(s.precondition,r))return void r.convertToUnknownDocument(i.version);const o=_f(s.fieldTransforms,r,i.transformResults),a=r.data;a.setAll(bm(s)),a.setAll(o),r.convertToFoundDocument(i.version,a).setHasCommittedMutations()}(t,e,n):function(s,r,i){r.convertToNoDocument(i.version).setHasCommittedMutations()}(0,e,n)}function $r(t,e,n,s){return t instanceof xi?function(r,i,o,a){if(!ao(r.precondition,i))return o;const l=r.value.clone(),c=Ef(r.fieldTransforms,a,i);return l.setAll(c),i.convertToFoundDocument(i.version,l).setHasLocalMutations(),null}(t,e,n,s):t instanceof zn?function(r,i,o,a){if(!ao(r.precondition,i))return o;const l=Ef(r.fieldTransforms,a,i),c=i.data;return c.setAll(bm(r)),c.setAll(l),i.convertToFoundDocument(i.version,c).setHasLocalMutations(),o===null?null:o.unionWith(r.fieldMask.fields).unionWith(r.fieldTransforms.map(u=>u.field))}(t,e,n,s):function(r,i,o){return ao(r.precondition,i)?(i.convertToNoDocument(i.version).setHasLocalMutations(),null):o}(t,e,n)}function DS(t,e){let n=null;for(const s of t.fieldTransforms){const r=e.data.field(s.field),i=_m(s.transform,r||null);i!=null&&(n===null&&(n=dt.empty()),n.set(s.field,i))}return n||null}function wf(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(n,s){return n===void 0&&s===void 0||!(!n||!s)&&Js(n,s,(r,i)=>RS(r,i))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class xi extends Aa{constructor(e,n,s,r=[]){super(),this.key=e,this.value=n,this.precondition=s,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class zn extends Aa{constructor(e,n,s,r,i=[]){super(),this.key=e,this.data=n,this.fieldMask=s,this.precondition=r,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function bm(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const s=t.data.field(n);e.set(n,s)}}),e}function _f(t,e,n){const s=new Map;we(t.length===n.length);for(let r=0;r<n.length;r++){const i=t[r],o=i.transform,a=e.data.field(i.field);s.set(i.field,CS(o,a,n[r]))}return s}function Ef(t,e,n){const s=new Map;for(const r of t){const i=r.transform,o=n.data.field(r.field);s.set(r.field,AS(i,o,e))}return s}class Am extends Aa{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class OS extends Aa{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class xS{constructor(e,n,s,r){this.batchId=e,this.localWriteTime=n,this.baseMutations=s,this.mutations=r}applyToRemoteDocument(e,n){const s=n.mutationResults;for(let r=0;r<this.mutations.length;r++){const i=this.mutations[r];i.key.isEqual(e.key)&&NS(i,e,s[r])}}applyToLocalView(e,n){for(const s of this.baseMutations)s.key.isEqual(e.key)&&(n=$r(s,e,n,this.localWriteTime));for(const s of this.mutations)s.key.isEqual(e.key)&&(n=$r(s,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const s=ym();return this.mutations.forEach(r=>{const i=e.get(r.key),o=i.overlayedDocument;let a=this.applyToLocalView(o,i.mutatedFields);a=n.has(r.key)?null:a;const l=Sm(o,a);l!==null&&s.set(r.key,l),o.isValidDocument()||o.convertToNoDocument(Y.min())}),s}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),Z())}isEqual(e){return this.batchId===e.batchId&&Js(this.mutations,e.mutations,(n,s)=>wf(n,s))&&Js(this.baseMutations,e.baseMutations,(n,s)=>wf(n,s))}}class yu{constructor(e,n,s,r){this.batch=e,this.commitVersion=n,this.mutationResults=s,this.docVersions=r}static from(e,n,s){we(e.mutations.length===s.length);let r=ES;const i=e.mutations;for(let o=0;o<i.length;o++)r=r.insert(i[o].key,s[o].version);return new yu(e,n,s,r)}}/**
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
 */class PS{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class MS{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
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
 */var be,se;function LS(t){switch(t){default:return W();case T.CANCELLED:case T.UNKNOWN:case T.DEADLINE_EXCEEDED:case T.RESOURCE_EXHAUSTED:case T.INTERNAL:case T.UNAVAILABLE:case T.UNAUTHENTICATED:return!1;case T.INVALID_ARGUMENT:case T.NOT_FOUND:case T.ALREADY_EXISTS:case T.PERMISSION_DENIED:case T.FAILED_PRECONDITION:case T.ABORTED:case T.OUT_OF_RANGE:case T.UNIMPLEMENTED:case T.DATA_LOSS:return!0}}function Cm(t){if(t===void 0)return pn("GRPC error has no .code"),T.UNKNOWN;switch(t){case be.OK:return T.OK;case be.CANCELLED:return T.CANCELLED;case be.UNKNOWN:return T.UNKNOWN;case be.DEADLINE_EXCEEDED:return T.DEADLINE_EXCEEDED;case be.RESOURCE_EXHAUSTED:return T.RESOURCE_EXHAUSTED;case be.INTERNAL:return T.INTERNAL;case be.UNAVAILABLE:return T.UNAVAILABLE;case be.UNAUTHENTICATED:return T.UNAUTHENTICATED;case be.INVALID_ARGUMENT:return T.INVALID_ARGUMENT;case be.NOT_FOUND:return T.NOT_FOUND;case be.ALREADY_EXISTS:return T.ALREADY_EXISTS;case be.PERMISSION_DENIED:return T.PERMISSION_DENIED;case be.FAILED_PRECONDITION:return T.FAILED_PRECONDITION;case be.ABORTED:return T.ABORTED;case be.OUT_OF_RANGE:return T.OUT_OF_RANGE;case be.UNIMPLEMENTED:return T.UNIMPLEMENTED;case be.DATA_LOSS:return T.DATA_LOSS;default:return W()}}(se=be||(be={}))[se.OK=0]="OK",se[se.CANCELLED=1]="CANCELLED",se[se.UNKNOWN=2]="UNKNOWN",se[se.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",se[se.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",se[se.NOT_FOUND=5]="NOT_FOUND",se[se.ALREADY_EXISTS=6]="ALREADY_EXISTS",se[se.PERMISSION_DENIED=7]="PERMISSION_DENIED",se[se.UNAUTHENTICATED=16]="UNAUTHENTICATED",se[se.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",se[se.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",se[se.ABORTED=10]="ABORTED",se[se.OUT_OF_RANGE=11]="OUT_OF_RANGE",se[se.UNIMPLEMENTED=12]="UNIMPLEMENTED",se[se.INTERNAL=13]="INTERNAL",se[se.UNAVAILABLE=14]="UNAVAILABLE",se[se.DATA_LOSS=15]="DATA_LOSS";/**
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
 */class vu{constructor(){this.onExistenceFilterMismatchCallbacks=new Map}static get instance(){return Qi}static getOrCreateInstance(){return Qi===null&&(Qi=new vu),Qi}onExistenceFilterMismatch(e){const n=Symbol();return this.onExistenceFilterMismatchCallbacks.set(n,e),()=>this.onExistenceFilterMismatchCallbacks.delete(n)}notifyOnExistenceFilterMismatch(e){this.onExistenceFilterMismatchCallbacks.forEach(n=>n(e))}}let Qi=null;/**
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
 */function US(){return new TextEncoder}/**
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
 */const FS=new js([4294967295,4294967295],0);function If(t){const e=US().encode(t),n=new VT;return n.update(e),new Uint8Array(n.digest())}function Tf(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),s=e.getUint32(4,!0),r=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new js([n,s],0),new js([r,i],0)]}class wu{constructor(e,n,s){if(this.bitmap=e,this.padding=n,this.hashCount=s,n<0||n>=8)throw new Rr(`Invalid padding: ${n}`);if(s<0)throw new Rr(`Invalid hash count: ${s}`);if(e.length>0&&this.hashCount===0)throw new Rr(`Invalid hash count: ${s}`);if(e.length===0&&n!==0)throw new Rr(`Invalid padding when bitmap length is 0: ${n}`);this.It=8*e.length-n,this.Tt=js.fromNumber(this.It)}Et(e,n,s){let r=e.add(n.multiply(js.fromNumber(s)));return r.compare(FS)===1&&(r=new js([r.getBits(0),r.getBits(1)],0)),r.modulo(this.Tt).toNumber()}At(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}vt(e){if(this.It===0)return!1;const n=If(e),[s,r]=Tf(n);for(let i=0;i<this.hashCount;i++){const o=this.Et(s,r,i);if(!this.At(o))return!1}return!0}static create(e,n,s){const r=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new wu(i,r,n);return s.forEach(a=>o.insert(a)),o}insert(e){if(this.It===0)return;const n=If(e),[s,r]=Tf(n);for(let i=0;i<this.hashCount;i++){const o=this.Et(s,r,i);this.Rt(o)}}Rt(e){const n=Math.floor(e/8),s=e%8;this.bitmap[n]|=1<<s}}class Rr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class Ca{constructor(e,n,s,r,i){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=s,this.documentUpdates=r,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,n,s){const r=new Map;return r.set(e,Pi.createSynthesizedTargetChangeForCurrentChange(e,n,s)),new Ca(Y.min(),r,new Ee(ie),mn(),Z())}}class Pi{constructor(e,n,s,r,i){this.resumeToken=e,this.current=n,this.addedDocuments=s,this.modifiedDocuments=r,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,n,s){return new Pi(s,n,Z(),Z(),Z())}}/**
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
 */class lo{constructor(e,n,s,r){this.Pt=e,this.removedTargetIds=n,this.key=s,this.bt=r}}class Rm{constructor(e,n){this.targetId=e,this.Vt=n}}class km{constructor(e,n,s=tt.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=n,this.resumeToken=s,this.cause=r}}class Sf{constructor(){this.St=0,this.Dt=Af(),this.Ct=tt.EMPTY_BYTE_STRING,this.xt=!1,this.Nt=!0}get current(){return this.xt}get resumeToken(){return this.Ct}get kt(){return this.St!==0}get Mt(){return this.Nt}$t(e){e.approximateByteSize()>0&&(this.Nt=!0,this.Ct=e)}Ot(){let e=Z(),n=Z(),s=Z();return this.Dt.forEach((r,i)=>{switch(i){case 0:e=e.add(r);break;case 2:n=n.add(r);break;case 1:s=s.add(r);break;default:W()}}),new Pi(this.Ct,this.xt,e,n,s)}Ft(){this.Nt=!1,this.Dt=Af()}Bt(e,n){this.Nt=!0,this.Dt=this.Dt.insert(e,n)}Lt(e){this.Nt=!0,this.Dt=this.Dt.remove(e)}qt(){this.St+=1}Ut(){this.St-=1}Kt(){this.Nt=!0,this.xt=!0}}class VS{constructor(e){this.Gt=e,this.Qt=new Map,this.jt=mn(),this.zt=bf(),this.Wt=new Ee(ie)}Ht(e){for(const n of e.Pt)e.bt&&e.bt.isFoundDocument()?this.Jt(n,e.bt):this.Yt(n,e.key,e.bt);for(const n of e.removedTargetIds)this.Yt(n,e.key,e.bt)}Xt(e){this.forEachTarget(e,n=>{const s=this.Zt(n);switch(e.state){case 0:this.te(n)&&s.$t(e.resumeToken);break;case 1:s.Ut(),s.kt||s.Ft(),s.$t(e.resumeToken);break;case 2:s.Ut(),s.kt||this.removeTarget(n);break;case 3:this.te(n)&&(s.Kt(),s.$t(e.resumeToken));break;case 4:this.te(n)&&(this.ee(n),s.$t(e.resumeToken));break;default:W()}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.Qt.forEach((s,r)=>{this.te(r)&&n(r)})}ne(e){var n;const s=e.targetId,r=e.Vt.count,i=this.se(s);if(i){const o=i.target;if(Jl(o))if(r===0){const a=new H(o.path);this.Yt(s,a,ze.newNoDocument(a,Y.min()))}else we(r===1);else{const a=this.ie(s);if(a!==r){const l=this.re(e,a);if(l!==0){this.ee(s);const c=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Wt=this.Wt.insert(s,c)}(n=vu.instance)===null||n===void 0||n.notifyOnExistenceFilterMismatch(function(c,u,h){var f,p,y,E,A,N;const R={localCacheCount:u,existenceFilterCount:h.count},M=h.unchangedNames;return M&&(R.bloomFilter={applied:c===0,hashCount:(f=M==null?void 0:M.hashCount)!==null&&f!==void 0?f:0,bitmapLength:(E=(y=(p=M==null?void 0:M.bits)===null||p===void 0?void 0:p.bitmap)===null||y===void 0?void 0:y.length)!==null&&E!==void 0?E:0,padding:(N=(A=M==null?void 0:M.bits)===null||A===void 0?void 0:A.padding)!==null&&N!==void 0?N:0}),R}(l,a,e.Vt))}}}}re(e,n){const{unchangedNames:s,count:r}=e.Vt;if(!s||!s.bits)return 1;const{bits:{bitmap:i="",padding:o=0},hashCount:a=0}=s;let l,c;try{l=fs(i).toUint8Array()}catch(u){if(u instanceof im)return Ys("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),1;throw u}try{c=new wu(l,o,a)}catch(u){return Ys(u instanceof Rr?"BloomFilter error: ":"Applying bloom filter failed: ",u),1}return c.It===0?1:r!==n-this.oe(e.targetId,c)?2:0}oe(e,n){const s=this.Gt.getRemoteKeysForTarget(e);let r=0;return s.forEach(i=>{const o=this.Gt.ue(),a=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;n.vt(a)||(this.Yt(e,i,null),r++)}),r}ce(e){const n=new Map;this.Qt.forEach((i,o)=>{const a=this.se(o);if(a){if(i.current&&Jl(a.target)){const l=new H(a.target.path);this.jt.get(l)!==null||this.ae(o,l)||this.Yt(o,l,ze.newNoDocument(l,e))}i.Mt&&(n.set(o,i.Ot()),i.Ft())}});let s=Z();this.zt.forEach((i,o)=>{let a=!0;o.forEachWhile(l=>{const c=this.se(l);return!c||c.purpose==="TargetPurposeLimboResolution"||(a=!1,!1)}),a&&(s=s.add(i))}),this.jt.forEach((i,o)=>o.setReadTime(e));const r=new Ca(e,n,this.Wt,this.jt,s);return this.jt=mn(),this.zt=bf(),this.Wt=new Ee(ie),r}Jt(e,n){if(!this.te(e))return;const s=this.ae(e,n.key)?2:0;this.Zt(e).Bt(n.key,s),this.jt=this.jt.insert(n.key,n),this.zt=this.zt.insert(n.key,this.he(n.key).add(e))}Yt(e,n,s){if(!this.te(e))return;const r=this.Zt(e);this.ae(e,n)?r.Bt(n,1):r.Lt(n),this.zt=this.zt.insert(n,this.he(n).delete(e)),s&&(this.jt=this.jt.insert(n,s))}removeTarget(e){this.Qt.delete(e)}ie(e){const n=this.Zt(e).Ot();return this.Gt.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}qt(e){this.Zt(e).qt()}Zt(e){let n=this.Qt.get(e);return n||(n=new Sf,this.Qt.set(e,n)),n}he(e){let n=this.zt.get(e);return n||(n=new Xe(ie),this.zt=this.zt.insert(e,n)),n}te(e){const n=this.se(e)!==null;return n||V("WatchChangeAggregator","Detected inactive target",e),n}se(e){const n=this.Qt.get(e);return n&&n.kt?null:this.Gt.le(e)}ee(e){this.Qt.set(e,new Sf),this.Gt.getRemoteKeysForTarget(e).forEach(n=>{this.Yt(e,n,null)})}ae(e,n){return this.Gt.getRemoteKeysForTarget(e).has(n)}}function bf(){return new Ee(H.comparator)}function Af(){return new Ee(H.comparator)}const BS={asc:"ASCENDING",desc:"DESCENDING"},$S={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},jS={and:"AND",or:"OR"};class HS{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function ec(t,e){return t.useProto3Json||Ea(e)?e:{value:e}}function Bo(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Nm(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function KS(t,e){return Bo(t,e.toTimestamp())}function Qt(t){return we(!!t),Y.fromTimestamp(function(e){const n=$n(e);return new Pe(n.seconds,n.nanos)}(t))}function _u(t,e){return function(n){return new Te(["projects",n.projectId,"databases",n.database])}(t).child("documents").child(e).canonicalString()}function Dm(t){const e=Te.fromString(t);return we(Mm(e)),e}function tc(t,e){return _u(t.databaseId,e.path)}function cl(t,e){const n=Dm(e);if(n.get(1)!==t.databaseId.projectId)throw new j(T.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new j(T.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new H(Om(n))}function nc(t,e){return _u(t.databaseId,e)}function qS(t){const e=Dm(t);return e.length===4?Te.emptyPath():Om(e)}function sc(t){return new Te(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function Om(t){return we(t.length>4&&t.get(4)==="documents"),t.popFirst(5)}function Cf(t,e,n){return{name:tc(t,e),fields:n.value.mapValue.fields}}function zS(t,e){let n;if("targetChange"in e){e.targetChange;const s=function(l){return l==="NO_CHANGE"?0:l==="ADD"?1:l==="REMOVE"?2:l==="CURRENT"?3:l==="RESET"?4:W()}(e.targetChange.targetChangeType||"NO_CHANGE"),r=e.targetChange.targetIds||[],i=function(l,c){return l.useProto3Json?(we(c===void 0||typeof c=="string"),tt.fromBase64String(c||"")):(we(c===void 0||c instanceof Uint8Array),tt.fromUint8Array(c||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,a=o&&function(l){const c=l.code===void 0?T.UNKNOWN:Cm(l.code);return new j(c,l.message||"")}(o);n=new km(s,r,i,a||null)}else if("documentChange"in e){e.documentChange;const s=e.documentChange;s.document,s.document.name,s.document.updateTime;const r=cl(t,s.document.name),i=Qt(s.document.updateTime),o=s.document.createTime?Qt(s.document.createTime):Y.min(),a=new dt({mapValue:{fields:s.document.fields}}),l=ze.newFoundDocument(r,i,o,a),c=s.targetIds||[],u=s.removedTargetIds||[];n=new lo(c,u,l.key,l)}else if("documentDelete"in e){e.documentDelete;const s=e.documentDelete;s.document;const r=cl(t,s.document),i=s.readTime?Qt(s.readTime):Y.min(),o=ze.newNoDocument(r,i),a=s.removedTargetIds||[];n=new lo([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const s=e.documentRemove;s.document;const r=cl(t,s.document),i=s.removedTargetIds||[];n=new lo([],i,r,null)}else{if(!("filter"in e))return W();{e.filter;const s=e.filter;s.targetId;const{count:r=0,unchangedNames:i}=s,o=new MS(r,i),a=s.targetId;n=new Rm(a,o)}}return n}function GS(t,e){let n;if(e instanceof xi)n={update:Cf(t,e.key,e.value)};else if(e instanceof Am)n={delete:tc(t,e.key)};else if(e instanceof zn)n={update:Cf(t,e.key,e.data),updateMask:nb(e.fieldMask)};else{if(!(e instanceof OS))return W();n={verify:tc(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(s=>function(r,i){const o=i.transform;if(o instanceof Fo)return{fieldPath:i.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(o instanceof hi)return{fieldPath:i.field.canonicalString(),appendMissingElements:{values:o.elements}};if(o instanceof fi)return{fieldPath:i.field.canonicalString(),removeAllFromArray:{values:o.elements}};if(o instanceof Vo)return{fieldPath:i.field.canonicalString(),increment:o.gt};throw W()}(0,s))),e.precondition.isNone||(n.currentDocument=function(s,r){return r.updateTime!==void 0?{updateTime:KS(s,r.updateTime)}:r.exists!==void 0?{exists:r.exists}:W()}(t,e.precondition)),n}function WS(t,e){return t&&t.length>0?(we(e!==void 0),t.map(n=>function(s,r){let i=s.updateTime?Qt(s.updateTime):Qt(r);return i.isEqual(Y.min())&&(i=Qt(r)),new kS(i,s.transformResults||[])}(n,e))):[]}function QS(t,e){return{documents:[nc(t,e.path)]}}function YS(t,e){const n={structuredQuery:{}},s=e.path;e.collectionGroup!==null?(n.parent=nc(t,s),n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(n.parent=nc(t,s.popLast()),n.structuredQuery.from=[{collectionId:s.lastSegment()}]);const r=function(l){if(l.length!==0)return Pm(Xt.create(l,"and"))}(e.filters);r&&(n.structuredQuery.where=r);const i=function(l){if(l.length!==0)return l.map(c=>function(u){return{field:As(u.field),direction:ZS(u.dir)}}(c))}(e.orderBy);i&&(n.structuredQuery.orderBy=i);const o=ec(t,e.limit);var a;return o!==null&&(n.structuredQuery.limit=o),e.startAt&&(n.structuredQuery.startAt={before:(a=e.startAt).inclusive,values:a.position}),e.endAt&&(n.structuredQuery.endAt=function(l){return{before:!l.inclusive,values:l.position}}(e.endAt)),n}function JS(t){let e=qS(t.parent);const n=t.structuredQuery,s=n.from?n.from.length:0;let r=null;if(s>0){we(s===1);const u=n.from[0];u.allDescendants?r=u.collectionId:e=e.child(u.collectionId)}let i=[];n.where&&(i=function(u){const h=xm(u);return h instanceof Xt&&cm(h)?h.getFilters():[h]}(n.where));let o=[];n.orderBy&&(o=n.orderBy.map(u=>function(h){return new Vr(Cs(h.field),function(f){switch(f){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(h.direction))}(u)));let a=null;n.limit&&(a=function(u){let h;return h=typeof u=="object"?u.value:u,Ea(h)?null:h}(n.limit));let l=null;n.startAt&&(l=function(u){const h=!!u.before,f=u.values||[];return new Uo(f,h)}(n.startAt));let c=null;return n.endAt&&(c=function(u){const h=!u.before,f=u.values||[];return new Uo(f,h)}(n.endAt)),pS(e,r,o,i,a,"F",l,c)}function XS(t,e){const n=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return W()}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function xm(t){return t.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const n=Cs(e.unaryFilter.field);return xe.create(n,"==",{doubleValue:NaN});case"IS_NULL":const s=Cs(e.unaryFilter.field);return xe.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=Cs(e.unaryFilter.field);return xe.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const i=Cs(e.unaryFilter.field);return xe.create(i,"!=",{nullValue:"NULL_VALUE"});default:return W()}}(t):t.fieldFilter!==void 0?function(e){return xe.create(Cs(e.fieldFilter.field),function(n){switch(n){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return W()}}(e.fieldFilter.op),e.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(e){return Xt.create(e.compositeFilter.filters.map(n=>xm(n)),function(n){switch(n){case"AND":return"and";case"OR":return"or";default:return W()}}(e.compositeFilter.op))}(t):W()}function ZS(t){return BS[t]}function eb(t){return $S[t]}function tb(t){return jS[t]}function As(t){return{fieldPath:t.canonicalString()}}function Cs(t){return We.fromServerFormat(t.fieldPath)}function Pm(t){return t instanceof xe?function(e){if(e.op==="=="){if(df(e.value))return{unaryFilter:{field:As(e.field),op:"IS_NAN"}};if(ff(e.value))return{unaryFilter:{field:As(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(df(e.value))return{unaryFilter:{field:As(e.field),op:"IS_NOT_NAN"}};if(ff(e.value))return{unaryFilter:{field:As(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:As(e.field),op:eb(e.op),value:e.value}}}(t):t instanceof Xt?function(e){const n=e.getFilters().map(s=>Pm(s));return n.length===1?n[0]:{compositeFilter:{op:tb(e.op),filters:n}}}(t):W()}function nb(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function Mm(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
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
 */class Nn{constructor(e,n,s,r,i=Y.min(),o=Y.min(),a=tt.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=n,this.purpose=s,this.sequenceNumber=r,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=a,this.expectedCount=l}withSequenceNumber(e){return new Nn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new Nn(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Nn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Nn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class sb{constructor(e){this.fe=e}}function rb(t){const e=JS({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?Xl(e,e.limit,"L"):e}/**
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
 */class ib{constructor(){this.rn=new ob}addToCollectionParentIndex(e,n){return this.rn.add(n),b.resolve()}getCollectionParents(e,n){return b.resolve(this.rn.getEntries(n))}addFieldIndex(e,n){return b.resolve()}deleteFieldIndex(e,n){return b.resolve()}getDocumentsMatchingTarget(e,n){return b.resolve(null)}getIndexType(e,n){return b.resolve(0)}getFieldIndexes(e,n){return b.resolve([])}getNextCollectionGroupToUpdate(e){return b.resolve(null)}getMinOffset(e,n){return b.resolve(Bn.min())}getMinOffsetFromCollectionGroup(e,n){return b.resolve(Bn.min())}updateCollectionGroup(e,n,s){return b.resolve()}updateIndexEntries(e,n){return b.resolve()}}class ob{constructor(){this.index={}}add(e){const n=e.lastSegment(),s=e.popLast(),r=this.index[n]||new Xe(Te.comparator),i=!r.has(s);return this.index[n]=r.add(s),i}has(e){const n=e.lastSegment(),s=e.popLast(),r=this.index[n];return r&&r.has(s)}getEntries(e){return(this.index[e]||new Xe(Te.comparator)).toArray()}}/**
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
 */class er{constructor(e){this.Nn=e}next(){return this.Nn+=2,this.Nn}static kn(){return new er(0)}static Mn(){return new er(-1)}}/**
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
 */class ab{constructor(){this.changes=new dr(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,ze.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const s=this.changes.get(n);return s!==void 0?b.resolve(s):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class lb{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
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
 */class cb{constructor(e,n,s,r){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=s,this.indexManager=r}getDocument(e,n){let s=null;return this.documentOverlayCache.getOverlay(e,n).next(r=>(s=r,this.remoteDocumentCache.getEntry(e,n))).next(r=>(s!==null&&$r(s.mutation,r,vt.empty(),Pe.now()),r))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(s=>this.getLocalViewOfDocuments(e,s,Z()).next(()=>s))}getLocalViewOfDocuments(e,n,s=Z()){const r=ns();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,s).next(i=>{let o=Cr();return i.forEach((a,l)=>{o=o.insert(a,l.overlayedDocument)}),o}))}getOverlayedDocuments(e,n){const s=ns();return this.populateOverlays(e,s,n).next(()=>this.computeViews(e,n,s,Z()))}populateOverlays(e,n,s){const r=[];return s.forEach(i=>{n.has(i)||r.push(i)}),this.documentOverlayCache.getOverlays(e,r).next(i=>{i.forEach((o,a)=>{n.set(o,a)})})}computeViews(e,n,s,r){let i=mn();const o=Br(),a=Br();return n.forEach((l,c)=>{const u=s.get(c.key);r.has(c.key)&&(u===void 0||u.mutation instanceof zn)?i=i.insert(c.key,c):u!==void 0?(o.set(c.key,u.mutation.getFieldMask()),$r(u.mutation,c,u.mutation.getFieldMask(),Pe.now())):o.set(c.key,vt.empty())}),this.recalculateAndSaveOverlays(e,i).next(l=>(l.forEach((c,u)=>o.set(c,u)),n.forEach((c,u)=>{var h;return a.set(c,new lb(u,(h=o.get(c))!==null&&h!==void 0?h:null))}),a))}recalculateAndSaveOverlays(e,n){const s=Br();let r=new Ee((o,a)=>o-a),i=Z();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(o=>{for(const a of o)a.keys().forEach(l=>{const c=n.get(l);if(c===null)return;let u=s.get(l)||vt.empty();u=a.applyToLocalView(c,u),s.set(l,u);const h=(r.get(a.batchId)||Z()).add(l);r=r.insert(a.batchId,h)})}).next(()=>{const o=[],a=r.getReverseIterator();for(;a.hasNext();){const l=a.getNext(),c=l.key,u=l.value,h=ym();u.forEach(f=>{if(!i.has(f)){const p=Sm(n.get(f),s.get(f));p!==null&&h.set(f,p),i=i.add(f)}}),o.push(this.documentOverlayCache.saveOverlays(e,c,h))}return b.waitFor(o)}).next(()=>s)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(s=>this.recalculateAndSaveOverlays(e,s))}getDocumentsMatchingQuery(e,n,s){return function(r){return H.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):yS(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,s):this.getDocumentsMatchingCollectionQuery(e,n,s)}getNextDocuments(e,n,s,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,s,r).next(i=>{const o=r-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,s.largestBatchId,r-i.size):b.resolve(ns());let a=-1,l=i;return o.next(c=>b.forEach(c,(u,h)=>(a<h.largestBatchId&&(a=h.largestBatchId),i.get(u)?b.resolve():this.remoteDocumentCache.getEntry(e,u).next(f=>{l=l.insert(u,f)}))).next(()=>this.populateOverlays(e,c,i)).next(()=>this.computeViews(e,l,c,Z())).next(u=>({batchId:a,changes:mm(u)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new H(n)).next(s=>{let r=Cr();return s.isFoundDocument()&&(r=r.insert(s.key,s)),r})}getDocumentsMatchingCollectionGroupQuery(e,n,s){const r=n.collectionGroup;let i=Cr();return this.indexManager.getCollectionParents(e,r).next(o=>b.forEach(o,a=>{const l=function(c,u){return new Ia(u,null,c.explicitOrderBy.slice(),c.filters.slice(),c.limit,c.limitType,c.startAt,c.endAt)}(n,a.child(r));return this.getDocumentsMatchingCollectionQuery(e,l,s).next(c=>{c.forEach((u,h)=>{i=i.insert(u,h)})})}).next(()=>i))}getDocumentsMatchingCollectionQuery(e,n,s){let r;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,s.largestBatchId).next(i=>(r=i,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,s,r))).next(i=>{r.forEach((a,l)=>{const c=l.getKey();i.get(c)===null&&(i=i.insert(c,ze.newInvalidDocument(c)))});let o=Cr();return i.forEach((a,l)=>{const c=r.get(a);c!==void 0&&$r(c.mutation,l,vt.empty(),Pe.now()),Sa(n,l)&&(o=o.insert(a,l))}),o})}}/**
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
 */class ub{constructor(e){this.serializer=e,this.cs=new Map,this.hs=new Map}getBundleMetadata(e,n){return b.resolve(this.cs.get(n))}saveBundleMetadata(e,n){var s;return this.cs.set(n.id,{id:(s=n).id,version:s.version,createTime:Qt(s.createTime)}),b.resolve()}getNamedQuery(e,n){return b.resolve(this.hs.get(n))}saveNamedQuery(e,n){return this.hs.set(n.name,function(s){return{name:s.name,query:rb(s.bundledQuery),readTime:Qt(s.readTime)}}(n)),b.resolve()}}/**
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
 */class hb{constructor(){this.overlays=new Ee(H.comparator),this.ls=new Map}getOverlay(e,n){return b.resolve(this.overlays.get(n))}getOverlays(e,n){const s=ns();return b.forEach(n,r=>this.getOverlay(e,r).next(i=>{i!==null&&s.set(r,i)})).next(()=>s)}saveOverlays(e,n,s){return s.forEach((r,i)=>{this.we(e,n,i)}),b.resolve()}removeOverlaysForBatchId(e,n,s){const r=this.ls.get(s);return r!==void 0&&(r.forEach(i=>this.overlays=this.overlays.remove(i)),this.ls.delete(s)),b.resolve()}getOverlaysForCollection(e,n,s){const r=ns(),i=n.length+1,o=new H(n.child("")),a=this.overlays.getIteratorFrom(o);for(;a.hasNext();){const l=a.getNext().value,c=l.getKey();if(!n.isPrefixOf(c.path))break;c.path.length===i&&l.largestBatchId>s&&r.set(l.getKey(),l)}return b.resolve(r)}getOverlaysForCollectionGroup(e,n,s,r){let i=new Ee((c,u)=>c-u);const o=this.overlays.getIterator();for(;o.hasNext();){const c=o.getNext().value;if(c.getKey().getCollectionGroup()===n&&c.largestBatchId>s){let u=i.get(c.largestBatchId);u===null&&(u=ns(),i=i.insert(c.largestBatchId,u)),u.set(c.getKey(),c)}}const a=ns(),l=i.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((c,u)=>a.set(c,u)),!(a.size()>=r)););return b.resolve(a)}we(e,n,s){const r=this.overlays.get(s.key);if(r!==null){const o=this.ls.get(r.largestBatchId).delete(s.key);this.ls.set(r.largestBatchId,o)}this.overlays=this.overlays.insert(s.key,new PS(n,s));let i=this.ls.get(n);i===void 0&&(i=Z(),this.ls.set(n,i)),this.ls.set(n,i.add(s.key))}}/**
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
 */class Eu{constructor(){this.fs=new Xe(Le.ds),this.ws=new Xe(Le._s)}isEmpty(){return this.fs.isEmpty()}addReference(e,n){const s=new Le(e,n);this.fs=this.fs.add(s),this.ws=this.ws.add(s)}gs(e,n){e.forEach(s=>this.addReference(s,n))}removeReference(e,n){this.ys(new Le(e,n))}ps(e,n){e.forEach(s=>this.removeReference(s,n))}Is(e){const n=new H(new Te([])),s=new Le(n,e),r=new Le(n,e+1),i=[];return this.ws.forEachInRange([s,r],o=>{this.ys(o),i.push(o.key)}),i}Ts(){this.fs.forEach(e=>this.ys(e))}ys(e){this.fs=this.fs.delete(e),this.ws=this.ws.delete(e)}Es(e){const n=new H(new Te([])),s=new Le(n,e),r=new Le(n,e+1);let i=Z();return this.ws.forEachInRange([s,r],o=>{i=i.add(o.key)}),i}containsKey(e){const n=new Le(e,0),s=this.fs.firstAfterOrEqual(n);return s!==null&&e.isEqual(s.key)}}class Le{constructor(e,n){this.key=e,this.As=n}static ds(e,n){return H.comparator(e.key,n.key)||ie(e.As,n.As)}static _s(e,n){return ie(e.As,n.As)||H.comparator(e.key,n.key)}}/**
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
 */class fb{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.vs=1,this.Rs=new Xe(Le.ds)}checkEmpty(e){return b.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,s,r){const i=this.vs;this.vs++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new xS(i,n,s,r);this.mutationQueue.push(o);for(const a of r)this.Rs=this.Rs.add(new Le(a.key,i)),this.indexManager.addToCollectionParentIndex(e,a.key.path.popLast());return b.resolve(o)}lookupMutationBatch(e,n){return b.resolve(this.Ps(n))}getNextMutationBatchAfterBatchId(e,n){const s=n+1,r=this.bs(s),i=r<0?0:r;return b.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return b.resolve(this.mutationQueue.length===0?-1:this.vs-1)}getAllMutationBatches(e){return b.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const s=new Le(n,0),r=new Le(n,Number.POSITIVE_INFINITY),i=[];return this.Rs.forEachInRange([s,r],o=>{const a=this.Ps(o.As);i.push(a)}),b.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,n){let s=new Xe(ie);return n.forEach(r=>{const i=new Le(r,0),o=new Le(r,Number.POSITIVE_INFINITY);this.Rs.forEachInRange([i,o],a=>{s=s.add(a.As)})}),b.resolve(this.Vs(s))}getAllMutationBatchesAffectingQuery(e,n){const s=n.path,r=s.length+1;let i=s;H.isDocumentKey(i)||(i=i.child(""));const o=new Le(new H(i),0);let a=new Xe(ie);return this.Rs.forEachWhile(l=>{const c=l.key.path;return!!s.isPrefixOf(c)&&(c.length===r&&(a=a.add(l.As)),!0)},o),b.resolve(this.Vs(a))}Vs(e){const n=[];return e.forEach(s=>{const r=this.Ps(s);r!==null&&n.push(r)}),n}removeMutationBatch(e,n){we(this.Ss(n.batchId,"removed")===0),this.mutationQueue.shift();let s=this.Rs;return b.forEach(n.mutations,r=>{const i=new Le(r.key,n.batchId);return s=s.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)}).next(()=>{this.Rs=s})}Cn(e){}containsKey(e,n){const s=new Le(n,0),r=this.Rs.firstAfterOrEqual(s);return b.resolve(n.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,b.resolve()}Ss(e,n){return this.bs(e)}bs(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Ps(e){const n=this.bs(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
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
 */class db{constructor(e){this.Ds=e,this.docs=new Ee(H.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const s=n.key,r=this.docs.get(s),i=r?r.size:0,o=this.Ds(n);return this.docs=this.docs.insert(s,{document:n.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,s.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const s=this.docs.get(n);return b.resolve(s?s.document.mutableCopy():ze.newInvalidDocument(n))}getEntries(e,n){let s=mn();return n.forEach(r=>{const i=this.docs.get(r);s=s.insert(r,i?i.document.mutableCopy():ze.newInvalidDocument(r))}),b.resolve(s)}getDocumentsMatchingQuery(e,n,s,r){let i=mn();const o=n.path,a=new H(o.child("")),l=this.docs.getIteratorFrom(a);for(;l.hasNext();){const{key:c,value:{document:u}}=l.getNext();if(!o.isPrefixOf(c.path))break;c.path.length>o.length+1||JT(YT(u),s)<=0||(r.has(u.key)||Sa(n,u))&&(i=i.insert(u.key,u.mutableCopy()))}return b.resolve(i)}getAllFromCollectionGroup(e,n,s,r){W()}Cs(e,n){return b.forEach(this.docs,s=>n(s))}newChangeBuffer(e){return new pb(this)}getSize(e){return b.resolve(this.size)}}class pb extends ab{constructor(e){super(),this.os=e}applyChanges(e){const n=[];return this.changes.forEach((s,r)=>{r.isValidDocument()?n.push(this.os.addEntry(e,r)):this.os.removeEntry(s)}),b.waitFor(n)}getFromCache(e,n){return this.os.getEntry(e,n)}getAllFromCache(e,n){return this.os.getEntries(e,n)}}/**
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
 */class gb{constructor(e){this.persistence=e,this.xs=new dr(n=>pu(n),gu),this.lastRemoteSnapshotVersion=Y.min(),this.highestTargetId=0,this.Ns=0,this.ks=new Eu,this.targetCount=0,this.Ms=er.kn()}forEachTarget(e,n){return this.xs.forEach((s,r)=>n(r)),b.resolve()}getLastRemoteSnapshotVersion(e){return b.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return b.resolve(this.Ns)}allocateTargetId(e){return this.highestTargetId=this.Ms.next(),b.resolve(this.highestTargetId)}setTargetsMetadata(e,n,s){return s&&(this.lastRemoteSnapshotVersion=s),n>this.Ns&&(this.Ns=n),b.resolve()}Fn(e){this.xs.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.Ms=new er(n),this.highestTargetId=n),e.sequenceNumber>this.Ns&&(this.Ns=e.sequenceNumber)}addTargetData(e,n){return this.Fn(n),this.targetCount+=1,b.resolve()}updateTargetData(e,n){return this.Fn(n),b.resolve()}removeTargetData(e,n){return this.xs.delete(n.target),this.ks.Is(n.targetId),this.targetCount-=1,b.resolve()}removeTargets(e,n,s){let r=0;const i=[];return this.xs.forEach((o,a)=>{a.sequenceNumber<=n&&s.get(a.targetId)===null&&(this.xs.delete(o),i.push(this.removeMatchingKeysForTargetId(e,a.targetId)),r++)}),b.waitFor(i).next(()=>r)}getTargetCount(e){return b.resolve(this.targetCount)}getTargetData(e,n){const s=this.xs.get(n)||null;return b.resolve(s)}addMatchingKeys(e,n,s){return this.ks.gs(n,s),b.resolve()}removeMatchingKeys(e,n,s){this.ks.ps(n,s);const r=this.persistence.referenceDelegate,i=[];return r&&n.forEach(o=>{i.push(r.markPotentiallyOrphaned(e,o))}),b.waitFor(i)}removeMatchingKeysForTargetId(e,n){return this.ks.Is(n),b.resolve()}getMatchingKeysForTargetId(e,n){const s=this.ks.Es(n);return b.resolve(s)}containsKey(e,n){return b.resolve(this.ks.containsKey(n))}}/**
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
 */class mb{constructor(e,n){this.$s={},this.overlays={},this.Os=new uu(0),this.Fs=!1,this.Fs=!0,this.referenceDelegate=e(this),this.Bs=new gb(this),this.indexManager=new ib,this.remoteDocumentCache=function(s){return new db(s)}(s=>this.referenceDelegate.Ls(s)),this.serializer=new sb(n),this.qs=new ub(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Fs=!1,Promise.resolve()}get started(){return this.Fs}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new hb,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let s=this.$s[e.toKey()];return s||(s=new fb(n,this.referenceDelegate),this.$s[e.toKey()]=s),s}getTargetCache(){return this.Bs}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.qs}runTransaction(e,n,s){V("MemoryPersistence","Starting transaction:",e);const r=new yb(this.Os.next());return this.referenceDelegate.Us(),s(r).next(i=>this.referenceDelegate.Ks(r).next(()=>i)).toPromise().then(i=>(r.raiseOnCommittedEvent(),i))}Gs(e,n){return b.or(Object.values(this.$s).map(s=>()=>s.containsKey(e,n)))}}class yb extends ZT{constructor(e){super(),this.currentSequenceNumber=e}}class Iu{constructor(e){this.persistence=e,this.Qs=new Eu,this.js=null}static zs(e){return new Iu(e)}get Ws(){if(this.js)return this.js;throw W()}addReference(e,n,s){return this.Qs.addReference(s,n),this.Ws.delete(s.toString()),b.resolve()}removeReference(e,n,s){return this.Qs.removeReference(s,n),this.Ws.add(s.toString()),b.resolve()}markPotentiallyOrphaned(e,n){return this.Ws.add(n.toString()),b.resolve()}removeTarget(e,n){this.Qs.Is(n.targetId).forEach(r=>this.Ws.add(r.toString()));const s=this.persistence.getTargetCache();return s.getMatchingKeysForTargetId(e,n.targetId).next(r=>{r.forEach(i=>this.Ws.add(i.toString()))}).next(()=>s.removeTargetData(e,n))}Us(){this.js=new Set}Ks(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return b.forEach(this.Ws,s=>{const r=H.fromPath(s);return this.Hs(e,r).next(i=>{i||n.removeEntry(r,Y.min())})}).next(()=>(this.js=null,n.apply(e)))}updateLimboDocument(e,n){return this.Hs(e,n).next(s=>{s?this.Ws.delete(n.toString()):this.Ws.add(n.toString())})}Ls(e){return 0}Hs(e,n){return b.or([()=>b.resolve(this.Qs.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Gs(e,n)])}}/**
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
 */class Tu{constructor(e,n,s,r){this.targetId=e,this.fromCache=n,this.Fi=s,this.Bi=r}static Li(e,n){let s=Z(),r=Z();for(const i of n.docChanges)switch(i.type){case 0:s=s.add(i.doc.key);break;case 1:r=r.add(i.doc.key)}return new Tu(e,n.fromCache,s,r)}}/**
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
 */class vb{constructor(){this.qi=!1}initialize(e,n){this.Ui=e,this.indexManager=n,this.qi=!0}getDocumentsMatchingQuery(e,n,s,r){return this.Ki(e,n).next(i=>i||this.Gi(e,n,r,s)).next(i=>i||this.Qi(e,n))}Ki(e,n){if(yf(n))return b.resolve(null);let s=gn(n);return this.indexManager.getIndexType(e,s).next(r=>r===0?null:(n.limit!==null&&r===1&&(n=Xl(n,null,"F"),s=gn(n)),this.indexManager.getDocumentsMatchingTarget(e,s).next(i=>{const o=Z(...i);return this.Ui.getDocuments(e,o).next(a=>this.indexManager.getMinOffset(e,s).next(l=>{const c=this.ji(n,a);return this.zi(n,c,o,l.readTime)?this.Ki(e,Xl(n,null,"F")):this.Wi(e,c,n,l)}))})))}Gi(e,n,s,r){return yf(n)||r.isEqual(Y.min())?this.Qi(e,n):this.Ui.getDocuments(e,s).next(i=>{const o=this.ji(n,i);return this.zi(n,o,s,r)?this.Qi(e,n):(lf()<=re.DEBUG&&V("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),Zl(n)),this.Wi(e,o,n,QT(r,-1)))})}ji(e,n){let s=new Xe(pm(e));return n.forEach((r,i)=>{Sa(e,i)&&(s=s.add(i))}),s}zi(e,n,s,r){if(e.limit===null)return!1;if(s.size!==n.size)return!0;const i=e.limitType==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(r)>0)}Qi(e,n){return lf()<=re.DEBUG&&V("QueryEngine","Using full collection scan to execute query:",Zl(n)),this.Ui.getDocumentsMatchingQuery(e,n,Bn.min())}Wi(e,n,s,r){return this.Ui.getDocumentsMatchingQuery(e,s,r).next(i=>(n.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
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
 */class wb{constructor(e,n,s,r){this.persistence=e,this.Hi=n,this.serializer=r,this.Ji=new Ee(ie),this.Yi=new dr(i=>pu(i),gu),this.Xi=new Map,this.Zi=e.getRemoteDocumentCache(),this.Bs=e.getTargetCache(),this.qs=e.getBundleCache(),this.tr(s)}tr(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new cb(this.Zi,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Zi.setIndexManager(this.indexManager),this.Hi.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.Ji))}}function _b(t,e,n,s){return new wb(t,e,n,s)}async function Lm(t,e){const n=X(t);return await n.persistence.runTransaction("Handle user change","readonly",s=>{let r;return n.mutationQueue.getAllMutationBatches(s).next(i=>(r=i,n.tr(e),n.mutationQueue.getAllMutationBatches(s))).next(i=>{const o=[],a=[];let l=Z();for(const c of r){o.push(c.batchId);for(const u of c.mutations)l=l.add(u.key)}for(const c of i){a.push(c.batchId);for(const u of c.mutations)l=l.add(u.key)}return n.localDocuments.getDocuments(s,l).next(c=>({er:c,removedBatchIds:o,addedBatchIds:a}))})})}function Eb(t,e){const n=X(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",s=>{const r=e.batch.keys(),i=n.Zi.newChangeBuffer({trackRemovals:!0});return function(o,a,l,c){const u=l.batch,h=u.keys();let f=b.resolve();return h.forEach(p=>{f=f.next(()=>c.getEntry(a,p)).next(y=>{const E=l.docVersions.get(p);we(E!==null),y.version.compareTo(E)<0&&(u.applyToRemoteDocument(y,l),y.isValidDocument()&&(y.setReadTime(l.commitVersion),c.addEntry(y)))})}),f.next(()=>o.mutationQueue.removeMutationBatch(a,u))}(n,s,e,i).next(()=>i.apply(s)).next(()=>n.mutationQueue.performConsistencyCheck(s)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(s,r,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(s,function(o){let a=Z();for(let l=0;l<o.mutationResults.length;++l)o.mutationResults[l].transformResults.length>0&&(a=a.add(o.batch.mutations[l].key));return a}(e))).next(()=>n.localDocuments.getDocuments(s,r))})}function Um(t){const e=X(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.Bs.getLastRemoteSnapshotVersion(n))}function Ib(t,e){const n=X(t),s=e.snapshotVersion;let r=n.Ji;return n.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=n.Zi.newChangeBuffer({trackRemovals:!0});r=n.Ji;const a=[];e.targetChanges.forEach((u,h)=>{const f=r.get(h);if(!f)return;a.push(n.Bs.removeMatchingKeys(i,u.removedDocuments,h).next(()=>n.Bs.addMatchingKeys(i,u.addedDocuments,h)));let p=f.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(h)!==null?p=p.withResumeToken(tt.EMPTY_BYTE_STRING,Y.min()).withLastLimboFreeSnapshotVersion(Y.min()):u.resumeToken.approximateByteSize()>0&&(p=p.withResumeToken(u.resumeToken,s)),r=r.insert(h,p),function(y,E,A){return y.resumeToken.approximateByteSize()===0||E.snapshotVersion.toMicroseconds()-y.snapshotVersion.toMicroseconds()>=3e8?!0:A.addedDocuments.size+A.modifiedDocuments.size+A.removedDocuments.size>0}(f,p,u)&&a.push(n.Bs.updateTargetData(i,p))});let l=mn(),c=Z();if(e.documentUpdates.forEach(u=>{e.resolvedLimboDocuments.has(u)&&a.push(n.persistence.referenceDelegate.updateLimboDocument(i,u))}),a.push(Tb(i,o,e.documentUpdates).next(u=>{l=u.nr,c=u.sr})),!s.isEqual(Y.min())){const u=n.Bs.getLastRemoteSnapshotVersion(i).next(h=>n.Bs.setTargetsMetadata(i,i.currentSequenceNumber,s));a.push(u)}return b.waitFor(a).next(()=>o.apply(i)).next(()=>n.localDocuments.getLocalViewOfDocuments(i,l,c)).next(()=>l)}).then(i=>(n.Ji=r,i))}function Tb(t,e,n){let s=Z(),r=Z();return n.forEach(i=>s=s.add(i)),e.getEntries(t,s).next(i=>{let o=mn();return n.forEach((a,l)=>{const c=i.get(a);l.isFoundDocument()!==c.isFoundDocument()&&(r=r.add(a)),l.isNoDocument()&&l.version.isEqual(Y.min())?(e.removeEntry(a,l.readTime),o=o.insert(a,l)):!c.isValidDocument()||l.version.compareTo(c.version)>0||l.version.compareTo(c.version)===0&&c.hasPendingWrites?(e.addEntry(l),o=o.insert(a,l)):V("LocalStore","Ignoring outdated watch update for ",a,". Current version:",c.version," Watch version:",l.version)}),{nr:o,sr:r}})}function Sb(t,e){const n=X(t);return n.persistence.runTransaction("Get next mutation batch","readonly",s=>(e===void 0&&(e=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(s,e)))}function bb(t,e){const n=X(t);return n.persistence.runTransaction("Allocate target","readwrite",s=>{let r;return n.Bs.getTargetData(s,e).next(i=>i?(r=i,b.resolve(r)):n.Bs.allocateTargetId(s).next(o=>(r=new Nn(e,o,"TargetPurposeListen",s.currentSequenceNumber),n.Bs.addTargetData(s,r).next(()=>r))))}).then(s=>{const r=n.Ji.get(s.targetId);return(r===null||s.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(n.Ji=n.Ji.insert(s.targetId,s),n.Yi.set(e,s.targetId)),s})}async function rc(t,e,n){const s=X(t),r=s.Ji.get(e),i=n?"readwrite":"readwrite-primary";try{n||await s.persistence.runTransaction("Release target",i,o=>s.persistence.referenceDelegate.removeTarget(o,r))}catch(o){if(!Oi(o))throw o;V("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}s.Ji=s.Ji.remove(e),s.Yi.delete(r.target)}function Rf(t,e,n){const s=X(t);let r=Y.min(),i=Z();return s.persistence.runTransaction("Execute query","readonly",o=>function(a,l,c){const u=X(a),h=u.Yi.get(c);return h!==void 0?b.resolve(u.Ji.get(h)):u.Bs.getTargetData(l,c)}(s,o,gn(e)).next(a=>{if(a)return r=a.lastLimboFreeSnapshotVersion,s.Bs.getMatchingKeysForTargetId(o,a.targetId).next(l=>{i=l})}).next(()=>s.Hi.getDocumentsMatchingQuery(o,e,n?r:Y.min(),n?i:Z())).next(a=>(Ab(s,vS(e),a),{documents:a,ir:i})))}function Ab(t,e,n){let s=t.Xi.get(e)||Y.min();n.forEach((r,i)=>{i.readTime.compareTo(s)>0&&(s=i.readTime)}),t.Xi.set(e,s)}class kf{constructor(){this.activeTargetIds=SS()}lr(e){this.activeTargetIds=this.activeTargetIds.add(e)}dr(e){this.activeTargetIds=this.activeTargetIds.delete(e)}hr(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Cb{constructor(){this.Hr=new kf,this.Jr={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,s){}addLocalQueryTarget(e){return this.Hr.lr(e),this.Jr[e]||"not-current"}updateQueryState(e,n,s){this.Jr[e]=n}removeLocalQueryTarget(e){this.Hr.dr(e)}isLocalQueryTarget(e){return this.Hr.activeTargetIds.has(e)}clearQueryState(e){delete this.Jr[e]}getAllActiveQueryTargets(){return this.Hr.activeTargetIds}isActiveQueryTarget(e){return this.Hr.activeTargetIds.has(e)}start(){return this.Hr=new kf,Promise.resolve()}handleUserChange(e,n,s){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class Rb{Yr(e){}shutdown(){}}/**
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
 */class Nf{constructor(){this.Xr=()=>this.Zr(),this.eo=()=>this.no(),this.so=[],this.io()}Yr(e){this.so.push(e)}shutdown(){window.removeEventListener("online",this.Xr),window.removeEventListener("offline",this.eo)}io(){window.addEventListener("online",this.Xr),window.addEventListener("offline",this.eo)}Zr(){V("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.so)e(0)}no(){V("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.so)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let Yi=null;function ul(){return Yi===null?Yi=268435456+Math.round(2147483648*Math.random()):Yi++,"0x"+Yi.toString(16)}/**
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
 */const kb={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
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
 */class Nb{constructor(e){this.ro=e.ro,this.oo=e.oo}uo(e){this.co=e}ao(e){this.ho=e}onMessage(e){this.lo=e}close(){this.oo()}send(e){this.ro(e)}fo(){this.co()}wo(e){this.ho(e)}_o(e){this.lo(e)}}/**
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
 */const He="WebChannelConnection";class Db extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const n=e.ssl?"https":"http";this.mo=n+"://"+e.host,this.yo="projects/"+this.databaseId.projectId+"/databases/"+this.databaseId.database+"/documents"}get po(){return!1}Io(e,n,s,r,i){const o=ul(),a=this.To(e,n);V("RestConnection",`Sending RPC '${e}' ${o}:`,a,s);const l={};return this.Eo(l,r,i),this.Ao(e,a,l,s).then(c=>(V("RestConnection",`Received RPC '${e}' ${o}: `,c),c),c=>{throw Ys("RestConnection",`RPC '${e}' ${o} failed with error: `,c,"url: ",a,"request:",s),c})}vo(e,n,s,r,i,o){return this.Io(e,n,s,r,i)}Eo(e,n,s){e["X-Goog-Api-Client"]="gl-js/ fire/"+fr,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((r,i)=>e[i]=r),s&&s.headers.forEach((r,i)=>e[i]=r)}To(e,n){const s=kb[e];return`${this.mo}/v1/${n}:${s}`}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Ao(e,n,s,r){const i=ul();return new Promise((o,a)=>{const l=new FT;l.setWithCredentials(!0),l.listenOnce(MT.COMPLETE,()=>{try{switch(l.getLastErrorCode()){case ll.NO_ERROR:const u=l.getResponseJson();V(He,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(u)),o(u);break;case ll.TIMEOUT:V(He,`RPC '${e}' ${i} timed out`),a(new j(T.DEADLINE_EXCEEDED,"Request time out"));break;case ll.HTTP_ERROR:const h=l.getStatus();if(V(He,`RPC '${e}' ${i} failed with status:`,h,"response text:",l.getResponseText()),h>0){let f=l.getResponseJson();Array.isArray(f)&&(f=f[0]);const p=f==null?void 0:f.error;if(p&&p.status&&p.message){const y=function(E){const A=E.toLowerCase().replace(/_/g,"-");return Object.values(T).indexOf(A)>=0?A:T.UNKNOWN}(p.status);a(new j(y,p.message))}else a(new j(T.UNKNOWN,"Server responded with status "+l.getStatus()))}else a(new j(T.UNAVAILABLE,"Connection failed."));break;default:W()}}finally{V(He,`RPC '${e}' ${i} completed.`)}});const c=JSON.stringify(r);V(He,`RPC '${e}' ${i} sending request:`,r),l.send(n,"POST",c,s,15)})}Ro(e,n,s){const r=ul(),i=[this.mo,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=xT(),a=PT(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;c!==void 0&&(l.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(l.xmlHttpFactory=new UT({})),this.Eo(l.initMessageHeaders,n,s),l.encodeInitMessageHeaders=!0;const u=i.join("");V(He,`Creating RPC '${e}' stream ${r}: ${u}`,l);const h=o.createWebChannel(u,l);let f=!1,p=!1;const y=new Nb({ro:A=>{p?V(He,`Not sending because RPC '${e}' stream ${r} is closed:`,A):(f||(V(He,`Opening RPC '${e}' stream ${r} transport.`),h.open(),f=!0),V(He,`RPC '${e}' stream ${r} sending:`,A),h.send(A))},oo:()=>h.close()}),E=(A,N,R)=>{A.listen(N,M=>{try{R(M)}catch(x){setTimeout(()=>{throw x},0)}})};return E(h,zi.EventType.OPEN,()=>{p||V(He,`RPC '${e}' stream ${r} transport opened.`)}),E(h,zi.EventType.CLOSE,()=>{p||(p=!0,V(He,`RPC '${e}' stream ${r} transport closed`),y.wo())}),E(h,zi.EventType.ERROR,A=>{p||(p=!0,Ys(He,`RPC '${e}' stream ${r} transport errored:`,A),y.wo(new j(T.UNAVAILABLE,"The operation could not be completed")))}),E(h,zi.EventType.MESSAGE,A=>{var N;if(!p){const R=A.data[0];we(!!R);const M=R,x=M.error||((N=M[0])===null||N===void 0?void 0:N.error);if(x){V(He,`RPC '${e}' stream ${r} received error:`,x);const ee=x.status;let ye=function(lt){const nt=be[lt];if(nt!==void 0)return Cm(nt)}(ee),ue=x.message;ye===void 0&&(ye=T.INTERNAL,ue="Unknown error status: "+ee+" with message "+x.message),p=!0,y.wo(new j(ye,ue)),h.close()}else V(He,`RPC '${e}' stream ${r} received:`,R),y._o(R)}}),E(a,LT.STAT_EVENT,A=>{A.stat===of.PROXY?V(He,`RPC '${e}' stream ${r} detected buffering proxy`):A.stat===of.NOPROXY&&V(He,`RPC '${e}' stream ${r} detected no buffering proxy`)}),setTimeout(()=>{y.fo()},0),y}}function hl(){return typeof document<"u"?document:null}/**
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
 */function Ra(t){return new HS(t,!0)}/**
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
 */class Fm{constructor(e,n,s=1e3,r=1.5,i=6e4){this.ii=e,this.timerId=n,this.Po=s,this.bo=r,this.Vo=i,this.So=0,this.Do=null,this.Co=Date.now(),this.reset()}reset(){this.So=0}xo(){this.So=this.Vo}No(e){this.cancel();const n=Math.floor(this.So+this.ko()),s=Math.max(0,Date.now()-this.Co),r=Math.max(0,n-s);r>0&&V("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.So} ms, delay with jitter: ${n} ms, last attempt: ${s} ms ago)`),this.Do=this.ii.enqueueAfterDelay(this.timerId,r,()=>(this.Co=Date.now(),e())),this.So*=this.bo,this.So<this.Po&&(this.So=this.Po),this.So>this.Vo&&(this.So=this.Vo)}Mo(){this.Do!==null&&(this.Do.skipDelay(),this.Do=null)}cancel(){this.Do!==null&&(this.Do.cancel(),this.Do=null)}ko(){return(Math.random()-.5)*this.So}}/**
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
 */class Vm{constructor(e,n,s,r,i,o,a,l){this.ii=e,this.$o=s,this.Oo=r,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=a,this.listener=l,this.state=0,this.Fo=0,this.Bo=null,this.Lo=null,this.stream=null,this.qo=new Fm(e,n)}Uo(){return this.state===1||this.state===5||this.Ko()}Ko(){return this.state===2||this.state===3}start(){this.state!==4?this.auth():this.Go()}async stop(){this.Uo()&&await this.close(0)}Qo(){this.state=0,this.qo.reset()}jo(){this.Ko()&&this.Bo===null&&(this.Bo=this.ii.enqueueAfterDelay(this.$o,6e4,()=>this.zo()))}Wo(e){this.Ho(),this.stream.send(e)}async zo(){if(this.Ko())return this.close(0)}Ho(){this.Bo&&(this.Bo.cancel(),this.Bo=null)}Jo(){this.Lo&&(this.Lo.cancel(),this.Lo=null)}async close(e,n){this.Ho(),this.Jo(),this.qo.cancel(),this.Fo++,e!==4?this.qo.reset():n&&n.code===T.RESOURCE_EXHAUSTED?(pn(n.toString()),pn("Using maximum backoff delay to prevent overloading the backend."),this.qo.xo()):n&&n.code===T.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.Yo(),this.stream.close(),this.stream=null),this.state=e,await this.listener.ao(n)}Yo(){}auth(){this.state=1;const e=this.Xo(this.Fo),n=this.Fo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([s,r])=>{this.Fo===n&&this.Zo(s,r)},s=>{e(()=>{const r=new j(T.UNKNOWN,"Fetching auth token failed: "+s.message);return this.tu(r)})})}Zo(e,n){const s=this.Xo(this.Fo);this.stream=this.eu(e,n),this.stream.uo(()=>{s(()=>(this.state=2,this.Lo=this.ii.enqueueAfterDelay(this.Oo,1e4,()=>(this.Ko()&&(this.state=3),Promise.resolve())),this.listener.uo()))}),this.stream.ao(r=>{s(()=>this.tu(r))}),this.stream.onMessage(r=>{s(()=>this.onMessage(r))})}Go(){this.state=5,this.qo.No(async()=>{this.state=0,this.start()})}tu(e){return V("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}Xo(e){return n=>{this.ii.enqueueAndForget(()=>this.Fo===e?n():(V("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Ob extends Vm{constructor(e,n,s,r,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,s,r,o),this.serializer=i}eu(e,n){return this.connection.Ro("Listen",e,n)}onMessage(e){this.qo.reset();const n=zS(this.serializer,e),s=function(r){if(!("targetChange"in r))return Y.min();const i=r.targetChange;return i.targetIds&&i.targetIds.length?Y.min():i.readTime?Qt(i.readTime):Y.min()}(e);return this.listener.nu(n,s)}su(e){const n={};n.database=sc(this.serializer),n.addTarget=function(r,i){let o;const a=i.target;if(o=Jl(a)?{documents:QS(r,a)}:{query:YS(r,a)},o.targetId=i.targetId,i.resumeToken.approximateByteSize()>0){o.resumeToken=Nm(r,i.resumeToken);const l=ec(r,i.expectedCount);l!==null&&(o.expectedCount=l)}else if(i.snapshotVersion.compareTo(Y.min())>0){o.readTime=Bo(r,i.snapshotVersion.toTimestamp());const l=ec(r,i.expectedCount);l!==null&&(o.expectedCount=l)}return o}(this.serializer,e);const s=XS(this.serializer,e);s&&(n.labels=s),this.Wo(n)}iu(e){const n={};n.database=sc(this.serializer),n.removeTarget=e,this.Wo(n)}}class xb extends Vm{constructor(e,n,s,r,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,s,r,o),this.serializer=i,this.ru=!1}get ou(){return this.ru}start(){this.ru=!1,this.lastStreamToken=void 0,super.start()}Yo(){this.ru&&this.uu([])}eu(e,n){return this.connection.Ro("Write",e,n)}onMessage(e){if(we(!!e.streamToken),this.lastStreamToken=e.streamToken,this.ru){this.qo.reset();const n=WS(e.writeResults,e.commitTime),s=Qt(e.commitTime);return this.listener.cu(s,n)}return we(!e.writeResults||e.writeResults.length===0),this.ru=!0,this.listener.au()}hu(){const e={};e.database=sc(this.serializer),this.Wo(e)}uu(e){const n={streamToken:this.lastStreamToken,writes:e.map(s=>GS(this.serializer,s))};this.Wo(n)}}/**
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
 */class Pb extends class{}{constructor(e,n,s,r){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=s,this.serializer=r,this.lu=!1}fu(){if(this.lu)throw new j(T.FAILED_PRECONDITION,"The client has already been terminated.")}Io(e,n,s){return this.fu(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([r,i])=>this.connection.Io(e,n,s,r,i)).catch(r=>{throw r.name==="FirebaseError"?(r.code===T.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),r):new j(T.UNKNOWN,r.toString())})}vo(e,n,s,r){return this.fu(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.vo(e,n,s,i,o,r)).catch(i=>{throw i.name==="FirebaseError"?(i.code===T.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new j(T.UNKNOWN,i.toString())})}terminate(){this.lu=!0}}class Mb{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.wu=0,this._u=null,this.mu=!0}gu(){this.wu===0&&(this.yu("Unknown"),this._u=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._u=null,this.pu("Backend didn't respond within 10 seconds."),this.yu("Offline"),Promise.resolve())))}Iu(e){this.state==="Online"?this.yu("Unknown"):(this.wu++,this.wu>=1&&(this.Tu(),this.pu(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.yu("Offline")))}set(e){this.Tu(),this.wu=0,e==="Online"&&(this.mu=!1),this.yu(e)}yu(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}pu(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.mu?(pn(n),this.mu=!1):V("OnlineStateTracker",n)}Tu(){this._u!==null&&(this._u.cancel(),this._u=null)}}/**
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
 */class Lb{constructor(e,n,s,r,i){this.localStore=e,this.datastore=n,this.asyncQueue=s,this.remoteSyncer={},this.Eu=[],this.Au=new Map,this.vu=new Set,this.Ru=[],this.Pu=i,this.Pu.Yr(o=>{s.enqueueAndForget(async()=>{vs(this)&&(V("RemoteStore","Restarting streams for network reachability change."),await async function(a){const l=X(a);l.vu.add(4),await Mi(l),l.bu.set("Unknown"),l.vu.delete(4),await ka(l)}(this))})}),this.bu=new Mb(s,r)}}async function ka(t){if(vs(t))for(const e of t.Ru)await e(!0)}async function Mi(t){for(const e of t.Ru)await e(!1)}function Bm(t,e){const n=X(t);n.Au.has(e.targetId)||(n.Au.set(e.targetId,e),Au(n)?bu(n):pr(n).Ko()&&Su(n,e))}function $m(t,e){const n=X(t),s=pr(n);n.Au.delete(e),s.Ko()&&jm(n,e),n.Au.size===0&&(s.Ko()?s.jo():vs(n)&&n.bu.set("Unknown"))}function Su(t,e){if(t.Vu.qt(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(Y.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}pr(t).su(e)}function jm(t,e){t.Vu.qt(e),pr(t).iu(e)}function bu(t){t.Vu=new VS({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),le:e=>t.Au.get(e)||null,ue:()=>t.datastore.serializer.databaseId}),pr(t).start(),t.bu.gu()}function Au(t){return vs(t)&&!pr(t).Uo()&&t.Au.size>0}function vs(t){return X(t).vu.size===0}function Hm(t){t.Vu=void 0}async function Ub(t){t.Au.forEach((e,n)=>{Su(t,e)})}async function Fb(t,e){Hm(t),Au(t)?(t.bu.Iu(e),bu(t)):t.bu.set("Unknown")}async function Vb(t,e,n){if(t.bu.set("Online"),e instanceof km&&e.state===2&&e.cause)try{await async function(s,r){const i=r.cause;for(const o of r.targetIds)s.Au.has(o)&&(await s.remoteSyncer.rejectListen(o,i),s.Au.delete(o),s.Vu.removeTarget(o))}(t,e)}catch(s){V("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),s),await $o(t,s)}else if(e instanceof lo?t.Vu.Ht(e):e instanceof Rm?t.Vu.ne(e):t.Vu.Xt(e),!n.isEqual(Y.min()))try{const s=await Um(t.localStore);n.compareTo(s)>=0&&await function(r,i){const o=r.Vu.ce(i);return o.targetChanges.forEach((a,l)=>{if(a.resumeToken.approximateByteSize()>0){const c=r.Au.get(l);c&&r.Au.set(l,c.withResumeToken(a.resumeToken,i))}}),o.targetMismatches.forEach((a,l)=>{const c=r.Au.get(a);if(!c)return;r.Au.set(a,c.withResumeToken(tt.EMPTY_BYTE_STRING,c.snapshotVersion)),jm(r,a);const u=new Nn(c.target,a,l,c.sequenceNumber);Su(r,u)}),r.remoteSyncer.applyRemoteEvent(o)}(t,n)}catch(s){V("RemoteStore","Failed to raise snapshot:",s),await $o(t,s)}}async function $o(t,e,n){if(!Oi(e))throw e;t.vu.add(1),await Mi(t),t.bu.set("Offline"),n||(n=()=>Um(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{V("RemoteStore","Retrying IndexedDB access"),await n(),t.vu.delete(1),await ka(t)})}function Km(t,e){return e().catch(n=>$o(t,n,e))}async function Na(t){const e=X(t),n=jn(e);let s=e.Eu.length>0?e.Eu[e.Eu.length-1].batchId:-1;for(;Bb(e);)try{const r=await Sb(e.localStore,s);if(r===null){e.Eu.length===0&&n.jo();break}s=r.batchId,$b(e,r)}catch(r){await $o(e,r)}qm(e)&&zm(e)}function Bb(t){return vs(t)&&t.Eu.length<10}function $b(t,e){t.Eu.push(e);const n=jn(t);n.Ko()&&n.ou&&n.uu(e.mutations)}function qm(t){return vs(t)&&!jn(t).Uo()&&t.Eu.length>0}function zm(t){jn(t).start()}async function jb(t){jn(t).hu()}async function Hb(t){const e=jn(t);for(const n of t.Eu)e.uu(n.mutations)}async function Kb(t,e,n){const s=t.Eu.shift(),r=yu.from(s,e,n);await Km(t,()=>t.remoteSyncer.applySuccessfulWrite(r)),await Na(t)}async function qb(t,e){e&&jn(t).ou&&await async function(n,s){if(r=s.code,LS(r)&&r!==T.ABORTED){const i=n.Eu.shift();jn(n).Qo(),await Km(n,()=>n.remoteSyncer.rejectFailedWrite(i.batchId,s)),await Na(n)}var r}(t,e),qm(t)&&zm(t)}async function Df(t,e){const n=X(t);n.asyncQueue.verifyOperationInProgress(),V("RemoteStore","RemoteStore received new credentials");const s=vs(n);n.vu.add(3),await Mi(n),s&&n.bu.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.vu.delete(3),await ka(n)}async function zb(t,e){const n=X(t);e?(n.vu.delete(2),await ka(n)):e||(n.vu.add(2),await Mi(n),n.bu.set("Unknown"))}function pr(t){return t.Su||(t.Su=function(e,n,s){const r=X(e);return r.fu(),new Ob(n,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,s)}(t.datastore,t.asyncQueue,{uo:Ub.bind(null,t),ao:Fb.bind(null,t),nu:Vb.bind(null,t)}),t.Ru.push(async e=>{e?(t.Su.Qo(),Au(t)?bu(t):t.bu.set("Unknown")):(await t.Su.stop(),Hm(t))})),t.Su}function jn(t){return t.Du||(t.Du=function(e,n,s){const r=X(e);return r.fu(),new xb(n,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,s)}(t.datastore,t.asyncQueue,{uo:jb.bind(null,t),ao:qb.bind(null,t),au:Hb.bind(null,t),cu:Kb.bind(null,t)}),t.Ru.push(async e=>{e?(t.Du.Qo(),await Na(t)):(await t.Du.stop(),t.Eu.length>0&&(V("RemoteStore",`Stopping write stream with ${t.Eu.length} pending writes`),t.Eu=[]))})),t.Du}/**
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
 */class Cu{constructor(e,n,s,r,i){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=s,this.op=r,this.removalCallback=i,this.deferred=new Un,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}static createAndSchedule(e,n,s,r,i){const o=Date.now()+s,a=new Cu(e,n,o,r,i);return a.start(s),a}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new j(T.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Ru(t,e){if(pn("AsyncQueue",`${e}: ${t}`),Oi(t))return new j(T.UNAVAILABLE,`${e}: ${t}`);throw t}/**
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
 */class Ks{constructor(e){this.comparator=e?(n,s)=>e(n,s)||H.comparator(n.key,s.key):(n,s)=>H.comparator(n.key,s.key),this.keyedMap=Cr(),this.sortedSet=new Ee(this.comparator)}static emptySet(e){return new Ks(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,s)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof Ks)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),s=e.sortedSet.getIterator();for(;n.hasNext();){const r=n.getNext().key,i=s.getNext().key;if(!r.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const s=new Ks;return s.comparator=this.comparator,s.keyedMap=e,s.sortedSet=n,s}}/**
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
 */class Of{constructor(){this.Cu=new Ee(H.comparator)}track(e){const n=e.doc.key,s=this.Cu.get(n);s?e.type!==0&&s.type===3?this.Cu=this.Cu.insert(n,e):e.type===3&&s.type!==1?this.Cu=this.Cu.insert(n,{type:s.type,doc:e.doc}):e.type===2&&s.type===2?this.Cu=this.Cu.insert(n,{type:2,doc:e.doc}):e.type===2&&s.type===0?this.Cu=this.Cu.insert(n,{type:0,doc:e.doc}):e.type===1&&s.type===0?this.Cu=this.Cu.remove(n):e.type===1&&s.type===2?this.Cu=this.Cu.insert(n,{type:1,doc:s.doc}):e.type===0&&s.type===1?this.Cu=this.Cu.insert(n,{type:2,doc:e.doc}):W():this.Cu=this.Cu.insert(n,e)}xu(){const e=[];return this.Cu.inorderTraversal((n,s)=>{e.push(s)}),e}}class tr{constructor(e,n,s,r,i,o,a,l,c){this.query=e,this.docs=n,this.oldDocs=s,this.docChanges=r,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=a,this.excludesMetadataChanges=l,this.hasCachedResults=c}static fromInitialDocuments(e,n,s,r,i){const o=[];return n.forEach(a=>{o.push({type:0,doc:a})}),new tr(e,n,Ks.emptySet(n),o,s,r,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Ta(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,s=e.docChanges;if(n.length!==s.length)return!1;for(let r=0;r<n.length;r++)if(n[r].type!==s[r].type||!n[r].doc.isEqual(s[r].doc))return!1;return!0}}/**
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
 */class Gb{constructor(){this.Nu=void 0,this.listeners=[]}}class Wb{constructor(){this.queries=new dr(e=>dm(e),Ta),this.onlineState="Unknown",this.ku=new Set}}async function Qb(t,e){const n=X(t),s=e.query;let r=!1,i=n.queries.get(s);if(i||(r=!0,i=new Gb),r)try{i.Nu=await n.onListen(s)}catch(o){const a=Ru(o,`Initialization of query '${Zl(e.query)}' failed`);return void e.onError(a)}n.queries.set(s,i),i.listeners.push(e),e.Mu(n.onlineState),i.Nu&&e.$u(i.Nu)&&ku(n)}async function Yb(t,e){const n=X(t),s=e.query;let r=!1;const i=n.queries.get(s);if(i){const o=i.listeners.indexOf(e);o>=0&&(i.listeners.splice(o,1),r=i.listeners.length===0)}if(r)return n.queries.delete(s),n.onUnlisten(s)}function Jb(t,e){const n=X(t);let s=!1;for(const r of e){const i=r.query,o=n.queries.get(i);if(o){for(const a of o.listeners)a.$u(r)&&(s=!0);o.Nu=r}}s&&ku(n)}function Xb(t,e,n){const s=X(t),r=s.queries.get(e);if(r)for(const i of r.listeners)i.onError(n);s.queries.delete(e)}function ku(t){t.ku.forEach(e=>{e.next()})}class Zb{constructor(e,n,s){this.query=e,this.Ou=n,this.Fu=!1,this.Bu=null,this.onlineState="Unknown",this.options=s||{}}$u(e){if(!this.options.includeMetadataChanges){const s=[];for(const r of e.docChanges)r.type!==3&&s.push(r);e=new tr(e.query,e.docs,e.oldDocs,s,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.Fu?this.Lu(e)&&(this.Ou.next(e),n=!0):this.qu(e,this.onlineState)&&(this.Uu(e),n=!0),this.Bu=e,n}onError(e){this.Ou.error(e)}Mu(e){this.onlineState=e;let n=!1;return this.Bu&&!this.Fu&&this.qu(this.Bu,e)&&(this.Uu(this.Bu),n=!0),n}qu(e,n){if(!e.fromCache)return!0;const s=n!=="Offline";return(!this.options.Ku||!s)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}Lu(e){if(e.docChanges.length>0)return!0;const n=this.Bu&&this.Bu.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}Uu(e){e=tr.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Fu=!0,this.Ou.next(e)}}/**
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
 */class Gm{constructor(e){this.key=e}}class Wm{constructor(e){this.key=e}}class eA{constructor(e,n){this.query=e,this.Yu=n,this.Xu=null,this.hasCachedResults=!1,this.current=!1,this.Zu=Z(),this.mutatedKeys=Z(),this.tc=pm(e),this.ec=new Ks(this.tc)}get nc(){return this.Yu}sc(e,n){const s=n?n.ic:new Of,r=n?n.ec:this.ec;let i=n?n.mutatedKeys:this.mutatedKeys,o=r,a=!1;const l=this.query.limitType==="F"&&r.size===this.query.limit?r.last():null,c=this.query.limitType==="L"&&r.size===this.query.limit?r.first():null;if(e.inorderTraversal((u,h)=>{const f=r.get(u),p=Sa(this.query,h)?h:null,y=!!f&&this.mutatedKeys.has(f.key),E=!!p&&(p.hasLocalMutations||this.mutatedKeys.has(p.key)&&p.hasCommittedMutations);let A=!1;f&&p?f.data.isEqual(p.data)?y!==E&&(s.track({type:3,doc:p}),A=!0):this.rc(f,p)||(s.track({type:2,doc:p}),A=!0,(l&&this.tc(p,l)>0||c&&this.tc(p,c)<0)&&(a=!0)):!f&&p?(s.track({type:0,doc:p}),A=!0):f&&!p&&(s.track({type:1,doc:f}),A=!0,(l||c)&&(a=!0)),A&&(p?(o=o.add(p),i=E?i.add(u):i.delete(u)):(o=o.delete(u),i=i.delete(u)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const u=this.query.limitType==="F"?o.last():o.first();o=o.delete(u.key),i=i.delete(u.key),s.track({type:1,doc:u})}return{ec:o,ic:s,zi:a,mutatedKeys:i}}rc(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,s){const r=this.ec;this.ec=e.ec,this.mutatedKeys=e.mutatedKeys;const i=e.ic.xu();i.sort((c,u)=>function(h,f){const p=y=>{switch(y){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return W()}};return p(h)-p(f)}(c.type,u.type)||this.tc(c.doc,u.doc)),this.oc(s);const o=n?this.uc():[],a=this.Zu.size===0&&this.current?1:0,l=a!==this.Xu;return this.Xu=a,i.length!==0||l?{snapshot:new tr(this.query,e.ec,r,i,e.mutatedKeys,a===0,l,!1,!!s&&s.resumeToken.approximateByteSize()>0),cc:o}:{cc:o}}Mu(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({ec:this.ec,ic:new Of,mutatedKeys:this.mutatedKeys,zi:!1},!1)):{cc:[]}}ac(e){return!this.Yu.has(e)&&!!this.ec.has(e)&&!this.ec.get(e).hasLocalMutations}oc(e){e&&(e.addedDocuments.forEach(n=>this.Yu=this.Yu.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Yu=this.Yu.delete(n)),this.current=e.current)}uc(){if(!this.current)return[];const e=this.Zu;this.Zu=Z(),this.ec.forEach(s=>{this.ac(s.key)&&(this.Zu=this.Zu.add(s.key))});const n=[];return e.forEach(s=>{this.Zu.has(s)||n.push(new Wm(s))}),this.Zu.forEach(s=>{e.has(s)||n.push(new Gm(s))}),n}hc(e){this.Yu=e.ir,this.Zu=Z();const n=this.sc(e.documents);return this.applyChanges(n,!0)}lc(){return tr.fromInitialDocuments(this.query,this.ec,this.mutatedKeys,this.Xu===0,this.hasCachedResults)}}class tA{constructor(e,n,s){this.query=e,this.targetId=n,this.view=s}}class nA{constructor(e){this.key=e,this.fc=!1}}class sA{constructor(e,n,s,r,i,o){this.localStore=e,this.remoteStore=n,this.eventManager=s,this.sharedClientState=r,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.dc={},this.wc=new dr(a=>dm(a),Ta),this._c=new Map,this.mc=new Set,this.gc=new Ee(H.comparator),this.yc=new Map,this.Ic=new Eu,this.Tc={},this.Ec=new Map,this.Ac=er.Mn(),this.onlineState="Unknown",this.vc=void 0}get isPrimaryClient(){return this.vc===!0}}async function rA(t,e){const n=pA(t);let s,r;const i=n.wc.get(e);if(i)s=i.targetId,n.sharedClientState.addLocalQueryTarget(s),r=i.view.lc();else{const o=await bb(n.localStore,gn(e)),a=n.sharedClientState.addLocalQueryTarget(o.targetId);s=o.targetId,r=await iA(n,e,s,a==="current",o.resumeToken),n.isPrimaryClient&&Bm(n.remoteStore,o)}return r}async function iA(t,e,n,s,r){t.Rc=(h,f,p)=>async function(y,E,A,N){let R=E.view.sc(A);R.zi&&(R=await Rf(y.localStore,E.query,!1).then(({documents:ee})=>E.view.sc(ee,R)));const M=N&&N.targetChanges.get(E.targetId),x=E.view.applyChanges(R,y.isPrimaryClient,M);return Pf(y,E.targetId,x.cc),x.snapshot}(t,h,f,p);const i=await Rf(t.localStore,e,!0),o=new eA(e,i.ir),a=o.sc(i.documents),l=Pi.createSynthesizedTargetChangeForCurrentChange(n,s&&t.onlineState!=="Offline",r),c=o.applyChanges(a,t.isPrimaryClient,l);Pf(t,n,c.cc);const u=new tA(e,n,o);return t.wc.set(e,u),t._c.has(n)?t._c.get(n).push(e):t._c.set(n,[e]),c.snapshot}async function oA(t,e){const n=X(t),s=n.wc.get(e),r=n._c.get(s.targetId);if(r.length>1)return n._c.set(s.targetId,r.filter(i=>!Ta(i,e))),void n.wc.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(s.targetId),n.sharedClientState.isActiveQueryTarget(s.targetId)||await rc(n.localStore,s.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(s.targetId),$m(n.remoteStore,s.targetId),ic(n,s.targetId)}).catch(Di)):(ic(n,s.targetId),await rc(n.localStore,s.targetId,!0))}async function aA(t,e,n){const s=gA(t);try{const r=await function(i,o){const a=X(i),l=Pe.now(),c=o.reduce((f,p)=>f.add(p.key),Z());let u,h;return a.persistence.runTransaction("Locally write mutations","readwrite",f=>{let p=mn(),y=Z();return a.Zi.getEntries(f,c).next(E=>{p=E,p.forEach((A,N)=>{N.isValidDocument()||(y=y.add(A))})}).next(()=>a.localDocuments.getOverlayedDocuments(f,p)).next(E=>{u=E;const A=[];for(const N of o){const R=DS(N,u.get(N.key).overlayedDocument);R!=null&&A.push(new zn(N.key,R,om(R.value.mapValue),Wt.exists(!0)))}return a.mutationQueue.addMutationBatch(f,l,A,o)}).next(E=>{h=E;const A=E.applyToLocalDocumentSet(u,y);return a.documentOverlayCache.saveOverlays(f,E.batchId,A)})}).then(()=>({batchId:h.batchId,changes:mm(u)}))}(s.localStore,e);s.sharedClientState.addPendingMutation(r.batchId),function(i,o,a){let l=i.Tc[i.currentUser.toKey()];l||(l=new Ee(ie)),l=l.insert(o,a),i.Tc[i.currentUser.toKey()]=l}(s,r.batchId,n),await Li(s,r.changes),await Na(s.remoteStore)}catch(r){const i=Ru(r,"Failed to persist write");n.reject(i)}}async function Qm(t,e){const n=X(t);try{const s=await Ib(n.localStore,e);e.targetChanges.forEach((r,i)=>{const o=n.yc.get(i);o&&(we(r.addedDocuments.size+r.modifiedDocuments.size+r.removedDocuments.size<=1),r.addedDocuments.size>0?o.fc=!0:r.modifiedDocuments.size>0?we(o.fc):r.removedDocuments.size>0&&(we(o.fc),o.fc=!1))}),await Li(n,s,e)}catch(s){await Di(s)}}function xf(t,e,n){const s=X(t);if(s.isPrimaryClient&&n===0||!s.isPrimaryClient&&n===1){const r=[];s.wc.forEach((i,o)=>{const a=o.view.Mu(e);a.snapshot&&r.push(a.snapshot)}),function(i,o){const a=X(i);a.onlineState=o;let l=!1;a.queries.forEach((c,u)=>{for(const h of u.listeners)h.Mu(o)&&(l=!0)}),l&&ku(a)}(s.eventManager,e),r.length&&s.dc.nu(r),s.onlineState=e,s.isPrimaryClient&&s.sharedClientState.setOnlineState(e)}}async function lA(t,e,n){const s=X(t);s.sharedClientState.updateQueryState(e,"rejected",n);const r=s.yc.get(e),i=r&&r.key;if(i){let o=new Ee(H.comparator);o=o.insert(i,ze.newNoDocument(i,Y.min()));const a=Z().add(i),l=new Ca(Y.min(),new Map,new Ee(ie),o,a);await Qm(s,l),s.gc=s.gc.remove(i),s.yc.delete(e),Nu(s)}else await rc(s.localStore,e,!1).then(()=>ic(s,e,n)).catch(Di)}async function cA(t,e){const n=X(t),s=e.batch.batchId;try{const r=await Eb(n.localStore,e);Jm(n,s,null),Ym(n,s),n.sharedClientState.updateMutationState(s,"acknowledged"),await Li(n,r)}catch(r){await Di(r)}}async function uA(t,e,n){const s=X(t);try{const r=await function(i,o){const a=X(i);return a.persistence.runTransaction("Reject batch","readwrite-primary",l=>{let c;return a.mutationQueue.lookupMutationBatch(l,o).next(u=>(we(u!==null),c=u.keys(),a.mutationQueue.removeMutationBatch(l,u))).next(()=>a.mutationQueue.performConsistencyCheck(l)).next(()=>a.documentOverlayCache.removeOverlaysForBatchId(l,c,o)).next(()=>a.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(l,c)).next(()=>a.localDocuments.getDocuments(l,c))})}(s.localStore,e);Jm(s,e,n),Ym(s,e),s.sharedClientState.updateMutationState(e,"rejected",n),await Li(s,r)}catch(r){await Di(r)}}function Ym(t,e){(t.Ec.get(e)||[]).forEach(n=>{n.resolve()}),t.Ec.delete(e)}function Jm(t,e,n){const s=X(t);let r=s.Tc[s.currentUser.toKey()];if(r){const i=r.get(e);i&&(n?i.reject(n):i.resolve(),r=r.remove(e)),s.Tc[s.currentUser.toKey()]=r}}function ic(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const s of t._c.get(e))t.wc.delete(s),n&&t.dc.Pc(s,n);t._c.delete(e),t.isPrimaryClient&&t.Ic.Is(e).forEach(s=>{t.Ic.containsKey(s)||Xm(t,s)})}function Xm(t,e){t.mc.delete(e.path.canonicalString());const n=t.gc.get(e);n!==null&&($m(t.remoteStore,n),t.gc=t.gc.remove(e),t.yc.delete(n),Nu(t))}function Pf(t,e,n){for(const s of n)s instanceof Gm?(t.Ic.addReference(s.key,e),hA(t,s)):s instanceof Wm?(V("SyncEngine","Document no longer in limbo: "+s.key),t.Ic.removeReference(s.key,e),t.Ic.containsKey(s.key)||Xm(t,s.key)):W()}function hA(t,e){const n=e.key,s=n.path.canonicalString();t.gc.get(n)||t.mc.has(s)||(V("SyncEngine","New document in limbo: "+n),t.mc.add(s),Nu(t))}function Nu(t){for(;t.mc.size>0&&t.gc.size<t.maxConcurrentLimboResolutions;){const e=t.mc.values().next().value;t.mc.delete(e);const n=new H(Te.fromString(e)),s=t.Ac.next();t.yc.set(s,new nA(n)),t.gc=t.gc.insert(n,s),Bm(t.remoteStore,new Nn(gn(mu(n.path)),s,"TargetPurposeLimboResolution",uu.ct))}}async function Li(t,e,n){const s=X(t),r=[],i=[],o=[];s.wc.isEmpty()||(s.wc.forEach((a,l)=>{o.push(s.Rc(l,e,n).then(c=>{if((c||n)&&s.isPrimaryClient&&s.sharedClientState.updateQueryState(l.targetId,c!=null&&c.fromCache?"not-current":"current"),c){r.push(c);const u=Tu.Li(l.targetId,c);i.push(u)}}))}),await Promise.all(o),s.dc.nu(r),await async function(a,l){const c=X(a);try{await c.persistence.runTransaction("notifyLocalViewChanges","readwrite",u=>b.forEach(l,h=>b.forEach(h.Fi,f=>c.persistence.referenceDelegate.addReference(u,h.targetId,f)).next(()=>b.forEach(h.Bi,f=>c.persistence.referenceDelegate.removeReference(u,h.targetId,f)))))}catch(u){if(!Oi(u))throw u;V("LocalStore","Failed to update sequence numbers: "+u)}for(const u of l){const h=u.targetId;if(!u.fromCache){const f=c.Ji.get(h),p=f.snapshotVersion,y=f.withLastLimboFreeSnapshotVersion(p);c.Ji=c.Ji.insert(h,y)}}}(s.localStore,i))}async function fA(t,e){const n=X(t);if(!n.currentUser.isEqual(e)){V("SyncEngine","User change. New user:",e.toKey());const s=await Lm(n.localStore,e);n.currentUser=e,function(r,i){r.Ec.forEach(o=>{o.forEach(a=>{a.reject(new j(T.CANCELLED,i))})}),r.Ec.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,s.removedBatchIds,s.addedBatchIds),await Li(n,s.er)}}function dA(t,e){const n=X(t),s=n.yc.get(e);if(s&&s.fc)return Z().add(s.key);{let r=Z();const i=n._c.get(e);if(!i)return r;for(const o of i){const a=n.wc.get(o);r=r.unionWith(a.view.nc)}return r}}function pA(t){const e=X(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=Qm.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=dA.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=lA.bind(null,e),e.dc.nu=Jb.bind(null,e.eventManager),e.dc.Pc=Xb.bind(null,e.eventManager),e}function gA(t){const e=X(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=cA.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=uA.bind(null,e),e}class Mf{constructor(){this.synchronizeTabs=!1}async initialize(e){this.serializer=Ra(e.databaseInfo.databaseId),this.sharedClientState=this.createSharedClientState(e),this.persistence=this.createPersistence(e),await this.persistence.start(),this.localStore=this.createLocalStore(e),this.gcScheduler=this.createGarbageCollectionScheduler(e,this.localStore),this.indexBackfillerScheduler=this.createIndexBackfillerScheduler(e,this.localStore)}createGarbageCollectionScheduler(e,n){return null}createIndexBackfillerScheduler(e,n){return null}createLocalStore(e){return _b(this.persistence,new vb,e.initialUser,this.serializer)}createPersistence(e){return new mb(Iu.zs,this.serializer)}createSharedClientState(e){return new Cb}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class mA{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=s=>xf(this.syncEngine,s,1),this.remoteStore.remoteSyncer.handleCredentialChange=fA.bind(null,this.syncEngine),await zb(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new Wb}createDatastore(e){const n=Ra(e.databaseInfo.databaseId),s=(r=e.databaseInfo,new Db(r));var r;return function(i,o,a,l){return new Pb(i,o,a,l)}(e.authCredentials,e.appCheckCredentials,s,n)}createRemoteStore(e){return n=this.localStore,s=this.datastore,r=e.asyncQueue,i=a=>xf(this.syncEngine,a,0),o=Nf.D()?new Nf:new Rb,new Lb(n,s,r,i,o);var n,s,r,i,o}createSyncEngine(e,n){return function(s,r,i,o,a,l,c){const u=new sA(s,r,i,o,a,l);return c&&(u.vc=!0),u}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}terminate(){return async function(e){const n=X(e);V("RemoteStore","RemoteStore shutting down."),n.vu.add(5),await Mi(n),n.Pu.shutdown(),n.bu.set("Unknown")}(this.remoteStore)}}/**
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
 */class yA{constructor(e){this.observer=e,this.muted=!1}next(e){this.observer.next&&this.Sc(this.observer.next,e)}error(e){this.observer.error?this.Sc(this.observer.error,e):pn("Uncaught Error in snapshot listener:",e.toString())}Dc(){this.muted=!0}Sc(e,n){this.muted||setTimeout(()=>{this.muted||e(n)},0)}}/**
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
 */class vA{constructor(e,n,s,r){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=s,this.databaseInfo=r,this.user=Ke.UNAUTHENTICATED,this.clientId=sm.A(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(s,async i=>{V("FirestoreClient","Received user=",i.uid),await this.authCredentialListener(i),this.user=i}),this.appCheckCredentials.start(s,i=>(V("FirestoreClient","Received new app check token=",i),this.appCheckCredentialListener(i,this.user)))}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new j(T.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Un;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const s=Ru(n,"Failed to shutdown persistence");e.reject(s)}}),e.promise}}async function fl(t,e){t.asyncQueue.verifyOperationInProgress(),V("FirestoreClient","Initializing OfflineComponentProvider");const n=await t.getConfiguration();await e.initialize(n);let s=n.initialUser;t.setCredentialChangeListener(async r=>{s.isEqual(r)||(await Lm(e.localStore,r),s=r)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function Lf(t,e){t.asyncQueue.verifyOperationInProgress();const n=await _A(t);V("FirestoreClient","Initializing OnlineComponentProvider");const s=await t.getConfiguration();await e.initialize(n,s),t.setCredentialChangeListener(r=>Df(e.remoteStore,r)),t.setAppCheckTokenChangeListener((r,i)=>Df(e.remoteStore,i)),t._onlineComponents=e}function wA(t){return t.name==="FirebaseError"?t.code===T.FAILED_PRECONDITION||t.code===T.UNIMPLEMENTED:!(typeof DOMException<"u"&&t instanceof DOMException)||t.code===22||t.code===20||t.code===11}async function _A(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){V("FirestoreClient","Using user provided OfflineComponentProvider");try{await fl(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!wA(n))throw n;Ys("Error using user provided cache. Falling back to memory cache: "+n),await fl(t,new Mf)}}else V("FirestoreClient","Using default OfflineComponentProvider"),await fl(t,new Mf);return t._offlineComponents}async function Zm(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(V("FirestoreClient","Using user provided OnlineComponentProvider"),await Lf(t,t._uninitializedComponentsProvider._online)):(V("FirestoreClient","Using default OnlineComponentProvider"),await Lf(t,new mA))),t._onlineComponents}function EA(t){return Zm(t).then(e=>e.syncEngine)}async function IA(t){const e=await Zm(t),n=e.eventManager;return n.onListen=rA.bind(null,e.syncEngine),n.onUnlisten=oA.bind(null,e.syncEngine),n}function TA(t,e,n={}){const s=new Un;return t.asyncQueue.enqueueAndForget(async()=>function(r,i,o,a,l){const c=new yA({next:h=>{i.enqueueAndForget(()=>Yb(r,u));const f=h.docs.has(o);!f&&h.fromCache?l.reject(new j(T.UNAVAILABLE,"Failed to get document because the client is offline.")):f&&h.fromCache&&a&&a.source==="server"?l.reject(new j(T.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):l.resolve(h)},error:h=>l.reject(h)}),u=new Zb(mu(o.path),c,{includeMetadataChanges:!0,Ku:!0});return Qb(r,u)}(await IA(t),t.asyncQueue,e,n,s)),s.promise}/**
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
 */function ey(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
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
 */const Uf=new Map;/**
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
 */function SA(t,e,n){if(!n)throw new j(T.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function bA(t,e,n,s){if(e===!0&&s===!0)throw new j(T.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function Ff(t){if(!H.isDocumentKey(t))throw new j(T.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function Du(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(n){return n.constructor?n.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":W()}function ps(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new j(T.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Du(t);throw new j(T.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
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
 */class Vf{constructor(e){var n,s;if(e.host===void 0){if(e.ssl!==void 0)throw new j(T.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(n=e.ssl)===null||n===void 0||n;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.cache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new j(T.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}bA("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=ey((s=e.experimentalLongPollingOptions)!==null&&s!==void 0?s:{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new j(T.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new j(T.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new j(T.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(n=this.experimentalLongPollingOptions,s=e.experimentalLongPollingOptions,n.timeoutSeconds===s.timeoutSeconds)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams;var n,s}}class Ou{constructor(e,n,s,r){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=s,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Vf({}),this._settingsFrozen=!1}get app(){if(!this._app)throw new j(T.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!==void 0}_setSettings(e){if(this._settingsFrozen)throw new j(T.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Vf(e),e.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new BT;switch(n.type){case"firstParty":return new KT(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new j(T.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const n=Uf.get(e);n&&(V("ComponentProvider","Removing Datastore"),Uf.delete(e),n.terminate())}(this),Promise.resolve()}}function AA(t,e,n,s={}){var r;const i=(t=ps(t,Ou))._getSettings(),o=`${e}:${n}`;if(i.host!=="firestore.googleapis.com"&&i.host!==o&&Ys("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),t._setSettings(Object.assign(Object.assign({},i),{host:o,ssl:!1})),s.mockUserToken){let a,l;if(typeof s.mockUserToken=="string")a=s.mockUserToken,l=Ke.MOCK_USER;else{a=l_(s.mockUserToken,(r=t._app)===null||r===void 0?void 0:r.options.projectId);const c=s.mockUserToken.sub||s.mockUserToken.user_id;if(!c)throw new j(T.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");l=new Ke(c)}t._authCredentials=new $T(new nm(a,l))}}/**
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
 */class wt{constructor(e,n,s){this.converter=n,this._key=s,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new di(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new wt(this.firestore,e,this._key)}}class xu{constructor(e,n,s){this.converter=n,this._query=s,this.type="query",this.firestore=e}withConverter(e){return new xu(this.firestore,e,this._query)}}class di extends xu{constructor(e,n,s){super(e,n,mu(s)),this._path=s,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new wt(this.firestore,null,new H(e))}withConverter(e){return new di(this.firestore,e,this._path)}}function qs(t,e,...n){if(t=at(t),arguments.length===1&&(e=sm.A()),SA("doc","path",e),t instanceof Ou){const s=Te.fromString(e,...n);return Ff(s),new wt(t,null,new H(s))}{if(!(t instanceof wt||t instanceof di))throw new j(T.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=t._path.child(Te.fromString(e,...n));return Ff(s),new wt(t.firestore,t instanceof di?t.converter:null,new H(s))}}/**
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
 */class CA{constructor(){this.Gc=Promise.resolve(),this.Qc=[],this.jc=!1,this.zc=[],this.Wc=null,this.Hc=!1,this.Jc=!1,this.Yc=[],this.qo=new Fm(this,"async_queue_retry"),this.Xc=()=>{const n=hl();n&&V("AsyncQueue","Visibility state changed to "+n.visibilityState),this.qo.Mo()};const e=hl();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.Xc)}get isShuttingDown(){return this.jc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Zc(),this.ta(e)}enterRestrictedMode(e){if(!this.jc){this.jc=!0,this.Jc=e||!1;const n=hl();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Xc)}}enqueue(e){if(this.Zc(),this.jc)return new Promise(()=>{});const n=new Un;return this.ta(()=>this.jc&&this.Jc?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Qc.push(e),this.ea()))}async ea(){if(this.Qc.length!==0){try{await this.Qc[0](),this.Qc.shift(),this.qo.reset()}catch(e){if(!Oi(e))throw e;V("AsyncQueue","Operation failed with retryable error: "+e)}this.Qc.length>0&&this.qo.No(()=>this.ea())}}ta(e){const n=this.Gc.then(()=>(this.Hc=!0,e().catch(s=>{this.Wc=s,this.Hc=!1;const r=function(i){let o=i.message||"";return i.stack&&(o=i.stack.includes(i.message)?i.stack:i.message+`
`+i.stack),o}(s);throw pn("INTERNAL UNHANDLED ERROR: ",r),s}).then(s=>(this.Hc=!1,s))));return this.Gc=n,n}enqueueAfterDelay(e,n,s){this.Zc(),this.Yc.indexOf(e)>-1&&(n=0);const r=Cu.createAndSchedule(this,e,n,s,i=>this.na(i));return this.zc.push(r),r}Zc(){this.Wc&&W()}verifyOperationInProgress(){}async sa(){let e;do e=this.Gc,await e;while(e!==this.Gc)}ia(e){for(const n of this.zc)if(n.timerId===e)return!0;return!1}ra(e){return this.sa().then(()=>{this.zc.sort((n,s)=>n.targetTimeMs-s.targetTimeMs);for(const n of this.zc)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.sa()})}oa(e){this.Yc.push(e)}na(e){const n=this.zc.indexOf(e);this.zc.splice(n,1)}}class Da extends Ou{constructor(e,n,s,r){super(e,n,s,r),this.type="firestore",this._queue=new CA,this._persistenceKey=(r==null?void 0:r.name)||"[DEFAULT]"}_terminate(){return this._firestoreClient||ny(this),this._firestoreClient.terminate()}}function RA(t,e){const n=typeof t=="object"?t:vp(),s=typeof t=="string"?t:"(default)",r=Oc(n,"firestore").getImmediate({identifier:s});if(!r._initialized){const i=o_("firestore");i&&AA(r,...i)}return r}function ty(t){return t._firestoreClient||ny(t),t._firestoreClient.verifyNotTerminated(),t._firestoreClient}function ny(t){var e,n,s;const r=t._freezeSettings(),i=function(o,a,l,c){return new nS(o,a,l,c.host,c.ssl,c.experimentalForceLongPolling,c.experimentalAutoDetectLongPolling,ey(c.experimentalLongPollingOptions),c.useFetchStreams)}(t._databaseId,((e=t._app)===null||e===void 0?void 0:e.options.appId)||"",t._persistenceKey,r);t._firestoreClient=new vA(t._authCredentials,t._appCheckCredentials,t._queue,i),!((n=r.cache)===null||n===void 0)&&n._offlineComponentProvider&&(!((s=r.cache)===null||s===void 0)&&s._onlineComponentProvider)&&(t._firestoreClient._uninitializedComponentsProvider={_offlineKind:r.cache.kind,_offline:r.cache._offlineComponentProvider,_online:r.cache._onlineComponentProvider})}/**
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
 */class nr{constructor(e){this._byteString=e}static fromBase64String(e){try{return new nr(tt.fromBase64String(e))}catch(n){throw new j(T.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new nr(tt.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
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
 */class Oa{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new j(T.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new We(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class Pu{constructor(e){this._methodName=e}}/**
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
 */class Mu{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new j(T.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new j(T.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return ie(this._lat,e._lat)||ie(this._long,e._long)}}/**
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
 */const kA=/^__.*__$/;class NA{constructor(e,n,s){this.data=e,this.fieldMask=n,this.fieldTransforms=s}toMutation(e,n){return this.fieldMask!==null?new zn(e,this.data,this.fieldMask,n,this.fieldTransforms):new xi(e,this.data,n,this.fieldTransforms)}}class sy{constructor(e,n,s){this.data=e,this.fieldMask=n,this.fieldTransforms=s}toMutation(e,n){return new zn(e,this.data,this.fieldMask,n,this.fieldTransforms)}}function ry(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw W()}}class Lu{constructor(e,n,s,r,i,o){this.settings=e,this.databaseId=n,this.serializer=s,this.ignoreUndefinedProperties=r,i===void 0&&this.ua(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get ca(){return this.settings.ca}aa(e){return new Lu(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}ha(e){var n;const s=(n=this.path)===null||n===void 0?void 0:n.child(e),r=this.aa({path:s,la:!1});return r.fa(e),r}da(e){var n;const s=(n=this.path)===null||n===void 0?void 0:n.child(e),r=this.aa({path:s,la:!1});return r.ua(),r}wa(e){return this.aa({path:void 0,la:!0})}_a(e){return jo(e,this.settings.methodName,this.settings.ma||!1,this.path,this.settings.ga)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}ua(){if(this.path)for(let e=0;e<this.path.length;e++)this.fa(this.path.get(e))}fa(e){if(e.length===0)throw this._a("Document fields must not be empty");if(ry(this.ca)&&kA.test(e))throw this._a('Document fields cannot begin and end with "__"')}}class DA{constructor(e,n,s){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=s||Ra(e)}ya(e,n,s,r=!1){return new Lu({ca:e,methodName:n,ga:s,path:We.emptyPath(),la:!1,ma:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function iy(t){const e=t._freezeSettings(),n=Ra(t._databaseId);return new DA(t._databaseId,!!e.ignoreUndefinedProperties,n)}function OA(t,e,n,s,r,i={}){const o=t.ya(i.merge||i.mergeFields?2:0,e,n,r);Uu("Data must be an object, but it was:",o,s);const a=oy(s,o);let l,c;if(i.merge)l=new vt(o.fieldMask),c=o.fieldTransforms;else if(i.mergeFields){const u=[];for(const h of i.mergeFields){const f=oc(e,h,n);if(!o.contains(f))throw new j(T.INVALID_ARGUMENT,`Field '${f}' is specified in your field mask but missing from your input data.`);ly(u,f)||u.push(f)}l=new vt(u),c=o.fieldTransforms.filter(h=>l.covers(h.field))}else l=null,c=o.fieldTransforms;return new NA(new dt(a),l,c)}class xa extends Pu{_toFieldTransform(e){if(e.ca!==2)throw e.ca===1?e._a(`${this._methodName}() can only appear at the top level of your update data`):e._a(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof xa}}function xA(t,e,n,s){const r=t.ya(1,e,n);Uu("Data must be an object, but it was:",r,s);const i=[],o=dt.empty();ys(s,(l,c)=>{const u=Fu(e,l,n);c=at(c);const h=r.da(u);if(c instanceof xa)i.push(u);else{const f=Pa(c,h);f!=null&&(i.push(u),o.set(u,f))}});const a=new vt(i);return new sy(o,a,r.fieldTransforms)}function PA(t,e,n,s,r,i){const o=t.ya(1,e,n),a=[oc(e,s,n)],l=[r];if(i.length%2!=0)throw new j(T.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let f=0;f<i.length;f+=2)a.push(oc(e,i[f])),l.push(i[f+1]);const c=[],u=dt.empty();for(let f=a.length-1;f>=0;--f)if(!ly(c,a[f])){const p=a[f];let y=l[f];y=at(y);const E=o.da(p);if(y instanceof xa)c.push(p);else{const A=Pa(y,E);A!=null&&(c.push(p),u.set(p,A))}}const h=new vt(c);return new sy(u,h,o.fieldTransforms)}function Pa(t,e){if(ay(t=at(t)))return Uu("Unsupported field value:",e,t),oy(t,e);if(t instanceof Pu)return function(n,s){if(!ry(s.ca))throw s._a(`${n._methodName}() can only be used with update() and set()`);if(!s.path)throw s._a(`${n._methodName}() is not currently supported inside arrays`);const r=n._toFieldTransform(s);r&&s.fieldTransforms.push(r)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.la&&e.ca!==4)throw e._a("Nested arrays are not supported");return function(n,s){const r=[];let i=0;for(const o of n){let a=Pa(o,s.wa(i));a==null&&(a={nullValue:"NULL_VALUE"}),r.push(a),i++}return{arrayValue:{values:r}}}(t,e)}return function(n,s){if((n=at(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return bS(s.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const r=Pe.fromDate(n);return{timestampValue:Bo(s.serializer,r)}}if(n instanceof Pe){const r=new Pe(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:Bo(s.serializer,r)}}if(n instanceof Mu)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof nr)return{bytesValue:Nm(s.serializer,n._byteString)};if(n instanceof wt){const r=s.databaseId,i=n.firestore._databaseId;if(!i.isEqual(r))throw s._a(`Document reference is for database ${i.projectId}/${i.database} but should be for database ${r.projectId}/${r.database}`);return{referenceValue:_u(n.firestore._databaseId||s.databaseId,n._key.path)}}throw s._a(`Unsupported field value: ${Du(n)}`)}(t,e)}function oy(t,e){const n={};return rm(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):ys(t,(s,r)=>{const i=Pa(r,e.ha(s));i!=null&&(n[s]=i)}),{mapValue:{fields:n}}}function ay(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof Pe||t instanceof Mu||t instanceof nr||t instanceof wt||t instanceof Pu)}function Uu(t,e,n){if(!ay(n)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(n)){const s=Du(n);throw s==="an object"?e._a(t+" a custom object"):e._a(t+" "+s)}}function oc(t,e,n){if((e=at(e))instanceof Oa)return e._internalPath;if(typeof e=="string")return Fu(t,e);throw jo("Field path arguments must be of type string or ",t,!1,void 0,n)}const MA=new RegExp("[~\\*/\\[\\]]");function Fu(t,e,n){if(e.search(MA)>=0)throw jo(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new Oa(...e.split("."))._internalPath}catch{throw jo(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function jo(t,e,n,s,r){const i=s&&!s.isEmpty(),o=r!==void 0;let a=`Function ${e}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let l="";return(i||o)&&(l+=" (found",i&&(l+=` in field ${s}`),o&&(l+=` in document ${r}`),l+=")"),new j(T.INVALID_ARGUMENT,a+t+l)}function ly(t,e){return t.some(n=>n.isEqual(e))}/**
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
 */class cy{constructor(e,n,s,r,i){this._firestore=e,this._userDataWriter=n,this._key=s,this._document=r,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new wt(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new LA(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(uy("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class LA extends cy{data(){return super.data()}}function uy(t,e){return typeof e=="string"?Fu(t,e):e instanceof Oa?e._internalPath:e._delegate._internalPath}class UA{convertValue(e,n="none"){switch(ds(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Ce(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(fs(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 10:return this.convertObject(e.mapValue,n);default:throw W()}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const s={};return ys(e,(r,i)=>{s[r]=this.convertValue(i,n)}),s}convertGeoPoint(e){return new Mu(Ce(e.latitude),Ce(e.longitude))}convertArray(e,n){return(e.values||[]).map(s=>this.convertValue(s,n))}convertServerTimestamp(e,n){switch(n){case"previous":const s=fu(e);return s==null?null:this.convertValue(s,n);case"estimate":return this.convertTimestamp(li(e));default:return null}}convertTimestamp(e){const n=$n(e);return new Pe(n.seconds,n.nanos)}convertDocumentKey(e,n){const s=Te.fromString(e);we(Mm(s));const r=new ci(s.get(1),s.get(3)),i=new H(s.popFirst(5));return r.isEqual(n)||pn(`Document ${i} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),i}}/**
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
 */function FA(t,e,n){let s;return s=t?t.toFirestore(e):e,s}/**
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
 */class VA{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class hy extends cy{constructor(e,n,s,r,i,o){super(e,n,s,r,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new BA(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const s=this._document.data.field(uy("DocumentSnapshot.get",e));if(s!==null)return this._userDataWriter.convertValue(s,n.serverTimestamps)}}}class BA extends hy{data(e={}){return super.data(e)}}/**
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
 */function ac(t){t=ps(t,wt);const e=ps(t.firestore,Da);return TA(ty(e),t._key).then(n=>jA(e,t,n))}class $A extends UA{constructor(e){super(),this.firestore=e}convertBytes(e){return new nr(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new wt(this.firestore,null,n)}}function fy(t,e,n){t=ps(t,wt);const s=ps(t.firestore,Da),r=FA(t.converter,e);return dy(s,[OA(iy(s),"setDoc",t._key,r,t.converter!==null,n).toMutation(t._key,Wt.none())])}function lc(t,e,n,...s){t=ps(t,wt);const r=ps(t.firestore,Da),i=iy(r);let o;return o=typeof(e=at(e))=="string"||e instanceof Oa?PA(i,"updateDoc",t._key,e,n,s):xA(i,"updateDoc",t._key,e),dy(r,[o.toMutation(t._key,Wt.exists(!0))])}function dy(t,e){return function(n,s){const r=new Un;return n.asyncQueue.enqueueAndForget(async()=>aA(await EA(n),s,r)),r.promise}(ty(t),e)}function jA(t,e,n){const s=n.docs.get(e._key),r=new $A(t);return new hy(t,r,e._key,s,new VA(n.hasPendingWrites,n.fromCache),e.converter)}(function(t,e=!0){(function(n){fr=n})(ir),Ws(new as("firestore",(n,{instanceIdentifier:s,options:r})=>{const i=n.getProvider("app").getImmediate(),o=new Da(new jT(n.getProvider("auth-internal")),new zT(n.getProvider("app-check-internal")),function(a,l){if(!Object.prototype.hasOwnProperty.apply(a.options,["projectId"]))throw new j(T.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ci(a.options.projectId,l)}(i,s),i);return r=Object.assign({useFetchStreams:e},r),o._setSettings(r),o},"PUBLIC").setMultipleInstances(!0)),Ln(af,"3.13.0",t),Ln(af,"3.13.0","esm2017")})();const HA={apiKey:"AIzaSyD96WBzgcd9atRLOoV3iiUxacYPoO1mZyM",authDomain:"pillfly.firebaseapp.com",projectId:"pillfly",storageBucket:"pillfly.firebasestorage.app",messagingSenderId:"818277389275",appId:"1:818277389275:web:2a56d1688914f483e34dfe",measurementId:"G-79452D2EEY"},py=yp(HA),bt=xI(py),zs=RA(py),Ae=gi({user:null,score:0,toast:{show:!1,text:"",medalDelta:0},setUser(t){this.user=t},setScore(t){this.score=t},showToast(t,e=0){this.toast.text=t,this.toast.medalDelta=e,this.toast.show=!0,setTimeout(()=>{this.toast.show=!1},2e3)}}),KA="/assets/pillfly-CESRn_1b.gif",Ui=(t,e)=>{const n=t.__vccOpts||t;for(const[s,r]of e)n[s]=r;return n},qA={name:"App",data(){return{user:bt.currentUser,store:Ae,menuOpen:!1,showScoreForGuests:!1}},mounted(){bt.onAuthStateChanged(t=>{this.user=t,t?Ae.user=Ae.user||{uid:t.uid,email:t.email}:Ae.user=null})},methods:{async logout(){await Kp(bt),Ae.user=null,this.menuOpen=!1,this.$router.push("/login")},toggleMenu(){this.menuOpen=!this.menuOpen}},computed:{storeScore(){return this.store?this.store.score:0}}},zA={id:"app",class:"min-h-screen relative overflow-hidden"},GA={class:"p-4 header-bar shadow flex items-center z-30 fixed top-0 left-0 right-0"},WA={class:"flex-1 flex items-center space-x-4"},QA={class:"flex-1 text-center"},YA={key:0,class:"inline-block score-pill"},JA={class:"score-value"},XA={class:"flex-1 flex items-center justify-end space-x-4"},ZA={key:0},eC={key:1,class:"relative"},tC={class:"inline-block"},nC={key:0,class:"absolute right-0 mt-2 w-40 bg-gray-900 text-white rounded shadow-lg overflow-hidden z-40"},sC={class:"pt-20 p-4 relative z-10 min-h-screen bg-transparent"},rC={class:"medal-text"};function iC(t,e,n,s,r,i){const o=go("router-link"),a=go("router-view");return Re(),Oe("div",zA,[e[8]||(e[8]=F("div",{class:"bg-loop"},null,-1)),F("nav",GA,[F("div",WA,[ke(o,{to:"/",class:"flex items-center space-x-3"},{default:Zn(()=>[...e[2]||(e[2]=[F("img",{src:KA,alt:"logo",class:"logo-img"},null,-1),F("h1",{class:"text-xl font-bold cursor-pointer"},"PillFly",-1)])]),_:1})]),F("div",QA,[r.store.user||r.showScoreForGuests?(Re(),Oe("div",YA,[e[3]||(e[3]=F("div",{class:"score-label"},"SCORE",-1)),F("div",JA,qt(i.storeScore),1)])):xn("",!0)]),F("div",XA,[r.store.user?(Re(),Oe("div",eC,[F("div",tC,[F("button",{onClick:e[0]||(e[0]=(...l)=>i.toggleMenu&&i.toggleMenu(...l)),class:"px-3 py-1 btn-secondary"},qt(r.store.user.username||r.store.user.email),1),r.menuOpen?(Re(),Oe("div",nC,[ke(o,{to:"/profile",class:"block px-4 py-2 hover:bg-gray-800"},{default:Zn(()=>[...e[6]||(e[6]=[On("Profile",-1)])]),_:1}),F("button",{onClick:e[1]||(e[1]=(...l)=>i.logout&&i.logout(...l)),class:"w-full text-left px-4 py-2 hover:bg-gray-800"},"Logout")])):xn("",!0)])])):(Re(),Oe("div",ZA,[ke(o,{to:"/login",class:"px-3 py-1 btn-secondary"},{default:Zn(()=>[...e[4]||(e[4]=[On("Login",-1)])]),_:1}),ke(o,{to:"/register",class:"px-3 py-1 btn-secondary"},{default:Zn(()=>[...e[5]||(e[5]=[On("Register",-1)])]),_:1})]))])]),F("main",sC,[ke(a)]),r.store.toast?(Re(),Oe("div",{key:0,class:Wo(["medal-toast",r.store.toast.show?"show":""])},[e[7]||(e[7]=F("div",{class:"medal-icon"},"🏅",-1)),F("div",rC,qt(r.store.toast.text),1)],2)):xn("",!0),e[9]||(e[9]=F("footer",{class:"fixed bottom-0 left-0 right-0 p-2 footer-bar text-sm text-center z-30"},[F("div",null,"© PillFly — use arrows or WASD to move. Space to pause.")],-1))])}const oC=Ui(qA,[["render",iC]]);/*!
 * vue-router v4.6.3
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */const Rs=typeof document<"u";function gy(t){return typeof t=="object"||"displayName"in t||"props"in t||"__vccOpts"in t}function aC(t){return t.__esModule||t[Symbol.toStringTag]==="Module"||t.default&&gy(t.default)}const ae=Object.assign;function dl(t,e){const n={};for(const s in e){const r=e[s];n[s]=Dt(r)?r.map(t):t(r)}return n}const jr=()=>{},Dt=Array.isArray;function Bf(t,e){const n={};for(const s in t)n[s]=s in e?e[s]:t[s];return n}const my=/#/g,lC=/&/g,cC=/\//g,uC=/=/g,hC=/\?/g,yy=/\+/g,fC=/%5B/g,dC=/%5D/g,vy=/%5E/g,pC=/%60/g,wy=/%7B/g,gC=/%7C/g,_y=/%7D/g,mC=/%20/g;function Vu(t){return t==null?"":encodeURI(""+t).replace(gC,"|").replace(fC,"[").replace(dC,"]")}function yC(t){return Vu(t).replace(wy,"{").replace(_y,"}").replace(vy,"^")}function cc(t){return Vu(t).replace(yy,"%2B").replace(mC,"+").replace(my,"%23").replace(lC,"%26").replace(pC,"`").replace(wy,"{").replace(_y,"}").replace(vy,"^")}function vC(t){return cc(t).replace(uC,"%3D")}function wC(t){return Vu(t).replace(my,"%23").replace(hC,"%3F")}function _C(t){return wC(t).replace(cC,"%2F")}function pi(t){if(t==null)return null;try{return decodeURIComponent(""+t)}catch{}return""+t}const EC=/\/$/,IC=t=>t.replace(EC,"");function pl(t,e,n="/"){let s,r={},i="",o="";const a=e.indexOf("#");let l=e.indexOf("?");return l=a>=0&&l>a?-1:l,l>=0&&(s=e.slice(0,l),i=e.slice(l,a>0?a:e.length),r=t(i.slice(1))),a>=0&&(s=s||e.slice(0,a),o=e.slice(a,e.length)),s=AC(s??e,n),{fullPath:s+i+o,path:s,query:r,hash:pi(o)}}function TC(t,e){const n=e.query?t(e.query):"";return e.path+(n&&"?")+n+(e.hash||"")}function $f(t,e){return!e||!t.toLowerCase().startsWith(e.toLowerCase())?t:t.slice(e.length)||"/"}function SC(t,e,n){const s=e.matched.length-1,r=n.matched.length-1;return s>-1&&s===r&&sr(e.matched[s],n.matched[r])&&Ey(e.params,n.params)&&t(e.query)===t(n.query)&&e.hash===n.hash}function sr(t,e){return(t.aliasOf||t)===(e.aliasOf||e)}function Ey(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(const n in t)if(!bC(t[n],e[n]))return!1;return!0}function bC(t,e){return Dt(t)?jf(t,e):Dt(e)?jf(e,t):t===e}function jf(t,e){return Dt(e)?t.length===e.length&&t.every((n,s)=>n===e[s]):t.length===1&&t[0]===e}function AC(t,e){if(t.startsWith("/"))return t;if(!t)return e;const n=e.split("/"),s=t.split("/"),r=s[s.length-1];(r===".."||r===".")&&s.push("");let i=n.length-1,o,a;for(o=0;o<s.length;o++)if(a=s[o],a!==".")if(a==="..")i>1&&i--;else break;return n.slice(0,i).join("/")+"/"+s.slice(o).join("/")}const In={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};let uc=function(t){return t.pop="pop",t.push="push",t}({}),gl=function(t){return t.back="back",t.forward="forward",t.unknown="",t}({});function CC(t){if(!t)if(Rs){const e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^\w+:\/\/[^\/]+/,"")}else t="/";return t[0]!=="/"&&t[0]!=="#"&&(t="/"+t),IC(t)}const RC=/^[^#]+#/;function kC(t,e){return t.replace(RC,"#")+e}function NC(t,e){const n=document.documentElement.getBoundingClientRect(),s=t.getBoundingClientRect();return{behavior:e.behavior,left:s.left-n.left-(e.left||0),top:s.top-n.top-(e.top||0)}}const Ma=()=>({left:window.scrollX,top:window.scrollY});function DC(t){let e;if("el"in t){const n=t.el,s=typeof n=="string"&&n.startsWith("#"),r=typeof n=="string"?s?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!r)return;e=NC(r,t)}else e=t;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.scrollX,e.top!=null?e.top:window.scrollY)}function Hf(t,e){return(history.state?history.state.position-e:-1)+t}const hc=new Map;function OC(t,e){hc.set(t,e)}function xC(t){const e=hc.get(t);return hc.delete(t),e}function PC(t){return typeof t=="string"||t&&typeof t=="object"}function Iy(t){return typeof t=="string"||typeof t=="symbol"}let Ie=function(t){return t[t.MATCHER_NOT_FOUND=1]="MATCHER_NOT_FOUND",t[t.NAVIGATION_GUARD_REDIRECT=2]="NAVIGATION_GUARD_REDIRECT",t[t.NAVIGATION_ABORTED=4]="NAVIGATION_ABORTED",t[t.NAVIGATION_CANCELLED=8]="NAVIGATION_CANCELLED",t[t.NAVIGATION_DUPLICATED=16]="NAVIGATION_DUPLICATED",t}({});const Ty=Symbol("");Ie.MATCHER_NOT_FOUND+"",Ie.NAVIGATION_GUARD_REDIRECT+"",Ie.NAVIGATION_ABORTED+"",Ie.NAVIGATION_CANCELLED+"",Ie.NAVIGATION_DUPLICATED+"";function rr(t,e){return ae(new Error,{type:t,[Ty]:!0},e)}function tn(t,e){return t instanceof Error&&Ty in t&&(e==null||!!(t.type&e))}const MC=["params","query","hash"];function LC(t){if(typeof t=="string")return t;if(t.path!=null)return t.path;const e={};for(const n of MC)n in t&&(e[n]=t[n]);return JSON.stringify(e,null,2)}function UC(t){const e={};if(t===""||t==="?")return e;const n=(t[0]==="?"?t.slice(1):t).split("&");for(let s=0;s<n.length;++s){const r=n[s].replace(yy," "),i=r.indexOf("="),o=pi(i<0?r:r.slice(0,i)),a=i<0?null:pi(r.slice(i+1));if(o in e){let l=e[o];Dt(l)||(l=e[o]=[l]),l.push(a)}else e[o]=a}return e}function Kf(t){let e="";for(let n in t){const s=t[n];if(n=vC(n),s==null){s!==void 0&&(e+=(e.length?"&":"")+n);continue}(Dt(s)?s.map(r=>r&&cc(r)):[s&&cc(s)]).forEach(r=>{r!==void 0&&(e+=(e.length?"&":"")+n,r!=null&&(e+="="+r))})}return e}function FC(t){const e={};for(const n in t){const s=t[n];s!==void 0&&(e[n]=Dt(s)?s.map(r=>r==null?null:""+r):s==null?s:""+s)}return e}const VC=Symbol(""),qf=Symbol(""),Bu=Symbol(""),Sy=Symbol(""),fc=Symbol("");function Er(){let t=[];function e(s){return t.push(s),()=>{const r=t.indexOf(s);r>-1&&t.splice(r,1)}}function n(){t=[]}return{add:e,list:()=>t.slice(),reset:n}}function bn(t,e,n,s,r,i=o=>o()){const o=s&&(s.enterCallbacks[r]=s.enterCallbacks[r]||[]);return()=>new Promise((a,l)=>{const c=f=>{f===!1?l(rr(Ie.NAVIGATION_ABORTED,{from:n,to:e})):f instanceof Error?l(f):PC(f)?l(rr(Ie.NAVIGATION_GUARD_REDIRECT,{from:e,to:f})):(o&&s.enterCallbacks[r]===o&&typeof f=="function"&&o.push(f),a())},u=i(()=>t.call(s&&s.instances[r],e,n,c));let h=Promise.resolve(u);t.length<3&&(h=h.then(c)),h.catch(f=>l(f))})}function ml(t,e,n,s,r=i=>i()){const i=[];for(const o of t)for(const a in o.components){let l=o.components[a];if(!(e!=="beforeRouteEnter"&&!o.instances[a]))if(gy(l)){const c=(l.__vccOpts||l)[e];c&&i.push(bn(c,n,s,o,a,r))}else{let c=l();i.push(()=>c.then(u=>{if(!u)throw new Error(`Couldn't resolve component "${a}" at "${o.path}"`);const h=aC(u)?u.default:u;o.mods[a]=u,o.components[a]=h;const f=(h.__vccOpts||h)[e];return f&&bn(f,n,s,o,a,r)()}))}}return i}function BC(t,e){const n=[],s=[],r=[],i=Math.max(e.matched.length,t.matched.length);for(let o=0;o<i;o++){const a=e.matched[o];a&&(t.matched.find(c=>sr(c,a))?s.push(a):n.push(a));const l=t.matched[o];l&&(e.matched.find(c=>sr(c,l))||r.push(l))}return[n,s,r]}/*!
 * vue-router v4.6.3
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let $C=()=>location.protocol+"//"+location.host;function by(t,e){const{pathname:n,search:s,hash:r}=e,i=t.indexOf("#");if(i>-1){let o=r.includes(t.slice(i))?t.slice(i).length:1,a=r.slice(o);return a[0]!=="/"&&(a="/"+a),$f(a,"")}return $f(n,t)+s+r}function jC(t,e,n,s){let r=[],i=[],o=null;const a=({state:f})=>{const p=by(t,location),y=n.value,E=e.value;let A=0;if(f){if(n.value=p,e.value=f,o&&o===y){o=null;return}A=E?f.position-E.position:0}else s(p);r.forEach(N=>{N(n.value,y,{delta:A,type:uc.pop,direction:A?A>0?gl.forward:gl.back:gl.unknown})})};function l(){o=n.value}function c(f){r.push(f);const p=()=>{const y=r.indexOf(f);y>-1&&r.splice(y,1)};return i.push(p),p}function u(){if(document.visibilityState==="hidden"){const{history:f}=window;if(!f.state)return;f.replaceState(ae({},f.state,{scroll:Ma()}),"")}}function h(){for(const f of i)f();i=[],window.removeEventListener("popstate",a),window.removeEventListener("pagehide",u),document.removeEventListener("visibilitychange",u)}return window.addEventListener("popstate",a),window.addEventListener("pagehide",u),document.addEventListener("visibilitychange",u),{pauseListeners:l,listen:c,destroy:h}}function zf(t,e,n,s=!1,r=!1){return{back:t,current:e,forward:n,replaced:s,position:window.history.length,scroll:r?Ma():null}}function HC(t){const{history:e,location:n}=window,s={value:by(t,n)},r={value:e.state};r.value||i(s.value,{back:null,current:s.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function i(l,c,u){const h=t.indexOf("#"),f=h>-1?(n.host&&document.querySelector("base")?t:t.slice(h))+l:$C()+t+l;try{e[u?"replaceState":"pushState"](c,"",f),r.value=c}catch(p){console.error(p),n[u?"replace":"assign"](f)}}function o(l,c){i(l,ae({},e.state,zf(r.value.back,l,r.value.forward,!0),c,{position:r.value.position}),!0),s.value=l}function a(l,c){const u=ae({},r.value,e.state,{forward:l,scroll:Ma()});i(u.current,u,!0),i(l,ae({},zf(s.value,l,null),{position:u.position+1},c),!1),s.value=l}return{location:s,state:r,push:a,replace:o}}function KC(t){t=CC(t);const e=HC(t),n=jC(t,e.state,e.location,e.replace);function s(i,o=!0){o||n.pauseListeners(),history.go(i)}const r=ae({location:"",base:t,go:s,createHref:kC.bind(null,t)},e,n);return Object.defineProperty(r,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(r,"state",{enumerable:!0,get:()=>e.state.value}),r}let ss=function(t){return t[t.Static=0]="Static",t[t.Param=1]="Param",t[t.Group=2]="Group",t}({});var De=function(t){return t[t.Static=0]="Static",t[t.Param=1]="Param",t[t.ParamRegExp=2]="ParamRegExp",t[t.ParamRegExpEnd=3]="ParamRegExpEnd",t[t.EscapeNext=4]="EscapeNext",t}(De||{});const qC={type:ss.Static,value:""},zC=/[a-zA-Z0-9_]/;function GC(t){if(!t)return[[]];if(t==="/")return[[qC]];if(!t.startsWith("/"))throw new Error(`Invalid path "${t}"`);function e(p){throw new Error(`ERR (${n})/"${c}": ${p}`)}let n=De.Static,s=n;const r=[];let i;function o(){i&&r.push(i),i=[]}let a=0,l,c="",u="";function h(){c&&(n===De.Static?i.push({type:ss.Static,value:c}):n===De.Param||n===De.ParamRegExp||n===De.ParamRegExpEnd?(i.length>1&&(l==="*"||l==="+")&&e(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`),i.push({type:ss.Param,value:c,regexp:u,repeatable:l==="*"||l==="+",optional:l==="*"||l==="?"})):e("Invalid state to consume buffer"),c="")}function f(){c+=l}for(;a<t.length;){if(l=t[a++],l==="\\"&&n!==De.ParamRegExp){s=n,n=De.EscapeNext;continue}switch(n){case De.Static:l==="/"?(c&&h(),o()):l===":"?(h(),n=De.Param):f();break;case De.EscapeNext:f(),n=s;break;case De.Param:l==="("?n=De.ParamRegExp:zC.test(l)?f():(h(),n=De.Static,l!=="*"&&l!=="?"&&l!=="+"&&a--);break;case De.ParamRegExp:l===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+l:n=De.ParamRegExpEnd:u+=l;break;case De.ParamRegExpEnd:h(),n=De.Static,l!=="*"&&l!=="?"&&l!=="+"&&a--,u="";break;default:e("Unknown state");break}}return n===De.ParamRegExp&&e(`Unfinished custom RegExp for param "${c}"`),h(),o(),r}const Gf="[^/]+?",WC={sensitive:!1,strict:!1,start:!0,end:!0};var rt=function(t){return t[t._multiplier=10]="_multiplier",t[t.Root=90]="Root",t[t.Segment=40]="Segment",t[t.SubSegment=30]="SubSegment",t[t.Static=40]="Static",t[t.Dynamic=20]="Dynamic",t[t.BonusCustomRegExp=10]="BonusCustomRegExp",t[t.BonusWildcard=-50]="BonusWildcard",t[t.BonusRepeatable=-20]="BonusRepeatable",t[t.BonusOptional=-8]="BonusOptional",t[t.BonusStrict=.7000000000000001]="BonusStrict",t[t.BonusCaseSensitive=.25]="BonusCaseSensitive",t}(rt||{});const QC=/[.+*?^${}()[\]/\\]/g;function YC(t,e){const n=ae({},WC,e),s=[];let r=n.start?"^":"";const i=[];for(const c of t){const u=c.length?[]:[rt.Root];n.strict&&!c.length&&(r+="/");for(let h=0;h<c.length;h++){const f=c[h];let p=rt.Segment+(n.sensitive?rt.BonusCaseSensitive:0);if(f.type===ss.Static)h||(r+="/"),r+=f.value.replace(QC,"\\$&"),p+=rt.Static;else if(f.type===ss.Param){const{value:y,repeatable:E,optional:A,regexp:N}=f;i.push({name:y,repeatable:E,optional:A});const R=N||Gf;if(R!==Gf){p+=rt.BonusCustomRegExp;try{`${R}`}catch(x){throw new Error(`Invalid custom RegExp for param "${y}" (${R}): `+x.message)}}let M=E?`((?:${R})(?:/(?:${R}))*)`:`(${R})`;h||(M=A&&c.length<2?`(?:/${M})`:"/"+M),A&&(M+="?"),r+=M,p+=rt.Dynamic,A&&(p+=rt.BonusOptional),E&&(p+=rt.BonusRepeatable),R===".*"&&(p+=rt.BonusWildcard)}u.push(p)}s.push(u)}if(n.strict&&n.end){const c=s.length-1;s[c][s[c].length-1]+=rt.BonusStrict}n.strict||(r+="/?"),n.end?r+="$":n.strict&&!r.endsWith("/")&&(r+="(?:/|$)");const o=new RegExp(r,n.sensitive?"":"i");function a(c){const u=c.match(o),h={};if(!u)return null;for(let f=1;f<u.length;f++){const p=u[f]||"",y=i[f-1];h[y.name]=p&&y.repeatable?p.split("/"):p}return h}function l(c){let u="",h=!1;for(const f of t){(!h||!u.endsWith("/"))&&(u+="/"),h=!1;for(const p of f)if(p.type===ss.Static)u+=p.value;else if(p.type===ss.Param){const{value:y,repeatable:E,optional:A}=p,N=y in c?c[y]:"";if(Dt(N)&&!E)throw new Error(`Provided param "${y}" is an array but it is not repeatable (* or + modifiers)`);const R=Dt(N)?N.join("/"):N;if(!R)if(A)f.length<2&&(u.endsWith("/")?u=u.slice(0,-1):h=!0);else throw new Error(`Missing required param "${y}"`);u+=R}}return u||"/"}return{re:o,score:s,keys:i,parse:a,stringify:l}}function JC(t,e){let n=0;for(;n<t.length&&n<e.length;){const s=e[n]-t[n];if(s)return s;n++}return t.length<e.length?t.length===1&&t[0]===rt.Static+rt.Segment?-1:1:t.length>e.length?e.length===1&&e[0]===rt.Static+rt.Segment?1:-1:0}function Ay(t,e){let n=0;const s=t.score,r=e.score;for(;n<s.length&&n<r.length;){const i=JC(s[n],r[n]);if(i)return i;n++}if(Math.abs(r.length-s.length)===1){if(Wf(s))return 1;if(Wf(r))return-1}return r.length-s.length}function Wf(t){const e=t[t.length-1];return t.length>0&&e[e.length-1]<0}const XC={strict:!1,end:!0,sensitive:!1};function ZC(t,e,n){const s=YC(GC(t.path),n),r=ae(s,{record:t,parent:e,children:[],alias:[]});return e&&!r.record.aliasOf==!e.record.aliasOf&&e.children.push(r),r}function eR(t,e){const n=[],s=new Map;e=Bf(XC,e);function r(h){return s.get(h)}function i(h,f,p){const y=!p,E=Yf(h);E.aliasOf=p&&p.record;const A=Bf(e,h),N=[E];if("alias"in h){const x=typeof h.alias=="string"?[h.alias]:h.alias;for(const ee of x)N.push(Yf(ae({},E,{components:p?p.record.components:E.components,path:ee,aliasOf:p?p.record:E})))}let R,M;for(const x of N){const{path:ee}=x;if(f&&ee[0]!=="/"){const ye=f.record.path,ue=ye[ye.length-1]==="/"?"":"/";x.path=f.record.path+(ee&&ue+ee)}if(R=ZC(x,f,A),p?p.alias.push(R):(M=M||R,M!==R&&M.alias.push(R),y&&h.name&&!Jf(R)&&o(h.name)),Cy(R)&&l(R),E.children){const ye=E.children;for(let ue=0;ue<ye.length;ue++)i(ye[ue],R,p&&p.children[ue])}p=p||R}return M?()=>{o(M)}:jr}function o(h){if(Iy(h)){const f=s.get(h);f&&(s.delete(h),n.splice(n.indexOf(f),1),f.children.forEach(o),f.alias.forEach(o))}else{const f=n.indexOf(h);f>-1&&(n.splice(f,1),h.record.name&&s.delete(h.record.name),h.children.forEach(o),h.alias.forEach(o))}}function a(){return n}function l(h){const f=sR(h,n);n.splice(f,0,h),h.record.name&&!Jf(h)&&s.set(h.record.name,h)}function c(h,f){let p,y={},E,A;if("name"in h&&h.name){if(p=s.get(h.name),!p)throw rr(Ie.MATCHER_NOT_FOUND,{location:h});A=p.record.name,y=ae(Qf(f.params,p.keys.filter(M=>!M.optional).concat(p.parent?p.parent.keys.filter(M=>M.optional):[]).map(M=>M.name)),h.params&&Qf(h.params,p.keys.map(M=>M.name))),E=p.stringify(y)}else if(h.path!=null)E=h.path,p=n.find(M=>M.re.test(E)),p&&(y=p.parse(E),A=p.record.name);else{if(p=f.name?s.get(f.name):n.find(M=>M.re.test(f.path)),!p)throw rr(Ie.MATCHER_NOT_FOUND,{location:h,currentLocation:f});A=p.record.name,y=ae({},f.params,h.params),E=p.stringify(y)}const N=[];let R=p;for(;R;)N.unshift(R.record),R=R.parent;return{name:A,path:E,params:y,matched:N,meta:nR(N)}}t.forEach(h=>i(h));function u(){n.length=0,s.clear()}return{addRoute:i,resolve:c,removeRoute:o,clearRoutes:u,getRoutes:a,getRecordMatcher:r}}function Qf(t,e){const n={};for(const s of e)s in t&&(n[s]=t[s]);return n}function Yf(t){const e={path:t.path,redirect:t.redirect,name:t.name,meta:t.meta||{},aliasOf:t.aliasOf,beforeEnter:t.beforeEnter,props:tR(t),children:t.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in t?t.components||null:t.component&&{default:t.component}};return Object.defineProperty(e,"mods",{value:{}}),e}function tR(t){const e={},n=t.props||!1;if("component"in t)e.default=n;else for(const s in t.components)e[s]=typeof n=="object"?n[s]:n;return e}function Jf(t){for(;t;){if(t.record.aliasOf)return!0;t=t.parent}return!1}function nR(t){return t.reduce((e,n)=>ae(e,n.meta),{})}function sR(t,e){let n=0,s=e.length;for(;n!==s;){const i=n+s>>1;Ay(t,e[i])<0?s=i:n=i+1}const r=rR(t);return r&&(s=e.lastIndexOf(r,s-1)),s}function rR(t){let e=t;for(;e=e.parent;)if(Cy(e)&&Ay(t,e)===0)return e}function Cy({record:t}){return!!(t.name||t.components&&Object.keys(t.components).length||t.redirect)}function Xf(t){const e=cn(Bu),n=cn(Sy),s=Ct(()=>{const l=Ps(t.to);return e.resolve(l)}),r=Ct(()=>{const{matched:l}=s.value,{length:c}=l,u=l[c-1],h=n.matched;if(!u||!h.length)return-1;const f=h.findIndex(sr.bind(null,u));if(f>-1)return f;const p=Zf(l[c-2]);return c>1&&Zf(u)===p&&h[h.length-1].path!==p?h.findIndex(sr.bind(null,l[c-2])):f}),i=Ct(()=>r.value>-1&&cR(n.params,s.value.params)),o=Ct(()=>r.value>-1&&r.value===n.matched.length-1&&Ey(n.params,s.value.params));function a(l={}){if(lR(l)){const c=e[Ps(t.replace)?"replace":"push"](Ps(t.to)).catch(jr);return t.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>c),c}return Promise.resolve()}return{route:s,href:Ct(()=>s.value.href),isActive:i,isExactActive:o,navigate:a}}function iR(t){return t.length===1?t[0]:t}const oR=Pd({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:Xf,setup(t,{slots:e}){const n=gi(Xf(t)),{options:s}=cn(Bu),r=Ct(()=>({[ed(t.activeClass,s.linkActiveClass,"router-link-active")]:n.isActive,[ed(t.exactActiveClass,s.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const i=e.default&&iR(e.default(n));return t.custom?i:op("a",{"aria-current":n.isExactActive?t.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:r.value},i)}}}),aR=oR;function lR(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)){if(t.currentTarget&&t.currentTarget.getAttribute){const e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function cR(t,e){for(const n in e){const s=e[n],r=t[n];if(typeof s=="string"){if(s!==r)return!1}else if(!Dt(r)||r.length!==s.length||s.some((i,o)=>i!==r[o]))return!1}return!0}function Zf(t){return t?t.aliasOf?t.aliasOf.path:t.path:""}const ed=(t,e,n)=>t??e??n,uR=Pd({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(t,{attrs:e,slots:n}){const s=cn(fc),r=Ct(()=>t.route||s.value),i=cn(qf,0),o=Ct(()=>{let c=Ps(i);const{matched:u}=r.value;let h;for(;(h=u[c])&&!h.components;)c++;return c}),a=Ct(()=>r.value.matched[o.value]);Xi(qf,Ct(()=>o.value+1)),Xi(VC,a),Xi(fc,r);const l=iv();return Zi(()=>[l.value,a.value,t.name],([c,u,h],[f,p,y])=>{u&&(u.instances[h]=c,p&&p!==u&&c&&c===f&&(u.leaveGuards.size||(u.leaveGuards=p.leaveGuards),u.updateGuards.size||(u.updateGuards=p.updateGuards))),c&&u&&(!p||!sr(u,p)||!f)&&(u.enterCallbacks[h]||[]).forEach(E=>E(c))},{flush:"post"}),()=>{const c=r.value,u=t.name,h=a.value,f=h&&h.components[u];if(!f)return td(n.default,{Component:f,route:c});const p=h.props[u],y=p?p===!0?c.params:typeof p=="function"?p(c):p:null,A=op(f,ae({},y,e,{onVnodeUnmounted:N=>{N.component.isUnmounted&&(h.instances[u]=null)},ref:l}));return td(n.default,{Component:A,route:c})||A}}});function td(t,e){if(!t)return null;const n=t(e);return n.length===1?n[0]:n}const hR=uR;function fR(t){const e=eR(t.routes,t),n=t.parseQuery||UC,s=t.stringifyQuery||Kf,r=t.history,i=Er(),o=Er(),a=Er(),l=ov(In);let c=In;Rs&&t.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=dl.bind(null,_=>""+_),h=dl.bind(null,_C),f=dl.bind(null,pi);function p(_,U){let P,B;return Iy(_)?(P=e.getRecordMatcher(_),B=U):B=_,e.addRoute(B,P)}function y(_){const U=e.getRecordMatcher(_);U&&e.removeRoute(U)}function E(){return e.getRoutes().map(_=>_.record)}function A(_){return!!e.getRecordMatcher(_)}function N(_,U){if(U=ae({},U||l.value),typeof _=="string"){const m=pl(n,_,U.path),w=e.resolve({path:m.path},U),I=r.createHref(m.fullPath);return ae(m,w,{params:f(w.params),hash:pi(m.hash),redirectedFrom:void 0,href:I})}let P;if(_.path!=null)P=ae({},_,{path:pl(n,_.path,U.path).path});else{const m=ae({},_.params);for(const w in m)m[w]==null&&delete m[w];P=ae({},_,{params:h(m)}),U.params=h(U.params)}const B=e.resolve(P,U),te=_.hash||"";B.params=u(f(B.params));const d=TC(s,ae({},_,{hash:yC(te),path:B.path})),g=r.createHref(d);return ae({fullPath:d,hash:te,query:s===Kf?FC(_.query):_.query||{}},B,{redirectedFrom:void 0,href:g})}function R(_){return typeof _=="string"?pl(n,_,l.value.path):ae({},_)}function M(_,U){if(c!==_)return rr(Ie.NAVIGATION_CANCELLED,{from:U,to:_})}function x(_){return ue(_)}function ee(_){return x(ae(R(_),{replace:!0}))}function ye(_,U){const P=_.matched[_.matched.length-1];if(P&&P.redirect){const{redirect:B}=P;let te=typeof B=="function"?B(_,U):B;return typeof te=="string"&&(te=te.includes("?")||te.includes("#")?te=R(te):{path:te},te.params={}),ae({query:_.query,hash:_.hash,params:te.path!=null?{}:_.params},te)}}function ue(_,U){const P=c=N(_),B=l.value,te=_.state,d=_.force,g=_.replace===!0,m=ye(P,B);if(m)return ue(ae(R(m),{state:typeof m=="object"?ae({},te,m.state):te,force:d,replace:g}),U||P);const w=P;w.redirectedFrom=U;let I;return!d&&SC(s,B,P)&&(I=rr(Ie.NAVIGATION_DUPLICATED,{to:w,from:B}),xt(B,B,!0,!1)),(I?Promise.resolve(I):Et(w,B)).catch(v=>tn(v)?tn(v,Ie.NAVIGATION_GUARD_REDIRECT)?v:_n(v):oe(v,w,B)).then(v=>{if(v){if(tn(v,Ie.NAVIGATION_GUARD_REDIRECT))return ue(ae({replace:g},R(v.to),{state:typeof v.to=="object"?ae({},te,v.to.state):te,force:d}),U||w)}else v=Gn(w,B,!0,g,te);return wn(w,B,v),v})}function lt(_,U){const P=M(_,U);return P?Promise.reject(P):Promise.resolve()}function nt(_){const U=Es.values().next().value;return U&&typeof U.runWithContext=="function"?U.runWithContext(_):_()}function Et(_,U){let P;const[B,te,d]=BC(_,U);P=ml(B.reverse(),"beforeRouteLeave",_,U);for(const m of B)m.leaveGuards.forEach(w=>{P.push(bn(w,_,U))});const g=lt.bind(null,_,U);return P.push(g),It(P).then(()=>{P=[];for(const m of i.list())P.push(bn(m,_,U));return P.push(g),It(P)}).then(()=>{P=ml(te,"beforeRouteUpdate",_,U);for(const m of te)m.updateGuards.forEach(w=>{P.push(bn(w,_,U))});return P.push(g),It(P)}).then(()=>{P=[];for(const m of d)if(m.beforeEnter)if(Dt(m.beforeEnter))for(const w of m.beforeEnter)P.push(bn(w,_,U));else P.push(bn(m.beforeEnter,_,U));return P.push(g),It(P)}).then(()=>(_.matched.forEach(m=>m.enterCallbacks={}),P=ml(d,"beforeRouteEnter",_,U,nt),P.push(g),It(P))).then(()=>{P=[];for(const m of o.list())P.push(bn(m,_,U));return P.push(g),It(P)}).catch(m=>tn(m,Ie.NAVIGATION_CANCELLED)?m:Promise.reject(m))}function wn(_,U,P){a.list().forEach(B=>nt(()=>B(_,U,P)))}function Gn(_,U,P,B,te){const d=M(_,U);if(d)return d;const g=U===In,m=Rs?history.state:{};P&&(B||g?r.replace(_.fullPath,ae({scroll:g&&m&&m.scroll},te)):r.push(_.fullPath,te)),l.value=_,xt(_,U,P,g),_n()}let Ot;function gr(){Ot||(Ot=r.listen((_,U,P)=>{if(!Wn.listening)return;const B=N(_),te=ye(B,Wn.currentRoute.value);if(te){ue(ae(te,{replace:!0,force:!0}),B).catch(jr);return}c=B;const d=l.value;Rs&&OC(Hf(d.fullPath,P.delta),Ma()),Et(B,d).catch(g=>tn(g,Ie.NAVIGATION_ABORTED|Ie.NAVIGATION_CANCELLED)?g:tn(g,Ie.NAVIGATION_GUARD_REDIRECT)?(ue(ae(R(g.to),{force:!0}),B).then(m=>{tn(m,Ie.NAVIGATION_ABORTED|Ie.NAVIGATION_DUPLICATED)&&!P.delta&&P.type===uc.pop&&r.go(-1,!1)}).catch(jr),Promise.reject()):(P.delta&&r.go(-P.delta,!1),oe(g,B,d))).then(g=>{g=g||Gn(B,d,!1),g&&(P.delta&&!tn(g,Ie.NAVIGATION_CANCELLED)?r.go(-P.delta,!1):P.type===uc.pop&&tn(g,Ie.NAVIGATION_ABORTED|Ie.NAVIGATION_DUPLICATED)&&r.go(-1,!1)),wn(B,d,g)}).catch(jr)}))}let ws=Er(),Me=Er(),de;function oe(_,U,P){_n(_);const B=Me.list();return B.length?B.forEach(te=>te(_,U,P)):console.error(_),Promise.reject(_)}function Zt(){return de&&l.value!==In?Promise.resolve():new Promise((_,U)=>{ws.add([_,U])})}function _n(_){return de||(de=!_,gr(),ws.list().forEach(([U,P])=>_?P(_):U()),ws.reset()),_}function xt(_,U,P,B){const{scrollBehavior:te}=t;if(!Rs||!te)return Promise.resolve();const d=!P&&xC(Hf(_.fullPath,0))||(B||!P)&&history.state&&history.state.scroll||null;return kd().then(()=>te(_,U,d)).then(g=>g&&DC(g)).catch(g=>oe(g,_,U))}const ct=_=>r.go(_);let _s;const Es=new Set,Wn={currentRoute:l,listening:!0,addRoute:p,removeRoute:y,clearRoutes:e.clearRoutes,hasRoute:A,getRoutes:E,resolve:N,options:t,push:x,replace:ee,go:ct,back:()=>ct(-1),forward:()=>ct(1),beforeEach:i.add,beforeResolve:o.add,afterEach:a.add,onError:Me.add,isReady:Zt,install(_){_.component("RouterLink",aR),_.component("RouterView",hR),_.config.globalProperties.$router=Wn,Object.defineProperty(_.config.globalProperties,"$route",{enumerable:!0,get:()=>Ps(l)}),Rs&&!_s&&l.value===In&&(_s=!0,x(r.location).catch(B=>{}));const U={};for(const B in In)Object.defineProperty(U,B,{get:()=>l.value[B],enumerable:!0});_.provide(Bu,Wn),_.provide(Sy,bd(U)),_.provide(fc,l);const P=_.unmount;Es.add(_),_.unmount=function(){Es.delete(_),Es.size<1&&(c=In,Ot&&Ot(),Ot=null,l.value=In,_s=!1,de=!1),P()}}};function It(_){return _.reduce((U,P)=>U.then(()=>nt(P)),Promise.resolve())}return Wn}const dR={data(){return{player:{x:window.innerWidth/2-40,y:window.innerHeight-15-80},items:[],score:0,paused:!1,gameOver:!1,showWelcome:!0,guestMode:!1,gameLoop:null,spawnLoop:null,idCounter:0,keys:{},localMedals:0}},computed:{playerImg(){return new URL("/assets/pillfly-CESRn_1b.gif",import.meta.url).href}},methods:{getImg(t){if(t==="sol")return new URL("/assets/sol-B-krxm-Q.gif",import.meta.url).href;if(t==="rock")return new URL("/assets/rock-DZ7IhzBu.gif",import.meta.url).href;if(t==="rocket")return new URL("/assets/rocket-DjbDbg9K.gif",import.meta.url).href},startGame(){this.gameLoop=setInterval(this.update,20),this.spawnLoop=setInterval(this.spawnItem,500)},startAsPlayer(){this.guestMode=!1,this.showWelcome=!1,this.startGame()},startAsGuest(){this.guestMode=!0,this.showWelcome=!1,this.startGame()},spawnItem(){if(this.paused||this.gameOver)return;const t=["sol","rock","rocket"],e=t[Math.floor(Math.random()*t.length)],n=60;this.items.push({id:this.idCounter++,type:e,x:Math.random()*(window.innerWidth-n),y:-n,speed:2+Math.random()*3})},update(){if(this.paused||this.gameOver)return;const t=6;(this.keys.ArrowLeft||this.keys.a)&&(this.player.x-=t),(this.keys.ArrowRight||this.keys.d)&&(this.player.x+=t),(this.keys.ArrowUp||this.keys.w)&&(this.player.y-=t),(this.keys.ArrowDown||this.keys.s)&&(this.player.y+=t);const e=80,n=80;this.player.x=Math.max(0,Math.min(window.innerWidth-e,this.player.x)),this.player.y=Math.max(0,Math.min(window.innerHeight-n-15,this.player.y)),this.items.forEach(s=>{s.y+=s.speed}),this.items=this.items.filter(s=>s.y<window.innerHeight+30);for(let s=this.items.length-1;s>=0;s--){const r=this.items[s];if(Math.abs(this.player.x+40-(r.x+30))<55&&Math.abs(this.player.y+40-(r.y+30))<55)if(r.type==="sol"){this.score+=1,Ae.setScore(this.score);const i=Math.floor(this.score/20);if(i>this.localMedals){const o=i-this.localMedals;this.localMedals=i,this.saveMedals(i),Ae.showToast(`Congratulations — you earned ${o} new medal${o>1?"s":""}! Total medals ${i}.`,o)}this.items.splice(s,1)}else this.gameOver=!0,this.saveScore()}},async saveScore(){var e;const t=bt.currentUser;if(!this.guestMode&&t){const n=qs(zs,"users",t.uid),i=(((e=(await ac(n)).data())==null?void 0:e.totalScore)||0)+this.score;await lc(n,{totalScore:i,medals:Math.floor(i/20)}),Ae.user=Object.assign({},Ae.user,{totalScore:i,medals:Math.floor(i/20)})}},async saveMedals(t){const e=bt.currentUser;if(!e)return;const n=qs(zs,"users",e.uid);try{await lc(n,{medals:t}),Ae.user=Object.assign({},Ae.user,{medals:t})}catch{await fy(n,{username:e.displayName||e.email,totalScore:this.score,medals:t}),Ae.user=Object.assign({},Ae.user,{medals:t,totalScore:this.score})}},restart(){clearInterval(this.gameLoop),clearInterval(this.spawnLoop),this.player={x:window.innerWidth/2-40,y:window.innerHeight-15-80},this.items=[],this.score=0,this.gameOver=!1,this.paused=!1,!this.showWelcome&&this.startGame()},handleKeyDown(t){this.keys[t.key]=!0,t.key===" "&&(this.paused=!this.paused)},handleKeyUp(t){this.keys[t.key]=!1}},mounted(){window.addEventListener("keydown",this.handleKeyDown),window.addEventListener("keyup",this.handleKeyUp);const t=bt.currentUser;if(t){const e=qs(zs,"users",t.uid);ac(e).then(n=>{const s=n.data();s&&(this.localMedals=s.medals||Math.floor((s.totalScore||0)/20),Ae.user=Object.assign({},Ae.user,{username:s.username,totalScore:s.totalScore||0,medals:this.localMedals}))}).catch(()=>{})}},beforeUnmount(){window.removeEventListener("keydown",this.handleKeyDown),window.removeEventListener("keyup",this.handleKeyUp),clearInterval(this.gameLoop),clearInterval(this.spawnLoop)}},pR={class:"relative h-screen w-full overflow-hidden"},gR={key:0,class:"absolute left-0 right-0 top-20 bottom-0 z-20 flex items-start justify-center"},mR={class:"welcome-box"},yR={class:"flex items-start justify-start space-x-4 mt-4"},vR=["src"],wR=["src"],_R={class:"absolute top-4 left-4 text-white text-2xl"},ER={key:1,class:"absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"},IR={key:2,class:"absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"},TR={class:"text-center text-white"},SR={class:"text-2xl mt-2"};function bR(t,e,n,s,r,i){const o=go("router-link");return Re(),Oe("div",pR,[r.showWelcome?(Re(),Oe("div",gR,[F("div",mR,[e[3]||(e[3]=F("h2",{class:"text-4xl font-bold mb-4"},"Welcome to PillFly",-1)),e[4]||(e[4]=F("p",{class:"mb-4"},"Collect the suns (sol) to gain points. Avoid rocks and rockets. Use arrow keys or WASD to move. Press Space to pause.",-1)),e[5]||(e[5]=F("p",{class:"mb-6 text-sm text-gray-300"},"Play as a guest to avoid saving scores, or log in to save your progress.",-1)),F("div",yR,[F("button",{onClick:e[0]||(e[0]=(...a)=>i.startAsGuest&&i.startAsGuest(...a)),class:"px-6 py-2 btn-dark"},"Play as Guest"),ke(o,{to:"/login",class:"px-6 py-2 btn-dark"},{default:Zn(()=>[...e[2]||(e[2]=[On("Login",-1)])]),_:1})])])])):xn("",!0),F("img",{src:i.playerImg,class:"absolute player-sprite",style:Hr({left:`${r.player.x}px`,top:`${r.player.y}px`})},null,12,vR),(Re(!0),Oe(Vt,null,Pv(r.items,a=>(Re(),Oe("img",{key:a.id,src:i.getImg(a.type),class:"absolute item-sprite",style:Hr({left:`${a.x}px`,top:`${a.y}px`})},null,12,wR))),128)),F("div",_R,"Score: "+qt(r.score),1),r.paused?(Re(),Oe("div",ER,[...e[6]||(e[6]=[F("div",{class:"text-white text-4xl"},"Paused",-1)])])):xn("",!0),r.gameOver?(Re(),Oe("div",IR,[F("div",TR,[e[7]||(e[7]=F("div",{class:"text-4xl"},"Game Over!",-1)),F("div",SR,"Score: "+qt(r.score),1),F("button",{onClick:e[1]||(e[1]=(...a)=>i.restart&&i.restart(...a)),class:"mt-4 px-4 py-2 bg-green-500 text-white rounded"},"Restart")])])):xn("",!0)])}const AR=Ui(dR,[["render",bR]]),CR={data(){return{email:"",password:"",error:null}},methods:{async login(){this.error=null;try{await w0(bt,this.email,this.password);const t=bt.currentUser;Ae.user={uid:t.uid,email:t.email},this.$router.push("/")}catch(t){this.error=t.message}}}},RR={class:"dark-card"},kR={class:"flex justify-between items-center mt-4"},NR={key:0,class:"text-red-600 mt-2"};function DR(t,e,n,s,r,i){const o=go("router-link");return Re(),Oe("div",RR,[e[7]||(e[7]=F("h2",{class:"text-xl font-bold mb-4"},"Login",-1)),F("form",{onSubmit:e[2]||(e[2]=lp((...a)=>i.login&&i.login(...a),["prevent"]))},[e[5]||(e[5]=F("label",null,"Email",-1)),Ls(F("input",{"onUpdate:modelValue":e[0]||(e[0]=a=>r.email=a)},null,512),[[Fs,r.email]]),e[6]||(e[6]=F("label",null,"Password",-1)),Ls(F("input",{type:"password","onUpdate:modelValue":e[1]||(e[1]=a=>r.password=a)},null,512),[[Fs,r.password]]),F("div",kR,[e[4]||(e[4]=F("button",{class:"px-4 py-2 bg-blue-500 text-white rounded"},"Login",-1)),ke(o,{to:"/register",class:"text-sm text-gray-400"},{default:Zn(()=>[...e[3]||(e[3]=[On("Create account",-1)])]),_:1})]),r.error?(Re(),Oe("p",NR,qt(r.error),1)):xn("",!0)],32)])}const OR=Ui(CR,[["render",DR]]),xR={data(){return{userDoc:null}},async mounted(){const t=bt.currentUser;if(!t){this.$router.push("/login");return}const e=qs(zs,"users",t.uid),n=await ac(e);n.exists()?this.userDoc=n.data():this.userDoc={username:t.email,totalScore:0}},methods:{share(){const e=`https://x.com/intent/tweet?text=${encodeURIComponent(`I'm ${this.userDoc.username} and I collected ${this.userDoc.totalScore} sol in PillFly!`)}`;window.open(e,"_blank")},async logout(){await Kp(bt),Ae.user=null,this.$router.push("/login")},async saveUsername(){const t=bt.currentUser;if(!t)return;const e=qs(zs,"users",t.uid);await lc(e,{username:this.userDoc.username}),Ae.user=Object.assign({},Ae.user,{username:this.userDoc.username})}}},PR={class:"dark-card"},MR={key:0},LR={class:"mt-3"},UR={class:"mt-4"},FR={key:1};function VR(t,e,n,s,r,i){return Re(),Oe("div",PR,[e[7]||(e[7]=F("h2",{class:"text-xl font-bold mb-4"},"Profile",-1)),r.userDoc?(Re(),Oe("div",MR,[e[6]||(e[6]=F("label",null,"Username",-1)),Ls(F("input",{"onUpdate:modelValue":e[0]||(e[0]=o=>r.userDoc.username=o)},null,512),[[Fs,r.userDoc.username]]),F("p",LR,[e[4]||(e[4]=F("strong",null,"Total sol collected:",-1)),On(" "+qt(r.userDoc.totalScore),1)]),F("p",null,[e[5]||(e[5]=F("strong",null,"Medals:",-1)),On(" "+qt(r.userDoc.medals||Math.floor(r.userDoc.totalScore/20)),1)]),F("div",UR,[F("button",{onClick:e[1]||(e[1]=(...o)=>i.saveUsername&&i.saveUsername(...o)),class:"px-4 py-2 bg-green-500 text-white rounded"},"Save Username"),F("button",{onClick:e[2]||(e[2]=(...o)=>i.share&&i.share(...o)),class:"ml-2 px-4 py-2 bg-blue-500 text-white rounded"},"Share to X"),F("button",{onClick:e[3]||(e[3]=(...o)=>i.logout&&i.logout(...o)),class:"ml-2 px-4 py-2 bg-gray-700 text-white rounded"},"Logout")])])):(Re(),Oe("p",FR,"Loading..."))])}const BR=Ui(xR,[["render",VR]]),$R={data(){return{username:"",email:"",password:"",error:null}},methods:{async register(){this.error=null;try{const e=(await v0(bt,this.email,this.password)).user.uid;await fy(qs(zs,"users",e),{username:this.username,totalScore:0,medals:0}),Ae.user={uid:e,username:this.username,totalScore:0,medals:0},this.$router.push("/")}catch(t){this.error=t.message}}}},jR={class:"dark-card"},HR={key:0,class:"text-red-600 mt-2"};function KR(t,e,n,s,r,i){return Re(),Oe("div",jR,[e[8]||(e[8]=F("h2",{class:"text-xl font-bold mb-4"},"Register",-1)),F("form",{onSubmit:e[3]||(e[3]=lp((...o)=>i.register&&i.register(...o),["prevent"]))},[e[4]||(e[4]=F("label",null,"Username",-1)),Ls(F("input",{"onUpdate:modelValue":e[0]||(e[0]=o=>r.username=o)},null,512),[[Fs,r.username]]),e[5]||(e[5]=F("label",{class:"mt-2"},"Email",-1)),Ls(F("input",{"onUpdate:modelValue":e[1]||(e[1]=o=>r.email=o)},null,512),[[Fs,r.email]]),e[6]||(e[6]=F("label",{class:"mt-2"},"Password",-1)),Ls(F("input",{type:"password","onUpdate:modelValue":e[2]||(e[2]=o=>r.password=o)},null,512),[[Fs,r.password]]),e[7]||(e[7]=F("div",{class:"mt-4"},[F("button",{class:"px-4 py-2 bg-green-500 text-white rounded"},"Create account")],-1)),r.error?(Re(),Oe("p",HR,qt(r.error),1)):xn("",!0)],32)])}const qR=Ui($R,[["render",KR]]),zR=[{path:"/",component:AR},{path:"/login",component:OR},{path:"/profile",component:BR},{path:"/register",component:qR}],GR=fR({history:KC(),routes:zR});Yw(oC).use(GR).mount("#app");
