import { createLogger } from './logger';

const logger = createLogger('api-client');

async function parseJsonSafely(response) {
  const text = await response.text();
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error('Server returned non-JSON response');
  }
}

export async function apiRequest({ baseUrl, path, method = 'GET', token, body }) {
  const url = `${baseUrl.replace(/\/$/, '')}${path}`;

  logger.info(`Request ${method} ${url}`);

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const payload = await parseJsonSafely(response);

  if (!response.ok) {
    const message =
      payload && typeof payload === 'object' && 'message' in payload
        ? String(payload.message)
        : `Request failed with status ${response.status}`;

    logger.warn(`Request failed ${method} ${url}`, { status: response.status, message });
    throw new Error(message);
  }

  return payload;
}
