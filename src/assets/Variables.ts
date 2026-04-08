/* 
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import loader from "../assets/lotties/loader.json";
import januaryHero from "./images/calendar/posters/january-poster.svg";
import februaryHero from "./images/calendar/posters/february-poster.svg";
import marchHero from "./images/calendar/posters/march-poster.svg";
import aprilHero from "./images/calendar/posters/april-poster.svg";
import mayHero from "./images/calendar/posters/may-poster.svg";
import juneHero from "./images/calendar/posters/june-poster.svg";
import julyHero from "./images/calendar/posters/july-poster.svg";
import augustHero from "./images/calendar/posters/august-poster.svg";
import septemberHero from "./images/calendar/posters/september-poster.svg";
import octoberHero from "./images/calendar/posters/october-poster.svg";
import novemberHero from "./images/calendar/posters/november-poster.svg";
import decemberHero from "./images/calendar/posters/december-poster.svg";

const sharedImages = {
  logo: "/logo.jpeg",
  signInBgImage: aprilHero,
  calendarHeroes: {
    january: januaryHero,
    february: februaryHero,
    march: marchHero,
    april: aprilHero,
    may: mayHero,
    june: juneHero,
    july: julyHero,
    august: augustHero,
    september: septemberHero,
    october: octoberHero,
    november: novemberHero,
    december: decemberHero,
  },
};

const sharedFonts = {
  sourceSerifPro: "Source Serif Pro",
  body: '"Avenir Next", "Segoe UI", sans-serif',
};

export const lightTheme = {
  colors: {
    primary: "#0424C8",
    secondary: "#207CC9",
    tertiary: "#A0C4FF",
    backGround: "#F4E8D4",
    secondaryBackGround: "#F8F1E5",
    textSecondary: "#6F6558",
    paper: "#FBF7EF",
    border: "#D5C2A8",
    accent: "#A14D2C",
    accentSoft: "#E6C9B5",
    white: "#ffffff",
    black: "#000000",
  },
  fonts: sharedFonts,
  images: sharedImages,
  lotties: {
    loader,
  },
};

export const darkTheme = {
  colors: {
    primary: "#5FB7FF",
    secondary: "#2E87C7",
    tertiary: "#79CAFF",
    backGround: "#101C2C",
    secondaryBackGround: "#162538",
    textSecondary: "#AAC3DA",
    paper: "#0F1A28",
    border: "#29415E",
    accent: "#38A8FF",
    accentSoft: "#173A59",
    white: "#ffffff",
    black: "#000000",
  },
  fonts: sharedFonts,
  images: sharedImages,
  lotties: {
    loader,
  },
};

export const theme = lightTheme;
