const {
  create_walk,
  finish_walk,
  get_all_user_walks,
  delete_walk,
} = require("../controllers/walk_controller");
const walk_router = require("express").Router();

walk_router.route("/create_walk").post(create_walk);

walk_router.route("/all_walks").get(get_all_user_walks);

walk_router.route("/finish_walk").patch(finish_walk);

walk_router.route("/delete_walk/:id").delete(delete_walk);

module.exports = { walk_router };
