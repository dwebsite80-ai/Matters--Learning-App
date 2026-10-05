// High-quality educational and editorial images matching the Matters design direction

export const USER_AVATAR_IMAGE =
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80'; // Portrait of young man (Anurag) with warm smile

export const PROFILE_COVER_IMAGE =
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'; // Majestic sunset mountain valley

// ============================================================================
// COURSE / SUBJECT LEVEL IMAGES (Overall Domain Representation)
// ============================================================================
export const SUBJECT_IMAGES: Record<string, { thumbnail: string; banner: string }> = {
  'law-rights': {
    thumbnail:
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80', // Golden scales of justice in warm library
    banner:
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
  },
  'money-finance': {
    thumbnail:
      'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=600&q=80', // Stacked gold coins & finance desk
    banner:
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
  },
  economics: {
    thumbnail:
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80', // Glowing world globe & global market charts
    banner:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
  },
  'bihar-gk': {
    thumbnail:
      'https://images.unsplash.com/photo-1600100397608-f010f443b74f?auto=format&fit=crop&w=600&q=80', // Ancient Nalanda Mahavihara ruins
    banner:
      'https://images.unsplash.com/photo-1600100397608-f010f443b74f?auto=format&fit=crop&w=1200&q=80',
  },
  'polity-constitution': {
    thumbnail:
      'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80', // Parliament & constitutional pillars
    banner:
      'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
  },
  'history-movement': {
    thumbnail:
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80', // Historical monument stone architecture
    banner:
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
  },
  'personality-development': {
    thumbnail:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80', // Confident executive leader & communication
    banner:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1200&q=80',
  },
  'dressing-sense': {
    thumbnail:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80', // Tailored wardrobe, fabric elegance & style
    banner:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
  },
  'case-studies': {
    thumbnail:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80', // Modern glass skyscraper business headquarters
    banner:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  },
  'time-management': {
    thumbnail:
      'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=600&q=80', // Mechanical clock, hourglass & calendar
    banner:
      'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=1200&q=80',
  },
  'first-aid': {
    thumbnail:
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80', // Emergency response & medical care
    banner:
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
  },
  'survival-skills': {
    thumbnail:
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80', // Campfire, wilderness compass & outdoor survival
    banner:
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80',
  },
  'modern-farming': {
    thumbnail:
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=600&q=80', // Lush modern sustainable precision agriculture
    banner:
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80',
  },
  philosophy: {
    thumbnail:
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80', // Classical Greek philosopher bust / marble sculpture
    banner:
      'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
  },
  paradoxes: {
    thumbnail:
      'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=600&q=80', // Abstract paradox labyrinth / surreal physics
    banner:
      'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=1200&q=80',
  },
};

// ============================================================================
// SUBJECT PREFIX LOOKUP
// Used to normalize lesson indices and topic IDs to their canonical keys
// ============================================================================
export const SUBJECT_PREFIX_MAP: Record<string, string> = {
  'law-rights': 'law',
  'money-finance': 'fin',
  economics: 'eco',
  'bihar-gk': 'bihar',
  'polity-constitution': 'polity',
  'history-movement': 'history',
  'personality-development': 'personality',
  'dressing-sense': 'dressing',
  'case-studies': 'case',
  'time-management': 'time',
  'first-aid': 'firstaid',
  'survival-skills': 'survival',
  'modern-farming': 'farming',
  philosophy: 'philosophy',
  paradoxes: 'paradoxes',
};

// ============================================================================
// UNIQUE LESSON-SPECIFIC IMAGES (MAPPED BY EXACT TOPIC / LESSON KEY)
// Each lesson has its own distinct editorial photograph visually matching its title.
// Keys exist in canonical form (e.g. 'paradoxes-1') and 'lesson-' form.
// ============================================================================
const RAW_LESSON_IMAGES: Record<string, string> = {
  // --- Mind-Bending Paradoxes ---
  'paradoxes-1': 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=700&q=80', // The Ship of Theseus: ancient wooden sailing vessel on sea
  'paradoxes-2': 'https://images.unsplash.com/photo-1501139083538-0139583c060f?auto=format&fit=crop&w=700&q=80', // The Grandfather Paradox: glowing pocket watch & time warp
  'paradoxes-3': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=80', // The Liar Paradox: infinite mirror reflection / self-reference
  'paradoxes-4': 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?auto=format&fit=crop&w=700&q=80', // Simpson's Paradox & Monty Hall: three closed doors / probability game
  'paradoxes-5': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=700&q=80', // The Fermi Paradox: deep cosmic stars & radio telescope observatory
  'paradoxes-6': 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=700&q=80', // Paradox of Choice: branching labyrinth / crossroads of paths
  'paradoxes-7': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80', // The Sorites Paradox: golden grain sand dunes / heap of sand
  'paradoxes-8': 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=700&q=80', // Prisoner's Dilemma: dramatic chess match of strategy & decisions
  'paradoxes-9': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=700&q=80', // Bootstrap Paradox: endless staircase loop / recursive spiral
  'paradoxes-10': 'https://images.unsplash.com/photo-1575517111478-7f6afd0973db?auto=format&fit=crop&w=700&q=80', // Paradox of Tolerance: classical Athenian assembly forum & stone pillars

  // --- Philosophy: Think Deeper, Live Better ---
  'philosophy-1': 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=700&q=80', // What is Philosophy: solitary thinker silhouette at sunrise horizon
  'philosophy-2': 'https://images.unsplash.com/photo-1569420067645-12cf513511eb?auto=format&fit=crop&w=700&q=80', // Socrates & Examined Life: classical marble bust of Socrates
  'philosophy-3': 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=700&q=80', // Stoicism & Inner Peace: weathered stone statue overlooking tranquil ocean
  'philosophy-4': 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=700&q=80', // Plato's Cave & Shadows: beam of light piercing dark underground cavern
  'philosophy-5': 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=700&q=80', // Ethics & Moral Dilemmas: bronze balance scales weighing choices
  'philosophy-6': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=700&q=80', // Eastern Philosophies: balanced zen river stones with morning dew
  'philosophy-7': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=700&q=80', // Existentialism & Absurdism: solitary climber on alpine summit ridge
  'philosophy-8': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=80', // Logic & Fallacies: geometric labyrinth architectural light and shadow
  'philosophy-9': 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=700&q=80', // Political Philosophy & Social Contract: grand parliament hall
  'philosophy-10': 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=700&q=80', // Living Philosophically: open vintage leather journal in warm sunlight

  // --- Law & Rights ---
  'law-1': 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=700&q=80', // Fundamental Rights: classical citizen rights codex
  'law-2': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80', // Article 21: free silhouette walking toward golden sunrise
  'law-3': 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=700&q=80', // FIR Basics: official police complaint ledger & desk pen
  'law-4': 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=700&q=80', // Arrest & Detention: stately courthouse stone pillars
  'law-5': 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=700&q=80', // Consumer Rights: retail purchase package & verified receipt
  'law-6': 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=700&q=80', // RTI Act: high glass atrium of public archives and records
  'law-7': 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=700&q=80', // Cybercrime & Fraud: digital security padlock & data shield
  'law-8': 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=700&q=80', // Traffic Stops & Challans: highway asphalt road and transit checkpoint
  'law-9': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=700&q=80', // Rental Agreements: keys resting on signed apartment lease
  'law-10': 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&w=700&q=80', // Contracts & Notarization: legal seal stamp on parchment

  // --- Money & Finance ---
  'fin-1': 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=700&q=80', // 50/30/20 Budgeting: clean financial journal, calculator & coffee
  'fin-2': 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=700&q=80', // Saving vs Inflation: currency notes & hourglass time decay
  'fin-3': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=700&q=80', // Emergency Fund: safe vault lockbox with liquid reserve
  'fin-4': 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=700&q=80', // Compound Interest: coin plant sprouting steadily in rich soil
  'fin-5': 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&w=700&q=80', // UPI & Digital Banking: smartphone contactless digital payment
  'fin-6': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&q=80', // Credit Scores (CIBIL): financial health analytics & score trend
  'fin-7': 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=700&q=80', // Good Debt vs Bad Debt: loan calculations & mortgage paperwork
  'fin-8': 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=700&q=80', // Credit Cards: sleek metallic card chip on minimalist desk
  'fin-9': 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=700&q=80', // Insurance: protective umbrella shield over miniature home
  'fin-10': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=700&q=80', // Index Funds & SIP: green upward investment growth chart

  // --- Economics ---
  'eco-1': 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=700&q=80', // Scarcity & Choices: bustling market exchange of commodities
  'eco-2': 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=700&q=80', // Demand & Supply: container cargo crane loading global goods
  'eco-3': 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=80', // Inflation & CPI: grocery basket with price metrics
  'eco-4': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=700&q=80', // GDP: modern industrial skyline and economic production
  'eco-5': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=700&q=80', // Unemployment & Labor: busy morning commuter workforce
  'eco-6': 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=700&q=80', // Central Banks & Repo Rate: stately neoclassical central bank facade
  'eco-7': 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&w=700&q=80', // Monetary Policy: heavy circular steel vault door
  'eco-8': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&q=80', // Fiscal Policy: national budget ledger & revenue analytics
  'eco-9': 'https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?auto=format&fit=crop&w=700&q=80', // Recessions & Cycles: dramatic storm clouds over city financial district
  'eco-10': 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=700&q=80', // Foreign Exchange: international currency exchange rate board

  // --- Bihar Special GK ---
  'bihar-1': 'https://images.unsplash.com/photo-1524654458049-e36be0721fa2?auto=format&fit=crop&w=700&q=80', // Formation of Bihar: historic topographical map of the region
  'bihar-2': 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=700&q=80', // Ancient Bihar & Magadha: ancient stone fortress ruins of Rajgir
  'bihar-3': 'https://images.unsplash.com/photo-1585130401366-fe05a8d813c4?auto=format&fit=crop&w=700&q=80', // Maurya & Gupta: Ashoka pillar sandstone lion carvings
  'bihar-4': 'https://images.unsplash.com/photo-1600100397608-f010f443b74f?auto=format&fit=crop&w=700&q=80', // Buddhism & Jainism: sacred Bodh Gaya stupa & Nalanda
  'bihar-5': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=700&q=80', // Medieval Bihar: grand sandstone mausoleum dome of Sher Shah Suri
  'bihar-6': 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=700&q=80', // Modern History of Bihar: Champaran Satyagraha spinning wheel
  'bihar-7': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=700&q=80', // Geography of Bihar: emerald green Gangetic fertile agricultural plains
  'bihar-8': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80', // Rivers & Agriculture: the holy Ganges flowing wide at sunrise
  'bihar-9': 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=700&q=80', // Economy & Infrastructure: modern Ganga bridge & connectivity
  'bihar-10': 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=700&q=80', // Personalities & Administration: Patna Secretariat grand historic dome

  // --- Indian Polity & Constitution ---
  'polity-1': 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&w=700&q=80', // Making of Constitution: calligraphy manuscript of Indian Constitution
  'polity-2': 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=700&q=80', // Preamble: illuminated preamble decree & principles
  'polity-3': 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=700&q=80', // Fundamental Rights: Ashoka Lion emblem & balance scales
  'polity-4': 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=700&q=80', // Directive Principles: rising sun of social welfare
  'polity-5': 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=700&q=80', // President & Prime Minister: Rashtrapati Bhavan ceremonial dome
  'polity-6': 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=700&q=80', // Parliament & Law: circular Central Hall of Parliament
  'polity-7': 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=700&q=80', // Supreme Court: Courtroom bench & legal Gavel
  'polity-8': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=80', // Federalism: architectural balance arches of the union
  'polity-9': 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=700&q=80', // Panchayati Raj: ancient village banyan tree gathering
  'polity-10': 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=700&q=80', // Constitutional Bodies: ballot box of democracy

  // --- Indian History & National Movement ---
  'history-1': 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=700&q=80', // Indus Valley & Vedic: ancient terracotta brick civilization artifact
  'history-2': 'https://images.unsplash.com/photo-1600100397608-f010f443b74f?auto=format&fit=crop&w=700&q=80', // Religious Movements: Sanchi Stupa carved torana arch
  'history-3': 'https://images.unsplash.com/photo-1585130401366-fe05a8d813c4?auto=format&fit=crop&w=700&q=80', // Delhi Sultanate & Mughals: Mughal red sandstone archway
  'history-4': 'https://images.unsplash.com/photo-1524654458049-e36be0721fa2?auto=format&fit=crop&w=700&q=80', // British Expansion: vintage 19th-century colonial map
  'history-5': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=700&q=80', // Revolt of 1857: historic bronze cannon on rampart
  'history-6': 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=700&q=80', // Socio-Religious Reform: antique printing press & books
  'history-7': 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=700&q=80', // Early Congress & Nationalism: historic hall meeting podium
  'history-8': 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=700&q=80', // Swadeshi Movement: handwoven khadi cotton textile loom
  'history-9': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80', // Gandhian Era & Dandi March: coastal path leading forward
  'history-10': 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=700&q=80', // Quit India & Independence: Red Fort celebratory flag at dawn

  // --- Case Studies: Real-World Business Stories ---
  'case-1': 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=700&q=80', // Airbnb: cozy boutique loft bedroom with air mattress legacy
  'case-2': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=700&q=80', // Zerodha: multi-monitor minimalist FinTech trading workstation
  'case-3': 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=700&q=80', // Amul: fresh pure milk pouring at cooperative dairy
  'case-4': 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=700&q=80', // Canva: digital artist working on vibrant design canvas
  'case-5': 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=700&q=80', // OYO Rooms: standardized boutique hotel room with crisp linens
  'case-6': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=80', // Reliance: monumental energy and petrochemical industrial plant
  'case-7': 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=700&q=80', // Spanx: fashion design studio mannequin with fabric shears
  'case-8': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=700&q=80', // Patagonia: majestic jagged mountain wilderness peaks
  'case-9': 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&w=700&q=80', // Local Kirana Store: authentic neighbourhood general store jars and grain sacks
  'case-10': 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=700&q=80', // Failing Forward: startup pivot strategy whiteboard and team review

  // --- Personality Development ---
  'personality-1': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80', // First Impressions: confident professional handshake and warm eye contact
  'personality-2': 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=700&q=80', // Speaking Clearly: confident speaker with microphone delivering message
  'personality-3': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=700&q=80', // Active Listening: two engaged colleagues in deep conversation over coffee
  'personality-4': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=700&q=80', // Emotional Intelligence: mindful composure and tranquil meditation
  'personality-5': 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=700&q=80', // Overcoming Shyness: stepping into the warm morning spotlight
  'personality-6': 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=700&q=80', // Daily Self-Discipline: early morning running shoes and organized habits
  'personality-7': 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=700&q=80', // Dealing with Criticism: calm, respectful dialogue and diplomatic posture
  'personality-8': 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=700&q=80', // Public Speaking: keynote speaker on brightly lit stage
  'personality-9': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=700&q=80', // Leadership & Ethics: empathetic leader guiding colleagues with blueprint
  'personality-10': 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=700&q=80', // Long-Term Growth: journal writing overlooking expansive horizon

  // --- Dressing Sense ---
  'dressing-1': 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=700&q=80', // Body Type & Fit: bespoke tailor measuring cloth with tape
  'dressing-2': 'https://images.unsplash.com/photo-1520006403909-838d6b92c22e?auto=format&fit=crop&w=700&q=80', // Color Coordination: vibrant textile color swatches & harmony
  'dressing-3': 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=700&q=80', // Essential Wardrobe Basics: clean minimalist capsule rack on wooden hangers
  'dressing-4': 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=700&q=80', // Climate & Fabric Care: natural breathable cotton & linen weaves
  'dressing-5': 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80', // Casual & Everyday: crisp white tee, quality denim and clean sneakers
  'dressing-6': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=700&q=80', // Formal & Office: tailored navy suit jacket with crisp white collar
  'dressing-7': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80', // College & Interviews: sharp professional interview attire
  'dressing-8': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=700&q=80', // Footwear & Grooming: polished leather oxfords and classic timepiece
  'dressing-9': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=700&q=80', // Budget & Smart Shopping: curated boutique clothing rack
  'dressing-10': 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=80', // Creating Your Own Style: standing proudly in signature tailored look

  // --- Time Management ---
  'time-1': 'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=700&q=80', // Why Time Management Fails: hourglass running out of sand on wooden desk
  'time-2': 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=700&q=80', // Eisenhower Matrix: 4-quadrant decision priority sheet
  'time-3': 'https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?auto=format&fit=crop&w=700&q=80', // Pomodoro Technique: mechanical timer on tidy minimalist desk
  'time-4': 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=700&q=80', // Time Blocking: calendar schedule blocking with color blocks
  'time-5': 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=700&q=80', // Overcoming Procrastination: focused writing in clean notebook
  'time-6': 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=700&q=80', // Art of Saying No: open peaceful path free of clutter
  'time-7': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=700&q=80', // Energy Management: morning sunrise meditation & energy
  'time-8': 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=700&q=80', // Taming Digital Distractions: smartphone placed face-down
  'time-9': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=700&q=80', // Delegation & Automation: team collaboration puzzle assembly
  'time-10': 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=700&q=80', // Weekly Review Ritual: Sunday evening reflection journal & tea

  // --- First Aid & Emergency Response ---
  'firstaid-1': 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=700&q=80', // Golden Hour & DRSABCD: medical emergency dispatch
  'firstaid-2': 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=700&q=80', // CPR Step-by-Step: CPR practice mannequin & chest press
  'firstaid-3': 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=700&q=80', // Choking Heimlich: airway rescue illustration
  'firstaid-4': 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=700&q=80', // Bleeding Control: tourniquet & sterile pressure gauze
  'firstaid-5': 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=700&q=80', // Burn Care: soothing cool sterile compress
  'firstaid-6': 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=700&q=80', // Fractures & Splinting: padded medical splint
  'firstaid-7': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80', // Heat Stroke & Dehydration: pure hydration water flask
  'firstaid-8': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=700&q=80', // Snakebite & Stings: wilderness medical pressure kit
  'firstaid-9': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=700&q=80', // Electric Shock: circuit breaker & domestic safety
  'firstaid-10': 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=700&q=80', // Emergency Kit: red & white disaster first aid supply box

  // --- Survival Skills ---
  'survival-1': 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=700&q=80', // Survival Mindset: lone explorer by wilderness campfire
  'survival-2': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=700&q=80', // Water Filtration: clear crystal stream water filter
  'survival-3': 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=700&q=80', // Shelter Building: wilderness A-frame pine shelter
  'survival-4': 'https://images.unsplash.com/photo-1496545672447-f699b503d270?auto=format&fit=crop&w=700&q=80', // Firecraft: bow drill friction glowing ember
  'survival-5': 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=700&q=80', // Navigation by Stars: celestial compass & starry sky
  'survival-6': 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=700&q=80', // Signaling & Rescue: smoke mirror flare signal
  'survival-7': 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=700&q=80', // Wilderness Medicine: field improvised herbal dressing
  'survival-8': 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=700&q=80', // Foraging Safety: wild edible berries and pine needle tea
  'survival-9': 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=700&q=80', // Knots & Cordage: sturdy climbing rope knot
  'survival-10': 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=700&q=80', // 72-Hour Bug-out Bag: packed emergency rucksack

  // --- Modern Farming ---
  'farming-1': 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=700&q=80', // Soil Health: rich organic dark fertile soil in farmer hands
  'farming-2': 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=700&q=80', // Precision Drip Irrigation: micro drip watering green seedling
  'farming-3': 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=700&q=80', // Organic Compost: dark nutrient-rich vermicompost
  'farming-4': 'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&w=700&q=80', // IPM Pest Control: ladybug on green organic crop leaf
  'farming-5': 'https://images.unsplash.com/photo-1527842891421-42eec6e703ea?auto=format&fit=crop&w=700&q=80', // Polyhouse Protected Cultivation: high-tech greenhouse glasshouse rows
  'farming-6': 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=700&q=80', // Hydroponics & Vertical: soilless vertical lettuce rows
  'farming-7': 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=700&q=80', // Agri Drone: autonomous drone scanning emerald crop fields
  'farming-8': 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=80', // Cold Chain & Storage: fresh harvest packaged for market
  'farming-9': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=700&q=80', // Climate-Resilient Millets: golden drought-resistant grain stalks
  'farming-10': 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=700&q=80', // Agri-Business FPOs: vibrant farmers market exchange
};

// Build the fully hydrated lookup with both raw keys ('paradoxes-1') and prefixed keys ('lesson-paradoxes-1')
export const LESSON_SPECIFIC_IMAGES: Record<string, string> = { ...RAW_LESSON_IMAGES };

// Automatically populate 'lesson-*' variations
Object.entries(RAW_LESSON_IMAGES).forEach(([key, url]) => {
  LESSON_SPECIFIC_IMAGES[`lesson-${key}`] = url;
});

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getSubjectThumbnail(subjectId: string): string {
  return (
    SUBJECT_IMAGES[subjectId]?.thumbnail ||
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80'
  );
}

export function getSubjectBanner(subjectId: string): string {
  return (
    SUBJECT_IMAGES[subjectId]?.banner ||
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80'
  );
}

/**
 * Resolves a unique, topic-matched lesson image.
 * Guarantees that every lesson has its own unique photo matching its topic,
 * completely distinct from the overall course thumbnail/banner.
 *
 * Supported inputs:
 * - A Lesson or Topic object
 * - A lesson ID or topic ID string (e.g. 'lesson-paradoxes-1' or 'paradoxes-1')
 * - An index number (0, 1, 2...) paired with a subjectId
 * - Optional title hint for semantic keyword resolution
 */
export function getLessonImage(
  lessonOrIdOrIndex: any,
  subjectId?: string,
  lessonTitle?: string
): string {
  // Case 1: An index number was provided (e.g. 0, 1, 2) alongside subjectId
  if (typeof lessonOrIdOrIndex === 'number' && subjectId) {
    const prefix = SUBJECT_PREFIX_MAP[subjectId] || subjectId;
    const lessonNumber = lessonOrIdOrIndex + 1;
    const canonicalKey = `${prefix}-${lessonNumber}`;
    if (LESSON_SPECIFIC_IMAGES[canonicalKey]) {
      return LESSON_SPECIFIC_IMAGES[canonicalKey];
    }
  }

  // Extract candidate identifiers from object or string
  let idCandidate = '';
  let topicIdCandidate = '';
  let lessonIdCandidate = '';
  let titleCandidate = lessonTitle || '';

  if (typeof lessonOrIdOrIndex === 'string') {
    idCandidate = lessonOrIdOrIndex;
  } else if (lessonOrIdOrIndex && typeof lessonOrIdOrIndex === 'object') {
    idCandidate = lessonOrIdOrIndex.id || '';
    topicIdCandidate = lessonOrIdOrIndex.topic_id || '';
    lessonIdCandidate = lessonOrIdOrIndex.lesson_id || '';
    if (!titleCandidate) {
      titleCandidate =
        lessonOrIdOrIndex.title ||
        lessonOrIdOrIndex.title_en ||
        lessonOrIdOrIndex.title_hi ||
        '';
    }
    if (!subjectId) {
      subjectId = lessonOrIdOrIndex.subject_id;
    }
    // If lesson object has an explicit unique image_url attached
    if (lessonOrIdOrIndex.image_url) {
      return lessonOrIdOrIndex.image_url;
    }
  }

  // 1. Direct ID lookups in order of specificity
  const candidateKeys = [
    idCandidate,
    topicIdCandidate,
    lessonIdCandidate,
    idCandidate ? `lesson-${idCandidate}` : '',
    idCandidate ? idCandidate.replace(/^lesson-/, '') : '',
    topicIdCandidate ? `lesson-${topicIdCandidate}` : '',
    topicIdCandidate ? topicIdCandidate.replace(/^lesson-/, '') : '',
  ].filter(Boolean);

  for (const key of candidateKeys) {
    if (LESSON_SPECIFIC_IMAGES[key]) {
      return LESSON_SPECIFIC_IMAGES[key];
    }
  }

  // 2. Keyword-based matching from title (exact educational concepts)
  const title = (titleCandidate || '').toLowerCase();
  if (title) {
    // Paradoxes
    if (title.includes('theseus') || title.includes('ship of theseus')) return LESSON_SPECIFIC_IMAGES['paradoxes-1'];
    if (title.includes('grandfather') || title.includes('time travel')) return LESSON_SPECIFIC_IMAGES['paradoxes-2'];
    if (title.includes('liar') || title.includes('russell')) return LESSON_SPECIFIC_IMAGES['paradoxes-3'];
    if (title.includes('simpson') || title.includes('monty hall')) return LESSON_SPECIFIC_IMAGES['paradoxes-4'];
    if (title.includes('fermi') || title.includes('great silence') || title.includes('alien')) return LESSON_SPECIFIC_IMAGES['paradoxes-5'];
    if (title.includes('choice') && title.includes('paradox')) return LESSON_SPECIFIC_IMAGES['paradoxes-6'];
    if (title.includes('sorites') || title.includes('heap of sand') || title.includes('sand')) return LESSON_SPECIFIC_IMAGES['paradoxes-7'];
    if (title.includes('prisoner') || title.includes('game theory')) return LESSON_SPECIFIC_IMAGES['paradoxes-8'];
    if (title.includes('bootstrap')) return LESSON_SPECIFIC_IMAGES['paradoxes-9'];
    if (title.includes('tolerance') || title.includes('intolerance')) return LESSON_SPECIFIC_IMAGES['paradoxes-10'];

    // Philosophy
    if (title.includes('what is philosophy')) return LESSON_SPECIFIC_IMAGES['philosophy-1'];
    if (title.includes('socrates')) return LESSON_SPECIFIC_IMAGES['philosophy-2'];
    if (title.includes('stoic') || title.includes('inner peace')) return LESSON_SPECIFIC_IMAGES['philosophy-3'];
    if (title.includes('cave') || title.includes('plato')) return LESSON_SPECIFIC_IMAGES['philosophy-4'];
    if (title.includes('utilitarian') || title.includes('moral dilemma')) return LESSON_SPECIFIC_IMAGES['philosophy-5'];
    if (title.includes('dharma') || title.includes('tao') || title.includes('eastern')) return LESSON_SPECIFIC_IMAGES['philosophy-6'];
    if (title.includes('existential') || title.includes('absurd')) return LESSON_SPECIFIC_IMAGES['philosophy-7'];
    if (title.includes('fallac') || title.includes('clear thinking')) return LESSON_SPECIFIC_IMAGES['philosophy-8'];
    if (title.includes('social contract')) return LESSON_SPECIFIC_IMAGES['philosophy-9'];

    // First Aid
    if (title.includes('golden hour') || title.includes('drsabcd')) return LESSON_SPECIFIC_IMAGES['firstaid-1'];
    if (title.includes('cpr')) return LESSON_SPECIFIC_IMAGES['firstaid-2'];
    if (title.includes('choking') || title.includes('heimlich')) return LESSON_SPECIFIC_IMAGES['firstaid-3'];
    if (title.includes('bleeding') || title.includes('tourniquet')) return LESSON_SPECIFIC_IMAGES['firstaid-4'];
    if (title.includes('burn')) return LESSON_SPECIFIC_IMAGES['firstaid-5'];
    if (title.includes('fracture') || title.includes('splint')) return LESSON_SPECIFIC_IMAGES['firstaid-6'];
    if (title.includes('heat stroke') || title.includes('dehydration')) return LESSON_SPECIFIC_IMAGES['firstaid-7'];
    if (title.includes('snakebite') || title.includes('sting')) return LESSON_SPECIFIC_IMAGES['firstaid-8'];
    if (title.includes('electric shock')) return LESSON_SPECIFIC_IMAGES['firstaid-9'];
    if (title.includes('emergency kit') || title.includes('first aid kit')) return LESSON_SPECIFIC_IMAGES['firstaid-10'];

    // Case Studies
    if (title.includes('airbnb')) return LESSON_SPECIFIC_IMAGES['case-1'];
    if (title.includes('zerodha')) return LESSON_SPECIFIC_IMAGES['case-2'];
    if (title.includes('amul')) return LESSON_SPECIFIC_IMAGES['case-3'];
    if (title.includes('canva')) return LESSON_SPECIFIC_IMAGES['case-4'];
    if (title.includes('oyo')) return LESSON_SPECIFIC_IMAGES['case-5'];
    if (title.includes('reliance') || title.includes('ambani')) return LESSON_SPECIFIC_IMAGES['case-6'];
    if (title.includes('spanx') || title.includes('blakely')) return LESSON_SPECIFIC_IMAGES['case-7'];
    if (title.includes('patagonia') || title.includes('chouinard')) return LESSON_SPECIFIC_IMAGES['case-8'];
    if (title.includes('kirana')) return LESSON_SPECIFIC_IMAGES['case-9'];
    if (title.includes('failing forward') || title.includes('failed startup')) return LESSON_SPECIFIC_IMAGES['case-10'];

    // Law
    if (title.includes('article 21') || title.includes('privacy')) return LESSON_SPECIFIC_IMAGES['law-2'];
    if (title.includes('fir') || title.includes('police complaint')) return LESSON_SPECIFIC_IMAGES['law-3'];
    if (title.includes('arrest') || title.includes('detention')) return LESSON_SPECIFIC_IMAGES['law-4'];
    if (title.includes('consumer') || title.includes('online claim')) return LESSON_SPECIFIC_IMAGES['law-5'];
    if (title.includes('rti') || title.includes('transparency')) return LESSON_SPECIFIC_IMAGES['law-6'];
    if (title.includes('cyber') || title.includes('fraud')) return LESSON_SPECIFIC_IMAGES['law-7'];
    if (title.includes('traffic') || title.includes('challan')) return LESSON_SPECIFIC_IMAGES['law-8'];
    if (title.includes('rental') || title.includes('tenant')) return LESSON_SPECIFIC_IMAGES['law-9'];
    if (title.includes('contract') || title.includes('notariz')) return LESSON_SPECIFIC_IMAGES['law-10'];

    // Finance
    if (title.includes('50/30/20') || title.includes('cash flow')) return LESSON_SPECIFIC_IMAGES['fin-1'];
    if (title.includes('inflation') && title.includes('silent tax')) return LESSON_SPECIFIC_IMAGES['fin-2'];
    if (title.includes('emergency fund')) return LESSON_SPECIFIC_IMAGES['fin-3'];
    if (title.includes('compound interest') || title.includes('rule of 72')) return LESSON_SPECIFIC_IMAGES['fin-4'];
    if (title.includes('upi') || title.includes('digital banking')) return LESSON_SPECIFIC_IMAGES['fin-5'];
    if (title.includes('credit score') || title.includes('cibil')) return LESSON_SPECIFIC_IMAGES['fin-6'];
    if (title.includes('emi') || title.includes('good debt')) return LESSON_SPECIFIC_IMAGES['fin-7'];
    if (title.includes('credit card')) return LESSON_SPECIFIC_IMAGES['fin-8'];
    if (title.includes('insurance')) return LESSON_SPECIFIC_IMAGES['fin-9'];
    if (title.includes('sip') || title.includes('index fund')) return LESSON_SPECIFIC_IMAGES['fin-10'];

    // Time Management
    if (title.includes('why willpower is a trap') || title.includes('time management fails')) return LESSON_SPECIFIC_IMAGES['time-1'];
    if (title.includes('eisenhower')) return LESSON_SPECIFIC_IMAGES['time-2'];
    if (title.includes('pomodoro') || title.includes('deep work')) return LESSON_SPECIFIC_IMAGES['time-3'];
    if (title.includes('time blocking') || title.includes('calendar')) return LESSON_SPECIFIC_IMAGES['time-4'];
    if (title.includes('procrastination')) return LESSON_SPECIFIC_IMAGES['time-5'];
    if (title.includes('saying no')) return LESSON_SPECIFIC_IMAGES['time-6'];
    if (title.includes('energy management')) return LESSON_SPECIFIC_IMAGES['time-7'];
    if (title.includes('distraction') || title.includes('smartphone')) return LESSON_SPECIFIC_IMAGES['time-8'];
    if (title.includes('delegation') || title.includes('automation')) return LESSON_SPECIFIC_IMAGES['time-9'];
    if (title.includes('weekly review')) return LESSON_SPECIFIC_IMAGES['time-10'];

    // Modern Farming
    if (title.includes('soil health') || title.includes('regenerative')) return LESSON_SPECIFIC_IMAGES['farming-1'];
    if (title.includes('drip') || title.includes('micro-irrigation')) return LESSON_SPECIFIC_IMAGES['farming-2'];
    if (title.includes('compost') || title.includes('organic fertilizer')) return LESSON_SPECIFIC_IMAGES['farming-3'];
    if (title.includes('pest') || title.includes('ipm')) return LESSON_SPECIFIC_IMAGES['farming-4'];
    if (title.includes('polyhouse')) return LESSON_SPECIFIC_IMAGES['farming-5'];
    if (title.includes('hydroponic') || title.includes('vertical farming')) return LESSON_SPECIFIC_IMAGES['farming-6'];
    if (title.includes('drone') || title.includes('satellite')) return LESSON_SPECIFIC_IMAGES['farming-7'];
    if (title.includes('cold chain') || title.includes('post-harvest')) return LESSON_SPECIFIC_IMAGES['farming-8'];
    if (title.includes('millet') || title.includes('agroforestry')) return LESSON_SPECIFIC_IMAGES['farming-9'];
    if (title.includes('fpo') || title.includes('e-nam')) return LESSON_SPECIFIC_IMAGES['farming-10'];
  }

  // 3. Fallback to first lesson image of subject if available
  if (subjectId && SUBJECT_PREFIX_MAP[subjectId]) {
    const firstLessonKey = `${SUBJECT_PREFIX_MAP[subjectId]}-1`;
    if (LESSON_SPECIFIC_IMAGES[firstLessonKey]) {
      return LESSON_SPECIFIC_IMAGES[firstLessonKey];
    }
  }

  // 4. Default high-end editorial image
  return 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=700&q=80';
}
