/* Aurora multilingual interface layer.
 * Adapted from the Khaemenes Academy language contract:
 * - 13 local interface languages
 * - shared first-party preference (`vnv_language_v1`)
 * - `?lang=` handoff between Verve N Veda sites
 * - Arabic right-to-left document direction
 * - English fallback when a phrase has not been locally curated
 *
 * This file is intentionally sovereign: it makes no network requests and never
 * sends page text, room content, visitor writing, or account data to a service.
 */
(()=>{
  "use strict";

  const LANGUAGES=Object.freeze([
    {code:"en",name:"English",label:"Language",dir:"ltr"},
    {code:"es",name:"Español",label:"Idioma",dir:"ltr"},
    {code:"fr",name:"Français",label:"Langue",dir:"ltr"},
    {code:"ar",name:"العربية",label:"اللغة",dir:"rtl"},
    {code:"zh",name:"中文",label:"语言",dir:"ltr"},
    {code:"de",name:"Deutsch",label:"Sprache",dir:"ltr"},
    {code:"ru",name:"Русский",label:"Язык",dir:"ltr"},
    {code:"pt",name:"Português",label:"Idioma",dir:"ltr"},
    {code:"hi",name:"हिन्दी",label:"भाषा",dir:"ltr"},
    {code:"ja",name:"日本語",label:"言語",dir:"ltr"},
    {code:"ko",name:"한국어",label:"언어",dir:"ltr"},
    {code:"it",name:"Italiano",label:"Lingua",dir:"ltr"},
    {code:"bn",name:"বাংলা",label:"ভাষা",dir:"ltr"}
  ]);
  const CODES=LANGUAGES.map(item=>item.code);
  const KEY="vnv_language_v1";
  const PARAM="lang";

  // English, Spanish, French, Arabic, Mandarin Chinese, German, Russian.
  // Aurora-specific copy is curated locally for these seven languages. The six
  // additional Academy languages receive the shared controls below and retain
  // calm English source text wherever a local phrase has not yet been reviewed.
  const ROWS=[
    ["Language","Idioma","Langue","اللغة","语言","Sprache","Язык"],
    ["Aurora — A Peaceful Verve N Veda Studio","Aurora — Un estudio sereno de Verve N Veda","Aurora — Un studio paisible de Verve N Veda","أورورا — استوديو هادئ من Verve N Veda","Aurora — 宁静的 Verve N Veda 工作室","Aurora — Ein friedliches Verve N Veda Studio","Aurora — Спокойная студия Verve N Veda"],
    ["Skip to main content","Saltar al contenido principal","Aller au contenu principal","انتقل إلى المحتوى الرئيسي","跳到主要内容","Zum Hauptinhalt springen","Перейти к основному содержанию"],
    ["Primary navigation","Navegación principal","Navigation principale","التنقل الرئيسي","主导航","Hauptnavigation","Основная навигация"],
    ["Practices","Prácticas","Pratiques","الممارسات","练习","Übungen","Практики"],
    ["Featured","Destacados","À découvrir","مختارات","精选","Empfehlungen","Избранное"],
    ["Evening","Noche","Soir","المساء","夜晚","Abend","Вечер"],
    ["Library","Biblioteca","Bibliothèque","المكتبة","资料库","Bibliothek","Библиотека"],
    ["Creative Continuum","Continuo creativo","Continuum créatif","المسار الإبداعي","创意连续体","Kreatives Kontinuum","Творческий континуум"],
    ["Resources","Recursos","Ressources","الموارد","资源","Ressourcen","Ресурсы"],
    ["A peaceful place to return to yourself","Un lugar sereno para volver a ti","Un lieu paisible pour revenir à vous","مكان هادئ للعودة إلى ذاتك","一个平静回归自己的地方","Ein friedlicher Ort, um zu sich zurückzukehren","Спокойное место, где можно вернуться к себе"],
    ["Breathe · Restore · Reflect · Create","Respira · Restaura · Reflexiona · Crea","Respirer · Se ressourcer · Réfléchir · Créer","تنفّس · استعد توازنك · تأمّل · أبدع","呼吸 · 恢复 · 沉思 · 创造","Atmen · Erholen · Reflektieren · Gestalten","Дышите · Восстанавливайтесь · Размышляйте · Творите"],
    ["Begin with one breath","Comienza con una respiración","Commencer par une respiration","ابدأ بنَفَس واحد","从一次呼吸开始","Mit einem Atemzug beginnen","Начать с одного вдоха"],
    ["Choose a practice","Elige una práctica","Choisir une pratique","اختر ممارسة","选择一项练习","Eine Übung wählen","Выбрать практику"],
    ["No account. No pressure. Your favorites and voice preference stay in this browser.","Sin cuenta. Sin presión. Tus favoritos y tu preferencia de voz permanecen en este navegador.","Aucun compte. Aucune pression. Vos favoris et votre choix de voix restent dans ce navigateur.","لا حساب ولا ضغط. تبقى المفضلة وتفضيلات الصوت في هذا المتصفح.","无需账户，没有压力。收藏和语音偏好仅保存在此浏览器中。","Kein Konto. Kein Druck. Favoriten und Stimmeinstellung bleiben in diesem Browser.","Без аккаунта и без давления. Избранное и настройка голоса остаются в этом браузере."],
    ["original rooms","salas originales","espaces originaux","غرف أصلية","个原创空间","Originalräume","авторских пространств"],
    ["Local-first","Local primero","Priorité au local","محلي أولاً","本地优先","Lokal zuerst","Локально в первую очередь"],
    ["Made for quiet focus","Creado para una concentración tranquila","Conçu pour une attention paisible","مصمم للتركيز الهادئ","为安静专注而设计","Für ruhige Konzentration","Создано для спокойной сосредоточенности"],
    ["A quiet threshold","Un umbral tranquilo","Un seuil paisible","عتبة هادئة","宁静的门槛","Eine ruhige Schwelle","Тихий порог"],
    ["A quiet note from Aurora","Una nota tranquila de Aurora","Une note paisible d’Aurora","رسالة هادئة من أورورا","来自 Aurora 的宁静寄语","Eine ruhige Nachricht von Aurora","Тихая заметка от Aurora"],
    ["Take one unhurried breath","Respira una vez, sin prisa","Prenez une respiration sans hâte","خذ نَفَسًا واحدًا على مهل","从容地呼吸一次","Nehmen Sie einen ruhigen Atemzug","Сделайте один неспешный вдох"],
    ["Inhale gently. Let your shoulders soften.","Inhala suavemente. Deja que los hombros se relajen.","Inspirez doucement. Laissez vos épaules se détendre.","استنشق برفق ودع كتفيك يسترخيان.","轻轻吸气，让肩膀放松。","Atmen Sie sanft ein. Lassen Sie die Schultern sinken.","Мягко вдохните. Расслабьте плечи."],
    ["Begin","Comenzar","Commencer","ابدأ","开始","Beginnen","Начать"],
    ["Pause","Pausar","Pause","إيقاف مؤقت","暂停","Pause","Пауза"],
    ["Inhale","Inhala","Inspirer","شهيق","吸气","Einatmen","Вдох"],
    ["Rest","Pausa","Repos","استراحة","停留","Ruhen","Пауза"],
    ["Exhale","Exhala","Expirer","زفير","呼气","Ausatmen","Выдох"],
    ["Choose what you need today","Elige lo que necesitas hoy","Choisissez ce dont vous avez besoin aujourd’hui","اختر ما تحتاجه اليوم","选择今天所需","Wählen Sie, was Sie heute brauchen","Выберите то, что вам нужно сегодня"],
    ["Six ways into stillness.","Seis caminos hacia la quietud.","Six chemins vers le calme.","ستة طرق إلى السكينة.","通往宁静的六条路径。","Sechs Wege in die Stille.","Шесть путей к тишине."],
    ["Studio recommendations","Recomendaciones del estudio","Recommandations du studio","ترشيحات الاستوديو","工作室推荐","Empfehlungen aus dem Studio","Рекомендации студии"],
    ["A thoughtful place to begin.","Un lugar sereno para comenzar.","Un point de départ attentionné.","مكان مدروس للبداية.","一个用心的起点。","Ein achtsamer Anfang.","Продуманное место для начала."],
    ["When the day becomes quiet","Cuando el día se aquieta","Quand le jour s’apaise","حين يهدأ النهار","当一天安静下来","Wenn der Tag still wird","Когда день становится тише"],
    ["Evening, sleep & rest.","Noche, sueño y descanso.","Soir, sommeil et repos.","المساء والنوم والراحة.","夜晚、睡眠与休息。","Abend, Schlaf und Ruhe.","Вечер, сон и отдых."],
    ["One creative continuum","Un continuo creativo","Un continuum créatif","مسار إبداعي واحد","一条创意连续体","Ein kreatives Kontinuum","Единый творческий континуум"],
    ["Settle. Make. Listen.","Serénate. Crea. Escucha.","S’ancrer. Créer. Écouter.","اهدأ. أبدع. استمع.","安定。创作。聆听。","Ankommen. Gestalten. Zuhören.","Успокойтесь. Создавайте. Слушайте."],
    ["You are here","Estás aquí","Vous êtes ici","أنت هنا","您在这里","Sie sind hier","Вы здесь"],
    ["Enter the art studio →","Entrar al estudio de arte →","Entrer dans l’atelier d’art →","ادخل استوديو الفن ←","进入艺术工作室 →","Kunststudio betreten →","Войти в художественную студию →"],
    ["Enter the music house →","Entrar a la casa de la música →","Entrer dans la maison de la musique →","ادخل بيت الموسيقى ←","进入音乐之家 →","Musikhaus betreten →","Войти в дом музыки →"],
    ["The complete Aurora collection","La colección completa de Aurora","La collection complète d’Aurora","مجموعة أورورا الكاملة","完整的 Aurora 收藏","Die vollständige Aurora-Sammlung","Полная коллекция Aurora"],
    ["Your practice library.","Tu biblioteca de prácticas.","Votre bibliothèque de pratiques.","مكتبة ممارساتك.","您的练习资料库。","Ihre Übungsbibliothek.","Ваша библиотека практик."],
    ["Search Aurora rooms","Buscar espacios de Aurora","Rechercher dans les espaces Aurora","ابحث في غرف أورورا","搜索 Aurora 空间","Aurora-Räume durchsuchen","Искать пространства Aurora"],
    ["Filter by journey","Filtrar por camino","Filtrer par parcours","تصفية حسب المسار","按路径筛选","Nach Weg filtern","Фильтр по пути"],
    ["Search breath, journal, music, morning…","Buscar respiración, diario, música, mañana…","Rechercher respiration, journal, musique, matin…","ابحث عن التنفس أو اليوميات أو الموسيقى أو الصباح…","搜索呼吸、日记、音乐、晨间……","Atem, Tagebuch, Musik, Morgen suchen…","Поиск: дыхание, дневник, музыка, утро…"],
    ["All paths","Todos los caminos","Tous les parcours","كل المسارات","所有路径","Alle Wege","Все пути"],
    ["☆ Favorites","☆ Favoritos","☆ Favoris","☆ المفضلة","☆ 收藏","☆ Favoriten","☆ Избранное"],
    ["★ Favorites only","★ Solo favoritos","★ Favoris uniquement","★ المفضلة فقط","★ 仅收藏","★ Nur Favoriten","★ Только избранное"],
    ["No Aurora rooms match that search yet.","Todavía no hay espacios de Aurora que coincidan con esa búsqueda.","Aucun espace Aurora ne correspond encore à cette recherche.","لا توجد غرف أورورا مطابقة لهذا البحث حتى الآن.","暂时没有匹配此搜索的 Aurora 空间。","Noch keine Aurora-Räume passen zu dieser Suche.","Пока нет пространств Aurora, соответствующих этому поиску."],
    ["Open room","Abrir espacio","Ouvrir l’espace","افتح الغرفة","打开空间","Raum öffnen","Открыть пространство"],
    ["Open quietly","Abrir en calma","Ouvrir doucement","افتح بهدوء","安静打开","Ruhig öffnen","Открыть спокойно"],
    ["Enter this path","Entrar en este camino","Suivre ce parcours","ادخل هذا المسار","进入此路径","Diesen Weg betreten","Войти на этот путь"],
    ["Trusted public references","Referencias públicas confiables","Références publiques fiables","مراجع عامة موثوقة","可信公共参考资料","Vertrauenswürdige öffentliche Quellen","Надёжные открытые источники"],
    ["Natural & holistic health, explored carefully.","Salud natural e integral, explorada con cuidado.","La santé naturelle et globale, explorée avec prudence.","استكشاف حذر للصحة الطبيعية والشمولية.","谨慎探索自然与整体健康。","Natürliche und ganzheitliche Gesundheit, sorgfältig betrachtet.","Естественное и целостное здоровье — с осторожным подходом."],
    ["Search trusted health references","Buscar referencias de salud confiables","Rechercher des références de santé fiables","ابحث في المراجع الصحية الموثوقة","搜索可信健康资料","Vertrauenswürdige Gesundheitsquellen durchsuchen","Искать надёжные источники о здоровье"],
    ["Filter references by topic","Filtrar referencias por tema","Filtrer les références par thème","تصفية المراجع حسب الموضوع","按主题筛选资料","Quellen nach Thema filtern","Фильтр источников по теме"],
    ["Search herbs, meditation, sleep, yoga…","Buscar hierbas, meditación, sueño, yoga…","Rechercher plantes, méditation, sommeil, yoga…","ابحث عن الأعشاب أو التأمل أو النوم أو اليوغا…","搜索草药、冥想、睡眠、瑜伽……","Kräuter, Meditation, Schlaf, Yoga suchen…","Поиск: травы, медитация, сон, йога…"],
    ["All eight topics","Los ocho temas","Les huit thèmes","الموضوعات الثمانية","全部八个主题","Alle acht Themen","Все восемь тем"],
    ["Clear","Limpiar","Effacer","مسح","清除","Löschen","Очистить"],
    ["Visit official source","Visitar fuente oficial","Consulter la source officielle","زر المصدر الرسمي","访问官方来源","Offizielle Quelle besuchen","Открыть официальный источник"],
    ["Whole-person foundations","Fundamentos de salud integral","Fondements de la santé globale","أسس صحة الإنسان الشاملة","全人健康基础","Ganzheitliche Grundlagen","Основы целостного здоровья"],
    ["Evidence & safety","Evidencia y seguridad","Données probantes et sécurité","الأدلة والسلامة","证据与安全","Evidenz und Sicherheit","Доказательность и безопасность"],
    ["Mind–body practices","Prácticas mente-cuerpo","Pratiques corps-esprit","ممارسات العقل والجسد","身心练习","Geist-Körper-Praktiken","Практики для ума и тела"],
    ["Movement & mobility","Movimiento y movilidad","Mouvement et mobilité","الحركة والمرونة","运动与活动能力","Bewegung und Mobilität","Движение и мобильность"],
    ["Sleep & mental well-being","Sueño y bienestar mental","Sommeil et bien-être mental","النوم والعافية النفسية","睡眠与心理健康","Schlaf und seelisches Wohlbefinden","Сон и психическое благополучие"],
    ["Food & nutrition","Alimentación y nutrición","Alimentation et nutrition","الغذاء والتغذية","食物与营养","Ernährung","Питание"],
    ["Herbs & supplements","Hierbas y suplementos","Plantes et compléments","الأعشاب والمكملات","草药与补充剂","Kräuter und Nahrungsergänzung","Травы и добавки"],
    ["Traditional systems","Sistemas tradicionales","Systèmes traditionnels","الأنظمة التقليدية","传统体系","Traditionelle Systeme","Традиционные системы"],
    ["Breath & Grounding","Respiración y arraigo","Respiration et ancrage","التنفس والتجذّر","呼吸与扎根","Atmung und Erdung","Дыхание и заземление"],
    ["Morning & Daily Rhythm","Ritmo matutino y diario","Rythme du matin et du quotidien","إيقاع الصباح واليوم","晨间与日常节律","Morgen- und Tagesrhythmus","Утренний и дневной ритм"],
    ["Evening, Sleep & Rest","Noche, sueño y descanso","Soir, sommeil et repos","المساء والنوم والراحة","夜晚、睡眠与休息","Abend, Schlaf und Ruhe","Вечер, сон и отдых"],
    ["Creative Renewal","Renovación creativa","Renouveau créatif","تجدد إبداعي","创意焕新","Kreative Erneuerung","Творческое обновление"],
    ["Reflection & Growth","Reflexión y crecimiento","Réflexion et évolution","التأمل والنمو","反思与成长","Reflexion und Wachstum","Размышление и рост"],
    ["Sound & Atmosphere","Sonido y ambiente","Son et atmosphère","الصوت والأجواء","声音与氛围","Klang und Atmosphäre","Звук и атмосфера"],
    ["Breathing, grounding, and sensory resets.","Respiración, arraigo y pausas sensoriales.","Respiration, ancrage et pauses sensorielles.","التنفس والتجذّر واستعادة التوازن الحسي.","呼吸、扎根与感官重置。","Atmung, Erdung und sensorische Ruhepausen.","Дыхание, заземление и сенсорная перезагрузка."],
    ["Gentle beginnings, focus, and humane structure.","Comienzos suaves, concentración y una estructura humana.","Des débuts doux, de l’attention et une structure humaine.","بدايات لطيفة وتركيز وتنظيم إنساني.","温和的开始、专注与人性化节奏。","Sanfte Anfänge, Fokus und menschliche Struktur.","Мягкое начало, сосредоточенность и человечный ритм."],
    ["Night reflection, dreams, prayer, and soft endings.","Reflexión nocturna, sueños, oración y cierres suaves.","Réflexion nocturne, rêves, prière et fins de journée douces.","تأمل ليلي وأحلام ودعاء ونهايات هادئة.","夜间反思、梦境、祈祷与柔和收尾。","Nächtliche Reflexion, Träume, Gebet und sanfte Abschlüsse.","Вечернее размышление, сны, молитва и мягкое завершение дня."],
    ["Art, writing, color, imagination, and direction.","Arte, escritura, color, imaginación y dirección.","Art, écriture, couleur, imagination et orientation.","الفن والكتابة واللون والخيال والاتجاه.","艺术、写作、色彩、想象与方向。","Kunst, Schreiben, Farbe, Fantasie und Orientierung.","Искусство, письмо, цвет, воображение и направление."],
    ["Journaling, gratitude, compassion, and values.","Diario, gratitud, compasión y valores.","Journal, gratitude, compassion et valeurs.","الكتابة اليومية والامتنان والرحمة والقيم.","日记、感恩、关怀与价值观。","Tagebuch, Dankbarkeit, Mitgefühl und Werte.","Дневник, благодарность, сострадание и ценности."],
    ["Music, tone, frequency, and listening spaces.","Música, tono, frecuencia y espacios de escucha.","Musique, tonalité, fréquence et espaces d’écoute.","الموسيقى والنغم والتردد ومساحات الاستماع.","音乐、音调、频率与聆听空间。","Musik, Klang, Frequenz und Hörräume.","Музыка, тон, частота и пространства для слушания."],
    ["Breathe","Respirar","Respirer","تنفّس","呼吸","Atmen","Дышать"],
    ["Create","Crear","Créer","أبدع","创造","Gestalten","Творить"],
    ["Reflect","Reflexionar","Réfléchir","تأمّل","沉思","Reflektieren","Размышлять"],
    ["Listen","Escuchar","Écouter","استمع","聆听","Zuhören","Слушать"],
    ["Aurora Voice · Off","Voz de Aurora · Desactivada","Voix d’Aurora · Désactivée","صوت أورورا · متوقف","Aurora 语音 · 关闭","Aurora-Stimme · Aus","Голос Aurora · Выкл."],
    ["Aurora Voice · On","Voz de Aurora · Activada","Voix d’Aurora · Activée","صوت أورورا · يعمل","Aurora 语音 · 开启","Aurora-Stimme · Ein","Голос Aurora · Вкл."],
    ["Breathe in gently through the nose.","Inhala suavemente por la nariz.","Inspirez doucement par le nez.","استنشق برفق عبر الأنف.","用鼻子轻轻吸气。","Atmen Sie sanft durch die Nase ein.","Мягко вдохните через нос."],
    ["Let the breath be still for a moment.","Deja que la respiración repose un momento.","Laissez le souffle se poser un instant.","دع النَفَس يسكن للحظة.","让呼吸静止片刻。","Lassen Sie den Atem einen Moment ruhen.","Пусть дыхание на мгновение замрёт."],
    ["Release slowly. Let the shoulders soften.","Suelta el aire despacio. Deja que los hombros se relajen.","Expirez lentement. Laissez vos épaules se détendre.","أطلق الزفير ببطء ودع كتفيك يسترخيان.","缓缓呼气，让肩膀放松。","Atmen Sie langsam aus. Lassen Sie die Schultern sinken.","Медленно выдохните. Расслабьте плечи."],
    ["Add to favorites","Añadir a favoritos","Ajouter aux favoris","أضف إلى المفضلة","添加到收藏","Zu Favoriten hinzufügen","Добавить в избранное"],
    ["Remove from favorites","Quitar de favoritos","Retirer des favoris","إزالة من المفضلة","从收藏中移除","Aus Favoriten entfernen","Убрать из избранного"],
    ["Read room","Leer espacio","Lire l’espace","اقرأ الغرفة","朗读空间","Raum vorlesen","Прочитать пространство"],
    ["Close Aurora room","Cerrar espacio de Aurora","Fermer l’espace Aurora","أغلق غرفة أورورا","关闭 Aurora 空间","Aurora-Raum schließen","Закрыть пространство Aurora"],
    ["Original room","Espacio original","Espace original","غرفة أصلية","原创空间","Originalraum","Авторское пространство"],
    ["Aurora is opening this room in its own isolated viewer.","Aurora está abriendo este espacio en su visor aislado.","Aurora ouvre cet espace dans sa visionneuse isolée.","تفتح أورورا هذه الغرفة في عارضها المعزول.","Aurora 正在独立查看器中打开此空间。","Aurora öffnet diesen Raum in einer eigenen isolierten Ansicht.","Aurora открывает это пространство в отдельном изолированном окне."],
    ["Aurora opens original rooms here so you can return to the sanctuary without losing your place.","Aurora abre aquí sus espacios originales para que puedas volver al santuario sin perder tu lugar.","Aurora ouvre ici ses espaces originaux afin que vous puissiez revenir au sanctuaire sans perdre votre place.","تفتح أورورا الغرف الأصلية هنا لتتمكن من العودة إلى الملاذ دون فقدان مكانك.","Aurora 在此打开原创空间，您可以返回静心空间而不会丢失位置。","Aurora öffnet Originalräume hier, damit Sie ohne Platzverlust zum Refugium zurückkehren können.","Aurora открывает авторские пространства здесь, чтобы вы могли вернуться в святилище, не потеряв место."],
    ["Opening the room gently…","Abriendo el espacio con calma…","Ouverture de l’espace en douceur…","جارٍ فتح الغرفة بهدوء…","正在安静地打开空间……","Der Raum wird behutsam geöffnet…","Пространство мягко открывается…"],
    ["Contribute","Contribuir","Contribuer","ساهم","支持","Beitragen","Поддержать"],
    ["A gentle contribution doorway","Una forma amable de contribuir","Une invitation douce à contribuer","مدخل لطيف للمساهمة","温和的支持入口","Eine sanfte Möglichkeit beizutragen","Мягкая возможность поддержать"],
    ["Help keep Aurora open.","Ayuda a mantener Aurora abierta.","Aidez Aurora à rester ouverte.","ساعد في إبقاء أورورا مفتوحة.","帮助 Aurora 保持开放。","Helfen Sie, Aurora offen zu halten.","Помогите Aurora оставаться открытой."],
    ["β Beta Program","β Programa beta","β Programme bêta","β البرنامج التجريبي","β 测试计划","β Beta-Programm","β Бета-программа"]
  ];

  const EXTENDED=Object.freeze({
    "Language":["Idioma","भाषा","言語","언어","Lingua","ভাষা"],
    "Practices":["Práticas","अभ्यास","実践","연습","Pratiche","অনুশীলন"],
    "Featured":["Destaques","विशेष","おすすめ","추천","In evidenza","বিশেষ"],
    "Evening":["Noite","संध्या","夜","저녁","Sera","সন্ধ্যা"],
    "Library":["Biblioteca","पुस्तकालय","ライブラリー","라이브러리","Biblioteca","লাইব্রেরি"],
    "Creative Continuum":["Continuum criativo","रचनात्मक निरंतरता","創造の連続体","창작 연속체","Continuum creativo","সৃজনশীল ধারাবাহিকতা"],
    "Resources":["Recursos","संसाधन","資料","자료","Risorse","রিসোর্স"],
    "Begin":["Começar","शुरू करें","始める","시작","Inizia","শুরু করুন"],
    "Pause":["Pausar","रोकें","一時停止","일시 정지","Pausa","বিরতি"],
    "Rest":["Descansar","विश्राम","休む","쉬기","Riposo","বিশ্রাম"],
    "Breathe":["Respirar","साँस लें","呼吸する","호흡","Respira","শ্বাস নিন"],
    "Create":["Criar","रचें","創る","만들기","Crea","সৃষ্টি করুন"],
    "Reflect":["Refletir","चिंतन करें","振り返る","성찰","Rifletti","ভাবুন"],
    "Listen":["Ouvir","सुनें","聴く","듣기","Ascolta","শুনুন"],
    "Search Aurora rooms":["Pesquisar espaços Aurora","Aurora कक्ष खोजें","Auroraの空間を検索","Aurora 공간 검색","Cerca spazi Aurora","Aurora কক্ষ খুঁজুন"],
    "All paths":["Todos os caminhos","सभी मार्ग","すべての道","모든 경로","Tutti i percorsi","সব পথ"],
    "☆ Favorites":["☆ Favoritos","☆ पसंदीदा","☆ お気に入り","☆ 즐겨찾기","☆ Preferiti","☆ পছন্দের"],
    "★ Favorites only":["★ Somente favoritos","★ केवल पसंदीदा","★ お気に入りのみ","★ 즐겨찾기만","★ Solo preferiti","★ শুধু পছন্দের"],
    "Open room":["Abrir espaço","कक्ष खोलें","空間を開く","공간 열기","Apri spazio","কক্ষ খুলুন"],
    "Open quietly":["Abrir com calma","शांतिपूर्वक खोलें","静かに開く","조용히 열기","Apri con calma","শান্তভাবে খুলুন"],
    "Trusted public references":["Referências públicas confiáveis","विश्वसनीय सार्वजनिक संदर्भ","信頼できる公開資料","신뢰할 수 있는 공개 자료","Fonti pubbliche affidabili","বিশ্বস্ত জনসাধারণের তথ্যসূত্র"],
    "Clear":["Limpar","साफ़ करें","クリア","지우기","Cancella","মুছুন"],
    "Visit official source":["Visitar fonte oficial","आधिकारिक स्रोत देखें","公式情報を見る","공식 출처 보기","Visita la fonte ufficiale","সরকারি উৎস দেখুন"],
    "Aurora Voice · Off":["Voz Aurora · Desligada","Aurora आवाज़ · बंद","Aurora音声・オフ","Aurora 음성 · 끔","Voce Aurora · Off","Aurora কণ্ঠ · বন্ধ"],
    "Aurora Voice · On":["Voz Aurora · Ligada","Aurora आवाज़ · चालू","Aurora音声・オン","Aurora 음성 · 켬","Voce Aurora · On","Aurora কণ্ঠ · চালু"],
    "Read room":["Ler espaço","कक्ष पढ़ें","空間を読み上げる","공간 읽기","Leggi spazio","কক্ষ পড়ুন"],
    "Close Aurora room":["Fechar espaço Aurora","Aurora कक्ष बंद करें","Auroraの空間を閉じる","Aurora 공간 닫기","Chiudi spazio Aurora","Aurora কক্ষ বন্ধ করুন"],
    "β Beta Program":["β Programa beta","β बीटा कार्यक्रम","β ベータプログラム","β 베타 프로그램","β Programma beta","β বিটা প্রোগ্রাম"]
  });

  const MESSAGES=Object.freeze({
    rooms:{
      en:({shown,total})=>`${shown} of ${total} Aurora rooms`,
      es:({shown,total})=>`${shown} de ${total} espacios de Aurora`,
      fr:({shown,total})=>`${shown} espaces Aurora sur ${total}`,
      ar:({shown,total})=>`${shown} من ${total} من غرف أورورا`,
      zh:({shown,total})=>`${shown} / ${total} 个 Aurora 空间`,
      de:({shown,total})=>`${shown} von ${total} Aurora-Räumen`,
      ru:({shown,total})=>`${shown} из ${total} пространств Aurora`
    },
    references:{
      en:({shown,total})=>`${shown} of ${total} trusted public references`,
      es:({shown,total})=>`${shown} de ${total} referencias públicas confiables`,
      fr:({shown,total})=>`${shown} références publiques fiables sur ${total}`,
      ar:({shown,total})=>`${shown} من ${total} من المراجع العامة الموثوقة`,
      zh:({shown,total})=>`${shown} / ${total} 项可信公共参考资料`,
      de:({shown,total})=>`${shown} von ${total} vertrauenswürdigen öffentlichen Quellen`,
      ru:({shown,total})=>`${shown} из ${total} надёжных открытых источников`
    },
    ready:{
      en:({title})=>`${title} is ready. Its saved state is isolated from every other Aurora room.`,
      es:({title})=>`${title} está listo. Su estado guardado está aislado de todos los demás espacios de Aurora.`,
      fr:({title})=>`${title} est prêt. Son état enregistré est isolé de tous les autres espaces Aurora.`,
      ar:({title})=>`${title} جاهزة. حالتها المحفوظة معزولة عن كل غرف أورورا الأخرى.`,
      zh:({title})=>`${title} 已准备好。其保存状态与其他 Aurora 空间相互隔离。`,
      de:({title})=>`${title} ist bereit. Der gespeicherte Zustand ist von allen anderen Aurora-Räumen getrennt.`,
      ru:({title})=>`${title} готово. Сохранённое состояние изолировано от всех других пространств Aurora.`
    }
  });

  const MAP=new Map(ROWS.map(row=>[row[0],row]));
  const originals=new WeakMap();
  const rendered=new WeakMap();
  const attributeSources=new WeakMap();
  const attributeRendered=new WeakMap();
  const titleState={source:document.title,rendered:null};
  let observer=null;

  function normalize(value){return String(value??"").replace(/\s+/gu," ").trim()}
  function languageMeta(code){return LANGUAGES.find(item=>item.code===code)||LANGUAGES[0]}
  function readPreference(){try{return localStorage.getItem(KEY)}catch{return null}}
  function writePreference(code){try{localStorage.setItem(KEY,code)}catch{}}
  function requestedLanguage(){
    const query=new URLSearchParams(location.search).get(PARAM);
    if(CODES.includes(query))return query;
    const stored=readPreference();
    return CODES.includes(stored)?stored:"en";
  }
  let language=requestedLanguage();
  if(new URLSearchParams(location.search).has(PARAM))writePreference(language);

  function translate(source,code=language){
    const text=normalize(source);
    if(!text||code==="en")return text;
    const index=CODES.indexOf(code);
    const row=MAP.get(text);
    if(row&&index>0&&index<7&&row[index])return row[index];
    if(index>=7&&EXTENDED[text]?.[index-7])return EXTENDED[text][index-7];
    return text;
  }

  function message(key,values={}){
    const group=MESSAGES[key];
    const formatter=group?.[language]||group?.en;
    return formatter?formatter(values):"";
  }

  function ignored(element){
    return !!(element&&element.closest("script,style,noscript,svg,math,code,pre,textarea,select,option,[contenteditable],[data-i18n-ignore],[data-private],[data-learner-input]"));
  }

  function translateText(node){
    const parent=node.parentElement;
    if(!parent||ignored(parent))return;
    let source=originals.get(node);
    if(source===undefined||node.nodeValue!==rendered.get(node)){
      source=node.nodeValue;
      originals.set(node,source);
    }
    const phrase=normalize(source);
    if(!phrase)return;
    const replacement=translate(phrase);
    const next=replacement===phrase?source:source.replace(phrase,replacement);
    if(node.nodeValue!==next)node.nodeValue=next;
    rendered.set(node,next);
  }

  function translateAttributes(element){
    if(ignored(element))return;
    let sources=attributeSources.get(element);
    let recent=attributeRendered.get(element);
    if(!sources){sources={};recent={};attributeSources.set(element,sources);attributeRendered.set(element,recent)}
    for(const name of ["placeholder","aria-label","title","alt"]){
      const current=element.getAttribute(name);
      if(current===null)continue;
      if(!(name in sources)||current!==recent[name])sources[name]=current;
      const next=translate(sources[name]);
      if(current!==next)element.setAttribute(name,next);
      recent[name]=next;
    }
  }

  function translateTree(root){
    if(!root)return;
    if(root.nodeType===Node.TEXT_NODE){translateText(root);return}
    if(root.nodeType!==Node.ELEMENT_NODE&&root.nodeType!==Node.DOCUMENT_NODE)return;
    if(root.nodeType===Node.ELEMENT_NODE){if(ignored(root))return;translateAttributes(root)}
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT);
    let node;
    while((node=walker.nextNode())){
      if(node.nodeType===Node.TEXT_NODE)translateText(node);
      else if(!ignored(node))translateAttributes(node);
    }
  }

  function translateTitle(){
    if(document.title!==titleState.rendered&&document.title!==titleState.source)titleState.source=document.title;
    const next=translate(titleState.source);
    if(document.title!==next)document.title=next;
    titleState.rendered=next;
  }

  function populateSelect(select){
    if(!select||select.dataset.auroraLanguageReady==="true")return;
    select.replaceChildren(...LANGUAGES.map(item=>{
      const option=document.createElement("option");
      option.value=item.code;
      option.textContent=item.name;
      return option;
    }));
    select.dataset.auroraLanguageReady="true";
    select.addEventListener("change",()=>setLanguage(select.value,true));
  }

  function syncControls(){
    const meta=languageMeta(language);
    document.querySelectorAll("[data-aurora-language-select]").forEach(select=>{
      populateSelect(select);
      select.value=language;
      select.setAttribute("aria-label",meta.label);
      select.title=meta.name;
    });
    document.querySelectorAll("[data-aurora-language-label]").forEach(label=>label.textContent=meta.label);
    const status=document.getElementById("languageStatus");
    if(status)status.textContent=language==="en"?"English source selected.":`${meta.name} interface selected. Untranslated phrases remain in English.`;
  }

  function firstParty(url){
    if(url.protocol!=="https:")return false;
    const host=url.hostname.toLowerCase();
    return host==="vervenveda.com"||host==="www.vervenveda.com"||host==="vervenveda.github.io"||host==="khaemenesacademy.github.io"||host==="artist1970.github.io";
  }

  function localizeLink(link){
    if(!(link instanceof HTMLAnchorElement)||link.hasAttribute("download"))return;
    const href=link.getAttribute("href");
    if(!href||href.startsWith("#")||href.startsWith("mailto:")||href.startsWith("tel:"))return;
    let url;
    try{url=new URL(href,location.href)}catch{return}
    if(!firstParty(url))return;
    if(language==="en")url.searchParams.delete(PARAM);
    else url.searchParams.set(PARAM,language);
    link.href=url.href;
  }

  function localizeLinks(){document.querySelectorAll("a[href]").forEach(localizeLink)}

  function applyLanguage(){
    const meta=languageMeta(language);
    document.documentElement.lang=language;
    document.documentElement.dir=meta.dir;
    syncControls();
    translateTree(document.body);
    translateTitle();
    localizeLinks();
  }

  function setLanguage(next,interactive=false){
    if(!CODES.includes(next))return false;
    language=next;
    writePreference(language);
    applyLanguage();
    const detail={language,direction:languageMeta(language).dir,interactive};
    document.dispatchEvent(new CustomEvent("aurora:language-change",{detail}));
    return true;
  }

  function coverage(){
    const phrases=new Set();
    if(document.body){
      const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
      let node;
      while((node=walker.nextNode())){
        if(!node.parentElement||ignored(node.parentElement))continue;
        const phrase=normalize(originals.get(node)??node.nodeValue);
        if(/[\p{L}]/u.test(phrase))phrases.add(phrase);
      }
    }
    let translated=0;
    for(const phrase of phrases)if(language==="en"||translate(phrase)!==phrase)translated+=1;
    return {language,total:phrases.size,translated,fallback:phrases.size-translated,network:"never"};
  }

  function init(){
    applyLanguage();
    observer=new MutationObserver(records=>{
      for(const record of records){
        if(record.type==="childList")for(const node of record.addedNodes){translateTree(node);if(node.nodeType===Node.ELEMENT_NODE)node.querySelectorAll?.("a[href]").forEach(localizeLink)}
        else if(record.type==="characterData")translateText(record.target);
        else if(record.type==="attributes")translateAttributes(record.target);
      }
    });
    observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:["placeholder","aria-label","title","alt"]});
  }

  document.addEventListener("click",event=>{
    const link=event.target.closest?.("a[href]");
    if(link)localizeLink(link);
  },true);

  window.addEventListener("message",event=>{
    if(event.origin!==location.origin||event.source!==window.parent)return;
    if(event.data?.type==="aurora-language"&&CODES.includes(event.data.language))setLanguage(event.data.language);
  });

  window.AuroraLanguage=Object.freeze({
    getLanguage:()=>language,
    setLanguage,
    availableLanguages:()=>LANGUAGES.map(item=>({...item})),
    translate,
    message,
    coverage,
    refresh:applyLanguage,
    preferenceKey:KEY
  });

  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();
