export type MenuItem = {
  id: string;
  name: string;
  priceKd: number;
  description: string;
  bestSeller?: boolean;
};

export type MenuCategoryId = "detroit" | "ny" | "sauces" | "dessert" | "drinks";

export const MENU_DETROIT: MenuItem[] = [
  {
    id: "pepperoni",
    name: "Pepperoni Pizza",
    priceKd: 4.5,
    description:
      "Pepperoni, mozzarella, cheddar cheese, parmesan, and signature pizza sauce.",
    bestSeller: true,
  },
  {
    id: "margherita",
    name: "Margherita Pizza",
    priceKd: 4.0,
    description: "Mozzarella, cheddar, tomato sauce, parmesan, and basil.",
    bestSeller: true,
  },
  {
    id: "garlic-cheese",
    name: "Garlic Cheese Pizza",
    priceKd: 3.85,
    description: "Roasted garlic butter, mozzarella, cheddar, parmesan, and chives.",
    bestSeller: true,
  },
  {
    id: "meat-lover",
    name: "Meat Lover Pizza",
    priceKd: 4.75,
    description:
      "Spicy beef, pepperoni, mozzarella, cheddar, parmesan, fresh chives, and signature pizza sauce.",
  },
  {
    id: "supremo",
    name: "Supremo",
    priceKd: 5.65,
    description:
      "Mozzarella, cheddar, sizzling pepperoni, spicy beef, mushrooms, jalapeños, black olives, and fresh chives.",
    bestSeller: true,
  },
  {
    id: "mushroom",
    name: "Mushroom Pizza",
    priceKd: 4.85,
    description:
      "Creamy mushroom sauce, mozzarella, white cheddar, fresh mushrooms, parmesan, chives, and Aleppo pepper.",
  },
  {
    id: "garden",
    name: "Garden Pizza",
    priceKd: 4.5,
    description:
      "Mozzarella, cheddar, parmesan, signature tomato sauce, artichoke, olives, cherry tomatoes, mushrooms, basil, and chives.",
  },
];

export const MENU_NY: MenuItem[] = [
  {
    id: "ny-margherita",
    name: "Pizza Margherita NY",
    priceKd: 4.5,
    description:
      "48-hour fermented dough, Italian tomatoes, mozzarella, fresh basil, and parmesan.",
  },
  {
    id: "ny-pepperoni",
    name: "Pepperoni Pizza NY",
    priceKd: 4.95,
    description: "Italian tomato sauce, mozzarella, parmesan, and pepperoni.",
  },
  {
    id: "ny-supremo",
    name: "Supremo Pizza NY",
    priceKd: 5.85,
    description:
      "48-hour fermented dough with Italian tomatoes, mozzarella, parmesan, pepperoni, spicy beef, mushrooms, jalapeños, and chives.",
  },
  {
    id: "deadpool",
    name: "The Deadpool Pizza",
    priceKd: 4.75,
    description:
      "14-inch New York-inspired dough, San Marzano tomatoes, mozzarella, pineapple, black olives, chives, and parmesan.",
  },
];

export const MENU_DESSERT: MenuItem[] = [
  {
    id: "tiramisu",
    name: "Tiramisu",
    priceKd: 3.5,
    description:
      "Layers of espresso-soaked ladyfingers and creamy mascarpone, dusted with cocoa powder.",
  },
];

export const MENU_SAUCES: MenuItem[] = [
  {
    id: "ranch",
    name: "Ranch Sauce",
    priceKd: 0.3,
    description: "",
  },
  {
    id: "hot-honey",
    name: "Hot Honey",
    priceKd: 0.5,
    description: "Spicy honey made in house.",
  },
  {
    id: "chili-crisp",
    name: "Bricks Chili Crisp",
    priceKd: 0.5,
    description: "Chili peppers, garlic, ginger, and peanuts.",
  },
  {
    id: "marinara",
    name: "Marinara Sauce",
    priceKd: 0.35,
    description: "Signature tomato sauce.",
  },
  {
    id: "chili-flakes",
    name: "Chilli Flakes",
    priceKd: 0.25,
    description: "",
  },
];

export const MENU_DRINKS: MenuItem[] = [
  { id: "kinza-cola", name: "Kinza Cola", priceKd: 0.5, description: "" },
  { id: "kinza-citrus", name: "Kinza Citrus", priceKd: 0.5, description: "" },
  { id: "kinza-orange", name: "Kinza Orange", priceKd: 0.5, description: "" },
  {
    id: "kinza-sparkling",
    name: "Kinza Sparkling Water",
    priceKd: 0.5,
    description: "",
  },
  { id: "water", name: "Water", priceKd: 0.35, description: "" },
];

export const MENU_TABS: {
  id: MenuCategoryId;
  label: string;
  shortLabel: string;
}[] = [
  { id: "detroit", label: "Detroit pizza", shortLabel: "Detroit" },
  { id: "ny", label: "New York pizza", shortLabel: "NY" },
  { id: "sauces", label: "Sauces", shortLabel: "Sauces" },
  { id: "dessert", label: "Dessert", shortLabel: "Dessert" },
  { id: "drinks", label: "Drinks", shortLabel: "Drinks" },
];

export function getItemsForCategory(id: MenuCategoryId): MenuItem[] {
  switch (id) {
    case "detroit":
      return MENU_DETROIT;
    case "ny":
      return MENU_NY;
    case "sauces":
      return MENU_SAUCES;
    case "dessert":
      return MENU_DESSERT;
    case "drinks":
      return MENU_DRINKS;
    default:
      return [];
  }
}

export const BEST_SELLER_ITEMS = MENU_DETROIT.filter((i) => i.bestSeller);
