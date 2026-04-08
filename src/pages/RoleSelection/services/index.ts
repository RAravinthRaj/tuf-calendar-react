/*
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/
import { getAccessToken, getRoles } from "./graphql";

class RoleSelectionService {
  private static instance: RoleSelectionService;

  private constructor() {}

  static getInstance(): RoleSelectionService {
    if (!RoleSelectionService.instance) {
      RoleSelectionService.instance = new RoleSelectionService();
    }
    return RoleSelectionService.instance;
  }

  async getRolesAPI(): Promise<any> {
    const res = await getRoles();
    return res;
  }

  async getAccessTokenAPI(role: string): Promise<any> {
    const res = await getAccessToken(role);
    return res;
  }
}

export default RoleSelectionService.getInstance();
