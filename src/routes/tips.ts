import express from 'express';
import {
  getAllTips,
  getTipByIds,
  createTip,
  updateTip,
  deleteTip,
} from '../controllers/tips';

export const router = express.Router();

router.get('/', getAllTips);
router.get('/:customerId/:waiterId', getTipByIds);
router.post('/', createTip);
router.put('/:customerId/:waiterId', updateTip);
router.delete('/:customerId/:waiterId', deleteTip);


