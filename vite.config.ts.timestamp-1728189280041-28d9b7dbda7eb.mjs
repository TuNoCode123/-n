// vite.config.ts
import path from "node:path";
import vue from "file:///D:/%C4%91%E1%BB%81%20%C3%A1n/client/admin/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { defineConfig } from "file:///D:/%C4%91%E1%BB%81%20%C3%A1n/client/admin/node_modules/vite/dist/node/index.js";
import tailwind from "file:///D:/%C4%91%E1%BB%81%20%C3%A1n/client/admin/node_modules/tailwindcss/lib/index.js";
import autoprefixer from "file:///D:/%C4%91%E1%BB%81%20%C3%A1n/client/admin/node_modules/autoprefixer/lib/autoprefixer.js";
var __vite_injected_original_dirname = "D:\\\u0111\u1EC1 \xE1n\\client\\admin";
var vite_config_default = defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()]
    }
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxcdTAxMTFcdTFFQzEgXHUwMEUxblxcXFxjbGllbnRcXFxcYWRtaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFx1MDExMVx1MUVDMSBcdTAwRTFuXFxcXGNsaWVudFxcXFxhZG1pblxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovJUM0JTkxJUUxJUJCJTgxJTIwJUMzJUExbi9jbGllbnQvYWRtaW4vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCI7XG5pbXBvcnQgdnVlIGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWVcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5cbmltcG9ydCB0YWlsd2luZCBmcm9tIFwidGFpbHdpbmRjc3NcIjtcbmltcG9ydCBhdXRvcHJlZml4ZXIgZnJvbSBcImF1dG9wcmVmaXhlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBjc3M6IHtcbiAgICBwb3N0Y3NzOiB7XG4gICAgICBwbHVnaW5zOiBbdGFpbHdpbmQoKSwgYXV0b3ByZWZpeGVyKCldLFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFt2dWUoKV0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2USxPQUFPLFVBQVU7QUFDOVIsT0FBTyxTQUFTO0FBQ2hCLFNBQVMsb0JBQW9CO0FBRTdCLE9BQU8sY0FBYztBQUNyQixPQUFPLGtCQUFrQjtBQUx6QixJQUFNLG1DQUFtQztBQU96QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixLQUFLO0FBQUEsSUFDSCxTQUFTO0FBQUEsTUFDUCxTQUFTLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUyxDQUFDLElBQUksQ0FBQztBQUFBLEVBQ2YsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
