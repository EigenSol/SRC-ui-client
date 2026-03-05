import { useState } from 'react';
import './AuthForms.css';

const INITIAL_FORM = {
  email: '',
  password: '',
  name: '',
};

export function AuthForms({ onRegister, onLogin, loadingAction }) {
  const [form, setForm] = useState(INITIAL_FORM);

  const isSubmitting = loadingAction === 'register' || loadingAction === 'login';

  function updateField(field, value) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function handleRegister(event) {
    event.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      return;
    }

    await onRegister({
      email: form.email.trim(),
      password: form.password,
      name: form.name.trim() || undefined,
    });
  }

  async function handleLogin(event) {
    event.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      return;
    }

    await onLogin({
      email: form.email.trim(),
      password: form.password,
    });
  }

  return (
    <form className="auth-forms" onSubmit={handleLogin}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={form.email}
        onChange={(event) => updateField('email', event.target.value)}
        required
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        value={form.password}
        onChange={(event) => updateField('password', event.target.value)}
        required
        minLength={8}
      />

      <label htmlFor="name">Name (optional)</label>
      <input
        id="name"
        type="text"
        value={form.name}
        onChange={(event) => updateField('name', event.target.value)}
      />

      <div className="auth-forms__actions">
        <button type="button" onClick={handleRegister} disabled={isSubmitting}>
          {loadingAction === 'register' ? 'Registering...' : 'Register'}
        </button>
        <button type="submit" disabled={isSubmitting}>
          {loadingAction === 'login' ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </form>
  );
}
