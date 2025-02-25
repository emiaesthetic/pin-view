const formatDate = isoDate => {
  if (!isoDate) return;

  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  return new Intl.DateTimeFormat('ru', options).format(new Date(isoDate));
};

export default formatDate;
