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
  padding: 24px 22px 30px;
  background:
    radial-gradient(circle at top, var(--app-radial), transparent 34%),
    radial-gradient(circle at 85% 12%, rgba(255, 255, 255, 0.2), transparent 18%),
    var(--app-bg);

  @media (max-width: 768px) {
    padding: 12px 10px 24px;
  }
`;

export const MainContainer = styled.section`
  max-width: 1720px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1.8fr) minmax(340px, 0.86fr);
  gap: 28px;
  align-items: start;

  @media (max-width: 1220px) {
    grid-template-columns: minmax(0, 1.55fr) minmax(320px, 0.95fr);
    gap: 22px;
  }

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    gap: 18px;
  }
`;

export const WallSheet = styled.div`
  position: relative;
  padding-top: 36px;

  @media (max-width: 980px) {
    padding-top: 28px;
  }
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
  border-radius: 18px;
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

  @media (max-width: 980px) {
    border-radius: 22px;
  }
`;

export const ContentSection = styled.div`
  padding: 0 30px 30px;

  @media (max-width: 1100px) {
    padding: 0 22px 24px;
  }

  @media (max-width: 768px) {
    padding: 0 14px 18px;
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
  position: sticky;
  top: 20px;
  max-height: calc(100vh - 40px);
  overflow: auto;

  @media (max-width: 980px) {
    position: static;
    top: auto;
    max-height: none;
    overflow: visible;
    border-radius: 24px;
    padding: 16px;
    gap: 14px;
  }
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  @media (max-width: 640px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const PanelDate = styled.h2`
  margin: 0;
  color: var(--panel-text);
  font-size: clamp(1.3rem, 2.8vw, 1.8rem);
  line-height: 1.15;
  font-family: "Source Serif Pro", Georgia, serif;
`;

export const ThemeChip = styled.button<{ $themeMode: "light" | "dark" }>`
  border: 1px solid
    ${({ $themeMode }) => ($themeMode === "light" ? "#141414" : "#f5f1e8")};
  background: ${({ $themeMode }) =>
    $themeMode === "light" ? "#141414" : "#f5f1e8"};
  color: ${({ $themeMode }) => ($themeMode === "light" ? "#ffffff" : "#141414")};
  border-radius: 999px;
  padding: 10px 14px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;

  @media (max-width: 640px) {
    align-self: stretch;
    min-height: 42px;
  }
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
`;

export const MobilePanelTopBar = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;

  ${PanelHeader} {
    flex: 1;
  }
`;

export const MobilePanelClose = styled.button`
  width: 34px;
  height: 34px;
  flex: 0 0 34px;
  border: 1px solid var(--control-border);
  border-radius: 999px;
  background: var(--control-bg);
  color: var(--panel-text);
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
`;
