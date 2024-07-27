const { Save, Edit, Delete, EditStatus, getData } = require("../services/todo_service")

async function showData(req, res, next) {
    let options = (req.query)

    // setting default conditions
    if (options.statusFilter == "Filter By")
        options.statusFilter = ""
    if (options.sortBy == "Sort By")
        options.sortBy = ""

    console.dir(options)
    let data = await getData(options);
    // console.dir(data())
    res.send(data)
    // console.log(data)
    console.log("Will Return All Data")
}

function saveData(req, res, next) {
    console.log(req.body)
    let params = {
        id: req.body.id,
        completionDate: req.body.completionDate,
        taskStatus: req.body.taskStatus,
        taskName: req.body.taskName,
        creationDate: req.body.creationDate,
        deadlineDate: req.body.deadlineDate,
    }

    //including validation


    Save(params)
    res.send(params)
    console.log("Will Save the new Data")
}

async function editData(req, res, next) {
    console.dir(req.body)
    let { id, val, date } = req.body;
    old_data = await Edit(id, val, date)
    res.send(old_data)
    console.log("Data record will be updated")
}

async function editStatus(req, res, next) {
    let data = { id, taskStatus, completionDate } = req.body
    old_data = await EditStatus(data)
    res.send(old_data)
    console.log("Data record will be updated")
}

function deleteData(req, res, next) {
    let id = req.body.id
    console.log(id)
    Delete(id);
    res.send("Record has been deleted")
}

module.exports = {
    showData, saveData, editData, editStatus, deleteData
}
