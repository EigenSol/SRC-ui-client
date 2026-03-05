import { AuthForms } from '../../components/AuthForms/AuthForms';
import { ProtectedRequest } from '../../components/ProtectedRequest/ProtectedRequest';
import { useAuthFlow } from '../../hooks/useAuthFlow';
import './AuthPlayground.css';

export function AuthPlayground() {
  const {
    token,
    authMeta,
    protectedResult,
    loadingAction,
    errorMessage,
    clearError,
    register,
    login,
    callProtected,
  } = useAuthFlow();

  return (
    <main className="auth-playground">
      <header className="auth-playground__header">
        <h1>SRS Auth Integration Playground</h1>
        <p>Register or login via IdP, then call backend protected endpoint.</p>
      </header>

      <section className="auth-playground__panel">
        <h2>Auth (IdP)</h2>
        <AuthForms onRegister={register} onLogin={login} loadingAction={loadingAction} />

        {authMeta ? (
          <p className="auth-playground__success">
            Token issued: {authMeta.tokenType} (expires in {authMeta.expiresIn}).
          </p>
        ) : (
          <p className="auth-playground__empty">No token yet.</p>
        )}
      </section>

      <section className="auth-playground__panel">
        <ProtectedRequest
          token={token}
          loadingAction={loadingAction}
          result={protectedResult}
          onCallProtected={callProtected}
        />
      </section>

      {errorMessage ? (
        <section className="auth-playground__error" role="alert">
          <p>{errorMessage}</p>
          <button type="button" onClick={clearError}>
            Clear
          </button>
        </section>
      ) : null}
    </main>
  );
}
