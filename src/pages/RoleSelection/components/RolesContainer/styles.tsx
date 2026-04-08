/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/
import styled from "styled-components";

export const Container = styled.div<{ $bgColor: string }>`
  background-color: ${($props) => $props?.$bgColor};
  width: 85%;
  padding-bottom: 45px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin: 30px;

  @media (max-width: 768px) {
    margin: 20px;
  }

  @media (max-width: 576px) {
    margin: 20px;
    padding-bottom: 30px;
  }
`;

export const RoleContainer = styled.div<{ $bgColor: string }>`
  flex: 3;
  background-color: ${($props) => $props?.$bgColor};
  width: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 60px;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-bottom: 40px;
    width: 55%;
  }

  @media (max-width: 576px) {
    flex-direction: column;
    margin-bottom: 40px;
    width: 55%;
    margin: 20px;
  }
`;

export const Icon = styled.img`
  width: 50%;
  height: 50%;
  filter: brightness(0) invert(0);
  transition: filter 0.3s ease;
`;

export const RoleText = styled.div<{ $bgColor: string }>`
  text-align: center;
  font-size: 18px;
  margin-top: 10px;
  font-weight: 500;
`;

export const IconHolder = styled.div<{
  $bgColor: string;
  $hoverBgColor: string;
  $textColor: string;
  $isActive: boolean;
}>`
  background-color: ${($props) => $props?.$bgColor};
  padding: 25px 0 18px 0;
  margin: 0 30px 0 30px;
  border: solid 2px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${($props) => $props?.$hoverBgColor};
    border: solid 3px ${($props) => $props?.$textColor};
    transform: scale(1.05);

    ${Icon} {
      filter: invert(20%) sepia(94%) saturate(1500%) hue-rotate(220deg)
        brightness(80%) contrast(150%);
    }

    ${RoleText} {
      color: ${($props) => $props?.$textColor};
    }
  }

  ${({ $isActive, $hoverBgColor: $hoverBgColor, $textColor }) =>
    $isActive &&
    `
    background-color: ${$hoverBgColor};
    border: solid 3px ${$textColor};
    transform: scale(1.05);
    
    ${Icon} {
      filter: invert(20%) sepia(94%) saturate(1500%) hue-rotate(220deg)
        brightness(80%) contrast(150%);
    }

    ${RoleText} {
      color: ${$textColor};
    }
    `};

  @media (max-width: 768px) {
    margin: 15px;
  }

  @media (max-width: 576px) {
    width: 100%;
    margin: 15px;
  }
`;

export const SelectionButton = styled.button<{ $bgColor: string }>`
  background-color: ${(props) => props?.$bgColor};
  color: white;
  border: none;
  width: 40%;
  height: 45px;
  padding: 10px;
  outline: none;
  font-size: 16px;
  letter-spacing: 0.6px;
  text-align: center;
  font-weight: 600;
  border-radius: 7px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease, transform 0.2s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    transform: translateY(-2px);
  }

  @media (max-width: 576px) {
    width: 70%;
    height: 45px;
  }
`;
