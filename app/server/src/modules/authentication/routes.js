import express from "express";
import authController from './controller.js';

const router = express.Router();

router.get('/.well-known/oauth-protected-resource', authController.oauthResource);
router.get('/.well-known/oauth-protected-resource/mcp', authController.oauthResource);
router.get('/.well-known/oauth-authorization-server', authController.oauthServer);
router.get('/.well-known/oauth-authorization-server/mcp', authController.oauthServer);
// router.get('/.well-known/openid-configuration', authController.openIdConfig);
router.post('/register', authController.oauthRegister);
router.get('/authorize', authController.oauthAuthorize);
router.post('/authorize', authController.oauthAuthorizePost);
router.post('/token', authController.oauthToken);

export default router;
