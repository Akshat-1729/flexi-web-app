import { Tweet } from "../models/tweetSchema.js";
import { User } from "../models/userSchema.js";

export const createTweet = async (req, res) => {
    try {
        const { description, id,imageUrl } = req.body;
        if (!description || !id) {
            return res.status(401).json({
                message: "Fields are required.",
                success: false
            });
        };
        const user = await User.findById(id).select("-password");
        await Tweet.create({
            description,
            userId:id,
            userDetails:user,
            imageUrl:imageUrl,
        
        });
        return res.status(201).json({
            message:"Tweet created successfully.",
            success:true,
        })
    } catch (error) {
        console.log(error);
    }
}
export const postComment=async(req,res)=>
{
    try {
    const{id}=req.params;
        const { comments } = req.body;
        await Tweet.findByIdAndUpdate(id, {
            $push: { comments: comments },
          });
          res
          .status(200)
          .json({ message: "comment created successfully" });
        }
     catch (error) {
        console.log(`error in posting comment ${error}`);
    }
 
}

export const deleteTweet = async (req,res) => {
    try {
        const {id}  = req.params;
        await Tweet.findByIdAndDelete(id);
        return res.status(200).json({
            message:"Tweet deleted successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const likeOrDislike = async (req,res) => {
    try {
        const loggedInUserId = req.body.id;
        const tweetId = req.params.id;
        const tweet = await Tweet.findById(tweetId);
        if(tweet.like.includes(loggedInUserId)){
            // dislike
            await Tweet.findByIdAndUpdate(tweetId,{$pull:{like:loggedInUserId}});
            return res.status(200).json({
                message:"User disliked your tweet."
            })
        }else{
            // like
            await Tweet.findByIdAndUpdate(tweetId, {$push:{like:loggedInUserId}});
            return res.status(200).json({
                message:"User liked your tweet."
            })
        }
    } catch (error) {
        console.log(error);
    }
};

export const getAllTweets = async (req,res) => {
    // loggedInUser ka tweet + following user tweet
    try {
        const id = req.params.id;
        const loggedInUser = await User.findById(id);
        const loggedInUserTweets = await Tweet.find({userId:id});
        const followingUserTweet = await Promise.all(loggedInUser.following.map((otherUsersId)=>{
            return Tweet.find({userId:otherUsersId});
        }));
        return res.status(200).json({
            tweets:loggedInUserTweets.concat(...followingUserTweet),
        })
    } catch (error) {
        console.log(error);
    }
}
export const getFollowingTweets = async (req,res) =>{
    try {
        const id = req.params.id;
        const loggedInUser = await User.findById(id); 
        const followingUserTweet = await Promise.all(loggedInUser.following.map((otherUsersId)=>{
            return Tweet.find({userId:otherUsersId});
        }));
        return res.status(200).json({
            tweets:[].concat(...followingUserTweet)
        });
    } catch (error) {
        console.log(error);
    }
}

export const submitComment = async (req, res) => {
    try {
        const { id } = req.params; // id of the tweet
        const { comments } = req.body; // comment object containing { text, user }

        // Add the comment to the 'comments' array of the specified Tweet document
        await Tweet.findByIdAndUpdate(id, {
            $push: { comments: comments },
        });

        res.status(200).json({ message: "Comment added successfully" });
    } catch (error) {
        console.log("Error adding the comment", error);
        res.status(500).json({ message: "Error adding the comment" });
    }
};




export const toggleBookmark = async (req, res) => {
    try {
        const { id } = req.params; // id of the tweet
        const { userId } = req.body; // id of the user

        const tweet = await Tweet.findById(id);
        if (!tweet) {
            return res.status(404).json({ message: "Tweet not found" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Toggle bookmark status
        if (tweet.bookmarks.includes(userId)) {
            // Remove user from bookmarks
            await Tweet.findByIdAndUpdate(id, { $pull: { bookmarks: userId } });
            res.status(200).json({ message: "Bookmark removed successfully" });
        } else {
            // Add user to bookmarks
            await Tweet.findByIdAndUpdate(id, { $push: { bookmarks: userId } });
            res.status(200).json({ message: "Tweet bookmarked successfully" });
        }
    } catch (error) {
        console.log("Error toggling bookmark:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};