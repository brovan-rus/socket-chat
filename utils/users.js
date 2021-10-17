const users = [];
const { errorMessages } = require('./constants');

const addUser = (id, name, room) => {
  const existingUser = users.some((user) => user.name.toLowerCase() === name.toLowerCase());
  if (existingUser) {
    return { error: errorMessages.duplicatingUser };
  }
  if (!(id && name && room)) {
    return { error: errorMessages.validationErrorMessage };
  }
  const user = { id, name, room };
  users.push(user);
  return { user };
};

const getUser = (id) => users.find((user) => user.id === id);

const deleteUser = (id) => {
  const user = users.find((delUser) => delUser.id === id);
  users.filter((delUser) => delUser.id === id);
  return user;
};

const getUsers = (room) => users.filter((user) => user.room === room);

module.exports = {
  addUser,
  getUser,
  deleteUser,
  getUsers,
};
