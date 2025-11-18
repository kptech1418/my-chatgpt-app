import jwt from 'jsonwebtoken';
import { CLIENT_SECRET, BASE_URL } from '../config.js';

export const validateMcpToken = (req, res, next) => {
  const authHeader = req.headers.authorization?.split(' ');
  const type = authHeader?.[0];
  const token = authHeader?.[1];

  if (type?.toLowerCase() !== 'bearer' || !token) {
    return res
      .status(401)
      .set('WWW-Authenticate', `Bearer resource_metadata_uri="http://${BASE_URL}/.well-known/oauth-protected-resource"`)
      .json({ error: 'unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, CLIENT_SECRET);
    req.authInfo = {
      claims: decoded,
    };
  } catch(err) {
    return res
      .status(401)
      .set('WWW-Authenticate', 'Bearer error="unauthorized"')
      .json({ error: 'unauthorized' });
  }
  next();
};
