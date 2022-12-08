module.exports = {
  name: "error",
  execute(error) {
    console.log(`An error occured with the database connection:\n${error}`);
  },
};
