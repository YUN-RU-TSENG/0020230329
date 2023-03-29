import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig((config) => ({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
    // build production 時刪除 console、debugger
    esbuild: {
        drop: config.mode === "production" ? ["console", "debugger"] : [],
    },
}))
