const verses = [
  {
    ko: "내가 너와 함께 함이라 내가 너를 굳세게 하리라 참으로 내가 너를 도와주리라",
    refKo: "이사야 41:10",
    en: "I am with you and will strengthen you; I will help you.",
    refEn: "Isaiah 41:10"
  },
  {
    ko: "여호와는 나의 목자시니 내게 부족함이 없으리로다",
    refKo: "시편 23:1",
    en: "The Lord is my shepherd; I shall not want.",
    refEn: "Psalm 23:1"
  },
  {
    ko: "내게 능력 주시는 자 안에서 내가 모든 것을 할 수 있느니라",
    refKo: "빌립보서 4:13",
    en: "I can do all things through Christ who strengthens me.",
    refEn: "Philippians 4:13"
  },
  {
    ko: "너의 길을 여호와께 맡기라 그를 의지하면 그가 이루시고",
    refKo: "시편 37:5",
    en: "Commit your way to the Lord; trust in him and he will act.",
    refEn: "Psalm 37:5"
  },
  {
    ko: "아무 것도 염려하지 말고 다만 모든 일에 기도와 간구로 너희 구할 것을 하나님께 아뢰라",
    refKo: "빌립보서 4:6",
    en: "Do not be anxious, but in everything, by prayer and petition, present your requests to God.",
    refEn: "Philippians 4:6"
  }
];

function koreaDateKey() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date());
}

export default function handler(req, res) {
  const date = koreaDateKey();
  const dayNumber = Math.floor(Date.parse(date + "T00:00:00Z") / 86400000);
  const verse = verses[((dayNumber % verses.length) + verses.length) % verses.length];

  res.setHeader("Cache-Control", "no-store, max-age=0");
  res.status(200).json({
    date,
    title: "오늘의 말씀",
    verse: verse.ko,
    reference: verse.refKo,
    verse_en: verse.en,
    reference_en: verse.refEn,
    site_url: "https://chrisleepapa-official.vercel.app/today",
    threads_text: "📖 오늘의 말씀\n\n“" + verse.ko + "”\n— " + verse.refKo + "\n\n오늘도 말씀과 함께 시작합니다.\nhttps://chrisleepapa-official.vercel.app/today\n\n#오늘의말씀 #성경말씀 #ChrisLEEPAPA"
  });
}
