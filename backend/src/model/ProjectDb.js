import mongoose from "mongoose";
let project_Schema=mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        description:{
            type:String,
            trim:true,
        },
        color:{
            type:String,
            default:"#3b82f6"
        },
        icon:{
            type:String,
            default:"folder"
        },
        deadline:{
            type:Date
        },
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        members:{
            type:[ {type:mongoose.Schema.Types.ObjectId,ref:"User"}],
            default:[]
        },
        archived:{
            type:Boolean,
            default:false
        }
    },
        {
            timestamps:true
        }
)

const projectDb=mongoose.model("projectDB",project_Schema);

export{projectDb};