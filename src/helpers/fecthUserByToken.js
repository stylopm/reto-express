const fecthUserByToken = (req) => {
    return new Promise((resolve, reject) => {
        if(req.headers && req.headers.authorization){
            let authorization = req.headers.authorization
            let decoded
            try{
                decoded = JsonWebToken.verify(authorization, process.env.SECRET_JWT_CODE)
            } catch (e) {
              reject("Token no valido")
              return
            }
            let userId = decoded.id
            User.findOne({ _id: userId }).then(
              (user) => resolve(user)
            ).catch((err)=>{
              reject("Token Error")
            })
        } else {
          reject("No token found")
        }
    })
  }
  

  module.exports = {
    fecthUserByToken
  };
  