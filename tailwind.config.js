const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        custom:
        'inset 20px 10px 20px rgba(0, 0, 0, 0.1), 15px 20px 10px rgba(0, 0, 0, 0.1), 15px 20px 20px rgba(0, 0, 0, 0.1), inset -10px -10px 15px rgba(255, 255, 255, 0.6)',
        customTwo:
        'inset 10px 10px 10px rgba(0, 0, 0, 0.1), 10px 10px 10px rgba(0, 0, 0, 0.1), 15px 15px 20px rgba(0, 0, 0, 0.1), inset -10px -10px 15px rgba(255, 255, 255, 0.5)',
      },
      colors: {
        primary: '#050048',
        secondary: '#050048',
      },
      animation: {
        morph: 'morph 7s ease-in-out infinite',
      },
      keyframes: {
        morph: {
          '0%': {
            borderTopLeftRadius: '20%',
            borderTopRightRadius: '20%',
            borderBottomLeftRadius: '20%',
            borderBottomRightRadius: '20%',
          },
          '10%': {
            borderTopLeftRadius: '25%',
            borderTopRightRadius: '20%',
            borderBottomLeftRadius: '20%',
            borderBottomRightRadius: '20%',
          },
          '20%': {
            borderTopLeftRadius: '20%',
            borderTopRightRadius: '25%',
            borderBottomLeftRadius: '20%',
            borderBottomRightRadius: '20%',
          },
          '30%': {
            borderTopLeftRadius: '20%',
            borderTopRightRadius: '20%',
            borderBottomLeftRadius: '20%',
            borderBottomRightRadius: '25%',
          },
          '40%': {
            borderTopLeftRadius: '20%',
            borderTopRightRadius: '20%',
            borderBottomLeftRadius: '25%',
            borderBottomRightRadius: '20%',
          },
          '50%': {
            borderTopLeftRadius: '25%',
            borderTopRightRadius: '20%',
            borderBottomLeftRadius: '20%',
            borderBottomRightRadius: '20%',
          },
          '60%': {
            borderTopLeftRadius: '20%',
            borderTopRightRadius: '25%',
            borderBottomLeftRadius: '20%',
            borderBottomRightRadius: '20%',
          },
          '70%': {
            borderTopLeftRadius: '20%',
            borderTopRightRadius: '20%',
            borderBottomLeftRadius: '20%',
            borderBottomRightRadius: '25%',
          },
          '80%': {
            borderTopLeftRadius: '20%',
            borderTopRightRadius: '20%',
            borderBottomLeftRadius: '25%',
            borderBottomRightRadius: '20%',
          },
          '100%': {
            borderTopLeftRadius: '20%',
            borderTopRightRadius: '20%',
            borderBottomLeftRadius: '20%',
            borderBottomRightRadius: '20%',
          },
        },
      },
    },
    transitionProperty: {
      'width': 'width',
      'height': 'height',
      'all': 'all',
    },
  },
  variants: {},
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.no-scrollbar': {
          scrollbarWidth: 'none',
          '-ms-overflow-style': 'none',
        },
        '.scrollbar-thin' :{
          scrollbarWidth :"thin",
          scrollbarColor : "rgb(31 29 29) white"
        },
        '.scrollbar-webkit':{
            "&::-webkit-scrollbar":{
              width:"8px"
            },
            "&::-webkit-scrollbar-track" :{
              background: "transparent"
            },
            "&::-webkit-scrollbar-thumb":{
              backgroundColor: "rgb(31 41 55)",
              borderRadius : "20px",
              border: "1px solid white",
            },
        }
      };
      
      addUtilities(newUtilities, ['responsive', 'hover']);
    }),
  ],
};
