/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import styled from "styled-components";
import { css, keyframes } from "styled-components";

const tearPageNext = keyframes`
  0% {
    opacity: 0.55;
    transform: perspective(1600px) rotateX(8deg) rotateY(-8deg) translateY(-24px) scale(0.985);
    transform-origin: top center;
    filter: saturate(0.88);
  }

  55% {
    opacity: 1;
    transform: perspective(1600px) rotateX(-2deg) rotateY(1deg) translateY(6px) scale(1.006);
    transform-origin: top center;
  }

  100% {
    opacity: 1;
    transform: perspective(1600px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1);
    transform-origin: top center;
    filter: saturate(1);
  }
`;

const tearPagePrev = keyframes`
  0% {
    opacity: 0.55;
    transform: perspective(1600px) rotateX(8deg) rotateY(8deg) translateY(-24px) scale(0.985);
    transform-origin: top center;
    filter: saturate(0.88);
  }

  55% {
    opacity: 1;
    transform: perspective(1600px) rotateX(-2deg) rotateY(-1deg) translateY(6px) scale(1.006);
    transform-origin: top center;
  }

  100% {
    opacity: 1;
    transform: perspective(1600px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1);
    transform-origin: top center;
    filter: saturate(1);
  }
`;

export const Page = styled.main`
  min-height: 100vh;
  padding: 22px 20px;
  background:
    radial-gradient(circle at top, var(--app-radial), transparent 34%),
    var(--app-bg);

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const MainContainer = styled.section`
  max-width: 1700px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1.9fr) minmax(320px, 0.82fr);
  gap: 26px;
  align-items: start;

  @media (max-width: 1120px) {
    grid-template-columns: 1fr;
  }
`;

export const WallSheet = styled.div`
  position: relative;
  padding-top: 36px;
`;

export const Binder = styled.div`
  position: absolute;
  top: 0;
  left: 40px;
  right: 40px;
  height: 34px;
  display: flex;
  justify-content: space-between;
  pointer-events: none;

  span {
    width: 18px;
    height: 18px;
    border: 3px solid var(--ring);
    border-radius: 999px;
    border-bottom-color: transparent;
    background: transparent;
  }

  @media (max-width: 768px) {
    left: 18px;
    right: 18px;

    span {
      width: 14px;
      height: 14px;
      border-width: 2px;
    }
  }
`;

export const CalendarCard = styled.div<{ $direction: "next" | "prev" }>`
  border-radius: 8px;
  overflow: hidden;
  background: var(--sheet-bg);
  box-shadow:
    0 28px 50px var(--sheet-shadow),
    0 8px 18px rgba(66, 47, 22, 0.08);
  position: relative;
  animation: ${({ $direction }) =>
    $direction === "next"
      ? css`${tearPageNext} 700ms cubic-bezier(0.2, 0.9, 0.2, 1)`
      : css`${tearPagePrev} 700ms cubic-bezier(0.2, 0.9, 0.2, 1)`};
`;

export const ContentSection = styled.div`
  padding: 0 34px 30px;

  @media (max-width: 768px) {
    padding: 0 12px 14px;
  }
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const SidePanel = styled.aside`
  border-radius: 28px;
  background: var(--panel-bg);
  border: 1px solid var(--panel-border);
  box-shadow: 0 24px 44px rgba(66, 47, 22, 0.12);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const PanelDate = styled.h2`
  margin: 0;
  color: var(--panel-text);
  font-size: clamp(1.3rem, 2.8vw, 1.8rem);
  line-height: 1.15;
  font-family: "Source Serif Pro", Georgia, serif;
`;

export const ThemeChip = styled.button`
  border: 1px solid var(--control-border);
  background: var(--control-bg);
  color: var(--panel-text);
  border-radius: 999px;
  padding: 10px 14px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
`;

export const MobilePanelOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1200;
  display: none;
  align-items: flex-end;
  justify-content: center;
  padding: 12px;
  background: rgba(25, 18, 10, 0.44);
  backdrop-filter: blur(8px);

  @media (max-width: 768px) {
    display: flex;
  }
`;

export const MobilePanelSheet = styled.div`
  width: min(100%, 560px);
  max-height: calc(100vh - 24px);
  overflow-y: auto;
  border-radius: 28px 28px 20px 20px;
  background: var(--panel-bg);
  border: 1px solid var(--panel-border);
  box-shadow: 0 24px 44px rgba(66, 47, 22, 0.2);
  padding: 16px 12px 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
`;

export const MobilePanelClose = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 34px;
  height: 34px;
  border: 1px solid var(--control-border);
  border-radius: 999px;
  background: var(--control-bg);
  color: var(--panel-text);
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
`;
