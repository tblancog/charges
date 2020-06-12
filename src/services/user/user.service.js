const createUser = (User) => (name, status) => {
  const user = new User({ name, status });
  return user.save();
};

const listUsers = (User) => () => {
  return User.find({}).sort("name");
};

module.exports = (User) => {
  return {
    createUser: createUser(User),
    listUsers: listUsers(User),
  };
};
