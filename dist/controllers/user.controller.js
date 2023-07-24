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
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = exports.getUser = void 0;
const bcrypt_1 = require("bcrypt");
const lib_1 = require("../lib");
const helpers_1 = require("../helpers");
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundUser = yield lib_1.prisma.user.findFirst({
            where: { id: req.params.id },
            include: { posts: true },
        });
        if (!foundUser)
            return res.status(404).json({ message: "user not found" });
        return res.status(200).json({ data: foundUser });
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(400).json({ error: error.message });
    }
});
exports.getUser = getUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundUser = yield lib_1.prisma.user.findFirst({
            where: { email: req.body.email },
        });
        if (!foundUser)
            return res.status(404).json({ message: "User not found" });
        return yield (0, bcrypt_1.compare)(`${req.body.password}`, foundUser.password).then((result) => __awaiter(void 0, void 0, void 0, function* () {
            const tokenSession = yield (0, helpers_1.tokenSign)(foundUser);
            if (result)
                return res.status(200).json({ data: foundUser, token: tokenSession });
            else
                return res.status(403).json({ error: "Invalid Credentials" });
        }));
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(400).json({ error: error.message });
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const passwordHashed = yield (0, bcrypt_1.hash)(`${req.body.password}`, 8);
        const newUser = yield Object.assign(Object.assign({}, req.body), { password: passwordHashed });
        return lib_1.prisma.user
            .create({ data: newUser })
            .then((response) => res.status(200).json({ data: response }));
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(400).json({ error: error.message });
    }
});
exports.register = register;
