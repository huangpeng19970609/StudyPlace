"use strict";
const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Uglify = require("uglify-es")

function resolve(dir) {
    return path.join(__dirname, dir);
}

const name = "空间环境应用产品研发部"; // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 9528; // dev port

// 若在北京开发
const isBeiJing = false;
const url = {
    api: isBeiJing ? 'http://10.1.41.55:8000/SBT/common/' : 'http://piecloud.piesat.cn/SpaceEnvironmentDepartment/SbtCommonDataProcessServer/',
    monitor: isBeiJing ? 'http://10.1.41.55:8010/SBT/CAD/' : 'http://piecloud.piesat.cn/SpaceEnvironmentDepartment//SbtCadDataProcessServer/',
    layer: isBeiJing ? 'http://172.16.40.19:18020/SBT/CSS/' : 'http://piecloud.piesat.cn/SpaceEnvironmentDepartment//SbtCssDataProcessServer/',
    feasibility: isBeiJing ? 'http://172.16.40.19:18020/SBT/Amd/' : 'http://piecloud.piesat.cn/SpaceEnvironmentDepartment//SbtAmdDataProcessServer/',
    //   exam:isBeiJing ?'http://192.168.31.32:8080/swagger-ui.html'
    //   :''
}

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
    /**
     * You will need to set publicPath if you plan to deploy your site under a sub path,
     * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
     * then publicPath should be set to "/bar/".
     * In most cases please use '/' !!!
     * Detail: https://cli.vuejs.org/config/#publicpath
     */
    publicPath: "/PIE-EngineEarthWeb-HZJST",
    outputDir: "PIE-EngineEarthWeb-HZJST",
    // assetsDir: "static",
    filenameHashing: true, //
    // lintOnSave: process.env.NODE_ENV === 'development',
    lintOnSave: false,
    productionSourceMap: false,
    devServer: {
        port: port,
        open: true,
        https: false,
        overlay: {
            warnings: false,
            errors: true
        },
        //before: require("./mock/mock-server.js"),
        // proxy: {
        //   '/api': {
        //     target: 'http://10.1.41.55:8000/SBT/common/',//设置你调用的接口域名和端口号 别忘了加http
        //     changeOrigin: true,
        //     pathRewrite: {
        //       '^/api': ''//这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
        //     }
        //   }
        // },
        proxy: {
            //用户接口
            '/api': {
                target: url.api, //设置你调用的接口域名和端口号 别忘了加http
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                },
            },
            //   考试页面接口
            // 题目控制层
            '/sysExamQuestion': {
                target: 'http://192.168.31.32:8080',
                changeOrigin: true,
                pathRewrite: {
                    '': ''
                }
            },
            //   考试层控制
            '/sysExamMgt': {
                target: 'http://192.168.31.32:8080',
                changeOrigin: true,
                pathRewrite: {
                    '': ''
                }
            },
            //   试卷层控制
            '/sysExamPaper': {
                target: 'http://192.168.31.32:8080',
                changeOrigin: true,
                pathRewrite: {
                    '': ''
                }
            },

            //需求计划方案模板接口
            '/monitor': {
                target: url.monitor, //设置你调用的接口域名和端口号 别忘了加http
                changeOrigin: true,
                pathRewrite: {
                    '^/monitor': ''
                }
            },
            '/layer': {
                target: url.layer,
                changeOrigin: true,
                pathRewrite: {
                    '^/layer': ''
                }
            },
            //可行性分析
            '/feasibility': {
                target: url.feasibility,
                changeOrigin: true,
                pathRewrite: {
                    '^/feasibility': ''
                }
            },
        },
        // proxy:{
        //   "/api":{
        //     changeOrigin:true,
        //     target:'https://apis.map.qq.com/ws/location/v1/ip?key=PTMBZ-GCQLW-SC2RG-R2FNI-HWPNQ-4PBQM',
        //     pathRewrite:{
        //       '^/api': ''
        //     }
        //   }
        // }
    },
    configureWebpack: {
        name: name,
        resolve: {
            alias: {
                "@": resolve("src")
            }
        },
        plugins: [
            // Copy Cesium Assets, Widgets, and Workers to a static directory
            new CopyWebpackPlugin({
                patterns: [{
                        from: "./src/earthplugins",
                        to: path.resolve(__dirname, "./PIE-EngineEarthWeb-HZJST/earthplugins"),
                        transform: function(content) {
                            return Uglify.minify(content.toString(), { compress: true, mangle: { properties: { keep_quoted: true } } }).code; //压缩js文件
                        },
                        globOptions: {
                            //gitignore: true,
                            ignore: [".*"]
                        }
                    },
                    { from: "node_modules/cesium/Build/Cesium/Workers", to: "Workers" },
                    {
                        from: "node_modules/cesium/Build/Cesium/ThirdParty",
                        to: "ThirdParty"
                    },
                    { from: "node_modules/cesium/Build/Cesium/Assets", to: "Assets" },
                    { from: "node_modules/cesium/Build/Cesium/Widgets", to: "Widgets" }
                ]
            }),
            new webpack.DefinePlugin({
                // Define relative base path in cesium for loading assets
                CESIUM_BASE_URL: JSON.stringify("")
            })
        ],
        module: {
            // Removes these errors: "Critical dependency: require function is used in a way in which dependencies cannot be statically extracted"
            // https://github.com/AnalyticalGraphicsInc/cesium-webpack-example/issues/6
            unknownContextCritical: false,
            unknownContextRegExp: /\/cesium\/cesium\/Source\/Core\/buildModuleUrl\.js/
        }
    },
    chainWebpack(config) {
        // it can improve the speed of the first screen, it is recommended to turn on preload
        config.plugin("preload").tap(() => [{
            rel: "preload",
            // to ignore runtime.js
            // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
            fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
            include: "initial"
        }]);

        // when there are many pages, it will cause too many meaningless requests
        config.plugins.delete("prefetch");

        // set svg-sprite-loader
        config.module
            .rule("svg")
            .exclude.add(resolve("src/icons"))
            .end();
        config.module
            .rule("icons")
            .test(/\.svg$/)
            .include.add(resolve("src/icons"))
            .end()
            .use("svg-sprite-loader")
            .loader("svg-sprite-loader")
            .options({
                symbolId: "icon-[name]"
            })
            .end();

        config
            .when(process.env.NODE_ENV !== "development",
                config => {
                    config
                        .plugin("ScriptExtHtmlWebpackPlugin")
                        .after("html")
                        .use("script-ext-html-webpack-plugin", [{
                            // `runtime` must same as runtimeChunk name. default is `runtime`
                            inline: /runtime\..*\.js$/
                        }])
                        .end();
                    config
                        .optimization.splitChunks({
                            chunks: "all",
                            cacheGroups: {
                                libs: {
                                    name: "chunk-libs",
                                    test: /[\\/]node_modules[\\/]/,
                                    priority: 10,
                                    chunks: "initial" // only package third parties that are initially dependent
                                },
                                elementUI: {
                                    name: "chunk-elementUI", // split elementUI into a single package
                                    priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                                    test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                                },
                                commons: {
                                    name: "chunk-commons",
                                    test: resolve("src/components"), // can customize your rules
                                    minChunks: 3, //  minimum common number
                                    priority: 5,
                                    reuseExistingChunk: true
                                }
                            }
                        });
                    // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
                    config.optimization.runtimeChunk("single");
                }
            );
    }
};