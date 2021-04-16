function hasUserAllInfo(user) {
  if (
    user._id &&
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
