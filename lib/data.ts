// USERS
const users =[
  {
    "_id": "69211ed4758610b8abeb5e73",
    "fullName": "Ariana Lopez",
    "email": "ariana.jewelry@example.com",
    "password": "123456",
    "image": "https://res.cloudinary.com/dttbqvomc/image/upload/v1763775284/Imagen_de_WhatsApp_2025-11-21_a_las_19.02.59_25f0cf0b_ywka6c.jpg"
  },
  {
    "_id": "69211ed4758610b8abeb5e74",
    "fullName": "Daniel Rodriguez",
    "email": "daniel.homedecor@example.com",
    "password": "123456",
    "image": "https://res.cloudinary.com/dttbqvomc/image/upload/v1763775283/2148096439_t0v5b3.jpg"
  },
  {
    "_id": "69211ed4758610b8abeb5e75",
    "fullName": "Marisol Vega",
    "email": "marisol.textile@example.com",
    "password": "123456",
    "image": "https://res.cloudinary.com/dttbqvomc/image/upload/v1763775282/Imagen_de_WhatsApp_2025-11-21_a_las_19.51.22_96dd9063_xn5ekv.jpg"
  },
  {
    "_id": "69211ed4758610b8abeb5e76",
    "fullName": "Carolina Suarez",
    "email": "carolina.accessories@example.com",
    "password": "123456",
    "image": "https://res.cloudinary.com/dttbqvomc/image/upload/v1763775283/13870_qupbxp.jpg"
  },
  {
    "_id": "69211ed4758610b8abeb5e77",
    "fullName": "Leonardo Perez",
    "email": "leonardo.art@example.com",
    "password": "123456",
    "image": "https://res.cloudinary.com/dttbqvomc/image/upload/v1763775283/2149443790_mgedit.jpg"
  },
  {
    "_id": "69211ed4758610b8abeb5e78",
    "fullName": "Daniel Schmidt",
    "email": "daniel.schmidt@example.com",
    "password": "123456",
    "image": "https://res.cloudinary.com/dttbqvomc/image/upload/v1763775283/244121808_10879746_uti8hq.jpg"
  },
  {
    "_id": "69211ed4758610b8abeb5e79",
    "fullName": "Hana Takahashi",
    "email": "hana.takahashi@example.com",
    "password": "123456",
    "image": "https://res.cloudinary.com/dttbqvomc/image/upload/v1763775283/2151098592_xnbgpl.jpg"
  },
  {
    "_id": "69211ed4758610b8abeb5e7a",
    "fullName": "Michael Johnson",
    "email": "michael.johnson@example.com",
    "password": "123456",
    "image": "https://res.cloudinary.com/dttbqvomc/image/upload/v1763775282/17344_y9k0q1.jpg"
  },
  {
    "_id": "69211ed4758610b8abeb5e7b",
    "fullName": "Sofia Romano",
    "email": "sofia.romano@example.com",
    "password": "123456",
    "image": "https://res.cloudinary.com/dttbqvomc/image/upload/v1763775732/10725_d2n24x.jpg"
  },
  {
    "_id": "69211ed4758610b8abeb5e7c",
    "fullName": "Elena Petrova",
    "email": "elena.petrova@example.com",
    "password": "123456",
    "image": "https://res.cloudinary.com/dttbqvomc/image/upload/v1763775283/2149419444_tbxarg.jpg"
  },
  {
    "_id": "69211ed4758610b8abeb5e7d",
    "fullName": "James Carter",
    "email": "james.carter@example.com",
    "password": "123456",
    "image": "https://res.cloudinary.com/dttbqvomc/image/upload/v1763775282/Imagen_de_WhatsApp_2025-11-21_a_las_19.51.22_7f077f9a_ixfqkq.jpg"
  },
  {
    "_id": "69211ed4758610b8abeb5e7e",
    "fullName": "Priya Nair",
    "email": "priya.nair@example.com",
    "password": "123456",
    "image": "https://res.cloudinary.com/dttbqvomc/image/upload/v1763775283/Imagen_de_WhatsApp_2025-11-21_a_las_19.02.58_7fe30e40_ezltfu.jpg"
  }
]


//Sellers

const sellersProfiles =[
  {
    "userId": "69211ed4758610b8abeb5e73",
    "shopName": "Ariana's Fine Jewelry",
    "bio": "Handmade jewelry inspired by elegance and minimalism.",
    "profileImage": "https://res.cloudinary.com/dttbqvomc/image/upload/v1763776965/DSC_0230_1_1_xzmvq2.webp",
    "country": "Venezuela",
    "specialties": ["Jewelry"],
    "rating": 4.8,
    "totalSales": 230,
    "reviews": []
  },
  {
    "userId": "69211ed4758610b8abeb5e74",
    "shopName": "Rodriguez Home Art",
    "bio": "Warm, cozy, and stylish home decor pieces.",
    "profileImage": "https://res.cloudinary.com/dttbqvomc/image/upload/v1763777026/5d8be15e3dfbd_kg9zyy.jpg",
    "country": "Colombia",
    "specialties": ["Home-Decor"],
    "rating": 4.6,
    "totalSales": 180,
    "reviews": []
  },
  {
    "userId": "69211ed4758610b8abeb5e75",
    "shopName": "Marisol Textiles",
    "bio": "Colorful handmade textiles inspired by Latin tradition.",
    "profileImage": "https://res.cloudinary.com/dttbqvomc/image/upload/v1763777073/artesanas-tejido1_e4meul.jpg",
    "country": "Peru",
    "specialties": ["Textile"],
    "rating": 4.9,
    "totalSales": 320,
    "reviews": []
  },
  {
    "userId": "69211ed4758610b8abeb5e76",
    "shopName": "Carolina's Accessories",
    "bio": "Trendy accessories designed for daily style.",
    "profileImage": "https://res.cloudinary.com/dttbqvomc/image/upload/v1763777129/DSC_0020-FI_gxxbih.jpg",
    "country": "Mexico",
    "specialties": ["Accessories"],
    "rating": 4.5,
    "totalSales": 150,
    "reviews": []
  },
  {
    "userId": "69211ed4758610b8abeb5e77",
    "shopName": "Perez Art Studio",
    "bio": "Unique paintings and artistic pieces.",
    "profileImage": "https://res.cloudinary.com/dttbqvomc/image/upload/v1763777227/artista-mujer-pintando-estudio_1303-11428_eve0sf.avif",
    "country": "Argentina",
    "specialties": ["Art"],
    "rating": 4.7,
    "totalSales": 210,
    "reviews": []
  },
  {
    "userId": "69211ed4758610b8abeb5e78",
    "shopName": "Schmidt Woodcraft",
    "bio": "European-inspired wood furniture and decor.",
    "profileImage": "https://res.cloudinary.com/dttbqvomc/image/upload/v1763777286/DecoracionArtesanal_4_ifhllv.jpg",
    "country": "Germany",
    "specialties": ["Home-Decor"],
    "rating": 4.8,
    "totalSales": 340,
    "reviews": []
  },
  {
    "userId": "69211ed4758610b8abeb5e7a",
    "shopName": "Hana Textile Studio",
    "bio": "Soft and premium-textile creations with Japanese influence.",
    "profileImage": "https://res.cloudinary.com/dttbqvomc/image/upload/v1763777329/artesano-hilos-coloridos-artesania_mrlunb.webp",
    "country": "India",
    "specialties": ["Textile"],
    "rating": 4.9,
    "totalSales": 295,
    "reviews": []
  },
  {
    "userId": "69210f58758610b8abeb5e25",
    "shopName": "MJ Accessories",
    "bio": "Modern accessories for women and men.",
    "profileImage": "https://res.cloudinary.com/dttbqvomc/image/upload/v1763777405/DSC_0017-FI_b7jgj6.jpg",
    "country": "USA",
    "specialties": ["Accessories"],
    "rating": 4.6,
    "totalSales": 175,
    "reviews": []
  },
  {
    "userId": "69211ed4758610b8abeb5e7b",
    "shopName": "Romano Ceramics",
    "bio": "Colorful ceramic art handmade in Italy.",
    "profileImage": "https://res.cloudinary.com/dttbqvomc/image/upload/v1763777474/pintor-dibujando-cuadro-taller_23-2148185853_ws1eig.avif",
    "country": "Italy",
    "specialties": ["Art"],
    "rating": 4.9,
    "totalSales": 410,
    "reviews": []
  },
  {
    "userId": "69211ed4758610b8abeb5e7c",
    "shopName": "Petrova Home Gallery",
    "bio": "Luxury home decor with Eastern European flair.",
    "profileImage": "https://res.cloudinary.com/dttbqvomc/image/upload/v1763777753/66ebf7bbf127667095021665_jewelry_2_lug0ks.webp",
    "country": "Russia",
    "specialties": ["Jewelry"],
    "rating": 4.7,
    "totalSales": 260,
    "reviews": []
  },
  {
    "userId": "69211ed4758610b8abeb5e7d",
    "shopName": "Carter’s Creative Shop",
    "bio": "Artwork and customized handmade gifts.",
    "profileImage": "https://res.cloudinary.com/dttbqvomc/image/upload/v1763777715/hombre-pintando-casa_23-2148017490_jgxpny.avif",
    "country": "USA",
    "specialties": ["Art"],
    "rating": 4.5,
    "totalSales": 198,
    "reviews": []
  },
  {
    "userId": "69211ed4758610b8abeb5e7e",
    "shopName": "Priya Design Studio",
    "bio": "Elegant accessories inspired by Indian culture.",
    "profileImage": "https://res.cloudinary.com/dttbqvomc/image/upload/v1763777808/accesorios-tita_x9jiok.jpg",
    "country": "India",
    "specialties": ["Accessories"],
    "rating": 4.9,
    "totalSales": 370,
    "reviews": []
  }
]


// Products data

  // seller 1
  const seller1Products = [
  {
    "sellerId": "69211ed4758610b8abeb5e73",
    "title": "Golden Leaf Necklace",
    "description": "A delicate 18k gold-plated necklace featuring a minimalist leaf pendant crafted for everyday elegance.",
    "price": 45.99,
    "images": [
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763779505/il_794xN.3898175447_fyjb_ovzecs.webp",
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763779509/il_794xN.4214147463_gifk_rwptzw.webp"
    ],
    "categoryId": "6920e4c01eef40052ea9de9c",
    "quantity": 50,
    "variants": [
      { "color": "Gold", "material": "18k Gold-plated" }
    ],
    "isCustomOrder": false,
    "dimensions": "45cm chain length",
    "shippingMethods": ["Standard", "Express"]
  },
  {
    "sellerId": "69211ed4758610b8abeb5e73",
    "title": "Minimalist Silver Ring",
    "description": "Sterling silver band ring with a sleek modern finish, perfect for stacking or wearing alone.",
    "price": 29.50,
    "images": [
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763779504/il_794xN.3827218473_ndmx_onhagm.webp",
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763779503/il_794xN.3588311182_g05y_m9ou3v.webp"
    ],
    "categoryId": "6920e4c01eef40052ea9de9c",
    "quantity": 120,
    "variants": [
      { "size": "6" },
      { "size": "7" },
      { "size": "8" }
    ],
    "isCustomOrder": false,
    "dimensions": "2mm width",
    "shippingMethods": ["Standard"]
  },
  {
    "sellerId": "69211ed4758610b8abeb5e73",
    "title": "Pearl Drop Earrings",
    "description": "Elegant freshwater pearl earrings designed with hypoallergenic hooks for comfort and style.",
    "price": 38.99,
    "images": [
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763779507/il_794xN.4180025955_8owa_mokjx4.webp",
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763779514/il_794xN.5071928561_emmq_dzgzxx.webp"
    ],
    "categoryId": "6920e4c01eef40052ea9de9c",
    "quantity": 85,
    "variants": [
      { "color": "White Pearl", "material": "Freshwater Pearl" }
    ],
    "isCustomOrder": false,
    "dimensions": "2.5cm drop",
    "shippingMethods": ["Standard", "Premium"]
  },
  {
    "sellerId": "69211ed4758610b8abeb5e73",
    "title": "Emerald Charm Bracelet",
    "description": "Handcrafted bracelet featuring emerald charms and gold-plated links, ideal for gifting.",
    "price": 59.00,
    "images": [
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763779510/il_794xN.4516590110_a9ic_rjxw8f.webp",
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763779514/il_794xN.4563991615_5rcb_u4vvu0.webp"
    ],
    "categoryId": "6920e4c01eef40052ea9de9c",
    "quantity": 40,
    "variants": [
      { "color": "Green", "material": "Emerald Stone" }
    ],
    "isCustomOrder": false,
    "dimensions": "18cm adjustable length",
    "shippingMethods": ["Standard", "Express"]
  },
  {
    "sellerId": "69211ed4758610b8abeb5e73",
    "title": "Personalized Name Necklace",
    "description": "Custom gold-plated necklace featuring a personalized name pendant, crafted with premium materials.",
    "price": 65.00,
    "images": [
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763779469/il_794xN.6471752679_h1ll_qbkeun.webp",
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763779514/il_794xN.6471859575_9vyv_hoagyy.webp"
    ],
    "categoryId": "6920e4c01eef40052ea9de9c",
    "quantity": 0,
    "variants": [
      { "color": "Gold", "material": "Stainless Steel Gold-plated" }
    ],
    "isCustomOrder": true,
    "dimensions": "50cm chain",
    "shippingMethods": ["Standard"]
  }
]

const seller2Products = [
  {
    "sellerId": "69211ed4758610b8abeb5e74",
    "title": "Handwoven Rattan Wall Mirror",
    "description": "A boho-style rattan wall mirror that adds warmth and texture to any room. Handcrafted with durable natural fibers.",
    "price": 79.99,
    "images": [
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763780645/il_794xN.7192923312_p2sb_lwoqji.webp",
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763780662/il_794xN.7240901101_j517_rbd7so.webp"
    ],
    "categoryId": "6920e4c01eef40052ea9de9d",
    "quantity": 25,
    "variants": [
      { "size": "40cm" },
      { "size": "50cm" }
    ],
    "isCustomOrder": false,
    "dimensions": "40–50 cm diameter",
    "shippingMethods": ["Standard", "Express"]
  },
  {
    "sellerId": "69211ed4758610b8abeb5e74",
    "title": "Rustic Wooden Candle Holders (Set of 3)",
    "description": "A handcrafted set of rustic wooden candle holders, perfect for adding a cozy ambiance to living rooms, bedrooms, or dining tables.",
    "price": 34.99,
    "images": [
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763780653/il_794xN.7405210049_qgid_iweieu.webp",
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763780651/il_794xN.7357291186_mqzy_i94fkg.webp",
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763780650/il_794xN.7356941792_11wb_cilsnu.webp"
    ],
    "categoryId": "6920e4c01eef40052ea9de9d",
    "quantity": 60,
    "variants": [
      { "color": "Natural Wood" }
    ],
    "isCustomOrder": false,
    "dimensions": "Small–20cm, Medium–25cm, Large–30cm",
    "shippingMethods": ["Standard"]
  },
  {
    "sellerId": "69211ed4758610b8abeb5e74",
    "title": "Minimalist Cotton Throw Blanket",
    "description": "A soft, breathable cotton throw blanket with a fringe finish. Ideal for sofas, bedrooms, and cozy evenings.",
    "price": 49.99,
    "images": [
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763780645/il_794xN.7086831969_25o5_azxtnd.webp",
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763780641/il_794xN.7038869092_ca6y_uhbim8.webp",
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763780645/il_794xN.7086833347_d17n_gp4xdx.webp"
    ],
    "categoryId": "6920e4c01eef40052ea9de9d",
    "quantity": 80,
    "variants": [
      { "color": "Beige" },
      { "color": "Gray" }
    ],
    "isCustomOrder": false,
    "dimensions": "130cm x 180cm",
    "shippingMethods": ["Standard", "Premium"]
  },
  {
    "sellerId": "69211ed4758610b8abeb5e74",
    "title": "Ceramic Decorative Vase",
    "description": "Elegant matte ceramic vase suitable for dried flowers, pampas, or as an aesthetic standalone decor piece.",
    "price": 55.00,
    "images": [
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763780639/il_794xN.6533275228_7uf4_gckhos.webp",
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763780639/il_794xN.6581392789_q05m_mdt0fz.webp"
    ],
    "categoryId": "6920e4c01eef40052ea9de9d",
    "quantity": 40,
    "variants": [
      { "color": "Matte White" }
      
    ],
    "isCustomOrder": false,
    "dimensions": "30cm height",
    "shippingMethods": ["Standard", "Express"]
  },
  {
    "sellerId": "69211ed4758610b8abeb5e74",
    "title": "Handcrafted Ceramic Table Bowl",
    "description": "A handcrafted ceramic bowl with a matte textured finish. Perfect as a centerpiece for dining tables, coffee tables, or for holding fruits and decorative items.",
    "price": 58.50,
    "images": [
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763780635/il_794xN.5401900247_jn2j_epnueo.avif",
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763780634/il_794xN.5361569146_e96n_n8nn9e.avif",
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763780634/il_794xN.5353766568_iw6c_qmo4wu.avif"
    ],
    "categoryId": "6920e4c01eef40052ea9de9d",
    "quantity": 50,
    "variants": [
      { "color": "Matte Black" }
    ],
    "isCustomOrder": false,
    "dimensions": "28cm diameter x 10cm height",
    "shippingMethods": ["Standard", "Express"]
  }

]

const seller3Products = [
  {
    "sellerId": "69211ed4758610b8abeb5e75",
    "title": "Handwoven Andean Throw Blanket",
    "description": "Soft alpaca-blend throw blanket handmade with traditional Andean patterns. Ideal for sofas, bedrooms, or cozy reading corners.",
    "price": 89.99,
    "images": [
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763781816/il_794xN.7184055345_af0p_xy22b5.avif",
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763781815/il_794xN.7184055343_kfoj_f1aqqo.avif",
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763781813/il_794xN.7136079192_3ktg_iqg6sq.avif"
    ],
    "categoryId": "6920e4c01eef40052ea9de9e",
    "quantity": 40,
    "variants": [
      { "color": "Earth Tones" }
    ],
    "isCustomOrder": true,
    "dimensions": "140cm x 180cm",
    "shippingMethods": ["Standard", "Express"]
  },
  {
    "sellerId": "69211ed4758610b8abeb5e75",
    "title": "Handwoven Cushion Cover Set",
    "description": "Set of two cushion covers made with Peruvian cotton, decorated with colorful geometric ancestral patterns.",
    "price": 45.0,
    "images": [
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763781799/il_794xN.3984987792_iv1h_mh9pw0.avif",
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763781798/il_794xN.3984987352_6gv0_pyjt0a.avif"
    ],
    "categoryId": "6920e4c01eef40052ea9de9e",
    "quantity": 55,
    "variants": [
      { "size": "45x45 cm" }
    ],
    "isCustomOrder": false,
    "dimensions": "45cm x 45cm",
    "shippingMethods": ["Standard"]
  },
  {
    "sellerId": "69211ed4758610b8abeb5e75",
    "title": "Alpaca Wool Scarf",
    "description": "Lightweight yet warm handmade alpaca scarf. Perfect for winter or stylish outfits.",
    "price": 39.5,
    "images": [
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763781808/il_794xN.4877252645_rn87_pibaut.avif",
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763781802/il_794xN.4429414476_96iu_bp2twy.avif",
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763781805/il_794xN.4877251979_jsod_ejlf6a.avif"
    ],
    "categoryId": "6920e4c01eef40052ea9de9e",
    "quantity": 80,
    "variants": [
      { "color": "Grey" },
      { "color": "Coral" },
      { "color": "Beige" },
      { "color": "light Blue" }
    ],
    "isCustomOrder": false,
    "dimensions": "30cm x 180cm",
    "shippingMethods": ["Standard", "Express"]
  },
  {
    "sellerId": "69211ed4758610b8abeb5e75",
    "title": "Traditional Peruvian Table Runner",
    "description": "Handwoven table runner featuring bright Peruvian motifs. Adds color and warmth to any dining table.",
    "price": 34.99,
    "images": [
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763781811/il_794xN.6920122419_cxpw_fm9n8o.avif",
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763781810/il_794xN.6872143662_d1af_fs4xpr.avif"
    ],
    "categoryId": "6920e4c01eef40052ea9de9e",
    "quantity": 60,
    "variants": [
      { "length": "150cm" },
      { "length": "180cm" }
    ],
    "isCustomOrder": true,
    "dimensions": "150–180 cm length",
    "shippingMethods": ["Standard"]
  },
  {
    "sellerId": "69211ed4758610b8abeb5e75",
    "title": "Hand Loomed Tote Bag",
    "description": "Durable handmade tote bag crafted from Peruvian cotton with traditional loom weaving patterns.",
    "price": 52.0,
    "images": [
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763781819/il_794xN.7380192536_4qt0_phon9r.avif",
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763781820/il_794xN.7380209428_64h9_gjm1g9.jpg"
    ],
    "categoryId": "6920e4c01eef40052ea9de9e",
    "quantity": 45,
    "variants": [
      { "color": "Cream" }
    ],
    "isCustomOrder": false,
    "dimensions": "40cm x 35cm",
    "shippingMethods": ["Standard", "Express"]
  }
]

const seller4Products = [
  {
    "sellerId": "69211ed4758610b8abeb5e76",
    "title": "Handcrafted Beaded Bracelet",
    "description": "Colorful beaded bracelet handmade with natural stones and glass beads — perfect to add a pop of color to any outfit.",
    "price": 25.99,
    "images": [
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763783424/il_794xN.5009846576_33wf_pbxdpf.webp",
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763783432/il_794xN.6212380934_z2bh_egco7z.webp"
    ],
    "categoryId": "6920e4c01eef40052ea9de9f",
    "quantity": 100,
    "variants": [
      { "color": "Turquoise" },
      { "color": "Pink" },
      { "color": "Multicolored" }
    ],
    "isCustomOrder": false,
    "dimensions": "7.5 cm inner circumference",
    "shippingMethods": ["Standard", "Express"]
  },
  {
    "sellerId": "69211ed4758610b8abeb5e76",
    "title": "Leather Tassel Keychain",
    "description": "Premium genuine leather tassel keychain in a variety of colors. Adds style and functionality to your keys or bag.",
    "price": 14.50,
    "images": [
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763783426/il_794xN.5916400426_m3ls_hfx89u.webp",
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763783424/il_794xN.5916398428_ljrk_t8qo1j.webp",
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763783429/il_794xN.5964487155_mso7_g93yce.webp"
    ],
    "categoryId": "6920e4c01eef40052ea9de9f",
    "quantity": 200,
    "variants": [
      { "color": "Black" },
      { "color": "Mustard" },
      { "color": "Burgundy" },
      { "color": "Gold" },
      { "color": "Silver" },
      { "color": "Blue" }
    ],
    "isCustomOrder": false,
    "dimensions": "10 cm tassel length",
    "shippingMethods": ["Standard"]
  },
  {
    "sellerId": "69211ed4758610b8abeb5e76",
    "title": "Minimalist Laptop Sleeve",
    "description": "Slim and water-resistant laptop sleeve made with padded microfiber. Perfect for students and professionals who want lightweight protection.",
    "price": 32.99,
    "images": [
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763783442/il_794xN.7264095748_6144_fismot.webp",
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763783445/il_794xN.7264095832_jl2s_mlfxh5.webp",
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763783441/il_794xN.7264095388_2swi_y0nx2y.webp"
    ],
    "categoryId": "6920e4c01eef40052ea9de9f",
    "quantity": 85,
    "variants": [
      { "color": "Blue" },
      { "color": "Gray" },
      { "color": "Orange" },
      { "color": "Green" },
      { "color": "Dark Gray" },
      { "color": "Blue" }
    ],
    "isCustomOrder": false,
    "dimensions": "Available in 13'' and 15''",
    "shippingMethods": ["Standard", "Express"]
  },
  {
    "sellerId": "69211ed4758610b8abeb5e76",
    "title": "Leather Desk Pad",
    "description": "Elegant PU-leather desk pad that protects your workspace and provides a smooth writing and mouse-friendly surface.",
    "price": 27.50,
    "images": [
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763783431/il_794xN.6200003921_epgd_1_wgkucg.webp",
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763783438/il_794xN.7232953406_n3wo_ixu7uw.webp"
    ],
    "categoryId": "6920e4c01eef40052ea9de9f",
    "quantity": 120,
    "variants": [
      { "color": "Black" },
      { "color": "Chestnut Brown" },
      { "color": "Light Cream" }
    ],
    "isCustomOrder": false,
    "dimensions": "80 × 40 cm",
    "shippingMethods": ["Standard"]
  },
  {
    "sellerId": "69211ed4758610b8abeb5e76",
    "title": "Canvas Tote Bag for Work & Study",
    "description": "Durable canvas tote bag with internal pockets. Ideal for carrying books, laptops, planners, and daily essentials.",
    "price": 22.99,
    "images": [
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763783437/il_794xN.7188169485_aa3h_jwgoiu.webp",
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763783435/il_794xN.7140188988_g0j9_vmb6tt.webp"
    ],
    "categoryId": "6920e4c01eef40052ea9de9f",
    "quantity": 160,
    "variants": [
      { "color": "Beige" },
      { "color": "Black" }
    ],
    "isCustomOrder": false,
    "dimensions": "38 × 42 cm",
    "shippingMethods": ["Standard", "Express"]
  }

]

const seller5Products = [
  {
    "sellerId": "69211ed4758610b8abeb5e77",
    "title": "Abstract Sunrise Canvas",
    "description": "A vibrant abstract painting inspired by sunrise colors, perfect for living rooms, studios, or offices.",
    "price": 120.00,
    "images": [
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763784214/il_794xN.7031333592_fy91_yyxts3.webp",
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763784211/il_794xN.7031275280_jstg_z01fd4.webp"
    ],
    "categoryId": "6920e4c01eef40052ea9dea0",
    "quantity": 8,
    "variants": [
      { "size": "40x50 cm" },
      { "size": "60x80 cm" }
    ],
    "isCustomOrder": true,
    "dimensions": "Available in multiple canvas sizes",
    "shippingMethods": ["Standard", "Express"]
  },

  {
    "sellerId": "69211ed4758610b8abeb5e77",
    "title": "Modern Line Art Portrait",
    "description": "Minimalist line art portrait printed on high-quality matte paper. Ideal for modern decor lovers.",
    "price": 45.00,
    "images": [
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763784216/il_794xN.7117176571_l9ub_vuxvru.webp",
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763784207/il_794xN.6230817898_foeg_dicyvo.webp"
    ],
    "categoryId": "6920e4c01eef40052ea9dea0",
    "quantity": 25,
    "variants": [
      { "size": "A4" },
      { "size": "A3" },
      { "size": "A2" }
    ],
    "isCustomOrder": true,
    "dimensions": "A4, A3, A2",
    "shippingMethods": ["Standard"]
  },

  {
    "sellerId": "69211ed4758610b8abeb5e77",
    "title": "Hand-Painted Ceramic Art Plate",
    "description": "Decorative ceramic plate with hand-painted artistic patterns, perfect for walls or shelves.",
    "price": 75.50,
    "images": [
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763784219/il_794xN.7219942589_48my_lp1jdt.webp",
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763784220/il_794xN.7219942603_slhx_fcatht.webp",
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763784224/il_794xN.7353544902_2o6f_gvscj8.webp"
    ],
    "categoryId": "6920e4c01eef40052ea9dea0",
    "quantity": 14,
    "variants": [
      { "color": "Blue-White" },
      { "color": "Terracotta" }
    ],
    "isCustomOrder": true,
    "dimensions": "30 cm diameter",
    "shippingMethods": ["Standard"]
  },

  {
    "sellerId": "69211ed4758610b8abeb5e77",
    "title": "Watercolor Nature Landscape",
    "description": "Soft watercolor painting featuring mountains and misty forests. A soothing piece for any environment.",
    "price": 95.00,
    "images": [
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763784204/il_794xN.6012436673_i0ck_ii5bqk.webp",
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763784200/il_794xN.6012436669_mumk_dmcy7y.webp"
    ],
    "categoryId": "6920e4c01eef40052ea9dea0",
    "quantity": 10,
    "variants": [
      { "size": "30x40 cm" },
      { "size": "50x70 cm" }
    ],
    "isCustomOrder": false,
    "dimensions": "Various sizes available",
    "shippingMethods": ["Standard", "Express"]
  },

  {
    "sellerId": "69211ed4758610b8abeb5e77",
    "title": "Geometric Abstract Print",
    "description": "High-quality print featuring geometric shapes in bold modern colors, perfect for a contemporary space.",
    "price": 55.00,
    "images": [
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763784199/il_794xN.4518409429_dvf3_dvdxia.webp",
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763784198/il_794xN.4471041998_62g8_y8zslp.webp"
    ],
    "categoryId": "6920e4c01eef40052ea9dea0",
    "quantity": 30,
    "variants": [
      { "size": "A3" },
      { "size": "A2" },
      { "size": "50x70 cm" }
    ],
    "isCustomOrder": false,
    "dimensions": "A3, A2, 50x70 cm",
    "shippingMethods": ["Standard"]
  }
]

const seller6Products = [
  {
    "sellerId": "69211ed4758610b8abeb5e78",
    "title": "Rustic Oak Coffee Table",
    "description": "Handcrafted oak coffee table with a natural matte finish. Perfect for living rooms with rustic or modern decor.",
    "price": 320.00,
    "images": [
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763785880/il_794xN.7400157008_74v1_z47gz0.avif",
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763785881/il_794xN.7448073027_ckja_jje2jj.avif"
    ],
    "categoryId": "6920e4c01eef40052ea9de9d",
    "quantity": 6,
    "variants": [
      { "size": "90x50x40 cm" },
      { "size": "110x60x45 cm" }
    ],
    "isCustomOrder": true,
    "dimensions": "Available in two standard sizes",
    "shippingMethods": ["Standard", "Premium"]
  },

  {
    "sellerId": "69211ed4758610b8abeb5e78",
    "title": "Hand-Carved Wooden Wall Clock",
    "description": "Elegant wooden wall clock made from walnut, featuring hand-carved details and silent movement.",
    "price": 85.00,
    "images": [
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763785865/il_794xN.7291009343_8jzt_bwuxq7.jpg",
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763785872/il_794xN.7291011091_t8w1_lhh1zp.avif"
    ],
    "categoryId": "6920e4c01eef40052ea9de9d",
    "quantity": 20,
    "variants": [
      { "color": "Natural Walnut" },
      { "color": "Dark Walnut" }
    ],
    "isCustomOrder": false,
    "dimensions": "30 cm diameter",
    "shippingMethods": ["Standard"]
  },

  {
    "sellerId": "69211ed4758610b8abeb5e78",
    "title": "Solid Wood Floating Shelves (Set of 2)",
    "description": "Minimalist floating shelves crafted from European birch wood. Perfect for books, plants, or decor.",
    "price": 70.00,
    "images": [
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763785850/il_794xN.6401834751_godk_ke1b7e.avif",
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763785864/il_794xN.7239091825_fjub_jpwf14.avif",
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763785873/il_794xN.7346575303_ewo5_ughp7k.avif"
    ],
    "categoryId": "6920e4c01eef40052ea9de9d",
    "quantity": 35,
    "variants": [
      { "size": "60 cm" },
      { "size": "80 cm" }
    ],
    "isCustomOrder": false,
    "dimensions": "Includes mounting hardware",
    "shippingMethods": ["Standard", "Express"]
  },

  {
    "sellerId": "69211ed4758610b8abeb5e78",
    "title": "Handcrafted Wood & Glass Lamp",
    "description": "Modern bedside lamp featuring a handcrafted wooden base and a frosted glass shade. Soft ambient lighting.",
    "price": 110.00,
    "images": [
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763785851/il_794xN.7184262672_536o_uhbzx6.avif",
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763785851/il_794xN.7184262672_536o_uhbzx6.avif"
    ],
    "categoryId": "6920e4c01eef40052ea9de9d",
    "quantity": 12,
    "variants": [
      { "color": "Natural Wood" },
      { "color": "Dark Chestnut" }
    ],
    "isCustomOrder": true,
    "dimensions": "Height 28 cm, base 12x12 cm",
    "shippingMethods": ["Standard", "Premium"]
  },

  {
    "sellerId": "69211ed4758610b8abeb5e78",
    "title": "Premium Hardwood Cutting Board",
    "description": "Durable cutting board made from European maple and walnut. Ideal for kitchens or as a gift.",
    "price": 65.00,
    "images": [
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763785850/il_794xN.7063032177_cy86_zmaxra.avif",
      "https://res.cloudinary.com/dttbqvomc/image/upload/v1763785858/il_794xN.7212363691_82ux_xrhzaa.avif"
    ],
    "categoryId": "6920e4c01eef40052ea9de9d",
    "quantity": 40,
    "variants": [
      { "size": "30x20 cm" },
      { "size": "40x30 cm" }
    ],
    "isCustomOrder": false,
    "dimensions": "Two sizes available",
    "shippingMethods": ["Standard"]
  }
]

