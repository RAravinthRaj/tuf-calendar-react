/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import { ReactNode } from "react";
import * as S from "./styles";

export interface IContainerComp {
  heroSection: ReactNode;
  monthGrid: ReactNode;
  panelTabs: ReactNode;
  panelContent: ReactNode;
  overlayContent?: ReactNode;
  selectedDateLabel: string;
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
  mobilePanelOpen,
  onCloseMobilePanel,
  direction,
}: IContainerComp) => {
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
          </S.PanelHeader>
          <S.PanelBody>
            {panelTabs}
            {panelContent}
          </S.PanelBody>
        </S.SidePanel>
      </S.MainContainer>

      {mobilePanelOpen ? (
        <S.MobilePanelOverlay onClick={onCloseMobilePanel}>
          <S.MobilePanelSheet onClick={(event) => event.stopPropagation()}>
            <S.MobilePanelTopBar>
              <S.PanelHeader>
                <S.PanelDate>{selectedDateLabel}</S.PanelDate>
              </S.PanelHeader>
              <S.MobilePanelClose
                onClick={onCloseMobilePanel}
                aria-label="Close mobile panel"
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
