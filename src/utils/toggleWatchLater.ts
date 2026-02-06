export const toggleWatchLater = (movieId: number | string, currentIds: string[], remove = false): string[] => {
  const wId = String(movieId);

  let updated = [...currentIds];

  if (remove) {
    updated = updated.filter((ids) => ids != wId);
  } else if (!updated.includes(wId)) {
    // updated.push(wId);
    updated= [wId,...updated]

  }

  localStorage.setItem("watch_later", JSON.stringify(updated));

  return updated;
};
