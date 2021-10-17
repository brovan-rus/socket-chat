let users = [];
const { errorMessages } = require('../utils/constants');

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

const getUser = (id) => {
  const user = users.find((u) => u.id === id);
  if (!user) {
    return { error: errorMessages.validationErrorMessage };
  }
  return user;
};

const deleteUser = (id) => {
  const user = users.find((delUser) => delUser.id === id);
  users = users.filter((delUser) => delUser.id !== id);
  console.log(users);
  if (!user) {
    return { error: errorMessages.validationErrorMessage };
  }
  return user;
};

const getUsers = (room) => users.filter((user) => user.room === room);

module.exports = {
  addUser,
  getUser,
  deleteUser,
  getUsers,
};
