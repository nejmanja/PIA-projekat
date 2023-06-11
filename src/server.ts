import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routers/user.router";
import agencyRouter from "./routers/agency.router";
import housingRouter from "./routers/housing.router";
import jobRouter from "./routers/job.router";
import requestRouter from "./routers/request.router";
import workerRouter from "./routers/worker.router";

const app = express();
app.use(cors());
app.use(express.json());

// db connection
mongoose.connect("mongodb://127.0.0.1:27017/Kucerak");
const connection = mongoose.connection;
connection.once("open", () => {
	console.log("Successfully connected to mongodb");
});

// routers
const router = express.Router();
router.use("/users", userRouter);
router.use("/agencies", agencyRouter);
router.use("/housing", housingRouter);
router.use("/jobs", jobRouter);
router.use("/requests", requestRouter);
router.use("/workers", workerRouter);

app.use('/', router);
// app.get("/", (req, res) => res.send("Hello World!"));
app.listen(4000, () => console.log(`Express server running on port 4000`));
