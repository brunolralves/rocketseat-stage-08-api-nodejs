import express from 'express';
import routes from './routes/index.js';

const app = express();
app.use(express.json());
app.use(routes);

const PORT = 3033;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

