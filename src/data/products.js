const initialProductsData = [
  // ==================== SWEETS ====================
  // {
  //   id: "sweet-lal-mohan",
  //   name: "Lal Mohan",
  //   category: "sweets",
  //   priceOptions: [
  //     { price: 35, unit: "piece" },
  //     { price: 600, unit: "kg" }
      
  //   ],
  //   description: "A soft, classic sweet dumpling made from milk solids and paneer, deep-fried to a golden brown and soaked in a warm, cardamom-infused sugar syrup. Pure bliss in every bite.",
  //   ingredients: ["Khuwa (Milk Solids)", "Paneer", "All-Purpose Flour", "Sugar", "Cardamom", "Pure Ghee"],
  //   rating: 4.8,
  //   reviewsCount: 124,
  //   availability: true,
  //   popular: true,
  //   new: false,
  //   image: "" // Placeholder to be replaced by uploaded image
  // },
  {
    id: "sweet-rasbhari",
    name: "Rasbhari",
    category: "sweets",
    priceOptions: [
       { price: 35, unit: "piece" },
      { price: 550, unit: "kg" }
     
    ],
    description: "Light, spongy, and incredibly juicy cottage cheese dumplings squeezed and soaked in a delicate, clear sugar syrup. Exudes refreshing sweetness.",
    ingredients: ["Chhena (Fresh Cottage Cheese)", "Sugar", "Water", "Semolina", "Rose Water"],
    rating: 4.7,
    reviewsCount: 98,
    availability: true,
    popular: false,
    new: true,
    image: ""// Placeholder to be replaced by uploaded imag
  },
  {
    id: "sweet-chamcham",
    name: "Chamcham",
    category: "sweets",
    priceOptions: [
      { price: 35, unit: "piece" },
      { price: 600, unit: "kg" },
      
    ],
    description: "A traditional Bengali sweet made from fresh chhena, shaped into cylinders, cooked in sugar syrup, and rolled in fine desiccated coconut flakes.",
    ingredients: ["Chhena", "Sugar", "Desiccated Coconut", "Cardamom", "Saffron"],
    rating: 4.6,
    reviewsCount: 82,
    availability: true,
    popular: false,
    new: false,
    image: ""
  },
  {
    id: "sweet-raj-bhog",
    name: "Raj Bhog",
    category: "sweets",
    priceOptions: [
      { price: 35, unit: "piece" },
      { price: 600, unit: "kg" },
      
    ],
    description: "A royal dessert consisting of large spongy cheese balls stuffed with almonds and pistachios, cooked in rich saffron-flavored syrup.",
    ingredients: ["Chhena", "Sugar", "Saffron", "Almonds", "Pistachios", "Cardamom"],
    rating: 4.9,
    reviewsCount: 145,
    availability: true,
    popular: true,
    new: false,
    image: ""
  },
  {
    id: "sweet-kala-jamun",
    name: "Kala Jamun",
    category: "sweets",
    priceOptions: [
      { price: 35, unit: "piece" },
      { price: 600, unit: "kg" },
     
    ],
    description: "A dark-hued, dense version of gulab jamun with a rich, caramelized exterior and a soft, sweet core.",
    ingredients: ["Khuwa", "Paneer", "Sugar", "Flour", "Pure Ghee", "Cardamom"],
    rating: 4.7,
    reviewsCount: 76,
    availability: true,
    popular: false,
    new: false,
    image: ""
  },
  {
    id: "sweet-gulab-jamun",
    name: "Gulab Jamun",
    category: "sweets",
    priceOptions: [
      { price: 600, unit: "kg" },
      { price: 35, unit: "piece" },
    ],
    description: "Deep-fried milk-solid spheres soaked in rose-flavored sugar syrup. Classic, fragrant, and highly decadent.",
    ingredients: ["Khuwa", "All-Purpose Flour", "Sugar", "Rose Water", "Ghee", "Cardamom"],
    rating: 4.8,
    reviewsCount: 210,
    availability: true,
    popular: true,
    new: false,
    
    image: ""
  },
  {
    id: "sweet-gopal-bhog",
    name: "Gopal Bhog",
    category: "sweets",
    priceOptions: [
      { price: 600, unit: "kg" },
      { price: 35, unit: "piece" }
    ],
    description: "Exquisite sweet dumplings cooked in rich cardamom syrup, decorated with silver leaf (vark) and dry fruits.",
    ingredients: ["Chhena", "Sugar", "Cardamom", "Pistachios", "Almonds", "Silver Leaf"],
    rating: 4.5,
    reviewsCount: 54,
    availability: true,
    popular: false,
    new: false,
    
    image: ""
  },
  {
    id: "sweet-motichoor-laddu",
    name: "Motichoor Laddu",
    category: "sweets",
    priceOptions: [
      { price: 350, unit: "kg" },
      { price: 15, unit: "piece" }
    ],
    description: "Tiny gram flour pearls (boondi) fried in pure desi ghee, blended with hot sugar syrup, and shaped into golden, melt-in-your-mouth balls.",
    ingredients: ["Gram Flour (Besan)", "Pure Ghee", "Sugar", "Melon Seeds", "Cardamom", "Saffron"],
    rating: 4.9,
    reviewsCount: 312,
    availability: true,
    popular: true,
    new: false,
    
    image: ""
  },
  {
    id: "sweet-jeri",
    name: "Jeri (Jalebi)",
    category: "sweets",
    priceOptions: [
      { price: 250, unit: "kg" },
      { price: 15, unit: "piece" }
    ],
    description: "Crispy, spiral-shaped traditional fried batter soaked in saffron sugar syrup. Served piping hot for the ultimate breakfast or dessert experience.",
    ingredients: ["All-Purpose Flour", "Yogurt", "Sugar", "Saffron", "Cardamom", "Ghee"],
    rating: 4.9,
    reviewsCount: 420,
    availability: true,
    popular: true,
    new: false,
    
    image: ""
  },
  {
    id: "sweet-buniya",
    name: "Buniya",
    category: "sweets",
    priceOptions: [
      { price: 300, unit: "kg" }
    ],
    description: "Sweet, drop-sized pearls of fried gram flour soaked in aromatic sugar syrup, perfect for festive celebrations and offerings.",
    ingredients: ["Gram Flour (Besan)", "Sugar", "Ghee", "Cardamom"],
    rating: 4.5,
    reviewsCount: 41,
    availability: true,
    popular: false,
    new: false,
    
    image: ""
  },
  {
    id: "sweet-bhujia",
    name: "Bhujia",
    category: "sweets",
    priceOptions: [
      { price: 450, unit: "kg" }
    ],
    description: "A crispy, savory snack made of moth bean flour and gram flour, seasoned with premium spices. Perfect pairing with tea.",
    ingredients: ["Moth Bean Flour", "Gram Flour", "Pure Ghee", "Spices", "Black Salt", "Edible Oil"],
    rating: 4.7,
    reviewsCount: 88,
    availability: true,
    popular: false,
    new: false,
    
    image: ""
  },
  {
    id: "sweet-khajuriya",
    name: "Khajuriya",
    category: "sweets",
    priceOptions: [
      { price: 350, unit: "kg" },
      { price: 20, unit: "piece" }
    ],
    description: "Traditional deep-fried, textured cookies made from wheat flour and semolina. Crispy, mildly sweet, and incredibly satisfying.",
    ingredients: ["Wheat Flour", "Semolina", "Sugar", "Fennel Seeds", "Ghee", "Milk"],
    rating: 4.6,
    reviewsCount: 65,
    availability: true,
    popular: false,
    new: false,
    
    image: ""
  },
  {
    id: "sweet-gaja",
    name: "Gaja",
    category: "sweets",
    priceOptions: [
      { price: 350, unit: "kg" },
      { price: 20, unit: "piece" }
    ],
    description: "Flaky, layered sweet made of refined flour, deep-fried to a crisp crunch, and glazed in sugar syrup. A traditional favorite.",
    ingredients: ["Refined Flour", "Ghee", "Sugar", "Cardamom"],
    rating: 4.4,
    reviewsCount: 38,
    availability: true,
    popular: false,
    new: false,
    
    image: ""
  },
  {
    id: "sweet-cream-sweet",
    name: "Cream Sweet",
    category: "sweets",
    priceOptions: [
      { price: 700, unit: "kg" },
      { price: 50, unit: "piece" }
    ],
    description: "A premium luxury sandwich sweet containing soft, juicy chhena sheets packed with rich sweetened fresh cream, topped with chopped nuts.",
    ingredients: ["Chhena", "Fresh Cream", "Sugar", "Pistachios", "Saffron", "Rose Water"],
    rating: 4.9,
    reviewsCount: 167,
    availability: true,
    popular: true,
    new: true,
    
    image: ""
  },
  {
    id: "sweet-besan-laddu",
    name: "Besan Laddu",
    category: "sweets",
    priceOptions: [
      { price: 700, unit: "kg" },
      { price: 50, unit: "piece" }
    ],
    description: "Aromatic, rich, and nutty sweet balls made by slow-roasting gram flour in pure ghee, sweetened and infused with green cardamom.",
    ingredients: ["Gram Flour (Besan)", "Pure Ghee", "Sugar", "Almonds", "Cardamom"],
    rating: 4.8,
    reviewsCount: 112,
    availability: true,
    popular: false,
    new: false,
    
    image: ""
  },

  // ==================== KHUWA ITEMS ====================
  {
    id: "khuwa-peda",
    name: "Peda",
    category: "khuwa",
    priceOptions: [
      { price: 800, unit: "kg" },
      { price: 35, unit: "piece" }
    ],
    description: "A rich, fudge-like traditional milk sweet made from condensed milk solids (khuwa), slow-cooked with sugar and scented with cardamom.",
    ingredients: ["Pure Milk Solids (Khuwa)", "Sugar", "Cardamom", "Pistachios"],
    rating: 4.8,
    reviewsCount: 189,
    availability: true,
    popular: true,
    new: false,
    
    image: ""
  },
  {
    id: "khuwa-barfi",
    name: "Barfi",
    category: "khuwa",
    priceOptions: [
      { price: 800, unit: "kg" },
      { price: 35, unit: "piece" }
    ],
    description: "Classic milk fudge with a dense, moist, and smooth texture. Gently decorated with premium edible silver leaf.",
    ingredients: ["Khuwa", "Sugar", "Cardamom", "Edible Silver Leaf"],
    rating: 4.7,
    reviewsCount: 95,
    availability: true,
    popular: false,
    new: false,
    
    image: ""
  },
  {
    id: "khuwa-chocolate-barfi",
    name: "Chocolate Barfi",
    category: "khuwa",
    priceOptions: [
      { price: 800, unit: "kg" },
      { price: 35, unit: "piece" }
    ],
    description: "Double-layered fudge featuring a bottom layer of sweet, white milk barfi and a top layer of rich cocoa chocolate barfi.",
    ingredients: ["Khuwa", "Sugar", "Premium Cocoa Powder", "Chocolate Essence", "Cardamom"],
    rating: 4.7,
    reviewsCount: 84,
    availability: true,
    popular: false,
    new: true,
    
    image: ""
  },
  {
    id: "khuwa-kaju-barfi",
    name: "Kaju Barfi",
    category: "khuwa",
    priceOptions: [
      { price: 1200, unit: "kg" },
      { price: 35, unit: "piece" }
    ],
    description: "Iconic diamond-shaped sweet (Kaju Katli) crafted from premium cashew nut paste, pure ghee, and sugar, adorned with silver leaf.",
    ingredients: ["Premium Cashews", "Sugar", "Water", "Pure Ghee", "Edible Silver Leaf"],
    rating: 4.9,
    reviewsCount: 298,
    availability: true,
    popular: true,
    new: false,
    
    image: ""
  },
  {
    id: "khuwa-badam-barfi",
    name: "Badam Barfi",
    category: "khuwa",
    priceOptions: [
      { price: 2100, unit: "kg" },
      { price: 35, unit: "piece" }
    ],
    description: "A super-premium luxury sweet prepared with finely ground blanched almonds, milk solids, and pure ghee, finished with real saffron strands.",
    ingredients: ["Premium Almonds", "Milk Solids", "Sugar", "Pure Ghee", "Saffron"],
    rating: 4.9,
    reviewsCount: 154,
    availability: true,
    popular: true,
    new: false,
    
    image: ""
  },
  {
    id: "khuwa-roll-barfi",
    name: "Roll Barfi",
    category: "khuwa",
    priceOptions: [
      { price: 800, unit: "kg" },
      { price: 35, unit: "piece" }
    ],
    description: "Elegant rolled milk fudge stuffed with a vibrant, crunchy mixture of pistachios, almonds, and spiced cardamom flavor.",
    ingredients: ["Khuwa", "Sugar", "Almonds", "Pistachios", "Saffron", "Cardamom"],
    rating: 4.6,
    reviewsCount: 57,
    availability: true,
    popular: false,
    new: false,
    
    image: ""
  },
  {
    id: "khuwa-milk-cake",
    name: "Milk Cake",
    category: "khuwa",
    priceOptions: [
      { price: 800, unit: "kg" },
      { price: 35, unit: "piece" }
    ],
    description: "A delicious, grainy, slow-reduced milk sweet with a rich dark caramelized center, cooked with pure ghee and milk.",
    ingredients: ["Whole Milk", "Sugar", "Lemon Juice", "Ghee"],
    rating: 4.8,
    reviewsCount: 172,
    availability: true,
    popular: true,
    new: false,
    
    image: ""
  },
  {
    id: "khuwa-gajar-haluwa",
    name: "Gajar Haluwa",
    category: "khuwa",
    priceOptions: [
      { price: 650, unit: "kg" }
    ],
    description: "Traditional warm carrot pudding made by slow-cooking fresh grated carrots in milk, cream, and sugar, loaded with dry fruits.",
    ingredients: ["Grated Carrots", "Full Cream Milk", "Sugar", "Pure Ghee", "Cashews", "Raisins"],
    rating: 4.8,
    reviewsCount: 203,
    availability: true,
    popular: false,
    new: true,
    
    image: ""
  },
  {
    id: "khuwa-doda-barfi",
    name: "Doda Barfi",
    category: "khuwa",
    priceOptions: [
      { price: 800, unit: "kg" },
      { price: 35, unit: "piece" }
    ],
    description: "A rich, chewy, and highly nutritious sweet made of germinated wheat, reduced milk, and sugar, packed with cracked nuts.",
    ingredients: ["Germinated Wheat Flour", "Whole Milk", "Sugar", "Ghee", "Almonds", "Cashews"],
    rating: 4.6,
    reviewsCount: 69,
    availability: true,
    popular: false,
    new: false,
    
    image: ""
  },
  {
    id: "khuwa-kalakand",
    name: "Kalakand",
    category: "khuwa",
    priceOptions: [
      { price: 800, unit: "kg" },
      { price: 35, unit: "piece" }
    ],
    description: "Incredibly soft, moist, and grainy milk dessert made of fresh paneer and condensed milk, flavored with a dash of cardamom.",
    ingredients: ["Fresh Paneer (Chhena)", "Condensed Milk", "Sugar", "Cardamom", "Pistachios"],
    rating: 4.8,
    reviewsCount: 114,
    availability: true,
    popular: true,
    new: false,
    
    image: ""
  },

  // ==================== SNACKS ====================
  {
    id: "snack-chhola-bhatura",
    name: "Chhola Bhatura",
    category: "snacks",
    priceOptions: [
      { price: 65, unit: "plate" }
    ],
    description: "Fluffy, deep-fried leavened bread (Bhatura) served with spicy, tangy, and flavorful chickpea gravy (Chhola). A classic hearty snack.",
    ingredients: ["Chickpeas", "All-Purpose Flour", "Yogurt", "Indian Spices", "Onions", "Tomatoes", "Ginger"],
    rating: 4.8,
    reviewsCount: 345,
    availability: true,
    popular: true,
    new: false,
    
    image: ""
  },
  {
    id: "snack-puri-sabji",
    name: "Puri Sabji",
    category: "snacks",
    priceOptions: [
      { price: 65, unit: "plate" }
    ],
    description: "Piping hot, golden puffed whole wheat flatbreads (Puri) served with a classic spicy potato curry (Sabji) garnished with coriander.",
    ingredients: ["Whole Wheat Flour", "Potatoes", "Tomatoes", "Spices", "Coriander", "Oil"],
    rating: 4.7,
    reviewsCount: 198,
    availability: true,
    popular: false,
    new: false,
    
    image: ""
  },
  {
    id: "snack-samosa-tarkari",
    name: "Samosa Tarkari",
    category: "snacks",
    priceOptions: [
      { price: 65, unit: "plate" }
    ],
    description: "Crispy, golden triangular pastries stuffed with dry, spiced potatoes and peas, served with a delicious, piping-hot chickpea gravy.",
    ingredients: ["All-Purpose Flour", "Potatoes", "Green Peas", "Spices", "Chickpeas", "Chutneys"],
    rating: 4.8,
    reviewsCount: 412,
    availability: true,
    popular: true,
    new: false,
    
    image: ""
  },
  {
    id: "snack-samosa-chaat",
    name: "Samosa Chaat",
    category: "snacks",
    priceOptions: [
      { price: 100, unit: "full plate" },
      { price: 65, unit: "half plate" }
    ],
    description: "Crushed crispy samosas layered with warm chickpea curry, sweetened yogurt, tangy tamarind chutney, spicy mint chutney, onions, and crisp sev.",
    ingredients: ["Samosa", "Chickpea Curry", "Sweet Yogurt", "Tamarind Chutney", "Mint Chutney", "Sev", "Onions"],
    rating: 4.9,
    reviewsCount: 280,
    availability: true,
    popular: true,
    new: false,
    image: ""
  },
  {
    id: "snack-kachauri-chaat",
    name: "Kachauri Chaat",
    category: "snacks",
    priceOptions: [
      { price: 120, unit: "full plate" },
      { price: 70, unit: "half plate" },
      
    ],
    description: "Crispy round kachauris stuffed with spiced lentils, crushed and topped with warm curd, spicy mint chutney, tamarind chutney, and spice dust.",
    ingredients: ["Kachauri", "Urad Dal Stuffing", "Yogurt", "Tamarind Chutney", "Spices", "Sev"],
    rating: 4.6,
    reviewsCount: 89,
    availability: true,
    popular: false,
    new: false,
    
    image: ""
  },
  {
    id: "snack-nimkin-chaat",
    name: "Nimkin Chaat",
    category: "snacks",
    priceOptions: [
      { price: 100, unit: "full plate" },
      { price: 60, unit: "half plate" }
    ],
    description: "Crunchy ribbon snacks (Nimkin) topped with spicy chickpeas, sweet curd, coriander, dynamic dry spices, and tangy chutneys.",
    ingredients: ["Nimkin", "Spiced Chickpeas", "Yogurt", "Chutneys", "Coriander", "Spices"],
    rating: 4.5,
    reviewsCount: 64,
    availability: true,
    popular: false,
    new: false,
   
    image: ""
  },
  {
    id: "snack-bhujia-chaat",
    name: "Bhujia Chaat",
    category: "snacks",
    priceOptions: [
      { price: 110, unit: "full plate" },
      { price: 65, unit: "half plate" }
    ],
    description: "A super-crunchy and refreshing savory mixture of premium potato/gram-flour bhujia, freshly chopped onions, tomatoes, coriander, and fresh lemon juice.",
    ingredients: ["Bhujia", "Onions", "Tomatoes", "Coriander", "Green Chilies", "Lemon Juice", "Chaat Masala"],
    rating: 4.6,
    reviewsCount: 78,
    availability: true,
    popular: false,
    new: false,
   
    image: ""
  },
  {
    id: "snack-pakora-chaat",
    name: "Pakora Chaat",
    category: "snacks",
    priceOptions: [
      { price: 100, unit: "full plate" },
      { price: 60, unit: "half plate" }
    ],
    description: "Crispy mixed vegetable fritters (pakoras) tossed with sweet yogurt, tangy chutneys, chaat masala, and fresh coriander leaves.",
    ingredients: ["Vegetable Pakoras", "Yogurt", "Tamarind Chutney", "Chaat Masala", "Coriander"],
    rating: 4.5,
    reviewsCount: 52,
    availability: true,
    popular: false,
    new: false,
    
    image: ""
  },
  {
    id: "snack-chowmein",
    name: "Chowmein",
    category: "snacks",
    priceOptions: [
      { price: 90, unit: "full plate" },
      { price: 50, unit: "half plate" }
    ],
    description: "Stir-fried wheat noodles tossed with shredded cabbage, carrots, bell peppers, soy sauce, garlic, and hot spices. Authentic Nepali style.",
    ingredients: ["Wheat Noodles", "Cabbage", "Carrots", "Bell Peppers", "Soy Sauce", "Nepali Spices", "Garlic"],
    rating: 4.7,
    reviewsCount: 220,
    availability: true,
    popular: false,
    new: false,
    
    image: ""
  },
  {
    id: "snack-momo",
    name: "Mo: Mo",
    category: "snacks",
    priceOptions: [
      { price: 100, unit: "full plate" },
      { price: 50, unit: "half plate" }
    ],
    description: "Nepali-style steamed dumplings stuffed with finely minced vegetables, onions, garlic, ginger, and local spices. Served with traditional tomato-sesame achar.",
    ingredients: ["Wheat Flour", "Cabbage", "Onions", "Carrots", "Ginger", "Garlic", "Sesame", "Tomato Achar"],
    rating: 4.9,
    reviewsCount: 512,
    availability: true,
    popular: true,
    new: false,
    
    image: ""
  },
  {
    id: "snack-manchurian",
    name: "Manchurian",
    category: "snacks",
    priceOptions: [
      { price: 100, unit: "full plate" },
      { price: 60, unit: "half plate" }
    ],
    description: "Crispy fried vegetable balls coated in a spicy, sweet, and tangy Indo-Chinese sauce with spring onions and garlic.",
    ingredients: ["Cabbage", "Carrots", "Capsicum", "Corn Flour", "Soy Sauce", "Chili Sauce", "Spring Onions"],
    rating: 4.6,
    reviewsCount: 143,
    availability: true,
    popular: false,
    new: false,
    
    image: ""
  },
  {
    id: "snack-pokora",
    name: "Pakora",
    category: "snacks",
    priceOptions: [
      { price: 50, unit: "per plate" },
    ],
    description: "Crispy fried vegetable balls coated in a spicy, and tangy Indo-Chinese sauce with spring onions and garlic.",
    ingredients: ["Onions", "Chili", "Ginger", "Corn Flour", "Garlic"],
    rating: 4.6,
    reviewsCount: 143,
    availability: true,
    popular: false,
    new: false,
    
    image: ""
  },
  {
    id: "snack-special-chaat",
    name: "Special Chaat",
    category: "snacks",
    priceOptions: [
      { price: 150, unit: "per plate" }
    ],
    description: "Crushed crispy samosas layered with warm chickpea curry, sweetened yogurt, tangy tamarind chutney, spicy mint chutney, onions, crisp sev, Pakora, kachauri,  Apple, Banana, and pomegranate, all topped with a sprinkle of chaat masala and fresh coriander.",
    ingredients: ["Samosas", "Carrots", "Apple", "Banana", "yogurt", "Chili", "Cubed Onions"],
    rating: 4.6,
    reviewsCount: 143,
    availability: true,
    popular: false,
    new: false,
    
    image: ""
  },

  // ==================== MILK ITEMS ====================
  {
    id: "milk-curd",
    name: "Curd (Dahi)",
    category: "milk",
    priceOptions: [
      { price: 50, unit: "glass" }
    ],
    description: "Creamy, rich, and naturally sweet yogurt prepared in traditional clay vessels, served chilled in a glass. Incredibly soothing.",
    ingredients: ["Pure Milk", "Active Yogurt Culture", "Sugar (Optional)"],
    rating: 4.7,
    reviewsCount: 119,
    availability: true,
    popular: false,
    new: false,
    nutrition: { calories: "160 kcal", protein: "6g", fat: "8g", carbs: "16g" },
    image: ""
  },
  {
    id: "milk-paneer",
    name: "Paneer",
    category: "milk",
    priceOptions: [
      { price: 900, unit: "kg" }
    ],
    description: "Premium quality, fresh, and soft unsalted cottage cheese, prepared daily from pure whole milk. Ideal for culinary creations.",
    ingredients: ["Pure Full Cream Milk", "Lemon Juice (for curdling)"],
    rating: 4.8,
    reviewsCount: 132,
    availability: true,
    popular: false,
    new: false,
    
    image: ""
  },
  {
    id: "milk-rasmalai",
    name: "Rasmalai",
    category: "milk",
    priceOptions: [
      { price: 100, unit: "cup" }
    ],
    description: "Decadent dessert consisting of flattened soft paneer discs soaked in chilled, thick, and reduced milk flavored with saffron, green cardamom, and pistachios.",
    ingredients: ["Milk", "Chhena", "Sugar", "Saffron", "Cardamom", "Pistachios", "Almonds"],
    rating: 4.9,
    reviewsCount: 389,
    availability: true,
    popular: true,
    new: false,
    
    image: ""
  },
  {
    id: "milk-tea",
    name: "Tea (Chiya)",
    category: "milk",
    priceOptions: [
      { price: 20, unit: "cup" }
    ],
    description: "Traditional Nepali milk tea brewed with premium black tea leaves, fresh whole milk, crushed ginger, and green cardamom. The comfort cup.",
    ingredients: ["Premium Tea Leaves", "Fresh Milk", "Water", "Ginger", "Cardamom", "Sugar"],
    rating: 4.9,
    reviewsCount: 480,
    availability: true,
    popular: true,
    image: ""
  },
  {
    id: "milk-lassi",
    name: "Lassi",
    category: "milk",
    priceOptions: [
      { price: 60, unit: "glass" },
      { price: 100, unit: "special dry fruit glass" }
    ],
    description: "A traditional, thick, creamy sweet yogurt drink churned to perfection, topped with fresh malai, crushed nuts, and aromatic cardamom.",
    ingredients: ["Fresh Curd (Yogurt)", "Sugar", "Milk Cream (Malai)", "Cardamom", "Pistachios", "Almonds"],
    rating: 4.9,
    reviewsCount: 210,
    availability: true,
    popular: true,
    new: true,
    image: ""
  },

  // ==================== COLD DRINKS ====================
  {
    id: "drink-pepsi",
    name: "Pepsi",
    category: "drinks",
    priceOptions: [{ price: 60, unit: "250 ml" }],
    description: "Chilled and refreshing carbonated cola soft drink.",
    ingredients: ["Carbonated Water", "Sugar", "Color", "Caffeine"],
    rating: 4.2,
    reviewsCount: 30,
    availability: true,
    popular: false,
    new: false,
    
    image: ""
  },
  {
    id: "drink-slice",
    name: "Slice",
    category: "drinks",
    priceOptions: [{ price: 60, unit: "250 ml" }],
    description: "Thick, sweet, and delicious mango drink packed with mango pulp flavor.",
    ingredients: ["Water", "Mango Pulp", "Sugar", "Acidity Regulators"],
    rating: 4.5,
    reviewsCount: 45,
    availability: true,
    popular: false,
    new: false,
    
    image: ""
  },
  {
    id: "drink-dew",
    name: "Mountain Dew",
    category: "drinks",
    priceOptions: [{ price: 60, unit: "250 ml" }],
    description: "Citrus-flavored energetic carbonated soft drink to revive your senses.",
    ingredients: ["Carbonated Water", "Sugar", "Citric Acid", "Caffeine"],
    rating: 4.4,
    reviewsCount: 38,
    availability: true,
    popular: false,
    new: false,
    
    image: ""
  },
  {
    id: "drink-7up",
    name: "7UP",
    category: "drinks",
    priceOptions: [{ price: 60, unit: "250 ml" }],
    description: "Crisp, bubbly, and refreshing lemon-lime carbonated beverage.",
    ingredients: ["Carbonated Water", "Sugar", "Natural Flavors", "Citric Acid"],
    rating: 4.3,
    reviewsCount: 25,
    availability: true,
    popular: false,
    new: false,
    
    image: ""
  },
  {
    id: "drink-mirinda",
    name: "Mirinda",
    category: "drinks",
    priceOptions: [{ price: 60, unit: "250 ml" }],
    description: "Tangy and sweet orange-flavored carbonated soft drink.",
    ingredients: ["Carbonated Water", "Sugar", "Orange Flavor", "Food Color"],
    rating: 4.2,
    reviewsCount: 22,
    availability: true,
    popular: false,
    new: false,
    
    image: ""
  },
  {
    id: "drink-sprite",
    name: "Sprite",
    category: "drinks",
    priceOptions: [{ price: 60, unit: "175 ml" }],
    description: "Sparkling, clear lemon-lime flavored soda, perfect alongside hot snacks.",
    ingredients: ["Carbonated Water", "Sugar", "Citric Acid", "Lemon Flavor"],
    rating: 4.4,
    reviewsCount: 50,
    availability: true,
    popular: false,
    new: false,
    
    image: ""
  },
  {
    id: "drink-fanta",
    name: "Fanta",
    category: "drinks",
    priceOptions: [{ price: 60, unit: "175 ml" }],
    description: "Vibrant orange carbonated soft drink, bubbly and sweet.",
    ingredients: ["Carbonated Water", "Sugar", "Orange Flavor", "Colors"],
    rating: 4.3,
    reviewsCount: 42,
    availability: true,
    popular: false,
    new: false,
    
    image: ""
  },
  {
    id: "drink-cola",
    name: "Coca-Cola",
    category: "drinks",
    priceOptions: [{ price: 60, unit: "175 ml" }],
    description: "The classic, world-favorite carbonated soft drink served ice-cold.",
    ingredients: ["Carbonated Water", "Sugar", "Caramel Color", "Phosphoric Acid", "Caffeine"],
    rating: 4.5,
    reviewsCount: 88,
    availability: true,
    popular: true,
    new: false,
    
    image: ""
  },
  {
    id: "drink-frooti",
    name: "Frooti",
    category: "drinks",
    priceOptions: [{ price: 60, unit: "250 ml" }],
    description: "Classic sweet mango drink, a favorite among children and adults alike.",
    ingredients: ["Water", "Mango Pulp", "Sugar", "Citric Acid"],
    rating: 4.6,
    reviewsCount: 65,
    availability: true,
    popular: false,
    new: false,
    
    image: ""
  },
  {
    id: "drink-water",
    name: "Water Bottle",
    category: "drinks",
    priceOptions: [{ price: 25, unit: "1000 ml" }],
    description: "Pure, mineralized drinking water bottle, thoroughly filtered.",
    ingredients: ["Purified Mineral Water"],
    rating: 4.8,
    reviewsCount: 154,
    availability: true,
    popular: false,
    new: false,
    
    image: ""
  },
  {
    id: "drink-redbull",
    name: "Red Bull",
    category: "drinks",
    priceOptions: [{ price: 120, unit: "250 ml" }],
    description: "Premium energy drink to vitalize body and mind.",
    ingredients: ["Water", "Sucrose", "Glucose", "Taurine", "Caffeine", "B-Vitamins"],
    rating: 4.6,
    reviewsCount: 77,
    availability: true,
    popular: true,
    new: false,
    
    image: ""
  },
  {
    id: "drink-maxtiger-250",
    name: "Max Tiger (250ml)",
    category: "drinks",
    priceOptions: [{ price: 100, unit: "250 ml" }],
    description: "Refreshing carbonated energy drink to boost stamina.",
    ingredients: ["Carbonated Water", "Sugar", "Taurine", "Caffeine", "Vitamins"],
    rating: 4.3,
    reviewsCount: 31,
    availability: true,
    popular: false,
    new: false,
    
    image: ""
  },
  {
    id: "drink-maxtiger-330",
    name: "Max Tiger (330ml)",
    category: "drinks",
    priceOptions: [{ price: 130, unit: "330 ml" }],
    description: "Larger sizing of the classic refreshing carbonated energy drink.",
    ingredients: ["Carbonated Water", "Sugar", "Taurine", "Caffeine", "Vitamins"],
    rating: 4.4,
    reviewsCount: 44,
    availability: true,
    popular: false,
    new: true,
    
    image: ""
  },
  {
    id: "drink-badam-juice",
    name: "Badam Juice",
    category: "drinks",
    priceOptions: [{ price: 100, unit: "250 ml" }],
    description: "Traditional chilled almond milk beverage packed with crushed almonds and saffron strands.",
    ingredients: ["Double Cream Milk", "Almonds", "Sugar", "Saffron", "Cardamom"],
    rating: 4.9,
    reviewsCount: 167,
    availability: true,
    popular: true,
    new: false,
    
    image: ""
  },
  {
    id: "drink-lemon-water",
    name: "Lemon Water",
    category: "drinks",
    priceOptions: [{ price: 50, unit: "250 ml" }],
    description: "Tangy, freshly squeezed lemonade served chilled to quench your thirst.",
    ingredients: ["Fresh Lemon Juice", "Water", "Sugar", "Black Salt", "Mint leaves"],
    rating: 4.5,
    reviewsCount: 49,
    availability: true,
    popular: false,
    new: false,
    
    image: ""
  },
  {
    id: "drink-sting",
    name: "Sting",
    category: "drinks",
    priceOptions: [{ price: 60, unit: "250 ml" }],
    description: "Sparkling carbonated strawberry-flavored energy beverage.",
    ingredients: ["Carbonated Water", "Sugar", "Caffeine", "Strawberry Flavor", "Ginseng"],
    rating: 4.5,
    reviewsCount: 96,
    availability: true,
    popular: true,
    new: false,
    
    image: ""
  }
];

const photoModules = import.meta.glob('../photos/**/*.{jpg,jpeg,png,webp,svg,JPG,JPEG,PNG,WEBP,SVG}', {
  eager: true,
  import: 'default',
});

const imageAsset = (path) => photoModules[path] || '';


const imageMap = {
  // ==================== SWEETS ====================
  "sweet-lal-mohan": imageAsset("../photos/Sweets/Lal Mohan.jpeg"),
  "sweet-rasbhari": imageAsset("../photos/Sweets/Rasbhari.jpg"),
  "sweet-chamcham": imageAsset("../photos/Sweets/cham cham.jpg"),
  "sweet-raj-bhog": imageAsset("../photos/Sweets/rajbhog.jpeg"),
  "sweet-kala-jamun": imageAsset("../photos/Sweets/kala-jamun.jpg"),
  "sweet-gulab-jamun": imageAsset("../photos/Sweets/Lal Mohan.jpeg"),
  "sweet-gopal-bhog": imageAsset("../photos/Sweets/Gopal bhog.jpeg"),
  "sweet-motichoor-laddu": imageAsset("../photos/Sweets/motichur laddu.jpg"),
  "sweet-jeri": imageAsset("../photos/Sweets/Buniya.jpeg"),
  "sweet-buniya": imageAsset("../photos/Sweets/Buniya.jpeg"),
  "sweet-bhujia": imageAsset("../photos/Sweets/Bhujia.jpeg"),
  "sweet-khajuriya": imageAsset("../photos/Khuwa Items/khajuri.webp"),
  "sweet-gaja": imageAsset("../photos/Khuwa Items/gaja.jpg"),
  "sweet-cream-sweet": imageAsset("../photos/Khuwa Items/Cream sweet.jpg"),
  "sweet-besan-laddu": imageAsset("../photos/Khuwa Items/besan-laddu.webp"),

  // ==================== KHUWA ITEMS ====================
  "khuwa-peda": imageAsset("../photos/Khuwa Items/peda.jpg"),
  "khuwa-barfi": imageAsset("../photos/Khuwa Items/barfi.png"),
  "khuwa-chocolate-barfi": imageAsset("../photos/Khuwa Items/chocolate_barfi.png"),
  "khuwa-kaju-barfi": imageAsset("../photos/Khuwa Items/Kaju-katli.jpg"),
  "khuwa-badam-barfi": imageAsset("../photos/Khuwa Items/Badam Barfi.jpeg"),
  "khuwa-roll-barfi": imageAsset("../photos/Khuwa Items/roll_barfi.png"),
  "khuwa-milk-cake": imageAsset("../photos/Khuwa Items/Milk cake.jpeg"),
  "khuwa-gajar-haluwa": imageAsset("../photos/Khuwa Items/gajar haluwa.jpeg"),
  "khuwa-doda-barfi": imageAsset("../photos/Khuwa Items/doda_barfi.png"),
  "khuwa-kalakand": imageAsset("../photos/Khuwa Items/kalakand.jpg"),

  // ==================== SNACKS ====================
  "snack-chhola-bhatura": imageAsset("../photos/Snack Items/pakora.jpg"),
  "snack-puri-sabji": imageAsset("../photos/Snack Items/samosa_tarkari.png"),
  "snack-samosa-tarkari": imageAsset("../photos/Snack Items/samosa_tarkari.png"),
  "snack-samosa-chaat": imageAsset("../photos/Snack Items/samosa_chaat.png"),
  "snack-special-chaat": imageAsset("../photos/Snack Items/samosa_chaat.png"),
  "snack-kachauri-chaat": imageAsset("../photos/Snack Items/kachauri chaat.jpeg"),
  "snack-nimkin-chaat": imageAsset("../photos/Snack Items/ Bhujia_chaat.png"),
  "snack-bhujia-chaat": imageAsset("../photos/Snack Items/ Bhujia_chaat.png"),
  "snack-pakora-chaat": imageAsset("../photos/Snack Items/pakoda chaat.jpg"),
  "snack-chowmein": imageAsset("../photos/Snack Items/Chowmein.jpg"),
  "snack-momo": imageAsset("../photos/Snack Items/momo.jpeg"),
  "snack-manchurian": imageAsset("../photos/Snack Items/manchurian.jpg"),
  "snack-pokora": imageAsset("../photos/Snack Items/pakora.png"),

  // ==================== MILK ITEMS ====================
  "milk-curd": imageAsset("../photos/Milk Items/Curd.png"),
  "milk-paneer": imageAsset("../photos/Milk Items/paneer.jpg"),
  "milk-rasmalai": imageAsset("../photos/Milk Items/rasmalai.png"),
  "milk-tea": imageAsset("../photos/Milk Items/Tea.jpeg"),
  "milk-lassi": imageAsset("../photos/Milk Items/Lassi.jpeg"),

  // ==================== COLD DRINKS ====================
  "drink-pepsi": imageAsset("../photos/cold_drink/Pepsi.jpeg"),
  "drink-slice": imageAsset("../photos/cold_drink/Slice.jpg"),
  "drink-dew": imageAsset("../photos/cold_drink/Mountain_Dew.jpg"),
  "drink-7up": imageAsset("../photos/cold_drink/7UP.jpeg"),
  "drink-mirinda": imageAsset("../photos/cold_drink/Mirinda.webp"),
  "drink-sprite": imageAsset("../photos/cold_drink/Sprite.jpg"),
  "drink-fanta": imageAsset("../photos/cold_drink/Fanta.jpeg"),
  "drink-cola": imageAsset("../photos/cold_drink/Coco-cola.jpeg"),
  "drink-frooti": imageAsset("../photos/cold_drink/Frooti.jpg"),
  "drink-water": imageAsset("../photos/cold_drink/watter_bottle.png"),
  "drink-redbull": imageAsset("../photos/cold_drink/Red-Bull.jpg"),
  "drink-maxtiger-250": imageAsset("../photos/cold_drink/Maxtiger-250.jpeg"),
  "drink-maxtiger-330": imageAsset("../photos/cold_drink/MaxTiger-330ml.jpg"),
  "drink-badam-juice": imageAsset("../photos/cold_drink/Badam-juice.jpg"),
  "drink-lemon-water": imageAsset("../photos/cold_drink/lemon_watter.jpg"),
  "drink-sting": imageAsset("../photos/cold_drink/string.jpg")
};

export const initialProducts = initialProductsData.map((product) => ({
  ...product,
  image: imageMap[product.id] || product.image || ""
}));

export const initialReviews = {
  "sweet-lal-mohan": [
    {
      id: "r1",
      userName: "Ramesh Sharma",
      rating: 5,
      comment: "Absolutely melts in the mouth! The cardamom aroma is heavenly. The quality is much better than other sweet shops around.",
      date: "2026-06-25",
      likes: 12,
      isVerified: true
    },
    {
      id: "r2",
      userName: "Pooja Shrestha",
      rating: 4,
      comment: "Very fresh and soft. Perfectly sweet, not overwhelming. Will order again for the upcoming festival.",
      date: "2026-06-20",
      likes: 5,
      isVerified: true
    }
  ],
  "khuwa-kaju-barfi": [
    {
      id: "r3",
      userName: "Sanjay Gupta",
      rating: 5,
      comment: "Excellent Kaju Katli! Authentic taste and perfect texture. The silver foil was applied very cleanly. Best in Kathmandu.",
      date: "2026-06-28",
      likes: 18,
      isVerified: true
    }
  ],
  "snack-momo": [
    {
      id: "r4",
      userName: "Anisha Giri",
      rating: 5,
      comment: "The sesame tomato chutney is spectacular! Dumplings are juicy, wrapping is thin, stuffing is very flavorful.",
      date: "2026-06-27",
      likes: 24,
      isVerified: true
    }
  ],
  "milk-rasmalai": [
    {
      id: "r5",
      userName: "Kabir Dev",
      rating: 5,
      comment: "Outstanding! Chilled perfectly, very soft paneer disc and the milk reduction is beautifully flavored with saffron.",
      date: "2026-06-29",
      likes: 31,
      isVerified: true
    }
  ]
};
