/* 
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.  
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
export const fetchSessionUser = async () => {
  return null;
};

export const getGraphqlError = (err: any) => {
  return (
    err?.graphQLErrors?.[0]?.message ||
    err?.networkError?.message ||
    err?.message ||
    null
  );
};
