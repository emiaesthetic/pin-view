const updatePin = (pin, payload) => {
  if (pin.id === payload.id) {
    return {
      ...pin,
      photo: {
        ...pin.photo,
        liked: !payload.liked,
        likes: pin.photo.likes + (!payload.liked ? 1 : -1),
      },
    };
  }

  return pin;
};

export default updatePin;
