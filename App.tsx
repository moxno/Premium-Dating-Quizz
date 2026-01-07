
import React, { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, ShieldCheck, Stars, ArrowRight, Gem, UserPlus, Lock, Sparkles } from 'lucide-react';
import { QUESTIONS, COLORS } from './constants';
import { AppState } from './types';

const ProgressBar = ({ current, total }: { current: number; total: number }) => {
  const progress = (current / total) * 100;
  return (
    <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden mb-8">
      <div 
        className="h-full transition-all duration-700 ease-in-out"
        style={{ width: `${progress}%`, background: COLORS.accent }}
      />
    </div>
  );
};

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.WELCOME);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const startQuiz = () => setState(AppState.QUIZ);

  const handleAnswer = (points: number) => {
    setScore(prev => prev + points);
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setState(AppState.CALCULATING);
    }
  };

  useEffect(() => {
    if (state === AppState.CALCULATING) {
      const timer = setTimeout(() => {
        setState(AppState.RESULT);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [state]);

  const renderWelcome = () => (
    <div className="max-w-2xl mx-auto text-center px-4 pt-4 md:pt-12 fade-in relative">
      <div className="flex justify-center mb-6 text-[#C5A059]">
        <Gem size={56} strokeWidth={1.2} />
      </div>
      
      <span className="inline-block px-4 py-1 rounded-full bg-[#fdf2f4] text-[#e892a2] text-sm font-bold uppercase tracking-widest mb-6 border border-[#fce4e8]">
        תהליך מיון אקסקלוסיבי
      </span>
      
      <h1 className="text-4xl md:text-5xl font-black text-[#1a1a1a] mb-6 leading-tight">
        האם את מתאימה לקהילת היכרויות הפרימיום שלנו?
      </h1>
      
      <p className="text-lg md:text-xl text-[#444] mb-10 leading-relaxed font-light">
        אנחנו לא עוד אפליקציית דייטינג. אנחנו מעגל סגור של מערכות יחסים מודעות, 
        המבוסס על חיבור איכותי, סטנדרטים גבוהים ודיסקרטיות מוחלטת. 
        גלי עכשיו אם את מוכנה לשדרג את חוויית הדייטינג שלך.
      </p>

      <button 
        onClick={startQuiz}
        className="group relative overflow-hidden bg-[#1a1a1a] text-white px-12 py-5 rounded-full text-xl font-bold hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 active:scale-95 flex items-center gap-4 mx-auto border-2 border-[#1a1a1a] hover:bg-white hover:text-[#1a1a1a]"
      >
        <span className="relative z-10">התחילי את מבדק ההתאמה</span>
        <ArrowRight size={22} className="relative z-10 transition-transform duration-300 group-hover:-translate-x-1" />
      </button>

      <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8 text-[#757575] text-sm">
        <span className="flex items-center gap-2 font-medium"><ShieldCheck size={20} className="text-[#C5A059]" /> דיסקרטיות מובטחת</span>
        <span className="flex items-center gap-2 font-medium"><Stars size={20} className="text-[#e892a2]" /> קהילה סגורה ויוקרתית</span>
      </div>
    </div>
  );

  const renderQuiz = () => {
    const question = QUESTIONS[currentQuestion];
    return (
      <div className="max-w-xl mx-auto px-4 pt-4 fade-in">
        <ProgressBar current={currentQuestion + 1} total={QUESTIONS.length} />
        <div className="flex justify-between items-center mb-6">
          <span className="text-[#C5A059] font-bold text-xs uppercase tracking-[0.2em]">
            אבחון בתהליך
          </span>
          <span className="text-[#1a1a1a] text-sm font-bold bg-gray-100 px-3 py-1 rounded-full">
            {currentQuestion + 1} / {QUESTIONS.length}
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#1a1a1a] mb-12 leading-snug">
          {question.text}
        </h2>
        <div className="space-y-4">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(option.score)}
              className="w-full text-right p-6 rounded-xl border-2 border-gray-100 bg-white shadow-sm hover:shadow-lg hover:border-[#C5A059] transition-all group flex items-center justify-between"
            >
              <span className="text-lg text-[#333] font-semibold group-hover:text-[#1a1a1a]">{option.label}</span>
              <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-[#C5A059] group-hover:border-[#C5A059] transition-all">
                <ChevronLeft size={20} className="text-gray-300 group-hover:text-white" />
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderCalculating = () => (
    <div className="max-w-2xl mx-auto text-center px-4 pt-20 fade-in">
      <div className="mb-10 relative flex justify-center">
        <div className="w-20 h-20 border-4 border-t-[#C5A059] border-r-transparent border-b-[#1a1a1a] border-l-transparent rounded-full animate-spin"></div>
      </div>
      <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">מנתחת את פרופיל ההתאמה שלך...</h2>
      <p className="text-[#757575] font-light">אנחנו בודקים את התאמת הציפיות שלך לסטנדרט הפרימיום של הקהילה.</p>
    </div>
  );

  const renderResult = () => {
    const isMatched = score >= 14; 
    const utmParams = "utm_source=quiz&utm_medium=diagnostic&utm_campaign=conscious_premium";
    const redirectUrl = isMatched 
      ? `https://sugardaddy.co.il/he/sign-up?${utmParams}`
      : `https://sugardaddy.co.il/?${utmParams}`;
    
    return (
      <div className="max-w-2xl mx-auto text-center px-4 pt-6 md:pt-12 fade-in">
        <div className="flex justify-center mb-6 text-[#C5A059]">
          <Stars size={72} strokeWidth={1} />
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-[#1a1a1a] mb-8">
          {isMatched ? "פרופיל ההתאמה שלך הושלם" : "תודה על הכנות המלאה"}
        </h2>

        {/* INVITE CARD */}
        <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-50 mb-12 text-right relative overflow-hidden group">
          {/* Background Decorative Sparkles */}
          <div className="absolute top-0 left-0 p-4 text-[#C5A059] opacity-10">
            <Sparkles size={120} />
          </div>
          
          {isMatched ? (
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#C5A059] p-2 rounded-lg text-white">
                  <CheckCircle size={24} />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-[#C5A059]">יש לנו התאמה פוטנציאלית גבוהה</h3>
              </div>
              
              <div className="text-lg text-[#333] leading-relaxed space-y-4 font-medium">
                <p>התשובות שלך מציירות תמונה של אישה שמבינה את הערך של דייטינג פרימיום, מעריכה חיבור איכותי ושומרת על סטנדרטים גבוהים ללא פשרות.</p>
                <p>המעגל שלנו מורכב בדיוק מנשים כמוך ומגברים שמחפשים את האיכות הזו.</p>
              </div>

              {/* PREMIUM CTA BOX */}
              <div className="mt-10 p-1 bg-gradient-to-r from-[#C5A059] via-[#e892a2] to-[#C5A059] rounded-3xl">
                <div className="bg-[#1a1a1a] p-8 rounded-[1.4rem] text-center space-y-6">
                  <div className="inline-flex items-center gap-2 text-[#C5A059] text-sm font-black tracking-widest uppercase mb-2">
                    <Lock size={16} /> הצטרפות לקהילה הסגורה
                  </div>
                  <h4 className="text-white text-2xl font-bold">הזמנה רשמית תחכה לך לאחר רישום באתר</h4>
                  <p className="text-gray-400 text-sm">תהליך הרישום דיסקרטי, קצר ומכבד.</p>
                  
                  <a 
                    href={redirectUrl}
                    className="flex items-center justify-center gap-3 w-full bg-[#C5A059] text-white px-10 py-5 rounded-2xl text-xl font-black shadow-[0_10px_30px_rgba(197,160,89,0.3)] hover:shadow-[0_15px_40px_rgba(197,160,89,0.5)] transition-all duration-300 transform hover:-translate-y-1 active:scale-95 group/btn"
                  >
                    <span>הצטרפי להכרויות פרימיום ללא תשלום</span>
                    <UserPlus size={24} className="group-hover/btn:scale-110 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#e892a2] p-2 rounded-lg text-white">
                  <Stars size={24} />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-[#e892a2]">מעריכים את הכנות שלך</h3>
              </div>
              
              <div className="text-lg text-[#333] leading-relaxed space-y-4 font-medium">
                <p>נראה שאת מחפשת כרגע חוויות דייטינג שונות ממה שהקהילה שלנו מציעה.</p>
                <p>הסטנדרט שלנו קפדני מאוד ודורש מודעות גבוהה ומוכנות לחיבור סלקטיבי במיוחד. עם זאת, תמיד תוכלי לגלות יותר ולהחליט אם זהו הכיוון שאת שואפת אליו.</p>
              </div>

              <div className="mt-10">
                <a 
                  href={redirectUrl}
                  className="flex items-center justify-center gap-3 w-full border-2 border-[#1a1a1a] text-[#1a1a1a] px-10 py-5 rounded-2xl text-xl font-black hover:bg-[#1a1a1a] hover:text-white transition-all duration-300 group/btn"
                >
                  <span>גלי את האפשרויות שלנו</span>
                  <ArrowRight size={24} />
                </a>
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-6 pb-12">
          <button 
            onClick={() => {
              setState(AppState.WELCOME);
              setCurrentQuestion(0);
              setScore(0);
            }}
            className="text-[#757575] text-sm font-bold border-b-2 border-gray-200 hover:text-[#1a1a1a] hover:border-[#1a1a1a] transition-all"
          >
            בדיקה חוזרת
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden bg-white">
      <main className="pt-4">
        {state === AppState.WELCOME && renderWelcome()}
        {state === AppState.QUIZ && renderQuiz()}
        {state === AppState.CALCULATING && renderCalculating()}
        {state === AppState.RESULT && renderResult()}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-md border-t border-gray-100 flex justify-center text-[11px] text-[#757575] uppercase tracking-[0.2em] font-bold z-50">
        מעגל פרימיום מודע • דיסקרטיות מובטחת • 2026
      </footer>
    </div>
  );
};

export default App;
