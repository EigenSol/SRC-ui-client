import { apiRequest } from './apiClient';
import { parseProtectedPingResponse } from '../types/auth';

const BE_BASE_URL = import.meta.env.VITE_BE_BASE_URL?.trim() || 'http://localhost:3001';

export async function fetchProtectedPing(token) {
  const payload = await apiRequest({
    baseUrl: BE_BASE_URL,
    path: '/api/protected/ping',
    method: 'GET',
    token,
  });

  return parseProtectedPingResponse(payload);
}
