/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#C8A284',
                primaryText: '#808080',
                secondaryText: '#7B7B7B',
                textBlack: '#272728',
                shadeColor: '#F9F0EC',
                overlay: '#F6F7F8',
                bg: '#FFFDFB',
            },
        },
    },
    plugins: [],
};
