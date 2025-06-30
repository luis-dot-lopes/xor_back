import { Router } from 'express';
import * as controller from '../controllers/equipmentController.js';

const router = Router();

router.post('/', controller.create);
router.get('/', controller.findAll);
router.get('/:id', controller.findById);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

export default router;
