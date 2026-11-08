import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";
import { globalDepPlugin } from "./src/dev-utils/globalDepPlguin";

export default defineConfig({
  root: ".",

  define: {
    REACT_APP_LANGUAGES: JSON.stringify("en"),
    REACT_APP_API_SERVICE_URL: JSON.stringify("http://127.0.0.1:3999"),
    REACT_APP_HOCUSPOCUS_URL: JSON.stringify(""),
    REACT_APP_HOCUSPOCUS_SECRET: JSON.stringify(""),
  },

  plugins: [
    tsconfigPaths({
      projects: [
        "./tsconfig.json",
        "../lowcoder-design/tsconfig.json",
        "../lowcoder-core/tsconfig.json",
      ],
    }),

    svgrPlugin({
      include: "**/*.svg",
      svgrOptions: {
        exportType: "named",
        namedExport: "ReactComponent",
      },
    }),

    globalDepPlugin(),
  ],

  server: {
    host: "127.0.0.1",
    port: 8200,
    strictPort: true,
  },
});
