import jwt from 'jsonwebtoken';

export const validateMcpToken = (req, res, next) => {
  const authHeader = req.headers.authorization?.split(' ');
  const type = authHeader?.[0];
  const token = authHeader?.[1];

  if (type?.toLowerCase() !== 'bearer' || !token) {
    return res
      .status(401)
      .set('WWW-Authenticate', `Bearer`)
      .json({ error: 'unauthorized' });
  }

  try {
    console.log('auth token', token, req.baseUrl);
    if (token !== 'token-new-123-guest' && token !== 'token-new-123-user') {
      throw new Error('unauthorized');
    }
    // const decoded = jwt.verify(token, process.env.CLIENT_SECRET);
    // req.authInfo = {
    //   claims: decoded,
    // };
  } catch(err) {
    return res
      .status(401)
      .set('WWW-Authenticate', 'Bearer error="unauthorized"')
      .json({ error: 'unauthorized' });
  }
  next();
};
