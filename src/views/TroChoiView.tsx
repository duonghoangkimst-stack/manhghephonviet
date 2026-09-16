import { useState, ChangeEvent } from 'react';
import { Upload, RotateCcw, Pencil, Check, X } from 'lucide-react';
import { TabType, UserProfile, HeritageSite, Province } from '../types';
import { PROVINCES, HERITAGE_SITES, QUIZ_QUESTIONS, LEADERBOARD } from '../data/mockData';
import InteractiveVietnamMap from '../components/InteractiveVietnamMap';
import UnlockProgressWidget from '../components/UnlockProgressWidget';
import DoiA1QuizSection from '../components/DoiA1QuizSection';

interface TroChoiViewProps {
  setActiveTab: (tab: TabType) => void;
  user: UserProfile | null;
  onAwardXp: (xp: number) => void;
  onAwardQuizRewards?: (xp: number, lotus: number, title?: string) => void;
}

export default function TroChoiView({
  setActiveTab: _setActiveTab,
  user,
  onAwardXp,
  onAwardQuizRewards
}: TroChoiViewProps) {
  // Navigation inside Game view - Default to user requested example: Nam -> TP. HCM -> Dinh Độc Lập
  const [selectedRegion, setSelectedRegion] = useState<'north' | 'central' | 'south' | null>('south');
  const [selectedProvinceId, setSelectedProvinceId] = useState<string | null>('tp-hcm');
  
  // Custom uploaded cover images for landmark cards (persisted locally)
  const [customSiteImages, setCustomSiteImages] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('diem_hen_custom_site_images');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Custom uploaded cover images for provinces (persisted locally)
  const [customProvinceImages, setCustomProvinceImages] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('diem_hen_custom_province_images');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Custom edited descriptions for landmark cards (persisted locally)
  const [customSiteDescriptions, setCustomSiteDescriptions] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('diem_hen_custom_site_descriptions');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // State for which site's description is currently being edited
  const [editingSiteId, setEditingSiteId] = useState<string | null>(null);
  const [editDescDraft, setEditDescDraft] = useState<string>('');

  const [selectedSite, setSelectedSite] = useState<HeritageSite | null>(() => {
    const initial = HERITAGE_SITES.find((s) => s.id === 'dinh-doc-lap-site') || HERITAGE_SITES[0];
    try {
      const savedImgs = localStorage.getItem('diem_hen_custom_site_images');
      const savedDescs = localStorage.getItem('diem_hen_custom_site_descriptions');
      let img = initial.image;
      let desc = initial.desc;
      if (savedImgs && initial) {
        const parsedImgs = JSON.parse(savedImgs);
        if (parsedImgs[initial.id]) {
          img = parsedImgs[initial.id];
        }
      }
      if (savedDescs && initial) {
        const parsedDescs = JSON.parse(savedDescs);
        if (parsedDescs[initial.id]) {
          desc = parsedDescs[initial.id];
        }
      }
      return { ...initial, image: img, desc };
    } catch {
      // ignore
    }
    return initial || null;
  });

  // Quick switch to Đồi A1 (Điện Biên Phủ) and scroll to Step 4 / Quiz
  const handleQuickSelectDoiA1 = () => {
    setSelectedRegion('north');
    setSelectedProvinceId('dien-bien');
    const doiA1 = HERITAGE_SITES.find((s) => s.id === 'doi-a1-dien-bien');
    if (doiA1) {
      const activeImage = customSiteImages[doiA1.id] || doiA1.image;
      const activeDesc = customSiteDescriptions[doiA1.id] || doiA1.desc;
      setSelectedSite({ ...doiA1, image: activeImage, desc: activeDesc });
    }
    setTimeout(() => {
      const el = document.getElementById('doi-a1-quiz-section') || document.getElementById('section-step-4');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  // Handle uploading custom image for a milestone card
  const handleUploadSiteImage = (siteId: string, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Direct object URL for instant 0ms preview
    const objectUrl = URL.createObjectURL(file);
    setCustomSiteImages((prev) => ({ ...prev, [siteId]: objectUrl }));

    // Also update selectedSite immediately if active
    setSelectedSite((prev) => {
      if (prev && prev.id === siteId) {
        return { ...prev, image: objectUrl };
      }
      return prev;
    });

    // Background persistence in localStorage via FileReader
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setCustomSiteImages((prev) => {
          const updated = { ...prev, [siteId]: dataUrl };
          try {
            localStorage.setItem('diem_hen_custom_site_images', JSON.stringify(updated));
          } catch (err) {
            console.warn('LocalStorage quota exceeded, image stored in memory', err);
          }
          return updated;
        });
      }
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  // Reset custom milestone image back to default
  const handleResetSiteImage = (siteId: string) => {
    setCustomSiteImages((prev) => {
      const updated = { ...prev };
      delete updated[siteId];
      try {
        localStorage.setItem('diem_hen_custom_site_images', JSON.stringify(updated));
      } catch (err) {
        console.warn('Could not update localStorage', err);
      }
      return updated;
    });

    const defaultSite = HERITAGE_SITES.find((s) => s.id === siteId);
    if (defaultSite) {
      setSelectedSite((prev) => {
        if (prev && prev.id === siteId) {
          return { ...prev, image: defaultSite.image };
        }
        return prev;
      });
    }
  };

  // Start editing description for a site
  const handleStartEditDescription = (siteId: string, currentDesc: string) => {
    setEditingSiteId(siteId);
    setEditDescDraft(currentDesc);
  };

  // Cancel editing description
  const handleCancelEditDescription = () => {
    setEditingSiteId(null);
    setEditDescDraft('');
  };

  // Save new description for a site
  const handleSaveSiteDescription = (siteId: string) => {
    const trimmed = editDescDraft.trim();
    if (!trimmed) return;

    setCustomSiteDescriptions((prev) => {
      const updated = { ...prev, [siteId]: trimmed };
      try {
        localStorage.setItem('diem_hen_custom_site_descriptions', JSON.stringify(updated));
      } catch (err) {
        console.warn('LocalStorage quota exceeded for description', err);
      }
      return updated;
    });

    // Also update selectedSite if active
    setSelectedSite((prev) => {
      if (prev && prev.id === siteId) {
        return { ...prev, desc: trimmed };
      }
      return prev;
    });

    setEditingSiteId(null);
    setEditDescDraft('');
  };

  // Reset custom description back to default
  const handleResetSiteDescription = (siteId: string) => {
    setCustomSiteDescriptions((prev) => {
      const updated = { ...prev };
      delete updated[siteId];
      try {
        localStorage.setItem('diem_hen_custom_site_descriptions', JSON.stringify(updated));
      } catch (err) {
        console.warn('Could not update localStorage', err);
      }
      return updated;
    });

    const defaultSite = HERITAGE_SITES.find((s) => s.id === siteId);
    if (defaultSite) {
      setSelectedSite((prev) => {
        if (prev && prev.id === siteId) {
          return { ...prev, desc: defaultSite.desc };
        }
        return prev;
      });
    }

    if (editingSiteId === siteId) {
      setEditingSiteId(null);
      setEditDescDraft('');
    }
  };

  // Handle uploading custom cover image for a province
  const handleUploadProvinceImage = (provId: string, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Instant local object URL
    const objectUrl = URL.createObjectURL(file);
    setCustomProvinceImages((prev) => ({ ...prev, [provId]: objectUrl }));

    // Background persistence in localStorage
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setCustomProvinceImages((prev) => {
          const updated = { ...prev, [provId]: dataUrl };
          try {
            localStorage.setItem('diem_hen_custom_province_images', JSON.stringify(updated));
          } catch (err) {
            console.warn('LocalStorage quota exceeded for province image', err);
          }
          return updated;
        });
      }
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  // Reset custom province image back to default
  const handleResetProvinceImage = (provId: string) => {
    setCustomProvinceImages((prev) => {
      const updated = { ...prev };
      delete updated[provId];
      try {
        localStorage.setItem('diem_hen_custom_province_images', JSON.stringify(updated));
      } catch (err) {
        console.warn('Could not update localStorage', err);
      }
      return updated;
    });
  };

  // Region Selection Handler
  const handleSelectRegion = (region: 'north' | 'central' | 'south') => {
    setSelectedRegion(region);
    // If switching to another region, clear downstream steps so user experiences full 4-step unlocking
    const regionProvinces = PROVINCES.filter((p) => p.region === region);
    if (!regionProvinces.some((p) => p.id === selectedProvinceId)) {
      const defaultProv =
        region === 'north'
          ? regionProvinces.find((p) => p.id === 'dien-bien') || regionProvinces[0]
          : regionProvinces[0];
      setSelectedProvinceId(defaultProv?.id || null);
      setSelectedSite(null);
    }
  };

  // Province Selection Handler
  const handleSelectProvince = (provId: string) => {
    setSelectedProvinceId(provId);
    const prov = PROVINCES.find((p) => p.id === provId);
    if (prov && prov.region !== selectedRegion) {
      setSelectedRegion(prov.region);
    }
    // If current selected site does not belong to this province, reset site selection
    if (!selectedSite || selectedSite.provinceId !== provId) {
      setSelectedSite(null);
    }
    // Smooth scroll to Step 3
    setTimeout(() => {
      const step3El = document.getElementById('section-step-3');
      if (step3El) {
        step3El.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Site Selection Handler
  const handleSelectSite = (site: HeritageSite) => {
    const activeImage = customSiteImages[site.id] || site.image;
    const activeDesc = customSiteDescriptions[site.id] || site.desc;
    setSelectedSite({ ...site, image: activeImage, desc: activeDesc });
    // Smooth scroll to Step 4
    setTimeout(() => {
      const step4El = document.getElementById('section-step-4');
      if (step4El) {
        step4El.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Navigate to step from UnlockProgressWidget
  const handleNavigateStep = (stepNumber: number) => {
    const el = document.getElementById(`section-step-${stepNumber}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Reset entire progress
  const handleResetProgress = () => {
    setSelectedRegion(null);
    setSelectedProvinceId(null);
    setSelectedSite(null);
    setQuizFinished(false);
    const el = document.getElementById('section-step-1');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Quiz Modal State
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const currentProvince: Province | null = selectedProvinceId
    ? (() => {
        const found = PROVINCES.find((p) => p.id === selectedProvinceId);
        if (!found) return null;
        return {
          ...found,
          image: customProvinceImages[found.id] || found.image
        };
      })()
    : null;

  const filteredProvinces = selectedRegion
    ? PROVINCES.filter((p) => p.region === selectedRegion)
    : PROVINCES;

  const currentSites = selectedProvinceId
    ? HERITAGE_SITES.filter((s) => s.provinceId === selectedProvinceId)
    : [];

  const handleStartQuiz = () => {
    if (selectedSite?.experienceUrl) {
      window.open(selectedSite.experienceUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
    setIsQuizOpen(true);
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionIndex(idx);
    setIsAnswerSubmitted(true);

    if (idx === QUIZ_QUESTIONS[currentQuestionIndex].correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOptionIndex(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
      // Award XP
      const earnedXp = (score + (selectedOptionIndex === QUIZ_QUESTIONS[currentQuestionIndex].correctIndex ? 1 : 0)) * 100;
      onAwardXp(earnedXp);
    }
  };

  return (
    <div className="w-full flex-grow bg-[#FDFBF7]">
      {/* Hero Section */}
      <section className="relative w-full min-h-[460px] flex items-center justify-start border-b border-[#C5B358] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCPTB9JML2s3NkD9wJWcJqjBQYcKCVrxYshL35qYI4ufD6LcsjeF7R4MhFCAtkXhPB4tNhEv9Re9NnIaducL59LSwqW67UF4-lkjQSUiJnTBsquqP-We9Wf-KyT8bz-8HwF7gqiyQru613prwDrufB1sySkvffPqZ1cEuYqRd1dqakt0Rq42AhGl45fpyZ0id4smunOTmebcMHExEYIbr31A5YJq7BNOySTQqEOWprHcdRVCYAwEbP_CMU1o64EZuVK6e4')"
          }}
        ></div>
        <div className="absolute inset-0 bg-black/65"></div>
        <div className="relative z-20 w-full max-w-[1240px] mx-auto px-6 py-16 text-white">
          <span className="text-xs bg-[#C5B358] text-[#3D0505] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full inline-block mb-3">
            TRẢI NGHIỆM TƯƠNG TÁC
          </span>
          <h1 
        className="hero-title text-[#D4AF37]"
        style={{ color: "#C5B358" }}
        >
            Trò Chơi Di Sản
          </h1>
          <p className="hero-tagline text-[#F4EBD0]">
            Hóa thân – Trải nghiệm – Sống cùng lịch sử
          </p>
          <p className="text-xs sm:text-sm text-gray-200 max-w-lg leading-relaxed mb-6">
            Khám phá các địa danh lịch sử trên khắp Việt Nam qua những thử thách tương tác và cốt truyện nhập vai đầy cảm xúc.
          </p>
        </div>
      </section>

      {/* Container for the 4 Steps */}
      <div className="max-w-[1240px] mx-auto px-6 py-16 space-y-16">
        {/* STEP 1: CHỌN VÙNG MIỀN */}
        <section id="section-step-1" className="space-y-6 scroll-mt-24">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#570000] text-[#D4AF37] flex items-center justify-center font-bold text-base border-2 border-[#C5B358] shadow">
              1
            </div>
            <div>
              <h2
                className="font-sans text-2xl md:text-3xl font-black text-[#570000] uppercase"
                style={{ fontVariantNumeric: 'lining-nums' }}
              >
                BƯỚC <span className="num-fix">1</span>: CHỌN VÙNG MIỀN
              </h2>
              <p className="text-xs text-[#5A413D]">
                Chọn miền bằng cách click trực tiếp lên bản đồ hoặc các nút điều hướng bên phải
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start">
            {/* Minimalist Vector Map Card display */}
            <div className="lg:col-span-4 flex items-center justify-center">
              <InteractiveVietnamMap
                selectedRegion={selectedRegion}
                onSelectRegion={handleSelectRegion}
              />
            </div>

            {/* Region buttons */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <button
                type="button"
                id="btn-region-north"
                onClick={() => handleSelectRegion('north')}
                className={`p-4 rounded-xl text-left border-2 transition-all flex items-center justify-between cursor-pointer ${
                  selectedRegion === 'north'
                    ? 'bg-[#F0F8EC] border-[#5EA33C] shadow-md ring-2 ring-[#5EA33C]/30 scale-[1.02]'
                    : 'bg-white border-stone-200 hover:bg-[#F0F8EC]/60 hover:border-[#5EA33C]/50'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shadow-xs transition-colors ${
                      selectedRegion === 'north'
                        ? 'bg-[#5EA33C] text-white'
                        : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    ★
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4
                        className={`font-sans font-bold text-sm uppercase transition-colors ${
                          selectedRegion === 'north' ? 'text-[#3E7522]' : 'text-stone-800'
                        }`}
                      >
                        Miền Bắc
                      </h4>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#5EA33C]/15 text-[#3E7522] font-semibold">
                        Xanh lá
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500">Từ Hà Tĩnh trở ra • 15 tỉnh thành</p>
                  </div>
                </div>
                <span
                  className={`material-symbols-outlined transition-colors ${
                    selectedRegion === 'north' ? 'text-[#5EA33C] font-bold' : 'text-stone-400'
                  }`}
                >
                  {selectedRegion === 'north' ? 'check_circle' : 'chevron_right'}
                </span>
              </button>

              <button
                type="button"
                id="btn-region-central"
                onClick={() => handleSelectRegion('central')}
                className={`p-4 rounded-xl text-left border-2 transition-all flex items-center justify-between cursor-pointer ${
                  selectedRegion === 'central'
                    ? 'bg-[#FEF9E7] border-[#F2B822] shadow-md ring-2 ring-[#F2B822]/35 scale-[1.02]'
                    : 'bg-white border-stone-200 hover:bg-[#FEF9E7]/60 hover:border-[#F2B822]/50'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shadow-xs transition-colors ${
                      selectedRegion === 'central'
                        ? 'bg-[#F2B822] text-[#570000]'
                        : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    ★
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4
                        className={`font-sans font-bold text-sm uppercase transition-colors ${
                          selectedRegion === 'central' ? 'text-[#9E6D04]' : 'text-stone-800'
                        }`}
                      >
                        Miền Trung
                      </h4>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#F2B822]/20 text-[#8C6304] font-semibold">
                        Vàng
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500">Khu vực Trung Bộ • 11 tỉnh thành</p>
                  </div>
                </div>
                <span
                  className={`material-symbols-outlined transition-colors ${
                    selectedRegion === 'central' ? 'text-[#C9910E] font-bold' : 'text-stone-400'
                  }`}
                >
                  {selectedRegion === 'central' ? 'check_circle' : 'chevron_right'}
                </span>
              </button>

              <button
                type="button"
                id="btn-region-south"
                onClick={() => handleSelectRegion('south')}
                className={`p-4 rounded-xl text-left border-2 transition-all flex items-center justify-between cursor-pointer ${
                  selectedRegion === 'south'
                    ? 'bg-[#EDF5FD] border-[#3A87D0] shadow-md ring-2 ring-[#3A87D0]/30 scale-[1.02]'
                    : 'bg-white border-stone-200 hover:bg-[#EDF5FD]/60 hover:border-[#3A87D0]/50'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shadow-xs transition-colors ${
                      selectedRegion === 'south'
                        ? 'bg-[#3A87D0] text-white'
                        : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    ★
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4
                        className={`font-sans font-bold text-sm uppercase transition-colors ${
                          selectedRegion === 'south' ? 'text-[#2069AA]' : 'text-stone-800'
                        }`}
                      >
                        Miền Nam
                      </h4>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#3A87D0]/15 text-[#2069AA] font-semibold">
                        Xanh dương
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500">Khu vực Nam Bộ • 8 tỉnh thành</p>
                  </div>
                </div>
                <span
                  className={`material-symbols-outlined transition-colors ${
                    selectedRegion === 'south' ? 'text-[#3A87D0] font-bold' : 'text-stone-400'
                  }`}
                >
                  {selectedRegion === 'south' ? 'check_circle' : 'chevron_right'}
                </span>
              </button>
            </div>

            {/* Guide Step Tracker: Unlock Progress Widget */}
            <div className="lg:col-span-4 w-full">
              <UnlockProgressWidget
                selectedRegion={selectedRegion}
                selectedProvince={currentProvince}
                selectedSite={selectedSite}
                quizFinished={quizFinished}
                onNavigateStep={handleNavigateStep}
                onStartExperience={handleStartQuiz}
                onResetProgress={handleResetProgress}
              />
            </div>
          </div>
        </section>

        {/* STEP 2: CHỌN TỈNH THÀNH */}
        <section id="section-step-2" className="space-y-6 scroll-mt-24">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#570000] text-[#D4AF37] flex items-center justify-center font-bold text-base border-2 border-[#C5B358] shadow">
              2
            </div>
            <div>
              <h2
                className="font-sans text-2xl md:text-3xl font-black text-[#570000] uppercase"
                style={{ fontVariantNumeric: 'lining-nums' }}
              >
                BƯỚC <span className="num-fix">2</span>: CHỌN TỈNH THÀNH
              </h2>
              <p className="text-xs text-[#5A413D]">
                {selectedRegion
                  ? `Lựa chọn tỉnh thành thuộc ${
                      selectedRegion === 'central'
                        ? 'Miền Trung'
                        : selectedRegion === 'north'
                        ? 'Miền Bắc'
                        : 'Miền Nam'
                    }`
                  : 'Vui lòng chọn vùng miền ở Bước 1 trước khi chọn tỉnh thành'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Province List */}
            <div className="lg:col-span-4 bg-white rounded-2xl border-2 border-[#C5B358] overflow-hidden shadow-sm flex flex-col">
              <div className="bg-[#570000] text-[#D4AF37] px-4 py-3 font-sans font-bold text-sm uppercase flex justify-between items-center">
                <span className="tracking-wide">
                  {selectedRegion === 'north'
                    ? `Miền Bắc - ${filteredProvinces.length} Tỉnh Thành`
                    : selectedRegion === 'central'
                    ? 'Miền Trung - 11 Tỉnh Thành'
                    : selectedRegion === 'south'
                    ? 'Miền Nam – 8 Tỉnh Thành'
                    : `Toàn quốc - ${filteredProvinces.length} Tỉnh Thành`}
                </span>
                <span className="text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37]">
                  {filteredProvinces.length} Địa phương
                </span>
              </div>
              <div className="p-2.5 space-y-1.5 overflow-y-auto h-[400px] custom-scrollbar">
                {filteredProvinces.map((prov) => {
                  const isSelected = prov.id === selectedProvinceId;
                  return (
                    <button
                      key={prov.id}
                      type="button"
                      onClick={() => handleSelectProvince(prov.id)}
                      className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between text-xs font-semibold cursor-pointer ${
                        isSelected
                          ? 'bg-[#D4AF37] text-[#570000] shadow-sm font-black ring-1 ring-[#B89628]/50'
                          : 'text-[#261816] hover:bg-[#FFE9E6] hover:text-[#570000]'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate pr-2">
                        <span className="text-stone-400 shrink-0">📍</span>
                        <span className="truncate font-sans font-bold text-[13px]">{prov.name}</span>
                      </div>
                      <span className="text-[10px] shrink-0 opacity-85 px-2.5 py-0.5 rounded-full bg-black/5 font-sans font-medium">
                        {prov.relicsCount !== undefined ? prov.relicsCount : prov.sitesCount} Di tích
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Province Preview Card */}
            {currentProvince ? (
              <div className="lg:col-span-8 bg-[#FFF8F6] rounded-2xl border-2 border-[#C5B358] overflow-hidden shadow-md flex flex-col md:flex-row">
                <div className="md:w-1/2 h-64 md:h-auto min-h-[300px] relative overflow-hidden bg-stone-900 group">
                  <img
                    src={currentProvince.image}
                    alt={currentProvince.name}
                    className="w-full h-full object-cover object-center block transition-all duration-300"
                    style={{ objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%' }}
                    referrerPolicy="no-referrer"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none"></div>

                  {/* Upload Cover Button for Province in Step 2 */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 z-20">
                    <label
                      htmlFor={`upload-province-${currentProvince.id}`}
                      onClick={(e) => e.stopPropagation()}
                      title="Tải ảnh bìa tỉnh thành từ máy tính"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans font-bold bg-[#570000]/90 hover:bg-[#570000] text-[#D4AF37] hover:text-[#FFF8F6] border border-[#D4AF37]/80 shadow-md backdrop-blur-xs cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 select-none"
                    >
                      <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{customProvinceImages[currentProvince.id] ? 'Đổi ảnh bìa' : 'Tải ảnh bìa'}</span>
                      <input
                        id={`upload-province-${currentProvince.id}`}
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={(e) => handleUploadProvinceImage(currentProvince.id, e)}
                      />
                    </label>

                    {customProvinceImages[currentProvince.id] && (
                      <button
                        type="button"
                        title="Khôi phục ảnh mặc định của tỉnh"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleResetProvinceImage(currentProvince.id);
                        }}
                        className="p-1.5 rounded-full bg-black/70 hover:bg-black/90 text-stone-300 hover:text-white border border-white/30 backdrop-blur-xs transition-all duration-200 cursor-pointer shadow-md"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white z-10 pointer-events-none">
                    <span className="text-[10px] bg-[#570000] text-[#D4AF37] px-2.5 py-0.5 rounded-full font-sans font-bold tracking-wide border border-[#D4AF37]/50 shadow-xs inline-block">
                      {selectedRegion === 'north'
                        ? 'Miền Bắc'
                        : selectedRegion === 'central'
                        ? 'Miền Trung'
                        : 'Miền Nam'}{' '}
                      - {currentProvince.name}
                    </span>
                    <h3 className="font-sans text-2xl md:text-3xl font-black mt-1.5 text-white drop-shadow-sm">
                      {currentProvince.name}
                    </h3>
                    <div className="w-12 h-0.5 bg-[#D4AF37] mt-1.5 rounded-full"></div>
                  </div>
                </div>

                <div className="md:w-1/2 p-6 flex flex-col justify-between">
                  <div>
                    <p className="font-serif italic text-xs md:text-sm text-[#570000] mb-6 leading-relaxed">
                      "{currentProvince.desc}"
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-center py-5 border-y border-[#C5B358]/40 mb-4">
                      <div className="flex flex-col items-center justify-center">
                        <span className="text-3xl md:text-4xl font-black text-[#570000]">
                          {currentProvince.relicsCount !== undefined
                            ? currentProvince.relicsCount
                            : currentProvince.id === 'tp-hcm'
                            ? '24'
                            : currentProvince.sitesCount}
                        </span>
                        <p className="text-xs md:text-sm text-stone-600 uppercase font-bold tracking-wider mt-1">
                          Di tích
                        </p>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <span
                          className={`text-3xl md:text-4xl font-black ${
                            (currentProvince.explorationRate ?? 100) > 0 ? 'text-[#007A33]' : 'text-stone-500'
                          }`}
                        >
                          {currentProvince.explorationRate !== undefined
                            ? `${currentProvince.explorationRate}%`
                            : '100%'}
                        </span>
                        <p className="text-xs md:text-sm text-stone-600 uppercase font-bold tracking-wider mt-1">
                          Khám phá
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-stone-500">
                    Cuộn xuống Bước 3 để chọn cột mốc lịch sử cụ thể tại {currentProvince.name}.
                  </p>
                </div>
              </div>
            ) : (
              <div className="lg:col-span-8 bg-[#FFF8F6] rounded-2xl border-2 border-[#C5B358] p-8 flex flex-col items-center justify-center text-center space-y-4 min-h-[350px]">
                <div className="w-16 h-16 rounded-full bg-[#FEF9E7] border-2 border-[#C89B3C] flex items-center justify-center text-[#7A1C1C]">
                  <span className="material-symbols-outlined text-3xl">location_city</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#570000]">CHƯA CHỌN TỈNH THÀNH</h3>
                <p className="text-xs text-stone-600 max-w-md leading-relaxed">
                  Vui lòng bấm chọn một tỉnh thành từ danh sách bên trái để mở khóa thông tin chi tiết và danh sách di tích lịch sử.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* STEP 3: CHỌN CỘT MỐC */}
        <section id="section-step-3" className="space-y-6 scroll-mt-24">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#570000] text-[#D4AF37] flex items-center justify-center font-bold text-base border-2 border-[#C5B358] shadow">
              3
            </div>
            <div>
              <h2
                className="font-sans text-2xl md:text-3xl font-black text-[#570000] uppercase"
                style={{ fontVariantNumeric: 'lining-nums' }}
              >
                BƯỚC <span className="num-fix">3</span>: CHỌN CỘT MỐC
              </h2>
              <p className="text-xs text-[#5A413D]">
                {currentProvince
                  ? `Chọn một cột mốc tại ${currentProvince.name} để tham gia trải nghiệm lịch sử.`
                  : 'Vui lòng hoàn thành Bước 2 (chọn tỉnh thành) để hiển thị danh sách cột mốc.'}
              </p>
            </div>
          </div>

          {!currentProvince ? (
            <div className="bg-white rounded-2xl border-2 border-dashed border-[#C5B358]/60 p-8 text-center space-y-3">
              <span className="material-symbols-outlined text-3xl text-[#94A3B8]">lock</span>
              <h4 className="font-sans font-bold text-sm text-stone-500 uppercase">
                Bước 3 chưa mở khóa
              </h4>
              <p className="text-xs text-[#94A3B8] max-w-md mx-auto">
                Hãy hoàn thành Bước 2 (chọn tỉnh thành) ở trên để mở khóa các di tích và cột mốc lịch sử.
              </p>
              <button
                type="button"
                onClick={() => handleNavigateStep(2)}
                className="text-xs font-bold text-[#7A1C1C] hover:underline inline-flex items-center gap-1 cursor-pointer pt-2"
              >
                <span>Đi đến Bước 2: Chọn tỉnh thành</span>
                <span className="material-symbols-outlined text-sm">arrow_upward</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {(currentSites.length > 0 ? currentSites : HERITAGE_SITES).map((site) => {
                const isSelected = selectedSite && site.id === selectedSite.id;
                const activeImage = customSiteImages[site.id] || site.image;
                const isCustom = Boolean(customSiteImages[site.id]);
                const activeDesc = customSiteDescriptions[site.id] || site.desc;
                const isCustomDesc = Boolean(customSiteDescriptions[site.id]);
                const isEditing = editingSiteId === site.id;

                return (
                  <div
                    key={site.id}
                    id={`site-card-${site.id}`}
                    onClick={() => handleSelectSite(site)}
                    className={`group rounded-2xl border-2 transition-all duration-200 overflow-hidden flex flex-col justify-between cursor-pointer shadow-xs hover:shadow-md ${
                      isSelected
                        ? 'bg-[#FFF5F2] border-[#570000] ring-2 ring-[#570000]/20 shadow-md scale-[1.01]'
                        : 'bg-white border-[#C5B358]/50 hover:border-[#570000]/60 hover:bg-[#FFFDFB]'
                    }`}
                  >
                    <div className="h-44 w-full relative overflow-hidden bg-stone-900">
                      <img
                        src={activeImage}
                        alt={site.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        style={{ objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%' }}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/30 pointer-events-none"></div>

                      {/* Upload Button overlay on top left */}
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-20">
                        <label
                          htmlFor={`upload-site-img-${site.id}`}
                          onClick={(e) => e.stopPropagation()}
                          title="Tải ảnh bìa mới từ máy tính"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-sans font-bold bg-[#570000]/90 hover:bg-[#570000] text-[#D4AF37] hover:text-[#FFF8F6] border border-[#D4AF37]/80 shadow-md backdrop-blur-xs cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 select-none"
                        >
                          <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span className="text-[10px] tracking-wide">
                            {isCustom ? 'Đổi ảnh' : 'Tải ảnh'}
                          </span>
                          <input
                            id={`upload-site-img-${site.id}`}
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={(e) => handleUploadSiteImage(site.id, e)}
                          />
                        </label>

                        {isCustom && (
                          <button
                            type="button"
                            title="Khôi phục ảnh mặc định"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleResetSiteImage(site.id);
                            }}
                            className="p-1.5 rounded-full bg-black/70 hover:bg-black/90 text-stone-300 hover:text-white border border-white/30 backdrop-blur-xs transition-all duration-200 cursor-pointer shadow-md"
                          >
                            <RotateCcw className="w-3 h-3" />
                          </button>
                        )}
                      </div>

                      {/* XP Reward Badge on top right */}
                      <div className="absolute top-2.5 right-2.5 bg-black/65 backdrop-blur-xs text-[#D4AF37] px-2.5 py-0.5 rounded-full text-[11px] font-sans font-bold border border-[#D4AF37]/50 shadow-xs">
                        +{site.xpReward} XP
                      </div>

                      {/* Subtitle at bottom */}
                      <div className="absolute bottom-2.5 left-3 right-3 text-white pointer-events-none">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#D4AF37] drop-shadow-xs">
                          {site.subtitle}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 flex flex-col flex-1 justify-between">
                      <div className="mb-4">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="font-sans font-black text-base md:text-lg text-[#570000] leading-snug">
                            {site.name}
                          </h4>
                          <div className="flex items-center gap-1.5 shrink-0 flex-wrap justify-end">
                            {site.experienceUrl && (
                              <span className="text-[9px] font-bold bg-[#EFF6FF] text-[#1E40AF] border border-[#BFDBFE] px-2 py-0.5 rounded-full whitespace-nowrap flex items-center gap-0.5">
                                <span>🌐 Web 3D</span>
                              </span>
                            )}
                            {isCustom && (
                              <span className="text-[9px] font-bold bg-[#FEF9E7] text-[#7A1C1C] border border-[#C89B3C] px-2 py-0.5 rounded-full whitespace-nowrap">
                                Ảnh tự tải
                              </span>
                            )}
                            {isCustomDesc && !isEditing && (
                              <span className="text-[9px] font-bold bg-[#F0FDF4] text-[#166534] border border-[#86EFAC] px-2 py-0.5 rounded-full whitespace-nowrap">
                                Đã sửa mô tả
                              </span>
                            )}
                            {!isEditing && (
                              <button
                                type="button"
                                title="Sửa đoạn giới thiệu"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStartEditDescription(site.id, activeDesc);
                                }}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-sans font-semibold bg-[#FFF9F0] hover:bg-[#FFE9D0] text-[#7A1C1C] border border-[#C5B358] shadow-2xs hover:shadow-xs transition-all duration-150 cursor-pointer select-none hover:scale-105 active:scale-95"
                              >
                                <Pencil className="w-3 h-3 text-[#7A1C1C]" />
                                <span>Sửa mô tả</span>
                              </button>
                            )}
                          </div>
                        </div>

                        {isEditing ? (
                          <div
                            className="mt-1 space-y-2 bg-[#FFFDF5] p-2.5 rounded-xl border border-[#C5B358]/80 shadow-xs"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <textarea
                              value={editDescDraft}
                              onChange={(e) => setEditDescDraft(e.target.value)}
                              placeholder="Nhập đoạn giới thiệu cho cột mốc này..."
                              rows={3}
                              className="w-full text-xs text-[#261816] bg-white border border-[#C5B358]/60 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#570000]/40 resize-y leading-relaxed font-sans shadow-inner"
                              autoFocus
                            />
                            <div className="flex items-center justify-between gap-2 pt-0.5">
                              <div className="flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSaveSiteDescription(site.id);
                                  }}
                                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-[#570000] hover:bg-[#400000] text-[#D4AF37] border border-[#D4AF37]/80 shadow-xs cursor-pointer transition-transform active:scale-95"
                                >
                                  <Check className="w-3 h-3 text-[#D4AF37]" />
                                  <span>Lưu</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCancelEditDescription();
                                  }}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-stone-100 hover:bg-stone-200 text-stone-600 border border-stone-300 shadow-xs cursor-pointer transition-transform active:scale-95"
                                >
                                  <X className="w-3 h-3" />
                                  <span>Hủy</span>
                                </button>
                              </div>

                              {isCustomDesc && (
                                <button
                                  type="button"
                                  title="Khôi phục mô tả gốc"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleResetSiteDescription(site.id);
                                  }}
                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] text-stone-500 hover:text-[#570000] hover:bg-stone-100 border border-stone-200 cursor-pointer"
                                >
                                  <RotateCcw className="w-2.5 h-2.5" />
                                  <span>Mặc định</span>
                                </button>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                              {activeDesc}
                            </p>
                            {isCustomDesc && (
                              <div className="flex justify-end">
                                <button
                                  type="button"
                                  title="Khôi phục mô tả gốc"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleResetSiteDescription(site.id);
                                  }}
                                  className="inline-flex items-center gap-1 text-[10px] text-stone-400 hover:text-[#570000] hover:underline cursor-pointer pt-0.5"
                                >
                                  <RotateCcw className="w-2.5 h-2.5" />
                                  <span>Khôi phục mô tả gốc</span>
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        id={`btn-select-site-${site.id}`}
                        className={`w-full py-2.5 px-4 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs ${
                          isSelected
                            ? 'bg-[#570000] text-white font-black ring-2 ring-[#D4AF37]'
                            : 'bg-[#D4AF37] text-[#3D0505] hover:bg-[#C59B27] active:scale-[0.98]'
                        }`}
                      >
                        {isSelected ? '✓ Đã chọn cột mốc' : 'Chọn cột mốc'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* STEP 4: THAM GIA TRẢI NGHIỆM */}
        <section id="section-step-4" className="space-y-6 scroll-mt-24">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#570000] text-[#D4AF37] flex items-center justify-center font-bold text-base border-2 border-[#C5B358] shadow">
              4
            </div>
            <div>
              <h2
                className="font-sans text-2xl md:text-3xl font-black text-[#570000] uppercase"
                style={{ fontVariantNumeric: 'lining-nums' }}
              >
                BƯỚC <span className="num-fix">4</span>: THAM GIA TRẢI NGHIỆM {selectedSite ? `– ${selectedSite.name.toUpperCase()}` : ''}
              </h2>
              <p className="text-xs text-[#5A413D]">
                Nhập vai người trong cuộc, đưa ra quyết định để mở khóa ký ức lịch sử
              </p>
            </div>
          </div>

          {/* Quick Tab / Selection Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FAF5EB] p-2.5 rounded-2xl border border-[#C5B358]/60">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-[#570000] px-1">
                Cột mốc:
              </span>
              <button
                type="button"
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedSite?.id !== 'doi-a1-dien-bien'
                    ? 'bg-[#570000] text-white shadow-xs'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200 cursor-pointer'
                }`}
              >
                {selectedSite ? selectedSite.name : 'Chưa chọn'}
              </button>

              <button
                type="button"
                id="btn-tab-doi-a1-quiz"
                onClick={handleQuickSelectDoiA1}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  selectedSite?.id === 'doi-a1-dien-bien'
                    ? 'bg-[#570000] text-[#D4AF37] border border-[#C5B358] shadow-xs'
                    : 'bg-[#FFE9E6] text-[#570000] hover:bg-[#FFD9D4] border border-[#570000]/30'
                }`}
              >
                <span className="material-symbols-outlined text-sm text-[#D4AF37]">military_tech</span>
                <span>Thử Thách Đồi A1 (10 câu trắc nghiệm)</span>
                <span className="text-[10px] bg-[#D4AF37] text-[#3D0505] px-1.5 py-0.5 rounded-full font-black">
                  HOT
                </span>
              </button>
            </div>

            {selectedSite?.id !== 'doi-a1-dien-bien' && (
              <button
                type="button"
                onClick={handleQuickSelectDoiA1}
                className="text-xs font-bold text-[#570000] hover:underline flex items-center gap-1 cursor-pointer pr-2"
              >
                <span>Chuyển sang Đồi A1 làm trắc nghiệm ngay</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            )}
          </div>

          {!selectedSite ? (
            <div className="bg-white rounded-2xl border-2 border-dashed border-[#C5B358]/60 p-8 text-center space-y-3">
              <span className="material-symbols-outlined text-3xl text-[#94A3B8]">lock</span>
              <h4 className="font-serif font-bold text-sm text-stone-500 uppercase">
                Bước 4 chưa mở khóa
              </h4>
              <p className="text-xs text-[#94A3B8] max-w-md mx-auto">
                Hãy hoàn thành Bước 3 (chọn cột mốc di tích) để mở khóa trải nghiệm nhập vai.
              </p>
              <button
                type="button"
                onClick={() => handleNavigateStep(3)}
                className="text-xs font-bold text-[#7A1C1C] hover:underline inline-flex items-center gap-1 cursor-pointer pt-2"
              >
                <span>Đi đến Bước 3: Chọn cột mốc</span>
                <span className="material-symbols-outlined text-sm">arrow_upward</span>
              </button>
            </div>
          ) : (
            <div className="bg-[#FFF8F6] rounded-3xl border-2 border-[#C5B358] overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12">
              {/* Game Card Hero */}
              <div className="lg:col-span-7 relative min-h-[420px] p-8 md:p-12 flex flex-col justify-end text-white">
                <img
                  src={selectedSite.image}
                  alt={selectedSite.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30"></div>
                <div className="relative z-10 space-y-4">
                  <span className="text-[10px] bg-[#570000] text-[#D4AF37] font-bold uppercase px-3 py-1 rounded">
                    {selectedSite.subtitle}
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#F4EBD0]">
                    {selectedSite.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-200 leading-relaxed max-w-xl">
                    {selectedSite.desc}
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-xs text-[#D4AF37]">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-base">vrpano</span>
                      <span>Nhập vai chân thực</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-base">alt_route</span>
                      <span>Lựa chọn quyết định</span>
                    </div>
                  </div>
                  <div className="pt-4 flex flex-wrap gap-3 sm:gap-4">
                    {selectedSite.experienceUrl ? (
                      <a
                        href={selectedSite.experienceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#D4AF37] hover:bg-white text-[#3D0505] px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
                      >
                        <span>THAM GIA TRẢI NGHIỆM</span>
                        <span className="material-symbols-outlined text-base">play_arrow</span>
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={handleStartQuiz}
                        className="bg-[#D4AF37] hover:bg-white text-[#3D0505] px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
                      >
                        <span>THAM GIA TRẢI NGHIỆM</span>
                        <span className="material-symbols-outlined text-base">play_arrow</span>
                      </button>
                    )}

                    {/* Quick anchor to Đồi A1 Quiz */}
                    {selectedSite.id === 'doi-a1-dien-bien' && (
                      <a
                        href="#doi-a1-quiz-section"
                        className="bg-[#570000] hover:bg-[#800000] text-[#D4AF37] border-2 border-[#C5B358] px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
                      >
                        <span className="material-symbols-outlined text-base text-[#D4AF37]">quiz</span>
                        <span>THỬ THÁCH TRẮC NGHIỆM (10 CÂU)</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Achievements & Leaderboard */}
              <div className="lg:col-span-5 p-6 md:p-8 bg-[#FAF5EB] flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#C5B358]/50 space-y-6">
                {/* Personal stats */}
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#570000] uppercase mb-3 pb-1 border-b border-[#C5B358]/40">
                    Thành tích của bạn
                  </h4>
                  <div className="grid grid-cols-3 gap-2 bg-white p-4 rounded-xl border border-[#C5B358]/40 text-center mb-3">
                    <div>
                      <span className="font-bold text-base text-[#570000]">
                        {user?.completedGames || 5}
                      </span>
                      <p className="text-[9px] text-stone-500 uppercase font-bold">Đã hoàn thành</p>
                    </div>
                    <div>
                      <span className="font-bold text-base text-[#570000]">
                        {user?.discoveredStories || 18}
                      </span>
                      <p className="text-[9px] text-stone-500 uppercase font-bold">Câu chuyện</p>
                    </div>
                    <div>
                      <span className="font-bold text-base text-[#007A33]">
                        {user?.achievementsCount || 12}
                      </span>
                      <p className="text-[9px] text-stone-500 uppercase font-bold">Danh hiệu</p>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-[#C5B358]/40">
                    <div className="flex justify-between text-xs font-bold mb-1.5">
                      <span className="text-[#570000]">
                        Level {user?.level || 5} - {user?.title || 'Người Giữ Sử'}
                      </span>
                      <span className="text-stone-500">
                        {user?.xp || 2450} / {user?.nextXp || 3000} XP
                      </span>
                    </div>
                    <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#D4AF37] h-full transition-all"
                        style={{
                          width: `${Math.min(100, ((user?.xp || 2450) / (user?.nextXp || 3000)) * 100)}%`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Leaderboard */}
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#570000] uppercase mb-3 pb-1 border-b border-[#C5B358]/40">
                    Bảng vàng vinh danh
                  </h4>
                  <div className="space-y-2">
                    {LEADERBOARD.map((item) => (
                      <div
                        key={item.rank}
                        className="flex items-center gap-3 p-2.5 bg-white rounded-xl border border-[#C5B358]/30 shadow-sm"
                      >
                        <span className="w-5 font-bold text-center text-xs text-[#D4AF37]">
                          #{item.rank}
                        </span>
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className="w-7 h-7 rounded-full object-cover border border-[#C5B358]"
                        />
                        <span className="font-medium text-xs text-[#261816] flex-grow">
                          {item.name}
                        </span>
                        <span className="text-xs font-bold text-[#570000]">
                          {item.xp.toLocaleString()} XP
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB / KHUNG THỬ THÁCH TRẮC NGHIỆM LỊCH SỬ CHO CỘT MỐC ĐỒI A1 */}
          {selectedSite?.id === 'doi-a1-dien-bien' && (
            <DoiA1QuizSection
              onAwardRewards={onAwardQuizRewards}
              onAwardXp={onAwardXp}
            />
          )}
        </section>
      </div>

      {/* QUIZ INTERACTIVE MODAL */}
      {isQuizOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-[#FDFBF7] rounded-2xl border-2 border-[#C5B358] w-full max-w-2xl shadow-2xl p-6 md:p-8 relative">
            <button
              type="button"
              onClick={() => setIsQuizOpen(false)}
              className="absolute top-4 right-4 text-stone-500 hover:text-[#570000] cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            {!quizFinished ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#C5B358]/40">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#570000]">
                      Trải nghiệm {selectedSite?.name || 'Di sản lịch sử'}
                    </h3>
                    <p className="text-xs text-stone-500">
                      Câu hỏi {currentQuestionIndex + 1} / {QUIZ_QUESTIONS.length}
                    </p>
                  </div>
                  <span className="text-xs bg-[#D4AF37] text-[#3D0505] font-bold px-3 py-1 rounded-full">
                    +{selectedSite?.xpReward || 500} XP
                  </span>
                </div>

                <h4 className="font-serif text-base sm:text-lg font-bold text-[#261816] leading-relaxed">
                  {QUIZ_QUESTIONS[currentQuestionIndex].question}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {QUIZ_QUESTIONS[currentQuestionIndex].options.map((opt, idx) => {
                    const isCorrect = idx === QUIZ_QUESTIONS[currentQuestionIndex].correctIndex;
                    const isChosen = idx === selectedOptionIndex;

                    let btnStyle = 'bg-white border-[#C5B358]/50 hover:border-[#D4AF37]';
                    if (isAnswerSubmitted) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold';
                      } else if (isChosen && !isCorrect) {
                        btnStyle = 'bg-rose-100 border-rose-500 text-rose-900 line-through';
                      }
                    }

                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectOption(idx)}
                        disabled={isAnswerSubmitted}
                        className={`p-4 rounded-xl border-2 text-left text-xs transition-all flex items-center gap-3 cursor-pointer ${btnStyle}`}
                      >
                        <span className="w-6 h-6 rounded-full bg-[#FFE9E6] text-[#570000] flex items-center justify-center font-bold text-[10px] shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {isAnswerSubmitted && (
                  <div className="p-4 bg-[#FFF8F6] border border-[#C5B358] rounded-xl text-xs space-y-1 animate-fadeIn">
                    <p className="font-bold text-[#570000]">Giải thích lịch sử:</p>
                    <p className="text-[#5A413D] leading-relaxed">
                      {QUIZ_QUESTIONS[currentQuestionIndex].explanation}
                    </p>
                  </div>
                )}

                {isAnswerSubmitted && (
                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={handleNextQuestion}
                      className="bg-[#570000] hover:bg-[#800000] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer"
                    >
                      <span>
                        {currentQuestionIndex + 1 < QUIZ_QUESTIONS.length
                          ? 'Câu tiếp theo'
                          : 'Xem kết quả'}
                      </span>
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Completion Screen */
              <div className="text-center py-6 space-y-6 animate-fadeIn">
                <div className="w-20 h-20 mx-auto rounded-full bg-[#D4AF37] text-[#570000] flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined text-4xl">emoji_events</span>
                </div>
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#570000] mb-1">
                    CHÚC MỪNG BẠN!
                  </h3>
                  <p className="text-xs text-stone-600">
                    Bạn đã hoàn thành xuất sắc trải nghiệm {selectedSite?.name || 'Di tích lịch sử'}
                  </p>
                </div>
                <div className="bg-[#FFE9E6] p-4 rounded-xl max-w-sm mx-auto border border-[#C5B358] space-y-1">
                  <p className="text-sm font-bold text-[#570000]">
                    Số câu đúng: {score} / {QUIZ_QUESTIONS.length}
                  </p>
                  <p className="text-xs text-[#D4AF37] font-bold">
                    + {score * 100} Điểm Kinh Nghiệm (XP)
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsQuizOpen(false)}
                  className="bg-[#570000] hover:bg-[#800000] text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer"
                >
                  Đóng & Nhận thưởng
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
