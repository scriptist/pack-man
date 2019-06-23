import { ClothingCategory, FreqUnits } from "./constants";

export const activities = ["Drive", "Friends", "Gym", "Swim"];

export const list = [
  {
    category: ClothingCategory,
    permanent: true,
    items: [
      {
        count: 1,
        name: "Pants",
        frequency: {
          number: 1,
          unit: FreqUnits.Day
        },
        conditions: []
      },
      {
        count: 1,
        name: "Tops",
        frequency: {
          number: 1,
          unit: FreqUnits.Day
        },
        conditions: []
      },
      {
        count: 1,
        name: "Underpants",
        frequency: {
          number: 1,
          unit: FreqUnits.Day
        },
        conditions: []
      },
      {
        count: 2,
        name: "Socks",
        frequency: {
          number: 1,
          unit: FreqUnits.Day
        },
        conditions: []
      }
    ]
  },
  {
    category: "Toiletries",
    items: []
  },
  {
    category: "Electronics",
    items: []
  },
  {
    category: "Misc",
    items: []
  }
];
