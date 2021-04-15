function hasUserAllInfo(user) {
  if (user._id && user.firstName && user.lastName && user.email) {
    return true;
  }
  return false;
}

export { hasUserAllInfo };
