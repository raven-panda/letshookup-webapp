import LoginForm from '../../components/form/LoginForm.jsx';
import RegisterForm from '../../components/form/RegisterForm.jsx';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

export default function AuthenticatePage() {
  const [isLoginMode, setIsLoginMode] = useState(true);

  return (
    <div className="flex min-h-screen">
      <section
        className={twMerge(
          'flex-1 p-12 sm:p-18',
          isLoginMode ? 'bg-secondary-2' : 'bg-secondary-3',
        )}
      >
        <h1 className="mb-20 font-bold text-2xl xs:text-3xl lg:text-4xl">
          Des chats de groupe pour des amis ou des équipes de travail
        </h1>
        {isLoginMode ? (
          <>
            <LoginForm />
            <p className="sm:hidden mt-4">
              Nouveau membre ?{' '}
              <button
                type="button"
                className="link"
                onClick={() => setIsLoginMode(false)}
              >
                Cliquez ici pour créer un compte
              </button>
            </p>
          </>
        ) : (
          <>
            <RegisterForm />
            <p className="sm:hidden mt-4">
              Déjà membre ?{' '}
              <button
                type="button"
                className="link"
                onClick={() => setIsLoginMode(true)}
              >
                Cliquez ici pour vous connecter
              </button>
            </p>
          </>
        )}
      </section>
      <section className="hidden sm:block flex-1 p-18 bg-secondary-3">
        <RegisterForm />
      </section>
    </div>
  );
}
