"use strict"

export const numbers =
  ["7", "66", "500", "3", "4", "2", "80", "17", "99", "43"]

export const places = {
  at: ["the White House", "the UN", "the Facebook offices", "the Clinton Foundation", "the Oval Office", "Whole Foods"],
  in: ["Canada", "Saudi Arabia", "France", "New Jersey", "Washington", "Russia", "Silicon Valley", "North Korea"]
}

export const nouns =
  {
    celebs: ["Brad Pitt", "Albert Einstein", "the Illuminati", "Obama", "Donald Trump", "Jesus", "Jay-Z", "Beyonce", "Bernie Sanders", "Hillary Clinton", "Tupac", "Vladimir Putin", "Caitlyn Jenner", "Mariah Carey", "Ted Cruz", "Michelle Obama", "Drake", "Rihanna", "the Supreme Court", "the 99%"],
    objects: {
      plural: ["shoes", "children", "aliens", "oatmeal cookies", "votes", "chairs", "celebrities", "immigrants", "toxins", "chemicals", "chemtrails", "coconuts", "Democrats", "Republicans", "humans", "dogs", "CEOs"],
      singular: ["woman", "dad", "child", "boy", "feminist", "teenager", "kitten", "activist", "protester", "vegan", "student", "refugee", "CEO"],
      isms: ["yoga", "hypnotism", "feminism", "homophobia", "body odor", "the Internet", "intellectualism", "religion", "veganism", "fascism", "socialism", "addiction"]
    }
  }

export const verbs =
  {
    past: ["met with", "found out about", "embarrassed", "worked with", "exposed", "avoided", "insulted", "LIED to", "was seen with", "got caught with", "pissed off"]
  }

export const adjectives =
  ["amazing", "Republican", "liberal", "racist", "feminist", "gay", "harmful", "toxic", "vegan", "violent", "biased"]

export const siteNames =
  [
    "THETRUTH.ORG",
    "TheTruthDoctor.com",
    "SignEverySinglePetition.org",
    "YES.com"
  ]

export const titles =
  [
    ["You won't believe what happened when", nouns.celebs, verbs.past, "the", adjectives, nouns.objects.singular],
    [numbers, "things that changed the way I think about", nouns.celebs.concat(nouns.objects.plural, places.at, places.in)],
    [numbers, "things we all love about", nouns.celebs.concat(nouns.objects.plural, places.at, places.in)],
    ["The truth behind", nouns.celebs.concat(nouns.objects.plural, places.at, places.in), "and", nouns.celebs.concat(nouns.objects.plural, places.at, places.in)],
    ["What really happened with the", nouns.objects.singular, "at", places.at],
    ["Scientists just discovered that", nouns.objects.plural, "are actually", adjectives, "- here's the proof"],
    ["Reports show that", nouns.objects.isms, "is secretly", adjectives, "- and the numbers don't lie"],
    ["Here's what happened when", nouns.celebs, verbs.past, nouns.celebs],
    [numbers, "reasons why researchers are saying NO to", nouns.objects.plural],
    ["Can being", adjectives, "actually change your life?", "True stories from", nouns.celebs],
    ["Has", nouns.objects.isms.concat(places.at, places.in), "actually been rooted in", nouns.objects.isms, "all along?"],
    ["I had no idea that", places.at.concat(places.in), "was actually", adjectives, "... until this happened."],
    ["What's really going on behind the scenes at", places.at],
    [nouns.celebs, "finally admits to being", adjectives, "- what?!"],
    ["This", adjectives, nouns.objects.singular, "will make you cry."],
    [places.at.concat(places.in), "is nothing but", nouns.objects.plural, "and", nouns.objects.plural, "- according to", nouns.celebs]
  ]

export const descriptions =
  [
    "You'll be stunned.",
    "You won't believe it.",
    "Just wow.",
    "How can this be possible?",
    "... and why all of your friends are talking about it.",
    "... and why it's trending on Twitter.",
    "Whaaaaat?!",
    "Seriously, this is crazy.",
    "How is this still happening?",
    "Prepare to have your mind blown.",
    "How is nobody talking about this?",
    "What the media ISN\'T telling us.",
    "Yep, this is real.",
    "How is this real?",
    "I couldn't believe it."
  ]
