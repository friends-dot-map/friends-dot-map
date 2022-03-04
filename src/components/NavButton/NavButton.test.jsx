import NavButton from "./NavButton";
import { render } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom/";
import { ProfileProvider } from "../../context/ProfileContext";
import { GroupProvider } from "../../context/GroupContext";
import { UserProvider } from "../../context/UserContext";

test('auth form renders login page', () => {
    const { container } = render (
    <UserProvider>
        <ProfileProvider>
            <GroupProvider>
                <MemoryRouter >
                    <NavButton  />
                </MemoryRouter>
            </GroupProvider>
        </ProfileProvider>
    </UserProvider>
    
    );
    

    expect(container).toMatchSnapshot();
});