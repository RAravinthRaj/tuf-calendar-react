/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/
import * as S from "./styles";
import { useTheme } from "../../../../hooks";
import { useState } from "react";
import { toast } from "react-toastify";
import { ROLE_SELECTION_CONFIG } from "../../config";

export interface IRoleSelection {
  Roles: any;
  onRoleSelection(role: string): void;
}

export const RoleContainer = ({ Roles, onRoleSelection }: IRoleSelection) => {
  const theme = useTheme();

  const [activeRole, setActiveRole] = useState<string | null>(null);

  const handleClick = (role: string) => {
    setActiveRole((prev) => (prev === role ? null : role));
  };

  const login = () => {
    if (activeRole !== null) {
      onRoleSelection(activeRole);
    } else {
      toast.info(ROLE_SELECTION_CONFIG.warnToast);
    }
  };

  const _rolesContainer = () => {
    return (
      <S.RoleContainer $bgColor={theme.colors.backGround}>
        {Roles.map((role: string) => {
          const isActive = activeRole === role;

          return (
            <S.IconHolder
              $bgColor={theme.colors.secondaryBackGround}
              $hoverBgColor={theme.colors.tertiary}
              $textColor={theme.colors.primary}
              onClick={() => handleClick(role)}
              $isActive={isActive}
              key={role}
            >
              <S.Icon
                src={((theme.images as unknown) as Record<string, string>)[role]}
              />
              <S.RoleText $bgColor={theme.colors.primary}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </S.RoleText>
            </S.IconHolder>
          );
        })}
      </S.RoleContainer>
    );
  };

  const _chooseRoleButton = () => {
    return (
      <S.SelectionButton
        $bgColor={theme.colors.primary}
        onClick={() => login()}
      >
        {ROLE_SELECTION_CONFIG.continueButton}
      </S.SelectionButton>
    );
  };

  return (
    <S.Container $bgColor={theme.colors.backGround}>
      {_rolesContainer()}
      {_chooseRoleButton()}
    </S.Container>
  );
};
