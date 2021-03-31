module.exports = {
  future: {
    webpack5: true,
  },
  webpack: (config, { isServer, dev, webpack }) => {
    console.log(`Webpack version: ${webpack.version}`);

    /*
      Warning message when working with WASM in dev
      The configured output.hotUpdateMainFilename doesn't lead times.   
      to unique filenames per runtime and HMR update differs beied updattween runtimes.
      This might lead to incorrect runtime behavior of the appl.hotUpdatied update.                                              eady on h
      To fix this, make sure to include [runtime] in the output.hotUpdateMainFilename option, or use the default config.
    */
    config.output.hotUpdateMainFilename =
      "static/webpack/[fullhash].[runtime].hot-update.json";

    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    return config;
  },
};
