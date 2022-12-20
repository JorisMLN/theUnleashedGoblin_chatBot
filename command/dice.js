
// Function called when the "dice" command is issued

const rollDice = () => {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}