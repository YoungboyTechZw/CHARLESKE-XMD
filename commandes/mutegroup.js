```
const { zokou } = require("zokou");
const mongoose = require("mongoose");

// Assuming Group model is defined like this in your models/Group.js
const Group = require("./models/Group");

zokou(
  {
    nomCom: "mute",
    categorie: "Group",
    reaction: "🔇",
  },
  async (origineMessage, zgmt) => {
    try {
      const { id, chatId } = origineMessage;
      const group = await Group.findOne({ id: chatId });
      if (!group) {
        await Group.create({ id: chatId, muted: true });
        return await origineMessage.reply("*Group muted successfully*");
      }
      if (group.muted) {
        return await origineMessage.reply("*Group is already muted*");
      }
      await Group.findByIdAndUpdate(group._id, { muted: true });
      await origineMessage.reply("*Group muted successfully*");
    } catch (e) {
      console.error(e);
      await origineMessage.error(`${e}\n\ncommand: mute`, e);
    }
  }
);

zokou(
  {
    nomCom: "unmute",
    categorie: "Group",
    reaction: "🔊",
  },
  async (origineMessage, zgmt) => {
    try {
      const { id, chatId } = origineMessage;
      const group = await Group.findOne({ id: chatId });
      if (!group || !group.muted) {
        return await origineMessage.reply("*Group is not muted*");
      }
      await Group.findByIdAndUpdate(group._id, { muted: false });
      await origineMessage.reply("*Group unmuted successfully*");
    } catch (e) {
      console.error(e);
      await origineMessage.error(`${e}\n\ncommand: unmute`, e);
    }
  }
);
```
