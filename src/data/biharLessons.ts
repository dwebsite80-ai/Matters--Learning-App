import { Lesson, Question } from '../types';

export const BIHAR_LESSONS: Lesson[] = [
  // 1. Introduction and Formation of Bihar
  {
    id: 'lesson-bihar-1',
    topic_id: 'bihar-1',
    subject_id: 'bihar-gk',
    title: 'Introduction and Formation of Bihar',
    title_hi: 'बिहार का परिचय एवं गठन',
    subtitle: 'From Bengal Presidency to Modern Statehood',
    subtitle_hi: 'बंगाल प्रेसीडेंसी से आधुनिक राज्य गठन तक का ऐतिहासिक सफर',
    estimated_minutes: 15,
    difficulty: 'Beginner',
    hook: 'Every year on March 22nd, Bihar celebrates Bihar Diwas. But why this specific date, and how did this ancient cradle of empires transform into the modern state we see today?',
    hook_hi: 'प्रत्येक वर्ष 22 मार्च को "बिहार दिवस" मनाया जाता है। लेकिन यह तारीख इतनी महत्वपूर्ण क्यों है, और प्राचीन साम्राज्यों का यह केंद्र कैसे आधुनिक बिहार राज्य बना?',
    sections: [
      {
        title: 'Etymology and Historical Significance',
        title_hi: 'नामकरण और ऐतिहासिक पृष्ठभूमि',
        content: 'The name "Bihar" is derived from the Sanskrit and Prakrit word "Vihara", which signifies Buddhist monasteries. During the medieval era, the abundance of Buddhist viharas in the Magadha and Odantapuri regions led Persian and Muslim chroniclers to refer to the entire territory as "Vihara" or "Bihar".',
        content_hi: '"बिहार" शब्द की उत्पत्ति संस्कृत और प्राकृत के शब्द "विहार" से हुई है, जिसका अर्थ बौद्ध भिक्षुओं का निवास स्थान या मठ होता है। मध्यकाल में मगध और ओदंतपुरी क्षेत्र में बौद्ध विहारों की अधिकता के कारण इसे "बिहार" कहा जाने लगा।',
        highlight: 'Geographical Coordinates: 24°20\'10" N to 27°31\'15" N latitude and 83°19\'50" E to 88°17\'40" E longitude.',
        highlight_hi: 'भौगोलिक स्थिति: 24°20\'10" से 27°31\'15" उत्तरी अक्षांश तथा 83°19\'50" से 88°17\'40" पूर्वी देशांतर।',
        iconType: 'concept'
      },
      {
        title: 'Separation from Bengal (1912) and Orissa (1936)',
        title_hi: 'बंगाल (1912) और ओडिशा (1936) से पृथक्करण',
        content: 'Under British rule, Bihar was initially administered as part of the Bengal Presidency. Following relentless advocacy by leaders like Dr. Sachchidananda Sinha and Mahesh Narayan, the British government issued a notification on March 22, 1912, carving out Bihar and Orissa as a separate province with Patna as its capital.',
        content_hi: 'ब्रिटिश काल में बिहार पहले बंगाल प्रेसीडेंसी का हिस्सा था। डॉ. सच्चिदानंद सिन्हा और महेश नारायण जैसे नेताओं के सतत प्रयासों के बाद 22 मार्च 1912 को बिहार एवं ओडिशा को बंगाल से अलग कर नया प्रांत बनाया गया, जिसकी राजधानी पटना बनी।',
        highlight: 'On April 1, 1936, Orissa was separated from Bihar under the Government of India Act 1935.',
        highlight_hi: '1 अप्रैल 1936 को भारत शासन अधिनियम 1935 के तहत ओडिशा को बिहार से पृथक किया गया।',
        iconType: 'tip'
      },
      {
        title: 'Bifurcation of 2000 and Administrative Setup',
        title_hi: '2000 का विभाजन एवं वर्तमान प्रशासनिक ढांचा',
        content: 'On November 15, 2000, the southern mineral-rich tribal districts were separated to create the 28th state of India, Jharkhand. Today, Bihar consists of 9 Administrative Divisions, 38 Districts, 101 Sub-divisions, and 534 Community Development Blocks.',
        content_hi: '15 नवंबर 2000 को बिहार के दक्षिणी 18 खनिज बहुल जिलों को अलग कर झारखंड राज्य का गठन किया गया। वर्तमान में बिहार में 9 प्रमंडल, 38 जिले, 101 अनुमंडल और 534 प्रखंड (ब्लॉक) हैं।',
        highlight: 'State Symbols: State Tree: Peepal; State Flower: Marigold (Genda); State Animal: Gaur/Ox (Bail); State Bird: House Sparrow (Gauraiya).',
        highlight_hi: 'राज्य प्रतीक: राजकीय वृक्ष: पीपल; राजकीय पुष्प: गेंदा; राजकीय पशु: बैल (गौर); राजकीय पक्षी: घरेलू गौरैया।',
        iconType: 'warning'
      }
    ],
    practical_example: {
      scenario: 'An aspirant preparing for BPSC Prelims needs to answer questions regarding the chronological division of Bihar.',
      scenario_hi: 'बीपीएससी प्रारंभिक परीक्षा में बिहार के ऐतिहासिक विभाजन की तिथियों से संबंधित प्रश्न पूछे जाते हैं।',
      analysis: 'Key milestones: 22 March 1912 (Declaration of Bihar-Orissa province), 1 April 1912 (Effective governance), 1 April 1936 (Orissa separated), 15 Nov 2000 (Jharkhand formed on Birsa Munda’s birth anniversary).',
      analysis_hi: 'प्रमुख तिथियाँ: 22 मार्च 1912 (बंगाल से पृथक), 1 अप्रैल 1936 (ओडिशा पृथक), 15 नवंबर 2000 (झारखंड का गठन, भगवान बिरसा मुंडा की जयंती पर)।',
      actionable_tip: 'Always remember: Bihar Diwas commemorates the notification of 22 March 1912, not the 1936 or 2000 separation dates.',
      actionable_tip_hi: 'हमेशा याद रखें: 22 मार्च को बिहार दिवस 1912 की ऐतिहासिक अधिसूचना की स्मृति में मनाया जाता है।'
    },
    key_takeaways: [
      'The word Bihar originates from "Vihara" (Buddhist monasteries).',
      'Dr. Sachchidananda Sinha played a pioneer role in creating a separate Bihar province in 1912.',
      'Bihar has 38 districts across 9 administrative divisions (Patna, Tirhut, Saran, Kosi, Darbhanga, Purnia, Bhagalpur, Munger, Magadh).',
      'The state emblem features the Bodhi Tree flanked by two Swastikas.'
    ],
    key_takeaways_hi: [
      'बिहार शब्द बौद्ध मठों (विहारों) की अधिकता के कारण पड़ा।',
      'डॉ. सच्चिदानंद सिन्हा को आधुनिक बिहार के गठन का प्रमुख वास्तुकार माना जाता है।',
      'बिहार में 9 प्रमंडल और 38 जिले हैं। 38वां जिला अरवल है (जहानाबाद से अलग होकर बना)।',
      'बिहार का राजकीय चिन्ह बोधि वृक्ष है जिसके दोनों ओर दो स्वास्तिक चिन्ह हैं।'
    ]
  },

  // 2. Ancient Bihar and Magadha
  {
    id: 'lesson-bihar-2',
    topic_id: 'bihar-2',
    subject_id: 'bihar-gk',
    title: 'Ancient Bihar and Magadha',
    title_hi: 'प्राचीन बिहार और मगध साम्राज्य',
    subtitle: 'The Rise of India’s First Empire',
    subtitle_hi: 'भारत के प्रथम विशाल साम्राज्य का उत्कर्ष',
    estimated_minutes: 15,
    difficulty: 'Intermediate',
    hook: 'How did a regional power situated around the hills of Rajgir become the master of the entire Indian subcontinent? Magadha’s geography, iron reserves, and visionary monarchs changed Indian civilization forever.',
    hook_hi: 'राजगीर की पांच पहाड़ियों के बीच घिरा एक छोटा राज्य पूरे भारतीय उपमहाद्वीप का स्वामी कैसे बन गया? मगध की भौगोलिक स्थिति, लोहे की प्रचुरता और पराक्रमी शासकों ने भारतीय इतिहास को बदल दिया।',
    sections: [
      {
        title: 'Geographical Advantages of Magadha',
        title_hi: 'मगध के उत्कर्ष के भौगोलिक कारण',
        content: 'Magadha possessed strategic advantages: fertile alluvial soils watered by the Ganga, Son, and Punpun rivers; dense forests yielding timber and war elephants; and proximity to rich iron ore deposits in the Rajmahal and Chota Nagpur belts, which enabled the manufacturing of durable weapons and agricultural tools.',
        content_hi: 'मगध के पास अद्वितीय भौगोलिक लाभ थे: गंगा, सोन और पुनपुन नदियों द्वारा सिंचित उपजाऊ जलोढ़ मिट्टी; वनों से प्राप्त युद्धोपयोगी हाथी; और छोटानागपुर क्षेत्र से प्राप्त समृद्ध लौह अयस्क जिससे उन्नत हथियार और हल बनाए गए।',
        iconType: 'concept'
      },
      {
        title: 'Haryanka Dynasty: Bimbisara and Ajatashatru',
        title_hi: 'हर्यंक वंश: बिंबिसार और अजातशत्रु',
        content: 'Bimbisara (544–492 BCE) consolidated Magadha through matrimonial alliances with Kosala (Prasenjit’s sister), Lichchhavi (Chellana), and Madra. His son Ajatashatru (492–460 BCE) defeated Vaishali after a 16-year campaign using revolutionary military innovations: Mahashilakantaka (stone-throwing catapult) and Rathamusala (chariot with attached rotating blades).',
        content_hi: 'बिंबिसार (544-492 ई.पू.) ने वैवाहिक संधियों (कोशल, लिच्छवि, मद्र) द्वारा साम्राज्य विस्तार किया। उनके पुत्र अजातशत्रु ने वैशाली गणराज्य को हराने के लिए दो नए हथियारों का प्रयोग किया: महाशिलाकंटक (पत्थर फेंकने वाला यंत्र) और रथमूसल (गदायुक्त रथ)।',
        highlight: 'Ajatashatru convened the First Buddhist Council at the Saptaparni Cave in Rajgriha (483 BCE) shortly after Buddha’s Mahaparinirvana.',
        highlight_hi: 'अजातशत्रु ने 483 ई.पू. में बुद्ध के महापरिनिर्वाण के तुरंत बाद राजगृह की सप्तपर्णी गुफा में प्रथम बौद्ध संगीति आयोजित की।',
        iconType: 'tip'
      },
      {
        title: 'Shishunaga and Nanda Dynasties',
        title_hi: 'शिशुनाग और नंद वंश',
        content: 'Udayin (son of Ajatashatru) founded the city of Pataliputra at the confluence of the Ganga and Son rivers and transferred the capital from Rajgriha. Shishunaga shifted capital temporarily to Vaishali and hosted the Second Buddhist Council under Kalashoka (383 BCE). Mahapadma Nanda later established the Nanda Empire, earning the title "Ekarat" (sole sovereign).',
        content_hi: 'अजातशत्रु के पुत्र उदयन ने गंगा और सोन के संगम पर पाटलिपुत्र नगर की स्थापना की और राजधानी राजगृह से पाटलिपुत्र स्थानांतरित की। शिशुनाग वंश के कालाशोक ने 383 ई.पू. में वैशाली में द्वितीय बौद्ध संगीति आयोजित की। महापद्मनंद ने नंद वंश की नींव रखी और "एकराट" की उपाधि धारण की।',
        iconType: 'concept'
      }
    ],
    practical_example: {
      scenario: 'A BPSC question asks: "Who transferred the capital of Magadha from Rajgriha to Pataliputra?"',
      scenario_hi: 'बीपीएससी में पूछा गया प्रश्न: "मगध की राजधानी को राजगृह से पाटलिपुत्र किसने स्थानांतरित किया था?"',
      analysis: 'King Udayin (Haryanka Dynasty) recognized Pataliputra’s central riverine and commercial trade advantage.',
      analysis_hi: 'हर्यंक वंश के राजा उदयन ने पाटलिपुत्र की जल-मार्ग एवं सामरिक श्रेष्ठता को देखकर राजधानी स्थानांतरित की।',
      actionable_tip: 'Do not confuse Ajatashatru (who fortified the village Patali) with Udayin (who officially made it the capital).',
      actionable_tip_hi: 'अजातशत्रु ने पाटलि ग्राम में दुर्ग बनवाया था, जबकि उदयन ने इसे विधिवत राजधानी बनाया।'
    },
    key_takeaways: [
      'Magadha was bounded by the Ganga in the north, Son in the west, and Champa in the east.',
      'First Buddhist Council: Rajgriha (483 BCE, Chairman: Mahakassapa, Patron: Ajatashatru).',
      'Second Buddhist Council: Vaishali (383 BCE, Chairman: Sabakami, Patron: Kalashoka).',
      'Dhana Nanda was the last Nanda ruler, overthrown by Chandragupta Maurya with Chanakya’s guidance.'
    ],
    key_takeaways_hi: [
      'मगध के उत्तर में गंगा, पश्चिम में सोन और पूर्व में चंपा नदी बहती थी।',
      'प्रथम बौद्ध संगीति: राजगृह (483 ई.पू., अध्यक्ष: महाकस्सप, शासक: अजातशत्रु)।',
      'द्वितीय बौद्ध संगीति: वैशाली (383 ई.पू., अध्यक्ष: सबकामी, शासक: कालाशोक)।',
      'नंद वंश का अंतिम शासक घनानंद था, जिसे चाणक्य की सहायता से चंद्रगुप्त मौर्य ने पराजित किया।'
    ]
  },

  // 3. Maurya and Gupta Period in Bihar
  {
    id: 'lesson-bihar-3',
    topic_id: 'bihar-3',
    subject_id: 'bihar-gk',
    title: 'Maurya and Gupta Period in Bihar',
    title_hi: 'बिहार में मौर्य एवं गुप्त काल',
    subtitle: 'Pataliputra as the Imperial Heart of Asia',
    subtitle_hi: 'एशिया का साम्राज्यिक केंद्र बना पाटलिपुत्र',
    estimated_minutes: 15,
    difficulty: 'Intermediate',
    hook: 'When Megasthenes visited Pataliputra in 300 BCE, he described a sprawling wooden metropolis surrounded by a 600-foot-wide moat and 570 defensive towers. Here sat the thrones of Chandragupta, Ashoka, and Samudragupta.',
    hook_hi: 'जब 300 ई.पू. में मेगस्थनीज पाटलिपुत्र आया, तो उसने 64 फाटकों और 570 बुर्जों से घिरे एक भव्य नगर का वर्णन किया। यहीं से चंद्रगुप्त, अशोक और समुद्रगुप्त ने भारत पर शासन किया।',
    sections: [
      {
        title: 'Mauryan Administration and Pataliputra',
        title_hi: 'मौर्य प्रशासन और पाटलिपुत्र का नगर प्रबंधन',
        content: 'Chandragupta Maurya (322–298 BCE) founded the empire with the political genius of Chanakya (Kautilya), author of the Arthashastra. Megasthenes, ambassador of Seleucus Nicator, recorded in his book "Indica" that Pataliputra was administered by a civic commission of 30 members divided into 6 boards of 5 members each.',
        content_hi: 'चंद्रगुप्त मौर्य ने चाणक्य की सहायता से मौर्य साम्राज्य स्थापित किया। सेल्यूकस निकेटर के राजदूत मेगस्थनीज ने अपनी पुस्तक "इंडिका" में लिखा कि पाटलिपुत्र का नगर प्रशासन 30 सदस्यों का एक मंडल करता था, जो 5-5 सदस्यों वाली 6 समितियों में विभाजित था।',
        highlight: 'Ashoka convened the Third Buddhist Council at Pataliputra in 250 BCE under the presidency of Moggaliputta Tissa.',
        highlight_hi: 'सम्राट अशोक ने 250 ई.पू. में पाटलिपुत्र में तृतीय बौद्ध संगीति का आयोजन मोग्गलिपुत्त तिस्स की अध्यक्षता में कराया।',
        iconType: 'concept'
      },
      {
        title: 'Ashokan Inscriptions and Pillars in Bihar',
        title_hi: 'बिहार में सम्राट अशोक के प्रमुख स्तंभ एवं शिलालेख',
        content: 'Bihar is home to world-renowned Ashokan pillars: the Lauriyá Nandangarh and Lauriyá Areraj pillars in West Champaran, and the Rampurva Bull and Lion capitals. The Barabar Cave inscriptions near Jehanabad record Ashoka’s donation of rock-cut caves to the Ajivika ascetics.',
        content_hi: 'बिहार में सम्राट अशोक के प्रमुख स्तंभ स्थित हैं: लौरिया नंदनगढ़ एवं लौरिया अरेराज (पश्चिम चंपारण) तथा रामपुरवा स्तंभ (बैल एवं सिंह शीर्ष)। जहानाबाद के पास बराबर की गुफाओं में अशोक द्वारा आजीवक संप्रदाय को दान दी गई गुफाओं के अभिलेख हैं।',
        iconType: 'tip'
      },
      {
        title: 'The Golden Age: Guptas at Pataliputra',
        title_hi: 'गुप्त काल: पाटलिपुत्र में भारतीय संस्कृति का स्वर्ण युग',
        content: 'Chandragupta I assumed the title "Maharajadhiraja" and started the Gupta Era in 319–320 CE. Samudragupta, hailed by V.A. Smith as the "Napoleon of India" (recorded on the Prayag Prashasti by court poet Harisena), made Pataliputra his primary base. During Chandragupta II Vikramaditya’s reign, Chinese traveler Fa-Hien visited Pataliputra (405–411 CE).',
        content_hi: 'चंद्रगुप्त प्रथम ने 319-320 ईस्वी में गुप्त संवत चलाया और "महाराजाधिराज" की उपाधि ली। समुद्रगुप्त (भारत का नेपोलियन) का दरबारी कवि हरिषेण था। चंद्रगुप्त द्वितीय विक्रमादित्य के काल में चीनी यात्री फाह्यान (405-411 ई.) पाटलिपुत्र आया और उसने इसे "देवताओं द्वारा निर्मित नगर" कहा।',
        highlight: 'Kumaragupta I (415–455 CE) founded the premier ancient center of global higher learning: Nalanda University.',
        highlight_hi: 'कुमारगुप्त प्रथम (415-455 ई.) ने विश्व प्रसिद्ध नालंदा विश्वविद्यालय की स्थापना की।',
        iconType: 'concept'
      }
    ],
    practical_example: {
      scenario: 'A question asks: "Who built the famous ancient university at Nalanda?"',
      scenario_hi: 'परीक्षा प्रश्न: "प्राचीन नालंदा विश्वविद्यालय के संस्थापक कौन थे?"',
      analysis: 'Gupta monarch Kumaragupta I (also known as Shakraditya in Buddhist records) founded Nalanda in the 5th century CE.',
      analysis_hi: 'गुप्त सम्राट कुमारगुप्त प्रथम (बौद्ध ग्रंथों में शक्रादित्य) ने 5वीं शताब्दी ईस्वी में नालंदा विश्वविद्यालय की नींव रखी।',
      actionable_tip: 'Do not confuse Nalanda (founded by Kumaragupta I) with Vikramashila University (founded by Pala ruler Dharmapala).',
      actionable_tip_hi: 'नालंदा के संस्थापक कुमारगुप्त प्रथम थे, जबकि विक्रमशिला विश्वविद्यालय की स्थापना पाल शासक धर्मपाल ने की थी।'
    },
    key_takeaways: [
      'Chanakya served as Prime Minister under both Chandragupta Maurya and Bindusara.',
      'Third Buddhist Council was held at Pataliputra under Ashoka in 250 BCE.',
      'Barabar and Nagarjuni hill caves near Jehanabad were gifted to Ajivikas by Ashoka and his grandson Dasharatha.',
      'Aryabhata, the pioneering astronomer and mathematician who formulated zero and pi approximations, lived and calculated in Kusumapura (Pataliputra).'
    ],
    key_takeaways_hi: [
      'चाणक्य (विष्णुगुप्त) चंद्रगुप्त मौर्य और बिंदुसार दोनों के प्रधानमंत्री रहे।',
      'तृतीय बौद्ध संगीति 250 ई.पू. पाटलिपुत्र में अशोक के शासनकाल में हुई।',
      'बराबर की गुफाएं (सुदामा, कर्ण चौपड़, विश्वझोपड़ी) आजीविकों को दान दी गई थीं।',
      'महान खगोलशास्त्री व गणितज्ञ आर्यभट्ट कुसुमपुर (पाटलिपुत्र) के निवासी थे।'
    ]
  },

  // 4. Buddhism, Jainism and Important Sites
  {
    id: 'lesson-bihar-4',
    topic_id: 'bihar-4',
    subject_id: 'bihar-gk',
    title: 'Buddhism, Jainism and Important Sites',
    title_hi: 'बौद्ध धर्म, जैन धर्म एवं प्रमुख ऐतिहासिक स्थल',
    subtitle: 'The Epicenter of Spiritual Awakening',
    subtitle_hi: 'आध्यात्मिक जागृति और ज्ञान की पावन भूमि',
    estimated_minutes: 15,
    difficulty: 'Intermediate',
    hook: 'Two of the world’s greatest philosophical and ethical traditions—Buddhism and Jainism—attained their zenith and founding revelations on the soil of Bihar.',
    hook_hi: 'विश्व के दो महानतम धर्म और दर्शन—बौद्ध धर्म एवं जैन धर्म—ने बिहार की धरती पर अपने सर्वोच्च सत्य और ज्ञान की प्राप्ति की।',
    sections: [
      {
        title: 'Gautama Buddha and Bodh Gaya',
        title_hi: 'गौतम बुद्ध और बोधगया',
        content: 'Siddhartha Gautama attained supreme enlightenment (Nirvana/Bodhi) at the age of 35 beneath the sacred Bodhi Tree on the banks of the Niranjana (modern Phalgu) River in Uruvela (Bodh Gaya). The Mahabodhi Temple complex at Bodh Gaya was declared a UNESCO World Heritage Site in 2002.',
        content_hi: 'सिद्धार्थ गौतम को 35 वर्ष की आयु में उरुवेला (बोधगया) में निरंजना (फल्गु) नदी के तट पर पीपल (बोधि) वृक्ष के नीचे कैवल्य/ज्ञान प्राप्त हुआ। बोधगया का महाबोधि मंदिर 2002 में यूनेस्को विश्व धरोहर स्थल घोषित किया गया।',
        iconType: 'concept'
      },
      {
        title: 'Lord Mahavira and Jainism in Bihar',
        title_hi: 'भगवान महावीर और बिहार में जैन धर्म',
        content: 'Vardhamana Mahavira, the 24th Tirthankara, was born in 540 BCE (traditional date 599 BCE) at Kundagrama near Vaishali in the Jnatrika Kshatriya clan. He delivered his first sermon at Vipulachala Hill in Rajgir and attained Nirvana at Pavapuri (Nalanda district) around 468 BCE, where the famous marble Jal Mandir stands in the middle of a lotus pond.',
        content_hi: '24वें तीर्थंकर भगवान महावीर का जन्म 540 ई.पू. में वैशाली के निकट कुंडग्राम में ज्ञातृक क्षत्रिय कुल में हुआ था। उन्होंने प्रथम उपदेश राजगीर के विपुलचल पर्वत पर दिया और पावापुरी (नालंदा) में निर्वाण प्राप्त किया, जहाँ प्रसिद्ध जल मंदिर स्थित है।',
        highlight: 'The First Jain Council was held at Pataliputra in 300 BCE under the leadership of Sthulabhadra, compiling the 12 Angas.',
        highlight_hi: 'प्रथम जैन संगीति 300 ई.पू. में स्थूलभद्र की अध्यक्षता में पाटलिपुत्र में आयोजित हुई, जिसमें 12 अंगों का संकलन हुआ।',
        iconType: 'tip'
      },
      {
        title: 'Vaishali: The World’s First Republic',
        title_hi: 'वैशाली: विश्व का प्रथम लोकतांत्रिक गणतंत्र',
        content: 'Vaishali, the capital of the Vajjian Confederacy (Lichchhavis), is recognized by historians as the world’s earliest constitutional republic. Here, Lord Buddha delivered his last sermon, Amrapali (the royal courtesan) became a Buddhist nun, and the Relic Stupa preserved an eighth share of Buddha’s holy ashes.',
        content_hi: 'वज्जि संघ की राजधानी वैशाली को विश्व का प्रथम गणतंत्र माना जाता है। यहाँ तथागत बुद्ध ने अपना अंतिम उपदेश दिया था। प्रसिद्ध राजनर्तकी आम्रपाली यहाँ बौद्ध भिक्षुणी बनी थी।',
        iconType: 'concept'
      }
    ],
    practical_example: {
      scenario: 'A candidate encounters a question: "Where did Lord Mahavira attain Nirvana?"',
      scenario_hi: 'परीक्षा प्रश्न: "भगवान महावीर स्वामी ने निर्वाण कहाँ प्राप्त किया था?"',
      analysis: 'Pavapuri in present-day Nalanda district of Bihar.',
      analysis_hi: 'बिहार के वर्तमान नालंदा जिले में स्थित पावापुरी में।',
      actionable_tip: 'Do not confuse Kushinagar (where Gautama Buddha attained Mahaparinirvana in UP) with Pavapuri (where Mahavira attained Nirvana in Bihar).',
      actionable_tip_hi: 'कुशीनगर (उ.प्र.) में बुद्ध का महापरिनिर्वाण हुआ था, जबकि पावापुरी (बिहार) में महावीर स्वामी का निर्वाण हुआ।'
    },
    key_takeaways: [
      'Bodh Gaya: Place of Buddha’s Enlightenment; Mahabodhi Temple is a UNESCO World Heritage Site.',
      'Pavapuri: Place of Mahavira’s Nirvana with the Jal Mandir.',
      'First Jain Council took place at Pataliputra (presided by Sthulabhadra).',
      'Nalanda University Ruins was declared a UNESCO World Heritage Site in 2016.'
    ],
    key_takeaways_hi: [
      'बोधगया में बुद्ध को ज्ञान प्राप्त हुआ; महाबोधि मंदिर 2002 में यूनेस्को धरोहर बना।',
      'पावापुरी में कमल सरोवर के मध्य स्थित जल मंदिर महावीर स्वामी के निर्वाण स्थल पर बना है।',
      'प्रथम जैन संगीति पाटलिपुत्र में स्थूलभद्र के नेतृत्व में हुई थी।',
      'नालंदा महाविहार के पुरातात्विक अवशेषों को 2016 में यूनेस्को विश्व धरोहर का दर्जा मिला।'
    ]
  },

  // 5. Medieval Bihar
  {
    id: 'lesson-bihar-5',
    topic_id: 'bihar-5',
    subject_id: 'bihar-gk',
    title: 'Medieval Bihar',
    title_hi: 'मध्यकालीन बिहार: पाल वंश एवं सूरी वंश',
    subtitle: 'From the Pala Renaissance to Sher Shah’s Reforms',
    subtitle_hi: 'पाल पुनर्जागरण से शेरशाह सूरी के प्रशासनिक सुधारों तक',
    estimated_minutes: 15,
    difficulty: 'Intermediate',
    hook: 'Who minted the silver Rupiya that remains the bedrock of Indian currency today, and who constructed the Grand Trunk Road linking Bengal to Peshawar? A brilliant ruler rooted in Sasaram, Bihar: Sher Shah Suri.',
    hook_hi: 'आज की भारतीय मुद्रा "रुपिया" की शुरुआत किसने की, और बंगाल से पेशावर तक ग्रैंड ट्रंक रोड (सड़क-ए-आजम) किसने बनवाई? बिहार के सासाराम से उठे अफ़गान शासक शेरशाह सूरी ने।',
    sections: [
      {
        title: 'Pala Dynasty and Vikramashila University',
        title_hi: 'पाल राजवंश एवं विक्रमशिला विश्वविद्यालय',
        content: 'Gopala founded the Pala dynasty in 750 CE, restoring order following Matsyanyaya (anarchy). His successor Dharmapala (770–810 CE) founded Vikramashila University at Antichak (Bhagalpur district), which became the epicenter of Vajrayana Buddhism. Renowned scholar Atisha Dipankara taught here before propagating Buddhism in Tibet.',
        content_hi: 'गोपाल ने 750 ई. में पाल वंश की स्थापना की। उनके पुत्र धर्मपाल (770-810 ई.) ने भागलपुर जिले के अंतीचक में विक्रमशिला विश्वविद्यालय की स्थापना की, जो वज्रयान बौद्ध धर्म का प्रमुख केंद्र बना। यहाँ के आचार्य अतीश दीपांकर तिब्बत गए थे।',
        iconType: 'concept'
      },
      {
        title: 'Bakhtiyar Khilji and the Fall of Nalanda',
        title_hi: 'बख्तियार खिलजी का आक्रमण एवं नालंदा का विध्वंस',
        content: 'Around 1198–1200 CE, Ikhtiyar-ud-din Muhammad Bakhtiyar Khilji led a Turkic military expedition into Bihar, pillaging Odantapuri and burning the colossal nine-story library of Nalanda University (Dharmaganja: Ratnasagara, Ratnodadhi, Ratnaranjaka). Bakhtiyar established his administrative base at Bihar Sharif.',
        content_hi: '1198-1200 ईस्वी के आसपास इख्तियारुद्दीन मुहम्मद बख्तियार खिलजी ने बिहार पर आक्रमण कर ओदंतपुरी और नालंदा विश्वविद्यालय के पुस्तकालय (रत्नसागर, रत्नोदधि, रत्नरंजक) को जलाकर राख कर दिया। खिलजी ने बिहारशरीफ को अपनी राजधानी बनाया।',
        iconType: 'warning'
      },
      {
        title: 'Sher Shah Suri and His Administrative Revolution',
        title_hi: 'शेरशाह सूरी और उसकी प्रशासनिक क्रांति',
        content: 'Farid Khan, later crowned Sher Shah Suri after defeating Mughal Emperor Humayun at the Battle of Chausa (1539) and Battle of Bilgram/Kannauj (1540), ruled Delhi from 1540 to 1545. He introduced standard silver coins called "Rupiya" (178 grains) and copper "Dam" (380 grains), established a postal relay system with Sarai rest-houses, and restored Pataliputra as Patna in 1541.',
        content_hi: 'फरीद खां ने चौसा के युद्ध (1539) और कन्नौज के युद्ध (1540) में हुमायूं को हराकर शेरशाह सूरी की उपाधि से दिल्ली की गद्दी संभाली। उसने 178 ग्रेन का चांदी का "रुपिया" और तांबे का "दाम" चलाया। उसने 1541 में पाटलिपुत्र को "पटना" नाम से पुनर्स्थापित किया।',
        highlight: 'Sher Shah’s red sandstone octagonal tomb stands grandly in an artificial lake at Sasaram (Rohtas district).',
        highlight_hi: 'शेरशाह का प्रसिद्ध लाल बलुआ पत्थर से निर्मित अष्टकोणीय मकबरा सासाराम के एक कृत्रिम तालाब के बीच स्थित है।',
        iconType: 'tip'
      }
    ],
    practical_example: {
      scenario: 'A BPSC question asks: "In which year did the Battle of Chausa take place, and where is Chausa located?"',
      scenario_hi: 'परीक्षा प्रश्न: "चौसा का युद्ध किस वर्ष हुआ था और चौसा कहाँ स्थित है?"',
      analysis: 'The Battle of Chausa was fought on 26 June 1539 on the banks of the Ganga near modern Buxar district, Bihar.',
      analysis_hi: 'चौसा का युद्ध 26 जून 1539 को बिहार के बक्सर जिले के निकट गंगा नदी के तट पर लड़ा गया था।',
      actionable_tip: 'Always note: Chausa (1539) led to Sher Shah adopting the royal title "Sher Shah", followed by Kannauj/Bilgram (1540) which sealed his ascension to Delhi.',
      actionable_tip_hi: 'चौसा की जीत के बाद फरीद ने "शेरशाह" की पदवी ली और 1540 में बिलग्राम की जीत से दिल्ली पर अधिकार किया।'
    },
    key_takeaways: [
      'Vikramashila University was founded by Pala Emperor Dharmapala in Bhagalpur.',
      'Bakhtiyar Khilji destroyed Nalanda and Odantapuri around 1198–1200 CE.',
      'Sher Shah Suri reformed land revenue via the "Patta" and "Qabuliyat" system.',
      'Sher Shah’s Mausoleum at Sasaram was designed by architect Aliwal Khan.'
    ],
    key_takeaways_hi: [
      'विक्रमशिला विश्वविद्यालय के संस्थापक पाल सम्राट धर्मपाल थे।',
      'बख्तियार खिलजी ने नालंदा के विश्वप्रसिद्ध पुस्तकालय को नष्ट किया।',
      'शेरशाह ने भूमि नापजोख के लिए सिकंदरी गज (39 अंगुल) और पट्टा एवं कबूलियत प्रणाली शुरू की।',
      'सासाराम में शेरशाह के मकबरे के मुख्य वास्तुकार मीर मुहम्मद अलीवाल खां थे।'
    ]
  },

  // 6. Modern History of Bihar
  {
    id: 'lesson-bihar-6',
    topic_id: 'bihar-6',
    subject_id: 'bihar-gk',
    title: 'Modern History of Bihar',
    title_hi: 'बिहार का आधुनिक इतिहास एवं स्वतंत्रता आंदोलन',
    subtitle: 'From the Battle of Buxar to the Freedom Struggle',
    subtitle_hi: 'बक्सर के युद्ध से 1942 के भारत छोड़ो आंदोलन तक',
    estimated_minutes: 15,
    difficulty: 'Advanced',
    hook: 'Did you know that the turning point in Mahatma Gandhi’s leadership occurred in the fields of Champaran in 1917? Bihar was the laboratory where Satyagraha was tested and refined for Indian freedom.',
    hook_hi: 'क्या आप जानते हैं कि महात्मा गांधी के राष्ट्रीय नेतृत्व का सूत्रपात 1917 में चंपारण की धरती से हुआ था? बिहार वह प्रयोगशाला थी जहाँ सत्याग्रह का पहला सफल प्रयोग हुआ।',
    sections: [
      {
        title: 'Battle of Buxar (1764) and Treaty of Allahabad',
        title_hi: 'बक्सर का युद्ध (1764) एवं इलाहाबाद की संधि',
        content: 'On October 22, 1764, the British East India Company forces led by Major Hector Munro decisively defeated the combined army of Mir Qasim (Nawab of Bengal), Shuja-ud-Daula (Nawab of Awadh), and Mughal Emperor Shah Alam II at Buxar. Through the Treaty of Allahabad (1765), Shah Alam II granted the Diwani (revenue-collecting rights) of Bengal, Bihar, and Orissa to the Company.',
        content_hi: '22 अक्टूबर 1764 को हेक्टर मुनरो के नेतृत्व में ब्रिटिश सेना ने मीर कासिम, शुजाउद्दौला और मुगल बादशाह शाहआलम द्वितीय की संयुक्त सेना को बक्सर में पराजित किया। 1765 की इलाहाबाद की संधि द्वारा अंग्रेजों को बिहार, बंगाल और ओडिशा की दीवानी प्राप्त हुई।',
        iconType: 'concept'
      },
      {
        title: 'Revolt of 1857: Veer Kunwar Singh',
        title_hi: '1857 की क्रांति: बाबू वीर कुंवर सिंह',
        content: 'In Bihar, the 1857 uprising commenced in Deoghar district (Rohini village) on June 12, 1857, and Patna on July 3, 1857 (led by bookseller Pir Ali). Babu Veer Kunwar Singh, the octogenarian chieftain of Jagdishpur (Bhojpur), led the rebellion with astounding guerrilla tactics, capturing Arrah and defeating British commanders like Captain Dunbar, Vincent Eyre, and Le Grand.',
        content_hi: 'बिहार में 1857 की क्रांति की शुरुआत 12 जून को रोहिणी (देवघर) से हुई और पटना में 3 जुलाई को पीर अली ने नेतृत्व किया। जगदीशपुर (भोजपुर) के 80 वर्षीय वीर कुंवर सिंह ने अदम्य साहस दिखाते हुए आरा पर अधिकार किया और कैप्टन ली ग्रैंड की ब्रिटिश सेना को परास्त किया।',
        highlight: 'Kunwar Singh breathed his last on April 26, 1858, undefeated in battle, after hoisting his independent flag over Jagdishpur.',
        highlight_hi: 'वीर कुंवर सिंह 26 अप्रैल 1858 को स्वतंत्र जगदीशपुर में अपना विजय ध्वज फहराने के बाद वीरगति को प्राप्त हुए।',
        iconType: 'tip'
      },
      {
        title: 'Champaran Satyagraha (1917) and 1942 Movement',
        title_hi: 'चंपारण सत्याग्रह (1917) एवं 1942 का भारत छोड़ो आंदोलन',
        content: 'Raj Kumar Shukla persistently convinced Gandhiji at the Lucknow Congress session (1916) to visit Champaran to protest the coercive Tinkathia system (compulsory cultivation of indigo on 3/20th of land). During the Quit India Movement (1942), 7 student martyrs sacrificed their lives outside Patna Secretariat on August 11, 1942, while attempting to unfurl the Tricolour.',
        content_hi: '1916 के लखनऊ कांग्रेस अधिवेशन में राजकुमार शुक्ल के अनुरोध पर गांधीजी 1917 में चंपारण पहुंचे और तिनकठिया पद्धति (3/20 भाग पर नील की खेती) के विरुद्ध देश का पहला सफल सत्याग्रह किया। 1942 के भारत छोड़ो आंदोलन में 11 अगस्त 1942 को पटना सचिवालय पर तिरंगा फहराते हुए 7 छात्र शहीद हुए।',
        iconType: 'concept'
      }
    ],
    practical_example: {
      scenario: 'A BPSC Prelims question asks: "Who invited Mahatma Gandhi to Champaran to investigate peasant grievances?"',
      scenario_hi: 'बीपीएससी प्रश्न: "चंपारण के किसानों की समस्याओं की जांच के लिए गांधीजी को किसने आमंत्रित किया था?"',
      analysis: 'Pandit Raj Kumar Shukla, a local farmer-leader from Murali Bharhawa village in Champaran.',
      analysis_hi: 'चंपारण के मुरली भरहवा गाँव के जुझारू किसान नेता पंडित राजकुमार शुक्ल ने।',
      actionable_tip: 'Remember that J.B. Kripalani, Dr. Rajendra Prasad, and Anugrah Narayan Sinha accompanied Gandhiji in Champaran.',
      actionable_tip_hi: 'चंपारण जांच के दौरान गांधीजी के साथ डॉ. राजेंद्र प्रसाद, जे.बी. कृपलानी और अनुग्रह नारायण सिन्हा प्रमुख रूप से साथ रहे।'
    },
    key_takeaways: [
      'Battle of Buxar took place on 22 October 1764.',
      'Veer Kunwar Singh of Jagdishpur was the foremost hero of the 1857 Revolt in Bihar.',
      'Champaran Satyagraha in 1917 ended the Tinkathia system; Rabindranath Tagore conferred the title "Mahatma" on Gandhi after this success.',
      'Patna Secretariat Martyr Memorial commemorates the 7 brave youths of August 11, 1942.'
    ],
    key_takeaways_hi: [
      'बक्सर का निर्णायक युद्ध 22 अक्टूबर 1764 को हुआ।',
      'जगदीशपुर के बाबू वीर कुंवर सिंह 1857 के महासंग्राम के प्रमुख नायक थे।',
      '1917 के चंपारण सत्याग्रह की सफलता के बाद रवींद्रनाथ टैगोर ने गांधीजी को "महात्मा" की उपाधि दी।',
      '11 अगस्त 1942 के पटना सचिवालय गोलीकांड के 7 अमर शहीदों की स्मृति में शहीद स्मारक बना है।'
    ]
  },

  // 7. Geography of Bihar
  {
    id: 'lesson-bihar-7',
    topic_id: 'bihar-7',
    subject_id: 'bihar-gk',
    title: 'Geography of Bihar',
    title_hi: 'बिहार का भूगोल: भू-आकृति एवं जलवायु',
    subtitle: 'Physiography, Soils, and Climatic Zones',
    subtitle_hi: 'भू-आकृति, मृदा वर्गीकरण एवं जलवायु क्षेत्र',
    estimated_minutes: 15,
    difficulty: 'Intermediate',
    hook: 'Wedged between the foothills of the Himalayas in the north and the Chota Nagpur plateau in the south, Bihar forms an extraordinary alluvial trough created by millions of years of river siltation.',
    hook_hi: 'उत्तर में हिमालय की तराई और दक्षिण में छोटानागपुर पठार के बीच फैला बिहार गंगा नदी की लाई गई उपजाऊ जलोढ़ मिट्टी से निर्मित एक अद्भुत मैदान है।',
    sections: [
      {
        title: 'Geographical Extent and Boundaries',
        title_hi: 'भौगोलिक विस्तार एवं सीमाएं',
        content: 'Bihar is a landlocked state with an area of 94,163 sq km (12th largest in India by area, 3rd by population). It borders Nepal in the north (international border along 7 districts: West Champaran, East Champaran, Sitamarhi, Madhubani, Supaul, Araria, Kishanganj), Uttar Pradesh in the west (8 districts), Jharkhand in the south (8 districts), and West Bengal in the east (3 districts: Kishanganj, Purnia, Katihar).',
        content_hi: 'बिहार 94,163 वर्ग किमी क्षेत्रफल में फैला पूर्णतः भू-आवेष्ठित राज्य है। इसकी सीमा उत्तर में नेपाल (7 जिले: पश्चिम चंपारण, पूर्वी चंपारण, सीतामढ़ी, मधुबनी, सुपौल, अररिया, किशनगंज), पश्चिम में उत्तर प्रदेश (8 जिले), दक्षिण में झारखंड (8 जिले) और पूर्व में पश्चिम बंगाल (3 जिले: किशनगंज, पूर्णिया, कटिहार) से लगती है।',
        iconType: 'concept'
      },
      {
        title: 'Physiographic Divisions',
        title_hi: 'बिहार के भौतिक विभाजन',
        content: 'Bihar is classified into three physical divisions: 1) Shivalik Hilly Region in the northwest (Someshwar Range: highest peak at 874 m, Ramnagar Dun, and Dun Valley in West Champaran); 2) Vast Bihar Plain (occupying ~95% of total area, subdivided by the Ganga into North Bihar Plain and South Bihar Plain); and 3) Southern Hilly/Plateau Fringe (Kaimur Plateau of Vindhyan rocks and Kharagpur Hills of Dharwar rocks).',
        content_hi: 'बिहार के तीन भौतिक प्रभाग हैं: 1) शिवालिक पर्वतीय क्षेत्र (पश्चिम चंपारण में सोमेश्वर श्रेणी: सर्वोच्च चोटी 874 मीटर, रामनगर दून); 2) बिहार का विशाल मैदान (उत्तरी एवं दक्षिणी गंगा का मैदान); 3) दक्षिणी सीमांत पठारी क्षेत्र (कैमूर का विंध्यन पठार एवं खड़गपुर की धारवाड़ पहाड़ियाँ)।',
        highlight: 'Highest peak of Bihar: Someshwar Fort Peak (874 meters / 2,884 ft) in West Champaran.',
        highlight_hi: 'बिहार की सबसे ऊँची चोटी: सोमेश्वर किला चोटी (874 मीटर), पश्चिम चंपारण में।',
        iconType: 'tip'
      },
      {
        title: 'Climate and Rainfall Patterns',
        title_hi: 'जलवायु एवं वर्षा का स्वरूप',
        content: 'Bihar experiences a Subtropical Monsoon climate (Koppen: Cwg). The southwest monsoon arrives around June 10–15 via the Bay of Bengal branch. Kishanganj district receives the highest annual rainfall (>2000 mm), while Gaya and Aurangabad experience extreme temperatures (hottest in summer and coldest in winter).',
        content_hi: 'बिहार की जलवायु उपोष्णकटिबंधीय मानसूनी (कोपेन वर्गीकरण: Cwg) है। बंगाल की खाड़ी शाखा से 10-15 जून के आसपास मानसून का प्रवेश होता है। किशनगंज जिले में सर्वाधिक वर्षा (>2000 मिमी) होती है, जबकि गया जिला सबसे गर्म और सबसे ठंडा जिला है।',
        iconType: 'concept'
      }
    ],
    practical_example: {
      scenario: 'A BPSC question asks: "Which district of Bihar receives the maximum rainfall?"',
      scenario_hi: 'बीपीएससी परीक्षा प्रश्न: "बिहार के किस जिले में सर्वाधिक औसत वार्षिक वर्षा दर्ज की जाती है?"',
      analysis: 'Kishanganj district in north-eastern Bihar, being closest to the Bay of Bengal monsoon branch and sub-Himalayan front.',
      analysis_hi: 'पूर्वोत्तर बिहार में स्थित किशनगंज जिला, जो बंगाल की खाड़ी के मानसूनी बादलों के सर्वाधिक निकट है।',
      actionable_tip: 'Lowest rainfall district is Aurangabad/Arwal, while highest is Kishanganj.',
      actionable_tip_hi: 'न्यूनतम वर्षा वाला जिला औरंगाबाद/अरवल है, जबकि सर्वाधिक वर्षा किशनगंज में होती है।'
    },
    key_takeaways: [
      'Total area of Bihar: 94,163 sq km, accounting for 2.86% of India’s geographical area.',
      'Someshwar Range in West Champaran is the highest elevation (874 meters).',
      '7 districts border Nepal, 8 border UP, 8 border Jharkhand, and 3 border West Bengal.',
      'Kishanganj is the wettest district; Gaya is the hottest and coldest district.'
    ],
    key_takeaways_hi: [
      'बिहार का कुल क्षेत्रफल 94,163 वर्ग किमी है, जो भारत के कुल क्षेत्रफल का 2.86% है।',
      'पश्चिम चंपारण की सोमेश्वर श्रेणी बिहार की सर्वोच्च पर्वत चोटी (874 मीटर) है।',
      'नेपाल से 7 जिले, यूपी से 8 जिले, झारखंड से 8 जिले और पश्चिम बंगाल से 3 जिले सीमा साझा करते हैं।',
      'किशनगंज सर्वाधिक वर्षा वाला तथा गया सबसे गर्म एवं सबसे ठंडा जिला है।'
    ]
  },

  // 8. Rivers, Agriculture and Natural Resources
  {
    id: 'lesson-bihar-8',
    topic_id: 'bihar-8',
    subject_id: 'bihar-gk',
    title: 'Rivers, Agriculture and Natural Resources',
    title_hi: 'बिहार की नदियाँ, कृषि एवं प्राकृतिक संसाधन',
    subtitle: 'Drainage Systems, Agro-Climatic Zones, and Water Wealth',
    subtitle_hi: 'अपवाह तंत्र, कृषि जलवायु क्षेत्र और जल संसाधन',
    estimated_minutes: 15,
    difficulty: 'Intermediate',
    hook: 'The Ganga enters Bihar at Chausa (Buxar) and traverses 445 km through 12 districts before flowing into Bengal. But why is the Kosi River called the "Sorrow of Bihar"?',
    hook_hi: 'गंगा नदी चौसा (बक्सर) में बिहार में प्रवेश करती है और 12 जिलों से होकर 445 किमी बहती है। लेकिन कोसी नदी को "बिहार का शोक" क्यों कहा जाता है?',
    sections: [
      {
        title: 'River Systems of Bihar',
        title_hi: 'बिहार का अपवाह तंत्र (नदी प्रणाली)',
        content: 'The Ganga divides the state into two unequal halves. North-bank Himalayan tributaries include Ghaghara, Gandak (joins at Sonpur/Hajipur), Burhi Gandak, Bagmati, Kamla, Kosi (known for unpredictable avulsions and frequent course changes), and Mahananda. South-bank plateau tributaries include Son (originates at Amarkantak, joins near Maner/Patna), Punpun (joins at Fatuha), Phalgu, Kiul, and Chandan.',
        content_hi: 'गंगा नदी बिहार को दो भागों में बांटती है। उत्तर तट की नदियाँ (हिमालयी): घाघरा, गंडक (सोनपुर में संगम), बूढ़ी गंडक, बागमती, कमला, कोसी (मार्ग परिवर्तन के लिए कुख्यात "बिहार का शोक"), और महानंदा। दक्षिण तट की नदियाँ: सोन (अमरकंटक से उद्गम, मनेर के पास गंगा में संगम), पुनपुन (फतुहा में संगम), फल्गु, क्यूल और चंदन।',
        iconType: 'concept'
      },
      {
        title: 'Agro-Climatic Zones and Major Crops',
        title_hi: 'कृषि जलवायु क्षेत्र एवं प्रमुख फसलें',
        content: 'Bihar is divided into 3 Agro-Climatic Zones: Zone I (North-West Alluvial: sugarcane, rice, maize); Zone II (North-East Alluvial: jute, makhana, pineapple); Zone III (South Alluvial: pulses, wheat, oilseeds). Bihar is the undisputed global leader in Foxnut (Makhana) production, centered in Mithila, with the coveted Mithila Makhana GI tag.',
        content_hi: 'बिहार 3 कृषि जलवायु क्षेत्रों में विभाजित है: जोन I (उत्तर-पश्चिम: गन्ना, धान, मक्का); जोन II (उत्तर-पूर्व: जूट, मखाना, अनानास); जोन III (दक्षिण बिहार: दलहन, गेहूं, तिलहन)। बिहार दुनिया के 85% से अधिक मखाना का उत्पादन करता है (मिथिला मखाना को GI टैग प्राप्त है)।',
        highlight: 'GI Tagged Agricultural Products: Shahi Litchi (Muzaffarpur), Katarni Rice (Bhagalpur), Zardalu Mango (Bhagalpur), Magahi Paan, and Mithila Makhana.',
        highlight_hi: 'प्रमुख कृषि GI टैग: शाही लीची (मुजफ्फरपुर), कतरनी चावल (भागलपुर), जर्दालु आम (भागलपुर), मगही पान एवं मिथिला मखाना।',
        iconType: 'tip'
      },
      {
        title: 'Forest Cover and Wildlife Sanctuaries',
        title_hi: 'वन आवरण एवं वन्यजीव अभयारण्य',
        content: 'As per the India State of Forest Report (ISFR 2021), Bihar has 7,380.79 sq km of forest cover (7.84% of geographical area). Kaimur has the highest forest area, while Sheikhpura has the lowest. Valmiki National Park in West Champaran is Bihar’s solitary Tiger Reserve. Kanwar Lake (Kabartal) in Begusarai is Bihar’s first Ramsar wetland site.',
        content_hi: 'भारत वन स्थिति रिपोर्ट (ISFR 2021) के अनुसार बिहार में वन आवरण 7,380.79 वर्ग किमी (7.84%) है। कैमूर जिले में सर्वाधिक वन क्षेत्र है, जबकि शेखपुरा में सबसे कम। पश्चिम चंपारण का वाल्मीकि राष्ट्रीय उद्यान बिहार का एकमात्र टाइगर रिजर्व है। बेगूसराय की कावर झील (काबरताल) बिहार का प्रथम रामसर स्थल है।',
        iconType: 'concept'
      }
    ],
    practical_example: {
      scenario: 'A student is asked: "Through how many districts of Bihar does the River Ganga flow?"',
      scenario_hi: 'परीक्षा प्रश्न: "गंगा नदी बिहार के कितने जिलों से होकर प्रवाहित होती है?"',
      analysis: 'The Ganga flows through exactly 12 districts: Buxar, Bhojpur, Saran, Patna, Vaishali, Samastipur, Begusarai, Lakhisarai, Munger, Khagaria, Bhagalpur, and Katihar.',
      analysis_hi: 'गंगा नदी कुल 12 जिलों से गुजरती है: बक्सर, भोजपुर, सारण, पटना, वैशाली, समस्तीपुर, बेगूसराय, लखीसराय, मुंगेर, खगड़िया, भागलपुर और कटिहार।',
      actionable_tip: 'Patna district has the longest stretch of the Ganga river (~99 km).',
      actionable_tip_hi: 'पटना जिले में गंगा नदी की लंबाई सर्वाधिक (लगभग 99 किमी) है।'
    },
    key_takeaways: [
      'Ganga traverses 445 km across 12 districts in Bihar.',
      'Valmiki Tiger Reserve is in West Champaran; Vikramshila Gangetic Dolphin Sanctuary is in Bhagalpur.',
      'Kabartal (Begusarai) was designated as Bihar’s 39th Indian Ramsar Site.',
      'Son River joins the Ganga near Maner; Punpun joins at Fatuha.'
    ],
    key_takeaways_hi: [
      'गंगा नदी बिहार में 445 किमी बहती है और 12 जिलों को स्पर्श करती है।',
      'वाल्मीकि टाइगर रिजर्व पश्चिम चंपारण में और विक्रमशिला गांगेय डॉल्फ़िन अभयारण्य भागलपुर में है।',
      'बेगूसराय का काबरताल पक्षी अभयारण्य बिहार का प्रथम रामसर स्थल है।',
      'सोन नदी मनेर के पास और पुनपुन नदी फतुहा के पास गंगा में मिलती है।'
    ]
  },

  // 9. Economy, Industries and Development
  {
    id: 'lesson-bihar-9',
    topic_id: 'bihar-9',
    subject_id: 'bihar-gk',
    title: 'Economy, Industries and Development',
    title_hi: 'बिहार की अर्थव्यवस्था, उद्योग एवं आर्थिक विकास',
    subtitle: 'Growth Drivers, Industrial Policy, and Key Infrastructure',
    subtitle_hi: 'सकल घरेलू उत्पाद, औद्योगिक नीतियां एवं ढांचागत विकास',
    estimated_minutes: 15,
    difficulty: 'Intermediate',
    hook: 'Despite historical setbacks following the loss of mineral belts in 2000, Bihar has repeatedly clocked double-digit GSDP growth rates driven by services, roads, and agro-processing.',
    hook_hi: '2000 में खनिज बहुल क्षेत्रों के अलग होने के बावजूद बिहार ने सड़कों, सेवा क्षेत्र और कृषि प्रसंस्करण के दम पर लगातार दोहरे अंकों में विकास दर दर्ज की है।',
    sections: [
      {
        title: 'Structure of the Economy (GSDP)',
        title_hi: 'बिहार की अर्थव्यवस्था की संरचना (GSDP)',
        content: 'According to recent Bihar Economic Surveys, the Tertiary (Services) sector contributes around 60% of Gross State Value Added (GSVA), followed by the Primary sector (Agriculture, Forestry, Livestock ~20%) and Secondary sector (Manufacturing & Construction ~20%). Patna district has the highest per capita income, whereas Sheohar has the lowest.',
        content_hi: 'बिहार आर्थिक सर्वेक्षण के अनुसार राज्य के सकल राज्य मूल्यवर्धन (GSVA) में सेवा क्षेत्र (तृतीयक) का योगदान लगभग 60%, प्राथमिक क्षेत्र (कृषि एवं पशुपालन) का ~20% और द्वितीयक क्षेत्र (विनिर्माण एवं निर्माण) का ~20% है। प्रति व्यक्ति आय में पटना जिला शीर्ष पर तथा शिवहर सबसे निचले स्थान पर है।',
        iconType: 'concept'
      },
      {
        title: 'Ethanol and Agro-Processing Revolution',
        title_hi: 'एथेनॉल एवं कृषि आधारित उद्योग नीति',
        content: 'Bihar became the first state in India to announce an Ethanol Promotion Policy in 2021. The state’s first grain-based greenfield ethanol plant was inaugurated at Purnia in April 2022. Jute manufacturing is clustered in Purnia and Katihar, silk weaving in Bhagalpur (famed as the "Silk City"), and tea processing in Kishanganj.',
        content_hi: 'बिहार 2021 में "एथेनॉल उत्पादन संवर्धन नीति" लागू करने वाला देश का पहला राज्य बना। अप्रैल 2022 में पूर्णिया में देश के पहले ग्रीनफील्ड अनाज-आधारित एथेनॉल संयंत्र का उद्घाटन हुआ। भागलपुर को "सिल्क सिटी" के रूप में जाना जाता है, जबकि किशनगंज चाय उत्पादन के लिए प्रसिद्ध है।',
        iconType: 'tip'
      },
      {
        title: 'Infrastructure and Power Growth',
        title_hi: 'ढांचागत विकास एवं ऊर्जा क्षेत्र',
        content: 'Bihar has built extensive road connectivity under the Mukhyamantri Gram Sampark Yojana and expanded super-expressways (Amritsar-Kolkata Industrial Corridor, Raxaul-Haldia Expressway). In energy, major thermal plants operate at Barh, Kahalgaon (NTPC), and Nabinagar (Aurangabad).',
        content_hi: 'मुख्यमंत्री ग्राम संपर्क योजना से ग्रामीण सड़कों का कायाकल्प हुआ है। ऊर्जा क्षेत्र में बाढ़ (Barh Super Thermal), कहलगांव (भागलपुर) और नबीनगर (औरंगाबाद) में विशाल विद्युत ताप परियोजनाएं संचालित हैं।',
        highlight: 'Bhagalpur is globally renowned for its indigenous Tussar Silk and Ahimsa Silk.',
        highlight_hi: 'भागलपुर अपने प्रसिद्ध तसर रेशम एवं हथकरघा वस्त्रों के लिए "सिल्क सिटी" कहलाता है।',
        iconType: 'concept'
      }
    ],
    practical_example: {
      scenario: 'A BPSC question asks: "Which is the first state in India to implement an Ethanol Promotion Policy?"',
      scenario_hi: 'बीपीएससी प्रश्न: "एथेनॉल उत्पादन संवर्धन नीति लागू करने वाला भारत का पहला राज्य कौन सा है?"',
      analysis: 'Bihar, which promulgated the policy in 2021 to encourage grain/sugarcane-based biofuel refineries.',
      analysis_hi: 'बिहार राज्य, जिसने 2021 में पहली बार अनाज एवं मक्का/गन्ना आधारित एथेनॉल नीति की घोषणा की।',
      actionable_tip: 'The first operational greenfield plant was established in Parora (Purnia).',
      actionable_tip_hi: 'पहला ग्रीनफील्ड एथेनॉल प्लांट पूर्णिया के परोरा में स्थापित किया गया।'
    },
    key_takeaways: [
      'Tertiary sector accounts for ~60% of Bihar’s GSVA.',
      'Bihar is India’s pioneer state in launching an Ethanol Promotion Policy (2021).',
      'Bhagalpur is known as the "Silk City" of Bihar.',
      'Patna has the highest per capita Gross District Domestic Product (GDDP).'
    ],
    key_takeaways_hi: [
      'बिहार के जीएसवीए में सेवा क्षेत्र का योगदान सर्वाधिक (~60%) है।',
      'एथेनॉल प्रमोशन पॉलिसी 2021 लाने वाला बिहार भारत का पहला राज्य है।',
      'भागलपुर को बिहार की "सिल्क सिटी" कहा जाता है।',
      'प्रति व्यक्ति आय में पटना जिला सबसे आगे तथा शिवहर जिला सबसे पीछे है।'
    ]
  },

  // 10. Important Personalities, Administration and Government Schemes
  {
    id: 'lesson-bihar-10',
    topic_id: 'bihar-10',
    subject_id: 'bihar-gk',
    title: 'Important Personalities, Administration and Government Schemes',
    title_hi: 'प्रमुख विभूतियाँ, प्रशासनिक व्यवस्था एवं जनकल्याणकारी योजनाएं',
    subtitle: 'Legendary Leaders, Seven Resolves (Saat Nischay), and Good Governance',
    subtitle_hi: 'महान विभूतियाँ, सात निश्चय योजना और सुशासन',
    estimated_minutes: 15,
    difficulty: 'Advanced',
    hook: 'From India’s first President Dr. Rajendra Prasad to Lok Nayak Jayaprakash Narayan, Bihar’s visionaries shaped the destiny of modern democratic India.',
    hook_hi: 'भारत के प्रथम राष्ट्रपति डॉ. राजेंद्र प्रसाद से लेकर संपूर्ण क्रांति के प्रणेता लोकनायक जयप्रकाश नारायण तक, बिहार की विभूतियों ने आधुनिक भारत के निर्माण में मार्गदर्शक भूमिका निभाई।',
    sections: [
      {
        title: 'Eminent Historical and Cultural Personalities',
        title_hi: 'बिहार की महान ऐतिहासिक विभूतियाँ',
        content: 'Dr. Rajendra Prasad (born in Ziradei, Siwan) served as President of the Constituent Assembly and India’s first President (1950–1962). Jayaprakash Narayan (Lok Nayak) launched the "Total Revolution" (Sampoorna Kranti) movement in 1974 at Gandhi Maidan, Patna. Rashtrakavi Ramdhari Singh Dinkar (born in Simaria, Begusarai) penned monumental poetic works like Rashmirathi and Urvashi. Bismillah Khan (born in Dumraon, Buxar) was awarded the Bharat Ratna for his shehnai virtuosity.',
        content_hi: 'डॉ. राजेंद्र प्रसाद (जीरादेई, सीवान) संविधान सभा के स्थायी अध्यक्ष एवं स्वतंत्र भारत के प्रथम राष्ट्रपति रहे। लोकनायक जयप्रकाश नारायण ने 1974 में पटना के गांधी मैदान से "संपूर्ण क्रांति" का आह्वान किया। राष्ट्रकवि रामधारी सिंह दिनकर (सिमरिया, बेगूसराय) ने रश्मिरथी और उर्वशी की रचना की। शहनाई नवाज बिस्मिल्लाह खां (डुमरांव, बक्सर) को भारत रत्न मिला।',
        iconType: 'concept'
      },
      {
        title: 'Saat Nischay-II (Seven Resolves for Good Governance)',
        title_hi: 'बिहार सरकार का "सात निश्चय-2" (2020-2025)',
        content: 'Launched to spearhead systemic development, Saat Nischay Part-2 comprises 7 pillars: 1) Yuva Shakti - Bihar ki Pragati; 2) Sashakt Mahila - Saksham Mahila; 3) Har Khet Tak Sinchai Ka Pani; 4) Swachh Gaon - Samriddh Gaon; 5) Swachh Shahar - Viksit Shahar; 6) Sulabh Samparkata; and 7) Sabke Liye Atirikt Swasthya Suvidha.',
        content_hi: 'सात निश्चय-2 (2020-2025) के 7 प्रमुख स्तंभ: 1) युवा शक्ति - बिहार की प्रगति; 2) सशक्त महिला - सक्षम महिला; 3) हर खेत तक सिंचाई का पानी; 4) स्वच्छ गांव - समृद्ध गांव; 5) स्वच्छ शहर - विकसित शहर; 6) सुलभ संपर्कता; 7) सबके लिए अतिरिक्त स्वास्थ्य सुविधा।',
        highlight: 'Bihar was the first state in India to grant 50% reservation to women in Panchayati Raj Institutions (in 2006).',
        highlight_hi: 'बिहार पंचायती राज संस्थाओं में महिलाओं को 50% आरक्षण देने वाला देश का पहला राज्य (2006 में) बना।',
        iconType: 'tip'
      },
      {
        title: 'Legislature and Administrative Hierarchy',
        title_hi: 'राज्य विधानमंडल एवं प्रशासनिक संरचना',
        content: 'Bihar has a Bicameral Legislature consisting of the Legislative Assembly (Vidhan Sabha: 243 seats) and Legislative Council (Vidhan Parishad: 75 seats). In Parliament, Bihar sends 40 Members to the Lok Sabha and 16 Members to the Rajya Sabha. Six Lok Sabha seats are reserved for Scheduled Castes (SC).',
        content_hi: 'बिहार में द्विसदनीय विधानमंडल है: विधानसभा (243 सीटें) और विधान परिषद (75 सीटें)। संसद में बिहार से 40 लोकसभा सदस्य और 16 राज्यसभा सदस्य चुने जाते हैं। लोकसभा में 6 सीटें अनुसूचित जाति (SC) के लिए आरक्षित हैं (गोपालगंज, हाजीपुर, समस्तीपुर, सासाराम, गया, जमुई)।',
        iconType: 'concept'
      }
    ],
    practical_example: {
      scenario: 'A BPSC question asks: "How many Lok Sabha seats in Bihar are reserved for Scheduled Castes (SC)?"',
      scenario_hi: 'बीपीएससी प्रश्न: "बिहार में लोकसभा की कितनी सीटें अनुसूचित जाति (SC) के लिए आरक्षित हैं?"',
      analysis: 'Out of 40 Lok Sabha seats in Bihar, exactly 6 seats are reserved for SC candidates.',
      analysis_hi: 'बिहार की कुल 40 लोकसभा सीटों में से 6 सीटें अनुसूचित जाति के लिए आरक्षित हैं।',
      actionable_tip: 'The 6 reserved SC constituencies are Gopalganj, Hajipur, Samastipur, Sasaram, Gaya, and Jamui.',
      actionable_tip_hi: 'ये 6 आरक्षित सीटें हैं: गोपालगंज, हाजीपुर, समस्तीपुर, सासाराम, गया और जमुई।'
    },
    key_takeaways: [
      'Dr. Rajendra Prasad was born in Ziradei village, Siwan.',
      'Bihar Vidhan Sabha has 243 seats, Vidhan Parishad has 75 seats, Lok Sabha has 40, Rajya Sabha has 16.',
      'Saat Nischay-II guides modern state infrastructure and human development policy.',
      'First Chief Minister of Bihar was Dr. Sri Krishna Sinha (Sri Babu); first Governor was Jairamdas Daulatram.'
    ],
    key_takeaways_hi: [
      'डॉ. राजेंद्र प्रसाद का जन्म सीवान जिले के जीरादेई गाँव में हुआ था।',
      'बिहार में 243 विधानसभा, 75 विधान परिषद, 40 लोकसभा और 16 राज्यसभा सीटें हैं।',
      'सात निश्चय-2 राज्य के सर्वांगीण विकास का प्रमुख नीतिगत ढांचा है।',
      'बिहार के प्रथम मुख्यमंत्री डॉ. श्रीकृष्ण सिंह (श्री बाबू) तथा प्रथम राज्यपाल जयरामदास दौलतराम थे।'
    ]
  }
];

export const BIHAR_QUESTIONS: Question[] = [
  // Lesson 1 (bihar-1) Questions
  {
    id: 'q-bihar-1-1',
    lesson_id: 'lesson-bihar-1',
    subject_id: 'bihar-gk',
    question: 'On which date was the notification for creating Bihar and Orissa as a separate province issued?',
    question_hi: 'बिहार एवं ओडिशा को अलग प्रांत बनाने की ऐतिहासिक अधिसूचना किस तिथि को जारी की गई थी?',
    option_a: '15 August 1947',
    option_a_hi: '15 अगस्त 1947',
    option_b: '22 March 1912',
    option_b_hi: '22 मार्च 1912',
    option_c: '1 April 1936',
    option_c_hi: '1 अप्रैल 1936',
    option_d: '15 November 2000',
    option_d_hi: '15 नवंबर 2000',
    correct_answer: 'B',
    explanation: 'Bihar Diwas is celebrated on March 22nd commemorating the 1912 proclamation separating Bihar and Orissa from Bengal.',
    explanation_hi: '22 मार्च 1912 को बंगाल से अलग प्रांत बनाने की घोषणा हुई, इसलिए 22 मार्च को बिहार दिवस मनाया जाता है।'
  },
  {
    id: 'q-bihar-1-2',
    lesson_id: 'lesson-bihar-1',
    subject_id: 'bihar-gk',
    question: 'Who among the following was the foremost pioneer in the campaign for a separate Bihar province?',
    question_hi: 'पृथक बिहार प्रांत के गठन के आंदोलन के प्रमुख अग्रदूत निम्नलिखित में से कौन थे?',
    option_a: 'Dr. Sachchidananda Sinha',
    option_a_hi: 'डॉ. सच्चिदानंद सिन्हा',
    option_b: 'Kunwar Singh',
    option_b_hi: 'कुंवर सिंह',
    option_c: 'Jayaprakash Narayan',
    option_c_hi: 'जयप्रकाश नारायण',
    option_d: 'Dr. Rajendra Prasad',
    option_d_hi: 'डॉ. राजेंद्र प्रसाद',
    correct_answer: 'A',
    explanation: 'Dr. Sachchidananda Sinha and Mahesh Narayan spearheaded the movement to separate Bihar from the Bengal Presidency.',
    explanation_hi: 'डॉ. सच्चिदानंद सिन्हा और महेश नारायण ने बिहार को अलग राज्य बनाने के लिए प्रभावी नेतृत्व प्रदान किया।'
  },
  {
    id: 'q-bihar-1-3',
    lesson_id: 'lesson-bihar-1',
    subject_id: 'bihar-gk',
    question: 'What is the official State Bird of Bihar?',
    question_hi: 'बिहार का राजकीय पक्षी कौन सा है?',
    option_a: 'Peacock',
    option_a_hi: 'मोर',
    option_b: 'House Sparrow (Gauraiya)',
    option_b_hi: 'घरेलू गौरैया',
    option_c: 'Pigeon',
    option_c_hi: 'कबूतर',
    option_d: 'Indian Roller (Neelkanth)',
    option_d_hi: 'नीलकंठ',
    correct_answer: 'B',
    explanation: 'The House Sparrow (Passer domesticus) is the state bird of Bihar, celebrated with special awareness programs.',
    explanation_hi: 'घरेलू गौरैया बिहार की राजकीय पक्षी है, जिसके संरक्षण के लिए प्रतिवर्ष 20 मार्च को गौरैया दिवस मनाया जाता है।'
  },
  {
    id: 'q-bihar-1-4',
    lesson_id: 'lesson-bihar-1',
    subject_id: 'bihar-gk',
    question: 'How many administrative divisions (Pramandals) are there in modern Bihar?',
    question_hi: 'वर्तमान बिहार राज्य में कुल कितने प्रशासनिक प्रमंडल हैं?',
    option_a: '7',
    option_a_hi: '7',
    option_b: '9',
    option_b_hi: '9',
    option_c: '12',
    option_c_hi: '12',
    option_d: '38',
    option_d_hi: '38',
    correct_answer: 'B',
    explanation: 'Bihar has 9 administrative divisions: Patna, Tirhut, Saran, Kosi, Darbhanga, Purnia, Bhagalpur, Munger, and Magadh.',
    explanation_hi: 'बिहार में 9 प्रमंडल और 38 जिले हैं।'
  },
  {
    id: 'q-bihar-1-5',
    lesson_id: 'lesson-bihar-1',
    subject_id: 'bihar-gk',
    question: 'In which year was the state of Jharkhand carved out of southern Bihar?',
    question_hi: 'दक्षिणी बिहार को अलग करके झारखंड राज्य का गठन किस वर्ष किया गया था?',
    option_a: '1998',
    option_a_hi: '1998',
    option_b: '2000',
    option_b_hi: '2000',
    option_c: '2002',
    option_c_hi: '2002',
    option_d: '1995',
    option_d_hi: '1995',
    correct_answer: 'B',
    explanation: 'On 15 November 2000 (birth anniversary of Birsa Munda), 18 southern districts were bifurcated to form Jharkhand.',
    explanation_hi: '15 नवंबर 2000 को 18 जिलों को अलग कर 28वें राज्य के रूप में झारखंड का गठन किया गया।'
  },

  // Lesson 2 (bihar-2) Questions
  {
    id: 'q-bihar-2-1',
    lesson_id: 'lesson-bihar-2',
    subject_id: 'bihar-gk',
    question: 'Who founded the city of Pataliputra and shifted Magadha’s capital from Rajgriha to it?',
    question_hi: 'पाटलिपुत्र नगर की स्थापना कर मगध की राजधानी राजगृह से पाटलिपुत्र किसने स्थानांतरित की?',
    option_a: 'Bimbisara',
    option_a_hi: 'बिंबिसार',
    option_b: 'Ajatashatru',
    option_b_hi: 'अजातशत्रु',
    option_c: 'Udayin',
    option_c_hi: 'उदयन',
    option_d: 'Chandragupta Maurya',
    option_d_hi: 'चंद्रगुप्त मौर्य',
    correct_answer: 'C',
    explanation: 'Udayin, son and successor of Ajatashatru, founded Pataliputra at the confluence of Ganga and Son rivers.',
    explanation_hi: 'अजातशत्रु के पुत्र उदयन ने गंगा और सोन के संगम पर पाटलिपुत्र नगर बसाकर इसे राजधानी बनाया।'
  },
  {
    id: 'q-bihar-2-2',
    lesson_id: 'lesson-bihar-2',
    subject_id: 'bihar-gk',
    question: 'The First Buddhist Council was convened at which location in Bihar?',
    question_hi: 'प्रथम बौद्ध संगीति बिहार के किस स्थान पर आयोजित की गई थी?',
    option_a: 'Vaishali',
    option_a_hi: 'वैशाली',
    option_b: 'Saptaparni Cave, Rajgriha',
    option_b_hi: 'सप्तपर्णी गुफा, राजगृह',
    option_c: 'Pataliputra',
    option_c_hi: 'पाटलिपुत्र',
    option_d: 'Bodh Gaya',
    option_d_hi: 'बोधगया',
    correct_answer: 'B',
    explanation: 'The First Buddhist Council was held in 483 BCE at Saptaparni Cave, Rajgir, under the patronage of King Ajatashatru.',
    explanation_hi: '483 ई.पू. में अजातशत्रु के संरक्षण में राजगृह की सप्तपर्णी गुफा में प्रथम बौद्ध संगीति हुई।'
  },
  {
    id: 'q-bihar-2-3',
    lesson_id: 'lesson-bihar-2',
    subject_id: 'bihar-gk',
    question: 'Which two advanced weapons were innovated by Ajatashatru during his war against the Lichchhavis of Vaishali?',
    question_hi: 'वैशाली के लिच्छवियों के विरुद्ध युद्ध में अजातशत्रु ने किन दो नए हथियारों का आविष्कार किया था?',
    option_a: 'Agneyastra and Vajra',
    option_a_hi: 'आग्नेयास्त्र और वज्र',
    option_b: 'Rathamusala and Mahashilakantaka',
    option_b_hi: 'रथमूसल और महाशिलाकंटक',
    option_c: 'Khanda and Trishul',
    option_c_hi: 'खंडा और त्रिशूल',
    option_d: 'Gada and Bow-Arrow',
    option_d_hi: 'गदा और धनुष-बाण',
    correct_answer: 'B',
    explanation: 'Ajatashatru deployed Rathamusala (chariot with bladed wheels) and Mahashilakantaka (catapult engine) to subdue Vaishali.',
    explanation_hi: 'अजातशत्रु ने रथमूसल और महाशिलाकंटक नामक युद्ध यंत्रों से 16 वर्ष लंबे युद्ध में वैशाली पर विजय पाई।'
  },
  {
    id: 'q-bihar-2-4',
    lesson_id: 'lesson-bihar-2',
    subject_id: 'bihar-gk',
    question: 'Which ruler assumed the title of "Ekarat" (sole emperor) after annihilating rival Kshatriya kingdoms?',
    question_hi: 'क्षत्रियों का नाश कर किस शासक ने "एकराट" और "सर्वक्षत्रान्तक" की उपाधि धारण की थी?',
    option_a: 'Mahapadma Nanda',
    option_a_hi: 'महापद्मनंद',
    option_b: 'Bimbisara',
    option_b_hi: 'बिंबिसार',
    option_c: 'Ashoka',
    option_c_hi: 'अशोक',
    option_d: 'Shishunaga',
    option_d_hi: 'शिशुनाग',
    correct_answer: 'A',
    explanation: 'Mahapadma Nanda established the mighty Nanda empire and styled himself Ekarat.',
    explanation_hi: 'नंद वंश के संस्थापक महापद्मनंद ने विशाल साम्राज्य स्थापित कर "एकराट" की उपाधि ली।'
  },
  {
    id: 'q-bihar-2-5',
    lesson_id: 'lesson-bihar-2',
    subject_id: 'bihar-gk',
    question: 'Who presided over the Second Buddhist Council held at Vaishali in 383 BCE?',
    question_hi: '383 ई.पू. में वैशाली में आयोजित द्वितीय बौद्ध संगीति की अध्यक्षता किसने की थी?',
    option_a: 'Mahakassapa',
    option_a_hi: 'महाकस्सप',
    option_b: 'Sabakami',
    option_b_hi: 'सबकामी (सर्वकामनी)',
    option_c: 'Moggaliputta Tissa',
    option_c_hi: 'मोग्गलिपुत्त तिस्स',
    option_d: 'Vasumitra',
    option_d_hi: 'वसुमित्र',
    correct_answer: 'B',
    explanation: 'Sabakami presided over the Second Council convened under the patronage of King Kalashoka of the Shishunaga dynasty.',
    explanation_hi: 'कालाशोक के शासनकाल में वैशाली में द्वितीय बौद्ध संगीति की अध्यक्षता सबकामी ने की थी।'
  },

  // Lesson 3 (bihar-3) Questions
  {
    id: 'q-bihar-3-1',
    lesson_id: 'lesson-bihar-3',
    subject_id: 'bihar-gk',
    question: 'According to Megasthenes’ "Indica", the municipal council of Pataliputra consisted of how many members and boards?',
    question_hi: 'मेगस्थनीज की पुस्तक "इंडिका" के अनुसार पाटलिपुत्र नगर परिषद में कितने सदस्य और कितनी समितियाँ थीं?',
    option_a: '20 members in 4 boards',
    option_a_hi: '4 समितियों में 20 सदस्य',
    option_b: '30 members in 6 boards',
    option_b_hi: '6 समितियों में 30 सदस्य',
    option_c: '40 members in 8 boards',
    option_c_hi: '8 समितियों में 40 सदस्य',
    option_d: '50 members in 10 boards',
    option_d_hi: '10 समितियों में 50 सदस्य',
    correct_answer: 'B',
    explanation: 'Pataliputra’s civic administration had 30 members divided into 6 specialized boards of 5 commissioners each.',
    explanation_hi: 'मेगस्थनीज के अनुसार पाटलिपुत्र का नगर प्रशासन 30 सदस्यों वाली 6 समितियों (प्रत्येक में 5 सदस्य) द्वारा किया जाता था।'
  },
  {
    id: 'q-bihar-3-2',
    lesson_id: 'lesson-bihar-3',
    subject_id: 'bihar-gk',
    question: 'In which district of Bihar is the famous Ashokan Pillar of Lauriya Nandangarh situated?',
    question_hi: 'प्रसिद्ध अशोक स्तंभ "लौरिया नंदनगढ़" बिहार के किस जिले में स्थित है?',
    option_a: 'Patna',
    option_a_hi: 'पटना',
    option_b: 'West Champaran',
    option_b_hi: 'पश्चिम चंपारण',
    option_c: 'Gaya',
    option_c_hi: 'गया',
    option_d: 'Vaishali',
    option_d_hi: 'वैशाली',
    correct_answer: 'B',
    explanation: 'Lauriya Nandangarh, Lauriya Areraj, and Rampurva pillars are in Champaran, with Nandangarh boasting an intact lion capital.',
    explanation_hi: 'लौरिया नंदनगढ़ स्तंभ पश्चिम चंपारण जिले में स्थित है, जिसके शीर्ष पर सिंह की उत्कृष्ट मूर्ति उत्कीर्ण है।'
  },
  {
    id: 'q-bihar-3-3',
    lesson_id: 'lesson-bihar-3',
    subject_id: 'bihar-gk',
    question: 'Which Gupta monarch established the world-renowned Nalanda University?',
    question_hi: 'विश्वविख्यात नालंदा विश्वविद्यालय की स्थापना किस गुप्त शासक ने की थी?',
    option_a: 'Samudragupta',
    option_a_hi: 'समुद्रगुप्त',
    option_b: 'Chandragupta II',
    option_b_hi: 'चंद्रगुप्त द्वितीय',
    option_c: 'Kumaragupta I',
    option_c_hi: 'कुमारगुप्त प्रथम',
    option_d: 'Skandagupta',
    option_d_hi: 'स्कंदगुप्त',
    correct_answer: 'C',
    explanation: 'Kumaragupta I (415–455 CE, Mahendraditya) laid the foundation of Nalanda Mahavihara.',
    explanation_hi: 'कुमारगुप्त प्रथम (शक्रादित्य) ने 5वीं शताब्दी में नालंदा महाविहार की स्थापना की थी।'
  },
  {
    id: 'q-bihar-3-4',
    lesson_id: 'lesson-bihar-3',
    subject_id: 'bihar-gk',
    question: 'Who convened the Third Buddhist Council at Pataliputra in 250 BCE?',
    question_hi: '250 ई.पू. में पाटलिपुत्र में तृतीय बौद्ध संगीति का आयोजन किसने करवाया था?',
    option_a: 'Kanishka',
    option_a_hi: 'कनिष्क',
    option_b: 'Emperor Ashoka',
    option_b_hi: 'सम्राट अशोक',
    option_c: 'Chandragupta Maurya',
    option_c_hi: 'चंद्रगुप्त मौर्य',
    option_d: 'Ajatashatru',
    option_d_hi: 'अजातशत्रु',
    correct_answer: 'B',
    explanation: 'Emperor Ashoka organized the Third Buddhist Council at Pataliputra under the leadership of Moggaliputta Tissa.',
    explanation_hi: 'मौर्य सम्राट अशोक ने पाटलिपुत्र में तृतीय बौद्ध संगीति आयोजित की जिसमें अभिधम्मपिटक का संकलन हुआ।'
  },
  {
    id: 'q-bihar-3-5',
    lesson_id: 'lesson-bihar-3',
    subject_id: 'bihar-gk',
    question: 'The rock-cut caves in Barabar Hills (Jehanabad) were dedicated by Ashoka to which ascetic sect?',
    question_hi: 'बराबर की पहाड़ियों (जहानाबाद) में अशोक द्वारा निर्मित गुफाएं किस संप्रदाय को दान की गई थीं?',
    option_a: 'Buddhists',
    option_a_hi: 'बौद्ध',
    option_b: 'Jains',
    option_b_hi: 'जैन',
    option_c: 'Ajivikas',
    option_c_hi: 'आजीवक',
    option_d: 'Charvakas',
    option_d_hi: 'चार्वाक',
    correct_answer: 'C',
    explanation: 'Ashoka and his grandson Dasharatha carved caves at Barabar and Nagarjuni for the Ajivika monks (founded by Makkhali Gosala).',
    explanation_hi: 'बराबर की गुफाएं (कर्ण चौपड़, सुदामा आदि) आजीवक संप्रदाय के तपस्वियों के लिए दान में दी गई थीं।'
  },

  // Lesson 4 (bihar-4) Questions
  {
    id: 'q-bihar-4-1',
    lesson_id: 'lesson-bihar-4',
    subject_id: 'bihar-gk',
    question: 'On the banks of which river did Gautama Buddha attain enlightenment at Bodh Gaya?',
    question_hi: 'गौतम बुद्ध को बोधगया में किस नदी के तट पर ज्ञान की प्राप्ति हुई थी?',
    option_a: 'Ganga',
    option_a_hi: 'गंगा',
    option_b: 'Son',
    option_b_hi: 'सोन',
    option_c: 'Niranjana (Phalgu)',
    option_c_hi: 'निरंजना (फल्गु)',
    option_d: 'Gandak',
    option_d_hi: 'गंडक',
    correct_answer: 'C',
    explanation: 'Buddha attained supreme enlightenment under the Bodhi tree on the banks of the Niranjana river (Uruvela, now Bodh Gaya).',
    explanation_hi: 'गौतम बुद्ध को निरंजना नदी के तट पर पीपल वृक्ष के नीचे वैशाख पूर्णिमा को ज्ञान प्राप्त हुआ था।'
  },
  {
    id: 'q-bihar-4-2',
    lesson_id: 'lesson-bihar-4',
    subject_id: 'bihar-gk',
    question: 'Where is the famous white-marble Jal Mandir of Jainism located in Bihar?',
    question_hi: 'जैन धर्म का प्रसिद्ध श्वेत संगमरमर का "जल मंदिर" बिहार में कहाँ स्थित है?',
    option_a: 'Rajgir',
    option_a_hi: 'राजगीर',
    option_b: 'Pavapuri',
    option_b_hi: 'पावापुरी',
    option_c: 'Kundagram',
    option_c_hi: 'कुंडग्राम',
    option_d: 'Champapuri',
    option_d_hi: 'चंपापुरी',
    correct_answer: 'B',
    explanation: 'The Jal Mandir is located in Pavapuri (Nalanda district), marking the sacred spot where Lord Mahavira attained Nirvana.',
    explanation_hi: 'पावापुरी में कमल सरोवर के मध्य जल मंदिर स्थित है, जहाँ भगवान महावीर स्वामी का निर्वाण हुआ था।'
  },
  {
    id: 'q-bihar-4-3',
    lesson_id: 'lesson-bihar-4',
    subject_id: 'bihar-gk',
    question: 'In which year was the Mahabodhi Temple Complex at Bodh Gaya inscribed as a UNESCO World Heritage Site?',
    question_hi: 'बोधगया स्थित महाबोधि मंदिर परिसर को किस वर्ष यूनेस्को विश्व धरोहर स्थल घोषित किया गया?',
    option_a: '1998',
    option_a_hi: '1998',
    option_b: '2002',
    option_b_hi: '2002',
    option_c: '2016',
    option_c_hi: '2016',
    option_d: '2010',
    option_d_hi: '2010',
    correct_answer: 'B',
    explanation: 'The Mahabodhi Temple was inscribed by UNESCO in 2002; the Nalanda ruins followed in 2016.',
    explanation_hi: 'महाबोधि मंदिर को 2002 में तथा नालंदा विश्वविद्यालय के अवशेषों को 2016 में यूनेस्को विश्व धरोहर का दर्जा दिया गया।'
  },
  {
    id: 'q-bihar-4-4',
    lesson_id: 'lesson-bihar-4',
    subject_id: 'bihar-gk',
    question: 'Where was the 24th Jain Tirthankara, Lord Mahavira, born?',
    question_hi: '24वें जैन तीर्थंकर भगवान महावीर का जन्म कहाँ हुआ था?',
    option_a: 'Kundagram (Vaishali)',
    option_a_hi: 'कुंडग्राम (वैशाली)',
    option_b: 'Pavapuri',
    option_b_hi: 'पावापुरी',
    option_c: 'Lumbini',
    option_c_hi: 'लुंबिनी',
    option_d: 'Sarnath',
    option_d_hi: 'सारनाथ',
    correct_answer: 'A',
    explanation: 'Lord Mahavira was born at Kundagram near Vaishali in the Jnatrika clan.',
    explanation_hi: 'भगवान महावीर का जन्म वैशाली के निकट कुंडग्राम में ज्ञातृक क्षत्रिय कुल में हुआ था।'
  },
  {
    id: 'q-bihar-4-5',
    lesson_id: 'lesson-bihar-4',
    subject_id: 'bihar-gk',
    question: 'Which ancient city in Bihar is recognized as the birthplace of the world’s first constitutional republic?',
    question_hi: 'विश्व का प्रथम लोकतांत्रिक गणतंत्र होने का गौरव बिहार के किस प्राचीन नगर को प्राप्त है?',
    option_a: 'Magadha',
    option_a_hi: 'मगध',
    option_b: 'Vaishali (Lichchhavi)',
    option_b_hi: 'वैशाली (लिच्छवि गणराज्य)',
    option_c: 'Anga',
    option_c_hi: 'अंग',
    option_d: 'Mithila',
    option_d_hi: 'मिथिला',
    correct_answer: 'B',
    explanation: 'The Lichchhavis of Vaishali operated the world’s first known democratic assembly and judicial republic.',
    explanation_hi: 'वैशाली का लिच्छवि गणराज्य विश्व का प्रथम गणतंत्र माना जाता है जहाँ राजा का चुनाव होता था।'
  },

  // Lesson 5 (bihar-5) Questions
  {
    id: 'q-bihar-5-1',
    lesson_id: 'lesson-bihar-5',
    subject_id: 'bihar-gk',
    question: 'Who was the founder of Vikramashila University in Bihar?',
    question_hi: 'बिहार में विक्रमशिला विश्वविद्यालय के संस्थापक कौन थे?',
    option_a: 'Gopala',
    option_a_hi: 'गोपाल',
    option_b: 'Dharmapala',
    option_b_hi: 'धर्मपाल',
    option_c: 'Devapala',
    option_c_hi: 'देवपाल',
    option_d: 'Rampala',
    option_d_hi: 'रामपाल',
    correct_answer: 'B',
    explanation: 'Pala Emperor Dharmapala founded Vikramashila University at Antichak (Bhagalpur) in the late 8th century.',
    explanation_hi: 'पाल वंश के प्रतापी राजा धर्मपाल ने भागलपुर के अंतीचक में विक्रमशिला विश्वविद्यालय स्थापित किया था।'
  },
  {
    id: 'q-bihar-5-2',
    lesson_id: 'lesson-bihar-5',
    subject_id: 'bihar-gk',
    question: 'In which year was the Battle of Chausa fought between Sher Shah Suri and Mughal Emperor Humayun?',
    question_hi: 'शेरशाह सूरी और मुगल बादशाह हुमायूं के बीच चौसा का युद्ध किस वर्ष लड़ा गया था?',
    option_a: '1526',
    option_a_hi: '1526',
    option_b: '1539',
    option_b_hi: '1539',
    option_c: '1540',
    option_c_hi: '1540',
    option_d: '1556',
    option_d_hi: '1556',
    correct_answer: 'B',
    explanation: 'The Battle of Chausa was fought on 26 June 1539 near Buxar, where Sher Shah defeated Humayun.',
    explanation_hi: '26 जून 1539 को बक्सर के निकट चौसा में शेरशाह ने हुमायूं को पराजित किया था।'
  },
  {
    id: 'q-bihar-5-3',
    lesson_id: 'lesson-bihar-5',
    subject_id: 'bihar-gk',
    question: 'Where is the grand octagonal mausoleum of Sher Shah Suri situated?',
    question_hi: 'शेरशाह सूरी का भव्य अष्टकोणीय मकबरा कहाँ स्थित है?',
    option_a: 'Patna',
    option_a_hi: 'पटना',
    option_b: 'Sasaram (Rohtas)',
    option_b_hi: 'सासाराम (रोहतास)',
    option_c: 'Munger',
    option_c_hi: 'मुंगेर',
    option_d: 'Gaya',
    option_d_hi: 'गया',
    correct_answer: 'B',
    explanation: 'Sher Shah’s tomb is set inside an artificial lake in Sasaram, designed by Aliwal Khan.',
    explanation_hi: 'सासाराम (रोहतास) में एक विशाल कृत्रिम झील के मध्य शेरशाह का प्रसिद्ध मकबरा बना है।'
  },
  {
    id: 'q-bihar-5-4',
    lesson_id: 'lesson-bihar-5',
    subject_id: 'bihar-gk',
    question: 'Which Turkic general invaded Bihar and burned down the libraries of Nalanda and Odantapuri around 1198–1200 CE?',
    question_hi: '1198-1200 ई. में बिहार पर आक्रमण कर नालंदा और ओदंतपुरी विश्वविद्यालयों को किसने नष्ट किया?',
    option_a: 'Qutb-ud-din Aibak',
    option_a_hi: 'कुतुबुद्दीन ऐबक',
    option_b: 'Bakhtiyar Khilji',
    option_b_hi: 'बख्तियार खिलजी',
    option_c: 'Iltutmish',
    option_c_hi: 'इल्तुतमिश',
    option_d: 'Balban',
    option_d_hi: 'बलबन',
    correct_answer: 'B',
    explanation: 'Muhammad Bakhtiyar Khilji sacked Nalanda, Vikramashila, and Odantapuri.',
    explanation_hi: 'इख्तियारुद्दीन मुहम्मद बख्तियार खिलजी ने नालंदा के बहुमूल्य पुस्तकालयों को आग लगा दी थी।'
  },
  {
    id: 'q-bihar-5-5',
    lesson_id: 'lesson-bihar-5',
    subject_id: 'bihar-gk',
    question: 'What was the weight of the standard silver currency "Rupiya" introduced by Sher Shah Suri?',
    question_hi: 'शेरशाह सूरी द्वारा शुरू किए गए मानक चांदी के सिक्के "रुपिया" का वजन कितना था?',
    option_a: '100 grains',
    option_a_hi: '100 ग्रेन',
    option_b: '178 grains',
    option_b_hi: '178 ग्रेन',
    option_c: '250 grains',
    option_c_hi: '250 ग्रेन',
    option_d: '380 grains',
    option_d_hi: '380 ग्रेन',
    correct_answer: 'B',
    explanation: 'Sher Shah’s silver Rupiya weighed 178 grains, while his copper Dam weighed 380 grains.',
    explanation_hi: 'शेरशाह का चांदी का रुपिया 178 ग्रेन और तांबे का दाम 380 ग्रेन का था।'
  },

  // Lesson 6 (bihar-6) Questions
  {
    id: 'q-bihar-6-1',
    lesson_id: 'lesson-bihar-6',
    subject_id: 'bihar-gk',
    question: 'Who led the 1857 Revolt with exceptional valor from Jagdishpur in Bihar?',
    question_hi: 'बिहार के जगदीशपुर से 1857 की क्रांति का अद्भुत वीरता से नेतृत्व किसने किया?',
    option_a: 'Pir Ali Khan',
    option_a_hi: 'पीर अली खां',
    option_b: 'Babu Veer Kunwar Singh',
    option_b_hi: 'बाबू वीर कुंवर सिंह',
    option_c: 'Amar Singh',
    option_c_hi: 'अमर सिंह',
    option_d: 'Harkishan Singh',
    option_d_hi: 'हरकिशन सिंह',
    correct_answer: 'B',
    explanation: 'Babu Veer Kunwar Singh of Jagdishpur was the iconic leader of the 1857 Rebellion in Bihar.',
    explanation_hi: 'जगदीशपुर (भोजपुर) के 80 वर्षीय वीर बाबू कुंवर सिंह ने अंग्रेजों के छक्के छुड़ाए।'
  },
  {
    id: 'q-bihar-6-2',
    lesson_id: 'lesson-bihar-6',
    subject_id: 'bihar-gk',
    question: 'What was the exact date of the decisive Battle of Buxar?',
    question_hi: 'निर्णायक बक्सर के युद्ध की सही तिथि क्या थी?',
    option_a: '23 June 1757',
    option_a_hi: '23 जून 1757',
    option_b: '22 October 1764',
    option_b_hi: '22 अक्टूबर 1764',
    option_c: '12 August 1765',
    option_c_hi: '12 अगस्त 1765',
    option_d: '14 January 1761',
    option_d_hi: '14 जनवरी 1761',
    correct_answer: 'B',
    explanation: 'The Battle of Buxar was fought on 22 October 1764 between Major Munro and the combined Indian forces.',
    explanation_hi: '22 अक्टूबर 1764 को बक्सर के मैदान में हेक्टर मुनरो की सेना ने मीर कासिम की संयुक्त सेना को हराया।'
  },
  {
    id: 'q-bihar-6-3',
    lesson_id: 'lesson-bihar-6',
    subject_id: 'bihar-gk',
    question: 'Under the Tinkathia system in Champaran, what proportion of land was compulsory for farmers to plant indigo upon?',
    question_hi: 'चंपारण में प्रचलित "तिनकठिया पद्धति" के तहत किसानों को जमीन के कितने हिस्से पर नील की खेती करनी अनिवार्य थी?',
    option_a: '1/10th',
    option_a_hi: '1/10 भाग',
    option_b: '3/20th',
    option_b_hi: '3/20 भाग',
    option_c: '5/20th',
    option_c_hi: '5/20 भाग',
    option_d: '1/4th',
    option_d_hi: '1/4 भाग',
    correct_answer: 'B',
    explanation: 'Tinkathia mandated cultivating indigo on 3 kottahs per bigha (3 out of 20 parts of land).',
    explanation_hi: 'तिनकठिया व्यवस्था के तहत प्रत्येक बीघा (20 कट्ठा) में से 3 कट्ठा पर नील की खेती अनिवार्य थी।'
  },
  {
    id: 'q-bihar-6-4',
    lesson_id: 'lesson-bihar-6',
    subject_id: 'bihar-gk',
    question: 'Who led the uprising in Patna city on July 3, 1857?',
    question_hi: '3 जुलाई 1857 को पटना शहर में अंग्रेजों के विरुद्ध विद्रोह का नेतृत्व किसने किया था?',
    option_a: 'Pir Ali Khan',
    option_a_hi: 'पीर अली खां',
    option_b: 'Wilayat Ali',
    option_b_hi: 'विलायत अली',
    option_c: 'Inayat Ali',
    option_c_hi: 'इनायत अली',
    option_d: 'Lutf Ali',
    option_d_hi: 'लुत्फ अली',
    correct_answer: 'A',
    explanation: 'Pir Ali, a courageous bookseller of Patna, led the rebellion and killed British officer Dr. Lyell.',
    explanation_hi: 'पटना के पुस्तक विक्रेता पीर अली ने 3 जुलाई 1857 को क्रांति का झंडा बुलंद किया और फांसी पर चढ़े।'
  },
  {
    id: 'q-bihar-6-5',
    lesson_id: 'lesson-bihar-6',
    subject_id: 'bihar-gk',
    question: 'On what date did 7 students achieve martyrdom while unfurling the national flag at Patna Secretariat during the 1942 movement?',
    question_hi: '1942 के भारत छोड़ो आंदोलन में पटना सचिवालय पर तिरंगा फहराते हुए 7 छात्र किस तारीख को शहीद हुए?',
    option_a: '9 August 1942',
    option_a_hi: '9 अगस्त 1942',
    option_b: '11 August 1942',
    option_b_hi: '11 अगस्त 1942',
    option_c: '15 August 1942',
    option_c_hi: '15 अगस्त 1942',
    option_d: '26 January 1942',
    option_d_hi: '26 जनवरी 1942',
    correct_answer: 'B',
    explanation: 'On 11 August 1942, British police opened fire on unarmed students at Patna Secretariat, martyring 7 youths.',
    explanation_hi: '11 अगस्त 1942 को पटना सचिवालय के मुख्य द्वार पर तिरंगा फहराते समय 7 छात्र शहीद हुए।'
  },

  // Lesson 7 (bihar-7) Questions
  {
    id: 'q-bihar-7-1',
    lesson_id: 'lesson-bihar-7',
    subject_id: 'bihar-gk',
    question: 'What is the highest mountain peak in Bihar?',
    question_hi: 'बिहार की सबसे ऊँची पर्वत चोटी कौन सी है?',
    option_a: 'Kaimur Peak',
    option_a_hi: 'कैमूर चोटी',
    option_b: 'Someshwar Fort Peak (874 m)',
    option_b_hi: 'सोमेश्वर किला चोटी (874 मीटर)',
    option_c: 'Parasnath Peak',
    option_c_hi: 'पारसनाथ चोटी',
    option_d: 'Kharagpur Peak',
    option_d_hi: 'खड़गपुर चोटी',
    correct_answer: 'B',
    explanation: 'Someshwar Fort peak in West Champaran stands at 874 meters (2,884 ft), the highest in Bihar.',
    explanation_hi: 'पश्चिम चंपारण के शिवालिक श्रेणी में स्थित सोमेश्वर किला (874 मीटर) बिहार की सर्वोच्च चोटी है।'
  },
  {
    id: 'q-bihar-7-2',
    lesson_id: 'lesson-bihar-7',
    subject_id: 'bihar-gk',
    question: 'How many districts of Bihar share an international border with Nepal?',
    question_hi: 'बिहार के कितने जिले नेपाल के साथ अंतरराष्ट्रीय सीमा साझा करते हैं?',
    option_a: '5',
    option_a_hi: '5',
    option_b: '7',
    option_b_hi: '7',
    option_c: '8',
    option_c_hi: '8',
    option_d: '10',
    option_d_hi: '10',
    correct_answer: 'B',
    explanation: '7 districts border Nepal: West Champaran, East Champaran, Sitamarhi, Madhubani, Supaul, Araria, and Kishanganj.',
    explanation_hi: 'नेपाल से 7 जिले सीमा बनाते हैं: पश्चिम चंपारण, पूर्वी चंपारण, सीतामढ़ी, मधुबनी, सुपौल, अररिया, किशनगंज।'
  },
  {
    id: 'q-bihar-7-3',
    lesson_id: 'lesson-bihar-7',
    subject_id: 'bihar-gk',
    question: 'Which district in Bihar records both the highest maximum summer temperature and the lowest winter temperature?',
    question_hi: 'बिहार का कौन सा जिला सबसे अधिक गर्म तथा सबसे अधिक ठंडा जिला रहता है?',
    option_a: 'Patna',
    option_a_hi: 'पटना',
    option_b: 'Gaya',
    option_b_hi: 'गया',
    option_c: 'Purnia',
    option_c_hi: 'पूर्णिया',
    option_d: 'Muzaffarpur',
    option_d_hi: 'मुजफ्फरपुर',
    correct_answer: 'B',
    explanation: 'Gaya experiences extreme continental conditions due to its topography surrounded by rocky hills.',
    explanation_hi: 'पहाड़ियों से घिरे होने और पठारी प्रभाव के कारण गया जिला सबसे गर्म और सबसे ठंडा जिला है।'
  },
  {
    id: 'q-bihar-7-4',
    lesson_id: 'lesson-bihar-7',
    subject_id: 'bihar-gk',
    question: 'What is the total geographical area of Bihar?',
    question_hi: 'बिहार का कुल भौगोलिक क्षेत्रफल कितना है?',
    option_a: '82,140 sq km',
    option_a_hi: '82,140 वर्ग किमी',
    option_b: '94,163 sq km',
    option_b_hi: '94,163 वर्ग किमी',
    option_c: '1,02,450 sq km',
    option_c_hi: '1,02,450 वर्ग किमी',
    option_d: '79,714 sq km',
    option_d_hi: '79,714 वर्ग किमी',
    correct_answer: 'B',
    explanation: 'Bihar covers 94,163 square kilometers, representing 2.86% of India’s land area.',
    explanation_hi: 'बिहार का कुल क्षेत्रफल 94,163 वर्ग किमी है, जो देश के कुल क्षेत्रफल का 2.86% है।'
  },
  {
    id: 'q-bihar-7-5',
    lesson_id: 'lesson-bihar-7',
    subject_id: 'bihar-gk',
    question: 'Which district of Bihar receives the highest average annual rainfall?',
    question_hi: 'बिहार के किस जिले में सर्वाधिक औसत वार्षिक वर्षा होती है?',
    option_a: 'Kishanganj',
    option_a_hi: 'किशनगंज',
    option_b: 'Gaya',
    option_b_hi: 'गया',
    option_c: 'Aurangabad',
    option_c_hi: 'औरंगाबाद',
    option_d: 'Rohtas',
    option_d_hi: 'रोहतास',
    correct_answer: 'A',
    explanation: 'Kishanganj receives over 2,000 mm of annual rainfall due to proximity to the Bay of Bengal monsoonal track.',
    explanation_hi: 'किशनगंज जिले में बंगाल की खाड़ी के मानसून से 2000 मिमी से अधिक वर्षा होती है।'
  },

  // Lesson 8 (bihar-8) Questions
  {
    id: 'q-bihar-8-1',
    lesson_id: 'lesson-bihar-8',
    subject_id: 'bihar-gk',
    question: 'Through how many districts of Bihar does the River Ganga flow?',
    question_hi: 'गंगा नदी बिहार के कितने जिलों से होकर प्रवाहित होती है?',
    option_a: '8',
    option_a_hi: '8',
    option_b: '10',
    option_b_hi: '10',
    option_c: '12',
    option_c_hi: '12',
    option_d: '15',
    option_d_hi: '15',
    correct_answer: 'C',
    explanation: 'The River Ganga passes through 12 districts in Bihar over 445 km, entering at Buxar and leaving at Katihar.',
    explanation_hi: 'गंगा नदी बक्सर से कटिहार तक कुल 12 जिलों से होकर 445 किमी बहती है।'
  },
  {
    id: 'q-bihar-8-2',
    lesson_id: 'lesson-bihar-8',
    subject_id: 'bihar-gk',
    question: 'Where is Bihar’s solitary Tiger Reserve located?',
    question_hi: 'बिहार का एकमात्र राष्ट्रीय उद्यान एवं टाइगर रिजर्व कहाँ स्थित है?',
    option_a: 'Kaimur',
    option_a_hi: 'कैमूर',
    option_b: 'Valmiki National Park, West Champaran',
    option_b_hi: 'वाल्मीकि राष्ट्रीय उद्यान, पश्चिम चंपारण',
    option_c: 'Bhimbandh, Munger',
    option_c_hi: 'भीमबांध, मुंगेर',
    option_d: 'Gautam Buddha Sanctuary, Gaya',
    option_d_hi: 'गौतम बुद्ध अभयारण्य, गया',
    correct_answer: 'B',
    explanation: 'Valmiki Tiger Reserve in West Champaran is Bihar’s only national park and tiger reserve.',
    explanation_hi: 'पश्चिम चंपारण का वाल्मीकि राष्ट्रीय उद्यान बिहार का एकमात्र टाइगर रिजर्व है।'
  },
  {
    id: 'q-bihar-8-3',
    lesson_id: 'lesson-bihar-8',
    subject_id: 'bihar-gk',
    question: 'Which freshwater oxbow lake in Begusarai was declared Bihar’s first Ramsar wetland site?',
    question_hi: 'बेगूसराय स्थित किस गोखुर झील को बिहार का प्रथम रामसर आर्द्रभूमि स्थल घोषित किया गया?',
    option_a: 'Kusheshwar Asthan',
    option_a_hi: 'कुशेश्वरस्थान',
    option_b: 'Gogabil Lake',
    option_b_hi: 'गोगाबिल झील',
    option_c: 'Kanwar Lake (Kabartal)',
    option_c_hi: 'कावर झील (काबरताल)',
    option_d: 'Simri Lake',
    option_d_hi: 'सिमरी झील',
    correct_answer: 'C',
    explanation: 'Kanwar Lake in Begusarai is Asia’s largest freshwater oxbow lake and Bihar’s first Ramsar site.',
    explanation_hi: 'बेगूसराय का कावर ताल (काबरताल) एशिया की सबसे बड़ी मीठे पानी की गोखुर झील और पहला रामसर स्थल है।'
  },
  {
    id: 'q-bihar-8-4',
    lesson_id: 'lesson-bihar-8',
    subject_id: 'bihar-gk',
    question: 'Where does the Son River merge into the River Ganga in Bihar?',
    question_hi: 'सोन नदी बिहार में किस स्थान के निकट गंगा नदी में मिलती है?',
    option_a: 'Fatuha',
    option_a_hi: 'फतुहा',
    option_b: 'Maner (near Patna)',
    option_b_hi: 'मनेर (पटना के निकट)',
    option_c: 'Sonpur',
    option_c_hi: 'सोनपुर',
    option_d: 'Munger',
    option_d_hi: 'मुंगेर',
    correct_answer: 'B',
    explanation: 'The Son River joins the Ganga near Maner, west of Patna. (Punpun joins at Fatuha).',
    explanation_hi: 'सोन नदी मनेर के पास गंगा में मिलती है, जबकि पुनपुन नदी फतुहा में मिलती है।'
  },
  {
    id: 'q-bihar-8-5',
    lesson_id: 'lesson-bihar-8',
    subject_id: 'bihar-gk',
    question: 'Which agricultural product from Bihar has received the prestigious Geographical Indication (GI) tag?',
    question_hi: 'बिहार के किस प्रसिद्ध कृषि उत्पाद को जीआई (GI) टैग प्राप्त है?',
    option_a: 'Shahi Litchi of Muzaffarpur',
    option_a_hi: 'मुजफ्फरपुर की शाही लीची',
    option_b: 'Mithila Makhana',
    option_b_hi: 'मिथिला मखाना',
    option_c: 'Katarni Rice of Bhagalpur',
    option_c_hi: 'भागलपुर का कतरनी चावल',
    option_d: 'All of the above',
    option_d_hi: 'उपर्युक्त सभी',
    correct_answer: 'D',
    explanation: 'Shahi Litchi, Mithila Makhana, Katarni Rice, Zardalu Mango, and Magahi Paan have all received GI tags.',
    explanation_hi: 'शाही लीची, मिथिला मखाना, कतरनी चावल, जर्दालु आम और मगही पान सभी को जीआई टैग मिल चुका है।'
  },

  // Lesson 9 (bihar-9) Questions
  {
    id: 'q-bihar-9-1',
    lesson_id: 'lesson-bihar-9',
    subject_id: 'bihar-gk',
    question: 'Which sector contributes the highest share to Bihar’s Gross State Value Added (GSVA)?',
    question_hi: 'बिहार के सकल राज्य मूल्यवर्धन (GSVA) में किस क्षेत्र का हिस्सा सर्वाधिक है?',
    option_a: 'Primary Sector (Agriculture)',
    option_a_hi: 'प्राथमिक क्षेत्र (कृषि)',
    option_b: 'Secondary Sector (Manufacturing)',
    option_b_hi: 'द्वितीयक क्षेत्र (विनिर्माण)',
    option_c: 'Tertiary Sector (Services)',
    option_c_hi: 'तृतीयक क्षेत्र (सेवाएं)',
    option_d: 'Mining Sector',
    option_d_hi: 'खनन क्षेत्र',
    correct_answer: 'C',
    explanation: 'The Tertiary (Services) sector contributes around 60% of Bihar’s GSVA.',
    explanation_hi: 'बिहार की अर्थव्यवस्था में तृतीयक (सेवा) क्षेत्र का योगदान लगभग 60% है।'
  },
  {
    id: 'q-bihar-9-2',
    lesson_id: 'lesson-bihar-9',
    subject_id: 'bihar-gk',
    question: 'Which city in Bihar is famously called the "Silk City" of the state?',
    question_hi: 'बिहार के किस शहर को "सिल्क सिटी" (रेशम नगरी) के नाम से जाना जाता है?',
    option_a: 'Gaya',
    option_a_hi: 'गया',
    option_b: 'Bhagalpur',
    option_b_hi: 'भागलपुर',
    option_c: 'Patna',
    option_c_hi: 'पटना',
    option_d: 'Darbhanga',
    option_d_hi: 'दरभंगा',
    correct_answer: 'B',
    explanation: 'Bhagalpur is renowned worldwide for producing indigenous Tussar and Bafta silk fabrics.',
    explanation_hi: 'भागलपुर तसर रेशम उत्पादन के लिए विश्वभर में प्रसिद्ध है और इसे सिल्क सिटी कहा जाता है।'
  },
  {
    id: 'q-bihar-9-3',
    lesson_id: 'lesson-bihar-9',
    subject_id: 'bihar-gk',
    question: 'In which year did Bihar become the first state in India to announce an Ethanol Promotion Policy?',
    question_hi: 'एथेनॉल उत्पादन संवर्धन नीति लागू करने वाला देश का पहला राज्य बिहार किस वर्ष बना?',
    option_a: '2019',
    option_a_hi: '2019',
    option_b: '2021',
    option_b_hi: '2021',
    option_c: '2023',
    option_c_hi: '2023',
    option_d: '2017',
    option_d_hi: '2017',
    correct_answer: 'B',
    explanation: 'Bihar formulated its pioneering Ethanol Production Promotion Policy in 2021.',
    explanation_hi: 'बिहार ने 2021 में अपनी ऐतिहासिक एथेनॉल उत्पादन संवर्धन नीति की घोषणा की थी।'
  },
  {
    id: 'q-bihar-9-4',
    lesson_id: 'lesson-bihar-9',
    subject_id: 'bihar-gk',
    question: 'Where was India’s first grain-based greenfield ethanol plant inaugurated in Bihar in 2022?',
    question_hi: '2022 में देश के पहले अनाज-आधारित ग्रीनफील्ड एथेनॉल संयंत्र का उद्घाटन बिहार के किस जिले में किया गया?',
    option_a: 'Patna',
    option_a_hi: 'पटना',
    option_b: 'Purnia (Parora)',
    option_b_hi: 'पूर्णिया (परोरा)',
    option_c: 'Muzaffarpur',
    option_c_hi: 'मुजफ्फरपुर',
    option_d: 'Gaya',
    option_d_hi: 'गया',
    correct_answer: 'B',
    explanation: 'The greenfield ethanol plant was established at Parora in Purnia district.',
    explanation_hi: 'पूर्णिया जिले के परोरा में देश का पहला अनाज-आधारित एथेनॉल संयंत्र स्थापित किया गया।'
  },
  {
    id: 'q-bihar-9-5',
    lesson_id: 'lesson-bihar-9',
    subject_id: 'bihar-gk',
    question: 'Which district of Bihar has the highest per capita income according to the Bihar Economic Survey?',
    question_hi: 'बिहार आर्थिक सर्वेक्षण के अनुसार राज्य के किस जिले की प्रति व्यक्ति आय सर्वाधिक है?',
    option_a: 'Patna',
    option_a_hi: 'पटना',
    option_b: 'Munger',
    option_b_hi: 'मुंगेर',
    option_c: 'Begusarai',
    option_c_hi: 'बेगूसराय',
    option_d: 'Bhagalpur',
    option_d_hi: 'भागलपुर',
    correct_answer: 'A',
    explanation: 'Patna district has by far the highest per capita Gross District Domestic Product (GDDP) in the state.',
    explanation_hi: 'पटना जिले की प्रति व्यक्ति आय राज्य में सर्वाधिक है, जबकि शिवहर सबसे निचले स्थान पर है।'
  },

  // Lesson 10 (bihar-10) Questions
  {
    id: 'q-bihar-10-1',
    lesson_id: 'lesson-bihar-10',
    subject_id: 'bihar-gk',
    question: 'In which village/district of Bihar was India’s first President Dr. Rajendra Prasad born?',
    question_hi: 'भारत के प्रथम राष्ट्रपति डॉ. राजेंद्र प्रसाद का जन्म बिहार के किस गाँव/जिले में हुआ था?',
    option_a: 'Simaria, Begusarai',
    option_a_hi: 'सिमरिया, बेगूसराय',
    option_b: 'Ziradei, Siwan',
    option_b_hi: 'जीरादेई, सीवान',
    option_c: 'Murali Bharhawa, Champaran',
    option_c_hi: 'मुरली भरहवा, चंपारण',
    option_d: 'Sitab Diara, Saran',
    option_d_hi: 'सिताब दियारा, सारण',
    correct_answer: 'B',
    explanation: 'Dr. Rajendra Prasad was born on 3 December 1884 at Ziradei in Siwan district.',
    explanation_hi: 'डॉ. राजेंद्र प्रसाद का जन्म 3 दिसंबर 1884 को सीवान के जीरादेई गाँव में हुआ था।'
  },
  {
    id: 'q-bihar-10-2',
    lesson_id: 'lesson-bihar-10',
    subject_id: 'bihar-gk',
    question: 'How many seats are there in the Bihar Legislative Assembly (Vidhan Sabha)?',
    question_hi: 'बिहार विधानसभा (Vidhan Sabha) में कुल कितनी सीटें हैं?',
    option_a: '243',
    option_a_hi: '243',
    option_b: '75',
    option_b_hi: '75',
    option_c: '40',
    option_c_hi: '40',
    option_d: '250',
    option_d_hi: '250',
    correct_answer: 'A',
    explanation: 'The Bihar Legislative Assembly has 243 elected members, while the Legislative Council has 75 members.',
    explanation_hi: 'बिहार विधानसभा में 243 सीटें हैं, जबकि विधान परिषद में 75 सीटें हैं।'
  },
  {
    id: 'q-bihar-10-3',
    lesson_id: 'lesson-bihar-10',
    subject_id: 'bihar-gk',
    question: 'Who gave the historic call for "Total Revolution" (Sampoorna Kranti) in 1974 at Gandhi Maidan, Patna?',
    question_hi: '1974 में पटना के गांधी मैदान से "संपूर्ण क्रांति" का ऐतिहासिक नारा किसने दिया था?',
    option_a: 'Ram Manohar Lohia',
    option_a_hi: 'राम मनोहर लोहिया',
    option_b: 'Lok Nayak Jayaprakash Narayan',
    option_b_hi: 'लोकनायक जयप्रकाश नारायण',
    option_c: 'Karpoori Thakur',
    option_c_hi: 'कर्पूरी ठाकुर',
    option_d: 'Jagjivan Ram',
    option_d_hi: 'जगजीवन राम',
    correct_answer: 'B',
    explanation: 'Lok Nayak Jayaprakash Narayan launched the Total Revolution movement on 5 June 1974.',
    explanation_hi: 'लोकनायक जयप्रकाश नारायण (जेपी) ने 5 जून 1974 को संपूर्ण क्रांति का आह्वान किया था।'
  },
  {
    id: 'q-bihar-10-4',
    lesson_id: 'lesson-bihar-10',
    subject_id: 'bihar-gk',
    question: 'How many Lok Sabha seats in Bihar are reserved for Scheduled Castes (SC)?',
    question_hi: 'बिहार में लोकसभा की कुल 40 सीटों में से कितनी सीटें अनुसूचित जाति (SC) के लिए आरक्षित हैं?',
    option_a: '2',
    option_a_hi: '2',
    option_b: '4',
    option_b_hi: '4',
    option_c: '6',
    option_c_hi: '6',
    option_d: '8',
    option_d_hi: '8',
    correct_answer: 'C',
    explanation: '6 seats are reserved for SC: Gopalganj, Hajipur, Samastipur, Sasaram, Gaya, and Jamui.',
    explanation_hi: 'गोपालगंज, हाजीपुर, समस्तीपुर, सासाराम, गया और जमुई—ये 6 सीटें एससी के लिए आरक्षित हैं।'
  },
  {
    id: 'q-bihar-10-5',
    lesson_id: 'lesson-bihar-10',
    subject_id: 'bihar-gk',
    question: 'Who was the first Chief Minister of independent Bihar?',
    question_hi: 'स्वतंत्र बिहार के प्रथम मुख्यमंत्री कौन थे?',
    option_a: 'Dr. Sri Krishna Sinha (Sri Babu)',
    option_a_hi: 'डॉ. श्रीकृष्ण सिंह (श्री बाबू)',
    option_b: 'Dr. Anugrah Narayan Sinha',
    option_b_hi: 'डॉ. अनुग्रह नारायण सिन्हा',
    option_c: 'Karpoori Thakur',
    option_c_hi: 'कर्पूरी ठाकुर',
    option_d: 'Mahamaya Prasad Sinha',
    option_d_hi: 'महामाया प्रसाद सिन्हा',
    correct_answer: 'A',
    explanation: 'Dr. Sri Krishna Sinha served as Bihar’s premier and first Chief Minister from 1937 to 1961.',
    explanation_hi: 'बिहार केसरी डॉ. श्रीकृष्ण सिंह बिहार के प्रथम मुख्यमंत्री बने और 1961 तक पद पर रहे।'
  }
];
