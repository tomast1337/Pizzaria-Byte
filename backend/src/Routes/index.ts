import LoginRoutes from './login';

import express from 'express';
const router: express.Router = express.Router();

// Login
router.use('/login', LoginRoutes);


export default router;