module.exports = async (client) => {
  const { promisify } = require("util");
  const { glob } = require("glob");
  const PG = promisify(glob);

  (await PG("./src/events/*/*.js")).forEach((file) => {
    const fileData = require(file.replace("./src", ".."));

    if (fileData.once) {
      client.once(fileData.name, (...args) =>
        fileData.execute(...args, client)
      );
    } else {
      client.on(fileData.name, (...args) => fileData.execute(...args, client));
    }
  });
};
