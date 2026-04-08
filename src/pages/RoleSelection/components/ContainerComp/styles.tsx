/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/
import { Container } from "react-bootstrap";
import styled from "styled-components";

export const MainContainer = styled(Container)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 20px;
  }

  @media (max-width: 576px) {
    flex-direction: column;
    margin-top: 20px;
  }
`;

export const Logo = styled.img`
  height: 75px;
  width: 80px;
  align-self: flex-start;

  @media (max-width: 768px) {
    height: 65px;
    width: 70px;
  }

  @media (max-width: 576px) {
    height: 50px;
    width: 50px;
    margin-top: -20px;
  }
`;

export const SelectionText = styled.h4`
  font-size: 48px;
  font-weight: 500;
  text-align: center;
  margin-top: -40px;

  @media (max-width: 768px) {
    font-size: 40px;
  }

  @media (max-width: 576px) {
    font-size: 32px;
    margin-top: 20px;
  }
`;

export const SelectionSubText = styled.h6<{ $bgColor: string }>`
  font-size: 16px;
  text-align: center;
  color: ${($props) => $props?.$bgColor};

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 576px) {
    font-size: 12px;
  }
`;
