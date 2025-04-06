import { useForm } from '../hook/FormHook.js';
import Button from '../button/Button.jsx';
import { useAuthentication } from '../hook/AuthHook.jsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import LoadingSpinner from '../LoadingSpinner.jsx';

export default function LoginForm() {
  const { login } = useAuthentication();
  const navigate = useNavigate();
  const {
    formData,
    touchedFields,
    errors,
    onChange,
    onSubmit,
    getLabelForError,
  } = useForm(
    {
      email: '',
      password: '',
    },
    {
      email: {
        required: true,
        regexMatch: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
      },
      password: {
        required: true,
      },
    },
  );
  const [isSubmitting, setSubmitting] = useState(false);

  const submitCallback = (e) => {
    e.preventDefault();
    setSubmitting(true);
    const data = onSubmit();
    if (!data) return;

    login(data).then(() => {
      setSubmitting(false);
      navigate('/dashboard');
    });
  };

  return (
    <form onSubmit={submitCallback} className="flex flex-col" noValidate>
      <h2 className="text-xl font-bold">Connectez vous</h2>

      <label htmlFor="email" className="mt-4">
        Adresse e-mail <span className="text-accent-red">*</span>
      </label>
      <input
        name="email"
        type="email"
        className="border-2 border-transparent rounded-md px-3 py-2 bg-common-2 focus:bg-placeholder-4"
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
        className="border-2 border-transparent rounded-md px-3 py-2 bg-common-2 focus:bg-placeholder-4"
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

      <Button.Filled
        variant="valid"
        type="submit"
        className="mt-8 flex justify-center"
      >
        {isSubmitting ? (
          <LoadingSpinner width={24} height={24} />
        ) : (
          'Se connecter'
        )}
      </Button.Filled>
    </form>
  );
}
