export default {
  // https://nuxt.com/docs/guide/configuration#vite
  vite: {
    // https://vitejs.dev/config/
    define: {
      'process.env.DEBUG': false,
    },
    server: {
      fs: {
        strict: true,
      },
    },
    // https://github.com/antfu/vite-ssg#configuration
    ssgOptions: {
      script: 'async',
      formatting: 'minify',
    },
    ssr: {
      noExternal: true,
    },
  },
};
