import bcrypt from 'bcryptjs'

const SALT_ROUNDS = 12

export const generateHashFromPassword = (myPlaintextPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(myPlaintextPassword, SALT_ROUNDS, (err, hash) => {
		 	if (err) {
        return reject(err)
      }

		    resolve(hash)
    })
  })
}

export const passwordMatched = (myPlaintextPassword, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(myPlaintextPassword, hash, (err, res) => {
      if (err) {
        return reject(err)
      }

		    resolve(res)
    })
  })
}
