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
  gap: 8px;
`;

export const Button = styled.button<{ $active: boolean; $accentColor: string }>`
  border-radius: 999px;
  border: 1px solid
    ${({ $active, $accentColor }) => ($active ? $accentColor : "#d9c5aa")};
  background: ${({ $active, $accentColor }) =>
    $active ? $accentColor : "#fff9f0"};
  color: ${({ $active }) => ($active ? "#ffffff" : "#5a4735")};
  padding: 10px 12px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
`;
