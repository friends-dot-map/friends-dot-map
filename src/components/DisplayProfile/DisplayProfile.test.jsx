import DisplayProfile from "./DisplayProfile";
import { render } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom/cjs/react-router-dom.min";
import { ProfileProvider } from "../../context/ProfileContext";
import { GroupProvider } from "../../context/GroupContext";
import { UserProvider } from "../../context/UserContext";

test('display profile renders', () => {
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