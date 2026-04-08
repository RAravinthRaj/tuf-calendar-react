/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/
import { useNavigate } from "react-router-dom";
import { ContainerComp } from "./components";
import { useGetAccessTokenStore, useGetRolesStore } from "./stores";
import { Error, Loader } from "../../components";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { fetchSessionUser } from "../../utils";
import { ROLE_SELECTION_CONFIG } from "./config";

const RoleSelection = () => {
  const { getRolesResponse, getRolesError, fetchGetRoles, resetGetRoles } =
    useGetRolesStore();

  const {
    getAccessTokenResponse,
    getAccessTokenError,
    fetchGetAccessToken,
    resetGetAccessToken,
    getAccessTokenLoading,
  } = useGetAccessTokenStore();

  const navigate = useNavigate();

  useEffect(() => {
    resetGetRoles();
    fetchGetRoles();
  }, []);

  useEffect(() => {
    if (getRolesResponse?.payload?.length === 1 && getRolesResponse.payload[0] === "customer") {
      const syncSessionAndNavigate = async () => {
        await fetchSessionUser();
        toast.success(` customer`);
        navigate("/");
        resetGetRoles();
        resetGetAccessToken();
      };

      void syncSessionAndNavigate();
    }
  }, [getRolesResponse]);

  useEffect(() => {
    return () => {
      resetGetAccessToken();
      resetGetRoles();
    };
  }, []);

  useEffect(() => {
    if (getAccessTokenResponse?.payload?.role) {
      const msg = `${ROLE_SELECTION_CONFIG.loginToast} ${getAccessTokenResponse.payload.role}`;
      const syncSessionAndNavigate = async () => {
        await fetchSessionUser();
        toast.success(msg);
        navigate("/");
        resetGetRoles();
        resetGetAccessToken();
      };

      syncSessionAndNavigate();
    }
  }, [getAccessTokenResponse]);

  useEffect(() => {
    if (getAccessTokenError) {
      resetGetAccessToken();
      toast.error(getAccessTokenError);
    }
  }, [getAccessTokenError]);

  const _onHandleRoleSelection = (role: string) => {
    resetGetAccessToken();
    resetGetRoles();
    fetchGetAccessToken(role);
  };

  const _renderLoader = () =>
    getAccessTokenLoading ? <Loader useModalLoader /> : null;

  const _renderPage = () => {
    if (getAccessTokenLoading) return <Loader />;

    if (getRolesResponse?.payload) {
      return (
        <ContainerComp
          Roles={getRolesResponse.payload}
          onRoleSelection={_onHandleRoleSelection}
        />
      );
    }

    if (getRolesError) {
      return (
        <Error
          subtitle={getRolesError}
          buttonTitle="Retry"
          onPress={() => {
            resetGetRoles();
            fetchGetRoles();
          }}
        />
      );
    }

    return <Loader />;
  };

  return (
    <>
      {_renderLoader()}
      {_renderPage()}
    </>
  );
};

export default RoleSelection;
