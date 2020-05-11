import { getUserFromCookie } from '~/util/cookie';

const state = () => ({
  user: getUserFromCookie() 
});

export default state;
