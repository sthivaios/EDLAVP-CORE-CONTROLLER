import "dotenv/config"
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send({ message: 'Hello, world!' });
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});