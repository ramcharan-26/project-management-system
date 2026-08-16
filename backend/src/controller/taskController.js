import {projectDb} from "../model/ProjectDb.js";
import {taskDb} from "../model/taskDb.js";

async function verifyUserByProject(projectId,userId)
{
        if(!projectId)
        {
           return false;
        }
        const projectInfo=await projectDb.findById(projectId);
        if(!projectInfo)
            return false;
        const isOwner=(projectInfo.owner.toString()===userId);
        const isMember=(projectInfo.members.some(memberId=>memberId.toString()===userId));
        return isOwner||isMember;
}

async function verifyUserByTask(taskId,userId)
{
    if(!taskId)
    {
        return false;
    }
    const task=await taskDb.findById(taskId);
    if(!task)
    {
        return false;
    }
    return (await verifyUserByProject(task.projectId,userId));
}

async function createTask(req,res)
{
    try{
        const userId=req.user.id;
        const {projectId,title,priority,description,dueDate,status,assignedTo,tags,checkList}=req.body;
        if(!projectId)
        {
           return res.status(403).json({message:"Invalid project Id",success:false});
        }
        if(! (await verifyUserByProject(projectId,userId)))
        {
            return res.status(403).json({message:"You don't have access to this project ",success:false});
        }
        const task=await taskDb.create({projectId,title,status,description,priority,assignedTo,tags,dueDate,checkList});
        return res.status(201).json({message:"task created",success:true,task});
    }
    catch(err)
    {
        console.log(`error Occured in Creating Task ; ${err}`);
        return res.status(500).json({message:"error Occured in creating task",success:false});
    }
}

async function getTasks(req,res)
{
    try{
        const projectId=req.params.projectId;
        const userId=req.user.id;
        if(!projectId)
            return res.status(400).json({message:"No project Id",success:false});
        if(! (await verifyUserByProject(projectId,userId)))
        return res.status(403).json({message:"You don't have access to this project",success:false});
        const tasks=await taskDb.find({projectId:projectId});
        return res.status(200).json({message:"succesfully fetched the tasks",success:true,tasks});
    }
    catch(err)
    {
        console.log(`Error in getting all tasks ${err}`);
        return res.status(500).json({message:"Error in fetching tasks",success:false});
    }
}

async function getsingleTask(req,res)
{
    try{
        const taskId=req.params.id;
        const userId=req.user.id;
        if(!taskId)
        {
            return res.status(400).json({message:"No Task Id",success:false});
        }
        if(! (await verifyUserByTask(taskId,userId)))
        {
            return res.status(403).json({message:"You don't have access to this Task",success:false});
        }
        const task=await taskDb.findById(taskId);
        return res.status(200).json({message:"successfullt fetched Task",success:true,task});
    }
    catch(err)
    {
        console.log(`Error in Getting Single Task :${err}`);
        return res.status(500).json({message:"Error in fetching Task",success:false});
    }
}

async function updateTask(req,res)
{
    try{
        const taskId=req.params.id;
        const userId=req.user.id;
        const {title,description,status,priority,assignedTo,tags,dueDate,checkList}=req.body;
        const updates = {};

        if (title !== undefined) updates.title = title;
        if (description !== undefined) updates.description = description;
        if (status !== undefined) updates.status = status;
        if (priority !== undefined) updates.priority = priority;
        if (assignedTo !== undefined) updates.assignedTo = assignedTo;
        if (tags !== undefined) updates.tags = tags;
        if (dueDate !== undefined) updates.dueDate = dueDate;
        if (checkList !== undefined) updates.checkList = checkList;

        if(!taskId)
        {
            return res.status(400).json({message:"No Task Id",success:false});
        }
        if(! (await verifyUserByTask(taskId,userId)))
        {
            return res.status(400).json({message:"You don't have access to this Task",success:false});
        }
        const task=await taskDb.findByIdAndUpdate(taskId,{$set:updates},{new:true,runValidators:true});
        return res.status(200).json({message:"Updated task successfully",success:true,task});
    }
    catch(err)
    {
        console.log(`Error in updating the task : ${err}`);
        return res.status(500).json({message:"Unable to update the task",success:false});
    }
}

async function deleteTask(req,res)
{
    try{
        const taskId=req.params.id;
        const userId=req.user.id;
        if(!taskId)
            return res.status(400).json({message:"No task Id",success:false});
        if(!(await verifyUserByTask(taskId,userId)))
            return res.status(403).json({message:"You don't have access to this Taks",success:false});
        const task=await taskDb.findByIdAndDelete(taskId);
        if(!task)
            return res.status(404).json({message:"Task Not Found",success:false});
        return res.status(200).json({message:"Task deleted successfully",success:true});
    }
    catch(err)
    {
        console.log(`Error in Deleting Task : ${err} `);
        return res.status(500).json({message:"Unable to Delete Task",success:false});
    }
}
export {createTask,getTasks,getsingleTask,updateTask,deleteTask};
