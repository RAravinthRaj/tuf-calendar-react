/* 
© 2025 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2025.
*/
import { apolloClient } from "../../../../clients";
import { getGraphqlError } from "../../../../utils";
import { GET_ACCESS_TOKEN } from "./queries/getAccessToken.query";

export const getAccessToken = async (role: string) => {
  try {
    const { data } = await apolloClient.query({
      query: GET_ACCESS_TOKEN,
      fetchPolicy: "no-cache",
      variables: {
        role,
      },
    });

    return { payload: data?.getAccessToken };
  } catch (err: any) {
    let msg = getGraphqlError(err) || "An error occurred while fetching roles.";

    console.error("Error in getAccessToken: ", msg);
    throw new Error(msg);
  }
};
