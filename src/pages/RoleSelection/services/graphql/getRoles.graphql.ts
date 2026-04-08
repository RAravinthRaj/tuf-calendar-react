/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/
import { apolloClient } from "../../../../clients";
import { getGraphqlError } from "../../../../utils";
import { GET_ROLES } from "./queries/getRoles.query";

export const getRoles = async () => {
  try {
    const { data } = await apolloClient.query({
      query: GET_ROLES,
      fetchPolicy: "no-cache",
    });

    return { payload: data?.getRoles };
  } catch (err: any) {
    let msg = getGraphqlError(err) || "An error occurred while fetching roles.";

    console.error("Error in getRoles: ", msg);
    throw new Error(msg);
  }
};
