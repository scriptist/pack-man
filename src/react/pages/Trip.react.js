import React from "react";
import { useListVals, useObjectVal } from "react-firebase-hooks/database";

import { ClothingCategory, FreqUnits } from "../../constants";
import firebase from "../../firebase";
import { getDays } from "../../utils";
import ErrorPage from "./ErrorPage.react";
import Spinner from "./Spinner.react";

function Trip({ match, user }) {
  const [trip, tripLoading, tripError] = useObjectVal(
    firebase.database().ref(`users/${user.uid}/trips/${match.params.id}`)
  );
  const [categories, catLoading, catError] = useListVals(
    firebase.database().ref(`users/${user.uid}/items`)
  );

  if (tripError || catError) {
    return <ErrorPage error={tripError || catError} />;
  } else if (tripLoading || catLoading) {
    return <Spinner />;
  } else if (trip == null || categories == null) {
    return <ErrorPage error={new Error("Could not find trip or config")} />;
  }

  console.log(categories[3].items);

  return (
    <>
      <h1>Trip</h1>
      {categories.map((category, i) => (
        <div key={i}>
          <h2>{category.category}</h2>
          <ul>
            {(category.items || []).map((item, i) => (
              <Item
                isClothing={category.category === ClothingCategory}
                item={item}
                key={i}
                trip={trip}
              />
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

// Helpers

function Item({ isClothing, item, trip }) {
  const count = getItemCount(isClothing, item, trip);
  if (!checkItemConditions(item, trip) || count === 0) {
    return null;
  }

  return (
    <li>
      {count}&times; {item.name}
    </li>
  );
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
        isClothing
          ? getClothingDays(unit, trip)
          : getDays(trip.dates[0], trip.dates[1]) / 7
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

export default Trip;
