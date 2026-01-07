
import { Question } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "מהו הערך המרכזי שאת מחפשת במערכת יחסים של דייטינג פרימיום?",
    options: [
      { label: "יציבות וביטחון רגשי גבוה", score: 2 },
      { label: "חיבור איכותי המבוסס על סגנון חיים יוקרתי", score: 3 },
      { label: "קשר קליל ללא מחויבות ארוכה", score: 1 },
      { label: "צמיחה משותפת ומודעות הדדית", score: 3 }
    ]
  },
  {
    id: 2,
    text: "איך היית מתארת את רמת הציפיות שלך מהגבר שאיתך?",
    options: [
      { label: "גבוהה מאוד - אני לא מתפשרת על איכות", score: 3 },
      { label: "ממוצעת - אני מחפשת מישהו נחמד", score: 1 },
      { label: "אני מעריכה הצלחה, ביטחון עצמי ונדיבות", score: 3 },
      { label: "חשוב לי בעיקר שיהיה חיבור פיזי", score: 2 }
    ]
  },
  {
    id: 3,
    text: "עד כמה חשובה לך הדיסקרטיות במעגל ההיכרויות שלך?",
    options: [
      { label: "קריטית - הפרטיות שלי מעל הכל", score: 3 },
      { label: "חשובה במידה מסוימת", score: 2 },
      { label: "זה לא שיקול משמעותי עבורי", score: 1 }
    ]
  },
  {
    id: 4,
    text: "מהו היחס שלך לגבי גבולות ברורים בתחילת הקשר?",
    options: [
      { label: "אני מעדיפה שקיפות מלאה לגבי הציפיות", score: 3 },
      { label: "אני זורמת בלי להגדיר יותר מדי", score: 1 },
      { label: "אני מעריכה גבר שיודע להוביל ולהציע", score: 3 }
    ]
  },
  {
    id: 5,
    text: "האם את מרגישה שקשה לך למצוא התאמה באפליקציות הרגילות?",
    options: [
      { label: "כן, הרמה שם לא תואמת את הסטנדרטים שלי", score: 3 },
      { label: "אני מוצאת שם קשרים מדי פעם", score: 1 },
      { label: "אני מחפשת סינון קפדני ואיכותי יותר", score: 3 }
    ]
  },
  {
    id: 6,
    text: "מהי החוויה המושלמת עבורך בדייט ראשון?",
    options: [
      { label: "שיח עמוק במסעדה יוקרתית או מקום אינטימי", score: 3 },
      { label: "קפה זריז או הליכה בים", score: 1 },
      { label: "חוויה ייחודית שמשדרת איכות והשקעה", score: 3 },
      { label: "משהו ספונטני וקליל", score: 2 }
    ]
  }
];

export const COLORS = {
  primary: '#1a1a1a', // Dark Black/Brown from the site
  accent: '#C5A059',  // Signature Gold
  rose: '#e892a2',    // Pink accent
  bg: '#ffffff',      // Pure white background like the site
  text: '#1a1a1a',
  muted: '#757575'
};
