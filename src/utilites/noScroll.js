const addNoScroll = () => {
  document.documentElement.classList.add("no-scroll");
};

const removeNoScroll = () => {
  document.documentElement.classList.remove("no-scroll");
};

export { addNoScroll, removeNoScroll };
