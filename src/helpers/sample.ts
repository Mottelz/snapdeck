const sampleDeck = {
  shortCode: {
    encrypted:
      'QXBjbHBzQSxCbGQ1LENsbG5XbmdCLENydnNHbHZDLERyY2w3LEdtYnQ2LEtobnNoNyxMZFNmNyxNZGs1LE1yYnM3LFByeG1NZG5naHRGLFNjcm41',
    decrypted:
      'ApclpsA,Bld5,CllnWngB,CrvsGlvC,Drcl7,Gmbt6,Khnsh7,LdSf7,Mdk5,Mrbs7,PrxmMdnghtF,Scrn5',
  },
  longCode: {
    encrypted:
      'eyJOYW1lIjoiRGlzY2FyZCIsIkNhcmRzIjpbeyJDYXJkRGVmSWQiOiJBcG9jYWx5cHNlIn0seyJDYXJkRGVmSWQiOiJCbGFkZSJ9LHsiQ2FyZERlZklkIjoiQ29sbGVlbldpbmcifSx7IkNhcmREZWZJZCI6IkNvcnZ1c0dsYWl2ZSJ9LHsiQ2FyZERlZklkIjoiRHJhY3VsYSJ9LHsiQ2FyZERlZklkIjoiR2FtYml0In0seyJDYXJkRGVmSWQiOiJLaG9uc2h1In0seyJDYXJkRGVmSWQiOiJMYWR5U2lmIn0seyJDYXJkRGVmSWQiOiJNb2RvayJ9LHsiQ2FyZERlZklkIjoiTW9yYml1cyJ9LHsiQ2FyZERlZklkIjoiUHJveGltYU1pZG5pZ2h0In0seyJDYXJkRGVmSWQiOiJTY29ybiJ9XX0=',
    decrypted:
      '{"Name":"Discard","Cards":[{"CardDefId":"Apocalypse"},{"CardDefId":"Blade"},{"CardDefId":"ColleenWing"},{"CardDefId":"CorvusGlaive"},{"CardDefId":"Dracula"},{"CardDefId":"Gambit"},{"CardDefId":"Khonshu"},{"CardDefId":"LadySif"},{"CardDefId":"Modok"},{"CardDefId":"Morbius"},{"CardDefId":"ProximaMidnight"},{"CardDefId":"Scorn"}]}',
  },
  cards: [
    {
      cardDefId: 'Apocalypse',
      name: 'Apocalypse',
      power: '8',
      cost: '6',
      obtainable: true,
      description: 'When you discard this, put it back with +4 Power.',
      releaseDate: new Date('0001-01-01T00:00:00.000Z'),
      shortName: 'ApclpsA',
    },
    {
      cardDefId: 'Blade',
      name: 'Blade',
      power: '3',
      cost: '1',
      obtainable: true,
      description: 'On Reveal: Discard the rightmost card from your hand.',
      releaseDate: new Date('0001-01-01T00:00:00.000Z'),
      shortName: 'Bld5',
    },
    {
      cardDefId: 'ColleenWing',
      name: 'Colleen Wing',
      power: '3',
      cost: '2',
      obtainable: true,
      description: 'On Reveal: Discard the card that costs the least from your hand.',
      releaseDate: new Date('0001-01-01T00:00:00.000Z'),
      shortName: 'CllnWngB',
    },
    {
      cardDefId: 'CorvusGlaive',
      name: 'Corvus Glaive',
      power: '5',
      cost: '3',
      obtainable: true,
      description:
        'On Reveal: Discard 2 cards from your hand to get +{card.AddedMaxEnergy} Max Energy.',
      releaseDate: new Date('2024-02-20T19:00:00.000Z'),
      shortName: 'CrvsGlvC',
    },
    {
      cardDefId: 'Dracula',
      name: 'Dracula',
      power: '1',
      cost: '4',
      obtainable: true,
      description: 'At the end of the game, discard a card from your hand to gain its Power.',
      releaseDate: new Date('0001-01-01T00:00:00.000Z'),
      shortName: 'Drcl7',
    },
    {
      cardDefId: 'Gambit',
      name: 'Gambit',
      power: '3',
      cost: '3',
      obtainable: true,
      description: 'On Reveal: Discard a card from your hand to destroy a random enemy card.',
      releaseDate: new Date('0001-01-01T00:00:00.000Z'),
      shortName: 'Gmbt6',
    },
    {
      cardDefId: 'Khonshu',
      name: 'Khonshu',
      power: '5',
      cost: '6',
      obtainable: true,
      description:
        'When discarded, returns in its next phase.On Reveal: Resurrect a card you discarded to another location with its Power set to 5.',
      releaseDate: new Date('2025-03-25T19:00:00.000Z'),
      shortName: 'Khnsh7',
    },
    {
      cardDefId: 'LadySif',
      name: 'Lady Sif',
      power: '5',
      cost: '3',
      obtainable: true,
      description: 'On Reveal: Discard the card that costs the most from your hand.',
      releaseDate: new Date('0001-01-01T00:00:00.000Z'),
      shortName: 'LdSf7',
    },
    {
      cardDefId: 'Modok',
      name: 'M.O.D.O.K.',
      power: '7',
      cost: '5',
      obtainable: true,
      description: 'On Reveal: Discard your hand.',
      releaseDate: new Date('0001-01-01T00:00:00.000Z'),
      shortName: 'Mdk5',
    },
    {
      cardDefId: 'Morbius',
      name: 'Morbius',
      power: '0',
      cost: '2',
      obtainable: true,
      description: 'Ongoing: +2 Power for each time you discarded a card this game.',
      releaseDate: new Date('0001-01-01T00:00:00.000Z'),
      shortName: 'Mrbs7',
    },
    {
      cardDefId: 'ProximaMidnight',
      name: 'Proxima Midnight',
      power: '7',
      cost: '4',
      obtainable: true,
      description: "When this is discarded, jumps to your lowest-Power location. (that isn't full)",
      releaseDate: new Date('2024-02-27T19:00:00.000Z'),
      shortName: 'PrxmMdnghtF',
    },
    {
      cardDefId: 'Scorn',
      name: 'Scorn',
      power: '2',
      cost: '1',
      obtainable: true,
      description:
        'When you discard this, put it back and give +2 Power to itself andone of your cards in play.',
      releaseDate: new Date('2024-10-15T19:00:00.000Z'),
      shortName: 'Scrn5',
    },
  ],
  shortCodeObject: {
    type: 'short',
    deckcode:
      'ApclpsA,Bld5,CllnWngB,CrvsGlvC,Drcl7,Gmbt6,Khnsh7,LdSf7,Mdk5,Mrbs7,PrxmMdnghtF,Scrn5',
  },
  longCodeObject: {
    type: 'long',
    deckcode:
      '{"Name":"Discard","Cards":[{"CardDefId":"Apocalypse"},{"CardDefId":"Blade"},{"CardDefId":"ColleenWing"},{"CardDefId":"CorvusGlaive"},{"CardDefId":"Dracula"},{"CardDefId":"Gambit"},{"CardDefId":"Khonshu"},{"CardDefId":"LadySif"},{"CardDefId":"Modok"},{"CardDefId":"Morbius"},{"CardDefId":"ProximaMidnight"},{"CardDefId":"Scorn"}]}',
  },
  displayString: `# (1) Blade\n# (1) Scorn\n# (2) Colleen Wing\n# (2) Morbius\n# (3) Corvus Glaive\n# (3) Gambit\n# (3) Lady Sif\n# (4) Dracula\n# (4) Proxima Midnight\n# (5) M.O.D.O.K.\n# (6) Apocalypse\n# (6) Khonshu\n#\n$QmxkNSxTY3JuNSxDbGxuV25nQixNcmJzNyxDcnZzR2x2QyxHbWJ0NixMZFNmNyxEcmNsNyxQcnhtTWRuZ2h0RixNZGs1LEFwY2xwc0EsS2huc2g3\n# Generated with SnapDeck`,
};

export default sampleDeck;
