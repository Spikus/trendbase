import express from 'express';
import bodyParser from 'body-parser'
import cors from 'cors'

// Routes

import indexRouter from './routes/main';
import slideRouter from './routes/slides';

const app = express();
const PORT = process.env.PORT || 8000;


app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', indexRouter);
app.use('/slides/', slideRouter);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))