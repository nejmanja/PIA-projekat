"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_router_1 = __importDefault(require("./routers/user.router"));
const agency_router_1 = __importDefault(require("./routers/agency.router"));
const housing_router_1 = __importDefault(require("./routers/housing.router"));
const job_router_1 = __importDefault(require("./routers/job.router"));
const request_router_1 = __importDefault(require("./routers/request.router"));
const worker_router_1 = __importDefault(require("./routers/worker.router"));
const review_router_1 = __importDefault(require("./routers/review.router"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// db connection
mongoose_1.default.connect("mongodb://127.0.0.1:27017/Kucerak");
const connection = mongoose_1.default.connection;
connection.once("open", () => {
    console.log("Successfully connected to mongodb");
});
// routers
const router = express_1.default.Router();
router.use("/users", user_router_1.default);
router.use("/agencies", agency_router_1.default);
router.use("/housing", housing_router_1.default);
router.use("/jobs", job_router_1.default);
router.use("/requests", request_router_1.default);
router.use("/workers", worker_router_1.default);
router.use("/reviews", review_router_1.default);
app.use('/', router);
// app.get("/", (req, res) => res.send("Hello World!"));
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map