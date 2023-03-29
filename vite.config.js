import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig((config) => {
    const env = loadEnv(config.mode, process.cwd(), "")

    console.log("env.VITE_BASE_API_URL", env.VITE_BASE_API_URL)

    return {
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
        server: {
            host: "127.0.0.1",
            port: 3000,
            proxy: {
                "/api": {
                    target: env.VITE_BASE_API_URL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ""),
                },
            },
        },
    }
})
