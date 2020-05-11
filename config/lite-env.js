let liteEnv = {
  BACKEND_URL: 'http://localhost:3000',
  GOOGLE_CLIENT_ID: '356030181864-r3f0tk6q7gd75iehf26t4oq7m55dm5e0.apps.googleusercontent.com'
};

if (process.env.NODE_ENV !== 'development') { // Production or Staging
  liteEnv = {
    BACKEND_URL: 'http://www.missingconcepts.com',
    GOOGLE_CLIENT_ID: '356030181864-tojh3pfuum74lnipqaog75o4hk3ejq78.apps.googleusercontent.com'
  };
}

export default liteEnv;
