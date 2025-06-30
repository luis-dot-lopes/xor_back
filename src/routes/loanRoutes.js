import { Router } from 'express';
import * as controller from '../controllers/loanController.js';

const router = Router();

router.post('/', controller.create);
router.get('/', controller.findAll);
router.get('/:id', controller.findById);
router.put('/:id/return', controller.returnLoan);

export default router;
