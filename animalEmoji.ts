import { Animal } from './types';

export const getAnimalEmoji = (animal: Animal): string => {
  const n = animal.name.toLowerCase();
  const t = animal.type;

  // --- 1. Specific High Priority Overrides (Sorted: Longest to Shortest) ---
  
  // Humans
  if (n.includes('human')) return '🧘';
  
  // Naming Conflicts & compound words (Longest first to prevent partial matches)
  if (n.includes('sea anemone') || n.includes('anemone')) return '🏵️'; // Visual approx
  if (n.includes('sea cucumber')) return '🥒'; // Visual approx
  if (n.includes('dragonfly') || n.includes('damselfly')) return '🪰'; // Visual approx (Fly)
  if (n.includes('butterfly')) return '🦋';
  if (n.includes('firefly')) return '🏮';
  if (n.includes('seahorse')) return '🐠'; // Visual approx (no dragon)
  
  // Specific Insects (Longest first to avoid partial matches)
  if (n.includes('silverfish')) return '🪲';
  if (n.includes('jellyfish')) return '🦑'; // Visual approx (Squid) for compatibility
  if (n.includes('crayfish') || n.includes('crawfish')) return '🦞';
  if (n.includes('starfish')) return '⭐';
  if (n.includes('mosquito')) return '🦟';
  if (n.includes('guinea pig')) return '🐹';
  if (n.includes('anteater')) return '🦡'; // Visual approx
  if (n.includes('fly') && !n.includes('dragon') && !n.includes('butter') && !n.includes('fire') && !n.includes('firefly')) return '🪰';

  // --- 2. Mammals (Longest to Shortest) ---
  
  // Bears
  if (n.includes('polar bear')) return '🐻‍❄️';
  if (n.includes('wombat')) return '🐻'; // Approximation
  if (n.includes('panda')) return '🐼';
  if (n.includes('sloth')) return '🦥';
  if (n.includes('koala')) return '🐨';
  if (n.includes('bear')) return '🐻';
  
  // Cats (Longest first to avoid 'cat' matching 'bobcat' prematurely)
  if (n.includes('cheetah') || n.includes('leopard') || n.includes('jaguar') || n.includes('cougar') || n.includes('panther')) return '🐆';
  if (n.includes('bobcat')) return '🐈';
  if (n.includes('meerkat')) return '🐈'; // Note: exclude check is now unnecessary due to ordering
  if (n.includes('catfish')) return '🐈'; // Note: exclude check is now unnecessary due to ordering
  if (n.includes('lion') && !n.includes('sea') && !n.includes('stallion')) return '🦁';
  if (n.includes('tiger')) return '🐅';
  if (n.includes('lynx')) return '🐈';
  if (n.includes('cat') && !n.includes('locate') && !n.includes('educate') && !n.includes('vacant') && !n.includes('decathlon')) return '🐈';
  
  // Canines (Longest first)
  if (n.includes('wolverine')) return '🐺';
  if (n.includes('coyote')) return '🐺'; // Dog-like
  if (n.includes('jackal')) return '🐺'; // Dog-like
  if (n.includes('hyena')) return '🐺'; // Dog-like
  if (n.includes('wolf')) return '🐺';
  if (n.includes('fox')) return '🦊';
  if (n.includes('dog')) return '🐕';
  
  // Small Mammals (Longest first)
  if (n.includes('armadillo')) return '🐀'; // Visual approx
  if (n.includes('porcupine')) return '🦔';
  if (n.includes('hedgehog')) return '🦔';
  if (n.includes('echidna')) return '🦔';
  if (n.includes('raccoon')) return '🦝';
  if (n.includes('platypus')) return '🦆'; // Duck-like bill
  if (n.includes('dormouse')) return '🐁';
  if (n.includes('badger')) return '🦡';
  if (n.includes('skunk')) return '🦨';
  if (n.includes('otter')) return '🦦';
  if (n.includes('beaver')) return '🦫';
  if (n.includes('rabbit')) return '🐇';
  if (n.includes('hamster')) return '🐹';
  if (n.includes('chipmunk')) return '🐿️';
  if (n.includes('squirrel')) return '🐿️';
  if (n.includes('hare')) return '🐇';
  if (n.includes('bunny')) return '🐇';
  if (n.includes('shrew')) return '🐁';
  if (n.includes('mouse') || n.includes('mice')) return '🐁';
  if (n.includes('vole')) return '🐁';
  if (n.includes('rat') && !n.includes('rattle') && !n.includes('pirate') && !n.includes('gyrate') && !n.includes('strata') && !n.includes('gratis')) return '🐀';
  if (n.includes('mole')) return '🐀';
  
  // Primates (Longest first)
  if (n.includes('chimpanzee')) return '🐒';
  if (n.includes('orangutan')) return '🦧';
  if (n.includes('capuchin')) return '🐒';
  if (n.includes('macaque')) return '🐒';
  if (n.includes('gibbon')) return '🐒';
  if (n.includes('baboon')) return '🐒';
  if (n.includes('bonobo')) return '🐒';
  if (n.includes('gorilla')) return '🦍';
  if (n.includes('monkey')) return '🐒';
  if (n.includes('lemur')) return '🐒';

  // Ungulates (Longest first to prevent 'deer' matching 'reindeer' issues)
  if (n.includes('dromedary')) return '🐪';
  if (n.includes('antelope')) return '🦌';
  if (n.includes('gazelle')) return '🦌';
  if (n.includes('stallion')) return '🐎';
  if (n.includes('mustang')) return '🐎';
  if (n.includes('warthog')) return '🐗';
  if (n.includes('buffalo')) return '🐄';
  if (n.includes('cattle')) return '🐄';
  if (n.includes('zebra')) return '🦓';
  if (n.includes('horse')) return '🐎';
  if (n.includes('camel')) return '🐪';
  if (n.includes('llama')) return '🦙';
  if (n.includes('alpaca')) return '🦙';
  if (n.includes('giraffe')) return '🦒';
  if (n.includes('elephant')) return '🐘';
  if (n.includes('rhino')) return '🦏';
  if (n.includes('hippo')) return '🦛';
  if (n.includes('boar')) return '🐗';
  if (n.includes('swine')) return '🐖';
  if (n.includes('bison')) return '🐄';
  if (n.includes('donkey')) return '🐴'; // Horse approx for compatibility
  if (n.includes('mule')) return '🐴'; // Horse approx for compatibility
  if (n.includes('pig') && !n.includes('pigeon') && !n.includes('spigot')) return '🐖';
  if (n.includes('hog')) return '🐖';
  if (n.includes('cow')) return '🐄';
  if (n.includes('bull')) return '🐄';
  if (n.includes('sheep')) return '🐑';
  if (n.includes('pony')) return '🐎';
  if (n.includes('moose')) return '🦌';
  if (n.includes('lamb')) return '🐑';
  if (n.includes('goat')) return '🐐';
  if (n.includes('ibex')) return '🐐';
  if (n.includes('stag')) return '🦌';
  if (n.includes('deer')) return '🦌';
  if (n.includes('elk')) return '🦌';
  if (n.includes('ram')) return '🐑';
  if (n.includes('roe')) return '🦌';
  if (n.includes('ox')) return '🐄';

  // Marsupials
  if (n.includes('kangaroo')) return '🦘';
  if (n.includes('wallaby')) return '🦘';
  
  // Bats (Must come after 'wombat' check and exclude compound animal names)
  if (n.includes('bat') && !n.includes('wombat') && !n.includes('albatross') && !n.includes('combat')) return '🦇';

  // Marine Mammals (Longest first)
  if (n.includes('beluga')) return '🐋';
  if (n.includes('dolphin')) return '🐬';
  if (n.includes('porpoise')) return '🐬';
  if (n.includes('sea lion')) return '🦭';
  if (n.includes('walrus')) return '🦭';
  if (n.includes('manatee')) return '🦭';
  if (n.includes('dugong')) return '🦭';
  if (n.includes('whale')) return '🐋';
  if (n.includes('orca')) return '🐋';
  if (n.includes('seal')) return '🦭';

  // --- 3. Birds (Longest to Shortest) ---
  if (n.includes('rooster')) return '🐔';
  if (n.includes('chicken')) return '🐔';
  if (n.includes('flamingo')) return '🦩';
  if (n.includes('peacock')) return '🦚';
  if (n.includes('penguin')) return '🐧';
  if (n.includes('parakeet')) return '🦜';
  if (n.includes('cockatoo')) return '🦜';
  if (n.includes('albatross')) return '🦢'; // Visual approx (Swan) - Must come before generic 'albatross' logic
  if (n.includes('mallard')) return '🦆';
  if (n.includes('wigeon')) return '🦆';
  if (n.includes('jackdaw')) return '🐦‍';
  if (n.includes('blackbird')) return '🐦‍';
  if (n.includes('buzzard')) return '🦅';
  if (n.includes('kestrel')) return '🦅';
  if (n.includes('vulture')) return '🦅';
  if (n.includes('condor')) return '🦅';
  if (n.includes('turkey')) return '🦃';
  if (n.includes('parrot')) return '🦜';
  if (n.includes('macaw')) return '🦜';
  if (n.includes('goose') || n.includes('geese')) return '🦆'; // Duck approx for compatibility
  if (n.includes('falcon')) return '🦅';
  if (n.includes('pigeon')) return '🕊️';
  if (n.includes('magpie')) return '🐦‍';
  if (n.includes('raven')) return '🐦‍';
  if (n.includes('swallow')) return '🦢';
  if (n.includes('eagle') && !n.includes('sea')) return '🦅';
  if (n.includes('hawk')) return '🦅';
  if (n.includes('kite')) return '🦅';
  if (n.includes('swan')) return '🦢';
  if (n.includes('duck')) return '🦆';
  if (n.includes('dove')) return '🕊️';
  if (n.includes('crow')) return '🐦‍';
  if (n.includes('rook')) return '🐦‍';
  if (n.includes('hen')) return '🐔';
  if (n.includes('owl') && !n.includes('bowl') && !n.includes('fowl') && !n.includes('jowl') && !n.includes('cowl') && !n.includes('growl') && !n.includes('prowl') && !n.includes('scowl')) return '🦉';
  
  // Generic Bird
  if (t === 'Bird') return '🐦';

  // --- 4. Reptiles & Amphibians (Longest to Shortest) ---
  if (n.includes('salamander')) return '🦎';
  if (n.includes('crocodile')) return '🐊';
  if (n.includes('alligator')) return '🐊';
  if (n.includes('chameleon')) return '🦎';
  if (n.includes('anaconda')) return '🐍';
  if (n.includes('terrapin')) return '🐢';
  if (n.includes('tortoise')) return '🐢';
  if (n.includes('axolotl')) return '🦎';
  if (n.includes('caiman')) return '🐊';
  if (n.includes('gharial')) return '🐊';
  if (n.includes('serpent')) return '🐍';
  if (n.includes('monitor')) return '🦎';
  if (n.includes('python')) return '🐍';
  if (n.includes('lizard')) return '🦎';
  if (n.includes('gecko')) return '🦎';
  if (n.includes('iguana')) return '🦎';
  if (n.includes('dragon')) return '🦎';
  if (n.includes('skink')) return '🦎';
  if (n.includes('turtle')) return '🐢';
  if (n.includes('cobra')) return '🐍';
  if (n.includes('viper')) return '🐍';
  if (n.includes('snake')) return '🐍';
  if (n.includes('newt')) return '🦎';
  if (n.includes('frog')) return '🐸';
  if (n.includes('toad')) return '🐸';
  if (n.includes('adder')) return '🐍';
  if (n.includes('boa')) return '🐍';

  // --- 5. Aquatic (Fish, Crustaceans, Mollusks) (Longest to Shortest) ---
  if (n.includes('cuttlefish')) return '🦑';
  if (n.includes('blowfish')) return '🐡';
  if (n.includes('octopus')) return '🐙';
  if (n.includes('nautilus')) return '🦑';
  if (n.includes('scallop')) return '🦪';
  if (n.includes('grasshopper')) return '🦗'; // Grouped here for shortest-word priority
  if (n.includes('shrimp')) return '🦐';
  if (n.includes('oyster')) return '🦪';
  if (n.includes('mussel')) return '🦪';
  if (n.includes('hermit')) return '🦀';
  if (n.includes('lobster')) return '🦀';
  if (n.includes('krill')) return '🦐';
  if (n.includes('squid')) return '🦑';
  if (n.includes('shark')) return '🦈';
  if (n.includes('prawn')) return '🦐';
  if (n.includes('coral')) return '🪸';
  if (n.includes('whelk')) return '🐌';
  if (n.includes('snail')) return '🐌';
  if (n.includes('clam')) return '🦪';
  if (n.includes('slug')) return '🐌';
  if (n.includes('crab')) return '🦀';
  if (n.includes('puffer')) return '🐡';
  if (n.includes('ray')) return '🦈'; 
  
  if (t === 'Fish') return '🐟';
  
  // --- 6. Insects & Arachnids (Longest to Shortest) ---
  if (n.includes('cockroach')) return '🪳';
  if (n.includes('tarantula')) return '🕷️';
  if (n.includes('centipede')) return '🐛';
  if (n.includes('millipede')) return '🐛';
  if (n.includes('caterpillar')) return '🐛';
  if (n.includes('scorpion')) return '🦂';
  if (n.includes('mantis')) return '🦗';
  if (n.includes('beetle')) return '🪲';
  if (n.includes('scarab')) return '🪲';
  if (n.includes('cricket')) return '🦗';
  if (n.includes('locust')) return '🦗';
  if (n.includes('cicada')) return '🦗';
  if (n.includes('ladybug')) return '🐞';
  if (n.includes('termite')) return '🐜';
  if (n.includes('weevil')) return '🪲';
  if (n.includes('arachnid')) return '🕷️';
  if (n.includes('hornet')) return '🐝';
  if (n.includes('widow')) return '🕷️';
  if (n.includes('maggot')) return '🪱';
  if (n.includes('leech')) return '🪱';
  if (n.includes('larva')) return '🐛';
  if (n.includes('spider')) return '🕷️';
  if (n.includes('wasp')) return '🐝';
  if (n.includes('moth')) return '🦋';
  if (n.includes('ant') && !n.includes('manta') && !n.includes('giant') && !n.includes('want') && !n.includes('grant') && !n.includes('chant') && !n.includes('plant') && !n.includes('slant')) return '🐜';
  if (n.includes('bee') && !n.includes('beetle') && !n.includes('beeswax')) return '🐝';
  if (n.includes('worm')) return '🪱';
  
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