import { Animal } from './types';

export const getAnimalEmoji = (animal: Animal): string => {
  const n = animal.name.toLowerCase();
  const t = animal.type;

  // --- 1. Specific High Priority Overrides ---
  
  // Humans
  if (n.includes('human')) return '🧘';
  
  // Naming Conflicts & compound words
  if (n.includes('dragonfly') || n.includes('damselfly')) return '🪰'; // Visual approx (Fly)
  if (n.includes('butterfly')) return '🦋';
  if (n.includes('firefly')) return '🏮';
  if (n.includes('seahorse')) return '🐠'; // Visual approx (no dragon)
  if (n.includes('sea cucumber')) return '🥒'; // Visual approx
  if (n.includes('sea anemone') || n.includes('anemone')) return '🏵️'; // Visual approx
  
  // Specific Insects (Placed here to avoid falling into generic logic later)
  if (n.includes('mosquito')) return '🦟';
  if (n.includes('fly') && !n.includes('dragon') && !n.includes('butter') && !n.includes('fire')) return '🪰';

  if (n.includes('silverfish')) return '🪲'; 
  if (n.includes('crayfish') || n.includes('crawfish')) return '🦞'; 
  if (n.includes('jellyfish')) return '🦑'; // Visual approx (Squid) for compatibility
  if (n.includes('starfish')) return '⭐'; 
  
  if (n.includes('guinea pig')) return '🐹';
  if (n.includes('anteater')) return '🦡'; // Visual approx

  // --- 2. Mammals ---
  
  // Bears
  if (n.includes('polar bear')) return '🐻‍❄️';
  if (n.includes('panda')) return '🐼';
  if (n.includes('bear')) return '🐻';
  if (n.includes('sloth')) return '🦥';
  if (n.includes('koala')) return '🐨';
  if (n.includes('wombat')) return '🐻'; // Approximation
  
  // Cats
  if (n.includes('lion') && !n.includes('sea')) return '🦁';
  if (n.includes('tiger')) return '🐅';
  if (n.includes('leopard') || n.includes('jaguar') || n.includes('cheetah') || n.includes('cougar') || n.includes('panther')) return '🐆';
  if (n.includes('lynx') || n.includes('bobcat')) return '🐈';
  if (n.includes('cat') && !n.includes('catfish') && !n.includes('meerkat')) return '🐈';
  
  // Canines
  if (n.includes('wolf') || n.includes('wolverine')) return '🐺';
  if (n.includes('fox')) return '🦊';
  if (n.includes('dog')) return '🐕';
  if (n.includes('coyote') || n.includes('jackal') || n.includes('hyena')) return '🐺'; // Dog-like
  
  // Small Mammals
  if (n.includes('raccoon')) return '🦝';
  if (n.includes('badger')) return '🦡';
  if (n.includes('skunk')) return '🦨';
  if (n.includes('otter')) return '🦦';
  if (n.includes('beaver')) return '🦫';
  if (n.includes('rabbit') || n.includes('hare') || n.includes('bunny')) return '🐇';
  if (n.includes('squirrel') || n.includes('chipmunk')) return '🐿️';
  if (n.includes('rat') && !n.includes('rattle')) return '🐀';
  if (n.includes('mouse') || n.includes('mice') || n.includes('dormouse') || n.includes('vole') || n.includes('shrew')) return '🐁';
  if (n.includes('hamster')) return '🐹';
  if (n.includes('mole')) return '🐀';
  if (n.includes('hedgehog') || n.includes('porcupine') || n.includes('echidna')) return '🦔';
  if (n.includes('platypus')) return '🦆'; // Duck-like bill
  if (n.includes('armadillo')) return '🐀'; // Visual approx
  
  // Primates
  if (n.includes('gorilla')) return '🦍';
  if (n.includes('orangutan')) return '🦧';
  if (n.includes('chimpanzee') || n.includes('bonobo') || n.includes('gibbon') || n.includes('baboon') || n.includes('macaque') || n.includes('monkey') || n.includes('lemur') || n.includes('capuchin')) return '🐒';

  // Ungulates
  if (n.includes('zebra')) return '🦓';
  if (n.includes('horse') || n.includes('stallion') || n.includes('pony') || n.includes('mustang')) return '🐎';
  if (n.includes('donkey') || n.includes('mule')) return '🐴'; // Horse approx for compatibility
  if (n.includes('camel') || n.includes('dromedary')) return '🐪';
  if (n.includes('llama') || n.includes('alpaca')) return '🦙';
  if (n.includes('giraffe')) return '🦒';
  if (n.includes('elephant')) return '🐘';
  if (n.includes('rhino')) return '🦏';
  if (n.includes('hippo')) return '🦛';
  if (n.includes('boar') || n.includes('warthog')) return '🐗';
  if (n.includes('pig') || n.includes('swine') || n.includes('hog')) return '🐖';
  if (n.includes('cow') || n.includes('cattle') || n.includes('bull') || n.includes('ox') || n.includes('bison') || n.includes('buffalo')) return '🐄';
  if (n.includes('sheep') || n.includes('ram') || n.includes('lamb')) return '🐑';
  if (n.includes('goat') || n.includes('ibex')) return '🐐';
  if (n.includes('deer') || n.includes('elk') || n.includes('moose') || n.includes('stag') || n.includes('antelope') || n.includes('gazelle') || n.includes('roe')) return '🦌';

  // Marsupials
  if (n.includes('kangaroo') || n.includes('wallaby')) return '🦘';
  
  // Bats
  if (n.includes('bat') && !n.includes('wombat')) return '🦇';

  // Marine Mammals
  if (n.includes('whale') || n.includes('orca') || n.includes('beluga')) return '🐋';
  if (n.includes('dolphin') || n.includes('porpoise')) return '🐬';
  if (n.includes('sea lion') || n.includes('seal') || n.includes('walrus') || n.includes('manatee') || n.includes('dugong')) return '🦭';

  // --- 3. Birds ---
  if (n.includes('chicken') || n.includes('hen') || n.includes('rooster')) return '🐔';
  if (n.includes('turkey')) return '🦃';
  
  if (n.includes('goose') || n.includes('geese')) return '🦆'; // Duck approx for compatibility
  
  if (n.includes('duck') || n.includes('mallard') || n.includes('wigeon')) return '🦆';
  if (n.includes('swan')) return '🦢';
  if (n.includes('owl')) return '🦉';
  if (n.includes('penguin')) return '🐧';
  if (n.includes('flamingo')) return '🦩';
  if (n.includes('peacock')) return '🦚';
  if (n.includes('parrot') || n.includes('macaw') || n.includes('cockatoo') || n.includes('parakeet')) return '🦜';
  if (n.includes('albatross')) return '🦢'; // Visual approx (Swan)
  if (n.includes('eagle') || n.includes('hawk') || n.includes('falcon') || n.includes('vulture') || n.includes('condor') || n.includes('kite') || n.includes('kestrel') || n.includes('buzzard')) return '🦅';
  if (n.includes('dove') || n.includes('pigeon')) return '🕊️';
  if (n.includes('crow') || n.includes('raven') || n.includes('blackbird') || n.includes('magpie') || n.includes('rook') || n.includes('jackdaw')) return '🐦‍⬛'; 
  
  // Generic Bird
  if (t === 'Bird') return '🐦';

  // --- 4. Reptiles & Amphibians ---
  if (n.includes('crocodile') || n.includes('alligator') || n.includes('caiman') || n.includes('gharial')) return '🐊';
  if (n.includes('turtle') || n.includes('tortoise') || n.includes('terrapin')) return '🐢';
  if (n.includes('snake') || n.includes('viper') || n.includes('cobra') || n.includes('python') || n.includes('boa') || n.includes('anaconda') || n.includes('serpent') || n.includes('adder')) return '🐍';
  if (n.includes('lizard') || n.includes('gecko') || n.includes('iguana') || n.includes('chameleon') || n.includes('monitor') || n.includes('dragon') || n.includes('skink')) return '🦎';
  if (n.includes('frog') || n.includes('toad')) return '🐸';
  if (n.includes('salamander') || n.includes('newt') || n.includes('axolotl')) return '🦎'; 

  // --- 5. Aquatic (Fish, Crustaceans, Mollusks) ---
  if (n.includes('shark')) return '🦈';
  if (n.includes('blowfish') || n.includes('puffer')) return '🐡';
  if (n.includes('octopus')) return '🐙';
  if (n.includes('squid') || n.includes('cuttlefish') || n.includes('nautilus')) return '🦑';
  if (n.includes('shrimp') || n.includes('prawn') || n.includes('krill')) return '🦐';
  if (n.includes('lobster') || n.includes('crab') || n.includes('hermit')) return '🦀';
  if (n.includes('snail') || n.includes('slug') || n.includes('whelk')) return '🐌';
  if (n.includes('oyster') || n.includes('mussel') || n.includes('clam') || n.includes('scallop')) return '🦪';
  if (n.includes('coral')) return '🪸';
  if (n.includes('ray')) return '🦈'; 
  
  if (t === 'Fish') return '🐟';
  
  // --- 6. Insects & Arachnids ---
  // Specific exclusions to prevent "Ant" matching "Manta"
  
  if (n.includes('bee') && !n.includes('beetle')) return '🐝';
  if (n.includes('wasp') || n.includes('hornet')) return '🐝'; 
  if (n.includes('ladybug')) return '🐞';
  if (n.includes('beetle') || n.includes('weevil') || n.includes('scarab')) return '🪲';
  
  if (n.includes('ant') && !n.includes('manta')) return '🐜';
  if (n.includes('termite')) return '🐜';
  
  if (n.includes('spider') || n.includes('tarantula') || n.includes('arachnid') || n.includes('widow')) return '🕷️';
  if (n.includes('scorpion')) return '🦂';
  
  if (n.includes('cricket') || n.includes('grasshopper') || n.includes('locust') || n.includes('mantis') || n.includes('cicada')) return '🦗';
  if (n.includes('cockroach')) return '🪳';
  
  // Split Caterpillars/Centipedes from Worms
  if (n.includes('centipede') || n.includes('millipede') || n.includes('caterpillar') || n.includes('larva')) return '🐛';
  if (n.includes('worm') || n.includes('maggot') || n.includes('leech')) return '🪱';
  
  if (n.includes('moth')) return '🦋';
  
  if (n.includes('microbe') || n.includes('bacteri') || n.includes('virus') || n.includes('amoeba')) return '🦠';

  // --- 7. Fallbacks ---
  if (t === 'Insect') return '🪲';
  if (t === 'Arachnid') return '🕷️';
  if (t === 'Crustacean') return '🦐';
  if (t === 'Mollusk') return '🐌';
  if (t === 'Reptile') return '🦎';
  if (t === 'Amphibian') return '🐸';
  if (t === 'Mammal') return '🐾';
  if (t === 'Echinoderm') return '⭐';
  if (t === 'Cnidarian') return '🦑'; 
  
  return '🐾';
};