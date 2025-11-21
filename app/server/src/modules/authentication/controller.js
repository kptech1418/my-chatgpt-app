import { BASE_URL } from "../../../config.js";

const authController = {
  oauthResource: async(req, res) => {
    res.json({
      resource: `${BASE_URL}`, // your resource identifier
      authorization_servers: [BASE_URL], // url of your auth server
      scopes_supported: ['read', 'write'],
      bearer_methods_supported: ['header'],
    });
  },
  oauthServer: async (req, res) => {
    res.json({
      issuer: BASE_URL,
      authorization_endpoint: 'http://10.0.0.65:3000/authorize', // `${BASE_URL}/authorize`,
      token_endpoint: `${BASE_URL}/token`,
      registration_endpoint: `${BASE_URL}/register`,
      response_types_supported: ['code'],
      grant_types_supported: ['authorization_code', 'refresh_token'],
      token_endpoint_auth_methods_supported: ['none', 'client_secret_post'],
      code_challenge_methods_supported: ['S256'],
      scopes_supported: ['openid', 'profile', 'email', 'token'],
      claims_supported: ['sub', 'api_token'],
    });
  },
  // openIdConfig: async (req, res) => {
  //   res.json({
  //     issuer: BASE_URL,
  //     authorization_endpoint: 'http://10.0.0.65:3000/authorize', // `${BASE_URL}/authorize`,
  //     token_endpoint: `${BASE_URL}/token`,
  //     registration_endpoint: `${BASE_URL}/register`,
  //     response_types_supported: ['code'],
  //     grant_types_supported: ['authorization_code', 'refresh_token'],
  //     token_endpoint_auth_methods_supported: ['none', 'client_secret_post'],
  //     code_challenge_methods_supported: ['S256'],
  //     scopes_supported: ['openid', 'profile', 'email', 'token'],
  //     claims_supported: ['sub', 'api_token'],
  //   });
  // },
  oauthRegister: async (req, res) => {
    console.log('oauthregister11', req.body);
    res.json({
      client_id: 'your-oauth-client-id',
      redirect_uris: req.body['redirect_uris'],
      token_endpoint_auth_method: req.body['token_endpoint_auth_method'],
      grant_types: req.body['grant_types'],
      response_types: req.body['response_types'],
      application_type: 'web',
      scope: 'openid email', // req.body['scope'],
    });
  },
  oauthAuthorize: async (req, res) => {
    res.render('authorize', { message: null, query: req.query });
  },
  oauthAuthorizePost: async (req, res) => {
    const { username, password, isGuest, stateId , redirectUri } = req.body;
    let authorizationCode = '';

    if (isGuest === "true") {
      // 1. call get token from oauth 
      // 2. save the token to redis server and return the redis sessionId and assign to authorizationCode
      authorizationCode = 'd72767e6-ffef-4069-9035-e6f948912096';
    }
    console.log('usernameandpass', username, password);
    if (username === 'admin' && password === 'admin') {
      console.log('usernameandpassvalid', username, password);
      // 1. call get token from oauth server with user details and save to 
      // 2. save the token to redis server and return the redis sessionId and assign to authorizationCode
      authorizationCode = '27e0dc17-aaf7-4cab-ab88-3c90fde4c953';
    }
    console.log('usernameandpassvalid111', redirectUri);

    if (authorizationCode) {
      console.log('usernameandpassvalid222', redirectUri, authorizationCode, stateId);
      res.redirect(`${redirectUri}?code=${authorizationCode}&state=${stateId}`);
      return;
    }
    
    res.render('authorize', { message: 'Invalid login' });
  },
  oauthToken: async (req, res) => {
    console.log('token call', req.body);
    const grant_type = req.body['grant_type'];
    const code = req.body['code'];
    const client_id = req.body['client_id'];
    const code_verifier = req.body['code_verifier'];
    
    if (!code || (grant_type !== 'authorization_code' && grant_type !== 'refresh_token')) {
      return res.status(401).json({ message: 'unauthorize access'});
    }
    console.log('token call1111', req.body);

    // get token from redis server with help of code which is our RedisSessionId
    let token = '';
    
    if(code === 'd72767e6-ffef-4069-9035-e6f948912096') {
      token = 'token-new-123-guest';
    } else if (code === '27e0dc17-aaf7-4cab-ab88-3c90fde4c953') {
      token = 'token-new-123-user';
    }
    console.log('token call222', token);

    res.json({
      access_token: token,
      refresh_token: 'refresh-token-123',
      token_type: 'Bearer',
      expires_in: 7776000, // get form oauth server
      scope: 'token',
    });
  },
};

export default authController;
