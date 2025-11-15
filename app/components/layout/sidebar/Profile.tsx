import { easeInOut } from 'motion/react';

export const profileAnimation = {
  initial: { x: '100%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '100%', opacity: 0 },
  transition: { duration: 0.3, ease: easeInOut },
};

const Profile = () => {
  return <div>Profile</div>;
};

export default Profile;
