const generalActions = {
  sectionName: 'General Actions',
  items: [
    {
      name: 'Assist',
      desc: 'Another friendly model within 2" lowers the value of its Burning, Distracted, or Injured Condition by 1/2/3.',
    },
    {
      name: 'Charge',
      desc: 'Once per Activation. Cannot be declared while engaged. Push this model up to its Mv in inches. It may then take a Meele Action that does not count against its Action limit.',
    },
    {
      name: 'Concentrate',
      desc: 'Once per Activation. This model gains Focused +1.',
    },
    {
      name: 'Disengage',
      desc: 'Can only be declared while engaged. One enemy model engaging this model (opponent’s choice) may take a Meele Attack targeting this model; neither model can declare Triggers as a result of this Attack. After resolving the Attack (if any), this model pushes up to its Mv in inches. If the attack is successful, instead of its normal effects, reduce this model’s Push distance by 2/4/6 inches (using the Accuracy Fate Modifier of the Action). This flip receives a + for every other enemy model engaging this model.',
    },
    {
      name: 'Interact',
      desc: 'Cannot be declared while engaged or if this model took the Disengage Action this Activation. Do one of the following: 1) Drop a Scheme Marker into base contact with this model and not within 4" of another friendly Scheme Marker, 2) remove all Scheme Markers in base contact with this model, or 3) resolve a specific rule that refers to an Interact Action.',
    },
    {
      name: 'Walk',
      desc: 'This model moves up to its Movement (Mv) in inches. This move cannot be used to leave an enemy model’s engagement range.',
    },
  ],
};

const conditions = {
  sectionName: 'Conditions',
  items: [
    {
      name: 'Adversary (X)',
      desc: 'Models with the “X” Keyword, Characteristic, or Name receive a + to opposed duels that target this model. A model cannot benefit from the Adversary Condition more than once per Attack Action. During the End Phase, end this Condition.',
    },
    {
      name: 'Burning +X',
      desc: 'During the End Phase, this model suffers 1 damage, plus 1 additional damage for every 3 points of Burning beyond the first that it possesses.',
    },
    {
      name: 'Distracted +X',
      desc: 'This model’s Actions that target an enemy model suffer a - to their duel. After resolving such an Action, the value of this Condition is lowered by one.',
    },
    {
      name: 'Fast',
      desc: 'The number of Actions this model can declare during its Activation is increased by one, to a maximum of three. End this Condition at the end of this model’s Activation. Canceled by Slow.',
    },
    {
      name: 'Focused +X',
      desc: 'Before performing an opposed duel, this model may lower the value of this Condition by one to receive a + to the duel (and any resulting damage flip this model makes).',
    },
    {
      name: 'Injured +X',
      desc: 'This model suffers -X Df and Wp. During the End Phase, end this Condition.',
    },
    {
      name: 'Poison +X',
      desc: 'During the End Phase, this model suffers 1 damage, plus 1 additional damage for every 3 points of Poison beyond the first that it possesses. Then, it lowers the value of this Condition by one.',
    },
    {
      name: 'Shielded +X',
      desc: 'Reduce damage suffered by this model by 1, to a minimum of 0. Each time this Condition reduces damage, its value is lowered by one. During the End Phase, end this Condition.',
    },
    {
      name: 'Slow',
      desc: 'The number of Actions this model can declare during its Activation is decreased by one. End this Condition at the end of this model’s Activation. Canceled by Fast.',
    },
    {
      name: 'Staggered',
      desc: 'This model suffers -2 Mv and cannot be moved by the effects of other friendly models. End this Condition at the end of this model’s Activation.',
    },
    {
      name: 'Stunned',
      desc: 'This model cannot declare Triggers and its Bonus Actions count against its Action limit. End this Condition at the end of this model’s Activation.',
    },
  ],
};

const triggersTiming = {
  sectionName: 'Trigger Timing',
  items: [
    {
      name: 'Immediately',
      desc: 'These Triggers resolve in the Declare Triggers step. They often modify the duel itself in some way.',
    },
    {
      name: 'When resolving',
      desc: 'These Triggers resolve with the Action’s effects (Step 5 of Action timing). These Triggers, depending on effect, may modify the effects of the Action as listed or add a new effect, so they only occur if the Action was successful. Any new effects are resolved last, unless the Trigger specifies otherwise.',
    },
    {
      name: 'After killing',
      desc: 'These Triggers happen after killing the target of the Action, as part of resolving damage timing.',
    },
    {
      name: 'After resolving',
      desc: 'These Triggers happen after the Action is complete, regardless of success or failure, but only if the model that declared the Trigger is still in play. If the Trigger has a target and that target is no longer in play, the Trigger has no effect.',
    },
    {
      name: 'After succeeding',
      desc: 'These Triggers happen after the Action is complete, but only if the model declaring the Trigger was successful in the duel and is still in play. If the Trigger has a target and that target is no longer in play, the Trigger has no effect. If a Trigger does not list a timing, it is treated as an After succeeding Trigger.',
    },
  ],
};

const shadow = {
  sectionName: 'Shadow',
  items: [
    {
      desc: 'Terrain that has both the Height and Blocking Traits casts a "Shadow" which is a catch-all term used to represent overhangs, sight angles, and places where models can crouch down to avoid being seen.',
    },
    {
      desc: 'A terrain’s Shadow extends out from the terrain a distance equal to the terrain’s Height, to a maximum of 3".',
    },
    {
      desc: 'When drawing sight lines from one model to another, if either model is in the Shadow of terrain with Height equal to or greater than the Size of that model (even partially), any sight lines that pass through the terrain generating that Shadow are blocked (even if the terrain is being ignored due to its Height, as per the Line of Sight and Size rules).',
    },
    {
      desc: 'When drawing sight lines, a model standing on terrain that is casting a Shadow ignores that terrain (and its Shadow) if any single sight line drawn between the two objects passes through 1" or less of that terrain.',
    },
    {
      desc: 'Models within a terrain’s Shadow (even partially) have Cover against any Range Actions that can draw one or more sight lines through that terrain.',
    },
  ],
};

const coverAndConcealment = {
  sectionName: 'Cover & Concealment',
  items: [
    {
      name: 'Cover',
      desc: 'When a model with Cover is the target of a Range Action, it gains +1 Df and imposes a - on any damage flips against it.',
    },
    {
      name: 'Concealment',
      desc: 'When a model with Concealment is targeted by a non-Meele Attack Action, the Action’s duel gains a -.',
    },
  ],
};

const terrainTraits = {
  sectionName: 'Terrain Traits',
  items: [
    {
      name: 'Blocking',
      desc: 'Terrain with the Blocking Trait cannot be seen through, and therefore it blocks LoS if the Height of the terrain is equal to or greater than the Size of the models attempting to draw sight lines through it. Terrain with the Blocking and Height Traits generates a Shadow (pg. @@). ',
    }, {
      name: 'Climbable',
      desc: 'Models may not move through Climbable Terrain, but they may move across its top (often a roof) and may move vertically up and down along its sides. ',
    }, {
      name: 'Concealing',
      desc: 'If a sight line drawn to a model passes through Concealing Terrain, that model has Concealment. When drawing sight lines, a model in Concealing Terrain may ignore that terrain’s Concealing trait if any single sight line drawn between the two objects passes through 1" or less of that terrain. Most fog banks count as Concealing Terrain. ',
    }, {
      name: 'Dense',
      desc: 'Line of Sight can be drawn into or out of Dense Terrain but not through it. Most woods count as Dense Terrain. ',
    }, {
      name: 'Destructible',
      desc: 'Models within 1" of a piece of Destructible Terrain may take an Action to destroy that Destructible Terrain and remove it from the table. If a model is standing on Destructible Terrain when it is destroyed, that model falls. ',
    }, {
      name: 'Hazardous Terrain',
      desc: 'After a model moves through or resolves one of its Actions while in Hazardous Terrain, it suffers the effects of the Hazardous Terrain after the current Action or Ability is resolved (to a maximum of once per Action or Ability). Most of the time, Hazardous Terrain will give a Condition to a model, such as Hazardous Terrain (Burning +1) or Hazardous Terrain (Poison +1). If the Hazardous Terrain does not mention a Condition in its description, the model simply suffers 1 damage. If a Hazardous Terrain Marker is moved, all models the Marker came into base contact with during the move, suffer the effects of the Hazardous Terrain. The model moving the Marker may choose to ignore the Hazardous effects of the moved Marker. ',
    }, {
      name: 'Height X (or Ht X)',
      desc: 'Terrain with the Height Trait has a vertical component that is relevant to the game. Height primarily comes into play when determining Line of Sight. Terrain with the Height and Blocking Traits generates a Shadow. ',
    }, {
      name: 'Impassable',
      desc: 'Models and Markers cannot move through Impassable Terrain, which often includes solid objects, such as Ice Pillars. Objects cannot be Dropped or placed overlapping Impassible Terrain. ',
    }, {
      name: 'Severe',
      desc: 'Non-Place movement effects are reduced by half while any part of a model’s base is in Severe Terrain. If a model moves out of Severe Terrain, it continues the rest of its movement at its normal (non-halved) rate.',
    },
  ],
};

const rules = {
  conditions,
  coverandconcealment: coverAndConcealment,
  generalactions: generalActions,
  shadow,
  terraintraits: terrainTraits,
  triggerstiming: triggersTiming,
};

export default rules;
