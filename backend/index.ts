import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './app/routes';
import { connectDB } from './app/common/services/database.services';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mount the router under /api prefix
app.use('/api', routes);

app.get('/', (_req, res) => {
  res.send('Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
