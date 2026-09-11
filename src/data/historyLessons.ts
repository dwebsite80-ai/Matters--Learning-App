import { Lesson, Question } from '../types';

export const HISTORY_LESSONS: Lesson[] = [
  // 1. Indus Valley Civilization and Vedic Age
  {
    id: 'lesson-history-1',
    topic_id: 'history-1',
    subject_id: 'history-movement',
    title: 'Indus Valley Civilization and Vedic Age',
    title_hi: 'सिंधु घाटी सभ्यता एवं वैदिक काल',
    subtitle: 'Bronze Age Urban Planning to Iron Age Philosophy',
    subtitle_hi: 'कांस्य युगीन नगरीय नियोजन से लौह युगीन दार्शनिक चिंतन तक',
    estimated_minutes: 15,
    difficulty: 'Beginner',
    hook: 'Five thousand years ago, while Europe lived in simple huts, the Indus Valley built multi-story brick houses with covered underground drainage, public baths, and standardized weights. What made this Bronze Age society so extraordinarily advanced?',
    hook_hi: 'आज से 5,000 वर्ष पूर्व जब विश्व के अधिकांश हिस्सों में मानव बस्तियाँ प्रारंभिक अवस्था में थीं, सिंधु घाटी सभ्यता में पक्की ईंटों के दोमंजिला मकान, भूमिगत नालियाँ और सुव्यवस्थित स्नानागार थे। यह सभ्यता इतनी उन्नत कैसे थी?',
    sections: [
      {
        title: 'Harappan Town Planning and Sites',
        title_hi: 'हड़प्पा सभ्यता का नगर नियोजन एवं प्रमुख स्थल',
        content: 'Discovered in 1921 by Dayaram Sahni (Harappa on Ravi) and 1922 by R.D. Banerjee (Mohenjo-daro on Indus), the Harappan civilization was characterized by a strict grid pattern (streets cutting at right angles), burnt-brick architecture, citadel (upper town) and lower town, and advanced covered drainage. Key sites include Mohenjo-daro (Great Bath, Granary, Bronze Dancing Girl, Pashupati Seal), Lothal (artificial dockyard, rice husk, fire altars), Kalibangan (ploughed field, fire altars), and Dholavira (unique 3-tier town planning, stone architecture, giant water reservoirs).',
        content_hi: '1921 में दयाराम साहनी ने हड़प्पा (रावी नदी) तथा 1922 में राखालदास बनर्जी ने मोहनजोदड़ो (सिंधु नदी) की खोज की। ग्रिड पद्धति (सड़कें समकोण पर), पक्की ईंटें और भूमिगत जल निकासी इसकी पहचान थी। प्रमुख स्थल: मोहनजोदड़ो (विशाल स्नानागार, नर्तकी की कांस्य मूर्ति), लोथल (प्राचीन बंदरगाह/डॉकयार्ड), कालीबंगा (जुते हुए खेत), धोलावीरा (त्रिस्तरीय नगर नियोजन व जल संचयन प्रणाली)।',
        iconType: 'concept'
      },
      {
        title: 'Rig Vedic vs Later Vedic Society and Economy',
        title_hi: 'ऋग्वैदिक काल बनाम उत्तर वैदिक काल',
        content: 'The Early Vedic period (1500–1000 BCE) was pastoral, with cattle (Gau) as the primary measure of wealth. The political structure revolved around tribal assemblies (Sabha, Samiti, Vidatha) where women participated freely. The Later Vedic period (1000–600 BCE), marked by the discovery of iron (Syama/Krishna Ayas), witnessed sedentary agriculture, rise of territorial kingdoms (Janapadas), rigid varna stratification, and the decline in women’s status.',
        content_hi: 'ऋग्वैदिक काल (1500-1000 ई.पू.) पशुचारक था, जिसमें गाय संपत्ति का मुख्य आधार थी। सभा, समिति और विदथ जैसी संस्थाओं में महिलाओं की सहभागिता थी। उत्तर वैदिक काल (1000-600 ई.पू.) में लोहे (श्याम अयस) की खोज से कृषि का विस्तार हुआ, बड़े जनपदों का उदय हुआ और वर्ण व्यवस्था जन्म आधारित व कठोर हो गई।',
        highlight: 'The famous Gayatri Mantra is addressed to the solar deity Savitr and is found in the 3rd Mandala of the Rigveda (composed by Sage Vishvamitra).',
        highlight_hi: 'प्रसिद्ध गायत्री मंत्र सूर्य देव (सविता) को समर्पित है और ऋग्वेद के तीसरे मंडल में निहित है (जिसकी रचना महर्षि विश्वामित्र ने की थी)।',
        iconType: 'tip'
      },
      {
        title: 'Vedic Literature: Samhitas, Brahmanas, and Upanishads',
        title_hi: 'वैदिक साहित्य: संहिताएं, ब्राह्मण ग्रंथ एवं उपनिषद',
        content: 'The four Vedas are Rigveda (hymns), Samaveda (melodies/chants - origin of Indian music), Yajurveda (rituals and sacrifices), and Atharvaveda (charms, spells, and healing). The Upanishads (Vedanta) mark the philosophical culmination, emphasizing the identity of Atman (individual self) with Brahman (universal reality).',
        content_hi: 'चार वेद: ऋग्वेद (स्तुतियाँ), सामवेद (भारतीय संगीत का जनक), यजुर्वेद (कर्मकांड एवं यज्ञीय विधान), और अथर्ववेद (औषधि, तंत्र-मंत्र)। उपनिषद (वेदांत) वैदिक ज्ञान की पराकाष्ठा हैं जो आत्मा और ब्रह्म के एकत्व का प्रतिपादन करते हैं।',
        iconType: 'concept'
      }
    ],
    practical_example: {
      scenario: 'A BPSC candidate is asked about the source of the national motto "Satyameva Jayate".',
      scenario_hi: 'परीक्षा प्रश्न: "भारत का राष्ट्रीय आदर्श वाक्य \'सत्यमेव जयते\' किस उपनिषद से लिया गया है?"',
      analysis: 'It is taken from the Mundaka Upanishad (associated with the Atharvaveda).',
      analysis_hi: 'यह मुंडकोपनिषद से उद्धृत किया गया है।',
      actionable_tip: 'Do not confuse Mundaka Upanishad with Mandukya Upanishad (the shortest Upanishad).',
      actionable_tip_hi: 'मुंडकोपनिषद और मांडूक्योपनिषद के बीच भ्रमित न हों—सत्यमेव जयते मुंडकोपनिषद से है।'
    },
    key_takeaways: [
      'Lothal was the primary port town with an artificial brick dockyard.',
      'Dholavira in Gujarat is famed for its monumental water reservoirs (UNESCO site).',
      'Rigveda contains 1,028 Suktas (hymns) organized into 10 Mandalas.',
      'The battle of Ten Kings (Dasarajna Yuddha) was fought on the banks of Parushni (Ravi) River.'
    ],
    key_takeaways_hi: [
      'लोथल हड़प्पा सभ्यता का प्रसिद्ध बंदरगाह नगर (गोदीबाड़ा) था।',
      'धोलावीरा (गुजरात) अपने अद्भुत जल संरक्षण तंत्र के लिए प्रसिद्ध यूनेस्को स्थल है।',
      'ऋग्वेद में 10 मंडलों में 1,028 सूक्त संकलित हैं।',
      'दसराज युद्ध (दस राजाओं का युद्ध) परुष्णी (रावी) नदी के तट पर लड़ा गया था।'
    ]
  },

  // 2. Religious Movements and Mahajanapadas
  {
    id: 'lesson-history-2',
    topic_id: 'history-2',
    subject_id: 'history-movement',
    title: 'Religious Movements and Mahajanapadas',
    title_hi: 'धार्मिक सुधार आंदोलन एवं 16 महाजनपद',
    subtitle: 'The 6th Century BCE Intellectual Renaissance',
    subtitle_hi: 'छठी शताब्दी ई.पू. की दार्शनिक क्रांति एवं नगरीय क्रांति',
    estimated_minutes: 15,
    difficulty: 'Intermediate',
    hook: 'Why did the 6th century BCE witness an explosion of heterodox philosophies rejecting Vedic orthodoxy? The rise of money economy, trade guilds, and urbanization created the fertile ground for Buddhism and Jainism.',
    hook_hi: 'छठी शताब्दी ईसा पूर्व में वैदिक कर्मकांडों के विरुद्ध 62 से अधिक नए दार्शनिक संप्रदायों का उदय क्यों हुआ? व्यापारिक समृद्धि, आहत सिक्कों और द्वितीय नगरीकरण ने नए विचारों को जन्म दिया।',
    sections: [
      {
        title: 'Sixteen Mahajanapadas and Three in Bihar',
        title_hi: '16 महाजनपद एवं बिहार के तीन महाजनपद',
        content: 'Buddhist text "Anguttara Nikaya" and Jain text "Bhagavati Sutra" list the 16 Mahajanapadas. Three were located in modern Bihar: 1) Magadha (capital: Girivraja/Rajgriha, later Pataliputra); 2) Anga (capital: Champa in modern Bhagalpur/Munger); 3) Vajji (a democratic confederacy of 8 clans centered at Vaishali).',
        content_hi: 'बौद्ध ग्रंथ "अंगुत्तर निकाय" और जैन ग्रंथ "भगवती सूत्र" में 16 महाजनपदों का उल्लेख है। इनमें से 3 महाजनपद आधुनिक बिहार में थे: 1) मगध (राजधानी: गिरिव्रज/राजगृह, बाद में पाटलिपुत्र); 2) अंग (राजधानी: चंपा, भागलपुर-मुंगेर); 3) वज्जि संघ (वैशाली, 8 कुलों का लोकतांत्रिक संघ)।',
        iconType: 'concept'
      },
      {
        title: 'Teachings of Gautama Buddha (Buddhism)',
        title_hi: 'गौतम बुद्ध के उपदेश एवं बौद्ध धर्म के सिद्धांत',
        content: 'Buddha expounded the Four Noble Truths (Chatvari Arya Satyani): 1) World is full of suffering (Dukkha); 2) Cause of suffering is desire (Samudaya); 3) Cessation of suffering is Nirvana (Nirodha); 4) Path to cessation is the Eightfold Path (Ashtangika Marga - Right view, resolve, speech, action, livelihood, effort, mindfulness, concentration). He preached the Middle Path (Madhyama Pratipada).',
        content_hi: 'बुद्ध ने चार आर्य सत्य दिए: दुख, दुख समुदाय, दुख निरोध, और दुख निरोध गामिनी प्रतिपदा (अष्टांगिक मार्ग)। उन्होंने अति-तपस्या और अति-विलासिता दोनों को त्यागकर "मध्यम मार्ग" (मध्यमा प्रतिपदा) अपनाने की शिक्षा दी। उनके प्रथम उपदेश को "धर्मचक्रप्रवर्तन" कहा गया।',
        highlight: 'Four Buddhist Councils: 1st at Rajgriha (483 BCE); 2nd at Vaishali (383 BCE); 3rd at Pataliputra (250 BCE); 4th at Kundalvana, Kashmir (72 CE under Kanishka).',
        highlight_hi: 'चार बौद्ध संगीतियां: प्रथम - राजगृह (483 ई.पू.); द्वितीय - वैशाली (383 ई.पू.); तृतीय - पाटलिपुत्र (250 ई.पू.); चतुर्थ - कुंडलवन, कश्मीर (72 ईस्वी, कनिष्क के काल में)।',
        iconType: 'tip'
      },
      {
        title: 'Jainism: Mahavira and Triratna',
        title_hi: 'जैन धर्म: भगवान महावीर एवं त्रिरत्न',
        content: 'Vardhamana Mahavira added the vow of Brahmacharya (celibacy) to the four moral vows of Parshvanatha (Satya, Ahimsa, Asteya, Aparigraha). Jainism emphasizes absolute non-violence (Ahimsa Paramo Dharma) and the epistemological doctrine of Anekantavada (multiplicity of viewpoints) and Syadvada (relativism). Salvation is attained through the Triratna: Right Faith (Samyak Darshana), Right Knowledge (Samyak Jnana), and Right Conduct (Samyak Charitra).',
        content_hi: 'भगवान महावीर ने पार्श्वनाथ के चार महाव्रतों (सत्य, अहिंसा, अस्तेय, अपरिग्रह) में पाँचवाँ व्रत "ब्रह्मचर्य" जोड़ा। जैन धर्म में अहिंसा पर सर्वाधिक बल दिया गया है। स्याद्वाद और अनेकांतवाद इसके प्रमुख दार्शनिक सिद्धांत हैं। मोक्ष प्राप्ति हेतु त्रिरत्न: सम्यक् दर्शन, सम्यक् ज्ञान, और सम्यक् चरित्र हैं।',
        iconType: 'concept'
      }
    ],
    practical_example: {
      scenario: 'A BPSC question asks: "In which ancient text are the 16 Mahajanapadas mentioned for the first time?"',
      scenario_hi: 'परीक्षा प्रश्न: "16 महाजनपदों की सूची किस प्राचीन बौद्ध ग्रंथ में मिलती है?"',
      analysis: 'The Anguttara Nikaya (a collection of discourses in the Sutta Pitaka).',
      analysis_hi: 'बौद्ध ग्रंथ अंगुत्तर निकाय में। (जैन ग्रंथ भगवती सूत्र में भी यह सूची मिलती है)।',
      actionable_tip: 'Three Mahajanapadas—Magadha, Anga, and Vajji—were located in Bihar.',
      actionable_tip_hi: 'याद रखें कि 16 में से 3 महाजनपद (मगध, अंग और वज्जि) बिहार में स्थित थे।'
    },
    key_takeaways: [
      'Anguttara Nikaya lists the 16 Mahajanapadas.',
      'Buddha’s first sermon was at Sarnath (Dharmachakrapravartana).',
      'Fourth Buddhist Council under Kanishka split Buddhism into Hinayana and Mahayana.',
      'Jain Triratna: Samyak Darshana, Samyak Jnana, Samyak Charitra.'
    ],
    key_takeaways_hi: [
      'अंगुत्तर निकाय और भगवती सूत्र 16 महाजनपदों का वर्णन करते हैं।',
      'बुद्ध ने अपना प्रथम उपदेश सारनाथ में दिया (धर्मचक्रप्रवर्तन)।',
      'चतुर्थ बौद्ध संगीति में बौद्ध धर्म हीनयान और महायान में विभाजित हुआ।',
      'जैन धर्म के त्रिरत्न: सम्यक् दर्शन, सम्यक् ज्ञान, और सम्यक् चरित्र।'
    ]
  },

  // 3. Delhi Sultanate and Mughal Empire
  {
    id: 'lesson-history-3',
    topic_id: 'history-3',
    subject_id: 'history-movement',
    title: 'Delhi Sultanate and Mughal Empire',
    title_hi: 'दिल्ली सल्तनत एवं मुग़ल साम्राज्य',
    subtitle: 'From the Slave Dynasty to the Zenith of Mughal Architecture',
    subtitle_hi: 'गुलाम वंश से मुग़ल वास्तुकला के चरमोत्कर्ष तक',
    estimated_minutes: 15,
    difficulty: 'Intermediate',
    hook: 'How did Central Asian conquerors and indigenous Indian traditions merge over five centuries to forge a distinct Indo-Islamic culture, revenue administration, and architectural wonders like the Qutub Minar and Taj Mahal?',
    hook_hi: 'पाँच शताब्दियों तक मध्य एशियाई और भारतीय संस्कृतियों के संगम ने कैसे एक विशिष्ट भारत-इस्लामी संस्कृति, भू-राजस्व प्रणाली और विश्व प्रसिद्ध स्थापत्य कला को जन्म दिया?',
    sections: [
      {
        title: 'Delhi Sultanate: Five Dynasties (1206–1526)',
        title_hi: 'दिल्ली सल्तनत: पाँच राजवंश (1206-1526 ई.)',
        content: 'Founded by Qutb-ud-din Aibak in 1206, the Sultanate spanned five dynasties: Slave/Mamluk (1206–1290, featuring Iltutmish who instituted the Iqta system and Chalisa, and Razia Sultan, first female Muslim ruler); Khalji (1290–1320, featuring Alauddin Khalji with market control policies and Dagh-Chehra military reforms); Tughlaq (1320–1414, featuring Muhammad bin Tughlaq’s token currency experiments and Firoz Shah Tughlaq’s canals and public works); Sayyid (1414–1451); and Lodi (1451–1526, ending when Babur defeated Ibrahim Lodi at First Battle of Panipat).',
        content_hi: 'कुतुबुद्दीन ऐबक ने 1206 में गुलाम वंश की नींव रखी। पाँच राजवंश: 1) गुलाम वंश (इल्तुतमिश - इक्ता प्रणाली और तुर्कान-ए-चहलगानी; रजिया सुल्तान - प्रथम महिला शासक); 2) खिलजी वंश (अलाउद्दीन खिलजी - बाजार नियंत्रण नीति और दाग-चेहरा प्रथा); 3) तुगलक वंश (मुहम्मद बिन तुगलक - सांकेतिक मुद्रा; फिरोज शाह तुगलक - नहरें व दीवान-ए-खैरात); 4) सैयद वंश; 5) लोदी वंश (इब्राहिम लोदी 1526 में पानीपत के प्रथम युद्ध में बाबर से पराजित हुआ)।',
        iconType: 'concept'
      },
      {
        title: 'Mughal Empire: Babur to Akbar’s Syncretic Rule',
        title_hi: 'मुग़ल साम्राज्य: बाबर से अकबर का सुलह-ए-कुल',
        content: 'Zahir-ud-din Babur established the Mughal dynasty in 1526 using Tulghuma tactics and field artillery. Akbar (1556–1605), ascending the throne after defeating Hemu at Second Battle of Panipat (1556), consolidated the empire through the Mansabdari system, Todar Mal’s Bandobast (Zabti/Dahsala system), abolished Jizya (1564), and propounded the ethical-syncretic code Din-i-Ilahi (1582) anchored on Sulh-i-Kul (universal peace).',
        content_hi: 'बाबर ने 1526 में पानीपत के प्रथम युद्ध में तोपों और तुलगुमा पद्धति से मुग़ल साम्राज्य की स्थापना की। अकबर ने मनसबदारी व्यवस्था, राजा टोडरमल की दहसाला भू-राजस्व प्रणाली लागू की, 1564 में जजिया कर समाप्त किया और "सुलह-ए-कुल" (सार्वभौमिक शांति) पर आधारित "दीन-ए-इलाही" (1582) का प्रतिपादन किया।',
        highlight: 'Akbar built the Ibadat Khana at Fatehpur Sikri in 1575 for theological debates among scholars of all world religions.',
        highlight_hi: 'अकबर ने 1575 में फतेहपुर सीकरी में इबादतखाना का निर्माण कराया जहाँ विभिन्न धर्मों के विद्वानों के साथ दार्शनिक विचार-विमर्श होता था।',
        iconType: 'tip'
      },
      {
        title: 'Golden Age of Art and Decline: Jahangir to Aurangzeb',
        title_hi: 'कला का स्वर्णकाल एवं पतन: जहाँगीर, शाहजहाँ और औरंगजेब',
        content: 'Jahangir’s reign represented the peak of Mughal miniature painting and justice (Chain of Justice - Zanjir-i-Adl). Shah Jahan’s reign was the Golden Age of Mughal Architecture (Taj Mahal, Red Fort, Jama Masjid, Peacock Throne). Aurangzeb Alamgir (1658–1707) reversed religious pluralism, reimposed Jizya (1679), and fought prolonged campaigns in the Deccan, precipitating empire overextension.',
        content_hi: 'जहाँगीर का काल मुग़ल चित्रकला का स्वर्णकाल माना जाता है (न्याय की जंजीर)। शाहजहाँ का काल मुग़ल स्थापत्य कला का स्वर्णकाल था (ताजमहल, लाल किला, जामा मस्जिद)। औरंगजेब ने 1679 में पुनः जजिया कर लगाया और दक्षिण के 25 वर्षीय अभियानों ने मुग़ल साम्राज्य के पतन का मार्ग प्रशस्त किया।',
        iconType: 'concept'
      }
    ],
    practical_example: {
      scenario: 'A BPSC question asks: "Who introduced the Dahsala system of land revenue in the Mughal Empire?"',
      scenario_hi: 'परीक्षा प्रश्न: "मुग़ल काल में भू-राजस्व की \'दहसाला प्रणाली\' किसके द्वारा शुरू की गई थी?"',
      analysis: 'Raja Todar Mal, Akbar’s finance minister, in 1580 (also called Todar Mal’s Bandobast).',
      analysis_hi: 'अकबर के वित्त मंत्री राजा टोडरमल द्वारा 1580 में (टोडरमल बंदोबस्त)।',
      actionable_tip: 'Under Dahsala, average produce and average prices of the past 10 years were calculated to fix state share at one-third.',
      actionable_tip_hi: 'दहसाला में पिछले 10 वर्षों की औसत उपज और औसत मूल्य के आधार पर 1/3 राजस्व तय होता था।'
    },
    key_takeaways: [
      'Razia Sultan (1236–1240) was the first and only woman sultan of Delhi.',
      'Alauddin Khalji instituted strict price control markets and Dagh-Huliya system.',
      'First Battle of Panipat took place on 21 April 1526 (Babur defeated Ibrahim Lodi).',
      'Akbar abolished Jizya in 1564; Aurangzeb reimposed it in 1679.'
    ],
    key_takeaways_hi: [
      'रजिया सुल्तान दिल्ली सल्तनत की प्रथम व एकमात्र महिला मुस्लिम शासक थीं।',
      'अलाउद्दीन खिलजी ने कठोर बाजार नियंत्रण नीति और घोड़ों को दागने की प्रथा शुरू की।',
      'पानीपत का प्रथम युद्ध 21 अप्रैल 1526 को हुआ (बाबर ने इब्राहिम लोदी को हराया)।',
      'अकबर ने 1564 में जजिया समाप्त किया, जबकि औरंगजेब ने 1679 में इसे पुनः लगाया।'
    ]
  },

  // 4. British Expansion and Land Revenue Systems
  {
    id: 'lesson-history-4',
    topic_id: 'history-4',
    subject_id: 'history-movement',
    title: 'British Expansion and Land Revenue Systems',
    title_hi: 'ब्रिटिश साम्राज्य विस्तार एवं भू-राजस्व व्यवस्थाएं',
    subtitle: 'From Plassey to Permanent Settlement, Ryotwari, and Mahalwari',
    subtitle_hi: 'प्लासी की विजय से स्थायी बंदोबस्त, रैयतवाड़ी एवं महालवाड़ी तक',
    estimated_minutes: 15,
    difficulty: 'Intermediate',
    hook: 'How did a private commercial corporation—the British East India Company—transform into the political master of a subcontinent of 200 million people, extracting trillions through three distinct land taxation frameworks?',
    hook_hi: 'एक व्यापारिक कंपनी (ईस्ट इंडिया कंपनी) पूरे भारत की संप्रभु स्वामी कैसे बन गई? कंपनी ने स्थायी बंदोबस्त, रैयतवाड़ी और महालवाड़ी के जरिए भारतीय कृषि का किस प्रकार शोषण किया?',
    sections: [
      {
        title: 'Plassey (1757) and Buxar (1764): The Conquest of Bengal',
        title_hi: 'प्लासी (1757) एवं बक्सर (1764): बंगाल की विजय',
        content: 'The Battle of Plassey (23 June 1757) saw Robert Clive defeat Nawab Siraj-ud-Daula through the betrayal of Mir Jafar. The Battle of Buxar (22 October 1764) was decisive: Hector Munro defeated the joint forces of Mir Qasim, Shuja-ud-Daula, and Shah Alam II. The Treaty of Allahabad (1765) granted the Diwani (revenue rights) of Bengal, Bihar, and Orissa to the Company, introducing Robert Clive’s Dual Government (Dyarchy) from 1765 to 1772.',
        content_hi: '23 जून 1757 को प्लासी के युद्ध में रॉबर्ट क्लाइव ने मीर जाफर के विश्वासघात के बल पर सिराजुद्दौला को हराया। 22 अक्टूबर 1764 को बक्सर के युद्ध में हेक्टर मुनरो ने मीर कासिम, शुजाउद्दौला और शाहआलम द्वितीय की संयुक्त सेना को हराकर 1765 की इलाहाबाद की संधि द्वारा बंगाल, बिहार और ओडिशा की दीवानी हासिल की। क्लाइव ने द्वैध शासन (1765-1772) लागू किया।',
        iconType: 'concept'
      },
      {
        title: 'Permanent Settlement (Zamindari System, 1793)',
        title_hi: 'स्थायी बंदोबस्त (जमींदारी व्यवस्था, 1793)',
        content: 'Introduced by Lord Cornwallis in Bengal, Bihar, and Orissa in 1793, the Permanent Settlement recognized Zamindars as absolute owners of the land with hereditary rights. Revenue demand was fixed permanently: out of 11 parts collected, 10/11 went to the Company and 1/11 was retained by the Zamindar. The stringent "Sunset Law" mandated auctioning zamindaris if payment was not submitted before sunset on the due date.',
        content_hi: 'लॉर्ड कॉर्नवालिस ने 1793 में बंगाल, बिहार और ओडिशा में स्थायी बंदोबस्त लागू किया। इसमें जमींदारों को भूमि का स्थायी स्वामी मान लिया गया। लगान की दर हमेशा के लिए तय कर दी गई (10/11 भाग कंपनी का, 1/11 भाग जमींदार का)। निर्धारित तिथि के सूर्यास्त से पूर्व लगान न चुकाने पर जमींदारी नीलाम करने का "सूर्यास्त नियम" (Sunset Law) था।',
        highlight: 'Permanent Settlement covered approximately 19% of British India’s total territory.',
        highlight_hi: 'स्थायी बंदोबस्त ब्रिटिश भारत के लगभग 19% भू-भाग पर लागू था।',
        iconType: 'tip'
      },
      {
        title: 'Ryotwari and Mahalwari Systems',
        title_hi: 'रैयतवाड़ी एवं महालवाड़ी व्यवस्था',
        content: 'The Ryotwari System, devised by Thomas Munro and Captain Alexander Read, was introduced in Madras, Bombay, and Assam (~51% of British territory), establishing direct settlement with individual cultivators (Ryots). The Mahalwari System, planned by Holt Mackenzie (1822) and implemented by Martin Bird in North-Western Provinces, Punjab, and Central India (~30% territory), settled revenue with village communities (Mahals) represented by the village headman (Lambardar).',
        content_hi: 'रैयतवाड़ी व्यवस्था थॉमस मुनरो और कैप्टन रीड द्वारा मद्रास, बंबई और असम (~51% क्षेत्र) में लागू की गई जिसमें किसानों (रैयतों) से सीधा लगान वसूला जाता था। महालवाड़ी व्यवस्था हॉल्ट मैकेंजी (1822) द्वारा उत्तर-पश्चिम प्रांत, पंजाब और मध्य भारत (~30% क्षेत्र) में लागू की गई जिसमें पूरे गाँव (महाल) से सामूहिक रूप से लगान तय होता था।',
        iconType: 'concept'
      }
    ],
    practical_example: {
      scenario: 'A BPSC question asks: "Who was the Governor-General of India when the Permanent Settlement was introduced in Bihar and Bengal in 1793?"',
      scenario_hi: 'परीक्षा प्रश्न: "1793 में बंगाल और बिहार में स्थायी बंदोबस्त लागू करते समय भारत का गवर्नर-जनरल कौन था?"',
      analysis: 'Lord Cornwallis (assisted by John Shore who planned the modalities).',
      analysis_hi: 'लॉर्ड कॉर्नवालिस (सर जॉन शोर की योजना के आधार पर)।',
      actionable_tip: 'Cornwallis is also known as the "Father of Civil Services in India".',
      actionable_tip_hi: 'कॉर्नवालिस को भारत में "नागरिक सेवा का जनक" (Father of Civil Services) भी कहा जाता है।'
    },
    key_takeaways: [
      'Battle of Plassey: 23 June 1757; Battle of Buxar: 22 October 1764.',
      'Treaty of Allahabad (1765) granted Diwani of Bihar, Bengal, and Orissa to Company.',
      'Permanent Settlement covered 19% of territory; Ryotwari covered 51%; Mahalwari covered 30%.',
      'Sunset Law was an integral part of the Permanent Settlement in Bihar.'
    ],
    key_takeaways_hi: [
      'प्लासी का युद्ध 23 जून 1757 और बक्सर का युद्ध 22 अक्टूबर 1764 को हुआ।',
      '1765 की इलाहाबाद की संधि से बिहार, बंगाल व ओडिशा की दीवानी अंग्रेजों को मिली।',
      'स्थायी बंदोबस्त 19% क्षेत्र, रैयतवाड़ी 51% क्षेत्र, और महालवाड़ी 30% क्षेत्र में लागू था।',
      'सूर्यास्त कानून (Sunset Law) स्थायी बंदोबस्त का एक कठोर नियम था।'
    ]
  },

  // 5. Revolt of 1857 and Tribal/Peasant Movements
  {
    id: 'lesson-history-5',
    topic_id: 'history-5',
    subject_id: 'history-movement',
    title: 'Revolt of 1857 and Tribal/Peasant Movements',
    title_hi: '1857 का महासंग्राम एवं जनजातीय/किसान आंदोलन',
    subtitle: 'From Mangal Pandey to the Santhal Hool and Birsa Munda’s Ulgulan',
    subtitle_hi: 'मंगल पांडे से संथाल हूल एवं भगवान बिरसा मुंडा के उलगुलान तक',
    estimated_minutes: 15,
    difficulty: 'Intermediate',
    hook: 'Was the 1857 uprising merely a sepoy mutiny, or the First War of Indian Independence? Across Northern and Central India, princes, sepoys, peasants, and tribal warriors united against British colonial tyranny.',
    hook_hi: 'क्या 1857 की क्रांति केवल एक सैनिक विद्रोह थी या भारत का प्रथम स्वतंत्रता संग्राम? उत्तर और मध्य भारत में राजाओं, सैनिकों, किसानों और आदिवासियों ने मिलकर ब्रिटिश सत्ता की नींव हिला दी।',
    sections: [
      {
        title: 'Causes and Outbreak of the 1857 Revolt',
        title_hi: '1857 की क्रांति के कारण एवं प्रसार',
        content: 'Causes were multi-faceted: economic exploitation, Dalhousie’s Doctrine of Lapse (Satara, Jhansi, Nagpur annexed), religious interference (Enfield rifle cartridge greased with cow and pig fat). On 29 March 1857, Mangal Pandey revolted at Barrackpore. On 10 May 1857, sepoys at Meerut mutinied, marched to Delhi, and proclaimed aged Mughal Emperor Bahadur Shah Zafar as the Emperor of Hindustan.',
        content_hi: 'कारण: डलहौजी की हड़प नीति (Doctrine of Lapse), आर्थिक शोषण, और एनफील्ड राइफल के चर्बीयुक्त कारतूस। 29 मार्च 1857 को बैरकपुर में मंगल पांडे ने विद्रोह किया। 10 मई 1857 को मेरठ से सैनिकों ने कूच कर दिल्ली पर अधिकार किया और अंतिम मुग़ल बादशाह बहादुर शाह जफर को भारत का सम्राट घोषित किया।',
        iconType: 'concept'
      },
      {
        title: 'Key Centers and Leaders of the 1857 Revolt',
        title_hi: '1857 क्रांति के प्रमुख केंद्र एवं नेतृत्वकर्ता',
        content: 'Delhi: General Bakht Khan; Kanpur: Nana Saheb and Tatya Tope; Lucknow: Begum Hazrat Mahal; Jhansi: Rani Lakshmibai (heroic battle against Hugh Rose); Bareilly: Khan Bahadur Khan; Faizabad: Maulvi Ahmadullah; Bihar: Babu Veer Kunwar Singh and Amar Singh of Jagdishpur. Following the revolt, the British Crown took over direct governance via the Government of India Act 1858 (Queen’s Proclamation).',
        content_hi: 'दिल्ली: जनरल बख्त खां; कानपुर: नाना साहेब और तात्या टोपे; लखनऊ: बेगम हजरत महल; झांसी: रानी लक्ष्मीबाई (ह्यूरोज के विरुद्ध अदम्य शौर्य); बरेली: खान बहादुर खां; फैजाबाद: मौलवी अहमदुल्लाह; बिहार: जगदीशपुर के बाबू वीर कुंवर सिंह। 1858 के भारत शासन अधिनियम द्वारा भारत का शासन सीधे ब्रिटिश महारानी के अधीन आया।',
        iconType: 'tip'
      },
      {
        title: 'Tribal Movements: Santhal Hool and Munda Ulgulan',
        title_hi: 'जनजातीय आंदोलन: संथाल हूल एवं मुंडा उलगुलान',
        content: 'Santhal Hool (1855–56): Led by four Murmu brothers (Sidhu, Kanhu, Chand, Bhairav) in the Damin-i-Koh region (Rajmahal Hills, Bihar) against exploitation by Mahajans, Zamindars, and British police; resulted in the creation of the Santhal Pargana district. Munda Ulgulan (Great Tumult, 1899–1900): Led by Bhagwan Birsa Munda in Ranchi/Chota Nagpur against the erosion of Khuntkatti (communal landholding) and Christian missionaries; led to the landmark Chota Nagpur Tenancy (CNT) Act, 1908.',
        content_hi: 'संथाल विद्रोह (1855-56): दामिन-ए-कोह (राजमहल पहाड़ी, बिहार) में सिद्धू, कान्हू, चांद और भैरव के नेतृत्व में महाजनों और कंपनी के विरुद्ध लड़ा गया; इसके बाद संथाल परगना जिला बना। मुंडा उलगुलान (1899-1900): भगवान बिरसा मुंडा के नेतृत्व में खूंटकट्टी प्रथा (सामूहिक भूमि व्यवस्था) की रक्षा हेतु हुआ, जिसके परिणामस्वरूप छोटानागपुर काश्तकारी अधिनियम (CNT Act) 1908 पारित हुआ।',
        highlight: 'V.D. Savarkar described the 1857 revolt as the "First War of Indian Independence" in his 1909 book.',
        highlight_hi: 'विनायक दामोदर सावरकर ने 1909 में अपनी पुस्तक में 1857 के विद्रोह को "भारत का प्रथम स्वतंत्रता संग्राम" कहा।',
        iconType: 'concept'
      }
    ],
    practical_example: {
      scenario: 'A BPSC question asks: "Who were the leaders of the famous Santhal Rebellion (1855–56) in Bihar?"',
      scenario_hi: 'परीक्षा प्रश्न: "1855-56 के संथाल विद्रोह का नेतृत्व किन भाइयों ने किया था?"',
      analysis: 'Sidhu, Kanhu, Chand, and Bhairav—the four Murmu brothers from Bhagnadih village.',
      analysis_hi: 'भागनाडीह गाँव के चार मुर्मू भाई: सिद्धू, कान्हू, चांद और भैरव।',
      actionable_tip: 'The rebellion broke out on 30 June 1855, celebrated as Santhal Hool Diwas.',
      actionable_tip_hi: '30 जून 1855 को विद्रोह की शुरुआत हुई, इसलिए 30 जून को "हूल दिवस" मनाया जाता है।'
    },
    key_takeaways: [
      'Mangal Pandey revolted at Barrackpore on 29 March 1857 (34th Native Infantry).',
      'General Hugh Rose praised Rani Lakshmibai as "the only man among the rebels".',
      'Santhal Rebellion took place in 1855–56 under Sidhu and Kanhu.',
      'Birsa Munda launched the Ulgulan in 1899–1900; died in Ranchi jail in June 1900.'
    ],
    key_takeaways_hi: [
      'मंगल पांडे (34वीं बंगाल नेटिव इन्फैंट्री) ने 29 मार्च 1857 को बैरकपुर में विद्रोह किया।',
      'ब्रिटिश कमांडर ह्यूरोज ने रानी लक्ष्मीबाई को "विद्रोहियों में एकमात्र पुरुष" कहा था।',
      'संथाल विद्रोह 1855-56 में सिद्धू और कान्हू के नेतृत्व में हुआ।',
      'बिरसा मुंडा ने 1899-1900 में उलगुलान का नेतृत्व किया; जून 1900 में रांची जेल में शहीद हुए।'
    ]
  },

  // 6. Socio-Religious Reform Movements
  {
    id: 'lesson-history-6',
    topic_id: 'history-6',
    subject_id: 'history-movement',
    title: 'Socio-Religious Reform Movements',
    title_hi: 'सामाजिक-धार्मिक सुधार आंदोलन',
    subtitle: 'Raja Ram Mohan Roy, Swami Vivekananda, and Jyotirao Phule',
    subtitle_hi: 'राजा राममोहन राय, स्वामी विवेकानंद एवं ज्योतिराव फुले का योगदान',
    estimated_minutes: 15,
    difficulty: 'Intermediate',
    hook: 'How did 19th-century Indian thinkers challenge centuries-old social evils like Sati, female infanticide, untouchability, and child marriage to awaken national consciousness?',
    hook_hi: '19वीं शताब्दी के भारतीय समाज सुधारकों ने सती प्रथा, बाल विवाह, छुआछूत और अशिक्षा जैसी कुरीतियों पर प्रहार कर आधुनिक भारत की वैचारिक नींव कैसे रखी?',
    sections: [
      {
        title: 'Raja Ram Mohan Roy and Brahmo Samaj',
        title_hi: 'राजा राममोहन राय एवं ब्रह्म समाज',
        content: 'Hailed as the "Father of Modern Indian Renaissance", Raja Ram Mohan Roy established the Atmiya Sabha in 1815 and the Brahmo Samaj in 1828 to promote monotheism and combat idol worship and caste bigotry. His relentless crusade resulted in the abolition of Sati by Governor-General Lord William Bentinck under Regulation XVII of 1829. He also published Persian weekly "Mirat-ul-Akhbar" and Bengali journal "Sambad Kaumudi".',
        content_hi: 'राजा राममोहन राय को "आधुनिक भारत का जनक" और "भारतीय पुनर्जागरण का अग्रदूत" कहा जाता है। उन्होंने 1815 में आत्मीय सभा और 1828 में ब्रह्म समाज की स्थापना की। उनके प्रयासों से लॉर्ड विलियम बेंटिक ने 1829 के नियम 17 द्वारा सती प्रथा को गैरकानूनी घोषित किया। उन्होंने "संवाद कौमुदी" और "मिरातुल अखबार" का संपादन किया।',
        iconType: 'concept'
      },
      {
        title: 'Arya Samaj and Ramakrishna Mission',
        title_hi: 'आर्य समाज एवं रामकृष्ण मिशन',
        content: 'Swami Dayananda Saraswati founded the Arya Samaj in Bombay in 1875, authored "Satyarth Prakash", and gave the rousing call "Go Back to the Vedas". He championed the Shuddhi Movement and DAV schools. Swami Vivekananda founded the Ramakrishna Mission in 1897 to propagate the Vedantic teachings of his guru Sri Ramakrishna Paramahamsa, after spellbinding the World’s Parliament of Religions at Chicago on 11 September 1893.',
        content_hi: 'स्वामी दयानंद सरस्वती ने 1875 में बंबई में आर्य समाज की स्थापना की, "सत्यार्थ प्रकाश" ग्रंथ लिखा और "वेदों की ओर लौटो" का नारा दिया। स्वामी विवेकानंद ने 11 सितंबर 1893 को शिकागो विश्व धर्म संसद में ऐतिहासिक भाषण देकर भारतीय संस्कृति का डंका बजाया और 1897 में रामकृष्ण मिशन की स्थापना की।',
        highlight: 'Ishwar Chandra Vidyasagar’s tireless campaign led to the passage of the Hindu Widows’ Remarriage Act, 1856 (Lord Canning).',
        highlight_hi: 'ईश्वरचंद्र विद्यासागर के अथक प्रयासों से 1856 में हिंदू विधवा पुनर्विवाह अधिनियम पारित हुआ।',
        iconType: 'tip'
      },
      {
        title: 'Anti-Caste and Lower-Caste Movements',
        title_hi: 'जाति-विरोधी एवं निम्न-जाति सुधार आंदोलन',
        content: 'Jyotirao Phule established the Satyashodhak Samaj in Maharashtra in 1873, authored "Gulamgiri" (1873), and opened India’s first schools for girls with his wife Savitribai Phule. In Kerala, Sri Narayana Guru spearheaded the SNDP Yogam preaching "One Caste, One Religion, One God for Man". In Tamil Nadu, E.V. Ramasamy Naicker (Periyar) launched the Self-Respect Movement (1925).',
        content_hi: 'महात्मा ज्योतिराव फुले ने 1873 में "सत्यशोधक समाज" की स्थापना की, "गुलामगिरी" पुस्तक लिखी और सावित्रीबाई फुले के साथ बालिकाओं के लिए प्रथम विद्यालय खोला। केरल में श्री नारायण गुरु ने "मानव के लिए एक जाति, एक धर्म, एक ईश्वर" का संदेश दिया। तमिलनाडु में पेरियार ने 1925 में आत्मसम्मान आंदोलन चलाया।',
        iconType: 'concept'
      }
    ],
    practical_example: {
      scenario: 'A BPSC question asks: "Under which regulation was Sati abolished in 1829?"',
      scenario_hi: 'परीक्षा प्रश्न: "लॉर्ड विलियम बेंटिक ने किस नियम (Regulation) के तहत सती प्रथा को समाप्त किया था?"',
      analysis: 'Bengal Sati Regulation XVII of 1829 (4 December 1829).',
      analysis_hi: '1829 के नियम XVII (सत्रह) के तहत।',
      actionable_tip: 'Initially applied only to the Bengal Presidency, it was extended to Madras and Bombay Presidencies in 1830.',
      actionable_tip_hi: 'पहले यह केवल बंगाल में लागू हुआ, फिर 1830 में मद्रास और बंबई में लागू हुआ।'
    },
    key_takeaways: [
      'Brahmo Samaj founded in 1828 by Raja Ram Mohan Roy.',
      'Sati abolished in 1829 under Regulation XVII by William Bentinck.',
      'Arya Samaj founded in 1875 by Swami Dayananda Saraswati ("Go Back to Vedas").',
      'Jyotirao Phule founded Satyashodhak Samaj (1873) and wrote Gulamgiri.'
    ],
    key_takeaways_hi: [
      '1828 में राजा राममोहन राय ने ब्रह्म समाज की स्थापना की।',
      '1829 के नियम 17 द्वारा विलियम बेंटिक ने सती प्रथा को समाप्त किया।',
      '1875 में स्वामी दयानंद सरस्वती ने आर्य समाज की स्थापना की और सत्यार्थ प्रकाश लिखा।',
      '1873 में ज्योतिराव फुले ने सत्यशोधक समाज बनाया और गुलामगिरी पुस्तक लिखी।'
    ]
  },

  // 7. Rise of Nationalism and Early Congress Phase
  {
    id: 'lesson-history-7',
    topic_id: 'history-7',
    subject_id: 'history-movement',
    title: 'Rise of Nationalism and Early Congress Phase',
    title_hi: 'राष्ट्रवाद का उदय एवं प्रारंभिक कांग्रेस (नरमपंथी चरण)',
    subtitle: '1885–1905: The Era of Petitions, Prayers, and Economic Critique',
    subtitle_hi: '1885-1905: संवैधानिक आंदोलन एवं आर्थिक दोहन का सिद्धांत',
    estimated_minutes: 15,
    difficulty: 'Intermediate',
    hook: 'Seventy-two delegates gathered at Gokuldas Tejpal Sanskrit College in Bombay in late December 1885. How did an organization initiated by a retired British civil servant become the vanguard of Indian liberation?',
    hook_hi: 'दिसंबर 1885 में बंबई के गोकुलदास तेजपाल संस्कृत कॉलेज में 72 प्रतिनिधियों ने मिलकर एक मंच बनाया। एक अवकाशप्राप्त ब्रिटिश अधिकारी द्वारा शुरू की गई कांग्रेस कैसे स्वतंत्रता संग्राम का सबसे बड़ा संगठन बन गई?',
    sections: [
      {
        title: 'Foundation of Indian National Congress (1885)',
        title_hi: 'भारतीय राष्ट्रीय कांग्रेस की स्थापना (1885)',
        content: 'Founded on 28 December 1885 at Bombay by retired British ICS officer Allan Octavian Hume (A.O. Hume). Womesh Chandra Bonnerjee (W.C. Bonnerjee) was elected the first President, attended by 72 delegates. Lord Dufferin was the Viceroy of India, who later mockingly dismissed Congress as representing only a "microscopic minority".',
        content_hi: '28 दिसंबर 1885 को बंबई में ए.ओ. ह्यूम द्वारा भारतीय राष्ट्रीय कांग्रेस की स्थापना हुई। इसके प्रथम अध्यक्ष व्योमेश चंद्र बनर्जी (W.C. Bonnerjee) थे और 72 प्रतिनिधियों ने भाग लिया। उस समय भारत का वायसराय लॉर्ड डफरिन था जिसने इसे "अति-सूक्ष्म अल्पसंख्यक" की संस्था कहा।',
        iconType: 'concept'
      },
      {
        title: 'Moderate Phase (1885–1905) and Methods',
        title_hi: 'नरमपंथी (उदारवादी) चरण एवं कार्यप्रणाली',
        content: 'Prominent Moderate leaders included Dadabhai Naoroji, Gopal Krishna Gokhale, Pherozeshah Mehta, Dinshaw Wacha, and Surendranath Banerjee. Believing in British sense of justice, their methodology rested on the "3 Ps" (Prayers, Petitions, and Protests) within constitutional limits. They demanded civil rights, simultaneous ICS examinations in India and Britain, and legislative council expansion (achieved in Indian Councils Act 1892).',
        content_hi: 'प्रमुख उदारवादी नेता: दादाभाई नौरोजी, गोपाल कृष्ण गोखले, फिरोजशाह मेहता, सुरेंद्रनाथ बनर्जी आदि। इनकी कार्यप्रणाली 3P (Prayer, Petition, Protest - प्रार्थना, याचिका और विरोध) पर आधारित थी। इन्होंने विधायिकाओं के विस्तार, नागरिक स्वतंत्रता और भारत में सिविल सेवा परीक्षा कराने की मांग की।',
        iconType: 'tip'
      },
      {
        title: 'Economic Drain Theory',
        title_hi: 'धन की निकासी का सिद्धांत (Economic Drain Theory)',
        content: 'The greatest contribution of the Moderates was exposing the colonial economic drain. Dadabhai Naoroji ("Grand Old Man of India") formulated the "Drain of Wealth Theory" in his monumental 1901 book "Poverty and Un-British Rule in India". R.C. Dutt reinforced this in "The Economic History of India", and Dinshaw Wacha testified before the Welby Commission.',
        content_hi: 'उदारवादियों का सबसे बड़ा योगदान ब्रिटिश आर्थिक शोषण का पर्दाफाश करना था। दादाभाई नौरोजी ("भारत के वयोवृद्ध पुरुष") ने 1901 की अपनी पुस्तक "Poverty and Un-British Rule in India" में "धन के निष्कासन का सिद्धांत" प्रस्तुत किया। आर.सी. दत्त ने "Economic History of India" लिखकर इसे पुष्ट किया।',
        highlight: 'Dadabhai Naoroji was the first Indian elected to the British House of Commons (from Finsbury Central on a Liberal ticket in 1892).',
        highlight_hi: 'दादाभाई नौरोजी ब्रिटिश संसद (हाउस ऑफ कॉमन्स) के लिए चुने जाने वाले पहले भारतीय थे (1892 में फिन्सबरी से)।',
        iconType: 'concept'
      }
    ],
    practical_example: {
      scenario: 'A BPSC question asks: "Who authored the famous book \'Poverty and Un-British Rule in India\'?"',
      scenario_hi: 'परीक्षा प्रश्न: "\'Poverty and Un-British Rule in India\' पुस्तक के लेखक कौन थे?"',
      analysis: 'Dadabhai Naoroji, published in 1901, analyzing how wealth was remitted to Britain as "Home Charges".',
      analysis_hi: 'दादाभाई नौरोजी (1901 में प्रकाशित)।',
      actionable_tip: 'Dadabhai Naoroji presided over three INC sessions: 1886 (Calcutta), 1893 (Lahore), and 1906 (Calcutta).',
      actionable_tip_hi: 'दादाभाई नौरोजी ने कांग्रेस के तीन अधिवेशनों की अध्यक्षता की: 1886 (कलकत्ता), 1893 (लाहौर) और 1906 (कलकत्ता)।'
    },
    key_takeaways: [
      'First INC Session: Bombay, 1885, presided by W.C. Bonnerjee with 72 delegates.',
      'Viceroy at the time of INC formation was Lord Dufferin.',
      'Dadabhai Naoroji pioneered the Drain of Wealth Theory.',
      'The 1892 Indian Councils Act introduced indirect elections to provincial councils.'
    ],
    key_takeaways_hi: [
      'कांग्रेस का प्रथम अधिवेशन 1885 में बंबई में हुआ, अध्यक्ष डब्ल्यू.सी. बनर्जी थे (72 प्रतिनिधि)।',
      'कांग्रेस की स्थापना के समय भारत का वायसराय लॉर्ड डफरिन था।',
      'दादाभाई नौरोजी ने धन की निकासी (Drain of Wealth) का सिद्धांत प्रतिपादित किया।',
      '1892 के भारतीय परिषद अधिनियम ने पहली बार अप्रत्यक्ष चुनाव प्रणाली की शुरुआत की।'
    ]
  },

  // 8. Swadeshi Movement, Revolutionary Nationalism and Home Rule
  {
    id: 'lesson-history-8',
    topic_id: 'history-8',
    subject_id: 'history-movement',
    title: 'Swadeshi Movement, Revolutionary Nationalism and Home Rule',
    title_hi: 'स्वदेशी आंदोलन, क्रांतिकारी राष्ट्रवाद एवं होमरूल लीग',
    subtitle: 'From Bengal Partition (1905) to Tilak and Annie Besant (1916)',
    subtitle_hi: 'बंग-भंग आंदोलन (1905) से तिलक एवं एनी बेसेंट के होमरूल तक',
    estimated_minutes: 15,
    difficulty: 'Advanced',
    hook: 'When Lord Curzon partitioned Bengal in 1905 on communal lines, thousands tied Rakhis, bathed in the Ganga singing Vande Mataram, and burnt foreign cloth. The era of passive petitions was dead; assertive militant nationalism was born.',
    hook_hi: 'जब 1905 में लॉर्ड कर्जन ने बंगाल का विभाजन किया, तो जनता ने सड़कों पर उतरकर वंदे मातरम गाया, एक-दूसरे को राखी बांधी और विदेशी कपड़ों की होली जलाई। यहीं से उग्रवादी राष्ट्रवाद का जन्म हुआ।',
    sections: [
      {
        title: 'Partition of Bengal (1905) and Swadeshi Movement',
        title_hi: 'बंगाल विभाजन (1905) एवं स्वदेशी आंदोलन',
        content: 'Lord Curzon announced the Partition of Bengal on 19 July 1905, taking effect on 16 October 1905 (observed as National Mourning Day). On 7 August 1905, the Boycott resolution and Swadeshi Movement were proclaimed at the Calcutta Town Hall. Led by Lal-Bal-Pal (Lala Lajpat Rai, Bal Gangadhar Tilak, Bipin Chandra Pal) and Aurobindo Ghosh, the movement championed indigenous production, national schools, and boycott of foreign goods.',
        content_hi: 'लॉर्ड कर्जन ने 19 जुलाई 1905 को बंगाल विभाजन की घोषणा की जो 16 अक्टूबर 1905 से प्रभावी हुआ। 7 अगस्त 1905 को कलकत्ता टाउन हॉल से स्वदेशी और बहिष्कार आंदोलन का शंखनाद हुआ। लाल-बाल-पाल (लाला लाजपत राय, बाल गंगाधर तिलक, विपिन चंद्र पाल) और अरविंद घोष ने इसका नेतृत्व किया।',
        iconType: 'concept'
      },
      {
        title: 'Surat Split (1907) and Revolutionary Nationalism',
        title_hi: 'सूरत विभाजन (1907) एवं क्रांतिकारी राष्ट्रवाद का प्रथम चरण',
        content: 'At the Surat Session in 1907 (presided by Rashbehari Ghosh), the Congress split between Moderates and Extremists. Frustrated by constitutional stagnation, youth turned to revolutionary arms: Anushilan Samiti (Barindra Ghosh, Bhupendranath Datta) and Yugantar in Bengal; Abhinav Bharat (V.D. Savarkar, 1904) in Maharashtra; and Ghadar Party (Lala Har Dayal, Sohan Singh Bhakna, San Francisco 1913). In Muzaffarpur (Bihar) on 30 April 1908, Khudiram Bose (aged 18) and Prafulla Chaki threw a bomb at District Magistrate Kingsford’s carriage.',
        content_hi: '1907 के सूरत अधिवेशन (अध्यक्ष: रासबिहारी घोष) में कांग्रेस का नरम दल और गरम दल में विभाजन हुआ। क्रांतिकारी संगठनों का उदय: अनुशीलन समिति व युगांतर (बंगाल); अभिनव भारत (सावरकर - 1904); गदर पार्टी (लाला हरदयाल - सैन फ्रांसिस्को, 1913)। 30 अप्रैल 1908 को बिहार के मुजफ्फरपुर में खुदीराम बोस और प्रफुल्ल चाकी ने कुख्यात जज किंग्सफोर्ड की बग्घी पर बम फेंका।',
        highlight: 'Khudiram Bose was hanged on 11 August 1908 at Muzaffarpur Jail, becoming one of the youngest martyrs of India’s freedom struggle.',
        highlight_hi: '11 अगस्त 1908 को मुजफ्फरपुर जेल में 18 वर्षीय खुदीराम बोस को फांसी दी गई, जो देश के सबसे युवा शहीदों में से एक बने।',
        iconType: 'tip'
      },
      {
        title: 'Home Rule League Movement (1916) and Lucknow Pact',
        title_hi: 'होमरूल आंदोलन (1916) एवं लखनऊ समझौता',
        content: 'In 1916, Bal Gangadhar Tilak launched the Indian Home Rule League at Belgaum (demanding Swaraj: "Swaraj is my birthright and I shall have it"), while Annie Besant launched the All India Home Rule League at Madras. At the Lucknow Congress (1916, presided by A.C. Majumdar), Moderates and Extremists reunited, and the historic Lucknow Pact with the Muslim League was signed.',
        content_hi: '1916 में बाल गंगाधर तिलक ने बेलगाम से ("स्वराज मेरा जन्मसिद्ध अधिकार है और मैं इसे लेकर रहूँगा") और एनी बेसेंट ने मद्रास से होमरूल लीग शुरू किया। 1916 के लखनऊ अधिवेशन (अध्यक्ष: अंबिका चरण मजूमदार) में नरम और गरम दल पुनः एक हुए तथा कांग्रेस व मुस्लिम लीग के बीच "लखनऊ समझौता" हुआ।',
        iconType: 'concept'
      }
    ],
    practical_example: {
      scenario: 'A BPSC question asks: "In which year and at which session did the Surat Split between Moderates and Extremists take place?"',
      scenario_hi: 'परीक्षा प्रश्न: "कांग्रेस का ऐतिहासिक सूरत विभाजन किस वर्ष और किसकी अध्यक्षता में हुआ था?"',
      analysis: '1907 Surat Session, presided by Dr. Rashbehari Ghosh.',
      analysis_hi: '1907 में ताप्ती नदी के किनारे सूरत में, डॉ. रासबिहारी घोष की अध्यक्षता में।',
      actionable_tip: 'They reunited 9 years later at the 1916 Lucknow Session under A.C. Majumdar.',
      actionable_tip_hi: '1916 के लखनऊ अधिवेशन में 9 वर्ष बाद दोनों दलों का पुनः मिलन हुआ।'
    },
    key_takeaways: [
      'Swadeshi Movement proclaimed on 7 August 1905 at Calcutta Town Hall.',
      'Muzaffarpur Bomb Case occurred on 30 April 1908 (Khudiram Bose was hanged on 11 Aug 1908).',
      'Ghadar Party founded in 1913 at San Francisco by Lala Har Dayal and Sohan Singh Bhakna.',
      'Lucknow Pact signed in 1916 uniting Congress and Muslim League temporarily.'
    ],
    key_takeaways_hi: [
      '7 अगस्त 1905 को कलकत्ता टाउन हॉल से स्वदेशी आंदोलन की घोषणा हुई।',
      'मुजफ्फरपुर बम कांड 30 अप्रैल 1908 को हुआ (11 अगस्त 1908 को खुदीराम बोस को फांसी हुई)।',
      '1913 में सैन फ्रांसिस्को में लाला हरदयाल द्वारा गदर पार्टी की स्थापना हुई।',
      '1916 के लखनऊ समझौते में कांग्रेस और मुस्लिम लीग ने संयुक्त संवैधानिक मांगें रखीं।'
    ]
  },

  // 9. Gandhian Era: Non-Cooperation and Civil Disobedience
  {
    id: 'lesson-history-9',
    topic_id: 'history-9',
    subject_id: 'history-movement',
    title: 'Gandhian Era: Non-Cooperation and Civil Disobedience',
    title_hi: 'गांधी युग: असहयोग आंदोलन एवं सविनय अवज्ञा आंदोलन',
    subtitle: 'From Rowlatt Act and Jallianwala Bagh to the Dandi Salt March',
    subtitle_hi: 'रौलट एक्ट एवं जलियांवाला बाग से दांडी नमक सत्याग्रह तक',
    estimated_minutes: 15,
    difficulty: 'Advanced',
    hook: 'On 12 March 1930, a 61-year-old man stepped out of Sabarmati Ashram with 78 followers to walk 240 miles to the sea and make a handful of illegal salt. Why did this simple mineral shake the foundations of the British Empire?',
    hook_hi: '12 मार्च 1930 को 61 वर्ष के महात्मा गांधी 78 सत्याग्रहियों के साथ साबरमती आश्रम से 240 मील पैदल चलकर समुद्र किनारे पहुंचे और एक मुट्ठी नमक बनाकर कानून तोड़ा। इस साधारण नमक ने ब्रिटिश हुकूमत की नींव कैसे हिला दी?',
    sections: [
      {
        title: 'Rowlatt Satyagraha and Jallianwala Bagh Massacre (1919)',
        title_hi: 'रौलट सत्याग्रह एवं जलियांवाला बाग हत्याकांड (1919)',
        content: 'The anarchical Rowlatt Act (March 1919) authorized indefinite detention without trial ("No Dalil, No Vakil, No Appeal"). On 13 April 1919 (Baisakhi day), Brigadier-General Reginald Dyer ordered troops to fire without warning on an unarmed gathering in Jallianwala Bagh, Amritsar, killing hundreds protesting the arrest of Dr. Saifuddin Kitchlew and Dr. Satyapal. Rabindranath Tagore renounced his Knighthood in protest.',
        content_hi: 'मार्च 1919 के रौलट एक्ट ("ना कोई दलील, ना कोई वकील, ना कोई अपील") के विरुद्ध व्यापक विरोध हुआ। 13 अप्रैल 1919 (बैसाखी) को अमृतसर के जलियांवाला बाग में जनरल डायर ने शांतिपूर्ण सभा पर गोलियां चलवाकर सैकड़ों निहत्थों को मार डाला। इसके विरोध में रवींद्रनाथ टैगोर ने ब्रिटिश "नाइटहुड" की उपाधि त्याग दी।',
        iconType: 'concept'
      },
      {
        title: 'Non-Cooperation and Khilafat Movement (1920–1922)',
        title_hi: 'असहयोग आंदोलन एवं खिलाफत आंदोलन (1920-1922)',
        content: 'Launched on 1 August 1920 (the day Bal Gangadhar Tilak passed away), the Non-Cooperation Movement combined with the Khilafat cause (led by Ali brothers: Shaukat Ali and Mohammad Ali). It involved surrender of titles, boycott of foreign cloth and schools, and picketing of liquor shops. Gandhiji abruptly suspended the movement on 12 February 1922 after the Chauri Chaura incident (4 February 1922, Gorakhpur) where 22 policemen were burnt to death.',
        content_hi: '1 अगस्त 1920 को असहयोग आंदोलन शुरू हुआ (इसी दिन लोकमान्य तिलक का निधन हुआ)। इसमें सरकारी उपाधियों, स्कूलों व विदेशी वस्त्रों का बहिष्कार हुआ। 4 फरवरी 1922 को गोरखपुर के चौरी-चौरा में भीड़ द्वारा थाने में आग लगाकर 22 सिपाहियों को जलाने की हिंसक घटना के बाद गांधीजी ने 12 फरवरी 1922 को बारदोली में आंदोलन वापस ले लिया।',
        iconType: 'warning'
      },
      {
        title: 'Civil Disobedience Movement and Dandi March (1930)',
        title_hi: 'सविनय अवज्ञा आंदोलन एवं दांडी यात्रा (1930)',
        content: 'After declaring Poorna Swaraj (Complete Independence) at the Lahore Congress (1929, Jawaharlal Nehru), Gandhiji launched the Civil Disobedience Movement. The Dandi March began from Sabarmati Ashram on 12 March 1930, reaching Dandi on 5 April 1930 (240 miles). On 6 April 1930, Gandhiji broke the Salt Law. In the North-West, Khan Abdul Ghaffar Khan ("Frontier Gandhi") led the Khudai Khidmatgars (Red Shirts).',
        content_hi: '1929 के लाहौर अधिवेशन (अध्यक्ष: जवाहरलाल नेहरू) में "पूर्ण स्वराज" का प्रस्ताव पारित होने के बाद सविनय अवज्ञा आंदोलन शुरू हुआ। 12 मार्च 1930 को साबरमती से 78 अनुयायियों के साथ शुरू दांडी यात्रा 6 अप्रैल 1930 को दांडी पहुंचकर नमक कानून तोड़ने के साथ पूर्ण हुई। पश्चिमोत्तर सीमा प्रांत में खान अब्दुल गफ्फार खान (सीमांत गांधी) ने "खुदाई खिदमतगार" (लाल कुर्ती) आंदोलन चलाया।',
        highlight: 'Gandhi-Irwin Pact was signed on 5 March 1931, leading to Congress participation in the Second Round Table Conference in London.',
        highlight_hi: '5 मार्च 1931 को गांधी-इरविन समझौता हुआ जिसके बाद गांधीजी द्वितीय गोलमेज सम्मेलन में भाग लेने लंदन गए।',
        iconType: 'tip'
      }
    ],
    practical_example: {
      scenario: 'A BPSC candidate is asked about the date and duration of Mahatma Gandhi’s historic Dandi March.',
      scenario_hi: 'परीक्षा प्रश्न: "महात्मा गांधी की ऐतिहासिक दांडी यात्रा कब से कब तक चली थी?"',
      analysis: 'Started on 12 March 1930 from Sabarmati and ended on 6 April 1930 at Dandi (24 days, 240 miles).',
      analysis_hi: '12 मार्च 1930 से 6 अप्रैल 1930 तक (कुल 24 दिन और 240 मील)।',
      actionable_tip: 'Exactly 78 trusted volunteers accompanied Gandhiji on the march from the ashram.',
      actionable_tip_hi: 'साबरमती आश्रम से गांधीजी के साथ ठीक 78 सत्याग्रही रवाना हुए थे।'
    },
    key_takeaways: [
      'Jallianwala Bagh Massacre happened on 13 April 1919 in Amritsar.',
      'Non-Cooperation Movement was called off on 12 February 1922 due to the Chauri Chaura incident.',
      'Poorna Swaraj resolution was passed at the 1929 Lahore Session on the banks of Ravi.',
      'Dandi March: 12 March to 6 April 1930, breaking the salt monopoly.'
    ],
    key_takeaways_hi: [
      '13 अप्रैल 1919 को जलियांवाला बाग में नरसंहार हुआ।',
      'चौरी-चौरा की घटना के कारण 12 फरवरी 1922 को असहयोग आंदोलन वापस लिया गया।',
      '1929 के लाहौर अधिवेशन में रावी नदी के तट पर पूर्ण स्वराज का संकल्प लिया गया।',
      'दांडी यात्रा 12 मार्च से 6 अप्रैल 1930 तक चली जिसमें नमक कानून तोड़ा गया।'
    ]
  },

  // 10. Quit India Movement, INA and Independence
  {
    id: 'lesson-history-10',
    topic_id: 'history-10',
    subject_id: 'history-movement',
    title: 'Quit India Movement, INA and Independence',
    title_hi: 'भारत छोड़ो आंदोलन, आज़ाद हिंद फ़ौज एवं स्वतंत्रता प्राप्ति',
    subtitle: 'From "Do or Die" (1942) to the Midnight of 15 August 1947',
    subtitle_hi: '"करो या मरो" (1942) से 15 अगस्त 1947 की मध्यरात्रि तक',
    estimated_minutes: 15,
    difficulty: 'Advanced',
    hook: 'On 8 August 1942 at Gowalia Tank Maidan in Bombay, Mahatma Gandhi roared: "Here is a mantra, a short one, that I give you... Do or Die. We shall either free India or die in the attempt." How did this final mass revolution shatter the British raj?',
    hook_hi: '8 अगस्त 1942 को बंबई के गोवालिया टैंक मैदान से महात्मा गांधी ने ललकार लगाई: "मैं आपको एक छोटा सा मंत्र देता हूँ—करो या मरो। हम या तो भारत को स्वतंत्र कराएंगे या इस प्रयास में प्राण दे देंगे।" इस अंतिम महासंग्राम ने भारत को कैसे आजाद कराया?',
    sections: [
      {
        title: 'Cripps Mission (1942) and Quit India Movement',
        title_hi: 'क्रिप्स मिशन (1942) एवं भारत छोड़ो आंदोलन',
        content: 'Following the failure of Sir Stafford Cripps’ mission (termed by Gandhi as a "post-dated cheque on a crashing bank"), the All India Congress Committee passed the "Quit India" resolution on 8 August 1942. Under "Operation Zero Hour" in the early hours of 9 August, all top Congress leaders were arrested. The leaderless movement erupted into mass strikes, sabotage, and parallel governments (Prati Sarkar in Satara under Nana Patil, Ballia in UP under Chittu Pandey, and Tamluk in Bengal).',
        content_hi: 'क्रिप्स मिशन की विफलता के बाद 8 अगस्त 1942 को बंबई में "भारत छोड़ो" प्रस्ताव पारित हुआ। 9 अगस्त की तड़के "ऑपरेशन जीरो आवर" के तहत गांधीजी समेत सभी शीर्ष नेता गिरफ्तार कर लिए गए। जनता ने स्वतःस्फूर्त आंदोलन चलाया और बलिया (चित्तू पांडे), सतारा (नाना पाटिल) और तामलुक में समानांतर सरकारें (Parallel Governments) स्थापित कीं।',
        highlight: 'Aruna Asaf Ali hoisted the Indian National flag at Gowalia Tank on 9 August 1942, earning the sobriquet "Heroine of 1942".',
        highlight_hi: '9 अगस्त 1942 को अरुणा आसफ अली ने गोवालिया टैंक मैदान पर तिरंगा फहराया और उन्हें "1942 की वीरांगना" कहा गया।',
        iconType: 'tip'
      },
      {
        title: 'Subhas Chandra Bose and the Indian National Army (INA)',
        title_hi: 'नेताजी सुभाष चंद्र बोस एवं आज़ाद हिंद फ़ौज (INA)',
        content: 'Escaping British house arrest in 1941 via Peshawar to Germany, Netaji Subhas Chandra Bose reached Singapore in 1943 to take command of the Azad Hind Fauj (founded by Mohan Singh and Rashbehari Bose). Netaji formed the Provisional Government of Free India (Azad Hind Sarkar) on 21 October 1943 and gave the immortal slogans "Give me blood, and I will give you freedom!" and "Dilli Chalo". INA battalions fought alongside Japanese forces up to Imphal and Kohima.',
        content_hi: 'नेताजी सुभाष चंद्र बोस ने 1943 में सिंगापुर में आजाद हिंद फौज की कमान संभाली और 21 अक्टूबर 1943 को "आजाद हिंद सरकार" का गठन किया। उन्होंने "तुम मुझे खून दो, मैं तुम्हें आजादी दूंगा" और "दिल्ली चलो" का उद्घोष किया। आईएनए (INA) की रेजिमेंटों (गांधी, नेहरू, आजाद, रानी झांसी) ने कोहिमा और इंफाल तक युद्ध लड़ा।',
        iconType: 'concept'
      },
      {
        title: 'Cabinet Mission, Mountbatten Plan and Independence',
        title_hi: 'कैबिनेट मिशन, माउंटबेटन योजना एवं भारत की स्वाधीनता',
        content: 'The Royal Indian Navy (RIN) Mutiny of February 1946 convinced the British that military loyalty had disintegrated. The Cabinet Mission (1946) rejected partition and formulated the Constituent Assembly framework. On 3 June 1947, Lord Mountbatten announced the "3rd June Plan" (Partition of India). The British Parliament enacted the Indian Independence Act, 1947 on 18 July 1947, leading to India’s independence on 15 August 1947.',
        content_hi: 'फरवरी 1946 के नौसेना विद्रोह (RIN Mutiny) ने अंग्रेजों को समझ दिया कि अब राज करना असंभव है। 3 जून 1947 को लॉर्ड माउंटबेटन ने विभाजन योजना पेश की। ब्रिटिश संसद ने 18 जुलाई 1947 को भारतीय स्वतंत्रता अधिनियम पारित किया और 15 अगस्त 1947 को भारत स्वतंत्र हुआ।',
        iconType: 'concept'
      }
    ],
    practical_example: {
      scenario: 'A BPSC question asks: "Under which code-named operation did the British arrest all Congress Working Committee leaders on the morning of 9 August 1942?"',
      scenario_hi: 'परीक्षा प्रश्न: "9 अगस्त 1942 की सुबह ब्रिटिश पुलिस ने किस ऑपरेशन के तहत कांग्रेस के सभी बड़े नेताओं को गिरफ्तार किया था?"',
      analysis: 'Operation Zero Hour, launched at midnight between 8 and 9 August 1942.',
      analysis_hi: 'ऑपरेशन ज़ीरो आवर (Operation Zero Hour)।',
      actionable_tip: 'Gandhiji was interned at the Aga Khan Palace in Pune, while Nehru and others were held at Ahmednagar Fort.',
      actionable_tip_hi: 'गांधीजी को पुणे के आगा खां पैलेस में और नेहरू व पटेल को अहमदनगर दुर्ग में कैद रखा गया था।'
    },
    key_takeaways: [
      'Quit India resolution passed on 8 August 1942 with the slogan "Do or Die".',
      'Netaji Subhas Chandra Bose established the Azad Hind Government on 21 October 1943.',
      'Mountbatten Plan was announced on 3 June 1947.',
      'Indian Independence Act was passed by the British Parliament on 18 July 1947.'
    ],
    key_takeaways_hi: [
      '8 अगस्त 1942 को "करो या मरो" के नारे के साथ भारत छोड़ो आंदोलन शुरू हुआ।',
      'नेताजी सुभाष चंद्र बोस ने 21 अक्टूबर 1943 को सिंगापुर में स्वतंत्र भारत की अंतरिम सरकार बनाई।',
      '3 जून 1947 को लॉर्ड माउंटबेटन ने भारत विभाजन की योजना प्रस्तुत की।',
      '18 जुलाई 1947 को ब्रिटिश संसद में भारतीय स्वतंत्रता अधिनियम पारित हुआ।'
    ]
  }
];

export const HISTORY_QUESTIONS: Question[] = [
  // Lesson 1 (history-1) Questions
  {
    id: 'q-history-1-1',
    lesson_id: 'lesson-history-1',
    subject_id: 'history-movement',
    question: 'Which Indus Valley site is famous for its excavated artificial dockyard made of burnt bricks?',
    question_hi: 'पक्की ईंटों से बने प्राचीन गोदीबाड़ा (डॉकयार्ड/बंदरगाह) के लिए कौन सा हड़प्पा स्थल प्रसिद्ध है?',
    option_a: 'Kalibangan',
    option_a_hi: 'कालीबंगा',
    option_b: 'Lothal',
    option_b_hi: 'लोथल',
    option_c: 'Mohenjo-daro',
    option_c_hi: 'मोहनजोदड़ो',
    option_d: 'Banawali',
    option_d_hi: 'बनावली',
    correct_answer: 'B',
    explanation: 'Lothal in Gujarat (on the Bhogava river) was a prominent port city with a massive tidal dockyard.',
    explanation_hi: 'गुजरात में भोगवा नदी के तट पर स्थित लोथल हड़प्पा सभ्यता का प्रमुख बंदरगाह था।'
  },
  {
    id: 'q-history-1-2',
    lesson_id: 'lesson-history-1',
    subject_id: 'history-movement',
    question: 'From which Upanishad is India’s national motto "Satyameva Jayate" taken?',
    question_hi: 'भारत का राष्ट्रीय आदर्श वाक्य "सत्यमेव जयते" किस उपनिषद से लिया गया है?',
    option_a: 'Katha Upanishad',
    option_a_hi: 'कठोपनिषद',
    option_b: 'Chandogya Upanishad',
    option_b_hi: 'छांदोग्योपनिषद',
    option_c: 'Mundaka Upanishad',
    option_c_hi: 'मुंडकोपनिषद',
    option_d: 'Mandukya Upanishad',
    option_d_hi: 'मांडूक्योपनिषद',
    correct_answer: 'C',
    explanation: '"Satyameva Jayate" (Truth alone triumphs) is inscribed from the Mundaka Upanishad.',
    explanation_hi: '"सत्यमेव जयते" मुंडकोपनिषद से उद्धृत है।'
  },
  {
    id: 'q-history-1-3',
    lesson_id: 'lesson-history-1',
    subject_id: 'history-movement',
    question: 'Which Veda is regarded as the origin of Indian classical music and musical chanting?',
    question_hi: 'भारतीय शास्त्रीय संगीत और गायन का जनक किस वेद को माना जाता है?',
    option_a: 'Rigveda',
    option_a_hi: 'ऋग्वेद',
    option_b: 'Samaveda',
    option_b_hi: 'सामवेद',
    option_c: 'Yajurveda',
    option_c_hi: 'यजुर्वेद',
    option_d: 'Atharvaveda',
    option_d_hi: 'अथर्ववेद',
    correct_answer: 'B',
    explanation: 'The Samaveda consists of melodies and chants set to musical notes (roots of Indian classical music).',
    explanation_hi: 'सामवेद में ऋग्वेद के मंत्रों को गेय (गाने योग्य) रूप में संकलित किया गया है।'
  },
  {
    id: 'q-history-1-4',
    lesson_id: 'lesson-history-1',
    subject_id: 'history-movement',
    question: 'In which Mandala of the Rigveda is the sacred Gayatri Mantra found?',
    question_hi: 'पवित्र गायत्री मंत्र ऋग्वेद के किस मंडल में निहित है?',
    option_a: 'First Mandala',
    option_a_hi: 'प्रथम मंडल',
    option_b: 'Third Mandala',
    option_b_hi: 'तीसरा मंडल',
    option_c: 'Seventh Mandala',
    option_c_hi: 'सातवां मंडल',
    option_d: 'Tenth Mandala',
    option_d_hi: 'दसवां मंडल',
    correct_answer: 'B',
    explanation: 'The Gayatri Mantra composed by Sage Vishvamitra is in the 3rd Mandala of the Rigveda.',
    explanation_hi: 'विश्वामित्र द्वारा रचित गायत्री मंत्र ऋग्वेद के तीसरे मंडल में है।'
  },
  {
    id: 'q-history-1-5',
    lesson_id: 'lesson-history-1',
    subject_id: 'history-movement',
    question: 'Which Indus Valley site in Gujarat is famous for its unique three-tier city planning and sophisticated water reservoirs?',
    question_hi: 'त्रिस्तरीय नगर नियोजन और उत्कृष्ट जल संचयन प्रणाली के लिए कौन सा हड़प्पा स्थल प्रसिद्ध है?',
    option_a: 'Rakhigarhi',
    option_a_hi: 'राखीगढ़ी',
    option_b: 'Dholavira',
    option_b_hi: 'धोलावीरा',
    option_c: 'Surkotada',
    option_c_hi: 'सुरकोटदा',
    option_d: 'Chanhudaro',
    option_d_hi: 'चन्हू Milano/चन्हूदड़ो',
    correct_answer: 'B',
    explanation: 'Dholavira in the Rann of Kutch (Gujarat) has a 3-part layout and giant stone water reservoirs.',
    explanation_hi: 'धोलावीरा (कच्छ, गुजरात) में नगर तीन भागों (दुर्ग, मध्यम नगर, निचला नगर) में विभाजित था।'
  },

  // Lesson 2 (history-2) Questions
  {
    id: 'q-history-2-1',
    lesson_id: 'lesson-history-2',
    subject_id: 'history-movement',
    question: 'Where did Gautama Buddha deliver his first sermon, known as "Dharmachakrapravartana"?',
    question_hi: 'गौतम बुद्ध ने अपना प्रथम उपदेश (धर्मचक्रप्रवर्तन) कहाँ दिया था?',
    option_a: 'Bodh Gaya',
    option_a_hi: 'बोधगया',
    option_b: 'Sarnath (Deer Park)',
    option_b_hi: 'सारनाथ (ऋषिपत्तन)',
    option_c: 'Kushinagar',
    option_c_hi: 'कुशीनगर',
    option_d: 'Lumbini',
    option_d_hi: 'लुंबिनी',
    correct_answer: 'B',
    explanation: 'Buddha preached his first sermon to his five former ascetics at the Deer Park in Sarnath.',
    explanation_hi: 'बुद्ध ने ज्ञान प्राप्ति के उपरांत सारनाथ में अपने 5 संन्यासी साथियों को पहला उपदेश दिया।'
  },
  {
    id: 'q-history-2-2',
    lesson_id: 'lesson-history-2',
    subject_id: 'history-movement',
    question: 'Which fifth vow was added by Vardhamana Mahavira to the four vows of Parshvanatha in Jainism?',
    question_hi: 'भगवान महावीर ने पार्श्वनाथ के चार महाव्रतों में कौन सा पाँचवाँ व्रत जोड़ा था?',
    option_a: 'Ahimsa',
    option_a_hi: 'अहिंसा',
    option_b: 'Satya',
    option_b_hi: 'सत्य',
    option_c: 'Brahmacharya (Celibacy)',
    option_c_hi: 'ब्रह्मचर्य',
    option_d: 'Aparigraha',
    option_d_hi: 'अपरिग्रह',
    correct_answer: 'C',
    explanation: 'Mahavira added Brahmacharya (celibacy) to Satya, Ahimsa, Asteya, and Aparigraha.',
    explanation_hi: 'महावीर स्वामी ने चार व्रतों में पाँचवाँ महाव्रत "ब्रह्मचर्य" जोड़ा।'
  },
  {
    id: 'q-history-2-3',
    lesson_id: 'lesson-history-2',
    subject_id: 'history-movement',
    question: 'Under which Kushan emperor was the Fourth Buddhist Council convened in Kundalvana, Kashmir?',
    question_hi: 'कश्मीर के कुंडलवन में चतुर्थ बौद्ध संगीति किस कुषाण सम्राट के शासनकाल में हुई थी?',
    option_a: 'Kanishka',
    option_a_hi: 'कनिष्क',
    option_b: 'Huvishka',
    option_b_hi: 'हुविष्क',
    option_c: 'Kujula Kadphises',
    option_c_hi: 'कुजुल कडफिसेस',
    option_d: 'Vima Kadphises',
    option_d_hi: 'विम कडफिसेस',
    correct_answer: 'A',
    explanation: 'Kanishka patronized the Fourth Council (presided by Vasumitra), which split Buddhism into Hinayana and Mahayana.',
    explanation_hi: 'कनिष्क के समय वसुमित्र की अध्यक्षता में चतुर्थ संगीति हुई जिसमें बौद्ध धर्म हीनयान व महायान में बंटा।'
  },
  {
    id: 'q-history-2-4',
    lesson_id: 'lesson-history-2',
    subject_id: 'history-movement',
    question: 'What was the capital of the Anga Mahajanapada (located in modern Bhagalpur and Munger in Bihar)?',
    question_hi: 'अंग महाजनपद (वर्तमान भागलपुर एवं मुंगेर) की राजधानी कौन सी थी?',
    option_a: 'Vaishali',
    option_a_hi: 'वैशाली',
    option_b: 'Champa',
    option_b_hi: 'चंपा',
    option_c: 'Rajgriha',
    option_c_hi: 'राजगृह',
    option_d: 'Varanasi',
    option_d_hi: 'वाराणसी',
    correct_answer: 'B',
    explanation: 'Champa (ancient Malini) was the famed capital of the Anga Mahajanapada.',
    explanation_hi: 'चंपा अंग महाजनपद की राजधानी थी, जिसका प्राचीन नाम मालिनी था।'
  },
  {
    id: 'q-history-2-5',
    lesson_id: 'lesson-history-2',
    subject_id: 'history-movement',
    question: 'What are the Triratna (Three Jewels) of Jainism?',
    question_hi: 'जैन धर्म के त्रिरत्न कौन से हैं?',
    option_a: 'Buddha, Dhamma, Sangha',
    option_a_hi: 'बुद्ध, धम्म, संघ',
    option_b: 'Right Faith, Right Knowledge, Right Conduct',
    option_b_hi: 'सम्यक् दर्शन, सम्यक् ज्ञान, सम्यक् चरित्र',
    option_c: 'Satya, Ahimsa, Asteya',
    option_c_hi: 'सत्य, अहिंसा, अस्तेय',
    option_d: 'Sthulabhadra, Bhadrabahu, Mahavira',
    option_d_hi: 'स्थूलभद्र, भद्रबाहु, महावीर',
    correct_answer: 'B',
    explanation: 'Jainism’s Triratna are Samyak Darshana (Faith), Samyak Jnana (Knowledge), and Samyak Charitra (Conduct).',
    explanation_hi: 'जैन धर्म में मोक्ष प्राप्ति के लिए सम्यक् दर्शन, सम्यक् ज्ञान और सम्यक् चरित्र को त्रिरत्न कहा गया है।'
  },

  // Lesson 3 (history-3) Questions
  {
    id: 'q-history-3-1',
    lesson_id: 'lesson-history-3',
    subject_id: 'history-movement',
    question: 'Who was the first and only woman sultan of the Delhi Sultanate?',
    question_hi: 'दिल्ली सल्तनत की प्रथम और एकमात्र महिला मुस्लिम शासक कौन थीं?',
    option_a: 'Chand Bibi',
    option_a_hi: 'चांद बीबी',
    option_b: 'Razia Sultan',
    option_b_hi: 'रजिया सुल्तान',
    option_c: 'Nur Jahan',
    option_c_hi: 'नूरजहाँ',
    option_d: 'Gulbadan Begum',
    option_d_hi: 'गुलबदन बेगम',
    correct_answer: 'B',
    explanation: 'Razia Sultan (daughter of Iltutmish) ruled the Delhi Sultanate from 1236 to 1240.',
    explanation_hi: 'इल्तुतमिश की पुत्री रजिया सुल्तान ने 1236 से 1240 तक दिल्ली सल्तनत की बागडोर संभाली।'
  },
  {
    id: 'q-history-3-2',
    lesson_id: 'lesson-history-3',
    subject_id: 'history-movement',
    question: 'In which year did the First Battle of Panipat take place, leading to the foundation of the Mughal Empire?',
    question_hi: 'पानीपत का प्रथम युद्ध किस वर्ष हुआ था जिससे मुग़ल साम्राज्य की नींव पड़ी?',
    option_a: '1526',
    option_a_hi: '1526',
    option_b: '1556',
    option_b_hi: '1556',
    option_c: '1576',
    option_c_hi: '1576',
    option_d: '1761',
    option_d_hi: '1761',
    correct_answer: 'A',
    explanation: 'On 21 April 1526, Babur defeated Ibrahim Lodi at the First Battle of Panipat.',
    explanation_hi: '21 अप्रैल 1526 को बाबर ने इब्राहिम लोदी को हराकर मुग़ल साम्राज्य की स्थापना की।'
  },
  {
    id: 'q-history-3-3',
    lesson_id: 'lesson-history-3',
    subject_id: 'history-movement',
    question: 'Who developed the Dahsala system of land revenue administration under Mughal Emperor Akbar?',
    question_hi: 'मुग़ल सम्राट अकबर के काल में भू-राजस्व की "दहसाला प्रणाली" किसने विकसित की थी?',
    option_a: 'Bairam Khan',
    option_a_hi: 'बैराम खां',
    option_b: 'Raja Todar Mal',
    option_b_hi: 'राजा टोडरमल',
    option_c: 'Raja Man Singh',
    option_c_hi: 'राजा मानसिंह',
    option_d: 'Abul Fazl',
    option_d_hi: 'अबुल फजल',
    correct_answer: 'B',
    explanation: 'Akbar’s finance minister Raja Todar Mal introduced the Dahsala bandobast in 1580.',
    explanation_hi: 'अकबर के वित्त मंत्री राजा टोडरमल ने 1580 में दहसाला प्रणाली लागू की थी।'
  },
  {
    id: 'q-history-3-4',
    lesson_id: 'lesson-history-3',
    subject_id: 'history-movement',
    question: 'Which Delhi Sultan introduced market control policies and the military branding system called "Dagh and Chehra"?',
    question_hi: 'बाजार नियंत्रण नीति और सेना में घोड़ों को दागने (दाग-चेहरा प्रथा) की शुरुआत किस सुल्तान ने की थी?',
    option_a: 'Balban',
    option_a_hi: 'बलबन',
    option_b: 'Alauddin Khalji',
    option_b_hi: 'अलाउद्दीन खिलजी',
    option_c: 'Muhammad bin Tughlaq',
    option_c_hi: 'मुहम्मद बिन तुगलक',
    option_d: 'Firoz Shah Tughlaq',
    option_d_hi: 'फिरोज शाह तुगलक',
    correct_answer: 'B',
    explanation: 'Alauddin Khalji instituted strict price controls in markets and military identification.',
    explanation_hi: 'अलाउद्दीन खिलजी ने मूल्य नियंत्रण और सैनिकों व घोड़ों के हुलिया-दाग की व्यवस्था की।'
  },
  {
    id: 'q-history-3-5',
    lesson_id: 'lesson-history-3',
    subject_id: 'history-movement',
    question: 'In which year did Emperor Akbar abolish the pilgrim tax and Jizya tax on non-Muslims?',
    question_hi: 'सम्राट अकबर ने जजिया कर किस वर्ष समाप्त किया था?',
    option_a: '1556',
    option_a_hi: '1556',
    option_b: '1564',
    option_b_hi: '1564',
    option_c: '1575',
    option_c_hi: '1575',
    option_d: '1582',
    option_d_hi: '1582',
    correct_answer: 'B',
    explanation: 'Akbar abolished the pilgrim tax in 1563 and Jizya in 1564. (Aurangzeb reimposed it in 1679).',
    explanation_hi: 'अकबर ने 1563 में तीर्थयात्रा कर और 1564 में जजिया कर समाप्त किया था।'
  },

  // Lesson 4 (history-4) Questions
  {
    id: 'q-history-4-1',
    lesson_id: 'lesson-history-4',
    subject_id: 'history-movement',
    question: 'Who was the Nawab of Bengal defeated by Robert Clive in the Battle of Plassey on 23 June 1757?',
    question_hi: '23 जून 1757 को प्लासी के युद्ध में रॉबर्ट क्लाइव ने बंगाल के किस नवाब को हराया था?',
    option_a: 'Mir Jafar',
    option_a_hi: 'मीर जाफर',
    option_b: 'Nawab Siraj-ud-Daula',
    option_b_hi: 'नवाब सिराजुद्दौला',
    option_c: 'Mir Qasim',
    option_c_hi: 'मीर कासिम',
    option_d: 'Alivardi Khan',
    option_d_hi: 'अलीवर्दी खां',
    correct_answer: 'B',
    explanation: 'Siraj-ud-Daula was defeated at Plassey due to the treachery of commander Mir Jafar.',
    explanation_hi: 'मीर जाफर के विश्वासघात के कारण सिराजुद्दौला की प्लासी में पराजय हुई।'
  },
  {
    id: 'q-history-4-2',
    lesson_id: 'lesson-history-4',
    subject_id: 'history-movement',
    question: 'Under the Treaty of Allahabad (1765), Mughal Emperor Shah Alam II granted the Diwani rights of which provinces to the British?',
    question_hi: '1765 की इलाहाबाद की संधि द्वारा मुगल बादशाह शाहआलम द्वितीय ने किन प्रांतों की दीवानी अंग्रेजों को सौंपी?',
    option_a: 'Bengal, Bihar, and Orissa',
    option_a_hi: 'बंगाल, बिहार और ओडिशा',
    option_b: 'Awadh, Delhi, and Punjab',
    option_b_hi: 'अवध, दिल्ली और पंजाब',
    option_c: 'Madras and Bombay',
    option_c_hi: 'मद्रास और बंबई',
    option_d: 'Bengal and Assam only',
    option_d_hi: 'केवल बंगाल और असम',
    correct_answer: 'A',
    explanation: 'The Diwani (revenue administration) of Bengal, Bihar, and Orissa was granted to the East India Company.',
    explanation_hi: 'कंपनी को बंगाल, बिहार और ओडिशा की दीवानी प्राप्त हुई जिससे वह वास्तविक वित्तीय स्वामी बन गई।'
  },
  {
    id: 'q-history-4-3',
    lesson_id: 'lesson-history-4',
    subject_id: 'history-movement',
    question: 'Who introduced the Permanent Settlement (Zamindari System) in Bengal and Bihar in 1793?',
    question_hi: '1793 में बंगाल और बिहार में स्थायी बंदोबस्त (जमींदारी व्यवस्था) किसने लागू किया था?',
    option_a: 'Warren Hastings',
    option_a_hi: 'वॉरेन हेस्टिंग्स',
    option_b: 'Lord Cornwallis',
    option_b_hi: 'लॉर्ड कॉर्नवालिस',
    option_c: 'Lord Wellesley',
    option_c_hi: 'लॉर्ड वेलेजली',
    option_d: 'Lord Dalhousie',
    option_d_hi: 'लॉर्ड डलहौजी',
    correct_answer: 'B',
    explanation: 'Lord Cornwallis introduced the Permanent Settlement in 1793.',
    explanation_hi: 'लॉर्ड कॉर्नवालिस ने स्थायी बंदोबस्त प्रणाली लागू की।'
  },
  {
    id: 'q-history-4-4',
    lesson_id: 'lesson-history-4',
    subject_id: 'history-movement',
    question: 'Who were the chief architects of the Ryotwari land revenue system introduced in Madras and Bombay?',
    question_hi: 'मद्रास और बंबई में लागू की गई "रैयतवाड़ी व्यवस्था" के प्रमुख वास्तुकार कौन थे?',
    option_a: 'Holt Mackenzie and Martin Bird',
    option_a_hi: 'हॉल्ट मैकेंजी एवं मार्टिन बर्ड',
    option_b: 'Thomas Munro and Captain Alexander Read',
    option_b_hi: 'थॉमस मुनरो एवं कैप्टन अलेक्जेंडर रीड',
    option_c: 'Lord Cornwallis and John Shore',
    option_c_hi: 'लॉर्ड कॉर्नवालिस एवं जॉन शोर',
    option_d: 'Robert Clive and Warren Hastings',
    option_d_hi: 'रॉबर्ट क्लाइव एवं वॉरेन हेस्टिंग्स',
    correct_answer: 'B',
    explanation: 'Thomas Munro and Alexander Read instituted the direct Ryotwari settlement with cultivators.',
    explanation_hi: 'थॉमस मुनरो और कैप्टन रीड ने रैयतों (किसानों) से सीधे लगान वसूली की व्यवस्था बनाई।'
  },
  {
    id: 'q-history-4-5',
    lesson_id: 'lesson-history-4',
    subject_id: 'history-movement',
    question: 'What was the proportion of revenue retained by the Zamindar under the Permanent Settlement of 1793?',
    question_hi: '1793 के स्थायी बंदोबस्त में वसूली गई कुल राशि में से जमींदार का हिस्सा कितना था?',
    option_a: '1/11th',
    option_a_hi: '1/11 भाग',
    option_b: '10/11th',
    option_b_hi: '10/11 भाग',
    option_c: '1/2',
    option_c_hi: '1/2 भाग',
    option_d: '1/4th',
    option_d_hi: '1/4 भाग',
    correct_answer: 'A',
    explanation: '10/11th went to the East India Company treasury and 1/11th was kept by the Zamindar.',
    explanation_hi: 'कुल 11 भागों में से 10 भाग कंपनी का और 1 भाग जमींदार का होता था।'
  },

  // Lesson 5 (history-5) Questions
  {
    id: 'q-history-5-1',
    lesson_id: 'lesson-history-5',
    subject_id: 'history-movement',
    question: 'On what date did sepoy Mangal Pandey revolt against the greased cartridges at Barrackpore?',
    question_hi: 'बैरकपुर में मंगल पांडे ने चर्बीयुक्त कारतूसों के विरुद्ध किस तारीख को विद्रोह किया था?',
    option_a: '29 March 1857',
    option_a_hi: '29 मार्च 1857',
    option_b: '10 May 1857',
    option_b_hi: '10 मई 1857',
    option_c: '23 June 1857',
    option_c_hi: '23 जून 1857',
    option_d: '8 April 1857',
    option_d_hi: '8 अप्रैल 1857',
    correct_answer: 'A',
    explanation: 'Mangal Pandey revolted on 29 March 1857 and was executed on 8 April 1857.',
    explanation_hi: '29 मार्च 1857 को मंगल पांडे ने बैरकपुर में सार्जेंट मेजर पर गोली चलाई।'
  },
  {
    id: 'q-history-5-2',
    lesson_id: 'lesson-history-5',
    subject_id: 'history-movement',
    question: 'Who led the 1857 Revolt in Lucknow after the annexation of Awadh?',
    question_hi: 'अवध के विलय के बाद लखनऊ में 1857 की क्रांति का नेतृत्व किसने किया था?',
    option_a: 'Rani Lakshmibai',
    option_a_hi: 'रानी लक्ष्मीबाई',
    option_b: 'Begum Hazrat Mahal',
    option_b_hi: 'बेगम हजरत महल',
    option_c: 'Nana Saheb',
    option_c_hi: 'नाना साहेब',
    option_d: 'Maulvi Ahmadullah',
    option_d_hi: 'मौलवी अहमदुल्लाह',
    correct_answer: 'B',
    explanation: 'Begum Hazrat Mahal led the revolt from Lucknow, placing her son Birjis Qadr on the throne.',
    explanation_hi: 'बेगम हजरत महल ने अपने अल्पवयस्क पुत्र बिरजिस कद्र को नवाब घोषित कर लखनऊ में नेतृत्व किया।'
  },
  {
    id: 'q-history-5-3',
    lesson_id: 'lesson-history-5',
    subject_id: 'history-movement',
    question: 'Who were the leaders of the historic Santhal Hool (Rebellion) of 1855–56 in the Rajmahal Hills?',
    question_hi: 'राजमहल की पहाड़ियों में 1855-56 के संथाल विद्रोह के प्रमुख नेता कौन थे?',
    option_a: 'Sidhu and Kanhu',
    option_a_hi: 'सिद्धू और कान्हू',
    option_b: 'Birsa Munda and Gaya Munda',
    option_b_hi: 'बिरसा मुंडा और गया मुंडा',
    option_c: 'Jatra Bhagat and Tana Bhagat',
    option_c_hi: 'जातरा भगत और ताना भगत',
    option_d: 'Tirot Sing and Gomdhar Konwar',
    option_d_hi: 'तीरोत सिंह और गोमधर कोंवर',
    correct_answer: 'A',
    explanation: 'Sidhu, Kanhu, Chand, and Bhairav Murmu led the Santhal insurrection.',
    explanation_hi: 'सिद्धू और कान्हू मुर्मू ने संथाल हूल का ऐतिहासिक नेतृत्व किया था।'
  },
  {
    id: 'q-history-5-4',
    lesson_id: 'lesson-history-5',
    subject_id: 'history-movement',
    question: 'The tribal rebellion led by Bhagwan Birsa Munda in 1899–1900 is popularly known as what?',
    question_hi: 'भगवान बिरसा मुंडा द्वारा 1899-1900 में चलाए गए महान जनजातीय विद्रोह को किस नाम से जाना जाता है?',
    option_a: 'Santhal Hool',
    option_a_hi: 'संथाल हूल',
    option_b: 'Munda Ulgulan (The Great Tumult)',
    option_b_hi: 'मुंडा उलगुलान (महान हलचल)',
    option_c: 'Kol Mutiny',
    option_c_hi: 'कोल विद्रोह',
    option_d: 'Chuar Rebellion',
    option_d_hi: 'चुआड़ विद्रोह',
    correct_answer: 'B',
    explanation: 'The Munda rebellion is known as "Ulgulan" (Great Tumult).',
    explanation_hi: 'बिरसा मुंडा के आंदोलन को "उलगुलान" कहा जाता है।'
  },
  {
    id: 'q-history-5-5',
    lesson_id: 'lesson-history-5',
    subject_id: 'history-movement',
    question: 'Which British military commander praised Rani Lakshmibai of Jhansi as "the bravest and best military leader of the rebels"?',
    question_hi: 'किस ब्रिटिश सेनापति ने झांसी की रानी लक्ष्मीबाई को "विद्रोहियों में सबसे बहादुर और श्रेष्ठ" कहा था?',
    option_a: 'Sir Colin Campbell',
    option_a_hi: 'सर कॉलिन कैंपबेल',
    option_b: 'General Hugh Rose',
    option_b_hi: 'जनरल ह्यूरोज',
    option_c: 'Major Hector Munro',
    option_c_hi: 'मेजर हेक्टर मुनरो',
    option_d: 'General John Nicholson',
    option_d_hi: 'जनरल जॉन निकोलसन',
    correct_answer: 'B',
    explanation: 'General Hugh Rose, who commanded the British forces against Jhansi, commended her heroism.',
    explanation_hi: 'झांसी पर आक्रमण करने वाले जनरल ह्यूरोज ने उनकी असीम वीरता की प्रशंसा की थी।'
  },

  // Lesson 6 (history-6) Questions
  {
    id: 'q-history-6-1',
    lesson_id: 'lesson-history-6',
    subject_id: 'history-movement',
    question: 'In which year did Governor-General Lord William Bentinck abolish Sati through Regulation XVII?',
    question_hi: 'लॉर्ड विलियम बेंटिक ने किस वर्ष नियम 17 द्वारा सती प्रथा को पूर्णतः प्रतिबंधित किया था?',
    option_a: '1815',
    option_a_hi: '1815',
    option_b: '1828',
    option_b_hi: '1828',
    option_c: '1829',
    option_c_hi: '1829',
    option_d: '1856',
    option_d_hi: '1856',
    correct_answer: 'C',
    explanation: 'Sati was abolished on 4 December 1829 due to Raja Ram Mohan Roy’s crusade.',
    explanation_hi: 'राजा राममोहन राय के प्रयासों से 4 दिसंबर 1829 को सती प्रथा को अपराध घोषित किया गया।'
  },
  {
    id: 'q-history-6-2',
    lesson_id: 'lesson-history-6',
    subject_id: 'history-movement',
    question: 'Who founded the Arya Samaj in Bombay in 1875 and gave the slogan "Go Back to the Vedas"?',
    question_hi: '1875 में बंबई में आर्य समाज की स्थापना कर "वेदों की ओर लौटो" का नारा किसने दिया था?',
    option_a: 'Swami Vivekananda',
    option_a_hi: 'स्वामी विवेकानंद',
    option_b: 'Swami Dayananda Saraswati',
    option_b_hi: 'स्वामी दयानंद सरस्वती',
    option_c: 'Raja Ram Mohan Roy',
    option_c_hi: 'राजा राममोहन राय',
    option_d: 'Keshab Chandra Sen',
    option_d_hi: 'केशवचंद्र सेन',
    correct_answer: 'B',
    explanation: 'Swami Dayananda Saraswati founded the Arya Samaj and authored Satyarth Prakash.',
    explanation_hi: 'स्वामी दयानंद सरस्वती ने आर्य समाज की नींव रखी और सत्यार्थ प्रकाश की रचना की।'
  },
  {
    id: 'q-history-6-3',
    lesson_id: 'lesson-history-6',
    subject_id: 'history-movement',
    question: 'Who established the Satyashodhak Samaj in Maharashtra in 1873 to fight caste oppression?',
    question_hi: '1873 में महाराष्ट्र में जाति प्रथा के उन्मूलन हेतु "सत्यशोधक समाज" की स्थापना किसने की थी?',
    option_a: 'Dr. B.R. Ambedkar',
    option_a_hi: 'डॉ. बी.आर. अंबेडकर',
    option_b: 'Mahatma Jyotirao Phule',
    option_b_hi: 'महात्मा ज्योतिराव फुले',
    option_c: 'Gopal Hari Deshmukh',
    option_c_hi: 'गोपाल हरि देशमुख',
    option_d: 'E.V. Ramasamy Periyar',
    option_d_hi: 'ई.वी. रामास्वामी पेरियार',
    correct_answer: 'B',
    explanation: 'Jyotirao Phule founded the Satyashodhak Samaj and penned the seminal text "Gulamgiri".',
    explanation_hi: 'ज्योतिराव फुले ने सत्यशोधक समाज की स्थापना की और गुलामगिरी ग्रंथ लिखा।'
  },
  {
    id: 'q-history-6-4',
    lesson_id: 'lesson-history-6',
    subject_id: 'history-movement',
    question: 'In which year did Swami Vivekananda deliver his historic address at the World’s Parliament of Religions in Chicago?',
    question_hi: 'स्वामी विवेकानंद ने शिकागो में विश्व धर्म संसद में अपना ऐतिहासिक भाषण किस वर्ष दिया था?',
    option_a: '1885',
    option_a_hi: '1885',
    option_b: '1893',
    option_b_hi: '1893',
    option_c: '1897',
    option_c_hi: '1897',
    option_d: '1902',
    option_d_hi: '1902',
    correct_answer: 'B',
    explanation: 'Swami Vivekananda delivered his address on 11 September 1893 in Chicago.',
    explanation_hi: '11 सितंबर 1893 को शिकागो में स्वामी विवेकानंद ने "अमेरिका के भाइयो और बहनो" कहकर भाषण शुरू किया था।'
  },
  {
    id: 'q-history-6-5',
    lesson_id: 'lesson-history-6',
    subject_id: 'history-movement',
    question: 'Whose advocacy was primarily responsible for the enactment of the Hindu Widows’ Remarriage Act in 1856?',
    question_hi: '1856 के हिंदू विधवा पुनर्विवाह अधिनियम को पारित कराने में किसका प्रमुख योगदान था?',
    option_a: 'Raja Ram Mohan Roy',
    option_a_hi: 'राजा राममोहन राय',
    option_b: 'Ishwar Chandra Vidyasagar',
    option_b_hi: 'ईश्वरचंद्र विद्यासागर',
    option_c: 'Debendranath Tagore',
    option_c_hi: 'देवेंद्रनाथ टैगोर',
    option_d: 'M.G. Ranade',
    option_d_hi: 'एम.जी. रानाडे',
    correct_answer: 'B',
    explanation: 'Pandit Ishwar Chandra Vidyasagar spearheaded the campaign for widow remarriage.',
    explanation_hi: 'पंडित ईश्वरचंद्र विद्यासागर के प्रयासों से लॉर्ड कैनिंग के समय यह कानून बना।'
  },

  // Lesson 7 (history-7) Questions
  {
    id: 'q-history-7-1',
    lesson_id: 'lesson-history-7',
    subject_id: 'history-movement',
    question: 'Who was the first President of the Indian National Congress in 1885?',
    question_hi: '1885 में भारतीय राष्ट्रीय कांग्रेस के प्रथम अध्यक्ष कौन थे?',
    option_a: 'A.O. Hume',
    option_a_hi: 'ए.ओ. ह्यूम',
    option_b: 'Womesh Chandra Bonnerjee (W.C. Bonnerjee)',
    option_b_hi: 'व्योमेश चंद्र बनर्जी (W.C. Bonnerjee)',
    option_c: 'Dadabhai Naoroji',
    option_c_hi: 'दादाभाई नौरोजी',
    option_d: 'Badruddin Tyabji',
    option_d_hi: 'बदरुद्दीन तैयबजी',
    correct_answer: 'B',
    explanation: 'W.C. Bonnerjee presided over the first INC session at Bombay attended by 72 delegates.',
    explanation_hi: 'व्योमेश चंद्र बनर्जी ने 1885 में बंबई में प्रथम अधिवेशन की अध्यक्षता की थी।'
  },
  {
    id: 'q-history-7-2',
    lesson_id: 'lesson-history-7',
    subject_id: 'history-movement',
    question: 'Who was the Viceroy of India when the Indian National Congress was founded in December 1885?',
    question_hi: 'दिसंबर 1885 में भारतीय राष्ट्रीय कांग्रेस की स्थापना के समय भारत का वायसराय कौन था?',
    option_a: 'Lord Ripon',
    option_a_hi: 'लॉर्ड रिपन',
    option_b: 'Lord Dufferin',
    option_b_hi: 'लॉर्ड डफरिन',
    option_c: 'Lord Curzon',
    option_c_hi: 'लॉर्ड कर्जन',
    option_d: 'Lord Lytton',
    option_d_hi: 'लॉर्ड लिटन',
    correct_answer: 'B',
    explanation: 'Lord Dufferin was the Viceroy from 1884 to 1888.',
    explanation_hi: 'लॉर्ड डफरिन उस समय भारत का वायसराय था।'
  },
  {
    id: 'q-history-7-3',
    lesson_id: 'lesson-history-7',
    subject_id: 'history-movement',
    question: 'Who formulated the "Drain of Wealth Theory" in the book "Poverty and Un-British Rule in India"?',
    question_hi: '"Poverty and Un-British Rule in India" पुस्तक में "धन की निकासी का सिद्धांत" किसने प्रस्तुत किया?',
    option_a: 'Gopal Krishna Gokhale',
    option_a_hi: 'गोपाल कृष्ण गोखले',
    option_b: 'Dadabhai Naoroji',
    option_b_hi: 'दादाभाई नौरोजी',
    option_c: 'R.C. Dutt',
    option_c_hi: 'आर.सी. दत्त',
    option_d: 'M.G. Ranade',
    option_d_hi: 'एम.जी. रानाडे',
    correct_answer: 'B',
    explanation: 'Dadabhai Naoroji ("Grand Old Man of India") authored this landmark economic critique in 1901.',
    explanation_hi: 'दादाभाई नौरोजी ने ब्रिटिश शासन द्वारा भारत के आर्थिक दोहन का वैज्ञानिक विश्लेषण किया।'
  },
  {
    id: 'q-history-7-4',
    lesson_id: 'lesson-history-7',
    subject_id: 'history-movement',
    question: 'Who was the first Indian to be elected as a Member of the British House of Commons in 1892?',
    question_hi: '1892 में ब्रिटिश संसद (हाउस ऑफ कॉमन्स) के सदस्य निर्वाचित होने वाले प्रथम भारतीय कौन थे?',
    option_a: 'Surendranath Banerjee',
    option_a_hi: 'सुरेंद्रनाथ बनर्जी',
    option_b: 'Dadabhai Naoroji',
    option_b_hi: 'दादाभाई नौरोजी',
    option_c: 'Lalmohan Ghosh',
    option_c_hi: 'लालमोहन घोष',
    option_d: 'Pherozeshah Mehta',
    option_d_hi: 'फिरोजशाह मेहता',
    correct_answer: 'B',
    explanation: 'Dadabhai Naoroji was elected from Finsbury Central on a Liberal Party ticket in 1892.',
    explanation_hi: 'दादाभाई नौरोजी फिन्सबरी सेंट्रल से लिबरल पार्टी के टिकट पर चुने गए थे।'
  },
  {
    id: 'q-history-7-5',
    lesson_id: 'lesson-history-7',
    subject_id: 'history-movement',
    question: 'How many delegates attended the inaugural session of the Indian National Congress in Bombay in 1885?',
    question_hi: '1885 में बंबई में कांग्रेस के प्रथम अधिवेशन में कुल कितने प्रतिनिधियों ने भाग लिया था?',
    option_a: '50',
    option_a_hi: '50',
    option_b: '72',
    option_b_hi: '72',
    option_c: '100',
    option_c_hi: '100',
    option_d: '436',
    option_d_hi: '436',
    correct_answer: 'B',
    explanation: 'Exactly 72 delegates from across India attended the first session at Gokuldas Tejpal Sanskrit College.',
    explanation_hi: 'गोकुलदास तेजपाल संस्कृत कॉलेज में आयोजित पहले अधिवेशन में ठीक 72 प्रतिनिधि उपस्थित थे।'
  },

  // Lesson 8 (history-8) Questions
  {
    id: 'q-history-8-1',
    lesson_id: 'lesson-history-8',
    subject_id: 'history-movement',
    question: 'On which date did the Partition of Bengal by Lord Curzon come into official effect in 1905?',
    question_hi: 'लॉर्ड कर्जन द्वारा किया गया बंगाल विभाजन किस तिथि को आधिकारिक रूप से प्रभावी हुआ था?',
    option_a: '19 July 1905',
    option_a_hi: '19 जुलाई 1905',
    option_b: '7 August 1905',
    option_b_hi: '7 अगस्त 1905',
    option_c: '16 October 1905',
    option_c_hi: '16 अक्टूबर 1905',
    option_d: '1 January 1906',
    option_d_hi: '1 जनवरी 1906',
    correct_answer: 'C',
    explanation: '16 October 1905 was the effective date, observed across Bengal as a day of mourning (Raksha Bandhan).',
    explanation_hi: '16 अक्टूबर 1905 को विभाजन प्रभावी हुआ, जिसे शोक दिवस एवं रक्षा बंधन दिवस के रूप में मनाया गया।'
  },
  {
    id: 'q-history-8-2',
    lesson_id: 'lesson-history-8',
    subject_id: 'history-movement',
    question: 'In which year did the Surat Split occur between Moderates and Extremists within the Congress?',
    question_hi: 'कांग्रेस के नरम दल और गरम दल के बीच सूरत विभाजन किस वर्ष हुआ था?',
    option_a: '1905',
    option_a_hi: '1905',
    option_b: '1906',
    option_b_hi: '1906',
    option_c: '1907',
    option_c_hi: '1907',
    option_d: '1909',
    option_d_hi: '1909',
    correct_answer: 'C',
    explanation: 'The Surat split occurred in 1907 at the session presided over by Rashbehari Ghosh.',
    explanation_hi: '1907 के सूरत अधिवेशन में कांग्रेस का विभाजन हुआ।'
  },
  {
    id: 'q-history-8-3',
    lesson_id: 'lesson-history-8',
    subject_id: 'history-movement',
    question: 'Who threw a bomb at District Magistrate Kingsford’s carriage in Muzaffarpur (Bihar) on 30 April 1908?',
    question_hi: '30 अप्रैल 1908 को बिहार के मुजफ्फरपुर में जज किंग्सफोर्ड की गाड़ी पर किसने बम फेंका था?',
    option_a: 'Bhagat Singh and Rajguru',
    option_a_hi: 'भगत सिंह एवं राजगुरु',
    option_b: 'Khudiram Bose and Prafulla Chaki',
    option_b_hi: 'खुदीराम बोस एवं प्रफुल्ल चाकी',
    option_c: 'Batukeshwar Dutt and Sukhdev',
    option_c_hi: 'बटुकेश्वर दत्त एवं सुखदेव',
    option_d: 'Ram Prasad Bismil and Ashfaqullah',
    option_d_hi: 'रामप्रसाद बिस्मिल एवं अशफाकउल्ला',
    correct_answer: 'B',
    explanation: 'Khudiram Bose and Prafulla Chaki threw the bomb. Bose was hanged and Chaki shot himself.',
    explanation_hi: 'खुदीराम बोस और प्रफुल्ल चाकी ने बम फेंका था।'
  },
  {
    id: 'q-history-8-4',
    lesson_id: 'lesson-history-8',
    subject_id: 'history-movement',
    question: 'Where was the Ghadar Party founded in 1913 under the leadership of Lala Har Dayal and Sohan Singh Bhakna?',
    question_hi: '1913 में लाला हरदयाल और सोहन सिंह भकना द्वारा गदर पार्टी की स्थापना कहाँ की गई थी?',
    option_a: 'London',
    option_a_hi: 'लंदन',
    option_b: 'San Francisco (USA)',
    option_b_hi: 'सैन फ्रांसिस्को (अमेरिका)',
    option_c: 'Berlin',
    option_c_hi: 'बर्लिन',
    option_d: 'Tokyo',
    option_d_hi: 'टोक्यो',
    correct_answer: 'B',
    explanation: 'The Ghadar Party was established in San Francisco, California in 1913.',
    explanation_hi: 'सैन फ्रांसिस्को में युगान्तर आश्रम स्थापित कर गदर पत्रिका और पार्टी की शुरुआत हुई।'
  },
  {
    id: 'q-history-8-5',
    lesson_id: 'lesson-history-8',
    subject_id: 'history-movement',
    question: 'Who gave the famous slogan "Swaraj is my birthright and I shall have it"?',
    question_hi: '"स्वराज मेरा जन्मसिद्ध अधिकार है और मैं इसे लेकर रहूँगा" का प्रसिद्ध नारा किसने दिया था?',
    option_a: 'Lala Lajpat Rai',
    option_a_hi: 'लाला लाजपत राय',
    option_b: 'Bal Gangadhar Tilak',
    option_b_hi: 'बाल गंगाधर तिलक',
    option_c: 'Bipin Chandra Pal',
    option_c_hi: 'विपिन चंद्र पाल',
    option_d: 'Subhas Chandra Bose',
    option_d_hi: 'सुभाष चंद्र बोस',
    correct_answer: 'B',
    explanation: 'Lokmanya Bal Gangadhar Tilak declared this during the Home Rule movement.',
    explanation_hi: 'लोकमान्य बाल गंगाधर तिलक ने होमरूल आंदोलन के दौरान यह नारा दिया था।'
  },

  // Lesson 9 (history-9) Questions
  {
    id: 'q-history-9-1',
    lesson_id: 'lesson-history-9',
    subject_id: 'history-movement',
    question: 'On which fateful day did the brutal Jallianwala Bagh Massacre occur in Amritsar?',
    question_hi: 'अमृतसर में नृशंस जलियांवाला बाग हत्याकांड किस तिथि को हुआ था?',
    option_a: '6 April 1919',
    option_a_hi: '6 अप्रैल 1919',
    option_b: '13 April 1919',
    option_b_hi: '13 अप्रैल 1919',
    option_c: '1 August 1920',
    option_c_hi: '1 अगस्त 1920',
    option_d: '23 March 1931',
    option_d_hi: '23 मार्च 1931',
    correct_answer: 'B',
    explanation: 'The massacre took place on 13 April 1919 (Baisakhi festival).',
    explanation_hi: '13 अप्रैल 1919 को बैसाखी के दिन जनरल डायर ने निहत्थी सभा पर गोलियां चलवाई थीं।'
  },
  {
    id: 'q-history-9-2',
    lesson_id: 'lesson-history-9',
    subject_id: 'history-movement',
    question: 'Due to which violent incident did Mahatma Gandhi abruptly withdraw the Non-Cooperation Movement in February 1922?',
    question_hi: 'किस हिंसक घटना के कारण महात्मा गांधी ने फरवरी 1922 में असहयोग आंदोलन वापस ले लिया था?',
    option_a: 'Kakori Train Action',
    option_a_hi: 'काकोरी ट्रेन एक्शन',
    option_b: 'Chauri Chaura Incident',
    option_b_hi: 'चौरी-चौरा की घटना',
    option_c: 'Jallianwala Bagh Massacre',
    option_c_hi: 'जलियांवाला बाग कांड',
    option_d: 'Lahore Conspiracy',
    option_d_hi: 'लाहौर षड्यंत्र',
    correct_answer: 'B',
    explanation: 'On 4 February 1922 at Chauri Chaura (Gorakhpur), an angry mob set fire to a police station, killing 22 policemen.',
    explanation_hi: '4 फरवरी 1922 को चौरी-चौरा में 22 पुलिसकर्मियों को जलाए जाने के बाद गांधीजी ने आंदोलन स्थगित किया।'
  },
  {
    id: 'q-history-9-3',
    lesson_id: 'lesson-history-9',
    subject_id: 'history-movement',
    question: 'At which historic session did the Congress adopt the "Poorna Swaraj" (Complete Independence) resolution in 1929?',
    question_hi: '1929 में कांग्रेस ने किस ऐतिहासिक अधिवेशन में "पूर्ण स्वराज" का प्रस्ताव पारित किया था?',
    option_a: 'Calcutta Session',
    option_a_hi: 'कलकत्ता अधिवेशन',
    option_b: 'Lahore Session',
    option_b_hi: 'लाहौर अधिवेशन',
    option_c: 'Karachi Session',
    option_c_hi: 'कराची अधिवेशन',
    option_d: 'Madras Session',
    option_d_hi: 'मद्रास अधिवेशन',
    correct_answer: 'B',
    explanation: 'The Lahore session (presided by Jawaharlal Nehru on the banks of Ravi) adopted Poorna Swaraj.',
    explanation_hi: 'पंडित जवाहरलाल नेहरू की अध्यक्षता में रावी नदी के तट पर लाहौर में पूर्ण स्वराज का प्रस्ताव पारित हुआ।'
  },
  {
    id: 'q-history-9-4',
    lesson_id: 'lesson-history-9',
    subject_id: 'history-movement',
    question: 'On what date did Mahatma Gandhi inaugurate the Civil Disobedience Movement by breaking the salt law at Dandi?',
    question_hi: 'दांडी में नमक कानून तोड़कर महात्मा गांधी ने सविनय अवज्ञा आंदोलन किस तिथि को प्रारंभ किया था?',
    option_a: '12 March 1930',
    option_a_hi: '12 मार्च 1930',
    option_b: '6 April 1930',
    option_b_hi: '6 अप्रैल 1930',
    option_c: '5 March 1931',
    option_c_hi: '5 मार्च 1931',
    option_d: '26 January 1930',
    option_d_hi: '26 जनवरी 1930',
    correct_answer: 'B',
    explanation: 'The march started 12 March, and the salt law was formally broken on 6 April 1930.',
    explanation_hi: '6 अप्रैल 1930 की सुबह गांधीजी ने दांडी के समुद्र तट पर नमक बनाकर कानून तोड़ा।'
  },
  {
    id: 'q-history-9-5',
    lesson_id: 'lesson-history-9',
    subject_id: 'history-movement',
    question: 'Who was famously called "Frontier Gandhi" and led the Khudai Khidmatgar (Red Shirts) movement in the North-West?',
    question_hi: '"सीमांत गांधी" के नाम से किन्हें जाना जाता है जिन्होंने पश्चिमोत्तर में "खुदाई खिदमतगार" आंदोलन चलाया था?',
    option_a: 'Maulana Abul Kalam Azad',
    option_a_hi: 'मौलाना अबुल कलाम आजाद',
    option_b: 'Khan Abdul Ghaffar Khan',
    option_b_hi: 'खान अब्दुल गफ्फार खान',
    option_c: 'Shaukat Ali',
    option_c_hi: 'शौकत अली',
    option_d: 'Dr. Saifuddin Kitchlew',
    option_d_hi: 'डॉ. सैफुद्दीन किचलू',
    correct_answer: 'B',
    explanation: 'Khan Abdul Ghaffar Khan (Badshah Khan) led the non-violent Red Shirt movement.',
    explanation_hi: 'खान अब्दुल गफ्फार खान को सीमांत गांधी कहा जाता है।'
  },

  // Lesson 10 (history-10) Questions
  {
    id: 'q-history-10-1',
    lesson_id: 'lesson-history-10',
    subject_id: 'history-movement',
    question: 'Which historic slogan was given by Mahatma Gandhi at Gowalia Tank Maidan on 8 August 1942?',
    question_hi: '8 अगस्त 1942 को गोवालिया टैंक मैदान से महात्मा गांधी ने कौन सा ऐतिहासिक नारा दिया था?',
    option_a: '"Jai Hind"',
    option_a_hi: '"जय हिंद"',
    option_b: '"Do or Die" (Karo ya Maro)',
    option_b_hi: '"करो या मरो"',
    option_c: '"Dilli Chalo"',
    option_c_hi: '"दिल्ली चलो"',
    option_d: '"Inquilab Zindabad"',
    option_d_hi: '"इंकलाब जिंदाबाद"',
    correct_answer: 'B',
    explanation: 'Gandhiji gave the call "Do or Die" (Karo ya Maro) for the Quit India Movement.',
    explanation_hi: 'गांधीजी ने भारत छोड़ो आंदोलन के लिए "करो या मरो" का अमर नारा दिया था।'
  },
  {
    id: 'q-history-10-2',
    lesson_id: 'lesson-history-10',
    subject_id: 'history-movement',
    question: 'On what date did Netaji Subhas Chandra Bose proclaim the formation of the Provisional Government of Free India (Azad Hind Sarkar) in Singapore?',
    question_hi: 'नेताजी सुभाष चंद्र बोस ने सिंगापुर में स्वतंत्र भारत की अंतरिम सरकार (आजाद हिंद सरकार) की स्थापना किस तिथि को की थी?',
    option_a: '23 January 1942',
    option_a_hi: '23 जनवरी 1942',
    option_b: '21 October 1943',
    option_b_hi: '21 अक्टूबर 1943',
    option_c: '15 August 1945',
    option_c_hi: '15 अगस्त 1945',
    option_d: '6 July 1944',
    option_d_hi: '6 जुलाई 1944',
    correct_answer: 'B',
    explanation: 'Netaji proclaimed the Azad Hind Sarkar on 21 October 1943 in Singapore.',
    explanation_hi: '21 अक्टूबर 1943 को सिंगापुर के कैथे सिनेमा हॉल में आजाद हिंद सरकार की स्थापना हुई।'
  },
  {
    id: 'q-history-10-3',
    lesson_id: 'lesson-history-10',
    subject_id: 'history-movement',
    question: 'Who was popularly hailed as the "Heroine of the 1942 Movement" for unfurling the national flag at Gowalia Tank Maidan?',
    question_hi: '9 अगस्त 1942 को गोवालिया टैंक मैदान में तिरंगा फहराने के लिए किन्हें "1942 की वीरांगना" कहा गया?',
    option_a: 'Sarojini Naidu',
    option_a_hi: 'सरोजिनी नायडू',
    option_b: 'Aruna Asaf Ali',
    option_b_hi: 'अरुणा आसफ अली',
    option_c: 'Usha Mehta',
    option_c_hi: 'उषा मेहता',
    option_d: 'Sucheta Kripalani',
    option_d_hi: 'सुचेता कृपलानी',
    correct_answer: 'B',
    explanation: 'Aruna Asaf Ali hoisted the tricolor amidst police tear gas at Gowalia Tank, becoming the icon of 1942.',
    explanation_hi: 'अरुणा आसफ अली ने सभी नेताओं की गिरफ्तारी के बाद तिरंगा फहराकर आंदोलन का नेतृत्व किया।'
  },
  {
    id: 'q-history-10-4',
    lesson_id: 'lesson-history-10',
    subject_id: 'history-movement',
    question: 'Under which famous plan announced on 3 June 1947 was the partition of British India decided?',
    question_hi: '3 जून 1947 को घोषित किस योजना के तहत भारत के विभाजन का निर्णय लिया गया था?',
    option_a: 'Wavell Plan',
    option_a_hi: 'वेवेल योजना',
    option_b: 'Mountbatten Plan',
    option_b_hi: 'माउंटबेटन योजना',
    option_c: 'Cabinet Mission Plan',
    option_c_hi: 'कैबिनेट मिशन योजना',
    option_d: 'Cripps Plan',
    option_d_hi: 'क्रिप्स योजना',
    correct_answer: 'B',
    explanation: 'Lord Mountbatten announced the partition plan on 3 June 1947, known as the Mountbatten Plan.',
    explanation_hi: 'अंतिम वायसराय लॉर्ड माउंटबेटन ने 3 जून 1947 को भारत और पाकिस्तान के विभाजन की योजना प्रस्तुत की।'
  },
  {
    id: 'q-history-10-5',
    lesson_id: 'lesson-history-10',
    subject_id: 'history-movement',
    question: 'On which date was the Indian Independence Act, 1947 granted royal assent by the British Crown?',
    question_hi: 'ब्रिटिश संसद द्वारा पारित भारतीय स्वतंत्रता अधिनियम 1947 को ब्रिटिश सम्राट की स्वीकृति किस तारीख को मिली थी?',
    option_a: '3 June 1947',
    option_a_hi: '3 जून 1947',
    option_b: '18 July 1947',
    option_b_hi: '18 जुलाई 1947',
    option_c: '14 August 1947',
    option_c_hi: '14 अगस्त 1947',
    option_d: '15 August 1947',
    option_d_hi: '15 अगस्त 1947',
    correct_answer: 'B',
    explanation: 'The Indian Independence Act received royal assent on 18 July 1947, taking effect on 15 August 1947.',
    explanation_hi: '18 जुलाई 1947 को ब्रिटिश सम्राट के हस्ताक्षर के साथ भारतीय स्वतंत्रता अधिनियम कानून बना।'
  }
];
