const grammarTopics = [
  {
    id: 1,
    title: "Present Simple",
    icon: "🕐",
    color: "#6366f1",
    bg: "#eef2ff",
    difficulty: "Boshlang'ich",
    explanation: `**Present Simple** — hozirgi zamonda doimiy yoki odatiy harakatlarni ifodalaydi.

## Qachon ishlatiladi?
- **Doimiy haqiqatlar:** The sun rises in the east.
- **Odatiy harakatlar:** I go to school every day.
- **Jadvallar:** The bus leaves at 7 AM.

## Yasalishi
**I/You/We/They + V1** — I work every day.
**He/She/It + V1 + s/es** — She works every day.

## Bo'lishsiz shakl
**I/You/We/They + don't + V1**
**He/She/It + doesn't + V1**

## So'roq shakl
**Do + I/you/we/they + V1?**
**Does + he/she/it + V1?**`,
    examples: [
      "I wake up at 7 AM every day.",
      "She speaks English very well.",
      "They don't like coffee.",
      "Does he play football?",
      "The Earth goes around the Sun.",
    ],
    exercises: [
      {
        type: "fill",
        question: "She ___ (work) in a hospital.",
        answer: "works",
        options: ["work", "works", "worked"],
      },
      {
        type: "fill",
        question: "I ___ (not/like) spicy food.",
        answer: "don't like",
        options: ["don't like", "doesn't like", "not like"],
      },
      {
        type: "fill",
        question: "___ he speak French?",
        answer: "Does",
        options: ["Do", "Does", "Is"],
      },
      {
        type: "fill",
        question: "They ___ (go) to the gym every morning.",
        answer: "go",
        options: ["go", "goes", "are going"],
      },
      {
        type: "fill",
        question: "The train ___ (arrive) at 6 PM.",
        answer: "arrives",
        options: ["arrive", "arrives", "arriving"],
      },
    ],
  },
  {
    id: 2,
    title: "Present Continuous",
    icon: "⏳",
    color: "#ec4899",
    bg: "#fdf2f8",
    difficulty: "Boshlang'ich",
    explanation: `**Present Continuous** — ayni paytda sodir bo'layotgan harakatlarni ifodalaydi.

## Qachon ishlatiladi?
- **Hozir bo'layotgan ish:** I am reading a book now.
- **Vaqtinchalik holat:** She is staying at a hotel this week.
- **Rejalar (yaqin kelajak):** We are meeting tomorrow.

## Yasalishi
**Subject + am/is/are + V1 + ing**

## Bo'lishsiz shakl
**Subject + am/is/are + not + V1 + ing**

## So'roq shakl
**Am/Is/Are + subject + V1 + ing?**`,
    examples: [
      "I am studying English right now.",
      "She is watching TV at the moment.",
      "They are not playing today.",
      "Are you coming to the party?",
      "He is working on a new project this month.",
    ],
    exercises: [
      {
        type: "fill",
        question: "She ___ (read) a book right now.",
        answer: "is reading",
        options: ["reads", "is reading", "read"],
      },
      {
        type: "fill",
        question: "They ___ (not/play) football at the moment.",
        answer: "aren't playing",
        options: ["don't play", "aren't playing", "not playing"],
      },
      {
        type: "fill",
        question: "___ you ___ (come) to the party?",
        answer: "Are coming",
        options: ["Do come", "Are coming", "Is coming"],
      },
      {
        type: "fill",
        question: "He ___ (stay) with his friend this week.",
        answer: "is staying",
        options: ["stays", "is staying", "staying"],
      },
      {
        type: "fill",
        question: "I ___ (work) on a new project these days.",
        answer: "am working",
        options: ["work", "am working", "am work"],
      },
    ],
  },
  {
    id: 3,
    title: "Present Simple vs Continuous",
    icon: "⚖️",
    color: "#f59e0b",
    bg: "#fffbeb",
    difficulty: "Boshlang'ich",
    explanation: `## Present Simple vs Present Continuous

**Present Simple** — doimiy, odatiy harakatlar.
**Present Continuous** — hozir, ayni paytda sodir bo'layotgan harakatlar.

## Taqqoslash
| Present Simple | Present Continuous |
|---------------|-------------------|
| I work every day. | I am working now. |
| She plays tennis. | She is playing tennis now. |
| Water boils at 100°C. | The water is boiling! |

## Kalit so'zlar
**Simple:** always, usually, often, sometimes, never, every day/week
**Continuous:** now, right now, at the moment, today, this week`,
    examples: [
      "I usually drink tea, but today I am drinking coffee.",
      "She works in an office, but this week she is working from home.",
      "Water boils at 100 degrees Celsius.",
      "Look! It is raining outside.",
      "He never eats meat, but now he is trying fish.",
    ],
    exercises: [
      {
        type: "fill",
        question: "I usually ___ (drink) tea in the morning.",
        answer: "drink",
        options: ["drink", "am drinking", "drinks"],
      },
      {
        type: "fill",
        question: "Look! It ___ (rain) outside.",
        answer: "is raining",
        options: ["rains", "is raining", "rain"],
      },
      {
        type: "fill",
        question: "She ___ (work) in a hospital every day.",
        answer: "works",
        options: ["works", "is working", "work"],
      },
      {
        type: "fill",
        question: "They ___ (play) football right now.",
        answer: "are playing",
        options: ["play", "are playing", "plays"],
      },
      {
        type: "fill",
        question: "Water ___ (boil) at 100°C.",
        answer: "boils",
        options: ["boils", "is boiling", "boil"],
      },
    ],
  },
  {
    id: 4,
    title: "Past Simple",
    icon: "⌛",
    color: "#10b981",
    bg: "#ecfdf5",
    difficulty: "Boshlang'ich",
    explanation: `**Past Simple** — o'tmishda tugallangan harakatlarni ifodalaydi.

## Qachon ishlatiladi?
- **O'tmishda tugagan ish:** I visited London last year.
- **Ketma-ket harakatlar:** He opened the door and walked in.
- **O'tmishdagi odat:** When I was young, I played outside every day.

## Yasalishi (to'g'ri fe'llar)
**Subject + V2 (ed)** — I worked yesterday.

## Yasalishi (noto'g'ri fe'llar)
**Subject + V2 (maxsus shakl)** — I went to the park.

## Bo'lishsiz shakl
**Subject + didn't + V1**

## So'roq shakl
**Did + subject + V1?**`,
    examples: [
      "I visited my grandmother yesterday.",
      "She bought a new car last week.",
      "They didn't go to the party.",
      "Did you see the movie?",
      "He woke up, had breakfast, and left for work.",
    ],
    exercises: [
      {
        type: "fill",
        question: "I ___ (visit) my grandmother yesterday.",
        answer: "visited",
        options: ["visit", "visited", "have visited"],
      },
      {
        type: "fill",
        question: "She ___ (buy) a new dress last week.",
        answer: "bought",
        options: ["buyed", "bought", "buys"],
      },
      {
        type: "fill",
        question: "They ___ (not/go) to the party last night.",
        answer: "didn't go",
        options: ["didn't go", "don't go", "not went"],
      },
      {
        type: "fill",
        question: "___ you ___ (see) the new film?",
        answer: "Did see",
        options: ["Did saw", "Did see", "Do see"],
      },
      {
        type: "fill",
        question: "He ___ (wake) up at 6 AM yesterday.",
        answer: "woke",
        options: ["waked", "woke", "wakes"],
      },
    ],
  },
  {
    id: 5,
    title: "Present Perfect",
    icon: "✅",
    color: "#3b82f6",
    bg: "#eff6ff",
    difficulty: "O'rta",
    explanation: `**Present Perfect** — o'tmish bilan bog'liq bo'lgan hozirgi zamon.

## Qachon ishlatiladi?
- **Tajriba:** I have been to Paris.
- **Natija:** She has finished her homework.
- **Hozirgacha davom etgan:** I have lived here for 5 years.
- **Yaqinda bo'lgan:** He has just left.

## Yasalishi
**Subject + have/has + V3**

## Bo'lishsiz shakl
**Subject + have/has + not + V3**

## So'roq shakl
**Have/Has + subject + V3?**

## Kalit so'zlar
ever, never, just, already, yet, for, since`,
    examples: [
      "I have never been to Japan.",
      "She has already finished her work.",
      "They have lived here since 2010.",
      "Have you ever eaten sushi?",
      "He has just left the office.",
    ],
    exercises: [
      {
        type: "fill",
        question: "I ___ never ___ (be) to Japan.",
        answer: "have been",
        options: ["have been", "have went", "was"],
      },
      {
        type: "fill",
        question: "She ___ already ___ (finish) her homework.",
        answer: "has finished",
        options: ["has finished", "finished", "have finished"],
      },
      {
        type: "fill",
        question: "___ you ever ___ (eat) sushi?",
        answer: "Have eaten",
        options: ["Have ate", "Have eaten", "Did eat"],
      },
      {
        type: "fill",
        question: "He ___ just ___ (leave) the room.",
        answer: "has left",
        options: ["has left", "left", "have left"],
      },
      {
        type: "fill",
        question: "They ___ (live) here since 2010.",
        answer: "have lived",
        options: ["lived", "have lived", "live"],
      },
    ],
  },
  {
    id: 6,
    title: "Future (Will vs Going to)",
    icon: "🔮",
    color: "#8b5cf6",
    bg: "#f5f3ff",
    difficulty: "O'rta",
    explanation: `## Will vs Going to

**Will** — qaror, va'da, bashorat.
**Going to** — reja, aniq dalilga asoslangan bashorat.

## Will
- **Tezkor qaror:** I'll have the pasta.
- **Va'da:** I'll call you later.
- **Bashorat:** I think it will rain.

## Going to
- **Reja:** I am going to travel next month.
- **Dalil:** Look at those clouds! It is going to rain.

## Yasalishi
**Will + V1**
**Am/Is/Are + going to + V1**`,
    examples: [
      "I think it will rain tomorrow.",
      "She is going to study medicine.",
      "I'll help you with your homework.",
      "Look at the sky! It is going to snow.",
      "They are going to visit us next summer.",
    ],
    exercises: [
      {
        type: "fill",
        question: "I think it ___ (rain) tomorrow.",
        answer: "will rain",
        options: ["will rain", "is going to rain", "rains"],
      },
      {
        type: "fill",
        question: "She ___ (study) medicine at university.",
        answer: "is going to study",
        options: ["will study", "is going to study", "studies"],
      },
      {
        type: "fill",
        question: "I ___ (help) you with your bags — wait here!",
        answer: "will help",
        options: ["will help", "am going to help", "help"],
      },
      {
        type: "fill",
        question: "Look at those clouds! It ___ (snow).",
        answer: "is going to snow",
        options: ["will snow", "is going to snow", "snows"],
      },
      {
        type: "fill",
        question: "They ___ (visit) us next weekend — we booked tickets.",
        answer: "are going to visit",
        options: ["will visit", "are going to visit", "visit"],
      },
    ],
  },
  {
    id: 7,
    title: "Articles (a/an/the)",
    icon: "📌",
    color: "#ef4444",
    bg: "#fef2f2",
    difficulty: "Boshlang'ich",
    explanation: `## Articles (a/an/the)

**A/An** — noaniq, birinchi marta aytilayotgan narsa.
**The** — aniq, oldin aytilgan yoki hammaga ma'lum narsa.

## A
- Undosh tovush bilan boshlangan so'zlardan oldin: a book, a car, a house

## An
- Unli tovush bilan boshlangan so'zlardan oldin: an apple, an hour, an umbrella

## The
- Oldin aytilgan: I saw a dog. The dog was cute.
- Hammaga ma'lum: The sun, the moon, the Earth
- Maxsus: The best, the first, the only

## Article ishlatilmaydi
- Ko'plikda umumiy: Cats are cute.
- Ismlar: I live in Tashkent.
- Non, suv kabi: I like rice.`,
    examples: [
      "I saw a cat in the street. The cat was black.",
      "She is an engineer.",
      "The sun rises in the east.",
      "I need a new phone.",
      "An apple a day keeps the doctor away.",
    ],
    exercises: [
      {
        type: "fill",
        question: "I saw ___ dog in the park. ___ dog was brown.",
        answer: "a The",
        options: ["a A", "a The", "the A"],
      },
      {
        type: "fill",
        question: "She is ___ engineer.",
        answer: "an",
        options: ["a", "an", "the"],
      },
      {
        type: "fill",
        question: "___ sun is very bright today.",
        answer: "The",
        options: ["A", "An", "The"],
      },
      {
        type: "fill",
        question: "I need ___ new phone.",
        answer: "a",
        options: ["a", "an", "the"],
      },
      {
        type: "fill",
        question: "___ apple ___ day keeps the doctor away.",
        answer: "An a",
        options: ["An a", "A an", "The the"],
      },
    ],
  },
  {
    id: 8,
    title: "Prepositions (In/On/At)",
    icon: "📍",
    color: "#14b8a6",
    bg: "#f0fdfa",
    difficulty: "Boshlang'ich",
    explanation: `## Prepositions — In, On, At

### Vaqt uchun
**AT** — aniq vaqt: at 5 PM, at midnight, at noon
**IN** — oy, yil, fasl: in June, in 2020, in summer
**ON** — kun, sana: on Monday, on July 4th

### Joy uchun
**AT** — aniq manzil: at the door, at the bus stop
**IN** — ichki joy: in the room, in Tashkent
**ON** — ustida: on the table, on the wall

### Boshqa
**IN** — in the morning/afternoon/evening
**AT** — at night
**ON** — on the weekend (UK: at the weekend)`,
    examples: [
      "The meeting is at 3 PM.",
      "She was born in June.",
      "I will see you on Friday.",
      "The book is on the table.",
      "He lives in New York.",
    ],
    exercises: [
      {
        type: "fill",
        question: "The meeting starts ___ 3 PM.",
        answer: "at",
        options: ["in", "on", "at"],
      },
      {
        type: "fill",
        question: "She was born ___ 1995.",
        answer: "in",
        options: ["in", "on", "at"],
      },
      {
        type: "fill",
        question: "I will see you ___ Monday.",
        answer: "on",
        options: ["in", "on", "at"],
      },
      {
        type: "fill",
        question: "The cat is ___ the table.",
        answer: "on",
        options: ["in", "on", "at"],
      },
      {
        type: "fill",
        question: "He lives ___ Tashkent.",
        answer: "in",
        options: ["in", "on", "at"],
      },
    ],
  },
  {
    id: 9,
    title: "Modal Verbs",
    icon: "🎯",
    color: "#f97316",
    bg: "#fff7ed",
    difficulty: "O'rta",
    explanation: `## Modal Verbs

**Can** — qobiliyat, ruxsat: I can swim. Can I go out?
**Must** — majburiyat: You must wear a seatbelt.
**Should** — tavsiya: You should drink more water.
**May/Might** — ehtimol: It may rain today.
**Could** — o'tmishdagi qobiliyat yoki muloyim so'roq: Could you help me?

## Qoidalar
- Modaldan keyin **to** ishlatilmaydi: I can swim. (not: I can to swim)
- Uchinchi shaxsda **s** qo'shilmaydi: He can swim. (not: He cans swim)
- Bo'lishsiz: cannot/can't, must not/mustn't, should not/shouldn't`,
    examples: [
      "I can speak three languages.",
      "You must wear a helmet.",
      "You should exercise more.",
      "It might rain later.",
      "Could you open the door, please?",
    ],
    exercises: [
      {
        type: "fill",
        question: "I ___ (can) swim very well.",
        answer: "can",
        options: ["can", "cans", "can to"],
      },
      {
        type: "fill",
        question: "You ___ (must) wear a seatbelt in the car.",
        answer: "must",
        options: ["must", "must to", "musts"],
      },
      {
        type: "fill",
        question: "You ___ (should) eat more vegetables.",
        answer: "should",
        options: ["should", "should to", "shouls"],
      },
      {
        type: "fill",
        question: "It ___ (might) rain tomorrow.",
        answer: "might",
        options: ["might", "mights", "might to"],
      },
      {
        type: "fill",
        question: "___ you help me, please?",
        answer: "Could",
        options: ["Could", "Must", "Should"],
      },
    ],
  },
  {
    id: 10,
    title: "Conditionals (If)",
    icon: "🔗",
    color: "#a855f7",
    bg: "#faf5ff",
    difficulty: "Yuqori",
    explanation: `## Conditionals (If)

### Zero Conditional — Umumiy haqiqat
**If + V1, V1**
If you heat ice, it melts.

### First Conditional — Mumkin bo'lgan real holat
**If + V1, will + V1**
If it rains, I will stay home.

### Second Conditional — Mumkin bo'lmagan/tasavvurdagi holat
**If + V2, would + V1**
If I had wings, I would fly.

### Third Conditional — O'tmishdagi afsus
**If + had + V3, would have + V3**
If I had studied, I would have passed.`,
    examples: [
      "If you heat water to 100°C, it boils.",
      "If it rains tomorrow, I will stay home.",
      "If I won the lottery, I would travel the world.",
      "If she had studied, she would have passed the exam.",
      "If you touch fire, you get burned.",
    ],
    exercises: [
      {
        type: "fill",
        question: "If you ___ (heat) ice, it melts.",
        answer: "heat",
        options: ["heat", "heated", "will heat"],
      },
      {
        type: "fill",
        question: "If it rains, I ___ (stay) home.",
        answer: "will stay",
        options: ["will stay", "stay", "would stay"],
      },
      {
        type: "fill",
        question: "If I ___ (have) wings, I would fly.",
        answer: "had",
        options: ["have", "had", "will have"],
      },
      {
        type: "fill",
        question: "If she ___ (study), she would have passed.",
        answer: "had studied",
        options: ["studied", "had studied", "has studied"],
      },
      {
        type: "fill",
        question: "If you touch fire, you ___ (burn) yourself.",
        answer: "get",
        options: ["get", "will get", "would get"],
      },
    ],
  },
  {
    id: 11,
    title: "Passive Voice",
    icon: "🔄",
    color: "#06b6d4",
    bg: "#ecfeff",
    difficulty: "Yuqori",
    explanation: `## Passive Voice — Majhul nisbat

**Active:** Kimdir ishni bajaradi.
**Passive:** Ishning o'zi muhim, kim bajargani emas.

## Yasalishi
**Subject + be (zamonga mos) + V3**

## Zamonlar bo'yicha
| Zamon | Active | Passive |
|-------|--------|---------|
| Present Simple | write | is/are written |
| Past Simple | wrote | was/were written |
| Present Perfect | have written | have been written |
| Future | will write | will be written |

## Qachon ishlatiladi?
- Kim bajargani noma'lum: My bike was stolen.
- Kim bajargani muhim emas: The meeting was postponed.
- Rasmiy uslubda: The results will be published.`,
    examples: [
      "The letter was written yesterday.",
      "English is spoken all over the world.",
      "The building will be finished next year.",
      "My car has been repaired.",
      "The window was broken by a ball.",
    ],
    exercises: [
      {
        type: "fill",
        question: "English ___ (speak) all over the world.",
        answer: "is spoken",
        options: ["speaks", "is spoken", "speak"],
      },
      {
        type: "fill",
        question: "The letter ___ (write) yesterday.",
        answer: "was written",
        options: ["wrote", "was written", "is written"],
      },
      {
        type: "fill",
        question: "The building ___ (finish) next year.",
        answer: "will be finished",
        options: ["will finish", "will be finished", "is finished"],
      },
      {
        type: "fill",
        question: "The window was ___ (break) by a ball.",
        answer: "broken",
        options: ["broke", "broken", "breaking"],
      },
      {
        type: "fill",
        question: "Dinner ___ (serve) at 7 PM every evening.",
        answer: "is served",
        options: ["serves", "is served", "was served"],
      },
    ],
  },
];

export default grammarTopics;
