import AuthForm from "./AuthForm";
import { render } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom/cjs/react-router-dom.min";

test('auth form renders login page', () => {
    const { container } = render (
    <MemoryRouter>
        <AuthForm isSigningUp={true} />
    </MemoryRouter>
    
    );
    

    expect(container).toMatchSnapshot();
});