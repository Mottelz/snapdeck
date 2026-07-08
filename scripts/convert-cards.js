#!/usr/bin/env node
// Converts a raw card dump (e.g. 20260708Cards.json) → src/models/cards.json shape.

const fs = require("fs");
const path = require("path");

const inputPath = path.resolve(__dirname, "../", process.argv[2] ?? "20260708Cards.json");
const outputPath = path.resolve(__dirname, "../src/models/cards.json");

const cards = JSON.parse(fs.readFileSync(inputPath, "utf8"));

function toShortName(cardDefId) {
  return cardDefId.replace(/[aeiouy]/g, "") + cardDefId.length.toString(16).toUpperCase();
}

// Raw dumps sometimes ship broken descriptionFormatted values: placeholder
// substitution gone wrong (huge garbage numbers) or raw {card.X} placeholders.
// Garbage numbers are worse than visible placeholders, so rank by severity and
// keep the previous cards.json description when it's the less corrupted one.
const corruption = (desc) => (/\d{6,}/.test(desc) ? 2 : /\{card\./.test(desc) ? 1 : 0);

const previous = {};
if (fs.existsSync(outputPath)) {
  for (const card of JSON.parse(fs.readFileSync(outputPath, "utf8"))) {
    previous[card.cardDefId] = card.description;
  }
}

let recovered = 0;
let stillCorrupted = 0;

const converted = cards.map((card) => {
  let description = card.descriptionFormatted;
  const old = previous[card.cardDefId];
  if (corruption(description) > 0 && old !== undefined && corruption(old) < corruption(description)) {
    description = old;
    recovered++;
  }
  if (corruption(description) > 0) stillCorrupted++;
  return {
    power: card.power,
    cost: card.cost,
    name: card.name,
    obtainable: card.obtainable,
    description,
    releaseDate: card.releaseDate,
    cardDefId: card.cardDefId,
    shortName: toShortName(card.cardDefId),
  };
});

fs.writeFileSync(outputPath, JSON.stringify(converted, null, 2));
console.log(`Written ${converted.length} cards to ${outputPath}`);
if (recovered) console.log(`Recovered ${recovered} corrupted descriptions from previous cards.json`);
if (stillCorrupted) console.log(`WARNING: ${stillCorrupted} cards still have corrupted descriptions (no clean previous version)`);
