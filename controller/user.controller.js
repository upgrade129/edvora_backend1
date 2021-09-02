const db = require("../models");
const User = db.users;
const Session = db.session;
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.create = async (req, res) => {
  //create the user and stores the user info in the database

  try {
    if (!req.body.email || !req.body.password) {
      throw "Content cannot be empty";
    }
    //check a user with an existing email
    const existed_user = await User.find({ email: req.body.email });
    if (existed_user.length != 0) {
      throw "User already exist";
    }
    const hashpass = bcrypt.hashSync(req.body.password, saltRounds);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashpass,
    });
    user
      .save(user)
      .then((data) => res.send(data))
      .catch((err) =>
        res.status(500).send({
          message: err.message || "some error occured on creating the user",
        })
      );
  } catch (err) {
    res.status(400).send({ message: err });
  }
};

exports.login = async (req, res) => {
  //login the user and create a unique sessionId and store sessionId and userId in the database
  try {
    if (!req.body.email || !req.body.password) {
      throw "Request body cannot be empty";
    }
    //check for the username exist
    let user = await User.findOne({ email: req.body.email });
    if (!user) throw "User not found";
    // decrypt and compare the password
    if (bcrypt.compareSync(req.body.password, user.password)) {
      function generateRandom() {
        return Math.floor(Math.random() * 10000) + 1;
      }
      checksessioId(generateRandom());
      async function checksessioId(id) {
        let ids = await Session.findOne({ sessionId: id });
        if (ids) {
          checksessioId(generateRandom());
        } else {
          const session = new Session({
            userId: user._id,
            sessionId: id,
          });
          session
            .save(session)
            .then((data) =>
              res.send({ message: "Sucessfully logedin", data: data })
            )
            .catch((err) => res.status(500).send("Error occured in login"));
        }
      }
    }
  } catch (err) {
    res.status(400).send({ message: err });
  }
};

exports.changePassword = async (req, res) => {
  //edit pass and logout all other users
  try {
    if (
      !req.body.email ||
      !req.body.oldpassword ||
      !req.body.newpassword ||
      !req.body.sessionId
    ) {
      throw "Requried fields are missing";
    }

    //check for the user
    let user = await User.findOne({ email: req.body.email });
    if (!user) throw "user not exist";
    if (!bcrypt.compareSync(req.body.oldpassword, user.password))
      throw "Oldpassword is wrong";

    //update the password for the current user
    let hashpass = bcrypt.hashSync(req.body.newpassword, saltRounds);
    await User.updateOne({ email: req.body.email }, { password: hashpass });
    let session_data = await Session.find({ userId: user._id }, "sessionId");

    let sessions = [];
    for (let data of session_data) {
      sessions.push(data.sessionId);
    }
    //delete all sessions expect the current session
    let index = sessions.indexOf(req.body.sessionId);
    if (index > -1) {
      sessions.splice(index, 1);
    }

    await Session.deleteMany({ sessionId: sessions });
    res.send({
      message: "password changed and all loged out from all other sessions",
    });
  } catch (err) {
    res.status(400).send({ message: err });
  }
};

exports.logout = (req, res) => {
  //logout the user by deleting the sessionId from the session table
  try {
    if (!req.body.sessionId) throw "Session Id is empty";
    Session.deleteOne({ sessionId: req.body.sessionId }, (err) => {
      if (err) throw "sessionId is not valid";
      res.send({ message: "session was logged out sucessfully" });
    });
  } catch (err) {
    res.status(400).send({ message: err });
  }
};

exports.logoutAll = async (req, res) => {
  //logout all the sessions related to the user
  try{
      if(!req.body.userId) throw "Email cannot be empty"
      let session_data = await Session.find({userId : req.body.userId}, "sessionId");
      console.log("data",session_data);
      let sessionIds = []
      for(let data of session_data){
        sessionIds.push(data.sessionId)
      }
      console.log(sessionIds);
      await Session.deleteMany({sessionId : sessionIds});
      res.send({message : "All the sessions are sucessfully logged out"})
  } catch (err) {
      res.status(400).send({message : err})
  }
};
