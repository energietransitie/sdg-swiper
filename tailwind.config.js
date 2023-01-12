/**
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: [
    './src/App.{tsx,ts,jsx,js}',
    './src/components/**/*.{tsx,ts,jsx,js}',
    './src/screens/**/*.{tsx,ts,jsx,js}'
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins-thin': ['Poppins_100Thin'],
        'poppins-extra-light': ['Poppins_200ExtraLight'],
        'poppins-light': ['Poppins_300Light'],
        'poppins': ['Poppins_400Regular'],
        'poppins-medium': ['Poppins_500Medium'],
        'poppins-semibold': ['Poppins_600SemiBold'],
        'poppins-bold': ['Poppins_700Bold'],
      },
      width: {
        '100': '26rem',
        '110': '28rem',
        '120': '30rem',
        '128': '32rem'
      },
      height: {
        '95v': '90vh'
      }
    }
  }
};
