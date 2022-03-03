import { render } from 'react-dom';
import { UserProvider } from './context/SomethingElse';
import { ProfileProvider } from './context/ProfileContext';
import { GroupProvider } from './context/GroupContext';
import App from './App';
import 'mapbox-gl/dist/mapbox-gl.css';
import './style.css';

render(
  <React.StrictMode>
    <UserProvider>
      <ProfileProvider>
        <GroupProvider>
          <App />
        </GroupProvider>
      </ProfileProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
