import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light", "dark", "aqua", "sunset", "cyberpunk","valentine",{
      cinnamoroll: {
        "primary": "#66B7EC",    // 淡蓝色,代表玉桂狗的耳朵
        "secondary": "#FFA5BA",  // 淡粉色,代表玉桂狗的脸颊
        // "accent": "#FFFFFF",     // 白色,代表玉桂狗的主体颜色
        // "neutral": "#F0F0F0",    // 浅灰色,作为中性色调
        // "base-100": "#FFFFFF",   // 白色,作为背景色
        // "info": "#87CEFA",       // 天蓝色,代表玉桂狗的眼睛
        // "success": "#98FB98",    // 淡绿色,代表积极和成功
        // "warning": "#FFD700",    // 金色,用于警告,但保持柔和
        // "error": "#FF6B6B",      // 柔和的红色,用于错误提示

        // "primary": "#a8d8e9",  // 柔和的蓝色
        // "secondary": "#f1c0b2", // 浅奶油色
        "accent": "#fff4e3",    // 温暖的米色
        // "neutral": "#f5f5f5",   // 温和的灰白色
        "neutral": "#bae6fd",   // 温和的灰白色
        "base-100": "#ffffff",  // 纯白
        "info": "#a2d9ef",      // 浅蓝色
        "success": "#b2e7a0",   // 清新的绿色
        "warning": "#f8c8a0",   // 柔和的橙色
        "error": "#f5b0b0",     // 浅红色

        "color-scheme": "light",
        // "primary": "#65c3c8",
        // "secondary": "#ef9fbc",
        // "accent": "#eeaf3a",
        // "neutral": "#291334",
        // "base-100": "#faf7f5",
        "base-200": "#efeae6",
        "base-300": "#e7e2df",
        "base-content": "#291334",
        "--rounded-btn": "1.9rem",
        "--tab-border": "2px",
        "--tab-radius": "0.7rem",
      },
    }],
    themeRoot: ":root",
  },

};
export default config;
