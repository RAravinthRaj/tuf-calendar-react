/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import styled from "styled-components";
import { css, keyframes } from "styled-components";

const flipInNext = keyframes`
  from {
    opacity: 0.45;
    transform: perspective(1200px) rotateY(-14deg) scale(0.985);
    transform-origin: left center;
  }

  to {
    opacity: 1;
    transform: perspective(1200px) rotateY(0deg) scale(1);
    transform-origin: left center;
  }
`;

const flipInPrev = keyframes`
  from {
    opacity: 0.45;
    transform: perspective(1200px) rotateY(14deg) scale(0.985);
    transform-origin: right center;
  }

  to {
    opacity: 1;
    transform: perspective(1200px) rotateY(0deg) scale(1);
    transform-origin: right center;
  }
`;

export const HeroWrapper = styled.div<{ $direction: "next" | "prev" }>`
  position: relative;
  width: 100%;
  height: clamp(180px, 24vh, 250px);
  min-height: 180px;
  max-height: 250px;
  overflow: hidden;
  border-radius: 20px 20px 0 0;
  isolation: isolate;
  animation: ${({ $direction }) =>
    $direction === "next"
      ? css`${flipInNext} 520ms cubic-bezier(0.22, 1, 0.36, 1)`
      : css`${flipInPrev} 520ms cubic-bezier(0.22, 1, 0.36, 1)`};

  @media (max-width: 1100px) {
    height: clamp(170px, 22vh, 220px);
    min-height: 170px;
    max-height: 220px;
  }

  @media (max-width: 980px) {
    height: clamp(210px, 32vw, 270px);
    min-height: 210px;
    max-height: 270px;
  }

  @media (max-width: 768px) {
    height: clamp(200px, 52vw, 280px);
    min-height: 200px;
    max-height: 280px;
    border-radius: 22px 22px 0 0;
  }

  @media (max-width: 480px) {
    height: clamp(180px, 56vw, 240px);
    min-height: 180px;
    max-height: 240px;
  }
`;

export const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 34%;
  display: block;
  transform: scale(1.02);
  filter: saturate(1.02) contrast(1.01);

  @media (max-width: 980px) {
    object-position: center 32%;
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    object-position: center 30%;
    transform: scale(1.01);
  }

  @media (max-width: 480px) {
    object-position: center 28%;
    transform: scale(1);
  }
`;

export const WaveCut = styled.div<{ $accentColor: string }>`
  position: absolute;
  left: -2%;
  right: -2%;
  bottom: -1px;
  height: 52px;
  background:
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.08) 30%,
      var(--sheet-bg) 100%
    );
  clip-path: path("M0 34 C 110 8, 220 8, 330 32 C 440 56, 560 56, 670 32 C 780 8, 900 8, 1010 32 C 1120 56, 1235 56, 1340 34 L 1340 120 L 0 120 Z");
  z-index: 2;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.16);

  &::after {
    content: "";
    position: absolute;
    inset: auto 0 0;
    height: 16px;
    background: linear-gradient(
      90deg,
      ${({ $accentColor }) => `${$accentColor}1f`} 0%,
      transparent 18%,
      transparent 82%,
      ${({ $accentColor }) => `${$accentColor}1a`} 100%
    );
  }

  @media (max-width: 768px) {
    height: 40px;
  }

  @media (max-width: 480px) {
    height: 32px;
  }
`;
