import './App.css';
import { useRequest } from './core/api';
import { useState } from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useAccount, useMsal } from '@azure/msal-react';

export const App = () => {
  const get = useRequest();
  const [colour, setColour] = useState<any>();
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] || {});
  console.log(colour);
  
  const fetch = () => {
    get("https://localhost:7116/FavouriteColour").then(v => v.text().then(t => setColour(t)));
  }

  const logout = () => {
    instance.logout();
  }

  const login = () => {
    instance.loginRedirect();
  }

  return (
    <div className="App">
      <header className="App-header">
        <AuthenticatedTemplate>
          <span>Logget inn som {account?.username}</span>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <span>Du er ikke logget inn</span>
        </UnauthenticatedTemplate>
        <span style={{height: 100}} />
        <AuthenticatedTemplate>
        {!colour && (
          <button className='get-colour-button' onClick={fetch}>Hent din farge!</button>
        )}
        {colour && 
          <div className='colour-square' style={{
            backgroundColor: colour,
          }}>
            <span style={{fontSize: 26}}>
              Din farge er {colour}
            </span>
          </div>
        }
          <span style={{height: 100}} />
          <button className='log-out-button' onClick={logout}>Logg ut</button>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>

          <button className='log-in-button' onClick={login}>Logg inn</button>
        </UnauthenticatedTemplate>
      </header>
    </div>
  );
}
