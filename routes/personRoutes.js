const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Person = require("../models/Person.js");
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const newPerson = new Person(data);
    const response = await newPerson.save();

    console.log("Data Saved");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET method to get the Person
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data Fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Person get workType

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (
      workType == "chef" ||
      workType == "waiter" ||
      workType == "manager" ||
      workType == "engineer" ||
      workType == "teacher" ||
      workType == "developer"
    ) {
      const response = await Person.find({ work: workType });
      console.log("Response Fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid Work Type" });
      const get = await Person.find({ work });
      // res.json("work should be ",get)
      // console.log(get);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatePersonData = req.body;

    const response = await Person.findByIdAndUpdate(
      personId,
      updatePersonData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!response) {
      return res.status(404).json({ error: "Person Not Found" });
    }
    console.log("Data Updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete Data

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete({ _id: personId });
    if (!response) {
      return res
        .status(404)
        .json({ error: "Person ID Not Found Data Not Deleted" });
    }
    console.log("Data Deleted Successfully");
    res.status(200).json("Data Delete Successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


/*
router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(personId)) {
      return res.status(400).json({ error: "Invalid Person ID format" });
    }

    // Delete the person by ID
    const response = await Person.findByIdAndDelete(personId); // Directly pass the ID

    if (!response) {
      return res.status(404).json({ error: "Person ID not found, data not deleted" });
    }

    console.log("Data deleted successfully");
    res.status(200).json({ message: "Data deleted successfully", data: response });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

*/

module.exports = router;
