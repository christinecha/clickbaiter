"use strict"

export const numbers =
  [7, 66, 500, 3, 4, 2, 80]

export const places =
  ["White House", "Clinton Foundation", "Oval Office"]

export const nouns =
  {
    celebs: ["Brad Pitt", "Albert Einstein", "the Illuminati", "Obama", "Donald Trump", "Jesus", "Jay-Z", "Beyonce", "Bernie Sanders", "Hillary Clinton"],
    objects: {
      plural: ["shoes", "children", "aliens", "oatmeal cookies", "votes", "chairs"],
      singular: ["child", "shoe", "kale wrap", "feminist", "fish"]
    }
  }

export const verbs =
  {
    direct: ["threw up on", "kissed", "met"]
  }

export const adjectives =
  ["amazing", "Republican", "liberal", "racist", "feminist", "gay"]

export const siteNames =
  [
    "THETRUTH.ORG",
    "TheTruthDoctor.com",
    "SignEverySinglePetition.org",
    "YES.com"
  ]

export const titles =
  [
    ["You won't believe what happened when", nouns.celebs, verbs.direct, "the", adjectives, nouns.objects.singular],
    [numbers, "things that changed the way I think about", nouns.celebs.concat(nouns.objects.plural)],
    ["The truth behind", nouns.celebs.concat(nouns.objects.plural), "and", nouns.celebs.concat(nouns.objects.plural)],
    ["What really happened with", nouns.objects.singular, "at the", places],
    ["Scientists just discovered that", nouns.objects.plural, "are actually", adjectives, "- here's the proof"],
    ["Here's what happened when", nouns.celebs, verbs.direct, nouns.celebs]
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
    "Prepare to have your mind blown."
  ]
