import { useForm } from '../hook/FormHook.js';
import Button from '../button/Button.jsx';
import { useAuthentication } from '../hook/AuthHook.jsx';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner.jsx';
import { useState } from 'react';

export default function RegisterForm() {
  const { register } = useAuthentication();
  const navigate = useNavigate();
  const {
    formData,
    errors,
    touchedFields,
    onChange,
    onSubmit,
    getLabelForError,
  } = useForm(
    {
      username: '',
      email: '',
      password: '',
      passwordVerify: '',
    },
    {
      username: {
        required: true,
      },
      email: {
        required: true,
        regexMatch: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
      },
      password: {
        required: true,
      },
      passwordVerify: {
        required: true,
        passwordConfirm: 'password',
      },
    },
  );
  const [isSubmitting, setSubmitting] = useState(false);

  const submitCallback = (e) => {
    setSubmitting(true);
    e.preventDefault();
    const data = onSubmit();
    if (!data) return;

    register(data).then(() => {
      setSubmitting(false);
      navigate('/dashboard');
    });
  };

  return (
    <form onSubmit={submitCallback} className={'flex flex-col'} noValidate>
      <h2 className="text-xl font-bold">
        <span className="hidden sm:inline">Nouveau membre ? </span>Créer un
        compte
      </h2>

      <label htmlFor="username" className="mt-4">
        Nom d'utilisateur <span className="text-accent-red">*</span>
      </label>
      <input
        name="username"
        type="text"
        className="border-2 rounded-md px-3 py-2 border-placeholder-2 focus:bg-placeholder-3"
        placeholder="Entrez votre nom d'affichage"
        value={formData.username}
        onChange={onChange}
        required
      />
      {errors['username'] && touchedFields.includes('username') && (
        <div className="text-accent-red">
          {getLabelForError(errors['username'])}
        </div>
      )}

      <label htmlFor="email" className="mt-4">
        Adresse e-mail <span className="text-accent-red">*</span>
      </label>
      <input
        name="email"
        type="email"
        className="border-2 rounded-md px-3 py-2 border-placeholder-2 focus:bg-placeholder-3"
        placeholder="Entrez votre adresse email"
        value={formData.email}
        onChange={onChange}
        required
      />
      {errors['email'] && touchedFields.includes('email') && (
        <div className="text-accent-red">
          {getLabelForError(errors['email'], {
            regexMatch: 'john.doe@example.com',
          })}
        </div>
      )}

      <label htmlFor="password" className="mt-4">
        Mot de passe <span className="text-accent-red">*</span>
      </label>
      <input
        name="password"
        type="password"
        className="border-2 rounded-md px-3 py-2 border-placeholder-2 focus:bg-placeholder-3"
        placeholder="Entrez votre mot de passe"
        value={formData.password}
        onChange={onChange}
        required
      />
      {errors['password'] && touchedFields.includes('password') && (
        <div className="text-accent-red">
          {getLabelForError(errors['password'])}
        </div>
      )}

      <label htmlFor="passwordVerify" className="mt-4">
        Confirmez le mot de passe <span className="text-accent-red">*</span>
      </label>
      <input
        name="passwordVerify"
        type="password"
        className="border-2 rounded-md px-3 py-2 border-placeholder-2 focus:bg-placeholder-3"
        placeholder="Confirmez votre mot de passe"
        value={formData.passwordVerify}
        onChange={onChange}
        required
      />
      {errors['passwordVerify'] && touchedFields.includes('passwordVerify') && (
        <div className="text-accent-red">
          {getLabelForError(errors['passwordVerify'])}
        </div>
      )}

      <Button.Outline
        variant="valid"
        type="submit"
        className="mt-8 flex justify-center"
      >
        {isSubmitting ? (
          <LoadingSpinner width={24} height={24} />
        ) : (
          'Créer un compte'
        )}
      </Button.Outline>
    </form>
  );
}
