/* 
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import { lazy } from "react";
import { useTheme } from "../../hooks";
import * as S from "./styles";
import { useState } from "react";

export interface ILoader {
  loadingText?: string;
  useModalLoader?: boolean;
}

const LottieAnimation = (props: any) => {
  const theme = useTheme();

  return (
    <S.LottieLoader
      $useModalLoader={props.$useModalLoader}
      animationData={theme.lotties.loader}
      rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
      {...props}
    />
  );
};

const LazyLottieAnimation = lazy(() =>
  Promise.resolve({ default: LottieAnimation }),
);

export const Loader = ({
  loadingText = "Request in progress.\nPlease wait...",
  useModalLoader = false,
}: ILoader) => {
  const theme = useTheme();
  const [visible, setVisible] = useState(true);

  if (useModalLoader) {
    return (
      <S.ModalContainer
        show={visible}
        backdrop="static"
        keyboard={false}
        onHide={() => setVisible(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <S.ModalInnerContainer $bgColor={theme.colors.white}>
          <LazyLottieAnimation loop play $useModalLoader={useModalLoader} />
        </S.ModalInnerContainer>
      </S.ModalContainer>
    );
  }

  return (
    <S.LoaderMainContainer aria-label={loadingText} role="status">
      <LazyLottieAnimation loop play $useModalLoader={useModalLoader} />
    </S.LoaderMainContainer>
  );
};
