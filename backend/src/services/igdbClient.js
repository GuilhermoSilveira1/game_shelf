// src/services/igdbClient.js
import 'dotenv/config';

const IGDB_BASE = 'https://api.igdb.com/v4';
const TWITCH_TOKEN_URL = 'https://id.twitch.tv/oauth2/token';

const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;
const DEFAULT_SIZE = process.env.IGDB_DEFAULT_IMAGE_SIZE || 'cover_big';

let tokenCache = { token: null, expiresAt: 0 };

export class IGDBCredentialsMissingError extends Error {
  constructor() {
    super('Credenciais da IGDB/Twitch não configuradas.');
    this.name = 'IGDBCredentialsMissingError';
  }
}

export async function getAppAccessToken() {
  if (!CLIENT_ID || !CLIENT_SECRET) throw new IGDBCredentialsMissingError();

  if (tokenCache.token && Date.now() < tokenCache.expiresAt) return tokenCache.token;

  const qs = new URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: 'client_credentials',
  }).toString();

  const res = await fetch(`${TWITCH_TOKEN_URL}?${qs}`, { method: 'POST' });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Falha ao obter token Twitch (${res.status}): ${text}`);
  }
  const data = await res.json();

  tokenCache = {
    token: data.access_token,
    // margem de segurança de 60s
    expiresAt: Date.now() + (data.expires_in - 60) * 1000,
  };
  return tokenCache.token;
}

function buildHeaders(token) {
  return {
    'Client-ID': CLIENT_ID,
    'Authorization': `Bearer ${token}`, // Bearer + espaço + token
    'Accept': 'application/json',
  };
}

export async function igdbQuery(endpoint, apicalypseBody) {
  let token = await getAppAccessToken();

  let res = await fetch(`${IGDB_BASE}/${endpoint}`, {
    method: 'POST',
    headers: buildHeaders(token),
    body: apicalypseBody,
  });

  // token inválido → limpa cache e tenta 1x de novo
  if (res.status === 401) {
    tokenCache = { token: null, expiresAt: 0 };
    token = await getAppAccessToken();

    res = await fetch(`${IGDB_BASE}/${endpoint}`, {
      method: 'POST',
      headers: buildHeaders(token),
      body: apicalypseBody,
    });
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`IGDB error ${res.status}: ${text}`);
  }

  return res.json();
}

export function buildCoverUrl(imageId, size = DEFAULT_SIZE) {
  if (!imageId) return null;
  return `https://images.igdb.com/igdb/image/upload/t_${size}/${imageId}.jpg`;
}
