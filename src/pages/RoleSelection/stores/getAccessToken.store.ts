/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/
import { create } from "zustand";
import RoleSelectionService from "../services";

type State = {
  getAccessTokenLoading: boolean;
  getAccessTokenResponse: any | null;
  getAccessTokenError: string | null;
  fetchGetAccessToken: (role: string) => Promise<void>;
  resetGetAccessToken: () => void;
};

export const useGetAccessTokenStore = create<State>((set) => ({
  getAccessTokenLoading: false,
  getAccessTokenResponse: null,
  getAccessTokenError: null,

  fetchGetAccessToken: async (role: string) => {
    try {
      set({ getAccessTokenLoading: true, getAccessTokenError: null });
      const res = await RoleSelectionService.getAccessTokenAPI(role);
      set({ getAccessTokenResponse: res });
    } catch (err: any) {
      set({ getAccessTokenError: err?.message });
    } finally {
      set({ getAccessTokenLoading: false });
    }
  },

  resetGetAccessToken: () => {
    set({
      getAccessTokenLoading: false,
      getAccessTokenResponse: null,
      getAccessTokenError: null,
    });
  },
}));
