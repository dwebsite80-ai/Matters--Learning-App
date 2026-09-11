import { Lesson, Question } from '../types';

export const LAW_LESSONS: Lesson[] = [
  {
    id: 'lesson-law-1',
    topic_id: 'law-1',
    subject_id: 'law-rights',
    title: 'Fundamental Rights & Citizen Shields',
    title_hi: 'मौलिक अधिकार एवं नागरिक सुरक्षा कवच',
    subtitle: 'The core constitutional protections that belong to you from birth',
    subtitle_hi: 'जन्म से मिलने वाले वे मुख्य संवैधानिक संरक्षण जो आपकी रक्षा करते हैं',
    estimated_minutes: 10,
    difficulty: 'Beginner',
    hook: 'Imagine receiving an arbitrary fine or facing sudden discrimination at a public restaurant with no right to question it. In a constitutional democracy, your Fundamental Rights act as an impenetrable legal shield.',
    hook_hi: 'सोचिए अगर किसी सार्वजनिक भोजनालय में मनमाना जुर्माना लगा दिया जाए या भेदभाव हो और पूछने का अधिकार न हो। एक संवैधानिक लोकतंत्र में आपके मौलिक अधिकार आपके लिए एक अभेद्य कानूनी ढाल का काम करते हैं।',
    sections: [
      {
        title: 'What Are Fundamental Rights?',
        title_hi: 'मौलिक अधिकार क्या हैं?',
        content: 'Part III of the Indian Constitution guarantees six broad categories of Fundamental Rights: Right to Equality, Right to Freedom, Right against Exploitation, Right to Freedom of Religion, Cultural & Educational Rights, and the Right to Constitutional Remedies.',
        content_hi: 'भारतीय संविधान का भाग III छह प्रमुख श्रेणियों में मौलिक अधिकारों की गारंटी देता है: समता का अधिकार, स्वतंत्रता का अधिकार, शोषण के विरुद्ध अधिकार, धर्म की स्वतंत्रता का अधिकार, संस्कृति और शिक्षा संबंधी अधिकार, तथा संवैधानिक उपचारों का अधिकार।',
        highlight: 'Fundamental Rights are enforceable directly against state action through the High Courts (Article 226) and Supreme Court (Article 32).',
        highlight_hi: 'मौलिक अधिकारों का उल्लंघन होने पर उच्च न्यायालय (अनुच्छेद 226) और सर्वोच्च न्यायालय (अनुच्छेद 32) के माध्यम से राज्य के विरुद्ध सीधी कानूनी कार्रवाई की जा सकती है।',
        iconType: 'concept'
      },
      {
        title: 'Article 14 & 19: Equality and Speech',
        title_hi: 'अनुच्छेद 14 और 19: समानता और अभिव्यक्ति',
        content: 'Article 14 ensures "Equality before law and equal protection of laws" within Indian territory. Article 19(1)(a) protects freedom of speech and expression, peaceful assembly, movement across India, and practicing any lawful profession.',
        content_hi: 'अनुच्छेद 14 भारतीय क्षेत्र में "विधि के समक्ष समता और विधियों का समान संरक्षण" सुनिश्चित करता है। अनुच्छेद 19(1)(a) भाषण और अभिव्यक्ति की स्वतंत्रता, शांतिपूर्ण सम्मेलन, भारत भर में निर्बाध आवागमन और किसी भी वैध पेशे को अपनाने का अधिकार देता है।',
        highlight: 'Reasonable restrictions apply for public order, decency, sovereignty, and state security, but restrictions must never be arbitrary.',
        highlight_hi: 'लोक व्यवस्था, शालीनता, संप्रभुता और सुरक्षा के आधार पर उचित प्रतिबंध लगाए जा सकते हैं, लेकिन प्रतिबंध कभी भी मनमाने नहीं होने चाहिए।',
        iconType: 'tip'
      },
      {
        title: 'Article 32: The Heart of the Constitution',
        title_hi: 'अनुच्छेद 32: संविधान का हृदय और आत्मा',
        content: 'Dr. B.R. Ambedkar called Article 32 the "Heart and Soul of the Constitution" because a right without a remedy is meaningless. If any state body violates your fundamental rights, you have the constitutional right to petition the Supreme Court directly for Writs like Habeas Corpus, Mandamus, and Prohibition.',
        content_hi: 'डॉ. बी.आर. अंबेडकर ने अनुच्छेद 32 को "संविधान का हृदय और आत्मा" कहा था, क्योंकि बिना उपचार के अधिकार अर्थहीन है। यदि कोई सरकारी निकाय आपके मौलिक अधिकारों का हनन करता है, तो आपको बंदी प्रत्यक्षीकरण (Habeas Corpus), परमादेश (Mandamus) जैसी रिट याचिकाओं के लिए सीधे सुप्रीम कोर्ट जाने का संवैधानिक अधिकार है।',
        iconType: 'concept'
      }
    ],
    practical_example: {
      scenario: 'A state municipality passes an oral order banning women or people from certain regions from using a public municipal park.',
      scenario_hi: 'एक नगरपालिका मौखिक आदेश जारी करके महिलाओं या किसी खास क्षेत्र के लोगों को सार्वजनिक पार्क में प्रवेश करने से रोकती है।',
      analysis: 'This directly violates Article 15 (prohibition of discrimination on grounds of religion, race, caste, sex, or place of birth) and Article 19(1)(d) (right to move freely throughout the territory of India).',
      analysis_hi: 'यह सीधे अनुच्छेद 15 (धर्म, मूलवंश, जाति, लिंग या जन्मस्थान के आधार पर भेदभाव का निषेध) और अनुच्छेद 19(1)(d) (स्वतंत्र संचरण का अधिकार) का उल्लंघन करता है।',
      actionable_tip: 'Any affected citizen can challenge this arbitrary order in the High Court under Article 226 without needing special permission.',
      actionable_tip_hi: 'कोई भी प्रभावित नागरिक बिना विशेष अनुमति के अनुच्छेद 226 के तहत उच्च न्यायालय में इस मनमाने आदेश को चुनौती दे सकता है।'
    },
    key_takeaways: [
      'Fundamental rights protect individuals primarily against unjust or discriminatory state actions.',
      'Article 14 guarantees non-arbitrary equal treatment under the law.',
      'Article 32 & 226 allow direct judicial intervention via constitutional writs.',
      'Rights come with reasonable restrictions, but restrictions must be backed by valid law.'
    ],
    key_takeaways_hi: [
      'मौलिक अधिकार नागरिकों को राज्य की अन्यायी या मनमानी कार्रवाइयों से बचाते हैं।',
      'अनुच्छेद 14 कानून के समक्ष सभी के लिए निष्पक्ष व समान व्यवहार सुनिश्चित करता है।',
      'अनुच्छेद 32 और 226 संवैधानिक रिटों के माध्यम से सीधे न्यायिक सुरक्षा प्रदान करते हैं।',
      'अधिकारों पर युक्तियुक्त प्रतिबंध हो सकते हैं, लेकिन वे वैध कानून द्वारा समर्थित होने चाहिए।'
    ]
  },
  {
    id: 'lesson-law-2',
    topic_id: 'law-2',
    subject_id: 'law-rights',
    title: 'Article 21: Life, Privacy & Dignity',
    title_hi: 'अनुच्छेद 21: जीवन, निजता एवं गरिमा का अधिकार',
    subtitle: 'The most expansive right in modern Indian jurisprudence',
    subtitle_hi: 'आधुनिक भारतीय न्यायशास्त्र में सबसे व्यापक और प्रभावशाली मौलिक अधिकार',
    estimated_minutes: 10,
    difficulty: 'Beginner',
    hook: 'Can a government tap your private phone calls without due procedure, or can a hospital deny emergency care if you cannot pay immediately? Article 21 is why they cannot.',
    hook_hi: 'क्या कोई सरकार बिना कानूनी प्रक्रिया के आपका फोन टैप कर सकती है, या कोई अस्पताल तुरंत पैसे न होने पर आपातकालीन इलाज से मना कर सकता है? अनुच्छेद 21 ही इसकी सबसे बड़ी कानूनी रुकावट है।',
    sections: [
      {
        title: 'Beyond Biological Existence',
        title_hi: 'केवल जैविक अस्तित्व से कहीं आगे',
        content: 'Article 21 states: "No person shall be deprived of his life or personal liberty except according to procedure established by law." The Supreme Court (in Maneka Gandhi and subsequent landmark cases) ruled that "Life" does not mean mere animal existence, but living with human dignity, clean water, healthcare, and shelter.',
        content_hi: 'अनुच्छेद 21 कहता है: "विधि द्वारा स्थापित प्रक्रिया के अतिरिक्त किसी भी व्यक्ति को उसके जीवन या व्यक्तिगत स्वतंत्रता से वंचित नहीं किया जाएगा।" सर्वोच्च न्यायालय (मेनका गांधी मामले व अन्य में) ने स्पष्ट किया कि जीवन का अर्थ केवल पशुवत सांस लेना नहीं, बल्कि मानवीय गरिमा, स्वच्छ जल, स्वास्थ्य और आवास के साथ जीना है।',
        highlight: 'Article 21 protects every human being, including foreign nationals, not just Indian citizens.',
        highlight_hi: 'अनुच्छेद 21 केवल भारतीय नागरिकों के लिए ही नहीं, बल्कि विदेशी नागरिकों सहित प्रत्येक मनुष्य के लिए लागू होता है।',
        iconType: 'concept'
      },
      {
        title: 'Right to Privacy (Puttaswamy Judgment)',
        title_hi: 'निजता का अधिकार (पुट्टास्वामी फैसला)',
        content: 'In 2017, a 9-judge constitutional bench declared Privacy to be an intrinsic part of Article 21. Your digital data, personal biometric records, informational privacy, and bodily autonomy cannot be infringed without a legitimate, proportional, and legally enacted state purpose.',
        content_hi: '2017 में 9 जजों की संविधान पीठ ने निजता को अनुच्छेद 21 का अभिन्न अंग घोषित किया। आपका डिजिटल डेटा, बायोमेट्रिक रिकॉर्ड, सूचनात्मक गोपनीयता और शारीरिक स्वायत्तता का किसी वैध, आनुपातिक और कानूनी उद्देश्य के बिना हनन नहीं किया जा सकता।',
        iconType: 'tip'
      },
      {
        title: 'Emergency Medical Care & Speedy Trial',
        title_hi: 'आपातकालीन चिकित्सा एवं त्वरित सुनवाई',
        content: 'Article 21 mandates that every doctor and hospital must provide life-saving emergency medical treatment to an accident victim without waiting for police paperwork or upfront payment (Parmanand Katara case).',
        content_hi: 'अनुच्छेद 21 के तहत दुर्घटना पीड़ित को पुलिस कागजी कार्रवाई या अग्रिम भुगतान की प्रतीक्षा किए बिना प्रत्येक डॉक्टर और अस्पताल को तुरंत जीवन रक्षक चिकित्सा प्रदान करना अनिवार्य है (परमानंद कटारा मामला)।',
        iconType: 'warning'
      }
    ],
    practical_example: {
      scenario: 'A private app demands full access to your photos, contacts, and microphone to provide a simple calculator tool, then threatens to leak contacts if a loan is late.',
      scenario_hi: 'एक साधारण कैलकुलेटर ऐप आपके फोटो, कॉन्टैक्ट्स और माइक्रोफोन की पूरी अनुमति मांगता है, और लोन में देरी होने पर संपर्कों को लीक करने की धमकी देता है।',
      analysis: 'Harassment and extortion using unauthorized personal data violates personal privacy and constitutional liberty standards under Article 21 and Section 66E of the IT Act.',
      analysis_hi: 'अनधिकृत व्यक्तिगत डेटा का उपयोग करके ब्लैकमेल करना अनुच्छेद 21 के तहत निजता व स्वतंत्रता तथा आईटी एक्ट की धारा 66E का सीधा उल्लंघन है।',
      actionable_tip: 'Never grant unnecessary app permissions. If threatened, immediately lodge a cybercrime complaint at cybercrime.gov.in.',
      actionable_tip_hi: 'कभी भी ऐप्स को अनावश्यक अनुमतियां न दें। धमकी मिलने पर तुरंत cybercrime.gov.in पर शिकायत दर्ज करें।'
    },
    key_takeaways: [
      'Article 21 guarantees life with dignity, personal liberty, and due process.',
      'Right to privacy is a fundamental right declared in the KS Puttaswamy ruling.',
      'Emergency medical care cannot be denied to accident victims over paperwork.',
      'Applies to both Indian citizens and foreign nationals.'
    ],
    key_takeaways_hi: [
      'अनुच्छेद 21 गरिमापूर्ण जीवन, व्यक्तिगत स्वतंत्रता और विधि द्वारा स्थापित प्रक्रिया की गारंटी देता है।',
      'निजता का अधिकार के.एस. पुट्टास्वामी फैसले में मौलिक अधिकार घोषित किया गया।',
      'दुर्घटना पीड़ितों को कागजी कार्रवाई के नाम पर आपातकालीन इलाज से वंचित नहीं किया जा सकता।',
      'यह अधिकार भारतीय नागरिकों और विदेशी नागरिकों दोनों पर लागू होता है।'
    ]
  },
  {
    id: 'lesson-law-3',
    topic_id: 'law-3',
    subject_id: 'law-rights',
    title: 'FIR Basics: Filing a Police Complaint',
    title_hi: 'एफआईआर (FIR): पुलिस में शिकायत दर्ज कराने की प्रक्रिया',
    subtitle: 'Understanding First Information Reports, Zero FIR, and citizen entitlements',
    subtitle_hi: 'प्रथम सूचना रिपोर्ट, ज़ीरो एफआईआर और नागरिकों के कानूनी अधिकार',
    estimated_minutes: 10,
    difficulty: 'Beginner',
    hook: 'If your phone or wallet is snatched at a transit station 50 kilometers from your hometown, do you have to travel all the way back or can you file an FIR right where you are?',
    hook_hi: 'यदि आपके गृहनगर से 50 किलोमीटर दूर किसी रेलवे स्टेशन पर आपका फोन या बटुआ चोरी हो जाए, तो क्या आपको वापस लौटना होगा या आप वहीं तुरंत एफआईआर दर्ज करा सकते हैं?',
    sections: [
      {
        title: 'What is an FIR?',
        title_hi: 'एफआईआर (FIR) क्या है?',
        content: 'A First Information Report (FIR) is a written document prepared by police upon receiving information about the commission of a cognizable offence (serious offences like theft, assault, fraud, or robbery where police can investigate without a court warrant).',
        content_hi: 'प्रथम सूचना रिपोर्ट (First Information Report) संज्ञेय अपराध (चोरी, मारपीट, धोखाधड़ी आदि गंभीर अपराध जहां पुलिस बिना वारंट जांच कर सकती है) की सूचना मिलने पर पुलिस द्वारा तैयार किया जाने वाला कानूनी दस्तावेज है।',
        highlight: 'Police are legally mandated to register an FIR if information discloses a cognizable offence (Lalita Kumari ruling).',
        highlight_hi: 'यदि सूचना से संज्ञेय अपराध का पता चलता है, तो पुलिस के लिए एफआईआर दर्ज करना कानूनी रूप से अनिवार्य है (ललिता कुमारी फैसला)।',
        iconType: 'concept'
      },
      {
        title: 'The Power of Zero FIR',
        title_hi: 'ज़ीरो एफआईआर (Zero FIR) की शक्ति',
        content: 'A Zero FIR allows any police station to register an FIR regardless of territorial jurisdiction where the incident occurred. Once recorded, the station assigns it a number "0" and promptly transfers the case to the competent jurisdictional police station.',
        content_hi: 'ज़ीरो एफआईआर किसी भी पुलिस स्टेशन में दर्ज कराई जा सकती है, चाहे घटना किसी भी अधिकार क्षेत्र में हुई हो। दर्ज करने के बाद वह थाना इसे संख्या "0" आवंटित करता है और तुरंत संबंधित क्षेत्राधिकार वाले थाने को स्थानांतरित कर देता है।',
        iconType: 'tip'
      },
      {
        title: 'Your 3 Entitlements as an Informant',
        title_hi: 'शिकायतकर्ता के रूप में आपके 3 अधिकार',
        content: '1. You have the right to have the FIR read back to you before signing. 2. You are entitled to receive a certified copy of the FIR FREE of cost immediately. 3. If an officer refuses to register it, you can send the written complaint to the Superintendent of Police (SP) or approach the Judicial Magistrate under Section 156(3).',
        content_hi: '1. हस्ताक्षर करने से पहले आपको एफआईआर पढ़कर सुनाए जाने का अधिकार है। 2. आपको दर्ज एफआईआर की प्रमाणित प्रति तुरंत और पूरी तरह निःशुल्क पाने का अधिकार है। 3. यदि थाना प्रभारी मना करता है, तो आप डाक द्वारा पुलिस अधीक्षक (SP) को या धारा 156(3) के तहत मजिस्ट्रेट को आवेदन दे सकते हैं।',
        iconType: 'warning'
      }
    ],
    practical_example: {
      scenario: 'A local officer tells someone: "This bag snatching happened in the next district, go to that police station to file your complaint."',
      scenario_hi: 'एक स्थानीय पुलिस अधिकारी कहता है: "यह चोरी दूसरे जिले में हुई है, अपनी शिकायत दर्ज कराने उसी थाने में जाइए।"',
      analysis: 'The officer is legally required to accept a Zero FIR, start urgent evidence preservation (CCTV checks), and transfer the file.',
      analysis_hi: 'अधिकारी कानूनी तौर पर ज़ीरो एफआईआर दर्ज करने, त्वरित साक्ष्य (CCTV आदि) सुरक्षित करने और फाइल ट्रांसफर करने के लिए बाध्य है।',
      actionable_tip: 'Politely request the officer on duty to register a Zero FIR and provide your free stamped copy.',
      actionable_tip_hi: 'ड्यूटी अधिकारी से विनम्रतापूर्वक ज़ीरो एफआईआर दर्ज करने और अपनी मुहर लगी निःशुल्क प्रति देने का अनुरोध करें।'
    },
    key_takeaways: [
      'An FIR initiates official police investigation in cognizable offences.',
      'Zero FIR allows reporting at any police station irrespective of crime location.',
      'You are entitled to a 100% free certified copy of the registered FIR.',
      'Refusal by police can be escalated to the District SP or local Magistrate.'
    ],
    key_takeaways_hi: [
      'एफआईआर संज्ञेय अपराधों में पुलिस की आधिकारिक जांच शुरू करती है।',
      'ज़ीरो एफआईआर अपराध स्थल की परवाह किए बिना किसी भी थाने में दर्ज कराई जा सकती है।',
      'आप दर्ज एफआईआर की 100% निःशुल्क प्रमाणित प्रति पाने के हकदार हैं।',
      'पुलिस के इनकार करने पर जिला पुलिस अधीक्षक (SP) या न्यायिक मजिस्ट्रेट से संपर्क किया जा सकता है।'
    ]
  },
  {
    id: 'lesson-law-4',
    topic_id: 'law-4',
    subject_id: 'law-rights',
    title: 'Arrest & Detention: 5 Golden Protections',
    title_hi: 'गिरफ्तारी एवं हिरासत: 5 स्वर्णिम सुरक्षा अधिकार',
    subtitle: 'The landmark D.K. Basu guidelines for every citizen',
    subtitle_hi: 'प्रत्येक नागरिक के लिए ऐतिहासिक डी.के. बसु दिशानिर्देश',
    estimated_minutes: 10,
    difficulty: 'Intermediate',
    hook: 'Police authority is not unlimited. The Supreme Court laid down strict binding guidelines (D.K. Basu v. State of West Bengal) to prevent unlawful custodial harassment.',
    hook_hi: 'पुलिस की शक्तियां असीमित नहीं हैं। हिरासत में मनमानी और उत्पीड़न रोकने के लिए सुप्रीम कोर्ट ने ऐतिहासिक डी.के. बसु बनाम पश्चिम बंगाल राज्य मामले में बाध्यकारी दिशानिर्देश तय किए हैं।',
    sections: [
      {
        title: '1. Clear Identification & Grounds of Arrest',
        title_hi: '1. स्पष्ट पहचान और गिरफ्तारी के आधार',
        content: 'Every police personnel carrying out an arrest must wear clear identification and name tags with designations. The arrested individual has a constitutional right to be informed of the exact grounds of arrest immediately.',
        content_hi: 'गिरफ्तारी करने वाले प्रत्येक पुलिसकर्मी की वर्दी पर नाम और पदनाम का स्पष्ट बैज होना अनिवार्य है। गिरफ्तार व्यक्ति को तुरंत गिरफ्तारी के सटीक कानूनी आधार जानने का संवैधानिक अधिकार है।',
        iconType: 'concept'
      },
      {
        title: '2. The Arrest Memo & Friend/Family Intimation',
        title_hi: '2. गिरफ्तारी मेमो एवं परिवार को सूचना',
        content: 'An official Arrest Memo must be prepared at the time of arrest, signed by at least one witness (a family member or respectable local citizen), and countersigned by the arrestee. The police must inform a designated relative or friend within 8-12 hours.',
        content_hi: 'गिरफ्तारी के समय एक आधिकारिक अरेस्ट मेमो (Arrest Memo) बनाया जाना चाहिए, जिस पर कम से कम एक गवाह (परिवार का सदस्य या इलाके का प्रतिष्ठित नागरिक) के हस्ताक्षर और गिरफ्तार व्यक्ति के हस्ताक्षर हों। पुलिस को 8-12 घंटे के भीतर नामित रिश्तेदार या मित्र को सूचित करना होगा।',
        iconType: 'tip'
      },
      {
        title: '3. The 24-Hour Magistrate Rule & Medical Exam',
        title_hi: '3. 24 घंटे का मजिस्ट्रेट नियम एवं मेडिकल जांच',
        content: 'Article 22(2) guarantees that any arrested person MUST be produced before the nearest Judicial Magistrate within 24 hours (excluding journey time). Also, an arrestee has the right to be medically examined upon arrest and every 48 hours in custody.',
        content_hi: 'अनुच्छेद 22(2) गारंटी देता है कि किसी भी गिरफ्तार व्यक्ति को यात्रा के समय को छोड़कर 24 घंटे के भीतर निकटतम न्यायिक मजिस्ट्रेट के समक्ष पेश किया जाना अनिवार्य है। हिरासत में हर 48 घंटे में मेडिकल जांच का भी अधिकार है।',
        highlight: 'Custodial detention beyond 24 hours without explicit Magistrate approval is unconstitutional and illegal.',
        highlight_hi: 'मजिस्ट्रेट की मंजूरी के बिना 24 घंटे से अधिक पुलिस हिरासत में रखना पूरी तरह असंवैधानिक और गैरकानूनी है।',
        iconType: 'warning'
      }
    ],
    practical_example: {
      scenario: 'A person is detained for questioning and kept overnight at a police station for two days without family notification or court production.',
      scenario_hi: 'एक व्यक्ति को पूछताछ के लिए थाने में दो दिन तक बिना परिवार को सूचित किए और बिना कोर्ट में पेश किए बंद रखा जाता है।',
      analysis: 'This violates Section 57 CrPC and Article 22(2), constituting illegal confinement.',
      analysis_hi: 'यह धारा 57 सीआरपीसी और अनुच्छेद 22(2) का उल्लंघन है, जो गैरकानूनी हिरासत (Illegal Confinement) की श्रेणी में आता है।',
      actionable_tip: 'Family or counsel can file a Habeas Corpus writ petition or approach the Chief Judicial Magistrate immediately.',
      actionable_tip_hi: 'परिवार या वकील तुरंत मुख्य न्यायिक मजिस्ट्रेट से संपर्क कर सकते हैं या बंदी प्रत्यक्षीकरण (Habeas Corpus) याचिका दायर कर सकते हैं।'
    },
    key_takeaways: [
      'Arresting officers must display clear name tags and state explicit legal grounds.',
      'An Arrest Memo with a witness signature must be generated at the spot.',
      'A designated friend or family member must be informed promptly.',
      'Production before a Judicial Magistrate within 24 hours is non-negotiable.'
    ],
    key_takeaways_hi: [
      'गिरफ्तार करने वाले अधिकारियों के लिए नेमप्लेट लगाना और कारण बताना अनिवार्य है।',
      'मौके पर गवाह के हस्ताक्षर सहित अरेस्ट मेमो बनाया जाना चाहिए।',
      'नामित मित्र या परिवार के सदस्य को तुरंत सूचना दी जानी चाहिए।',
      '24 घंटे के भीतर न्यायिक मजिस्ट्रेट के समक्ष पेश करना अनिवार्य है।'
    ]
  },
  {
    id: 'lesson-law-5',
    topic_id: 'law-5',
    subject_id: 'law-rights',
    title: 'Consumer Rights & Online Claims',
    title_hi: 'उपभोक्ता अधिकार एवं ऑनलाइन शिकायतें',
    subtitle: 'Consumer Protection Act 2019, E-Daakhil, and unfair trade practices',
    subtitle_hi: 'उपभोक्ता संरक्षण अधिनियम 2019, ई-दाखिल और अनुचित व्यापार व्यवहार',
    estimated_minutes: 10,
    difficulty: 'Beginner',
    hook: 'Bought a laptop online that broke in 2 days and the seller refuses replacement saying "goods once sold cannot be returned"? That clause is legally invalid under consumer law.',
    hook_hi: 'ऑनलाइन खरीदा गया लैपटॉप 2 दिन में खराब हो गया और विक्रेता कहता है "बिका हुआ माल वापस नहीं होगा"? उपभोक्ता कानून के तहत यह शर्त कानूनी रूप से अमान्य है।',
    sections: [
      {
        title: 'Consumer Protection Act 2019',
        title_hi: 'उपभोक्ता संरक्षण अधिनियम 2019',
        content: 'The Consumer Protection Act 2019 protects 6 basic rights: Right to Safety, Right to Information, Right to Choose, Right to be Heard, Right to Redressal, and Right to Consumer Education. E-commerce platforms are explicitly liable for deceptive practices and counterfeit products.',
        content_hi: 'उपभोक्ता संरक्षण अधिनियम 2019 छह बुनियादी अधिकारों की रक्षा करता है: सुरक्षा का अधिकार, सूचना का अधिकार, चुनने का अधिकार, सुने जाने का अधिकार, निवारण का अधिकार और उपभोक्ता शिक्षा का अधिकार। ई-कॉमर्स प्लेटफॉर्म भी भ्रामक जानकारी और नकली उत्पादों के लिए जिम्मेदार हैं।',
        iconType: 'concept'
      },
      {
        title: 'Unfair Trade Practices & Misleading Ads',
        title_hi: 'अनुचित व्यापार व्यवहार एवं भ्रामक विज्ञापन',
        content: 'Clauses like "No Return Under Any Circumstances" for defective products or charging above Maximum Retail Price (MRP) are prohibited unfair trade practices. Endorsers and manufacturers can also face penalties for misleading claims.',
        content_hi: 'दोषपूर्ण उत्पाद के लिए "किसी भी परिस्थिति में वापसी नहीं" की शर्त लगाना या एमआरपी (MRP) से अधिक वसूलना प्रतिबंधित अनुचित व्यापार व्यवहार है। भ्रामक विज्ञापनों के लिए प्रचारकों और निर्माताओं पर भी जुर्माना लग सकता है।',
        highlight: 'MRP is the maximum legal retail price inclusive of all taxes. No shop or airport vendor can legally charge above MRP.',
        highlight_hi: 'MRP सभी करों सहित अधिकतम कानूनी खुदरा मूल्य है। कोई भी दुकान या हवाई अड्डा विक्रेता कानूनी रूप से MRP से अधिक नहीं वसूल सकता।',
        iconType: 'warning'
      },
      {
        title: 'Filing Claims with E-Daakhil',
        title_hi: 'ई-दाखिल (E-Daakhil) से ऑनलाइन दावा',
        content: 'You no longer need expensive lawyers or physical court visits to file consumer disputes. The national portal (edaakhil.nic.in) lets you file digital complaints from home with minimal court fees for disputes up to ₹50 Lakhs (District Commission).',
        content_hi: 'उपभोक्ता विवाद दर्ज करने के लिए अब महंगे वकीलों या कोर्ट के चक्कर काटने की जरूरत नहीं है। राष्ट्रीय पोर्टल (edaakhil.nic.in) आपको घर बैठे न्यूनतम शुल्क में 50 लाख रुपये तक के विवाद दर्ज करने की सुविधा देता है।',
        iconType: 'tip'
      }
    ],
    practical_example: {
      scenario: 'A phone manufacturer charges you ₹3,000 for a motherboard repair that failed within the 1-year warranty period due to manufacturing defects.',
      scenario_hi: 'एक फोन निर्माता निर्माण दोष के कारण 1 वर्ष की वारंटी अवधि के भीतर मदरबोर्ड की मरम्मत के लिए आपसे ₹3,000 मांगता है।',
      analysis: 'Refusing warranty service for inherent defects constitutes a deficiency in service under Consumer Protection Act.',
      analysis_hi: 'आंतरिक दोषों के लिए वारंटी सेवा से इनकार करना उपभोक्ता संरक्षण अधिनियम के तहत सेवा में कमी (Deficiency in Service) है।',
      actionable_tip: 'Send a formal written notice with invoice and service logs. If ignored within 15 days, file on the E-Daakhil portal or National Consumer Helpline (1915).',
      actionable_tip_hi: 'बिल और सर्विस रिकॉर्ड के साथ औपचारिक नोटिस भेजें। यदि 15 दिनों में समाधान न हो, तो ई-दाखिल या राष्ट्रीय उपभोक्ता हेल्पलाइन (1915) पर शिकायत करें।'
    },
    key_takeaways: [
      'Charging above MRP or disclaiming all product liabilities is illegal.',
      'Consumer Protection Act 2019 covers both offline stores and e-commerce platforms.',
      'E-Daakhil enables fast online dispute filing without hiring an advocate.',
      'National Consumer Helpline (NCH 1915) provides pre-litigation dispute resolution.'
    ],
    key_takeaways_hi: [
      'MRP से अधिक वसूलना या उत्पाद की वारंटी जिम्मेदारी से पल्ला झाड़ना गैरकानूनी है।',
      'उपभोक्ता संरक्षण अधिनियम 2019 ऑफलाइन स्टोर और ई-कॉमर्स दोनों पर लागू होता है।',
      'ई-दाखिल बिना वकील के त्वरित ऑनलाइन विवाद दर्ज करने की सुविधा प्रदान करता है।',
      'राष्ट्रीय उपभोक्ता हेल्पलाइन (1915) कोर्ट जाने से पहले विवाद समाधान में मदद करती है।'
    ]
  },
  {
    id: 'lesson-law-6',
    topic_id: 'law-6',
    subject_id: 'law-rights',
    title: 'RTI Act: Demanding Transparency',
    title_hi: 'आरटीआई अधिनियम (RTI): पारदर्शिता और जवाबदेही',
    subtitle: 'Right to Information Act 2005 as a tool for governance accountability',
    subtitle_hi: 'सूचना का अधिकार अधिनियम 2005 - सुशासन का प्रभावी साधन',
    estimated_minutes: 10,
    difficulty: 'Intermediate',
    hook: 'Ever wondered why a road in your neighborhood broke down within 3 months of construction, or why a passport application is stuck with no updates? The RTI Act lets you inspect official files for just ₹10.',
    hook_hi: 'क्या कभी सोचा है कि सड़क बनने के 3 महीने के भीतर ही क्यों टूट गई या पासपोर्ट आवेदन बिना अपडेट के क्यों अटका है? आरटीआई अधिनियम आपको सिर्फ ₹10 में सरकारी फाइलों के निरीक्षण का अधिकार देता है।',
    sections: [
      {
        title: 'The Purpose of RTI',
        title_hi: 'आरटीआई का मुख्य उद्देश्य',
        content: 'Passed in 2005, the Right to Information Act empowers every Indian citizen to request certified information, inspect government work, take certified samples of materials, and inspect official records from any Public Authority.',
        content_hi: '2005 में पारित सूचना का अधिकार अधिनियम प्रत्येक भारतीय नागरिक को किसी भी सार्वजनिक प्राधिकरण से प्रमाणित जानकारी मांगने, सरकारी कार्यों व सामग्रियों के नमूनों का निरीक्षण करने और आधिकारिक रिकॉर्ड की प्रति प्राप्त करने का अधिकार देता है।',
        iconType: 'concept'
      },
      {
        title: 'Timelines and Mandatory Responses',
        title_hi: 'समय सीमा और अनिवार्य उत्तर',
        content: 'The Public Information Officer (PIO) must provide requested information within 30 days of receiving the application. If the information concerns the life or liberty of a person, it must be provided within 48 hours!',
        content_hi: 'लोक सूचना अधिकारी (PIO) को आवेदन प्राप्त होने के 30 दिनों के भीतर मांगी गई जानकारी देनी होगी। यदि मामला किसी व्यक्ति के जीवन या स्वतंत्रता से संबंधित है, तो जानकारी 48 घंटे के भीतर दी जानी चाहिए!',
        highlight: 'If the PIO fails to respond without reasonable cause, the Information Commission can levy a personal penalty of ₹250 per day (up to ₹25,000) on the officer.',
        highlight_hi: 'यदि अधिकारी बिना किसी उचित कारण के देरी करता है, तो सूचना आयोग उस पर प्रतिदिन ₹250 (अधिकतम ₹25,000) का व्यक्तिगत जुर्माना लगा सकता है।',
        iconType: 'tip'
      },
      {
        title: 'Filing an RTI Online',
        title_hi: 'ऑनलाइन आरटीआई आवेदन',
        content: 'For central ministries, departments, and public sector banks, applications can be filed easily via rtionline.gov.in. State government portals handle state-level departments.',
        content_hi: 'केंद्रीय मंत्रालयों, विभागों और सरकारी बैंकों के लिए rtionline.gov.in के माध्यम से आसानी से ऑनलाइन आवेदन किया जा सकता है। राज्य सरकार के पोर्टल राज्य स्तरीय विभागों को संभालते हैं।',
        iconType: 'concept'
      }
    ],
    practical_example: {
      scenario: 'A municipal tender allocated ₹40 lakhs for storm drainage repair, but no physical work started for 6 months.',
      scenario_hi: 'नाली निर्माण के लिए नगर निगम ने ₹40 लाख आवंटित किए, लेकिन 6 महीने तक कोई काम शुरू नहीं हुआ।',
      analysis: 'Citizens can file an RTI requesting the sanctioned budget, work order copy, completion timeline, and contractor inspection log.',
      analysis_hi: 'नागरिक आरटीआई दाखिल कर स्वीकृत बजट, वर्क ऑर्डर की प्रति, कार्य पूर्णता की समय सीमा और ठेकेदार निरीक्षण रिपोर्ट मांग सकते हैं।',
      actionable_tip: 'Keep questions objective and factual. Ask for copies of documents and records rather than theoretical "why" questions.',
      actionable_tip_hi: 'प्रश्न तथ्यात्मक और स्पष्ट रखें। सैद्धांतिक "क्यों" पूछने के बजाय सरकारी रिकॉर्ड और दस्तावेजों की प्रमाणित प्रतियां मांगें।'
    },
    key_takeaways: [
      'RTI allows citizens to inspect public works, certified records, and material samples.',
      'Standard response timeline is 30 days (48 hours for life & liberty matters).',
      'Officers face daily financial penalties for deliberate delay or refusal.',
      'Central applications can be submitted online with a standard ₹10 fee.'
    ],
    key_takeaways_hi: [
      'आरटीआई नागरिकों को सरकारी कार्यों, प्रमाणित रिकॉर्ड और नमूनों की जांच का अधिकार देता है।',
      'सामान्य जानकारी 30 दिनों में तथा जीवन व स्वतंत्रता से जुड़ी जानकारी 48 घंटे में मिलना अनिवार्य है।',
      'जानबूझकर देरी करने या जानकारी छिपाने पर अधिकारी पर व्यक्तिगत जुर्माना लगता है।',
      'केंद्रीय विभागों के लिए ₹10 के शुल्क के साथ ऑनलाइन आवेदन किया जा सकता है।'
    ]
  },
  {
    id: 'lesson-law-7',
    topic_id: 'law-7',
    subject_id: 'law-rights',
    title: 'Cybercrime & Financial Fraud Emergency',
    title_hi: 'साइबर अपराध एवं वित्तीय धोखाधड़ी आपातकाल',
    subtitle: 'The 1930 Helpline, freezing illicit money trails, and digital evidence',
    subtitle_hi: 'हेल्पलाइन 1930, अवैध लेन-देन फ्रीज कराना और डिजिटल साक्ष्य',
    estimated_minutes: 10,
    difficulty: 'Beginner',
    hook: 'If someone falls for an OTP scam or fake courier link and loses ₹50,000, the first 2 to 3 hours are known as the "Golden Hours". Acting immediately can recover your money before scammers withdraw it.',
    hook_hi: 'यदि कोई व्यक्ति फर्जी लिंक या ओटीपी धोखाधड़ी में ₹50,000 गंवा बैठता है, तो पहले 2 से 3 घंटे "गोल्डन आवर्स" कहलाते हैं। त्वरित कार्रवाई से ठगों के पैसे निकालने से पहले राशि बचाई जा सकती है।',
    sections: [
      {
        title: 'Dial 1930: National Cybercrime Helpline',
        title_hi: 'डायल 1930: राष्ट्रीय साइबर अपराध हेल्पलाइन',
        content: 'The Ministry of Home Affairs operates the Citizen Financial Cyber Fraud Reporting System via helpline 1930 and cybercrime.gov.in. When you report fraud immediately, the system alerts intermediary banks and payment gateways to freeze the recipient bank accounts instantly.',
        content_hi: 'गृह मंत्रालय हेल्पलाइन 1930 और cybercrime.gov.in के माध्यम से वित्तीय साइबर धोखाधड़ी रिपोर्टिंग प्रणाली संचालित करता है। तुरंत शिकायत करने पर सिस्टम संबंधित बैंकों और गेटवे को सचेत कर ठगों के खाते तुरंत फ्रीज कर देता है।',
        highlight: 'Reporting within the first 1-2 hours offers the highest probability of halting fund withdrawals across intermediary mules.',
        highlight_hi: 'धोखाधड़ी के पहले 1-2 घंटों में सूचना देने पर बैंक खातों से पैसे की निकासी रुकने की संभावना सबसे अधिक होती है।',
        iconType: 'tip'
      },
      {
        title: 'Golden Rules of Digital Hygiene',
        title_hi: 'डिजिटल सुरक्षा के बुनियादी नियम',
        content: '1. You NEVER need to enter your UPI PIN to RECEIVE money. UPI PIN is only required to SEND money. 2. Never download remote access tools (AnyDesk, TeamViewer) on requests from unknown callers. 3. Bank employees never ask for full card CVV or OTP.',
        content_hi: '1. पैसे प्राप्त करने (RECEIVE) के लिए कभी यूपीआई पिन (UPI PIN) दर्ज नहीं करना पड़ता। पिन केवल पैसे भेजने (SEND) के लिए होता है। 2. किसी अनजान कॉलर के कहने पर कभी भी AnyDesk या TeamViewer जैसे रिमोट एक्सेस ऐप डाउनलोड न करें। 3. बैंक कर्मचारी कभी सीवीवी या ओटीपी नहीं मांगते।',
        iconType: 'warning'
      },
      {
        title: 'RBI Zero Liability Framework',
        title_hi: 'आरबीआई (RBI) शून्य देयता ढांचा',
        content: 'According to Reserve Bank of India guidelines on unauthorized electronic banking transactions, if a customer notifies the bank of third-party fraud within 3 working days, customer liability is ZERO.',
        content_hi: 'अनधिकृत इलेक्ट्रॉनिक बैंकिंग लेनदेन पर आरबीआई के दिशानिर्देशों के अनुसार, यदि ग्राहक 3 कार्य दिवसों के भीतर बैंक को धोखाधड़ी की सूचना देता है, तो ग्राहक की देयता शून्य (Zero Liability) होती है।',
        iconType: 'concept'
      }
    ],
    practical_example: {
      scenario: 'A seller on an online marketplace receives a QR code with the buyer saying: "Scan this QR and enter your 6-digit PIN to collect the ₹5,000 payment."',
      scenario_hi: 'ऑनलाइन खरीदार विक्रेता से कहता है: "पैसे पाने के लिए इस क्यूआर कोड को स्कैन करें और अपना 6 अंकों का यूपीआई पिन डालें।"',
      analysis: 'Scanning a QR code and entering a UPI PIN debits money from your account, it never deposits money.',
      analysis_hi: 'क्यूआर कोड स्कैन करके पिन डालने से आपके खाते से पैसे कटते हैं, कभी जमा नहीं होते।',
      actionable_tip: 'Never enter a PIN to receive payments. If clicked by accident, dial 1930 and lock your net banking immediately.',
      actionable_tip_hi: 'पैसे लेने के लिए कभी पिन न डालें। गलती से क्लिक हो जाए तो तुरंत 1930 पर कॉल करें और नेटबैंकिंग ब्लॉक करवाएं।'
    },
    key_takeaways: [
      'Dial 1930 immediately for financial cyber fraud to freeze recipient accounts.',
      'Entering a UPI PIN ALWAYS sends money, never receives money.',
      'Notify your bank within 3 working days to claim RBI zero-liability protection.',
      'Take screenshots of transaction IDs, phone numbers, and chat logs as evidence.'
    ],
    key_takeaways_hi: [
      'वित्तीय साइबर धोखाधड़ी होने पर ठगों के खाते फ्रीज कराने के लिए तुरंत 1930 डायल करें।',
      'UPI PIN डालने से हमेशा पैसा कटता है, कभी पैसा आता नहीं है।',
      'आरबीआई के जीरो-लायबिलिटी नियम का लाभ उठाने के लिए 3 दिनों के भीतर बैंक को सूचित करें।',
      'लेन-देन आईडी, फोन नंबर और चैट के स्क्रीनशॉट कानूनी साक्ष्य के रूप में सुरक्षित रखें।'
    ]
  },
  {
    id: 'lesson-law-8',
    topic_id: 'law-8',
    subject_id: 'law-rights',
    title: 'Traffic Stops, Challans & Document Checks',
    title_hi: 'ट्रैफिक नियम, चालान एवं दस्तावेज चेकिंग',
    subtitle: 'DigiLocker validity, Motor Vehicles Act rules, and on-spot protocols',
    subtitle_hi: 'डिजिलॉकर की वैधता, मोटर वाहन अधिनियम और मौके पर नागरिक अधिकार',
    estimated_minutes: 10,
    difficulty: 'Beginner',
    hook: 'Can a traffic constable snatch your car keys, force you to step out without a woman officer present after dark, or reject electronic documents shown on government apps like DigiLocker or mParivahan?',
    hook_hi: 'क्या कोई ट्रैफिक सिपाही आपकी कार की चाबी निकाल सकता है, अंधेरा होने के बाद महिला पुलिसकर्मी के बिना महिला को बाहर निकलने को कह सकता है, या डिजिलॉकर पर दस्तावेज स्वीकार करने से मना कर सकता है?',
    sections: [
      {
        title: 'Digital Documents are Legally Valid',
        title_hi: 'डिजिटल दस्तावेज कानूनी रूप से पूरी तरह मान्य',
        content: 'Under Rule 139 of the Central Motor Vehicles Rules and IT Act Section 4, digital copies of your Driving License, RC, Insurance, and PUC stored in government-approved DigiLocker or mParivahan apps have the same legal standing as physical original documents.',
        content_hi: 'केंद्रीय मोटर वाहन नियम के नियम 139 और आईटी अधिनियम की धारा 4 के तहत, डिजिलॉकर (DigiLocker) या एम-परिवहन (mParivahan) ऐप में ड्राइविंग लाइसेंस, आरसी, बीमा और प्रदूषण प्रमाण पत्र (PUC) मूल भौतिक दस्तावेजों के समान ही वैध हैं।',
        highlight: 'Police officers cannot insist on physical copies if verified digital documents are presented.',
        highlight_hi: 'सत्यापित डिजिटल दस्तावेज दिखाए जाने पर पुलिस अधिकारी मूल भौतिक दस्तावेज दिखाने की जिद नहीं कर सकते।',
        iconType: 'concept'
      },
      {
        title: 'Officer Ranks & Challan Authority',
        title_hi: 'अधिकारी का पद और चालान काटने का अधिकार',
        content: 'Only officers of the rank of Assistant Sub-Inspector (ASI), Sub-Inspector (SI), or Inspector typically carry the legal authority to issue compounding spot fines. Constables cannot confiscate your keys or issue challans unless authorized by official e-challan machines.',
        content_hi: 'आमतौर पर केवल सहायक उप-निरीक्षक (ASI), उप-निरीक्षक (SI) या निरीक्षक स्तर के अधिकारियों के पास ही मौके पर शमन शुल्क (Spot Fine) वसूलने का अधिकार होता है। सिपाही चाबी नहीं छीन सकते और न ही बिना आधिकारिक ई-चालान मशीन के जुर्माना वसूल सकते हैं।',
        iconType: 'tip'
      },
      {
        title: 'Key Snatching is Illegal',
        title_hi: 'वाहन की चाबी छीनना पूरी तरह गैरकानूनी',
        content: 'Police officers are not permitted by law to forcibly remove ignition keys from a running vehicle, puncture tires, or physically harass drivers. If you feel unsafe, you have the right to request a formal receipt and identity verification.',
        content_hi: 'कानून किसी भी पुलिसकर्मी को चलती गाड़ी से जबरन चाबी निकालने, टायर की हवा निकालने या दुर्व्यवहार करने की अनुमति नहीं देता। सुरक्षित महसूस न होने पर आपको अधिकारी की पहचान और रसीद मांगने का पूरा अधिकार है।',
        iconType: 'warning'
      }
    ],
    practical_example: {
      scenario: 'A traffic officer stops a driver and claims: "DigiLocker is not accepted in this state, pay a fine for not having original physical RC book."',
      scenario_hi: 'ट्रैफिक अधिकारी कहता है: "हमारे राज्य में डिजिलॉकर मान्य नहीं है, मूल कागजात न होने पर जुर्माना भरो।"',
      analysis: 'Ministry of Road Transport and Highways (MoRTH) circulars explicitly bind all state traffic departments to accept DigiLocker and mParivahan.',
      analysis_hi: 'सड़क परिवहन एवं राजमार्ग मंत्रालय (MoRTH) का स्पष्ट आदेश है कि सभी राज्यों के लिए डिजिलॉकर और एम-परिवहन मान्य हैं।',
      actionable_tip: 'Politely show the official DigiLocker certificate and reference MoRTH notification RT-11036/64/2017-MVL.',
      actionable_tip_hi: 'शालीनता से ऐप में डिजिटल प्रमाण पत्र दिखाएं और MoRTH की अधिसूचना RT-11036/64/2017-MVL का संदर्भ दें।'
    },
    key_takeaways: [
      'DigiLocker and mParivahan documents are legally equivalent to physical originals.',
      'Officers cannot arbitrarily snatch keys from vehicles.',
      'Spot fines require authorized officers with official electronic challan machines.',
      'Every payment must be accompanied by an official printed or SMS e-challan receipt.'
    ],
    key_takeaways_hi: [
      'डिजिलॉकर और एम-परिवहन में उपलब्ध दस्तावेज मूल दस्तावेजों के बराबर कानूनी मान्यता रखते हैं।',
      'पुलिस अधिकारी वाहन से चाबी जबरन नहीं निकाल सकते।',
      'मौके पर जुर्माना वसूलने के लिए अधिकृत अधिकारी और ई-चालान रसीद अनिवार्य है।',
      'प्रत्येक भुगतान के लिए आधिकारिक मुद्रित या एसएमएस ई-चालान रसीद प्राप्त करें।'
    ]
  },
  {
    id: 'lesson-law-9',
    topic_id: 'law-9',
    subject_id: 'law-rights',
    title: 'Rental Agreements & Tenant Protections',
    title_hi: 'किराया अनुबंध एवं किरायेदार के अधिकार',
    subtitle: 'Security deposits, 11-month lease logic, maintenance disputes, and eviction rules',
    subtitle_hi: 'सुरक्षा जमा (Deposit), 11 महीने के एग्रीमेंट का रहस्य और बेदखली के नियम',
    estimated_minutes: 10,
    difficulty: 'Intermediate',
    hook: 'Why are almost all standard rental agreements signed for exactly 11 months, and can a landlord unilaterally lock you out of your apartment over a deposit disagreement?',
    hook_hi: 'लगभग सभी रेंट एग्रीमेंट ठीक 11 महीने के लिए ही क्यों बनते हैं, और क्या मकान मालिक सुरक्षा जमा के विवाद पर आपको जबरन फ्लैट से बाहर निकाल सकता है?',
    sections: [
      {
        title: 'Why the 11-Month Duration?',
        title_hi: '11 महीने की अवधि ही क्यों?',
        content: 'Under the Registration Act 1908 (Section 17), leases exceeding 11 months (i.e. 12 months or more) mandate formal compulsory registration and high stamp duty. An 11-month agreement can be executed on non-judicial stamp paper with notarization, saving registration friction.',
        content_hi: 'पंजीकरण अधिनियम 1908 (Registration Act 1908) की धारा 17 के तहत, 11 महीने से अधिक (12 महीने या उससे ज्यादा) के पट्टे का अनिवार्य अदालती पंजीकरण और भारी स्टाम्प शुल्क आवश्यक होता है। 11 महीने का अनुबंध नोटरी द्वारा गैर-न्यायिक स्टाम्प पर कम खर्च में निष्पादित हो जाता है।',
        iconType: 'concept'
      },
      {
        title: 'Security Deposit & Deductions',
        title_hi: 'सुरक्षा जमा (Security Deposit) और कटौती',
        content: 'Security deposits are meant to cover unpaid utility bills or actual physical property damages beyond reasonable wear and tear. Landlords cannot make arbitrary deductions without providing itemized repair receipts.',
        content_hi: 'सिक्योरिटी डिपॉजिट केवल बकाया बिजली/पानी बिल या संपत्ति को हुए वास्तविक नुकसान की भरपाई के लिए होता है। सामान्य टूट-फूट (Wear & Tear) के लिए मकान मालिक बिना रसीद मनमानी कटौती नहीं कर सकता।',
        highlight: 'Model Tenancy Act recommendations cap residential security deposits at a maximum of 2 months rent.',
        highlight_hi: 'मॉडल किरायेदारी अधिनियम (Model Tenancy Act) के तहत आवासीय संपत्ति के लिए सुरक्षा जमा अधिकतम 2 महीने के किराये तक सीमित रखने की सिफारिश है।',
        iconType: 'tip'
      },
      {
        title: 'Unlawful Eviction is Illegal',
        title_hi: 'जबरन बेदखली पूरी तरह गैरकानूनी',
        content: 'A landlord cannot physically lock out a tenant, disconnect water/electricity utilities, or throw belongings onto the street without following due legal notice periods (typically 30 days) and obtaining a court order for recovery of possession.',
        content_hi: 'मकान मालिक कानूनी नोटिस अवधि (आमतौर पर 30 दिन) और अदालत के आदेश के बिना किरायेदार का ताला नहीं तोड़ सकता, पानी या बिजली का कनेक्शन नहीं काट सकता और न ही सामान बाहर फेंक सकता है।',
        iconType: 'warning'
      }
    ],
    practical_example: {
      scenario: 'A landlord cuts off electricity to force an immediate eviction because the tenant asked for a 2-week grace period on rent.',
      scenario_hi: 'किरायेदार द्वारा 2 सप्ताह की मोहलत मांगने पर मकान मालिक तुरंत फ्लैट खाली कराने के लिए बिजली काट देता है।',
      analysis: 'Cutting off essential utilities violates basic tenancy laws and common law protections under the Transfer of Property Act.',
      analysis_hi: 'आवश्यक उपयोगिताओं (बिजली/पानी) को काटना किरायेदारी कानून और संपत्ति अंतरण अधिनियम का खुला उल्लंघन है।',
      actionable_tip: 'Always keep signed copies of the lease and digital rent receipts. You can report utility disconnection to the local Rent Authority or police.',
      actionable_tip_hi: 'हस्ताक्षरित अनुबंध की प्रति और किराया रसीदें सुरक्षित रखें। बिजली-पानी काटे जाने पर स्थानीय किराया प्राधिकरण या पुलिस में शिकायत की जा सकती है।'
    },
    key_takeaways: [
      '11-month agreements avoid mandatory court registration requirements under Registration Act.',
      'Security deposit deductions require documented proof of non-wear-and-tear damage.',
      'Cutting off electricity or water to force eviction is strictly illegal.',
      'Notice periods specified in the signed agreement bind both landlord and tenant.'
    ],
    key_takeaways_hi: [
      '11 महीने के समझौते पंजीकरण अधिनियम के तहत अनिवार्य अदालती रजिस्ट्री से बचाते हैं।',
      'डिपॉजिट से कटौती केवल वास्तविक नुकसान के बिल और प्रमाण के आधार पर ही हो सकती है।',
      'जबरन निकालने के लिए बिजली या पानी काटना गैरकानूनी है।',
      'अनुबंध में तय नोटिस अवधि का पालन मकान मालिक और किरायेदार दोनों के लिए बाध्यकारी है।'
    ]
  },
  {
    id: 'lesson-law-10',
    topic_id: 'law-10',
    subject_id: 'law-rights',
    title: 'Contracts & Notarization Essentials',
    title_hi: 'अनुबंध एवं नोटरीकरण की अनिवार्यताएं',
    subtitle: 'What makes an agreement legally valid under the Indian Contract Act 1872',
    subtitle_hi: 'भारतीय अनुबंध अधिनियम 1872 के तहत वैध समझौते के कानूनी नियम',
    estimated_minutes: 10,
    difficulty: 'Advanced',
    hook: 'Is an agreement written on a plain sheet of paper or agreed over WhatsApp messages legally binding in court, or does everything need a ₹500 stamp paper with notary seal?',
    hook_hi: 'क्या सादे कागज पर लिखा या व्हाट्सएप पर तय किया गया समझौता अदालत में कानूनी रूप से मान्य होता है, या हर समझौते के लिए ₹500 का स्टाम्प और नोटरी अनिवार्य है?',
    sections: [
      {
        title: 'The 4 Pillars of a Valid Contract',
        title_hi: 'वैध अनुबंध के 4 मुख्य स्तंभ',
        content: 'Under Section 10 of the Indian Contract Act 1872, an agreement is a valid contract if it has: 1. Free Consent (no coercion, fraud, or undue influence), 2. Competent Parties (age of majority, sound mind), 3. Lawful Consideration & Object (not illegal/against public policy), 4. Not expressly declared void.',
        content_hi: 'भारतीय अनुबंध अधिनियम 1872 की धारा 10 के अनुसार, कोई भी समझौता वैध अनुबंध तब बनता है जब: 1. स्वतंत्र सहमति हो (दबाव या धोखाधड़ी न हो), 2. सक्षम पक्षकार हों (वयस्क और स्वस्थचित्त), 3. वैध प्रतिफल व उद्देश्य हो, 4. कानून द्वारा स्पष्ट रूप से शून्य घोषित न किया गया हो।',
        iconType: 'concept'
      },
      {
        title: 'Notary vs Registration',
        title_hi: 'नोटरी (Notary) बनाम रजिस्ट्री (Registration)',
        content: 'A Notary Public merely verifies the identity of the signing parties to prevent fraud. Registration (under the Registration Act) creates a permanent public record with the Sub-Registrar and is mandatory for property transfers, sales, and long-term leases.',
        content_hi: 'नोटरी केवल हस्ताक्षरकर्ताओं की पहचान सत्यापित करता है ताकि धोखाधड़ी रोकी जा सके। जबकि रजिस्ट्री (Registration Act) उप-पंजीयक कार्यालय में स्थायी सार्वजनिक रिकॉर्ड बनाती है, जो संपत्ति बिक्री व दीर्घकालिक पट्टों के लिए अनिवार्य है।',
        highlight: 'Notarizing a document does NOT substitute for mandatory registration when the law requires registration.',
        highlight_hi: 'कानून जहां अनिवार्य पंजीकरण की मांग करता है, वहां केवल नोटरी कराने से दस्तावेज को पूर्ण कानूनी मान्यता नहीं मिलती।',
        iconType: 'warning'
      },
      {
        title: 'Digital Agreements & Electronic Signatures',
        title_hi: 'डिजिटल अनुबंध एवं इलेक्ट्रॉनिक हस्ताक्षर',
        content: 'Under Section 10A of the Information Technology Act 2000, electronic contracts formed via email, digital platforms, or Aadhaar e-Sign are recognized as legally valid and admissible as evidence.',
        content_hi: 'सूचना प्रौद्योगिकी अधिनियम 2000 की धारा 10A के तहत, ईमेल, डिजिटल प्लेटफॉर्म या आधार ई-हस्ताक्षर (Aadhaar e-Sign) के माध्यम से किए गए अनुबंध कानूनी रूप से मान्य और साक्ष्य के रूप में स्वीकार्य हैं।',
        iconType: 'tip'
      }
    ],
    practical_example: {
      scenario: 'Two freelance partners agree via signed email agreement with clear milestone deliverables and payment terms.',
      scenario_hi: 'दो फ्रीलांसर ईमेल पर स्पष्ट कार्य विवरण, समय सीमा और भुगतान शर्तों पर सहमति जताते हैं।',
      analysis: 'This constitutes a binding, enforceable digital contract under the Contract Act and IT Act.',
      analysis_hi: 'यह अनुबंध अधिनियम और आईटी अधिनियम के तहत एक बाध्यकारी व कानूनी रूप से प्रवर्तनीय डिजिटल अनुबंध है।',
      actionable_tip: 'Always define deliverables, timelines, payment schedules, and dispute resolution mechanisms in writing before starting work.',
      actionable_tip_hi: 'काम शुरू करने से पहले हमेशा कार्य विवरण, समय सीमा, भुगतान शेड्यूल और विवाद समाधान को लिखित रूप में तय करें।'
    },
    key_takeaways: [
      'A valid contract requires offer, acceptance, lawful consideration, and free mutual consent.',
      'Notarization verifies identity; registration creates a legally binding public title record.',
      'Electronic contracts and emails are legally enforceable under IT Act Section 10A.',
      'Agreements lacking lawful consideration or obtained under coercion are null and void.'
    ],
    key_takeaways_hi: [
      'वैध अनुबंध के लिए प्रस्ताव, स्वीकृति, वैध प्रतिफल और स्वतंत्र सहमति अनिवार्य है।',
      'नोटरी पहचान प्रमाणित करता है; रजिस्ट्री कानूनी मालिकाना हक का सार्वजनिक रिकॉर्ड बनाती है।',
      'आईटी अधिनियम की धारा 10A के तहत इलेक्ट्रॉनिक अनुबंध और ईमेल कानूनी रूप से वैध हैं।',
      'बिना प्रतिफल या दबाव में किए गए समझौते कानूनन शून्य (Null & Void) होते हैं।'
    ]
  }
];

export const LAW_QUESTIONS: Question[] = [
  // Lesson 1 questions
  {
    id: 'q-law-1-1',
    lesson_id: 'lesson-law-1',
    subject_id: 'law-rights',
    question: 'Which constitutional article was described by Dr. B.R. Ambedkar as the "Heart and Soul of the Constitution"?',
    question_hi: 'डॉ. बी.आर. अंबेडकर ने किस संवैधानिक अनुच्छेद को "संविधान का हृदय और आत्मा" कहा था?',
    option_a: 'Article 14 (Equality Before Law)',
    option_a_hi: 'अनुच्छेद 14 (विधि के समक्ष समानता)',
    option_b: 'Article 19 (Freedom of Speech)',
    option_b_hi: 'अनुच्छेद 19 (वाक् एवं अभिव्यक्ति की स्वतंत्रता)',
    option_c: 'Article 32 (Right to Constitutional Remedies)',
    option_c_hi: 'अनुच्छेद 32 (संवैधानिक उपचारों का अधिकार)',
    option_d: 'Article 51A (Fundamental Duties)',
    option_d_hi: 'अनुच्छेद 51A (मौलिक कर्तव्य)',
    correct_answer: 'C',
    explanation: 'Article 32 guarantees direct access to the Supreme Court for enforcement of Fundamental Rights via constitutional writs.',
    explanation_hi: 'अनुच्छेद 32 मौलिक अधिकारों के संरक्षण के लिए संवैधानिक रिट के माध्यम से सीधे सुप्रीम कोर्ट जाने की गारंटी देता है।'
  },
  {
    id: 'q-law-1-2',
    lesson_id: 'lesson-law-1',
    subject_id: 'law-rights',
    question: 'Fundamental Rights in India are primarily enforceable against which of the following?',
    question_hi: 'भारत में मौलिक अधिकार मुख्य रूप से किसके विरुद्ध प्रवर्तनीय (लागू) हैं?',
    option_a: 'Private family members only',
    option_a_hi: 'केवल परिवार के निजी सदस्यों के विरुद्ध',
    option_b: 'State bodies and government authorities',
    option_b_hi: 'राज्य की संस्थाओं और सरकारी प्राधिकरणों के विरुद्ध',
    option_c: 'Foreign international organizations only',
    option_c_hi: 'केवल विदेशी अंतरराष्ट्रीय संगठनों के विरुद्ध',
    option_d: 'Solely private employers',
    option_d_hi: 'केवल निजी नियोक्ताओं के विरुद्ध',
    correct_answer: 'B',
    explanation: 'Fundamental Rights protect citizens primarily against arbitrary or discriminatory actions of the State.',
    explanation_hi: 'मौलिक अधिकार नागरिकों को मुख्य रूप से राज्य (सरकार) की मनमानी या भेदभावपूर्ण कार्रवाइयों से सुरक्षा प्रदान करते हैं।'
  },
  {
    id: 'q-law-1-3',
    lesson_id: 'lesson-law-1',
    subject_id: 'law-rights',
    question: 'Under which article can a citizen approach a State High Court for violation of fundamental rights?',
    question_hi: 'किस अनुच्छेद के तहत कोई नागरिक मौलिक अधिकारों के उल्लंघन पर राज्य के उच्च न्यायालय (High Court) का दरवाजा खटखटा सकता है?',
    option_a: 'Article 226',
    option_a_hi: 'अनुच्छेद 226',
    option_b: 'Article 370',
    option_b_hi: 'अनुच्छेद 370',
    option_c: 'Article 356',
    option_c_hi: 'अनुच्छेद 356',
    option_d: 'Article 100',
    option_d_hi: 'अनुच्छेद 100',
    correct_answer: 'A',
    explanation: 'Article 226 empowers High Courts to issue writs for the enforcement of fundamental rights and other legal rights.',
    explanation_hi: 'अनुच्छेद 226 उच्च न्यायालयों को मौलिक अधिकारों तथा अन्य कानूनी अधिकारों के प्रवर्तन के लिए रिट जारी करने का अधिकार देता है।'
  },

  // Lesson 2 questions
  {
    id: 'q-law-2-1',
    lesson_id: 'lesson-law-2',
    subject_id: 'law-rights',
    question: 'In which landmark case did a 9-judge Supreme Court bench declare the Right to Privacy as a fundamental right under Article 21?',
    question_hi: 'किस ऐतिहासिक मामले में सुप्रीम कोर्ट की 9 जजों की पीठ ने निजता के अधिकार (Right to Privacy) को अनुच्छेद 21 के तहत मौलिक अधिकार घोषित किया?',
    option_a: 'Kesavananda Bharati case',
    option_a_hi: 'केशवानंद भारती मामला',
    option_b: 'K.S. Puttaswamy v. Union of India',
    option_b_hi: 'के.एस. पुट्टास्वामी बनाम भारत संघ',
    option_c: 'Golaknath case',
    option_c_hi: 'गोलकनाथ मामला',
    option_d: 'Vishaka v. State of Rajasthan',
    option_d_hi: 'विशाखा बनाम राजस्थान राज्य',
    correct_answer: 'B',
    explanation: 'The 2017 Justice K.S. Puttaswamy judgment established privacy as an intrinsic component of Article 21.',
    explanation_hi: 'वर्ष 2017 के के.एस. पुट्टास्वामी फैसले ने निजता को अनुच्छेद 21 के तहत जीवन और व्यक्तिगत स्वतंत्रता का अभिन्न अंग स्थापित किया।'
  },
  {
    id: 'q-law-2-2',
    lesson_id: 'lesson-law-2',
    subject_id: 'law-rights',
    question: 'Can a hospital deny emergency life-saving treatment to an accident victim citing pending police paperwork?',
    question_hi: 'क्या कोई अस्पताल पुलिस की कागजी कार्रवाई लंबित होने का हवाला देकर दुर्घटना पीड़ित को आपातकालीन जीवन रक्षक इलाज देने से मना कर सकता है?',
    option_a: 'Yes, police approval is always mandatory first',
    option_a_hi: 'हाँ, पहले पुलिस की अनुमति हमेशा अनिवार्य है',
    option_b: 'No, hospitals must provide emergency care immediately (Parmanand Katara ruling)',
    option_b_hi: 'नहीं, अस्पतालों को तुरंत आपातकालीन उपचार देना अनिवार्य है (परमानंद कटारा निर्णय)',
    option_c: 'Yes, if the hospital is privately owned',
    option_c_hi: 'हाँ, यदि अस्पताल निजी स्वामित्व वाला है',
    option_d: 'Only if the patient is accompanied by two witnesses',
    option_d_hi: 'केवल तभी यदि मरीज के साथ दो गवाह मौजूद हों',
    correct_answer: 'B',
    explanation: 'Under Article 21 jurisprudence, saving life takes absolute precedence over procedural paperwork.',
    explanation_hi: 'अनुच्छेद 21 के तहत किसी व्यक्ति का जीवन बचाना कानूनी और पुलिस कागजी औपचारिकताओं से सर्वोपरि है।'
  },

  // Lesson 3 questions
  {
    id: 'q-law-3-1',
    lesson_id: 'lesson-law-3',
    subject_id: 'law-rights',
    question: 'What is a "Zero FIR"?',
    question_hi: '"जीरो एफआईआर (Zero FIR)" क्या होती है?',
    option_a: 'An FIR that has zero investigative value',
    option_a_hi: 'एक ऐसी प्राथमिकी जिसका कोई जांच मूल्य न हो',
    option_b: 'An FIR registered at any police station regardless of jurisdiction',
    option_b_hi: 'घटनास्थल के क्षेत्राधिकार की परवाह किए बिना किसी भी थाने में दर्ज कराई जाने वाली प्राथमिकी',
    option_c: 'An FIR registered with zero court fees',
    option_c_hi: 'बिना कोर्ट फीस के दर्ज कराई गई एफआईआर',
    option_d: 'An FIR for minor traffic violations only',
    option_d_hi: 'केवल मामूली ट्रैफिक उल्लंघनों के लिए एफआईआर',
    correct_answer: 'B',
    explanation: 'A Zero FIR can be lodged at any police station, which initiates immediate action and then transfers it to the proper jurisdiction.',
    explanation_hi: 'जीरो एफआईआर किसी भी पुलिस स्टेशन में दर्ज की जा सकती है, जिससे तत्काल कार्रवाई शुरू होती है और फिर उसे संबंधित थाने को स्थानांतरित किया जाता है।'
  },
  {
    id: 'q-law-3-2',
    lesson_id: 'lesson-law-3',
    subject_id: 'law-rights',
    question: 'How much are you legally required to pay for a certified copy of your registered FIR?',
    question_hi: 'अपनी दर्ज कराई गई एफआईआर की प्रमाणित प्रति प्राप्त करने के लिए कानूनी रूप से आपको कितना शुल्क देना पड़ता है?',
    option_a: '₹500 application fee',
    option_a_hi: '₹500 आवेदन शुल्क',
    option_b: '₹100 processing charge',
    option_b_hi: '₹100 प्रोसेसिंग शुल्क',
    option_c: 'It is 100% Free of cost under law',
    option_c_hi: 'कानून के तहत यह 100% पूरी तरह निःशुल्क है',
    option_d: '1% of the stolen asset value',
    option_d_hi: 'चोरी हुई संपत्ति के मूल्य का 1%',
    correct_answer: 'C',
    explanation: 'Section 154 CrPC mandates that a copy of the recorded FIR must be given to the informant immediately and free of cost.',
    explanation_hi: 'सीआरपीसी की धारा 154 के अनुसार एफआईआर दर्ज कराने वाले व्यक्ति को तुरंत उसकी प्रति निःशुल्क देना अनिवार्य है।'
  },

  // Lesson 4 questions
  {
    id: 'q-law-4-1',
    lesson_id: 'lesson-law-4',
    subject_id: 'law-rights',
    question: 'Within how many hours must an arrested individual be produced before the nearest Judicial Magistrate?',
    question_hi: 'गिरफ्तार किए गए व्यक्ति को कितने घंटों के भीतर निकटतम न्यायिक मजिस्ट्रेट के समक्ष पेश किया जाना अनिवार्य है?',
    option_a: '12 hours',
    option_a_hi: '12 घंटे',
    option_b: '24 hours (excluding journey time)',
    option_b_hi: '24 घंटे (यात्रा के समय को छोड़कर)',
    option_c: '48 hours',
    option_c_hi: '48 घंटे',
    option_d: '7 days',
    option_d_hi: '7 दिन',
    correct_answer: 'B',
    explanation: 'Article 22(2) and Section 57 CrPC strictly require production before a magistrate within 24 hours.',
    explanation_hi: 'संविधान के अनुच्छेद 22(2) और सीआरपीसी की धारा 57 के अनुसार 24 घंटे के भीतर मजिस्ट्रेट के सामने पेश करना अनिवार्य है।'
  },
  {
    id: 'q-law-4-2',
    lesson_id: 'lesson-law-4',
    subject_id: 'law-rights',
    question: 'Which set of landmark Supreme Court guidelines governs arrest and detention procedures in India?',
    question_hi: 'भारत में गिरफ्तारी और हिरासत प्रक्रियाओं को नियंत्रित करने वाले सुप्रीम कोर्ट के ऐतिहासिक दिशानिर्देश कौन से हैं?',
    option_a: 'D.K. Basu Guidelines',
    option_a_hi: 'डी.के. बसु दिशानिर्देश',
    option_b: 'Macaulay Guidelines',
    option_b_hi: 'मैकाले दिशानिर्देश',
    option_c: 'Hunter Commission Rules',
    option_c_hi: 'हंटर कमीशन नियम',
    option_d: 'Radcliffe Protocol',
    option_d_hi: 'रेडक्लिफ प्रोटोकॉल',
    correct_answer: 'A',
    explanation: 'The D.K. Basu v. State of West Bengal guidelines set strict procedural rules for arrest memos, medical checks, and family notification.',
    explanation_hi: 'डी.के. बसु बनाम पश्चिम बंगाल राज्य मामले में सुप्रीम कोर्ट ने गिरफ्तारी मेमो, मेडिकल जांच और परिजनों को सूचना देने के सख्त नियम तय किए।'
  },

  // Lesson 5 questions
  {
    id: 'q-law-5-1',
    lesson_id: 'lesson-law-5',
    subject_id: 'law-rights',
    question: 'What is the official online portal to file consumer court complaints directly from home?',
    question_hi: 'घर बैठे उपभोक्ता फोरम में शिकायत दर्ज कराने के लिए आधिकारिक सरकारी ऑनलाइन पोर्टल कौन सा है?',
    option_a: 'E-Daakhil',
    option_a_hi: 'ई-दाखिल (E-Daakhil)',
    option_b: 'FastTrack-Gov',
    option_b_hi: 'फास्टट्रैक-गॉव',
    option_c: 'DigiCourt-Now',
    option_c_hi: 'डिजीकोर्ट-नाउ',
    option_d: 'InsolvencyPortal',
    option_d_hi: 'इनसॉल्वेंसी पोर्टल',
    correct_answer: 'A',
    explanation: 'E-Daakhil (edaakhil.nic.in) enables digital filing of consumer complaints across District, State, and National commissions.',
    explanation_hi: 'ई-दाखिल (edaakhil.nic.in) के माध्यम से जिला, राज्य और राष्ट्रीय उपभोक्ता आयोगों में ऑनलाइन शिकायत दर्ज की जा सकती है।'
  },
  {
    id: 'q-law-5-2',
    lesson_id: 'lesson-law-5',
    subject_id: 'law-rights',
    question: 'Can a retail shop or airport kiosk legally charge higher than the Maximum Retail Price (MRP)?',
    question_hi: 'क्या कोई खुदरा दुकान या एयरपोर्ट का कियोस्क कानूनी रूप से अधिकतम खुदरा मूल्य (MRP) से अधिक दाम वसूल सकता है?',
    option_a: 'Yes, if they have higher air conditioning costs',
    option_a_hi: 'हाँ, यदि उनका एयर कंडीशनिंग का खर्च अधिक है',
    option_b: 'No, MRP is the legal upper ceiling inclusive of all taxes',
    option_b_hi: 'नहीं, एमआरपी सभी करों सहित कानूनन अधिकतम ऊपरी सीमा है',
    option_c: 'Yes, if the customer agrees verbally',
    option_c_hi: 'हाँ, यदि ग्राहक मौखिक रूप से सहमत हो',
    option_d: 'Only after 8:00 PM',
    option_d_hi: 'केवल रात 8:00 बजे के बाद',
    correct_answer: 'B',
    explanation: 'Under Legal Metrology Rules and Consumer Protection Act, charging above MRP is a punishable unfair trade practice.',
    explanation_hi: 'विधिक मापविज्ञान नियमों और उपभोक्ता संरक्षण अधिनियम के तहत एमआरपी से अधिक वसूलना एक दंडनीय अपराध और अनुचित व्यापार व्यवहार है।'
  },

  // Lesson 6 questions
  {
    id: 'q-law-6-1',
    lesson_id: 'lesson-law-6',
    subject_id: 'law-rights',
    question: 'What is the standard response time for a Public Information Officer (PIO) under the RTI Act 2005?',
    question_hi: 'आरटीआई अधिनियम 2005 के तहत लोक सूचना अधिकारी (PIO) के लिए सूचना देने की मानक समय-सीमा क्या है?',
    option_a: '7 days',
    option_a_hi: '7 दिन',
    option_b: '30 days (48 hours for life & liberty matters)',
    option_b_hi: '30 दिन (जीवन और व्यक्तिगत स्वतंत्रता से जुड़े मामलों में 48 घंटे)',
    option_c: '90 days',
    option_c_hi: '90 दिन',
    option_d: '6 months',
    option_d_hi: '6 महीने',
    correct_answer: 'B',
    explanation: 'The RTI Act specifies 30 days for standard requests and an expedited 48-hour window if it relates to life or liberty.',
    explanation_hi: 'आरटीआई के तहत सामान्य मामलों में 30 दिन तथा जीवन या स्वतंत्रता से जुड़े मामलों में 48 घंटे के भीतर सूचना देना अनिवार्य है।'
  },

  // Lesson 7 questions
  {
    id: 'q-law-7-1',
    lesson_id: 'lesson-law-7',
    subject_id: 'law-rights',
    question: 'What is the National Financial Cybercrime Helpline number to report online banking frauds immediately?',
    question_hi: 'ऑनलाइन बैंकिंग और वित्तीय साइबर धोखाधड़ी की तुरंत रिपोर्ट करने के लिए राष्ट्रीय हेल्पलाइन नंबर क्या है?',
    option_a: '100',
    option_a_hi: '100',
    option_b: '1930',
    option_b_hi: '1930',
    option_c: '1098',
    option_c_hi: '1098',
    option_d: '112',
    option_d_hi: '112',
    correct_answer: 'B',
    explanation: '1930 connects directly to the Citizen Financial Cyber Fraud Reporting System to freeze fraudulent money flows.',
    explanation_hi: '1930 सीधे वित्तीय साइबर धोखाधड़ी रिपोर्टिंग प्रणाली से जोड़ता है ताकि ठगे गए पैसे को तुरंत फ्रीज कराया जा सके।'
  },
  {
    id: 'q-law-7-2',
    lesson_id: 'lesson-law-7',
    subject_id: 'law-rights',
    question: 'When do you need to enter your UPI PIN?',
    question_hi: 'आपको अपना यूपीआई पिन (UPI PIN) कब दर्ज करने की आवश्यकता होती है?',
    option_a: 'Only when SENDING or paying money out of your account',
    option_a_hi: 'केवल अपने खाते से पैसे भेजते या भुगतान करते समय',
    option_b: 'When receiving money from a customer',
    option_b_hi: 'किसी ग्राहक से पैसे प्राप्त करते समय',
    option_c: 'When claiming cashback vouchers',
    option_c_hi: 'कैशबैक वाउचर का दावा करते समय',
    option_d: 'To unlock incoming transfers',
    option_d_hi: 'आने वाले पैसे को अनलॉक करने के लिए',
    correct_answer: 'A',
    explanation: 'UPI PIN is exclusively for authorizing debits (sending money). Receiving money never requires a PIN.',
    explanation_hi: 'यूपीआई पिन केवल खाते से पैसे डेबिट करने (भेजने) के लिए होता है। पैसा प्राप्त करने के लिए कभी पिन नहीं डालना होता।'
  },

  // Lesson 8 questions
  {
    id: 'q-law-8-1',
    lesson_id: 'lesson-law-8',
    subject_id: 'law-rights',
    question: 'Are digital vehicle documents stored in DigiLocker or mParivahan legally valid during traffic checks?',
    question_hi: 'क्या ट्रैफिक चेकिंग के दौरान डिजिलॉकर (DigiLocker) या एम-परिवहन में रखे डिजिटल वाहन दस्तावेज कानूनी रूप से मान्य हैं?',
    option_a: 'No, physical originals are always required',
    option_a_hi: 'नहीं, हमेशा मूल भौतिक दस्तावेज आवश्यक हैं',
    option_b: 'Yes, they have equal legal standing under IT Act and Motor Vehicle Rules',
    option_b_hi: 'हाँ, आईटी अधिनियम और मोटर वाहन नियमों के तहत उन्हें मूल के बराबर कानूनी मान्यता प्राप्त है',
    option_c: 'Only if printed on paper first',
    option_c_hi: 'केवल तभी यदि उन्हें पहले कागज पर प्रिंट कराया गया हो',
    option_d: 'Only in your home district',
    option_d_hi: 'केवल आपके गृह जिले में',
    correct_answer: 'B',
    explanation: 'Central Motor Vehicles Rules Section 139 and IT Act Section 4 legally equate DigiLocker documents with physical originals.',
    explanation_hi: 'केंद्रीय मोटर वाहन नियम की धारा 139 और आईटी अधिनियम की धारा 4 डिजिलॉकर दस्तावेजों को मूल के समकक्ष मानती है।'
  },

  // Lesson 9 questions
  {
    id: 'q-law-9-1',
    lesson_id: 'lesson-law-9',
    subject_id: 'law-rights',
    question: 'Why are standard residential tenancy agreements commonly drafted for 11 months?',
    question_hi: 'आवासीय किराया अनुबंध (Rent Agreement) आमतौर पर 11 महीने के लिए ही क्यों तैयार किए जाते हैं?',
    option_a: 'Leases for 12 months or more require mandatory registration and higher stamp duty',
    option_a_hi: '12 महीने या उससे अधिक के पट्टे के लिए अनिवार्य पंजीकरण और अधिक स्टांप शुल्क की आवश्यकता होती है',
    option_b: 'Tenants cannot stay in one place for a full year',
    option_b_hi: 'किरायेदार पूरे एक साल एक जगह नहीं रह सकते',
    option_c: 'Indian contract law caps rental periods at 11 months',
    option_c_hi: 'भारतीय अनुबंध कानून किराये की अवधि को 11 महीने तक सीमित करता है',
    option_d: 'To align with the financial tax year',
    option_d_hi: 'वित्तीय कर वर्ष के साथ तालमेल बिठाने के लिए',
    correct_answer: 'A',
    explanation: 'Under the Registration Act 1908, leases under 1 year (11 months) are exempt from compulsory Sub-Registrar registration.',
    explanation_hi: 'पंजीकरण अधिनियम 1908 के तहत 1 वर्ष से कम (11 महीने) के किरायेनामे को सब-रजिस्ट्रार कार्यालय में अनिवार्य पंजीकरण से छूट प्राप्त है।'
  },

  // Lesson 10 questions
  {
    id: 'q-law-10-1',
    lesson_id: 'lesson-law-10',
    subject_id: 'law-rights',
    question: 'Does a Notary Public seal make an unregistered real estate sale deed permanently legal?',
    question_hi: 'क्या नोटरी पब्लिक की मुहर किसी अपंजीकृत अचल संपत्ति (जमीन/मकान) के विक्रय विलेख को स्थायी रूप से कानूनी बना देती है?',
    option_a: 'Yes, a notary replaces all court registration',
    option_a_hi: 'हाँ, नोटरी सभी अदालती व रजिस्ट्री प्रक्रियाओं का विकल्प है',
    option_b: 'No, notary only verifies identity; property sales require mandatory Sub-Registrar registration',
    option_b_hi: 'नहीं, नोटरी केवल हस्ताक्षरकर्ता की पहचान प्रमाणित करता है; संपत्ति बिक्री के लिए सब-रजिस्ट्रार के यहां अनिवार्य पंजीकरण आवश्यक है',
    option_c: 'Yes, if signed by two bank managers',
    option_c_hi: 'हाँ, यदि दो बैंक प्रबंधकों द्वारा हस्ताक्षरित हो',
    option_d: 'Only for commercial properties',
    option_d_hi: 'केवल व्यावसायिक संपत्तियों के लिए',
    correct_answer: 'B',
    explanation: 'Notarization verifies signatures and identities, but cannot override statutory registration requirements for immovable property.',
    explanation_hi: 'नोटरी केवल हस्ताक्षर करने वाले की पहचान सत्यापित करता है, लेकिन यह अचल संपत्ति के अनिवार्य वैधानिक पंजीकरण की जगह नहीं ले सकता।'
  }
];
