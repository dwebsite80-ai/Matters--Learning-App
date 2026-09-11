import { Lesson, Question } from '../types';

export const FINANCE_LESSONS: Lesson[] = [
  {
    id: 'lesson-fin-1',
    topic_id: 'fin-1',
    subject_id: 'money-finance',
    title: 'The 50/30/20 Rule & Cash Flow Mastery',
    title_hi: '50/30/20 नियम एवं कैश फ्लो प्रबंधन',
    subtitle: 'The foundational formula for managing take-home income',
    subtitle_hi: 'अपनी शुद्ध आय को सही तरीके से बांटने और प्रबंधित करने का मूल मंत्र',
    estimated_minutes: 10,
    difficulty: 'Beginner',
    hook: 'Ever reach the 20th of the month and wonder where your entire salary disappeared? You do not need complex accounting software—just three basic buckets.',
    hook_hi: 'क्या महीने की 20 तारीख आते-आते आपका वेतन गायब हो जाता है और समझ नहीं आता पैसा कहाँ गया? आपको किसी जटिल सॉफ्टवेयर की नहीं, बस तीन बुनियादी श्रेणियों की जरूरत है।',
    sections: [
      {
        title: 'The 50/30/20 Allocation',
        title_hi: '50/30/20 का विभाजन',
        content: 'Popularized by financial experts, this rule divides your post-tax monthly income into three simple categories: 50% for Needs, 30% for Wants, and 20% for Savings & Debt Payoff.',
        content_hi: 'यह नियम आपकी टैक्स-कटौती के बाद मिलने वाली मासिक आय को तीन सरल हिस्सों में बांटता है: 50% अनिवार्य जरूरतों (Needs) के लिए, 30% इच्छाओं व शौक (Wants) के लिए, और 20% बचत तथा कर्ज चुकाने (Savings & Debt) के लिए।',
        highlight: 'Needs are non-negotiable: rent/EMI, groceries, utilities, basic transportation, and minimum debt payments.',
        highlight_hi: 'अनिवार्य जरूरतें टाली नहीं जा सकतीं: मकान का किराया/ईएमआई, राशन, बिजली-पानी का बिल, जरूरी यातायात और न्यूनतम कर्ज भुगतान।',
        iconType: 'concept'
      },
      {
        title: 'Controlling the 30% Wants Bucket',
        title_hi: '30% इच्छाओं (Wants) के दायरे को नियंत्रित करना',
        content: 'Wants include dining out, streaming subscriptions, weekend trips, and latest gadgets. The beauty of this system is that it gives you guilt-free spending up to 30% without risking your financial future.',
        content_hi: 'इच्छाओं में बाहर खाना, ओटीटी सब्सक्रिप्शन, वीकेंड ट्रिप और नए गैजेट्स शामिल हैं। इस नियम की खासियत यह है कि यह आपको अपने भविष्य को जोखिम में डाले बिना 30% तक खुलकर खर्च करने की आजादी देता है।',
        iconType: 'tip'
      },
      {
        title: 'Automating the 20% Wealth Builder',
        title_hi: '20% निवेश को स्वचालित (Automate) करना',
        content: 'The secret to wealth is "paying yourself first". Set up an automatic transfer on salary day to move 20% straight into emergency funds, mutual fund SIPs, or retirement accounts before you spend a single rupee on discretionary items.',
        content_hi: 'दौलत बनाने का असली रहस्य है "पहले खुद को भुगतान करना (Pay Yourself First)"। वेतन आते ही 20% रकम को सीधे इमरजेंसी फंड, म्यूचुअल फंड एसआईपी या रिटायरमेंट खाते में ट्रांसफर करने का ऑटो-डेबिट सेट करें।',
        iconType: 'concept'
      }
    ],
    practical_example: {
      scenario: 'You earn ₹50,000 net per month. Under the 50/30/20 framework, how should this be organized?',
      scenario_hi: 'आपकी शुद्ध मासिक आय ₹50,000 है। 50/30/20 नियम के अनुसार इस राशि का प्रबंधन कैसे होना चाहिए?',
      analysis: 'Needs (Rent, food, bills): ₹25,000 max. Wants (Dining, entertainment): ₹15,000 max. Savings & Investments (SIPs, Emergency Fund): ₹10,000 min.',
      analysis_hi: 'जरूरतें (किराया, राशन, बिल): अधिकतम ₹25,000। इच्छाएं (मनोरंजन, खान-पान): अधिकतम ₹15,000। बचत व निवेश (एसआईपी, इमरजेंसी फंड): न्यूनतम ₹10,000।',
      actionable_tip: 'Set up an automated SIP for ₹10,000 on the 2nd of every month so you never accidentally spend your investment portion.',
      actionable_tip_hi: 'हर महीने की 2 या 3 तारीख को ₹10,000 की ऑटोमैटिक SIP सेट करें ताकि निवेश का पैसा गलती से भी खर्च न हो सके।'
    },
    key_takeaways: [
      '50% goes to survival essentials (needs), 30% to lifestyle (wants), and 20% to savings.',
      'Always pay yourself first by automating the 20% investment bucket on day one.',
      'Lifestyle creep happens when wants expand into the savings bucket.',
      'Review your allocations every 6 months or whenever your income changes.'
    ],
    key_takeaways_hi: [
      '50% जीवनयापन की अनिवार्य जरूरतों के लिए, 30% जीवनशैली और शौक के लिए, और 20% बचत के लिए रखें।',
      'सैलरी के दिन ही 20% निवेश को ऑटोमेट करके हमेशा सबसे पहले खुद को भुगतान करें।',
      'जब इच्छाएं बचत के हिस्से में सेंध लगाने लगती हैं, तो वित्तीय संकट शुरू होता है।',
      'हर 6 महीने में या आय बढ़ने पर अपने बजट आवंटन की समीक्षा करें।'
    ]
  },
  {
    id: 'lesson-fin-2',
    topic_id: 'fin-2',
    subject_id: 'money-finance',
    title: 'Saving vs Inflation: The Silent Tax',
    title_hi: 'बचत बनाम महंगाई: अनदेखा अदृश्य टैक्स',
    subtitle: 'Why keeping cash in a savings bank account slowly erodes purchasing power',
    subtitle_hi: 'सेविंग्स खाते में नकद रखने से समय के साथ पैसे की क्रय शक्ति क्यों घटती है',
    estimated_minutes: 10,
    difficulty: 'Beginner',
    hook: 'If you keep ₹1,00,000 locked in a bank account earning 3% annual interest while inflation runs at 6%, you did not make money—your real wealth shrank by 3% each year.',
    hook_hi: 'अगर आपके बैंक खाते में रखे ₹1,00,000 पर 3% ब्याज मिल रहा है और बाजार में महंगाई दर 6% है, तो आपका पैसा बढ़ नहीं रहा—बल्कि उसकी वास्तविक खरीद क्षमता हर साल 3% कम हो रही है।',
    sections: [
      {
        title: 'Real Return vs Nominal Return',
        title_hi: 'वास्तविक रिटर्न बनाम नाममात्र रिटर्न',
        content: 'Nominal return is the raw interest percentage your bank advertises. Real Return = Nominal Interest Rate - Inflation Rate. If your savings account gives 3% and consumer inflation is 6%, your real return is -3% per year.',
        content_hi: 'नाममात्र रिटर्न (Nominal Return) वह ब्याज दर है जो बैंक दिखाता है। वास्तविक रिटर्न (Real Return) = नाममात्र ब्याज दर - महंगाई दर। यदि बैंक 3% ब्याज देता है और महंगाई 6% है, तो आपका वास्तविक रिटर्न -3% है।',
        highlight: 'Over 10 years, a -3% real return destroys almost 26% of your money purchasing capacity without you losing a single physical note.',
        highlight_hi: '10 वर्षों में -3% का वास्तविक रिटर्न बिना एक भी नोट खोए आपके धन की खरीद क्षमता को लगभग 26% तक घटा देता है।',
        iconType: 'warning'
      },
      {
        title: 'The Purpose of Different Assets',
        title_hi: 'विभिन्न परिसंपत्तियों (Assets) का सही उद्देश्य',
        content: 'Bank savings accounts and FDs are designed for safety and immediate liquidity, not wealth creation. To beat inflation over 5+ years, your capital must be deployed into growth assets like equities, index funds, or sovereign debt.',
        content_hi: 'बैंक बचत खाता और एफडी आपातकालीन सुरक्षा और त्वरित नकदी के लिए हैं, संपत्ति निर्माण के लिए नहीं। 5 से अधिक वर्षों में महंगाई को हराने के लिए पूंजी को इंडेक्स फंड्स, इक्विटी या सरकारी प्रतिभूतियों में लगाना आवश्यक है।',
        iconType: 'concept'
      }
    ],
    practical_example: {
      scenario: 'A family saves ₹5 Lakhs in cash under a mattress for 15 years. Prices of everyday goods double over that period.',
      scenario_hi: 'एक परिवार ₹5 लाख नकद 15 वर्षों तक घर में संभाल कर रखता है। इस दौरान रोजमर्रा की चीजों के दाम दोगुने हो जाते हैं।',
      analysis: 'Though the ₹5,00,000 notes are intact, they can now only buy what ₹2,50,000 could buy originally.',
      analysis_hi: 'यद्यपि ₹5,00,000 के नोट सुरक्षित हैं, लेकिन अब उनसे केवल वही सामान खरीदा जा सकता है जो 15 साल पहले ₹2,50,000 में मिलता था।',
      actionable_tip: 'Keep only 3-6 months of expenses in liquid savings/FD, and invest long-term capital where expected CAGR exceeds inflation.',
      actionable_tip_hi: 'केवल 3 से 6 महीने के खर्च को ही लिक्विड बचत/एफडी में रखें, बाकी दीर्घकालिक धन को महंगाई से अधिक रिटर्न देने वाले साधनों में निवेश करें।'
    },
    key_takeaways: [
      'Inflation silently erodes the purchasing power of idle cash.',
      'Real Return = Nominal Interest Rate minus Inflation.',
      'Savings accounts guarantee negative real returns during high inflation periods.',
      'Long-term savings must outpace inflation through diversified growth assets.'
    ],
    key_takeaways_hi: [
      'महंगाई बेकार पड़े नकद की क्रय शक्ति को चुपचाप नष्ट करती है।',
      'वास्तविक रिटर्न = बैंक का ब्याज दर घटाव वास्तविक महंगाई दर।',
      'उच्च मुद्रास्फीति के दौर में बचत खाते में पैसा रखना नकारात्मक वास्तविक रिटर्न देता है।',
      'दीर्घकालिक बचत को महंगाई से आगे रखने के लिए वृद्धि-उन्मुख परिसंपत्तियों में निवेश जरूरी है।'
    ]
  },
  {
    id: 'lesson-fin-3',
    topic_id: 'fin-3',
    subject_id: 'money-finance',
    title: 'Emergency Funds: 6 Months of Liquid Peace',
    title_hi: 'इमरजेंसी फंड: 6 महीने का वित्तीय सुरक्षा कवच',
    subtitle: 'Your personal financial shock absorber before taking investment risks',
    subtitle_hi: 'निवेश का जोखिम लेने से पहले अपने जीवन के लिए आवश्यक वित्तीय सुरक्षा ढांचा',
    estimated_minutes: 10,
    difficulty: 'Beginner',
    hook: 'What happens if you face a sudden job layoff, family medical emergency, or sudden vehicle breakdown? Without an emergency fund, people are forced to borrow high-interest personal loans or sell investments at a loss.',
    hook_hi: 'अगर अचानक नौकरी छूट जाए, परिवार में स्वास्थ्य आपातकाल आ जाए या कोई बड़ा खर्च आ पड़े तो क्या होगा? बिना इमरजेंसी फंड के लोग भारी ब्याज पर कर्ज लेने या नुकसान में निवेश बेचने पर मजबूर हो जाते हैं।',
    sections: [
      {
        title: 'How Much Do You Need?',
        title_hi: 'आपको कितनी रकम की आवश्यकता है?',
        content: 'An emergency fund should cover 3 to 6 months of mandatory living expenses (rent, groceries, EMIs, insurance premiums, essential utilities). If you have freelance or variable income, aim for 6 to 9 months.',
        content_hi: 'एक आदर्श इमरजेंसी फंड में 3 से 6 महीने के अनिवार्य खर्च (किराया, राशन, ईएमआई, बीमा प्रीमियम, जरूरी बिल) होने चाहिए। यदि आप फ्रीलांसर हैं या आय अनिश्चित है, तो 6 से 9 महीने का फंड रखें।',
        iconType: 'concept'
      },
      {
        title: 'Where Should It Be Stored?',
        title_hi: 'इस फंड को कहाँ रखना चाहिए?',
        content: 'An emergency fund is for peace of mind, not high returns. Keep 50% in a high-yield savings account and 50% in a sweep-in Fixed Deposit or Liquid Mutual Fund that can be withdrawn within 24 hours with zero exit penalty.',
        content_hi: 'इमरजेंसी फंड मानसिक शांति और सुरक्षा के लिए है, ऊंचे मुनाफे के लिए नहीं। 50% हिस्सा बचत खाते में और 50% ऑटो-स्वीप एफडी या लिक्विड म्यूचुअल फंड में रखें जिसे 24 घंटे के भीतर बिना जुर्माने के निकाला जा सके।',
        highlight: 'Never lock emergency funds in stock trading accounts, volatile crypto, or illiquid real estate.',
        highlight_hi: 'इमरजेंसी फंड को कभी भी शेयर बाजार, क्रिप्टो या प्रॉपर्टी जैसे जोखिम भरे और गैर-तरल साधनों में न फंसाएं।',
        iconType: 'tip'
      }
    ],
    practical_example: {
      scenario: 'Your monthly mandatory expenses are ₹30,000. Your target emergency cushion is 6 months.',
      scenario_hi: 'आपका मासिक अनिवार्य खर्च ₹30,000 है। आपका लक्ष्य 6 महीने का इमरजेंसी फंड बनाना है।',
      analysis: '30,000 x 6 = ₹1,80,000. Store ₹60,000 in your primary bank savings and ₹1,20,000 in an instant-redemption liquid fund or auto-sweep FD.',
      analysis_hi: '30,000 x 6 = ₹1,80,000। इसमें से ₹60,000 अपने मुख्य बैंक बचत खाते में और ₹1,20,000 इंस्टेंट-रिडेम्पशन लिक्विड फंड या ऑटो-स्वीप एफडी में सुरक्षित रखें।',
      actionable_tip: 'Build this buffer before jumping into high-risk stock trading or crypto speculations.',
      actionable_tip_hi: 'शेयर बाजार में ट्रेडिंग या जोखिम भरे निवेश में उतरने से पहले यह सुरक्षा कवच अनिवार्य रूप से तैयार करें।'
    },
    key_takeaways: [
      'An emergency fund protects you from high-interest debt during unforeseen crises.',
      'Target 3-6 months of bare minimum monthly living expenses.',
      'Prioritize instant liquidity and capital preservation over high returns.',
      'Replenish the fund immediately after utilizing it.'
    ],
    key_takeaways_hi: [
      'इमरजेंसी फंड संकट के समय आपको महंगे कर्ज और मानसिक तनाव से बचाता है।',
      'कम से कम 3 से 6 महीने के अनिवार्य खर्च का लक्ष्य रखें।',
      'उच्च मुनाफे के बजाय त्वरित उपलब्धता (Liquidity) और पूंजी सुरक्षा को प्राथमिकता दें।',
      'इस्तेमाल होने के बाद इसे दोबारा प्राथमिकता के आधार पर तुरंत भरें।'
    ]
  },
  {
    id: 'lesson-fin-4',
    topic_id: 'fin-4',
    subject_id: 'money-finance',
    title: 'Compound Interest & The Rule of 72',
    title_hi: 'चक्रवृद्धि ब्याज एवं 72 का नियम',
    subtitle: 'How exponential math creates life-changing long-term wealth',
    subtitle_hi: 'घातीय गणित (Exponential Math) कैसे लंबी अवधि में विशाल संपत्ति बनाता है',
    estimated_minutes: 10,
    difficulty: 'Beginner',
    hook: 'Albert Einstein famously called compound interest the "Eighth Wonder of the World". Those who understand it earn it; those who don\'t, pay it.',
    hook_hi: 'अल्बर्ट आइंस्टीन ने चक्रवृद्धि ब्याज को "दुनिया का आठवां अजूबा" कहा था। जो इसे समझते हैं वे इससे कमाते हैं, जो नहीं समझते वे इसे ब्याज के रूप में भरते हैं।',
    sections: [
      {
        title: 'Simple vs Compound Growth',
        title_hi: 'साधारण वृद्धि बनाम चक्रवृद्धि वृद्धि',
        content: 'Simple interest only earns interest on your original principal. Compound interest earns interest on your principal PLUS all previously accumulated interest. Over long periods, this creates a hockey-stick exponential growth curve.',
        content_hi: 'साधारण ब्याज केवल मूलधन पर मिलता है। चक्रवृद्धि ब्याज में मूलधन के साथ-साथ पहले मिले ब्याज पर भी ब्याज मिलता है। लंबी अवधि में यह घातीय वृद्धि (Exponential Growth) की वक्र रेखा बनाता है।',
        iconType: 'concept'
      },
      {
        title: 'The Mental Shortcut: Rule of 72',
        title_hi: 'मानसिक गणना का शॉर्टकट: 72 का नियम',
        content: 'Want to know how many years it takes for your investment to double? Divide 72 by your annual interest rate. At 12% annual return: 72 / 12 = 6 years to double. At 6% return: 72 / 6 = 12 years to double.',
        content_hi: 'यह जानने के लिए कि आपका पैसा कितने वर्षों में दोगुना होगा, संख्या 72 को अपेक्षित वार्षिक रिटर्न प्रतिशत से भाग दें। 12% रिटर्न पर: 72 / 12 = 6 साल। 6% रिटर्न पर: 72 / 6 = 12 साल में पैसा दोगुना होगा।',
        highlight: 'The Rule of 72 gives you an instant estimation of doubling time without needing complex financial calculators.',
        highlight_hi: '72 का नियम बिना किसी जटिल कैलकुलेटर के आपको पैसा दोगुना होने की सटीक समय-सीमा बताता है।',
        iconType: 'tip'
      },
      {
        title: 'The Cost of Delay',
        title_hi: 'देरी करने का भारी नुकसान',
        content: 'Starting an investment of ₹5,000/month at age 22 vs starting at age 32 at 12% return results in more than DOUBLE the total corpus at age 55, purely due to the 10 extra years of compounding.',
        content_hi: '22 वर्ष की आयु में ₹5,000/माह का निवेश शुरू करने वाले व्यक्ति को 55 वर्ष की उम्र में, 32 वर्ष की आयु में शुरू करने वाले व्यक्ति की तुलना में दोगुने से भी अधिक का फंड मिलता है—केवल उन अतिरिक्त 10 वर्षों की चक्रवृद्धि के कारण।',
        iconType: 'concept'
      }
    ],
    practical_example: {
      scenario: 'You invest ₹10,000 monthly at 12% estimated annual return. In 10 years you invest ₹12 Lakhs and it grows to ~₹23 Lakhs. In 20 years, investing ₹24 Lakhs grows to nearly ~₹1 Crore!',
      scenario_hi: 'आप 12% वार्षिक रिटर्न पर हर महीने ₹10,000 निवेश करते हैं। 10 वर्षों में आपके ₹12 लाख बढ़कर ~₹23 लाख हो जाते हैं। 20 वर्षों में कुल ₹24 लाख का निवेश बढ़कर लगभग ~₹1 करोड़ बन जाता है!',
      analysis: 'Notice how the second 10 years created almost 4x more growth than the first 10 years—that is compounding acceleration.',
      analysis_hi: 'ध्यान दें कि दूसरे 10 वर्षों में पहले 10 वर्षों की तुलना में 4 गुना अधिक संपदा बनी—यही चक्रवृद्धि की त्वरित गति (Compounding Acceleration) है।',
      actionable_tip: 'Time in the market beats timing the market. Start early, even with modest monthly amounts.',
      actionable_tip_hi: 'बाजार के उतार-चढ़ाव का समय आंकने से बेहतर है बाजार में लंबे समय तक बने रहना। छोटी राशि से ही सही, तुरंत शुरुआत करें।'
    },
    key_takeaways: [
      'Compound interest earns returns on prior returns.',
      'Rule of 72: Divide 72 by interest rate to calculate doubling time.',
      'The biggest variable in compounding is time, not initial capital.',
      'Compounding works in reverse on credit card debt and loans, compounding against you.'
    ],
    key_takeaways_hi: [
      'चक्रवृद्धि ब्याज में पहले मिले मुनाफे पर भी अतिरिक्त मुनाफा उत्पन्न होता है।',
      '72 का नियम: पैसा दोगुना होने के वर्ष निकालने के लिए 72 को ब्याज दर से विभाजित करें।',
      'चक्रवृद्धि में सबसे बड़ा कारक समय (Time) है, न कि केवल शुरुआती पूंजी।',
      'कर्ज और क्रेडिट कार्ड पर चक्रवृद्धि आपके विरुद्ध काम करती है और तेजी से कर्ज बढ़ाती है।'
    ]
  },
  {
    id: 'lesson-fin-5',
    topic_id: 'fin-5',
    subject_id: 'money-finance',
    title: 'UPI & Digital Banking Hygiene',
    title_hi: 'यूपीआई एवं डिजिटल बैंकिंग सुरक्षा',
    subtitle: 'Protecting your funds against evolving social engineering scams',
    subtitle_hi: 'डिजिटल वित्तीय धोखाधड़ी और सोशल इंजीनियरिंग से अपने बैंक खाते को सुरक्षित रखना',
    estimated_minutes: 10,
    difficulty: 'Beginner',
    hook: 'India processes billions of UPI payments each month. Yet thousands fall victim each day to simple psychological tricks rather than technological hacks.',
    hook_hi: 'भारत में हर महीने अरबों यूपीआई लेनदेन होते हैं। फिर भी रोजाना हजारों लोग तकनीकी हैकिंग से नहीं, बल्कि साधारण मनोवैज्ञानिक चालों (Social Engineering) का शिकार होकर पैसे गंवा बैठते हैं।',
    sections: [
      {
        title: 'The Core UPI Rule',
        title_hi: 'यूपीआई का स्वर्णिम नियम',
        content: 'Entering your 4 or 6 digit UPI PIN is ONLY needed for sending money or checking bank balances. You will NEVER need to enter a PIN to receive a payment, refund, lottery reward, or cashback.',
        content_hi: '4 या 6 अंकों का यूपीआई पिन (UPI PIN) केवल पैसे भेजने या खाता शेष जांचने के लिए दर्ज किया जाता है। पैसे प्राप्त करने, रिफंड लेने, कैशबैक या लॉटरी इनाम के लिए कभी भी पिन दर्ज करने की आवश्यकता नहीं होती।',
        highlight: 'If someone asks you to "enter your PIN to receive money", it is 100% a scam.',
        highlight_hi: 'यदि कोई आपसे कहे कि "पैसे पाने के लिए अपना पिन डालें", तो वह 100% एक फ्रॉड और ठगी है।',
        iconType: 'warning'
      },
      {
        title: 'Screen Sharing & Remote Access Traps',
        title_hi: 'स्क्रीन शेयरिंग व रिमोट एक्सेस का जाल',
        content: 'Fraudsters pose as bank executives or courier customer care and ask you to install apps like AnyDesk, TeamViewer QuickSupport, or RustDesk. These apps broadcast your mobile screen, exposing OTPs and credentials.',
        content_hi: 'ठग बैंक अधिकारी या कूरियर सपोर्ट बनकर AnyDesk, TeamViewer या RustDesk जैसे ऐप इंस्टॉल करवाते हैं। ये ऐप आपकी मोबाइल स्क्रीन को लाइव शेयर कर देते हैं, जिससे आपके ओटीपी और पासवर्ड उनके पास पहुंच जाते हैं।',
        iconType: 'warning'
      },
      {
        title: 'Two-Account Strategy for Safety',
        title_hi: 'दो खातों की सुरक्षा रणनीति',
        content: 'Maintain a secondary savings account for daily UPI payments and merchant scans with a modest balance (₹5,000–₹10,000). Keep your primary life savings in a main account without UPI activated or linked to apps.',
        content_hi: 'दैनिक यूपीआई भुगतान और दुकानों पर स्कैन करने के लिए एक अलग बचत खाता रखें जिसमें सीमित राशि (₹5,000-₹10,000) हो। अपनी मुख्य जीवन भर की बचत वाले खाते को यूपीआई ऐप्स से दूर रखें।',
        iconType: 'tip'
      }
    ],
    practical_example: {
      scenario: 'A caller claims your electricity connection will be disconnected in 2 hours unless you click an SMS link and pay a ₹10 test verification fee.',
      scenario_hi: 'एक कॉलर दावा करता है कि 2 घंटे में आपका बिजली कनेक्शन कट जाएगा जब तक कि आप एसएमएस में आए लिंक पर क्लिक करके ₹10 का शुल्क न भरें।',
      analysis: 'The link installs malware or triggers an unauthorized debit mandate.',
      analysis_hi: 'वह लिंक फोन में मैलवेयर डालता है या खाते से अनधिकृत ऑटो-डेबिट मैंडेट शुरू कर देता है।',
      actionable_tip: 'Never click links in SMS. Always check your official electricity provider portal or electricity bill app directly.',
      actionable_tip_hi: 'एसएमएस में आए अज्ञात लिंक पर कभी क्लिक न करें। बिजली बिल के लिए सीधे आधिकारिक पोर्टल या अधिकृत ऐप का उपयोग करें।'
    },
    key_takeaways: [
      'UPI PIN is strictly for debiting money, never for receiving.',
      'Never download screen-sharing tools on instructions from unknown callers.',
      'Use a secondary bank account for day-to-day UPI tap-and-pay transactions.',
      'Report any suspicious transaction immediately to 1930 and your bank.'
    ],
    key_takeaways_hi: [
      'यूपीआई पिन केवल पैसे भेजने के लिए होता है, पैसे प्राप्त करने के लिए कभी नहीं।',
      'अज्ञात कॉलर के कहने पर फोन में कोई भी स्क्रीन शेयरिंग ऐप डाउनलोड न करें।',
      'रोजमर्रा के यूपीआई लेन-देन के लिए सीमित बैलेंस वाला सेकेंडरी बैंक खाता रखें।',
      'संदिग्ध लेन-देन होने पर तुरंत राष्ट्रीय हेल्पलाइन 1930 और अपने बैंक को सूचित करें।'
    ]
  },
  {
    id: 'lesson-fin-6',
    topic_id: 'fin-6',
    subject_id: 'money-finance',
    title: 'Credit Scores (CIBIL) & Credit Health',
    title_hi: 'क्रेडिट स्कोर (CIBIL) एवं वित्तीय साख',
    subtitle: 'How your 3-digit score determines your future loan approvals and interest rates',
    subtitle_hi: 'यह 3 अंकों का स्कोर कैसे तय करता है आपके ऋण की स्वीकृति और ब्याज दरें',
    estimated_minutes: 10,
    difficulty: 'Intermediate',
    hook: 'A credit score of 780 vs 650 can mean the difference of hundreds of thousands of rupees in lower home loan interest rates over 20 years.',
    hook_hi: '780 और 650 के सिबिल स्कोर का अंतर 20 साल के होम लोन पर लाखों रुपये के अतिरिक्त ब्याज का फर्क ला सकता है।',
    sections: [
      {
        title: 'What Makes Up Your Credit Score?',
        title_hi: 'क्रेडिट स्कोर किन तत्वों से बनता है?',
        content: 'Credit bureaus (CIBIL, Experian, Equifax, CRIF High Mark) assign scores ranging from 300 to 900. Key components: 1. Payment History (35% - on-time payments), 2. Credit Utilization Ratio (30% - keeping card usage under 30% of limit), 3. Credit Age (15%), 4. Credit Mix (10% - secured vs unsecured), 5. Hard Enquiries (10%).',
        content_hi: 'क्रेडिट ब्यूरो (CIBIL, Experian) 300 से 900 के बीच स्कोर देते हैं। मुख्य कारक: 1. भुगतान इतिहास (35% - समय पर भुगतान), 2. क्रेडिट उपयोग अनुपात (30% - सीमा का 30% से कम उपयोग), 3. क्रेडिट इतिहास की अवधि (15%), 4. लोन का प्रकार (10%), 5. बार-बार लोन आवेदन (10%)।',
        iconType: 'concept'
      },
      {
        title: 'The Credit Utilization Golden Rule',
        title_hi: 'क्रेडिट उपयोग का स्वर्णिम 30% नियम',
        content: 'If your credit card has a limit of ₹1,00,000, keep your monthly spending below ₹30,000 (30% utilization). Maxing out your card every month flags high credit hunger and drags down your score, even if paid in full.',
        content_hi: 'यदि आपके कार्ड की सीमा ₹1,00,000 है, तो मासिक खर्च ₹30,000 (30%) से कम रखें। हर महीने कार्ड की पूरी लिमिट खत्म करने से बैंक आपको जोखिम भरा मानते हैं और स्कोर गिरता है, भले ही आप पूरा बिल भर दें।',
        highlight: 'A score of 750+ is generally considered the threshold for prime interest rates and instant approvals.',
        highlight_hi: '750 से अधिक का सिबिल स्कोर सर्वोत्तम ब्याज दरों और तत्काल ऋण स्वीकृति के लिए आदर्श माना जाता है।',
        iconType: 'tip'
      }
    ],
    practical_example: {
      scenario: 'You want to buy an item for ₹80,000 on a card with a ₹1,00,000 limit. If the bill generates at ₹80k, your utilization is 80%.',
      scenario_hi: 'आप ₹1,00,000 की लिमिट वाले कार्ड पर ₹80,000 का सामान खरीदते हैं। यदि बिल ₹80k पर बनता है, तो आपका उपयोग 80% दिखेगा।',
      analysis: 'Your score will dip temporarily due to high utilization.',
      analysis_hi: 'अत्यधिक क्रेडिट उपयोग के कारण आपका क्रेडिट स्कोर अस्थायी रूप से गिर जाएगा।',
      actionable_tip: 'Pay down ₹55,000 before the statement generation date so the reported balance is under ₹25,000 (25% utilization).',
      actionable_tip_hi: 'बिल बनने की तारीख से पहले ही ₹55,000 चुका दें ताकि ब्यूरो को रिपोर्ट होने वाला बैलेंस 25% से कम रहे।'
    },
    key_takeaways: [
      'Credit scores range from 300 to 900; 750+ opens access to prime rates.',
      'Payment history is the single heaviest factor—never miss an EMI due date.',
      'Maintain credit utilization below 30% of your total credit limit.',
      'Avoid applying for multiple credit cards or personal loans simultaneously.'
    ],
    key_takeaways_hi: [
      'क्रेडिट स्कोर 300 से 900 के बीच होता है; 750+ पर सबसे सस्ती ब्याज दरें मिलती हैं।',
      'समय पर भुगतान सबसे महत्वपूर्ण कारक है—कभी भी ईएमआई की अंतिम तिथि न चूकें।',
      'अपने क्रेडिट कार्ड की कुल सीमा का उपयोग 30% से नीचे बनाए रखें।',
      'एक साथ कई बैंकों में पर्सनल लोन या क्रेडिट कार्ड के लिए आवेदन करने से बचें।'
    ]
  },
  {
    id: 'lesson-fin-7',
    topic_id: 'fin-7',
    subject_id: 'money-finance',
    title: 'Good Debt vs Bad Debt & Real EMI Costs',
    title_hi: 'अच्छा कर्ज बनाम बुरा कर्ज और ईएमआई की सच्चाई',
    subtitle: 'Understanding reducing balance interest and the myth of zero-cost EMIs',
    subtitle_hi: 'घटते मूलधन (Reducing Balance) का गणित और नो-कॉस्ट ईएमआई का असली सच',
    estimated_minutes: 10,
    difficulty: 'Intermediate',
    hook: 'Is "No Cost EMI" truly free, or are banks and retailers cleverly factoring in processing fees, GST, and lost cash discounts into the sticker price?',
    hook_hi: 'क्या "नो कॉस्ट ईएमआई" सच में मुफ्त होती है, या बैंक और विक्रेता प्रोसेसिंग फीस, जीएसटी और खोए हुए नकद डिस्काउंट के जरिए आपसे अतिरिक्त पैसा ले रहे होते हैं?',
    sections: [
      {
        title: 'Good Debt vs Bad Debt',
        title_hi: 'अच्छा कर्ज बनाम बुरा कर्ज',
        content: 'Good debt finances appreciating assets or income-generating tools (e.g. an education loan that boosts earning power, a prudent business loan, or an affordable home loan). Bad debt finances depreciating consumer luxuries (e.g. personal loans for vacations, luxury phones, or wedding expenses).',
        content_hi: 'अच्छा कर्ज वह है जो मूल्य बढ़ाने वाली संपत्ति या आय पैदा करने वाले साधनों के लिए लिया जाए (जैसे शिक्षा ऋण, व्यापार विस्तार या किफायती होम लोन)। बुरा कर्ज वह है जो घटते मूल्य वाले उपभोग के लिए लिया जाए (जैसे महंगे फोन, छुट्टियों या शादियों के लिए पर्सनल लोन)।',
        iconType: 'concept'
      },
      {
        title: 'The Truth About "Zero Cost EMI"',
        title_hi: '"नो कॉस्ट ईएमआई" का गणितीय सच',
        content: 'Under RBI regulations, banks cannot offer 0% interest loans. In "No Cost EMI", the merchant provides an upfront discount equal to the interest charged by the bank. However, you still pay 18% GST on the interest component plus a processing fee (₹199+GST).',
        content_hi: 'आरबीआई के नियमों के अनुसार बैंक शून्य प्रतिशत ब्याज पर ऋण नहीं दे सकते। नो-कॉस्ट ईएमआई में मर्चेंट ब्याज के बराबर का डिस्काउंट देता है। लेकिन ग्राहक को उस ब्याज पर 18% जीएसटी और प्रोसेसिंग फीस अलग से चुकानी पड़ती है।',
        highlight: 'Furthermore, choosing No Cost EMI often forfeits instant 10-15% upfront cash/card discount offers.',
        highlight_hi: 'इसके अतिरिक्त, नो-कॉस्ट ईएमआई चुनने पर अक्सर मिलने वाला 10-15% का सीधा नकद डिस्काउंट छिन जाता है।',
        iconType: 'warning'
      },
      {
        title: 'Flat Rate vs Reducing Balance Trap',
        title_hi: 'फ्लैट ब्याज दर बनाम घटता मूलधन (Reducing Rate)',
        content: 'A flat interest rate of 10% on a loan is actually equivalent to nearly ~18% reducing balance interest rate because you continue paying interest on the full initial principal even after repaying half the debt.',
        content_hi: 'लोन पर 10% की फ्लैट ब्याज दर वास्तव में लगभग 18% रिड्यूसिंग ब्याज दर के बराबर होती है, क्योंकि आधा कर्ज चुका देने के बाद भी आपसे पूरे शुरुआती मूलधन पर ब्याज लिया जाता है।',
        iconType: 'concept'
      }
    ],
    practical_example: {
      scenario: 'A phone costs ₹60,000 on 6-month "No-Cost EMI" vs ₹54,000 if paid upfront with an instant card discount.',
      scenario_hi: 'एक फोन 6 महीने की "नो-कॉस्ट ईएमआई" पर ₹60,000 का है, जबकि एकमुश्त भुगतान पर कार्ड डिस्काउंट के साथ ₹54,000 में मिल रहा है।',
      analysis: 'Taking the "No-Cost EMI" actually costs you ₹6,000 more (the lost cash discount) plus GST on interest.',
      analysis_hi: 'नो-कॉस्ट ईएमआई लेने पर वास्तव में आपको ₹6,000 का नुकसान (छूटा हुआ डिस्काउंट) और ब्याज पर जीएसटी देना पड़ रहा है।',
      actionable_tip: 'Always compare the total cash-outflow of paying upfront with discount vs EMI.',
      actionable_tip_hi: 'ईएमआई लेने से पहले हमेशा एकमुश्त नकद डिस्काउंट के साथ कुल खर्च की तुलना करें।'
    },
    key_takeaways: [
      'Good debt builds wealth or earning capability; bad debt funds depreciating consumption.',
      'No Cost EMIs involve processing fees, 18% GST on interest, and lost cash discounts.',
      'Never borrow flat-rate loans without calculating the true reducing balance rate.',
      'Keep total monthly EMIs strictly under 40% of your net monthly income.'
    ],
    key_takeaways_hi: [
      'अच्छा कर्ज भविष्य की आय बढ़ाता है; बुरा कर्ज गिरते मूल्य वाली उपभोग की चीजों पर खर्च होता है।',
      'नो कॉस्ट ईएमआई में प्रोसेसिंग शुल्क, 18% जीएसटी और नकद डिस्काउंट का नुकसान जुड़ा होता है।',
      'फ्लैट ब्याज दर वाले लोन लेने से पहले उसकी वास्तविक रिड्यूसिंग दर की जांच करें।',
      'अपनी सभी मासिक ईएमआई को कुल इन-हैंड सैलरी के 40% से नीचे रखें।'
    ]
  },
  {
    id: 'lesson-fin-8',
    topic_id: 'fin-8',
    subject_id: 'money-finance',
    title: 'Credit Cards: Maximum Rewards, Zero Interest',
    title_hi: 'क्रेडिट कार्ड: अधिकतम लाभ, शून्य ब्याज',
    subtitle: 'Leveraging 45-day interest-free grace periods while avoiding the 42% APR trap',
    subtitle_hi: '45 दिनों की ब्याज-मुक्त अवधि का लाभ उठाना और 42% वार्षिक ब्याज के जाल से बचना',
    estimated_minutes: 10,
    difficulty: 'Intermediate',
    hook: 'Credit cards are an incredible financial tool if you use them as a charge card—and a catastrophic debt trap if you treat them as free borrowed money.',
    hook_hi: 'क्रेडिट कार्ड एक बेहतरीन वित्तीय साधन है यदि आप इसे तय समय में चुकाने वाले कार्ड की तरह इस्तेमाल करें—लेकिन यह बर्बादी का फंदा बन जाता है यदि आप इसे मुफ्त का पैसा समझें।',
    sections: [
      {
        title: 'The Grace Period (45-50 Days)',
        title_hi: 'ब्याज-मुक्त छूट अवधि (45-50 दिन)',
        content: 'When you purchase an item on Day 1 of your 30-day billing cycle, you have 30 days until statement generation + 15 to 20 days until the due date. That is up to 50 days of interest-free credit.',
        content_hi: 'जब आप 30 दिन के बिलिंग चक्र के पहले दिन खरीदारी करते हैं, तो बिल बनने के 30 दिन + भुगतान की अंतिम तिथि तक के 15-20 दिन मिलते हैं। इस प्रकार आपको 50 दिन तक मुफ्त उधारी मिलती है।',
        iconType: 'concept'
      },
      {
        title: 'The "Minimum Amount Due" Nightmare',
        title_hi: '"न्यूनतम देय राशि (Minimum Due)" का दुष्चक्र',
        content: 'Credit card companies love when you pay only the "Minimum Amount Due" (typically 5%). The remaining 95% is charged astronomical interest rates of 3.5% per month (42% to 48% annualized APR) compounded daily! Moreover, all new purchases immediately lose their grace period.',
        content_hi: 'क्रेडिट कार्ड कंपनियां चाहती हैं कि आप केवल 5% मिनिमम ड्यू भरें। बाकी 95% रकम पर 3.5% प्रति माह (42% से 48% वार्षिक) की दर से दैनिक चक्रवृद्धि ब्याज लगता है! साथ ही नई खरीदारी पर ब्याज-मुक्त अवधि तुरंत समाप्त हो जाती है।',
        highlight: 'Always pay the Total Amount Due in full before the due date. Never pay just the Minimum Amount Due.',
        highlight_hi: 'अंतिम तिथि से पहले हमेशा कुल बकाया (Total Amount Due) का 100% भुगतान करें। कभी केवल मिनिमम ड्यू न भरें।',
        iconType: 'warning'
      }
    ],
    practical_example: {
      scenario: 'You have a ₹50,000 credit card balance. If you pay only the ₹2,500 minimum due each month at 42% APR, it will take over 8 years to clear and cost over ₹60,000 in interest alone!',
      scenario_hi: 'आपका क्रेडिट कार्ड बिल ₹50,000 है। यदि आप 42% ब्याज पर केवल ₹2,500 का मिनिमम ड्यू भरते हैं, तो इस बिल को चुकाने में 8 साल लगेंगे और ₹60,000 केवल ब्याज में चले जाएंगे!',
      analysis: 'The compounding interest on credit card debt is designed to trap revolving balances.',
      analysis_hi: 'क्रेडिट कार्ड का चक्रवृद्धि ब्याज ग्राहकों को लगातार कर्ज के पहिए में घुमाने के लिए ही बनाया गया है।',
      actionable_tip: 'Enable Auto-Debit for "Total Amount Due" from your primary bank account so you never miss a payment.',
      actionable_tip_hi: 'अपने बैंक खाते से "Total Amount Due" के लिए ऑटो-डेबिट चालू रखें ताकि कभी तारीख न चूके।'
    },
    key_takeaways: [
      'Credit cards provide up to 45-50 days of interest-free capital when paid in full.',
      'Paying only the minimum due triggers punitive 40%+ annual interest rates.',
      'Missing a payment removes the grace period on all subsequent purchases.',
      'Always set up auto-pay for the Total Outstanding Amount.'
    ],
    key_takeaways_hi: [
      'समय पर पूरा भुगतान करने पर क्रेडिट कार्ड 45 से 50 दिनों तक ब्याज-मुक्त नकदी उपलब्ध कराता है।',
      'केवल न्यूनतम राशि भरने पर 40% से अधिक का भारी वार्षिक ब्याज लागू होता है।',
      'एक भी भुगतान चूकने पर सभी आगामी खरीदारी पर ब्याज लगना शुरू हो जाता है।',
      'हमेशा कुल बकाया राशि (Total Outstanding) के लिए ऑटो-पे सेट करें।'
    ]
  },
  {
    id: 'lesson-fin-9',
    topic_id: 'fin-9',
    subject_id: 'money-finance',
    title: 'Term Insurance vs Health Insurance',
    title_hi: 'टर्म इंश्योरेंस बनाम हेल्थ इंश्योरेंस',
    subtitle: 'Separating pure protection from low-yield investment-insurance hybrid traps',
    subtitle_hi: 'शुद्ध सुरक्षा को कम रिटर्न वाली बीमा-निवेश योजनाओं (Endowment) के जाल से अलग समझना',
    estimated_minutes: 10,
    difficulty: 'Intermediate',
    hook: 'Insurance is risk protection, not an investment. Yet millions buy endowment policies and ULIPs that provide mediocre 4% returns and inadequate life cover.',
    hook_hi: 'बीमा जोखिम से सुरक्षा के लिए होता है, निवेश के लिए नहीं। फिर भी लाखों लोग एंडोमेंट और मनी-बैक पॉलिसियां खरीदते हैं जो 4% का मामूली रिटर्न और अपर्याप्त जीवन सुरक्षा देती हैं।',
    sections: [
      {
        title: 'Pure Term Insurance (10-20x Annual Income)',
        title_hi: 'प्योर टर्म इंश्योरेंस (वार्षिक आय का 10-20 गुना)',
        content: 'Term insurance is pure life insurance. If the policyholder passes away during the term, the nominee receives a substantial death benefit (e.g. ₹1 Crore to ₹2 Crore). If the policyholder survives, there is zero maturity payout. Because there is no investment component, premiums are remarkably inexpensive.',
        content_hi: 'टर्म इंश्योरेंस शुद्ध जीवन बीमा है। पॉलिसी अवधि के दौरान अनहोनी होने पर परिवार को बड़ा क्लेम (जैसे ₹1 करोड़ से ₹2 करोड़) मिलता है। जीवित रहने पर कोई रिटर्न नहीं मिलता, इसलिए इसका प्रीमियम बहुत कम होता है।',
        iconType: 'concept'
      },
      {
        title: 'Health Insurance: The Medical Shield',
        title_hi: 'हेल्थ इंश्योरेंस: चिकित्सा सुरक्षा कवच',
        content: 'A single major surgery or ICU hospitalization can deplete years of savings. Secure a comprehensive individual or family-floater health policy (₹10–25 Lakhs) with: 1. No room rent sub-limits, 2. No co-payment clauses, 3. Low pre-existing disease waiting periods.',
        content_hi: 'एक गंभीर बीमारी या अस्पताल में भर्ती होना वर्षों की जमा पूंजी खत्म कर सकता है। अपने और परिवार के लिए ₹10-25 लाख का ऐसा हेल्थ इंश्योरेंस लें जिसमें: 1. रूम रेंट की कोई सीमा न हो, 2. कोई को-पेमेंट शर्त न हो, 3. पुरानी बीमारियों का वेटिंग पीरियड कम हो।',
        highlight: 'Never rely solely on your employer health insurance, as it vanishes the day you switch or lose your job.',
        highlight_hi: 'केवल कंपनी (Employer) द्वारा दिए गए हेल्थ इंश्योरेंस पर निर्भर न रहें; नौकरी बदलते ही वह समाप्त हो जाता है।',
        iconType: 'tip'
      },
      {
        title: 'Avoid Mixing Insurance with Investment',
        title_hi: 'बीमा और निवेश को कभी न मिलाएं',
        content: 'Endowment policies, Money-Back plans, and traditional ULIPs offer the worst of both worlds: poor life coverage and poor returns that fail to beat inflation. Buy pure term insurance + pure index mutual funds instead.',
        content_hi: 'एंडोमेंट और मनी-बैक योजनाएं न तो पर्याप्त जीवन बीमा देती हैं और न ही महंगाई को हराने वाला रिटर्न। इसके बजाय शुद्ध टर्म इंश्योरेंस खरीदें और बाकी पैसा सीधे इंडेक्स म्यूचुअल फंड में लगाएं।',
        iconType: 'warning'
      }
    ],
    practical_example: {
      scenario: 'A 28-year-old buys a ₹1 Crore term plan for ~₹900/month and invests ₹5,000/month in equity index funds vs paying ₹6,000/month for an endowment plan offering only ₹10 Lakh cover.',
      scenario_hi: 'एक 28 वर्षीय व्यक्ति ₹900/माह में ₹1 करोड़ का टर्म प्लान लेता है और ₹5,000/माह इंडेक्स फंड में लगाता है, बनाम ₹6,000/माह देकर केवल ₹10 लाख का एंडोमेंट कवर लेता है।',
      analysis: 'The term + mutual fund combo provides 10x higher family protection AND generates an exponentially larger wealth corpus.',
      analysis_hi: 'टर्म + म्यूचुअल फंड का संयोजन परिवार को 10 गुना अधिक सुरक्षा देता है और परिपक्वता पर कई गुना बड़ी संपत्ति तैयार करता है।',
      actionable_tip: 'Never combine investment and insurance. Keep them strictly separate.',
      actionable_tip_hi: 'बीमा और निवेश को हमेशा पूरी तरह अलग रखें।'
    },
    key_takeaways: [
      'Term insurance provides high life cover at low premiums to secure dependents.',
      'Always have a personal health insurance policy separate from employer cover.',
      'Watch out for room rent caps and co-pay clauses in health policies.',
      'Avoid endowment and money-back plans that deliver sub-inflationary 4-5% returns.'
    ],
    key_takeaways_hi: [
      'टर्म इंश्योरेंस कम प्रीमियम पर आश्रितों के लिए सबसे बड़ा सुरक्षा कवच देता है।',
      'कंपनी के कवर से अलग हमेशा अपनी स्वतंत्र व्यक्तिगत हेल्थ पॉलिसी रखें।',
      'हेल्थ पॉलिसी में रूम रेंट लिमिट और को-पेमेंट शर्तों की सावधानीपूर्वक जांच करें।',
      'एंडोमेंट और मनी-बैक पॉलिसियों से बचें जो महंगाई दर से भी कम 4-5% रिटर्न देती हैं।'
    ]
  },
  {
    id: 'lesson-fin-10',
    topic_id: 'fin-10',
    subject_id: 'money-finance',
    title: 'Index Funds & Systematic Investing (SIP)',
    title_hi: 'इंडेक्स फंड एवं व्यवस्थित निवेश योजना (SIP)',
    subtitle: 'Low-cost passive investing and the power of Rupee Cost Averaging',
    subtitle_hi: 'कम लागत वाला पैसिव निवेश और रुपया लागत औसत (Rupee Cost Averaging) की शक्ति',
    estimated_minutes: 10,
    difficulty: 'Advanced',
    hook: 'Over 85% of active fund managers fail to beat the broader market index (like Nifty 50 or S&P 500) over 10-15 year horizons after accounting for fees. Why pay high fees to underperform?',
    hook_hi: '10 से 15 वर्षों की अवधि में 85% से अधिक सक्रिय फंड मैनेजर बाजार के मुख्य इंडेक्स (जैसे Nifty 50) को पछाड़ने में असफल रहते हैं। तो फिर कम रिटर्न के लिए अधिक फीस क्यों दें?',
    sections: [
      {
        title: 'What is an Index Fund?',
        title_hi: 'इंडेक्स फंड क्या होता है?',
        content: 'An index fund passively replicates a major stock market index (e.g., Nifty 50 or Sensex). Instead of an expensive fund manager picking stocks, the fund owns the top 50 companies proportional to their market weight. This keeps expense ratios extremely low (0.1% vs 1.5-2.0% for active funds).',
        content_hi: 'इंडेक्स फंड बाजार के मुख्य सूचकांक (जैसे निफ्टी 50 या सेंसेक्स) की कंपनियों में उसी अनुपात में निवेश करता है। महंगा फंड मैनेजर रखने के बजाय यह शीर्ष 50 कंपनियों का मालिक बनता है, जिससे खर्च अनुपात (Expense Ratio) बेहद कम (लगभग 0.1%) रहता है।',
        iconType: 'concept'
      },
      {
        title: 'Rupee Cost Averaging via SIP',
        title_hi: 'एसआईपी द्वारा रुपया लागत औसत (Rupee Cost Averaging)',
        content: 'A Systematic Investment Plan (SIP) invests a fixed amount every month regardless of whether the market is up or down. When markets crash, your fixed monthly sum buys MORE units. When markets rise, your units appreciate in value.',
        content_hi: 'सिस्टेमैटिक इन्वेस्टमेंट प्लान (SIP) हर महीने एक निश्चित राशि निवेश करता है, चाहे बाजार ऊपर हो या नीचे। जब बाजार गिरता है तो आपको अधिक यूनिट्स मिलती हैं, और जब बाजार बढ़ता है तो आपकी संपत्ति का मूल्य बढ़ता है।',
        highlight: 'SIP removes emotion and guesswork. You never have to predict market peaks or bottoms.',
        highlight_hi: 'एसआईपी मानवीय भावनाओं और अनुमान को दूर करता है। आपको बाजार के निचले या ऊपरी स्तर का अंदाजा लगाने की जरूरत नहीं होती।',
        iconType: 'tip'
      },
      {
        title: 'Direct Plans vs Regular Plans',
        title_hi: 'डायरेक्ट प्लान बनाम रेगुलर प्लान',
        content: 'Always choose the "Direct-Growth" plan of a mutual fund instead of "Regular-Growth". Regular plans pay ongoing commissions to distributors, which can eat up 20% to 30% of your total gains over a 25-year compounding journey.',
        content_hi: 'हमेशा म्यूचुअल फंड का "Direct-Growth" विकल्प चुनें, "Regular-Growth" नहीं। रेगुलर प्लान में बिचौलियों को कमीशन जाता है, जो 25 वर्षों में आपके कुल मुनाफे का 20% से 30% हिस्सा चट कर सकता है।',
        iconType: 'warning'
      }
    ],
    practical_example: {
      scenario: 'You invest ₹5,000 every month via direct index SIP starting at age 25. Over 30 years at 12% average CAGR, you invest ₹18 Lakhs.',
      scenario_hi: 'आप 25 वर्ष की उम्र से डायरेक्ट इंडेक्स फंड में ₹5,000/माह की एसआईपी करते हैं। 30 वर्षों में 12% वार्षिक रिटर्न पर आपका कुल निवेश ₹18 लाख होगा।',
      analysis: 'Your final corpus at age 55 grows to approximately ₹1.76 Crores!',
      analysis_hi: '55 वर्ष की उम्र में आपका कुल फंड लगभग ₹1.76 करोड़ तक पहुंच जाएगा!',
      actionable_tip: 'Select a broad low-cost Nifty 50 Direct Index Fund and increase your SIP amount by 10% each year as your income grows (Step-Up SIP).',
      actionable_tip_hi: 'एक कम खर्च वाला Nifty 50 Direct Index Fund चुनें और हर साल आय बढ़ने के साथ अपनी एसआईपी को 10% बढ़ाएं (Step-Up SIP)।'
    },
    key_takeaways: [
      'Index funds provide broad diversification at fraction of active fund fees.',
      'SIP leverages rupee cost averaging to turn market volatility to your advantage.',
      'Always invest in "Direct" mutual fund plans to avoid distributor commission drag.',
      'Step-up your SIP contributions annually to supercharge your retirement corpus.'
    ],
    key_takeaways_hi: [
      'इंडेक्स फंड बेहद कम खर्च में देश की शीर्ष कंपनियों में सुरक्षित विविधीकरण देते हैं।',
      'एसआईपी बाजार के उतार-चढ़ाव को आपके पक्ष में बदलकर लागत का औसत कर देती है।',
      'कमीशन से बचने के लिए हमेशा "Direct" म्यूचुअल फंड योजनाओं में निवेश करें।',
      'हर साल अपनी एसआईपी राशि में 10% की बढ़ोतरी (Step-up) करें।'
    ]
  }
];

export const FINANCE_QUESTIONS: Question[] = [
  // Lesson 1 questions
  {
    id: 'q-fin-1-1',
    lesson_id: 'lesson-fin-1',
    subject_id: 'money-finance',
    question: 'In the 50/30/20 budgeting rule, what does the 20% portion represent?',
    question_hi: '50/30/20 बजट नियम में 20% का हिस्सा किस उद्देश्य के लिए निर्धारित है?',
    option_a: 'Discretionary dining out and entertainment',
    option_a_hi: 'बाहर खाना और मनोरंजन के खर्च',
    option_b: 'Savings, investments, and debt prepayment',
    option_b_hi: 'बचत, निवेश और कर्ज का अग्रिम भुगतान',
    option_c: 'Rental expenses and house maintenance',
    option_c_hi: 'घर का किराया और रखरखाव',
    option_d: 'Taxes and government cess',
    option_d_hi: 'टैक्स और सरकारी उपकर',
    correct_answer: 'B',
    explanation: 'The 20% bucket is dedicated to building wealth and future financial security (SIPs, emergency funds, debt reduction).',
    explanation_hi: '20% हिस्सा भविष्य की वित्तीय सुरक्षा और संपत्ति निर्माण (एसआईपी, इमरजेंसी फंड, कर्ज मुक्ति) के लिए रखा जाता है।'
  },
  {
    id: 'q-fin-1-2',
    lesson_id: 'lesson-fin-1',
    subject_id: 'money-finance',
    question: 'What does "paying yourself first" mean?',
    question_hi: '"पहले खुद को भुगतान करना (Pay Yourself First)" का वित्तीय अर्थ क्या है?',
    option_a: 'Buying luxury items before paying rent',
    option_a_hi: 'किराया देने से पहले विलासिता का सामान खरीदना',
    option_b: 'Automatically transferring your savings portion into investments on salary day before spending',
    option_b_hi: 'सैलरी आते ही खर्च करने से पहले अपनी बचत के हिस्से को स्वचालित रूप से निवेश में डालना',
    option_c: 'Withdrawing all salary in cash',
    option_c_hi: 'पूरा वेतन नकद निकाल लेना',
    option_d: 'Paying off friends before bills',
    option_d_hi: 'बिलों से पहले दोस्तों का कर्ज चुकाना',
    correct_answer: 'B',
    explanation: 'Paying yourself first means prioritizing long-term savings by automating investments the day income arrives.',
    explanation_hi: 'इसका अर्थ है कि आय आते ही सबसे पहले अपने भविष्य की बचत को प्राथमिकता देकर ऑटो-डेबिट के जरिए निवेश करना।'
  },

  // Lesson 2 questions
  {
    id: 'q-fin-2-1',
    lesson_id: 'lesson-fin-2',
    subject_id: 'money-finance',
    question: 'If your savings account earns 3% annual interest while consumer inflation is 6%, what is your Real Return?',
    question_hi: 'यदि आपका बचत खाता 3% वार्षिक ब्याज देता है जबकि महंगाई दर 6% है, तो आपका वास्तविक रिटर्न (Real Return) क्या होगा?',
    option_a: '+9%',
    option_a_hi: '+9%',
    option_b: '+3%',
    option_b_hi: '+3%',
    option_c: '-3%',
    option_c_hi: '-3%',
    option_d: '0%',
    option_d_hi: '0%',
    correct_answer: 'C',
    explanation: 'Real Return = Nominal Rate (3%) - Inflation (6%) = -3% per year in purchasing power.',
    explanation_hi: 'वास्तविक रिटर्न = नाममात्र ब्याज (3%) - महंगाई दर (6%) = -3% प्रति वर्ष (क्रय शक्ति में कमी)।'
  },

  // Lesson 3 questions
  {
    id: 'q-fin-3-1',
    lesson_id: 'lesson-fin-3',
    subject_id: 'money-finance',
    question: 'What is the recommended size for an adequate personal emergency fund?',
    question_hi: 'एक व्यक्ति के पास पर्याप्त इमरजेंसी फंड का आकार कितना होना चाहिए?',
    option_a: '1 week of pocket money',
    option_a_hi: '1 सप्ताह का जेब खर्च',
    option_b: '3 to 6 months of essential living expenses',
    option_b_hi: '3 से 6 महीने का अनिवार्य जीवनयापन खर्च',
    option_c: '5 years of luxury lifestyle spending',
    option_c_hi: '5 वर्ष का विलासितापूर्ण खर्च',
    option_d: 'Equal to your total credit card limit',
    option_d_hi: 'क्रेडिट कार्ड की कुल लिमिट के बराबर',
    correct_answer: 'B',
    explanation: '3 to 6 months of mandatory living expenses provides adequate safety against sudden job loss or medical crises.',
    explanation_hi: '3 से 6 महीने का अनिवार्य खर्च अचानक नौकरी छूटने या स्वास्थ्य संकट के समय पर्याप्त सुरक्षा देता है।'
  },

  // Lesson 4 questions
  {
    id: 'q-fin-4-1',
    lesson_id: 'lesson-fin-4',
    subject_id: 'money-finance',
    question: 'According to the Rule of 72, approximately how many years will it take for money to double at a 12% annual return?',
    question_hi: '72 के नियम के अनुसार, 12% वार्षिक रिटर्न पर निवेशित धन को दोगुना होने में लगभग कितने वर्ष लगेंगे?',
    option_a: '12 years',
    option_a_hi: '12 वर्ष',
    option_b: '6 years',
    option_b_hi: '6 वर्ष',
    option_c: '7.2 years',
    option_c_hi: '7.2 वर्ष',
    option_d: '24 years',
    option_d_hi: '24 वर्ष',
    correct_answer: 'B',
    explanation: '72 divided by 12 = 6 years to double your investment.',
    explanation_hi: '72 को 12 से भाग देने पर 6 प्राप्त होता है, यानी 6 वर्षों में पैसा दोगुना होगा।'
  },

  // Lesson 5 questions
  {
    id: 'q-fin-5-1',
    lesson_id: 'lesson-fin-5',
    subject_id: 'money-finance',
    question: 'When is a user required to enter their UPI PIN on payment apps?',
    question_hi: 'पेमेंट ऐप्स पर यूजर को अपना यूपीआई पिन (UPI PIN) कब दर्ज करना होता है?',
    option_a: 'Only when SENDING money or checking account balance',
    option_a_hi: 'केवल पैसे भेजते समय या खाता शेष (Balance) चेक करते समय',
    option_b: 'When receiving money from a stranger',
    option_b_hi: 'किसी अजनबी से पैसे प्राप्त करते समय',
    option_c: 'When claiming cashback vouchers',
    option_c_hi: 'कैशबैक वाउचर क्लेम करते समय',
    option_d: 'To receive a customer refund',
    option_d_hi: 'रिफंड प्राप्त करने के लिए',
    correct_answer: 'A',
    explanation: 'Entering a UPI PIN authorizes a debit from your account. Receiving funds NEVER requires entering a PIN.',
    explanation_hi: 'यूपीआई पिन हमेशा खाते से पैसे काटने (Debit) के लिए होता है। पैसे प्राप्त करने के लिए कभी पिन नहीं चाहिए।'
  },

  // Lesson 6 questions
  {
    id: 'q-fin-6-1',
    lesson_id: 'lesson-fin-6',
    subject_id: 'money-finance',
    question: 'To maintain a healthy credit score, what is the ideal credit utilization ratio ceiling?',
    question_hi: 'एक स्वस्थ क्रेडिट स्कोर बनाए रखने के लिए क्रेडिट कार्ड के उपयोग की अनुशंसित अधिकतम सीमा (Utilization Ratio) क्या है?',
    option_a: '100% of your limit',
    option_a_hi: 'कुल लिमिट का 100%',
    option_b: 'Below 30% of your total credit limit',
    option_b_hi: 'कुल क्रेडिट लिमिट के 30% से कम',
    option_c: 'Exactly 75%',
    option_c_hi: 'ठीक 75%',
    option_d: 'Above 90%',
    option_d_hi: '90% से अधिक',
    correct_answer: 'B',
    explanation: 'Keeping credit utilization below 30% demonstrates disciplined credit management to bureaus.',
    explanation_hi: 'क्रेडिट उपयोग को 30% से नीचे रखने से क्रेडिट ब्यूरो आपको अनुशासित उपभोक्ता मानते हैं और स्कोर बेहतर रहता है।'
  },

  // Lesson 7 questions
  {
    id: 'q-fin-7-1',
    lesson_id: 'lesson-fin-7',
    subject_id: 'money-finance',
    question: 'Why are "No Cost EMIs" not completely free of extra charges?',
    question_hi: '"नो कॉस्ट ईएमआई" पूरी तरह अतिरिक्त शुल्कों से मुक्त क्यों नहीं होती है?',
    option_a: 'Banks add secret penalties',
    option_a_hi: 'बैंक गुप्त जुर्माना लगाते हैं',
    option_b: 'You still pay 18% GST on the interest component, processing fees, and often miss instant cash discounts',
    option_b_hi: 'आपको ब्याज घटक पर 18% जीएसटी, प्रोसेसिंग फीस देनी होती है और नकद डिस्काउंट छूट जाता है',
    option_c: 'They convert your card to a debit card',
    option_c_hi: 'वे आपके कार्ड को डेबिट कार्ड में बदल देते हैं',
    option_d: 'They require property collateral',
    option_d_hi: 'वे संपत्ति गिरवी रखने की मांग करते हैं',
    correct_answer: 'B',
    explanation: 'No Cost EMIs incur processing fees and mandatory 18% GST on interest, while forfeiting upfront cash discounts.',
    explanation_hi: 'नो कॉस्ट ईएमआई में प्रोसेसिंग शुल्क, ब्याज पर 18% जीएसटी और नकद भुगतान पर मिलने वाला डिस्काउंट खो जाता है।'
  },

  // Lesson 8 questions
  {
    id: 'q-fin-8-1',
    lesson_id: 'lesson-fin-8',
    subject_id: 'money-finance',
    question: 'What happens if you pay only the "Minimum Amount Due" on a credit card statement?',
    question_hi: 'क्रेडिट कार्ड के बिल पर यदि आप केवल "न्यूनतम देय राशि (Minimum Amount Due)" चुकाते हैं तो क्या होता है?',
    option_a: 'The remaining balance is forgiven by the bank',
    option_a_hi: 'बाकी बचा हुआ कर्ज बैंक द्वारा माफ कर दिया जाता है',
    option_b: 'You are charged 36-48% annual interest on the revolving balance and lose the interest-free grace period',
    option_b_hi: 'बकाया राशि पर 36-48% वार्षिक ब्याज लगता है और सभी खरीदारी पर ब्याज-मुक्त अवधि समाप्त हो जाती है',
    option_c: 'Your credit limit doubles',
    option_c_hi: 'आपकी क्रेडिट लिमिट दोगुनी हो जाती है',
    option_d: 'You earn bonus reward points',
    option_d_hi: 'आपको बोनस रिवॉर्ड पॉइंट्स मिलते हैं',
    correct_answer: 'B',
    explanation: 'Paying only minimum due triggers steep revolving interest rates (up to 42%+ APR) and cancels interest-free grace periods.',
    explanation_hi: 'केवल न्यूनतम देय राशि चुकाने पर 40% से अधिक का भारी ब्याज लगता है और ब्याज-मुक्त अवधि समाप्त हो जाती है।'
  },

  // Lesson 9 questions
  {
    id: 'q-fin-9-1',
    lesson_id: 'lesson-fin-9',
    subject_id: 'money-finance',
    question: 'Why is pure Term Insurance preferred over endowment or money-back policies for life coverage?',
    question_hi: 'जीवन सुरक्षा के लिए एंडोमेंट या मनी-बैक पॉलिसियों की तुलना में शुद्ध टर्म इंश्योरेंस को बेहतर क्यों माना जाता है?',
    option_a: 'It offers high life coverage at remarkably affordable premiums without diluting returns',
    option_a_hi: 'यह बिना निवेश को उलझाए बेहद किफायती प्रीमियम पर बहुत बड़ा जीवन कवर देता है',
    option_b: 'It pays guaranteed lottery prizes every 5 years',
    option_b_hi: 'यह हर 5 साल में लॉटरी इनाम देता है',
    option_c: 'It covers stock market losses',
    option_c_hi: 'यह शेयर बाजार के नुकसान की भरपाई करता है',
    option_d: 'It has no medical requirements ever',
    option_d_hi: 'इसमें कभी मेडिकल जांच की जरूरत नहीं होती',
    correct_answer: 'A',
    explanation: 'Term plans focus purely on risk protection, giving maximum financial cover to your family at the lowest cost.',
    explanation_hi: 'टर्म प्लान केवल जोखिम से सुरक्षा पर केंद्रित होते हैं, जिससे सबसे कम लागत पर परिवार को सबसे बड़ी सुरक्षा मिलती है।'
  },

  // Lesson 10 questions
  {
    id: 'q-fin-10-1',
    lesson_id: 'lesson-fin-10',
    subject_id: 'money-finance',
    question: 'Why should long-term investors choose "Direct" mutual fund plans instead of "Regular" plans?',
    question_hi: 'दीर्घकालिक निवेशकों को म्यूचुअल फंड में "Regular" प्लान के बजाय "Direct" प्लान क्यों चुनना चाहिए?',
    option_a: 'Direct plans eliminate intermediary distributor commissions, compounding into higher long-term wealth',
    option_a_hi: 'डायरेक्ट प्लान में डिस्ट्रीब्यूटर का कमीशन नहीं कटता, जिससे लंबी अवधि में काफी अधिक संपत्ति बनती है',
    option_b: 'Direct plans are guaranteed not to drop in price',
    option_b_hi: 'डायरेक्ट प्लान की कीमत में कभी गिरावट नहीं आती',
    option_c: 'Regular plans are illegal',
    option_c_hi: 'रेगुलर प्लान गैरकानूनी होते हैं',
    option_d: 'Direct plans have higher tax exemptions',
    option_d_hi: 'डायरेक्ट प्लान में अधिक टैक्स छूट मिलती है',
    correct_answer: 'A',
    explanation: 'Direct plans have lower expense ratios because no ongoing distributor commission is deducted from your corpus.',
    explanation_hi: 'डायरेक्ट प्लान में कोई एजेंट कमीशन नहीं कटता, जिससे कम खर्च अनुपात के कारण लंबे समय में बड़ा रिटर्न मिलता है।'
  }
];
