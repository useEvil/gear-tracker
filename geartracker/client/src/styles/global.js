import { createGlobalStyle } from 'styled-components';
import theme from './theme';

const { cyanPale, cyanDark, bluePale } = theme.colors;
const { primaryFont, accentFont } = theme.fontFamilies;

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: ${primaryFont};
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 14px;
    line-height: 1.15px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing:antialiased;
    -moz-osx-font-smoothing:grayscale;
    min-width: 320px;
  }

  body {
    margin: 0;
    font-size: 1rem;
    background-color: ${cyanDark};
    font-weight: 400;
    text-align: left;
    color: ${cyanPale};
    line-height: 1.5;
  }

  h1, h2, h3, h4, h5, h6, button {
    margin-bottom: .5rem;
    font-weight: 500;
    line-height: 1.2;
    font-family: ${accentFont};
    color: ${bluePale};
  }

  a, button, select {
    cursor: pointer;
    outline: none;
  }
  
  a {
    text-decoration: none;
    background-color: transparent;
  }

  dl, ol, ul {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  input {
    outline: none;
  }

  @media (min-width:766px) and (max-width: 900px) {
    html {
      font-size: 14px;
    }
  }

  @media (max-width: 767px) {
    html {
        font-size: 13px;
    }
  }
`;

export default GlobalStyle;
