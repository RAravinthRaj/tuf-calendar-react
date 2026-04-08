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

  @media (max-width: 768px) {
    width: ${(props) => (props?.$useModalLoader ? "100px" : "250px")};
    height: ${(props) => (props?.$useModalLoader ? "100px" : "250px")};
  }

  @media (max-width: 576px) {
    width: ${(props) => (props?.$useModalLoader ? "100px" : "180px")};
    height: ${(props) => (props?.$useModalLoader ? "100px" : "180px")};
  }
`;
