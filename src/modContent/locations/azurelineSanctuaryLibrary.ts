// ─── Azurite Archive — Library Building ──────────────────────────────────────
// Exported as a standalone const so observatoryEstate.ts stays readable.
// Pattern mirrors observatoryEstateHuntQuests.ts / observatoryEstateSupplyQuests.ts.
//
// Sources:
//   • "The Lost Empire"           — original mod lore
//   • "History of the Fallen Stars" — ported from Falling Star Observatory game library
//   • "Beasts of the Stars"         — ported from Falling Star Observatory game library
//   • "Changes to the Continent"    — ported from Falling Star Observatory game library
//
// All categories use condition: '1' — every book is readable once the library
// is unlocked (tuTien_libraryUnlocked == 1, gated on the parent building).
// Individual books can add their own condition if needed in future.

export const azuriteArchiveBuilding = {
  kind: 'library' as const,
  condition: 'tuTien_libraryUnlocked == 1',
  title: 'The Azurite Archive',
  categories: [

    // ── The Lost Empire ───────────────────────────────────────────────────────
    {
      name: 'The Lost Empire',
      condition: '1',
      books: [
        {
          title: "The Last Sentinel's Record",
          author: 'Aetheric Sentinel Unit 01',
          condition: 'tuTien_sentinelDefeated == 1',
          contents:
            'Trial parameters: Royal Azurite Blood confirmed. Purity: 0.001%. ' +
            'Assessment: Bloodline dispersal consistent with civilian survival lineage. ' +
            'Combat proficiency: satisfactory. Archive access: granted. ' +
            'Note for the Archivist: The Star-Eaters have been probing the outer seal ' +
            'for the last eight hundred years. This unit\'s integrity will not hold indefinitely. ' +
            'It is recommended that the new heir fortify the estate\'s outer formations before ' +
            'the next probe cycle.',
        },
      ],
    },

    // ── History of the Fallen Stars ───────────────────────────────────────────
    {
      name: 'History of the Fallen Stars',
      condition: '1',
      books: [
        {
          title: 'Fallen Star Frequency',
          author: 'Mo Qingxian',
          contents: `Year 725 of the Meihua Calendar.
I've taken it upon myself to continue the tradition of my seniors before me, and continue their work in keeping records of the fallen stars. Their work was a truly mind numbing experience to read through. Each generation of record keepers regarded the task more as a punishment, and I can see why now. I originally view this as an opportunity to potentially learn more of our circumstances. So, upon personal request, I replaced this generation's 'sacrifice'. Reason being, upon waking one night I had formed a frightful hypothesis. For some reason, I felt the matter of the stars to be more than just fountains of resources we desperately needed, ones our world was severely lacking. And now, after review of the years of records kept, I have done nothing but increase those woes.

From inception until my assuming of this role, fallen stars seem to have started impacting ever slightly more frequently. Were this trend to continue, I worry that the world's collective power would not be enough to combat them. Since Progenitor Ying Meihua ascended, the total confirmed fallen stars is numbered at 5,457. If you narrow the scope to just the last 80 years, you will find that over 800 confirmed impacts occurred. Looking on a year by year basis, this amounts to an average of around just 10 per year, which doesn't seem alarming, but that amounts to almost fifteen percent of all recorded impacts! I will continue my research until I can no longer, while adding my own insights and thoughts for future researchers.

Year 800 of the Meihua calendar. Given my previous entry, and the nature of its hypothesis, I have continued my analysis of impacts over the last 75 years. In an effort to ensure the statistics are entirely accurate, my values will be more precise. My struggles with confirmation of my prior theory stemmed largely from averaged numberings, and lazy, uninspired writings from my predecessors. My findings for this time period are as follows;

Total Fallen Star Impacts: 827
Impacts from Years 725 - 750: 261
Impacts from Years 751 - 775: 273
Impacts from Years 776 - 800: 294

My current findings continue to support my theory, and I will thus present these findings to the council as soon as possible. Whilst not damning yet, there is still the possibility of margin of error skewing this particular time frame. However, it is convincing enough to continue paying attention to these figures. Hopefully, my warning will allow for countermeasures to be devised and implemented. Only the heavens know if many villages will exist a millenia from now if this continues. With luck, my next entry will bring news of favorable outlook on my research, and if that bears no fruit, another century of data will be presented. Perhaps both.

Year 900 of the Meihua calendar. The oldest of the council seemed to disdain the overly worried nature I carried, saying I was not being true to the 'courage of beasts' or the 'serenity of the blossoms' during my presentation. Perhaps I shouldn't be writing these complaints at all, given who may end up reading this. My proposal was heard, and promptly dismissed. I received no explanation, and was barred from disseminating this data to any of my fellow researchers. The only saving grace is they allowed my continued research in isolation. I can feel my lifespan is waning, so this will be my final log of this ongoing experiment. Here are the statistics for the prior century;

Total Fallen Star Impacts: 1236
Impacts from Years 801 - 825: 296
Impacts from Years 826 - 850: 303
Impacts from Years 851 - 875: 311
Impacts from Years 876 - 900: 326

It is beyond me why our elders seemingly ignore this problem. Just as my prior research shows, the trend has continued. For it to be margin of error over the span of nearly 200 years, only a fool would believe that. The frequency has increased, and further analysis of my entire life's work shows that the rate of increase is also starting to trend upwards. With my final years I will continue beseeching the council, but I fear they've got designs I cannot begin to understand. If that is good or bad for the world, only my descendents will get to see.`,
        },
        {
          title: 'Means of Ascension',
          author: 'Fei Ling',
          contents: `Year 21 of the Gian Calendar.
Upon request from a good friend, I compiled this data for personal use. Upon recognizing the value it holds, I presented it to my seniors within the guild, who took great interest in particular to those on record to be found amongst fallen stars. They offered to buy my work, if I were to focus the journal more on their area of expertise instead.

The first section will focus on the shards that are the building blocks for creating an incomparably firm pillar. In essence, qither manipulation is key in ensuring your pillar is fully doused in energies, constantly refining and improving the remaining segments of your creation.

Dizeng Shard: An exceedingly rare find, and equally sought after shard to boot. Finding first hand experience on this shard is near impossible, as anything emulating its effects will cause a target to be drawn on the owner. My compiling of records points toward it being capable of empowering even the weakest qither to a usable level. Where it draws the power to increase the input, is unknown.

Gaozeng Shard: An equally rare shard, but with a sharp decline in demand. This shard has similar effects to the Dizeng, but even mysteries from the heavens cannot magic nothing into something. Many cultivators know that qither is king, but gaining enough of it is already a nigh impossible task as is. Records show this shard must take a very large influx of qither, which when finally satisfied, this shard will output as much qither as your body can take. Once again, while tempting, there is hardly a person alive who can amass the qither necessary to receive an output from this shard.

Tigao Shard: One of the rarest shards found in stars, this shard is every cultivator's dream. Regardless of what qither is directed into this shard, it increases the amount output. Its simple use, and lack of known drawbacks make this shard one of the greatest finds a star raider can obtain.

Diandeng Shard: As we step away from the most sensational shards, we begin to enter the remaining shards found at a <i>vastly</i> higher rate. The diandeng shard is more limiting in its nature, but is still a highly sought after shard with the potential to improve a weak user's qither into a robust river of qither.

Wendji Shard: The final of the currently confirmed shards is the wendji shard. A shard perceived to be more versatile than the diandeng, this shard accepts a rather weak qither stream, splitting it and marginally empowering the output. Additionally, this shard has a secondary benefit. Users of this shard report upon satisfying its input, the shard embeds itself into the forming pillar, creating a far sturdier result than with other shards used.

This final section will dip into the lesser known shards, and their mysterious effects. Before diving deeply into the mythic and unconfirmed shards, we shall start with shards that have had their effects confirmed first.

Body Enhancement Shard: Aptly named by one of the forefronts of body cultivation at the time, that legendary existence was capable of claiming this shard and proclaiming his ownership of it with no fear due to his strength. Paired with his straightforward demeanor, when asked what he found its effect was on his pillar he simply stated that conversely, his body had an influx of energy. Accounts since have detailed that by certain means you can direct those energies to specific parts of your body. Sadly, these energies only seem to work with a singular focus, not overall.

Qither Siphon Shard: This particular shard has been reported to assist users in their manipulation of qither. The use of qi is what many cultivators utilize due to the abundance around them, but also because of the unimaginable cost to condense qi into qither. This particular shard assists with maintaining your control over qither, preventing as much loss in the course of utilization. While not directly improving your pillar or your combat power, this shard helps prevent months of focused cultivation to recover to your peak.

Grand Core Shard: The grandiose name is not just for show. This shard is the crown jewel of pillar shards found amongst the fallen stars. Despite its somewhat hungry need for qither to empower, this shard grants a qualitative increase to every aspect of the one who activates it. Its one drawback is that its imposing presence causes instability in its surroundings, which must be promptly balanced.

Internal Resistance Shard: Something of a taboo shard to proclaim ownership of, as this shard seems to reject the common energies we use. The sole purpose of this shard and its activation is to bless, or perhaps curse, the user with rejection of one of the core energies used widely. A famous utilization is frequently regaled of a Jade Serpent Sect cultivator, fed up with the horrific acts of demonic cultivators, who forsook half his sect's teachings of blood to gain an overwhelming advantage over those demons in combat. This action caused the world's demonic cultivators to go deep into hiding for one of the longest recorded spans to date.

These last few shards are so rarely found, or perhaps so rarely revealed, that not much information is available on them, but I will do my best to compile all rumors into a likely effect.

Sublime Eye Shard: The only known official public record of this shard was revealed by the Celadon Flames. One of their core members had previously been brought this shard as thanks for the completion of key cultivation resources requested by quite the influential family at the time. This same member passed on the effects shortly before his passing, and is how the world even knows of its existence. He claims that the shard was the key reason he walked so far down the path of alchemy. It enhanced his focus during his crafting procedure, and he even proclaimed that without it, his control would have been far more lacking.

Avatar of Zhandou Shard: Highly named after a legendary existence, there is nothing but rumors and hearsay about the effects of this mythical shard. Some accounts claim that use of this shard results in an infallible body, while others claim that any wound, large or small, will heal in moments. Some even proclaim that the energies of this world directly support and uplift the techniques executed by those who use it. Due to the mystery surrounding this shard, I can provide no hard evidence for any which one of these effects, but typically, all rumors have a fragment of the truth...`,
        },
        {
          title: 'Fallen Star Impact Sites',
          author: 'Shen Yulian',
          contents: `Year 131 of the Gian Calendar.
I have had the unfortunate pleasure of being assigned to this year's post. I get to do the thrilling task of detailing where and when stars impact our continent. A whole year of being constantly pulled from my cultivation to write "Another valley deep in spirit beast territory has been impacted by a fallen star." I see not the purpose of this task. While I have the deepest respect for the mind boggling backlog of records the star observers have maintained, I cannot find a use for these statistics.

First Month of the 131st Year of the Gian Calendar:
Two impacts were reported during this month. During the first week, the first star fell and impacted an area near the Feitang Lake. No known casualties, and star raiders were, as usual, successful in eradicating the firmament beasts brought with it. During the third to last day of the month, the second star impacted deep within the Jade Forest. No casualties were reported, however, the impact created a vast crack in the landscape, which revealed a new location to mine jade geodes from. The gamblers in the capital will be quite lively for some time.

Second Month of the 131st Year of the Gian Calendar:
Only a single impact was reported during this month. On the twentieth day of the month, the star impacted the Northern Wastelands and was promptly dealt with in tandem by the Heavenly Sword Sect and Star Raiders who were in the area.

Third Month of the 131st Year of the Gian Calendar:
Three impacts were reported during this month. The three impacts happened in a very short span of time, the first starting on the 12th day of this month, the second the 14th, and the third on the 19th. Two of the stars impacted deep within the Heian forest, in unknown locations within beast controlled territories. Their status is unknown, but with beasts still continuing to live in the forest, it is presumed they have been dealt with. The final star landed near the Valley of Hungry Souls, where sinners are cast from the capital city. Given the intent behind punishing sinners to the pit, the star was quickly dealt with to ensure their life sentences were not cut short.

Fourth Month of the 131st Year of the Gian Calendar:
No known impacts were reported during this month.

Fifth Month of the 131st Year of the Gian Calendar:
A single impact was reported during this month. On the 13th day of the month, a star impacted the rear of the Star Draped Peak. Older members of the council ordered a squad to eliminate the firmament beasts as a top priority emergency request. It is unclear why they focused so earnestly on this star above others.

Sixth Month of the 131st Year of the Gian Calendar:
Another single impact was reported during this month. On the 21st day of the month a tragedy befell Mugu Village. The fallen star impacted the village almost directly, with the waves caused by the impact leveling half the town, even before the beasts spilled forth. By the time the Star Raiders made it to suppress it, the entire town was up in flames, or burned to ash. It is unknown if there were any survivors at all.

Seventh Month of the 131st Year of the Gian Calendar:
Two impacts were reported during this month. The first was on the 4th day of the month, landing within the ocean causing no immediate harm. It is unknown how well firmament beasts fare in water, but none have yet to emerge on shore from past oceanic impacts. The second impact occurred on the 11th day of the month, landing quite close to the ruins of the Meihua ruins, and our current day Nine Mountain Sect. No casualties, and prompt elimination were all that awaited those beasts.

Eighth Month of the 131st Year of the Gian Calendar:
Two impacts were once again reported during this month. Interestingly, both stars impacted quite close together, landing past the Northern Wastes. While we have no jurisdiction there, we do exchange information in good faith. As such it is known that one village was wiped out, and the other resulted in 86 casualties from a traveling caravan in the midst of a large order shipment.

Ninth Month of the 131st Year of the Gian Calendar:
A single impact was reported during this month. On the 8th day of this month another village was impacted. Despite losing a quarter of the buildings upon impact, due to great fortune, two Star Raiders were present within Huimu village, allowing many of the inhabitants to be given time to safely flee. A total of 43 casualties were recorded.

Tenth Month of the 131st Year of the Gian Calendar:
No impacts were reported during this month.

Eleventh Month of the 131st Year of the Gian Calendar:
A single impact was reported during this month. On the 15th day of this month a fallen star impacted just north of the crossroads between the Nine Mountain Sect and some of its attached territories. Only 3 casualties were reported, truly unlucky folk to be in the wrong place at the wrong time.

Twelfth Month of the 131st Year of the Gian Calendar:
A single impact was reported for the final month of this year. On the very first day of the month a star impacted deep within the Jade Forest, in areas some terrifying overlord spirit beasts oversee. Better them than us I say.`,
        },
        {
          title: 'Wider Range of Beasts',
          author: 'Xiao Yuanshu',
          contents: `Year 477 of the Meihua Calendar.
With my final years approaching, I have been reflecting on this world and its changes over the course of my life. The cities grew more powerful, even the villages can produce geniuses. The qi has grown denser and more people can fight to protect what they love. The dangers have only increased however, as we aren't the only beings who benefit from that. In my trips through my lifetime I've encountered a truly broad spectrum of beasts across the land, I was quite well traveled, comes with the job you see. What struck me hardest was not the splendor of the world, but how starkly an area I hadn't visited in decades changed.

I believe this was back some 200 odd years — I visited a quaint little village, just south of the coast of Lake Feiteng. I fondly recall how they used to serve a unique pastry filled with fruit jams made from what each person grew in their courtyards at the time. Tragically, my travels brought me back to the area recently, reports of overbearing cultivators trying to expand their influence and control at the cost of commoners. Many cases these days, truly deplorable. Regardless, upon my arrival I happened to find myself approaching a rather sizable city instead, one besieged by spirit beasts to boot! My actions were likely ultimately unneeded, but lending a hand made what is a horrific event for them, vanish instantly. As I spent time resting in a tavern following the battle, I assessed those beasts and could not figure out what was off about the wave. It was only after completing my mission that had me there that I realized those beasts mostly weren't the ones that proliferated this area in the past.

This got my old blood flowing once more, I sensed an opportunity to learn more of Linghe and its secrets. I began pouring over sect records that detailed countless known species of beasts that control many parts of the world. Luckily the diligence of these authors saved me quite some trouble, they included many dates when the beasts appeared as well. Just as I had thought, the old beasts that terrorized that small village were the predominant beasts of my time for that area. It was only 30 years ago that these new beasts rose up to nearly replace them. In almost all metrics, the new beasts are stronger and fiercer than the old, but I cannot find any records of where they came from. Did they migrate here? Why did such powerful beasts appear in the area? Much to uncover.

<hr style="height:1px;border:none;color:#333;background-color:#333;">
What an odd place for a breakthrough! I was called to do some edits to my past depictions of firmament beasts and the threat fallen stars hold, and I found a truly interesting connection. As I was perusing other records so as to ensure my own data was correct, one of the dates really stuck out to me. A certain 30 years ago, a fallen star impacted rather close to that village I mentioned. Their growth since I last visited helped prevent any major damages, which is good for them, but I find it quite curious that the impact and appearance of the new beast coincide.

Upon realizing the possibility, I gathered more journals to pour over. Beasts and their appearances, The beasts of Linghe, Beasts 101. If there was a journal detailing the last millenia of beasts, I was reading it. The more I discovered the more shocked I became. Areas with sparse qi and almost no life suddenly had beasts appear in that region shortly after a star impact. Perhaps they stuck around for only a decade, maybe even only a century, but they appeared! What is the correlation?

While I have made this connection by drawing from conclusive dates, I have no idea why it's occurring. Do the firmament beast stragglers copulate? With their wanton for destruction, would they? Do the energies of the star change the creatures of the area? But then why were empty arid zones suddenly filled with beasts? It doesn't make much sense, but until the moment I pass I will continue trying to find the key to this conundrum.`,
        },
        {
          title: 'Sudden Empowerment of Certain Beast Species',
          author: 'Ju Jenshi',
          contents: `Year 168 of the Jinshu Calendar.
I was recently assigned an extermination mission, located just south of the empire. A brood of bird like beasts have a roost, from which they frequently fly down from and terrorize merchants that utilize a road that passes within a few miles of it. I remember in my younger years it being there, but it was never much of a problem back then, so I couldn't understand why a cultivator at my level was needed for those beasts. As I arrived near the area I instantly understood, however.

The aura of the area had completely changed. The qi was thick and oppressive almost, it was totally different. As I approached the roost, I was assaulted with constant and ruthless frequency — these old bird brains never had this level of aggression. Reaching the landings of the various mountains, I cleared away many of these bird beasts and their nests, yet discovered nothing that could lead to such a drastic change. Even members of the Immortal Fang haven't come to clean up, as these beasts show no signs of being realmbreakers, and yet their power is unlike anything it was before. Miles deep into their territory, the only thing I find is the meteoric remnants of a fallen star. Was this what caused them to change? I've never heard of beasts utilizing cultivation resources however, let alone cultivating with qi apart from realmbreakers, which I remind you, has already been dismissed.

With my task completed, I returned to brood over this matter. If the only difference was a star nearby, what prevents other species from changing like this? To what extent can this happen? There is a severe lack of catalogues on information of this phenomenon, so I can't say for certain the root cause. I found two other instances, and both times the beasts leapt multiple realms nearly overnight and caused some major damages. Those birds were stronger, yes, but not nearly at the level of cataclysmic change like these other records. What is the link? Why has it happened only so seldomly in history, what is different about those stars, or those impact sites?`,
        },
      ],
    },

    // ── Beasts of the Stars ───────────────────────────────────────────────────
    {
      name: 'Beasts of the Stars',
      condition: '1',
      books: [
        {
          title: 'Celestial Beasts and Their Powers',
          author: 'Fei Ling',
          contents: `Year 266 of the Gian Calendar.
I have been tasked with updating the records on firmament beasts. Logging their tendencies, their forms, and their typical attacks. Hopefully this will become a method for informing and preventing losses amongst the guild members.

Firmament beasts control what many scholars consider a higher level of qi. As cultivators progress, they gain the ability to compress their qi into 'qi droplets'. These droplets are made by utilizing a vast amount of qi, which grants the techniques using them their vast power. Even so, those condensed droplets are still a far cry from that which firmament beasts control effortlessly. Each beast utilizes qi in their own way, and the next section will cover individual firmament beasts.

Starting off against the lowest level threat, the 'Stellar Fragment' as they've been dubbed. Their simple nature and actions have netted them the most basic moniker, and their methods of assault are equally basic. Their strikes are a mix of wanton assault. Of the two, there is a fierce strike to watch out for. They erode barriers far more effectively than their standard strikes. The biggest threat lies in their ability to passively gather worldly qi into themselves. Combatants mention sensing the flow of energy pouring into them whilst they are in the middle of an attack, almost as if a subconscious action. Furthermore, as they absorb that energy, they become increasingly more powerful. The final attack, but thankfully easiest to avoid, is when the beast's qi reaches full saturation. Perhaps it's a self preservation method — any more qi and they would end themselves — but the resulting burst of qi should be avoided or at the very least prepared for.

Next on the list is the beast referred to as 'Void Siphon'. A marked increase of danger as compared to the Stellar Fragment, this firmament beast has a much more obvious control over qi and its terrifying prowess. This beast feeds and empowers itself off of barriers. As the fight continues be wary of it restoring itself with your barrier, as well as it gaining additional strength from the energies it absorbs from you.

One of the beasts to be extra wary of is the one referred to as the 'Celestial Discordance'. Its arsenal relies heavily on its gradual wearing down of its opponents. As the fight continues you'll find that the burden weighing on you grows heavier, while it grows freer with an ever expanding power pool.

Considered one of the most fearsome of the firmament beasts, the 'Gravitational Anomaly' boasts control over the ethereal force its name is derived. A fight against this beast is one that must be ended quickly, as its continued application of force onto its opponent eventually flattens them. Injuring this creature does help relieve pressure on the combatant, however this in turn is also a method of empowerment for the beast.

A rather unique creature on this list is the 'Prismatic Comet'. It seems to embody the characteristics of standard common gemstones, and research is ongoing over the extent of its abilities, and just how many gems it can shift into. As of current it is known to change into three forms: a ruby like gem, a sapphire like gem, and an emerald like gem. While within the ruby form it will be primed for battle. Attacks rendered will hit harder and will need careful planning to avoid. While within the sapphire form it is preparing for defensive strategies. It is not rendered incapable of attacks, which some people have mistakenly assumed, so while it shields itself do not assume that it is a pushover. The final of the known forms is its emerald form. While within this form it is a far more insidious beast. Silently sending out poison like effects, while rapidly absorbing energies to mend damage inflicted to itself.

The final of the commonly encountered firmament beasts is the one called the 'Star Eater'. The hunger of this beast is unmatched by any of the other known beasts on this list. Even during combat it is constantly consuming stellar energies. In the event that it cannot continue satiating its endless hunger, it briefly pulls from stores of energy, before entering a boundless rage when that empties. The only replacement to its standard meal is the energies contained within a cultivator's soul. Attempting to defeat this beast eventually corners it, drawing out this desperate move. If the fight doesn't end quickly, one may find a large portion of their soul needing major repair after the fact.`,
        },
        {
          title: 'The Terrors of the Stars',
          author: 'Xiao Yuanshu',
          contents: `Year 413 of the Meihua Calendar.
Today marks the anniversary of a truly cataclysmic day. Nearly since inception, the Star Observers have diligently recorded fallen stars. Frequency, relative size, location, threat levels, material spread, and damage estimates. As for that day, we recorded the most devastating fallen star yet. The relative size of this star was nearly two and a half times larger than any other meteor we have witnessed to date, and upon that body was an army of beasts that seemed to never end.

Upon impact far west of the empire, the standard suppression efforts were completely eliminated. Only one survivor escaped to spread warning of the vast difference experienced in this star. Unfortunately, despite his first hand experience, he didn't even encounter the truly ferocious beast hidden behind the waves of enemies. Upon hearing of the level of disaster, orders were given and long hidden powers rose from around the continent. Powerful Life Flourishing elders and leaders of various clans and sects were dispatched to suppress and assess why this one was different. With no perceived danger posed to ones of their calibre, the army of firmament beasts was quickly wiped away with little effort. However, the amassed blood and corpses seemed to provoke the root cause.

These dispatched cultivators approached the star with orders to tie all loose ends while investigating. However, this is the last time anyone saw these men and women. Only one of the elders in the group managed to send a distress message out during the chaos that erupted, and only had time to say quote "Far, far beyond us! Wake Progenitor Lianxiao-". The sudden ending of his message brought worries of the worst, but many were shocked at his words. The White Flame sect this elder was from was a major power in their region, and he was presumably the most powerful of the members. At least, that was the case after the death of their progenitor Wu Lianxiao, a peak Life Flourishing expert who rose to fame and founded the White Flame sect after a discovery of a sentient flame that burned bright white. For him to still be alive shocked many, but for him to be called for aid against a being who was 'far, far beyond' these peak Life Flourishing elders? It seemed they hid themselves deeply.

Word traveled to the White Flame sect, and true to his message, their progenitor still lived. A near fossil of a man, he traveled out on a hunt for vengeance and answers for his missing elder. A battle that shook the entire western region of the empire erupted, and many villages collapsed simply from shockwaves countless miles away. After a few hours the shockwaves ceased, and the empire stood nervous, hoping for a good result. Shortly after, a man returned and collapsed at the foot of the empire's grandest hall. Wu Lianxiao, bloodied and torn nearly to pieces, was holding a scroll as he breathed his last.

The contents of the scroll were heavy indeed. His hastily scrawled writing informed the true cause of the disaster that day. He wrote of the scenes of disaster he found on his trip over, the miles of corpses and devastation. He wrote of the bodies of the second team, whose identities could not be determined any longer. And finally he wrote of the battle felt all the way here. There was a beast beyond Life Flourishing that had arrived on the fallen star. His battle was a pyrrhic victory at best. Despite his best efforts, he only managed to slay the beast after suffering a fatal wound. Upon recognizing his oncoming demise, he sacrificed the majority of his remaining life force for a return blow, ending the danger at the cost of most of his life.

That day was a chilling wake up call for Linghe as a whole. The previous limit was handily suppressed by Life Flourishing members of society, on the rare instances they occurred. With this precedent, many worries began to form about the safety of the world and when it will happen again. Four cities, eleven towns, dozens of villages, and countless lives were paid for this lesson. Many brave cultivators, some family members, some wise and caring elders, lost their lives. The complacency that had formed was shattered along with much of the hope for a brighter future.`,
        },
        {
          title: 'What is their Guiding Purpose?',
          author: 'Qui Shu',
          contents: `Year 83 of the Jinshu Calendar.
Much has been researched over the decades and millennia of the beasts that fall from the heavens, except for their habits. The world has recorded their appearance and their power. Growing ever fearful of their abilities and control of qi, stratagems have been devised against them. Yet, true attempts at understanding them are strikingly nonexistent! I aim to change that, to record what kind of being they truly are, what brooks such an impossible divide between us and them.

My first attempt at this was met with mockery, yet not by my own failure! I attempted to bargain with a star raider I had the chance to meet while on a journey. Upon explaining my interest in capturing and experimenting on one such beast, he first took my request to be a joke. As I reassured him of my intent, he started with incredulity, and then slowly became more and more disdainful towards me. Our negotiations broke down once he called me a 'mindless fool, almost as brain damaged as a beast.' Needless to say, I have begun the search for a more learned star raider.

<hr style="height:1px;border:none;color:#333;background-color:#333;">
I have finally succeeded in convincing a star raider to assist me in my cause. Disregarding the countless attempts made to convince others, my current help is a much more forward thinking mind, and I hope she and I can succeed in learning more of these beasts. She has made mention that of the beasts that appear with the stars, there is one such creature that is notably weaker than the rest. She believes that if she gathers a large enough force and forgoes her portion of that particular star, there is a high chance one can be restrained and captured. Here's hoping their operation returns in success.

<hr style="height:1px;border:none;color:#333;background-color:#333;">
My assistant has returned and true to her word with a captured beast in her control! A vicious fellow indeed, even tightly bound and contained, it thrashes and attacks anything it lays its eyes on. I must quickly create some way to contain this beast with the support of qi, it seems my assistant is constantly exerting herself to maintain the bindings. I know not of a material now that can withstand the power this beast holds, but I shall make attempts at requesting a forging expert who may be able to help.

Disaster has struck! My very first live specimen is now dead. Whilst away negotiating the price of a spatial container that can block the power of a Pillar Creation expert, the beast had been slowly accumulating extremely fiercesome qi. My 'research partner' as I've begun to call her claims that due to the focus she was in, she failed to sense the slow and gradual accumulation of this energy. Shortly after I left, it released an attack that broke it free of its bindings, forcing her to end its life. Ah, how tragic. With a long life ahead of it, mysteries to reveal to us, it was taken just as I was right there to learn of them. Perhaps I should have vetted my helper a bit more...

<hr style="height:1px;border:none;color:#333;background-color:#333;">
It seems the research I'm conducting is not so important to my partner after all. When I once more brought up needing a specimen replacement, she mentioned she was in need of the resources for her own cultivation. If she hadn't killed the one she already got, perhaps it wouldn't be such a problem then, would it? Leveraging that, I have gotten her to agree to bring me another. This time, I have the containment method prepared in advance, with no room for errors.

I received my new test subject in elation, only to be told never to contact my partner again. She said with this all our debts were settled. I still am of the mind that she was the one to ruin things in the first place, so I don't quite understand what her problem is! Regardless, I shall ignore this minor loss, and instead spend time examining the life of what will soon be my greatest contribution to man. I have prepared countless diet options, and the forge master I worked with did an absolutely stunning job creating an environment that is very realistic. The spatial node within has the sun and moon, sea and land. Despite being a relatively small space, it contains many aspects that should give me plenty of time for analysis.

<hr style="height:1px;border:none;color:#333;background-color:#333;">
I have spent months now evaluating the creature in captivity. It has showcased nothing but the most... thoughtless behavior. It rushes around non stop, twenty four hours a day. Upon colliding with the boundary of the spatial node, the designs gently flex, pushing it in a new direction. And yet, despite countless instances of this occurrence, it continues its mindless flight as if it were never impeded. On top of this, it has not touched any of the dietary options I prepared. I believe it sustains itself entirely on absorbing the energy of the world, but to test this further, I must get back in touch with the forge master I mentioned last. Once he creates an isolating effect for me, I will know more.

<hr style="height:1px;border:none;color:#333;background-color:#333;">
A new problem has arisen. As soon as I enable the isolation of qi to the inner space, the beast almost immediately becomes comatose. As if cutting oil to a lamp, its energy and activity is snuffed out. I have even taken note of its body seemingly starting to collapse immediately, though exceedingly slowly. For the meantime, I've decided that perhaps in this calmer state I can speak to it, and have it slowly recognize my will then leave and reinvigorate it. Perhaps in this manner I can begin to communicate with it.

<hr style="height:1px;border:none;color:#333;background-color:#333;">
I have noticed signs that it hears me whilst comatose! I believe these to be very positive signs that it understands me! With time I'm certain communication can be brokered, albeit very barbaric and broken. I will continue my current efforts, and soon I am certain that we will be capable of stopping the violence from the stars with rhetoric and reason!

I am confident as of this moment. All my efforts have come to this pinnacle moment. I shall bring with me the control methods for isolating qi and enter the space. I'll declare that I wish to maintain communication even whilst they are energized, and when I sense their recognition, I will allow qi to flow in the space while I am still within. Through a slight danger it will be a show of faith, and this will bridge the final distance needed to begin earnest communication. Look forward to my next entry, for it will be a monumental one!

<hr style="height:5px;border:none;color:#333;background-color:#333;">
Year 94 of the Jinshu Calendar. Researcher Ju Jenshi. I have repaired operation to a spatial device left in the hands of the star observers. Upon inspection of the internal space I found the remains of a man and a beast within. Without these logs, identification would have been impossible. Reading through the research of this man leads me to believe his mental state was in dire disorder, and his goals foolish. Further speculation or experiments are hereby forbidden. These records are left accessible to future observers to warn of the dangers young, brash foolishness can bring.`,
        },
      ],
    },

    // ── Changes to the Continent ──────────────────────────────────────────────
    {
      name: 'Changes to the Continent',
      condition: '1',
      books: [
        {
          title: 'Linghe and Qi',
          author: 'Fei Ling',
          contents: `Year 188 of the Gian Calendar.
Recently I've been pursuing an interesting hypothesis I've had in mind for almost two centuries now. I was very young when the ascension of Progenitor Diao Gian occurred. At that time I was still with my parents, barely celebrating my 13th birthday. I was born blessed, so I had already stepped on the perilous path that is cultivation, and I remember thinking that things were hard back then. I may be misremembering the specifics, it was so long ago, but something I recently experienced on a trip of mine not too long ago brought this thinking back.

For the first five years following Progenitor Diao Gian's ascension, festivals were held every year in remembrance and worship of his splendor and grandeur, so on and so forth. During that festival a hugely expansive formation would be activated for a few hours, congregating qi to the point of thick mists, for which all the visitors could absorb and cultivate with. At that time, my late father was being buried within a family tomb near the capital so in an attempt to cheer me up, my mother brought me to the festival. I'll never forget the blinding lights, and the moment the formation was fully active. That memory is what resurfaced as I went on a trip just recently. My status as a Star Observer and disciple of the Nine Mountains earned me lodging at a local hegemon power to the far east. They granted me a cultivation chamber with their finest qi gathering formation within it. One that was markedly less complex than a city encompassing one, of course.

However, this formation collected far more qi than anything I'd used personally before. In fact, so much so I questioned if my own Nine Mountain sect was the poor, destitute underling of this power. There may be warrant to the fact the one in my youth covered a vast area and simply could not compete, but I refuse to believe the pinnacle city of Linghe, perched on its blessed well of qi and with much of its wealth for the year, could not compete with this small power on arid land. This is the crux of my hypothesis.

How does the world produce such stunning individuals like Progenitor Diao Gian, Ying Meihua, or Dong Tiang while at the same time failing to raise any individuals even close to their level? How is it that no Progenitor ever appeared at the same time as another? My theory is that the world simply cannot support any more beings at their level once they appear. Additionally, their power is so vast it affects everywhere in the world as we know it! If I just cultivate on a nearby mountain, even my own power is enough to suck the surroundings of qi within hours. Imagine someone incomparably higher than me attempting to cultivate!

As such, my current running theory is that upon ascension the world is no longer struggling to survive, no longer overdrafting itself to support a being like our great Progenitors. The qi of the world can once again flourish, and great figures can rise up once more. Even desolate areas become at least somewhat qi rich in the following centuries, perhaps millennia, after their ascension. I must go into further research on this matter, and will thus go on a short journey once more to attempt to test this theory.`,
        },
        {
          title: 'Deep Mine Qi Sampling',
          author: 'Fei Ling',
          contents: `Year 191 of the Gian Calendar.
As a continuation of my previous work, I begin this journal to detail my new findings. I received a sudden summons from the sect council, which temporarily had me in charge of the Yinying Mine within the sect. I learned that my post's predecessor attempted a delve to rescue some foolish disciples who went too far with too few torches. His end is tragic, as he arrived too late. Not only did he fail to save those juniors, they had long since been corrupted and fell upon him on his arrival. Regardless, with my new post I was rather limited in my ability to research until recently.

The area is drab, dark, gloomy, and filled with tainted energy. However, if you can purify the energy before absorbing it, you don't even need qi gathering formations down here even for someone at my level. I couldn't understand what was sourcing such immense qi, so my recent studies resulted in innumerable expeditions deeper into the mine. Unlike my predecessor, I never dove unprepared. Nor did I pamper the disciples I oversaw. I would not be a repeat of the past. If they dove unprepared, then it is their own fault they never return. After countless comparisons within the winding tunnels, I found it truly was as I thought. The deeper into the earth you traveled, the denser the qi was.

My only problem now is sourcing the cause. I traveled through all mapped locations first and never once did it feel like I was approaching an area of higher density. The only constant in the search was simply by going deeper, except I have already reached my safe limit. Any further and I risk being attacked while suppressing the invasive energy and losing my mind like many before me. As I don't fancy seeking death, I'll pass this investigation forward. I hope one day, someone powerful enough to delve deeper than I can solve this mystery.`,
        },
      ],
    },

    // ── Annals of Li Wei ──────────────────────────────────────────────────────
    {
      name: 'Annals of Li Wei',
      condition: '1',
      books: [
        {
          title: 'Fall of the Azurite Empire',
          author: 'Li Wei',
          contents: `In the annals of Linghe history, there is no fall as great and sudden as that of the Azurite empire of Te Jinshu. Rising in a meteoric fashion in the year 2312 after Gian Ascension, hammered into existence by the overwhelming power of Te Jinshu himself, it reigned supreme for nearly two millennia. The empire's fall, however, was as swift and brutal as its rise, coming swift on the heels of the ascension of its founder.

The seeds of its fall were sown long before Te Jinshu's ascension. As with many dynasties, the very strength that forged their empire became the harbinger of their downfall. Te Jinshu's unparalleled weapon arts, his armies of metal puppets and swarms of dancing weapons, created a realm that relied heavily on his singular presence and power. Little effort had been put to raising the individual strengths of his disciples and successors, and Te Jinshu's own policy of executing anyone who tried to reach beyond the sixth realm, left the empire weak.

Upon Te Jinshu's ascension, a power vacuum ensued. His immediate successor, Hong Jinshu, was a competent cultivator but lacked the brutality and strategic acumen of his predecessor. The empire's borders, once secured by Te Jinshu's fearsome weaponry, began to be tested by sects, cultivators, and beasts alike. The most deadly of these attackers was the Heavenly Crane Sect, a formidable power in the neighbouring realm that saw an opportunity to expand its influence. Led by the cunning strategist Bai Xue, they launched a series of calculated assaults on the Azurite Empire's weakened borders, shattering many of the iron fortresses that had once kept the frontiers safe.

Internal strife further hastened the decline of the Empire. The Gian, long suppressed by the power of Te Jinshu, never forgot the heights that they'd held in the days before his rise. With the emperor gone, they began to flex their political muscles, stirring unrest and gathering supporters to their cause. However, just as many flocked to the supposed divine mandate of the Jinshu as the Gian, and the two sides clashed violently.

Further problems struck the floundering empire. As much as Te Jinshu had been a brutal ruler over the cultivators of the empire, he had been well-loved by the commonfolk. Many of the puppets he had constructed had been dedicated to working the fields of the realm, and acting as the muscle that kept the empire's infrastructure running. With his ascension, the puppets stopped, with no cultivators powerful enough in the newly spread weapon arts to take up the slack. Crops quickly began to wither, and famine struck the outlying regions. Once-thriving cities and fortresses, now bereft of adequate food supplies and spiritual nourishment, fell into decay.

The final blow came from an especially large wave of beasts. A threat that had long since been forgotten, as Te Jinshu's weaponry would wipe out any of their number long before they could harm the citizens of the empire. With the empire's borders weakened, the beasts surged forth, destroying everything in their path. The Jinshu were forced to turn to the other families and sects of power, sacrificing the remainder of their influence in a bid to stem the tide. This alliance stopped the wave of beasts, but it was too late for the empire.

In the year 157 after Jinshu Ascension, the Azurite empire was officially disbanded, replaced by a coalition of the Gian, the Jinshu, the Nine Mountain Sect, and the Reaving Blade Sect. A new era had begun, one where the power of the Jinshu was no longer absolute. Yet, the legacy of Te Jinshu endures. His weapon techniques remain one of the deadliest one can wield, and the artefacts he forged continue to be revered and sought after by cultivators across the realms. The fall of the Azurite Empire serves as a poignant reminder of the impermanence of power and the necessity for balance in all things, of the dangers of dependence on one central figure, no matter how powerful. For it is only as a collection, as a society, that stability can be achieved.`,
        },
        {
          title: 'The Absent Empress of the Sky',
          author: 'Li Wei',
          contents: `The Gian Empire faced its greatest challenges not in its founding, but in the consolidation of its power. Rising to prominence on the back of the rise of its progenitor, Diao Gian, it quickly unified the continent with the promise of her protection and the threat of her retribution. A power that would have been a conclusive aspect in forming its foundation, if not for Diao Gian's own disinterest in the actions of her family and the empire they had built.

A powerful family even before her rise to the ninth realm, the Gian had long been a force to be reckoned with. Masters of the fist and blood arts, they had maintained a core position in the Linghe political landscape since time immemorial. The grandmother of Diao Gian, Mei Gian, had been considered the premier master of those in the seventh realm for centuries, and when her granddaughter surpassed her she was quick to leap on the opportunity.

Mei Gian moved fast. With the combined might of her own strength and that of Diao Gian's siblings, Feng Gian and Yu Gian, she quickly sought alliances with the other powerful sects and the other families of the realm. The Nine Mountain Sect, the Reaving Blade Sect, the Jade Serpent Clan, and the Crimson Lotus Sect all quickly fell into line, and the Gian Empire was born with Diao Gian as its Empress.

Yet, even before the empire was truly formed, Diao Gian withdrew. She had no interest in its day-to-day running, nor in the politics that had formed it. In fact, Mei Gian was the empress in all but name, enforcing her own rule with an iron fist. Diao Gian herself was barely seen, disappearing for centuries at a time to adventure through the untouched ruins on the upper limits of the world, those that only the rare cultivators of the eighth and ninth realms would dare to tread.

Soon, such absence would become acutely felt by the powerhouses that had agreed to the empire's founding. They had agreed to bow to Diao Gian, a ninth realm cultivator far beyond their reach, not to Mei Gian, a peer in the seventh realm. The Gian, however, were no fools. They understood that to maintain their hold on the realm, something needed to be done.

It is unknown if the arrival of the Thunder Drake was fate or due to the machinations of Mei Gian. As a colossal spirit beast with the power to command the storms that raged over the eastern sea, its arrival in the eastern provinces claimed countless lives. A threat that the empire, the sects, and all the other powerhouses of the realm were powerless to resist. Then, Diao Gian emerged from her seclusion. A single bolt was all it took to slay the beast, a bolt larger than a castle and so bright it was seen from the farthest reaches of the realm. Then, she vanished once more, but the message had been delivered. The Empress of the Sky was watching, no matter how far away she might seem.

Quick to consolidate the power of the Gian Empire, Mei Gian used the event to her advantage. She declared that the Gian family would be the first line of defense against the spirit beasts, but that the other sects and families would be expected to contribute to the defense of the realm. A spate of marriages quickly followed, such as the union of Yu Gian to the heir of the Jade Serpent Clan, ensuring a formidable network of loyal allies. A union that formed barely in time for the next threat to befall the empire.

The Crimson Lotus Sect, professed true inheritors of the progenitor of blood Ru Gong, attacked. Betting their lives that Diao Gian only emerged due to the attack of a spirit beast, they struck at the heart of the Gian Empire, seeking to dethrone Mei Gian and take the empire for themselves. Yet Feng Gian, ever the strategist, had anticipated their ambitions. Through a network of spies and informants, he spread conflicting reports of Mei Gian's whereabouts to the would-be attackers, including a number of supposed vulnerabilities they scrambled to exploit. Walking their forces straight into a trap.

Yet, they were not a foe to be underestimated. Despite being off balance and stretched thin, the blood techniques the Crimson Lotus employed were devastatingly powerful, and the fanatical dedication of its disciples to the goals of its leader was unmatched. Quickly, it was revealed that the sect was something far more sinister than anyone had believed. A demonic sect, utilizing arts that sacrificed the lifeforce and souls of others. The Gian were then the ones caught off balance, and quickly overwhelmed. A situation that would have been the end of the empire, if not for the empress herself.

Once again, the skies over the empire lit up with a brightness that left thousands blinded for the rest of their lives. Every single member of the Crimson Lotus, their leaders, and their holdings, were obliterated in a single strike. The Empress of the Sky had returned to save her empire once more. Though she would vanish quickly after, the message was clear. The Gian Empire was hers, and she would not allow it to fall.

Thus, the Gian Empire's legacy was forged in the crucible of adversity. It was a legacy of strategic brilliance, martial prowess, and the unyielding strength of a family bound by their matriarch's silent but ever-present influence. The Absent Empress of the Sky, through her rare but mighty displays of power, left an indelible mark on the realm, her legend living on in the annals of history and the hearts of her people.`,
        },
        {
          title: 'The Celestial Court',
          author: 'Li Wei',
          contents: `The Yichan Court, established by the venerable Celestial Emperor Lu Bu Lin, stood as one of the most enduring institutions in the history of Linghe. Formed to provide structured and stable governance for the expansive Celestial Empire, the Yichan Court was a paragon of bureaucratic efficiency and ritualistic grandeur. However, its history was marked by periods of prosperity and decline, reflecting the whims of the procession of Empress Consorts that graced the Celestial Emperor's side, all culminating in its eventual collapse after its founder's ascension.

Celestial Emperor Lu Bu Lin, an avid scholar of history, recognized the need for a stable governing body for his burgeoning empire given the dire warning the collapse of the Azurite Empire had left behind. He established the Yichan Court with meticulous care in the year 1830 after Jinshu Ascension, a mere century after his breakthrough to the ninth realm. The court was divided into several branches, each responsible for a specific aspect of governance. The Jade Bureau was tasked with the collection and management of taxes and tributes, ensuring the empire's wealth was adequately redistributed to support infrastructure and the imperial treasury. The Emerald Archive, custodians of the empire's vast knowledge, maintained libraries, schools, and records of all scholarly works. The Crimson Guard, the military arm of the court, was responsible for the defense of the empire and the enforcement of imperial edicts. The Sapphire Council, comprising the emperor's closest advisors, provided counsel on matters of state and ensured the implementation of policies. Lastly, the Ivory Tribunal served as the judicial system, overseeing law enforcement and adjudicating disputes and crimes.

Over the centuries, the branches of the Yichan Court experienced periods of prominence and decline. The Jade Bureau, initially the most powerful branch due to its control over finances, faced decline during the reign of Empress Consort Xuanzong, who introduced reforms that decentralized economic control to curb corruption. However, it regained its influence under Empress Consort Xia, who implemented stringent anti-corruption measures and restored its authority. The Crimson Guard's prominence waxed and waned with the empire's military campaigns. During the Warring Sects Period, it became the most influential branch, only to be curtailed during the Peace of the Seven Valleys, when military spending was drastically reduced. The Emerald Archive remained consistently influential, peaking during the Great Advancement, a period of intense scholarly activity and cultural flourishing. The Sapphire Council, always central to governance, similarly saw little fluctuation in power, though a particular coup by a group of powerful court eunuchs nearly led to its dissolution.

Despite the fluctuating fortunes of its assorted branches, the Yichan Court remained a cornerstone of the Celestial Empire's governance. Much of this stability was due to the Celestial Emperor's personal involvement in the court's operations. Though he had little interest in the management of the empire as a whole, he took a personal interest in the individuals that made up the court, acting as a core figure in many of the rituals that defined the court's operations. This attention was returned in kind, with the officials that made up its members exhibiting a fanatical loyalty that persisted all the way to their ascension at his side. A loyalty so strong that many accounts say those who took part in the secretive rituals of the court emerged as entirely different people.

The Yichan Court was not without its controversies, however. The Celestial Emperor's habit of taking multiple Empress Consorts, each with their own court and faction, led to intense rivalries and power struggles within the court. The most infamous of these was the Jade War, a decade-long conflict between the Empress Consorts Xuanzong and Xia that nearly tore the court apart. The Celestial Emperor's refusal to intervene directly in these disputes, instead allowing the court to resolve them through its own mechanisms, was seen as a test of the court's resilience and stability.

The ascension of the Emperor in the year 2494 after Jinshu Ascension marked the end for the Yichan Court. The loss of Lu Bu Lin himself, alongside the entire central leadership of the court, left the branches in disarray. The Celestial Empire, bereft of its guiding hand, quickly fell into chaos. The branches of the Yichan Court, each vying for control, turned on each other in a series of bloody conflicts that tore the empire apart. Little remains of its former majesty now, only the ruins of its grand palaces and the shadows within the tomb of the emperor. Still, it served as the most stable and enduring ruling body Linghe has seen in its recorded history, and stands as an example for ages to come.`,
        },
        {
          title: 'The Lost Ages',
          author: 'Li Wei',
          contents: `The history of Linghe is long, filled with heroes, empires, discoveries, and wonders. Yet, before the meticulous records that so marked the reign of the Gian and beyond, there are few accounts that have survived. What we know of the time that came before Diao Gian ascended to the ninth realm is a patchwork of myths, legends, and half-remembered tales.

The grand historian, Sima Wu, is the foremost of our sources about the time of Ying Meihua and Dong Tiang. Yet, his original texts are lost, and only accounts of their contents remain. Furthermore, the texts were reportedly a collation of folktales and second-hand sources, further throwing doubt over the accuracy of their contents. Still, they are the best we have, and from the accounts of their accounts, we can glean some semblance of the truth.

Before the grand empires that marked the rise of the Jinshu and the Gian, it was the time of the sects. Ying Meihua, the master of battle and progenitor of the fist arts, rose to prominence from one such sect, operating from the remains of the ancient ruins of Shucheng nestled between nine empowered mountains. The qi of the world in those times seems to have been stronger, more vibrant. The spirit beasts that roamed its lands were equally stronger, making up for their lack of numbers with their sheer power. Society huddled around the sects that could protect them, each their own proto-kingdom, living in terror of the arrival of a beast that would wipe them out.

The arrival of Ying Meihua, and the protection she brought to the world, changed all that. The people could spread out, could build cities and towns, could farm and trade. The sects, once the only power in the world, were forced to adapt to the new reality. Some melded together, losing their original names in favour of focusing on the families that made up their leadership. The Gian, the Fu, the Li'xa, they all reportedly have their origins in the sects of that lost age. Others, like the Nine Mountain Sect, the Reaving Blade Sect, and the Crimson Lotus Sect, instead turned their attention to cultivating a small number of more powerful disciples, becoming an elite organisation of cultivation experts.

In the time before Ying Meihua the world was different yet. Somewhere between 4000 to 10000 years before Meihua Ascension was the time of Dong Tiang, the progenitor of blossom. From his capital in Shucheng, he ruled over a treetop city that spanned the entire valley, drawing strength from the raging qi of the nine mountains that surrounded it. Long tendrils of the tree-network wove out from the city, stretching far to the north and west, giving shelter to the roaming tribes that made the land their home. A marvel of power and engineering, all reliant on the techniques of Dong Tiang himself. With his ascension, however, it was all lost, the only remains of such a magnificent place being vague accounts collated in works such as this.

The time that came before that has even less records that can be drawn from. It is presumed that Ru Gong lived somewhere around 10000 years before Tiang Ascension, but the accounts of his life are so shrouded in myth and legend that it is impossible to draw any definite conclusions. All we can say for sure is that he was the progenitor of the blood arts, and it gave the people tools with which they could combat the primordial beasts and carve out a niche for themselves in a hostile world. Ru Gong himself was said to have been a brutal tyrant, executing any who would rise to a realm that might threaten him. A reign filled with the blood that became his legacy.

What came before Ru Gong we do not know for sure. If the primordial beasts were anything like those that reportedly threatened the reign of Ru Gong then life for the people of that time would have been harsh. Nations would have been short-lived, if they managed to form at all. Society would have to have been small and nomadic, following the fluctuations of the qi of the world to the areas that were weakest and safest. Yet, the complexity of the society that Ru Gong ruled over speaks to a rich tapestry of history that we can only guess at. Civilisation does not spring forth from nothing. The truth of it, however, we may never truly know.`,
        },
      ],
    },

    // ── The Tianfeng Academy ──────────────────────────────────────────────────
    {
      name: 'The Tianfeng Academy',
      condition: '1',
      books: [
        {
          title: 'Journeys at the Edge of Linghe',
          author: 'Li Bao',
          contents: `<b>Chapter 1: Setting Forth from the City of the Sky</b>

The world of Linghe beckons to those with a wanderer's heart. The great Empress Gian showed us all that way to true knowledge was to adventure out, and I, like many of my colleagues, set out with a prayer for her divinity to bless me too. My journey began at the academy of Tianfeng. The air was crisp, filled with the whispers of ancient spirits as I bid farewell to the magnificent spires that reach for the heavens. From this center of power and progress, my goal was to traverse the borders of this immense land, to taste the flavours of its diverse cultures and witness the splendour of its varied landscapes.

<b>Chapter 2: The Jade Forest of the East</b>

Descending from the highlands, I ventured into the jade forest of the East, where verdant canopies stretched endlessly. The air was thick with the scent of blooming magnolias, and the songs of exotic birds echoed through the trees. These forests were home to the elusive Tianglong Clan, known for their mastery of blossom techniques. Their own legends claim a descent from Dong Tiang, though I met such assertions with justified scepticism. I spent several weeks with them, learning the secrets of their herbal medicines and the art of blending into the forest itself. Nights were filled with the glow of bioluminescent plants, casting a magical light on our campfires as elders told tales of legendary warriors and ancient beasts.

<b>Chapter 3: The Southern Sands of Shiwei</b>

Leaving the cool embrace of the forests, I travelled southward to the Shiwei Desert, a vast expanse of golden dunes and scorching sun. The desert tribes, known for their endurance and resourcefulness, welcomed me with open arms. Here, water was more precious than gold, and every drop was revered. I joined a caravan led by the nomadic Tumar people, crossing the shifting sands on the backs of their sturdy camels. We camped under the star-studded sky, where I learned the ancient practice of reading the stars to navigate the desert's ever-changing landscape. Their legends told that the stars were the ancestors who vanished in the seventh realm, ascending to the sky instead of pushing on to the higher mundane realms. An honour that they all strived for.

<b>Chapter 4: The Emerald Isles of the West</b>

From the arid desert, my journey took me to the Emerald Isles off the western coast. This archipelago was a paradise of lush vegetation, crystal-clear waters, and vibrant marine life. The coastal towns were bustling with activity, their harbours filled with the scent of fresh fish and the sound of merchants haggling over pearls and spices. I sailed with the seafaring Feng Clan, known for their unparalleled naval prowess and deep connection to the ocean. Days were spent diving for treasures in the coral reefs, while nights were filled with the haunting melodies of sea shanties sung by the sailors. The islanders' hospitality was boundless, their cuisine a delightful blend of flavours from land and sea. My efforts to seek passage further west, across the sea, was met with polite refusal. They claimed that the waters beyond held only death and despair, and that no one who ventured there ever returned. I would like to one day return to test that claim, but such an expedition would need to wait for another time.

<b>Chapter 5: The Frostlands of the North</b>

My final leg took me northward to the Frostlands, a realm of eternal winter where the land was cloaked in snow and ice. The inhabitants, the hardy Bei people, lived in harmony with the harsh environment. Their cities, carved from ice and stone, shimmered like diamonds under the pale sun. The Bei were formidable cultivators, harnessing the cold to forge weapons of unmatched sharpness and durability. I participated in their winter festivals, where the night sky was illuminated by the brilliant auroras, and the air was filled with the sound of drums and chants. The Frostlands were a stark, yet awe-inspiring landscape, where survival required both strength and ingenuity.

<b>Chapter 6: Return to the Heartland</b>

After many decades of travel, I returned to the heartland of Linghe, my spirit enriched by the experiences and stories gathered from the continent's edges. Each region, with its unique culture and challenges, had revealed the resilience and adaptability of its people and as I stood once more before the towering spires of Tianfeng I knew that my wanderings had only just begun. The world of Linghe was vast and boundless, and I was eager to explore every corner of its wondrous expanse.`,
        },
        {
          title: 'Voyage into the Unknown',
          author: 'Captain Wei Shen',
          contents: `Our journey began on a crisp autumn morning, the sun rising over the eastern coast of Linghe, casting a golden hue on the bustling port of Yunhai. As captain of the Azure Dragon, I had gathered a crew of seasoned sailors and scholars eager to explore the uncharted waters beyond the Jade Forests. With supplies stocked and spirits high, we set sail into the vast, beckoning sea, leaving behind the familiar shores of Linghe.

For the first few days, our voyage was uneventful. The sea was calm, and the winds were favourable, carrying us steadily eastward. We encountered pods of playful sea-beasts and schools of shimmering fish, their presence a good omen for our journey. The crew was in high spirits, spending evenings singing sea shanties and sharing tales of maritime adventures. Our ship sliced through the waves with ease, and we marvelled at the beauty of the open ocean, its endless horizon promising adventure.

As we ventured further from the coast, strange phenomena began to occur. It started with eerie whispers carried on the wind, unintelligible but unmistakably real. The scholars among us suggested they might be echoes from underwater currents or the calls of deep-sea creatures. At night, the sea glowed with an otherworldly luminescence, illuminating our ship with an eerie, pale light. The crew grew uneasy, but we pressed on.

A week into our journey, we encountered a dense, unnatural fog that enveloped the ship, reducing visibility to mere feet. The air grew cold, and an unsettling silence fell over us. Strange shapes loomed in the fog, and more than once we thought we glimpsed ghostly ships sailing alongside us, only for them to vanish when approached. The mist eventually lifted, but our relief was short-lived. Dark clouds gathered on the horizon, and a violent storm descended upon us with little warning. This was no ordinary tempest; the winds howled with a haunting wail, and the waves rose to monstrous heights, as if trying to swallow the Azure Dragon whole. Lightning crackled in unnatural patterns, illuminating the sky with strange symbols that none of us recognized. The storm seemed almost sentient, targeting our ship with relentless fury. Despite our best efforts, we were tossed about like a leaf in the wind, struggling to maintain control.

In the eye of the storm, the sea grew inexplicably calm. Our navigator, Li Fang, reported that we had been pulled into a mysterious current, one that defied all known laws of nature. Steadily we were being dragged outwards, towards the unknown. Even stranger yet, the ship was riding lower and lower in the water, as if some unseen force was pulling us beneath the waves. Panic gripped the crew, and I ordered all hands on deck to prepare for the worst. Divers were sent down to see what the cause of this phenomenon was.

That was when we saw it. A massive, dark figure, lurking deep beneath the waves. A beast of unimaginable size and writhing with twisted proportions. Far too great of a threat for our meagre vessel to face. In a frantic bid for survival, we turned the ship towards the setting sun, hoping to lose the beast in shallower waters. As we retreated, the storm parted, as if inviting us to return to the lands of Linghe. Far too convenient of an occurrence to be random chance. Yet, we did not linger to ponder its implications.

Exhausted and battered, we finally made our way back to the familiar shores of Linghe. Our ship, damaged and weary, limped back into the port of Yunhai. We had been at sea for less than a month, yet it felt like a lifetime. The crew, once eager and adventurous, was now solemn and reflective. Something of true, unimaginable power lay out there. What wonders that might lie out there to be found no longer seemed so tempting. I fear they may lay undiscovered forever.`,
        },
      ],
    },

    // ── Collected Writings of the Upper City ──────────────────────────────────
    {
      name: 'Collected Writings of the Upper City',
      condition: '1',
      books: [
        {
          title: 'The Heavenly Firmament',
          author: 'Wei Yunfeng',
          contents: `The heavens have long proved to be a source of fascination and inspiration for people throughout recorded history. A great expanse of unlimited power, so close yet always out of reach. The Celestial Emperor Lu Bu Lin was so fascinated with its allure that he developed an entire school of techniques around the strength it represented. Yet few have tried to truly understand exactly what it is, what it represents.

Much of what is known about the heavens has been gleaned from Lu Bu Lin's musings on the matter during the centuries of his rule, though he did not grace the world with writings of his own. All attempts to replicate his ventures in the millennia since his ascension have been met with failure, as the qi density at such heights has caused any expedition to turn back before even reaching the Laobai Firmasphere. Yet observation with telescopes, and study of the Falling Stars that cause such widespread devastation when they land, have lent much credence to his words.

Above the great continent of Linghe rises a great stretch of air, filled with clouds, beasts, floating islands, and other oddities. This is the realm of cultivators, easily visitable by any who have the capability to ride a flying sword. This region is also known as the Mortal Firmasphere.

Above this layer lies the Laobai Firmasphere, a region of dense, yet familiar, qi. The beasts that inhabit its strange ruins are deadly beyond compare, and few have ever ventured into its depths. The origin of those ruins are as a result a mystery, as it is unlikely that any civilisation of the past could have built them. Yet exist they do, and it was here that the Empress Gian was said to have spent most of her years.

Above the Laobai Firmasphere is the Firmament itself. A sea of pure qi, powerful beyond compare. It is here that the celestial bodies move through, that the stars hang within, and that the qi of the world flows from. The rare material expulsions from this heavenly place are some of the most deadly threats to afflict the surface below, the monstrous and loathsome beasts spilling out from within twisted beyond recognition. More energetic expulsions of the Firmament often manifest as a deep red lightning, also known as Heavenly Tribulations, and are the source of much power for those foolish cultivators willing to risk harnessing such raw energies.

Lu Bu Lin's accounts speak of further lands deep within the firmament, of beasts and treasures and wonders beyond compare. Maybe these places are the source of the Falling Stars, or maybe they are the source of the power that the Celestial Emperor wielded. Such answers will remain out of reach until another can breach the seventh wall and rise to the ninth realm.`,
        },
        {
          title: 'Musings on the Nature of Qi',
          author: 'Jun Ping',
          contents: `Qi. The lifeblood of Linghe, the essence that flows through all living things, the source of power and enlightenment. It is the foundation of cultivation, the key to unlocking the mysteries of the universe, the path to ascension. Yet, for all its importance, the nature of qi remains shrouded in mystery, its true origins and properties still a subject of debate among scholars and cultivators alike. From whence does it come? How does it manifest in the world? What are its limits and possibilities? These are questions that have puzzled generations of seekers, and to which we still seek answers.

There are, however, certain facts that are universally accepted. Qi is a form of energy that permeates the world, existing in all things, from the smallest pebble to the mightiest mountain. Its density and purity vary from place to place and from time to time, slowly shifting and flowing with the passing of the seasons and the ages. It is strongest in the 11th month of each year, before dipping to its lowest point in the 12th. On a more localised scale, it is strongest at dawn and dusk, and weakest at midday and midnight. It is also weakest at the center of Linghe, growing stronger the higher one ascends or the deeper one descends, or the further out on the sea one travels. Of course, even within these general rules there are fluctuations in the qi that give rise to the strange and wonderful phenomena that are so sought after by cultivators.

Much effort has been put into seeking the answers to what exactly qi is. As a cultivator rises through the realms, their death unleashes more and more qi into the world. A similar phenomenon has been observed on the death of spirit beasts, something that cultivators take full advantage of to quickly accumulate the qi required to achieve a breakthrough. This would lead the careless observer to conclude that qi is the essence of life itself, yet this cannot be the full picture. Inanimate materials such as the minerals found deep below the ground can contain qi in equal quantities, and unleash it in much the same way upon their destruction. Does this mean that rocks have souls too?

In a series of experiments in the Tianfeng Academy during the Gian Empire, the effects of various densities of qi on a cultivator's body were observed. The controversy around the willingness of the participants in this study aside, it did uncover some curious results. A state of full qi-deprivation had little effect on weaker cultivators and spirit beasts, such as those in the Qi Condensation realm and below. However, those in the Core Formation realm and above quickly began to weaken, and in some cases even died, though the lack of participants in the trial above the Core Formation realm meant that the results could not be considered conclusive. The opposite trial, of infusion in a chamber designed to mimic the qi of a higher realm, had far more striking results. Mutations soon occurred in the participants, with the weaker cultivators achieving sudden breakthroughs to the next realm, before twisting and then succumbing to death. Later autopsies revealed much of their blood and internal organs had been replaced with strange, crystalline structures that bore no resemblance to the original materials. Spirit beasts, however, fared far better, with the majority of them surviving the trial and showing no ill effects.

Later attempts to replicate the findings, but without using living participants, have revealed other strange results. Materials placed within a path of intense qi, or a lower density for a longer period of time, slowly transmute into something else entirely. What exactly the end material will be seems to have been unrelated to the original material, with everything from qi-touched gemstones to technique crystals forming out of the source material of clear quartz. And yet, though these end materials are distinct from one another, they are identical to other samples of that final material uncovered all over Linghe. The researchers concluded that the qi was transmuting it to a new form based on a pattern held elsewhere, though the mechanism of this or where such patterns would be held and communicated from, they could not determine.

The truth of qi is a mystery that may never be fully unravelled. Research still has a long way to go before it has unveiled the true mechanisms behind the strange substance's workings. Yet, the pursuit of knowledge is a noble one, and the quest to understand the nature of qi is a journey that will continue to inspire generations of scholars and cultivators to come.`,
        },
        {
          title: 'The Path of Ascension',
          author: "Zhuge Li'an",
          contents: `Cultivation. The heart of what gives our world meaning, a perfection for every man, woman, and child to strive for. A path that leads one to the heavens, and the final goal of ascending from this plane into what lies beyond. This work seeks to detail the stages of this ascension, as far as information is available, to better aid those who wish to walk this most perfect of paths to its conclusion.

All beings of Linghe start off mundane (though there is some dispute of whether spirit beasts behave in the same fashion, as few are seen at realms beyond what is considered their 'natural state'). In this form their bodies are purely physical matter, hosting a soul of qi that gives it animation. Studies have shown that upon death the qi released from a being of this realm's expiry is minor to non-existent, leading many to argue that those in the mundane realm do not fully qualify as beings. Breaking out of this realm is accomplished via a concentrated injection of qi into the body, a process that is often referred to as 'awakening'. This process was historically done by a master of the art, though nowadays a pill has been developed to more easily complete this.

The first true realm of cultivation is that of Body Forging. In this realm, the cultivator seeks to strengthen their physical form, to make it more resilient and able to withstand the ravages of the qi future realms will subject it to. This is done through a variety of methods, from the consumption of rare herbs and minerals to the practice of martial arts and weapon techniques. Every sect and family have their own methods for this breakthrough, based on the resources available around their abode. Every method, however, holds some steps in common. Materials to provide resonance, qi sources to provide guidance, and some form of destruction that breaks the body down to allow it to reform. Of all the breakthroughs, this is the most likely to result in the death of the would-be-ascender.

The second realm is that of Meridian Opening. In this realm, the cultivator seeks to open the full collection of meridians of their body, the pathways through which qi flows. Though most who find themselves drawn to the path of ascension have already between one and three meridians open, any more would prove deadly to open without the new form the Body Forging stage imparts. The methodologies for this breakthrough also tend to be similar, involving the creation of qi-aligned needles to place into the meridians, and then injecting a large amount of qi into the body to force them open.

Once past the Meridian Opening bottleneck, the cultivator enters the realm of Qi Condensation. In this realm, the cultivator seeks to condense the qi that flows through their body into a more potent form, one that can be manipulated and utilized for a variety of purposes, including powerful techniques and abilities. A variety of condensation arts for this are available throughout Linghe, each depicting a specific way to circulate qi and condense it into droplets.

These first three realms are commonly known as the 'Material Realms', as they deal with the physical body and the qi that flows through it. The majority of cultivators will never rise beyond this point, accepting the greatly extended lifespan and physical benefits without pushing on to the more dangerous and costly breakthroughs that come beyond. The next three realms are known as the 'Soul Realms', as they deal with the soul and the qi that flows through it.

Once the cultivator has condensed enough qi, they are able to move on to the next realm, that of Core Formation. In this realm, the cultivator seeks to transmute their own core, their soul, into a more condensed form of qi. With the droplets they formed in the preceding realm as a guide the cultivator will go through a series of compressions, layering stronger and stronger shells around their core and forcing it to condense. This process is often referred to as 'forming the pearl', and is a dangerous breakthrough to achieve. The core is the seat of the soul, and any damage to it can result in the death of the cultivator. Many stop before the full pearl is formed, but for those that persist they find the qi they can channel externally greatly increased. This realm also brings with it more threats than a failed breakthrough. At this point in their cultivation journey, a cultivator is partially formed from qi, and their death will result in a release of the substance that can be used by others to further their own cultivation. As a result, Demonic Sects are known to hunt Core Formation cultivators as materials in their own profane breakthroughs.

The realms beyond this point are less well known, as the few that reach them are close-lipped on the specifics. This author too has not reached them, and so cannot provide a first-hand account. However, some information has been diffused throughout the land over the ages, and a summary of their findings have been collected below.

Once a core has been formed in the soul of the cultivator, the next realm is that of Pillar Creation. It is said that at this point a 'Soul Pillar' must be formed within the core of the cultivator's soul, stretching it to accomplish something. A substance known as 'Qither' seems to be related to this act, and many of the cultivators in this realm search the width and breadth of the land for especially potent sources of qi that can be changed to provide a source of it. Heavenly tribulations, parts of the most powerful spirit beasts, meteoric treasures, these all seem to be sought out with a voracious need.

The next realm beyond is Life Flourishing. Those cultivators that manage to reach this sixth realm are generally a strange folk, even by the standards of cultivators. Disappearing for years to decades at a time, with the rest of their time in the world obsessively focused on the production of some form of life. The living metal puppets of Te Jinshu being one such example. What the breakthrough to the seventh realm entails is unknown, but its difficulty must be immense as very few ever breach the so called 'seventh wall'. Most cultivators who reach the Life Flourishing realm simply stay at the Late stage for centuries, until their eventual sudden vanishing from the world.

The final three realms beyond are known as the 'Domain Realms'. Very few ever reach this point, and as such the information on what exactly they entail is even less available than that on the 'Soul Realms'. Of the cultivators that reach these realms, the incidences of the sudden disappearance seen of cultivators in the Life Flourishing realm are even higher, even more prominent due to the influence such powerful cultivators have on society. In fact, this fate seems to eventually claim all but those who manage to push on to the ninth realm, so only six cultivators in history have ever been known to survive.

As to what awaits at the end of the path, beyond the ninth realm and ascension, is even more unknown. Ascending seems to take the cultivator and a number of those bound to them beyond this world in a pulse of qi that shakes the very nature of reality of itself, and none ever return from this most final of fates.`,
        },
      ],
    },

    // ── Linghe Primer ─────────────────────────────────────────────────────────
    {
      name: 'Linghe Primer',
      condition: '1',
      books: [
        {
          title: 'The Five Sects and Three Houses',
          author: 'Shi Shu',
          contents: `Throughout history, a number of different powers have ruled Linghe. Empires, sects, warlords, and coalitions. Yet, since the dissolution of the Yichan Court in the year 29 after Lin Ascension, five sects and three houses have come to dominate the land. These are the houses of Gian, Jinshu, and Lin, and the sects of the Azure Dragon, the Jade Serpent, the Heavenly Sword, the Nine Mountains, and the Reaving Blade. The alliance between these powers has kept the peace in Linghe for centuries, and their influence is felt in every corner of the continent.

<b>The House of Gian</b>

A powerful noble house with roots that stretch back to the progenitor of the cloud arts, Diao Gian. For millennia they have persisted as a powerful political entity, producing many of the strongest and most influential cultivators in Linghe. Trying to embody the adventuring spirit of Diao Gian, the house often sends their young scions out to study as part of the five sects, a temporary sacrifice of strength for the potential of influence over these disparate groups. Over the centuries, they have formed the closest ties with the Azure Dragon Sect, and its members are often found in positions of power within the sect's hierarchy.

<b>The House of Jinshu</b>

This house ties back to another of the progenitors, Te Jinshu, the source of the weapon arts. They have long been the most martially focused of the three houses, and their members are often found leading the armies of Linghe into battle. Secular and reclusive, they rarely interact with the sects or other houses directly, preferring to operate through intermediaries that carry their demands. They place a high value on their skill at crafting weaponry, especially artefacts, and will often trade these for favours or resources.

<b>The House of Lin</b>

A relatively new house in the history of Linghe, the Lin rose to prominence during the rise of the celestial emperor Lu Bu Lin. Once, they were the only ones able to access the tomb of their ancestor, but have since opened its access to all. As a result, they have the most support of all the houses amongst the cultivator population, a popularity that they diligently cultivate through a variety of training programs and public appearances. They are the most politically active of the houses, often found in the courts of the various sects and occupying other positions of power.

<b>The Azure Dragon Sect</b>

A sect claiming the oldest lineage, joint with the Nine Mountain Sect, the Azure Dragon Sect is known for its focus on the blossom and cloud arts. Hailing from an island just off the western coast, nestled in the crystallized remains of an ancient dragon-beast, the disciples within train mostly in the deep places beneath the waves. Politically passive and reclusive, they are well liked by the other sects for their lack of interference in the affairs of the continent.

<b>The Jade Serpent Sect</b>

A sect that focuses on the blood and weapon arts, the Jade Serpent Sect is known for its fierce warriors and skilled craftsmen. They are based in the outskirts of the Jade Forest, where they have built a network of great towers and hidden training grounds. The Jade Serpent Sect is known for its strict hierarchy and martial discipline, with its members often serving as mercenaries or bodyguards for the other sects. Claiming a joint lineage from the progenitors of the weapon and blood arts, they often clash with the Jinshu over their own claims, insisting that the noble house is an insult to the memory of their ancestor.

<b>The Heavenly Sword Sect</b>

A sect that focuses on the celestial and cloud arts. They are based in the Tiangkong mountains beyond the northern wastes, where they have constructed a series of observatories and training grounds that focus on the threats that come from the heavens above. Lu Bu Lin himself was a member of this sect, their focus on the skies serving as the perfect seedbed to grow the fascination that would eventually bloom into the celestial techniques. This sect is always the first to arrive at any Falling Star site, and the first to strike at any beast that emerges from the Firmament, and the treasures they collect from these natural treasures keeps the sect powerful.

<b>The Nine Mountain Sect</b>

A sect that focuses on the fist and blossom arts. Nestled between nine mountains of unfathomable qi, the Nine Mountain Sect is known for producing some of the most powerful cultivators Linghe has ever known. Tracing their history back to Ying Meihua and Dong Tiang, both of which operated out of the valley between the mountains, they have been the target of much jealousy over the years. Numerous attempts have been made to destroy the sect and claim the treasures within, but all have failed, and the Nine Mountain Sect remains a powerful force in the world.

<b>The Reaving Blade Sect</b>

A sect that focuses on the blood arts. Based in the deserts of the south, the Reaving Blade Sect is known for its fierce warriors and ruthless tactics. Eschewing the traditional focus on hunting spirit beasts the other sects adhere to, the Reaving Blade's core goal is the destruction of all remains of the Demonic Sects. As a result, they train extensively on the art of cultivator on cultivator combat, and are known for their brutal efficiency in battle. The unique Body Forging breakthrough of this sect sacrifices their longevity in return for great power, and as a result their members are often found throwing themselves into the most dangerous of situations.

<b>The Demonic Sects</b>

No treatise on the sects of the realm would be complete without mentioning the Demonic Sects. Though this is not a sect in the traditional sense, the Demonic Sects are a collection of rogue cultivators that live outside the bounds of society, striving to achieve power using the forbidden techniques that arose in the time after the Gong Ascension. Striking to capture any cultivators that they are able to, they are known to use them as materials in their own profane breakthroughs. The Reaving Blade Sect has long been at war with them, and the other sects are known to offer bounties for their capture or execution.`,
        },
        {
          title: 'The Center of the Great Continent',
          author: 'Shi Shu',
          contents: `Linghe, the great continent on which we all live. Filled with wonders and dangers, beauty and horror, it is a land of contrasts and contradictions. From the lush forests of the east to the frozen tundra of the north, from the arid deserts of the south to the azure isles of the west, Linghe is a place of infinite variety and endless possibility. Yet, the greatest of its treasures lie at its center, where the hub of civilisation rests. This primer is intended to give all who read it a glimpse into the beating heart of Linghe, and the landmarks and notable locations one might find there.

<b>Shen Henda City</b>

The capital of Linghe, Shen Henda City is a sprawling metropolis that serves as the political, cultural, and economic heart of the continent. The city is a bustling hub of activity, filled with markets, mansions, and mausoleums that reflect the rich history and diverse cultures of the land. The city itself is split into two, the lower city situated on the ground, and the upper city in the skies above it, suspended on great floatation arrays. The upper city is home to the most prestigious of the cultivator houses, who rule from their marble estates overlooking the smallfolk far below.

<b>The Northern Wastes</b>

A vast expanse of barren rock that stretches from the edge of Shen Henda to the Tiangkong mountains to the far north. Much of the region is uninhabited, save for the occasional nomadic tribe, and as a result little effort has been expended to clear the dangerous beasts from its depths. Travel through this region is treacherous, with sudden storms and hidden crevasses posing a constant threat to unwary travellers, and powerful beasts lurking around every corner. There are also rumours that is where the demonic sects operate out of, but the few expeditions to uncover this fact were unable to discover any hint of their whereabouts. It is not all bleak, however. The region is home to a number of ancient ruins, ancient barrows and treasure troves, ready to be claimed by the brave explorers willing to venture into its depths.

<b>The Shugou Chasm</b>

A long, jagged pit situated on the eastern edge of the Northern Wastes. Long spears of crystal jut out from the walls, providing a semblance of footing to those who would wish to descend into its depths. The deeper one goes, the heavier the body of the descender is said to feel, and after a certain point unwary cultivators will struggle to ascend once more. The qi raging through this place does so in suffocating waves, a phenomenon that also causes flying swords to drop from the air in its vicinity, and so the only way to traverse its depths is on foot. The crystals harvested from the deeper regions of the Chasm are said to be the most potent in all of Linghe, and are highly sought after by sects and houses alike.

<b>The Nine Mountains</b>

A circle of towering peaks that dominate the landscape to the south of Shen Henda. A powerful wellspring of qi, it has been revered by cultivators since time immemorial. Few other places in Linghe provide such easy access to qi up to the ninth realm, and so the Nine Mountain Sect that make the mountains their home have maintained their place as one of the most powerful sects in the land. Their disciples can often be seen training on the slopes or meditating in the caves that dot the mountainside, or handling the dangerous beasts that spring up in such powerful qi before they can devastate the lands beyond.

<b>The Jade Forest</b>

A vast expanse of verdant green that stretches from the foothills of the Tiangkong mountains to the eastern coast. The qi within its depths has been steadily rising over the eons, and the density of the beasts within similarly so. No settlements remain in its depths, the former occupants relegated to an existence on the outskirts where they monitor the forest from great towers. The qi in its depths has also caused a strange transmutation of the ancient trees within, turning their trunks and leaves into shimmering jade. Those who venture into its heart speak of wonders and horrors beyond compare, of beasts that defy description and treasures that ignite unbearable greed in all but the most controlled of cultivators.

<b>The Yanshi Yun Islands</b>

A series of floating islands, suspended at the upper reaches of the Mortal Firmasphere. It is thought that an especially cataclysmic pulse of qi many eons ago transmuted the land beneath them into Paiofu Stone, and subsequently they tore themselves from the ground and rose to their current position. Originally from the far corners of the continent, they have been slowly drifting together, forming clusters that are now home to a variety of strange and wondrous creatures. It is thought that two of these clusters will collide within the millennia to come, and the resulting explosion of qi will be felt across the entire continent.`,
        },
      ],
    },

    // ── Forgelord's Writings ──────────────────────────────────────────────────
    // NOTE: Originally condition-gated by 'forgelordBook1Opened' in the base game.
    // We don't have that flag, so this is always visible once the library is unlocked.
    {
      name: "Forgelord's Writings",
      condition: '1',
      books: [
        {
          title: 'Life',
          author: 'Forgelord',
          contents: `Life is a curious thing. All who I have spoken to insist they know what it means, what it <i>is</i>, yet none can truly define it. Is it the ability to move, to act, to do? Some have insisted so, and yet when shown an artefact, a dancing blade or bow, an item that can do all of those things, they insist that it is not alive. Is it the ability to handle qi, to manipulate and channel it? Again, some insist that it is the case, and yet also insist that a formation that can do all that and more is a mere object, unworthy of being called living. The same arguments are presented for and against the ability to adapt, to grow, to cease, and to reproduce.

I, like all who reach my realm, have had to face this question too. How can one make something alive, truly alive, if one cannot identify the markers that make it so? My daoist partner and visage of utmost perfection, Needle Fairy, insists it can be achieved through an iterative process of refinement. That it must arrive organically, randomly, without careful design or planning. I, however, am not so sure. Her creations are beautiful, but are no more considered life by her soul-world than mine are by mine. They cannot withstand the threats that expanding it requires, just as mine have similarly fallen before that most deadly of tribulations.

Forge Spirits, as real as they may seem to any who interact with them, are not alive. They can converse, have memory, adapt and change and learn. Some even seem to have likes and dislikes, emotions and desires. Every day I am fooled into believing they are more than they truly are. And every day my heart breaks anew when they fail the tests within. What differentiates them from a person? What makes them less than a cultivator? Than a spirit beast?

The beasts themselves fascinate me. There is something uncanny to their look, the way they move and adapt. They, I am sure, are alive. The more I study them, the more ideas I have to try when perfecting my own spirits. It is as if something within them was made to teach me, the hidden hand of something more, guiding me towards an answer that is always just out of reach. Strange as it is, I would be willing to say they were <i>designed</i>. But by whom? And for what purpose?

The only answer I have is to keep trying. To keep refining my approach, to seek out that vital essence that I am missing. I do not think I can do that here anymore, on First Mountain. I think I will go north, and then east. Maybe in the wastes or the jade forest I will find the answers that I seek. The final piece of the puzzle to breathe true life into my dear spirits. I can already feel the tremors starting, the great forces testing the edges of my borders. I fear if I do not make progress soon, it will be too late.`,
        },
      ],
    },

    // ── Dong Tiang's Writings ─────────────────────────────────────────────────
    // NOTE: Originally condition-gated by 'tapestryTranslated' in the base game.
    // We don't have that flag, so this is always visible once the library is unlocked.
    {
      name: "Dong Tiang's Writings",
      condition: '1',
      books: [
        {
          title: 'Stone Tapestry Translation',
          author: 'Dong Tiang',
          contents: `The Soul Pillar, and the Keystone. That is where all my troubles stem. I make this account in the hope that a future aspirant may discover it, and finish what I could not. The qi of this realm, of this world, it is too thin to sustain me for much longer. I must ascend, or die. At the ninth realm, the most powerful of cultivators, yet still unable to stand against the relentless force of the firmament. What a joke, this path of ascension is.

I have learnt many things during the long years of my life, though few have brought me as much joy as the nature of Qi. Techniques. Intertwined in such a fundamental way, yet apart. Blood was all the world knew, ever since the cursed demon Gong ascended. I have brought blossom, life in its purest form. Yet they are still connected. There is a resonance between the styles, and with other, more esoteric forms I do not yet understand. I have left my discoveries in the chambers connected to this one. May they be of use, if you can attune to their truths. There is something there, something I have missed. But my time is out.

I have sealed the Keystone, that which the demons of blood have been seeking. Though I have stomped them for the eyes of the world, I know they simply lurk in the shadows, awaiting my departure from the realm. So I must protect it, for without it all will be doomed. You will not find yourself able to access its depths until you pass the seventh wall, but when you do, be warned. I have tried every possible approach to mend what was broken, and I have failed. A relentless, hopeless pursuit that has consumed my life. Do not let it take you too.

Yet, the truth is, the pillar is fractured. What caused it to be so, I do not know. Whether it even <i>is</i> a soul pillar, I do not even know. It seems as such, to my eyes, but how could such a thing be? Again, I do not know. I feel I say such bleak words all too much, these days.

I hesitate to say more, to leave more in this record for fear of the wrong eyes learning something they should not. I will instead leave a fragment of myself, an echo of my soul, in the blossom. Attune with it, and you will be able to touch upon that echo. Prove yourself worthy, and I will converse if I am still able. Truly, I do not know if even that endeavour will succeed.

Good luck, future aspirant. I hope you find the answers I could not.`,
        },
      ],
    },

  ],
};

