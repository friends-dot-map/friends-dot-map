import DisplayProfile from "./DisplayProfile";
import { render } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import { ProfileProvider } from "../../context/ProfileContext";
import { GroupProvider } from "../../context/GroupContext";
import { UserProvider } from "../../context/UserContext";
// const mockProfile = {
//     avatar: '🐶',
//     username: 'spongebob',
//     first_name: 'charles',
//     likes: 'snails',
//     status: 'rockin in the free world',
//     coords: {latitude: 69, longitude: 420},
// }

// const mockUser = {
//     id: 33,
//     email: 'billclinton@example.com',
//     password: 'ilovemonica',
// }

// jest.mock('../../context/ProfileContext')
// jest.mock('../../context/UserContext')


test('display profile renders', async () => {
    
    const { container } = render (
        <UserProvider>
            <ProfileProvider>
                <GroupProvider>
                    <MemoryRouter >
                        <DisplayProfile />
                    </MemoryRouter>
                </GroupProvider>
            </ProfileProvider>
        </UserProvider>
    
    );
  
    expect(container).toMatchSnapshot();

});