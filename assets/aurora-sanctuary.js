(()=>{
  "use strict";

  const ROOMS=[
    {id:"auraink",title:"AuraInk",file:"AuraInk_index.html",category:"creative",icon:"✒",subtitle:"Art Is Healing",desc:"A private-feeling creative room for intuitive words, visual reflection, and gentle artistic release.",tags:"art writing creativity reflection"},
    {id:"auraen-tune",title:"Auraen Tune",file:"AuraenTune_index.html",category:"sound",icon:"♫",subtitle:"Frequency Tuner",desc:"Explore tone and frequency through a simple sensory listening tool designed for calm experimentation.",tags:"sound frequency tuner listening tone"},
    {id:"aurora-inspiration",title:"Aurora Inspiration",file:"Aurora_Inspiration_index.html",category:"creative",icon:"☼",subtitle:"Creative Renewal",desc:"A playful inspiration room for reconnecting with ideas, color, imagination, and creative momentum.",tags:"inspiration art creativity ideas"},
    {id:"gentle-wake",title:"Good Night · Gentle Wake",file:"Breath_evening_index.html",category:"rest",icon:"☾",subtitle:"Evening & Morning Rhythm",desc:"A gentle sleep-and-wake companion for closing the day softly and beginning again without harsh alarms.",tags:"sleep evening morning wake rest"},
    {id:"sacred-geometry",title:"Sacred Geometry Studio",file:"Sacred_geometry_sanctuary_index.html",category:"creative",icon:"◎",subtitle:"Mandala Studio",desc:"Layer color, circles, petals, and stars into a personal geometric meditation you can save.",tags:"sacred geometry mandala shapes color art"},
    {id:"spinspire",title:"SpinSpire",file:"SpinSpire_index.html",category:"creative",icon:"↻",subtitle:"Art Prompt Spinner",desc:"Spin two creative ideas together, save favorites, and begin without waiting for a perfect idea.",tags:"art prompt spinner mashup creativity"},
    {id:"affirmation-steady",title:"Affirmation Garden · Steady Growth",file:"affirmation_garden_index.html",category:"reflection",icon:"❁",subtitle:"Grounded Affirmations",desc:"A quiet garden of confidence, patience, responsibility, and steady inner strength.",tags:"affirmation confidence grounding growth strength"},
    {id:"affirmation-nurture",title:"Affirmation Garden · Nurturing Strength",file:"affirmation_garden_too_index.html",category:"reflection",icon:"✿",subtitle:"Gentle Affirmations",desc:"A softer affirmation garden for care, self-trust, renewal, leadership, and rest.",tags:"affirmation gentleness motherhood care renewal"},
    {id:"brain-maze",title:"Brain Maze",file:"brain_maze_index.html",category:"creative",icon:"⌘",subtitle:"Cooperative Mindful Puzzle",desc:"A playful cooperative maze that blends memory, choices, sound, and low-pressure problem solving.",tags:"maze puzzle cooperative memory play"},
    {id:"breath-reset",title:"Breath & Reset",file:"breath_reset_index.html",category:"breath",icon:"◌",subtitle:"Timed Breathing",desc:"A focused breathing timer for short pauses, transitions, and attention resets.",tags:"breath breathing timer reset calm"},
    {id:"breathe-ground",title:"Breathe & Ground",file:"breathe_ground_index.html",category:"breath",icon:"⌄",subtitle:"Any-Time Reset",desc:"Return attention to breath, body, and the steadiness of the present moment through a compact grounding routine.",tags:"grounding breath body present reset"},
    {id:"color-alchemy",title:"The Color Alchemist",file:"color_alchemy_index.html",category:"creative",icon:"◐",subtitle:"Studio Quest",desc:"Explore color relationships, mood, intuition, and visual decision-making through creative play.",tags:"color art mood creative"},
    {id:"creative-odyssey",title:"Creative Mind Odyssey",file:"creative_mind_odyssey_index.html",category:"creative",icon:"✦",subtitle:"Sovereign Edition",desc:"A guided imaginative journey through prompts, choices, and open-ended creative discovery.",tags:"creative mind odyssey imagination prompts"},
    {id:"creative-wheel",title:"Creative Wheel",file:"creative_wheel_index.html",category:"creative",icon:"✺",subtitle:"Prompt Generator",desc:"Turn the wheel for a fresh direction, medium, subject, or low-pressure creative starting point.",tags:"wheel prompt art creative ideas"},
    {id:"daily-journal",title:"Daily Journal",file:"daily_journal_index.html",category:"reflection",icon:"▤",subtitle:"Private Daily Reflection",desc:"A calm writing space for observations, gratitude, priorities, memories, and personal check-ins.",tags:"journal reflection gratitude daily writing"},
    {id:"daily-rhythm",title:"Daily Rhythm Portal",file:"daily_rhythm_index.html",category:"rhythm",icon:"◒",subtitle:"Morning & Evening Pair",desc:"A paired morning gate and evening sanctum for centering, intention, release, and gratitude.",tags:"morning evening daily rhythm gratitude release"},
    {id:"daily-spark",title:"Daily Spark",file:"daily_spark_index.html",category:"rhythm",icon:"✧",subtitle:"Parchment Edition",desc:"Receive one small invitation to begin the day with curiosity, movement, or purposeful attention.",tags:"daily spark routine inspiration action"},
    {id:"daily-writing-spark",title:"Daily Writing Spark",file:"daily_writing_spark_index.html",category:"creative",icon:"❦",subtitle:"Multilingual Writing Lab",desc:"Open the page with a fresh writing invitation and a flexible studio for words, ideas, and language.",tags:"writing prompt multilingual creativity journal"},
    {id:"dreamscript",title:"DreamScript",file:"dream_script_index.html",category:"rest",icon:"☁",subtitle:"Night Journal",desc:"Capture dreams, symbols, emotions, and night imagery before they fade from memory.",tags:"dream sleep journal symbols night"},
    {id:"dual-frequency",title:"Dual Frequency Tuner",file:"dual_frequency_tuner_index.html",category:"sound",icon:"≈",subtitle:"Tone Laboratory",desc:"Explore two tones, gentle frequency differences, and offline sound generation with volume kept in your control.",tags:"sound frequency tone binaural listening"},
    {id:"emotional-weather",title:"Emotional Weather",file:"emotional_weather_index.html",category:"reflection",icon:"◐",subtitle:"Feeling Check-In",desc:"Name the weather inside, add a private reflection, and notice how intensity changes over time.",tags:"emotion weather feeling reflection journal"},
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
    {id:"photo-album",title:"Family Photo Album",file:"photo_album_index.html",category:"reflection",icon:"▧",subtitle:"Local Memory Book",desc:"Arrange family photographs and notes in a private flip-book stored only in this browser.",tags:"photo album family memories local private"},
    {id:"quantum-tasks",title:"Quantum Task Handler",file:"quantum_task_handler_index.html",category:"rhythm",icon:"⟡",subtitle:"Gentle Decision Aid",desc:"Gather tasks, narrow the next step, and reduce decision pressure with a calm local-first helper.",tags:"tasks decisions focus planning local"},
    {id:"quiet-wins",title:"Quiet Wins",file:"quiet_wins_index.html",category:"reflection",icon:"⌁",subtitle:"Gold Thread Tapestry",desc:"Weave small wins into a private visual record of effort, courage, persistence, and growth.",tags:"wins progress gratitude reflection tapestry"},
    {id:"song-embedder",title:"Eiren Song Embedder",file:"song_embedder_index.html",category:"sound",icon:"♪",subtitle:"Personal Listening Space",desc:"Build a personal listening room around music that inspires, steadies, or restores you.",tags:"song music embed listening sound"},
    {id:"soulbook",title:"Soulbook",file:"soulbook_index.html",category:"reflection",icon:"❧",subtitle:"Reflective Book",desc:"A deeper personal book for values, memories, prayers, insights, and becoming.",tags:"soul book journal memory values"},
    {id:"spire",title:"Spire Mindful Breathing",file:"spire_mindful_breathing_index.html",category:"breath",icon:"△",subtitle:"Breathing Studio",desc:"A visual breathing practice shaped around ascent, pause, release, and steady attention.",tags:"spire mindful breathing meditation calm"},
    {id:"starlight-jar",title:"Starlight Jar",file:"starlight_jar_index.html",category:"rest",icon:"✷",subtitle:"Kids Night Reflections",desc:"Collect small lights from the day—kindness, courage, beauty, and moments worth remembering.",tags:"starlight gratitude jar kids evening"},
    {id:"story-spark",title:"Aurora Story Spark",file:"story_spark_index.html",category:"creative",icon:"⌇",subtitle:"Story Cue",desc:"Open a doorway into character, scene, wonder, conflict, and narrative possibility.",tags:"story writing prompt fiction creativity"},
    {id:"village",title:"The Village",file:"the_village_index.html",category:"reflection",icon:"⌂",subtitle:"Community Reflection",desc:"Visit a small interactive village shaped by warmth, connection, reflection, sound, and play.",tags:"village community warmth connection reflection"},
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

  const RESOURCE_CATEGORIES={
    foundations:"Whole-person foundations",
    evidence:"Evidence & safety",
    mindbody:"Mind–body practices",
    movement:"Movement & mobility",
    rest:"Sleep & mental well-being",
    nutrition:"Food & nutrition",
    botanicals:"Herbs & supplements",
    traditions:"Traditional systems"
  };

  // Twenty-four noncommercial public references: three carefully bounded entry points
  // across each of eight topics. Content stays local; links open only when chosen.
  const RESOURCES=[
    {title:"Whole Person Health",provider:"NIH · NCCIH",category:"foundations",url:"https://www.nccih.nih.gov/health/whole-person-health-what-it-is-and-why-its-important",desc:"An introduction to health as an interconnected set of biological, behavioral, social, and environmental factors.",tags:"holistic whole person integrative health foundations"},
    {title:"Complementary, Alternative, or Integrative?",provider:"NIH · NCCIH",category:"foundations",url:"https://www.nccih.nih.gov/health/complementary-alternative-or-integrative-health-whats-in-a-name",desc:"Plain-language definitions that distinguish approaches used with conventional care from those used in place of it.",tags:"definitions complementary alternative integrative conventional"},
    {title:"Global Traditional & Integrative Medicine Report",provider:"World Health Organization",category:"foundations",url:"https://www.who.int/publications/i/item/9789240111387",desc:"A global view of policy, access, quality, safety, regulation, and evidence across traditional medicine systems.",tags:"global report policy traditional complementary integrative medicine"},

    {title:"Know the Science",provider:"NIH · NCCIH",category:"evidence",url:"https://www.nccih.nih.gov/health/know-science",desc:"Interactive tools for reading studies, recognizing health misinformation, and evaluating claims with more confidence.",tags:"evidence research misinformation scientific literacy claims"},
    {title:"Safe Use of Complementary Practices",provider:"NIH · NCCIH",category:"evidence",url:"https://www.nccih.nih.gov/health/safety",desc:"Safety questions to ask about products, practitioners, children, pregnancy, interactions, and coordinated care.",tags:"safety interactions practitioners pregnancy children coordinated care"},
    {title:"Natural Does Not Necessarily Mean Safer",provider:"NIH · NCCIH",category:"evidence",url:"https://www.nccih.nih.gov/health/know-science/natural-doesnt-mean-better",desc:"A short evidence guide to a common misconception about natural products and health practices.",tags:"natural safer risk products myths"},

    {title:"Meditation & Mindfulness",provider:"NIH · NCCIH",category:"mindbody",url:"https://www.nccih.nih.gov/health/meditation-and-mindfulness-effectiveness-and-safety",desc:"What research suggests, where evidence is limited, and what is known about possible risks.",tags:"meditation mindfulness attention stress safety"},
    {title:"Relaxation Techniques",provider:"NIH · NCCIH",category:"mindbody",url:"https://www.nccih.nih.gov/health/relaxation-techniques-what-you-need-to-know",desc:"An evidence-aware overview of relaxation response practices, progressive relaxation, imagery, and breathing exercises.",tags:"relaxation breathing progressive muscle imagery stress"},
    {title:"Stress: Research & Resources",provider:"NIH · NCCIH",category:"mindbody",url:"https://www.nccih.nih.gov/health/stress",desc:"Public research information on stress, mind–body approaches, healthy coping, and when to seek support.",tags:"stress coping mind body mental health"},

    {title:"Yoga: Effectiveness & Safety",provider:"NIH · NCCIH",category:"movement",url:"https://www.nccih.nih.gov/health/yoga-effectiveness-and-safety",desc:"Current research, practice considerations, injury prevention, and safety guidance for different populations.",tags:"yoga movement flexibility balance safety"},
    {title:"Tai Chi: What You Need to Know",provider:"NIH · NCCIH",category:"movement",url:"https://www.nccih.nih.gov/health/tai-chi-what-you-need-to-know",desc:"Evidence, safety, instructor standards, and questions to consider before beginning tai chi.",tags:"tai chi movement balance gentle exercise safety"},
    {title:"Move Your Way",provider:"U.S. Department of Health and Human Services",category:"movement",url:"https://odphp.health.gov/moveyourway",desc:"Inclusive public guidance for building movement into daily life at different ages and ability levels.",tags:"physical activity exercise movement accessibility"},

    {title:"About Sleep",provider:"Centers for Disease Control and Prevention",category:"rest",url:"https://www.cdc.gov/sleep/about/index.html",desc:"Healthy sleep habits, sleep quality, age-based needs, and practical tools such as a sleep diary.",tags:"sleep rest circadian habits diary"},
    {title:"Caring for Your Mental Health",provider:"National Institute of Mental Health",category:"rest",url:"https://www.nimh.nih.gov/health/topics/caring-for-your-mental-health",desc:"Self-care information and signs that it may be time to seek professional help.",tags:"mental health self care support professional help"},
    {title:"Mental Health Overview",provider:"World Health Organization",category:"rest",url:"https://www.who.int/health-topics/mental-health",desc:"A global public-health introduction to well-being, care, rights, risks, and support systems.",tags:"mental wellbeing rights care public health"},

    {title:"MyPlate",provider:"U.S. Department of Agriculture",category:"nutrition",url:"https://www.myplate.gov/",desc:"Practical food-group guidance, planning tools, and resources for different life stages.",tags:"food nutrition meals dietary guidance planning"},
    {title:"Healthy Living",provider:"MedlinePlus · National Library of Medicine",category:"nutrition",url:"https://medlineplus.gov/healthyliving.html",desc:"Consumer-friendly public information on nutrition, prevention, movement, sleep, and everyday health habits.",tags:"healthy living habits nutrition prevention"},
    {title:"Vitamin & Mineral Fact Sheets",provider:"NIH · Office of Dietary Supplements",category:"nutrition",url:"https://ods.od.nih.gov/factsheets/list-VitaminsMinerals/",desc:"Evidence-reviewed consumer and professional fact sheets covering roles, intake, deficiency, excess, and interactions.",tags:"vitamins minerals nutrients facts deficiency excess"},

    {title:"Herbs at a Glance",provider:"NIH · NCCIH",category:"botanicals",url:"https://www.nccih.nih.gov/health/herbsataglance",desc:"Individual herb fact sheets covering research, cautions, side effects, and potential herb–medicine interactions.",tags:"herbs botanicals interactions side effects research"},
    {title:"Dietary Supplement Fact Sheets",provider:"NIH · Office of Dietary Supplements",category:"botanicals",url:"https://ods.od.nih.gov/factsheets/list-all/",desc:"A searchable collection of public fact sheets on vitamins, minerals, botanicals, and other supplement ingredients.",tags:"supplements botanicals vitamins minerals facts"},
    {title:"FDA 101: Dietary Supplements",provider:"U.S. Food & Drug Administration",category:"botanicals",url:"https://www.fda.gov/consumers/consumer-updates/fda-101-dietary-supplements",desc:"How supplements are regulated, what FDA does not preapprove, and how consumers can recognize and report problems.",tags:"supplement regulation fda approval safety reporting"},

    {title:"Ayurvedic Medicine",provider:"NIH · NCCIH",category:"traditions",url:"https://www.nccih.nih.gov/health/ayurvedic-medicine-in-depth",desc:"Research, safety concerns, product-quality issues, and context for this traditional Indian medical system.",tags:"ayurveda indian traditional medicine safety"},
    {title:"Traditional Chinese Medicine",provider:"NIH · NCCIH",category:"traditions",url:"https://www.nccih.nih.gov/health/traditional-chinese-medicine-what-you-need-to-know",desc:"An overview of traditional Chinese practices with evidence and safety considerations for herbs and practitioners.",tags:"traditional chinese medicine tcm herbs practitioner"},
    {title:"Acupuncture: Effectiveness & Safety",provider:"NIH · NCCIH",category:"traditions",url:"https://www.nccih.nih.gov/health/acupuncture-effectiveness-and-safety",desc:"Research findings, sterile-needle standards, practitioner questions, risks, and limits of the evidence.",tags:"acupuncture needles pain practitioner safety evidence"}
  ];

  const OFFICIAL_RESOURCE_HOSTS=new Set(["www.nccih.nih.gov","www.who.int","www.cdc.gov","www.nimh.nih.gov","www.myplate.gov","medlineplus.gov","ods.od.nih.gov","www.fda.gov","odphp.health.gov"]);

  const NETWORK=[
    ["Verve N Veda","https://vervenveda.com/"],["Medicament Hub","https://vervenveda.com/medicament-hub.github.io/"],["Solanar","https://vervenveda.com/solanar.github.io/"],["Khaemenes Academy","https://vervenveda.com/Khaemenes_Academy.github.io/"],["The Refrain","https://vervenveda.com/the_refrain.github.io/"],["River to Road","https://vervenveda.com/river_to_road.github.io/"],["Bazaar Art","https://vervenveda.com/bazaarart.github.io/"],["ARSHIF","https://vervenveda.com/Arshif.github.io/"]
  ];

  const FAVORITES_KEY="aurora_favorites_v4";
  const VOICE_KEY="aurora_voice_v2";
  const $=id=>document.getElementById(id);
  const escapeHtml=value=>String(value).replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[ch]));
  const i18n=()=>window.AuroraLanguage;
  const t=value=>i18n()?.translate?.(value)||String(value);
  const message=(key,values)=>i18n()?.message?.(key,values)||"";
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
  function categoryName(key){return t(CATEGORIES[key]?.label||key)}
  function internalRoomURL(room){
    if(!room||!/^[A-Za-z0-9 _.'()&+-]+_index\.html$/.test(room.file))return null;
    try{const url=new URL(`./apps/${encodeURI(room.file)}`,location.href);url.searchParams.set("v","20261018c");const lang=i18n()?.getLanguage?.();if(lang&&lang!=="en")url.searchParams.set("lang",lang);return url.origin===location.origin?url:null}catch{return null}
  }
  function safeExternalURL(value){try{const url=new URL(value);return url.protocol==="https:"&&!url.username&&!url.password?url:null}catch{return null}}
  function safeResourceURL(value){const url=safeExternalURL(value);return url&&OFFICIAL_RESOURCE_HOSTS.has(url.hostname)?url:null}

  function renderJourneys(){
    $("journeyGrid").innerHTML=Object.entries(CATEGORIES).map(([key,item])=>`<article class="journey"><div class="journey-mark" aria-hidden="true">${escapeHtml(item.icon)}</div><h3>${escapeHtml(t(item.short))}</h3><p>${escapeHtml(t(item.desc))}</p><button type="button" data-journey="${escapeHtml(key)}">${escapeHtml(t("Enter this path"))}</button></article>`).join("");
    document.querySelectorAll("[data-journey]").forEach(btn=>btn.addEventListener("click",()=>{const key=btn.dataset.journey;$("categoryFilter").value=key;favoritesOnly=false;syncFavoriteToggle();renderLibrary();$("library").scrollIntoView({behavior:"smooth",block:"start"})}));
  }

  function featureMarkup(room){return `<article class="feature-card"><div class="feature-mark" aria-hidden="true">${escapeHtml(room.icon)}</div><div class="meta">${escapeHtml(categoryName(room.category))}</div><h3>${escapeHtml(t(room.title))}</h3><p>${escapeHtml(t(room.desc))}</p><button type="button" data-open-room="${escapeHtml(room.id)}">${escapeHtml(t("Open room"))}</button></article>`}
  function renderFeatured(){$("featuredGrid").innerHTML=FEATURED.map(roomById).filter(Boolean).map(featureMarkup).join("");wireOpenButtons($("featuredGrid"))}

  function renderEvening(){
    $("restList").innerHTML=REST.map(roomById).filter(Boolean).map(room=>`<button class="rest-link" type="button" data-open-room="${escapeHtml(room.id)}"><span aria-hidden="true">${escapeHtml(room.icon)}</span><span><strong>${escapeHtml(t(room.title))}</strong><small>${escapeHtml(t(room.subtitle))}</small></span></button>`).join("");
    wireOpenButtons($("restList"));
  }

  function roomCard(room){const fav=favorites.has(room.id);return `<article class="room-card"><div class="room-top"><span class="room-icon" aria-hidden="true">${escapeHtml(room.icon)}</span><button type="button" class="favorite" aria-label="${escapeHtml(t(fav?"Remove from favorites":"Add to favorites"))}: ${escapeHtml(t(room.title))}" aria-pressed="${fav}" data-favorite="${escapeHtml(room.id)}">${fav?"★":"☆"}</button></div><div class="category">${escapeHtml(categoryName(room.category))}</div><h3>${escapeHtml(t(room.title))}</h3><p>${escapeHtml(t(room.desc))}</p><button type="button" class="open-room" data-open-room="${escapeHtml(room.id)}">${escapeHtml(t("Open quietly"))}</button></article>`}

  function renderLibrary(){
    const query=$("roomSearch").value.trim().toLowerCase();
    const category=$("categoryFilter").value;
    const list=ROOMS.filter(room=>(!category||room.category===category)&&(!favoritesOnly||favorites.has(room.id))&&(!query||(room.title+" "+room.subtitle+" "+room.desc+" "+room.tags+" "+categoryName(room.category)+" "+t(CATEGORIES[room.category]?.short||"")).toLowerCase().includes(query)));
    $("roomGrid").innerHTML=list.map(roomCard).join("");
    $("roomEmpty").classList.toggle("show",list.length===0);
    $("resultLine").textContent=message("rooms",{shown:list.length,total:ROOMS.length})||`${list.length} of ${ROOMS.length} Aurora rooms`;
    wireOpenButtons($("roomGrid"));
    document.querySelectorAll("[data-favorite]").forEach(btn=>btn.addEventListener("click",()=>{const id=btn.dataset.favorite;if(favorites.has(id))favorites.delete(id);else favorites.add(id);storage.set(FAVORITES_KEY,[...favorites]);renderLibrary()}));
  }

  function syncFavoriteToggle(){const btn=$("favoritesToggle");btn.setAttribute("aria-pressed",String(favoritesOnly));btn.textContent=t(favoritesOnly?"★ Favorites only":"☆ Favorites")}
  function wireOpenButtons(root=document){root.querySelectorAll("[data-open-room]").forEach(btn=>btn.addEventListener("click",()=>openRoom(roomById(btn.dataset.openRoom))))}

  function openRoom(room){
    const url=internalRoomURL(room);if(!room||!url){toast("That Aurora room could not be opened safely.");return}
    activeRoom=room;lastFocus=document.activeElement;
    $("roomTitle").textContent=t(room.title);$("roomMeta").textContent=t(room.subtitle);$("roomMark").textContent=room.icon;$("roomStatus").textContent=t("Aurora is opening this room in its own isolated viewer.");$("roomFrame").title=t(room.title);$("roomLoading").classList.remove("hidden");$("roomFrame").src=url.href;
    $("roomOverlay").classList.add("open");$("roomOverlay").setAttribute("aria-hidden","false");document.body.classList.add("room-open");$("roomClose").focus();
  }
  function closeRoom(){
    if(!$("roomOverlay").classList.contains("open"))return;
    $("roomOverlay").classList.remove("open");$("roomOverlay").setAttribute("aria-hidden","true");document.body.classList.remove("room-open");$("roomFrame").src="about:blank";$("roomLoading").classList.remove("hidden");$("roomStatus").textContent="Aurora opens original rooms here so you can return to the sanctuary without losing your place.";activeRoom=null;window.speechSynthesis?.cancel?.();lastFocus?.focus?.();
  }
  function trapRoomFocus(event){
    if(event.key!=="Tab"||!$("roomOverlay").classList.contains("open"))return;
    const nodes=[...$("roomOverlay").querySelectorAll('button,[href],iframe,[tabindex]:not([tabindex="-1"])')].filter(el=>!el.disabled);
    if(!nodes.length)return;const first=nodes[0],last=nodes[nodes.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
  }

  function preferredVoice(){if(!("speechSynthesis" in window))return null;const voices=speechSynthesis.getVoices();const lang=i18n()?.getLanguage?.()||"en";return voices.find(v=>v.lang?.toLowerCase().startsWith(lang.toLowerCase()))||voices.find(v=>/^en/i.test(v.lang))||voices[0]||null}
  function speak(text){if(!voiceEnabled||!("speechSynthesis" in window)||!text)return;speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(text.slice(0,3600));const voice=preferredVoice();if(voice)utterance.voice=voice;utterance.rate=.86;utterance.pitch=.96;speechSynthesis.speak(utterance)}
  function syncVoice(){const btn=$("voiceToggle");btn.setAttribute("aria-pressed",String(voiceEnabled));btn.textContent=t(voiceEnabled?"Aurora Voice · On":"Aurora Voice · Off")}
  function toggleVoice(){if(!("speechSynthesis" in window)){toast("Voice is not available in this browser.");return}voiceEnabled=!voiceEnabled;storage.set(VOICE_KEY,voiceEnabled);syncVoice();if(voiceEnabled)speak("Aurora voice is on. I will only speak when you choose to hear me.");else speechSynthesis.cancel()}
  function readRoom(){if(!activeRoom){return}try{const doc=$("roomFrame").contentDocument;const root=doc?.querySelector("main")||doc?.body;if(!root){toast("This room is still opening.");return}const clone=root.cloneNode(true);clone.querySelectorAll("script,style,noscript,nav,footer,button,input,select,textarea,iframe").forEach(n=>n.remove());const text=(clone.innerText||clone.textContent||"").replace(/\s+/g," ").trim();if(!text){toast("There is no readable room text yet.");return}speak(text)}catch{toast("This room could not be read aloud.")}}

  const phases=[
    {name:"Inhale",copy:"Breathe in gently through the nose.",className:"inhale",ms:4000},
    {name:"Rest",copy:"Let the breath be still for a moment.",className:"",ms:2000},
    {name:"Exhale",copy:"Release slowly. Let the shoulders soften.",className:"exhale",ms:6000}
  ];
  function setBreathPhase(){if(!breathRunning)return;const phase=phases[breathPhase%phases.length],dock=$("breathDock");dock.classList.remove("inhale","exhale");if(phase.className)dock.classList.add(phase.className);$("breathTitle").textContent=t(phase.name);$("breathText").textContent=t(phase.copy);breathTimer=setTimeout(()=>{breathPhase++;setBreathPhase()},phase.ms)}
  function toggleBreath(){breathRunning=!breathRunning;clearTimeout(breathTimer);if(breathRunning){breathPhase=0;$("breathStart").textContent=t("Pause");setBreathPhase()}else{$("breathDock").classList.remove("inhale","exhale");$("breathTitle").textContent=t("Take one unhurried breath");$("breathText").textContent=t("Inhale gently. Let your shoulders soften.");$("breathStart").textContent=t("Begin")}}

  function renderResources(){
    const query=$("resourceSearch").value.trim().toLowerCase();
    const category=$("resourceCategory").value;
    const list=RESOURCES.filter(item=>(!category||item.category===category)&&(!query||(item.title+" "+item.provider+" "+item.desc+" "+item.tags+" "+RESOURCE_CATEGORIES[item.category]).toLowerCase().includes(query)));
    $("resourceGrid").innerHTML=list.map(item=>{const url=safeResourceURL(item.url);return `<article class="resource"><div class="resource-meta"><span>${escapeHtml(t(RESOURCE_CATEGORIES[item.category]))}</span><span>${escapeHtml(item.provider)}</span></div><h3>${escapeHtml(t(item.title))}</h3><p>${escapeHtml(t(item.desc))}</p>${url?`<a href="${escapeHtml(url.href)}" target="_blank" rel="noopener noreferrer" referrerpolicy="no-referrer">${escapeHtml(t("Visit official source"))} <span aria-hidden="true">↗</span></a>`:""}</article>`}).join("");
    $("resourceResult").textContent=message("references",{shown:list.length,total:RESOURCES.length})||`${list.length} of ${RESOURCES.length} trusted public references`;
    $("resourceEmpty").classList.toggle("show",list.length===0);
  }

  function resetResources(){
    $("resourceSearch").value="";
    $("resourceCategory").value="";
    renderResources();
    $("resourceSearch").focus();
  }
  function renderNetwork(){
    $("networkLinks").innerHTML=NETWORK.map(([label,value])=>{const url=safeExternalURL(value);return url?`<a href="${escapeHtml(url.href)}">${escapeHtml(label)}</a>`:""}).join("");
  }
  function syncFilterOptions(){
    const roomValue=$("categoryFilter").value;
    const resourceValue=$("resourceCategory").value;
    $("categoryFilter").innerHTML=`<option value="">${escapeHtml(t("All paths"))}</option>`+Object.entries(CATEGORIES).map(([key,item])=>`<option value="${escapeHtml(key)}">${escapeHtml(t(item.label))}</option>`).join("");
    $("resourceCategory").innerHTML=`<option value="">${escapeHtml(t("All eight topics"))}</option>`+Object.entries(RESOURCE_CATEGORIES).map(([key,label])=>`<option value="${escapeHtml(key)}">${escapeHtml(t(label))}</option>`).join("");
    $("categoryFilter").value=roomValue;
    $("resourceCategory").value=resourceValue;
  }

  function init(){
    renderJourneys();renderFeatured();renderEvening();renderNetwork();
    const roomCount=$("roomCount");if(roomCount)roomCount.textContent=String(ROOMS.length);
    syncFilterOptions();
    renderResources();
    renderLibrary();syncFavoriteToggle();syncVoice();
    $("roomSearch").addEventListener("input",renderLibrary);$("categoryFilter").addEventListener("change",renderLibrary);$("favoritesToggle").addEventListener("click",()=>{favoritesOnly=!favoritesOnly;syncFavoriteToggle();renderLibrary()});
    $("resourceSearch").addEventListener("input",renderResources);$("resourceCategory").addEventListener("change",renderResources);$("resourceReset").addEventListener("click",resetResources);
    $("voiceToggle").addEventListener("click",toggleVoice);$("breathStart").addEventListener("click",toggleBreath);$("roomClose").addEventListener("click",closeRoom);$("roomRead").addEventListener("click",readRoom);$("roomFrame").addEventListener("load",()=>{$("roomLoading").classList.add("hidden");if(activeRoom){const lang=i18n()?.getLanguage?.()||"en";$("roomFrame").contentWindow?.postMessage?.({type:"aurora-language",language:lang},location.origin);$("roomStatus").textContent=message("ready",{title:t(activeRoom.title)})||`${activeRoom.title} is ready. Its saved state is isolated from every other Aurora room.`}});
    window.addEventListener("message",event=>{if(event.origin!==location.origin||event.source!==$("roomFrame").contentWindow||event.data?.type!=="aurora-room-error")return;$("roomStatus").textContent=`${activeRoom?.title||"This room"} encountered an error. The rest of Aurora remains available.`;toast("This room needs attention. Its error was isolated.")});
    $("roomOverlay").addEventListener("mousedown",event=>{if(event.target===$("roomOverlay"))closeRoom()});
    document.addEventListener("keydown",event=>{if(event.key==="Escape")closeRoom();trapRoomFocus(event);if(event.key==="/"&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName||"")){event.preventDefault();$("roomSearch").focus()}});
    document.addEventListener("aurora:language-change",event=>{syncFilterOptions();renderJourneys();renderFeatured();renderEvening();renderLibrary();renderResources();syncFavoriteToggle();syncVoice();const lang=event.detail?.language||"en";if(activeRoom)$("roomFrame").contentWindow?.postMessage?.({type:"aurora-language",language:lang},location.origin)});
    $("year").textContent=String(new Date().getFullYear());
  }

  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();
