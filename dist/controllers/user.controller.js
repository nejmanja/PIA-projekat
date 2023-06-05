"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
class UserController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.findOne({ username: username, password: password }, (err, user) => {
                if (err) {
                    console.log(err);
                    res.status(404).json({ msg: "Korisnik ne postoji!" });
                }
                else
                    res.status(200).json(user);
            });
        };
        this.register = (req, res) => {
            const usrType = req.body.type;
            let user;
            if (usrType == 0) {
                user = new user_1.default({
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
                user = new user_1.default({
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
                });
            }
            user.save((err, dbres) => {
                if (err) {
                    console.log(err);
                    if (err.code && err.code == 11000) {
                        // duplicate key err
                        res
                            .status(400)
                            .json({ msg: "Već postoji korisnik sa datim kor. imenom/mejlom!" });
                    }
                    else {
                        // unknown err
                        res
                            .status(500)
                            .json({ msg: "Došlo je do greske, pokušajte ponovo!" });
                    }
                }
                else {
                    res.status(200).json({ msg: "OK" });
                }
            });
        };
        this.changePassword = (req, res) => {
            const username = req.body.username;
            user_1.default.findOneAndUpdate({ username: username, password: req.body.oldPassword }, { password: req.body.newPassword }, (err, docs) => {
                if (docs == null) {
                    res.status(400).json({ msg: "Neispravna stara lozinka!" });
                }
                else if (err) {
                    console.log(err);
                    res
                        .status(500)
                        .json({ msg: "Došlo je do greske, pokušajte ponovo!" });
                }
                else {
                    console.log(docs);
                    res.status(200).json(docs);
                }
            });
        };
        this.getOne = (req, res) => {
            user_1.default.findOne({ username: req.query.username, type: 0 }, { password: 0 }, (err, doc) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ msg: "Došlo je do greske, pokušajte ponovo!" });
                }
                else {
                    res.status(200).json(doc);
                }
            });
        };
        this.updateOne = (req, res) => {
            let updateBlock = {};
            if (req.body.name != null)
                updateBlock['name'] = req.body.name;
            if (req.body.surname != null)
                updateBlock['surname'] = req.body.surname;
            if (req.body.email != null)
                updateBlock['email'] = req.body.email;
            if (req.body.phoneNum != null)
                updateBlock['phoneNum'] = req.body.phoneNum;
            if (req.body.profilePic != null)
                updateBlock['profilePic'] = req.body.profilePic;
            user_1.default.findOneAndUpdate({ username: req.query.username }, { "$set": updateBlock }, (err, docs) => {
                if (docs == null || err) {
                    console.log(err);
                    res
                        .status(500)
                        .json({ msg: "Došlo je do greske, pokušajte ponovo!" });
                }
                else {
                    console.log(docs);
                    res.status(200).json(docs);
                }
            });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map