require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const userRouter = require("./routes/index");

//Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/user", userRouter);

const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
