import { useState } from 'react';
import mapImg from '../assets/images/BanDo.jpg';

export interface InteractiveVietnamMapProps {
  selectedRegion: 'north' | 'central' | 'south' | null;
  onSelectRegion: (region: 'north' | 'central' | 'south') => void;
}

// Exact pixel contour coordinates tracing the 3 regions from BanDo.jpg (419 x 512)
const NORTH_POLYGON =
  '110,4 96,8 95,12 21,16 12,28 25,48 36,52 33,68 43,76 43,80 87,88 81,96 98,108 89,120 72,124 68,132 70,136 86,148 112,160 133,160 137,156 133,148 143,120 159,108 171,88 193,76 197,68 207,60 189,56 167,40 166,32 162,28 170,20 170,16 136,8 130,4';

const CENTRAL_POLYGON =
  '111,160 105,164 121,180 126,192 144,208 157,232 167,236 181,248 175,256 186,268 188,276 184,284 185,296 180,312 184,316 189,332 185,344 188,368 179,372 185,384 183,392 188,396 247,396 255,380 253,368 257,364 254,360 261,356 240,272 227,260 225,252 218,244 183,216 162,192 158,176 139,160';

const SOUTH_POLYGON =
  '175,374 156,382 156,386 139,390 139,398 145,406 112,414 113,418 109,422 82,430 83,434 111,438 114,442 106,454 106,486 103,490 122,490 129,486 159,462 160,458 171,454 179,438 178,434 201,426 242,398 238,394 192,390 194,386 189,374';

export default function InteractiveVietnamMap({
  selectedRegion,
  onSelectRegion,
}: InteractiveVietnamMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<'north' | 'central' | 'south' | null>(null);

  return (
    <div className="relative w-full max-w-[430px] mx-auto select-none">
      {/* Top Status Header */}
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
                ? 'MIỀN BẮC (Xanh lá)'
                : selectedRegion === 'central'
                ? 'MIỀN TRUNG (Vàng cam)'
                : selectedRegion === 'south'
                ? 'MIỀN NAM (Xanh dương)'
                : 'Chưa chọn (Nhấp vào bản đồ)'}
            </span>
          </span>
        </div>

        {/* Hover Hint Badge */}
        {hoveredRegion && hoveredRegion !== selectedRegion && (
          <span className="text-[10px] font-bold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full animate-fade-in border border-stone-300">
            👉 Nhấp {hoveredRegion === 'north' ? 'Miền Bắc' : hoveredRegion === 'central' ? 'Miền Trung' : 'Miền Nam'}
          </span>
        )}
      </div>

      {/* Main Map Card with Heritage Gold Border */}
      <div className="relative bg-white rounded-2xl border-2 border-[#C5B358] p-3 sm:p-4 shadow-md overflow-hidden flex flex-col items-center">
        {/* Helper guide label above map */}
        <div className="w-full text-center pb-2 text-[11px] font-medium text-stone-500 flex items-center justify-center gap-1.5 border-b border-stone-100 mb-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C5B358]" />
          <span>Nhấp trực tiếp vào vùng bản đồ để chọn miền</span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C5B358]" />
        </div>

        {/* 
          Interactive SVG Map with embedded <image> tag:
          Wrapping <image> inside <svg viewBox="0 0 419 512"> ensures that both the base map
          and all interactive <polygon> coordinates scale in 100% mathematical lockstep across
          any screen size without any alignment drift or offset.
        */}
        <div className="relative w-full flex items-center justify-center">
          <svg
            viewBox="0 0 419 512"
            className="w-full h-auto max-h-[500px] select-none"
            style={{ touchAction: 'manipulation' }}
            aria-label="Bản đồ tương tác 3 miền Việt Nam"
          >
            <defs>
              {/* Region Glow Highlights */}
              <filter id="northGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#5EA33C" floodOpacity="0.6" />
              </filter>
              <filter id="centralGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#F2B822" floodOpacity="0.7" />
              </filter>
              <filter id="southGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#3A87D0" floodOpacity="0.7" />
              </filter>
            </defs>

            {/* 
              1. Base Map Image inside SVG (Width: 419, Height: 512):
              Scales responsively and shares the identical coordinate space with SVG polygons.
            */}
            <image
              href={mapImg}
              x="0"
              y="0"
              width="419"
              height="512"
              preserveAspectRatio="xMidYMid meet"
              className="pointer-events-none select-none"
            />

            {/* 
              2. MIỀN BẮC (Region: 'north' - Green)
            */}
            <g
              id="region-overlay-north"
              role="button"
              tabIndex={0}
              aria-label="Chọn Miền Bắc"
              onClick={() => onSelectRegion('north')}
              onMouseEnter={() => setHoveredRegion('north')}
              onMouseLeave={() => setHoveredRegion(null)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectRegion('north');
                }
              }}
              className="cursor-pointer transition-all duration-200 outline-none"
            >
              <title>Miền Bắc (Nhấp để chọn di tích Miền Bắc)</title>
              <polygon
                points={NORTH_POLYGON}
                fill={
                  hoveredRegion === 'north'
                    ? 'rgba(94, 163, 60, 0.32)'
                    : selectedRegion === 'north'
                    ? 'rgba(94, 163, 60, 0.18)'
                    : 'rgba(94, 163, 60, 0.001)'
                }
                stroke={
                  hoveredRegion === 'north'
                    ? '#3E7522'
                    : selectedRegion === 'north'
                    ? '#478229'
                    : 'transparent'
                }
                strokeWidth={hoveredRegion === 'north' ? 2.5 : selectedRegion === 'north' ? 2 : 1}
                strokeLinejoin="round"
                filter={hoveredRegion === 'north' || selectedRegion === 'north' ? 'url(#northGlow)' : undefined}
                className="transition-all duration-200"
              />
            </g>

            {/* 
              3. MIỀN TRUNG (Region: 'central' - Yellow/Orange + Hoàng Sa)
            */}
            <g
              id="region-overlay-central"
              role="button"
              tabIndex={0}
              aria-label="Chọn Miền Trung"
              onClick={() => onSelectRegion('central')}
              onMouseEnter={() => setHoveredRegion('central')}
              onMouseLeave={() => setHoveredRegion(null)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectRegion('central');
                }
              }}
              className="cursor-pointer transition-all duration-200 outline-none"
            >
              <title>Miền Trung & Quần đảo Hoàng Sa (Nhấp để chọn di tích Miền Trung)</title>
              {/* Mainland Central Polygon */}
              <polygon
                points={CENTRAL_POLYGON}
                fill={
                  hoveredRegion === 'central'
                    ? 'rgba(242, 184, 34, 0.34)'
                    : selectedRegion === 'central'
                    ? 'rgba(242, 184, 34, 0.18)'
                    : 'rgba(242, 184, 34, 0.001)'
                }
                stroke={
                  hoveredRegion === 'central'
                    ? '#B8860B'
                    : selectedRegion === 'central'
                    ? '#C9910E'
                    : 'transparent'
                }
                strokeWidth={hoveredRegion === 'central' ? 2.5 : selectedRegion === 'central' ? 2 : 1}
                strokeLinejoin="round"
                filter={hoveredRegion === 'central' || selectedRegion === 'central' ? 'url(#centralGlow)' : undefined}
                className="transition-all duration-200"
              />
              {/* Quần đảo Hoàng Sa Interactive Zone */}
              <rect
                x="285"
                y="190"
                width="95"
                height="80"
                rx="8"
                fill={
                  hoveredRegion === 'central'
                    ? 'rgba(242, 184, 34, 0.22)'
                    : selectedRegion === 'central'
                    ? 'rgba(242, 184, 34, 0.12)'
                    : 'rgba(242, 184, 34, 0.001)'
                }
                stroke={
                  hoveredRegion === 'central'
                    ? '#B8860B'
                    : selectedRegion === 'central'
                    ? '#C9910E'
                    : 'transparent'
                }
                strokeWidth={hoveredRegion === 'central' ? 1.5 : 1}
                strokeDasharray={selectedRegion === 'central' || hoveredRegion === 'central' ? '4 2' : undefined}
                className="transition-all duration-200"
              />
            </g>

            {/* 
              4. MIỀN NAM (Region: 'south' - Blue + Trường Sa)
            */}
            <g
              id="region-overlay-south"
              role="button"
              tabIndex={0}
              aria-label="Chọn Miền Nam"
              onClick={() => onSelectRegion('south')}
              onMouseEnter={() => setHoveredRegion('south')}
              onMouseLeave={() => setHoveredRegion(null)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectRegion('south');
                }
              }}
              className="cursor-pointer transition-all duration-200 outline-none"
            >
              <title>Miền Nam & Quần đảo Trường Sa (Nhấp để chọn di tích Miền Nam)</title>
              {/* Mainland South Polygon */}
              <polygon
                points={SOUTH_POLYGON}
                fill={
                  hoveredRegion === 'south'
                    ? 'rgba(58, 135, 208, 0.34)'
                    : selectedRegion === 'south'
                    ? 'rgba(58, 135, 208, 0.18)'
                    : 'rgba(58, 135, 208, 0.001)'
                }
                stroke={
                  hoveredRegion === 'south'
                    ? '#1B5B96'
                    : selectedRegion === 'south'
                    ? '#246FB8'
                    : 'transparent'
                }
                strokeWidth={hoveredRegion === 'south' ? 2.5 : selectedRegion === 'south' ? 2 : 1}
                strokeLinejoin="round"
                filter={hoveredRegion === 'south' || selectedRegion === 'south' ? 'url(#southGlow)' : undefined}
                className="transition-all duration-200"
              />
              {/* Quần đảo Trường Sa Interactive Zone */}
              <rect
                x="285"
                y="380"
                width="130"
                height="125"
                rx="8"
                fill={
                  hoveredRegion === 'south'
                    ? 'rgba(58, 135, 208, 0.22)'
                    : selectedRegion === 'south'
                    ? 'rgba(58, 135, 208, 0.12)'
                    : 'rgba(58, 135, 208, 0.001)'
                }
                stroke={
                  hoveredRegion === 'south'
                    ? '#1B5B96'
                    : selectedRegion === 'south'
                    ? '#246FB8'
                    : 'transparent'
                }
                strokeWidth={hoveredRegion === 'south' ? 1.5 : 1}
                strokeDasharray={selectedRegion === 'south' || hoveredRegion === 'south' ? '4 2' : undefined}
                className="transition-all duration-200"
              />
            </g>
          </svg>
        </div>

        {/* Quick Region Selector Action Pills at Bottom */}
        <div className="w-full grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-stone-200">
          <button
            type="button"
            id="btn-switch-north"
            onClick={() => onSelectRegion('north')}
            onMouseEnter={() => setHoveredRegion('north')}
            onMouseLeave={() => setHoveredRegion(null)}
            className={`py-2 px-1 rounded-lg text-center font-bold text-xs uppercase tracking-wider transition-all shadow-xs border cursor-pointer ${
              selectedRegion === 'north'
                ? 'bg-[#5EA33C] text-white border-[#3E7522] scale-105 shadow-md ring-2 ring-[#5EA33C]/30'
                : hoveredRegion === 'north'
                ? 'bg-[#F0F8EC] text-[#3E7522] border-[#5EA33C] scale-102 ring-1 ring-[#5EA33C]/20'
                : 'bg-white hover:bg-[#F0F8EC] text-[#3E7522] border-[#5EA33C]/40'
            }`}
          >
            • MIỀN BẮC
          </button>
          <button
            type="button"
            id="btn-switch-central"
            onClick={() => onSelectRegion('central')}
            onMouseEnter={() => setHoveredRegion('central')}
            onMouseLeave={() => setHoveredRegion(null)}
            className={`py-2 px-1 rounded-lg text-center font-bold text-xs uppercase tracking-wider transition-all shadow-xs border cursor-pointer ${
              selectedRegion === 'central'
                ? 'bg-[#F2B822] text-[#570000] border-[#B8860B] scale-105 shadow-md ring-2 ring-[#F2B822]/40 font-black'
                : hoveredRegion === 'central'
                ? 'bg-[#FEF9E7] text-[#9E6D04] border-[#F2B822] scale-102 ring-1 ring-[#F2B822]/20 font-bold'
                : 'bg-white hover:bg-[#FEF9E7] text-[#9E6D04] border-[#F2B822]/40'
            }`}
          >
            • MIỀN TRUNG
          </button>
          <button
            type="button"
            id="btn-switch-south"
            onClick={() => onSelectRegion('south')}
            onMouseEnter={() => setHoveredRegion('south')}
            onMouseLeave={() => setHoveredRegion(null)}
            className={`py-2 px-1 rounded-lg text-center font-bold text-xs uppercase tracking-wider transition-all shadow-xs border cursor-pointer ${
              selectedRegion === 'south'
                ? 'bg-[#3A87D0] text-white border-[#1B5B96] scale-105 shadow-md ring-2 ring-[#3A87D0]/30'
                : hoveredRegion === 'south'
                ? 'bg-[#EDF5FD] text-[#1B5B96] border-[#3A87D0] scale-102 ring-1 ring-[#3A87D0]/20'
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
