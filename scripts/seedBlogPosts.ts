// Script para poblar la base de datos con posts de blog de ejemplo
// Ejecutar: node --loader ts-node/esm scripts/seedBlogPosts.ts

import mongoose from "mongoose";
import { BlogPost } from "../lib/models/BlogPost";

const MONGODB_URL =
  process.env.MONGODB_URL ||
  "mongodb+srv://viszellechacon_db_user:iPLFh8N4XsrvRhTy@cluster0.eglihfo.mongodb.net/Handcrafted";

const blogPosts = [
  {
    title: "Discover How Roberta Creates Her Handcrafted Pieces",
    description:
      "Roberta shares the story behind her handcrafted creations, walking you through her design process from the first sketch to the final piece.",
    content: `
      <h2>The Journey of Creating Handcrafted Art</h2>
      <p>Roberta shares the story behind her handcrafted creations, walking you through her design process from the first sketch to the final piece. Discover the inspiration, techniques, and passion that make each creation truly unique and special.</p>
      
      <h3>Finding Inspiration</h3>
      <p>Every piece starts with an idea. Roberta finds inspiration in nature, traditional crafts, and the stories of her community. She spends hours sketching and refining her designs before starting the actual creation process.</p>
      
      <h3>The Creative Process</h3>
      <p>From selecting the finest materials to the final touches, Roberta's process is meticulous. She believes that quality craftsmanship takes time and dedication. Each piece is a labor of love that reflects her commitment to excellence.</p>
      
      <h3>Sharing the Art</h3>
      <p>Through Handcraft Haven, Roberta connects with customers who appreciate the value of handmade items. Every purchase supports not just her craft, but also helps preserve traditional artisan techniques for future generations.</p>
    `,
    image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b",
    category: "Sellers",
    author: { name: "Roberta Martinez", id: "seller_001" },
    tags: ["handcrafted", "artisan", "behind-the-scenes"],
    published: true,
  },
  {
    title: "The Art of Pottery: From Clay to Masterpiece",
    description:
      "Join ceramic artist Maria as she transforms simple clay into beautiful, functional art pieces that bring joy to everyday life.",
    content: `
      <h2>The Ancient Art of Pottery</h2>
      <p>Pottery is one of humanity's oldest crafts, and Maria continues this beautiful tradition with her unique modern twist. Each piece tells a story and serves a purpose in the homes of her customers.</p>
      
      <h3>Choosing the Right Clay</h3>
      <p>The foundation of great pottery starts with selecting quality clay. Maria sources her materials from local suppliers, ensuring sustainability and supporting her local community.</p>
      
      <h3>The Wheel and the Hand</h3>
      <p>Whether throwing on the wheel or hand-building, each technique offers unique possibilities. Maria combines both methods to create pieces that are both functional and beautiful.</p>
    `,
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261",
    category: "Sellers",
    author: { name: "Maria Chen", id: "seller_002" },
    tags: ["pottery", "ceramics", "handmade"],
    published: true,
  },
  {
    title: "Supporting Small Businesses: Why It Matters",
    description:
      "Learn how your purchases on Handcraft Haven directly impact artisan communities and help preserve traditional crafts.",
    content: `
      <h2>The Power of Your Purchase</h2>
      <p>Every item you buy from Handcraft Haven does more than add beauty to your home—it supports real people, preserves traditional skills, and strengthens communities.</p>
      
      <h3>Economic Impact</h3>
      <p>When you buy from small artisans, your money goes directly to the creator. This helps them support their families, invest in their craft, and continue creating beautiful work.</p>
      
      <h3>Preserving Heritage</h3>
      <p>Many of our artisans practice crafts passed down through generations. Your support helps keep these valuable traditions alive for future generations to enjoy and learn from.</p>
    `,
    image: "https://images.unsplash.com/photo-1556740758-90de374c12ad",
    category: "Customers",
    author: { name: "HandCraft Team" },
    tags: ["community", "impact", "support"],
    published: true,
  },
  {
    title: "Textile Weaving: A Story in Every Thread",
    description:
      "Explore the intricate world of textile weaving with artisan Sarah, who creates stunning fabrics using traditional looms.",
    content: `
      <h2>The Loom and the Thread</h2>
      <p>Sarah's textile work combines traditional weaving techniques with contemporary designs. Each piece requires hours of careful work, but the results are stunning textiles that last for generations.</p>
      
      <h3>Learning the Craft</h3>
      <p>Sarah learned weaving from her grandmother, who learned from her mother. This generational knowledge creates textiles with depth and character that machine-made fabrics simply can't replicate.</p>
      
      <h3>Sustainable Fashion</h3>
      <p>In a world of fast fashion, Sarah's slow, deliberate approach to textile creation offers a sustainable alternative. Her fabrics are made to last and designed to be cherished.</p>
    `,
    image: "https://images.unsplash.com/photo-1558769132-cb1aea3c8e8e",
    category: "Sellers",
    author: { name: "Sarah Thompson", id: "seller_003" },
    tags: ["textiles", "weaving", "sustainable"],
    published: true,
  },
  {
    title: "Jewelry Making: Crafting Wearable Art",
    description:
      "Discover how Elena transforms precious metals and stones into unique jewelry pieces that tell personal stories.",
    content: `
      <h2>The Art of Adornment</h2>
      <p>Elena's jewelry isn't just accessories—each piece is wearable art designed to be meaningful and personal. From engagement rings to everyday pieces, her work celebrates life's special moments.</p>
      
      <h3>Designing with Purpose</h3>
      <p>Every piece begins with understanding the customer's story. Elena creates custom designs that reflect individual personalities and commemorate important life events.</p>
      
      <h3>Quality Materials</h3>
      <p>Using ethically sourced metals and stones, Elena ensures her jewelry is as responsible as it is beautiful. Quality materials mean pieces that last a lifetime.</p>
    `,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338",
    category: "Sellers",
    author: { name: "Elena Rodriguez", id: "seller_004" },
    tags: ["jewelry", "metalwork", "custom"],
    published: true,
  },
  {
    title: "How to Care for Your Handcrafted Items",
    description:
      "Expert tips on maintaining and preserving your handmade treasures so they last for generations.",
    content: `
      <h2>Preserving Handcrafted Beauty</h2>
      <p>Handcrafted items require special care to maintain their beauty. Here are essential tips for keeping your artisan pieces in perfect condition.</p>
      
      <h3>General Care Guidelines</h3>
      <p>Avoid harsh chemicals, extreme temperatures, and excessive moisture. Most handcrafted items prefer gentle cleaning and proper storage.</p>
      
      <h3>Material-Specific Care</h3>
      <p>Different materials require different care. Ceramics, textiles, metals, and wood each have unique needs. Always follow the artisan's care instructions.</p>
    `,
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b",
    category: "Customers",
    author: { name: "HandCraft Team" },
    tags: ["care", "maintenance", "tips"],
    published: true,
  },
  {
    title: "Woodworking: Bringing Nature into Your Home",
    description:
      "Carpenter James shares his passion for creating functional art from sustainably sourced wood.",
    content: `
      <h2>Working with Wood</h2>
      <p>James's woodworking brings the warmth and beauty of nature into modern homes. Each piece showcases the natural grain and character of carefully selected wood.</p>
      
      <h3>Sustainable Sourcing</h3>
      <p>All wood is sourced from sustainable forests or reclaimed from old structures. This practice honors both the environment and the history of the materials.</p>
      
      <h3>Functional Beauty</h3>
      <p>From furniture to decorative pieces, James creates items that are both beautiful and practical, designed to be used and loved daily.</p>
    `,
    image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b",
    category: "Sellers",
    author: { name: "James Wilson", id: "seller_005" },
    tags: ["woodworking", "furniture", "sustainable"],
    published: true,
  },
  {
    title: "The Perfect Gift: Choosing Handcrafted",
    description:
      "Why handcrafted gifts are more meaningful and how to select the perfect piece for your loved ones.",
    content: `
      <h2>Gifts That Matter</h2>
      <p>Handcrafted gifts carry meaning that mass-produced items simply can't match. They show thoughtfulness, support artisans, and create lasting memories.</p>
      
      <h3>Understanding Quality</h3>
      <p>Learn to recognize quality craftsmanship and understand why handmade items are worth the investment. Quality lasts and becomes more valuable over time.</p>
      
      <h3>Personalization Options</h3>
      <p>Many artisans offer customization, making your gift truly one-of-a-kind. This personal touch makes handcrafted gifts extra special.</p>
    `,
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a",
    category: "Customers",
    author: { name: "HandCraft Team" },
    tags: ["gifts", "shopping", "guide"],
    published: true,
  },
  {
    title: "Leatherwork: Timeless Craft for Modern Life",
    description:
      "Master leather artisan David creates durable, beautiful leather goods that improve with age.",
    content: `
      <h2>The Beauty of Leather</h2>
      <p>David's leatherwork combines traditional techniques with contemporary design. Each piece develops a unique patina over time, becoming more beautiful with use.</p>
      
      <h3>Quality Leather</h3>
      <p>Using only premium, ethically sourced leather, David ensures each piece will last for decades. Proper leather goods are investments that pay dividends in durability and style.</p>
      
      <h3>Handstitched Excellence</h3>
      <p>Every stitch is done by hand using traditional saddle stitching techniques. This method creates seams that are stronger than machine stitching.</p>
    `,
    image: "https://images.unsplash.com/photo-1520561805070-83c413349512",
    category: "Sellers",
    author: { name: "David Anderson", id: "seller_006" },
    tags: ["leather", "craftsmanship", "accessories"],
    published: true,
  },
  {
    title: "Building a Collection: Starting Your Handcraft Journey",
    description:
      "Tips for new collectors on building a meaningful collection of handcrafted art and functional items.",
    content: `
      <h2>Starting Your Collection</h2>
      <p>Building a collection of handcrafted items is a rewarding journey. Here's how to start curating pieces that you'll treasure for years to come.</p>
      
      <h3>Follow Your Passion</h3>
      <p>Collect what speaks to you. Whether it's pottery, textiles, or jewelry, let your personal taste guide your choices.</p>
      
      <h3>Research Artisans</h3>
      <p>Learn about the creators behind the work. Understanding their process and story adds depth to your collection.</p>
      
      <h3>Invest Wisely</h3>
      <p>Quality handcrafted items hold their value and often appreciate over time. Buy the best quality you can afford.</p>
    `,
    image: "https://images.unsplash.com/photo-1544967082-d9d25d867d66",
    category: "Customers",
    author: { name: "HandCraft Team" },
    tags: ["collecting", "guide", "investment"],
    published: true,
  },
];

async function seedBlogPosts() {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("✅ Connected to MongoDB");

    // Limpiar posts existentes (opcional)
    await BlogPost.deleteMany({});
    console.log("🗑️  Cleared existing posts");

    // Insertar nuevos posts
    const result = await BlogPost.insertMany(blogPosts);
    console.log(`✅ Created ${result.length} blog posts`);

    console.log("\n📝 Blog posts created:");
    result.forEach((post, index) => {
      console.log(`${index + 1}. ${post.title} (${post.category})`);
    });

    await mongoose.connection.close();
    console.log("\n✅ Done!");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

seedBlogPosts();
