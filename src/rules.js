const generalActions = {
  sectionName: 'General Actions',
  items: [
    {
      name: 'Walk',
      desc: 'This model moves up to its Movement (Mv) in inches. This move cannot be used to leave an enemy model’s engagement range.',
    },
    {
      name: 'Charge',
      desc: 'Once per Activation. Cannot be declared while engaged. Push this model up to its Mv in inches. It may then take a Meele Action that does not count against its Action limit.',
    },
    {
      name: 'Interact',
      desc: 'Cannot be declared while engaged or if this model took the Disengage Action this Activation. Do one of the following: 1) Drop a Scheme Marker into base contact with this model and not within 4" of another friendly Scheme Marker, 2) remove all Scheme Markers in base contact with this model, or 3) resolve a specific rule that refers to an Interact Action.',
    },
    {
      name: 'Disengage',
      desc: 'Can only be declared while engaged. One enemy model engaging this model (opponent’s choice) may take a Meele Attack targeting this model; neither model can declare Triggers as a result of this Attack. After resolving the Attack (if any), this model pushes up to its Mv in inches. If the attack is successful, instead of its normal effects, reduce this model’s Push distance by 2/4/6 inches (using the Accuracy Fate Modifier of the Action). This flip receives a + for every other enemy model engaging this model.',
    },
    {
      name: 'Concentrate',
      desc: 'Once per Activation. This model gains Focused +1.',
    },
    {
      name: 'Assist',
      desc: 'Another friendly model within 2" lowers the value of its Burning, Distracted, or Injured Condition by 1/2/3.',
    },
  ],
};

const conditions = {
  sectionName: 'Conditions',
  items: [
    {
      name: 'Fast',
      desc: 'The number of Actions this model can declare during its Activation is increased by one, to a maximum of three. End this Condition at the end of this model’s Activation. Canceled by Slow.',
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
      desc: 'This model cannot declare Triggers and its Bonus Actions (F) count against its Action limit. End this Condition at the end of this model’s Activation.',
    },
    {
      name: 'Adversary (X)',
      desc: 'Models with the “X” Keyword, Characteristic, or Name receive a + to opposed duels that target this model. A model cannot benefit from the Adversary Condition more than once per Attack Action. During the End Phase, end this Condition.',
    },
    {
      name: 'Shielded +X',
      desc: 'Reduce damage suffered by this model by 1, to a minimum of 0. Each time this Condition reduces damage, its value is lowered by one. During the End Phase, end this Condition.',
    },
    {
      name: 'Injured +X',
      desc: 'This model suffers -X Df and Wp. During the End Phase, end this Condition.',
    },
    {
      name: 'Burning +X',
      desc: 'During the End Phase, this model suffers 1 damage, plus 1 additional damage for every 3 points of Burning beyond the first that it possesses.',
    },
    {
      name: 'Distracted +X',
      desc: 'This model\'s Actions that target an enemy model suffer a - to their duel. After resolving such an Action, the value of this Condition is lowered by one.',
    },
    {
      name: 'Focused +X',
      desc: 'Before performing an opposed duel, this model may lower the value of this Condition by one to receive a + to the duel (and any resulting damage flip this model makes).',
    },
    {
      name: 'Poison +X',
      desc: 'During the End Phase, this model suffers 1 damage, plus 1 additional damage for every 3 points of Poison beyond the first that it possesses. Then, it lowers the value of this Condition by one.',
    },
  ],
};

const rules = { generalActions, conditions };

export default rules;
