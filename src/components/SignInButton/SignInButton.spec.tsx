import { render, screen, fireEvent } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { useSession, signIn, signOut } from 'next-auth/client';
import { SignInButton } from '.';

jest.mock('next-auth/client');

describe('SignInButton component', () => {
  it('should render correctly when user is not authenticated', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SignInButton />);
    expect(screen.getByText('Sign In with Github')).toBeInTheDocument();
  });

  it('should render correctly when user is authenticated', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([
      {
        user: { name: 'John', email: 'john@example.com' },
        expires: 'fake-expires',
      },
      false,
    ]);

    render(<SignInButton />);
    expect(screen.getByText('John')).toBeInTheDocument();
  });

  it('should call signIn when user is not authenticated', () => {
    const useSessionMocked = mocked(useSession);
    const signInMocked = mocked(signIn);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SignInButton />);

    const signInButton = screen.getByText('Sign In with Github');
    fireEvent.click(signInButton);

    expect(signInMocked).toHaveBeenCalled();
  });

  it('should call signOut when user is authenticated', () => {
    const useSessionMocked = mocked(useSession);
    const signOutMocked = mocked(signOut);

    useSessionMocked.mockReturnValueOnce([
      {
        user: { name: 'John', email: 'john@example.com' },
        expires: 'fake-expires',
      },
      false,
    ]);

    render(<SignInButton />);

    const signOutButton = screen.getByRole('button', { name: /john/i });

    fireEvent.click(signOutButton);

    expect(signOutMocked).toHaveBeenCalled();
  });
});
