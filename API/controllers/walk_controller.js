const { Walk } = require("../models/index");
const { StatusCodes } = require("http-status-codes");

// TODO In the creation of a walk verify if the user wants to start from another desired endpoint as their starting point
// * last_endpoint == desired walk id
// ! FRONT END -> User can select which previous walk ending point they wish to use as a new starting point
const create_walk = async (req, res) => {
  const { start_local, start_time, start_date, last_endpoint_id } = req.body;

  if (last_endpoint_id) {
    const prev_walk = await Walk.findOne({
      where: {
        id: last_endpoint_id,
        UserId: req.user.id,
      },
    });

    console.log(prev_walk);

    await Walk.create({
      start_local: prev_walk.dataValues.finish_local,
      start_time: prev_walk.dataValues.finish_time,
      start_date: prev_walk.dataValues.start_date,
      UserId: req.user.id,
    });

    return res
      .status(StatusCodes.CREATED)
      .json({ Message: "Walk created from previous endpoint" });
  }

  await Walk.create({
    start_local: start_local,
    start_time: start_time,
    start_date: start_date,
    UserId: req.user.id,
  });

  res.status(StatusCodes.CREATED).json({ Message: "Walk created" });
};

const finish_walk = async (req, res) => {
  const { finish_time, finish_local, finish_date, walk_id } = req.body;

  const selected_walk = await Walk.update(
    {
      finish_time: finish_time,
      finish_local: finish_local,
      finish_date: finish_date,
    },
    { where: { id: walk_id }, UserId: req.user.id }
  );

  if (!selected_walk) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ Message: `Could not update element with id of ${walk_id}` });
  }

  res.status(StatusCodes.OK).json({ Message: `Walk of id ${walk_id} updated` });
};

const get_all_user_walks = async (req, res) => {
  const all_entries = await Walk.findAll({ where: { UserId: req.user.id } });

  if (!all_entries) {
    return res
      .status(StatusCodes.NO_CONTENT)
      .json({ Message: "This user has no walk entries" });
  }

  res.status(StatusCodes.OK).json({ Entries: all_entries });
};

const delete_walk = async (req, res) => {
  const { id } = req.params;

  const to_delete = Walk.destroy({ where: { id: id } });

  if (!to_delete) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ Message: `Could not delete element of id ${id}` });
  }

  await Walk.save();

  res.status(StatusCodes.OK).json({ Message: `Element of id ${id} deleted` });
};

module.exports = { create_walk, finish_walk, get_all_user_walks, delete_walk };
