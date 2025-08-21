import express, { Request, Response } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { sharedUtil } from '@petrodealhub/shared';

// Load environment variables
config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Example route
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ 
    status: 'ok',
    message: 'Server is running',
    util: sharedUtil()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Available routes:');
  console.log(`  GET  /api/health - Check server status`);
});

export default app;
