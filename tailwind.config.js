/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{vue,js,ts}',
        // 若使用了 uni-app 的 nvue 文件，也可添加
        './src/**/*.nvue'
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}