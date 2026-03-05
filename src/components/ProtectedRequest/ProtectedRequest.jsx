import './ProtectedRequest.css';

export function ProtectedRequest({ token, loadingAction, result, onCallProtected }) {
  return (
    <section className="protected-request" aria-label="Protected API request panel">
      <h2>Backend Verification</h2>
      <p>Use IdP token against backend protected endpoint.</p>

      <textarea value={token} readOnly placeholder="Access token appears here after login/register" />

      <button
        type="button"
        onClick={onCallProtected}
        disabled={!token.trim() || loadingAction === 'protected'}
      >
        {loadingAction === 'protected' ? 'Calling backend...' : 'Call Protected Endpoint'}
      </button>

      {result ? (
        <pre>{JSON.stringify(result, null, 2)}</pre>
      ) : (
        <p className="protected-request__empty">No protected response yet.</p>
      )}
    </section>
  );
}
