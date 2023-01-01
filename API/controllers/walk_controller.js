const { User, Walk } = require("../models/index");
const { StatusCodes } = require("http-status-codes");
// TODO In the creation of a walk verify if the user wants to start from their last endpoint
const createWalk = async (req, res) => {
  const { start_local, finish_local, start_time, finish_time, last_endpoint } =
    req.body;

  if (last_endpoint == true) {
    Walk.findAll({
      limit: 1,
      where: {
        finish_local: last_endpoint,
      },
      order: [["createdAt", "DESC"]],
    }).then(function (entries) {
      //only difference is that you get users list limited to 1
      //entries[0]
    });
  }

  const new_walk = await Walk.create({
    start_local: start_local,
    finish_local: finish_local,
    start_time: start_time,
    finish_time: finish_time,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ Message: "Walk created", Walk: new_walk });
};
