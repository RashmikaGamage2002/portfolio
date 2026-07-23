/** @type {import('tailwindcss').Config} */

export default {

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],


  theme: {

    extend: {


      colors: {

        // Premium Dark System
        primary: "#090909",

        secondary: "#111111",

        surface: "#181818",

        card: "#151515",


        // Text
        lightText: "#F5F5F3",

        dimText: "#A8A8A8",


        // Accent
        accent: "#6BA8FF",

        "accent-soft": "#88BCFF",


        border: "#262626",

      },


      fontFamily: {


        sans: [
          "Inter",
          "sans-serif"
        ],


        display:[
          "Manrope",
          "sans-serif"
        ],


        mono:[
          "JetBrains Mono",
          "monospace"
        ]

      },



      spacing:{


        "section-lg":"12rem",

        "section-xl":"16rem"


      },



      borderRadius:{


        "premium":"12px",

        "soft":"20px"


      },



      animation:{


        reveal:
        "reveal 1s ease forwards",


        fade:
        "fade 1s ease forwards",


        float:
        "float 6s ease-in-out infinite",


        pulseSoft:
        "pulseSoft 3s ease-in-out infinite",


        marquee:
        "marquee 20s linear infinite"


      },



      keyframes:{


        reveal:{


          "0%":{
            opacity:0,
            transform:"translateY(40px)"
          },


          "100%":{
            opacity:1,
            transform:"translateY(0)"
          }

        },



        fade:{


          "0%":{
            opacity:0
          },


          "100%":{
            opacity:1
          }


        },



        float:{


          "0%,100%":{
            transform:"translateY(0)"
          },


          "50%":{
            transform:"translateY(-15px)"
          }


        },



        pulseSoft:{


          "0%,100%":{
            opacity:.5
          },


          "50%":{
            opacity:1
          }


        },



        marquee:{


          from:{
            transform:"translateX(0)"
          },


          to:{
            transform:"translateX(-100%)"
          }


        }


      },



      backgroundImage:{


        "hero-gradient":
        "radial-gradient(circle at top right,#6BA8FF20,transparent 40%)",


        "noise":
        "url('/noise.png')"

      }

    }

  },


  plugins: [],

}