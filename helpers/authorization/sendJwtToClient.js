const sendJwtToClient = (user, res) => {
  const token = user.generateJWTFromUser();

  const { JWT_COOKIE_EXPIRE, NODE_ENV } = process.env;
  return res
    .status(200)
    .cookie("access_token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + parseInt(JWT_COOKIE_EXPIRE) * 1000),
      secure: NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      access_token: token,
      data: {
        name: user.name,
        email: user.email,
      },
    });
};

module.exports = sendJwtToClient;
