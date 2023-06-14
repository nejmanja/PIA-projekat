"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestController = void 0;
const workplace_request_1 = __importDefault(require("../models/workplace-request"));
const registration_request_1 = __importDefault(require("../models/registration-request"));
const user_1 = __importDefault(require("../models/user"));
const ban_1 = __importDefault(require("../models/ban"));
class RequestController {
    constructor() {
        this.addWorkplaceRequest = (req, res) => {
            const wpreq = new workplace_request_1.default({
                reqType: "workplace",
                agency: req.body.agency,
                numWorkplaces: req.body.numWorkplaces,
            });
            wpreq.save((err, dbres) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
                }
                else {
                    res.status(200).json({ msg: "OK" });
                }
            });
        };
        this.denyWorkplaces = (req, res) => {
            workplace_request_1.default.deleteOne({ _id: req.body.id }, (err, doc) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
                }
                else {
                    res.status(200).json(doc);
                }
            });
        };
        this.approveWorkplaces = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const wpreq = yield workplace_request_1.default.findById({ _id: req.body.id });
                const doc = yield user_1.default.updateOne({ username: wpreq.agency }, { $inc: { workplaces: wpreq.numWorkplaces } });
                yield workplace_request_1.default.deleteOne({ _id: req.body.id });
                res.status(200).json(doc);
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
            }
        });
        this.addRegistrationRequest = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield user_1.default.findOne({
                    $or: [{ username: req.body.username }, { email: req.body.email }],
                });
                const banResult = yield ban_1.default.findOne({
                    $or: [{ username: req.body.username }, { email: req.body.email }],
                });
                if (banResult != null) {
                    res.status(400).json({ msg: "Nije Vam dozvoljeno da pravite nalog!" });
                }
                else if (result != null) {
                    res
                        .status(400)
                        .json({ msg: "Već postoji korisnik sa datim kor. imenom/mejlom!" });
                }
                else {
                    const usrType = req.body.type;
                    let user;
                    if (usrType == 0) {
                        user = new registration_request_1.default({
                            reqType: "userRegistration",
                            username: req.body.username,
                            password: req.body.password,
                            phoneNum: req.body.phoneNum,
                            email: req.body.email,
                            type: usrType,
                            name: req.body.name,
                            surname: req.body.surname,
                            profilePic: req.body.profilePic,
                        });
                    }
                    else {
                        user = new registration_request_1.default({
                            reqType: "agencyRegistration",
                            username: req.body.username,
                            password: req.body.password,
                            phoneNum: req.body.phoneNum,
                            email: req.body.email,
                            type: usrType,
                            agencyName: req.body.agencyName,
                            country: req.body.country,
                            city: req.body.city,
                            street: req.body.street,
                            agencyNum: req.body.agencyNum,
                            desc: req.body.desc,
                            profilePic: req.body.profilePic,
                            workplaces: 0,
                        });
                    }
                    yield user.save();
                    res.status(200).json({ msg: "OK" });
                }
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
            }
        });
        this.getAllRegistrationRequests = (req, res) => {
            registration_request_1.default.find({
                $or: [
                    { reqType: "userRegistration" },
                    { reqType: "agencyRegistration" },
                ],
            }, (err, docs) => {
                if (err) {
                    console.log(err);
                    res
                        .status(500)
                        .json({ msg: "Došlo je do greške, pokušajte ponovo!" });
                }
                else {
                    res.status(200).json(docs);
                }
            });
        };
        this.getAllWorkplaceRequests = (req, res) => {
            workplace_request_1.default.find({ reqType: "workplace" }, (err, docs) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
                }
                else {
                    res.status(200).json(docs);
                }
            });
        };
        this.approveRegistration = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const reg = yield registration_request_1.default.findOne({
                    username: req.body.username,
                });
                if (reg.reqType == "userRegistration") {
                    const user = new user_1.default({
                        username: reg.username,
                        password: reg.password,
                        phoneNum: reg.phoneNum,
                        email: reg.email,
                        profilePic: reg.profilePic,
                        type: reg.type,
                        name: reg.name,
                        surname: reg.surname,
                    });
                    yield user.save();
                }
                else {
                    const user = new user_1.default({
                        username: reg.username,
                        password: reg.password,
                        phoneNum: reg.phoneNum,
                        email: reg.email,
                        profilePic: reg.profilePic,
                        type: reg.type,
                        agencyName: reg.agencyName,
                        country: reg.country,
                        city: reg.city,
                        street: reg.street,
                        agencyNum: reg.agencyNum,
                        desc: reg.desc,
                        workplaces: 0,
                    });
                    yield user.save();
                }
                yield registration_request_1.default.deleteOne({ username: req.body.username });
                res.status(200).json({ msg: "OK" });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
            }
        });
        this.banUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const reg = yield registration_request_1.default.findOne({
                    username: req.body.username,
                });
                const ban = new ban_1.default({
                    username: reg.username,
                    email: reg.email,
                });
                const doc = yield ban.save();
                yield registration_request_1.default.deleteOne({ username: req.body.username });
                res.status(200).json(doc);
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ msg: "Došlo je do greške, pokušajte ponovo!" });
            }
        });
    }
}
exports.RequestController = RequestController;
//# sourceMappingURL=request.controller.js.map