/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/
import { useTheme } from "../../../../hooks";
import { RoleContainer } from "../RolesContainer";
import * as S from "./styles";
import { ROLE_SELECTION_CONFIG } from "../../config";

export interface IContainerComp {
  Roles: any;
  onRoleSelection(role: string): void;
}

export const ContainerComp = ({ Roles, onRoleSelection }: IContainerComp) => {
  const theme = useTheme();

  return (
    <S.MainContainer>
      <S.Logo src={theme.images.logo} />
      <S.SelectionText>{ROLE_SELECTION_CONFIG.title}</S.SelectionText>
      <S.SelectionSubText $bgColor={theme.colors.textSecondary}>
        {ROLE_SELECTION_CONFIG.subTitle}
      </S.SelectionSubText>
      <RoleContainer Roles={Roles} onRoleSelection={onRoleSelection} />
    </S.MainContainer>
  );
};
