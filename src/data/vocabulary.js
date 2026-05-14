const vocabularyDB = [
  // === SALUTATIONS & INTRODUCTIONS ===
  { en: "hello", uz: "salom", category: "Salomlashish", example: "Hello, how are you?" },
  { en: "goodbye", uz: "xayr", category: "Salomlashish", example: "Goodbye, see you tomorrow!" },
  { en: "please", uz: "iltimos", category: "Salomlashish", example: "Please help me." },
  { en: "thank you", uz: "rahmat", category: "Salomlashish", example: "Thank you very much!" },
  { en: "sorry", uz: "kechirasiz", category: "Salomlashish", example: "Sorry, I'm late." },
  { en: "yes", uz: "ha", category: "Salomlashish", example: "Yes, I agree." },
  { en: "no", uz: "yo'q", category: "Salomlashish", example: "No, thank you." },
  { en: "name", uz: "ism", category: "Salomlashish", example: "My name is John." },
  { en: "friend", uz: "do'st", category: "Salomlashish", example: "She is my best friend." },
  { en: "family", uz: "oila", category: "Salomlashish", example: "I love my family." },

  // === FOOD & DRINK ===
  { en: "water", uz: "suv", category: "Ovqat & Ichimlik", example: "Can I have a glass of water?" },
  { en: "bread", uz: "non", category: "Ovqat & Ichimlik", example: "Fresh bread smells good." },
  { en: "apple", uz: "olma", category: "Ovqat & Ichimlik", example: "An apple a day keeps the doctor away." },
  { en: "rice", uz: "guruch", category: "Ovqat & Ichimlik", example: "We eat rice every day." },
  { en: "meat", uz: "go'sht", category: "Ovqat & Ichimlik", example: "Do you eat meat?" },
  { en: "milk", uz: "sut", category: "Ovqat & Ichimlik", example: "I drink milk every morning." },
  { en: "tea", uz: "choy", category: "Ovqat & Ichimlik", example: "Would you like some tea?" },
  { en: "sugar", uz: "shakar", category: "Ovqat & Ichimlik", example: "Do you take sugar in your coffee?" },
  { en: "salt", uz: "tuz", category: "Ovqat & Ichimlik", example: "Please pass the salt." },
  { en: "egg", uz: "tuxum", category: "Ovqat & Ichimlik", example: "I had eggs for breakfast." },
  { en: "fruit", uz: "meva", category: "Ovqat & Ichimlik", example: "Eat more fruit every day." },
  { en: "vegetable", uz: "sabzavot", category: "Ovqat & Ichimlik", example: "Vegetables are good for health." },
  { en: "chicken", uz: "tovuq", category: "Ovqat & Ichimlik", example: "I like grilled chicken." },
  { en: "fish", uz: "baliq", category: "Ovqat & Ichimlik", example: "We ate fish yesterday." },
  { en: "cheese", uz: "pishloq", category: "Ovqat & Ichimlik", example: "Cheese is made from milk." },

  // === TRAVEL & DIRECTIONS ===
  { en: "road", uz: "yo'l", category: "Sayohat & Yo'nalish", example: "The road is long." },
  { en: "car", uz: "mashina", category: "Sayohat & Yo'nalish", example: "I drive a blue car." },
  { en: "bus", uz: "avtobus", category: "Sayohat & Yo'nalish", example: "The bus arrives at 8 AM." },
  { en: "train", uz: "poezd", category: "Sayohat & Yo'nalish", example: "I travel by train." },
  { en: "airport", uz: "aeroport", category: "Sayohat & Yo'nalish", example: "We will meet at the airport." },
  { en: "hotel", uz: "mehmonxona", category: "Sayohat & Yo'nalish", example: "The hotel is near the beach." },
  { en: "map", uz: "xarita", category: "Sayohat & Yo'nalish", example: "Do you have a map?" },
  { en: "ticket", uz: "bilet", category: "Sayohat & Yo'nalish", example: "I bought two tickets." },
  { en: "left", uz: "chap", category: "Sayohat & Yo'nalish", example: "Turn left at the traffic light." },
  { en: "right", uz: "o'ng", category: "Sayohat & Yo'nalish", example: "The bank is on your right." },
  { en: "straight", uz: "to'g'ri", category: "Sayohat & Yo'nalish", example: "Go straight ahead." },
  { en: "station", uz: "stansiya", category: "Sayohat & Yo'nalish", example: "The train station is far." },

  // === WORK & BUSINESS ===
  { en: "work", uz: "ish", category: "Ish & Biznes", example: "I go to work every day." },
  { en: "office", uz: "ofis", category: "Ish & Biznes", example: "She works in an office." },
  { en: "meeting", uz: "uchrashuv", category: "Ish & Biznes", example: "We have a meeting at 3 PM." },
  { en: "money", uz: "pul", category: "Ish & Biznes", example: "Save your money." },
  { en: "price", uz: "narx", category: "Ish & Biznes", example: "What is the price?" },
  { en: "job", uz: "ish (lavozim)", category: "Ish & Biznes", example: "I found a new job." },
  { en: "company", uz: "kompaniya", category: "Ish & Biznes", example: "He works for a big company." },
  { en: "boss", uz: "xo'jayin", category: "Ish & Biznes", example: "My boss is very kind." },
  { en: "salary", uz: "maosh", category: "Ish & Biznes", example: "The salary is good." },
  { en: "experience", uz: "tajriba", category: "Ish & Biznes", example: "I have 5 years of experience." },
  { en: "interview", uz: "intervyu", category: "Ish & Biznes", example: "I have a job interview today." },
  { en: "client", uz: "mijoz", category: "Ish & Biznes", example: "The client is happy." },

  // === DAILY LIFE ===
  { en: "home", uz: "uy", category: "Kundalik Hayot", example: "I am at home." },
  { en: "house", uz: "uy (bino)", category: "Kundalik Hayot", example: "This is a beautiful house." },
  { en: "door", uz: "eshik", category: "Kundalik Hayot", example: "Please close the door." },
  { en: "window", uz: "deraza", category: "Kundalik Hayot", example: "Open the window, please." },
  { en: "table", uz: "stol", category: "Kundalik Hayot", example: "Put the book on the table." },
  { en: "chair", uz: "stul", category: "Kundalik Hayot", example: "Sit on this chair." },
  { en: "bed", uz: "karavot", category: "Kundalik Hayot", example: "Time to go to bed." },
  { en: "clock", uz: "soat", category: "Kundalik Hayot", example: "The clock shows 8 o'clock." },
  { en: "phone", uz: "telefon", category: "Kundalik Hayot", example: "My phone is ringing." },
  { en: "key", uz: "kalit", category: "Kundalik Hayot", example: "I lost my keys." },
  { en: "clothes", uz: "kiyim", category: "Kundalik Hayot", example: "She bought new clothes." },
  { en: "book", uz: "kitob", category: "Kundalik Hayot", example: "I am reading a good book." },
  { en: "pen", uz: "ruchka", category: "Kundalik Hayot", example: "Can I borrow your pen?" },
  { en: "bag", uz: "sumka", category: "Kundalik Hayot", example: "My bag is heavy." },
  { en: "cup", uz: "piyola", category: "Kundalik Hayot", example: "I need a cup of coffee." },

  // === EMOTIONS & FEELINGS ===
  { en: "happy", uz: "baxtli", category: "His-tuyg'ular", example: "I feel happy today." },
  { en: "sad", uz: "qayg'uli", category: "His-tuyg'ular", example: "Don't be sad." },
  { en: "angry", uz: "jahl", category: "His-tuyg'ular", example: "He is very angry." },
  { en: "tired", uz: "charchagan", category: "His-tuyg'ular", example: "I am so tired." },
  { en: "excited", uz: "hayajonlangan", category: "His-tuyg'ular", example: "The kids are excited!" },
  { en: "scared", uz: "qo'rqqan", category: "His-tuyg'ular", example: "I am scared of spiders." },
  { en: "love", uz: "sevmoq", category: "His-tuyg'ular", example: "I love my family." },
  { en: "hate", uz: "yomon ko'rmoq", category: "His-tuyg'ular", example: "I hate waking up early." },
  { en: "like", uz: "yoqtirmoq", category: "His-tuyg'ular", example: "I like this song." },
  { en: "hope", uz: "umid qilmoq", category: "His-tuyg'ular", example: "I hope you feel better." },
  { en: "worry", uz: "xavotirlanmoq", category: "His-tuyg'ular", example: "Don't worry about it." },
  { en: "surprised", uz: "hayron qolgan", category: "His-tuyg'ular", example: "I was surprised by the news." },

  // === NATURE & WEATHER ===
  { en: "sun", uz: "quyosh", category: "Tabiat & Ob-havo", example: "The sun is shining." },
  { en: "moon", uz: "oy", category: "Tabiat & Ob-havo", example: "Look at the full moon!" },
  { en: "star", uz: "yulduz", category: "Tabiat & Ob-havo", example: "The stars are beautiful tonight." },
  { en: "rain", uz: "yomg'ir", category: "Tabiat & Ob-havo", example: "It is raining outside." },
  { en: "snow", uz: "qor", category: "Tabiat & Ob-havo", example: "It snows in winter." },
  { en: "wind", uz: "shamol", category: "Tabiat & Ob-havo", example: "The wind is strong." },
  { en: "cloud", uz: "bulut", category: "Tabiat & Ob-havo", example: "There are many clouds." },
  { en: "tree", uz: "daraxt", category: "Tabiat & Ob-havo", example: "This tree is very old." },
  { en: "flower", uz: "gul", category: "Tabiat & Ob-havo", example: "The flowers are blooming." },
  { en: "river", uz: "daryo", category: "Tabiat & Ob-havo", example: "The river is wide." },
  { en: "mountain", uz: "tog'", category: "Tabiat & Ob-havo", example: "I love climbing mountains." },
  { en: "sea", uz: "dengiz", category: "Tabiat & Ob-havo", example: "The sea is calm today." },
  { en: "weather", uz: "ob-havo", category: "Tabiat & Ob-havo", example: "The weather is nice." },
  { en: "hot", uz: "issiq", category: "Tabiat & Ob-havo", example: "It is very hot today." },
  { en: "cold", uz: "sovuq", category: "Tabiat & Ob-havo", example: "I feel cold." },

  // === EDUCATION ===
  { en: "school", uz: "maktab", category: "Ta'lim", example: "The school starts at 8 AM." },
  { en: "university", uz: "universitet", category: "Ta'lim", example: "She studies at university." },
  { en: "teacher", uz: "o'qituvchi", category: "Ta'lim", example: "Our teacher is very helpful." },
  { en: "student", uz: "talaba", category: "Ta'lim", example: "He is a good student." },
  { en: "lesson", uz: "dars", category: "Ta'lim", example: "The lesson is interesting." },
  { en: "exam", uz: "imtihon", category: "Ta'lim", example: "I passed the exam!" },
  { en: "homework", uz: "uy vazifasi", category: "Ta'lim", example: "I did my homework." },
  { en: "question", uz: "savol", category: "Ta'lim", example: "Do you have a question?" },
  { en: "answer", uz: "javob", category: "Ta'lim", example: "The answer is correct." },
  { en: "dictionary", uz: "lug'at", category: "Ta'lim", example: "Look it up in a dictionary." },

  // === TECHNOLOGY ===
  { en: "computer", uz: "kompyuter", category: "Texnologiya", example: "I work on a computer." },
  { en: "internet", uz: "internet", category: "Texnologiya", example: "The internet is slow today." },
  { en: "website", uz: "veb-sayt", category: "Texnologiya", example: "I created a website." },
  { en: "email", uz: "elektron pochta", category: "Texnologiya", example: "Check your email." },
  { en: "password", uz: "parol", category: "Texnologiya", example: "Don't share your password." },
  { en: "screen", uz: "ekran", category: "Texnologiya", example: "The screen is too bright." },
  { en: "button", uz: "tugma", category: "Texnologiya", example: "Press the button." },
  { en: "download", uz: "yuklab olish", category: "Texnologiya", example: "Download the file." },
  { en: "upload", uz: "yuklash", category: "Texnologiya", example: "Upload your photo." },
  { en: "message", uz: "xabar", category: "Texnologiya", example: "Send me a message." },
  { en: "file", uz: "fayl", category: "Texnologiya", example: "Open the file." },
  { en: "app", uz: "ilova", category: "Texnologiya", example: "This app is useful." },

  // === HEALTH & BODY ===
  { en: "doctor", uz: "shifokor", category: "Salomatlik & Tana", example: "I need to see a doctor." },
  { en: "hospital", uz: "kasalxona", category: "Salomatlik & Tana", example: "He is in the hospital." },
  { en: "medicine", uz: "dori", category: "Salomatlik & Tana", example: "Take your medicine." },
  { en: "head", uz: "bosh", category: "Salomatlik & Tana", example: "I have a headache." },
  { en: "hand", uz: "qo'l", category: "Salomatlik & Tana", example: "Wash your hands." },
  { en: "eye", uz: "ko'z", category: "Salomatlik & Tana", example: "She has blue eyes." },
  { en: "heart", uz: "yurak", category: "Salomatlik & Tana", example: "Listen to your heart." },
  { en: "pain", uz: "og'riq", category: "Salomatlik & Tana", example: "I have a pain in my back." },
  { en: "healthy", uz: "sog'lom", category: "Salomatlik & Tana", example: "Eat healthy food." },
  { en: "exercise", uz: "mashq", category: "Salomatlik & Tana", example: "Exercise every day." },
  { en: "sleep", uz: "uyqu", category: "Salomatlik & Tana", example: "Get enough sleep." },
  { en: "rest", uz: "dam olish", category: "Salomatlik & Tana", example: "You need some rest." },

  // === TIME ===
  { en: "morning", uz: "ertalab", category: "Vaqt", example: "Good morning!" },
  { en: "afternoon", uz: "peshindan keyin", category: "Vaqt", example: "See you in the afternoon." },
  { en: "evening", uz: "kechqurun", category: "Vaqt", example: "Good evening!" },
  { en: "night", uz: "tun", category: "Vaqt", example: "Good night!" },
  { en: "today", uz: "bugun", category: "Vaqt", example: "What are you doing today?" },
  { en: "tomorrow", uz: "ertaga", category: "Vaqt", example: "See you tomorrow." },
  { en: "yesterday", uz: "kecha", category: "Vaqt", example: "Yesterday was fun." },
  { en: "week", uz: "hafta", category: "Vaqt", example: "I will visit next week." },
  { en: "month", uz: "oy", category: "Vaqt", example: "This month is busy." },
  { en: "year", uz: "yil", category: "Vaqt", example: "Happy New Year!" },
  { en: "hour", uz: "soat", category: "Vaqt", example: "I will be back in an hour." },
  { en: "minute", uz: "daqiqa", category: "Vaqt", example: "Wait a minute!" },
  { en: "day", uz: "kun", category: "Vaqt", example: "Have a nice day!" },

  // === SHOPPING ===
  { en: "shop", uz: "do'kon", category: "Xarid qilish", example: "The shop is closed." },
  { en: "market", uz: "bozor", category: "Xarid qilish", example: "I buy fruit at the market." },
  { en: "buy", uz: "sotib olmoq", category: "Xarid qilish", example: "I want to buy a gift." },
  { en: "sell", uz: "sotmoq", category: "Xarid qilish", example: "They sell fresh bread." },
  { en: "cheap", uz: "arzon", category: "Xarid qilish", example: "This is very cheap." },
  { en: "expensive", uz: "qimmat", category: "Xarid qilish", example: "That is too expensive." },
  { en: "size", uz: "o'lcham", category: "Xarid qilish", example: "What size do you need?" },
  { en: "color", uz: "rang", category: "Xarid qilish", example: "My favorite color is blue." },
  { en: "pay", uz: "to'lamoq", category: "Xarid qilish", example: "I will pay by card." },
  { en: "receipt", uz: "chek", category: "Xarid qilish", example: "Keep the receipt." },
];

// Group by category
export function getCategories() {
  const cats = {};
  vocabularyDB.forEach((w) => {
    if (!cats[w.category]) cats[w.category] = [];
    cats[w.category].push(w);
  });
  return cats;
}

export function getWordsByCategory(category) {
  return vocabularyDB.filter((w) => w.category === category);
}

export function getAllCategories() {
  return [...new Set(vocabularyDB.map((w) => w.category))];
}

export default vocabularyDB;
