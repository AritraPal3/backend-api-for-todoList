const express=require("express")
const router=express.Router()

const validator=require("../services/validator_service")

const {showData,saveData,editData,editStatus,deleteData}=require("../controller/todo.controller")

//defining routes
router.get("/todo/show/",showData)
router.route("/todo/save").post(validator.validateInput,saveData)
router.route("/todo/edit").post(validator.validateEditInput,editData);
router.route("/todo/editStatus").post(validator.validateStatusInput,editStatus);
router.post("/todo/delete",deleteData);

module.exports=router;