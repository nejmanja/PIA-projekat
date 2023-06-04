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
                    res.status(404).json({ 'msg': "Korisnik ne postoji!" });
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
                    profilePic: req.body.profilePic
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
                });
            }
            user.save((err, dbres) => {
                if (err) {
                    console.log(err);
                    if (err.code && err.code == 11000) { // duplicate key err
                        res.status(400).json({ 'msg': "Već postoji korisnik sa datim kor. imenom/mejlom!" });
                    }
                    else { // unknown err
                        res.status(500).json({ 'msg': "Došlo je do greske, pokušajte ponovo!" });
                    }
                }
                else {
                    res.status(200).json({ 'msg': "OK" });
                }
            });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map