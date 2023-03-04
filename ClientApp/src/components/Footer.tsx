import type { FunctionComponent } from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png';

const BrandContent = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: Inter;
  font-style: italic;
  word-spacing: 0.05rem;
`;

const StyledFooter = styled.footer`
  color: #fff;
  width: 100%;
  display: block;
  font-size: 1rem;
  padding: 1.5rem 1.75rem;
  background-color: #8639E8;
  position: relative;
  @media all and (max-width: 769px) {
    font-size: 1rem;
  }
`;
const Footer: FunctionComponent = () => (
  <StyledFooter>
    <BrandContent>
      <p>
        Проект для хакатону INT20H.<br />
        Над проектом працювали команда LuckyDev.
      </p>
      <img src={logo} alt="int20h" />
    </BrandContent>
  </StyledFooter>
);

export default Footer;