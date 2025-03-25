import express from 'express';
import * as auth from '../controllers/auth.js';
import { protect , authorize} from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', auth.register);
router.post('/login', auth.signin);
router.get('/me', protect, auth.getMe);
router.get('/logout', auth.signout);

export default router;
