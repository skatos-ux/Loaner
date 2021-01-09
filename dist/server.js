"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const config = __importStar(require("./config.json"));
const router_1 = __importDefault(require("./routes/router"));
const app = express_1.default();
exports.app = app;
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use('/api', router_1.default);
if (config.useStatic) {
    app.use('/', express_1.default.static('static'));
}
else {
    app.get('/', (req, res) => {
        res.send('Version back-end uniquement');
    });
}
app.listen(config.serverPort, () => {
    console.log('Server is listening on port ' + config.serverPort);
});
