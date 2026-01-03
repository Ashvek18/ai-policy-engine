import express from 'express';
import descisionRoutes from './routes/descision.routes.js';

const app = express();

app.use(express.json());
app.use('/api/descision', descisionRoutes);
app.use(express.static("public"));


export default app;