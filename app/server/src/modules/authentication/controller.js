const authController = {
  oauthResource: async(req, res) => {
    res.json({
      resource: 'https://inexpressive-ramiro-flinchingly.ngrok-free.dev/mcp', // your resource identifier
      authorization_servers: ['https://inexpressive-ramiro-flinchingly.ngrok-free.dev'], // url of your auth server
      scopes_supported: ['read', 'write'],
    });
  },  
  openIdConfig: async (req, res) => {
    res.json({
      issuer: 'https://inexpressive-ramiro-flinchingly.ngrok-free.dev', // 'https://inexpressive-ramiro-flinchingly.ngrok-free.dev',
      authorization_endpoint: 'https://inexpressive-ramiro-flinchingly.ngrok-free.dev/oauth2/authorize', // 'https://inexpressive-ramiro-flinchingly.ngrok-free.dev/oauth2/authorize',
      token_endpoint: 'https://10.0.0.65:3001/oauth2/token', // 'https://inexpressive-ramiro-flinchingly.ngrok-free.dev/oauth2/token',
      registration_endpoint: 'https://inexpressive-ramiro-flinchingly.ngrok-free.dev/oauth2/register', // 'https://inexpressive-ramiro-flinchingly.ngrok-free.dev/oauth2/register',
      response_types_supported: ['code'],
      grant_types_supported: ['authorization_code'],
      token_endpoint_auth_methods_supported: ['none', 'client_secret_post'],
      code_challenge_methods_supported: ['S256'],
      scopes_supported: ['openid', 'profile', 'email', 'token'],
      claims_supported: ['sub', 'api_token'],
    });
  },
  oauthRegister: async (req, res) => {
    res.json({
      client_id: 'your-oauth-client-id',
      redirect_uris: [
          'https://chatgpt.com/connector_platform_oauth_redirect' // request.body['redirect_uris']
      ],
      token_endpoint_auth_method: 'none',
      grant_types: ['authorization_code'],
      response_types: ['code'],
      application_type: 'web',
      scope: 'openid email',
    });
  },
  oauthAuthorize: async (req, res) => {
    res.render('authorize', { message: null, query: req.query });
  },
  oauthAuthorizePost: async (req, res) => {
    const { username, password, isGuest, stateId } = req.body;
    let authorizationCode = '';

    if (isGuest === "true") {
      // 1. call get token from oauth 
      // 2. save the token to redis server and return the redis sessionId and assign to authorizationCode
      authorizationCode = 'd72767e6-ffef-4069-9035-e6f948912096';
    }
    
    if (username === 'admin' && password === 'admin') {
      // 1. call get token from oauth server with user details and save to 
      // 2. save the token to redis server and return the redis sessionId and assign to authorizationCode
      authorizationCode = '27e0dc17-aaf7-4cab-ab88-3c90fde4c953';
    }

    if (authorizationCode) {
      res.redirect(`https://chatgpt.com/connector_platform_oauth_redirect?code=${authorizationCode}&state=${stateId}`);
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

    if (grant_type !== 'authorization_code') {
      return res.status(400).json({ message: 'unsupported_grant_type'});
    }

    if (!code) {
      return res.status(401).json({ message: 'unauthorize access'});
    }

    // get token from redis server with help of code which is our RedisSessionId
    let token = '';
    
    if(code === 'd72767e6-ffef-4069-9035-e6f948912096') {
      token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30'
    } else if(code === '27e0dc17-aaf7-4cab-ab88-3c90fde4c953') {
      token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV31'
    }
    
    res.json({
      access_token: token,
      token_type: 'Bearer',
      expires_in: 7776000, // get form oauth server
      scope: 'token',
    });
  },
};

export default authController;
