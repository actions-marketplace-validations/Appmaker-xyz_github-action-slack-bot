import {
  WebClient,
  Method,
  ChatPostMessageArguments,
  ChatPostMessageResponse,
} from "@slack/web-api";
class Slack {
  private client: WebClient;
  constructor(botToken: string) {
    this.client = new WebClient(botToken);
  }
  async sendMessage({
    message,
    blocks,
    channel,
  }: {
    message: string;
    blocks?: any;
    channel: string;
  }) {
    const messageBody: any = {
      text: message,
      channel: channel,
    };
    if (blocks) {
      messageBody.blocks = blocks;
    }
    const result = await this.client.chat.postMessage(messageBody);
  }
}

export default Slack;
