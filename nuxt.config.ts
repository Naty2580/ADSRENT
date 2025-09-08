export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: false },

  modules: [
    "@nuxtjs/tailwindcss",  
    "@pinia/nuxt", 
    "pinia-plugin-persistedstate/nuxt",   
    "@nuxt/image",    
    "lodash.clonedeep",      
         
  ],   
  // pinia:  {  
  //   plugins: ['@pinia/plugin-persistedstate'],
  // },  
    
  components: { 
    dirs: [  
      "~/components",   
  
      {     
        path: "~/components/ui",   
        pathPrefix: false,   
      }, 
    ],
  },  
 
  css: ["~/assets/css/main.css"],

  // shadcn: {
  //   prefix: '', // leave empty unless you want components like UiButton
  //   componentDir: './components/ui'
  // },

  typescript: {
    // We're using JSDoc, but this improves Volar performance.
    shim: false,
    // Enables the Takeover Mode for a much faster & integrated editor experience.
    // Recommended for projects with VS Code and Volar.
    typeCheck: "build", // This moves type-checking from development time to build time. HUGE performance boost for `npm run dev`.
  },

  app: {
    head: { 
      htmlAttrs: { lang: "en" },
      title: "AdissRent - Find Your Next Home",
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        }, 
        {  
          rel: "preload",
          as: "style",
          href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@700&family=Public+Sans:wght@400;500;600&display=swap",
        },
        {
          rel: "stylesheet",
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@600;700;800&display=swap'        },
      ],
      meta: [ 
        { 
          name: "description",
          content:
            "The easiest way to find your next home for sale or rent in Ethiopia.",
        },
      ],
    },
  },
  // i18n: {
  //   locales: [
  //     { code: 'en', iso: 'en-US', file: 'en.json', name: 'English' },
  //     { code: 'am', iso: 'am-ET', file: 'am.json', name: 'Amharic' },
  //   ],
  //   langDir: 'locales',
  //   defaultLocale: 'en', 
  //   strategy: 'prefix_except_default',
  // },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "http://localhost:8000/api",
    },
  },

  vite: {
    server: { 
      hmr: {
        timeout: 120000, 
      }, 
      watch: {
        usePolling: true, // safer for Windows  
        interval: 500,
        awaitWriteFinish: {
          stabilityThreshold: 60000, 
        },
      },
    }, 

    optimizeDeps: {
      // Pre-bundle these dependencies for faster page loads in development.
      // This is especially useful for large libraries.
      include: [
        "axios",
        "pinia",
        "vee-validate",
        "zod", 
        "radix-vue", 
        "lucide-vue-next",
        "@vee-validate/toTypedSchema",
        // 'shadcn-nuxt',
      ],
    },
  },

  // i18n Module Configuration

  // Nuxt Image Module Configuration
  image: {
    format: ["webp"],
  },

  // PWA Module Configuration
  // pwa: {
  //   registerType: 'autoUpdate',
  //   manifest: {
  //     name: 'AdissRent',
  //     short_name: 'AdissRent',
  //     theme_color: '#FF6F3C',
  //     icons: [
  //       { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
  //       { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
  //     ],
  //   },
  //   workbox: {
  //     globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
  //   },
  // },
});
