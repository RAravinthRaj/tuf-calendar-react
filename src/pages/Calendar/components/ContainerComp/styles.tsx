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
  min-height: 100dvh;
  height: 100dvh;
  padding: 18px;
  background:
    radial-gradient(circle at 12% 8%, rgba(255, 246, 228, 0.72), transparent 20%),
    radial-gradient(circle at 82% 14%, rgba(255, 255, 255, 0.2), transparent 18%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.08), transparent 26%),
    var(--app-bg);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 32px auto auto -60px;
    width: 220px;
    height: 220px;
    border-radius: 36px;
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.18), transparent 70%);
    transform: rotate(14deg);
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    right: -40px;
    top: 220px;
    width: 180px;
    height: 180px;
    border-radius: 999px;
    background: radial-gradient(circle, rgba(201, 164, 115, 0.22), transparent 68%);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    min-height: 100vh;
    min-height: 100dvh;
    height: auto;
    padding: 12px 10px 24px;
    overflow: visible;

    &::before,
    &::after {
      display: none;
    }
  }
`;

export const MainContainer = styled.section`
  max-width: 1720px;
  margin: 0 auto;
  height: 100%;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 1.72fr) minmax(360px, 0.78fr);
  gap: 34px;
  align-items: stretch;
  position: relative;

  @media (max-width: 1220px) {
    grid-template-columns: minmax(0, 1.55fr) minmax(320px, 0.95fr);
    gap: 22px;
  }

  @media (max-width: 980px) {
    height: auto;
    grid-template-columns: 1fr;
    gap: 18px;
  }
`;

export const WallSheet = styled.div`
  position: relative;
  height: 100%;
  min-height: 0;
  padding-top: 24px;

  @media (max-width: 980px) {
    padding-top: 18px;
    height: auto;
  }
`;

export const Binder = styled.div`
  position: absolute;
  top: 0;
  left: 30px;
  right: 30px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
  z-index: 2;

  span {
    width: 24px;
    height: 24px;
    border: 4px solid var(--ring);
    border-radius: 999px;
    border-bottom-color: transparent;
    background: transparent;
    transform: translateY(8px);
  }

  @media (max-width: 768px) {
    left: 14px;
    right: 14px;
    height: 22px;

    span {
      width: 16px;
      height: 16px;
      border-width: 3px;
      transform: translateY(3px);
    }

    span:nth-child(even) {
      display: none;
    }
  }
`;

export const CalendarCard = styled.div<{ $direction: "next" | "prev" }>`
  height: 100%;
  min-height: 0;
  border-radius: 22px;
  overflow: hidden;
  background: var(--sheet-bg);
  box-shadow:
    0 34px 58px var(--sheet-shadow),
    0 12px 24px rgba(66, 47, 22, 0.12);
  position: relative;
  border: 1px solid rgba(140, 108, 72, 0.14);
  display: flex;
  flex-direction: column;
  animation: ${({ $direction }) =>
    $direction === "next"
      ? css`${tearPageNext} 700ms cubic-bezier(0.2, 0.9, 0.2, 1)`
      : css`${tearPagePrev} 700ms cubic-bezier(0.2, 0.9, 0.2, 1)`};

  &::before {
    content: "";
    position: absolute;
    inset: 16px 0 0;
    border-top: 3px solid rgba(140, 108, 72, 0.18);
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.08), transparent 24%),
      linear-gradient(90deg, rgba(117, 88, 58, 0.06), transparent 22%);
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    right: -22px;
    bottom: 28px;
    width: 120px;
    height: 120px;
    border-radius: 24px;
    background: rgba(255, 255, 255, 0.12);
    transform: rotate(18deg);
    pointer-events: none;
  }

  @media (max-width: 980px) {
    height: auto;
    border-radius: 22px;

    &::after {
      display: none;
    }
  }
`;

export const ContentSection = styled.div`
  flex: 1;
  min-height: 0;
  padding: 0 28px 28px;
  display: flex;

  @media (max-width: 1100px) {
    padding: 0 22px 22px;
  }

  @media (max-width: 768px) {
    padding: 0 14px 18px;
  }
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  width: 100%;
  min-height: 0;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const SidePanel = styled.aside`
  height: 100%;
  min-height: 0;
  border-radius: 32px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.78), rgba(255, 248, 237, 0.88)),
    var(--panel-bg);
  border: 1px solid rgba(130, 101, 66, 0.12);
  box-shadow:
    0 30px 56px rgba(66, 47, 22, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.32);
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  position: sticky;
  top: 0;
  max-height: 100%;
  overflow: hidden;
  margin-top: 0;

  &::before {
    content: "";
    position: absolute;
    inset: 14px;
    border: 1px dashed rgba(160, 132, 98, 0.18);
    border-radius: 26px;
    pointer-events: none;
  }

  @media (max-width: 980px) {
    position: static;
    top: auto;
    height: auto;
    max-height: none;
    overflow: visible;
    border-radius: 24px;
    padding: 16px;
    gap: 14px;
    margin-top: 0;

    &::before {
      display: none;
    }
  }
`;

export const PanelBody = styled.div`
  position: relative;
  z-index: 1;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 18px;
  overflow-y: auto;
  padding-right: 2px;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    display: none;
  }

  @media (max-width: 980px) {
    overflow: visible;
    padding-right: 0;
  }
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  position: relative;
  z-index: 1;

  @media (max-width: 640px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const PanelDate = styled.h2`
  margin: 0;
  color: var(--panel-text);
  font-size: clamp(1.34rem, 2.9vw, 1.92rem);
  line-height: 1.05;
  letter-spacing: 0.02em;
  font-family: "Source Serif Pro", Georgia, serif;
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
