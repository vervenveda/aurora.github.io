(function auroraRoomRuntime(){
  "use strict";

  const rawSlug=(location.pathname.split("/").pop()||"room").replace(/\.html$/i,"");
  const roomSlug=rawSlug.replace(/[^a-z0-9_-]+/gi,"-").toLowerCase();
  const prefix=`aurora.room.${roomSlug}.`;
  const storage=window.localStorage;
  const native={
    get:Storage.prototype.getItem,
    set:Storage.prototype.setItem,
    remove:Storage.prototype.removeItem,
    key:Storage.prototype.key
  };

  function isLocal(target){return target===storage}
  function scoped(key){return prefix+String(key)}

  Storage.prototype.getItem=function(key){
    if(!isLocal(this))return native.get.call(this,key);
    const privateKey=scoped(key);
    const privateValue=native.get.call(this,privateKey);
    if(privateValue!==null)return privateValue;

    // One-way compatibility import for state saved before room isolation.
    const legacyValue=native.get.call(this,String(key));
    if(legacyValue!==null){
      try{native.set.call(this,privateKey,legacyValue)}catch{}
      return legacyValue;
    }
    return null;
  };

  Storage.prototype.setItem=function(key,value){
    return native.set.call(this,isLocal(this)?scoped(key):key,value);
  };

  Storage.prototype.removeItem=function(key){
    return native.remove.call(this,isLocal(this)?scoped(key):key);
  };

  Storage.prototype.key=function(index){
    if(!isLocal(this))return native.key.call(this,index);
    let visibleIndex=0;
    for(let i=0;i<this.length;i+=1){
      const key=native.key.call(this,i);
      if(key&&key.startsWith(prefix)){
        if(visibleIndex===Number(index))return key.slice(prefix.length);
        visibleIndex+=1;
      }
    }
    return null;
  };

  function reportFailure(kind,detail){
    const message=String(detail&&detail.message||detail||"Unknown error").slice(0,300);
    document.documentElement.dataset.auroraRuntime="error";
    try{
      window.parent.postMessage({type:"aurora-room-error",room:roomSlug,kind,message},location.origin);
    }catch{}
    if(document.body&&!document.querySelector(".aurora-room-runtime-status")){
      const status=document.createElement("p");
      status.className="aurora-room-runtime-status";
      status.setAttribute("role","alert");
      status.textContent="This room encountered an error. Your other Aurora tools remain isolated and available.";
      document.body.appendChild(status);
    }
  }

  window.addEventListener("error",event=>reportFailure("error",event.error||event.message));
  window.addEventListener("unhandledrejection",event=>reportFailure("promise",event.reason));

  document.addEventListener("DOMContentLoaded",()=>{
    document.documentElement.dataset.auroraRoom=roomSlug;

    document.querySelectorAll("button:not([type])").forEach(button=>{
      if(!button.closest("form"))button.type="button";
    });

    document.querySelectorAll('a[target="_blank"]').forEach(link=>{
      const rel=new Set((link.getAttribute("rel")||"").split(/\s+/).filter(Boolean));
      rel.add("noopener");
      rel.add("noreferrer");
      link.setAttribute("rel",Array.from(rel).join(" "));
    });

    if(!document.querySelector("main,[role='main']")){
      const candidate=document.querySelector(".wrapper,.container,.app,.shell,.sanctuary,.stage");
      if(candidate)candidate.setAttribute("role","main");
    }

    document.querySelectorAll("input,select,textarea").forEach(control=>{
      if(control.type==="hidden"||control.hasAttribute("aria-label")||control.hasAttribute("aria-labelledby"))return;
      if(control.id&&document.querySelector(`label[for="${CSS.escape(control.id)}"]`))return;
      const label=control.getAttribute("placeholder")||control.getAttribute("title")||control.name||control.id;
      if(label)control.setAttribute("aria-label",String(label).replace(/[-_]+/g," ").trim());
    });

    document.documentElement.dataset.auroraRuntime="ready";
  });
})();
