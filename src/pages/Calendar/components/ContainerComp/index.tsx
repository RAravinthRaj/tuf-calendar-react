/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import { ReactNode } from "react";
import { CALENDAR_CONFIG } from "../../config";
import * as S from "./styles";

export interface IContainerComp {
  heroSection: ReactNode;
  monthGrid: ReactNode;
  panelTabs: ReactNode;
  panelContent: ReactNode;
  overlayContent?: ReactNode;
  selectedDateLabel: string;
  themeLabel: string;
  themeMode: "light" | "dark";
  onThemeToggle: () => void;
  mobilePanelOpen: boolean;
  onCloseMobilePanel: () => void;
  direction: "next" | "prev";
}

export const ContainerComp = ({
  heroSection,
  monthGrid,
  panelTabs,
  panelContent,
  overlayContent,
  selectedDateLabel,
  themeLabel,
  themeMode,
  onThemeToggle,
  mobilePanelOpen,
  onCloseMobilePanel,
  direction,
}: IContainerComp) => {
  const { container } = CALENDAR_CONFIG.content;

  return (
    <S.Page>
      <S.MainContainer>
        <S.WallSheet>
          <S.Binder>
            {Array.from({ length: 20 }).map((_, index) => (
              <span key={index} />
            ))}
          </S.Binder>

          <S.CalendarCard $direction={direction}>
            {heroSection}
            <S.ContentSection>
              <S.ContentGrid>{monthGrid}</S.ContentGrid>
            </S.ContentSection>
          </S.CalendarCard>
        </S.WallSheet>

        <S.SidePanel>
          <S.PanelHeader>
            <S.PanelDate>{selectedDateLabel}</S.PanelDate>
            <S.ThemeChip $themeMode={themeMode} onClick={onThemeToggle}>
              {themeLabel}
            </S.ThemeChip>
          </S.PanelHeader>
          {panelTabs}
          {panelContent}
        </S.SidePanel>
      </S.MainContainer>

      {mobilePanelOpen ? (
        <S.MobilePanelOverlay onClick={onCloseMobilePanel}>
          <S.MobilePanelSheet onClick={(event) => event.stopPropagation()}>
            <S.MobilePanelTopBar>
              <S.PanelHeader>
                <S.PanelDate>{selectedDateLabel}</S.PanelDate>
                <S.ThemeChip $themeMode={themeMode} onClick={onThemeToggle}>
                  {themeLabel}
                </S.ThemeChip>
              </S.PanelHeader>
              <S.MobilePanelClose
                onClick={onCloseMobilePanel}
                aria-label={container.closeMobilePanelAriaLabel}
              >
                ×
              </S.MobilePanelClose>
            </S.MobilePanelTopBar>
            {panelTabs}
            {panelContent}
          </S.MobilePanelSheet>
        </S.MobilePanelOverlay>
      ) : null}
      {overlayContent}
    </S.Page>
  );
};
