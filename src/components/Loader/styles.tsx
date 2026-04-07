/* 
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import styled from "styled-components";
import Lottie from "react-lottie-player";
import { Modal } from "react-bootstrap";

export const LoaderMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 20px;
`;

export const ModalContainer = styled(Modal)`
  background-color: rgba(0, 0, 0, 0.4);
`;

export const ModalInnerContainer = styled.div<{ $bgColor: string }>`
  background-color: ${(props) => props?.$bgColor};
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

export const LottieLoader = styled(Lottie)<{ $useModalLoader: boolean }>`
  width: ${(props) => (props?.$useModalLoader ? "100px" : "400px")};
  height: ${(props) => (props?.$useModalLoader ? "100px" : "400px")};

  @media (max-width: 576px) {
    width: ${(props) => (props?.$useModalLoader ? "100px" : "300px")};
    height: ${(props) => (props?.$useModalLoader ? "100px" : "300px")};
  }
`;

export const LoadingText = styled.div<{ $useModalLoader: boolean }>`
  margin: ${(props) => (props?.$useModalLoader ? "0 0 0 10px" : "-50px 0 0 0")};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: ${(props) => (props?.$useModalLoader ? "16px" : "18px")};
  letter-spacing: 0.2px;
  white-space: pre-line;
  text-align: center;

  @media (max-width: 576px) {
    margin: ${(props) =>
      props?.$useModalLoader ? "0 0 0 10px" : "-30px 0 0 0"};
  }
`;
