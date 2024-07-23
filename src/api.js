const {Task}  = require("../models/schema")

async function Save(details) {
    const task = new Task({
        id: details.id,
        creationDate: details.creationDate,
        taskName: details.taskName,
        taskStatus: details.taskStatus,
        completionDate: details.completionDate
    });

    try {
        await task.save();
        console.log("New Task Has Been Added");
    } catch (err) {
        console.error("Entry Could Not Be Saved, check your database connection", err);
    }
}

async function Edit(id, new_val) {
    try {
        const data = await Task.find({ id: id }).exec();
        console.log(data)
    }
    catch (err) {
        console.log("Cannot edit the particular record")
    }

}

async function Delete(id) {
    try {
        const data = await Task.find({ id: id }).exec();
        console.log(data)
        console.log(await Task.deleteOne({id:id}))
    }
    catch (err) {
        console.log("Cannot not fetcth the particular record")
    }
}

async function getData() {
    try {
        const data = await Task.find();
        return data;
    }
    catch (err) {
        console.log("Could not fetcth all records")
    }
}

module.exports={
    Save,Edit,Delete,getData
}