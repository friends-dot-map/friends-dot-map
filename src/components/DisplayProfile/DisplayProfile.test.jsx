import DisplayProfile from "./DisplayProfile";
import { render } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom/cjs/react-router-dom.min";
import { ProfileProvider } from "../../context/ProfileContext";
import { GroupProvider } from "../../context/GroupContext";
import { UserProvider } from "../../context/UserContext";

test('auth form renders login page', () => {
    const { container } = render (
        <UserProvider>
            <ProfileProvider>
                <GroupProvider>
                    <MemoryRouter>
                        <DisplayProfile />
                    </MemoryRouter>
                </GroupProvider>
            </ProfileProvider>
        </UserProvider>
    
    );
    

    expect(container).toMatchSnapshot();
});