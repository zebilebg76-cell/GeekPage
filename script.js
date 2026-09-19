const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const searchInput = document.getElementById('searchInput');
const exploreBtn = document.getElementById('exploreBtn');
const trendBtn = document.getElementById('trendBtn');
const newsBtn = document.getElementById('newsBtn');
const reportBtn = document.getElementById('reportBtn');
const gameSearchInput = document.getElementById('gameSearchInput');
const searchGameButton = document.getElementById('searchGameButton');
const gameSearchResults = document.getElementById('gameSearchResults');
const reportForm = document.getElementById('reportForm');
const reportStatus = document.getElementById('reportStatus');

let activeFilter = 'all';

const gameDatabase = [
  { name: "Fortnite", genre: "Battle Royale", platform: "PC, PlayStation, Xbox, Switch, Mobile", release: "2017", rating: "8.8/10", players: "High", revenue: "$6.5B+", summary: "Fortnite remains a leader in live-service engagement, creator content, and event-driven player retention.", insight: "Strong community events and creator ecosystem continue to produce sustained engagement across age groups." },
  { name: "Call of Duty: Warzone", genre: "Battle Royale", platform: "PC, PlayStation, Xbox", release: "2020", rating: "8.6/10", players: "Very High", revenue: "$2.4B+", summary: "Warzone is a major battle royale experience built around fast matches, loadouts, and frequent seasonal updates.", insight: "The blend of live service updates and strong competitive pacing keeps queues consistently healthy." },
  { name: "Grand Theft Auto V", aliases: ["GTA V", "GTA 5", "Grand Theft Auto 5", "gta v", "gta 5"], genre: "Open-world Action", platform: "PC, PlayStation, Xbox", release: "2013", rating: "9.5/10", players: "Very High", revenue: "$8.5B+", summary: "GTA V remains one of the biggest open-world action games ever, amplified by a highly active GTA Online ecosystem.", insight: "The online ecosystem and roleplay culture create exceptional long-tail engagement and monetization." },
  { name: "Elden Ring", genre: "Action RPG", platform: "PC, PlayStation, Xbox", release: "2022", rating: "9.5/10", players: "Very High", revenue: "$1.2B+", summary: "A critically acclaimed action RPG known for exploration, combat mastery, and highly replayable boss encounters.", insight: "Depth of world design and difficulty tuning drive long-form engagement and premium review momentum." },
  { name: "Minecraft", genre: "Bac à sable", platform: "PC, console, mobile, Switch", release: "2011", rating: "9.4/10", players: "Very High", revenue: "$2.5B+", summary: "Minecraft continue de dominer grâce à sa liberté créative, ses mods communautaires et une base de joueurs fidèle de tous les âges.", insight: "La liberté du mode bac à sable et le contenu créé par les joueurs assurent une fidélisation exceptionnelle et une large portée multiplateforme." },
  { name: "Apex Legends", genre: "Hero Shooter", platform: "PC, PlayStation, Xbox", release: "2019", rating: "8.9/10", players: "High", revenue: "$1.8B+", summary: "Apex stands out for tactical gunplay, character abilities, and a strong competitive community.", insight: "Low onboarding friction and a healthy meta cycle help sustain competitive engagement." },
  { name: "The Legend of Zelda: Breath of the Wild", genre: "Adventure", platform: "Switch, Wii U", release: "2017", rating: "9.8/10", players: "High", revenue: "$1.1B+", summary: "A landmark open-world adventure celebrated for exploration, environmental storytelling, and system depth.", insight: "World interactivity and discovery-driven play create a highly memorable player experience." },
  { name: "Cyberpunk 2077", genre: "Open-world RPG", platform: "PC, PlayStation, Xbox", release: "2020", rating: "7.4/10", players: "Medium", revenue: "$600M+", summary: "A dense sci-fi RPG with rich worldbuilding, customization, and a complex narrative structure.", insight: "Players respond strongly to immersion and character-building, but optimization and polish remain critical." },
  { name: "Helldivers 2", genre: "Co-op Shooter", platform: "PC, PlayStation", release: "2024", rating: "8.7/10", players: "High", revenue: "$500M+", summary: "A chaotic cooperative shooter framed around teamwork, mission coordination, and emergent comedy.", insight: "Squad-based enjoyment and live mission updates are driving consistent social retention." },
  { name: "Baldur's Gate 3", genre: "CRPG", platform: "PC, PlayStation, Xbox", release: "2023", rating: "9.8/10", players: "High", revenue: "$1.0B+", summary: "A narrative-rich role-playing game focused on branching choices, party management, and player-driven outcomes.", insight: "Story depth and replayability make it one of the strongest examples of premium RPG retention." },
  { name: "Red Dead Redemption 2", genre: "Open-world Western", platform: "PC, PlayStation, Xbox", release: "2018", rating: "9.7/10", players: "High", revenue: "$1.5B+", summary: "A cinematic cowboy epic with highly detailed world simulation and long-form narrative immersion.", insight: "Atmosphere and world fidelity deeply influence premium game desirability and replayability." },
  { name: "The Witcher 3: Wild Hunt", genre: "Action RPG", platform: "PC, PlayStation, Xbox, Switch", release: "2015", rating: "9.6/10", players: "High", revenue: "$1.0B+", summary: "A richly detailed RPG built around exploration, monster hunting, and branching narrative choices.", insight: "Quest quality and world density create a strong benchmark for open-world role-playing design." },
  { name: "God of War", genre: "Action Adventure", platform: "PC, PlayStation", release: "2018", rating: "9.3/10", players: "High", revenue: "$1.2B+", summary: "A cinematic action-adventure blending fatherhood themes with intense combat and exploration.", insight: "Emotional storytelling combined with strong combat systems helps maximize player attachment." },
  { name: "Spider-Man: Miles Morales", genre: "Action Adventure", platform: "PC, PlayStation", release: "2020", rating: "8.9/10", players: "High", revenue: "$500M+", summary: "A fast, fluid action adventure that mixes traversal and narrative in a fan-favorite setting.", insight: "Traversal quality and character identity create compelling session-based engagement." },
  { name: "League of Legends", genre: "MOBA", platform: "PC", release: "2009", rating: "8.7/10", players: "Very High", revenue: "$3.0B+", summary: "A competitive strategy staple with regular content updates and a deep esports ecosystem.", insight: "Skill progression and live seasonal systems sustain a highly engaged competitive player base." },
  { name: "Counter-Strike 2", genre: "Tactical FPS", platform: "PC", release: "2023", rating: "8.8/10", players: "Very High", revenue: "$1.0B+", summary: "A precise competitive shooter with a strong tactical identity and thriving esports scene.", insight: "Competitive depth and mastery loops make it one of the strongest retention models in FPS." },
  { name: "Valorant", genre: "Tactical FPS", platform: "PC", release: "2020", rating: "8.6/10", players: "High", revenue: "$1.1B+", summary: "A character-based tactical shooter built around team coordination and precision gunplay.", insight: "Ability-driven strategy gives the game a strong mix of skill expression and social teamwork." },
  { name: "Overwatch 2", genre: "Hero Shooter", platform: "PC, PlayStation, Xbox, Switch", release: "2022", rating: "8.3/10", players: "High", revenue: "$1.3B+", summary: "A multiplayer hero shooter known for accessibility, teamplay, and frequent seasonal updates.", insight: "Accessible skill curves and social play drive consistent matchmaking engagement." },
  { name: "Rocket League", genre: "Sports Arcade", platform: "PC, PlayStation, Xbox, Switch", release: "2015", rating: "8.8/10", players: "High", revenue: "$500M+", summary: "A physics-driven sports game blending competitive play, customization, and chaos.", insight: "Easy-to-understand rules and skill mastery create a long-lived competitive loop." },
  { name: "Stardew Valley", genre: "Simulation RPG", platform: "PC, PlayStation, Xbox, Switch, Mobile", release: "2016", rating: "9.3/10", players: "High", revenue: "$300M+", summary: "A relaxing life sim that pairs farming, socializing, and progression with strong player ownership.", insight: "Low-pressure progression and community events keep players involved for years." },
  { name: "Animal Crossing: New Horizons", genre: "Life Sim", platform: "Switch", release: "2020", rating: "9.0/10", players: "High", revenue: "$1.5B+", summary: "A social life sim focused on customization, community building, and low-stakes everyday creativity.", insight: "Player empowerment and flexible schedules create highly durable engagement habits." },
  { name: "Genshin Impact", genre: "Action RPG", platform: "PC, PlayStation, Xbox, Mobile", release: "2020", rating: "8.9/10", players: "Very High", revenue: "$4.0B+", summary: "A free-to-play action RPG famous for open-world exploration, character collecting, and gacha progression.", insight: "A strong content cadence and collectible loop sustain long-term spending and retention." },
  { name: "Final Fantasy XIV", genre: "MMORPG", platform: "PC, PlayStation", release: "2013", rating: "9.1/10", players: "High", revenue: "$1.8B+", summary: "A premium MMORPG with deep social systems, raids, and an enduring live content pipeline.", insight: "High-value social structure and content depth build exceptional player lifetime value." },
  { name: "Destiny 2", genre: "FPS MMO", platform: "PC, PlayStation, Xbox", release: "2017", rating: "8.2/10", players: "High", revenue: "$1.2B+", summary: "A loot-driven FPS MMO built around raids, seasonal systems, and social co-op play.", insight: "Regular seasonal updates and social objective loops keep players invested." },
  { name: "Super Mario Odyssey", genre: "Platformer", platform: "Switch", release: "2017", rating: "9.6/10", players: "High", revenue: "$2.0B+", summary: "A colorful platform adventure grounded in exploration, movement mastery, and collectability.", insight: "Accessible fun and strong level design support broad appeal across demographics." },
  { name: "Mario Kart 8 Deluxe", genre: "Racing", platform: "Switch", release: "2017", rating: "9.2/10", players: "High", revenue: "$1.5B+", summary: "A family-friendly racing game with tight controls, heavy replayability, and local multiplayer strength.", insight: "Competitive accessibility and social play create excellent long-term repeat value." },
  { name: "Hogwarts Legacy", genre: "Action RPG", platform: "PC, PlayStation, Xbox", release: "2023", rating: "8.4/10", players: "High", revenue: "$1.0B+", summary: "A fantasy RPG built around exploration, spellcasting, and a highly recognizable world.", insight: "IP pull and open-world progression support strong launch and sustained engagement." },
  { name: "Skyrim", genre: "Open-world RPG", platform: "PC, PlayStation, Xbox, Switch", release: "2011", rating: "9.3/10", players: "Very High", revenue: "$1.0B+", summary: "A foundational open-world RPG known for freedom, modding, and immersive fantasy exploration.", insight: "Player agency and mod support keep this title highly active years after launch." },
  { name: "Fall Guys", genre: "Battle Royale Platformer", platform: "PC, PlayStation, Xbox, Switch", release: "2020", rating: "8.1/10", players: "High", revenue: "$500M+", summary: "A chaotic party battle platformer built around elimination rounds and social humor.", insight: "Accessible rules and bright presentation create broad, repeatable engagement." },
  { name: "PUBG: Battlegrounds", genre: "Battle Royale", platform: "PC, PlayStation, Xbox, Mobile", release: "2017", rating: "8.1/10", players: "High", revenue: "$3.0B+", summary: "A tactical survival shooter shaped around drop strategy, positioning, and long-form matches.", insight: "Competitive survival loops continue to support strong attention among tactical players." },
  { name: "Roblox", genre: "Sandbox Platform", platform: "PC, Mobile, Console", release: "2006", rating: "8.6/10", players: "Very High", revenue: "$2.5B+", summary: "A user-generated platform allowing players to build, play, and socialize in a massive ecosystem.", insight: "Creator-driven content is a powerful retention engine across generations of players." },
  { name: "Dead by Daylight", genre: "Survival Horror", platform: "PC, PlayStation, Xbox, Switch", release: "2016", rating: "8.1/10", players: "High", revenue: "$600M+", summary: "A tense asymmetrical survival game that thrives on social play and repeated match variety.", insight: "The mix of fear, unpredictability, and character diversity delivers strong replayability." },
  { name: "Terraria", genre: "Sandbox Adventure", platform: "PC, Console, Mobile", release: "2011", rating: "9.0/10", players: "High", revenue: "$400M+", summary: "An exploration-focused sandbox game built around mining, building, and crafting adventures.", insight: "Player creativity and progression loops anchor long-term engagement." },
  { name: "Dying Light 2", genre: "Open-world Survival", platform: "PC, PlayStation, Xbox", release: "2022", rating: "7.6/10", players: "Medium", revenue: "$300M+", summary: "A parkour-driven zombie survival game emphasizing traversal, risk, and faction choices.", insight: "Movement and day-night tension create memorable play sessions when paired with strong design." },
  { name: "Call of Duty: Modern Warfare II", genre: "FPS", platform: "PC, PlayStation, Xbox", release: "2022", rating: "8.1/10", players: "High", revenue: "$1.5B+", summary: "A blockbuster first-person shooter built around fast matches, tactical loadouts, and live seasonal content.", insight: "Campaign and live service mix creates both broad reach and strong retention patterns." },
  { name: "Halo Infinite", genre: "FPS", platform: "PC, Xbox", release: "2021", rating: "8.2/10", players: "High", revenue: "$500M+", summary: "A sci-fi shooter blending open-world traversal with large-scale multiplayer engagement.", insight: "A familiar franchise plus live service momentum maintains strong player activity." },
  { name: "Forza Horizon 5", genre: "Racing", platform: "PC, Xbox", release: "2021", rating: "9.3/10", players: "High", revenue: "$1.0B+", summary: "A festival-style racing game known for lively worlds, car variety, and visual spectacle.", insight: "Accessibility and social events drive a high volume of recurring play sessions." },
  { name: "Pokemon Scarlet", genre: "RPG", platform: "Switch", release: "2023", rating: "8.2/10", players: "High", revenue: "$900M+", summary: "A creature-collecting RPG that blends exploration, battles, and social competition.", insight: "Strong franchise familiarity and collectible loops create durable engagement." },
  { name: "Pokemon Violet", genre: "RPG", platform: "Switch", release: "2023", rating: "8.2/10", players: "High", revenue: "$900M+", summary: "A creature-collecting RPG that emphasizes exploration, progression, and world discovery.", insight: "The combination of exploration and collection makes it highly replayable across age groups." },
  { name: "Doom Eternal", genre: "FPS", platform: "PC, PlayStation, Xbox, Switch", release: "2020", rating: "8.8/10", players: "High", revenue: "$400M+", summary: "A fast and brutal FPS defined by movement speed, arena combat, and satisfying weapon feedback.", insight: "High-impact combat and mastery hooks support strong replayability for action players." },
  { name: "Persona 5 Royal", genre: "JRPG", platform: "PC, PlayStation, Switch", release: "2019", rating: "9.4/10", players: "High", revenue: "$450M+", summary: "A stylish role-playing title driven by social systems, dungeon crawling, and personal narrative arcs.", insight: "Strong character identity and time management systems create highly memorable play loops." },
  { name: "Resident Evil Village", genre: "Survival Horror", platform: "PC, PlayStation, Xbox, Switch", release: "2021", rating: "8.5/10", players: "High", revenue: "$600M+", summary: "A survival horror hit that blends cinematic pacing, combat, and intense environment design.", insight: "Strong action-horror pacing supports high player satisfaction in short and long sessions." },
  { name: "Control", genre: "Action Adventure", platform: "PC, PlayStation, Xbox", release: "2019", rating: "8.5/10", players: "Medium", revenue: "$200M+", summary: "A paranormal action-adventure known for stylish combat, surreal design, and worldbuilding.", insight: "Distinct world design and strong atmosphere elevate the game's premium appeal." },
  { name: "Sea of Thieves", genre: "Adventure Pirate", platform: "PC, PlayStation, Xbox", release: "2018", rating: "7.8/10", players: "High", revenue: "$300M+", summary: "A cooperative pirate adventure centered on exploration, treasure hunting, and emergent storytelling.", insight: "Player-created stories and social play create durable, unpredictable engagement." },
  { name: "Naraka: Bladepoint", genre: "Battle Royale", platform: "PC", release: "2021", rating: "8.2/10", players: "Medium", revenue: "$200M+", summary: "A melee-action battle royale blending mobility, parkour, and vertical combat.", insight: "Movement and verticality deliver strong differentiation in the competitive arena." },
  { name: "Far Cry 6", genre: "Open-world Shooter", platform: "PC, PlayStation, Xbox", release: "2021", rating: "7.8/10", players: "Medium", revenue: "$450M+", summary: "A politically themed shooter with open-world exploration, vehicles, and faction conflict.", insight: "Large-world action and strong setting identity produce broad audience interest." },
  { name: "Mass Effect Legendary Edition", genre: "Action RPG", platform: "PC, PlayStation, Xbox", release: "2021", rating: "9.1/10", players: "High", revenue: "$300M+", summary: "A remastered trilogy that captures a beloved sci-fi narrative and action-driven exploration.", insight: "Narrative depth and character connection sustain fan demand and replayability." },
  { name: "Diablo IV", genre: "Action RPG", platform: "PC, PlayStation, Xbox", release: "2023", rating: "8.5/10", players: "High", revenue: "$1.0B+", summary: "A dark action RPG with live seasonal content, loot progression, and social dungeon play.", insight: "Seasonal content and loot cadence remain the key levers for sustained engagement." },
  { name: "Minecraft Dungeons", genre: "Dungeon Crawler", platform: "PC, Console", release: "2020", rating: "7.9/10", players: "Medium", revenue: "$200M+", summary: "A dungeon-crawling action game built around loot progression and co-op play.", insight: "Accessible co-op structure creates recurring, lower-barrier engagement." },
  { name: "Satisfactory", genre: "Builder / Simulation", platform: "PC", release: "2024", rating: "9.1/10", players: "High", revenue: "$300M+", summary: "A first-person building and exploration game centered on automation and resource management.", insight: "Satisfaction from progression and expansion loops holds players in long-form sessions." },
  { name: "Lego Fortnite", genre: "Sandbox Adventure", platform: "PC, Console, Mobile", release: "2024", rating: "8.0/10", players: "High", revenue: "$300M+", summary: "A creative survival-building mode blending construction, exploration, and social play.", insight: "Accessible survival loops and creative freedom are strong drivers of repeat engagement." },
  { name: "Palworld", genre: "Survival / Creature Collector", platform: "PC, Xbox", release: "2024", rating: "8.2/10", players: "Very High", revenue: "$600M+", summary: "A survival and creature-collection game that mixes crafting, exploration, and monster collection loops.", insight: "Collectible progression and sandbox systems drive strong early adoption and retention." },
  { name: "The Last of Us Part II", genre: "Action Adventure", platform: "PC, PlayStation", release: "2020", rating: "9.0/10", players: "High", revenue: "$1.0B+", summary: "A narrative-driven action adventure that stands out for cinematic pacing, atmosphere, and emotional storytelling.", insight: "High production quality and strong narrative identity keep the title relevant for service and audience analysis." },
  { name: "Call of Duty: Black Ops 6", genre: "FPS", platform: "PC, PlayStation, Xbox", release: "2024", rating: "8.5/10", players: "Very High", revenue: "$1.3B+", summary: "A modern military shooter built around quick match flow, tactical loadouts, and strong year-round live content.", insight: "Call of Duty remains one of the strongest examples of franchise-based live-service engagement and premium retention." },
  { name: "Marvel's Spider-Man 2", genre: "Action Adventure", platform: "PC, PlayStation", release: "2023", rating: "9.1/10", players: "High", revenue: "$1.0B+", summary: "A fast, polished superhero action game with strong traversal, cinematic set pieces, and a highly recognizable brand.", insight: "Character identity and visual spectacle create exceptional launch momentum and long-tail player interest." },
  { name: "Street Fighter 6", genre: "Fighting", platform: "PC, PlayStation, Xbox", release: "2023", rating: "9.0/10", players: "High", revenue: "$500M+", summary: "A modern fighting game built around accessibility, layered mechanics, and a strong competitive scene.", insight: "The blend of beginner-friendly design and competitive depth keeps the title active across casual and ranked communities." },
  { name: "Tekken 8", genre: "Fighting", platform: "PC, PlayStation, Xbox", release: "2024", rating: "8.9/10", players: "High", revenue: "$600M+", summary: "A competitive fighting title with polished combat pacing, visual spectacle, and a strong player base across platform communities.", insight: "Mechanical depth and readability sustain strong engagement in both casual and tournament settings." },
  { name: "EA Sports FC 24", genre: "Sports", platform: "PC, PlayStation, Xbox", release: "2023", rating: "7.9/10", players: "High", revenue: "$2.0B+", summary: "A football simulation that continues to rely on live updates, mode variety, and franchise familiarity for long-term retention.", insight: "The annualized content cycle and gameplay updates support durable engagement and monetization." },
  { name: "Starfield", genre: "Sci-fi RPG", platform: "PC, Xbox", release: "2023", rating: "7.8/10", players: "Medium", revenue: "$500M+", summary: "A space exploration RPG built around worldbuilding, character progression, and open-ended player discovery.", insight: "The title benefits from deep exploration and sandbox play, but the strongest retention is tied to player-driven discovery." },
  { name: "Alan Wake 2", genre: "Survival Horror", platform: "PC, PlayStation, Xbox", release: "2023", rating: "9.1/10", players: "High", revenue: "$300M+", summary: "A psychological horror experience that blends atmospheric storytelling, survival systems, and tight pacing.", insight: "Narrative depth and strong presentation make it a standout in premium single-player engagement." },
  { name: "Dead Space", genre: "Action Horror", platform: "PC, PlayStation, Xbox", release: "2023", rating: "8.7/10", players: "High", revenue: "$300M+", summary: "A remake of a beloved survival horror title that improved accessibility without losing the original tension and identity.", insight: "The combination of classic horror design and modern polish creates strong replay value for action-horror fans." },
  { name: "Need for Speed Unbound", genre: "Racing", platform: "PC, PlayStation, Xbox", release: "2022", rating: "8.5/10", players: "Medium", revenue: "$250M+", summary: "A stylish arcade racer balancing customization, city exploration, and fast competitive races.", insight: "The mix of culture-driven presentation and accessible progression supports steady audience engagement." },
  { name: "Forza Motorsport", genre: "Racing", platform: "PC, Xbox", release: "2023", rating: "8.7/10", players: "High", revenue: "$350M+", summary: "A simulation-heavy racing game built around realism, precision tuning, and event-based progression.", insight: "Performance fidelity and a robust car ecosystem maintain strong interest among competitive and casual players." },
  { name: "The Elder Scrolls VI", genre: "Open-world RPG", platform: "PC, Xbox", release: "TBA", rating: "TBD", players: "Expected High", revenue: "Hyperscale", summary: "A highly anticipated continuation of the franchise with strong expectations around exploration, quests, and world size.", insight: "Brand power and long-awaited design ambitions mean the title is likely to influence large segments of the RPG market." },
  { name: "Assassin's Creed Mirage", genre: "Action Adventure", platform: "PC, PlayStation, Xbox", release: "2023", rating: "7.9/10", players: "Medium", revenue: "$450M+", summary: "A stealth-focused Assassin's Creed entry designed around classic approachability, city movement, and story-driven mission structures.", insight: "A return to fundamentals resonates with players who value focused stealth and exploration over broader open-world complexity." },
  { name: "Assassin's Creed Shadows", genre: "Action Adventure", platform: "PC, PlayStation, Xbox", release: "2025", rating: "8.3/10", players: "High", revenue: "$700M+", summary: "A new historical action-adventure set to expand the franchise with new protagonists, world design and stealth systems.", insight: "Strong IP recognition and expansion of modern parkour systems keep fan interest and market anticipation high." },
  { name: "Dead by Daylight", genre: "Survival Horror", platform: "PC, PlayStation, Xbox, Switch", release: "2016", rating: "8.1/10", players: "High", revenue: "$600M+", summary: "A tense asymmetrical survival game that thrives on social play and repeated match variety.", insight: "The mix of fear, unpredictability, and character diversity delivers strong replayability." },
  { name: "Tom Clancy's Rainbow Six Siege", genre: "Tactical FPS", platform: "PC, PlayStation, Xbox", release: "2015", rating: "8.6/10", players: "High", revenue: "$1.5B+", summary: "A tactical shooter built around teamwork, gadget usage, and destructive environmental design.", insight: "The regular meta shifts and team-based strategy create long-term engagement and healthy competitive ecosystems." },
  { name: "The Division 2", genre: "Action RPG", platform: "PC, PlayStation, Xbox", release: "2019", rating: "8.2/10", players: "High", revenue: "$500M+", summary: "A cooperative action RPG focused on raids, progression loops, and tactical urban mission design.", insight: "The social and loot-driven structure makes it a strong example of co-op retention." },
  { name: "Borderlands 3", genre: "Looter Shooter", platform: "PC, PlayStation, Xbox", release: "2019", rating: "8.1/10", players: "High", revenue: "$1.0B+", summary: "A loot-heavy first-person shooter built around character classes, chaotic combat, and a highly recognizable art style.", insight: "The blend of humor, progression, and collectible loot is highly effective for replayability." },
  { name: "Dying Light 2", genre: "Open-world Survival", platform: "PC, PlayStation, Xbox", release: "2022", rating: "7.6/10", players: "Medium", revenue: "$300M+", summary: "A parkour-driven zombie survival game emphasizing traversal, risk, and faction choices.", insight: "Movement and day-night tension create memorable play sessions when paired with strong design." },
  { name: "Hades", genre: "Roguelike Action", platform: "PC, PlayStation, Xbox, Switch", release: "2020", rating: "9.2/10", players: "High", revenue: "$250M+", summary: "A roguelike action game known for quick run cycles, intense combat, and a highly replayable design.", insight: "Its short-session loops and strong progression systems make it a benchmark for retention in action roguelikes." },
  { name: "Hades II", genre: "Roguelike Action", platform: "PC", release: "2025", rating: "8.9/10", players: "High", revenue: "$350M+", summary: "A sequel that raises the expectations around combat variety, progression design, and roguelike session structure.", insight: "The accessibility of the loop and the mastery ceiling help sustain active engagement and community interest." },
  { name: "NBA 2K25", genre: "Sports", platform: "PC, PlayStation, Xbox", release: "2024", rating: "8.3/10", players: "High", revenue: "$1.1B+", summary: "A sports simulation centered on competitive matches, career progression, and online social modes.", insight: "Its combination of realism and social systems continues to support premium lifecycle value." },
  { name: "Gran Turismo 7", genre: "Racing", platform: "PC, PlayStation", release: "2022", rating: "9.0/10", players: "High", revenue: "$700M+", summary: "A premium racing simulator celebrated for realism, track variety, and a polished single-player experience.", insight: "Cinematic realism and content depth create a strong benchmark for simulation-focused racing experiences." },
  { name: "NHL 25", genre: "Sports", platform: "PC, PlayStation, Xbox", release: "2024", rating: "8.0/10", players: "Medium", revenue: "$250M+", summary: "A hockey simulation built around competitive realism, franchise modes, and online team play.", insight: "Sports franchises continue to rely on realistic systems and seasonal events to support engagement." },
  { name: "The Sims 4", genre: "Life Sim", platform: "PC, PlayStation, Xbox", release: "2014", rating: "8.8/10", players: "Very High", revenue: "$1.4B+", summary: "A sandbox life simulation that remains popular due to endless customization, social systems, and player-driven storytelling.", insight: "The flexibility of creation and customization gives the game exceptional lifetime value." },
  { name: "Kingdom Hearts IV", genre: "Action RPG", platform: "PC, PlayStation, Xbox", release: "TBA", rating: "TBD", players: "Expected High", revenue: "Hyperscale", summary: "A long-awaited sequel expected to blend action combat, exploration, and a recognizable narrative universe with strong franchise demand.", insight: "The title’s fan base and brand recognition create extremely high anticipation and major market visibility." },
  { name: "Dragon Ball: Sparking! ZERO", genre: "Fighting", platform: "PC, PlayStation, Xbox", release: "2024", rating: "8.8/10", players: "High", revenue: "$500M+", summary: "A high-energy fighting game built around franchise recognition, flashy moves, and accessible competitive execution.", insight: "A strong brand and accessible combat system can create huge engagement across casual and competitive players." },
  { name: "Palia", genre: "Life Sim", platform: "PC, Mobile", release: "2023", rating: "8.4/10", players: "High", revenue: "$120M+", summary: "A social life sim blending crafting, community building, and flexible progression in a cozy setting.", insight: "The combination of low-pressure progression and community involvement creates loyal retention among casual players." },
  { name: "Guild Wars 2", genre: "MMORPG", platform: "PC", release: "2012", rating: "8.8/10", players: "High", revenue: "$500M+", summary: "A persistent online world with strong PvE, dynamic events, and long-term progression structures.", insight: "Excellent world design and event-driven play help maintain a healthy active player community." },
  { name: "Path of Exile 2", genre: "Action RPG", platform: "PC, PlayStation, Xbox", release: "2025", rating: "8.9/10", players: "High", revenue: "$500M+", summary: "A popular action RPG that is expanding around deep build crafting, itemization, and high-skill melee and caster systems.", insight: "Complex progression and specialization give the game a strong long-term hold on core players." },
  { name: "Manor Lords", genre: "Strategy", platform: "PC", release: "2024", rating: "8.0/10", players: "Medium", revenue: "$60M+", summary: "A city-building strategy title that emphasizes management, expansion, and simulation depth in a medieval setting.", insight: "The title’s appeal is built around strategy depth, player planning, and sandbox experimentation." },
  { name: "Civilization VI", genre: "Strategy", platform: "PC, Console", release: "2016", rating: "9.0/10", players: "High", revenue: "$500M+", summary: "A turn-based strategy classic known for long-form play, depth, and immense replayability.", insight: "The game is one of the strongest examples of long-session strategic engagement across both casual and expert audiences." },
  { name: "Warframe", genre: "Action RPG", platform: "PC, PlayStation, Xbox, Switch", release: "2013", rating: "8.9/10", players: "Very High", revenue: "$1.0B+", summary: "A cooperative action RPG with rapid movement, deep progression, and constant content updates.", insight: "The game’s ongoing update cadence and power progression loop make it a powerful retention case." },
  { name: "Monster Hunter Rise", genre: "Action RPG", platform: "PC, Switch, PlayStation, Xbox", release: "2021", rating: "9.1/10", players: "High", revenue: "$600M+", summary: "A stylish action RPG centered on co-op hunting, gear progression, and tight combat encounters.", insight: "Its approachable design and rewarding progression are key factors in its sustained player engagement." },
  { name: "Monster Hunter Wilds", genre: "Action RPG", platform: "PC, PlayStation, Xbox", release: "2025", rating: "9.0/10", players: "Very High", revenue: "$800M+", summary: "A much-anticipated evolution of the Monster Hunter formula with greater world scale, world interaction and hunting depth.", insight: "The combination of cooperative play, large-scale monster encounters and strong franchise identity keeps anticipation high." },
  { name: "God of War Ragnarök", genre: "Action Adventure", platform: "PC, PlayStation", release: "2022", rating: "9.4/10", players: "High", revenue: "$1.2B+", summary: "A cinematic action-adventure combining rich storytelling, strong combat, and broad narrative payoff.", insight: "The title stands out as one of the strongest examples of premium narrative-driven engagement in AAA games." },
  { name: "One Piece: Odyssey", genre: "Action RPG", platform: "PC, PlayStation, Xbox", release: "2023", rating: "8.0/10", players: "Medium", revenue: "$250M+", summary: "An anime-inspired RPG built around party combat, exploration, and fan-favorite franchise elements.", insight: "Strong IP recognition and accessible RPG systems support conversion and audience retention." },
  { name: "Yakuza: Like a Dragon", genre: "RPG", platform: "PC, PlayStation, Xbox", release: "2020", rating: "8.8/10", players: "High", revenue: "$250M+", summary: "A story-rich RPG with humor, city exploration, and an unusual but highly engaging turn-based combat system.", insight: "The combination of side stories, world-building and character personality drives strong player attachment." },
  { name: "Like a Dragon: Infinite Wealth", genre: "RPG", platform: "PC, PlayStation, Xbox", release: "2024", rating: "8.7/10", players: "High", revenue: "$300M+", summary: "A narrative-heavy RPG with exploration, social systems, and a rich city-based environment.", insight: "The sequel remains highly relevant thanks to the franchise’s strong community and engaging presentation." },
  { name: "Persona 3 Reload", genre: "JRPG", platform: "PC, PlayStation, Xbox, Switch", release: "2024", rating: "8.7/10", players: "High", revenue: "$250M+", summary: "A remaster of a beloved JRPG that combines social simulation, dungeon progression and emotional storytelling.", insight: "The franchise’s strong appeal supports remarkable engagement across both returning and new players." },
  { name: "Persona 4 Golden", genre: "JRPG", platform: "PC, PlayStation, Switch", release: "2023", rating: "9.0/10", players: "High", revenue: "$200M+", summary: "A critically acclaimed JRPG that continues to thrive via strong character writing and highly replayable social systems.", insight: "The game remains a benchmark for engagement driven by social simulation and character depth." },
  { name: "Sonic Frontiers", genre: "Platformer", platform: "PC, PlayStation, Xbox, Switch", release: "2022", rating: "8.0/10", players: "High", revenue: "$300M+", summary: "A fast open-zone platformer highlighting movement, exploration, and franchise-driven nostalgia.", insight: "The game’s approachability and speed help broad audience appeal and long-form replayability." },
  { name: "Super Mario Bros. Wonder", genre: "Platformer", platform: "Switch", release: "2023", rating: "9.0/10", players: "High", revenue: "$700M+", summary: "A family-friendly platformer with a strong sense of creativity, visual charm and accessible local co-op play.", insight: "The game’s broad audience and co-op design make it one of the strongest family-friendly retention cases in the market." },
  { name: "The Legend of Zelda: Tears of the Kingdom", genre: "Adventure", platform: "Switch", release: "2023", rating: "9.8/10", players: "High", revenue: "$1.0B+", summary: "A sequel that expands exploration, world design and player-driven creativity to new heights.", insight: "The game’s freedom, creativity and world-building create exceptional premium engagement and replayability." },
  { name: "Nintendo Switch Sports", genre: "Sports", platform: "Switch", release: "2022", rating: "8.2/10", players: "High", revenue: "$300M+", summary: "A family-oriented sports game built around accessibility, local multiplayer and friendly short sessions.", insight: "Its low barrier to entry and social play make it ideal for repeated casual engagement." },
  { name: "Splatoon 3", genre: "Shooter", platform: "Switch", release: "2022", rating: "9.0/10", players: "High", revenue: "$700M+", summary: "A colorful shooter that blends team play, creativity and short competitive matches with a strong digital community.", insight: "Its colorful appeal and social play contribute to high retention in the family and competitive audience." },
  { name: "Grand Theft Auto VI", aliases: ["GTA VI", "GTA 6", "Grand Theft Auto 6"], genre: "Open-world Action", platform: "PC, PlayStation, Xbox", release: "2026", rating: "Très attendu", players: "Expected High", revenue: "Très élevé", summary: "Un prochain opus ultra attendu avec un monde ouvert monumental, des personnages marquants et une forte demande commerciale.", insight: "Des attentes massives, un univers ouvert étendu et la franchise GTA garantissent une attention exceptionnelle dès son lancement." },
  { name: "Project: Nexus", genre: "Co-op Shooter", platform: "PC, PlayStation, Xbox", release: "2026", rating: "Très attendu", players: "Expected High", revenue: "À confirmer", summary: "Un shooter coopératif de science-fiction très attendu, orienté vers les missions d’équipe, le loot et la progression collaborative.", insight: "Le mélange d’univers futuriste, de co-op et de progression durable peut créer un fort engagement de communauté." },
  { name: "Nightfall Reborn", genre: "Action RPG", platform: "PC, PlayStation, Xbox", release: "2026", rating: "Très attendu", players: "Expected High", revenue: "À confirmer", summary: "Un RPG d’action-aventure au rythme narratif fort avec une progression, des quêtes et des combats rapides et immersifs.", insight: "Le marketing autour de l’histoire et de la progression est un levier fort pour attirer des joueurs très engagés." },
  { name: "Eclipse Drift", genre: "Survival Space", platform: "PC, Xbox", release: "2026", rating: "Très attendu", players: "Expected High", revenue: "À confirmer", summary: "Un survival spatial axé sur l’exploration libre, l’adaptation rapide et les affrontements entre groupes dans un environnement ouvert.", insight: "Le besoin d’exploration et de survival crée un potentiel de rétention important si le loop est bien cadré." },
  { name: "Kingdom at Dawn", genre: "Strategy", platform: "PC", release: "2027", rating: "Très attendu", players: "Expected High", revenue: "À confirmer", summary: "Un jeu de stratégie fantasy qui combine gestion de royaume, batailles massives et évolutions progressives du monde.", insight: "Le marché de la stratégie reste fort lorsqu’il propose un vrai sentiment de conquête et de planification." },
  { name: "Shadow Protocol", genre: "FPS", platform: "PC, PlayStation, Xbox", release: "2027", rating: "Très attendu", players: "Expected High", revenue: "À confirmer", summary: "Un FPS futuriste à fort potentiel compétitif, orienté infiltration, gadgets tactiques et scénarios à fort impact.", insight: "Le design compétitif et le potentiel de replay donnent une forte valeur de long terme s’il est bien équilibré." },
  { name: "Titan Echoes", genre: "Action Adventure", platform: "PC, PlayStation, Xbox", release: "2027", rating: "Très attendu", players: "Expected High", revenue: "À confirmer", summary: "Un jeu de combat en monde ouvert où l’exploration, le pilotage et la coopération façonnent la progression du joueur.", insight: "La combinaison entre exploration libre et mécaniques de combat peut attirer des joueurs cherchant une forte sensation d’échelle." }
];

function renderGameResult(game) {
  const playerLevel = {
    High: 'Élevé',
    'Very High': 'Très élevé',
    Medium: 'Moyen',
    Low: 'Faible'
  };

  const summary = `${game.name} est un titre de ${game.genre} qui se distingue par son rythme de jeu, son accessibilité et son potentiel de fidélisation à long terme.`;
  const insight = `${game.name} reste particulièrement pertinent pour les équipes de production grâce à son audience, sa communauté et à la qualité de son engagement sur plusieurs sessions.`;

  const card = document.createElement('article');
  card.className = 'result-card game-clickable';
  card.dataset.gameTitle = game.name;

  card.innerHTML = `
    <div class="result-header">
      <h3>${game.name}</h3>
      <span class="genre-badge">${game.genre}</span>
    </div>
    <div class="result-meta">
      <span>Plateforme : ${game.platform}</span>
      <span>Sortie : ${game.release}</span>
      <span>Note : ${game.rating}</span>
    </div>
    <p>${summary}</p>
    <div class="result-stats">
      <div>
        <small>Joueurs</small>
        <strong>${playerLevel[game.players] || game.players}</strong>
      </div>
      <div>
        <small>Revenus</small>
        <strong>${game.revenue}</strong>
      </div>
      <div>
        <small>Signal du marché</small>
        <strong>${game.rating}</strong>
      </div>
      <div>
        <small>Analyse</small>
        <strong>Live</strong>
      </div>
    </div>
    <p style="margin-top: 14px;"><strong>Note de recherche :</strong> ${insight}</p>
  `;

  return card;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getGameForDetail(title) {
  const normalizedTitle = normalizeText(title);
  return gameDatabase.find((game) => {
    const names = [game.name, ...(game.aliases || [])];
    return names.some((name) => normalizeText(name) === normalizedTitle);
  }) || {
    name: title,
    genre: 'Jeu vidéo',
    platform: 'PC et consoles selon disponibilité',
    release: 'À confirmer',
    rating: 'À analyser',
    players: 'À confirmer',
    revenue: 'Données non publiées',
    summary: `${title} est présenté dans la sélection GeekPage pour son intérêt auprès des joueurs et de la communauté.`,
    insight: 'La fiche utilise les informations disponibles dans la sélection et doit être complétée avec les annonces officielles de l’éditeur.'
  };
}

const monthlyActivePlayerEstimates = {
  fortnite: '110 M',
  callofdutywarzone: '85 M',
  grandtheftautov: '25 M',
  minecraft: '170 M',
  roblox: '380 M',
  leagueoflegends: '130 M',
  valorant: '28 M',
  apexlegends: '18 M',
  genshinimpact: '65 M',
  counterstrike2: '35 M',
  rocketleague: '24 M',
  eldenring: '12 M'
};

function getMonthlyActivePlayers(game) {
  const knownEstimate = monthlyActivePlayerEstimates[normalizeText(game.name)];
  if (knownEstimate) return `${knownEstimate} (estimation)`;

  const estimatedByAudience = {
    'Very High': '30 M',
    High: '12 M',
    Medium: '5 M',
    Low: '1 M'
  };
  return `${estimatedByAudience[game.players] || '2 M'} (estimation)`;
}

const gameMetaGuides = {
  fortnite: {
    equipment: 'Fusil à pompe pour les combats rapprochés, fusil d’assaut polyvalent, mobilité et soins rapides.',
    strategy: 'Atterrir près d’un point de rotation, récolter rapidement, garder une option de mobilité et prendre les hauteurs avant la fin de zone.'
  },
  callofdutywarzone: {
    equipment: 'Arme principale à faible recul, pistolet-mitrailleur en seconde arme, plaques d’armure et grenades tactiques.',
    strategy: 'Jouer en escouade, partager l’argent, sécuriser le chargement et éviter les combats inutiles avant les dernières zones.'
  },
  grandtheftautov: {
    equipment: 'Fusil d’assaut fiable, gilet pare-balles, véhicule rapide et munitions adaptées à la mission.',
    strategy: 'Préparer l’itinéraire, utiliser la couverture et alterner déplacement discret et approche directe selon l’objectif.'
  },
  minecraft: {
    equipment: 'Pioche en diamant ou netherite, armure enchantée, bouclier, nourriture et seau d’eau.',
    strategy: 'Sécuriser une base, obtenir rapidement du fer puis des enchantements, et préparer une réserve avant le Nether ou l’End.'
  },
  leagueoflegends: {
    equipment: 'Objets adaptés au rôle, bottes situationnelles, contrôle de vision et achat de résistance contre la composition adverse.',
    strategy: 'Prioriser les sbires, suivre les timings d’objectifs, communiquer les positions ennemies et jouer autour de la condition de victoire.'
  },
  valorant: {
    equipment: 'Arme choisie selon l’économie, compétences de prise d’espace et utilitaire conservé pour le post-plant.',
    strategy: 'Jouer en binôme, échanger les éliminations, varier les timings et conserver l’avantage numérique plutôt que chercher un duel inutile.'
  },
  apexlegends: {
    equipment: 'Arme longue portée associée à une arme de proximité, bouclier élevé, batteries et mobilité de l’équipe.',
    strategy: 'Atterrir avec l’escouade, partager les ressources, prendre une position forte et tourner tôt avant que la zone ne se ferme.'
  },
  eldenring: {
    equipment: 'Arme améliorée avec une affinité adaptée aux statistiques, talismans défensifs et fioles équilibrées entre vie et ressource.',
    strategy: 'Observer les patterns, punir après les attaques lourdes, exploiter les dégâts élémentaires et utiliser l’invocation quand le combat l’exige.'
  },
  genshinimpact: {
    equipment: 'Armes et artéfacts avec statistiques principales cohérentes, recharge d’énergie et bonus de dégâts élémentaires.',
    strategy: 'Construire une équipe autour des réactions élémentaires, faire tourner les compétences et réserver les ultimes aux fenêtres de dégâts.'
  },
  counterstrike2: {
    equipment: 'AK-47 ou M4 selon le camp, fumigènes, flashs et kit de désamorçage pour les rôles concernés.',
    strategy: 'Jouer les échanges en équipe, mémoriser les compositions de grenades et protéger l’économie pour les rounds décisifs.'
  }
};

function getMetaGuide(game) {
  const guide = gameMetaGuides[normalizeText(game.name)];
  if (guide) return guide;

  if (game.genre.includes('RPG')) {
    return {
      equipment: 'Privilégier un équipement amélioré, des statistiques cohérentes avec le build et des consommables adaptés à la zone.',
      strategy: 'Construire une spécialisation claire, apprendre les faiblesses des ennemis et améliorer régulièrement l’équipement avant les boss.'
    };
  }
  if (game.genre.includes('Racing')) {
    return {
      equipment: 'Choisir un véhicule adapté au circuit, régler l’adhérence et conserver des améliorations équilibrées.',
      strategy: 'Apprendre les trajectoires, gérer les freinages et adapter le réglage aux virages plutôt que chercher uniquement la vitesse maximale.'
    };
  }
  return {
    equipment: 'Choisir l’équipement recommandé par le rôle du jeu, puis l’adapter à la carte, aux ennemis et au niveau de difficulté.',
    strategy: 'Maîtriser la boucle principale, observer les habitudes adverses et privilégier les objectifs qui font progresser la partie.'
  };
}

function getFrenchInsight(game) {
  const genre = game.genre.toLowerCase();

  if (genre.includes('rpg')) {
    return `${game.name} s’appuie sur une progression riche, la personnalisation du personnage et l’exploration pour maintenir l’engagement sur la durée.`;
  }
  if (genre.includes('shooter') || genre.includes('fps')) {
    return `Le rythme des parties, la maîtrise des combats et les mises à jour régulières permettent à ${game.name} de conserver une communauté active.`;
  }
  if (genre.includes('adventure') || genre.includes('action')) {
    return `L’identité visuelle, l’exploration et la qualité des combats donnent à ${game.name} une forte capacité à retenir les joueurs.`;
  }
  if (genre.includes('racing') || genre.includes('sports')) {
    return `La prise en main accessible, la profondeur de la compétition et les événements réguliers soutiennent la longévité de ${game.name}.`;
  }
  if (genre.includes('fighting')) {
    return `Des mécaniques faciles à découvrir mais difficiles à maîtriser permettent à ${game.name} de réunir joueurs occasionnels et compétiteurs.`;
  }
  if (genre.includes('strategy')) {
    return `La profondeur stratégique, la planification et les nombreuses possibilités de rejouer renforcent l’engagement autour de ${game.name}.`;
  }
  if (genre.includes('horror')) {
    return `L’atmosphère, la tension et la variété des situations rendent les parties de ${game.name} mémorables et facilement rejouables.`;
  }
  if (genre.includes('mmorpg') || genre.includes('mmo')) {
    return `La richesse du monde, les activités sociales et les mises à jour régulières favorisent une communauté durable autour de ${game.name}.`;
  }
  if (genre.includes('platformer') || genre.includes('sandbox') || genre.includes('sim')) {
    return `La liberté laissée au joueur, la personnalisation et la variété des activités donnent à ${game.name} une excellente durée de vie.`;
  }
  return `L’identité de ${game.name}, son accessibilité et la variété de ses activités contribuent à maintenir l’intérêt des joueurs sur le long terme.`;
}

const gameGameplayDetails = {
  fortnite: 'Construire ou utiliser le décor pour se protéger, fouiller des coffres, conduire des véhicules, accomplir des quêtes et jouer en solo, duo ou escouade.',
  callofdutywarzone: 'S’équiper pendant la partie, acheter du matériel dans les stations, revenir après un duel au Goulag et gagner en survivant jusqu’à la dernière escouade.',
  grandtheftautov: 'Explorer Los Santos, alterner entre les trois personnages, conduire, tirer, suivre des missions scénarisées et développer des activités dans GTA Online.',
  minecraft: 'Miner des ressources, fabriquer des outils, construire librement, explorer des biomes, combattre des créatures, faire de l’agriculture et progresser jusqu’à l’End.',
  leagueoflegends: 'Choisir un champion, gagner de l’or grâce aux sbires, détruire les tourelles, contrôler les objectifs et coordonner les cinq rôles pour atteindre le Nexus.',
  valorant: 'Sélectionner un agent, utiliser ses compétences pour prendre ou défendre un site, acheter son arsenal à chaque manche et gagner par éliminations ou objectif.',
  apexlegends: 'Choisir une Légende, looter des armes et accessoires, utiliser les capacités de l’escouade, réanimer ses alliés et gérer les rotations dans la zone.',
  eldenring: 'Explorer un monde ouvert interconnecté, combattre des boss, personnaliser son build, découvrir des quêtes cachées et choisir entre plusieurs chemins de progression.',
  genshinimpact: 'Changer de personnage en combat, créer des réactions élémentaires, grimper, planer, résoudre des énigmes, explorer les régions et développer ses personnages.',
  counterstrike2: 'Acheter son équipement au début du round, poser ou désamorcer la bombe, utiliser les grenades, tenir les angles et gérer l’économie de l’équipe.',
  roblox: 'Rejoindre des expériences créées par la communauté, personnaliser son avatar, progresser dans des mini-jeux et jouer avec d’autres utilisateurs.'
};

function getGameplayDetails(game) {
  const details = gameGameplayDetails[normalizeText(game.name)];
  if (details) return details;

  if (game.genre.includes('RPG')) {
    return 'Explorer des zones, accepter des quêtes, améliorer les compétences, choisir son équipement, affronter des ennemis et faire évoluer son personnage selon son style de jeu.';
  }
  if (game.genre.includes('Shooter') || game.genre.includes('FPS')) {
    return 'Choisir son arsenal, utiliser la couverture et les capacités disponibles, remplir les objectifs de la mission et adapter son approche aux adversaires.';
  }
  if (game.genre.includes('Adventure')) {
    return 'Explorer les environnements, résoudre des énigmes, suivre une histoire, débloquer des zones et utiliser les outils du personnage pour progresser.';
  }
  if (game.genre.includes('Sports') || game.genre.includes('Racing')) {
    return 'Participer à des épreuves, améliorer ses performances, personnaliser son équipe ou son véhicule et progresser dans des compétitions de difficulté croissante.';
  }
  return 'Explorer le contenu disponible, relever des défis, débloquer des améliorations, personnaliser son expérience et jouer seul ou avec la communauté selon les modes proposés.';
}

const gameProgressionDetails = {
  fortnite: 'Gagner de l’expérience avec les parties et les quêtes, progresser dans le Passe de combat, débloquer des cosmétiques et améliorer son classement compétitif.',
  callofdutywarzone: 'Monter les niveaux d’armes, débloquer des accessoires, compléter les défis, améliorer son niveau de compte et progresser dans les parties classées.',
  grandtheftautov: 'Faire avancer l’histoire par les missions, acheter des propriétés et véhicules, développer ses activités et accumuler de l’argent dans GTA Online.',
  minecraft: 'Passer du bois et de la pierre au diamant et à la netherite, obtenir des enchantements, automatiser les ressources et vaincre l’Ender Dragon.',
  leagueoflegends: 'Gagner de l’expérience et de l’or dans chaque partie, améliorer la maîtrise des champions et monter dans les divisions classées.',
  valorant: 'Débloquer et maîtriser les agents, améliorer ses compétences de visée et de placement, puis monter dans le classement compétitif.',
  apexlegends: 'Débloquer des Légendes et des cosmétiques, améliorer son niveau de compte, compléter le Passe de combat et monter dans les rangs.',
  eldenring: 'Gagner des runes, augmenter ses attributs, améliorer ses armes, trouver des talismans et faire évoluer son build selon les boss rencontrés.',
  genshinimpact: 'Faire monter les personnages et les armes, améliorer les artéfacts, développer les talents et augmenter le niveau d’aventure pour débloquer de nouvelles régions.',
  counterstrike2: 'Améliorer sa précision, sa connaissance des cartes et sa coordination, puis progresser dans les grades et le classement Premier.',
  roblox: 'Progresser séparément dans chaque expérience, obtenir des objets ou des niveaux, personnaliser son avatar et compléter les objectifs créés par les développeurs.'
};

function getProgressionDetails(game) {
  const details = gameProgressionDetails[normalizeText(game.name)];
  if (details) return details;

  if (game.genre.includes('RPG')) {
    return 'Gagner de l’expérience, améliorer les statistiques, débloquer des compétences, renforcer l’équipement et faire évoluer le personnage au fil des quêtes.';
  }
  if (game.genre.includes('Sports') || game.genre.includes('Racing')) {
    return 'Améliorer l’équipe ou le véhicule, gagner des compétitions, débloquer du contenu et progresser dans les championnats ou événements saisonniers.';
  }
  if (game.genre.includes('Fighting')) {
    return 'Apprendre les combos, maîtriser plusieurs personnages, débloquer des éléments cosmétiques et monter dans les modes classés.';
  }
  return 'Débloquer du contenu, compléter les objectifs, améliorer sa maîtrise du gameplay et progresser dans les niveaux, événements ou classements disponibles.';
}

function renderGameDetail() {
  const factsTarget = document.getElementById('gameFacts');
  const titleTarget = document.getElementById('gameDetailTitle');
  if (!factsTarget || !titleTarget) return;

  const params = new URLSearchParams(window.location.search);
  const requestedTitle = params.get('game') || 'Fortnite';
  const game = getGameForDetail(requestedTitle);
  const freeToPlay = ['Fortnite', 'Call of Duty: Warzone', 'League of Legends', 'Valorant', 'Roblox', 'Apex Legends'].includes(game.name);
  const release = game.release === 'TBA' ? 'À confirmer' : game.release;
  const price = freeToPlay ? 'Gratuit avec achats optionnels' : 'Environ 40 à 80 € selon l’édition';
  const store = game.platform.includes('Mobile') ? 'Boutiques mobiles et plateformes indiquées' : 'Steam, PlayStation Store, Xbox Store ou Nintendo eShop selon la plateforme';
  const metaGuide = getMetaGuide(game);
  const facts = [
    ['Genre', game.genre],
    ['Plateformes', game.platform],
    ['Date de sortie', release],
    ['Prix indicatif', price],
    ['Modèle économique', freeToPlay ? 'Jeu-service avec contenu optionnel' : 'Achat premium et extensions éventuelles'],
    ['Où le trouver', store],
    ['Développeur / éditeur', 'À vérifier selon la fiche officielle du jeu'],
    ['Mode de jeu', game.players.includes('High') || game.players.includes('Very') ? 'Solo et/ou multijoueur selon le titre' : 'Solo ou coopération selon la fiche'],
    ['Nombre de joueurs', game.players === 'Very High' ? 'Communauté très active' : 'À confirmer selon le mode'],
    ['Joueurs actifs ce mois-ci', getMonthlyActivePlayers(game)],
    ['Boucle de gameplay', 'Explorer, relever des défis, progresser et améliorer son équipement'],
    ['Progression', getProgressionDetails(game)],
    ['Méta actuelle', 'La méta évolue avec les mises à jour : privilégier les choix ci-dessous puis les adapter au patch en cours.'],
    ['Meilleurs équipements', metaGuide.equipment],
    ['Stratégie recommandée', metaGuide.strategy],
    ['Possibilités dans le jeu', getGameplayDetails(game)],
    ['Difficulté', 'Variable selon le mode, le niveau choisi et la maîtrise du joueur'],
    ['Communauté', game.players === 'Very High' ? 'Très large et active sur plusieurs plateformes' : 'Communauté suivie par GeekPage'],
    ['Note de recherche', game.rating],
    ['Signal du marché', game.revenue],
    ['Actualités à suivre', 'Mises à jour, événements, correctifs, extensions et annonces de l’éditeur']
  ];

  titleTarget.textContent = game.name;
  document.title = `GeekPage — ${game.name}`;
  document.getElementById('gameDetailGenre').textContent = game.genre;
  document.getElementById('gameDetailSummary').textContent = game.summary;
  document.getElementById('gameDetailInsight').textContent = getFrenchInsight(game);
  factsTarget.innerHTML = facts.map(([label, value]) => `
    <div class="game-fact">
      <dt>${escapeHtml(label)}</dt>
      <dd>${escapeHtml(value)}</dd>
    </div>
  `).join('');
}

function setupGameCardLinks() {
  const cards = document.querySelectorAll('.project-card, article.page-card, .result-card');
  cards.forEach((card) => {
    if (card.closest('.game-detail-card')) return;
    const heading = card.querySelector('h3, h4');
    if (!heading) return;
    card.classList.add('game-clickable');
    card.dataset.gameTitle = card.dataset.gameTitle || heading.textContent.trim();
    card.setAttribute('role', 'link');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Ouvrir la fiche de ${card.dataset.gameTitle}`);
  });
}

document.addEventListener('click', (event) => {
  const card = event.target.closest('.game-clickable');
  if (!card || event.target.closest('a, button, input')) return;
  window.location.href = `jeu.html?game=${encodeURIComponent(card.dataset.gameTitle)}`;
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter' && event.key !== ' ') return;
  const card = event.target.closest('.game-clickable');
  if (!card) return;
  event.preventDefault();
  window.location.href = `jeu.html?game=${encodeURIComponent(card.dataset.gameTitle)}`;
});

const newsFeedData = [
  { tag: "Tendances", title: "Les shooters tactiques dominent les sessions compétitives en 2026", summary: "La méta actuelle favorise les jeux rapides, denses en équipe et orientés vers la maîtrise du mouvement, du timing et de la coordination." },
  { tag: "Méta", title: "Les personnages à mobilité élevée et les classes polyvalentes prennent le dessus", summary: "Les studios surveillent de près les rôles qui offrent une polyvalence élevée sans casser l’équilibre global ni la cohérence des matches." },
  { tag: "RPG", title: "Les RPG open-world restent la clé de la fidélisation premium", summary: "Les joueurs recherchent des mondes vivants, des quêtes fortes et des choix narratifs qui donnent du sens à la progression sur plusieurs dizaines d’heures." },
  { tag: "Monétisation", title: "Les passes de combat et les contenus saisonniers restent les leviers favoris", summary: "Les jeux en service continu s’appuient sur des mises à jour régulières, des événements temporaires et des récompenses de progression pour maintenir l’attention." },
  { tag: "Communauté", title: "Les créations des joueurs influencent désormais la direction du design", summary: "Les communautés créatives ont un impact direct sur le contenu, les modes, et même sur les décisions commerciales des développeurs." },
  { tag: "Analyse", title: "Les longues sessions restent les plus rentables en engagement", summary: "Les données montrent que les jeux qui offrent une progression claire et des objectifs progressifs conservent mieux les joueurs sur le long terme." }
];

const recentGamesData = [
  { tag: "2025", title: "Helldivers 2", summary: "Un tir coopératif très apprécié pour ses missions d’équipe, sa difficulté progressive et son humour dérivé des échecs collectifs." },
  { tag: "2025", title: "Black Myth: Wukong", summary: "Une aventure d’action inspirée du folklore chinois, avec combat rapide, exploration et niveau de difficulté élevé." },
  { tag: "2025", title: "Dragon Age: The Veilguard", summary: "Un RPG d’action très attendu qui mise sur le storytelling, les choix narratifs et les combats en équipe." },
  { tag: "2025", title: "Tekken 8", summary: "Un jeu de combat ultra-réactif avec un système de combat plus rapide, plus techniques et plus exigeant." },
  { tag: "2025", title: "Final Fantasy VII Rebirth", summary: "Une suite de RPG qui accentue les cinématiques, les boss et les mécaniques de progression de la réputation." },
  { tag: "2025", title: "Dead Island 2", summary: "Un jeu de survie zombie très orienté action, avec exploration urbaine, missions et système de loot." }
];

const futureGamesData = [
  { tag: "2026", title: "Project: Nexus", summary: "Un shooter coopératif de science-fiction avec missions d’équipe, loot évolutif et systèmes de progression dynamiques." },
  { tag: "2026", title: "Nightfall Reborn", summary: "Un RPG d’action-aventure au rythme narratif fort, avec batailles rapides, quêtes interdépendantes et monde ouvert." },
  { tag: "2026", title: "Eclipse Drift", summary: "Un survival spatial compétitif axé sur l’exploration, l’adaptation rapide et les combats de groupe en environnement ouvert." },
  { tag: "2027", title: "Kingdom at Dawn", summary: "Un jeu de stratégie fantasy combinant gestion de royaumes, grandes batailles et événements mondiaux." },
  { tag: "2027", title: "Shadow Protocol", summary: "Un FPS futuriste avec mécaniques d’infiltration, gadgets tactiques et scénarios compétitifs à fort impact." },
  { tag: "2027", title: "Titan Echoes", summary: "Un jeu de combat en monde ouvert où l’exploration, les mécaniques de pilotage et la coopération façonnent la progression." }
];

function renderNewsList(items, containerId) {
  const target = document.getElementById(containerId);
  if (!target) return;

  target.innerHTML = items.map((item) => `
    <article class="news-item">
      <small>${item.tag}</small>
      <h4>${item.title}</h4>
      <p>${item.summary}</p>
    </article>
  `).join('');
}

function normalizeText(value) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function searchGames(query) {
  const trimmed = query.trim();
  gameSearchResults.innerHTML = '';

  if (!trimmed) {
    gameSearchResults.innerHTML = '<div class="result-card"><p>Saisissez un titre de jeu pour consulter ses performances et ses tendances.</p></div>';
    return;
  }

  const normalizedQuery = normalizeText(trimmed);

  const matches = gameDatabase.filter((game) => {
    const haystack = [
      game.name,
      game.genre,
      game.platform,
      ...(game.aliases || [])
    ].join(' ').toLowerCase();

    const normalizedHaystack = normalizeText(haystack);
    return normalizedHaystack.includes(normalizedQuery);
  });

  if (!matches.length) {
    gameSearchResults.innerHTML = `
      <div class="result-card">
        <p>Aucun jeu trouvé pour "${trimmed}". Essayez Fortnite, Warzone, GTA V, Elden Ring, Minecraft, Apex Legends, Helldivers 2, Grand Theft Auto VI, Project: Nexus, Nightfall Reborn ou Baldur's Gate 3.</p>
      </div>
    `;
    return;
  }

  matches.forEach((game) => {
    gameSearchResults.appendChild(renderGameResult(game));
  });
}

if (exploreBtn) {
  exploreBtn.addEventListener('click', () => {
    const title = gameSearchInput && gameSearchInput.value ? gameSearchInput.value : 'Fortnite';
    if (gameSearchInput) {
      gameSearchInput.value = title;
    }
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '') {
      window.location.href = 'recherche.html';
      return;
    }
    if (gameSearchInput) {
      searchGames(title);
      gameSearchInput.focus();
    }
  });
}

if (trendBtn) {
  trendBtn.addEventListener('click', () => {
    window.location.href = 'tendances.html';
  });
}

if (newsBtn) {
  newsBtn.addEventListener('click', () => {
    window.location.href = 'actualites.html';
  });
}

if (reportBtn) {
  reportBtn.addEventListener('click', () => {
    window.location.href = 'rapport.html';
  });
}

if (reportForm && reportStatus) {
  reportForm.addEventListener('submit', (event) => {
    event.preventDefault();
    reportStatus.textContent = 'Merci, votre signalement a bien été enregistré.';
    reportStatus.classList.add('is-visible');
    reportForm.reset();
  });
}

if (searchGameButton && gameSearchInput) {
  searchGameButton.addEventListener('click', () => {
    searchGames(gameSearchInput.value);
  });

  gameSearchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      searchGames(gameSearchInput.value);
    }
  });
}

const quickSearchForm = document.getElementById('quickSearchForm');
if (quickSearchForm && gameSearchInput && searchGameButton) {
  quickSearchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    searchGames(gameSearchInput.value);
  });
}

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();

  projectCards.forEach((card) => {
    const category = card.dataset.category || '';
    const text = card.textContent.toLowerCase();
    const matchesFilter = activeFilter === 'all' || category.includes(activeFilter);
    const matchesSearch = !query || text.includes(query);

    card.classList.toggle('hidden', !(matchesFilter && matchesSearch));
  });
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
    activeFilter = button.dataset.filter;
    applyFilters();
  });
});

if (searchInput) {
  searchInput.addEventListener('input', applyFilters);
}

if (document.getElementById('newsFeed')) {
  renderNewsList(newsFeedData, 'newsFeed');
}
if (document.getElementById('recentGames')) {
  renderNewsList(recentGamesData, 'recentGames');
}
if (document.getElementById('futureGames')) {
  renderNewsList(futureGamesData, 'futureGames');
}
if (document.getElementById('gameSearchResults')) {
  searchGames('Fortnite');
}

setupGameCardLinks();
renderGameDetail();
