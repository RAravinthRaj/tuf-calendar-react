/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import { CalendarTabKey } from "../../config";
import * as S from "./styles";

export interface ITabSwitcher {
  tabs: Array<{ key: CalendarTabKey; label: string }>;
  activeTab: CalendarTabKey;
  accentColor: string;
  onTabPress: (tab: CalendarTabKey) => void;
}

export const TabSwitcher = ({
  tabs,
  activeTab,
  accentColor,
  onTabPress,
}: ITabSwitcher) => {
  return (
    <S.Row>
      {tabs.map((tab) => (
        <S.Button
          key={tab.key}
          $active={activeTab === tab.key}
          $accentColor={accentColor}
          onClick={() => onTabPress(tab.key)}
        >
          {tab.label}
        </S.Button>
      ))}
    </S.Row>
  );
};
