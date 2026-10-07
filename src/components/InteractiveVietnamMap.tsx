import { useState, useRef, useEffect, MouseEvent } from 'react';
import mapImg from '../assets/images/BanDo.jpg';

export interface InteractiveVietnamMapProps {
  selectedRegion: 'north' | 'central' | 'south' | null;
  onSelectRegion: (region: 'north' | 'central' | 'south') => void;
}

export default function InteractiveVietnamMap({
  selectedRegion,
  onSelectRegion,
}: InteractiveVietnamMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<'north' | 'central' | 'south' | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [isCanvasReady, setIsCanvasReady] = useState(false);

  // Khởi tạo Canvas ẩn để đọc dữ liệu điểm ảnh (Pixel Data)
  useEffect(() => {
    const image = new Image();
    image.src = mapImg;
    image.crossOrigin = 'Anonymous';
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (ctx) {
        ctx.drawImage(image, 0, 0);
        canvasRef.current = canvas;
        setIsCanvasReady(true);
      }
    };
  }, []);

  // Xử lý đọc màu pixel tại vị trí con trỏ chuột
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current || !imgRef.current || !isCanvasReady) return;

    const img = imgRef.current;
    const rect = img.getBoundingClientRect();

    // Tính tọa độ x, y thực tế trên ảnh gốc
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;

    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);

    if (x < 0 || y < 0 || x >= canvasRef.current.width || y >= canvasRef.current.height) {
      setHoveredRegion(null);
      return;
    }

    const ctx = canvasRef.current.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const [r, g, b, a] = ctx.getImageData(x, y, 1, 1).data;

    // Nếu là điểm ảnh trong suốt hoặc nền trắng/xám quá sáng -> bỏ qua
    if (a < 50 || (r > 230 && g > 230 && b > 230)) {
      setHoveredRegion(null);
      return;
    }

    // Nhận diện vùng miền theo tông màu gốc của ảnh
    // 1. Miền Bắc: Tông màu Xanh Lá (G lớn hơn R và B)
    if (g > r + 20 && g > b + 20) {
      setHoveredRegion('north');
    } 
    // 2. Miền Nam: Tông màu Xanh Dương (B lớn hơn R)
    else if (b > r + 20 && b > g - 20) {
      setHoveredRegion('south');
    } 
    // 3. Miền Trung: Tông màu Vàng/Cam (R và G đều cao, B thấp)
    else if (r > 180 && g > 130 && b < 120) {
      setHoveredRegion('central');
    } else {
      setHoveredRegion(null);
    }
  };

  const handleMouseLeave = () => {
    setHoveredRegion(null);
  };

  const handleClick = () => {
    if (hoveredRegion) {
      onSelectRegion(hoveredRegion);
    }
  };

  const activeRegion = hoveredRegion || selectedRegion;

  return (
    <div className="relative w-full max-w-[430px] mx-auto select-none">
      {/* Thanh hiển thị trạng thái phía trên */}
      <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-xl border border-[#C5B358] mb-3 shadow-xs">
        <div className="flex items-center gap-2.5">
          <span
            className={`w-3 h-3 rounded-full animate-pulse shadow-xs ${
              selectedRegion === 'north'
                ? 'bg-[#5EA33C]'
                : selectedRegion === 'central'
                ? 'bg-[#F2B822]'
                : selectedRegion === 'south'
                ? 'bg-[#3A87D0]'
                : 'bg-stone-300'
            }`}
          />
          <span className="text-xs font-serif font-bold text-[#570000] uppercase tracking-wide">
            {selectedRegion ? 'Đang chọn: ' : 'Vùng miền: '}
            <span
              className={`font-black ${
                selectedRegion === 'north'
                  ? 'text-[#478229]'
                  : selectedRegion === 'central'
                  ? 'text-[#C9910E]'
                  : selectedRegion === 'south'
                  ? 'text-[#246FB8]'
                  : 'text-stone-500'
              }`}
            >
              {selectedRegion === 'north'
                ? 'MIỀN BẮC'
                : selectedRegion === 'central'
                ? 'MIỀN TRUNG'
                : selectedRegion === 'south'
                ? 'MIỀN NAM'
                : 'Chưa chọn'}
            </span>
          </span>
        </div>

        {activeRegion && (
          <span className="text-[10px] font-bold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full border border-stone-300">
            👉 {activeRegion === 'north' ? 'Miền Bắc' : activeRegion === 'central' ? 'Miền Trung' : 'Miền Nam'}
          </span>
        )}
      </div>

      {/* Frame chính chứa bản đồ */}
      <div className="relative bg-white rounded-2xl border-2 border-[#C5B358] p-3 sm:p-4 shadow-md overflow-hidden flex flex-col items-center">
        <div className="w-full text-center pb-2 text-[11px] font-medium text-stone-500 flex items-center justify-center gap-1.5 border-b border-stone-100 mb-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C5B358]" />
          <span>Nhấp trực tiếp vào vùng bản đồ để chọn miền</span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C5B358]" />
        </div>

        {/* Khung tương tác chính */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          className="relative w-full cursor-pointer flex items-center justify-center p-2"
        >
          <img
            ref={imgRef}
            src={mapImg}
            alt="Bản đồ 3 miền Việt Nam"
            className="w-full h-auto max-h-[500px] object-contain transition-all duration-300 select-none"
            style={{
              filter:
                activeRegion === 'north'
                  ? 'drop-shadow(0 0 10px rgba(71, 130, 41, 0.85)) brightness(1.05)'
                  : activeRegion === 'central'
                  ? 'drop-shadow(0 0 10px rgba(201, 145, 14, 0.85)) brightness(1.05)'
                  : activeRegion === 'south'
                  ? 'drop-shadow(0 0 10px rgba(36, 111, 184, 0.85)) brightness(1.05)'
                  : 'none',
            }}
          />
        </div>

        {/* Bộ nút chuyển vùng nhanh phía dưới */}
        <div className="w-full grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-stone-200">
          <button
            type="button"
            onClick={() => onSelectRegion('north')}
            onMouseEnter={() => setHoveredRegion('north')}
            onMouseLeave={() => setHoveredRegion(null)}
            className={`py-2 px-1 rounded-lg text-center font-bold text-xs uppercase transition-all border cursor-pointer ${
              selectedRegion === 'north'
                ? 'bg-[#5EA33C] text-white border-[#3E7522] scale-105 shadow-md'
                : 'bg-white hover:bg-[#F0F8EC] text-[#3E7522] border-[#5EA33C]/40'
            }`}
          >
            • MIỀN BẮC
          </button>
          <button
            type="button"
            onClick={() => onSelectRegion('central')}
            onMouseEnter={() => setHoveredRegion('central')}
            onMouseLeave={() => setHoveredRegion(null)}
            className={`py-2 px-1 rounded-lg text-center font-bold text-xs uppercase transition-all border cursor-pointer ${
              selectedRegion === 'central'
                ? 'bg-[#F2B822] text-[#570000] border-[#B8860B] scale-105 shadow-md'
                : 'bg-white hover:bg-[#FEF9E7] text-[#9E6D04] border-[#F2B822]/40'
            }`}
          >
            • MIỀN TRUNG
          </button>
          <button
            type="button"
            onClick={() => onSelectRegion('south')}
            onMouseEnter={() => setHoveredRegion('south')}
            onMouseLeave={() => setHoveredRegion(null)}
            className={`py-2 px-1 rounded-lg text-center font-bold text-xs uppercase transition-all border cursor-pointer ${
              selectedRegion === 'south'
                ? 'bg-[#3A87D0] text-white border-[#1B5B96] scale-105 shadow-md'
                : 'bg-white hover:bg-[#EDF5FD] text-[#1B5B96] border-[#3A87D0]/40'
            }`}
          >
            • MIỀN NAM
          </button>
        </div>
      </div>
    </div>
  );
}