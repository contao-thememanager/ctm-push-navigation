var PushNavigation=(()=>{var f=Object.defineProperty,p=Object.defineProperties;var m=Object.getOwnPropertyDescriptors;var h=Object.getOwnPropertySymbols;var v=Object.prototype.hasOwnProperty,b=Object.prototype.propertyIsEnumerable;var l=(s,t,e)=>t in s?f(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e,o=(s,t)=>{for(var e in t||(t={}))v.call(t,e)&&l(s,e,t[e]);if(h)for(var e of h(t))b.call(t,e)&&l(s,e,t[e]);return s},c=(s,t)=>p(s,m(t));var L=(s,t)=>()=>(t||s((t={exports:{}}).exports,t),t.exports);var y=L((C,u)=>{function g(s,t){var e=[],r="classList"in document.documentElement,i,n,a;for(t&&(i=t.charAt(0),i==="["&&(t=t.substr(1,t.length-2),n=t.split("="),n.length>1&&(a=!0,n[1]=n[1].replace(/"/g,"").replace(/'/g,""))));s&&s!==document;s=s.parentNode)t?(i==="."&&(r?s.classList.contains(t.substr(1))&&e.push(s):new RegExp("(^|\\s)"+t.substr(1)+"(\\s|$)").test(s.className)&&e.push(s)),i==="#"&&s.id===t.substr(1)&&e.push(s),i==="["&&s.hasAttribute(n[0])&&(a?s.getAttribute(n[0])===n[1]&&e.push(s):e.push(s)),s.tagName.toLowerCase()===t&&e.push(s)):e.push(s);return e.length===0?null:e}function S(s){let t=document.createElement("div");return t.innerHTML=s.trim(),t.firstChild}var d=class{constructor(t){this.o=this._m({selector:"header .nav",startSelector:"strong.active",mode:"slide",toggle:{selector:".mod_toggle",cssClassOpen:"open"},levelStructure:{container:"ul",item:"li.submenu"},handle:{append:null,element:"span",content:"",cssClass:"i-navigate_forward"},breadcrumb:{element:"li",default:"Navigation",closeOnFirst:!1,content:'<i class="i-navigate_back"></i> ',textSelector:"a,strong",cssClass:""},keepOpenStateOnResize:!1,maxWidth:parseInt(window.getComputedStyle(document.body).getPropertyValue("--nav-bhr"),10)||1024,modules:[],onShow:()=>{},onHide:()=>{},onInit:()=>{},onDestroy:()=>{}},t||{}),!!(this.n=document.querySelector(this.o.selector))&&(this.c={i:"pn-init",t:"pn-toggle",h:"pn-handle",b:"pn-breadcrumb",s:"pn-show",a:"pn-active",n:"pn-next"},this.t=document.querySelector(this.o.toggle.selector),!!this.t&&(this.t.classList.add(this.c.t),this.i=this.n.querySelectorAll(this.o.levelStructure.item),this.b=!1,this.a=!1,this._build(),this._registerEvents()))}_m(t,e){return[...new Set([...Object.keys(t),...Object.keys(e)])].reduce((r,i)=>c(o({},r),{[i]:typeof t[i]=="object"?Object.assign({},t[i],e[i]):e[i]?e[i]:t[i]}),{})}_build(){if(this.b||this.o.maxWidth<=window.innerWidth)return;this.t.classList.add(this.c.s),this.h=document.createElement(this.o.handle.element),this.h.innerHTML=this.o.handle.content,this.h.classList.add(this.c.h),this.o.handle.cssClass&&this.h.classList.add(this.o.handle.cssClass),this.k=document.createElement(this.o.breadcrumb.element),this.k.innerHTML=this.o.breadcrumb.default,this.k.classList.add(this.c.b),this.o.breadcrumb.cssClass&&this.h.classList.add(this.o.breadcrumb.cssClass);let t=this.n.querySelector(this.o.levelStructure.container);if(this.d=this.k.cloneNode(!0),t.insertBefore(this.d,t.childNodes[0]),this._createMarkup(),this._createModules(),this.o.startSelector){let e=this.n.querySelector(this.o.startSelector);if(e){let r=g(e,this.o.levelStructure.container);for(let i=0;i<r.length;i++)i===0?r[i].classList.add(this.c.a):i===r.length-1?r[i].classList.add(this.c.n):r[i].classList.add(this.c.a,this.c.n)}}this.o.breadcrumb.closeOnFirst&&this.d.addEventListener("click",e=>{this.hide()},!1),this.n.classList.add(this.c.i),this.b=!0}_registerEvents(){window.addEventListener("resize",()=>{this.o.maxWidth>window.innerWidth?this._build():this._destroy()},!1),this.t.addEventListener("click",t=>{t.preventDefault(),this.a?this.hide():this.show()})}_createMarkup(){for(let t of this.i){let e=this.h.cloneNode(!0);e.addEventListener("click",a=>this._move(a.target,1),!1),this.o.handle.append?t.querySelector(this.o.handle.append).appendChild(e):t.appendChild(e);let r=t.querySelector(this.o.breadcrumb.textSelector),i=this.k.cloneNode(!0);i.innerHTML=this.o.breadcrumb.content+r.innerText||r.textContent,i.addEventListener("click",a=>this._move(a.target,-1),!1);let n=t.querySelector(this.o.levelStructure.container);n.insertBefore(i,n.childNodes[0]),t.pnHandle=e,t.pnBreadcrumb=i}}_createModules(){if(this.modules=[],this.o.modules.length)for(let t of this.o.modules.reverse()){let e=this.n.querySelectorAll(t.append),r=S(t.markup);for(let i of e)this.modules.push(r),i.append(r)}}_move(t,e){let r=t.closest(this.o.levelStructure.container);if(e>0)t.closest(this.o.levelStructure.item).querySelector(this.o.levelStructure.container).classList.add(this.c.a),r.classList.add(this.c.n),this.n.scrollTo(0,0,{behavior:"smooth"});else{let i=r.closest("."+this.c.n);r.classList.remove(this.c.a),i.classList.remove(this.c.n)}}_destroy(){if(!!this.b){this.t.classList.remove(this.c.s),this.o.breadcrumb.closeOnFirst&&this.d.removeEventListener("click",this.hide),this.d.remove();for(let t of this.i)t.pnHandle.removeEventListener("click",this._move,!1),t.pnHandle.remove(),t.pnBreadcrumb.removeEventListener("click",this._move,!1),t.pnBreadcrumb.remove();for(let t of this.modules)t.remove();this.b=!1,this.n.classList.remove(this.c.i),this.o.keepOpenStateOnResize||(this.a=!1,this.n.classList.remove(this.c.s),this.t.classList.remove(this.o.toggle.cssClassOpen)),this.o.onDestroy.call(this),typeof sh!="undefined"&&(sh.play(),document.body.classList.remove("sh-blur"))}}show(){this.n.classList.add(this.c.s),this.t.classList.add(this.o.toggle.cssClassOpen),this.a=!0,this.o.onShow.call(this),typeof sh!="undefined"&&(sh.stop(!1,!0),document.body.classList.add("sh-blur"))}hide(){this.n.classList.remove(this.c.s),this.t.classList.remove(this.o.toggle.cssClassOpen),this.a=!1,this.o.onHide.call(this),typeof sh!="undefined"&&(sh.play(),document.body.classList.remove("sh-blur"))}isOpen(){return this.a}};u.exports=d});return y();})();
