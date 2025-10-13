export const sendToken = async (user, statusCode, message, res) => {

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave: false});

    user.password = undefined;

    res.status(statusCode).cookie("refreshToken", refreshToken,{
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE*24*60*60*1000),
        httpOnly : true,
    }).json({
        statusCode: 200,
        success: true,
        message,
        user,
        accessToken
    })
}