import {projectDb} from "./../model/ProjectDb.js";
async function addProject(req,res)
{
    try{
        const info=req.user;
        const {name,description,deadline,members,color,icon}=req.body;
        if(!name)
        {
            return res.status(400).json({message:"invalid details","success":false});
        }
        const project=await projectDb.create({name,description,color,icon,deadline,owner:info.id,members});
        return res.status(201).json({message:"project added","success":true,project:project});
    }
    catch(err)
    {
        console.log(`error occured : ${err}`);
        return res.status(500).json({message:"error Occured","success":false});
    }
}

async function getProjects(req,res)
{
    try{
        const info=req.user;
        const {id}=info;
        const projects=await projectDb.find({$or:[{owner:id},{members:id}]});
        return res.status(200).json({success:true,projects});
    }
    catch(err)
    {
        console.log(`error Occured: ${err}`);
        return res.status(500).json({"message":"error Occured",success:false});
    }
}

async function getProjectByName(req,res)
{
    try{
        const info=req.user;
        const {id}=info;
        const {name}=req.query;
        const projects=await projectDb.findOne({$or:[{owner:id},{members:id}],name:name});
        return res.status(200).json({success:true,projects});
    }
    catch(err)
    {
        console.log(`error Occured: ${err}`);
        return res.status(500).json({"message":"error Occured",success:false});
    }
}

async function editProjectDetails(req,res)
{
     try{
        const info=req.user;
        const {name,description,deadline,members,color,icon}=req.body;
        const {id:_id}=req.params;
        const project=await projectDb.findOneAndUpdate({_id:_id,owner:info.id},{name,description,color,icon,deadline,members},{new:true,runValidators:true});
        if(project==null)
            return res.status(404).json({"message":"No valid project to update",success:false});
        return res.status(200).json({message:"project updated","success":true,project:project});
    }
    catch(err)
    {
        console.log(`eror occured : ${err}`);
        return res.status(500).json({message:"error Occured","success":false});
    }
}
async function deleteProject(req,res)
{
    try{
        const info=req.user;
        const {id}=req.params;
        const output=await projectDb.findOneAndDelete({owner:info.id,_id:id});
        if(output==null)
            return res.status(404).json({"message":"No valid Project Available",success:false});
        res.status(200).json({"message":"project Deleted",success:true});
    }
    catch(err)
    {
       console.log(`error occured : ${err}`);
       res.status(500).json({"message":"error Occured",success:false});
    }

}
export {addProject,getProjects,getProjectByName,editProjectDetails,deleteProject};