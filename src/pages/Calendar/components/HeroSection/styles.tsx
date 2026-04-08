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
  aspect-ratio: 1200 / 760;
  min-height: 0;
  max-height: 540px;
  overflow: hidden;
  animation: ${({ $direction }) =>
    $direction === "next"
      ? css`${flipInNext} 520ms cubic-bezier(0.22, 1, 0.36, 1)`
      : css`${flipInPrev} 520ms cubic-bezier(0.22, 1, 0.36, 1)`};

  @media (max-width: 768px) {
    max-height: 260px;
  }
`;

export const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const WaveBase = styled.div`
  position: absolute;
  left: -2%;
  right: -2%;
  bottom: 0;
  height: 124px;
  background: var(--sheet-bg);
  clip-path: path("M0 52 C 110 8, 210 8, 320 52 C 432 97, 548 98, 662 54 C 778 10, 892 10, 1008 54 C 1120 96, 1230 96, 1340 52 L 1340 180 L 0 180 Z");

  @media (max-width: 768px) {
    height: 72px;
  }
`;

export const WaveAccent = styled.div<{ $accentColor: string }>`
  position: absolute;
  inset: auto 0 0 0;
  height: 134px;
  background:
    linear-gradient(135deg, ${({ $accentColor }) => $accentColor} 0 50%, transparent 50% 100%) left bottom / 28% 100% no-repeat,
    linear-gradient(225deg, ${({ $accentColor }) => $accentColor} 0 52%, transparent 52% 100%) right bottom / 33% 100% no-repeat;
  pointer-events: none;

  @media (max-width: 768px) {
    height: 82px;
  }
`;
