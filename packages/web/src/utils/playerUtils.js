export function shuffle(list) {
  const listShuffled = [...list];
  listShuffled.forEach((song, index) => {
    const newPos = Math.floor(Math.random() * listShuffled.length);
    listShuffled[index] = listShuffled[newPos];
    listShuffled[newPos] = song;
  });
  return listShuffled;
}

export function startListByIndex(index, list) {
  const firstPart = list.slice(0, index);
  const secondPart = list.slice(index + 1, list.lenght);
  const newList = secondPart.concat(firstPart);

  return newList;
}
