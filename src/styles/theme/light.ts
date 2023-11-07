
import { Inter } from "next/font/google";
import localFont from 'next/font/local';

const myFont = localFont({ src: '../../../assets/upheavtt.ttf' })


const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  weight: ["100", "400", "600", "700"],
});

const light = {
  breakpoints: {
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1280px",
    "2xl": "1536px",
  },
  fontFamily: {
    Inter: inter.style.fontFamily,
    Upheaval: myFont.style.fontFamily,
  },
  fontWeights: {
    light: "100",
    regular: "400",
    semiBold: "600",
    bold: "700",
  },
  fontSizes: {
    xs: "1.2rem",
    sm: "1.4rem",
    md: "1.6rem",
    lg: "1.8rem",
    xl: "2rem",
    "2xl": "2.4rem",
    "3xl": "2.8rem",
    "4xl": "3.2rem",
    "5xl": "3.6rem",
    "6xl": "4rem",
    "7xl": "4.8rem",
  },
  lineHeights: {
    xs: "1.5rem",
    sm: "1.7rem",
    md: "1.9rem",
    lg: "2.2rem",
    xl: "2.4rem",
    "2xl": "2.9rem",
    "3xl": "3.4rem",
    "4xl": "3.9rem",
    "5xl": "4.4rem",
    "6xl": "4.8rem",
    "7xl": "5.8rem",
  },
  colors: {
    primary: "#FFAF00",
    secondary: "#FE4D00",
    background: "#000000",
    circle: "#3F2400",
  },
  backgrounds: {
    image: "/snake-background.png",
  },
};

export const dark = {
  ...light,
  colors: {
    primary: "#D8016E",
    secondary: "#76016A",
    background: "#000000",
    circle: "#1E191E"
  },
  backgrounds: {
    image: "/snake-background-dark.png",
  },
}

export default light