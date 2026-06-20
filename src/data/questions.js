// ============================================================
//  QUESTION BANK — 60 questions, 6 categories of 10.
//  Each option maps to ONE archetype:
//    machine (Goal Machine), magician (Magician), general (General),
//    speed (Speed Demon), showman (Showman), talisman (Talisman)
//  The quiz randomly picks 5 each play.
//
//  GOAT_QUESTION is a separate, non-scoring Easter-egg shown once
//  at the end for pure engagement.
// ============================================================

const A = (t, arch) => ({ t, s: { [arch]: 1 } });

export const QUESTION_BANK = [
  // ─────────── 1) FOOTBALL PERSONALITY (10) ───────────
  { cat: "Football", q: "World Cup Final. 90th minute. You get the ball.", options: [
    A("Shoot immediately 🚀", "machine"), A("Dribble everyone 🪄", "magician"),
    A("Find the perfect pass 🧠", "general"), A("Do something outrageous 🎭", "showman") ] },
  { cat: "Football", q: "Your teammates call you the…", options: [
    A("Finisher 🚀", "machine"), A("Wizard 🪄", "magician"),
    A("Boss 🧠", "general"), A("Entertainer 🎭", "showman") ] },
  { cat: "Football", q: "Your biggest strength on the pitch:", options: [
    A("Determination 🚀", "machine"), A("Creativity 🪄", "magician"),
    A("Leadership 🧠", "general"), A("Charisma 👑", "talisman") ] },
  { cat: "Football", q: "Pick your dream goal:", options: [
    A("A tap-in that wins the cup 🚀", "machine"), A("A solo run past 5 players 🪄", "magician"),
    A("A 40-yard pinpoint assist 🧠", "general"), A("A bicycle kick, obviously 🎭", "showman") ] },
  { cat: "Football", q: "Pre-match, you are…", options: [
    A("Laser-focused on scoring 🚀", "machine"), A("Imagining impossible skills 🪄", "magician"),
    A("Organizing the whole team 🧠", "general"), A("Hyping the crowd already 👑", "talisman") ] },
  { cat: "Football", q: "Your shirt number says you're a…", options: [
    A("Classic No.9 🚀", "machine"), A("Magical No.10 🪄", "magician"),
    A("Commanding captain 🧠", "general"), A("Flashy winger 🎭", "showman") ] },
  { cat: "Football", q: "How do you beat a defender?", options: [
    A("Power straight through 🚀", "machine"), A("Nutmeg + spin 🪄", "magician"),
    A("Clever one-two 🧠", "general"), A("Pure raw pace ⚡", "speed") ] },
  { cat: "Football", q: "Your celebration of choice:", options: [
    A("Calm point to the sky 🚀", "machine"), A("A cheeky shrug 🪄", "magician"),
    A("Rally the whole squad 🧠", "general"), A("A choreographed dance 🎭", "showman") ] },
  { cat: "Football", q: "When you lose a match you…", options: [
    A("Train twice as hard 🚀", "machine"), A("Find a new trick 🪄", "magician"),
    A("Analyze what went wrong 🧠", "general"), A("Pick everyone back up 👑", "talisman") ] },
  { cat: "Football", q: "Your football superpower would be…", options: [
    A("Never missing 🚀", "machine"), A("Unreadable dribbles 🪄", "magician"),
    A("Teleporting speed ⚡", "speed"), A("Hypnotizing the crowd 👑", "talisman") ] },

  // ─────────── 2) LEADERSHIP (10) ───────────
  { cat: "Leadership", q: "Group project. You instantly become the…", options: [
    A("Doer who finishes it 🚀", "machine"), A("Idea person 🪄", "magician"),
    A("Planner who runs it 🧠", "general"), A("Face who presents it 👑", "talisman") ] },
  { cat: "Leadership", q: "A teammate is panicking. You…", options: [
    A("Take over and act 🚀", "machine"), A("Crack a joke to relax them 🎭", "showman"),
    A("Calmly give a plan 🧠", "general"), A("Reassure and inspire them 👑", "talisman") ] },
  { cat: "Leadership", q: "Your leadership style is…", options: [
    A("Lead by results 🚀", "machine"), A("Lead by ideas 🪄", "magician"),
    A("Lead by strategy 🧠", "general"), A("Lead by presence 👑", "talisman") ] },
  { cat: "Leadership", q: "People follow you because you're…", options: [
    A("Unstoppable 🚀", "machine"), A("Surprising 🪄", "magician"),
    A("Dependable 🧠", "general"), A("Magnetic 👑", "talisman") ] },
  { cat: "Leadership", q: "Tough decision needed NOW. You…", options: [
    A("Decide and move 🚀", "machine"), A("Find a creative option 🪄", "magician"),
    A("Weigh it fast and choose 🧠", "general"), A("Get everyone to buy in 👑", "talisman") ] },
  { cat: "Leadership", q: "Your team wins. You credit…", options: [
    A("Hard work 🚀", "machine"), A("A bit of magic 🪄", "magician"),
    A("The game plan 🧠", "general"), A("Everyone but yourself 👑", "talisman") ] },
  { cat: "Leadership", q: "Under pressure you become…", options: [
    A("More aggressive 🚀", "machine"), A("More inventive 🪄", "magician"),
    A("More calm 🧠", "general"), A("More energetic ⚡", "speed") ] },
  { cat: "Leadership", q: "Your motto:", options: [
    A("Results over excuses 🚀", "machine"), A("Imagination wins 🪄", "magician"),
    A("Plan the work, work the plan 🧠", "general"), A("Bring the energy 🎭", "showman") ] },
  { cat: "Leadership", q: "A rival challenges you. You…", options: [
    A("Out-work them 🚀", "machine"), A("Out-think them 🧠", "general"),
    A("Out-run them ⚡", "speed"), A("Out-shine them 👑", "talisman") ] },
  { cat: "Leadership", q: "Captaincy means…", options: [
    A("Setting the standard 🚀", "machine"), A("Unlocking creativity 🪄", "magician"),
    A("Running the show 🧠", "general"), A("Lifting everyone's spirit 👑", "talisman") ] },

  // ─────────── 3) SOCIAL LIFE (10) ───────────
  { cat: "Social", q: "At a wedding you…", options: [
    A("Eat first 🚀", "machine"), A("Dance first 🎭", "showman"),
    A("Organize everyone 🧠", "general"), A("Become everyone's friend 👑", "talisman") ] },
  { cat: "Social", q: "At a party you're the one who…", options: [
    A("Gets things started 🚀", "machine"), A("Pulls off a wild trick 🪄", "magician"),
    A("Keeps the plan on track 🧠", "general"), A("Owns the dance floor 🎭", "showman") ] },
  { cat: "Social", q: "Your friend group sees you as…", options: [
    A("The reliable one 🚀", "machine"), A("The creative one 🪄", "magician"),
    A("The organizer 🧠", "general"), A("The star 👑", "talisman") ] },
  { cat: "Social", q: "Group chat, you're always…", options: [
    A("Straight to the point 🚀", "machine"), A("Sending memes 🎭", "showman"),
    A("Making the plan 🧠", "general"), A("The first to reply ⚡", "speed") ] },
  { cat: "Social", q: "Weekend plans appear. You…", options: [
    A("Just go, no overthinking 🚀", "machine"), A("Suggest something wild ⚡", "speed"),
    A("Plan the whole trip 🧠", "general"), A("Invite everyone you know 👑", "talisman") ] },
  { cat: "Social", q: "Your ideal night out:", options: [
    A("In and out, mission done 🚀", "machine"), A("Somewhere new and unusual 🪄", "magician"),
    A("A well-booked plan 🧠", "general"), A("Center of the dance floor 🎭", "showman") ] },
  { cat: "Social", q: "Meeting new people, you…", options: [
    A("Keep it short 🚀", "machine"), A("Surprise them 🪄", "magician"),
    A("Read the room 🧠", "general"), A("Light it up instantly 👑", "talisman") ] },
  { cat: "Social", q: "Your camera roll is mostly…", options: [
    A("Gym & goals 🚀", "machine"), A("Random arty shots 🪄", "magician"),
    A("Screenshots & plans 🧠", "general"), A("You, mid-action 🎭", "showman") ] },
  { cat: "Social", q: "Friends need help moving. You…", options: [
    A("Carry the heavy stuff 🚀", "machine"), A("Find a clever shortcut 🪄", "magician"),
    A("Direct the whole operation 🧠", "general"), A("Bring snacks & vibes 👑", "talisman") ] },
  { cat: "Social", q: "Your energy at a gathering:", options: [
    A("Quiet but powerful 🚀", "machine"), A("Curious and playful 🪄", "magician"),
    A("Steady and in control 🧠", "general"), A("Loud and unmissable ⚡", "speed") ] },

  // ─────────── 4) WORK / SCHOOL (10) ───────────
  { cat: "Work", q: "Deadline in 1 hour. You…", options: [
    A("Grind and finish 🚀", "machine"), A("Hack a creative fix 🪄", "magician"),
    A("Prioritize and execute 🧠", "general"), A("Charm an extension 👑", "talisman") ] },
  { cat: "Work", q: "You receive unexpected money. You…", options: [
    A("Invest it 🧠", "general"), A("Spend it on adventure ⚡", "speed"),
    A("Treat your friends 👑", "talisman"), A("Buy something fun 🎭", "showman") ] },
  { cat: "Work", q: "Your desk/workspace is…", options: [
    A("Minimal, all business 🚀", "machine"), A("Creative chaos 🪄", "magician"),
    A("Perfectly organized 🧠", "general"), A("Covered in personality 🎭", "showman") ] },
  { cat: "Work", q: "New project lands. First move:", options: [
    A("Start immediately 🚀", "machine"), A("Brainstorm wild ideas 🪄", "magician"),
    A("Build a plan 🧠", "general"), A("Rally the team 👑", "talisman") ] },
  { cat: "Work", q: "In a meeting you're the one who…", options: [
    A("Pushes for action 🚀", "machine"), A("Drops the big idea 🪄", "magician"),
    A("Keeps it on track 🧠", "general"), A("Lifts the mood 🎭", "showman") ] },
  { cat: "Work", q: "Your study/work secret:", options: [
    A("Pure repetition 🚀", "machine"), A("Smart shortcuts 🪄", "magician"),
    A("Tight schedules 🧠", "general"), A("Last-minute speed ⚡", "speed") ] },
  { cat: "Work", q: "You get tough feedback. You…", options: [
    A("Use it as fuel 🚀", "machine"), A("Find a new angle 🪄", "magician"),
    A("Make a better plan 🧠", "general"), A("Stay confident anyway 👑", "talisman") ] },
  { cat: "Work", q: "Dream career vibe:", options: [
    A("Top performer 🚀", "machine"), A("Inventor / creator 🪄", "magician"),
    A("The strategist 🧠", "general"), A("The famous one 👑", "talisman") ] },
  { cat: "Work", q: "Teamwork means you…", options: [
    A("Do your part flawlessly 🚀", "machine"), A("Bring fresh ideas 🪄", "magician"),
    A("Coordinate everyone 🧠", "general"), A("Keep morale high 👑", "talisman") ] },
  { cat: "Work", q: "Your productivity mode:", options: [
    A("Head down, full power 🚀", "machine"), A("Flow-state creativity 🪄", "magician"),
    A("Calm and methodical 🧠", "general"), A("Fast bursts of energy ⚡", "speed") ] },

  // ─────────── 5) HUMOUR (10) ───────────
  { cat: "Humour", q: "Your humour is best described as…", options: [
    A("Deadpan and dry 🚀", "machine"), A("Clever wordplay 🪄", "magician"),
    A("Perfectly timed 🧠", "general"), A("Big and theatrical 🎭", "showman") ] },
  { cat: "Humour", q: "A joke flops. You…", options: [
    A("Repeat it louder 🚀", "machine"), A("Twist it into a new one 🪄", "magician"),
    A("Move on smoothly 🧠", "general"), A("Double down dramatically 🎭", "showman") ] },
  { cat: "Humour", q: "In the group you're the…", options: [
    A("Savage one-liner guy 🚀", "machine"), A("Random genius 🪄", "magician"),
    A("Calm sarcastic one 🧠", "general"), A("Full-on comedian 🎭", "showman") ] },
  { cat: "Humour", q: "Your meme energy:", options: [
    A("No caption needed 🚀", "machine"), A("Cursed and creative 🪄", "magician"),
    A("Smart and topical 🧠", "general"), A("Loud and chaotic ⚡", "speed") ] },
  { cat: "Humour", q: "Someone pranks you. You…", options: [
    A("Prank back, harder 🚀", "machine"), A("Out-smart the prank 🪄", "magician"),
    A("Plot the perfect revenge 🧠", "general"), A("Laugh loudest of all 🎭", "showman") ] },
  { cat: "Humour", q: "Your laugh is…", options: [
    A("A single sharp HA 🚀", "machine"), A("A surprised giggle 🪄", "magician"),
    A("A quiet chuckle 🧠", "general"), A("Heard three rooms away 👑", "talisman") ] },
  { cat: "Humour", q: "Favourite type of funny:", options: [
    A("Brutal honesty 🚀", "machine"), A("Absurd & weird 🪄", "magician"),
    A("Witty & smart 🧠", "general"), A("Slapstick chaos 🎭", "showman") ] },
  { cat: "Humour", q: "You'd win an award for…", options: [
    A("Most reliable laugh 🚀", "machine"), A("Most unexpected joke 🪄", "magician"),
    A("Best comeback 🧠", "general"), A("Most viral moment ⚡", "speed") ] },
  { cat: "Humour", q: "Texting style:", options: [
    A("One word. Done. 🚀", "machine"), A("Weird emojis only 🪄", "magician"),
    A("Full grammar always 🧠", "general"), A("Voice notes & chaos ⚡", "speed") ] },
  { cat: "Humour", q: "The room laughs. You're…", options: [
    A("The cause, calmly 🚀", "machine"), A("Confused but pleased 🪄", "magician"),
    A("Quietly proud 🧠", "general"), A("Taking a bow 👑", "talisman") ] },

  // ─────────── 6) VIRAL CHAOS (10) ───────────
  { cat: "Chaos", q: "You go viral overnight. Reaction:", options: [
    A("Cash in fast 🚀", "machine"), A("Do something weirder 🪄", "magician"),
    A("Plan the next 10 posts 🧠", "general"), A("Soak up the fame 👑", "talisman") ] },
  { cat: "Chaos", q: "Last slice of pizza. You…", options: [
    A("Take it, no hesitation 🚀", "machine"), A("Trick someone for it 🪄", "magician"),
    A("Split it fairly 🧠", "general"), A("Give it away like a hero 👑", "talisman") ] },
  { cat: "Chaos", q: "Zombie apocalypse. Your role:", options: [
    A("Front-line fighter 🚀", "machine"), A("Builds wild gadgets 🪄", "magician"),
    A("The leader with the plan 🧠", "general"), A("Outruns everything ⚡", "speed") ] },
  { cat: "Chaos", q: "You find a time machine. You…", options: [
    A("Fix one big mistake 🚀", "machine"), A("Mess with everything 🪄", "magician"),
    A("Plan it out carefully 🧠", "general"), A("Make yourself famous 👑", "talisman") ] },
  { cat: "Chaos", q: "Stuck on a desert island. You…", options: [
    A("Build shelter day one 🚀", "machine"), A("Invent coconut tech 🪄", "magician"),
    A("Map an escape plan 🧠", "general"), A("Befriend the seagulls 👑", "talisman") ] },
  { cat: "Chaos", q: "Surprise dance battle starts. You…", options: [
    A("Win with one power move 🚀", "machine"), A("Confuse them with style 🪄", "magician"),
    A("Calmly judge everyone 🧠", "general"), A("Steal the entire show 🎭", "showman") ] },
  { cat: "Chaos", q: "You get one wish. You wish for…", options: [
    A("Unstoppable success 🚀", "machine"), A("Infinite creativity 🪄", "magician"),
    A("Perfect timing always 🧠", "general"), A("World-wide fame 👑", "talisman") ] },
  { cat: "Chaos", q: "Alarm didn't go off. You…", options: [
    A("Power through, no excuses 🚀", "machine"), A("Improvise a genius excuse 🪄", "magician"),
    A("Already had a backup plan 🧠", "general"), A("Sprint and somehow make it ⚡", "speed") ] },
  { cat: "Chaos", q: "Free trip anywhere, leaving in 1 hour. You…", options: [
    A("Grab a bag and GO 🚀", "machine"), A("Pick the strangest place 🪄", "magician"),
    A("Plan the itinerary mid-air 🧠", "general"), A("Pack at lightning speed ⚡", "speed") ] },
  { cat: "Chaos", q: "Crowd starts chanting your name. You…", options: [
    A("Nod, stay cool 🚀", "machine"), A("Pull a surprise move 🪄", "magician"),
    A("Conduct the chant 🧠", "general"), A("Live for this moment 👑", "talisman") ] },
];

// Non-scoring Easter-egg shown at the very end. Pure engagement.
export const GOAT_QUESTION = {
  q: "Final question (just for fun): Who is the GREATEST footballer ever?",
  options: ["Messi 🐐", "Ronaldo 🐐", "Pele 🐐", "Maradona 🐐"],
};
