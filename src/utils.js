export function getDays(from, to) {
  if (from == null || to == null) {
    return null;
  }

  const durationSecs = (new Date(to) - new Date(from)) / 1000;
  return Math.round(durationSecs / 60 / 60 / 24) + 1;
}

export function getConditionText([field, value]) {
  switch (typeof value) {
    case "boolean":
      const split = field.replace(/([A-Z])/g, " $1");
      const titleCase = `${split.charAt(0).toUpperCase()}${split.slice(1)}`;
      return `${value ? "" : "No "}${titleCase}`;
    default:
      return value;
  }
}
