import { Animal, ATTRIBUTE_WEIGHTS, YogicAttributes } from './types';

// Data Format: [Name, Type, Population, Trend, Habitat, EcoRelations, Explanation, WikiLink, [Attributes...]]
export type RawAnimalRow = [string, string, string, string, string, string, string, string, number[]];

export const parsePopulation = (popStr: string): number => {
  // Remove non-numeric characters except for parsing if needed
  const cleanStr = popStr.replace(/[^0-9]/g, '');
  const num = parseInt(cleanStr, 10);
  return isNaN(num) ? 0 : num;
};

export const formatPopulation = (popStr: string): string => {
  const num = parsePopulation(popStr);
  if (num === 0) return popStr; // Return original if not a number
  
  if (num >= 1000000000000000) return (num / 1000000000000000).toFixed(1) + 'Q';
  if (num >= 1000000000000) return (num / 1000000000000).toFixed(1) + 'T';
  if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  
  return num.toLocaleString();
};

export const calculateYogicScore = (attributes: YogicAttributes) => {
  // Positive Criteria Calculation (The Yogi Nature)
  const positive_score = 
    (attributes.sattva * ATTRIBUTE_WEIGHTS.sattva) +
    (attributes.vairagya * ATTRIBUTE_WEIGHTS.vairagya) +
    (attributes.viveka * ATTRIBUTE_WEIGHTS.viveka) +
    (attributes.santosha * ATTRIBUTE_WEIGHTS.santosha) +
    (attributes.titiksha * ATTRIBUTE_WEIGHTS.titiksha) +
    (attributes.dama * ATTRIBUTE_WEIGHTS.dama) +
    (attributes.ekagrata * ATTRIBUTE_WEIGHTS.ekagrata) +
    (attributes.seva_bhakti * ATTRIBUTE_WEIGHTS.seva_bhakti) +
    (attributes.pranayama * ATTRIBUTE_WEIGHTS.pranayama);
  
  // Negative Criteria Calculation (The Animal Nature)
  const negative_score = 
    (attributes.himsa * ATTRIBUTE_WEIGHTS.himsa) +
    (attributes.tamas * ATTRIBUTE_WEIGHTS.tamas) +
    (attributes.steya * ATTRIBUTE_WEIGHTS.steya) +
    (attributes.lobha * ATTRIBUTE_WEIGHTS.lobha) +
    (attributes.bahirmukha * ATTRIBUTE_WEIGHTS.bahirmukha) +
    (attributes.abhinivesha * ATTRIBUTE_WEIGHTS.abhinivesha) +
    (attributes.chanchalata * ATTRIBUTE_WEIGHTS.chanchalata) +
    (attributes.alasya * ATTRIBUTE_WEIGHTS.alasya) +
    (attributes.rajas * ATTRIBUTE_WEIGHTS.rajas);

  const total_score = positive_score - negative_score;

  return { total_score, positive_score, negative_score };
};

export const loadAnimals = (data: RawAnimalRow[]): Animal[] => {
  const animals = data.map((row) => {
    const [
      name, 
      type, 
      current_population, 
      population_trend, 
      habitat, 
      ecological_relations, 
      score_explanation, 
      wikipedia_link, 
      attrs
    ] = row;
    
    // Map attributes from raw data order
    const attributes: YogicAttributes = {
      sattva: attrs[0],
      vairagya: attrs[1],
      viveka: attrs[2],
      ekagrata: attrs[3],
      santosha: attrs[4],
      titiksha: attrs[5],
      dama: attrs[6],
      pranayama: attrs[7], 
      seva_bhakti: attrs[8],

      rajas: attrs[9],
      tamas: attrs[10],
      lobha: attrs[11],
      alasya: attrs[12],
      abhinivesha: attrs[13],
      chanchalata: attrs[14],
      himsa: attrs[15],
      bahirmukha: attrs[16],
      steya: attrs[17],
    };

    const scores = calculateYogicScore(attributes);

    return {
      id: name.toLowerCase().replace(/ /g, '-').replace(/[()]/g, ''),
      name,
      type,
      current_population,
      population_trend,
      habitat,
      ecological_relations,
      score_explanation,
      wikipedia_link,
      ...attributes,
      ...scores,
      rank: 0 // Placeholder
    };
  });

  // Calculate ranks
  const sortedAnimals = [...animals].sort((a, b) => b.total_score - a.total_score);
  const rankMap = new Map<string, number>();
  sortedAnimals.forEach((animal, index) => {
    rankMap.set(animal.id, index + 1);
  });

  // Assign ranks
  return animals.map(animal => ({
    ...animal,
    rank: rankMap.get(animal.id) || 0
  }));
};