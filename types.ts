export interface YogicAttributes {
  // Positive Drivers (The Yogi Nature)
  sattva: number;
  vairagya: number;
  viveka: number;
  pranayama: number;
  santosha: number;
  titiksha: number;
  dama: number;
  ekagrata: number;
  seva_bhakti: number;

  // Negative Drivers (The Animal Nature)
  tamas: number;
  rajas: number;
  lobha: number;
  alasya: number;
  abhinivesha: number;
  chanchalata: number;
  himsa: number;
  bahirmukha: number;
  steya: number;
}

export interface AnimalMetadata {
  type: string;
  current_population: string;
  population_trend: string;
  habitat: string;
  ecological_relations: string;
  score_explanation: string;
  wikipedia_link: string;
}

export interface Animal extends YogicAttributes, AnimalMetadata {
  name: string;
  id: string; // slug
  total_score: number;
  positive_score: number;
  negative_score: number;
  rank: number;
}

export const ATTRIBUTE_LABELS: Record<keyof YogicAttributes, string> = {
  // Positive
  sattva: "🟢 Sattva",
  vairagya: "🔵 Vairagya",
  viveka: "🟣 Viveka",
  pranayama: "💨 Pranayama",
  santosha: "☮️ Santosha",
  titiksha: "🏔️ Titiksha",
  dama: "🧱 Dama",
  ekagrata: "🎯 Ekagrata",
  seva_bhakti: "🤝 Seva/Bhakti",

  // Negative
  tamas: "🔴 Tamas",
  rajas: "🟡 Rajas",
  lobha: "🍖 Lobha",
  alasya: "💤 Alasya",
  abhinivesha: "😱 Abhinivesha",
  chanchalata: "🐵 Chanchalata",
  himsa: "🩸 Himsa",
  bahirmukha: "👀 Bahirmukha",
  steya: "🕵️ Steya",
};

export const ATTRIBUTE_DESCRIPTIONS: Record<keyof YogicAttributes, string> = {
  // Positive
  sattva: "Purity, harmony, and balance. Animals with high Sattva bring peace and clarity to their environment.",
  vairagya: "Detachment and dispassion. The ability to let go, live simply, and exist without clinging to territory or possessions.",
  viveka: "Discernment and wisdom. The intellectual ability to distinguish between the beneficial and the harmful, or the real and unreal.",
  pranayama: "Regulation of life force. Manifests as vitality, breath control, and rhythmic, synchronized existence.",
  santosha: "Contentment. The state of being happy with what one has, lacking constant craving or dissatisfaction.",
  titiksha: "Endurance and forbearance. The ability to withstand hardship, weather, and pain without suffering or complaint.",
  dama: "Restraint of the senses. Control over impulses and immediate reactions to external stimuli.",
  ekagrata: "One-pointed focus. Complete, unbroken concentration on a specific task, object, or state of being.",
  seva_bhakti: "Service and devotion. Manifests as symbiotic relationships, self-sacrifice, loyalty, and care for the community.",
  
  // Negative
  tamas: "Inertia, darkness, and ignorance. Manifests as destructive behavior, dullness, decay, or parasitic existence.",
  rajas: "Passion and hyperactivity. Restless, frenetic energy that leads to aggression, stress, and constant motion.",
  lobha: "Greed. Excessive consumption, gluttony, or hoarding resources beyond one's immediate survival needs.",
  alasya: "Lethargy. Laziness or lack of effort that prevents necessary action (distinct from peaceful rest).",
  abhinivesha: "Fear of death and clinging to life. Manifests as extreme survival anxiety, desperation, or panic.",
  chanchalata: "Restlessness of mind. The 'monkey mind' that cannot stay still, constantly jumping between distractions.",
  himsa: "Violence and injury. Causing harm to other living beings, whether for food, territory, dominance, or sport.",
  bahirmukha: "Outward orientation. Constant distraction by external sensory stimuli, lacking inner awareness or grounding.",
  steya: "Theft. Taking what is not given, including parasitism, stealing food, or exploiting the resources of others."
};

export const ATTRIBUTE_WEIGHTS: Record<keyof YogicAttributes, number> = {
  // Positive
  sattva: 3,
  vairagya: 2,
  viveka: 2,
  pranayama: 1,
  santosha: 2,
  titiksha: 1.5,
  dama: 1.5,
  ekagrata: 1.5,
  seva_bhakti: 1.5,

  // Negative
  tamas: 2.5,
  rajas: 1,
  lobha: 2,
  alasya: 1,
  abhinivesha: 1.5,
  chanchalata: 1.5,
  himsa: 3,
  bahirmukha: 1.5,
  steya: 2,
};

export const POSITIVE_ATTRIBUTES: (keyof YogicAttributes)[] = [
  "sattva", "vairagya", "viveka", "pranayama", "santosha",
  "titiksha", "dama", "ekagrata", "seva_bhakti"
];

export const NEGATIVE_ATTRIBUTES: (keyof YogicAttributes)[] = [
  "tamas", "rajas", "lobha", "alasya", "abhinivesha",
  "chanchalata", "himsa", "bahirmukha", "steya"
];