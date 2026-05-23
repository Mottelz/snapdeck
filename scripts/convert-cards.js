#!/usr/bin/env node
// Converts 20260523cards.json → src/models/cards.json shape.

const fs = require("fs");
const path = require("path");

const inputPath = path.resolve(__dirname, "../20260523cards.json");
const outputPath = path.resolve(__dirname, "../src/models/cards.json");

const cards = JSON.parse(fs.readFileSync(inputPath, "utf8"));

function toShortName(cardDefId) {
  return cardDefId.replace(/[aeiouy]/g, "") + cardDefId.length.toString(16).toUpperCase();
}

const converted = cards.map((card) => ({
  power: card.power,
  cost: card.cost,
  name: card.name,
  obtainable: card.obtainable,
  description: card.descriptionFormatted,
  releaseDate: card.releaseDate,
  cardDefId: card.cardDefId,
  shortName: toShortName(card.cardDefId),
}));

fs.writeFileSync(outputPath, JSON.stringify(converted, null, 2));
console.log(`Written ${converted.length} cards to ${outputPath}`);
