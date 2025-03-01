const transformPhotoData = photo => ({
  id: photo.id,
  photo: {
    likes: photo.likes,
    description: photo.description,
    thumb: photo.urls.small,
    img: photo.urls.regular,
    download: photo.urls.full,
    liked: photo.liked_by_user,
    published: photo.created_at,
    color: photo.color,
  },
  user: {
    username: photo.user.username,
    link: photo.user.links.html,
    img: photo.user.profile_image.medium,
  },
});

export default transformPhotoData;
