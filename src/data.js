export const suites = {
  ram: {
    name: "ram",
    letter: "r",
    pictureUrl: "https://content.invisioncic.com/r262965/emoticons/new-Ram.png"
  },
  tome: {
    name: "tome",
    letter: "t",
    pictureUrl: "https://content.invisioncic.com/r262965/emoticons/new-Tome.png"
  },
  mask: {
    name: "mask",
    letter: "m",
    pictureUrl: "https://content.invisioncic.com/r262965/emoticons/new-Mask.png"
  },
  crow: {
    name: "crow",
    letter: "c",
    pictureUrl: "https://content.invisioncic.com/r262965/emoticons/new-Crow.png"
  }
};

const strategiesBeta_22_03_19 = [
  {
    name: "Turf War",
    suite: suites.ram,
    desc:
      "Divide the table into four table quarters. In the center of each table quarter, Drop a neutral Strategy Marker. Drop another neutral Strategy Marker in the center of the table. Strategy Markers are Impassable.\nStrategy Markers can be either friendly, neutral, or enemy. A Strategy Marker friendly to one player is enemy to the other (and vice versa). A model can take the Interact Action targeting a Strategy Marker in base contact with it to change its alignment from enemy to neutral or from neutral to friendly.\nWhen a friendly model kills an enemy model, it can change one Strategy Marker in the same table quarter as the killed model from enemy to neutral, if possible (the Marker in the center is considered to be in every table quarter).\nIf a model is in more than one table quarter, the model that killed it may decide which table quarter the killed model was in.\nAt the end of each Turn, a Crew gains 1 VP if it has more friendly Strategy Markers than it has scored VP for this Strategy."
  },
  {
    name: "Plant Explosives",
    suite: suites.tome,
    desc:
      'After Deployment, starting with the player with Initiative, each player alternates placing Explosives Tokens on their deployed models until each player has placed a total of five Explosives Tokens on their models.\nMinions can have a maximum of one Explosive Token placed on them, while non-Minions can have a maximum of two Explosive Tokens placed on them.\nA model with one or more Explosives Tokens can take the Interact Action to discard an Explosives Token and Drop a Strategy Marker into base contact with itself. Strategy Markers cannot be Dropped within 6" of another friendly Strategy Marker.\nA model in base contact with a Strategy Marker can take the Interact Action to discard the Strategy Marker and gain an Explosives Token.\nIf a model with one or more Explosives Tokens is killed, a model in the opposing Crew that is within 3" of the killed model may gain the killed model’s Explosives Tokens. Otherwise, they are discarded.\nAt the end of each Turn, a Crew gains 1 VP if there are more Strategy Markers on the opponent’s table half than this Crew has earned VP from this Strategy. Strategy Markers on the centerline count as being in both table halves.'
  },
  {
    name: "Corrupted Idols",
    suite: suites.mask,
    desc:
      'At the start of each Turn, after determining which player has Initiative, Drop a Strategy Marker centered on the centerline. The location of the Strategy Marker is determined by the suit of the Initiative Flip of the player with Initiative (and the direction is calculated from that player’s perspective):\n• Mask: 8" from where the centerline meets the table edge on the left.\n• Tome: 8" from where the centerline meets the table edge on the right.\n• Ram: On the centerpoint.\n• Crow: Where the centerline meets the table edge (player with Initiative chooses which table edge).\n• Joker: Reflip.\nIf the Strategy Marker would be Dropped on top of a Strategy Marker, Impassable terrain, or a model, the player with Initiative instead Drops the Strategy Marker evenly on the centerline, touching but not overlapping that Strategy Marker, Impassable terrain, or model. If this is not possible, the Strategy Marker is not Dropped.\nA model in base contact with a Strategy Marker can take the Interact Action and suffer up to three irreducible damage, ignoring Hard to Kill. A model may not suffer more damage than its current Health.\nDrop the Strategy Marker anywhere within X" of its current location, not into base contact with a model or Impassable Terrain, where X is equal to the amount of damage suffered by the Interacting model (even if it was killed by the damage it suffered).\nAt the end of each Turn, a Crew gains 1 VP if there are more Strategy Markers completely on the opponent’s table half than it has earned VP from this Strategy.'
  },
  {
    name: "Reckoning",
    suite: suites.crow,
    desc:
      "At the end of each Turn, a Crew gains 1 VP if more enemy models were killed that Turn than it has scored VP for this Strategy, or if there are no more enemy models in play.\nFor the purposes of this Strategy, enemy Leaders and Masters each count as three models when killed and enemy Henchmen each count as two models when killed."
  }
];

const schemesBeta_22_03_19 = [
  {
    number: 1,
    name: "Detonate Charges",
    desc: {
      preparation: "",
      reveal:
        'At the end of the Turn, if you have two or more friendly Scheme Markers within 2" of the same enemy model, you may reveal this Scheme and remove two such Scheme Markers to gain 1 VP. ',
      end:
        'At the end of the game, if you have two or more friendly Scheme Markers within 2" of the same enemy model, you may remove two such Scheme Markers to gain 1 VP. '
    }
  },
  {
    number: 2,
    name: "Breakthrough",
    desc: {
      preparation: "",
      reveal:
        'At the end of the Turn, if you have one or more friendly Scheme Markers and a friendly model in the enemy Deployment Zone, and there are no enemy models within 3" of that model, you may reveal this Scheme and remove one such Scheme Marker to gain 1 VP. ',
      end:
        "At the end of the game, if you have three or more friendly Scheme Markers in the enemy Deployment Zone, you may remove three such Scheme Markers to gain 1 VP. "
    }
  },
  {
    number: 3,
    name: "Harness the Ley Line",
    desc: {
      preparation: "",
      reveal:
        "At the end of the Turn, if you have three or more friendly Scheme Markers on the Centerline, you may reveal this Scheme and remove three such Scheme Markers to gain 1 VP. ",
      end:
        "At the end of the game, if you have three or more friendly Scheme Markers on the Centerline, you may remove three such Scheme Markers to gain 1 VP. "
    }
  },
  {
    number: 4,
    name: "Search the Ruins",
    desc: {
      preparation: "",
      reveal:
        "At the end of the Turn, if you have two or more friendly Scheme Markers on the opponent’s table half, each in base contact with a different piece of terrain, you may reveal this Scheme and remove two such Scheme Markers to gain 1 VP. ",
      end:
        "At the end of the game, if you have three or more different friendly Scheme Markers on the opponent’s table half, each in base contact with a different piece of terrain, you may remove three such Scheme Markers to gain 1 VP. "
    }
  },
  {
    number: 5,
    name: "Dig Their Graves",
    desc: {
      preparation: "",
      reveal:
        'After killing an enemy model within 1" of one or more friendly Scheme Markers, you may reveal this Scheme and remove one such Scheme Marker to gain 1 VP. ',
      end:
        'At the end of the game, if you have three or more different Scheme Markers within 1" of three different Corpse or Scrap Markers, you may remove three such Scheme Markers to gain 1 VP. '
    }
  },
  {
    number: 6,
    name: "Hold Up Their Forces",
    desc: {
      preparation: "",
      reveal:
        "At the end of the Turn, if you have two or more friendly models, each engaging a different enemy model with higher Cost than itself, you may reveal this Scheme to gain 1 VP. ",
      end:
        "At the end of the game, if you have two or more friendly models, each engaging a different enemy model with higher Cost than itself, gain 1 VP. "
    }
  },
  {
    number: 7,
    name: "Take Prisoner",
    desc: {
      preparation:
        "At the beginning of the game, secretly choose an enemy Minion or Enforcer. ",
      reveal:
        'At the end of the Turn, if you have a friendly model engaging the secretly chosen model and there are no other enemy models within 4" of the secretly chosen model, you may reveal this Scheme to gain 1 VP. ',
      end:
        "At the end of the game, if you have a friendly model engaging the secretly chosen model, or after this Scheme was revealed, if the secretly chosen model was killed by a model which was friendly to it, gain 1 VP. "
    }
  },
  {
    number: 8,
    name: "Power Ritual",
    desc: {
      preparation: "",
      reveal:
        'At the end of the Turn, if you have a friendly Scheme Marker within 3" of a table corner not part of your Deployment Zone, you may reveal this Scheme and remove that Scheme Marker to gain 1 VP. ',
      end:
        'At the end of the game, if you have three or more different friendly Scheme Markers within 3" of three different table corners, with no more than one table corner as part of your Deployment Zone, you may remove those Scheme Markers to gain 1 VP. '
    }
  },
  {
    number: 9,
    name: "Outflank",
    desc: {
      preparation: "",
      reveal:
        'At the end of the Turn, if you have two models, each within 3" of where the centerline meets a different table edge or corner, you may reveal this Scheme to gain 1 VP. ',
      end:
        'At the end of the game, if you have two models, each within 3" of where the centerline meets a different table edge or corner, gain 1 VP.'
    }
  },
  {
    number: 10,
    name: "Assassinate",
    desc: {
      preparation: "",
      reveal:
        "At the end of the Turn, if the enemy Leader is in play and has half its maximum Health or less, you may reveal this Scheme to gain 1 VP.",
      end:
        "At the end of the game, if the enemy Leader is not in play, gain 1 VP."
    }
  },
  {
    number: 11,
    name: "Deliver a Message",
    desc: {
      preparation:
        "At the beginning of the game, secretly choose an enemy Leader or Master.",
      reveal:
        'During its Activation, a friendly model within 1" of the secretly chosen model can take the Interact Action to target the secretly chosen model (the secretly chosen model is not treated as engaging the friendly model for the purposes of this Interact Action). If it does so, you may reveal this Scheme to gain 1 VP.',
      end:
        'At the end of the game, if the secretly chosen model is still in play and within 2" of a friendly Scheme Marker, or after this Scheme was revealed, if the secretly chosen model was killed by a model which was friendly to it, gain 1 VP.'
    }
  },
  {
    number: 12,
    name: "Claim Jump",
    desc: {
      preparation:
        "At the beginning of the game, secretly choose a friendly non-Leader model.",
      reveal:
        'At the end of the Turn, if there are no enemy models within 3" of the secretly chosen model and the secretly chosen model is within 2" of the centerpoint, you may reveal this Scheme to gain 1 VP.',
      end:
        'At the end of the game, if the secretly chosen model is still in play with half or more of its maximum Health and within 2" of the centerpoint, gain 1 VP.'
    }
  },
  {
    number: 13,
    name: "Vendetta",
    desc: {
      preparation:
        "At the beginning of the game, secretly choose a friendly non-Totem model and an enemy non-Leader model with higher Cost.",
      reveal:
        "At the end of the friendly model’s Activation, if it successfully dealt damage to the secretly chosen enemy model and the enemy model has half its maximum Health or less (but is still in play), you may reveal this Scheme to gain 1 VP.",
      end:
        "At the end of the game, if the friendly model is in play and the enemy model is not, gain 1 VP."
    }
  }
];

export const strategies = strategiesBeta_22_03_19;
export const schemes = schemesBeta_22_03_19;
