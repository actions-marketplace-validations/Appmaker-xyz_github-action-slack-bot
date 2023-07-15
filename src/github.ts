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
    console.log(process?.env?.LOCAL_TESTING,'xxx')
    const context =
      process?.env?.LOCAL_TESTING === "1" ? sampleData : github.context;
    const { eventName } = context;
    if (eventName !== "release") {
      return undefined;
    }
   return [
    {
			"type": "header",
			"text": {
				"type": "plain_text",
				"text": eventName?.toUpperCase(),
				"emoji": true
			}
		},
    {
      "type": "divider"
    },
    {
			"type": "section",
			"text": {
				"type": "plain_text",
				"text": `${github.context?.payload?.repository?.name}`,
				"emoji": true
			}
		},
    // {
		// 	"type": "section",
		// 	"text": {
		// 		"type": "mrkdwn",
		// 		"text": github.context?.payload?.repository?.full_name
		// 	},
		// 	"accessory": {
		// 		"type": "button",
		// 		"text": {
		// 			"type": "plain_text",
		// 			"text": "Open repo",
		// 			"emoji": true
		// 		},
		// 		"value": github.context?.payload?.repository?.html_url,
		// 		"url": github.context?.payload?.repository?.html_url,
		// 		"action_id": "button-action"
		// 	}
		// }
   ]

  }
}
export default Github;
