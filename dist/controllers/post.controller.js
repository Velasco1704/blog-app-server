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
exports.deletePost = exports.updatePost = exports.createPost = exports.getPost = exports.getPosts = void 0;
const lib_1 = require("../lib");
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield lib_1.prisma.post
            .findMany()
            .then((response) => res.json({ result: response }));
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(400).json({ error: error.message });
    }
});
exports.getPosts = getPosts;
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundPost = yield lib_1.prisma.post.findFirst({
            where: { id: req.params.id },
            include: { user: true },
        });
        if (!foundPost)
            return res.status(404).json({ error: "post not found" });
        else
            return res.status(200).json({ result: foundPost });
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(400).json({ error: error.message });
    }
});
exports.getPost = getPost;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield lib_1.prisma.post
            .create({ data: req.body })
            .then((response) => res.status(200).json({ result: response }))
            .catch(() => res.status(403).json({ error: "Invalid Credentials" }));
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(400).json({ error: error.message });
    }
});
exports.createPost = createPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield lib_1.prisma.post
            .update({
            where: { id: req.params.id },
            data: req.body,
        })
            .then((response) => res.status(200).json({ result: response }))
            .catch(() => res.status(403).json({ error: "Invalid Credentials" }));
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(400).json({ error: error.message });
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield lib_1.prisma.post
            .delete({ where: { id: req.params.id } })
            .then(() => res.status(200).json({ message: "SUCCESS" }))
            .catch(() => res.status(404).json({ error: "Invalid Credentials" }));
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(400).json({ error: error.message });
    }
});
exports.deletePost = deletePost;
