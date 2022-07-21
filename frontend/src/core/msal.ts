import { AuthenticationResult, Configuration } from "@azure/msal-browser";
import { useAccount, useMsal } from "@azure/msal-react";

// Burde lagres et bedre sted, f.eks .env fil
const CLIENT_ID = "91e24aa6-8506-4e2c-a4b6-d5d936041383";
const SCOPES = ['api://91e24aa6-8506-4e2c-a4b6-d5d936041383/access'];
const AUTHOROTY = 'https://login.microsoftonline.com/30efef2c-0c18-422d-b256-ccbbc4dce7a6';

export const msalConf: Configuration = {
  auth: {
    clientId: CLIENT_ID,
    authority: AUTHOROTY,
  }
};

/**
 * Ensures the user is logged in
 * 
 * @returns A promise which resolves as true if the user is logged in (now)
 */
export const useLogin = (): () => Promise<AuthenticationResult> => {
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] || {});
  return () => {
    return new Promise<AuthenticationResult>((resolve, reject) => {
      if (account) {
        instance.acquireTokenSilent({
          scopes: SCOPES,
          account: account
        }).then((response) => {
          if(response) {
            resolve(response);
          }
        }).catch(r => reject(r));
      }
      else {
        instance.loginPopup()
          .then(res => resolve(res))
          .catch(r => reject(r));
      }
    })
  }
}
