import { auth as instantiate } from 'express-openid-connect';

const envConfig = {
    secret: process.env.AUTH_SECRECT,
    baseURL: process.env.AUTH_BASE_URL,
    clientID: process.env.AUTH_CLIENT_ID,
    issuerBaseURL: process.env.AUTH_ISSUER_BASE_URL
};

function auth(config = {}) {
    /*
        config defaults:
        https://github.com/auth0/express-openid-connect/blob/master/lib/config.js
    */
    return instantiate({ ...envConfig, ...config });
}

export * from 'express-openid-connect';
export { auth };
