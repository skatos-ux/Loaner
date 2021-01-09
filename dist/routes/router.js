"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const device_route_1 = __importDefault(require("./device_route"));
const user_route_1 = __importDefault(require("./user_route"));
const category_route_1 = __importDefault(require("./category_route"));
const auth_route_1 = __importDefault(require("./auth_route"));
const router = express_1.default.Router();
router.use('/devices', device_route_1.default);
router.use('/users', user_route_1.default);
router.use('/category', category_route_1.default);
router.use('/auth', auth_route_1.default);
exports.default = router;
