// blogsData.js

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

export const blogsData = [
  {
    id: 1,
    title: "Kabaddi: India's Oldest Game is Becoming the World's Newest Obsession",
    slug: slugify("Kabaddi: India's Oldest Game is Becoming the World's Newest Obsession"),
    image: "/assets/blogs/BlogBanner1.JPG",
    description: "From village pastime to global sensation - discover how kabaddi is taking the world by storm through CPKL.",
    content: [
      {
        type: "paragraph",
        text: "If you grew up in India, chances are you've played kabaddi at least once — in your schoolyard, during summer breaks, or in the dusty fields of your village. A game so simple that it needed no ball, no bat, no fancy kit — just courage, strategy, and lungs strong enough to hold your breath."
      },
      {
        type: "paragraph", 
        text: "But here's the twist: what was once a village pastime is now transforming into a global sport with leagues, stars, and international fans. And at the heart of this revolution is the Canvi Premier Kabaddi League (CPKL)."
      },
      {
        type: "paragraph",
        text: "So, what exactly is Kabaddi? One player charges into enemy territory, chanting 'kabaddi-kabaddi,' trying to tag as many opponents as possible before making it back to safety. Sounds simple? Not quite."
      },
      {
        type: "paragraph",
        text: "The raider has to be agile like a panther. The defenders? They're a wall of muscle and strategy waiting to pounce. Each raid is a battle of strength, speed, and mind games — and the smallest mistake can cost the team big."
      },
      {
        type: "paragraph",
        text: "It's fast. It's fierce. And when played professionally, it's nothing short of electrifying."
      },
      {
        type: "paragraph",
        text: "Why Kabaddi is Special: It's Pure - No fancy gear, just raw athleticism. It's Strategic - Every raid is like a chess move at lightning speed. It's Ours - A game born in India, now ready to win the world."
      },
      {
        type: "paragraph",
        text: "Kabaddi Goes Global: From being played in dusty fields to being staged under floodlights in Dubai — kabaddi has come a long way. With professional leagues like CPKL stepping up, this homegrown sport is now getting the recognition it always deserved."
      },
      {
        type: "paragraph",
        text: "And if you've never watched a kabaddi match before? Trust us — one game is all it takes to get hooked."
      }
    ]
  },
  {
    id: 2,
    title: "Pardeep Narwal: The Man Who Turned Kabaddi Into Magic",
    slug: slugify("Pardeep Narwal: The Man Who Turned Kabaddi Into Magic"),
    image: "/assets/blogs/BlogBanner2.png",
    description: "Meet the kabaddi legend who redefined the sport with his incredible raids and record-breaking performances.",
    content: [
      {
        type: "paragraph",
        text: "Every sport has its icon. Football has Messi. Cricket has Kohli. Kabaddi? It has Pardeep Narwal."
      },
      {
        type: "paragraph",
        text: "If you've never heard his name before, here's all you need to know: he's the man who redefined kabaddi raids, scored points like a machine, and pulled off moves that fans still can't believe."
      },
      {
        type: "paragraph",
        text: "From Village Boy to Kabaddi Legend: Pardeep grew up in Haryana, where kabaddi isn't just a sport — it's a way of life. With nothing but determination and talent, he rose from local school matches to becoming one of the most feared raiders in kabaddi history."
      },
      {
        type: "paragraph",
        text: "And his signature move? The 'dubki' — a daring dive where he slips under defenders' arms like water slipping through your fingers. Try watching it once and you'll never forget it."
      },
      {
        type: "paragraph",
        text: "Records That Speak Louder Than Words: Most raid points in kabaddi history. Once scored 34 points in a single match (yes, 34!). The only raider to single-handedly demolish teams with his fearless style."
      },
      {
        type: "paragraph",
        text: "His name isn't just in the record books — it's etched in kabaddi folklore."
      },
      {
        type: "paragraph",
        text: "The Next Chapter: CPKL Dubai: This year, as CPKL Season 2 kicks off in Dubai, Pardeep Narwal joins the stage. And for kabaddi fans, that's like watching Sachin Tendulkar walk out to bat one more time."
      },
      {
        type: "paragraph",
        text: "For new fans? It's the perfect chance to witness a living legend in action. Because once you see Pardeep raid, you'll understand why kabaddi is called the game of warriors."
      }
    ]
  },
  {
    id: 3,
    title: "Why CPKL in Dubai Could Change Kabaddi Forever",
    slug: slugify("Why CPKL in Dubai Could Change Kabaddi Forever"),
    image: "/assets/blogs/BlogBanner3.JPG",
    description: "Discover how CPKL Season 2 in Dubai is revolutionizing kabaddi and taking it to international audiences.",
    content: [
      {
        type: "paragraph",
        text: "From Indian Villages to Dubai's Arenas: Kabaddi was born in India's soil. But now, for the first time, it's stepping onto one of the world's grandest stages — Dubai. And that's what makes CPKL Season 2 so exciting."
      },
      {
        type: "paragraph",
        text: "This isn't just another league. It's kabaddi's chance to go global."
      },
      {
        type: "paragraph",
        text: "What Makes CPKL Different? Global Stage: Hosting in Dubai puts kabaddi in front of international fans who've never seen it live before. Big Names + Fresh Faces: Legends like Pardeep Narwal playing alongside new grassroots heroes discovered from trials. World-Class Presentation: Lights, cameras, stats, replays — the full sporting spectacle. Fan First: From live streaming to social engagement, CPKL is designed for both hardcore kabaddi lovers and total newcomers."
      },
      {
        type: "paragraph",
        text: "Why It Matters for the Sport: For Players: More visibility, bigger contracts, and a global stage to prove themselves. For Fans: A chance to watch kabaddi like never before, packaged at the level of IPL or UFC. For the Sport: The leap from Indian villages to Dubai arenas proves kabaddi has the muscle to compete with cricket and football for attention."
      },
      {
        type: "paragraph",
        text: "The Future Starts Now: CPKL Season 2 isn't just about matches — it's about rewriting kabaddi's destiny. If this league succeeds, it could pave the way for kabaddi leagues across continents, new youth academies, and even an Olympic dream one day."
      },
      {
        type: "paragraph",
        text: "So whether you're a die-hard kabaddi follower or someone just discovering it — this is the season you don't want to miss."
      }
    ]
  }
];