import styled from 'styled-components';
import { THEME } from '../../styles';

export const Card = styled.div`
  margin-bottom: 2rem;
  box-shadow: 0 3px 3px rgba(0,0,0,.05);
  position: relative;
  display: flex;
  flex-direction: column;
  word-wrap: break-word;
  background-color: ${THEME.colors.cyanGrey};
  background-clip: border-box;
  border: 0 solid rgba(0,0,0,.125);
  border-radius: .5rem;
`;

export const CardBody = styled.div`
  flex: 1 1 auto;
  padding: 2.2rem;
`;

export const CardTitle = styled.h4`
  font-size: 1rem;
  line-height: 140%;
  margin-top: -3px;
  font-weight: 400;
  text-transform: uppercase;
  margin-bottom: 2.1rem;
`;

export const CardSubtitle = styled.h6`
  color: ${THEME.colors.grayLightBlue};
  font-size: .95rem;
  font-weight: 400;
  margin-top: -1.75rem;
  line-height: 1.5;
`;
