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

export { hasUserAllInfo };
