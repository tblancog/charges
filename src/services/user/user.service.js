const createUser = (User) => (name, status) => {
  const user = new User({ name, status });
  return user.save();
};

const listUsers = (User) => () => {
  return User.find({}).sort("name");
};

const getUserById = (User) => (id) => {
  return User.findOne({ _id: id });
};

module.exports = (User) => {
  return {
    createUser: createUser(User),
    listUsers: listUsers(User),
    getUserById: getUserById(User),
  };
};
