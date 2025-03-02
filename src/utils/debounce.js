const debounceRaf = func => {
  let raf = 0;

  return (...args) => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      func(...args);
      raf = 0;
    });
  };
};

export default debounceRaf;
