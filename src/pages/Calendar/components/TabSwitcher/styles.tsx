/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import styled from "styled-components";

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  padding: 6px;
  border-radius: 24px;
  background: rgba(255, 250, 242, 0.72);
  border: 1px solid rgba(168, 137, 100, 0.14);

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const Button = styled.button<{ $active: boolean; $accentColor: string }>`
  border-radius: 18px;
  border: 1px solid
    ${({ $active, $accentColor }) => ($active ? $accentColor : "rgba(180, 150, 118, 0.18)")};
  background: ${({ $active, $accentColor }) =>
    $active
      ? `linear-gradient(180deg, ${$accentColor}, ${$accentColor}dd)`
      : "rgba(255, 252, 247, 0.9)"};
  color: ${({ $active }) => ($active ? "#ffffff" : "#5a4735")};
  padding: 12px 12px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: ${({ $active }) =>
    $active ? "0 10px 18px rgba(0, 0, 0, 0.14)" : "none"};

  @media (max-width: 560px) {
    min-height: 44px;
  }
`;
