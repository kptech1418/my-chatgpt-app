import express from "express";
import authController from './controller.js';

const router = express.Router();

//router.get('.well-known/oauth-protected-resource', authController.oauthResource);
router.get('/.well-known/openid-configuration', authController.openIdConfig);
router.post('/oauth2/register', authController.oauthRegister);
router.get('/oauth2/authorize', authController.oauthAuthorize);
router.post('/oauth2/authorize', authController.oauthAuthorizePost);
router.post('/oauth2/token', authController.oauthToken);

export default router;
