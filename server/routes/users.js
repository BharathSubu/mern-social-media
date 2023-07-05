import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  removeRequest,
  addFriend,
  getUserRequests,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/getuser/:id", verifyToken, getUser);

router.get("/getuserrequests/:id", verifyToken, getUserRequests);
router.get("/getuserfriends/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
router.patch("/addremovefriend/:id/:friendId", verifyToken, addRemoveFriend);

router.patch("/addfriend/:id/:friendId", verifyToken, addFriend);

router.patch("/removerequest/:id/:friendId", verifyToken, removeRequest);

export default router;
