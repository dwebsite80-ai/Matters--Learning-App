import { Lesson, Question } from '../types';

export const POLITY_LESSONS: Lesson[] = [
  // 1. Making of the Indian Constitution
  {
    id: 'lesson-polity-1',
    topic_id: 'polity-1',
    subject_id: 'polity-constitution',
    title: 'Making of the Indian Constitution',
    title_hi: 'भारतीय संविधान का निर्माण एवं संविधान सभा',
    subtitle: 'From Cabinet Mission to the World’s Longest Written Constitution',
    subtitle_hi: 'कैबिनेट मिशन से विश्व के सबसे विस्तृत लिखित संविधान तक',
    estimated_minutes: 15,
    difficulty: 'Beginner',
    hook: 'How did 299 representatives from diverse corners of a newly partitioned India draft a master legal document in exactly 2 years, 11 months, and 18 days that still unites 1.4 billion citizens today?',
    hook_hi: 'विभाजन की विभीषिका के बीच 299 प्रतिनिधियों ने मिलकर ठीक 2 वर्ष, 11 माह और 18 दिन में ऐसा विस्तृत संविधान कैसे बनाया जो आज 140 करोड़ नागरिकों को एक सूत्र में पिरोए हुए है?',
    sections: [
      {
        title: 'Genesis: Cabinet Mission Plan and Demand',
        title_hi: 'पृष्ठभूमि: कैबिनेट मिशन योजना एवं मांग',
        content: 'The idea of a Constituent Assembly was first proposed by M.N. Roy in 1934 and officially adopted by the Indian National Congress in 1935. The Constituent Assembly was constituted in November 1946 under the Cabinet Mission Plan (Lord Pethick-Lawrence, Sir Stafford Cripps, A.V. Alexander). Total initial membership was 389, reduced to 299 after the partition of India.',
        content_hi: 'संविधान सभा का विचार सर्वप्रथम 1934 में एम.एन. रॉय ने रखा। 1946 में कैबिनेट मिशन योजना के तहत संविधान सभा का गठन हुआ। कुल 389 सदस्यों में से भारत के विभाजन के बाद संख्या 299 रह गई।',
        highlight: 'First Meeting: 9 December 1946. Dr. Sachchidananda Sinha of Bihar was elected temporary President as the oldest member (French practice).',
        highlight_hi: 'प्रथम बैठक: 9 दिसंबर 1946। बिहार के डॉ. सच्चिदानंद सिन्हा को सबसे वरिष्ठ सदस्य होने के कारण सर्वसम्मति से अस्थायी अध्यक्ष चुना गया।',
        iconType: 'concept'
      },
      {
        title: 'Key Milestones: Objectives Resolution & Drafting Committee',
        title_hi: 'प्रमुख पड़ाव: उद्देश्य प्रस्ताव एवं प्रारूप समिति',
        content: 'On 11 December 1946, Dr. Rajendra Prasad was elected permanent President and H.C. Mukherjee Vice-President. On 13 December 1946, Jawaharlal Nehru moved the historic "Objectives Resolution", outlining the philosophical bedrock of sovereign independent India (unanimously adopted on 22 January 1947). The 7-member Drafting Committee set up on 29 August 1947 was chaired by Dr. B.R. Ambedkar (Father of the Constitution).',
        content_hi: '11 दिसंबर 1946 को डॉ. राजेंद्र प्रसाद स्थायी अध्यक्ष बने। 13 दिसंबर 1946 को पं. नेहरू ने ऐतिहासिक "उद्देश्य प्रस्ताव" पेश किया जो बाद में प्रस्तावना का आधार बना। 29 अगस्त 1947 को गठित 7 सदस्यीय प्रारूप समिति के अध्यक्ष डॉ. बी.आर. अंबेडकर बने।',
        iconType: 'tip'
      },
      {
        title: 'Adoption, Enactment and Commencement',
        title_hi: 'अंगीकरण एवं लागू होना',
        content: 'The Constitution was adopted on 26 November 1949 (celebrated as Constitution Day / Samvidhan Diwas) containing a Preamble, 395 Articles in 22 Parts, and 8 Schedules. It came into full force on 26 January 1950 to honor the "Poorna Swaraj" declaration of the 1929 Lahore Congress Session.',
        content_hi: 'संविधान को 26 नवंबर 1949 को अंगीकृत किया गया (मूल संविधान में प्रस्तावना, 395 अनुच्छेद, 22 भाग और 8 अनुसूचियां थीं)। 26 जनवरी 1950 को इसे पूर्ण रूप से लागू किया गया, क्योंकि 1930 में इसी दिन प्रथम स्वाधीनता दिवस मनाया गया था।',
        highlight: 'Sir B.N. Rau served as the Constitutional Advisor to the Constituent Assembly.',
        highlight_hi: 'सर बी.एन. राव संविधान सभा के संवैधानिक सलाहकार (Constitutional Advisor) थे।',
        iconType: 'concept'
      }
    ],
    practical_example: {
      scenario: 'A civil service aspirant must differentiate between Adoption Date and Commencement Date of the Constitution.',
      scenario_hi: 'प्रतियोगी परीक्षा में संविधान के अंगीकार होने और लागू होने की तिथियों का अंतर समझना।',
      analysis: 'Adopted, enacted, and given to ourselves: 26 November 1949. Commenced (Republic Day): 26 January 1950.',
      analysis_hi: 'अंगीकृत, अधिनियमित और आत्मार्पित: 26 नवंबर 1949। पूर्णतः लागू (गणतंत्र दिवस): 26 जनवरी 1950।',
      actionable_tip: 'Provisions regarding citizenship, elections, and provisional parliament came into force immediately on 26 Nov 1949 under Article 394.',
      actionable_tip_hi: 'नागरिकता, चुनाव और अंतरिम संसद संबंधी प्रावधान 26 नवंबर 1949 को ही तुरंत लागू हो गए थे।'
    },
    key_takeaways: [
      'Total drafting time: 2 years, 11 months, 18 days.',
      'Dr. Sachchidananda Sinha: Temporary President; Dr. Rajendra Prasad: Permanent President.',
      'Dr. B.R. Ambedkar was the Chairman of the 7-member Drafting Committee.',
      '26 November is celebrated as Constitution Day (Samvidhan Diwas).'
    ],
    key_takeaways_hi: [
      'संविधान निर्माण में कुल 2 वर्ष, 11 माह और 18 दिन लगे।',
      'डॉ. सच्चिदानंद सिन्हा अस्थायी अध्यक्ष तथा डॉ. राजेंद्र प्रसाद स्थायी अध्यक्ष थे।',
      'प्रारूप समिति (Drafting Committee) के अध्यक्ष डॉ. बी.आर. अंबेडकर थे।',
      '26 नवंबर को प्रतिवर्ष संविधान दिवस के रूप में मनाया जाता है।'
    ]
  },

  // 2. Preamble and Features of the Constitution
  {
    id: 'lesson-polity-2',
    topic_id: 'polity-2',
    subject_id: 'polity-constitution',
    title: 'Preamble and Features of the Constitution',
    title_hi: 'संविधान की प्रस्तावना एवं प्रमुख विशेषताएं',
    subtitle: 'The Identity Card and Fundamental Pillars of the Republic',
    subtitle_hi: 'संविधान का परिचय पत्र एवं मूलभूत दार्शनिक आधार',
    estimated_minutes: 15,
    difficulty: 'Beginner',
    hook: 'Eminent jurist N.A. Palkhivala called the Preamble the "Identity Card of the Constitution". Can the Preamble be amended, and is it a legally enforceable part of the Constitution?',
    hook_hi: 'प्रख्यात न्यायविद नानी पालकीवाला ने प्रस्तावना को "संविधान का परिचय पत्र" कहा था। क्या प्रस्तावना संविधान का भाग है, और क्या इसमें संशोधन किया जा सकता है?',
    sections: [
      {
        title: 'Core Keywords of the Preamble',
        title_hi: 'प्रस्तावना के मूल शब्द एवं अर्थ',
        content: 'The Preamble declares India to be a "SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC". It promises all citizens: JUSTICE (Social, Economic, and Political); LIBERTY of thought, expression, belief, faith, and worship; EQUALITY of status and opportunity; and FRATERNITY assuring the dignity of the individual and the unity and integrity of the Nation.',
        content_hi: 'प्रस्तावना भारत को "संपूर्ण प्रभुत्व-संपन्न, समाजवादी, पंथनिरपेक्ष, लोकतंत्रात्मक गणराज्य" घोषित करती है। यह तीन प्रकार के न्याय (सामाजिक, आर्थिक, राजनीतिक), पाँच प्रकार की स्वतंत्रता (विचार, अभिव्यक्ति, विश्वास, धर्म, उपासना) और दो प्रकार की समता (प्रतिष्ठा व अवसर) प्रदान करती है।',
        iconType: 'concept'
      },
      {
        title: 'Amendability and Landmark Judgments',
        title_hi: 'प्रस्तावना में संशोधन एवं ऐतिहासिक निर्णय',
        content: 'In the Berubari Union Case (1960), the Supreme Court opined that the Preamble is not part of the Constitution. However, in the historic Kesavananda Bharati Case (1973), a 13-judge constitutional bench ruled that the Preamble IS an integral part of the Constitution and can be amended under Article 368 without altering the "Basic Structure".',
        content_hi: 'बेरुबारी वाद (1960) में सुप्रीम कोर्ट ने कहा कि प्रस्तावना संविधान का अंग नहीं है। लेकिन केशवानंद भारती वाद (1973) की 13 जजों की पीठ ने फैसला दिया कि प्रस्तावना संविधान का अभिन्न अंग है और मूल ढांचे को छोड़कर इसमें संशोधन किया जा सकता है।',
        highlight: 'The 42nd Constitutional Amendment Act (1976) added three new words to the Preamble: "Socialist", "Secular", and "Integrity". It has been amended only once.',
        highlight_hi: '42वें संविधान संशोधन (1976) द्वारा प्रस्तावना में तीन नए शब्द जोड़े गए: "समाजवादी", "पंथनिरपेक्ष" और "अखंडता"। यह अब तक केवल एक बार संशोधित हुआ है।',
        iconType: 'tip'
      },
      {
        title: 'Salient Features and Borrowed Elements',
        title_hi: 'प्रमुख विशेषताएं एवं विदेशी स्रोतों से ग्रहण तत्व',
        content: 'Indian Constitution blends rigidity and flexibility, establishes a federal system with a unitary bias ("Quasi-federal" as per K.C. Wheare), and incorporates borrowed gems: Parliamentary System and Rule of Law (UK); Fundamental Rights and Judicial Review (USA); Directive Principles of State Policy (Ireland); Concurrent List (Australia); Suspension of Fundamental Rights during Emergency (Weimar Germany).',
        content_hi: 'भारतीय संविधान नम्यता और अनम्यता का अनोखा मिश्रण है। प्रमुख स्रोत: संसदीय शासन एवं विधि का शासन (ब्रिटेन); मौलिक अधिकार एवं न्यायिक पुनरावलोकन (यूएसए); राज्य के नीति निदेशक तत्व (आयरलैंड); समवर्ती सूची (ऑस्ट्रेलिया); आपातकाल में मौलिक अधिकारों का स्थगन (जर्मनी)।',
        iconType: 'concept'
      }
    ],
    practical_example: {
      scenario: 'A question asks: "How many times has the Preamble to the Indian Constitution been amended so far?"',
      scenario_hi: 'परीक्षा प्रश्न: "भारतीय संविधान की प्रस्तावना में अब तक कुल कितनी बार संशोधन किया गया है?"',
      analysis: 'Exactly once—by the 42nd Constitutional Amendment Act, 1976 under the Indira Gandhi government.',
      analysis_hi: 'अब तक केवल एक बार—42वें संविधान संशोधन अधिनियम, 1976 द्वारा।',
      actionable_tip: 'Three words were added in 1976: Socialist, Secular, and Integrity.',
      actionable_tip_hi: '1976 में तीन शब्द जोड़े गए थे: समाजवादी (Socialist), पंथनिरपेक्ष (Secular), तथा अखंडता (Integrity)।'
    },
    key_takeaways: [
      'Preamble is based on Nehru’s Objectives Resolution of 13 December 1946.',
      'Kesavananda Bharati case (1973) held Preamble to be an integral part of the Constitution.',
      '42nd Amendment Act (1976) amended the Preamble for the first and only time.',
      'DPSP was borrowed from Ireland, Fundamental Rights from USA, Parliamentary system from UK.'
    ],
    key_takeaways_hi: [
      'प्रस्तावना पं. नेहरू के उद्देश्य प्रस्ताव पर आधारित है।',
      'केशवानंद भारती वाद (1973) ने माना कि प्रस्तावना संविधान का अभिन्न अंग है।',
      'प्रस्तावना में केवल एक बार 42वें संशोधन (1976) द्वारा संशोधन हुआ।',
      'नीति निदेशक तत्व आयरलैंड से, मौलिक अधिकार अमेरिका से और संसदीय प्रणाली ब्रिटेन से ली गई है।'
    ]
  },

  // 3. Fundamental Rights
  {
    id: 'lesson-polity-3',
    topic_id: 'polity-3',
    subject_id: 'polity-constitution',
    title: 'Fundamental Rights',
    title_hi: 'मौलिक अधिकार: अनुच्छेद 12 से 35',
    subtitle: 'The Magna Carta of India (Part III)',
    subtitle_hi: 'भारतीय नागरिकों का अधिकार पत्र (भाग III)',
    estimated_minutes: 15,
    difficulty: 'Intermediate',
    hook: 'Why is Part III described as the Magna Carta of India? If the government passes a law restricting your freedom of speech arbitrarily, what constitutional superpower gives the courts authority to strike it down?',
    hook_hi: 'संविधान के भाग III को "भारत का मैग्ना कार्टा" क्यों कहा जाता है? यदि सरकार नागरिकों की स्वतंत्रता छीनने वाला कोई कानून बनाए, तो न्यायपालिका उसे कैसे रद्द कर सकती है?',
    sections: [
      {
        title: 'Six Broad Categories of Fundamental Rights',
        title_hi: 'मौलिक अधिकारों के 6 प्रमुख वर्ग',
        content: 'Originally 7 rights were granted, but the Right to Property (Article 31) was deleted by the 44th Constitutional Amendment Act (1978) and made a legal right under Article 300A. The remaining 6 categories are: 1) Right to Equality (Articles 14–18); 2) Right to Freedom (Articles 19–22); 3) Right against Exploitation (Articles 23–24); 4) Right to Freedom of Religion (Articles 25–28); 5) Cultural & Educational Rights (Articles 29–30); 6) Right to Constitutional Remedies (Article 32).',
        content_hi: 'मूल संविधान में 7 मौलिक अधिकार थे, परंतु 44वें संविधान संशोधन (1978) द्वारा संपत्ति के अधिकार (अनुच्छेद 31) को मौलिक अधिकारों से हटाकर अनुच्छेद 300A के तहत कानूनी अधिकार बना दिया गया। वर्तमान में 6 श्रेणियां हैं: समता का अधिकार (14-18), स्वतंत्रता (19-22), शोषण के विरुद्ध (23-24), धर्म की स्वतंत्रता (25-28), संस्कृति एवं शिक्षा (29-30), और संवैधानिक उपचारों का अधिकार (32)।',
        iconType: 'concept'
      },
      {
        title: 'Key Articles: 14, 19, and 21 (The Golden Triangle)',
        title_hi: 'स्वर्णिम त्रिभुज: अनुच्छेद 14, 19 एवं 21',
        content: 'Articles 14, 19, and 21 are together termed the "Golden Triangle" of human rights. Article 14 ensures equality before law. Article 19 guarantees 6 basic democratic freedoms (speech, peaceful assembly, association, movement, residence, profession). Article 21 guarantees life and personal liberty, expanded through the Maneka Gandhi case (1978) to include dignity, clean environment, speedy trial, and privacy (Puttaswamy case 2017).',
        content_hi: 'अनुच्छेद 14, 19 और 21 को भारतीय संविधान का "स्वर्णिम त्रिभुज" कहा जाता है। अनु. 14 विधि के समक्ष समता, अनु. 19 छह लोकतांत्रिक स्वतंत्रताएं, और अनु. 21 प्राण एवं दैहिक स्वतंत्रता देता है जिसे मेनका गांधी वाद (1978) और पुट्टास्वामी वाद (2017 - निजता का अधिकार) में विस्तृत किया गया।',
        highlight: 'Article 21A (Right to Education for children aged 6–14) was added by the 86th Constitutional Amendment Act, 2002.',
        highlight_hi: '86वें संविधान संशोधन (2002) द्वारा अनुच्छेद 21A जोड़कर 6 से 14 वर्ष के बच्चों के लिए अनिवार्य शिक्षा को मौलिक अधिकार बनाया गया।',
        iconType: 'tip'
      },
      {
        title: 'Article 32: The Constitutional Writs',
        title_hi: 'अनुच्छेद 32: संवैधानिक उपचार एवं 5 रिटें',
        content: 'Dr. Ambedkar called Article 32 the "Heart and Soul of the Constitution". Under Article 32 (Supreme Court) and Article 226 (High Courts), five prerogative writs can be issued: 1) Habeas Corpus (produce the body); 2) Mandamus (we command public duty); 3) Prohibition (stop lower court); 4) Certiorari (quash illegal order); 5) Quo-Warranto (by what authority).',
        content_hi: 'डॉ. अंबेडकर ने अनुच्छेद 32 को संविधान का "हृदय और आत्मा" कहा था। इसके तहत सुप्रीम कोर्ट (अनु. 32) और हाईकोर्ट (अनु. 226) 5 प्रकार की रिट जारी कर सकते हैं: बंदी प्रत्यक्षीकरण (Habeas Corpus), परमादेश (Mandamus), प्रतिषेध (Prohibition), उत्प्रेषण (Certiorari), और अधिकार पृच्छा (Quo-Warranto)।',
        iconType: 'concept'
      }
    ],
    practical_example: {
      scenario: 'A person is unlawfully detained in police lockup for 48 hours without being produced before any judicial magistrate.',
      scenario_hi: 'किसी व्यक्ति को बिना मजिस्ट्रेट के समक्ष पेश किए 48 घंटे तक गैरकानूनी तरीके से हिरासत में रखा गया है।',
      analysis: 'This violates Article 22(2) and Article 21. His relatives can file a writ of Habeas Corpus in the High Court (Art. 226) or Supreme Court (Art. 32).',
      analysis_hi: 'यह अनुच्छेद 22(2) और 21 का खुला उल्लंघन है। परिजन तुरंत बंदी प्रत्यक्षीकरण (Habeas Corpus) रिट दायर कर सकते हैं।',
      actionable_tip: 'Habeas Corpus translates literally as "to have the body" and can be issued against both public and private entities.',
      actionable_tip_hi: 'बंदी प्रत्यक्षीकरण रिट सरकारी और निजी दोनों व्यक्तियों के विरुद्ध जारी की जा सकती है।'
    },
    key_takeaways: [
      'Fundamental Rights are justiciable (enforceable by courts).',
      'Right to Property was deleted from Part III by 44th Amendment (1978).',
      'Article 20 and Article 21 cannot be suspended even during a National Emergency (Article 359).',
      'Five writs: Habeas Corpus, Mandamus, Prohibition, Certiorari, Quo-Warranto.'
    ],
    key_takeaways_hi: [
      'मौलिक अधिकार वाद-योग्य (justiciable) हैं यानी इनका उल्लंघन होने पर न्यायालय जा सकते हैं।',
      '44वें संशोधन (1978) द्वारा संपत्ति का अधिकार मौलिक अधिकार से हटा दिया गया।',
      'राष्ट्रीय आपातकाल के दौरान भी अनुच्छेद 20 और 21 निलंबित नहीं किए जा सकते।',
      'पाँच रिटें: बंदी प्रत्यक्षीकरण, परमादेश, प्रतिषेध, उत्प्रेषण एवं अधिकार पृच्छा।'
    ]
  },

  // 4. Directive Principles and Fundamental Duties
  {
    id: 'lesson-polity-4',
    topic_id: 'polity-4',
    subject_id: 'polity-constitution',
    title: 'Directive Principles and Fundamental Duties',
    title_hi: 'राज्य के नीति निदेशक तत्व एवं मौलिक कर्तव्य',
    subtitle: 'Welfare State Vision (Part IV) and Citizen Responsibilities (Part IV-A)',
    subtitle_hi: 'कल्याणकारी राज्य की संकल्पना (भाग IV) एवं नागरिक कर्तव्य (भाग IV-A)',
    estimated_minutes: 15,
    difficulty: 'Intermediate',
    hook: 'While Fundamental Rights provide political democracy, what provisions ensure social and economic democracy in India? Enter the Directive Principles of State Policy.',
    hook_hi: 'जहाँ मौलिक अधिकार नागरिकों को राजनीतिक लोकतंत्र प्रदान करते हैं, वहीं सामाजिक और आर्थिक लोकतंत्र की स्थापना का दायित्व नीति निदेशक तत्वों पर है।',
    sections: [
      {
        title: 'DPSP: Nature and Classification (Articles 36–51)',
        title_hi: 'नीति निदेशक तत्व: प्रकृति एवं वर्गीकरण',
        content: 'Borrowed from the Irish Constitution, DPSPs are non-justiciable guidelines directed at the State to establish a Welfare State (Kalyankari Rajya). Article 37 explicitly clarifies that DPSPs are fundamental in the governance of the country. They are broadly classified into: 1) Socialistic principles (Articles 38, 39, 39A, 41, 42, 43); 2) Gandhian principles (Articles 40, 43, 43B, 46, 47, 48); 3) Liberal-Intellectual principles (Articles 44, 45, 48A, 49, 50, 51).',
        content_hi: 'आयरलैंड के संविधान से लिए गए डीपीएसपी (DPSP) गैर-वादयोग्य (non-justiciable) हैं, जिनका उद्देश्य कल्याणकारी राज्य की स्थापना करना है। अनुच्छेद 37 के अनुसार ये देश के शासन में मूलभूत हैं। इन्हें समाजवादी (38, 39), गांधीवादी (40-ग्राम पंचायत, 43, 47-मद्यनिषेध) और उदार-बौद्धिक (44-समान नागरिक संहिता, 50-कार्यपालिका से न्यायपालिका का पृथक्करण) में बांटा जाता है।',
        iconType: 'concept'
      },
      {
        title: 'Important DPSP Articles',
        title_hi: 'महत्वपूर्ण नीति निदेशक अनुच्छेद',
        content: 'Article 39A: Equal justice and free legal aid; Article 40: Organization of Village Panchayats; Article 44: Uniform Civil Code (UCC) for the citizens; Article 45: Early childhood care and education for children below six years; Article 48A: Protection and improvement of environment and safeguarding forests and wildlife; Article 50: Separation of Judiciary from Executive.',
        content_hi: 'अनुच्छेद 39A: समान न्याय एवं निःशुल्क विधिक सहायता; अनुच्छेद 40: ग्राम पंचायतों का गठन; अनुच्छेद 44: समान नागरिक संहिता (UCC); अनुच्छेद 48A: पर्यावरण एवं वन्यजीव संरक्षण; अनुच्छेद 50: न्यायपालिका का कार्यपालिका से पृथक्करण; अनुच्छेद 51: अंतरराष्ट्रीय शांति एवं सुरक्षा की अभिवृद्धि।',
        highlight: 'Minerva Mills case (1980): The Indian Constitution is founded on the bedrock of the balance between Fundamental Rights and Directive Principles.',
        highlight_hi: 'मिनर्वा मिल्स वाद (1980): भारतीय संविधान मौलिक अधिकारों और नीति निदेशक तत्वों के संतुलन की आधारशिला पर टिका है।',
        iconType: 'tip'
      },
      {
        title: 'Fundamental Duties (Part IV-A, Article 51A)',
        title_hi: 'मौलिक कर्तव्य (भाग IV-A, अनुच्छेद 51A)',
        content: 'Fundamental Duties were not in the original Constitution. On the recommendations of the Sardar Swaran Singh Committee, the 42nd Amendment Act (1976) introduced Part IV-A and Article 51A with 10 Fundamental Duties (inspired by the USSR Constitution). The 11th duty (duty of parents to provide education to child aged 6–14) was added by the 86th Amendment Act (2002).',
        content_hi: 'मूल संविधान में मौलिक कर्तव्य नहीं थे। सरदार स्वर्ण सिंह समिति की सिफारिश पर 42वें संशोधन (1976) द्वारा पूर्व सोवियत संघ (USSR) से प्रेरित होकर 10 मौलिक कर्तव्य जोड़े गए। 86वें संशोधन (2002) द्वारा 11वां कर्तव्य (6-14 वर्ष के बच्चों को शिक्षा का अवसर दिलाना) जोड़ा गया।',
        iconType: 'concept'
      }
    ],
    practical_example: {
      scenario: 'A BPSC question asks: "Which committee recommended the incorporation of Fundamental Duties into the Indian Constitution?"',
      scenario_hi: 'परीक्षा प्रश्न: "संविधान में मौलिक कर्तव्यों को शामिल करने की सिफारिश किस समिति ने की थी?"',
      analysis: 'Sardar Swaran Singh Committee in 1976, which led to the enactment of the 42nd Amendment.',
      analysis_hi: '1976 में गठित सरदार स्वर्ण सिंह समिति ने इसकी सिफारिश की थी।',
      actionable_tip: 'Remember that like DPSPs, Fundamental Duties are non-justiciable unless backed by a specific statute.',
      actionable_tip_hi: 'नीति निदेशक तत्वों की भांति मौलिक कर्तव्य भी सीधे न्यायालय द्वारा प्रवर्तनीय नहीं हैं।'
    },
    key_takeaways: [
      'DPSP (Part IV, Articles 36–51) borrowed from Ireland; aim to establish a Welfare State.',
      'Article 40: Village Panchayats; Article 44: Uniform Civil Code; Article 50: Separation of powers.',
      'Fundamental Duties (Article 51A) were added by 42nd Amendment (1976) on Swaran Singh Committee report.',
      'Currently there are 11 Fundamental Duties (11th added by 86th Amendment in 2002).'
    ],
    key_takeaways_hi: [
      'डीपीएसपी (भाग IV) आयरलैंड से लिए गए हैं; इनका उद्देश्य कल्याणकारी राज्य बनाना है।',
      'अनुच्छेद 40 ग्राम पंचायत, अनुच्छेद 44 समान नागरिक संहिता, अनुच्छेद 50 न्यायपालिका का पृथक्करण है।',
      'स्वर्ण सिंह समिति की सिफारिश पर 42वें संशोधन (1976) द्वारा मौलिक कर्तव्य जोड़े गए।',
      'वर्तमान में 11 मौलिक कर्तव्य हैं (11वां कर्तव्य 2002 में 86वें संशोधन से जुड़ा)।'
    ]
  },

  // 5. President, Vice-President and Prime Minister
  {
    id: 'lesson-polity-5',
    topic_id: 'polity-5',
    subject_id: 'polity-constitution',
    title: 'President, Vice-President and Prime Minister',
    title_hi: 'राष्ट्रपति, उपराष्ट्रपति एवं प्रधानमंत्री की शक्तियां',
    subtitle: 'The Union Executive: De Jure Head vs De Facto Head',
    subtitle_hi: 'संघीय कार्यपालिका: नाममात्र का प्रमुख बनाम वास्तविक प्रधान',
    estimated_minutes: 15,
    difficulty: 'Intermediate',
    hook: 'India follows the Westminster parliamentary model. The President is the formal Supreme Commander of the Armed Forces and Head of State, but why is the Prime Minister the real wielder of political power?',
    hook_hi: 'भारत में राष्ट्रपति देश के प्रथम नागरिक और तीनों सेनाओं के सर्वोच्च सेनापति हैं, लेकिन वास्तविक राजनीतिक सत्ता प्रधानमंत्री और उनके मंत्रिमंडल के पास क्यों होती है?',
    sections: [
      {
        title: 'The President: Election and Tenure (Articles 52–62)',
        title_hi: 'राष्ट्रपति: निर्वाचन एवं कार्यकाल',
        content: 'Article 52 states that there shall be a President of India. The President is elected by an Electoral College consisting of: 1) Elected members of both Houses of Parliament (Lok Sabha & Rajya Sabha); 2) Elected members of Legislative Assemblies of all States; 3) Elected members of Legislative Assemblies of Delhi and Puducherry (added by 70th Amendment 1992). Nominated members do NOT vote in presidential elections.',
        content_hi: 'अनुच्छेद 52 के अनुसार भारत का एक राष्ट्रपति होगा। राष्ट्रपति के निर्वाचक मंडल में: संसद के दोनों सदनों के निर्वाचित सदस्य, राज्यों की विधानसभाओं के निर्वाचित सदस्य तथा दिल्ली व पुडुचेरी विधानसभाओं के निर्वाचित सदस्य शामिल होते हैं। मनोनीत सदस्य मतदान नहीं करते।',
        highlight: 'Impeachment of President (Article 61): Can be initiated on grounds of "violation of the Constitution" in either House with a special majority of two-thirds of total membership.',
        highlight_hi: 'महाभियोग (अनुच्छेद 61): संविधान के उल्लंघन के आधार पर संसद के किसी भी सदन में कुल सदस्य संख्या के 2/3 बहुमत से पारित होना अनिवार्य है।',
        iconType: 'concept'
      },
      {
        title: 'Ordinance and Pardoning Powers',
        title_hi: 'अध्यादेश एवं क्षमादान की शक्तियां',
        content: 'Under Article 123, the President can promulgate an Ordinance when Parliament is not in session, which has the force of an Act but must be approved within 6 weeks of reassembly. Under Article 72, the President possesses pardoning powers: Pardon (completely absolves), Commutation (substituting lighter form), Remission (reducing period), Respite (lesser punishment due to disability/pregnancy), and Reprieve (temporary stay).',
        content_hi: 'अनुच्छेद 123 के तहत संसद का सत्र न चलने पर राष्ट्रपति अध्यादेश (Ordinance) जारी कर सकते हैं, जिसे सत्र शुरू होने के 6 सप्ताह के भीतर संसद से पारित कराना आवश्यक है। अनुच्छेद 72 राष्ट्रपति को क्षमादान, लघुकरण, परिहार, विराम और प्रविलंबन की शक्ति देता है।',
        iconType: 'tip'
      },
      {
        title: 'Vice-President and Prime Minister',
        title_hi: 'उपराष्ट्रपति एवं प्रधानमंत्री का पद',
        content: 'The Vice-President (Article 63) is the Ex-officio Chairman of the Rajya Sabha (Article 64). Under Article 74, there shall be a Council of Ministers with the Prime Minister at the head to aid and advise the President. Article 75 states that the Prime Minister is appointed by the President, and the Council of Ministers is collectively responsible to the Lok Sabha.',
        content_hi: 'अनुच्छेद 63 के तहत भारत का एक उपराष्ट्रपति होगा, जो राज्यसभा का पदेन सभापति (Ex-officio Chairman) होता है। अनुच्छेद 74 के तहत राष्ट्रपति को सलाह देने के लिए प्रधानमंत्री की अध्यक्षता में मंत्रिपरिषद होगी। मंत्रिपरिषद सामूहिक रूप से लोकसभा के प्रति उत्तरदायी होती है (अनुच्छेद 75(3))।',
        iconType: 'concept'
      }
    ],
    practical_example: {
      scenario: 'A question asks: "Who takes part in the election of the Vice-President of India?"',
      scenario_hi: 'परीक्षा प्रश्न: "भारत के उपराष्ट्रपति के चुनाव में कौन-कौन भाग लेते हैं?"',
      analysis: 'All members (both elected AND nominated) of both Houses of Parliament (Lok Sabha + Rajya Sabha). State MLAs do not participate.',
      analysis_hi: 'संसद के दोनों सदनों के सभी सदस्य (निर्वाचित और मनोनीत दोनों)। इसमें राज्य विधानसभाओं के सदस्य भाग नहीं लेते।',
      actionable_tip: 'Nominated MPs vote in the Vice-President’s election, but cannot vote in the President’s election.',
      actionable_tip_hi: 'मनोनीत सांसद उपराष्ट्रपति चुनाव में वोट देते हैं, लेकिन राष्ट्रपति चुनाव में नहीं।'
    },
    key_takeaways: [
      'President elected by proportional representation by single transferable vote.',
      'Article 61: Procedure for Impeachment of the President.',
      'Article 72: Pardoning powers; Article 123: Ordinance making power.',
      'Council of Ministers is collectively responsible to the House of the People (Lok Sabha).'
    ],
    key_takeaways_hi: [
      'राष्ट्रपति का चुनाव एकल संक्रमणीय मत प्रणाली द्वारा आनुपातिक प्रतिनिधित्व से होता है।',
      'अनुच्छेद 61 में राष्ट्रपति पर महाभियोग की प्रक्रिया दी गई है।',
      'अनुच्छेद 72 में क्षमादान और अनुच्छेद 123 में अध्यादेश जारी करने की शक्ति है।',
      'मंत्रिपरिषद सामूहिक रूप से लोकसभा के प्रति उत्तरदायी होती है।'
    ]
  },

  // 6. Parliament and Law-Making
  {
    id: 'lesson-polity-6',
    topic_id: 'polity-6',
    subject_id: 'polity-constitution',
    title: 'Parliament and Law-Making',
    title_hi: 'संसद की संरचना एवं विधि निर्माण प्रक्रिया',
    subtitle: 'Lok Sabha, Rajya Sabha, Bills, and Budgetary Control',
    subtitle_hi: 'लोकसभा, राज्यसभा, विधेयक पारित करने की प्रक्रिया एवं बजट',
    estimated_minutes: 15,
    difficulty: 'Intermediate',
    hook: 'Article 79 states that Parliament consists of three components: the President, Council of States (Rajya Sabha), and House of the People (Lok Sabha). How does a proposed bill transform into the law of the land?',
    hook_hi: 'अनुच्छेद 79 के अनुसार संसद तीन अंगों से मिलकर बनती है: राष्ट्रपति, राज्यसभा और लोकसभा। कोई विधेयक कैसे दोनों सदनों से गुजरकर देश का कानून बनता है?',
    sections: [
      {
        title: 'Bicameral Composition: Rajya Sabha and Lok Sabha',
        title_hi: 'द्विसदनीय संरचना: राज्यसभा एवं लोकसभा',
        content: 'Rajya Sabha (Article 80) has a maximum strength of 250 (currently 245: 233 elected + 12 nominated by the President for excellence in literature, science, art, and social service). It is a permanent body not subject to dissolution; one-third of its members retire every second year (member term: 6 years; minimum age: 30). Lok Sabha (Article 81) has a maximum strength of 550 directly elected from territorial constituencies (term: 5 years; minimum age: 25).',
        content_hi: 'राज्यसभा (अनुच्छेद 80) स्थायी सदन है जो कभी भंग नहीं होता। इसके एक-तिहाई सदस्य प्रत्येक दो वर्ष बाद सेवानिवृत्त होते हैं (कार्यकाल: 6 वर्ष, न्यूनतम आयु: 30 वर्ष)। राष्ट्रपति 12 सदस्यों को मनोनीत करते हैं। लोकसभा (अनुच्छेद 81) लोकप्रिय सदन है (कार्यकाल: 5 वर्ष, न्यूनतम आयु: 25 वर्ष)।',
        iconType: 'concept'
      },
      {
        title: 'Types of Bills and Money Bill (Article 110)',
        title_hi: 'विधेयकों के प्रकार एवं धन विधेयक (अनुच्छेद 110)',
        content: 'Bills are Ordinary, Constitutional Amendment, or Money Bills. Under Article 110, a Money Bill deals exclusively with taxes, borrowing, and the Consolidated Fund of India. It can be introduced ONLY in the Lok Sabha with the prior recommendation of the President. The Speaker of Lok Sabha decides whether a bill is a Money Bill or not. The Rajya Sabha has only 14 days to suggest changes; it cannot reject or amend a Money Bill.',
        content_hi: 'विधेयक कई प्रकार के होते हैं: साधारण, संविधान संशोधन और धन विधेयक। अनुच्छेद 110 में धन विधेयक की परिभाषा है। यह केवल राष्ट्रपति की पूर्व अनुशंसा से लोकसभा में ही पेश हो सकता है। लोकसभा अध्यक्ष प्रमाणित करते हैं कि कोई विधेयक धन विधेयक है या नहीं। राज्यसभा इसे केवल 14 दिन रोक सकती है, रद्द नहीं कर सकती।',
        highlight: 'Joint Sitting of Parliament (Article 108): Summoned by the President to resolve deadlock on an Ordinary Bill, presided over by the Speaker of Lok Sabha.',
        highlight_hi: 'संयुक्त बैठक (अनुच्छेद 108): साधारण विधेयक पर गतिरोध समाप्त करने के लिए राष्ट्रपति द्वारा बुलाई जाती है, जिसकी अध्यक्षता लोकसभा अध्यक्ष करते हैं।',
        iconType: 'tip'
      },
      {
        title: 'Parliamentary Devices: Question Hour & Zero Hour',
        title_hi: 'संसदीय साधन: प्रश्नकाल एवं शून्यकाल',
        content: 'The first hour of a parliamentary sitting is Question Hour (Starred questions answered orally with supplementaries; Unstarred answered in writing). The time immediately following Question Hour is Zero Hour (an informal Indian innovation since 1962 where MPs raise urgent public matters without prior notice).',
        content_hi: 'संसद की बैठक का पहला घंटा प्रश्नकाल (Question Hour) होता है (तारांकित प्रश्नों के मौखिक उत्तर, अतारांकित के लिखित)। प्रश्नकाल के तुरंत बाद शून्यकाल (Zero Hour) शुरू होता है, जो 1962 से भारतीय संसदीय व्यवस्था की विशिष्ट देन है।',
        iconType: 'concept'
      }
    ],
    practical_example: {
      scenario: 'A candidate needs to know who presides over a Joint Sitting of both Houses of Parliament.',
      scenario_hi: 'परीक्षा प्रश्न: "संसद के दोनों सदनों की संयुक्त बैठक की अध्यक्षता कौन करता है?"',
      analysis: 'The Speaker of Lok Sabha presides. In his absence, the Deputy Speaker; if both are absent, the Deputy Chairman of Rajya Sabha (Chairman of RS never presides).',
      analysis_hi: 'लोकसभा अध्यक्ष अध्यक्षता करते हैं। उनकी अनुपस्थिति में उपाध्यक्ष, और दोनों के न होने पर राज्यसभा के उपसभापति।',
      actionable_tip: 'No Joint Sitting can be called for a Money Bill or a Constitutional Amendment Bill.',
      actionable_tip_hi: 'धन विधेयक और संविधान संशोधन विधेयक के लिए संयुक्त बैठक का कोई प्रावधान नहीं है।'
    },
    key_takeaways: [
      'Parliament consists of President, Rajya Sabha, and Lok Sabha (Article 79).',
      'Money Bill (Article 110) can only originate in Lok Sabha; Rajya Sabha must return it within 14 days.',
      'Joint sitting (Article 108) is presided over by the Speaker of Lok Sabha.',
      'Minimum age: Lok Sabha is 25 years; Rajya Sabha is 30 years.'
    ],
    key_takeaways_hi: [
      'अनुच्छेद 79: राष्ट्रपति, राज्यसभा और लोकसभा से मिलकर संसद बनती है।',
      'धन विधेयक (अनुच्छेद 110) केवल लोकसभा में पेश होता है; राज्यसभा के पास केवल 14 दिन होते हैं।',
      'संयुक्त बैठक (अनुच्छेद 108) की अध्यक्षता लोकसभा अध्यक्ष करते हैं।',
      'न्यूनतम आयु: लोकसभा के लिए 25 वर्ष, राज्यसभा के लिए 30 वर्ष।'
    ]
  },

  // 7. Supreme Court and High Courts
  {
    id: 'lesson-polity-7',
    topic_id: 'polity-7',
    subject_id: 'polity-constitution',
    title: 'Supreme Court and High Courts',
    title_hi: 'सर्वोच्च न्यायालय एवं उच्च न्यायालय: न्यायिक पुनरावलोकन',
    subtitle: 'Integrated Independent Judiciary and Guardian of Fundamental Rights',
    subtitle_hi: 'एकीकृत स्वतंत्र न्यायपालिका एवं मूल अधिकारों की रक्षक',
    estimated_minutes: 15,
    difficulty: 'Intermediate',
    hook: 'India does not have separate federal and state court systems like the USA. Instead, it has a single unified judicial ladder with the Supreme Court at the apex.',
    hook_hi: 'अमेरिका की तरह भारत में राज्यों और केंद्र की अलग-अलग अदालतें नहीं हैं, बल्कि पूरे देश के लिए एक एकीकृत न्यायपालिका है जिसके शीर्ष पर सर्वोच्च न्यायालय है।',
    sections: [
      {
        title: 'Supreme Court: Establishment and Composition',
        title_hi: 'सर्वोच्च न्यायालय: स्थापना एवं संरचना',
        content: 'The Supreme Court of India was inaugurated on 28 January 1950 under Article 124. It currently has an approved strength of 34 judges (1 Chief Justice of India + 33 other judges). Judges are appointed by the President through the Collegium system. A Supreme Court judge holds office until attaining the age of 65 years.',
        content_hi: '28 जनवरी 1950 को अनुच्छेद 124 के तहत भारत के सर्वोच्च न्यायालय का उद्घाटन हुआ। वर्तमान में इसमें मुख्य न्यायाधीश (CJI) सहित कुल 34 न्यायाधीश हैं। न्यायाधीशों की नियुक्ति कॉलेजियम प्रणाली के आधार पर राष्ट्रपति करते हैं। सेवानिवृत्ति आयु 65 वर्ष है।',
        iconType: 'concept'
      },
      {
        title: 'Jurisdiction of the Supreme Court',
        title_hi: 'सर्वोच्च न्यायालय का क्षेत्राधिकार',
        content: 'The Supreme Court has four types of jurisdictions: 1) Original Jurisdiction (Article 131: disputes between Centre and States or between States); 2) Writ Jurisdiction (Article 32: enforcement of Fundamental Rights); 3) Appellate Jurisdiction (Articles 132–134: appeals in civil, criminal, and constitutional matters); 4) Advisory Jurisdiction (Article 143: President can seek opinion of SC on questions of public law or fact).',
        content_hi: 'सर्वोच्च न्यायालय के चार प्रमुख क्षेत्राधिकार हैं: 1) मूल आरंभिक क्षेत्राधिकार (अनु. 131: केंद्र-राज्य विवाद); 2) रिट क्षेत्राधिकार (अनु. 32); 3) अपीलीय क्षेत्राधिकार (अनु. 132-134); 4) सलाहकारी क्षेत्राधिकार (अनु. 143: राष्ट्रपति कानून के प्रश्न पर सुप्रीम कोर्ट से परामर्श मांग सकते हैं)।',
        highlight: 'Article 129: The Supreme Court is a Court of Record and has power to punish for contempt of itself.',
        highlight_hi: 'अनुच्छेद 129: सर्वोच्च न्यायालय एक अभिलेख न्यायालय (Court of Record) है और इसे अपनी अवमानना के लिए दंड देने का अधिकार है।',
        iconType: 'tip'
      },
      {
        title: 'High Courts and Judicial Review',
        title_hi: 'उच्च न्यायालय एवं न्यायिक पुनरावलोकन',
        content: 'Article 214 mandates a High Court for each state (Parliament can establish a common High Court under Article 231). High Court judges retire at age 62. Under Article 226, High Courts possess writ jurisdiction wider than the Supreme Court because they can issue writs not only for Fundamental Rights but also for ordinary legal rights.',
        content_hi: 'अनुच्छेद 214 के तहत प्रत्येक राज्य में एक उच्च न्यायालय होगा। उच्च न्यायालय के न्यायाधीशों की सेवानिवृत्ति आयु 62 वर्ष है। अनुच्छेद 226 के तहत हाईकोर्ट का रिट क्षेत्राधिकार सुप्रीम कोर्ट से भी व्यापक है, क्योंकि यह मौलिक अधिकारों के साथ-साथ अन्य कानूनी अधिकारों के लिए भी रिट जारी कर सकता है।',
        iconType: 'concept'
      }
    ],
    practical_example: {
      scenario: 'A state government passes an unconstitutional bill infringing on the freedom of speech guaranteed under Article 19.',
      scenario_hi: 'कोई राज्य सरकार भाषण की स्वतंत्रता का हनन करने वाला असंवैधानिक कानून बनाती है।',
      analysis: 'Under the power of Judicial Review (Article 13), both the Supreme Court and High Courts can declare the statute ultra vires (null and void).',
      analysis_hi: 'न्यायिक पुनरावलोकन की शक्ति (अनुच्छेद 13) के तहत सुप्रीम कोर्ट या हाईकोर्ट उस कानून को शून्य (null and void) घोषित कर सकते हैं।',
      actionable_tip: 'Judicial review is an indispensable part of the Basic Structure of the Constitution.',
      actionable_tip_hi: 'न्यायिक पुनरावलोकन संविधान के मूल ढांचे (Basic Structure) का अभिन्न अंग है।'
    },
    key_takeaways: [
      'Supreme Court was established under Article 124 on 28 January 1950.',
      'Retirement age: Supreme Court judge is 65 years; High Court judge is 62 years.',
      'Article 143 gives Advisory Jurisdiction to the Supreme Court.',
      'Article 226 grants wider writ powers to High Courts than Article 32.'
    ],
    key_takeaways_hi: [
      '28 जनवरी 1950 को अनुच्छेद 124 के तहत सुप्रीम कोर्ट की स्थापना हुई।',
      'सेवानिवृत्ति आयु: सुप्रीम कोर्ट के जज की 65 वर्ष तथा हाईकोर्ट के जज की 62 वर्ष है।',
      'अनुच्छेद 143 के तहत राष्ट्रपति सुप्रीम कोर्ट से परामर्श ले सकते हैं।',
      'अनुच्छेद 226 के तहत उच्च न्यायालय को विधिक अधिकारों के लिए भी रिट जारी करने की शक्ति है।'
    ]
  },

  // 8. Centre-State Relations and Federalism
  {
    id: 'lesson-polity-8',
    topic_id: 'polity-8',
    subject_id: 'polity-constitution',
    title: 'Centre-State Relations and Federalism',
    title_hi: 'केंद्र-राज्य संबंध एवं भारतीय संघवाद',
    subtitle: 'Legislative, Administrative, and Financial Distribution of Powers',
    subtitle_hi: 'विधायी, प्रशासनिक एवं वित्तीय शक्तियों का विभाजन',
    estimated_minutes: 15,
    difficulty: 'Intermediate',
    hook: 'India is described in Article 1 as a "Union of States". How are powers divided between New Delhi and state capitals, and what happens when national emergencies strike?',
    hook_hi: 'अनुच्छेद 1 में भारत को "राज्यों का संघ" (Union of States) कहा गया है। केंद्र और राज्यों के बीच शक्तियों का बंटवारा कैसे है, और आपातकाल के समय ढांचा कैसे एकात्मक हो जाता है?',
    sections: [
      {
        title: 'Seventh Schedule: Three Legislative Lists',
        title_hi: 'सातवीं अनुसूची: तीन विधायी सूचियां',
        content: 'Article 246 establishes a threefold distribution of legislative subjects in the 7th Schedule: 1) Union List (defense, foreign affairs, currency, railways - 100 subjects); 2) State List (police, public health, agriculture, prisons - 61 subjects); 3) Concurrent List (criminal law, education, forests, marriage - 52 subjects). Residuary powers rest with the Centre under Article 248.',
        content_hi: 'सातवीं अनुसूची (अनुच्छेद 246) में शक्तियों का त्रिस्तरीय विभाजन है: 1) संघ सूची (रक्षा, विदेश, रेलवे, मुद्रा - 100 विषय); 2) राज्य सूची (पुलिस, लोक स्वास्थ्य, कृषि - 61 विषय); 3) समवर्ती सूची (शिक्षा, वन, विवाह - 52 विषय)। अवशिष्ट शक्तियां (Residuary powers) अनुच्छेद 248 के तहत संसद के पास हैं।',
        iconType: 'concept'
      },
      {
        title: 'Emergency Provisions (Part XVIII, Articles 352–360)',
        title_hi: 'आपातकालीन उपबंध (अनुच्छेद 352 से 360)',
        content: 'The Constitution provides for three types of emergencies: 1) National Emergency (Article 352: on grounds of war, external aggression, or armed rebellion); 2) President’s Rule / State Emergency (Article 356: breakdown of constitutional machinery in a state); 3) Financial Emergency (Article 360: threat to financial stability; has NEVER been declared in India).',
        content_hi: 'तीन प्रकार के आपातकाल: 1) राष्ट्रीय आपातकाल (अनुच्छेद 352: युद्ध, बाह्य आक्रमण या सशस्त्र विद्रोह पर); 2) राष्ट्रपति शासन (अनुच्छेद 356: राज्य में संवैधानिक तंत्र की विफलता पर); 3) वित्तीय आपातकाल (अनुच्छेद 360: देश में आज तक कभी नहीं लगा)।',
        highlight: '44th Amendment Act (1978) substituted the vague term "internal disturbance" with "armed rebellion" for invoking Article 352.',
        highlight_hi: '44वें संशोधन (1978) ने अनुच्छेद 352 में "आंतरिक अशांति" के स्थान पर "सशस्त्र विद्रोह" शब्द प्रतिस्थापित किया।',
        iconType: 'tip'
      },
      {
        title: 'Commissions on Centre-State Relations',
        title_hi: 'केंद्र-राज्य संबंधों पर प्रमुख आयोग',
        content: 'To balance fiscal and federal friction, major commissions were instituted: Sarkaria Commission (appointed in 1983, reported in 1988) recommended establishing the Inter-State Council under Article 263 and restraining misuse of Article 356. Later, the Punchhi Commission (2007) suggested further devolution of power and localized emergency provisions.',
        content_hi: 'केंद्र-राज्य संबंधों की समीक्षा के लिए 1983 में सरकारीया आयोग गठित हुआ, जिसने अनुच्छेद 263 के तहत अंतर-राज्य परिषद के गठन और अनुच्छेद 356 के दुरुपयोग को रोकने की सिफारिश की। 2007 में एम.एम. पंछी आयोग का गठन हुआ।',
        iconType: 'concept'
      }
    ],
    practical_example: {
      scenario: 'A conflict arises between a central law and a state law enacted on a subject in the Concurrent List.',
      scenario_hi: 'समवर्ती सूची के किसी विषय पर संसद और राज्य विधानमंडल द्वारा बनाए गए कानूनों में टकराव होता है।',
      analysis: 'Under Article 254, the Central law prevails over the State law, unless the State law received Presidential assent.',
      analysis_hi: 'अनुच्छेद 254 के अनुसार केंद्रीय कानून को प्राथमिकता मिलेगी, जब तक कि राज्य के कानून को राष्ट्रपति की सहमति न मिली हो।',
      actionable_tip: 'Education was shifted from the State List to the Concurrent List by the 42nd Amendment in 1976.',
      actionable_tip_hi: '42वें संशोधन (1976) द्वारा शिक्षा और वन को राज्य सूची से समवर्ती सूची में स्थानांतरित किया गया था।'
    },
    key_takeaways: [
      'Seventh Schedule contains Union List, State List, and Concurrent List.',
      'Residuary legislative powers belong to the Union Parliament (Article 248).',
      'Three emergencies: National (Art 352), President’s Rule (Art 356), Financial (Art 360).',
      'Sarkaria Commission (1983) and Punchhi Commission (2007) examined Centre-State relations.'
    ],
    key_takeaways_hi: [
      'सातवीं अनुसूची में संघ, राज्य और समवर्ती सूचियां हैं।',
      'अवशिष्ट शक्तियां केंद्र की संसद के पास निहित हैं (अनुच्छेद 248)।',
      'तीन प्रकार के आपातकाल: राष्ट्रीय (352), राष्ट्रपति शासन (356), वित्तीय (360)।',
      'सरकारीया आयोग (1983) और पंछी आयोग (2007) केंद्र-राज्य संबंधों के मुख्य आयोग हैं।'
    ]
  },

  // 9. Panchayati Raj and Local Government
  {
    id: 'lesson-polity-9',
    topic_id: 'polity-9',
    subject_id: 'polity-constitution',
    title: 'Panchayati Raj and Local Government',
    title_hi: 'पंचायती राज व्यवस्था एवं स्थानीय स्वशासन',
    subtitle: '73rd and 74th Constitutional Amendments and Grassroots Democracy',
    subtitle_hi: '73वां एवं 74वां संविधान संशोधन: ग्रामीण एवं शहरी स्थानीय स्वशासन',
    estimated_minutes: 15,
    difficulty: 'Intermediate',
    hook: 'Gandhiji believed that India lives in her villages and real swaraj is grassroots democracy. How did village panchayats gain constitutional status in 1992?',
    hook_hi: 'महात्मा गांधी का मानना था कि भारत की आत्मा गांवों में बसती है। ग्राम पंचायतों को 1992 में संवैधानिक दर्जा कैसे प्राप्त हुआ?',
    sections: [
      {
        title: 'Evolution: Balwant Rai Mehta to L.M. Singhvi',
        title_hi: 'पंचायती राज का विकास: प्रमुख समितियां',
        content: 'Balwant Rai Mehta Committee (1957) recommended a 3-tier Panchayati Raj system: Gram Panchayat (village), Panchayat Samiti (block), and Zila Parishad (district). Panchayati Raj was first inaugurated at Nagaur, Rajasthan on 2 October 1959 by Jawaharlal Nehru. Later, Ashok Mehta Committee (1977) proposed a 2-tier model. L.M. Singhvi Committee (1986) famously recommended constitutional recognition for local self-government.',
        content_hi: 'बलवंत राय मेहता समिति (1957) ने त्रिस्तरीय पंचायती राज की सिफारिश की: ग्राम पंचायत (ग्राम स्तर), पंचायत समिति (प्रखंड स्तर), और जिला परिषद (जिला स्तर)। 2 अक्टूबर 1959 को राजस्थान के नागौर में देश की पहली त्रिस्तरीय पंचायत का उद्घाटन हुआ। एल.एम. सिंघवी समिति (1986) ने पंचायतों को संवैधानिक दर्जा देने की सिफारिश की।',
        iconType: 'concept'
      },
      {
        title: '73rd Amendment Act 1992 (Part IX, 11th Schedule)',
        title_hi: '73वां संविधान संशोधन अधिनियम 1992 (भाग IX)',
        content: 'The 73rd Amendment Act (effective 24 April 1993, celebrated as National Panchayati Raj Day) added Part IX (Articles 243 to 243O) and the 11th Schedule containing 29 functional items. It mandates: 3-tier system in states with population over 20 lakh; mandatory Gram Sabha; 5-year tenure; State Election Commission for local polls (243K); State Finance Commission (243I) every 5 years.',
        content_hi: '73वां संशोधन 24 अप्रैल 1993 से लागू हुआ (राष्ट्रीय पंचायती राज दिवस)। इसने संविधान में भाग IX और 11वीं अनुसूची जोड़ी जिसमें 29 विषय हैं। यह 5 वर्ष का कार्यकाल, राज्य चुनाव आयोग (243K) और राज्य वित्त आयोग (243I) का गठन अनिवार्य बनाता है।',
        highlight: 'Article 243D mandates not less than one-third (33%) reservation for women in Panchayats. Bihar became the first state in 2006 to increase it to 50%.',
        highlight_hi: 'अनुच्छेद 243D महिलाओं के लिए कम से कम 33% आरक्षण अनिवार्य करता है। बिहार 2006 में महिलाओं को 50% आरक्षण देने वाला पहला राज्य बना।',
        iconType: 'tip'
      },
      {
        title: '74th Amendment Act 1992 (Municipalities)',
        title_hi: '74वां संविधान संशोधन 1992 (नगरपालिकाएं)',
        content: 'The 74th Amendment Act added Part IX-A (Articles 243P to 243ZG) and the 12th Schedule containing 18 functional items for urban local bodies: Nagar Panchayats (transitional areas), Municipal Councils (smaller urban), and Municipal Corporations (large metropolitan cities).',
        content_hi: '74वें संशोधन ने भाग IX-A और 12वीं अनुसूची जोड़ी जिसमें 18 विषय हैं। इसके तहत तीन प्रकार की शहरी स्थानीय संस्थाएं हैं: नगर पंचायत, नगर परिषद और नगर निगम।',
        iconType: 'concept'
      }
    ],
    practical_example: {
      scenario: 'A BPSC question asks: "On which date is National Panchayati Raj Day celebrated across India?"',
      scenario_hi: 'परीक्षा प्रश्न: "भारत में राष्ट्रीय पंचायती राज दिवस किस तिथि को मनाया जाता है?"',
      analysis: 'April 24th, because the historic 73rd Constitutional Amendment Act came into effect on 24 April 1993.',
      analysis_hi: '24 अप्रैल, क्योंकि इसी दिन 1993 में 73वां संविधान संशोधन प्रभावी हुआ था।',
      actionable_tip: 'The 11th Schedule has 29 subjects for Panchayats, while the 12th Schedule has 18 subjects for Municipalities.',
      actionable_tip_hi: '11वीं अनुसूची में पंचायतों के लिए 29 विषय तथा 12वीं अनुसूची में नगरपालिकाओं के लिए 18 विषय हैं।'
    },
    key_takeaways: [
      'Panchayati Raj was first inaugurated at Nagaur, Rajasthan on 2 October 1959.',
      '73rd Amendment added Part IX and 11th Schedule (29 functional subjects).',
      '74th Amendment added Part IX-A and 12th Schedule (18 functional subjects).',
      'National Panchayati Raj Day is observed every year on 24 April.'
    ],
    key_takeaways_hi: [
      '2 अक्टूबर 1959 को राजस्थान के नागौर में पहली बार पंचायती राज लागू हुआ।',
      '73वें संशोधन से भाग IX और 11वीं अनुसूची (29 विषय) जुड़ी।',
      '74वें संशोधन से भाग IX-A और 12वीं अनुसूची (18 विषय) जुड़ी।',
      'प्रतिवर्ष 24 अप्रैल को राष्ट्रीय पंचायती राज दिवस मनाया जाता है।'
    ]
  },

  // 10. Constitutional Bodies and Important Articles
  {
    id: 'lesson-polity-10',
    topic_id: 'polity-10',
    subject_id: 'polity-constitution',
    title: 'Constitutional Bodies and Important Articles',
    title_hi: 'प्रमुख संवैधानिक निकाय एवं महत्वपूर्ण अनुच्छेद',
    subtitle: 'ECI, UPSC, CAG, Finance Commission, and Key Amendments',
    subtitle_hi: 'चुनाव आयोग, संघ लोक सेवा आयोग, कैग, वित्त आयोग एवं मुख्य संशोधन',
    estimated_minutes: 15,
    difficulty: 'Advanced',
    hook: 'What makes an institution "constitutional" rather than "statutory"? Constitutional bodies derive their existence, powers, and independence directly from specific articles of the Constitution.',
    hook_hi: 'संवैधानिक निकाय (Constitutional Bodies) और वैधानिक निकाय (Statutory Bodies) में क्या अंतर है? संवैधानिक निकायों की शक्तियां सीधे संविधान के अनुच्छेदों से प्राप्त होती हैं।',
    sections: [
      {
        title: 'Election Commission and UPSC',
        title_hi: 'भारत निर्वाचन आयोग एवं संघ लोक सेवा आयोग',
        content: 'Election Commission of India (Article 324): Conducts free and fair elections to Parliament, State Legislatures, and offices of President and Vice-President. Comprises a Chief Election Commissioner and other ECs appointed by the President. Union Public Service Commission (Articles 315–323): The central recruiting agency of India. Members serve for a term of 6 years or until age 65.',
        content_hi: 'भारत निर्वाचन आयोग (अनुच्छेद 324): संसद, राज्य विधानमंडलों, राष्ट्रपति एवं उपराष्ट्रपति के चुनावों का संचालन करता है। संघ लोक सेवा आयोग (अनुच्छेद 315-323): केंद्रीय भर्ती अभिकरण है। सदस्यों का कार्यकाल 6 वर्ष या 65 वर्ष की आयु तक होता है।',
        iconType: 'concept'
      },
      {
        title: 'Comptroller and Auditor General (CAG) and Finance Commission',
        title_hi: 'नियंत्रक एवं महालेखा परीक्षक (CAG) तथा वित्त आयोग',
        content: 'CAG of India (Article 148): Termed by Dr. Ambedkar as the "most important officer under the Constitution of India". The CAG audits all receipts and expenditures of the Union and State governments and acts as the guardian of the public purse. Finance Commission (Article 280): Constituted by the President every 5 years to recommend the distribution of tax revenues between the Union and the States.',
        content_hi: 'नियंत्रक एवं महालेखा परीक्षक (अनुच्छेद 148): डॉ. अंबेडकर ने इन्हें संविधान का सबसे महत्वपूर्ण अधिकारी कहा। यह सार्वजनिक धन के संरक्षक (Guardian of Public Purse) हैं। वित्त आयोग (अनुच्छेद 280): प्रत्येक 5 वर्ष में राष्ट्रपति द्वारा केंद्र और राज्यों के बीच करों के बंटवारे की सिफारिश हेतु गठित होता है।',
        highlight: 'Attorney General for India (Article 76): The highest law officer of the country, appointed by the President, with the right to speak in both Houses of Parliament.',
        highlight_hi: 'भारत का महान्यायवादी (अनुच्छेद 76): देश का सर्वोच्च विधि अधिकारी, जिसे संसद के दोनों सदनों में बोलने का अधिकार है (परंतु मतदान का नहीं)।',
        iconType: 'tip'
      },
      {
        title: 'Landmark Constitutional Amendments',
        title_hi: 'ऐतिहासिक संविधान संशोधन',
        content: '42nd Amendment 1976: "Mini Constitution", added Fundamental Duties, 3 words in Preamble; 44th Amendment 1978: Restored civil liberties, removed Right to Property from Fundamental Rights; 52nd Amendment 1985: Anti-Defection Law (10th Schedule); 61st Amendment 1988: Lowered voting age from 21 to 18; 101st Amendment 2016: Goods and Services Tax (GST); 103rd Amendment 2019: 10% EWS reservation.',
        content_hi: '42वां संशोधन 1976: "लघु संविधान", प्रस्तावना में संशोधन, मौलिक कर्तव्य; 44वां संशोधन 1978: संपत्ति का अधिकार हटाया; 52वां संशोधन 1985: दल-बदल विरोधी कानून (10वीं अनुसूची); 61वां संशोधन 1988: मतदान आयु 21 से घटाकर 18 वर्ष; 101वां संशोधन 2016: जीएसटी (GST); 103वां संशोधन 2019: ईडब्ल्यूएस (EWS) आरक्षण।',
        iconType: 'concept'
      }
    ],
    practical_example: {
      scenario: 'A BPSC candidate is asked to identify the Constitutional Article under which the Finance Commission is constituted.',
      scenario_hi: 'परीक्षा प्रश्न: "संविधान के किस अनुच्छेद के तहत वित्त आयोग का गठन किया जाता है?"',
      analysis: 'Article 280 of the Constitution empowers the President to constitute a Finance Commission every 5 years.',
      analysis_hi: 'अनुच्छेद 280 के तहत राष्ट्रपति प्रत्येक 5 वर्ष पर वित्त आयोग गठित करते हैं।',
      actionable_tip: 'NITI Aayog is a non-constitutional, extra-constitutional think tank, whereas the Finance Commission is a constitutional body.',
      actionable_tip_hi: 'नीति आयोग एक गैर-संवैधानिक परामर्शदात्री संस्था है, जबकि वित्त आयोग एक संवैधानिक निकाय है।'
    },
    key_takeaways: [
      'Article 324: Election Commission of India.',
      'Article 148: Comptroller and Auditor General (CAG).',
      'Article 280: Finance Commission constituted every 5 years.',
      '61st Amendment (1988) reduced the voting age from 21 to 18 years.'
    ],
    key_takeaways_hi: [
      'अनुच्छेद 324: भारत का निर्वाचन आयोग।',
      'अनुच्छेद 148: नियंत्रक एवं महालेखा परीक्षक (CAG)।',
      'अनुच्छेद 280: प्रत्येक 5 वर्ष में वित्त आयोग का गठन।',
      '61वें संशोधन (1988) द्वारा मतदान की आयु 21 से घटाकर 18 वर्ष की गई।'
    ]
  }
];

export const POLITY_QUESTIONS: Question[] = [
  // Lesson 1 (polity-1) Questions
  {
    id: 'q-polity-1-1',
    lesson_id: 'lesson-polity-1',
    subject_id: 'polity-constitution',
    question: 'Who was elected as the temporary President of the Constituent Assembly on 9 December 1946?',
    question_hi: '9 दिसंबर 1946 को संविधान सभा का अस्थायी अध्यक्ष किसे चुना गया था?',
    option_a: 'Dr. Rajendra Prasad',
    option_a_hi: 'डॉ. राजेंद्र प्रसाद',
    option_b: 'Dr. Sachchidananda Sinha',
    option_b_hi: 'डॉ. सच्चिदानंद सिन्हा',
    option_c: 'Dr. B.R. Ambedkar',
    option_c_hi: 'डॉ. बी.आर. अंबेडकर',
    option_d: 'Jawaharlal Nehru',
    option_d_hi: 'जवाहरलाल नेहरू',
    correct_answer: 'B',
    explanation: 'Dr. Sachchidananda Sinha was elected temporary President following the French practice of honoring the oldest member.',
    explanation_hi: 'वरिष्ठतम सदस्य होने के कारण बिहार के डॉ. सच्चिदानंद सिन्हा को प्रथम बैठक का अस्थायी अध्यक्ष चुना गया।'
  },
  {
    id: 'q-polity-1-2',
    lesson_id: 'lesson-polity-1',
    subject_id: 'polity-constitution',
    question: 'Who moved the historic "Objectives Resolution" in the Constituent Assembly on 13 December 1946?',
    question_hi: '13 दिसंबर 1946 को संविधान सभा में ऐतिहासिक "उद्देश्य प्रस्ताव" किसने पेश किया था?',
    option_a: 'Jawaharlal Nehru',
    option_a_hi: 'जवाहरलाल नेहरू',
    option_b: 'Sardar Vallabhbhai Patel',
    option_b_hi: 'सरदार वल्लभभाई पटेल',
    option_c: 'Dr. B.R. Ambedkar',
    option_c_hi: 'डॉ. बी.आर. अंबेडकर',
    option_d: 'K.M. Munshi',
    option_d_hi: 'के.एम. मुंशी',
    correct_answer: 'A',
    explanation: 'Jawaharlal Nehru moved the Objectives Resolution, which later formed the basis of the Preamble.',
    explanation_hi: 'पं. जवाहरलाल नेहरू ने उद्देश्य प्रस्ताव पेश किया जो बाद में संविधान की प्रस्तावना बना।'
  },
  {
    id: 'q-polity-1-3',
    lesson_id: 'lesson-polity-1',
    subject_id: 'polity-constitution',
    question: 'How long did the Constituent Assembly take to complete the drafting of the Indian Constitution?',
    question_hi: 'संविधान सभा को संविधान निर्माण में कुल कितना समय लगा?',
    option_a: '2 years, 11 months, 18 days',
    option_a_hi: '2 वर्ष, 11 माह, 18 दिन',
    option_b: '3 years, 2 months, 12 days',
    option_b_hi: '3 वर्ष, 2 माह, 12 दिन',
    option_c: '1 year, 10 months, 20 days',
    option_c_hi: '1 वर्ष, 10 माह, 20 दिन',
    option_d: '2 years, 6 months, 15 days',
    option_d_hi: '2 वर्ष, 6 माह, 15 दिन',
    correct_answer: 'A',
    explanation: 'The Constituent Assembly took exactly 2 years, 11 months, and 18 days to draft the Constitution.',
    explanation_hi: 'संविधान बनाने में कुल 2 वर्ष, 11 माह और 18 दिन का समय लगा।'
  },
  {
    id: 'q-polity-1-4',
    lesson_id: 'lesson-polity-1',
    subject_id: 'polity-constitution',
    question: 'Who served as the Constitutional Advisor to the Constituent Assembly?',
    question_hi: 'संविधान सभा के संवैधानिक सलाहकार (Constitutional Advisor) कौन थे?',
    option_a: 'Sir B.N. Rau',
    option_a_hi: 'सर बी.एन. राव',
    option_b: 'Dr. B.R. Ambedkar',
    option_b_hi: 'डॉ. बी.आर. अंबेडकर',
    option_c: 'Alladi Krishnaswamy Iyer',
    option_c_hi: 'अल्लादि कृष्णास्वामी अय्यर',
    option_d: 'H.V.R. Iengar',
    option_d_hi: 'एच.वी.आर. आयंगर',
    correct_answer: 'A',
    explanation: 'Sir Benegal Narsing Rau (B.N. Rau) was appointed as the Constitutional Advisor to the Assembly.',
    explanation_hi: 'सर बी.एन. राव संविधान सभा के संवैधानिक सलाहकार थे जिन्होंने प्रारंभिक प्रारूप तैयार किया था।'
  },
  {
    id: 'q-polity-1-5',
    lesson_id: 'lesson-polity-1',
    subject_id: 'polity-constitution',
    question: 'On which date was the Constitution of India adopted and enacted by the Constituent Assembly?',
    question_hi: 'संविधान सभा द्वारा भारतीय संविधान को किस तिथि को अंगीकृत एवं अधिनियमित किया गया?',
    option_a: '15 August 1947',
    option_a_hi: '15 अगस्त 1947',
    option_b: '26 November 1949',
    option_b_hi: '26 नवंबर 1949',
    option_c: '26 January 1950',
    option_c_hi: '26 जनवरी 1950',
    option_d: '24 January 1950',
    option_d_hi: '24 जनवरी 1950',
    correct_answer: 'B',
    explanation: 'The Constitution was adopted on 26 November 1949 (Constitution Day) and came into full effect on 26 January 1950.',
    explanation_hi: '26 नवंबर 1949 को संविधान अंगीकृत हुआ, इसलिए इसे संविधान दिवस के रूप में मनाया जाता है।'
  },

  // Lesson 2 (polity-2) Questions
  {
    id: 'q-polity-2-1',
    lesson_id: 'lesson-polity-2',
    subject_id: 'polity-constitution',
    question: 'Which constitutional amendment added the words "Socialist", "Secular", and "Integrity" to the Preamble?',
    question_hi: 'किस संविधान संशोधन द्वारा प्रस्तावना में "समाजवादी", "पंथनिरपेक्ष" और "अखंडता" शब्द जोड़े गए?',
    option_a: '42nd Amendment Act, 1976',
    option_a_hi: '42वां संविधान संशोधन, 1976',
    option_b: '44th Amendment Act, 1978',
    option_b_hi: '44वां संविधान संशोधन, 1978',
    option_c: '52nd Amendment Act, 1985',
    option_c_hi: '52वां संविधान संशोधन, 1985',
    option_d: '86th Amendment Act, 2002',
    option_d_hi: '86वां संविधान संशोधन, 2002',
    correct_answer: 'A',
    explanation: 'The 42nd Amendment (1976) amended the Preamble for the first and only time.',
    explanation_hi: '42वें संशोधन (1976) द्वारा प्रस्तावना में ये तीन शब्द जोड़े गए थे।'
  },
  {
    id: 'q-polity-2-2',
    lesson_id: 'lesson-polity-2',
    subject_id: 'polity-constitution',
    question: 'In which landmark case did the Supreme Court rule that the Preamble is an integral part of the Constitution and can be amended under Article 368?',
    question_hi: 'किस ऐतिहासिक मामले में सुप्रीम कोर्ट ने फैसला दिया कि प्रस्तावना संविधान का अभिन्न अंग है?',
    option_a: 'Berubari Union case (1960)',
    option_a_hi: 'बेरुबारी संघ मामला (1960)',
    option_b: 'Kesavananda Bharati case (1973)',
    option_b_hi: 'केशवानंद भारती मामला (1973)',
    option_c: 'Golaknath case (1967)',
    option_c_hi: 'गोलकनाथ मामला (1967)',
    option_d: 'Minerva Mills case (1980)',
    option_d_hi: 'मिनर्वा मिल्स मामला (1980)',
    correct_answer: 'B',
    explanation: 'The 13-judge bench in Kesavananda Bharati (1973) held that the Preamble is an integral part of the Constitution.',
    explanation_hi: 'केशवानंद भारती वाद (1973) में सर्वोच्च न्यायालय ने माना कि प्रस्तावना संविधान का अभिन्न अंग है।'
  },
  {
    id: 'q-polity-2-3',
    lesson_id: 'lesson-polity-2',
    subject_id: 'polity-constitution',
    question: 'From which country’s constitution was the concept of Directive Principles of State Policy (DPSP) borrowed?',
    question_hi: 'राज्य के नीति निदेशक तत्व (DPSP) किस देश के संविधान से लिए गए हैं?',
    option_a: 'USA',
    option_a_hi: 'संयुक्त राज्य अमेरिका',
    option_b: 'Ireland',
    option_b_hi: 'आयरलैंड',
    option_c: 'United Kingdom',
    option_c_hi: 'ब्रिटेन',
    option_d: 'Canada',
    option_d_hi: 'कनाडा',
    correct_answer: 'B',
    explanation: 'DPSPs were borrowed from the Irish Constitution (which had borrowed them from Spain).',
    explanation_hi: 'नीति निदेशक तत्व आयरलैंड के संविधान से प्रेरित होकर भारतीय संविधान में शामिल किए गए।'
  },
  {
    id: 'q-polity-2-4',
    lesson_id: 'lesson-polity-2',
    subject_id: 'polity-constitution',
    question: 'How many types of Justice are promised to citizens in the Preamble of the Indian Constitution?',
    question_hi: 'भारतीय संविधान की प्रस्तावना में नागरिकों के लिए कितने प्रकार के न्याय का उल्लेख है?',
    option_a: 'Two (Social and Economic)',
    option_a_hi: 'दो (सामाजिक और आर्थिक)',
    option_b: 'Three (Social, Economic, and Political)',
    option_b_hi: 'तीन (सामाजिक, आर्थिक और राजनीतिक)',
    option_c: 'Four',
    option_c_hi: 'चार',
    option_d: 'Five',
    option_d_hi: 'पाँच',
    correct_answer: 'B',
    explanation: 'The Preamble guarantees three types of Justice: Social, Economic, and Political.',
    explanation_hi: 'प्रस्तावना में तीन प्रकार के न्याय की बात कही गई है: सामाजिक, आर्थिक और राजनीतिक न्याय।'
  },
  {
    id: 'q-polity-2-5',
    lesson_id: 'lesson-polity-2',
    subject_id: 'polity-constitution',
    question: 'The concept of "Concurrent List" in the Indian Constitution was adopted from which country?',
    question_hi: 'भारतीय संविधान में "समवर्ती सूची" की अवधारणा किस देश के संविधान से ली गई है?',
    option_a: 'Australia',
    option_a_hi: 'ऑस्ट्रेलिया',
    option_b: 'South Africa',
    option_b_hi: 'दक्षिण अफ्रीका',
    option_c: 'Soviet Union (USSR)',
    option_c_hi: 'सोवियत संघ (रूस)',
    option_d: 'France',
    option_d_hi: 'फ्रांस',
    correct_answer: 'A',
    explanation: 'The Concurrent List and freedom of trade/commerce were borrowed from the Australian Constitution.',
    explanation_hi: 'समवर्ती सूची और संसद के दोनों सदनों की संयुक्त बैठक का प्रावधान ऑस्ट्रेलिया से लिया गया है।'
  },

  // Lesson 3 (polity-3) Questions
  {
    id: 'q-polity-3-1',
    lesson_id: 'lesson-polity-3',
    subject_id: 'polity-constitution',
    question: 'Which Fundamental Right was removed from Part III by the 44th Constitutional Amendment Act in 1978?',
    question_hi: '44वें संविधान संशोधन (1978) द्वारा किस अधिकार को मौलिक अधिकारों की सूची से हटाया गया?',
    option_a: 'Right to Equality',
    option_a_hi: 'समानता का अधिकार',
    option_b: 'Right to Property',
    option_b_hi: 'संपत्ति का अधिकार',
    option_c: 'Right to Freedom of Speech',
    option_c_hi: 'भाषण की स्वतंत्रता का अधिकार',
    option_d: 'Right against Exploitation',
    option_d_hi: 'शोषण के विरुद्ध अधिकार',
    correct_answer: 'B',
    explanation: 'The Right to Property was made a legal right under Article 300A by the 44th Amendment in 1978.',
    explanation_hi: 'संपत्ति के अधिकार को मौलिक अधिकार से हटाकर अनुच्छेद 300A के तहत कानूनी अधिकार बनाया गया।'
  },
  {
    id: 'q-polity-3-2',
    lesson_id: 'lesson-polity-3',
    subject_id: 'polity-constitution',
    question: 'Which Article of the Indian Constitution was termed the "Heart and Soul of the Constitution" by Dr. B.R. Ambedkar?',
    question_hi: 'डॉ. बी.आर. अंबेडकर ने किस अनुच्छेद को "संविधान का हृदय और आत्मा" कहा था?',
    option_a: 'Article 14',
    option_a_hi: 'अनुच्छेद 14',
    option_b: 'Article 19',
    option_b_hi: 'अनुच्छेद 19',
    option_c: 'Article 21',
    option_c_hi: 'अनुच्छेद 21',
    option_d: 'Article 32',
    option_d_hi: 'अनुच्छेद 32',
    correct_answer: 'D',
    explanation: 'Article 32 (Right to Constitutional Remedies) was hailed by Ambedkar as the heart and soul because it provides remedies for violations of rights.',
    explanation_hi: 'अनुच्छेद 32 (संवैधानिक उपचारों का अधिकार) को अंबेडकर ने संविधान की आत्मा कहा।'
  },
  {
    id: 'q-polity-3-3',
    lesson_id: 'lesson-polity-3',
    subject_id: 'polity-constitution',
    question: 'Which constitutional amendment inserted Article 21A, making education a Fundamental Right for children aged 6 to 14?',
    question_hi: 'किस संविधान संशोधन द्वारा अनुच्छेद 21A जोड़कर 6 से 14 वर्ष के बच्चों के लिए शिक्षा को मौलिक अधिकार बनाया गया?',
    option_a: '42nd Amendment, 1976',
    option_a_hi: '42वां संशोधन, 1976',
    option_b: '73rd Amendment, 1992',
    option_b_hi: '73वां संशोधन, 1992',
    option_c: '86th Amendment, 2002',
    option_c_hi: '86वां संशोधन, 2002',
    option_d: '91st Amendment, 2003',
    option_d_hi: '91वां संशोधन, 2003',
    correct_answer: 'C',
    explanation: 'The 86th Constitutional Amendment Act, 2002 inserted Article 21A.',
    explanation_hi: '86वें संविधान संशोधन 2002 द्वारा अनुच्छेद 21A को मौलिक अधिकार के रूप में जोड़ा गया।'
  },
  {
    id: 'q-polity-3-4',
    lesson_id: 'lesson-polity-3',
    subject_id: 'polity-constitution',
    question: 'Which writ is issued by the courts to secure the release of a person unlawfully detained by authorities or private individuals?',
    question_hi: 'गैरकानूनी रूप से हिरासत में लिए गए व्यक्ति को मुक्त कराने के लिए न्यायालय कौन सी रिट जारी करता है?',
    option_a: 'Mandamus',
    option_a_hi: 'परमादेश (Mandamus)',
    option_b: 'Habeas Corpus',
    option_b_hi: 'बंदी प्रत्यक्षीकरण (Habeas Corpus)',
    option_c: 'Quo-Warranto',
    option_c_hi: 'अधिकार पृच्छा (Quo-Warranto)',
    option_d: 'Certiorari',
    option_d_hi: 'उत्प्रेषण (Certiorari)',
    correct_answer: 'B',
    explanation: 'Habeas Corpus literally means "to have the body" and protects individuals against illegal confinement.',
    explanation_hi: 'बंदी प्रत्यक्षीकरण (Habeas Corpus) रिट अवैध रूप से बंदी बनाए गए व्यक्ति की रिहाई के लिए जारी की जाती है।'
  },
  {
    id: 'q-polity-3-5',
    lesson_id: 'lesson-polity-3',
    subject_id: 'polity-constitution',
    question: 'Which two Fundamental Rights cannot be suspended even during the proclamation of a National Emergency under Article 352?',
    question_hi: 'राष्ट्रीय आपातकाल के दौरान भी कौन से दो मौलिक अधिकार निलंबित नहीं किए जा सकते?',
    option_a: 'Articles 14 and 19',
    option_a_hi: 'अनुच्छेद 14 और 19',
    option_b: 'Articles 20 and 21',
    option_b_hi: 'अनुच्छेद 20 और 21',
    option_c: 'Articles 21 and 22',
    option_c_hi: 'अनुच्छेद 21 और 22',
    option_d: 'Articles 19 and 21',
    option_d_hi: 'अनुच्छेद 19 और 21',
    correct_answer: 'B',
    explanation: 'By virtue of the 44th Amendment Act (1978), Articles 20 and 21 remain inviolable even during National Emergency.',
    explanation_hi: '44वें संशोधन (1978) के अनुसार आपातकाल में भी अनुच्छेद 20 और 21 निलंबित नहीं हो सकते।'
  },

  // Lesson 4 (polity-4) Questions
  {
    id: 'q-polity-4-1',
    lesson_id: 'lesson-polity-4',
    subject_id: 'polity-constitution',
    question: 'Which Article of the Indian Constitution directs the State to organize Village Panchayats as units of self-government?',
    question_hi: 'संविधान का कौन सा अनुच्छेद राज्य को ग्राम पंचायतों के गठन का निर्देश देता है?',
    option_a: 'Article 38',
    option_a_hi: 'अनुच्छेद 38',
    option_b: 'Article 40',
    option_b_hi: 'अनुच्छेद 40',
    option_c: 'Article 44',
    option_c_hi: 'अनुच्छेद 44',
    option_d: 'Article 48',
    option_d_hi: 'अनुच्छेद 48',
    correct_answer: 'B',
    explanation: 'Article 40 reflects Gandhian philosophy, directing the state to establish village panchayats.',
    explanation_hi: 'अनुच्छेद 40 गांधीवादी सिद्धांत पर आधारित है जो ग्राम पंचायतों के गठन का निर्देश देता है।'
  },
  {
    id: 'q-polity-4-2',
    lesson_id: 'lesson-polity-4',
    subject_id: 'polity-constitution',
    question: 'Which Article deals with the provision of a Uniform Civil Code (UCC) for citizens throughout India?',
    question_hi: 'नागरिकों के लिए "समान नागरिक संहिता" (UCC) का प्रावधान किस अनुच्छेद में है?',
    option_a: 'Article 42',
    option_a_hi: 'अनुच्छेद 42',
    option_b: 'Article 44',
    option_b_hi: 'अनुच्छेद 44',
    option_c: 'Article 46',
    option_c_hi: 'अनुच्छेद 46',
    option_d: 'Article 50',
    option_d_hi: 'अनुच्छेद 50',
    correct_answer: 'B',
    explanation: 'Article 44 states that the State shall endeavor to secure a Uniform Civil Code for citizens across India.',
    explanation_hi: 'अनुच्छेद 44 में समस्त देश में समान नागरिक संहिता लागू करने का प्रयास करने का निर्देश है।'
  },
  {
    id: 'q-polity-4-3',
    lesson_id: 'lesson-polity-4',
    subject_id: 'polity-constitution',
    question: 'Which committee recommended the inclusion of Fundamental Duties in the Constitution in 1976?',
    question_hi: '1976 में संविधान में मौलिक कर्तव्यों को शामिल करने की सिफारिश किस समिति ने की थी?',
    option_a: 'Sarkaria Commission',
    option_a_hi: 'सरकारीया आयोग',
    option_b: 'Sardar Swaran Singh Committee',
    option_b_hi: 'सरदार स्वर्ण सिंह समिति',
    option_c: 'Balwant Rai Mehta Committee',
    option_c_hi: 'बलवंत राय मेहता समिति',
    option_d: 'Verma Committee',
    option_d_hi: 'वर्मा समिति',
    correct_answer: 'B',
    explanation: 'The Sardar Swaran Singh Committee recommended incorporating Fundamental Duties.',
    explanation_hi: 'सरदार स्वर्ण सिंह समिति की सिफारिश पर 42वें संशोधन द्वारा मौलिक कर्तव्य जोड़े गए।'
  },
  {
    id: 'q-polity-4-4',
    lesson_id: 'lesson-polity-4',
    subject_id: 'polity-constitution',
    question: 'How many Fundamental Duties are currently enshrined in Article 51A of the Indian Constitution?',
    question_hi: 'वर्तमान में भारतीय संविधान के अनुच्छेद 51A में कुल कितने मौलिक कर्तव्य हैं?',
    option_a: '8',
    option_a_hi: '8',
    option_b: '10',
    option_b_hi: '10',
    option_c: '11',
    option_c_hi: '11',
    option_d: '12',
    option_d_hi: '12',
    correct_answer: 'C',
    explanation: 'There are 11 duties (originally 10 were added in 1976; the 11th was added by the 86th Amendment in 2002).',
    explanation_hi: 'वर्तमान में 11 मौलिक कर्तव्य हैं। 11वां कर्तव्य 86वें संशोधन (2002) द्वारा जोड़ा गया था।'
  },
  {
    id: 'q-polity-4-5',
    lesson_id: 'lesson-polity-4',
    subject_id: 'polity-constitution',
    question: 'Article 50 of the Constitution provides for which of the following separations?',
    question_hi: 'संविधान का अनुच्छेद 50 निम्नलिखित में से किसके पृथक्करण का प्रावधान करता है?',
    option_a: 'Separation of Legislature from Judiciary',
    option_a_hi: 'विधायिका से न्यायपालिका का पृथक्करण',
    option_b: 'Separation of Judiciary from Executive',
    option_b_hi: 'कार्यपालिका से न्यायपालिका का पृथक्करण',
    option_c: 'Separation of Centre from State',
    option_c_hi: 'केंद्र से राज्य का पृथक्करण',
    option_d: 'Separation of Civil law from Criminal law',
    option_d_hi: 'दीवानी से फौजदारी कानून का पृथक्करण',
    correct_answer: 'B',
    explanation: 'Article 50 mandates the separation of the Judiciary from the Executive in public services of the State.',
    explanation_hi: 'अनुच्छेद 50 राज्य की लोक सेवाओं में कार्यपालिका से न्यायपालिका को अलग करने का निर्देश देता है।'
  },

  // Lesson 5 (polity-5) Questions
  {
    id: 'q-polity-5-1',
    lesson_id: 'lesson-polity-5',
    subject_id: 'polity-constitution',
    question: 'Who among the following does NOT vote in the election of the President of India?',
    question_hi: 'भारत के राष्ट्रपति के चुनाव में निम्नलिखित में से कौन मतदान नहीं करता है?',
    option_a: 'Elected members of Lok Sabha',
    option_a_hi: 'लोकसभा के निर्वाचित सदस्य',
    option_b: 'Elected members of State Legislative Assemblies',
    option_b_hi: 'राज्य विधानसभाओं के निर्वाचित सदस्य',
    option_c: 'Nominated members of Rajya Sabha',
    option_c_hi: 'राज्यसभा के मनोनीत सदस्य',
    option_d: 'Elected members of Delhi Legislative Assembly',
    option_d_hi: 'दिल्ली विधानसभा के निर्वाचित सदस्य',
    correct_answer: 'C',
    explanation: 'Nominated members of Parliament do not vote in presidential elections.',
    explanation_hi: 'संसद के मनोनीत सदस्य राष्ट्रपति के चुनाव में भाग नहीं लेते हैं।'
  },
  {
    id: 'q-polity-5-2',
    lesson_id: 'lesson-polity-5',
    subject_id: 'polity-constitution',
    question: 'Under which Article can the President of India be impeached for violation of the Constitution?',
    question_hi: 'संविधान के किस अनुच्छेद के तहत राष्ट्रपति पर महाभियोग चलाया जा सकता है?',
    option_a: 'Article 54',
    option_a_hi: 'अनुच्छेद 54',
    option_b: 'Article 61',
    option_b_hi: 'अनुच्छेद 61',
    option_c: 'Article 72',
    option_c_hi: 'अनुच्छेद 72',
    option_d: 'Article 123',
    option_d_hi: 'अनुच्छेद 123',
    correct_answer: 'B',
    explanation: 'Article 61 prescribes the procedure for the impeachment of the President.',
    explanation_hi: 'अनुच्छेद 61 में राष्ट्रपति पर महाभियोग (Impeachment) की प्रक्रिया का वर्णन है।'
  },
  {
    id: 'q-polity-5-3',
    lesson_id: 'lesson-polity-5',
    subject_id: 'polity-constitution',
    question: 'Under which Article is the President empowered to promulgate Ordinances during the recess of Parliament?',
    question_hi: 'संसद के सत्रावसान की अवधि में राष्ट्रपति किस अनुच्छेद के तहत अध्यादेश जारी कर सकते हैं?',
    option_a: 'Article 110',
    option_a_hi: 'अनुच्छेद 110',
    option_b: 'Article 123',
    option_b_hi: 'अनुच्छेद 123',
    option_c: 'Article 143',
    option_c_hi: 'अनुच्छेद 143',
    option_d: 'Article 213',
    option_d_hi: 'अनुच्छेद 213',
    correct_answer: 'B',
    explanation: 'Article 123 empowers the President to promulgate ordinances. (Article 213 empowers Governors).',
    explanation_hi: 'अनुच्छेद 123 राष्ट्रपति को अध्यादेश जारी करने की शक्ति देता है (राज्यपाल के लिए अनुच्छेद 213 है)।'
  },
  {
    id: 'q-polity-5-4',
    lesson_id: 'lesson-polity-5',
    subject_id: 'polity-constitution',
    question: 'Who is the Ex-officio Chairman of the Rajya Sabha (Council of States)?',
    question_hi: 'राज्यसभा का पदेन सभापति (Ex-officio Chairman) कौन होता है?',
    option_a: 'President of India',
    option_a_hi: 'भारत का राष्ट्रपति',
    option_b: 'Vice-President of India',
    option_b_hi: 'भारत का उपराष्ट्रपति',
    option_c: 'Prime Minister',
    option_c_hi: 'प्रधानमंत्री',
    option_d: 'Speaker of Lok Sabha',
    option_d_hi: 'लोकसभा अध्यक्ष',
    correct_answer: 'B',
    explanation: 'Under Article 64, the Vice-President is the Ex-officio Chairman of the Rajya Sabha.',
    explanation_hi: 'अनुच्छेद 64 के अनुसार भारत का उपराष्ट्रपति राज्यसभा का पदेन सभापति होता है।'
  },
  {
    id: 'q-polity-5-5',
    lesson_id: 'lesson-polity-5',
    subject_id: 'polity-constitution',
    question: 'To which body is the Union Council of Ministers collectively responsible under Article 75(3)?',
    question_hi: 'अनुच्छेद 75(3) के तहत केंद्रीय मंत्रिपरिषद सामूहिक रूप से किसके प्रति उत्तरदायी होती है?',
    option_a: 'The President',
    option_a_hi: 'राष्ट्रपति के प्रति',
    option_b: 'The Parliament as a whole',
    option_b_hi: 'संसद के प्रति',
    option_c: 'The House of the People (Lok Sabha)',
    option_c_hi: 'लोकसभा के प्रति',
    option_d: 'The Supreme Court',
    option_d_hi: 'सर्वोच्च न्यायालय के प्रति',
    correct_answer: 'C',
    explanation: 'Under Article 75(3), the Council of Ministers is collectively responsible to the Lok Sabha.',
    explanation_hi: 'मंत्रिपरिषद सामूहिक रूप से लोकसभा के प्रति उत्तरदायी होती है।'
  },

  // Lesson 6 (polity-6) Questions
  {
    id: 'q-polity-6-1',
    lesson_id: 'lesson-polity-6',
    subject_id: 'polity-constitution',
    question: 'Who decides whether a particular bill is a Money Bill or not under Article 110?',
    question_hi: 'अनुच्छेद 110 के तहत यह निर्णय कौन करता है कि कोई विधेयक "धन विधेयक" है या नहीं?',
    option_a: 'The President of India',
    option_a_hi: 'भारत के राष्ट्रपति',
    option_b: 'The Speaker of Lok Sabha',
    option_b_hi: 'लोकसभा के अध्यक्ष',
    option_c: 'The Finance Minister',
    option_c_hi: 'वित्त मंत्री',
    option_d: 'The Chairman of Rajya Sabha',
    option_d_hi: 'राज्यसभा के सभापति',
    correct_answer: 'B',
    explanation: 'The decision of the Speaker of Lok Sabha on whether a bill is a Money Bill is final.',
    explanation_hi: 'कोई विधेयक धन विधेयक है या नहीं, इसका अंतिम निर्णय लोकसभा अध्यक्ष करते हैं।'
  },
  {
    id: 'q-polity-6-2',
    lesson_id: 'lesson-polity-6',
    subject_id: 'polity-constitution',
    question: 'How many days can the Rajya Sabha withhold or delay a Money Bill passed by the Lok Sabha?',
    question_hi: 'राज्यसभा लोकसभा द्वारा पारित धन विधेयक को अधिकतम कितने दिनों तक रोक सकती है?',
    option_a: '14 days',
    option_a_hi: '14 दिन',
    option_b: '30 days',
    option_b_hi: '30 दिन',
    option_c: '3 months',
    option_c_hi: '3 महीने',
    option_d: '6 months',
    option_d_hi: '6 महीने',
    correct_answer: 'A',
    explanation: 'The Rajya Sabha must return a Money Bill within 14 days, with or without recommendations.',
    explanation_hi: 'राज्यसभा धन विधेयक को केवल 14 दिन तक रोक सकती है, इसके बाद वह स्वतः पारित मान लिया जाता है।'
  },
  {
    id: 'q-polity-6-3',
    lesson_id: 'lesson-polity-6',
    subject_id: 'polity-constitution',
    question: 'Who presides over a Joint Sitting of both Houses of Parliament summoned under Article 108?',
    question_hi: 'अनुच्छेद 108 के तहत बुलाई गई संसद के दोनों सदनों की संयुक्त बैठक की अध्यक्षता कौन करता है?',
    option_a: 'Chairman of Rajya Sabha',
    option_a_hi: 'राज्यसभा के सभापति',
    option_b: 'Speaker of Lok Sabha',
    option_b_hi: 'लोकसभा के अध्यक्ष',
    option_c: 'President of India',
    option_c_hi: 'भारत के राष्ट्रपति',
    option_d: 'Prime Minister of India',
    option_d_hi: 'भारत के प्रधानमंत्री',
    correct_answer: 'B',
    explanation: 'The Speaker of Lok Sabha presides over a Joint Sitting under Article 118(4).',
    explanation_hi: 'संयुक्त बैठक की अध्यक्षता लोकसभा अध्यक्ष करते हैं।'
  },
  {
    id: 'q-polity-6-4',
    lesson_id: 'lesson-polity-6',
    subject_id: 'polity-constitution',
    question: 'What is the minimum qualifying age for election to the Rajya Sabha and Lok Sabha respectively?',
    question_hi: 'राज्यसभा और लोकसभा का सदस्य बनने के लिए न्यूनतम आयु क्रमशः कितनी है?',
    option_a: '25 years and 21 years',
    option_a_hi: '25 वर्ष और 21 वर्ष',
    option_b: '30 years and 25 years',
    option_b_hi: '30 वर्ष और 25 वर्ष',
    option_c: '35 years and 25 years',
    option_c_hi: '35 वर्ष और 25 वर्ष',
    option_d: '30 years and 35 years',
    option_d_hi: '30 वर्ष और 35 वर्ष',
    correct_answer: 'B',
    explanation: 'Minimum age for Lok Sabha is 25 years; for Rajya Sabha it is 30 years.',
    explanation_hi: 'राज्यसभा के लिए न्यूनतम आयु 30 वर्ष तथा लोकसभा के लिए 25 वर्ष है।'
  },
  {
    id: 'q-polity-6-5',
    lesson_id: 'lesson-polity-6',
    subject_id: 'polity-constitution',
    question: 'What is the tenure of a member of the Rajya Sabha?',
    question_hi: 'राज्यसभा के किसी सदस्य का कार्यकाल कितने वर्ष का होता है?',
    option_a: '4 years',
    option_a_hi: '4 वर्ष',
    option_b: '5 years',
    option_b_hi: '5 वर्ष',
    option_c: '6 years',
    option_c_hi: '6 वर्ष',
    option_d: 'Permanent without term',
    option_d_hi: 'स्थायी बिना किसी निश्चित कार्यकाल के',
    correct_answer: 'C',
    explanation: 'While Rajya Sabha as a House is permanent, its individual members serve a 6-year term.',
    explanation_hi: 'राज्यसभा एक स्थायी सदन है, परंतु इसके सदस्यों का कार्यकाल 6 वर्ष होता है।'
  },

  // Lesson 7 (polity-7) Questions
  {
    id: 'q-polity-7-1',
    lesson_id: 'lesson-polity-7',
    subject_id: 'polity-constitution',
    question: 'What is the retirement age of a judge of the Supreme Court of India?',
    question_hi: 'भारत के सर्वोच्च न्यायालय के न्यायाधीश की सेवानिवृत्ति आयु कितनी है?',
    option_a: '60 years',
    option_a_hi: '60 वर्ष',
    option_b: '62 years',
    option_b_hi: '62 वर्ष',
    option_c: '65 years',
    option_c_hi: '65 वर्ष',
    option_d: '70 years',
    option_d_hi: '70 वर्ष',
    correct_answer: 'C',
    explanation: 'Supreme Court judges retire at 65 years; High Court judges retire at 62 years.',
    explanation_hi: 'सर्वोच्च न्यायालय के न्यायाधीश 65 वर्ष की आयु में तथा उच्च न्यायालय के न्यायाधीश 62 वर्ष में सेवानिवृत्त होते हैं।'
  },
  {
    id: 'q-polity-7-2',
    lesson_id: 'lesson-polity-7',
    subject_id: 'polity-constitution',
    question: 'Under which Article can the President seek the advisory opinion of the Supreme Court?',
    question_hi: 'संविधान के किस अनुच्छेद के तहत राष्ट्रपति सर्वोच्च न्यायालय से परामर्श मांग सकते हैं?',
    option_a: 'Article 129',
    option_a_hi: 'अनुच्छेद 129',
    option_b: 'Article 131',
    option_b_hi: 'अनुच्छेद 131',
    option_c: 'Article 136',
    option_c_hi: 'अनुच्छेद 136',
    option_d: 'Article 143',
    option_d_hi: 'अनुच्छेद 143',
    correct_answer: 'D',
    explanation: 'Article 143 provides for Advisory Jurisdiction of the Supreme Court.',
    explanation_hi: 'अनुच्छेद 143 के तहत राष्ट्रपति विधि के सार्वजनिक महत्व के प्रश्न पर परामर्श ले सकते हैं।'
  },
  {
    id: 'q-polity-7-3',
    lesson_id: 'lesson-polity-7',
    subject_id: 'polity-constitution',
    question: 'Disputes between the Government of India and one or more States fall under which jurisdiction of the Supreme Court?',
    question_hi: 'भारत सरकार और एक या अधिक राज्यों के बीच विवाद सर्वोच्च न्यायालय के किस क्षेत्राधिकार में आते हैं?',
    option_a: 'Appellate Jurisdiction',
    option_a_hi: 'अपीलीय क्षेत्राधिकार',
    option_b: 'Original Jurisdiction (Article 131)',
    option_b_hi: 'मूल आरंभिक क्षेत्राधिकार (अनुच्छेद 131)',
    option_c: 'Advisory Jurisdiction',
    option_c_hi: 'परामर्श क्षेत्राधिकार',
    option_d: 'Review Jurisdiction',
    option_d_hi: 'पुनरावलोकन क्षेत्राधिकार',
    correct_answer: 'B',
    explanation: 'Article 131 gives exclusive original jurisdiction to the Supreme Court for inter-governmental disputes.',
    explanation_hi: 'अनुच्छेद 131 के तहत केंद्र और राज्यों के मध्य विवाद सीधे सर्वोच्च न्यायालय के मूल क्षेत्राधिकार में आते हैं।'
  },
  {
    id: 'q-polity-7-4',
    lesson_id: 'lesson-polity-7',
    subject_id: 'polity-constitution',
    question: 'Under which Article do High Courts have the power to issue writs for the enforcement of Fundamental Rights and other legal rights?',
    question_hi: 'उच्च न्यायालयों को किस अनुच्छेद के तहत रिट जारी करने का अधिकार प्राप्त है?',
    option_a: 'Article 32',
    option_a_hi: 'अनुच्छेद 32',
    option_b: 'Article 136',
    option_b_hi: 'अनुच्छेद 136',
    option_c: 'Article 226',
    option_c_hi: 'अनुच्छेद 226',
    option_d: 'Article 227',
    option_d_hi: 'अनुच्छेद 227',
    correct_answer: 'C',
    explanation: 'High Courts issue writs under Article 226, while the Supreme Court issues writs under Article 32.',
    explanation_hi: 'उच्च न्यायालय अनुच्छेद 226 के तहत तथा सर्वोच्च न्यायालय अनुच्छेद 32 के तहत रिट जारी करते हैं।'
  },
  {
    id: 'q-polity-7-5',
    lesson_id: 'lesson-polity-7',
    subject_id: 'polity-constitution',
    question: 'Which Article declares the Supreme Court to be a "Court of Record" with the power to punish for contempt?',
    question_hi: 'किस अनुच्छेद द्वारा सर्वोच्च न्यायालय को "अभिलेख न्यायालय" (Court of Record) घोषित किया गया है?',
    option_a: 'Article 124',
    option_a_hi: 'अनुच्छेद 124',
    option_b: 'Article 129',
    option_b_hi: 'अनुच्छेद 129',
    option_c: 'Article 137',
    option_c_hi: 'अनुच्छेद 137',
    option_d: 'Article 141',
    option_d_hi: 'अनुच्छेद 141',
    correct_answer: 'B',
    explanation: 'Article 129 establishes the Supreme Court as a Court of Record.',
    explanation_hi: 'अनुच्छेद 129 सर्वोच्च न्यायालय को अभिलेख न्यायालय बनाता है।'
  },

  // Lesson 8 (polity-8) Questions
  {
    id: 'q-polity-8-1',
    lesson_id: 'lesson-polity-8',
    subject_id: 'polity-constitution',
    question: 'In which Schedule of the Indian Constitution are the Union List, State List, and Concurrent List placed?',
    question_hi: 'संघ सूची, राज्य सूची एवं समवर्ती सूची संविधान की किस अनुसूची में दी गई हैं?',
    option_a: 'Fifth Schedule',
    option_a_hi: 'पाँचवीं अनुसूची',
    option_b: 'Seventh Schedule',
    option_b_hi: 'सातवीं अनुसूची',
    option_c: 'Ninth Schedule',
    option_c_hi: 'नौवीं अनुसूची',
    option_d: 'Tenth Schedule',
    option_d_hi: 'दसवीं अनुसूची',
    correct_answer: 'B',
    explanation: 'The Seventh Schedule (Article 246) outlines the division of powers between the Union and the States.',
    explanation_hi: 'सातवीं अनुसूची में केंद्र और राज्यों के बीच शक्तियों का विभाजन तीन सूचियों में किया गया है।'
  },
  {
    id: 'q-polity-8-2',
    lesson_id: 'lesson-polity-8',
    subject_id: 'polity-constitution',
    question: 'With whom do the Residuary Powers of legislation rest in India under Article 248?',
    question_hi: 'अनुच्छेद 248 के तहत अवशिष्ट विधायी शक्तियां (Residuary Powers) किसमें निहित हैं?',
    option_a: 'State Legislatures',
    option_a_hi: 'राज्य विधानमंडलों में',
    option_b: 'The Union Parliament',
    option_b_hi: 'संसद में',
    option_c: 'The Supreme Court',
    option_c_hi: 'सर्वोच्च न्यायालय में',
    option_d: 'Both Centre and States equally',
    option_d_hi: 'केंद्र और राज्य दोनों में समान रूप से',
    correct_answer: 'B',
    explanation: 'Unlike the US where residuary powers lie with states, in India they are vested in Parliament (Article 248).',
    explanation_hi: 'भारत में अवशिष्ट शक्तियां संसद के पास हैं (कनाडा के संविधान से प्रेरित)।'
  },
  {
    id: 'q-polity-8-3',
    lesson_id: 'lesson-polity-8',
    subject_id: 'polity-constitution',
    question: 'Under which Article can the President proclaim President’s Rule in a state due to failure of constitutional machinery?',
    question_hi: 'राज्य में संवैधानिक तंत्र के विफल होने पर राष्ट्रपति किस अनुच्छेद के तहत राष्ट्रपति शासन लगाते हैं?',
    option_a: 'Article 352',
    option_a_hi: 'अनुच्छेद 352',
    option_b: 'Article 356',
    option_b_hi: 'अनुच्छेद 356',
    option_c: 'Article 360',
    option_c_hi: 'अनुच्छेद 360',
    option_d: 'Article 365',
    option_d_hi: 'अनुच्छेद 365',
    correct_answer: 'B',
    explanation: 'Article 356 provides for President’s Rule on receiving a report from the Governor or otherwise.',
    explanation_hi: 'अनुच्छेद 356 के तहत राज्यों में राष्ट्रपति शासन लगाया जाता है।'
  },
  {
    id: 'q-polity-8-4',
    lesson_id: 'lesson-polity-8',
    subject_id: 'polity-constitution',
    question: 'The Sarkaria Commission was appointed in 1983 to examine which domain of governance?',
    question_hi: '1983 में गठित सरकारीया आयोग का संबंध किस विषय से था?',
    option_a: 'Electoral Reforms',
    option_a_hi: 'चुनाव सुधार',
    option_b: 'Centre-State Relations',
    option_b_hi: 'केंद्र-राज्य संबंध',
    option_c: 'Judicial Appointments',
    option_c_hi: 'न्यायिक नियुक्तियां',
    option_d: 'Financial Inclusion',
    option_d_hi: 'वित्तीय समावेशन',
    correct_answer: 'B',
    explanation: 'The Sarkaria Commission (headed by Justice R.S. Sarkaria) reviewed Centre-State relations.',
    explanation_hi: 'सरकारीया आयोग का गठन केंद्र-राज्य संबंधों की समीक्षा और सुधार हेतु किया गया था।'
  },
  {
    id: 'q-polity-8-5',
    lesson_id: 'lesson-polity-8',
    subject_id: 'polity-constitution',
    question: 'How many times has a Financial Emergency under Article 360 been declared in India so far?',
    question_hi: 'भारत में अब तक अनुच्छेद 360 के तहत वित्तीय आपातकाल कितनी बार लगाया गया है?',
    option_a: 'Never (Zero)',
    option_a_hi: 'कभी नहीं (शून्य)',
    option_b: 'Once (in 1991)',
    option_b_hi: 'एक बार (1991 में)',
    option_c: 'Twice',
    option_c_hi: 'दो बार',
    option_d: 'Three times',
    option_d_hi: 'तीन बार',
    correct_answer: 'A',
    explanation: 'Financial Emergency under Article 360 has never been declared in India.',
    explanation_hi: 'भारत में आज तक कभी भी वित्तीय आपातकाल नहीं लगाया गया है।'
  },

  // Lesson 9 (polity-9) Questions
  {
    id: 'q-polity-9-1',
    lesson_id: 'lesson-polity-9',
    subject_id: 'polity-constitution',
    question: 'In which state and district was the Panchayati Raj system first inaugurated in independent India on 2 October 1959?',
    question_hi: '2 अक्टूबर 1959 को स्वतंत्र भारत में पहली बार पंचायती राज का उद्घाटन किस राज्य एवं जिले में हुआ था?',
    option_a: 'Nagaur, Rajasthan',
    option_a_hi: 'नागौर, राजस्थान',
    option_b: 'Sitamarhi, Bihar',
    option_b_hi: 'सीतामढ़ी, बिहार',
    option_c: 'Wardha, Maharashtra',
    option_c_hi: 'वर्धा, महाराष्ट्र',
    option_d: 'Belgaum, Karnataka',
    option_d_hi: 'बेलगाम, कर्नाटक',
    correct_answer: 'A',
    explanation: 'Prime Minister Nehru inaugurated the 3-tier Panchayati Raj at Nagaur, Rajasthan on 2 October 1959.',
    explanation_hi: 'पंडित नेहरू ने 2 अक्टूबर 1959 को राजस्थान के नागौर जिले में पंचायती राज का उद्घाटन किया था।'
  },
  {
    id: 'q-polity-9-2',
    lesson_id: 'lesson-polity-9',
    subject_id: 'polity-constitution',
    question: 'Which Constitutional Amendment Act accorded constitutional status to Panchayati Raj Institutions in India?',
    question_hi: 'किस संविधान संशोधन अधिनियम द्वारा पंचायती राज संस्थाओं को संवैधानिक दर्जा दिया गया?',
    option_a: '42nd Amendment Act',
    option_a_hi: '42वां संविधान संशोधन',
    option_b: '73rd Amendment Act, 1992',
    option_b_hi: '73वां संविधान संशोधन, 1992',
    option_c: '74th Amendment Act, 1992',
    option_c_hi: '74वां संविधान संशोधन, 1992',
    option_d: '86th Amendment Act, 2002',
    option_d_hi: '86वां संविधान संशोधन, 2002',
    correct_answer: 'B',
    explanation: 'The 73rd Amendment Act (1992) added Part IX to the Constitution for Panchayats.',
    explanation_hi: '73वें संविधान संशोधन 1992 द्वारा पंचायतों को संवैधानिक दर्जा मिला।'
  },
  {
    id: 'q-polity-9-3',
    lesson_id: 'lesson-polity-9',
    subject_id: 'polity-constitution',
    question: 'How many functional items/subjects are listed in the 11th Schedule for Panchayats?',
    question_hi: '11वीं अनुसूची में पंचायतों के कार्यक्षेत्र के अंतर्गत कुल कितने विषय सूचीबद्ध हैं?',
    option_a: '18',
    option_a_hi: '18',
    option_b: '21',
    option_b_hi: '21',
    option_c: '29',
    option_c_hi: '29',
    option_d: '33',
    option_d_hi: '33',
    correct_answer: 'C',
    explanation: 'The 11th Schedule contains 29 functional items (while the 12th Schedule has 18 for municipalities).',
    explanation_hi: '11वीं अनुसूची में पंचायतों के लिए 29 विषय हैं, जबकि 12वीं अनुसूची में नगरपालिकाओं के लिए 18 विषय हैं।'
  },
  {
    id: 'q-polity-9-4',
    lesson_id: 'lesson-polity-9',
    subject_id: 'polity-constitution',
    question: 'Which state in India was the first to provide 50% reservation for women in Panchayati Raj Institutions (in 2006)?',
    question_hi: 'पंचायती राज संस्थाओं में महिलाओं को 50% आरक्षण देने वाला भारत का पहला राज्य कौन सा था?',
    option_a: 'Kerala',
    option_a_hi: 'केरल',
    option_b: 'Bihar',
    option_b_hi: 'बिहार',
    option_c: 'Madhya Pradesh',
    option_c_hi: 'मध्य प्रदेश',
    option_d: 'Gujarat',
    option_d_hi: 'गुजरात',
    correct_answer: 'B',
    explanation: 'Bihar was the pioneer state to implement 50% reservation for women in panchayats under the Bihar Panchayat Raj Act, 2006.',
    explanation_hi: 'बिहार ने 2006 में देश में पहली बार महिलाओं के लिए पंचायतों में 50% आरक्षण लागू किया।'
  },
  {
    id: 'q-polity-9-5',
    lesson_id: 'lesson-polity-9',
    subject_id: 'polity-constitution',
    question: 'Which committee recommended a 2-tier Panchayati Raj model in 1977?',
    question_hi: '1977 में किस समिति ने द्विस्तरीय (2-tier) पंचायती राज प्रणाली की सिफारिश की थी?',
    option_a: 'Balwant Rai Mehta Committee',
    option_a_hi: 'बलवंत राय मेहता समिति',
    option_b: 'Ashok Mehta Committee',
    option_b_hi: 'अशोक मेहता समिति',
    option_c: 'G.V.K. Rao Committee',
    option_c_hi: 'जी.वी.के. राव समिति',
    option_d: 'L.M. Singhvi Committee',
    option_d_hi: 'एल.एम. सिंघवी समिति',
    correct_answer: 'B',
    explanation: 'The Ashok Mehta Committee (appointed by the Janata government in 1977) recommended a 2-tier model (Mandal Panchayat and Zila Parishad).',
    explanation_hi: 'अशोक मेहता समिति (1977) ने द्विस्तरीय पंचायती राज (मंडल पंचायत और जिला परिषद) की सिफारिश की थी।'
  },

  // Lesson 10 (polity-10) Questions
  {
    id: 'q-polity-10-1',
    lesson_id: 'lesson-polity-10',
    subject_id: 'polity-constitution',
    question: 'Under which Article is the Finance Commission of India constituted by the President every five years?',
    question_hi: 'राष्ट्रपति द्वारा प्रत्येक पाँच वर्ष में वित्त आयोग का गठन किस अनुच्छेद के तहत किया जाता है?',
    option_a: 'Article 263',
    option_a_hi: 'अनुच्छेद 263',
    option_b: 'Article 280',
    option_b_hi: 'अनुच्छेद 280',
    option_c: 'Article 312',
    option_c_hi: 'अनुच्छेद 312',
    option_d: 'Article 324',
    option_d_hi: 'अनुच्छेद 324',
    correct_answer: 'B',
    explanation: 'Article 280 provides for the constitution of the Finance Commission.',
    explanation_hi: 'अनुच्छेद 280 के तहत वित्त आयोग का गठन केंद्र-राज्य राजस्व वितरण की सिफारिश हेतु होता है।'
  },
  {
    id: 'q-polity-10-2',
    lesson_id: 'lesson-polity-10',
    subject_id: 'polity-constitution',
    question: 'Which Article establishes the office of the Comptroller and Auditor General of India (CAG)?',
    question_hi: 'नियंत्रक एवं महालेखा परीक्षक (CAG) के पद की व्यवस्था संविधान के किस अनुच्छेद में है?',
    option_a: 'Article 76',
    option_a_hi: 'अनुच्छेद 76',
    option_b: 'Article 148',
    option_b_hi: 'अनुच्छेद 148',
    option_c: 'Article 165',
    option_c_hi: 'अनुच्छेद 165',
    option_d: 'Article 324',
    option_d_hi: 'अनुच्छेद 324',
    correct_answer: 'B',
    explanation: 'Article 148 establishes the independent constitutional office of the CAG.',
    explanation_hi: 'अनुच्छेद 148 में स्वतंत्र संवैधानिक पद के रूप में सीएजी (CAG) का प्रावधान है।'
  },
  {
    id: 'q-polity-10-3',
    lesson_id: 'lesson-polity-10',
    subject_id: 'polity-constitution',
    question: 'Who is the highest law officer in the Government of India, appointed under Article 76?',
    question_hi: 'अनुच्छेद 76 के तहत नियुक्त भारत सरकार का सर्वोच्च विधि अधिकारी कौन होता है?',
    option_a: 'Solicitor General',
    option_a_hi: 'सॉलिसिटर जनरल',
    option_b: 'Chief Justice of India',
    option_b_hi: 'भारत के मुख्य न्यायाधीश',
    option_c: 'Attorney General for India',
    option_c_hi: 'भारत का महान्यायवादी (Attorney General)',
    option_d: 'Law Minister',
    option_d_hi: 'विधि मंत्री',
    correct_answer: 'C',
    explanation: 'The Attorney General for India (Article 76) is the chief legal advisor to the government.',
    explanation_hi: 'महान्यायवादी (Attorney General) देश का सर्वोच्च कानूनी अधिकारी होता है।'
  },
  {
    id: 'q-polity-10-4',
    lesson_id: 'lesson-polity-10',
    subject_id: 'polity-constitution',
    question: 'Which constitutional amendment reduced the voting age for citizens from 21 years to 18 years in 1988?',
    question_hi: 'किस संविधान संशोधन द्वारा मतदान की न्यूनतम आयु 21 वर्ष से घटाकर 18 वर्ष की गई थी?',
    option_a: '44th Amendment Act',
    option_a_hi: '44वां संविधान संशोधन',
    option_b: '52nd Amendment Act',
    option_b_hi: '52वां संविधान संशोधन',
    option_c: '61st Amendment Act, 1988',
    option_c_hi: '61वां संविधान संशोधन, 1988',
    option_d: '73rd Amendment Act',
    option_d_hi: '73वां संविधान संशोधन',
    correct_answer: 'C',
    explanation: 'The 61st Constitutional Amendment Act (1988, effective 1989) lowered the voting age to 18.',
    explanation_hi: '61वें संशोधन (1988) द्वारा अनुच्छेद 326 में संशोधन कर मताधिकार की आयु 18 वर्ष की गई।'
  },
  {
    id: 'q-polity-10-5',
    lesson_id: 'lesson-polity-10',
    subject_id: 'polity-constitution',
    question: 'Which Constitutional Amendment introduced the Anti-Defection Law and added the Tenth Schedule in 1985?',
    question_hi: '1985 में किस संविधान संशोधन द्वारा दल-बदल विरोधी कानून और 10वीं अनुसूची जोड़ी गई?',
    option_a: '42nd Amendment',
    option_a_hi: '42वां संशोधन',
    option_b: '44th Amendment',
    option_b_hi: '44वां संशोधन',
    option_c: '52nd Amendment Act, 1985',
    option_c_hi: '52वां संविधान संशोधन, 1985',
    option_d: '91st Amendment Act, 2003',
    option_d_hi: '91वां संविधान संशोधन, 2003',
    correct_answer: 'C',
    explanation: 'The 52nd Amendment Act (1985) added the Tenth Schedule to prevent political defections.',
    explanation_hi: '52वें संशोधन (1985) द्वारा 10वीं अनुसूची जोड़कर दल-बदल को प्रतिबंधित किया गया।'
  }
];
