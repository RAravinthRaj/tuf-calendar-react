/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  text-align: center;
`;

export const Title = styled.h1`
  margin: 0 0 12px;
  font-family: "Source Serif Pro", Georgia, serif;
  color: #3d2f22;
`;

export const Subtitle = styled.p`
  margin: 0 0 18px;
  color: #6f6558;
  max-width: 420px;
`;

export const Button = styled.button`
  border: none;
  border-radius: 999px;
  background: #6f4e33;
  color: #fff;
  padding: 12px 18px;
  cursor: pointer;
`;
