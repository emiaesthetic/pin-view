const toggleLike = (pin, pinID) => {
  if (pin.id === pinID) {
    return {
      ...pin,
      photo: {
        ...pin.photo,
        liked: !pin.photo.liked,
        likes: pin.photo.likes + (!pin.photo.liked ? 1 : -1),
      },
    };
  }

  return pin;
};

export default toggleLike;
