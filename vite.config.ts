import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      // Bật tối ưu hóa, nén mã nguồn và tách nhỏ asset để tăng tốc độ tải
      minify: 'esbuild',
      cssCodeSplit: true,
      // Không cho phép Vite tự động nhúng các file nhỏ thành mã base64 (tránh lỗi MIME type)
      assetsInlineLimit: 0,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              // Tách riêng các thư viện cốt lõi của React và Router ra một file riêng
              if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
                return 'react-core';
              }
              // Tách riêng các thư viện tiện ích hoặc UI/Icons phổ biến nếu có
              if (id.includes('lucide-react') || id.includes('clsx') || id.includes('tailwind-merge')) {
                return 'vendor-utils';
              }
              // Các thư viện node_modules còn lại gom vào vendor
              return 'vendor';
            }
          },
        },
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});