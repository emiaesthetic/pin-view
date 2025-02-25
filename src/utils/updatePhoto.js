const updatePhoto = (photoData, payload) => {
  if (photoData.id === payload.id) {
    return { ...photoData, photo: { ...photoData.photo, ...payload } };
  }

  return photoData;
};

export default updatePhoto;
