import jwt from 'jsonwebtoken'

export const createJWTClaims = (user, secret, expiresIn) => {
  return jwt.sign({
	  user: {
	  	...user
	  }
  }, secret, {
    expiresIn
  })
}

export const verifyJWTToken = (token, withSecretName) => {
  return new Promise((resolve, reject) => {
    let secret = process.env.JWT_ACCESS_SECRET
    if (withSecretName === 'JWT_REFRESH_SECRET') {
      secret = process.env.JWT_REFRESH_SECRET
    }

    jwt.verify(token, secret, (err, decoded) => {
		  if (err) {
		  	return reject(err)
		  }

		  resolve(true)
    })
  })
}

export const createAccessAndRefreshTokens = (user) => {
  return {
    accessToken: createJWTClaims(user, process.env.JWT_ACCESS_SECRET, '3d'),
    refreshToken: createJWTClaims(user, process.env.JWT_REFRESH_SECRET, '3d')
  }
}
