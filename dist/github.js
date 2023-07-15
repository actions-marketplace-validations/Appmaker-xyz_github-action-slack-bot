"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const release_json_1 = __importDefault(require("./dummy-data/release.json"));
class Github {
    constructor() {
        this.botToken = core.getInput("bot-token");
        this.channel = core.getInput("channel");
        this.appendMessage = core.getInput("append-message");
    }
    getInputs() {
        var _a, _b, _c;
        if (((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.LOCAL_TESTING) === "1") {
            return {
                botToken: (_b = process.env) === null || _b === void 0 ? void 0 : _b.BOT_TOKEN,
                channel: (_c = process.env) === null || _c === void 0 ? void 0 : _c.CHANNEL,
                appendMessage: "SAMPLE MESSAGE",
            };
        }
        return {
            botToken: this.botToken,
            channel: this.channel,
            appendMessage: this.appendMessage,
        };
    }
    getReleasePayloadsBlocks() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12;
        const context = ((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.LOCAL_TESTING) === "1" ? release_json_1.default : github.context;
        const { eventName } = context;
        if (eventName !== "release") {
            return undefined;
        }
        return [
            {
                type: "header",
                text: {
                    type: "plain_text",
                    text: eventName === null || eventName === void 0 ? void 0 : eventName.toUpperCase(),
                    emoji: true,
                },
            },
            {
                type: "divider",
            },
            {
                type: "section",
                text: {
                    type: "plain_text",
                    text: (_d = "Repo: " + `${(_c = (_b = context === null || context === void 0 ? void 0 : context.payload) === null || _b === void 0 ? void 0 : _b.repository) === null || _c === void 0 ? void 0 : _c.name}`) !== null && _d !== void 0 ? _d : " ",
                    emoji: true,
                },
            },
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: (_g = (_f = (_e = context === null || context === void 0 ? void 0 : context.payload) === null || _e === void 0 ? void 0 : _e.repository) === null || _f === void 0 ? void 0 : _f.full_name) !== null && _g !== void 0 ? _g : " ",
                },
                accessory: {
                    type: "button",
                    text: {
                        type: "plain_text",
                        text: "Goto repo",
                        emoji: true,
                    },
                    value: "click-123",
                    url: (_k = (_j = (_h = context === null || context === void 0 ? void 0 : context.payload) === null || _h === void 0 ? void 0 : _h.repository) === null || _j === void 0 ? void 0 : _j.html_url) !== null && _k !== void 0 ? _k : " ",
                    action_id: "button-action",
                },
            },
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: (_o = "Tag" + `${(_m = (_l = context === null || context === void 0 ? void 0 : context.payload) === null || _l === void 0 ? void 0 : _l.release) === null || _m === void 0 ? void 0 : _m.tag_name}`) !== null && _o !== void 0 ? _o : " ",
                },
                accessory: {
                    type: "button",
                    text: {
                        type: "plain_text",
                        text: "Goto Tag",
                        emoji: true,
                    },
                    value: "click-123asd",
                    url: (_r = (_q = (_p = context === null || context === void 0 ? void 0 : context.payload) === null || _p === void 0 ? void 0 : _p.release) === null || _q === void 0 ? void 0 : _q.html_url) !== null && _r !== void 0 ? _r : " ",
                    action_id: "button-action",
                },
            },
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: (_v = "Released by: " + `${(_u = (_t = (_s = context === null || context === void 0 ? void 0 : context.payload) === null || _s === void 0 ? void 0 : _s.release) === null || _t === void 0 ? void 0 : _t.author) === null || _u === void 0 ? void 0 : _u.login}`) !== null && _v !== void 0 ? _v : " ",
                },
                accessory: {
                    type: "image",
                    image_url: (_y = (_x = (_w = context === null || context === void 0 ? void 0 : context.payload) === null || _w === void 0 ? void 0 : _w.release) === null || _x === void 0 ? void 0 : _x.author) === null || _y === void 0 ? void 0 : _y.avatar_url,
                    alt_text: "pic",
                },
            },
            {
                type: "section",
                text: {
                    type: "plain_text",
                    text: (_1 = "Created at: " + `${(_0 = (_z = context === null || context === void 0 ? void 0 : context.payload) === null || _z === void 0 ? void 0 : _z.release) === null || _0 === void 0 ? void 0 : _0.created_at}`) !== null && _1 !== void 0 ? _1 : " ",
                    emoji: true,
                },
            },
            {
                type: "section",
                text: {
                    type: "plain_text",
                    text: (_4 = "Is pre-release " + `${(_3 = (_2 = context === null || context === void 0 ? void 0 : context.payload) === null || _2 === void 0 ? void 0 : _2.release) === null || _3 === void 0 ? void 0 : _3.prerelease}`) !== null && _4 !== void 0 ? _4 : " ",
                    emoji: true,
                },
            },
            {
                type: "divider",
            },
            {
                type: "section",
                text: {
                    type: "plain_text",
                    text: (_7 = "Name " + `${(_6 = (_5 = context === null || context === void 0 ? void 0 : context.payload) === null || _5 === void 0 ? void 0 : _5.release) === null || _6 === void 0 ? void 0 : _6.name}`) !== null && _7 !== void 0 ? _7 : " ",
                    emoji: true,
                },
            },
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: ((_10 = (_9 = (_8 = context === null || context === void 0 ? void 0 : context.payload) === null || _8 === void 0 ? void 0 : _8.release) === null || _9 === void 0 ? void 0 : _9.prerelease) === null || _10 === void 0 ? void 0 : _10.length) > 0
                        ? (_12 = (_11 = context === null || context === void 0 ? void 0 : context.payload) === null || _11 === void 0 ? void 0 : _11.release) === null || _12 === void 0 ? void 0 : _12.prerelease
                        : " ",
                },
            },
        ];
    }
    getMessageBlocks(message) {
        if (!message) {
            return undefined;
        }
        return {
            type: "section",
            text: {
                type: "plain_text",
                text: message !== null && message !== void 0 ? message : " ",
                emoji: true,
            },
        };
    }
    sendError(message) {
        core.setFailed(message);
    }
}
exports.default = Github;
