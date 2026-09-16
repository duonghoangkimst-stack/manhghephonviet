import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Award,
  Sparkles,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  HelpCircle,
  Flame,
  Check
} from 'lucide-react';
import { DOI_A1_QUIZ_QUESTIONS } from '../data/doiA1QuizData';

interface DoiA1QuizSectionProps {
  onAwardRewards?: (xp: number, lotus: number, title?: string) => void;
  onAwardXp?: (xp: number) => void;
}

export default function DoiA1QuizSection({
  onAwardRewards,
  onAwardXp
}: DoiA1QuizSectionProps) {
  // State for current question index (0 - 9)
  const [currentIndex, setCurrentIndex] = useState(0);

  // Map of questionId -> selectedOptionIndex
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});

  // Has reward been claimed for this session
  const [isRewardClaimed, setIsRewardClaimed] = useState(false);

  // Show summary modal/card
  const [showSummary, setShowSummary] = useState(false);

  const currentQ = DOI_A1_QUIZ_QUESTIONS[currentIndex];
  const isAnswered = userAnswers[currentQ.id] !== undefined;
  const chosenIndex = userAnswers[currentQ.id];

  // Calculate score
  const totalQuestions = DOI_A1_QUIZ_QUESTIONS.length;
  const answeredCount = Object.keys(userAnswers).length;
  const correctCount = DOI_A1_QUIZ_QUESTIONS.filter(
    (q) => userAnswers[q.id] === q.correctIndex
  ).length;

  const totalEarnableXp = correctCount * 50;
  const totalEarnableLotus = correctCount * 5;

  // Handle selecting an option
  const handleSelectOption = (optIndex: number) => {
    if (isAnswered) return; // Prevent changing after answer is submitted

    const newAnswers = {
      ...userAnswers,
      [currentQ.id]: optIndex
    };
    setUserAnswers(newAnswers);

    // If this was the last question being answered, auto show summary after short delay
    if (Object.keys(newAnswers).length === totalQuestions) {
      setTimeout(() => {
        setShowSummary(true);
      }, 1200);
    }
  };

  // Handle claiming rewards
  const handleClaimReward = () => {
    if (isRewardClaimed) return;
    const earnedXp = Math.max(100, correctCount * 50);
    const earnedLotus = Math.max(10, correctCount * 5);

    if (onAwardRewards) {
      onAwardRewards(earnedXp, earnedLotus, 'Trắc nghiệm Đồi A1');
    } else if (onAwardXp) {
      onAwardXp(earnedXp);
    }
    setIsRewardClaimed(true);
  };

  // Reset quiz
  const handleResetQuiz = () => {
    setUserAnswers({});
    setCurrentIndex(0);
    setShowSummary(false);
    setIsRewardClaimed(false);
  };

  return (
    <div
      id="doi-a1-quiz-section"
      className="w-full bg-[#FAF5EB] rounded-3xl border-2 border-[#C5B358] p-5 sm:p-8 shadow-xl mt-8 space-y-6 scroll-mt-28"
    >
      {/* Top Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#C5B358]/50">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#570000] text-[#D4AF37] text-[11px] font-bold uppercase tracking-wider mb-2 border border-[#C5B358]">
            <Flame className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Thử Thách Trắc Nghiệm Lịch Sử</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#570000] uppercase tracking-tight">
            KÝ ỨC CỨ ĐIỂM ĐỒI A1 – 10 CÂU HỎI QUÂN SỰ
          </h3>
          <p className="text-xs sm:text-sm text-[#5A413D] mt-1 max-w-2xl leading-relaxed">
            Trả lời đúng để nhận ngay điểm kinh nghiệm <strong className="text-[#570000]">XP</strong> và hoa sen{' '}
            <strong className="text-[#007A33]">Sen</strong> vinh danh bảng vàng di sản Điện Biên Phủ.
          </p>
        </div>

        {/* Live Reward Pill */}
        <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-2xl border border-[#C5B358]/70 shadow-sm shrink-0">
          <div className="text-right">
            <p className="text-[10px] text-stone-500 uppercase font-bold">Thưởng tối đa</p>
            <p className="text-sm font-black text-[#570000] flex items-center justify-end gap-1">
              <span>+500 XP</span>
              <span className="text-[#C5B358]">•</span>
              <span className="text-[#007A33]">+50 Sen</span>
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#FFF8F6] border border-[#C5B358] flex items-center justify-center text-[#D4AF37]">
            <Award className="w-5 h-5 text-[#C59B27]" />
          </div>
        </div>
      </div>

      {/* Question Number Pills Navigation (1 - 10) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-[#570000]">
            Tiến độ hoàn thành: {answeredCount} / {totalQuestions} câu
          </span>
          <span className="text-stone-600 font-semibold">
            Đúng: <strong className="text-emerald-700">{correctCount}</strong> câu
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-[#570000] via-[#C59B27] to-emerald-600 h-full transition-all duration-300"
            style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
          />
        </div>

        {/* Question Selector Buttons */}
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 pt-2">
          {DOI_A1_QUIZ_QUESTIONS.map((q, idx) => {
            const hasAnswered = userAnswers[q.id] !== undefined;
            const isQCorrect = hasAnswered && userAnswers[q.id] === q.correctIndex;
            const isQWrong = hasAnswered && userAnswers[q.id] !== q.correctIndex;
            const isCurrent = idx === currentIndex;

            let pillStyle = 'bg-white text-stone-700 border-stone-300 hover:border-[#C5B358]';
            if (isCurrent) {
              pillStyle = 'bg-[#570000] text-white border-[#570000] ring-2 ring-[#D4AF37] font-black shadow-md';
            } else if (isQCorrect) {
              pillStyle = 'bg-emerald-100 text-emerald-900 border-emerald-500 font-bold';
            } else if (isQWrong) {
              pillStyle = 'bg-rose-100 text-rose-900 border-rose-400 line-through';
            }

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 ${pillStyle}`}
                title={`Câu ${idx + 1}`}
              >
                <span>Câu {idx + 1}</span>
                <span className="text-[10px]">
                  {isQCorrect ? '✓' : isQWrong ? '✗' : `•`}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Active Question Card */}
      <div className="bg-[#FFFDF9] rounded-2xl border-2 border-[#C5B358]/80 p-5 sm:p-7 shadow-md space-y-6">
        {/* Question Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C59B27] bg-[#570000] px-3 py-1 rounded-md inline-block">
              Câu hỏi {currentIndex + 1} / {totalQuestions}
            </span>
            <h4 className="font-serif text-lg sm:text-xl md:text-2xl font-black text-[#3D0505] leading-snug pt-1">
              {currentQ.question}
            </h4>
          </div>
          <span className="text-xs font-bold text-stone-500 bg-stone-100 px-3 py-1.5 rounded-full border border-stone-200 shrink-0">
            50 XP • 5 Sen
          </span>
        </div>

        {/* Options List (A, B, C, D) as rounded-xl cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {currentQ.options.map((optText, optIdx) => {
            const letter = String.fromCharCode(65 + optIdx); // A, B, C, D
            const isCorrectOption = optIdx === currentQ.correctIndex;
            const isUserChosen = optIdx === chosenIndex;

            // Compute styling based on whether question is answered
            let cardClass =
              'bg-white border-stone-200 text-stone-800 hover:border-[#D4AF37] hover:bg-[#FFFDF6]';
            let circleClass = 'bg-[#FAF5EB] text-[#570000] border-stone-300';
            let iconElement = null;

            if (isAnswered) {
              if (isCorrectOption) {
                cardClass =
                  'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-500/40 shadow-sm';
                circleClass = 'bg-emerald-600 text-white border-emerald-600';
                iconElement = <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />;
              } else if (isUserChosen && !isCorrectOption) {
                cardClass =
                  'bg-rose-50 border-rose-500 text-rose-950 ring-2 ring-rose-400/40 opacity-90';
                circleClass = 'bg-rose-600 text-white border-rose-600';
                iconElement = <XCircle className="w-5 h-5 text-rose-600 shrink-0" />;
              } else {
                cardClass = 'bg-stone-50 border-stone-200 text-stone-400 opacity-60';
                circleClass = 'bg-stone-200 text-stone-400 border-stone-200';
              }
            }

            return (
              <button
                key={optText}
                type="button"
                disabled={isAnswered}
                onClick={() => handleSelectOption(optIdx)}
                className={`p-4 rounded-xl border-2 text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3.5 cursor-pointer ${cardClass}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-lg border flex items-center justify-center font-bold text-xs shrink-0 ${circleClass}`}
                  >
                    {letter}
                  </span>
                  <span className="leading-relaxed">{optText}</span>
                </div>
                {iconElement}
              </button>
            );
          })}
        </div>

        {/* Immediate Explanation Box (Hiển thị ngay sau khi chọn đáp án) */}
        {isAnswered && (
          <div
            className={`p-4 sm:p-5 rounded-xl border text-xs sm:text-sm space-y-1.5 transition-all ${
              chosenIndex === currentQ.correctIndex
                ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                : 'bg-[#FFF8F6] border-[#C5B358] text-[#3D0505]'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-sm">
              {chosenIndex === currentQ.correctIndex ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-800">Chính xác! (+50 XP, +5 Sen)</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span className="text-rose-800">Chưa chính xác!</span>
                </>
              )}
            </div>
            <div>
              <span className="font-bold text-[#570000]">Giải thích lịch sử: </span>
              <span className="text-stone-700 leading-relaxed">{currentQ.explanation}</span>
            </div>
          </div>
        )}

        {/* Navigation Buttons (Prev / Next) */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Câu trước</span>
          </button>

          <div className="flex items-center gap-2">
            {answeredCount === totalQuestions && (
              <button
                type="button"
                onClick={() => setShowSummary(true)}
                className="bg-[#D4AF37] hover:bg-[#C59B27] text-[#3D0505] px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider shadow-md inline-flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <Award className="w-4 h-4 text-[#570000]" />
                <span>Xem Tổng Kết & Nhận Thưởng</span>
              </button>
            )}

            {currentIndex < totalQuestions - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
                className="bg-[#570000] hover:bg-[#800000] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md inline-flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <span>Câu tiếp theo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowSummary(true)}
                className="bg-[#570000] hover:bg-[#800000] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md inline-flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <span>Tổng kết kết quả</span>
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Summary / Result Modal or Container */}
      {showSummary && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
          <div className="bg-[#FAF5EB] border-3 border-[#C5B358] rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center space-y-5 shadow-2xl relative">
            <div className="w-20 h-20 mx-auto rounded-full bg-[#570000] text-[#D4AF37] border-2 border-[#C5B358] flex items-center justify-center shadow-lg">
              <Trophy className="w-10 h-10 text-[#D4AF37]" />
            </div>

            <div>
              <span className="text-[11px] font-bold text-[#D4AF37] bg-[#570000] px-3 py-1 rounded-full uppercase tracking-wider">
                KẾT QUẢ THỬ THÁCH ĐỒI A1
              </span>
              <h4 className="font-serif text-2xl sm:text-3xl font-black text-[#570000] mt-2">
                {correctCount >= 8
                  ? 'XUẤT SẮC! CHIẾN CÔNG VANG DỘI'
                  : correctCount >= 5
                  ? 'BẠN ĐÃ VƯỢT QUA THỬ THÁCH!'
                  : 'TIẾP TỤC CỐ GẮNG ÔN LUYỆN!'}
              </h4>
              <p className="text-xs text-stone-600 mt-1">
                Chiến dịch Điện Biên Phủ 1954 – Cứ điểm Đồi A1 lịch sử
              </p>
            </div>

            {/* Score Grid */}
            <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
              <div className="bg-white p-3.5 rounded-2xl border border-[#C5B358]/60 shadow-xs">
                <p className="text-[10px] text-stone-500 uppercase font-bold">Số câu trả lời đúng</p>
                <p className="text-2xl font-black text-[#570000]">
                  {correctCount} / {totalQuestions}
                </p>
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-[#C5B358]/60 shadow-xs">
                <p className="text-[10px] text-stone-500 uppercase font-bold">Phần thưởng đạt được</p>
                <p className="text-sm font-black text-[#007A33]">
                  +{totalEarnableXp} XP <br />
                  +{totalEarnableLotus} Sen
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 space-y-3">
              {!isRewardClaimed ? (
                <button
                  type="button"
                  onClick={handleClaimReward}
                  className="w-full bg-[#570000] hover:bg-[#800000] text-white py-3.5 px-6 rounded-full font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
                >
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>CỘNG ĐIỂM THƯỞNG VÀO TÀI KHOẢN</span>
                </button>
              ) : (
                <div className="bg-emerald-100 border border-emerald-400 text-emerald-900 py-2.5 px-4 rounded-full text-xs font-bold flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700" />
                  <span>Đã cộng +{totalEarnableXp} XP và +{totalEarnableLotus} Sen thành công!</span>
                </div>
              )}

              <div className="flex gap-3 justify-center">
                <button
                  type="button"
                  onClick={handleResetQuiz}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold text-[#570000] bg-white border border-[#570000] hover:bg-stone-50 cursor-pointer transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Làm lại thử thách</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowSummary(false)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold text-stone-700 bg-stone-200 hover:bg-stone-300 cursor-pointer transition-all"
                >
                  <span>Đóng cửa sổ</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Trophy(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}
