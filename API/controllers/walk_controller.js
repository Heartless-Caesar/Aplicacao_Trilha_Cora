const { walk, local_validation } = require("../config/models/index");
const { StatusCodes } = require("http-status-codes");
const { validate_locals } = require("../utils/validate_locals");

// TODO In the creation of a walk verify if the user wants to start from another desired endpoint as their starting point
// * last_endpoint == desired walk id
// ! FRONT END -> User can select which previous walk ending point they wish to use as a new starting point
const create_walk = async (req, res) => {
  const { start_location, start_time, start_date, type, last_endpoint_id } =
    req.body;

  if (last_endpoint_id) {
    const prev_walk = await walk.findOne({
      where: {
        id: last_endpoint_id,
        UserId: req.user.id,
      },
    });

    console.log(prev_walk);

    // TODO Fix Date format for Postgres
    // * Get current date for start_date else the difference in time could be too long
    await walk.create({
      start_location: prev_walk.dataValues.finish_location,
      start_time: prev_walk.dataValues.finish_time,
      start_date: prev_walk.dataValues.finish_date,
      type: prev_walk.dataValues.type,
      UserId: req.user.id,
    });

    return res
      .status(StatusCodes.CREATED)
      .json({ Message: "walk created from previous endpoint" });
  }

  // * Create user's local_validation row
  const found_local_validation = await local_validation.findOne({
    where: { UserId: req.user.id },
  });

  if (!found_local_validation) {
    await local_validation.create({ UserId: req.user.id });
  }

  await walk.create({
    start_location: start_location,
    start_time: start_time,
    start_date: start_date,
    type: type,
    UserId: req.user.id,
  });

  res.status(StatusCodes.CREATED).json({ Message: "walk created" });
};

// * Validate that inputted validation code is for the specific town and then validate that town for PDF generation
const finish_walk = async (req, res) => {
  const {
    finish_time,
    finish_location,
    finish_date,
    walk_id,
    start_code,
    finish_code,
  } = req.body;

  /* 
   TODO | Find location based on given code, based on their placement on the local
   TODO | array either add or subract so the locations in between are considered as passed through 
  */

  const selected_walk = await walk.update(
    {
      finish_time: finish_time,
      finish_location: finish_location,
      finish_date: finish_date,
    },
    { where: { id: walk_id }, UserId: req.user.id }
  );

  if (!selected_walk) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ Message: `Could not update element with id of ${walk_id}` });
  }

  await validate_locals(start_code, finish_code, req.user.id);

  res.status(StatusCodes.OK).json({
    Message: `walk of id ${walk_id} updated`,
  });
};

const get_all_user_walks = async (req, res) => {
  const all_entries = await walk.findAll({ where: { UserId: req.user.id } });

  if (!all_entries) {
    return res
      .status(StatusCodes.NO_CONTENT)
      .json({ Message: "This user has no walk entries" });
  }

  res.status(StatusCodes.OK).json({ Entries: all_entries });
};

const get_single_walk = async (req, res) => {
  const { id } = req.params;

  const walk = await walk.findOne({ where: { id: id } });

  if (!walk) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ Message: `Item de id ${id} nao encontrado` });
  }

  res.status(StatusCodes.OK).json({ Item: walk });
};

const delete_walk = async (req, res) => {
  const { id } = req.params;

  const to_delete = walk.destroy({ where: { id: id } });

  if (!to_delete) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ Message: `Could not delete element of id ${id}` });
  }

  await walk.save();

  res.status(StatusCodes.OK).json({ Message: `Element of id ${id} deleted` });
};

module.exports = {
  create_walk,
  finish_walk,
  get_all_user_walks,
  delete_walk,
  get_single_walk,
};
