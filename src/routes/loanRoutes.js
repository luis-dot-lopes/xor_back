import { Router } from 'express';
import * as controller from '../controllers/loanController.js';
import { Loan } from '../models/index.js';

const router = Router();

router.post('/', controller.create);
router.get('/', controller.findAll);
router.get('/:id', controller.findById);
router.get("/users/:userId/loans", async (req, res) => {
  const { userId } = req.params;
  const loans = await Loan.findAll({
    where: { userId },
    include: [Equipment]
  });
  res.json(loans);
});
router.put('/:id/return', controller.returnLoan);
router.get("/view-loan/:token", async (req, res) => {
  const { token } = req.params;
  const loan = await Loan.findOne({
    where: { privateToken: token },
    include: [User, Equipment],
  });

  if (!loan) return res.status(404).send("Not found");
  res.json(loan);
});

import { Loan } from '../models/index.js';

router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const loan = await Loan.findByPk(req.params.id);

    if (!loan) {
      return res.status(404).json({ error: 'Empréstimo não encontrado' });
    }

    loan.status = status;
    await loan.save();

    res.json(loan);
  } catch (error) {
    console.error('Erro ao atualizar status:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});
export default router;
