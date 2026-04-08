/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import * as S from "./styles";

export interface IError {
  subtitle?: string;
  buttonTitle?: string;
  onPress?: () => void;
}

export const Error = ({
  subtitle = "Something went wrong.",
  buttonTitle = "Retry",
  onPress,
}: IError) => {
  return (
    <S.Container>
      <S.Title>Error</S.Title>
      <S.Subtitle>{subtitle}</S.Subtitle>
      {onPress ? <S.Button onClick={onPress}>{buttonTitle}</S.Button> : null}
    </S.Container>
  );
};
