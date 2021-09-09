"use strict";
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require("path");
// let domain = 'http://127.0.0.1:9300'
// let busic = 'http://127.0.0.1:9400'
//
/* let busic = "http://10.129.90.148:9400";
let domain = "http://10.129.90.148:9300"; */
let domain = "http://www.ahamic.cn/";
let busic = "http://www.ahamic.cn/";
let ah = "http://moid.cma.cn";

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    proxyTable: {
      //共享系统 内部用户请求走网关
      "/busic": {
        target: domain,
        changeOrigin: true,
        pathRewrite: {
          "^/busic": "/busic"
        }
      },

      "/dir": {
        target: domain,
        changeOrigin: true,
        pathRewrite: {
          "^/dir": "/dir"
        }
      },
      "/ah": {
        target: ah,
        changeOrigin: true,
        pathRewrite: {
          "^/ah": "/ah"
        }
      },
      "/noticeMgr": {
        target: busic,
        changeOrigin: true,
        pathRewrite: {
          "^/noticeMgr": "/noticeMgr"
        }
      },
      "/noAuth": {
        target: busic,
        changeOrigin: true,
        pathRewrite: {
          "^/noAuth": "/noAuth"
        }
      },
      "/mdesAuth": {
        target: domain,
        changeOrigin: true,
        pathRewrite: {
          "^/mdesAuth": "/mdesAuth"
        }
      },
      // '/frontOidExternalAH': {
      //     target: front,
      //     changeOrigin: true,
      //     pathRewrite: {
      //         '^/frontOidExternalAH': '/frontOidExternalAH',
      //     },
      // },
      //
      // '/pdutUnified': {
      //     target: busic,
      //     changeOrigin: true,
      //     pathRewrite: {
      //         '^/pdutUnified': '/pdutUnified',
      //     },
      // },
      //
      // '/pdutTransit': {
      //     target: busic,
      //     changeOrigin: true,
      //     pathRewrite: {
      //         '^/pdutTransit': '/pdutTransit',
      //     },
      // },
      // 共享系统外部用户不走网关
      // '/out': {
      //   target: busic,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/busic': '/'
      //   }
      // },
      //认证中心
      "/mdesAuth": {
        target: domain,
        changeOrigin: true,
        pathRewrite: {
          "^/mdesAuth": "/mdesAuth"
        }
      }
      // '/menuMgr': {
      //     target: busic,
      //     changeOrigin: true,
      //     pathRewrite: {
      //         '^/menuMgr': '/menuMgr',
      //     },
      // },
      //
      // '/pdutMgr': {
      //     target: busic,
      //     changeOrigin: true,
      //     pathRewrite: {
      //         '^/pdutMgr': '/pdutMgr',
      //     },
      // },
      // '/pdutHeadMgr': {
      //     target: busic,
      //     changeOrigin: true,
      //     pathRewrite: {
      //         '^/pdutHeadMgr': '/pdutHeadMgr',
      //     },
      // },
      //
      // '/pdutUnitMgr': {
      //     target: busic,
      //     changeOrigin: true,
      //     pathRewrite: {
      //         '^/pdutUnitMgr': '/pdutUnitMgr',
      //     },
      // },
      // '/noAuth': {
      //     target: busic,
      //     changeOrigin: true,
      //     pathRewrite: {
      //         '^/noAuth': '/noAuth',
      //     },
      // },
    },

    // Various Dev Server settings
    host: "127.0.0.1", // can be overwritten by process.env.HOST
    port: 9999, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: "cheap-module-eval-source-map",

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, "../dist/index.html"),

    // Paths
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "static",
    assetsPublicPath: "./",

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: "#source-map",

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ["js", "css"],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
};
