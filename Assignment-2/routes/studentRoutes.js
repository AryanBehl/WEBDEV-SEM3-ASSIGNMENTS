const express = require("express");
const students = require("../data/students");

const router = express.Router();
router.get("/", (req, res) => {
    res.status(200).json(students);
});

router.get("/:id", (req, res) => {
    const id = Number(req.params.id);
    const student = students.find((student) => student.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student Not Found"
        });
    }
    res.status(200).json(student);
});

router.post("/", (req, res) => {
    const newStudent = req.body;

    if (!newStudent.id || !newStudent.name || !newStudent.course) {
        return res.status(400).json({
            message: "All Fields Are Required"
        });
    }

    students.push(newStudent);
    res.status(201).json(newStudent);
});

router.put("/:id", (req, res) => {
    const id = Number(req.params.id);
    const student = students.find((student) => student.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student Not Found"
        });
    }

    student.name = req.body.name;
    student.course = req.body.course;
    res.status(200).json(student);
});

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = students.findIndex((student) => student.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Student Not Found"
        });
    }

    const deletedStudent = students.splice(index, 1);
    res.status(200).json(deletedStudent[0]);
});

module.exports = router;