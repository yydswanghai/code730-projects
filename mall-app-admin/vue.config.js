module.exports = {
    devServer: {
        proxy: {
            "/api": {
                target: "https://mallapi.duyiedu.com",
                changeOrigin: true,
                pathRewrite: { // pathRewrite 的作用是把实际Request Url中的'/api'用""代替
                    "^/api": "" 
                }
            },
            "/products": {
                target: "https://mallapi.duyiedu.com",
            },
            "/category": {
                target: "https://mallapi.duyiedu.com",
            },
        },
    },
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true,
            }
        }
    }
}