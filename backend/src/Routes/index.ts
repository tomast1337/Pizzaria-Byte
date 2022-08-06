import LoginRoutes from './login';
import AdminRoutes from './admin';

import express from 'express';
const router: express.Router = express.Router();

// Login
router.use('/login', LoginRoutes);
// Admin
router.use('/admin', AdminRoutes);


export default router;