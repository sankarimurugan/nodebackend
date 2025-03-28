const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const Joi = require("joi");

const PORT = process.env.PORT || 3000; // Set default port

const app = express();
app.use(cors());
app.use(express.json()); // This must come before routes

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get("/api/users", (req, res) => {
  res.send({
    status: "Success",
    data: [
      { id: 1, name: "Sankari" },
      { id: 2, name: "Keerthi" },
      { id: 3, name: "Ramya" },
    ],
  });
});

app.post("/api/add/users", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    age: Joi.string().min(1).required(),
    mobile: Joi.string()
      .pattern(/^\d{10}$/)
      .required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  res.send({ status: "Success", message: "Profile created successfully" });
});

app.delete("/api/user/delete", (req, res) => {
  res.send({ status: "User Deleted Successfully" });
});
