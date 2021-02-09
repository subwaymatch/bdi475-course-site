export const clickableVariants = {
  hover: {
    y: 2,
    transition: {
      duration: 0.1,
    },
  },
  tap: {
    scale: 0.98,
  },
};

// Tweaked clickable animation for small texts and buttons
export const smallClickableVariants = Object.assign({}, clickableVariants, {
  hover: {
    y: 1,
  },
  tap: {
    scale: 0.96,
  },
});
