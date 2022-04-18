const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                emerald: {
                    700: '#00705d',
                    800: '#006048',
                    900: '#004d30',
                }
            }
        },
    },
    plugins: [require('@tailwindcss/forms')],
}
