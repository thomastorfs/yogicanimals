import { Animal, ATTRIBUTE_WEIGHTS } from './types';

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
    
    // Map attributes from raw data order to new semantic keys
    // Old indices mapping to new concepts:
    // 0: sattva -> sattva
    // 1: vairagya -> vairagya
    // 2: viveka -> viveka
    // 3: ekagrata -> ekagrata
    // 4: santosha -> santosha
    // 5: frustration_tolerance -> titiksha (Endurance)
    // 6: impulse_control -> dama (Restraint)
    // 7: ego_confrontation -> pranayama (Breath/Life Force control - loosely mapped for data preservation)
    // 8: sanga -> seva_bhakti (Symbiosis/Service)
    
    // 9: rajas -> rajas
    // 10: tamas -> tamas
    // 11: addiction_potential -> lobha (Greed/Hoarding)
    // 12: time_consumption -> alasya (Lethargy)
    // 13: dissociation -> abhinivesha (Fear/Anxiety)
    // 14: samskara_formation -> chanchalata (Monkey Mind)
    // 15: ahimsa_violation -> himsa (Violence)
    // 16: pratyahara_disruption -> bahirmukha (Hyper-vigilance)
    // 17: sankalpa_undermining -> steya (Theft/Parasitism)

    const sattva = attrs[0];
    const vairagya = attrs[1];
    const viveka = attrs[2];
    const ekagrata = attrs[3];
    const santosha = attrs[4];
    const titiksha = attrs[5];
    const dama = attrs[6];
    const pranayama = attrs[7]; 
    const seva_bhakti = attrs[8];

    const rajas = attrs[9];
    const tamas = attrs[10];
    const lobha = attrs[11];
    const alasya = attrs[12];
    const abhinivesha = attrs[13];
    const chanchalata = attrs[14];
    const himsa = attrs[15];
    const bahirmukha = attrs[16];
    const steya = attrs[17];

    // Positive Criteria Calculation (The Yogi Nature)
    const positive_score = 
      (sattva * ATTRIBUTE_WEIGHTS.sattva) +
      (vairagya * ATTRIBUTE_WEIGHTS.vairagya) +
      (viveka * ATTRIBUTE_WEIGHTS.viveka) +
      (santosha * ATTRIBUTE_WEIGHTS.santosha) +
      (titiksha * ATTRIBUTE_WEIGHTS.titiksha) +
      (dama * ATTRIBUTE_WEIGHTS.dama) +
      (ekagrata * ATTRIBUTE_WEIGHTS.ekagrata) +
      (seva_bhakti * ATTRIBUTE_WEIGHTS.seva_bhakti) +
      (pranayama * ATTRIBUTE_WEIGHTS.pranayama);
    
    // Negative Criteria Calculation (The Animal Nature)
    const negative_score = 
      (himsa * ATTRIBUTE_WEIGHTS.himsa) +
      (tamas * ATTRIBUTE_WEIGHTS.tamas) +
      (steya * ATTRIBUTE_WEIGHTS.steya) +
      (lobha * ATTRIBUTE_WEIGHTS.lobha) +
      (bahirmukha * ATTRIBUTE_WEIGHTS.bahirmukha) +
      (abhinivesha * ATTRIBUTE_WEIGHTS.abhinivesha) +
      (chanchalata * ATTRIBUTE_WEIGHTS.chanchalata) +
      (alasya * ATTRIBUTE_WEIGHTS.alasya) +
      (rajas * ATTRIBUTE_WEIGHTS.rajas);

    const total_score = positive_score - negative_score;

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
      sattva, vairagya, viveka, pranayama, santosha, titiksha, dama, ekagrata, seva_bhakti,
      tamas, rajas, lobha, alasya, abhinivesha, chanchalata, himsa, bahirmukha, steya,
      total_score,
      positive_score,
      negative_score,
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