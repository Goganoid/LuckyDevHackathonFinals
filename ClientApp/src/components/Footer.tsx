import type { FunctionComponent } from 'react';
import styled from 'styled-components';
const logo = require('../assets/logo.png');

const BrandContent = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: Inter;
  font-style: italic;
  word-spacing: 0.05rem;
`;

const StyledFooter = styled.footer`
  position: relative;
  width: 100%;
  display: block;
  font-size: 1rem;
  padding: 1.5rem 1.75rem;
  margin-top: 20px;

  background-color: #8639E8;
  color: #fff;

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