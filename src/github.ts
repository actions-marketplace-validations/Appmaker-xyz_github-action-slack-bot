import * as core from "@actions/core";
import * as github from "@actions/github";
import sampleData from "./dummy-data/release.json";
import {
  Method,
  ChatPostMessageArguments,
  ChatPostMessageResponse,
} from "@slack/web-api";
class Github {
  private botToken: string;
  private channel: string;
  private appendMessage: string;
  constructor() {
    this.botToken = core.getInput("bot-token");
    this.channel = core.getInput("channel");
    this.appendMessage = core.getInput("append-message");
  }

  getInputs() {
    if (process?.env?.LOCAL_TESTING === "1") {
      return {
        botToken: process.env?.BOT_TOKEN,
        channel: process.env?.CHANNEL,
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
    const context =
      process?.env?.LOCAL_TESTING === "1" ? sampleData : github.context;
    const { eventName } = context;
    if (eventName !== "release") {
      return undefined;
    }

    return [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: eventName?.toUpperCase(),
          emoji: true,
        },
      },
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "Repo: " + `*${context?.payload?.repository?.name}*` ?? " ",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: context?.payload?.repository?.full_name ?? " ",
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Goto repo",
            emoji: true,
          },
          value: "click-123",
          url: context?.payload?.repository?.html_url ?? " ",
          action_id: "button-action",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "Tag: " + `*${context?.payload?.release?.tag_name}*` ?? " ",
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Goto Tag",
            emoji: true,
          },
          value: "click-123asd",
          url: context?.payload?.release?.html_url ?? " ",
          action_id: "button-action",
        },
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            "Released by: " + `*${context?.payload?.release?.author?.login}*` ??
            " ",
        },
        accessory: {
          type: "image",
          image_url: context?.payload?.release?.author?.avatar_url,
          alt_text: "pic",
        },
      },
      {
        type: "section",
        text: {
          type: "plain_text",
          text:
            "Created at: " + `${context?.payload?.release?.created_at}` ?? " ",
          emoji: true,
        },
      },
      {
        type: "section",
        text: {
          type: "plain_text",
          text:
            "Is pre-release " + `${context?.payload?.release?.prerelease}` ??
            " ",
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
          text: "Name " + `${context?.payload?.release?.name}` ?? " ",
          emoji: true,
        },
      },
      {
        type: "divider",
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text:
            context?.payload?.release?.body?.length > 0
              ? context?.payload?.release?.body
              : " ",
        },
      },
      {
        type: "divider",
      },
    ];
  }
  getMessageBlocks(message: string) {
    if (!message) {
      return undefined;
    }
    return {
      type: "section",
      text: {
        type: "plain_text",
        text: message ?? " ",
        emoji: true,
      },
    };
  }
  sendError(message: string) {
    core.setFailed(message);
  }
}
export default Github;
