import { Quest, Realm, Rarity } from 'afnm-types';

// ─── Observatory Estate — Hunt Quests ────────────────────────────────────────
// 10 hunt quests per realm tier (II–V).
// All use real monster templates from window.modAPI.gameData.monsters.
//
// Reward types:
//   easy  → money + rep + 3× Regeneration Pill S
//   medium → money + rep + 3× Regeneration Pill S + 2× Barrier Pill S
//   hard  → money + rep + 3× Inner Fury Pill S + 2× Barrier Pill S + 3× Enhancement Dust

const REALM_TO_TIER: Partial<Record<Realm, string>> = {
  bodyForging:    'I',
  meridianOpening:'II',
  qiCondensation: 'III',
  coreFormation:  'IV',
  pillarCreation: 'V',
};

type RewardType = 'easy' | 'medium' | 'hard';

type HuntDef = {
  id: string;
  display: string;
  desc: string;
  intro: string;
  victoryText: string;
  defeatText: string;
  mName: string;
  mRealm: string;
  mProgress?: string;
  numEnemies?: number;
  money: number;
  realm: Realm;
  rarity: Rarity;
  rewardType: RewardType;
};

// ─── All hunt definitions ─────────────────────────────────────────────────────

const HUNT_DEFS: HuntDef[] = [

  // ── Tier II — meridianOpening ───────────────────────────────────────────────
  {
    id: 'hunt_feathzuiPack', display: 'Hunt: Feathzui Pack',
    desc: 'A pack of Feathzui has been harassing travellers on the approach roads. Clear them out.',
    intro: 'The Feathzui scatter at your approach, then circle back in formation. They are faster than they look.',
    victoryText: 'The last Feathzui breaks and flees. The approach roads are clear.',
    defeatText: 'The pack drives you back. Retreat and return when you are stronger.',
    mName: 'Feathzui', mRealm: 'meridianOpening', mProgress: 'Early',
    numEnemies: 3, money: 5000, realm: 'meridianOpening', rarity: 'mundane', rewardType: 'easy',
  },
  {
    id: 'hunt_houluPack', display: 'Hunt: Houlu Pack',
    desc: 'Houlu have been spotted near the estate\'s eastern approaches. Drive them off.',
    intro: 'The howling grows louder as you approach. Three Houlu emerge from the tree line, teeth bared.',
    victoryText: 'The Houlu retreat into the darkness. The eastern path is safe again.',
    defeatText: 'The Houlu overwhelm you. Pull back and recover before attempting again.',
    mName: 'Houlu', mRealm: 'meridianOpening', mProgress: 'Early',
    numEnemies: 3, money: 5500, realm: 'meridianOpening', rarity: 'mundane', rewardType: 'easy',
  },
  {
    id: 'hunt_taohetiPack', display: 'Hunt: Taoheti Pack',
    desc: 'Taoheti have breached the formation boundary lines. Remove them before they cause damage.',
    intro: 'The Taoheti are feeding on residual qi near the formation markers. They won\'t leave willingly.',
    victoryText: 'The Taoheti are scattered. The formation boundary is secure.',
    defeatText: 'You are driven back. The Taoheti hold the area for now.',
    mName: 'Taoheti', mRealm: 'meridianOpening', mProgress: 'Early',
    numEnemies: 3, money: 6000, realm: 'meridianOpening', rarity: 'mundane', rewardType: 'easy',
  },
  {
    id: 'hunt_jirouqiePack', display: 'Hunt: Jirouqie Pack',
    desc: 'Jirouqie have moved into the lower foothills, threatening supply routes.',
    intro: 'The Jirouqie work in coordination, flanking as you approach. Deal with them swiftly.',
    victoryText: 'The pack is broken. Supply routes to the estate are restored.',
    defeatText: 'The Jirouqie\'s coordination proves too much. Fall back.',
    mName: 'Jirouqie', mRealm: 'meridianOpening', mProgress: 'Early',
    numEnemies: 3, money: 7000, realm: 'meridianOpening', rarity: 'mundane', rewardType: 'easy',
  },
  {
    id: 'hunt_shanwonuiPack', display: 'Hunt: Shanwonui Pack',
    desc: 'Shanwonui packs have drifted into the estate\'s patrol zone from the nearby ridges.',
    intro: 'Three Shanwonui regard you with calculating eyes. They are measuring your strength.',
    victoryText: 'The Shanwonui retreat to the ridgeline. The patrol zone is clear.',
    defeatText: 'The Shanwonui\'s measured assault wears you down. Withdraw.',
    mName: 'Shanwonui', mRealm: 'meridianOpening', mProgress: 'Middle',
    numEnemies: 3, money: 7500, realm: 'meridianOpening', rarity: 'mundane', rewardType: 'easy',
  },
  {
    id: 'hunt_xuanBianPack', display: 'Hunt: Xuan Bian Pack',
    desc: 'Xuan Bian are disrupting the estate\'s aerial patrol formations.',
    intro: 'Four Xuan Bian circle overhead in tight spirals before diving to engage.',
    victoryText: 'The last Xuan Bian retreats. The skies above the estate are clear.',
    defeatText: 'The Xuan Bian drive you back with coordinated dives. Retreat.',
    mName: 'Xuan Bian', mRealm: 'meridianOpening', mProgress: 'Middle',
    numEnemies: 4, money: 8000, realm: 'meridianOpening', rarity: 'mundane', rewardType: 'easy',
  },
  {
    id: 'hunt_yaoyuPack', display: 'Hunt: Yaoyu Pack',
    desc: 'Yaoyu have taken up residence in the hillside shadows near the estate walls.',
    intro: 'The Yaoyu emerge silently from the undergrowth, their movements predatory and precise.',
    victoryText: 'The Yaoyu scatter into the hills. The estate walls are safe.',
    defeatText: 'The Yaoyu fade back into the shadows before you can finish them. Regroup.',
    mName: 'Yaoyu', mRealm: 'meridianOpening', mProgress: 'Middle',
    numEnemies: 3, money: 8500, realm: 'meridianOpening', rarity: 'mundane', rewardType: 'easy',
  },
  {
    id: 'hunt_shaoshangAlpha', display: 'Hunt: Shaoshang Alpha',
    desc: 'A Shaoshang Alpha has been drawn to the estate\'s qi density. It must be driven off.',
    intro: 'The Shaoshang Alpha regards you with cold intelligence. It has grown strong on the estate\'s ambient qi.',
    victoryText: 'The Shaoshang Alpha falls. The estate\'s qi density is no longer drawing predators of this kind.',
    defeatText: 'The Shaoshang Alpha proves too resilient. Recover and try again.',
    mName: 'Shaoshang', mRealm: 'meridianOpening', mProgress: 'Late',
    money: 9000, realm: 'meridianOpening', rarity: 'qitouched', rewardType: 'medium',
  },
  {
    id: 'hunt_yonzhongAlpha', display: 'Hunt: Yonzhong Alpha',
    desc: 'A Yonzhong Alpha is blocking the main road. Clear it before it becomes a permanent obstacle.',
    intro: 'The Yonzhong Alpha has staked a territorial claim on the road itself. It will not yield ground easily.',
    victoryText: 'The Yonzhong Alpha is defeated. The road is clear once more.',
    defeatText: 'The Yonzhong Alpha\'s ferocity drives you back. Approach more carefully.',
    mName: 'Yonzhong', mRealm: 'meridianOpening', mProgress: 'Late',
    money: 10000, realm: 'meridianOpening', rarity: 'qitouched', rewardType: 'medium',
  },
  {
    id: 'hunt_fuyunFloaterAlpha', display: 'Hunt: Fuyun Floater Alpha',
    desc: 'A Fuyun Floater Alpha has drifted close to the estate, its corrupted qi disrupting the formation arrays.',
    intro: 'The Fuyun Floater Alpha drifts silently, tendrils of corrupted qi trailing behind it. The formation arrays flicker in its presence.',
    victoryText: 'The Fuyun Floater Alpha dissipates. The formation arrays stabilise at once.',
    defeatText: 'The Fuyun Floater Alpha\'s qi assault drains you. Withdraw before it does more damage.',
    mName: 'Fuyun Floater', mRealm: 'meridianOpening', mProgress: 'Late',
    money: 12000, realm: 'meridianOpening', rarity: 'empowered', rewardType: 'hard',
  },

  // ── Tier III — qiCondensation ───────────────────────────────────────────────
  {
    id: 'hunt_keshuPack', display: 'Hunt: Keshu Pack',
    desc: 'Keshu have gathered near the estate\'s outer formation markers.',
    intro: 'The Keshu are slow and methodical — but there are three of them, and they show no fear.',
    victoryText: 'The Keshu are dispersed. The outer markers are undisturbed.',
    defeatText: 'The Keshu\'s slow, grinding assault wears you down. Fall back.',
    mName: 'Keshu', mRealm: 'qiCondensation', mProgress: 'Early',
    numEnemies: 3, money: 8000, realm: 'qiCondensation', rarity: 'mundane', rewardType: 'easy',
  },
  {
    id: 'hunt_awakenedBoulderPack', display: 'Hunt: Awakened Boulder Pack',
    desc: 'Two Awakened Boulders have activated near the estate\'s western approach, blocking the path.',
    intro: 'The Awakened Boulders tremble, then rise. Ancient qi pulses beneath their stone hides.',
    victoryText: 'The Awakened Boulders crumble. The western approach is passable again.',
    defeatText: 'The Awakened Boulders\' stone hides are too much for you now. Retreat.',
    mName: 'Awakened Boulder', mRealm: 'qiCondensation', mProgress: 'Early',
    numEnemies: 2, money: 8500, realm: 'qiCondensation', rarity: 'mundane', rewardType: 'easy',
  },
  {
    id: 'hunt_lingzhuLordPack', display: 'Hunt: Lingzhu Lord Pack',
    desc: 'A pack of Lingzhu Lords has established territory too close to the estate.',
    intro: 'Three Lingzhu Lords stand their ground, qi crackling around their elongated forms.',
    victoryText: 'The Lingzhu Lords are driven off. Their territory ends here.',
    defeatText: 'The Lingzhu Lords hold their ground against you. Retreat and regroup.',
    mName: 'Lingzhu Lord', mRealm: 'qiCondensation', mProgress: 'Early',
    numEnemies: 3, money: 9000, realm: 'qiCondensation', rarity: 'mundane', rewardType: 'easy',
  },
  {
    id: 'hunt_maLingzhuPack', display: 'Hunt: Ma Lingzhu Pack',
    desc: 'Ma Lingzhu have been raiding the estate\'s herb field approaches.',
    intro: 'The Ma Lingzhu are quick — darting in and out before you can land a clean strike.',
    victoryText: 'The Ma Lingzhu scatter. The herb field approaches are safe.',
    defeatText: 'The Ma Lingzhu evade your attacks and wear you down. Fall back.',
    mName: 'Ma Lingzhu', mRealm: 'qiCondensation', mProgress: 'Early',
    numEnemies: 3, money: 9500, realm: 'qiCondensation', rarity: 'mundane', rewardType: 'easy',
  },
  {
    id: 'hunt_hucaoPack', display: 'Hunt: Hucao Pack',
    desc: 'Hucao have been feeding on the estate\'s ambient qi, growing bold.',
    intro: 'Three Hucao emerge from the undergrowth. They are well-fed, and it shows.',
    victoryText: 'The Hucao retreat, their appetite for the estate\'s qi diminished.',
    defeatText: 'The Hucao\'s aggression overwhelms you. Pull back.',
    mName: 'Hucao', mRealm: 'qiCondensation', mProgress: 'Early',
    numEnemies: 3, money: 10000, realm: 'qiCondensation', rarity: 'mundane', rewardType: 'easy',
  },
  {
    id: 'hunt_caojingPack', display: 'Hunt: Caojing Pack',
    desc: 'Caojing have tangled themselves in the outer formation lines, disrupting calibration.',
    intro: 'The Caojing lash out as you approach, their vine-like bodies coiling defensively.',
    victoryText: 'The Caojing are cleared. Formation calibration can resume.',
    defeatText: 'The Caojing entangle your movements. Retreat and recover.',
    mName: 'Caojing', mRealm: 'qiCondensation', mProgress: 'Early',
    numEnemies: 3, money: 10500, realm: 'qiCondensation', rarity: 'mundane', rewardType: 'easy',
  },
  {
    id: 'hunt_yingKitePack', display: 'Hunt: Ying Kite Pack',
    desc: 'A pack of Ying Kites has been circling the estate formations, disrupting the star-alignment arrays.',
    intro: 'The kites scatter as you approach, then reform into a tight hunting formation — this territory is theirs to defend.',
    victoryText: 'The last kite falls. The skies above the estate are quiet once more.',
    defeatText: 'The kites drive you back. Retreat to recover before trying again.',
    mName: 'Ying Kite', mRealm: 'qiCondensation', mProgress: 'Middle',
    numEnemies: 3, money: 12000, realm: 'qiCondensation', rarity: 'qitouched', rewardType: 'easy',
  },
  {
    id: 'hunt_geziKitePack', display: 'Hunt: Gezi Kite Pack',
    desc: 'Gezi Kites have nested near the estate\'s upper formation spires.',
    intro: 'The Gezi Kites abandon their nests and dive, defending their chosen roost aggressively.',
    victoryText: 'The Gezi Kites are driven from the spires. The formation arrays are undamaged.',
    defeatText: 'The Gezi Kites\' coordinated dives drive you back. Come better prepared.',
    mName: 'Gezi Kite', mRealm: 'qiCondensation', mProgress: 'Middle',
    numEnemies: 3, money: 12500, realm: 'qiCondensation', rarity: 'qitouched', rewardType: 'easy',
  },
  {
    id: 'hunt_soulHoarder', display: 'Hunt: Soul Hoarder',
    desc: 'A Soul Hoarder has been draining the estate\'s formation arrays. Destroy it before it disrupts the ley line alignment.',
    intro: 'The formation cores flicker and dim as the Soul Hoarder feeds. You trace the disturbance through the failing array lines to its source.',
    victoryText: 'With the Soul Hoarder slain, the formation arrays begin to stabilise. The estate\'s qi circulation resumes.',
    defeatText: 'The Soul Hoarder proves more dangerous than anticipated. You withdraw, vowing to return stronger.',
    mName: 'Soul Hoarder', mRealm: 'qiCondensation', mProgress: 'Middle',
    money: 18000, realm: 'qiCondensation', rarity: 'empowered', rewardType: 'medium',
  },
  {
    id: 'hunt_linghunTorchbearer', display: 'Hunt: Linghun Torchbearer',
    desc: 'An ancient Linghun Torchbearer has taken up residence near the estate. Its corrupted flame is slowly poisoning the star-alignment formations.',
    intro: 'An eerie blue flame illuminates the estate grounds. The Linghun Torchbearer turns its hollow, burning gaze upon you — ancient malice rekindled.',
    victoryText: 'The corrupted flame gutters and dies. The Torchbearer crumbles to ash, its unnatural fire extinguished at last. The formation arrays pulse with renewed clarity.',
    defeatText: 'The Torchbearer\'s ancient flame scorches you badly. You barely escape with your life.',
    mName: 'Linghun Torchbearer', mRealm: 'qiCondensation', mProgress: 'Late',
    money: 28000, realm: 'qiCondensation', rarity: 'resplendent', rewardType: 'hard',
  },

  // ── Tier IV — coreFormation ─────────────────────────────────────────────────
  {
    id: 'hunt_xieziPack', display: 'Hunt: Xiezi Pack',
    desc: 'Xiezi have swarmed the estate\'s lower courtyard. Clear them before they damage the infrastructure.',
    intro: 'The Xiezi skitter across every surface, their numbers making up for their individual weakness.',
    victoryText: 'The Xiezi swarm is broken. The courtyard is clear.',
    defeatText: 'The Xiezi\'s numbers overwhelm your defences. Retreat and regroup.',
    mName: 'Xiezi', mRealm: 'coreFormation', mProgress: 'Early',
    numEnemies: 3, money: 20000, realm: 'coreFormation', rarity: 'mundane', rewardType: 'easy',
  },
  {
    id: 'hunt_shamenPack', display: 'Hunt: Shamen Pack',
    desc: 'Shamen have been lurking near the estate\'s cultivation chambers, drawn by the condensed qi.',
    intro: 'Three Shamen emerge from the shadows near the chamber doors, their hollow eyes fixed on you.',
    victoryText: 'The Shamen are driven back. The cultivation chambers are undisturbed.',
    defeatText: 'The Shamen fade into the shadows before you can finish them. They will return.',
    mName: 'Shamen', mRealm: 'coreFormation', mProgress: 'Early',
    numEnemies: 3, money: 21000, realm: 'coreFormation', rarity: 'mundane', rewardType: 'easy',
  },
  {
    id: 'hunt_chasmLeviathanPack', display: 'Hunt: Chasm Leviathan Pack',
    desc: 'Chasm Leviathans have surfaced near the estate\'s foundation stones.',
    intro: 'The Chasm Leviathans break the surface, shaking the ground with their emergence.',
    victoryText: 'The Leviathans are driven back below. The foundation stones are stable.',
    defeatText: 'The Leviathans submerge before you can finish the job. Be wary of the ground beneath you.',
    mName: 'Chasm Leviathan', mRealm: 'coreFormation', mProgress: 'Middle',
    numEnemies: 2, money: 22000, realm: 'coreFormation', rarity: 'mundane', rewardType: 'easy',
  },
  {
    id: 'hunt_stoneBeePack', display: 'Hunt: Stone Bee Pack',
    desc: 'Stone Bees have nested in the estate\'s outer walls, weakening the stonework.',
    intro: 'The Stone Bees swarm out of their wall nest in a dense, angry cloud.',
    victoryText: 'The Stone Bee colony is shattered. The wall damage can now be repaired.',
    defeatText: 'The swarm drives you back. You will need a different approach.',
    mName: 'Stone bee', mRealm: 'coreFormation', mProgress: 'Middle',
    numEnemies: 3, money: 23000, realm: 'coreFormation', rarity: 'mundane', rewardType: 'easy',
  },
  {
    id: 'hunt_shashePack', display: 'Hunt: Shashe Pack',
    desc: 'Shashe have established a den near the estate\'s eastern watchtower.',
    intro: 'The Shashe are territorial and aggressive. They charge together without hesitation.',
    victoryText: 'The Shashe pack is dispersed. The watchtower is clear.',
    defeatText: 'The Shashe\'s ferocity is more than you bargained for. Retreat.',
    mName: 'Shashe', mRealm: 'coreFormation', mProgress: 'Middle',
    numEnemies: 3, money: 24000, realm: 'coreFormation', rarity: 'mundane', rewardType: 'easy',
  },
  {
    id: 'hunt_dunLongPack', display: 'Hunt: Dun Long Pack',
    desc: 'Dun Long have been spotted coiling around the estate\'s formation pillars.',
    intro: 'Three Dun Long uncoil from the formation pillars, sensing your qi.',
    victoryText: 'The Dun Long release their hold on the pillars. Formation integrity is restored.',
    defeatText: 'The Dun Long\'s grip on the pillars holds. You are forced to retreat.',
    mName: 'Dun Long', mRealm: 'coreFormation', mProgress: 'Middle',
    numEnemies: 3, money: 25000, realm: 'coreFormation', rarity: 'mundane', rewardType: 'easy',
  },
  {
    id: 'hunt_bladeBallAlpha', display: 'Hunt: Blade Ball Alpha',
    desc: 'A Blade Ball Alpha has been carving through the estate\'s outer defences.',
    intro: 'The Blade Ball Alpha spins to life, blades extending as it locks on to your qi signature.',
    victoryText: 'The Blade Ball Alpha shatters. Its blades fall still at last.',
    defeatText: 'The Blade Ball Alpha\'s spinning assault is overwhelming. Get clear.',
    mName: 'Blade Ball', mRealm: 'coreFormation', mProgress: 'Late',
    money: 30000, realm: 'coreFormation', rarity: 'empowered', rewardType: 'medium',
  },
  {
    id: 'hunt_abyssalForgewalkerAlpha', display: 'Hunt: Abyssal Forgewalker Alpha',
    desc: 'An Abyssal Forgewalker Alpha has emerged near the estate, drawn by the heat of its formation cores.',
    intro: 'The Abyssal Forgewalker Alpha moves with heavy, deliberate steps. Heat radiates from its molten joints.',
    victoryText: 'The Forgewalker\'s fires are extinguished. The estate\'s cores are safe.',
    defeatText: 'The Forgewalker\'s heat is too intense. Fall back before you are burned out.',
    mName: 'Abyssal Forgewalker', mRealm: 'coreFormation', mProgress: 'Late',
    money: 32000, realm: 'coreFormation', rarity: 'empowered', rewardType: 'medium',
  },
  {
    id: 'hunt_madForgespritAlpha', display: 'Hunt: Mad Forgespirit Alpha',
    desc: 'A Mad Forgespirit has gone berserk near the estate\'s forge section, endangering the entire complex.',
    intro: 'The Mad Forgespirit\'s screech echoes through the estate. It attacks everything in range without distinction.',
    victoryText: 'The Mad Forgespirit is put down. The forge section is safe.',
    defeatText: 'The Forgespirit\'s berserk fury is too much. Retreat before it turns the entire area to ruin.',
    mName: 'Mad Forgespirit', mRealm: 'coreFormation', mProgress: 'Late',
    money: 38000, realm: 'coreFormation', rarity: 'resplendent', rewardType: 'hard',
  },
  {
    id: 'hunt_abyssalFuryAlpha', display: 'Hunt: Abyssal Fury Alpha',
    desc: 'An Abyssal Fury has torn through the estate\'s outer wall. It must be stopped before it reaches the inner formation cores.',
    intro: 'The Abyssal Fury moves like a tempest given form — raw violence condensed into a single entity.',
    victoryText: 'The Abyssal Fury is destroyed. The outer wall breach can now be sealed.',
    defeatText: 'The Abyssal Fury\'s relentless assault is beyond you for now. Get out while you can.',
    mName: 'Abyssal Fury', mRealm: 'coreFormation', mProgress: 'Late',
    money: 42000, realm: 'coreFormation', rarity: 'resplendent', rewardType: 'hard',
  },

  // ── Tier V — pillarCreation ─────────────────────────────────────────────────
  {
    id: 'hunt_zhangaiPackV', display: 'Hunt: Zhangai Pack (V)',
    desc: 'Ancient Zhangai constructs have activated near the estate\'s deeper formation chambers.',
    intro: 'The Zhangai move in silent coordination, their ancient programming driving them toward the estate\'s qi sources.',
    victoryText: 'The Zhangai constructs are deactivated. The formation chambers are secure.',
    defeatText: 'The Zhangai\'s ancient fighting techniques prove difficult to counter. Retreat.',
    mName: 'Zhangai (V)', mRealm: 'pillarCreation', mProgress: 'Early',
    numEnemies: 3, money: 40000, realm: 'pillarCreation', rarity: 'mundane', rewardType: 'easy',
  },
  {
    id: 'hunt_stellarFragmentProjectionPack', display: 'Hunt: Stellar Fragment Projections',
    desc: 'Stellar Fragment Projections have materialised around the estate\'s star-facing observation dome.',
    intro: 'The Projections shimmer into existence, drawn by the dome\'s celestial alignment. Three of them.',
    victoryText: 'The Projections collapse. The observation dome is undisturbed.',
    defeatText: 'The Projections phase through your attacks unpredictably. Withdraw and adapt.',
    mName: 'Stellar Fragment Projection', mRealm: 'pillarCreation', mProgress: 'Early',
    numEnemies: 3, money: 42000, realm: 'pillarCreation', rarity: 'mundane', rewardType: 'easy',
  },
  {
    id: 'hunt_qiciNierouPack', display: 'Hunt: Qici Nierou Pack',
    desc: 'Qici Nierou have breached the estate\'s inner courtyard walls.',
    intro: 'The Qici Nierou move with unnerving speed through the courtyard, leaving trails of warped qi.',
    victoryText: 'The Qici Nierou are driven out. The inner courtyard holds.',
    defeatText: 'The Qici Nierou\'s speed makes them impossible to pin down. Fall back.',
    mName: 'Qici Nierou', mRealm: 'pillarCreation', mProgress: 'Early',
    numEnemies: 2, money: 44000, realm: 'pillarCreation', rarity: 'mundane', rewardType: 'easy',
  },
  {
    id: 'hunt_qitanWufengPack', display: 'Hunt: Qitan Wufeng Pack',
    desc: 'Qitan Wufeng have gathered near the estate\'s wind-facing formation spires.',
    intro: 'Two Qitan Wufeng circle the spires, their movements following the formation\'s qi currents.',
    victoryText: 'The Qitan Wufeng are dispersed. The spires continue their work undisturbed.',
    defeatText: 'The Qitan Wufeng\'s wind-attuned movements prove hard to anticipate. Retreat.',
    mName: 'Qitan Wufeng', mRealm: 'pillarCreation', mProgress: 'Early',
    numEnemies: 2, money: 46000, realm: 'pillarCreation', rarity: 'mundane', rewardType: 'easy',
  },
  {
    id: 'hunt_yuhouAlpha', display: 'Hunt: Yuhou Alpha',
    desc: 'A Yuhou Alpha has claimed a section of the estate grounds as its own.',
    intro: 'The Yuhou Alpha stands in the centre of the estate\'s courtyard, utterly unafraid of your approach.',
    victoryText: 'The Yuhou Alpha yields. The estate grounds are reclaimed.',
    defeatText: 'The Yuhou Alpha\'s composure belies its power. You are driven back.',
    mName: 'Yuhou', mRealm: 'pillarCreation', mProgress: 'Middle',
    money: 48000, realm: 'pillarCreation', rarity: 'mundane', rewardType: 'easy',
  },
  {
    id: 'hunt_feralStitchAlpha', display: 'Hunt: Feral Stitch Alpha',
    desc: 'A Feral Stitch Alpha has torn through two outer walls and is advancing on the core chambers.',
    intro: 'The Feral Stitch Alpha is unlike its lesser kin — larger, faster, and driven by something deeper than hunger.',
    victoryText: 'The Feral Stitch Alpha falls apart. The advance on the core chambers is halted.',
    defeatText: 'The Feral Stitch Alpha\'s ferocity is beyond what you can handle now. Get out.',
    mName: 'Feral Stitch', mRealm: 'pillarCreation', mProgress: 'Early',
    money: 50000, realm: 'pillarCreation', rarity: 'empowered', rewardType: 'medium',
  },
  {
    id: 'hunt_stellarFragmentAlpha', display: 'Hunt: Stellar Fragment Alpha',
    desc: 'A Stellar Fragment has fully materialised within the estate\'s star observation chamber.',
    intro: 'The Stellar Fragment pulses with condensed celestial qi, its presence warping the chamber\'s formation arrays.',
    victoryText: 'The Stellar Fragment shatters. The observation chamber\'s arrays stabilise.',
    defeatText: 'The Stellar Fragment\'s celestial qi overwhelms your defences. Retreat before it fully destabilises the chamber.',
    mName: 'Stellar Fragment', mRealm: 'pillarCreation', mProgress: 'Late',
    money: 52000, realm: 'pillarCreation', rarity: 'empowered', rewardType: 'medium',
  },
  {
    id: 'hunt_starEaterAlpha', display: 'Hunt: Star Eater Alpha',
    desc: 'A Star Eater Alpha is consuming the residual qi from the estate\'s celestial formation cores.',
    intro: 'The Star Eater Alpha moves slowly but with terrifying purpose, its body absorbing formation qi with each step.',
    victoryText: 'The Star Eater Alpha is slain. The celestial formation cores stop draining at last.',
    defeatText: 'The Star Eater\'s absorption makes every hit feel weaker. You must retreat.',
    mName: 'Star Eater', mRealm: 'pillarCreation', mProgress: 'Late',
    money: 55000, realm: 'pillarCreation', rarity: 'empowered', rewardType: 'medium',
  },
  {
    id: 'hunt_feralMasterpieceAlpha', display: 'Hunt: Feral Masterpiece Alpha',
    desc: 'A Feral Masterpiece Alpha has appeared near the estate. Its construction is unlike anything seen locally — and it is hostile.',
    intro: 'The Feral Masterpiece Alpha does not hesitate. It moves directly toward the estate\'s most critical formation node.',
    victoryText: 'The Feral Masterpiece Alpha is destroyed before it reaches the formation node. A close call.',
    defeatText: 'The Feral Masterpiece Alpha\'s constructed body shrugs off your attacks. Fall back immediately.',
    mName: 'Feral Masterpiece', mRealm: 'pillarCreation', mProgress: 'Middle',
    money: 58000, realm: 'pillarCreation', rarity: 'resplendent', rewardType: 'hard',
  },
  {
    id: 'hunt_voidSiphonAlpha', display: 'Hunt: Void Siphon Alpha',
    desc: 'A Void Siphon Alpha has latched onto the estate\'s primary ley line. If not destroyed, it will drain the entire formation network.',
    intro: 'The Void Siphon Alpha pulses at the ley line convergence point. The estate\'s lights dim with each pulse. Time is short.',
    victoryText: 'The Void Siphon Alpha collapses. The ley line surges back to full strength — and the formation arrays blaze brighter than before.',
    defeatText: 'The Void Siphon Alpha resists everything you throw at it. Retreat before the ley line is fully drained.',
    mName: 'Void Siphon', mRealm: 'pillarCreation', mProgress: 'Late',
    money: 62000, realm: 'pillarCreation', rarity: 'resplendent', rewardType: 'hard',
  },
];

// ─── Factory ──────────────────────────────────────────────────────────────────

export function buildHuntQuests(): { quest: Quest; realm: Realm; rarity: Rarity }[] {
  const M = window.modAPI.gameData.monsters;

  const findM = (name: string, realm: string, realmProgress?: string) => {
    const found = Object.values(M).find(
      m => m.name === name && m.realm === realm && (!realmProgress || m.realmProgress === realmProgress)
    );
    if (!found) console.warn(`⚠️ Observatory hunt: monster not found — "${name}" (${realm} ${realmProgress ?? ''})`);
    return found;
  };

  return HUNT_DEFS.map(h => {
    const monster = findM(h.mName, h.mRealm, h.mProgress);
    const tier = REALM_TO_TIER[h.realm] ?? 'I';

    // Build item rewards based on difficulty
    const itemRewards = h.rewardType === 'easy'
      ? [
          { kind: 'addItem' as const, item: { name: `Regeneration Pill S (${tier})` }, amount: '3' },
          { kind: 'addItem' as const, item: { name: 'Enhancement Dust' }, amount: '10' },
        ]
      : h.rewardType === 'medium'
      ? [
          { kind: 'addItem' as const, item: { name: `Regeneration Pill S (${tier})` }, amount: '3' },
          { kind: 'addItem' as const, item: { name: `Barrier Pill S (${tier})` }, amount: '2' },
          { kind: 'addItem' as const, item: { name: 'Enhancement Dust' }, amount: '20' },
        ]
      : [
          { kind: 'addItem' as const, item: { name: `Inner Fury Pill S (${tier})` }, amount: '3' },
          { kind: 'addItem' as const, item: { name: `Barrier Pill S (${tier})` }, amount: '2' },
          { kind: 'addItem' as const, item: { name: 'Enhancement Dust' }, amount: '30' },
        ];

    const combatStep: any = {
      kind: 'combat',
      enemies: monster ? [monster] : [],
      victory: [
        { kind: 'text', text: h.victoryText },
        ...itemRewards,
        { kind: 'money', amount: String(h.money) },
        { kind: 'reputation', amount: '1', name: 'Observatory Estate', max: 'exalted' },
      ],
      defeat: [
        { kind: 'text', text: h.defeatText },
        { kind: 'exit' },
      ],
    };

    // Only set numEnemies for packs (> 1 enemy)
    if (h.numEnemies && h.numEnemies > 1) {
      combatStep.numEnemies = h.numEnemies;
    }

    return {
      realm: h.realm,
      rarity: h.rarity,
      quest: {
        name: `observatoryEstate_${h.id}`,
        displayName: h.display,
        description: h.desc,
        category: 'requestBoard',
        steps: [
          {
            kind: 'event',
            hint: `Hunt: ${h.display.replace('Hunt: ', '')} ({killed}/1)`,
            event: {
              location: 'Observatory Estate',
              steps: [
                { kind: 'text', text: h.intro },
                combatStep,
              ],
            },
          },
        ],
        rewards: [
          { kind: 'reputation', amount: 1, name: 'Observatory Estate' },
          { kind: 'money', amount: h.money },
        ],
      },
    };
  });
}
