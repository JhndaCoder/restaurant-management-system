import express from 'express';
import {
  getAllBills,
  getBillById,
  createBill,
  updateBill,
  deleteBill,
} from '../controllers/bills';

export const router = express.Router();

router.get('/', getAllBills);
router.get('/:id', getBillById);
router.post('/', createBill);
router.put('/:id', updateBill);
router.delete('/:id', deleteBill);


