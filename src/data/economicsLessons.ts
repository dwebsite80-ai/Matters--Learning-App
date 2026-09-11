import { Lesson, Question } from '../types';

export const ECONOMICS_LESSONS: Lesson[] = [
  {
    id: 'lesson-eco-1',
    topic_id: 'eco-1',
    subject_id: 'economics',
    title: 'What is Economics? Scarcity & Choices',
    title_hi: 'अर्थशास्त्र क्या है? दुर्लभता एवं विकल्प',
    subtitle: 'Understanding the science of decision making with limited resources',
    subtitle_hi: 'सीमित संसाधनों के बीच बेहतर निर्णय लेने का विज्ञान',
    estimated_minutes: 10,
    difficulty: 'Beginner',
    hook: 'You have only 24 hours in a day, limited money in your wallet, and infinite desires. Economics is not just about charts and Wall Street—it is the study of how humans make choices under scarcity.',
    hook_hi: 'आपके पास दिन में केवल 24 घंटे हैं, जेब में सीमित पैसा है और अनगिनत इच्छाएं हैं। अर्थशास्त्र केवल आंकड़ों का खेल नहीं है—यह सीमित संसाधनों के बीच सही चुनाव करने का अध्ययन है।',
    sections: [
      {
        title: 'The Core Problem: Scarcity',
        title_hi: 'मूल समस्या: संसाधनों की दुर्लभता (Scarcity)',
        content: 'Human wants are unlimited, but the resources available to satisfy them (time, land, raw materials, labor, capital) are strictly finite. Because we cannot have everything, every economic decision forces a trade-off.',
        content_hi: 'मानव की आवश्यकताएं असीमित हैं, परंतु उन्हें पूरा करने वाले साधन (समय, भूमि, श्रम, पूंजी और कच्चा माल) सीमित हैं। चूंकि हमें सब कुछ एक साथ नहीं मिल सकता, इसलिए हर आर्थिक निर्णय में एक समझौता (Trade-off) करना पड़ता है।',
        iconType: 'concept'
      },
      {
        title: 'Opportunity Cost: The Hidden Price',
        title_hi: 'अवसर लागत (Opportunity Cost): अदृश्य मूल्य',
        content: 'The Opportunity Cost of any decision is the value of the NEXT BEST alternative you gave up. If you spend 2 hours watching reels instead of studying, the opportunity cost is the knowledge, grades, or career advantage you forfeited.',
        content_hi: 'किसी भी निर्णय की अवसर लागत (Opportunity Cost) वह सर्वोत्तम विकल्प है जिसे आपने उस निर्णय के लिए छोड़ दिया। यदि आप पढ़ाई छोड़कर 2 घंटे रील्स देखने में बिताते हैं, तो उस समय की अवसर लागत वह ज्ञान या परीक्षा के अंक हैं जो आपने गंवा दिए।',
        highlight: 'There is no free lunch in economics. Everything costs the next best thing you could have done.',
        highlight_hi: 'अर्थशास्त्र में मुफ्त कुछ भी नहीं होता (There is no free lunch)। हर पसंद की एक कीमत होती है जो छोड़े गए विकल्प के बराबर होती है।',
        iconType: 'tip'
      },
      {
        title: 'The Sunk Cost Fallacy',
        title_hi: 'डूबी हुई लागत का भ्रम (Sunk Cost Fallacy)',
        content: 'A sunk cost is money or time that has already been spent and cannot be recovered. Rational decision makers ignore sunk costs and make forward-looking choices based on future costs and benefits.',
        content_hi: 'डूबी हुई लागत (Sunk Cost) वह समय या पैसा है जो खर्च हो चुका है और वापस नहीं आ सकता। समझदार निर्णयकर्ता पुरानी डूबी लागत को भूलकर केवल भविष्य के लाभ-हानि को देखकर आगे का फैसला लेते हैं।',
        iconType: 'warning'
      }
    ],
    practical_example: {
      scenario: 'You buy an expensive ₹500 movie ticket. 30 minutes in, the movie is unbearable. Should you stay or leave?',
      scenario_hi: 'आपने ₹500 का मूवी टिकट खरीदा। 30 मिनट बाद आपको फिल्म बेहद उबाऊ और खराब लगी। क्या आपको बैठे रहना चाहिए या हॉल से निकल जाना चाहिए?',
      analysis: 'The ₹500 is gone forever (sunk cost). Staying wastes 2 more hours of valuable life. Walking out saves your time for productive or enjoyable pursuits.',
      analysis_hi: 'वे ₹500 हमेशा के लिए खर्च हो चुके हैं (Sunk Cost)। जबरन बैठे रहने से आपके 2 घंटे और बर्बाद होंगे। बाहर निकलकर आप उस समय का बेहतर उपयोग कर सकते हैं।',
      actionable_tip: 'Never throw good time or money after bad decisions just because you already invested in them.',
      actionable_tip_hi: 'किसी गलत फैसले में केवल इसलिए अपना समय या पैसा न गंवाते रहें क्योंकि आप उसमें पहले ही निवेश कर चुके हैं।'
    },
    key_takeaways: [
      'Economics analyzes decision making in a world of finite resources.',
      'Opportunity Cost is the real cost of anything: the value of the foregone alternative.',
      'Sunk costs are irrecoverable and should never influence future rational choices.',
      'Every choice involves an inherent trade-off.'
    ],
    key_takeaways_hi: [
      'अर्थशास्त्र सीमित संसाधनों की दुनिया में बेहतर निर्णय लेने का विज्ञान है।',
      'अवसर लागत किसी भी विकल्प की वास्तविक कीमत है: वह सर्वश्रेष्ठ अवसर जो आपने छोड़ दिया।',
      'डूबी हुई लागत (Sunk Cost) कभी वापस नहीं आती, इसे भविष्य के निर्णयों में शामिल न करें।',
      'जीवन के हर चुनाव में एक अनिवार्य समझौता (Trade-off) शामिल होता है।'
    ]
  },
  {
    id: 'lesson-eco-2',
    topic_id: 'eco-2',
    subject_id: 'economics',
    title: 'Demand & Supply: The Market Mechanism',
    title_hi: 'मांग एवं आपूर्ति: बाजार की मूल्य प्रणाली',
    subtitle: 'How prices are discovered through the invisible dance of buyers and sellers',
    subtitle_hi: 'क्रेताओं और विक्रेताओं की परस्पर क्रिया से वस्तुओं की कीमतें कैसे तय होती हैं',
    estimated_minutes: 10,
    difficulty: 'Beginner',
    hook: 'Why do tomatoes sell for ₹20/kg during bumper harvests but skyrocket to ₹150/kg after heavy unseasonal floods? Nobody sits in an office setting prices; supply and demand do the work.',
    hook_hi: 'बंपर फसल के समय टमाटर ₹20 प्रति किलो क्यों बिकते हैं और बेमौसम बारिश व बाढ़ के बाद अचानक ₹150 प्रति किलो क्यों हो जाते हैं? कोई व्यक्ति बंद कमरे में बैठकर मूल्य तय नहीं करता, बल्कि मांग और आपूर्ति ही कीमत निर्धारित करते हैं।',
    sections: [
      {
        title: 'The Law of Demand',
        title_hi: 'मांग का नियम (Law of Demand)',
        content: 'Other things being equal, as the price of a good rises, consumer demand for it decreases. As the price falls, demand increases. This inverse relationship creates a downward-sloping demand curve.',
        content_hi: 'अन्य बातें समान रहने पर, जब किसी वस्तु की कीमत बढ़ती है, तो उपभोक्ता द्वारा उसकी मांग घट जाती है। और जब कीमत गिरती है, तो मांग बढ़ जाती है। कीमत और मांग का यह विपरीत संबंध ही मांग का नियम है।',
        iconType: 'concept'
      },
      {
        title: 'The Law of Supply',
        title_hi: 'आपूर्ति का नियम (Law of Supply)',
        content: 'From the producer perspective, higher market prices incentivize companies to produce and sell more to maximize profit. As prices drop, profit margins shrink and supply contracts.',
        content_hi: 'उत्पादकों के दृष्टिकोण से, बाजार में ऊंची कीमतें उन्हें अधिक उत्पादन करने और बेचने के लिए प्रेरित करती हैं ताकि मुनाफा बढ़ सके। कीमतें गिरने पर मार्जिन घट जाता है और आपूर्ति कम हो जाती है।',
        iconType: 'concept'
      },
      {
        title: 'Market Equilibrium: The Balance Point',
        title_hi: 'बाजार संतुलन (Market Equilibrium)',
        content: 'Where the supply and demand curves intersect is the Equilibrium Price. At this sweet spot, the quantity producers want to sell perfectly matches the quantity consumers want to buy, leaving neither shortages nor surpluses.',
        content_hi: 'जहाँ मांग और आपूर्ति की रेखाएं एक दूसरे को काटती हैं, उसे संतुलन मूल्य (Equilibrium Price) कहते हैं। इस बिंदु पर जितनी मात्रा विक्रेता बेचना चाहते हैं, ठीक उतनी ही मात्रा ग्राहक खरीदना चाहते हैं—न कोई कमी होती है न अतिरिक्त बर्बादी।',
        highlight: 'Shortages occur when prices are artificially held below equilibrium. Surpluses occur when prices are kept artificially high.',
        highlight_hi: 'जब कीमतें संतुलन स्तर से नीचे रखी जाती हैं तो बाजार में किल्लत (Shortage) होती है, और जब कीमतें बहुत ऊंची रखी जाती हैं तो माल का ढेर (Surplus) लग जाता है।',
        iconType: 'tip'
      }
    ],
    practical_example: {
      scenario: 'A major drought destroys 50% of the onion harvest. Consumer demand remains constant.',
      scenario_hi: 'भीषण सूखे के कारण प्याज की 50% फसल नष्ट हो जाती है। जबकि उपभोक्ताओं की दैनिक मांग पहले जितनी ही बनी रहती है।',
      analysis: 'Supply shifts drastically to the left, creating acute scarcity. Price spikes until demand contracts to match the reduced supply.',
      analysis_hi: 'आपूर्ति अचानक गिर जाती है जिससे तीव्र किल्लत पैदा होती है। प्याज की कीमत तब तक बढ़ती है जब तक कि ऊंची कीमतों के कारण मांग घटकर कम आपूर्ति के बराबर न हो जाए।',
      actionable_tip: 'Understanding supply cycles helps you time major purchases (e.g. buying air conditioners in winter or woolens in spring clearances).'
      ,actionable_tip_hi: 'आपूर्ति चक्र को समझकर आप बड़े सामान की समझदारी से खरीदारी कर सकते हैं (जैसे सर्दियों में एसी या गर्मियों में ऊनी कपड़े खरीदना)।'
    },
    key_takeaways: [
      'Demand drops when prices rise; supply rises when prices rise.',
      'The equilibrium price is where buyers and sellers agree without shortages or surpluses.',
      'Shifts in technology, input costs, and weather change supply.',
      'Shifts in consumer tastes, incomes, and population change demand.'
    ],
    key_takeaways_hi: [
      'कीमत बढ़ने पर मांग घटती है; कीमत बढ़ने पर उत्पादकों की आपूर्ति बढ़ती है।',
      'संतुलन मूल्य वह बिंदु है जहाँ खरीदार और विक्रेता बिना किसी किल्लत के सहमत होते हैं।',
      'तकनीक, कच्चे माल की लागत और मौसम में बदलाव आपूर्ति को प्रभावित करते हैं।',
      'उपभोक्ताओं की आय, पसंद और जनसंख्या में बदलाव मांग को बदलते हैं।'
    ]
  },
  {
    id: 'lesson-eco-3',
    topic_id: 'eco-3',
    subject_id: 'economics',
    title: 'Understanding Inflation & CPI Baskets',
    title_hi: 'महंगाई (मुद्रास्फीति) एवं सीपीआई बास्केट',
    subtitle: 'Why prices rise: demand-pull vs cost-push, and measuring the cost of living',
    subtitle_hi: 'दाम क्यों बढ़ते हैं: मांग-प्रेरित बनाम लागत-प्रेरित महंगाई, और जीवनयापन लागत का मापन',
    estimated_minutes: 10,
    difficulty: 'Beginner',
    hook: 'Last year your family could buy a full month of groceries for ₹5,000. This year the exact same groceries cost ₹5,700. What explains this 14% jump? You are experiencing inflation in action.',
    hook_hi: 'पिछले साल आपके घर का महीने भर का राशन ₹5,000 में आ जाता था। इस साल ठीक वही सामान ₹5,700 का आ रहा है। इस 14% की बढ़ोतरी का कारण क्या है? आप मुद्रास्फीति (महंगाई) के वास्तविक प्रभाव को महसूस कर रहे हैं।',
    sections: [
      {
        title: 'What is Inflation?',
        title_hi: 'मुद्रास्फीति (Inflation) क्या है?',
        content: 'Inflation is a broad, sustained increase in the general price level of goods and services across an economy over time. When inflation occurs, every unit of currency purchases fewer goods and services—reducing your purchasing power.',
        content_hi: 'मुद्रास्फीति किसी अर्थव्यवस्था में वस्तुओं और सेवाओं के सामान्य मूल्य स्तर में होने वाली निरंतर और व्यापक वृद्धि है। जब महंगाई बढ़ती है, तो मुद्रा की प्रत्येक इकाई कम सामान खरीद पाती है—अर्थात आपकी क्रय शक्ति घट जाती है।',
        highlight: 'Inflation is not just one product getting expensive; it is the overall general price level rising.',
        highlight_hi: 'महंगाई का अर्थ सिर्फ किसी एक वस्तु का महंगा होना नहीं है; यह अर्थव्यवस्था में अधिकांश चीजों के सामान्य मूल्य स्तर का बढ़ना है।',
        iconType: 'concept'
      },
      {
        title: 'The Two Main Drivers',
        title_hi: 'महंगाई के दो मुख्य कारण',
        content: '1. Demand-Pull Inflation: "Too much money chasing too few goods" (e.g. after massive stimulus when everyone wants to travel and hotels are booked out). 2. Cost-Push Inflation: Rising production costs (e.g. global crude oil spikes making transport and fertilizer more expensive, driving up food prices).',
        content_hi: '1. मांग-जनित मुद्रास्फीति (Demand-Pull): जब मांग बहुत अधिक हो और उत्पादन कम हो ("कम माल के पीछे बहुत अधिक पैसा")। 2. लागत-जनित मुद्रास्फीति (Cost-Push): जब उत्पादन लागत बढ़ जाए (जैसे कच्चे तेल के दाम बढ़ने से परिवहन और उर्वरक महंगे हो जाते हैं, जिससे खाद्यान्न के दाम बढ़ जाते हैं)।',
        iconType: 'concept'
      },
      {
        title: 'How It is Measured: The CPI Basket',
        title_hi: 'मापन की विधि: उपभोक्ता मूल्य सूचकांक (CPI बास्केट)',
        content: 'The Consumer Price Index (CPI) tracks the price change of a weighted "basket" of goods and services typically bought by households (food, fuel, housing, healthcare, education). Central banks use CPI to monitor economic health.',
        content_hi: 'उपभोक्ता मूल्य सूचकांक (CPI) एक आम परिवार द्वारा खरीदी जाने वाली वस्तुओं और सेवाओं (अनाज, ईंधन, आवास, स्वास्थ्य, शिक्षा) की एक निर्धारित "बास्केट" के मूल्यों में बदलाव को मापता है। केंद्रीय बैंक इसी आधार पर आर्थिक नीतियां बनाते हैं।',
        iconType: 'tip'
      }
    ],
    practical_example: {
      scenario: 'Global crude oil prices jump from $70 to $110 per barrel. Within weeks, truck freight rates rise, milk packets cost ₹4 more, and vegetable delivery charges increase.',
      scenario_hi: 'अंतरराष्ट्रीय स्तर पर कच्चे तेल की कीमत $70 से बढ़कर $110 प्रति बैरल हो जाती है। कुछ ही हफ्तों में ट्रकों का भाड़ा बढ़ जाता है, दूध ₹4 महंगा हो जाता है और सब्जियों की ढुलाई बढ़ जाती है।',
      analysis: 'This is classic Cost-Push inflation: transportation is an essential input across all consumer goods.',
      analysis_hi: 'यह लागत-जनित मुद्रास्फीति (Cost-Push) का सटीक उदाहरण है: परिवहन हर उत्पाद की बुनियादी लागत का हिस्सा है।',
      actionable_tip: 'To protect your future standard of living against 6-7% inflation, your income and investment portfolio must grow faster than the inflation rate.',
      actionable_tip_hi: '6-7% की महंगाई से अपने भविष्य के जीवन स्तर की रक्षा के लिए आपकी आय और निवेश पोर्टफोलियो को महंगाई दर से तेज गति से बढ़ना चाहिए।'
    },
    key_takeaways: [
      'Inflation represents the general decrease in currency purchasing power.',
      'Demand-pull occurs when buyer demand outstrips production capacity.',
      'Cost-push happens when raw materials, energy, or labor costs spike.',
      'The CPI index tracks a standardized representative basket of household items.'
    ],
    key_takeaways_hi: [
      'मुद्रास्फीति पैसे की क्रय शक्ति में निरंतर कमी को दर्शाती है।',
      'मांग-जनित महंगाई तब होती है जब खरीदारों की मांग उत्पादन क्षमता से अधिक हो जाती है।',
      'लागत-जनित महंगाई कच्चे माल, ईंधन या मजदूरी की लागत बढ़ने से होती है।',
      'सीपीआई (CPI) सूचकांक आम घरेलू वस्तुओं की प्रतिनिधि बास्केट पर नजर रखता है।'
    ]
  },
  {
    id: 'lesson-eco-4',
    topic_id: 'eco-4',
    subject_id: 'economics',
    title: 'GDP & Economic Growth Explained',
    title_hi: 'सकल घरेलू उत्पाद (GDP) एवं आर्थिक वृद्धि',
    subtitle: 'Gross Domestic Product: How the size of a nation\'s economy is calculated',
    subtitle_hi: 'सकल घरेलू उत्पाद: किसी देश की अर्थव्यवस्था का आकार और वृद्धि कैसे मापी जाती है',
    estimated_minutes: 10,
    difficulty: 'Beginner',
    hook: 'News channels celebrate when GDP expands by 7% or panic when it drops. But what does GDP actually count, and does a higher GDP mean every citizen is wealthier?',
    hook_hi: 'जब जीडीपी 7% बढ़ती है तो समाचारों में जश्न मनता है और गिरने पर चिंता जताई जाती है। लेकिन जीडीपी वास्तव में क्या मापती है, और क्या ऊंची जीडीपी का अर्थ यह है कि हर नागरिक समृद्ध हो गया?',
    sections: [
      {
        title: 'The Definition of GDP',
        title_hi: 'जीडीपी की परिभाषा',
        content: 'Gross Domestic Product (GDP) is the total monetary value of all final goods and services produced within a country\'s geographic borders during a specific period (usually a year or quarter).',
        content_hi: 'सकल घरेलू उत्पाद (GDP) एक निश्चित समय-सीमा (आमतौर पर एक वर्ष) के भीतर किसी देश की भौगोलिक सीमाओं के अंदर उत्पादित सभी अंतिम वस्तुओं और सेवाओं का कुल मौद्रिक मूल्य है।',
        highlight: 'GDP only counts FINAL goods to prevent double counting (e.g. counts the final car, not both the car AND the steel sold to the carmaker).',
        highlight_hi: 'दोहरी गणना से बचने के लिए जीडीपी में केवल "अंतिम उत्पादों" को गिना जाता है (जैसे तैयार कार का मूल्य गिना जाता है, कार और उसमें लगे स्टील का अलग-अलग नहीं)।',
        iconType: 'concept'
      },
      {
        title: 'The Expenditure Formula: C + I + G + (X - M)',
        title_hi: 'व्यय का सूत्र: C + I + G + (X - M)',
        content: 'Economists calculate GDP via 4 engines: C = Private Household Consumption, I = Business Investment (factories, machinery), G = Government Spending on infrastructure/services, (X - M) = Net Exports (Exports minus Imports).',
        content_hi: 'अर्थशास्त्री 4 इंजनों के माध्यम से जीडीपी की गणना करते हैं: C = निजी घरेलू उपभोग (Consumption), I = व्यावसायिक निवेश (Investment - कारखाने, मशीनरी), G = बुनियादी ढांचे पर सरकारी खर्च (Government Spending), (X - M) = शुद्ध निर्यात (निर्यात घटाव आयात)।',
        iconType: 'concept'
      },
      {
        title: 'Real GDP vs Nominal GDP',
        title_hi: 'वास्तविक जीडीपी बनाम नाममात्र जीडीपी',
        content: 'Nominal GDP measures output at current market prices without adjusting for inflation. Real GDP strips out inflation using constant base-year prices, showing true physical growth in goods and services produced.',
        content_hi: 'नाममात्र (Nominal) जीडीपी मौजूदा बाजार भावों पर उत्पादन को मापती है। वास्तविक (Real) जीडीपी स्थिर आधार-वर्ष की कीमतों का उपयोग करके महंगाई के असर को हटा देती है, जिससे उत्पादन की वास्तविक भौतिक वृद्धि सामने आती है।',
        iconType: 'tip'
      }
    ],
    practical_example: {
      scenario: 'A country produces 100 shirts at $10 in Year 1 (GDP = $1,000). In Year 2, it produces the same 100 shirts but inflation made them $12 (Nominal GDP = $1,200).',
      scenario_hi: 'एक देश वर्ष 1 में ₹100 की 100 शर्ट बनाता है (जीडीपी = ₹10,000)। वर्ष 2 में वह वही 100 शर्ट बनाता है लेकिन महंगाई के कारण उनकी कीमत ₹120 हो जाती है (नाममात्र जीडीपी = ₹12,000)।',
      analysis: 'Nominal GDP grew 20%, but Real GDP growth is 0% because the country produced zero additional shirts.',
      analysis_hi: 'नाममात्र जीडीपी 20% बढ़ी, लेकिन वास्तविक जीडीपी वृद्धि 0% है क्योंकि देश में एक भी अतिरिक्त शर्ट का उत्पादन नहीं हुआ।',
      actionable_tip: 'Always look at Real GDP growth figures to judge genuine economic progress.',
      actionable_tip_hi: 'अर्थव्यवस्था की सच्ची प्रगति को परखने के लिए हमेशा वास्तविक (Real) जीडीपी के आंकड़ों पर ध्यान दें।'
    },
    key_takeaways: [
      'GDP is the total market value of all final goods and services produced in a country.',
      'The 4 pillars are Consumption, Investment, Government Spending, and Net Exports.',
      'Real GDP adjusts for inflation to measure actual physical production growth.',
      'GDP per capita divides GDP by total population to estimate average living standards.'
    ],
    key_takeaways_hi: [
      'जीडीपी देश के भीतर उत्पादित सभी अंतिम वस्तुओं और सेवाओं का कुल मौद्रिक मूल्य है।',
      'जीडीपी के 4 मुख्य स्तंभ हैं: उपभोग, व्यावसायिक निवेश, सरकारी खर्च और शुद्ध निर्यात।',
      'वास्तविक जीडीपी मुद्रास्फीति को हटाकर वास्तविक उत्पादन वृद्धि को दर्शाती है।',
      'प्रति व्यक्ति जीडीपी (GDP per capita) औसत जीवन स्तर का आकलन करने में मदद करती है।'
    ]
  },
  {
    id: 'lesson-eco-5',
    topic_id: 'eco-5',
    subject_id: 'economics',
    title: 'Unemployment & Labor Dynamics',
    title_hi: 'बेरोजगारी एवं श्रम बाजार की गतिशीलता',
    subtitle: 'Understanding the labor force, structural shifts, and cyclical job trends',
    subtitle_hi: 'श्रम बल, संरचनात्मक बदलाव और आर्थिक चक्रों में रोजगार के रुझान',
    estimated_minutes: 10,
    difficulty: 'Intermediate',
    hook: 'If someone is not working, are they automatically counted as unemployed? Not in economic terms. Understanding labor statistics reveals how job markets actually work.',
    hook_hi: 'यदि कोई व्यक्ति काम नहीं कर रहा है, तो क्या वह आर्थिक रूप से बेरोजगार माना जाएगा? अर्थशास्त्र की परिभाषा में नहीं। श्रम आंकड़ों की समझ से पता चलता है कि रोजगार बाजार वास्तव में कैसे काम करता है।',
    sections: [
      {
        title: 'Who is Economically Unemployed?',
        title_hi: 'आर्थिक दृष्टि से बेरोजगार कौन है?',
        content: 'An unemployed person is someone who is in the working-age population, actively seeking a job, but unable to find work. Students, retirees, and discouraged workers who gave up looking are classified as "out of the labor force", not unemployed.',
        content_hi: 'बेरोजगार वह व्यक्ति है जो कामकाजी आयु वर्ग में है, सक्रिय रूप से नौकरी की तलाश कर रहा है, लेकिन उसे काम नहीं मिल रहा। विद्यार्थी, सेवानिवृत्त लोग या जिन्होंने नौकरी खोजना ही बंद कर दिया है, उन्हें "श्रम बल से बाहर" माना जाता है, बेरोजगार नहीं।',
        iconType: 'concept'
      },
      {
        title: 'The 3 Main Types of Unemployment',
        title_hi: 'बेरोजगारी के 3 प्रमुख प्रकार',
        content: '1. Frictional: Temporary transition while moving between jobs or graduating. 2. Structural: A mismatch between workers\' skills and market demands (e.g. AI replacing manual data entry). 3. Cyclical: Caused by overall economic downturns and recessions.',
        content_hi: '1. घर्षणजन्य (Frictional): नौकरी बदलने या पढ़ाई पूरी करने के दौरान का अस्थायी खाली समय। 2. संरचनात्मक (Structural): श्रमिकों के हुनर और बाजार की जरूरत के बीच का बेमेल (जैसे एआई आने से डेटा एंट्री ऑपरेटरों की मांग घटना)। 3. चक्रीय (Cyclical): आर्थिक मंदी के कारण आने वाली गिरावट।',
        highlight: 'Structural unemployment requires reskilling, while cyclical unemployment requires macroeconomic stimulus.',
        highlight_hi: 'संरचनात्मक बेरोजगारी को दूर करने के लिए नए कौशल (Re-skilling) की जरूरत होती है, जबकि चक्रीय मंदी के लिए सरकारी प्रोत्साहन चाहिए।',
        iconType: 'tip'
      }
    ],
    practical_example: {
      scenario: 'An assembly line automates robotic welding. 200 manual welders lose jobs while the plant hires 20 robotics software technicians.',
      scenario_hi: 'एक ऑटोमोबाइल फैक्ट्री में रोबोटिक वेल्डिंग शुरू होती है। 200 पारंपरिक वेल्डरों की नौकरी चली जाती है जबकि फैक्ट्री 20 रोबोटिक्स सॉफ्टवेयर इंजीनियर रखती है।',
      analysis: 'This is structural unemployment: total jobs might exist, but the required skill set has fundamentally changed.',
      analysis_hi: 'यह संरचनात्मक बेरोजगारी (Structural Unemployment) है: बाजार में काम है, परंतु आवश्यक कौशल पूरी तरह बदल चुका है।',
      actionable_tip: 'Continuous learning and skill updating are your best insurance against structural obsolescence.',
      actionable_tip_hi: 'लगातार नई तकनीकें सीखना और खुद को अपग्रेड करना ही करियर में अप्रचलित होने से बचने का सबसे बड़ा उपाय है।'
    },
    key_takeaways: [
      'Unemployment measures active job seekers without work relative to the total labor force.',
      'Frictional unemployment is normal and healthy during career transitions.',
      'Structural unemployment stems from technological shifts and skill mismatches.',
      'Cyclical unemployment rises during economic recessions and falls in booms.'
    ],
    key_takeaways_hi: [
      'बेरोजगारी की दर कुल श्रम बल में से सक्रिय रूप से नौकरी तलाश रहे लोगों का अनुपात है।',
      'घर्षणजन्य बेरोजगारी करियर में बदलाव के दौरान सामान्य और स्वाभाविक होती है।',
      'संरचनात्मक बेरोजगारी तकनीकी परिवर्तनों और कौशलों के असंतुलन से पैदा होती है।',
      'चक्रीय बेरोजगारी मंदी में बढ़ती है और आर्थिक तेजी के दौर में घट जाती है।'
    ]
  },
  {
    id: 'lesson-eco-6',
    topic_id: 'eco-6',
    subject_id: 'economics',
    title: 'Central Banks & The Repo Rate',
    title_hi: 'केंद्रीय बैंक एवं रेपो दर (Repo Rate)',
    subtitle: 'How central bank interest decisions directly impact your home loan and FD returns',
    subtitle_hi: 'आरबीआई के ब्याज फैसलों का आपके होम लोन की ईएमआई और एफडी रिटर्न पर सीधा प्रभाव',
    estimated_minutes: 10,
    difficulty: 'Intermediate',
    hook: 'When the RBI or US Federal Reserve changes interest rates by just 0.25%, global stock markets sway and millions of mortgage payments adjust. Why does this single lever carry such immense power?',
    hook_hi: 'जब आरबीआई या अमेरिकी फेडरल रिजर्व ब्याज दरों में महज 0.25% का बदलाव करते हैं, तो शेयर बाजारों में हलचल मच जाती है और करोड़ों लोगों के होम लोन बदल जाते हैं। इस एक फैसले में इतनी बड़ी ताकत क्यों है?',
    sections: [
      {
        title: 'What is the Repo Rate?',
        title_hi: 'रेपो रेट क्या है?',
        content: 'The Repo Rate (Repurchase Rate) is the interest rate at which the Central Bank (like RBI in India) lends short-term money to commercial banks against government securities. It is the baseline benchmark for the entire financial system.',
        content_hi: 'रेपो रेट (Repurchase Rate) वह ब्याज दर है जिस पर केंद्रीय बैंक (जैसे भारत में RBI) वाणिज्यिक बैंकों को सरकारी प्रतिभूतियों के बदले अल्पकालिक नकदी उधार देता है। यह पूरी बैंकिंग प्रणाली का मुख्य आधार है।',
        iconType: 'concept'
      },
      {
        title: 'The Rate Hike Mechanism (Fighting Inflation)',
        title_hi: 'ब्याज दरें बढ़ाने की प्रणाली (महंगाई पर लगाम)',
        content: 'When inflation runs too hot, the central bank RAISES the repo rate. Commercial banks pass this hike to borrowers: home loans, car loans, and business credits get more expensive. People borrow and spend less, cooling down demand and lowering inflation.',
        content_hi: 'जब महंगाई बहुत बढ़ जाती है, तो केंद्रीय बैंक रेपो रेट बढ़ा देता है। बैंक भी अपने ग्राहकों के लिए होम लोन, कार लोन महंगा कर देते हैं। लोग कर्ज कम लेते हैं और खर्च घटाते हैं, जिससे मांग ठंडी होती है और महंगाई काबू में आती है।',
        highlight: 'When repo rates go up, loan EMIs rise, but Fixed Deposit interest rates also increase.',
        highlight_hi: 'जब रेपो रेट बढ़ता है, तो लोन की ईएमआई महंगी हो जाती है, लेकिन बैंक में एफडी (Fixed Deposit) पर मिलने वाला ब्याज भी बढ़ जाता है।',
        iconType: 'tip'
      },
      {
        title: 'The Rate Cut Mechanism (Boosting Growth)',
        title_hi: 'ब्याज दरें घटाने की प्रणाली (आर्थिक विकास को गति)',
        content: 'During economic slowdowns or recessions, the central bank CUTS interest rates. Borrowing becomes cheap, encouraging businesses to build factories and consumers to buy homes, stimulating GDP growth.',
        content_hi: 'आर्थिक सुस्ती या मंदी के समय केंद्रीय बैंक ब्याज दरों में कटौती करता है। कर्ज सस्ता होने से कंपनियां नए कारखाने लगाती हैं और लोग घर खरीदते हैं, जिससे आर्थिक विकास को रफ्तार मिलती है।',
        iconType: 'concept'
      }
    ],
    practical_example: {
      scenario: 'RBI hikes the repo rate by 100 bps (1.0%). A family\'s floating home loan interest rate moves from 8.0% to 9.0%.',
      scenario_hi: 'आरबीआई ने रेपो रेट में 1% (100 आधार अंक) की बढ़ोतरी की। एक परिवार के फ्लोटिंग होम लोन की ब्याज दर 8% से बढ़कर 9% हो गई।',
      analysis: 'Their monthly EMI increases or their total loan tenure extends by 4 years, reducing discretionary household spending.',
      analysis_hi: 'उनकी मासिक ईएमआई बढ़ जाती है या लोन की अवधि 4 साल बढ़ जाती है, जिससे परिवार के अन्य गैर-जरूरी खर्चों में कटौती होती है।',
      actionable_tip: 'When interest rates are rising, make prepayments towards your loan principal to prevent tenure extension.',
      actionable_tip_hi: 'ब्याज दरें बढ़ने के दौर में अपने लोन के मूलधन का समय-समय पर आंशिक भुगतान करें ताकि लोन की अवधि न बढ़े।'
    },
    key_takeaways: [
      'The Repo Rate is the key interest rate set by the central bank for commercial banks.',
      'Rate hikes cool runaway inflation by making borrowing more expensive.',
      'Rate cuts stimulate sluggish economic growth by making credit cheap.',
      'Central banks walk a fine line balancing low inflation with healthy economic growth.'
    ],
    key_takeaways_hi: [
      'रेपो रेट केंद्रीय बैंक द्वारा वाणिज्यिक बैंकों के लिए तय की जाने वाली मुख्य बेंचमार्क दर है।',
      'ब्याज दरें बढ़ाकर कर्ज महंगा किया जाता है ताकि बेकाबू महंगाई पर लगाम लग सके।',
      'ब्याज दरें घटाकर अर्थव्यवस्था में कर्ज और निवेश को बढ़ावा दिया जाता है।',
      'केंद्रीय बैंक कम महंगाई और उच्च आर्थिक वृद्धि के बीच संतुलन साधने का काम करते हैं।'
    ]
  },
  {
    id: 'lesson-eco-7',
    topic_id: 'eco-7',
    subject_id: 'economics',
    title: 'Monetary Policy & Money Supply',
    title_hi: 'मौद्रिक नीति एवं मुद्रा आपूर्ति (Money Supply)',
    subtitle: 'How fractional reserve banking and open market operations expand credit',
    subtitle_hi: 'आंशिक आरक्षित बैंकिंग और खुले बाजार की प्रक्रियाओं से साख का विस्तार कैसे होता है',
    estimated_minutes: 10,
    difficulty: 'Intermediate',
    hook: 'Did you know that over 90% of the money circulating in a modern economy does not exist as physical cash printed by the government, but was created digitally through commercial bank loans?',
    hook_hi: 'क्या आप जानते हैं कि आधुनिक अर्थव्यवस्था में घूमने वाले 90% से अधिक पैसे सरकारी प्रिंटिंग प्रेस से छपे हुए नोट नहीं हैं, बल्कि बैंकों द्वारा दिए गए डिजिटल ऋणों से उत्पन्न हुए हैं?',
    sections: [
      {
        title: 'Fractional Reserve Banking',
        title_hi: 'आंशिक आरक्षित बैंकिंग (Fractional Reserve Banking)',
        content: 'When you deposit ₹10,000 in a bank, the bank does not lock it in a vault. Under Cash Reserve Ratio (CRR) rules, it holds a small fraction (e.g. 4.5% or ₹450) and lends out the remaining ₹9,550 to someone else, who deposits it in another bank. This creates the "Money Multiplier" effect.',
        content_hi: 'जब आप बैंक में ₹10,000 जमा करते हैं, तो बैंक उसे तिजोरी में बंद नहीं रखता। नकद आरक्षित अनुपात (CRR) के तहत वह एक छोटा हिस्सा (जैसे 4.5% या ₹450) अपने पास रखकर बाकी ₹9,550 किसी अन्य को लोन दे देता है। यही प्रक्रिया "मुद्रा गुणक (Money Multiplier)" प्रभाव पैदा करती है।',
        iconType: 'concept'
      },
      {
        title: 'Quantitative Easing & Tightening',
        title_hi: 'क्वांटिटेटिव ईजिंग (QE) एवं टाइटनिंग (QT)',
        content: 'In severe crises, central banks inject liquidity directly by purchasing government bonds from the open market (Quantitative Easing or QE). When liquidity is excessive, they sell bonds to soak up surplus cash (Quantitative Tightening).',
        content_hi: 'गंभीर संकट में केंद्रीय बैंक खुले बाजार से सरकारी बॉन्ड खरीदकर सीधे बाजार में नकदी डालते हैं (QE)। जब नकदी बहुत अधिक हो जाए, तो वे बॉन्ड बेचकर बाजार से अतिरिक्त नकदी सोख लेते हैं (QT)।',
        highlight: 'Excessive unchecked money printing without corresponding economic output inevitably triggers hyperinflation.',
        highlight_hi: 'बिना वास्तविक उत्पादन बढ़ाए अनियंत्रित रूप से नोट छापने या नकदी डालने से भारी मुद्रास्फीति (Hyperinflation) पैदा हो जाती है।',
        iconType: 'warning'
      }
    ],
    practical_example: {
      scenario: 'In response to the 2020 pandemic crash, global central banks expanded money supply by trillions of dollars.',
      scenario_hi: '2020 की वैश्विक महामारी के दौरान दुनिया भर के केंद्रीय बैंकों ने खरबों डॉलर की अतिरिक्त नकदी बाजार में झोंकी।',
      analysis: 'This prevented financial collapse, but later contributed to a worldwide surge in consumer price inflation in 2022-2023.',
      analysis_hi: 'इसने वित्तीय व्यवस्था को ढहने से तो बचा लिया, लेकिन बाद में 2022-2023 में दुनिया भर में अभूतपूर्व महंगाई का कारण बना।',
      actionable_tip: 'Monitor central bank liquidity announcements to understand broad stock market and bond trends.',
      actionable_tip_hi: 'शेयर बाजार और बॉन्ड के बड़े रुझानों को समझने के लिए केंद्रीय बैंकों के लिक्विडिटी निर्णयों पर नजर रखें।'
    },
    key_takeaways: [
      'Commercial banks create money through the fractional reserve lending process.',
      'Cash Reserve Ratio (CRR) mandates the percentage of deposits banks must keep with the central bank.',
      'Open Market Operations (buying/selling bonds) manage system-wide liquidity.',
      'Uncontrolled growth in money supply debases the value of the currency.'
    ],
    key_takeaways_hi: [
      'वाणिज्यिक बैंक आंशिक आरक्षित प्रणाली के तहत कर्ज देकर नई मुद्रा का सृजन करते हैं।',
      'कैश रिजर्व रेशियो (CRR) वह अनिवार्य हिस्सा है जो बैंकों को आरबीआई के पास रखना होता है।',
      'ओपन मार्केट ऑपरेशंस (बॉन्ड की खरीद-फरोख्त) के जरिए बाजार में नकदी को संतुलित किया जाता है।',
      'मुद्रा आपूर्ति में अनियंत्रित वृद्धि से मुद्रा का आंतरिक मूल्य गिर जाता है।'
    ]
  },
  {
    id: 'lesson-eco-8',
    topic_id: 'eco-8',
    subject_id: 'economics',
    title: 'Fiscal Policy & Government Deficits',
    title_hi: 'राजकोषीय नीति एवं सरकारी घाटा',
    subtitle: 'Taxes, public infrastructure spending, debt, and the annual budget',
    subtitle_hi: 'कर प्रणाली, बुनियादी ढांचा व्यय, सार्वजनिक ऋण और वार्षिक बजट',
    estimated_minutes: 10,
    difficulty: 'Intermediate',
    hook: 'Every year, the Finance Minister presents the Union Budget. While Monetary Policy is run by the independent Central Bank, Fiscal Policy is run directly by the elected Government.',
    hook_hi: 'हर साल वित्त मंत्री संसद में केंद्रीय बजट पेश करते हैं। जहां मौद्रिक नीति स्वतंत्र केंद्रीय बैंक चलाता है, वहीं राजकोषीय नीति (Fiscal Policy) सीधे चुनी हुई सरकार द्वारा चलाई जाती है।',
    sections: [
      {
        title: 'What is Fiscal Policy?',
        title_hi: 'राजकोषीय नीति क्या है?',
        content: 'Fiscal policy refers to government decisions regarding Taxation (revenue collection) and Public Expenditure (spending on defense, highways, railways, subsidies, healthcare, and education).',
        content_hi: 'राजकोषीय नीति से तात्पर्य सरकार द्वारा कर वसूली (राजस्व) और सार्वजनिक व्यय (सड़क, रेलवे, रक्षा, सब्सिडी, स्वास्थ्य व शिक्षा पर खर्च) से संबंधित लिए जाने वाले निर्णयों से है।',
        iconType: 'concept'
      },
      {
        title: 'Fiscal Deficit Explained',
        title_hi: 'राजकोषीय घाटा (Fiscal Deficit) क्या है?',
        content: 'When government total expenditure exceeds total revenue (excluding borrowings), the gap is called the Fiscal Deficit. Governments fund this deficit by borrowing money through Sovereign Bonds from domestic investors, banks, and foreign institutions.',
        content_hi: 'जब सरकार का कुल खर्च उसकी कुल आय (उधार को छोड़कर) से अधिक हो जाता है, तो उस अंतर को राजकोषीय घाटा कहते हैं। सरकार बॉन्ड जारी करके घरेलू निवेशकों और बैंकों से उधारी लेकर इस घाटे की भरपाई करती है।',
        highlight: 'A moderate fiscal deficit (3-4% of GDP) invested in productive capital infrastructure boosts long-term GDP.',
        highlight_hi: 'जीडीपी का 3-4% का नियंत्रित राजकोषीय घाटा यदि बुनियादी ढांचे (Capex) पर खर्च हो, तो वह भविष्य के आर्थिक विकास को गति देता है।',
        iconType: 'tip'
      },
      {
        title: 'Capital Expenditure (Capex) vs Revenue Expenditure',
        title_hi: 'पूंजीगत व्यय (Capex) बनाम राजस्व व्यय (Revenue Expenditure)',
        content: 'Capex builds durable assets (airports, expressways, power grids) that generate future returns. Revenue expenditure pays ongoing operational costs (salaries, pensions, interest on past loans). High Capex creates higher multiplier benefits for the economy.',
        content_hi: 'पूंजीगत व्यय (Capex) स्थायी संपत्तियां बनाता है (जैसे एक्सप्रेसवे, बंदरगाह, बिजली ग्रिड) जो भविष्य में आय देते हैं। राजस्व व्यय रोजमर्रा के प्रशासनिक खर्चे (वेतन, पेंशन, पुराने कर्ज का ब्याज) चुकाता है।',
        iconType: 'concept'
      }
    ],
    practical_example: {
      scenario: 'The government allocates ₹10 Lakh Crores to build dedicated freight railway corridors and highway networks.',
      scenario_hi: 'सरकार रेलवे फ्रेट कॉरिडोर और आधुनिक नेशनल हाईवे नेटवर्क बनाने के लिए ₹10 लाख करोड़ आवंटित करती है।',
      analysis: 'This Capital Expenditure reduces logistics costs for all businesses, making domestic goods globally competitive for decades.',
      analysis_hi: 'यह पूंजीगत व्यय (Capex) सभी उद्योगों की ढुलाई लागत कम करता है, जिससे घरेलू उत्पाद दशकों तक वैश्विक बाजार में प्रतिस्पर्धी बनते हैं।',
      actionable_tip: 'Pay attention to Capex allocations in the national budget to identify fast-growing economic sectors.',
      actionable_tip_hi: 'बजट में पूंजीगत खर्च (Capex) के आवंटन को देखकर आप समझ सकते हैं कि आने वाले वर्षों में कौन से उद्योग सबसे तेज बढ़ेंगे।'
    },
    key_takeaways: [
      'Fiscal policy is managed by the government through taxation and spending.',
      'Fiscal deficit is the annual shortfall funded by sovereign market borrowing.',
      'Capital expenditure (Capex) builds productive infrastructure that generates future growth.',
      'Excessive unproductive fiscal deficits lead to high debt burdens and sovereign rating downgrades.'
    ],
    key_takeaways_hi: [
      'राजकोषीय नीति सरकार द्वारा करों और बजट खर्च के माध्यम से संचालित होती है।',
      'राजकोषीय घाटा वार्षिक राजस्व की कमी है जिसकी भरपाई सरकारी उधारी से की जाती है।',
      'पूंजीगत व्यय (Capex) उत्पादक परिसंपत्तियों का निर्माण करके दीर्घकालिक समृद्धि लाता है।',
      'अनुत्पादक कार्यों के लिए अत्यधिक सरकारी घाटा देश पर कर्ज का बोझ और महंगाई बढ़ाता है।'
    ]
  },
  {
    id: 'lesson-eco-9',
    topic_id: 'eco-9',
    subject_id: 'economics',
    title: 'Recessions & The Business Cycle',
    title_hi: 'आर्थिक मंदी एवं व्यापार चक्र (Business Cycle)',
    subtitle: 'Why economies expand and contract, yield curves, and recession readiness',
    subtitle_hi: 'अर्थव्यवस्था में उछाल और मंदी के चक्र, यील्ड कर्व, और मंदी से निपटने की तैयारी',
    estimated_minutes: 10,
    difficulty: 'Advanced',
    hook: 'Economic growth is never a straight upward line. Free-market economies naturally flow through predictable cycles of expansion, peak, contraction (recession), and trough.',
    hook_hi: 'आर्थिक वृद्धि कभी भी सीधी ऊपर जाने वाली रेखा नहीं होती। मुक्त बाजार अर्थव्यवस्थाएं स्वाभाविक रूप से तेजी, शीर्ष, मंदी (गिरावट) और सुधार के चक्रों से होकर गुजरती हैं।',
    sections: [
      {
        title: 'What Constitutes a Recession?',
        title_hi: 'आर्थिक मंदी (Recession) की परिभाषा',
        content: 'A technical recession is commonly defined as two consecutive quarters (6 months) of negative Real GDP growth. During recessions, consumer spending slows, business revenues drop, hiring freezes, and unemployment increases.',
        content_hi: 'तकनीकी रूप से लगातार दो तिमाहियों (6 महीने) तक वास्तविक जीडीपी में नकारात्मक वृद्धि (गिरावट) को मंदी कहा जाता है। मंदी के दौरान उपभोक्ता खर्च घट जाता है, कंपनियों का राजस्व गिरता है और नौकरियां घटती हैं।',
        iconType: 'concept'
      },
      {
        title: 'The Inverted Yield Curve Indicator',
        title_hi: 'उल्टा यील्ड कर्व (Inverted Yield Curve) का संकेत',
        content: 'Normally, lending money for 10 years pays a higher interest rate than lending for 2 years. When 2-year bond yields rise ABOVE 10-year yields (an Inverted Yield Curve), bond markets are signaling high risk of an upcoming recession within 12-18 months.',
        content_hi: 'सामान्य तौर पर 10 साल के कर्ज पर 2 साल के कर्ज से अधिक ब्याज मिलता है। जब 2 साल के बॉन्ड की यील्ड 10 साल के बॉन्ड से ऊपर निकल जाती है (Inverted Yield Curve), तो यह संकेत होता है कि आने वाले 12-18 महीनों में मंदी आ सकती है।',
        highlight: 'The inverted yield curve has accurately preceded almost every modern recession.',
        highlight_hi: 'इतिहास में लगभग हर आधुनिक मंदी से पहले उलटे यील्ड कर्व (Inverted Yield Curve) का संकेत देखा गया है।',
        iconType: 'tip'
      },
      {
        title: 'Recession Proofing Your Life',
        title_hi: 'मंदी के लिए व्यक्तिगत सुरक्षा कवच',
        content: 'You cannot prevent a macroeconomic recession, but you can build resilience: 1. Maintain 6 months of liquid emergency funds, 2. Keep debt levels low, 3. Develop high-demand transferable skills, 4. Continue long-term dollar-cost averaging in broad index funds when others panic.',
        content_hi: 'आप देश की मंदी नहीं रोक सकते, लेकिन खुद को तैयार कर सकते हैं: 1. 6 महीने का इमरजेंसी फंड, 2. कम से कम कर्ज, 3. उच्च मांग वाले कौशल, 4. जब दूसरे घबरा रहे हों तब भी इंडेक्स फंड्स में नियमित एसआईपी जारी रखना।',
        iconType: 'concept'
      }
    ],
    practical_example: {
      scenario: 'During the 2008 or 2020 economic downturns, stock markets fell by 30-40%. Disciplined investors who kept investing monthly through SIPs achieved massive wealth multiplication over the following decade.',
      scenario_hi: '2008 या 2020 की मंदी के दौरान शेयर बाजारों में 30-40% की भारी गिरावट आई। जिन अनुशासित निवेशकों ने घबराने के बजाय एसआईपी जारी रखी, उन्होंने अगले दशक में भारी मुनाफा कमाया।',
      analysis: 'Recessions offer generational asset buying opportunities for those with cash reserves and job stability.',
      analysis_hi: 'जिनके पास नकद सुरक्षा और स्थिर नौकरी होती है, उनके लिए मंदी कम दामों पर बेहतरीन संपत्तियां खरीदने का सुनहरा अवसर बनती है।',
      actionable_tip: 'Never panic-sell your long-term equity portfolio during a recession.',
      actionable_tip_hi: 'मंदी के चरम पर घबराकर अपने दीर्घकालिक निवेश को नुकसान में कभी न बेचें।'
    },
    key_takeaways: [
      'Business cycles consist of expansion, peak, recession, and recovery phases.',
      'A technical recession means two consecutive quarters of contracting real GDP.',
      'Inverted yield curves often signal incoming economic downturns.',
      'Emergency savings and low fixed debt provide the ultimate individual recession armor.'
    ],
    key_takeaways_hi: [
      'व्यापार चक्र में विस्तार, चरम, मंदी और पुनरुत्थान के चरण शामिल होते हैं।',
      'लगातार दो तिमाहियों तक वास्तविक जीडीपी का घटना तकनीकी मंदी कहलाता है।',
      'बॉन्ड बाजार में उल्टा यील्ड कर्व अक्सर आने वाली मंदी का पूर्व संकेत होता है।',
      'इमरजेंसी फंड और शून्य बुरा कर्ज ही मंदी में सबसे बड़ा रक्षा कवच हैं।'
    ]
  },
  {
    id: 'lesson-eco-10',
    topic_id: 'eco-10',
    subject_id: 'economics',
    title: 'Foreign Exchange & Trade Balances',
    title_hi: 'विदेशी मुद्रा विनिमय एवं व्यापार संतुलन',
    subtitle: 'Why currencies strengthen or depreciate and how imports/exports impact everyday life',
    subtitle_hi: 'मुद्रा का मूल्य क्यों घटता-बढ़ता है और आयात-निर्यात का हमारे रोजमर्रा के जीवन पर असर',
    estimated_minutes: 10,
    difficulty: 'Advanced',
    hook: 'Why does the exchange rate of 1 USD vs INR fluctuate, and does a weaker domestic currency always harm the economy or can it help domestic exporters?',
    hook_hi: 'डॉलर के मुकाबले रुपये की कीमत में उतार-चढ़ाव क्यों होता है, और क्या कमजोर घरेलू मुद्रा हमेशा नुकसानदेह होती है या यह देश के निर्यातकों के लिए फायदेमंद भी हो सकती है?',
    sections: [
      {
        title: 'What Determines Exchange Rates?',
        title_hi: 'विनिमय दर (Exchange Rate) कैसे तय होती है?',
        content: 'In floating exchange rate regimes, a currency\'s value is determined by global supply and demand. Demand for a currency rises when foreign investors invest in domestic stock markets, when foreign buyers buy domestic exports, or when interest rates are attractive.',
        content_hi: 'मुद्रा का मूल्य अंतरराष्ट्रीय बाजार में मांग और आपूर्ति से तय होता है। जब विदेशी निवेशक देश में निवेश लाते हैं या विदेशी खरीदार देश का माल (निर्यात) खरीदते हैं, तो घरेलू मुद्रा की मांग बढ़ती है और वह मजबूत होती है।',
        iconType: 'concept'
      },
      {
        title: 'Current Account Deficit (CAD)',
        title_hi: 'चालू खाता घाटा (Current Account Deficit)',
        content: 'If a country imports more goods and services (like crude oil, electronics, and gold) than it exports, it has a trade deficit. To pay for the excess imports, it must sell its domestic currency and buy foreign currencies (like USD), creating downward pressure on the local currency.',
        content_hi: 'यदि कोई देश अपने निर्यात की तुलना में अधिक आयात (जैसे कच्चा तेल, सोना, इलेक्ट्रॉनिक्स) करता है, तो उसे व्यापार घाटा होता है। इन आयातों का भुगतान करने के लिए घरेलू मुद्रा बेचकर डॉलर खरीदना पड़ता है, जिससे रुपये पर दबाव आता है।',
        highlight: 'A weaker currency makes imported goods (like fuel and smartphones) more expensive, but makes domestic software and textile exports cheaper and more competitive globally.',
        highlight_hi: 'कमजोर मुद्रा से आयातित सामान (ईंधन, इलेक्ट्रॉनिक्स) महंगे होते हैं, परंतु हमारे देश के सॉफ्टवेयर और कपड़ा निर्यात वैश्विक बाजार में सस्ते और प्रतिस्पर्धी बनते हैं।',
        iconType: 'tip'
      },
      {
        title: 'Foreign Exchange Reserves (Forex)',
        title_hi: 'विदेशी मुद्रा भंडार (Forex Reserves)',
        content: 'Central banks hold billions of dollars in foreign currencies, gold, and US Treasuries. These Forex reserves provide a buffer to prevent sudden currency crashes and guarantee payments for essential imports during global crises.',
        content_hi: 'केंद्रीय बैंक अरबों डॉलर की विदेशी मुद्राएं, सोना और सरकारी बॉन्ड अपने पास रखते हैं। यह विदेशी मुद्रा भंडार संकट के समय मुद्रा को अचानक टूटने से बचाता है और जरूरी आयातों का भुगतान सुनिश्चित करता है।',
        iconType: 'concept'
      }
    ],
    practical_example: {
      scenario: 'The US Dollar strengthens from ₹80 to ₹86. A laptop manufacturer assembling laptops in India using imported chips must pay more for parts.',
      scenario_hi: 'डॉलर ₹80 से बढ़कर ₹86 हो जाता है। भारत में आयातित चिप्स का उपयोग करके लैपटॉप बनाने वाली कंपनी को पार्ट्स के लिए अधिक रुपये देने पड़ते हैं।',
      analysis: 'Imported electronic gadgets become more expensive for consumers. Simultaneously, an Indian IT company billing clients in USD earns higher rupee revenue for the same software services.',
      analysis_hi: 'उपभोक्ताओं के लिए इलेक्ट्रॉनिक्स महंगे हो जाते हैं। दूसरी ओर, डॉलर में बिलिंग करने वाली भारतीय आईटी कंपनियों को उसी काम के लिए रुपये में अधिक कमाई होती है।',
      actionable_tip: 'Countries that build self-reliance in energy and high-tech manufacturing protect their currency value over the long run.'
      ,actionable_tip_hi: 'ऊर्जा और उच्च तकनीक में आत्मनिर्भर बनने वाले देश ही लंबी अवधि में अपनी मुद्रा की मजबूती बनाए रख सकते हैं।'
    },
    key_takeaways: [
      'Exchange rates reflect global trade flows, capital investments, and interest rate differentials.',
      'Trade deficits put downward pressure on a country\'s currency.',
      'Currency depreciation increases import costs but aids export competitiveness.',
      'Adequate Forex reserves safeguard economic stability against global financial shocks.'
    ],
    key_takeaways_hi: [
      'विनिमय दरें अंतरराष्ट्रीय व्यापार प्रवाह, पूंजी निवेश और ब्याज दरों के अंतर को दर्शाती हैं।',
      'लगातार व्यापार घाटा बने रहने से देश की मुद्रा कमजोर होती है।',
      'मुद्रा की गिरावट से आयात महंगे होते हैं परंतु निर्यात को बढ़ावा मिलता है।',
      'मजबूत विदेशी मुद्रा भंडार देश को वैश्विक वित्तीय झटकों से सुरक्षित रखता है।'
    ]
  }
];

export const ECONOMICS_QUESTIONS: Question[] = [
  // Lesson 1 questions
  {
    id: 'q-eco-1-1',
    lesson_id: 'lesson-eco-1',
    subject_id: 'economics',
    question: 'What is "Opportunity Cost" in economics?',
    question_hi: 'अर्थशास्त्र में "अवसर लागत (Opportunity Cost)" किसे कहते हैं?',
    option_a: 'The accounting price of a product',
    option_a_hi: 'किसी वस्तु का बहीखाता मूल्य',
    option_b: 'The value of the next best alternative given up when making a decision',
    option_b_hi: 'कोई निर्णय लेते समय त्यागे गए अगले सर्वोत्तम विकल्प का मूल्य',
    option_c: 'The cost of opening a new business opportunity',
    option_c_hi: 'नया व्यवसाय शुरू करने की लागत',
    option_d: 'The discounts offered during festive sales',
    option_d_hi: 'त्योहारी सेल में मिलने वाली छूट',
    correct_answer: 'B',
    explanation: 'Opportunity cost is the highest-value option sacrificed when making any choice under resource constraints.',
    explanation_hi: 'अवसर लागत वह सर्वोत्तम विकल्प है जिसे सीमित संसाधनों के कारण किसी अन्य विकल्प को चुनने पर छोड़ना पड़ता है।'
  },
  {
    id: 'q-eco-1-2',
    lesson_id: 'lesson-eco-1',
    subject_id: 'economics',
    question: 'What is the "Sunk Cost Fallacy"?',
    question_hi: '"डूबी हुई लागत का भ्रम (Sunk Cost Fallacy)" क्या है?',
    option_a: 'Failing to invest in maritime shipping',
    option_a_hi: 'समुद्री जहाजरानी में निवेश करने में विफलता',
    option_b: 'Continuing a failing activity merely because you have already invested unrecoverable time or money into it',
    option_b_hi: 'किसी नुकसानदेह कार्य को केवल इसलिए जारी रखना क्योंकि उसमें पहले ही गैर-वापसी योग्य समय या धन लग चुका है',
    option_c: 'Ignoring future investment gains',
    option_c_hi: 'भविष्य के निवेश लाभ को नजरअंदाज करना',
    option_d: 'Underestimating tax obligations',
    option_d_hi: 'टैक्स देनदारियों का कम आकलन करना',
    correct_answer: 'B',
    explanation: 'The sunk cost fallacy occurs when past unrecoverable costs improperly dictate future rational choices.',
    explanation_hi: 'यह भ्रम तब होता है जब अतीत में डूबी हुई लागत भविष्य के विवेकपूर्ण निर्णयों को गलत तरीके से प्रभावित करने लगती है।'
  },

  // Lesson 2 questions
  {
    id: 'q-eco-2-1',
    lesson_id: 'lesson-eco-2',
    subject_id: 'economics',
    question: 'According to the Law of Demand, what happens to consumer quantity demanded when the price of a good rises (ceteris paribus)?',
    question_hi: 'मांग के नियम के अनुसार, अन्य बातें समान रहने पर जब किसी वस्तु की कीमत बढ़ती है तो मांगी जाने वाली मात्रा पर क्या प्रभाव पड़ता है?',
    option_a: 'Quantity demanded increases',
    option_a_hi: 'मांगी जाने वाली मात्रा बढ़ जाती है',
    option_b: 'Quantity demanded decreases',
    option_b_hi: 'मांगी जाने वाली मात्रा घट जाती है',
    option_c: 'Quantity demanded remains exactly identical',
    option_c_hi: 'मांग में कोई परिवर्तन नहीं होता',
    option_d: 'Quantity supplied instantly falls to zero',
    option_d_hi: 'आपूर्ति तुरंत शून्य हो जाती है',
    correct_answer: 'B',
    explanation: 'The Law of Demand states that price and quantity demanded have an inverse relationship.',
    explanation_hi: 'मांग का नियम बताता है कि कीमत और मांग के बीच विपरीत (उलटा) संबंध होता है।'
  },

  // Lesson 3 questions
  {
    id: 'q-eco-3-1',
    lesson_id: 'lesson-eco-3',
    subject_id: 'economics',
    question: 'What type of inflation is caused when global crude oil price spikes increase transportation and manufacturing costs?',
    question_hi: 'जब कच्चे तेल की कीमतों में उछाल से परिवहन और विनिर्माण की लागत बढ़ जाती है, तो किस प्रकार की मुद्रास्फीति उत्पन्न होती है?',
    option_a: 'Demand-Pull Inflation',
    option_a_hi: 'मांग-जनित मुद्रास्फीति (Demand-Pull)',
    option_b: 'Cost-Push Inflation',
    option_b_hi: 'लागत-जनित मुद्रास्फीति (Cost-Push)',
    option_c: 'Deflationary Spiral',
    option_c_hi: 'अपस्फीतिकारी दुष्चक्र',
    option_d: 'Hyper-Velocity Inflation',
    option_d_hi: 'अति-तीव्र मुद्रास्फीति',
    correct_answer: 'B',
    explanation: 'Cost-Push inflation occurs when aggregate supply decreases due to higher production and input costs.',
    explanation_hi: 'लागत-जनित मुद्रास्फीति तब होती है जब कच्चे माल या उत्पादन लागत बढ़ने से कीमतें बढ़ाई जाती हैं।'
  },
  {
    id: 'q-eco-3-2',
    lesson_id: 'lesson-eco-3',
    subject_id: 'economics',
    question: 'What does the Consumer Price Index (CPI) measure?',
    question_hi: 'उपभोक्ता मूल्य सूचकांक (CPI) क्या मापता है?',
    option_a: 'The price change of a weighted basket of goods and services consumed by typical households',
    option_a_hi: 'आम परिवारों द्वारा उपभोग की जाने वाली वस्तुओं और सेवाओं की प्रतिनिधि बास्केट के मूल्यों में बदलाव',
    option_b: 'The stock market index of the top 50 retail companies',
    option_b_hi: 'शीर्ष 50 कंपनियों का शेयर बाजार सूचकांक',
    option_c: 'The profits of supermarket chains',
    option_c_hi: 'सुपरमार्केट का मुनाफा',
    option_d: 'The foreign exchange reserves of the central bank',
    option_d_hi: 'केंद्रीय बैंक का विदेशी मुद्रा भंडार',
    correct_answer: 'A',
    explanation: 'CPI tracks the price movements of a representative basket of household goods and services to measure retail inflation.',
    explanation_hi: 'सीपीआई खुदरा मुद्रास्फीति को मापने के लिए आम घरेलू उपयोग की वस्तुओं और सेवाओं के मूल्यों पर नजर रखता है।'
  },

  // Lesson 4 questions
  {
    id: 'q-eco-4-1',
    lesson_id: 'lesson-eco-4',
    subject_id: 'economics',
    question: 'Why does Real GDP provide a more accurate measure of economic growth than Nominal GDP?',
    question_hi: 'वास्तविक जीडीपी (Real GDP) को नाममात्र जीडीपी (Nominal GDP) की तुलना में आर्थिक वृद्धि का अधिक सटीक पैमाना क्यों माना जाता है?',
    option_a: 'Real GDP includes black market cash transactions',
    option_a_hi: 'वास्तविक जीडीपी में काला धन भी शामिल होता है',
    option_b: 'Real GDP adjusts for inflation, showing true changes in physical output produced',
    option_b_hi: 'वास्तविक जीडीपी मुद्रास्फीति को हटाकर भौतिक उत्पादन की वास्तविक वृद्धि को दर्शाती है',
    option_c: 'Real GDP only counts government spending',
    option_c_hi: 'यह केवल सरकारी खर्च को गिनती है',
    option_d: 'Real GDP ignores population size',
    option_d_hi: 'यह जनसंख्या को नजरअंदाज करती है',
    correct_answer: 'B',
    explanation: 'Real GDP strips out price inflation using base-year prices to measure genuine output volume growth.',
    explanation_hi: 'वास्तविक जीडीपी आधार-वर्ष के मूल्यों पर गणना करके केवल वास्तविक भौतिक उत्पादन की वृद्धि को मापती है।'
  },

  // Lesson 5 questions
  {
    id: 'q-eco-5-1',
    lesson_id: 'lesson-eco-5',
    subject_id: 'economics',
    question: 'What is "Structural Unemployment"?',
    question_hi: '"संरचनात्मक बेरोजगारी (Structural Unemployment)" क्या है?',
    option_a: 'Workers temporarily switching between jobs',
    option_a_hi: 'नौकरी बदलने के दौरान होने वाली अस्थायी बेरोजगारी',
    option_b: 'A fundamental mismatch between workers\' existing skills and the skills demanded by modern employers',
    option_b_hi: 'श्रमिकों के मौजूदा कौशल और नियोक्ताओं द्वारा मांगी जा रही नई योग्यताओं के बीच का बुनियादी बेमेल',
    option_c: 'Seasonal unemployment during monsoon months',
    option_c_hi: 'मानसून के दौरान होने वाली मौसमी बेरोजगारी',
    option_d: 'People choosing not to work voluntarily',
    option_d_hi: 'अपनी मर्जी से काम न करने का फैसला',
    correct_answer: 'B',
    explanation: 'Structural unemployment arises when technological shifts or industrial changes make existing skill sets obsolete.',
    explanation_hi: 'संरचनात्मक बेरोजगारी तब होती है जब तकनीकी प्रगति के कारण पुराने हुनर वाले लोगों की मांग खत्म हो जाती है।'
  },

  // Lesson 6 questions
  {
    id: 'q-eco-6-1',
    lesson_id: 'lesson-eco-6',
    subject_id: 'economics',
    question: 'When a Central Bank raises the Repo Rate, what is the expected effect on the economy?',
    question_hi: 'जब केंद्रीय बैंक रेपो दर (Repo Rate) बढ़ाता है, तो अर्थव्यवस्था पर क्या संभावित प्रभाव पड़ता है?',
    option_a: 'Borrowing becomes cheaper and spending explodes',
    option_a_hi: 'कर्ज सस्ता हो जाता है और खर्च बढ़ता है',
    option_b: 'Loan interest rates rise, borrowing slows down, and inflationary pressures cool',
    option_b_hi: 'कर्ज महंगा हो जाता है, उधारी घटती है और महंगाई पर लगाम लगती है',
    option_c: 'All stock prices immediately double',
    option_c_hi: 'शेयरों की कीमतें तुरंत दोगुनी हो जाती हैं',
    option_d: 'Commercial banks stop accepting deposits',
    option_d_hi: 'बैंक जमा स्वीकार करना बंद कर देते हैं',
    correct_answer: 'B',
    explanation: 'Higher repo rates make credit more expensive across the economy, slowing down demand to bring inflation under control.',
    explanation_hi: 'रेपो दर बढ़ने से लोन महंगे होते हैं, जिससे बाजार में खर्च कम होता है और महंगाई नियंत्रित होती है।'
  },

  // Lesson 7 questions
  {
    id: 'q-eco-7-1',
    lesson_id: 'lesson-eco-7',
    subject_id: 'economics',
    question: 'How do commercial banks create money in a modern financial system?',
    question_hi: 'आधुनिक वित्तीय प्रणाली में वाणिज्यिक बैंक मुद्रा का सृजन कैसे करते हैं?',
    option_a: 'By physically operating printing presses in branch basements',
    option_a_hi: 'बैंक शाखाओं में नोट छापने की मशीनें चलाकर',
    option_b: 'Through Fractional Reserve Banking, lending out a majority of deposits while holding a reserve fraction',
    option_b_hi: 'आंशिक आरक्षित बैंकिंग (Fractional Reserve) द्वारा, कुल जमा का अधिकांश हिस्सा लोन देकर और एक छोटा आरक्षित हिस्सा रखकर',
    option_c: 'By trading foreign currencies only',
    option_c_hi: 'केवल विदेशी मुद्रा का व्यापार करके',
    option_d: 'By distributing free gold coins',
    option_d_hi: 'मुफ्त सोने के सिक्के बांटकर',
    correct_answer: 'B',
    explanation: 'Banks keep a reserve ratio (CRR) and lend out the rest, generating bank credit and expanding the broad money supply.',
    explanation_hi: 'बैंक जमा राशि का एक छोटा हिस्सा रखकर बाकी पैसा कर्ज के रूप में देते हैं, जिससे नई डिजिटल मुद्रा का निर्माण होता है।'
  },

  // Lesson 8 questions
  {
    id: 'q-eco-8-1',
    lesson_id: 'lesson-eco-8',
    subject_id: 'economics',
    question: 'What is the key difference between Capital Expenditure (Capex) and Revenue Expenditure in government budgets?',
    question_hi: 'सरकारी बजट में पूंजीगत व्यय (Capex) और राजस्व व्यय (Revenue Expenditure) में मुख्य अंतर क्या है?',
    option_a: 'Capex creates durable long-term assets (roads, railways, power); Revenue expenditure funds routine operational costs',
    option_a_hi: 'Capex स्थायी संपत्तियां बनाता है (सड़क, रेल, बिजली); राजस्व व्यय दैनिक प्रशासनिक व परिचालन खर्च चलाता है',
    option_b: 'Capex is only for defense salaries',
    option_b_hi: 'Capex केवल सेना के वेतन के लिए होता है',
    option_c: 'Revenue expenditure builds space rockets',
    option_c_hi: 'राजस्व व्यय से अंतरिक्ष रॉकेट बनते हैं',
    option_d: 'Capex is illegal under fiscal law',
    option_d_hi: 'Capex कानूनन प्रतिबंधित है',
    correct_answer: 'A',
    explanation: 'Capex creates productive physical infrastructure that yields economic dividends for decades.',
    explanation_hi: 'पूंजीगत व्यय टिकाऊ बुनियादी ढांचा खड़ा करता है जो दशकों तक देश के आर्थिक विकास में योगदान देता है।'
  },

  // Lesson 9 questions
  {
    id: 'q-eco-9-1',
    lesson_id: 'lesson-eco-9',
    subject_id: 'economics',
    question: 'What is the standard technical definition of an economic recession?',
    question_hi: 'आर्थिक मंदी की मानक तकनीकी परिभाषा क्या है?',
    option_a: 'Stock market dropping 5% in a single day',
    option_a_hi: 'शेयर बाजार का एक दिन में 5% गिरना',
    option_b: 'Two consecutive quarters (6 months) of negative Real GDP growth',
    option_b_hi: 'लगातार दो तिमाहियों (6 माह) तक वास्तविक जीडीपी (Real GDP) में नकारात्मक वृद्धि',
    option_c: 'Any increase in the price of petrol',
    option_c_hi: 'पेट्रोल की कीमतों में कोई भी वृद्धि',
    option_d: 'A single quarter with higher taxes',
    option_d_hi: 'एक तिमाही में टैक्स बढ़ना',
    correct_answer: 'B',
    explanation: 'Two consecutive quarters of contracting real GDP defines a technical macroeconomic recession.',
    explanation_hi: 'लगातार 6 महीने (दो तिमाहियों) तक वास्तविक उत्पादन घटने को मैक्रोइकॉनॉमिक मंदी कहा जाता है।'
  },

  // Lesson 10 questions
  {
    id: 'q-eco-10-1',
    lesson_id: 'lesson-eco-10',
    subject_id: 'economics',
    question: 'When a country experiences a large Trade Deficit (importing far more goods than it exports), what pressure is exerted on its currency?',
    question_hi: 'जब किसी देश का व्यापार घाटा बहुत बड़ा हो जाता है (निर्यात से कहीं अधिक आयात), तो उसकी मुद्रा पर क्या दबाव पड़ता है?',
    option_a: 'Downward depreciation pressure because domestic currency is sold to buy foreign currencies for imports',
    option_a_hi: 'गिरावट (कमजोरी) का दबाव, क्योंकि आयात चुकाने के लिए घरेलू मुद्रा बेचकर विदेशी मुद्रा खरीदी जाती है',
    option_b: 'The domestic currency automatically strengthens tenfold',
    option_b_hi: 'घरेलू मुद्रा अपने आप 10 गुना मजबूत हो जाती है',
    option_c: 'No effect on exchange rates whatsoever',
    option_c_hi: 'विनिमय दर पर कोई प्रभाव नहीं पड़ता',
    option_d: 'All foreign exchange markets shut down',
    option_d_hi: 'विदेशी मुद्रा बाजार बंद हो जाता है',
    correct_answer: 'A',
    explanation: 'Excessive import demand requires selling local currency to buy foreign reserves, causing depreciation pressure.',
    explanation_hi: 'अतिरिक्त आयात के भुगतान के लिए रुपये को बेचकर डॉलर खरीदना पड़ता है, जिससे घरेलू मुद्रा के मूल्य में गिरावट आती है।'
  }
];
