import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    imageUrl:String,
    like:{
        type:Array,
        default:[]
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    comments:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
            },
            text:String
            
        }
    ],
    userDetails:{
        type:Array,
        default:[]
    },
},{timestamps:true});
export const Tweet = mongoose.model("Tweet", tweetSchema);