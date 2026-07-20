export interface FlavorInfo {
  id: string;
  title: string;
  price: string;
  description: string;
  accentColor: string;
  creamColor: string;
  bgColorTop: string;
  bgColorCenter: string;
  bgColorBottom: string;
  fruitType: "raspberry" | "mango" | "kiwi" | "blueberry" | "strawberry" | "cocoa";
  particlesColor: string;
}

export const FLAVORS: FlavorInfo[] = [
  {
    id: "raspberry",
    title: "PINK BERRY",
    price: "$120",
    description: "Sweet, sun-ripened forest raspberries paired with crunchy toasted almonds on a silky smooth greek yogurt base.",
    accentColor: "#ff2a5f",
    creamColor: "#ff5c8a",
    bgColorTop: "#3b000f",
    bgColorCenter: "#9e0031",
    bgColorBottom: "#210007",
    fruitType: "raspberry",
    particlesColor: "#ff7da1"
  },
  {
    id: "mango",
    title: "GOLD MANGO",
    price: "$125",
    description: "Sun-drenched Alphonso mango chunks blended with creamy greek yogurt, organic honey, and toasted coconut flakes.",
    accentColor: "#ff9f00",
    creamColor: "#ffb020",
    bgColorTop: "#3a1c00",
    bgColorCenter: "#b86d00",
    bgColorBottom: "#1f0e00",
    fruitType: "mango",
    particlesColor: "#ffd166"
  },
  {
    id: "kiwi",
    title: "SWEET KIWI",
    price: "$118",
    description: "Zesty organic kiwi slices paired with organic baby spinach, fresh lime infusion, and a base of creamy plant milk.",
    accentColor: "#76c043",
    creamColor: "#8cd867",
    bgColorTop: "#062300",
    bgColorCenter: "#2e7d32",
    bgColorBottom: "#001102",
    fruitType: "kiwi",
    particlesColor: "#a3e281"
  },
  {
    id: "blueberry",
    title: "DEEP BLUE",
    price: "$130",
    description: "Antioxidant-rich wild blueberries whipped with organic banana slices, raw walnuts, and vanilla almond milk cream.",
    accentColor: "#3f51b5",
    creamColor: "#5c6bc0",
    bgColorTop: "#0c0d34",
    bgColorCenter: "#1a237e",
    bgColorBottom: "#05051a",
    fruitType: "blueberry",
    particlesColor: "#9fa8da"
  },
  {
    id: "strawberry",
    title: "SWEET STRAW",
    price: "$115",
    description: "Freshly harvested field strawberries blended with organic dates, premium vanilla bean, and a splash of creamy oat milk.",
    accentColor: "#ff4d6d",
    creamColor: "#ff7096",
    bgColorTop: "#4a000c",
    bgColorCenter: "#c9184a",
    bgColorBottom: "#2c0005",
    fruitType: "strawberry",
    particlesColor: "#ff85a1"
  },
  {
    id: "cocoa",
    title: "COCOA SOUL",
    price: "$140",
    description: "Pure premium Belgian dark cocoa blended with rich hazelnut butter, organic medjool dates, and a creamy almond base.",
    accentColor: "#8d6e63",
    creamColor: "#5d4037",
    bgColorTop: "#27130c",
    bgColorCenter: "#4e342e",
    bgColorBottom: "#150905",
    fruitType: "cocoa",
    particlesColor: "#bcaaa4"
  }
];
