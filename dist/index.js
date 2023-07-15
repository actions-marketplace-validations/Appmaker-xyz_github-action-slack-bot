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
const github_1 = __importDefault(require("./github"));
const slack_1 = __importDefault(require("./slack"));
require("dotenv/config");
(() => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const github = new github_1.default();
    const { botToken = "", appendMessage, channel = "" } = github.getInputs();
    if (!botToken || botToken.length === 0 || !channel || channel.length === 0) {
        return github.sendError("Parameters missing");
    }
    const slack = new slack_1.default(botToken);
    const blocks = github.getReleasePayloadsBlocks();
    let newBlock = blocks;
    let appendBlock = github.getMessageBlocks(appendMessage);
    if (appendBlock) {
        newBlock === null || newBlock === void 0 ? void 0 : newBlock.push(appendBlock);
    }
    try {
        yield slack.sendMessage({
            message: "Github action",
            channel,
            blocks: newBlock,
        });
    }
    catch (error) {
        console.log(error);
        return github.sendError((_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "Something went wrong");
    }
}))();
