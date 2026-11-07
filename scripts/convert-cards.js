#!/usr/bin/env node
// Converts a raw card dump (e.g. 20260708Cards.json) → src/models/cards.json shape.

const fs = require("fs");
const path = require("path");

const inputPath = path.resolve(__dirname, "../", process.argv[2] ?? "cards20261106.json");
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

// Dumps also drop line breaks without leaving a space ("Draw a card.Ongoing:").
// If only whitespace differs, the previous description is the hand-fixed one.
const squash = (desc) => desc.replace(/\s/g, "");

// Unreleased cards ship as "!none" until their text exists; never prefer that.
const isPlaceholder = (desc) => /^!?none$/i.test(desc.trim());

// Last resort when no clean text exists: render the raw template ourselves,
// stripping markup, keeping line breaks as spaces, and marking unknown values X.
const renderRaw = (raw) =>
  raw
    .replace(/<[^>]+>/g, "")
    .replace(/\{card\.[^}]+\}/g, "X")
    .replace(/\s+/g, " ")
    .trim();

const previous = {};
if (fs.existsSync(outputPath)) {
  for (const card of JSON.parse(fs.readFileSync(outputPath, "utf8"))) {
    if (!isPlaceholder(card.description)) previous[card.cardDefId] = card.description;
  }
}

let recovered = 0;
let respaced = 0;
let rendered = 0;

const converted = cards.map((card) => {
  let description = card.descriptionFormatted;
  const old = previous[card.cardDefId];
  if (corruption(description) > 0 && old !== undefined && corruption(old) < corruption(description)) {
    description = old;
    recovered++;
  } else if (old !== undefined && description !== old && squash(description) === squash(old)) {
    description = old;
    respaced++;
  }
  if (corruption(description) > 0) {
    description = renderRaw(card.description);
    rendered++;
  }
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
if (respaced) console.log(`Kept ${respaced} previous descriptions that differed only in whitespace`);
if (rendered) console.log(`WARNING: ${rendered} cards had no clean description; rendered from raw template with unknown values as X`);
