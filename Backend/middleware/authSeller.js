import jwt from "jsonwebtoken";

const authSeller = async (req, res, next) => {
  const { sellerToken } = req.cookies;

  if (!sellerToken) {
    return res.json({ success: false, message: "Not Authorized" });
  }
  try {
    const tokenDecoded = jwt.verify(sellerToken, process.env.JWT_SECRET);
    if (tokenDecoded.email === process.env.SELLER_EMAIL) {
      return next();
    } else {
      return res.json({ success: false, message: "Not Authorized" });
    }
  } catch (error) {
    console.error(error.message);
    res.json({ message: "Server Error !" });
  }
};

export default authSeller;
