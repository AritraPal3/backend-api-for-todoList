const express=require("express")
const router=express.Router()
 
const {Save,Edit,Delete,getData}=require("../api")

//defining routes
router.get("/show",showData)
router.post("/save",saveData);
router.post("/edit/:id",editData);
router.post("/delete/:id",deleteData);

function showData(req,res,next)
{
    console.dir(req.body)
    res.send((getData()));
    console.log("Will Return All Data")
}

async function saveData(req, res, next) {
    console.log(req.body);
    let details = {
        id: req.body.id,
        taskName: req.body.taskName,
        creationDate: req.body.creationDate,
        completionDate: req.body.completionDate,
        taskStatus: req.body.taskStatus,
    };

    try {
        await Save(details);
        res.send("New Task Has Been Saved");
        console.log("Saved the new Data");
    } catch (err) {
        next(err); // Pass errors to Express error handler
    }
}

function editData(req,res,next)
{
    console.log(req.body)
    let {id,val}=req.body;
    Edit(id,val)
    res.send("Data record will be updated")
}

function deleteData(req,res,next)
{
    console.log(req.body)
    let id=req.body.id
    Delete(id);
    res.send("Record has been deleted")
}

module.exports=router;