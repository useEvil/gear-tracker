import { css } from 'styled-components';

const CSS = css;

export const sizes = {
  small: 320,
  medium: 640,
  mlarge: 832,
  large: 1024,
  xlarge: 1200,
};

const media = {};

Object.keys(sizes).forEach(name => {
  media[name] = (...args) => CSS`
    @media only screen and (min-width: ${sizes[name]}px) {
      ${CSS(...args)};
    }
  `;
});

export default media;
