(()=>{
  "use strict";

  const ROOMS=[
    {id:"auraink",title:"AuraInk",file:"AuraInk_index.html",category:"creative",icon:"✒",subtitle:"Art Is Healing",desc:"A private-feeling creative room for intuitive words, visual reflection, and gentle artistic release.",tags:"art writing creativity reflection"},
    {id:"auraen-tune",title:"Auraen Tune",file:"AuraenTune_index.html",category:"sound",icon:"♫",subtitle:"Frequency Tuner",desc:"Explore tone and frequency through a simple sensory listening tool designed for calm experimentation.",tags:"sound frequency tuner listening tone"},
    {id:"aurora-inspiration",title:"Aurora Inspiration",file:"Aurora_Inspiration_index.html",category:"creative",icon:"☼",subtitle:"Creative Renewal",desc:"A playful inspiration room for reconnecting with ideas, color, imagination, and creative momentum.",tags:"inspiration art creativity ideas"},
    {id:"gentle-wake",title:"Good Night · Gentle Wake",file:"Breath_evening_index.html",category:"rest",icon:"☾",subtitle:"Evening & Morning Rhythm",desc:"A gentle sleep-and-wake companion for closing the day softly and beginning again without harsh alarms.",tags:"sleep evening morning wake rest"},
    {id:"breath-reset",title:"Breath & Reset",file:"breath_reset_index.html",category:"breath",icon:"◌",subtitle:"Timed Breathing",desc:"A focused breathing timer for short pauses, transitions, and attention resets.",tags:"breath breathing timer reset calm"},
    {id:"breathe-ground",title:"Breathe & Ground",file:"breathe_ground_index.html",category:"breath",icon:"⌄",subtitle:"Any-Time Reset",desc:"Return attention to breath, body, and the steadiness of the present moment through a compact grounding routine.",tags:"grounding breath body present reset"},
    {id:"color-alchemy",title:"The Color Alchemist",file:"color_alchemy_index.html",category:"creative",icon:"◐",subtitle:"Studio Quest",desc:"Explore color relationships, mood, intuition, and visual decision-making through creative play.",tags:"color art mood creative"},
    {id:"creative-odyssey",title:"Creative Mind Odyssey",file:"creative_mind_odyssey_index.html",category:"creative",icon:"✦",subtitle:"Sovereign Edition",desc:"A guided imaginative journey through prompts, choices, and open-ended creative discovery.",tags:"creative mind odyssey imagination prompts"},
    {id:"creative-wheel",title:"Creative Wheel",file:"creative_wheel_index.html",category:"creative",icon:"✺",subtitle:"Prompt Generator",desc:"Turn the wheel for a fresh direction, medium, subject, or low-pressure creative starting point.",tags:"wheel prompt art creative ideas"},
    {id:"daily-journal",title:"Daily Journal",file:"daily_journal_index.html",category:"reflection",icon:"▤",subtitle:"Private Daily Reflection",desc:"A calm writing space for observations, gratitude, priorities, memories, and personal check-ins.",tags:"journal reflection gratitude daily writing"},
    {id:"daily-spark",title:"Daily Spark",file:"daily_spark_index.html",category:"rhythm",icon:"✧",subtitle:"Parchment Edition",desc:"Receive one small invitation to begin the day with curiosity, movement, or purposeful attention.",tags:"daily spark routine inspiration action"},
    {id:"daily-writing-spark",title:"Daily Writing Spark",file:"daily_writing_spark_index.html",category:"creative",icon:"❦",subtitle:"Multilingual Writing Lab",desc:"Open the page with a fresh writing invitation and a flexible studio for words, ideas, and language.",tags:"writing prompt multilingual creativity journal"},
    {id:"dreamscript",title:"DreamScript",file:"dream_script_index.html",category:"rest",icon:"☁",subtitle:"Night Journal",desc:"Capture dreams, symbols, emotions, and night imagery before they fade from memory.",tags:"dream sleep journal symbols night"},
    {id:"evening-ember",title:"Evening Ember",file:"evening_ember_index.html",category:"rest",icon:"◍",subtitle:"Nightly Reflection",desc:"A warm end-of-day ritual for setting down unfinished thoughts and noticing what mattered.",tags:"evening reflection release rest night"},
    {id:"night-prayer",title:"Night Prayer",file:"evening_prayer_index.html",category:"rest",icon:"🕯",subtitle:"Quiet Spiritual Reflection",desc:"A peaceful place for prayer, gratitude, remembrance, and gentle closure at the end of the day.",tags:"prayer evening gratitude faith rest"},
    {id:"first-hour",title:"The First Hour",file:"first_hour_index.html",category:"rhythm",icon:"☀",subtitle:"Morning Sanctuary",desc:"Begin slowly with intention, reflection, and preparation before the day becomes loud.",tags:"morning first hour routine intention"},
    {id:"grounding-suite",title:"Grounding Suite",file:"grounding_suite_index.html",category:"breath",icon:"◉",subtitle:"Sensory Reset Collection",desc:"A collection of sensory and body-based practices for returning attention to the present.",tags:"grounding senses body calm breath"},
    {id:"inspiration-mosaic",title:"Inspiration Mosaic",file:"inspiration_mosaic_index.html",category:"creative",icon:"◇",subtitle:"Visual Idea Board",desc:"Gather fragments of color, language, image, and thought into a living inspiration mosaic.",tags:"inspiration mosaic collage ideas creative"},
    {id:"letter-inner-self",title:"Letter to My Inner Self",file:"letter_to_me_index.html",category:"reflection",icon:"✉",subtitle:"Compassionate Writing",desc:"Write with patience and compassion to your present, past, or future self.",tags:"letter self reflection compassion writing"},
    {id:"loom-dawn",title:"The Loom of Dawn",file:"loom_of_dawn_index.html",category:"rhythm",icon:"⌁",subtitle:"A Living Poem",desc:"Weave language, intention, gratitude, and possibility into the beginning of the day.",tags:"dawn morning poem intention ritual"},
    {id:"morning-muse",title:"Morning Muse",file:"morning_muse_index.html",category:"creative",icon:"❀",subtitle:"Prompt Sanctuary",desc:"A gentle morning prompt room for artists, writers, thinkers, and makers.",tags:"morning muse prompt art writing"},
    {id:"morning-reflections",title:"Morning Reflections",file:"morning_reflection_index.html",category:"reflection",icon:"☼",subtitle:"Quiet Morning Check-In",desc:"Pause at the threshold of the day to notice your needs, hopes, and most meaningful priorities.",tags:"morning reflection intention check in"},
    {id:"morning-sanctum",title:"Morning Sanctum",file:"morning_sanctum_index.html",category:"rhythm",icon:"⌂",subtitle:"Morning Stillness",desc:"A protected morning room for stillness, intention, preparation, and a humane daily rhythm.",tags:"morning sanctuary stillness routine"},
    {id:"niche-venn",title:"Creative Niché Venn",file:"niche_venn_index.html",category:"creative",icon:"◑",subtitle:"Purpose & Direction",desc:"Discover intersections among your interests, strengths, values, skills, and creative audience.",tags:"niche venn ideas purpose strengths"},
    {id:"one-creation",title:"One Creation at a Time",file:"one_a_day_index.html",category:"rhythm",icon:"1",subtitle:"Gentle Daily Focus",desc:"Choose one meaningful creation or action and give it enough space to become complete.",tags:"one task daily focus creativity"},
    {id:"song-embedder",title:"Eiren Song Embedder",file:"song_embedder_index.html",category:"sound",icon:"♪",subtitle:"Personal Listening Space",desc:"Build a personal listening room around music that inspires, steadies, or restores you.",tags:"song music embed listening sound"},
    {id:"soulbook",title:"Soulbook",file:"soulbook_index.html",category:"reflection",icon:"❧",subtitle:"Reflective Book",desc:"A deeper personal book for values, memories, prayers, insights, and becoming.",tags:"soul book journal memory values"},
    {id:"spire",title:"Spire Mindful Breathing",file:"spire_mindful_breathing_index.html",category:"breath",icon:"△",subtitle:"Breathing Studio",desc:"A visual breathing practice shaped around ascent, pause, release, and steady attention.",tags:"spire mindful breathing meditation calm"},
    {id:"starlight-jar",title:"Starlight Jar",file:"starlight_jar_index.html",category:"rest",icon:"✷",subtitle:"Kids Night Reflections",desc:"Collect small lights from the day—kindness, courage, beauty, and moments worth remembering.",tags:"starlight gratitude jar kids evening"},
    {id:"story-spark",title:"Aurora Story Spark",file:"story_spark_index.html",category:"creative",icon:"⌇",subtitle:"Story Cue",desc:"Open a doorway into character, scene, wonder, conflict, and narrative possibility.",tags:"story writing prompt fiction creativity"},
    {id:"tiny-triumphs",title:"Tiny Triumphs",file:"tiny_triumphs_index.html",category:"reflection",icon:"✓",subtitle:"Progress & Gratitude",desc:"Notice the quiet victories that are easy to miss but meaningful to remember.",tags:"tiny triumphs progress gratitude reflection"},
    {id:"vintage-spinet",title:"Vintage Spinet",file:"vintage_spinnet_index.html",category:"sound",icon:"♬",subtitle:"Kids Orchestra",desc:"A playful musical corner for sound exploration, memory, rhythm, and creative atmosphere.",tags:"vintage spinet music kids orchestra sound"}
  ];

  const CATEGORIES={
    breath:{label:"Breath & Grounding",short:"Breathe",icon:"◌",desc:"Breathing, grounding, and sensory resets."},
    rhythm:{label:"Morning & Daily Rhythm",short:"Begin",icon:"☀",desc:"Gentle beginnings, focus, and humane structure."},
    rest:{label:"Evening, Sleep & Rest",short:"Rest",icon:"☾",desc:"Night reflection, dreams, prayer, and soft endings."},
    creative:{label:"Creative Renewal",short:"Create",icon:"✦",desc:"Art, writing, color, imagination, and direction."},
    reflection:{label:"Reflection & Growth",short:"Reflect",icon:"❧",desc:"Journaling, gratitude, compassion, and values."},
    sound:{label:"Sound & Atmosphere",short:"Listen",icon:"♫",desc:"Music, tone, frequency, and listening spaces."}
  };

  const FEATURED=["breath-reset","morning-sanctum","auraink","tiny-triumphs","auraen-tune","gentle-wake"];
  const REST=["gentle-wake","dreamscript","evening-ember","night-prayer","starlight-jar"];

  const RESOURCES=[
    {title:"Meditation & Mindfulness",provider:"NIH · NCCIH",url:"https://www.nccih.nih.gov/health/meditation-and-mindfulness-effectiveness-and-safety",desc:"Evidence, possible benefits, research limitations, and safety considerations."},
    {title:"Yoga: Benefits & Safety",provider:"NIH · NCCIH",url:"https://www.nccih.nih.gov/health/tips/things-you-should-know-about-yoga",desc:"Evidence-aware yoga guidance and safer-practice considerations."},
    {title:"Move Your Way",provider:"U.S. HHS",url:"https://odphp.health.gov/moveyourway",desc:"Accessible activity ideas and planning tools for everyday movement."},
    {title:"About Sleep",provider:"CDC",url:"https://www.cdc.gov/sleep/about/index.html",desc:"Age-based sleep guidance, healthy sleep habits, and sleep quality."},
    {title:"Caring for Your Mental Health",provider:"NIMH",url:"https://www.nimh.nih.gov/health/topics/caring-for-your-mental-health",desc:"Self-care guidance and signs that professional support may be useful."},
    {title:"Healthy Living",provider:"MedlinePlus",url:"https://medlineplus.gov/healthyliving.html",desc:"Consumer-friendly health information on habits, prevention, and well-being."},
    {title:"MyPlate",provider:"USDA",url:"https://www.myplate.gov/",desc:"Practical public nutrition guidance across different life stages."},
    {title:"Mental Health Overview",provider:"WHO",url:"https://www.who.int/health-topics/mental-health",desc:"Global information on mental well-being, care, rights, and public health."}
  ];

  const NETWORK=[
    ["Verve N Veda","https://vervenveda.com/"],["Medicament Hub","https://vervenveda.com/medicament-hub.github.io/"],["Solanar","https://vervenveda.com/solanar.github.io/"],["Khaemenes Academy","https://vervenveda.com/Khaemenes_Academy.github.io/"],["The Refrain","https://vervenveda.com/the_refrain.github.io/"],["River to Road","https://vervenveda.com/river_to_road.github.io/"],["Bazaar Art","https://vervenveda.com/bazaarart.github.io/"],["ARSHIF","https://vervenveda.com/Arshif.github.io/"]
  ];

  const FAVORITES_KEY="aurora_favorites_v4";
  const VOICE_KEY="aurora_voice_v2";
  const $=id=>document.getElementById(id);
  const escapeHtml=value=>String(value).replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[ch]));
  const storage={
    get(key,fallback){try{const v=localStorage.getItem(key);return v===null?fallback:JSON.parse(v)}catch{return fallback}},
    set(key,value){try{localStorage.setItem(key,JSON.stringify(value));return true}catch{return false}}
  };

  let favorites=new Set(storage.get(FAVORITES_KEY,[]).filter(id=>ROOMS.some(r=>r.id===id)));
  let favoritesOnly=false;
  let voiceEnabled=storage.get(VOICE_KEY,false)===true;
  let activeRoom=null;
  let lastFocus=null;
  let breathRunning=false;
  let breathTimer=null;
  let breathPhase=0;

  function toast(message){const el=$("toast");if(!el)return;el.textContent=message;el.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove("show"),2000)}
  function roomById(id){return ROOMS.find(room=>room.id===id)||null}
  function categoryName(key){return CATEGORIES[key]?.label||key}
  function internalRoomURL(room){
    if(!room||!/^[A-Za-z0-9 _.'()&+-]+_index\.html$/.test(room.file))return null;
    try{const url=new URL(`./apps/${encodeURI(room.file)}`,location.href);return url.origin===location.origin?url:null}catch{return null}
  }
  function safeExternalURL(value){try{const url=new URL(value);return url.protocol==="https:"&&!url.username&&!url.password?url:null}catch{return null}}

  function renderJourneys(){
    $("journeyGrid").innerHTML=Object.entries(CATEGORIES).map(([key,item])=>`<article class="journey"><div class="journey-mark" aria-hidden="true">${escapeHtml(item.icon)}</div><h3>${escapeHtml(item.short)}</h3><p>${escapeHtml(item.desc)}</p><button type="button" data-journey="${escapeHtml(key)}">Enter this path</button></article>`).join("");
    document.querySelectorAll("[data-journey]").forEach(btn=>btn.addEventListener("click",()=>{const key=btn.dataset.journey;$("categoryFilter").value=key;favoritesOnly=false;syncFavoriteToggle();renderLibrary();$("library").scrollIntoView({behavior:"smooth",block:"start"})}));
  }

  function featureMarkup(room){return `<article class="feature-card"><div class="feature-mark" aria-hidden="true">${escapeHtml(room.icon)}</div><div class="meta">${escapeHtml(categoryName(room.category))}</div><h3>${escapeHtml(room.title)}</h3><p>${escapeHtml(room.desc)}</p><button type="button" data-open-room="${escapeHtml(room.id)}">Open room</button></article>`}
  function renderFeatured(){$("featuredGrid").innerHTML=FEATURED.map(roomById).filter(Boolean).map(featureMarkup).join("");wireOpenButtons($("featuredGrid"))}

  function renderEvening(){
    $("restList").innerHTML=REST.map(roomById).filter(Boolean).map(room=>`<button class="rest-link" type="button" data-open-room="${escapeHtml(room.id)}"><span aria-hidden="true">${escapeHtml(room.icon)}</span><span><strong>${escapeHtml(room.title)}</strong><small>${escapeHtml(room.subtitle)}</small></span></button>`).join("");
    wireOpenButtons($("restList"));
  }

  function roomCard(room){const fav=favorites.has(room.id);return `<article class="room-card"><div class="room-top"><span class="room-icon" aria-hidden="true">${escapeHtml(room.icon)}</span><button type="button" class="favorite" aria-label="${fav?"Remove from":"Add to"} favorites: ${escapeHtml(room.title)}" aria-pressed="${fav}" data-favorite="${escapeHtml(room.id)}">${fav?"★":"☆"}</button></div><div class="category">${escapeHtml(categoryName(room.category))}</div><h3>${escapeHtml(room.title)}</h3><p>${escapeHtml(room.desc)}</p><button type="button" class="open-room" data-open-room="${escapeHtml(room.id)}">Open quietly</button></article>`}

  function renderLibrary(){
    const query=$("roomSearch").value.trim().toLowerCase();
    const category=$("categoryFilter").value;
    const list=ROOMS.filter(room=>(!category||room.category===category)&&(!favoritesOnly||favorites.has(room.id))&&(!query||(room.title+" "+room.subtitle+" "+room.desc+" "+room.tags).toLowerCase().includes(query)));
    $("roomGrid").innerHTML=list.map(roomCard).join("");
    $("roomEmpty").classList.toggle("show",list.length===0);
    $("resultLine").textContent=`${list.length} of ${ROOMS.length} Aurora rooms`;
    wireOpenButtons($("roomGrid"));
    document.querySelectorAll("[data-favorite]").forEach(btn=>btn.addEventListener("click",()=>{const id=btn.dataset.favorite;if(favorites.has(id))favorites.delete(id);else favorites.add(id);storage.set(FAVORITES_KEY,[...favorites]);renderLibrary()}));
  }

  function syncFavoriteToggle(){const btn=$("favoritesToggle");btn.setAttribute("aria-pressed",String(favoritesOnly));btn.textContent=favoritesOnly?"★ Favorites only":"☆ Favorites"}
  function wireOpenButtons(root=document){root.querySelectorAll("[data-open-room]").forEach(btn=>btn.addEventListener("click",()=>openRoom(roomById(btn.dataset.openRoom))))}

  function openRoom(room){
    const url=internalRoomURL(room);if(!room||!url){toast("That Aurora room could not be opened safely.");return}
    activeRoom=room;lastFocus=document.activeElement;
    $("roomTitle").textContent=room.title;$("roomMeta").textContent=room.subtitle;$("roomMark").textContent=room.icon;$("roomFrame").title=room.title;$("roomLoading").classList.remove("hidden");$("roomFrame").src=url.href;
    $("roomOverlay").classList.add("open");$("roomOverlay").setAttribute("aria-hidden","false");document.body.classList.add("room-open");$("roomClose").focus();
  }
  function closeRoom(){
    if(!$("roomOverlay").classList.contains("open"))return;
    $("roomOverlay").classList.remove("open");$("roomOverlay").setAttribute("aria-hidden","true");document.body.classList.remove("room-open");$("roomFrame").src="about:blank";$("roomLoading").classList.remove("hidden");activeRoom=null;speechSynthesis?.cancel?.();lastFocus?.focus?.();
  }
  function trapRoomFocus(event){
    if(event.key!=="Tab"||!$("roomOverlay").classList.contains("open"))return;
    const nodes=[...$("roomOverlay").querySelectorAll('button,[href],iframe,[tabindex]:not([tabindex="-1"])')].filter(el=>!el.disabled);
    if(!nodes.length)return;const first=nodes[0],last=nodes[nodes.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
  }

  function preferredVoice(){if(!("speechSynthesis" in window))return null;const voices=speechSynthesis.getVoices();return voices.find(v=>/^en/i.test(v.lang)&&/samantha|victoria|karen|moira|serena|ava|allison/i.test(v.name))||voices.find(v=>/^en/i.test(v.lang))||voices[0]||null}
  function speak(text){if(!voiceEnabled||!("speechSynthesis" in window)||!text)return;speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(text.slice(0,3600));const voice=preferredVoice();if(voice)utterance.voice=voice;utterance.rate=.86;utterance.pitch=.96;speechSynthesis.speak(utterance)}
  function syncVoice(){const btn=$("voiceToggle");btn.setAttribute("aria-pressed",String(voiceEnabled));btn.textContent=voiceEnabled?"Aurora Voice · On":"Aurora Voice · Off"}
  function toggleVoice(){if(!("speechSynthesis" in window)){toast("Voice is not available in this browser.");return}voiceEnabled=!voiceEnabled;storage.set(VOICE_KEY,voiceEnabled);syncVoice();if(voiceEnabled)speak("Aurora voice is on. I will only speak when you choose to hear me.");else speechSynthesis.cancel()}
  function readRoom(){if(!activeRoom){return}try{const doc=$("roomFrame").contentDocument;const root=doc?.querySelector("main")||doc?.body;if(!root){toast("This room is still opening.");return}const clone=root.cloneNode(true);clone.querySelectorAll("script,style,noscript,nav,footer,button,input,select,textarea,iframe").forEach(n=>n.remove());const text=(clone.innerText||clone.textContent||"").replace(/\s+/g," ").trim();if(!text){toast("There is no readable room text yet.");return}speak(text)}catch{toast("This room could not be read aloud.")}}

  const phases=[
    {name:"Inhale",copy:"Breathe in gently through the nose.",className:"inhale",ms:4000},
    {name:"Rest",copy:"Let the breath be still for a moment.",className:"",ms:2000},
    {name:"Exhale",copy:"Release slowly. Let the shoulders soften.",className:"exhale",ms:6000}
  ];
  function setBreathPhase(){if(!breathRunning)return;const phase=phases[breathPhase%phases.length],dock=$("breathDock");dock.classList.remove("inhale","exhale");if(phase.className)dock.classList.add(phase.className);$("breathTitle").textContent=phase.name;$("breathText").textContent=phase.copy;breathTimer=setTimeout(()=>{breathPhase++;setBreathPhase()},phase.ms)}
  function toggleBreath(){breathRunning=!breathRunning;clearTimeout(breathTimer);if(breathRunning){breathPhase=0;$("breathStart").textContent="Pause";setBreathPhase()}else{$("breathDock").classList.remove("inhale","exhale");$("breathTitle").textContent="Take one unhurried breath";$("breathText").textContent="Inhale gently. Let your shoulders soften.";$("breathStart").textContent="Begin"}}

  function renderResources(){
    $("resourceGrid").innerHTML=RESOURCES.map(item=>{const url=safeExternalURL(item.url);return `<article class="resource"><div class="provider">${escapeHtml(item.provider)}</div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.desc)}</p>${url?`<a href="${escapeHtml(url.href)}" target="_blank" rel="noopener noreferrer" referrerpolicy="no-referrer">Open official resource ↗</a>`:""}</article>`}).join("");
  }
  function renderNetwork(){
    $("networkLinks").innerHTML=NETWORK.map(([label,value])=>{const url=safeExternalURL(value);return url?`<a href="${escapeHtml(url.href)}">${escapeHtml(label)}</a>`:""}).join("");
  }

  function init(){
    renderJourneys();renderFeatured();renderEvening();renderResources();renderNetwork();
    $("categoryFilter").innerHTML='<option value="">All paths</option>'+Object.entries(CATEGORIES).map(([key,item])=>`<option value="${escapeHtml(key)}">${escapeHtml(item.label)}</option>`).join("");
    renderLibrary();syncFavoriteToggle();syncVoice();
    $("roomSearch").addEventListener("input",renderLibrary);$("categoryFilter").addEventListener("change",renderLibrary);$("favoritesToggle").addEventListener("click",()=>{favoritesOnly=!favoritesOnly;syncFavoriteToggle();renderLibrary()});
    $("voiceToggle").addEventListener("click",toggleVoice);$("breathStart").addEventListener("click",toggleBreath);$("roomClose").addEventListener("click",closeRoom);$("roomRead").addEventListener("click",readRoom);$("roomFrame").addEventListener("load",()=>$("roomLoading").classList.add("hidden"));
    $("roomOverlay").addEventListener("mousedown",event=>{if(event.target===$("roomOverlay"))closeRoom()});
    document.addEventListener("keydown",event=>{if(event.key==="Escape")closeRoom();trapRoomFocus(event);if(event.key==="/"&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName||"")){event.preventDefault();$("roomSearch").focus()}});
    $("year").textContent=String(new Date().getFullYear());
  }

  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();