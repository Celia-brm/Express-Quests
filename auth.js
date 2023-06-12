const argon2 = require("argon2");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (req, res, next) => {
  // hash the password using argon2 then call next()
  argon2
    .hash(req.body.password, hashingOptions) // permet de hacher le mdp
    .then((hashedPassword) => {
      //recuperer le mdp hacher
      // do something with hashedPassword
      req.body.hashedPassword = hashedPassword;
      delete req.body.password;

      next();
    })
    .catch((err) => {
      // do something with err
      console.log(err);
      res.sendStatus(500);
    });
};

module.exports = {
  hashPassword,
};
