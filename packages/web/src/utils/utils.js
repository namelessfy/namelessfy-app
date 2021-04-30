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

export { hasUserAllInfo, haveUsersSameInfo, updateList };
