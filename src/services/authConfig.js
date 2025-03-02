import {
  AUTH_URL,
  ACCESS_KEY,
  REDIRECT_URI,
  RESPONSE_TYPE,
  SCOPE,
} from './config';

const authUrl = new URL(AUTH_URL);

authUrl.searchParams.append('client_id', ACCESS_KEY);
authUrl.searchParams.append('redirect_uri', REDIRECT_URI);
authUrl.searchParams.append('response_type', RESPONSE_TYPE);
authUrl.searchParams.append('scope', SCOPE);

export default authUrl;
