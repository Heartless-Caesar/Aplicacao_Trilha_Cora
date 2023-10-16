const { StatusCodes } = require("http-status-codes");
const { Locals } = require("../models/index");

const validateLocal = async (req, res) => {
  const { local, userId } = req.body;

  let update;

  try {
    update = await Locals.findOne({
      where: {
        UserId: userId,
      },
    });

    if (!update) {
      return res.status(StatusCodes.NOT_FOUND).json({
        Message: "Local not found for the given user.",
      });
    }

    // Update the specified local property based on the 'local' value
    update[local] = true;

    await update.save();
    console.log(`Local ${local} for user with id ${userId} updated.`);

    res.status(StatusCodes.OK).json({
      Message: "Local updated",
    });
  } catch (error) {
    console.error("Error updating local:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      Message: "An error occurred while updating the local.",
    });
  }
};

const fetchAllLocals = async (req, res) => {
  const { userId } = req.query;

  console.log(userId);

  try {
    const allLocals = await Locals.findAll({ where: { UserId: userId } });

    res.status(StatusCodes.OK).json({
      Locals: allLocals,
    });
  } catch (error) {
    console.error("Error fetching all locals:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      Message: "An error occurred while fetching all locals.",
    });
  }
};

module.exports = { validateLocal, fetchAllLocals };
