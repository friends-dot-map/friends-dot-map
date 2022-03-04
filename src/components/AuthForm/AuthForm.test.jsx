import AuthForm from "./AuthForm";
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom/";

test('auth form renders login page', () => {
    const { container } = render (
    <MemoryRouter>
        <AuthForm isSigningUp={true} />
    </MemoryRouter>
);
    
    screen.getByText(/already have an account\?/i)

    expect(container).toMatchSnapshot();
});

test('auth form renders register page', () => {
    const { container } = render (
    <MemoryRouter>
        <AuthForm isSigningUp={false} />
    </MemoryRouter>
);
    
    screen.getByText(/need to make an account\?/i)
    expect(container).toMatchSnapshot();
});