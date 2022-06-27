const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;

if(process.env.NODE_ENV === "production"){// 生产环境
    module.exports = {
        devtool: "none",
        plugins: [new BundleAnalyzerPlugin()],
        externals: {// 告诉webpack不要对公共库进行打包
            vue: "Vue",
            vuex: "Vuex",
            "vue-router": "VueRouter",
        }
    };
}else{// 开发环境
    module.exports = {};
}