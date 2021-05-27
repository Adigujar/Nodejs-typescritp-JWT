import express from 'express';

import auth from './vaildtoken'
import link from './link';

const router = express.Router();

router.post('/register', link.register);
router.post('/login', link.login);
router.get('/get/all',auth, link.getAllUsers);

export = router;