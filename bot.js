import { rollDice } from './command/dice';


const tmi = require('tmi.js');

// Define configuration options
const options = {
  identity: {
    username: 'TheUnleashedGoblin',
    password: '<OAUTH_TOKEN>'
  },
  channels: [
    '<CHANNEL_NAME>'
  ]
};
const client = new tmi.client(options);

// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- //

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {

  // Ignore messages from the bot
  if (self) { 
    return; 
  }

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName === '!dice') {
    const num = rollDice();
    client.say(target, `You rolled a ${num}`);
    console.log(`* Executed ${commandName} command`);
  } else {
    console.log(`* Unknown command ${commandName}`);
  }
}

