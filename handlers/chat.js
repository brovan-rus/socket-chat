const {
  addUser, getUsers, deleteUser, getUser,
} = require('../utils/users');
const ValidationError = require('../errors/ValidationError');

module.exports = (io, socket) => {
  const login = ({ name, room }) => {
    const { user, error } = addUser(socket.id, name, room);
    if (error) {
      socket.emit('error', new ValidationError(error));
      return;
    }
    socket.join(user.room);
    io.in(room).emit('notification', { title: `В чат вошёл ${name}. Приветствуем!, ${socket.rooms}` });
    io.in(room).emit('users', getUsers(room));
  };

  const disconnect = () => {
    const user = deleteUser(socket.id);
    console.log(`${user.name} disconnected`);
    deleteUser(user.id);
    socket.in(user.room).emit('notification', { title: `Из чата вышел ${user.name}. До свидания!` });
    socket.in(user.room).emit('users', getUsers(user.room));
  };

  const sendMessage = (message) => {
    const user = getUser(socket.id);
    socket.in(user.room).emit('message', { user: user.name, text: message });
  };

  socket.on('login', login);
  socket.on('disconnect', disconnect);
  socket.on('sendMessage', sendMessage);
};
