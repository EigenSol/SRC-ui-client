/**
 * @typedef {Object} RegisterRequest
 * @property {string} email
 * @property {string} password
 * @property {string=} name
 */

/**
 * @typedef {Object} LoginRequest
 * @property {string} email
 * @property {string} password
 */

/**
 * @typedef {Object} AuthTokenResponse
 * @property {string} accessToken
 * @property {'Bearer'} tokenType
 * @property {string} expiresIn
 */

/**
 * @typedef {Object} ProtectedPingResponse
 * @property {boolean} ok
 * @property {string} message
 * @property {{ userId: string, email: string }} user
 */

/**
 * @param {unknown} payload
 * @returns {AuthTokenResponse}
 */
export function parseAuthTokenResponse(payload) {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Invalid auth response payload');
  }

  const value = /** @type {{accessToken?: unknown, tokenType?: unknown, expiresIn?: unknown}} */ (payload);

  if (
    typeof value.accessToken !== 'string' ||
    value.tokenType !== 'Bearer' ||
    typeof value.expiresIn !== 'string'
  ) {
    throw new Error('Invalid auth response contract');
  }

  return {
    accessToken: value.accessToken,
    tokenType: value.tokenType,
    expiresIn: value.expiresIn,
  };
}

/**
 * @param {unknown} payload
 * @returns {ProtectedPingResponse}
 */
export function parseProtectedPingResponse(payload) {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Invalid protected response payload');
  }

  const value = /** @type {{ok?: unknown, message?: unknown, user?: unknown}} */ (payload);
  const user = /** @type {{userId?: unknown, email?: unknown} | undefined} */ (value.user);

  if (
    typeof value.ok !== 'boolean' ||
    typeof value.message !== 'string' ||
    !user ||
    typeof user.userId !== 'string' ||
    typeof user.email !== 'string'
  ) {
    throw new Error('Invalid protected response contract');
  }

  return {
    ok: value.ok,
    message: value.message,
    user: {
      userId: user.userId,
      email: user.email,
    },
  };
}
