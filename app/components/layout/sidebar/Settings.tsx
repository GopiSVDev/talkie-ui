import { easeInOut } from 'motion/react';

export const settingsAnimation = {
  initial: { x: '100%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '100%', opacity: 0 },
  transition: { duration: 0.3, ease: easeInOut },
};

const Settings = () => {
  return <div>Settings</div>;
};

export default Settings;
