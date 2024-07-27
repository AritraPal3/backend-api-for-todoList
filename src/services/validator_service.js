const { check, body, validationResult, oneOf } = require("express-validator");

exports.validateInput = [
    body("taskName")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Task Name cannot be Empty"),
    body("taskStatus")
        .notEmpty()
        .equals("To-do")
        .withMessage("Invalid Status"),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    }
];

exports.validateEditInput = [
    body("val")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Please provide a proper task name"),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    }
]

exports.validateStatusInput = [
    body("taskStatus")
        .notEmpty()
        .withMessage("Please provide a valid Status"),
    oneOf([
        body("taskStatus").equals("To-do"),
        body("taskStatus").equals("Completed"),
        body("taskStatus").equals("In-Progress"),
    ], "Task Status can either be To-do, Completed or In-Progress"),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    }
]