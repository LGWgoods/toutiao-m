/**
 * PostCSS 配置文件
 */
module.exports = {
    // 配置使用的PostCSS 插件
    plugins: {
        // 配置使用 autoprefixer 插件
        // 作用：生成浏览器 CSS 样式规则前缀
        // 'autoprefixer': { // autoprefixer 插件的配置
        //     // 配置要兼容到的环境信息
        //     browsers: ['Android >= 4.0', 'iOS >= 8']
        // },

        // 配置使用 postcss-pxtorem 插件
        // 作用：把 px 转化为 rem
        'postcss-pxtorem': {
            // lib-flexible 的 REM 适配方案：把一行分为10等分，rootValue就是十分之一
            // 但 vant 建议设置为 37.5， 因为vant 是 基于 375 写的
            // rootValue: 37.5,
            rootValue({ file }) {
                return file.indexOf('vant') !== -1 ? 37.5 : 75
            },

            // 配置要转换的 css 属性
            // * 表示所有
            propList: ['*']
        }
    }
}
