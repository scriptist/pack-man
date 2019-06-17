import React from "react";

import { ClothingCategory, FreqUnits } from "../../../constants";
import { getDays } from "../../../utils";
import { Heading2 } from "../Heading.react";
import Item from "./Item.react";

function Category({ category, onChange, trip }) {
  const items = (category.items || [])
    .map(item => mapItem(item, trip, category === ClothingCategory))
    .filter(Boolean);

  if (items.length === 0) {
    return null;
  }

  return (
    <div>
      <Heading2>{category.category}</Heading2>
      <ul>
        {items.map((item, i) => (
          <Item key={i} {...item} />
        ))}
      </ul>
    </div>
  );
}

// Helpers

function mapItem(item, trip, isClothing) {
  const count = getItemCount(isClothing, item, trip);
  if (!checkItemConditions(item, trip) || count === 0) {
    return null;
  }

  return {
    count,
    name: item.name
  };
}

function checkItemConditions(item, trip) {
  // TODO
  return true;
}

function getItemCount(isClothing, item, trip) {
  return item.count * getFrequency(isClothing, item, trip);
}

function getFrequency(isClothing, item, trip) {
  const { unit, number } = item.frequency;
  return Math.ceil(getFrequencyUnitCount(isClothing, unit, trip) / number);
}

function getFrequencyUnitCount(isClothing, unit, trip) {
  switch (unit) {
    case FreqUnits.Trip:
      return 1;
    case FreqUnits.Day:
      return isClothing
        ? getClothingDays(unit, trip)
        : getDays(trip.dates[0], trip.dates[1]);
    case FreqUnits.Week:
      return Math.ceil(
        (isClothing
          ? getClothingDays(unit, trip)
          : getDays(trip.dates[0], trip.dates[1])) / 7
      );
    case FreqUnits.Flight:
      return trip.flights || 0;
    case FreqUnits.OvernightFlight:
      return trip.overnightFlights || 0;
    default:
      throw new Error(`Unable to get frequency for unit ${unit}`);
  }
}

function getClothingDays(unit, trip) {
  return trip.laundry || getDays(trip.dates[0], trip.dates[1]);
}

export default Category;
