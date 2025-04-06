import { useForm } from '../hook/FormHook.js';
import Button from '../button/Button.jsx';
import { useAuthentication } from '../hook/AuthHook.jsx';

export default function RegisterForm() {
  const { login } = useAuthentication();
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
      passwordConfirm: '',
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
      passwordConfirm: {
        required: true,
        passwordConfirm: 'password',
      },
    },
  );

  const submitCallback = (e) => {
    e.preventDefault();
    const data = onSubmit();
    login(data);
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

      <label htmlFor="passwordConfirm" className="mt-4">
        Confirmez le mot de passe <span className="text-accent-red">*</span>
      </label>
      <input
        name="passwordConfirm"
        type="password"
        className="border-2 rounded-md px-3 py-2 border-placeholder-2 focus:bg-placeholder-3"
        placeholder="Entrez votre mot de passe"
        value={formData.passwordConfirm}
        onChange={onChange}
        required
      />
      {errors['passwordConfirm'] &&
        touchedFields.includes('passwordConfirm') && (
          <div className="text-accent-red">
            {getLabelForError(errors['passwordConfirm'])}
          </div>
        )}

      <Button.Outline variant="valid" type="submit" className="mt-8">
        Créer un compte
      </Button.Outline>
    </form>
  );
}
