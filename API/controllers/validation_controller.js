const { StatusCodes } = require("http-status-codes");
const { Locals, certificados, User } = require("../models/index");

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

const fetchSingleCertificate = async (req, res) => {
  const { certificateId } = req.query;

  try {
    const certificate = await certificados.findOne({
      where: { id: certificateId },
    });

    if (certificate != null) {
      const user = await User.findOne({ where: { id: certificate.UserId } });
      return res
        .status(StatusCodes.OK)
        .json({ certificate: certificate, user: user });
    }
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Certificado não encontrado" });
  } catch (error) {
    console.error("Error fetching certificate:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      Message: "An error occurred while fetching the certificate",
    });
  }
};

module.exports = { validateLocal, fetchAllLocals, fetchSingleCertificate };
