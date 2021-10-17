const express = require('express');
const helmet = require('helmet');
const http = require('http');
const cors = require('cors');
const socketIO = require('socket.io');
const limiter = require('./middlewares/rate-limiter');
const NotFoundError = require('./errors/NotFoundError');
const { errorsHandler } = require('./middlewares/errorsHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorMessages } = require('./utils/constants');
const chat = require('./handlers/chat');

const { PORT = 3000 } = process.env;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(requestLogger);
app.use(helmet());
app.use(cors());
app.use(limiter);

io.on('connection', (socket) => chat(io, socket));

app.use((req, res, next) => {
  next(new NotFoundError(errorMessages.notFoundErrorMessage));
});

app.use(errorLogger);
app.use(errorsHandler);

server.listen(PORT, () => {
  console.log(`We are live on ${PORT}`);
});
