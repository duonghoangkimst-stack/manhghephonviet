import { Province, HeritageSite } from '../types';

export interface UnlockProgressWidgetProps {
  selectedRegion: 'north' | 'central' | 'south' | null;
  selectedProvince: Province | null;
  selectedSite: HeritageSite | null;
  quizFinished?: boolean;
  onNavigateStep?: (step: number) => void;
  onStartExperience?: () => void;
  onResetProgress?: () => void;
}

type StepStatus = 'completed' | 'active' | 'upcoming';

interface StepItem {
  id: number;
  label: string;
  status: StepStatus;
  detailBadge: string;
}

export default function UnlockProgressWidget({
  selectedRegion,
  selectedProvince,
  selectedSite,
  quizFinished = false,
  onNavigateStep,
  onStartExperience,
  onResetProgress,
}: UnlockProgressWidgetProps) {
  // Step 1: "Chọn vùng miền" -> Khi đã chọn: "Chọn Vùng Miền (Nam)" / (Bắc) / (Trung)
  const regionShortName =
    selectedRegion === 'north' ? 'Bắc' : selectedRegion === 'central' ? 'Trung' : selectedRegion === 'south' ? 'Nam' : '';

  const step1Status: StepStatus = selectedRegion ? 'completed' : 'active';
  const step1Label = selectedRegion ? `Chọn Vùng Miền (${regionShortName})` : 'Chọn vùng miền';

  // Step 2: "Chọn tỉnh thành" -> Khi chọn xong: Tên Tỉnh/Thành (ví dụ: "TP. Hồ Chí Minh")
  let step2Status: StepStatus = 'upcoming';
  if (selectedProvince) {
    step2Status = 'completed';
  } else if (selectedRegion) {
    step2Status = 'active';
  }
  const step2Label = selectedProvince ? selectedProvince.name : 'Chọn tỉnh thành';

  // Step 3: "Chọn cột mốc" -> Khi chọn xong: Tên Di sản/Cột mốc (ví dụ: "Dinh Độc Lập")
  let step3Status: StepStatus = 'upcoming';
  if (selectedSite) {
    step3Status = 'completed';
  } else if (selectedProvince) {
    step3Status = 'active';
  }
  const step3Label = selectedSite ? selectedSite.name : 'Chọn cột mốc';

  // Step 4: "Tham gia trải nghiệm" (Thay thế cho tên cũ "Tham gia Thử Thách")
  let step4Status: StepStatus = 'upcoming';
  if (quizFinished) {
    step4Status = 'completed';
  } else if (selectedSite) {
    step4Status = 'active';
  }
  const step4Label = 'Tham gia trải nghiệm';

  const steps: StepItem[] = [
    {
      id: 1,
      label: step1Label,
      status: step1Status,
      detailBadge: selectedRegion ? 'Đã chọn' : 'Đang chọn',
    },
    {
      id: 2,
      label: step2Label,
      status: step2Status,
      detailBadge: selectedProvince ? 'Đã chọn' : step2Status === 'active' ? 'Đang chọn' : 'Khóa',
    },
    {
      id: 3,
      label: step3Label,
      status: step3Status,
      detailBadge: selectedSite ? 'Đã chọn' : step3Status === 'active' ? 'Đang chọn' : 'Khóa',
    },
    {
      id: 4,
      label: step4Label,
      status: step4Status,
      detailBadge: quizFinished ? 'Hoàn thành' : step4Status === 'active' ? 'Sẵn sàng' : 'Khóa',
    },
  ];

  const completedCount = steps.filter((s) => s.status === 'completed').length;

  const handleStepClick = (stepId: number, status: StepStatus) => {
    if (status === 'upcoming') return;
    if (stepId === 4 && status === 'active' && onStartExperience) {
      onStartExperience();
      return;
    }
    if (onNavigateStep) {
      onNavigateStep(stepId);
    }
  };

  return (
    <div
      id="unlock-progress-widget"
      className="bg-[#FFFDF9] p-5 sm:p-6 rounded-2xl border-2 border-[#C5B358] shadow-md flex flex-col justify-between space-y-4 relative w-full"
    >
      {/* Vintage corner accents */}
      <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#C89B3C] rounded-tl pointer-events-none" />
      <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#C89B3C] rounded-tr pointer-events-none" />
      <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#C89B3C] rounded-bl pointer-events-none" />
      <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#C89B3C] rounded-br pointer-events-none" />

      {/* Header */}
      <div className="pb-3 border-b border-[#C5B358]/40 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#C89B3C] text-lg">flag</span>
          <h3 className="font-serif text-sm sm:text-base font-black text-[#570000] uppercase tracking-wider">
            Tiến trình mở khóa
          </h3>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span
            className="text-[10px] font-mono font-black px-2 py-0.5 rounded-full border shadow-2xs uppercase tracking-wider"
            style={{
              backgroundColor: completedCount === 4 ? '#7A1C1C' : '#FEF9E7',
              color: completedCount === 4 ? '#C89B3C' : '#7A1C1C',
              borderColor: '#C89B3C',
            }}
          >
            {completedCount}/4 BƯỚC
          </span>

          {onResetProgress && (
            <button
              type="button"
              onClick={onResetProgress}
              title="Đặt lại tiến trình về ban đầu"
              className="w-6 h-6 rounded-full flex items-center justify-center text-stone-400 hover:text-[#7A1C1C] hover:bg-[#FFE9E6] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">restart_alt</span>
            </button>
          )}
        </div>
      </div>

      {/* 4 Steps Chain */}
      <div className="space-y-2 text-xs">
        {steps.map((step, idx) => {
          const isCompleted = step.status === 'completed';
          const isActive = step.status === 'active';
          const isUpcoming = step.status === 'upcoming';

          return (
            <div key={step.id}>
              <div
                onClick={() => handleStepClick(step.id, step.status)}
                className={`flex items-center justify-between gap-3 p-2.5 rounded-xl transition-all ${
                  isUpcoming
                    ? 'text-[#94A3B8] cursor-not-allowed pointer-events-none opacity-60 bg-transparent'
                    : isActive
                    ? 'bg-[#FEF9E7] border border-[#C89B3C] shadow-xs cursor-pointer scale-[1.01]'
                    : 'hover:bg-[#FFF8F6] border border-transparent hover:border-[#C89B3C]/30 cursor-pointer'
                }`}
              >
                {/* Left: Step indicator circle & Step Name */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {/* Circle Badge */}
                  {isCompleted && (
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 shadow-xs border"
                      style={{
                        backgroundColor: '#7A1C1C',
                        color: '#C89B3C',
                        borderColor: '#C89B3C',
                      }}
                      title="Đã hoàn thành"
                    >
                      ✓
                    </span>
                  )}

                  {isActive && (
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 shadow-md ring-2 ring-[#C89B3C]/50 animate-pulse border"
                      style={{
                        backgroundColor: '#C89B3C',
                        color: '#7A1C1C',
                        borderColor: '#7A1C1C',
                      }}
                    >
                      {step.id}
                    </span>
                  )}

                  {isUpcoming && (
                    <span className="w-6 h-6 rounded-full bg-stone-100 border border-stone-200 text-[#94A3B8] flex items-center justify-center text-[10px] font-medium shrink-0">
                      {step.id}
                    </span>
                  )}

                  {/* Step Label: no truncate, no ellipsis, natural multi-line/single-line wrap */}
                  <span
                    className={`text-xs sm:text-sm leading-snug break-words ${
                      isCompleted
                        ? 'font-bold text-[#7A1C1C]'
                        : isActive
                        ? 'font-black text-[#7A1C1C]'
                        : 'font-normal text-[#94A3B8]'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>

                {/* Right: Badge Status */}
                <div className="shrink-0 flex items-center justify-end">
                  {isCompleted && (
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider"
                      style={{
                        backgroundColor: 'rgba(200, 155, 60, 0.15)',
                        color: '#7A1C1C',
                        border: '1px solid rgba(200, 155, 60, 0.4)',
                      }}
                    >
                      {step.detailBadge}
                    </span>
                  )}

                  {isActive && (
                    <span
                      className="text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-2xs animate-pulse"
                      style={{
                        backgroundColor: '#7A1C1C',
                        color: '#C89B3C',
                      }}
                    >
                      {step.detailBadge}
                    </span>
                  )}

                  {isUpcoming && (
                    <span className="material-symbols-outlined text-xs text-[#94A3B8] block">
                      lock
                    </span>
                  )}
                </div>
              </div>

              {/* Connector line between steps */}
              {idx < steps.length - 1 && (
                <div className="pl-5 py-0.5">
                  <div
                    className="w-0.5 h-2.5 transition-colors rounded-full"
                    style={{
                      backgroundColor: isCompleted ? '#C89B3C' : '#E2E8F0',
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Widget Footer CTA / Guidance */}
      <div className="pt-2 border-t border-[#C5B358]/30">
        {step4Status === 'active' ? (
          <button
            type="button"
            onClick={onStartExperience}
            className="w-full py-2 px-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:scale-[1.02]"
            style={{
              backgroundColor: '#7A1C1C',
              color: '#C89B3C',
              border: '1px solid #C89B3C',
            }}
          >
            <span>BẮT ĐẦU TRẢI NGHIỆM</span>
            <span className="material-symbols-outlined text-sm">play_arrow</span>
          </button>
        ) : step3Status === 'active' ? (
          <p className="text-[11px] text-center text-[#7A1C1C] font-semibold flex items-center justify-center gap-1">
            <span className="material-symbols-outlined text-xs text-[#C89B3C]">near_me</span>
            Chọn cột mốc tại Bước 3 bên dưới
          </p>
        ) : step2Status === 'active' ? (
          <p className="text-[11px] text-center text-[#7A1C1C] font-semibold flex items-center justify-center gap-1">
            <span className="material-symbols-outlined text-xs text-[#C89B3C]">near_me</span>
            Chọn tỉnh thành tại Bước 2 bên dưới
          </p>
        ) : (
          <p className="text-[11px] text-center text-stone-500 italic">
            Hành trình 4 bước khám phá di sản
          </p>
        )}
      </div>
    </div>
  );
}
