const fs = require("fs");
const randomInteger = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
module.exports.getRandomUser = (req, res, next) => {
  const jsonString = fs.readFileSync("./public/allusers.json");
  const users = JSON.parse(jsonString);
  let length = users.length;
  let seleted = users[randomInteger(0, length)];
  res.status(200).send({
    status: "success",
    data: seleted,
  });
};

module.exports.getAllUsers = (req, res, next) => {
  const { s } = req.query;
  const total = parseInt(s);
  const jsonString = fs.readFileSync("./public/allusers.json");
  const users = JSON.parse(jsonString);
  const selected = users.slice(0, total);
  res.status(200).send({
    status: "success",
    data: selected,
  });
};

module.exports.saveUser = (req, res, next) => {
  const newUser = req.body;
  let previoutUsers = require("../public/allusers.json");
  previoutUsers.push(newUser);
  fs.writeFile(
    "./public/allusers.json",
    JSON.stringify(previoutUsers),
    "utf8",
    function (err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      } else {
        res.status(200).send({
          status: "successfull",
          message: "Successfully saved",
        });
      }
    }
  );
};

module.exports.updateOne = (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  let previoutUsers = require("../public/allusers.json");
  let updatedUser = previoutUsers.find((user) => user.id === +id);
  updatedUser.id = data.id ? data.id : updatedUser.id;
  updatedUser.name = data.name ? data.name : updatedUser.name;
  updatedUser.gender = data.gender ? data.gender : updatedUser.gender;
  updatedUser.contact = data.contact ? data.contact : updatedUser.contact;
  updatedUser.address = data.address ? data.address : updatedUser.address;
  updatedUser.photoUrl = data.photoUrl ? data.photoUrl : updatedUser.photoUrl;
  fs.writeFile(
    "./public/allusers.json",
    JSON.stringify(previoutUsers),
    "utf8",
    function (err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }
      res.status(200).send({
        status: "successfull",
        message: "Successfully saved",
      });
    }
  );
};

module.exports.bulkUpdate = (req,res,next) => {
    console.log('this is bulk update')
}

module.exports.removeOne = (req, res, next) => {
  const { id } = req.params;
  let previoutUsers = require("../public/allusers.json");
  let updatedUser = previoutUsers.filter((user) => user.id !== +id);
  fs.writeFile(
    "./public/allusers.json",
    JSON.stringify(updatedUser),
    "utf8",
    function (err) {
      if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
      }
      res.status(200).send({
        status: "successfull",
        message: "Successfully deleted your item",
      });
    }
  );
};
