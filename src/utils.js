export function getDays(from, to) {
  if (from == null || to == null) {
    return null;
  }

  const durationSecs = (new Date(to) - new Date(from)) / 1000;
  return Math.round(durationSecs / 60 / 60 / 24) + 1;
}
