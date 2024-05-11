import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    // console.log(req.headers.authorization.split(" ")[1]);
    const token = req.headers.authorization.split(" ")[1];
    let decodedData;
    if (token) {
      decodedData = jwt.verify(token, "secret");
      req.userId = decodedData?.id;
    }
    next();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export default auth;
