# Send message to slack channel on releases



## Usage



```yaml
- uses: ./
  with:
    bot-token: ${{ secrets.BOT_TOKEN}}
    channel: ${{ secrets.CHANNEL}}
    append-message: By Deploy bot
```


