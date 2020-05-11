import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

export const fetchClaims = (token) => {
  let claims;
  try {
	    claims = jwtDecode(token);
  } catch (error) {	   
	    return null;
  }

  return claims;
};

export const setAccessTokenCookie = (accessToken) => {
  const claims = fetchClaims(accessToken);
  if (claims) {
  	Cookies.set('accessToken', accessToken, {
  	  expires: new Date(claims.exp * 1000),
  	  path: '/'
    });
  }   
};

export const setRefreshTokenCookie = (refreshToken) => {
  const claims = fetchClaims(refreshToken);
  	if (claims) {
	  	Cookies.set('refreshToken', refreshToken, {
  		  expires: new Date(claims.exp * 1000),
  		  path: '/'
    }); 
  } 
};

export const setAuthTokens = (userAuth) => {
  setAccessTokenCookie(userAuth.accessToken);  
  setRefreshTokenCookie(userAuth.refreshToken); 
};

export const getAuthTokens = () => ({
  accessToken: Cookies.get('accessToken'),
  refreshToken: Cookies.get('refreshToken')
});

export const removeAuthTokens = () => {
  Cookies.remove('refreshToken');
  Cookies.remove('accessToken');
};

export const getUserFromCookie = () => {
  const refreshToken = Cookies.get('refreshToken') || '';
  if (refreshToken) {
    const claims = fetchClaims(refreshToken);
    return (claims && claims.user) ? claims.user : null;    
  }

  return null;
};

const getUserId = () => {
  const user = getUserFromCookie();  
  return user ? user.uid : '';
};

export const setUserLangRegion = (langRegion) => {
  if (langRegion) {
    Cookies.set('langRegionPref', langRegion, {
      expires: new Date('2038-01-19 04:14:07'),
      path: '/'
    });
  } 
};

export const getUserLangRegion = () => {
  return Cookies.get('langRegionPref');
};

export default getUserId;
