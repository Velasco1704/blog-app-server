"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.PORT = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3003;
exports.JWT_SECRET = (_b = process.env.SECRET) !== null && _b !== void 0 ? _b : "";
