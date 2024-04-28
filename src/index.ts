import express from 'express'
import { customerRoutes } from './routes/customer';
import { orderRoutes } from './routes/orders';
import { router as waitersRoutes } from './routes/waiters';
import { router as tipsRoutes } from './routes/tips';
import { router as foodRoutes } from './routes/food';
import { router as chefRoutes } from './routes/chef';
import { router as billRoutes } from './routes/bills';
import { router as containsRoutes } from './routes/contains';
import { errorHandler } from './utils/error';

const app = express()

app.use(express.json());
app.use('/customers', customerRoutes);
app.use('/orders', orderRoutes);
app.use('/waiters', waitersRoutes);
app.use('/tips', tipsRoutes);
app.use('/foods', foodRoutes);
app.use('/chefs', chefRoutes);
app.use('/bills', billRoutes);
app.use('/contains', containsRoutes);
app.use(errorHandler)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000)



