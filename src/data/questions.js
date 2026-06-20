// ============================================================
//  QUESTION BANK — 60 questions, 6 categories of 10.
//  BALANCED: each archetype appears as an option EXACTLY 40 times
//  (240 options / 6 archetypes), so no player group is favoured.
//  Each option maps to ONE archetype:
//    machine (Goal Machine), magician (Magician), general (General),
//    speed (Speed Demon), showman (Showman), talisman (Talisman)
//  The quiz randomly picks 5 each play.
// ============================================================

const A = (t, arch) => ({ t, s: { [arch]: 1 } });

export const QUESTION_BANK = [
  // ─────────── 1) FOOTBALL PERSONALITY (10) ───────────
  { cat: "Football", q: "World Cup final, 90th minute, you get the ball:", options: [
    A("Pick the perfect pass 🧠", "general"), A("Burn past everyone ⚡", "speed"),
    A("Try something outrageous 🎭", "showman"), A("Demand it and own the moment 👑", "talisman") ] },
  { cat: "Football", q: "Your signature move:", options: [
    A("An impossible no-look trick 🪄", "magician"), A("A 40-metre sprint ⚡", "speed"),
    A("Seven step-overs 🎭", "showman"), A("Swagger that draws all eyes 👑", "talisman") ] },
  { cat: "Football", q: "Teammates call you the:", options: [
    A("Wizard 🪄", "magician"), A("Boss 🧠", "general"),
    A("Entertainer 🎭", "showman"), A("Star 👑", "talisman") ] },
  { cat: "Football", q: "You beat a defender by:", options: [
    A("Nutmeg and spin 🪄", "magician"), A("A clever one-two 🧠", "general"),
    A("Pure raw pace ⚡", "speed"), A("Sheer presence — they freeze 👑", "talisman") ] },
  { cat: "Football", q: "Your football superpower:", options: [
    A("Unreadable dribbles 🪄", "magician"), A("Reading the whole game 🧠", "general"),
    A("Teleport-level speed ⚡", "speed"), A("Hypnotising the crowd 🎭", "showman") ] },
  { cat: "Football", q: "Your dream goal:", options: [
    A("A clinical tap-in winner 🚀", "machine"), A("A breakaway from your own half ⚡", "speed"),
    A("A bicycle kick, obviously 🎭", "showman"), A("A last-minute icon moment 👑", "talisman") ] },
  { cat: "Football", q: "Pre-match, you are:", options: [
    A("Laser-focused on scoring 🚀", "machine"), A("Organising the team 🧠", "general"),
    A("Hyping the crowd 🎭", "showman"), A("Soaking up the spotlight 👑", "talisman") ] },
  { cat: "Football", q: "After a loss you:", options: [
    A("Train twice as hard 🚀", "machine"), A("Analyse what went wrong 🧠", "general"),
    A("Shake it off, go again fast ⚡", "speed"), A("Pick everyone back up 👑", "talisman") ] },
  { cat: "Football", q: "Your shirt personality:", options: [
    A("Classic No.9 finisher 🚀", "machine"), A("Commanding captain 🧠", "general"),
    A("Flying winger ⚡", "speed"), A("Flashy showman 🎭", "showman") ] },
  { cat: "Football", q: "Celebration of choice:", options: [
    A("Calm point to the sky 🚀", "machine"), A("A cheeky little shrug 🪄", "magician"),
    A("A full choreographed dance 🎭", "showman"), A("Arms wide, drink in the roar 👑", "talisman") ] },

  // ─────────── 2) LEADERSHIP (10) ───────────
  { cat: "Leadership", q: "Group project — you're the:", options: [
    A("One who just finishes it 🚀", "machine"), A("Idea machine 🪄", "magician"),
    A("First to get moving ⚡", "speed"), A("Face who presents it 👑", "talisman") ] },
  { cat: "Leadership", q: "A teammate panics. You:", options: [
    A("Take over and act 🚀", "machine"), A("Find a creative fix 🪄", "magician"),
    A("React instantly ⚡", "speed"), A("Crack a joke to relax them 🎭", "showman") ] },
  { cat: "Leadership", q: "Your leadership style:", options: [
    A("Lead by results 🚀", "machine"), A("Lead by ideas 🪄", "magician"),
    A("Lead by strategy 🧠", "general"), A("Lead by presence 👑", "talisman") ] },
  { cat: "Leadership", q: "People follow you because you're:", options: [
    A("Unstoppable 🚀", "machine"), A("Surprising 🪄", "magician"),
    A("Dependable 🧠", "general"), A("Magnetic and fun 🎭", "showman") ] },
  { cat: "Leadership", q: "Tough call, needed now:", options: [
    A("Decide and move 🚀", "machine"), A("Find a clever option 🪄", "magician"),
    A("Weigh it, then choose 🧠", "general"), A("Go with your gut, fast ⚡", "speed") ] },
  { cat: "Leadership", q: "Your team wins — you credit:", options: [
    A("The game plan 🧠", "general"), A("The energy and tempo ⚡", "speed"),
    A("The vibes you brought 🎭", "showman"), A("Everyone but yourself 👑", "talisman") ] },
  { cat: "Leadership", q: "Under pressure you get:", options: [
    A("More inventive 🪄", "magician"), A("More energetic ⚡", "speed"),
    A("More theatrical 🎭", "showman"), A("More magnetic 👑", "talisman") ] },
  { cat: "Leadership", q: "Your motto:", options: [
    A("Imagination wins 🪄", "magician"), A("Plan the work, work the plan 🧠", "general"),
    A("Bring the show 🎭", "showman"), A("Lift the room 👑", "talisman") ] },
  { cat: "Leadership", q: "A rival challenges you. You:", options: [
    A("Out-think them 🪄", "magician"), A("Out-plan them 🧠", "general"),
    A("Out-run them ⚡", "speed"), A("Out-shine them 👑", "talisman") ] },
  { cat: "Leadership", q: "Captaincy means:", options: [
    A("Unlocking creativity 🪄", "magician"), A("Running the show 🧠", "general"),
    A("Setting the tempo ⚡", "speed"), A("Keeping spirits high 🎭", "showman") ] },

  // ─────────── 3) SOCIAL LIFE (10) ───────────
  { cat: "Social", q: "At a wedding you:", options: [
    A("Eat first, no nonsense 🚀", "machine"), A("Hit the dance floor first ⚡", "speed"),
    A("Run the entertainment 🎭", "showman"), A("Befriend every table 👑", "talisman") ] },
  { cat: "Social", q: "Friends see you as the:", options: [
    A("Reliable one 🚀", "machine"), A("Organiser 🧠", "general"),
    A("Life of the party 🎭", "showman"), A("Star of the group 👑", "talisman") ] },
  { cat: "Social", q: "Weekend plan appears. You:", options: [
    A("Just go, no overthinking 🚀", "machine"), A("Plan the whole trip 🧠", "general"),
    A("Suggest something spontaneous ⚡", "speed"), A("Invite everyone you know 👑", "talisman") ] },
  { cat: "Social", q: "Group chat, you're always:", options: [
    A("Straight to the point 🚀", "machine"), A("Making the plan 🧠", "general"),
    A("First to reply ⚡", "speed"), A("Sending the memes 🎭", "showman") ] },
  { cat: "Social", q: "Meeting new people you:", options: [
    A("Keep it short and real 🚀", "machine"), A("Surprise them 🪄", "magician"),
    A("Put on a bit of a show 🎭", "showman"), A("Light up the room 👑", "talisman") ] },
  { cat: "Social", q: "Your camera roll is mostly:", options: [
    A("Goals and gym 🚀", "machine"), A("Weird arty shots 🪄", "magician"),
    A("Action, blur, motion ⚡", "speed"), A("You, centre frame 👑", "talisman") ] },
  { cat: "Social", q: "Friends are moving house. You:", options: [
    A("Carry the heavy stuff 🚀", "machine"), A("Find a clever shortcut 🪄", "magician"),
    A("Zoom back and forth fast ⚡", "speed"), A("Bring snacks and jokes 🎭", "showman") ] },
  { cat: "Social", q: "Your energy at a gathering:", options: [
    A("Quiet but solid 🚀", "machine"), A("Curious and playful 🪄", "magician"),
    A("Steady, in control 🧠", "general"), A("Loud and unmissable 👑", "talisman") ] },
  { cat: "Social", q: "Ideal night out:", options: [
    A("In, fun, done 🚀", "machine"), A("Somewhere new and odd 🪄", "magician"),
    A("A well-booked plan 🧠", "general"), A("Centre of the dance floor 🎭", "showman") ] },
  { cat: "Social", q: "Your laugh is:", options: [
    A("A single sharp HA 🚀", "machine"), A("A surprised giggle 🪄", "magician"),
    A("A quiet chuckle 🧠", "general"), A("A quick burst, then gone ⚡", "speed") ] },

  // ─────────── 4) WORK / SCHOOL (10) ───────────
  { cat: "Work", q: "Deadline in 1 hour. You:", options: [
    A("Prioritise and execute 🧠", "general"), A("Sprint through it ⚡", "speed"),
    A("Make it fun somehow 🎭", "showman"), A("Charm an extension 👑", "talisman") ] },
  { cat: "Work", q: "Unexpected money. You:", options: [
    A("Invent something with it 🪄", "magician"), A("Spend it on adventure ⚡", "speed"),
    A("Throw a party 🎭", "showman"), A("Treat all your friends 👑", "talisman") ] },
  { cat: "Work", q: "Your desk / workspace:", options: [
    A("Creative chaos 🪄", "magician"), A("Perfectly organised 🧠", "general"),
    A("Full of personality 🎭", "showman"), A("A bit of a stage 👑", "talisman") ] },
  { cat: "Work", q: "New project lands. First move:", options: [
    A("Brainstorm wild ideas 🪄", "magician"), A("Build a plan 🧠", "general"),
    A("Start instantly ⚡", "speed"), A("Rally the team 👑", "talisman") ] },
  { cat: "Work", q: "In meetings you:", options: [
    A("Drop the big idea 🪄", "magician"), A("Keep it on track 🧠", "general"),
    A("Push for quick action ⚡", "speed"), A("Lift the mood 🎭", "showman") ] },
  { cat: "Work", q: "Your work secret:", options: [
    A("Pure repetition 🚀", "machine"), A("Last-minute speed ⚡", "speed"),
    A("Making it enjoyable 🎭", "showman"), A("People want to help me 👑", "talisman") ] },
  { cat: "Work", q: "Tough feedback. You:", options: [
    A("Use it as fuel 🚀", "machine"), A("Make a better plan 🧠", "general"),
    A("Laugh and bounce back 🎭", "showman"), A("Stay confident anyway 👑", "talisman") ] },
  { cat: "Work", q: "Dream career vibe:", options: [
    A("Top performer 🚀", "machine"), A("The strategist 🧠", "general"),
    A("Always on the move ⚡", "speed"), A("The famous one 👑", "talisman") ] },
  { cat: "Work", q: "Teamwork means you:", options: [
    A("Do your part flawlessly 🚀", "machine"), A("Coordinate everyone 🧠", "general"),
    A("Keep the pace up ⚡", "speed"), A("Keep morale high 🎭", "showman") ] },
  { cat: "Work", q: "Productivity mode:", options: [
    A("Head down, full power 🚀", "machine"), A("Flow-state creativity 🪄", "magician"),
    A("Fun keeps me going 🎭", "showman"), A("I thrive on attention 👑", "talisman") ] },

  // ─────────── 5) HUMOUR (10) ───────────
  { cat: "Humour", q: "Your humour is:", options: [
    A("Deadpan, dry 🚀", "machine"), A("Clever wordplay 🪄", "magician"),
    A("Rapid-fire one-liners ⚡", "speed"), A("Charming and warm 👑", "talisman") ] },
  { cat: "Humour", q: "A joke flops. You:", options: [
    A("Repeat it, louder 🚀", "machine"), A("Twist it into a new one 🪄", "magician"),
    A("Move on instantly ⚡", "speed"), A("Double down, dramatically 🎭", "showman") ] },
  { cat: "Humour", q: "In the group you're the:", options: [
    A("Savage one-liner 🚀", "machine"), A("Random genius 🪄", "magician"),
    A("Calm sarcastic one 🧠", "general"), A("Lovable ringleader 👑", "talisman") ] },
  { cat: "Humour", q: "Your meme energy:", options: [
    A("No caption needed 🚀", "machine"), A("Cursed and creative 🪄", "magician"),
    A("Smart and topical 🧠", "general"), A("Loud and chaotic 🎭", "showman") ] },
  { cat: "Humour", q: "Someone pranks you. You:", options: [
    A("Prank back harder 🚀", "machine"), A("Out-smart the prank 🪄", "magician"),
    A("Plot the perfect revenge 🧠", "general"), A("React in a flash ⚡", "speed") ] },
  { cat: "Humour", q: "You'd win an award for:", options: [
    A("Best comeback 🧠", "general"), A("Fastest wit ⚡", "speed"),
    A("Most viral moment 🎭", "showman"), A("Most loved person 👑", "talisman") ] },
  { cat: "Humour", q: "Texting style:", options: [
    A("Weird emojis only 🪄", "magician"), A("Voice notes at speed ⚡", "speed"),
    A("Gifs and drama 🎭", "showman"), A("Everyone replies to me 👑", "talisman") ] },
  { cat: "Humour", q: "Favourite kind of funny:", options: [
    A("Absurd and weird 🪄", "magician"), A("Witty and smart 🧠", "general"),
    A("Slapstick chaos 🎭", "showman"), A("Feel-good and warm 👑", "talisman") ] },
  { cat: "Humour", q: "The room laughs. You're:", options: [
    A("Pleasantly surprised 🪄", "magician"), A("Quietly proud 🧠", "general"),
    A("Already onto the next ⚡", "speed"), A("Taking a little bow 👑", "talisman") ] },
  { cat: "Humour", q: "Your comedy weapon:", options: [
    A("Unexpected twists 🪄", "magician"), A("Perfect timing 🧠", "general"),
    A("Speed and surprise ⚡", "speed"), A("Big physical comedy 🎭", "showman") ] },

  // ─────────── 6) VIRAL CHAOS (10) ───────────
  { cat: "Chaos", q: "You go viral overnight:", options: [
    A("Cash in fast 🚀", "machine"), A("Ride the wave at full speed ⚡", "speed"),
    A("Do something even wilder 🎭", "showman"), A("Soak up the fame 👑", "talisman") ] },
  { cat: "Chaos", q: "Last slice of pizza. You:", options: [
    A("Take it, no hesitation 🚀", "machine"), A("Split it fairly 🧠", "general"),
    A("Make a whole bit of it 🎭", "showman"), A("Give it away like a hero 👑", "talisman") ] },
  { cat: "Chaos", q: "Zombie apocalypse role:", options: [
    A("Front-line fighter 🚀", "machine"), A("Leader with the plan 🧠", "general"),
    A("Outruns everything ⚡", "speed"), A("Keeps everyone's hope up 👑", "talisman") ] },
  { cat: "Chaos", q: "You find a time machine:", options: [
    A("Fix one big mistake 🚀", "machine"), A("Plan it out carefully 🧠", "general"),
    A("Zip everywhere at once ⚡", "speed"), A("Cause delightful mischief 🎭", "showman") ] },
  { cat: "Chaos", q: "Desert island, you:", options: [
    A("Build shelter day one 🚀", "machine"), A("Invent coconut tech 🪄", "magician"),
    A("Put on shows for the crabs 🎭", "showman"), A("Befriend the seagulls 👑", "talisman") ] },
  { cat: "Chaos", q: "Surprise dance battle:", options: [
    A("One powerful move, done 🚀", "machine"), A("Confuse them with style 🪄", "magician"),
    A("Footwork at lightning speed ⚡", "speed"), A("Own the floor with charm 👑", "talisman") ] },
  { cat: "Chaos", q: "One wish, you'd ask for:", options: [
    A("Unstoppable success 🚀", "machine"), A("Infinite creativity 🪄", "magician"),
    A("Limitless speed ⚡", "speed"), A("To entertain the world 🎭", "showman") ] },
  { cat: "Chaos", q: "Alarm didn't go off. You:", options: [
    A("Power through, no excuses 🚀", "machine"), A("Improvise a genius excuse 🪄", "magician"),
    A("Had a backup plan ready 🧠", "general"), A("Charm your way out of it 👑", "talisman") ] },
  { cat: "Chaos", q: "Free trip, leaving in 1 hour:", options: [
    A("Grab a bag and go 🚀", "machine"), A("Pick the strangest place 🪄", "magician"),
    A("Plan the itinerary mid-air 🧠", "general"), A("Make it a whole adventure 🎭", "showman") ] },
  { cat: "Chaos", q: "Crowd chants your name. You:", options: [
    A("Nod, stay cool 🚀", "machine"), A("Pull a surprise move 🪄", "magician"),
    A("Conduct the chant 🧠", "general"), A("Sprint a victory lap ⚡", "speed") ] },
];

// Non-scoring Easter-egg shown at the very end. Pure engagement.
export const GOAT_QUESTION = {
  q: "Final question (just for fun): Who is the GREATEST footballer ever?",
  options: ["Messi 🐐", "Ronaldo 🐐", "Pele 🐐", "Maradona 🐐"],
};
