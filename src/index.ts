import Github from "./github";
import Slack from "./slack";
import "dotenv/config";

(async () => {
  const github = new Github();
  const { botToken = "", appendMessage, channel = "" } = github.getInputs();
  if (!botToken || botToken.length === 0 || !channel || channel.length === 0) {
    return github.sendError("Parameters missing");
  }
  const slack = new Slack(botToken);
  const blocks = github.getReleasePayloadsBlocks();
  let newBlock = blocks;
  let appendBlock = github.getMessageBlocks(appendMessage);
  if (appendBlock) {
    newBlock?.push(appendBlock);
  }
  try {
    await slack.sendMessage({
      message: "Github action",
      channel,
      blocks: newBlock,
    });
    console.log("Message sent to slack successfully");
  } catch (error: any) {
    console.log(error);
    return github.sendError(error?.message ?? "Something went wrong");
  }
})();
