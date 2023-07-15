import Github from "./github";
import Slack from "./slack";
import 'dotenv/config'

(async ()=>{
    const github = new Github();
    const {botToken="",appendMessage,channel=""} = github.getInputs();
    const slack = new Slack(botToken);
    const blocks = github.getReleasePayloadsBlocks();
    console.log(JSON.stringify(blocks,undefined,2))
})()