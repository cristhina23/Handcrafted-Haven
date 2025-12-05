import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/db";
import { BlogPost } from "@/lib/models/BlogPost";

const blogPosts = [
  {
    title: "Discover How Roberta Creates Her Handcrafted Pieces",
    description:
      "Roberta shares the story behind her handcrafted creations, walking you through her design process from the first sketch to the final piece.",
    content: `
      <h2>The Journey of Creating Handcrafted Art</h2>
      <p>Every handcrafted piece tells a story. For <strong>Roberta Martinez</strong>, that story begins long before her hands touch the materials. It starts with <strong>inspiration</strong>—drawn from the vibrant colors of her hometown, the patterns found in nature, and the rich cultural heritage passed down through generations.</p>
      
      <h3>Finding Inspiration in Everyday Life</h3>
      <p>Roberta finds beauty in the mundane. A morning walk through the market, the way light filters through leaves, or the intricate patterns on traditional textiles—all become seeds for her creative process. <strong>"I keep a sketchbook with me always,"</strong> she explains. "You never know when inspiration will strike."</p>
      
      <h3>The Design Process</h3>
      <p>Once an idea takes root, Roberta begins <strong>sketching</strong>. Her workspace is filled with dozens of notebooks, each page covered in drawings, color swatches, and notes. This initial phase can take <strong>weeks or even months</strong> as she refines her vision.</p>
      
      <p>The next step is <strong>selecting materials</strong>. Roberta believes in using sustainable, locally-sourced materials whenever possible. She visits local suppliers, feeling the texture of fabrics, examining the grain of wood, or selecting just the right shade of natural dye.</p>
      
      <h3>Bringing Vision to Life</h3>
      <p>With materials in hand and design finalized, the actual creation begins. This is where <strong>years of practiced skill meet raw creativity</strong>. Every cut, every stitch, every brush stroke is intentional. Roberta works slowly, refusing to rush the process. <strong>"Each piece needs time to become what it's meant to be,"</strong> she says.</p>
      
      <p>The final touches are what set her work apart—<strong>small details</strong> that might go unnoticed at first glance but add depth and meaning to each piece. A hidden signature, a carefully chosen color accent, or an unexpected texture combination.</p>
      
      <h3>The Story Continues</h3>
      <p>When a piece leaves Roberta's studio, its story doesn't end—it <strong>transforms</strong>. It becomes part of someone else's story, carrying with it the care, skill, and passion that went into its creation. This <strong>connection between maker and owner</strong> is what makes handcrafted items truly special.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80",
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80",
      "https://images.unsplash.com/photo-1487700160041-babef9c3cb55?w=800&q=80",
    ],
    category: "Sellers",
    author: { name: "Roberta Martinez" },
    tags: ["handcrafted", "artisan", "process"],
    published: true,
  },
  {
    title: "The Art of Pottery: From Clay to Masterpiece",
    description:
      "Join ceramic artist Maria as she transforms simple clay into beautiful, functional art pieces.",
    content: `
      <h2>The Ancient Art of Pottery</h2>
      <p>Pottery is one of humanity's oldest crafts, dating back over <strong>20,000 years</strong>. Yet in Maria Chen's hands, this ancient art form feels <strong>fresh and contemporary</strong>. Her studio is a bridge between tradition and innovation, where <strong>timeless techniques meet modern design</strong> sensibilities.</p>
      
      <h3>Working with Clay</h3>
      <p>Maria begins each day by preparing her clay—a <strong>meditative process</strong> that connects her to countless generations of potters before her. <strong>"Clay is alive in its own way,"</strong> she explains. "It has <strong>memory, personality</strong>, and needs to be understood, not just manipulated."</p>
      
      <p>She works primarily on the wheel, though <strong>hand-building techniques</strong> also feature in her repertoire. Watching her throw a pot is mesmerizing—her hands move with <strong>practiced confidence</strong>, coaxing the spinning clay upward, shaping it into bowls, vases, and cups.</p>
      
      <h3>The Transformation Through Fire</h3>
      <p>After shaping comes drying, then the <strong>first firing</strong>—the bisque. This transforms fragile clay into <strong>durable ceramic</strong>. But the real magic happens with glazing. Maria <strong>mixes her own glazes</strong>, experimenting with different mineral combinations to achieve unique colors and textures.</p>
      
      <p>The final firing reaches temperatures of <strong>over 2,300°F</strong>. Inside the kiln, <strong>chemical reactions</strong> create unexpected results. Opening the kiln is always exciting—sometimes surprising, occasionally disappointing, but often <strong>absolutely stunning</strong>.</p>
      
      <h3>Functional Beauty</h3>
      <p>What sets Maria's work apart is her belief that <strong>beautiful objects should be used, not just displayed</strong>. "A handmade mug elevates your morning coffee ritual," she says. "It brings <strong>mindfulness to everyday moments</strong>."</p>
    `,
    image:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80",
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80",
    ],
    category: "Sellers",
    author: { name: "Maria Chen" },
    tags: ["pottery", "ceramics", "handmade"],
    published: true,
  },
  {
    title: "Supporting Small Businesses: Why It Matters",
    description:
      "Learn how your purchases directly impact artisan communities and help preserve traditional crafts.",
    content: `
      <h2>The Power of Your Purchase</h2>
      <p>When you buy handcrafted items from small businesses, you're not just purchasing a product—you're <strong>investing in people, communities, and traditions</strong>. Every purchase sends ripples through artisan communities, creating <strong>positive change</strong> that extends far beyond the initial transaction.</p>
      
      <h3>Direct Impact on Artisan Livelihoods</h3>
      <p>Unlike mass-produced items where profits are diluted across corporate hierarchies, buying from <strong>independent artisans</strong> means your money goes <strong>directly to the creator</strong>. This enables them to support their families, invest in their craft, and continue creating beautiful work.</p>
      
      <p>Many artisans work from <strong>home studios</strong>, allowing them flexibility to balance family responsibilities with their creative passion. Your purchase helps <strong>sustain this lifestyle</strong> and keeps traditional skills alive in modern economies.</p>
      
      <h3>Preserving Cultural Heritage</h3>
      <p>Traditional crafts represent <strong>centuries of accumulated knowledge</strong> and cultural identity. When artisans can make a living from their craft, they're motivated to <strong>pass these skills to the next generation</strong>. Without economic viability, these traditions risk extinction.</p>
      
      <h3>Environmental Benefits</h3>
      <p>Small-scale production typically has a much <strong>smaller environmental footprint</strong> than industrial manufacturing. Artisans often use <strong>sustainable, locally-sourced materials</strong> and avoid the waste associated with mass production.</p>
      
      <h3>Strengthening Local Economies</h3>
      <p>Money spent with local artisans <strong>circulates within the community</strong>, supporting other local businesses and creating <strong>economic resilience</strong>. This builds stronger, more vibrant communities where creativity and entrepreneurship can flourish.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    ],
    category: "Customers",
    author: { name: "HandCraft Team" },
    tags: ["community", "impact", "sustainability"],
    published: true,
  },
  {
    title: "Textile Weaving: A Story in Every Thread",
    description:
      "Explore the intricate world of textile weaving with artisan Sarah.",
    content: `
      <h2>The Loom and the Thread</h2>
      <p>Sarah Thompson's textile studio is filled with the <strong>rhythmic clicking of looms</strong>—a sound that connects her to weavers across millennia. Her work combines <strong>traditional weaving techniques</strong> passed down through generations with <strong>contemporary design</strong> that speaks to modern sensibilities.</p>
      
      <h3>The Meditative Art of Weaving</h3>
      <p><strong>"Weaving is meditation in motion,"</strong> Sarah explains as her hands move confidently across the loom. Each throw of the shuttle, each press of the pedal follows <strong>ancient patterns</strong> while creating something entirely new. The repetitive motion clears the mind while hands and eyes work in <strong>perfect coordination</strong>.</p>
      
      <h3>Choosing Materials</h3>
      <p>Sarah works primarily with <strong>natural fibers</strong>—wool, cotton, linen, and silk. She's particular about her materials, seeking out <strong>organic and ethically-sourced fibers</strong> whenever possible. "The quality of materials shows in the finished piece," she notes. "I want textiles that <strong>get better with age</strong>, not worse."</p>
      
      <p>Colors come from both natural and synthetic dyes. While she loves the subtlety of <strong>plant-based dyes</strong>, she's not dogmatic about it. "Sometimes a piece needs that <strong>vibrant pop</strong> only a modern dye can provide," she admits with a smile.</p>
      
      <h3>From Functional to Fine Art</h3>
      <p>Sarah's work ranges from wearable scarves and shawls to <strong>decorative wall hangings</strong>. Each piece takes hours, sometimes <strong>days or weeks to complete</strong>. The slow, methodical nature of weaving means every piece is <strong>truly one-of-a-kind</strong>.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    ],
    category: "Sellers",
    author: { name: "Sarah Thompson" },
    tags: ["textiles", "weaving", "fiber-art"],
    published: true,
  },
  {
    title: "Jewelry Making: Crafting Wearable Art",
    description:
      "Discover how Elena transforms precious metals and stones into unique jewelry pieces.",
    content: `
      <h2>The Art of Adornment</h2>
      <p>Elena Rodriguez's jewelry studio is a treasure trove of <strong>precious metals, gemstones, and tools</strong>. For over a decade, she's been creating pieces that blend <strong>traditional metalsmithing</strong> with contemporary aesthetics.</p>
      
      <h3>Working with Metal and Stone</h3>
      <p>Each piece begins with <strong>careful design</strong>. Elena sketches ideas, considering how metals and stones will work together. <strong>"Jewelry is intimate,"</strong> she explains. "It touches your skin, moves with you, becomes part of your story."</p>
      
      <p>She works primarily with <strong>sterling silver and gold</strong>, using techniques like soldering, forging, and stone setting. The process is both technical and creative—requiring <strong>precision and artistic vision</strong> in equal measure.</p>
      
      <h3>Sourcing Ethical Materials</h3>
      <p>Elena is committed to using <strong>ethically sourced materials</strong>. She partners with suppliers who provide fair-trade metals and conflict-free gemstones. <strong>"Beauty shouldn't come at the cost of human suffering,"</strong> she emphasizes.</p>
      
      <h3>Creating Meaningful Pieces</h3>
      <p>What makes Elena's jewelry special is the <strong>meaning behind each design</strong>. Many pieces draw inspiration from nature, ancient symbols, or personal stories. She also does <strong>custom commissions</strong>, working closely with clients to create pieces that hold deep personal significance.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&q=80",
    ],
    category: "Sellers",
    author: { name: "Elena Rodriguez" },
    tags: ["jewelry", "metalwork", "gemstones"],
    published: true,
  },
  {
    title: "How to Care for Your Handcrafted Items",
    description:
      "Expert tips on maintaining and preserving your handmade treasures.",
    content: `
      <h2>Preserving Handcrafted Beauty</h2>
      <p>Handcrafted items require <strong>special care</strong> to maintain their <strong>beauty and longevity</strong>. Unlike mass-produced goods, each handmade piece has unique characteristics that deserve thoughtful preservation.</p>
      
      <h3>General Care Guidelines</h3>
      <p>Always <strong>handle with clean hands</strong> to avoid transferring oils and dirt. Store items in a <strong>cool, dry place</strong> away from direct sunlight, which can fade colors and damage materials over time.</p>
      
      <h3>Material-Specific Care</h3>
      <p>For <strong>pottery and ceramics</strong>, avoid sudden temperature changes that can cause cracking. Hand wash with mild soap and dry thoroughly. For <strong>textiles</strong>, follow care labels carefully—many handwoven or hand-dyed fabrics require gentle washing or dry cleaning.</p>
      
      <p><strong>Wood items</strong> benefit from occasional oiling to prevent drying and cracking. Use food-safe mineral oil for cutting boards and serving pieces. <strong>Metal jewelry</strong> should be stored in anti-tarnish pouches and cleaned with appropriate metal cleaners.</p>
      
      <h3>When Repairs Are Needed</h3>
      <p>If an item needs repair, <strong>contact the original maker first</strong>. Many artisans offer repair services and prefer to maintain the integrity of their work. This also supports the creator and builds lasting relationships.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&q=80",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80",
    ],
    category: "Customers",
    author: { name: "HandCraft Team" },
    tags: ["care", "tips", "maintenance"],
    published: true,
  },
  {
    title: "Woodworking: Bringing Nature into Your Home",
    description:
      "Carpenter James shares his passion for creating functional art from wood.",
    content: `
      <h2>Working with Wood</h2>
      <p>James Wilson's woodshop is filled with the <strong>sweet scent of fresh sawdust</strong> and the sound of tools shaping timber. For 20 years, he's been creating <strong>furniture and home goods</strong> that bring the warmth of nature indoors.</p>
      
      <h3>Selecting the Right Wood</h3>
      <p>Every project begins with <strong>choosing the right species</strong>. Oak for durability, walnut for its rich color, maple for fine grain, cherry for its aging beauty. <strong>"Each wood has its own personality,"</strong> James explains. "You have to listen to what it wants to become."</p>
      
      <h3>Traditional Techniques, Modern Design</h3>
      <p>James uses <strong>traditional joinery methods</strong>—dovetails, mortise and tenon, finger joints—combined with contemporary design sensibilities. The result is furniture that's both <strong>structurally sound and aesthetically pleasing</strong>, built to last generations.</p>
      
      <h3>Sustainable Sourcing</h3>
      <p>All his wood comes from <strong>sustainably managed forests</strong> or reclaimed sources. Old barn wood, fallen trees, and responsibly harvested timber ensure his craft doesn't harm the forests he loves. <strong>"We're custodians of these materials,"</strong> he says.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?w=800&q=80",
      "https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?w=800&q=80",
    ],
    category: "Sellers",
    author: { name: "James Wilson" },
    tags: ["woodworking", "furniture", "sustainability"],
    published: true,
  },
  {
    title: "The Perfect Gift: Choosing Handcrafted",
    description:
      "Why handcrafted gifts are more meaningful and how to select the perfect piece.",
    content: `
      <h2>Gifts That Matter</h2>
      <p>Handcrafted gifts carry <strong>meaning and intention</strong> that <strong>mass-produced items simply can't match</strong>. When you give a handmade piece, you're giving someone a <strong>unique treasure</strong> that reflects thoughtfulness and care.</p>
      
      <h3>Why Handcrafted Gifts Stand Out</h3>
      <p>Each handcrafted item is <strong>one-of-a-kind</strong>, made by real people with skill and passion. The recipient receives not just an object, but a <strong>story, craftsmanship, and connection</strong> to the maker's art.</p>
      
      <h3>Choosing the Right Piece</h3>
      <p>Consider the recipient's <strong>style, interests, and needs</strong>. A pottery lover might cherish a handmade mug, while someone who appreciates textiles could love a woven scarf. <strong>Quality over quantity</strong>—one meaningful piece beats a dozen generic gifts.</p>
      
      <h3>Presentation Matters</h3>
      <p>Include information about the <strong>maker and their process</strong>. Share the story behind the piece. This adds context and deepens appreciation. Many artisans provide <strong>care cards</strong> that you can include with the gift.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80",
      "https://images.unsplash.com/photo-1512909006721-3d6018887383?w=800&q=80",
    ],
    category: "Customers",
    author: { name: "HandCraft Team" },
    tags: ["gifts", "shopping", "meaningful"],
    published: true,
  },
  {
    title: "Leatherwork: Timeless Craft for Modern Life",
    description:
      "Master leather artisan David creates durable, beautiful leather goods.",
    content: `
      <h2>The Beauty of Leather</h2>
      <p>David Anderson's leatherwork combines <strong>traditional techniques</strong> that date back centuries with <strong>contemporary design</strong> that fits modern lifestyles. His workshop is filled with the rich smell of <strong>tanned leather and beeswax</strong>.</p>
      
      <h3>Selecting Quality Leather</h3>
      <p>David works exclusively with <strong>full-grain leather</strong>—the highest quality available. Unlike corrected or split leather, full-grain develops a beautiful <strong>patina with age</strong>, becoming more attractive over time. <strong>"Good leather is an investment,"</strong> he notes.</p>
      
      <h3>Hand-Stitching and Finishing</h3>
      <p>Every piece is <strong>hand-stitched using traditional saddle stitching</strong>, which is stronger and more durable than machine stitching. Edges are burnished smooth, and pieces are finished with natural oils and waxes that <strong>protect while enhancing</strong> the leather's natural beauty.</p>
      
      <h3>Built to Last</h3>
      <p>David designs his pieces to be <strong>lifelong companions</strong>. Wallets, bags, belts, and journals that improve with use and develop character over years. <strong>"I want people to pass these down,"</strong> he says, "not throw them away."</p>
    `,
    image:
      "https://images.unsplash.com/photo-1520561805070-83c413349512?w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    ],
    category: "Sellers",
    author: { name: "David Anderson" },
    tags: ["leather", "accessories", "durability"],
    published: true,
  },
  {
    title: "Building a Collection: Starting Your Journey",
    description:
      "Tips for new collectors on building a meaningful collection of handcrafted items.",
    content: `
      <h2>Starting Your Collection</h2>
      <p>Building a collection of handcrafted items is a <strong>rewarding journey</strong> that brings beauty and meaning into your life. Unlike accumulating mass-produced goods, collecting handmade pieces creates <strong>connections with makers and stories</strong>.</p>
      
      <h3>Define Your Focus</h3>
      <p>Start by choosing a <strong>category or theme</strong> that resonates with you. Perhaps pottery, textiles, or a specific region's crafts. Having focus helps build <strong>coherence and deeper knowledge</strong> over time.</p>
      
      <h3>Buy What You Love</h3>
      <p>The best collections are built on <strong>genuine passion</strong>, not investment potential. Buy pieces that speak to you, that you'll enjoy using or displaying. <strong>Quality over quantity</strong> is the golden rule.</p>
      
      <h3>Connect with Makers</h3>
      <p>Attend craft fairs, visit studios, and <strong>build relationships with artisans</strong>. Understanding their process and philosophy enriches your appreciation. Many collectors become <strong>patrons</strong>, supporting makers' continued work.</p>
      
      <h3>Document Your Collection</h3>
      <p>Keep records of where and when you acquired pieces, including <strong>maker information and stories</strong>. This documentation adds value and preserves the history of your collection for future generations.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80",
      "https://images.unsplash.com/photo-1487260211189-670c54da558d?w=800&q=80",
    ],
    category: "Customers",
    author: { name: "HandCraft Team" },
    tags: ["collecting", "guide", "passion"],
    published: true,
  },
  {
    title: "Glass Blowing: Dancing with Fire",
    description:
      "Master glass artist Rebecca reveals the mesmerizing process of shaping molten glass into art.",
    content: `
      <h2>The Ancient Art of Glass</h2>
      <p>Rebecca Hayes works with <strong>molten glass at 2,000°F</strong>, shaping it through a combination of breath, gravity, and tools. Glass blowing is a <strong>dance with fire</strong>—timing is everything, and there's no pause button.</p>
      
      <h3>The Gather and the Blow</h3>
      <p><strong>"You have seconds to make decisions,"</strong> Rebecca explains. She gathers molten glass from the furnace, shapes it while spinning her blowpipe, and uses <strong>breath, gravity, and centrifugal force</strong> to create forms. It's physically demanding work that requires <strong>strength, skill, and split-second timing</strong>.</p>
      
      <h3>Color and Technique</h3>
      <p>Colors come from <strong>metal oxides</strong> mixed into the glass. Cobalt creates blue, copper makes green, gold produces red. Rebecca layers colors, creates patterns, and uses techniques like <strong>murrini, latticino, and incalmo</strong> to achieve complex effects.</p>
      
      <h3>Functional and Sculptural</h3>
      <p>Her work ranges from <strong>functional bowls and vases</strong> to pure sculpture. Each piece must be <strong>annealed</strong>—slowly cooled over hours to relieve internal stresses. This ensures the glass won't crack as it reaches room temperature.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80",
    ],
    category: "Sellers",
    author: { name: "Rebecca Hayes" },
    tags: ["glass", "sculpture", "art"],
    published: true,
  },
  {
    title: "Natural Dyeing: Colors from Nature",
    description:
      "Textile artist Lisa shows how plants create stunning, sustainable colors for fabrics.",
    content: `
      <h2>Colors from the Earth</h2>
      <p>Lisa Martinez creates <strong>vibrant textile colors</strong> using only natural materials—plants, roots, bark, and minerals. Her dye garden is filled with <strong>indigo, madder, weld, and marigolds</strong>, each offering unique hues.</p>
      
      <h3>The Dyeing Process</h3>
      <p>Natural dyeing is <strong>chemistry and art combined</strong>. Lisa extracts colors by simmering plant materials, then treats fabrics with mordants like alum or iron to help colors bond. The same plant can yield <strong>different colors depending on mordant and technique</strong>.</p>
      
      <h3>Sustainable Beauty</h3>
      <p><strong>"These colors are alive,"</strong> Lisa says. They shift subtly over time, fade gracefully, and when fabric is composted, return harmlessly to earth. Unlike synthetic dyes, natural dyes have <strong>minimal environmental impact</strong>.</p>
      
      <h3>Unique Results</h3>
      <p>No two dye batches are identical. Seasonal variations, water quality, and timing all affect results. This variability isn't a flaw—it's <strong>the beauty of working with nature</strong>. Each piece is genuinely unique.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    ],
    category: "Sellers",
    author: { name: "Lisa Martinez" },
    tags: ["textiles", "dyeing", "sustainable"],
    published: true,
  },
  {
    title: "Bookbinding: Preserving Stories by Hand",
    description:
      "Traditional bookbinder Michael creates beautiful journals and restores precious volumes.",
    content: `
      <h2>The Art of the Book</h2>
      <p>Michael Foster's bindery smells of <strong>leather, paper, and glue</strong>—the scent of centuries of bookmaking tradition. He creates <strong>handbound journals, albums, and books</strong> using techniques unchanged for hundreds of years.</p>
      
      <h3>Materials and Methods</h3>
      <p>Michael works with <strong>archival papers, bookcloth, and fine leathers</strong>. He sews signatures by hand, creates custom endpapers, and decorates covers with <strong>gold tooling and embossing</strong>. Each book can take days or weeks to complete.</p>
      
      <h3>Restoration Work</h3>
      <p>Beyond creating new books, Michael <strong>restores damaged volumes</strong>—family Bibles, vintage books, personal diaries. <strong>"I'm a steward of stories,"</strong> he says. His careful repairs ensure books survive for future generations.</p>
      
      <h3>Built for Longevity</h3>
      <p>Michael's books are designed to last <strong>decades or centuries</strong>. He uses <strong>acid-free papers and archival adhesives</strong>, traditional sewn bindings that can be repaired, and materials that age gracefully. These aren't disposable notebooks—they're <strong>heirlooms in the making</strong>.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&q=80",
    ],
    category: "Sellers",
    author: { name: "Michael Foster" },
    tags: ["bookbinding", "paper", "restoration"],
    published: true,
  },
  {
    title: "Metalsmithing: Forging Functional Art",
    description:
      "Blacksmith Tom transforms raw steel into tools, hardware, and sculptural pieces.",
    content: `
      <h2>Working with Fire and Steel</h2>
      <p>Tom Bradley's forge glows <strong>orange-hot</strong> as he hammers steel into shape. A blacksmith for 15 years, he creates everything from <strong>custom door hardware to fireplace tools</strong> and decorative sculptures.</p>
      
      <h3>The Forge and the Hammer</h3>
      <p>Tom heats steel to <strong>critical temperatures</strong> where it becomes plastic and workable. On his anvil, he uses hammers and specialized tools to <strong>shape, texture, and refine</strong> the metal. It's physically demanding work requiring <strong>strength, timing, and precision</strong>.</p>
      
      <h3>Finish and Patina</h3>
      <p>After shaping, Tom applies finishes—<strong>oil, wax, or clear coat</strong>—to protect against rust while preserving the metal's character. Some pieces get a <strong>deliberate patina</strong> through chemical treatments, adding depth and visual interest.</p>
      
      <h3>Custom Commissions</h3>
      <p>Much of Tom's work is <strong>custom commissioned</strong>—clients seeking unique pieces for their homes. <strong>"Every project is collaboration,"</strong> he explains, working with clients to create pieces that fit their vision and space perfectly.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=800&q=80",
      "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?w=800&q=80",
    ],
    category: "Sellers",
    author: { name: "Tom Bradley" },
    tags: ["metalwork", "blacksmith", "custom"],
    published: true,
  },
  {
    title: "Soap Making: Natural Luxury for Everyday",
    description:
      "Artisan soap maker Anna creates skin-nourishing bars using traditional cold-process methods.",
    content: `
      <h2>The Chemistry of Soap</h2>
      <p>Anna Peterson makes <strong>handcrafted soap</strong> in small batches using the <strong>traditional cold-process method</strong>. Her soaps are made with <strong>natural oils, botanicals, and essential oils</strong>—no synthetic fragrances or harsh detergents.</p>
      
      <h3>Oils and Lye</h3>
      <p>Soap making is <strong>chemistry in action</strong>. Anna carefully measures oils—olive, coconut, shea butter—and combines them with lye solution. The mixture undergoes <strong>saponification</strong>, transforming into soap. After pouring into molds, bars cure for <strong>4-6 weeks</strong>.</p>
      
      <h3>Natural Ingredients</h3>
      <p>Anna adds <strong>botanicals, clays, and essential oils</strong> for color, texture, and scent. Lavender, peppermint, citrus—all from natural sources. <strong>"Your skin absorbs what you put on it,"</strong> she emphasizes. "Natural ingredients are gentler and healthier."</p>
      
      <h3>Sustainable Packaging</h3>
      <p>Her soaps come wrapped in <strong>recyclable paper bands</strong>—no plastic. She encourages customers to use every sliver, offering tips to extend soap life. It's luxury that's <strong>good for skin and planet</strong>.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    ],
    category: "Sellers",
    author: { name: "Anna Peterson" },
    tags: ["soap", "natural", "skincare"],
    published: true,
  },
  {
    title: "Paper Making: From Pulp to Unique Sheets",
    description:
      "Paper artist Sophia creates handmade paper embedded with flowers, leaves, and fibers.",
    content: `
      <h2>Creating Paper by Hand</h2>
      <p>Sophia Chang makes <strong>handcrafted paper sheets</strong> using traditional techniques. Each sheet is <strong>unique</strong>, often embedded with pressed flowers, plant fibers, or colored threads. Her papers become <strong>art, stationery, and special occasion materials</strong>.</p>
      
      <h3>The Pulping Process</h3>
      <p>Sophia starts with <strong>cotton fiber, plant materials, or recycled paper</strong>, breaking it down into pulp. She adds inclusions—<strong>flower petals, leaves, colored threads</strong>—then uses a mold and deckle to form sheets. Each sheet is <strong>pressed and dried</strong> over several days.</p>
      
      <h3>Botanical Inclusions</h3>
      <p><strong>"I press flowers from my garden,"</strong> Sophia explains. Forget-me-nots, lavender, ferns—preserved and embedded in paper. These botanical elements make each sheet <strong>one-of-a-kind</strong>, perfect for special invitations, art, or journaling.</p>
      
      <h3>Eco-Friendly Craft</h3>
      <p>Paper making uses <strong>minimal resources and recycles materials</strong>. Sophia's process is entirely sustainable—plant-based fibers, natural dyes, and water. Her papers are <strong>biodegradable</strong> and beautiful.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
    ],
    category: "Sellers",
    author: { name: "Sophia Chang" },
    tags: ["paper", "botanical", "sustainable"],
    published: true,
  },
  {
    title: "Candle Making: Light and Scent by Hand",
    description:
      "Artisan chandler Emily creates soy wax candles with essential oils and wooden wicks.",
    content: `
      <h2>The Art of the Candle</h2>
      <p>Emily Clark's candles are made with <strong>100% soy wax, wooden wicks, and essential oils</strong>. Unlike mass-produced paraffin candles, hers burn <strong>clean and long</strong>, filling spaces with natural fragrances.</p>
      
      <h3>Soy Wax Benefits</h3>
      <p>Soy wax is <strong>renewable, biodegradable, and burns slower</strong> than paraffin. It produces less soot and holds essential oils beautifully. Emily's candles <strong>last 40-60 hours</strong>, providing excellent value.</p>
      
      <h3>Scent Blending</h3>
      <p>Emily creates her own <strong>essential oil blends</strong>—lavender and vanilla for calm, citrus and mint for energy, cedarwood and sage for grounding. <strong>"Scent is powerful,"</strong> she notes. "It affects mood, memory, and space."</p>
      
      <h3>Crackling Wooden Wicks</h3>
      <p>Her wooden wicks create a soft <strong>crackling sound</strong> reminiscent of a fireplace. This adds an <strong>auditory element</strong> to the candle experience, making it more immersive and cozy.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80",
    ],
    category: "Sellers",
    author: { name: "Emily Clark" },
    tags: ["candles", "soy", "aromatherapy"],
    published: true,
  },
  {
    title: "Basket Weaving: Ancient Craft, Modern Uses",
    description:
      "Traditional basket weaver Karen shares techniques passed down through generations.",
    content: `
      <h2>The Woven Art</h2>
      <p>Karen White learned basket weaving from her grandmother, who learned from hers. She works with <strong>willow, reed, and sweetgrass</strong>, creating baskets that are both <strong>beautiful and functional</strong>.</p>
      
      <h3>Materials from Nature</h3>
      <p>Karen harvests <strong>willow from riverbanks</strong> and sources other materials sustainably. The materials must be <strong>soaked to become pliable</strong>, then woven while damp. As they dry, they tighten, creating strong structures.</p>
      
      <h3>Traditional Techniques</h3>
      <p>She uses techniques like <strong>coiling, plaiting, and twining</strong>—methods thousands of years old. Each technique creates different patterns and structures. <strong>"These methods have stood the test of time,"</strong> Karen says.</p>
      
      <h3>Functional Beauty</h3>
      <p>Karen's baskets serve practical purposes—<strong>storage, gathering, organization</strong>—while being visually striking. They're <strong>durable, sustainable alternatives</strong> to plastic containers, lasting decades with proper care.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1615092296061-e2ccfeb2f3d6?w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80",
      "https://images.unsplash.com/photo-1487700160041-babef9c3cb55?w=800&q=80",
    ],
    category: "Sellers",
    author: { name: "Karen White" },
    tags: ["baskets", "weaving", "traditional"],
    published: true,
  },
  {
    title: "The Maker Movement: Community and Creativity",
    description:
      "Exploring how maker spaces and craft communities are building connections and skills.",
    content: `
      <h2>A Return to Making</h2>
      <p>The <strong>maker movement</strong> is reviving traditional crafts while embracing modern technology. Across the globe, people are rediscovering the <strong>joy of creating with their hands</strong>.</p>
      
      <h3>Community Maker Spaces</h3>
      <p><strong>Maker spaces and craft cooperatives</strong> provide tools, instruction, and community. They're places where beginners learn from experts, where <strong>knowledge is shared freely</strong>, and where creativity flourishes.</p>
      
      <h3>Skills for Life</h3>
      <p>Learning crafts teaches <strong>patience, problem-solving, and pride in workmanship</strong>. In our screen-dominated world, making things by hand offers <strong>tangible results and genuine satisfaction</strong>.</p>
      
      <h3>Supporting Each Other</h3>
      <p>The maker community is remarkably <strong>supportive and collaborative</strong>. Makers share techniques, troubleshoot problems together, and celebrate each other's successes. It's creativity without competition.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80",
    ],
    category: "Customers",
    author: { name: "HandCraft Team" },
    tags: ["community", "maker-movement", "craft"],
    published: true,
  },
  {
    title: "Heirloom Quality: Investing in Pieces That Last",
    description:
      "Understanding the value of well-made handcrafted items that stand the test of time.",
    content: `
      <h2>Built to Last Generations</h2>
      <p><strong>Heirloom quality</strong> means objects made so well they <strong>last for decades or centuries</strong>. In our disposable culture, these pieces represent a return to valuing <strong>quality, craftsmanship, and longevity</strong>.</p>
      
      <h3>What Makes Something Heirloom Quality</h3>
      <p>It starts with <strong>exceptional materials</strong>—full-grain leather, solid hardwood, natural fibers, precious metals. Then comes <strong>expert construction</strong>—techniques that ensure structural integrity. Finally, <strong>timeless design</strong> that won't feel dated in 20 years.</p>
      
      <h3>The True Cost Comparison</h3>
      <p>An <strong>heirloom piece costs more upfront</strong> but less over time. A $200 handmade leather bag that lasts 30 years costs less per year than five $50 bags that last 2 years each. Plus, it gets <strong>more beautiful with age</strong>.</p>
      
      <h3>Emotional Value</h3>
      <p>Beyond economics, heirloom pieces carry <strong>stories and memories</strong>. They connect generations, becoming part of family history. This emotional value is <strong>immeasurable</strong>.</p>
    `,
    image:
      "https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
      "https://images.unsplash.com/photo-1520561805070-83c413349512?w=800&q=80",
    ],
    category: "Customers",
    author: { name: "HandCraft Team" },
    tags: ["quality", "investment", "heirloom"],
    published: true,
  },
];

export async function GET() {
  try {
    await connectDB();

    // Limpiar posts existentes
    await BlogPost.deleteMany({});

    // Insertar nuevos posts
    const result = await BlogPost.insertMany(blogPosts);

    return NextResponse.json({
      success: true,
      message: `Created ${result.length} blog posts`,
      posts: result,
    });
  } catch (error) {
    console.error("Error seeding blog posts:", error);
    return NextResponse.json(
      { success: false, message: "Error seeding blog posts" },
      { status: 500 }
    );
  }
}
