function hasUserAllInfo(user) {
  if (
    user.firstName &&
    user.lastName &&
    user.email &&
    user.birthday &&
    user.userName
  ) {
    return true;
  }
  return false;
}

function haveUsersSameInfo(user1, user2) {
  let areTheSame = true;
  if (Object.keys(user1).lenght === Object.keys(user2).lenght) {
    Object.keys(user1).forEach((key) => {
      if (user1[key] !== user2[key]) {
        areTheSame = false;
      }
    });
  } else {
    areTheSame = false;
  }

  return areTheSame;
}

function updateList(item, list) {
  const index = list.findIndex((element) => element._id === item._id);
  if (index === -1) {
    return [item, ...list];
  }
  return [...list];
}

function updateListById(item, list) {
  const newList = [...list];
  const index = newList.findIndex((element) => element._id === item._id);
  newList[index] = item;
  return newList;
}

function removeFromList(item, list) {
  const newList = [...list];
  const index = newList.findIndex((element) => element._id === item._id);
  if (index !== -1) {
    newList.splice(index, 1);
  }
  return [...newList];
}

function addToLikedList(item, likedList) {
  const newList = [...likedList];
  const index = newList.findIndex((element) => element._id === item._id);
  if (index === -1) {
    return [item, ...newList];
  }
  return newList;
}

function removeFromLikedList(item, likedList) {
  const newList = [...likedList];
  const index = newList.findIndex((element) => element._id === item._id);
  if (index !== -1) {
    newList.splice(index, 1);
  }
  return [...newList];
}

function isIdInList(id, List) {
  const index = List.findIndex((element) => element._id === id);
  return index !== -1;
}

function deleteAllInstancesFromList(item, list) {
  const newList = list.filter((element) => {
    return element._id !== item._id;
  });
  return newList;
}

function replaceAllInstancesFromList(item, list) {
  const newList = list.map((element) => {
    return element._id === item._id ? item : element;
  });
  return newList;
}

function calcMaxPages(list, itemsPerPage) {
  return list.length % itemsPerPage === 0
    ? list.length / itemsPerPage
    : Math.floor(list.length / itemsPerPage) + 1;
}

export {
  hasUserAllInfo,
  haveUsersSameInfo,
  updateList,
  updateListById,
  removeFromList,
  addToLikedList,
  removeFromLikedList,
  isIdInList,
  deleteAllInstancesFromList,
  replaceAllInstancesFromList,
  calcMaxPages,
};
