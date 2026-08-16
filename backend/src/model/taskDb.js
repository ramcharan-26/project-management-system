import mongoose from "mongoose";

const taskSchema=mongoose.Schema(
    {
        projectId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"projectDb",
            index:true
        },
        title:{
            type:String,
            required:true,
            trim:true
        },
        description:{
            type:String,
            trim:true
        },
        status:{
            type:String,
            enum:["todo","in-progress","completed"],
            default:"todo",
        },
        priority:{
            type:String,
            enum:["low","medium","high","critical"],
            default:"medium",
        },
        assignedTo:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
        tags:{
            type:[String]
        },
        dueDate:{
            type:Date,
        },
        checkList:{
            type:[
               { text:{
                    type:String,
                    required:true
                 },
                 completed:{
                    type:Boolean,
                    default:false
                 }
               }
            ]
        }
    },
    {timestamps:true}
);

const taskDb=mongoose.model("taskDb",taskSchema);

export {taskDb};