/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import * as S from "./styles";

export interface IHeroSection {
  heroImage: string;
  monthLabel: string;
  accentColor: string;
  direction: "next" | "prev";
}

export const HeroSection = ({
  heroImage,
  monthLabel,
  accentColor,
  direction,
}: IHeroSection) => {
  return (
    <S.HeroWrapper $direction={direction}>
      <S.HeroImage src={heroImage} alt={monthLabel} />
      <S.WaveCut $accentColor={accentColor} />
    </S.HeroWrapper>
  );
};
