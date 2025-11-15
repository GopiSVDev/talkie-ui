import { easeInOut } from 'motion/react';

export const searchListAnimation = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.9, opacity: 0 },
  transition: {
    duration: 0.1,
    ease: easeInOut,
    scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
  },
};

const SearchList = () => {
  return <div>SearchList</div>;
};

export default SearchList;
