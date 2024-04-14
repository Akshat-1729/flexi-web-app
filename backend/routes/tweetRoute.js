import express from "express";
import { createTweet, deleteTweet, getAllTweets, getFollowingTweets, likeOrDislike, submitComment, toggleBookmark } from "../controllers/tweetController.js";
import isAuthenticated from "../config/auth.js";

const router = express.Router();
 
router.route("/create").post(isAuthenticated, createTweet);
router.route("/comments/:id").post(isAuthenticated, submitComment);
router.route("/delete/:id").delete(isAuthenticated, deleteTweet);
router.route("/like/:id").put(isAuthenticated, likeOrDislike);
// New route for bookmarking
router.route("/bookmark/:id").put(isAuthenticated, toggleBookmark); // New route for bookmarking

router.route("/alltweets/:id").get(isAuthenticated, getAllTweets);
router.route("/followingtweets/:id").get(isAuthenticated, getFollowingTweets);

export default router; 