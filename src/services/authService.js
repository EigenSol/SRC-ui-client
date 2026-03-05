import { apiRequest } from './apiClient';
import { parseAuthTokenResponse } from '../types/auth';

const IDP_BASE_URL = import.meta.env.VITE_IDP_BASE_URL?.trim() || 'http://localhost:3000';

export async function registerUser(input) {
  const payload = await apiRequest({
    baseUrl: IDP_BASE_URL,
    path: '/auth/register',
    method: 'POST',
    body: input,
  });

  return parseAuthTokenResponse(payload);
}

export async function loginUser(input) {
  const payload = await apiRequest({
    baseUrl: IDP_BASE_URL,
    path: '/auth/login',
    method: 'POST',
    body: input,
  });

  return parseAuthTokenResponse(payload);
}
