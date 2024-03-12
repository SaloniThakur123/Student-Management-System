const express = require("express");
const router = express.Router();

const Student = require("../models/student");

router.get("/students", async (req, res) => {
  const studentss = await Student.find({});
  res.send(studentss);
});

//adding a student
router.post("/students", async (req, res) => {
  const { name, rollNo } = req.body;
  try{
    await Student.create({ name, rollNo });
    res.render('student',{
      msg:"Student created successfully",
      user:req.user
    });
  }catch(err){
    res.render('student',{
      msg:"Student of same roll no. exists",
      user:req.user
    })
  }
});

//get a single student
router.get("/students/:rollNo", async (req, res) => {
  const { rollNo } = req.params;
  const singleStudent = await Student.findOne({ rollNo });
  res.send(singleStudent);
});

// update a student
router.put("/students/:rollNo", async (req, res) => {
  const { rollNo } = req.params;
  const { name } = req.body;
  // console.log(newrollno);
  await Student.findOneAndUpdate({ rollNo }, { name });
  res.send("updated");
});

//delete a student
router.delete("/students/:rollNo", async (req, res) => {
  const { rollNo } = req.params;
  await Student.findOneAndDelete({ rollNo });

  res.send("successfully deleted");
});

module.exports = router;
