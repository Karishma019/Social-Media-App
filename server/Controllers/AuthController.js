import User from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { username, email, password, firstName, lastName } = req.body;
  const salt = await bcrypt.genSalt(10);

  try {
    const exisitingEmail = await User.findOne({ email });
    const exisitingUser = await User.findOne({ username });
    if (exisitingUser) {
      return res.status(400).json({ message: "Username already exists" });
    } else if (exisitingEmail) {
      return res.status(400).json({ message: "email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, salt);
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "secret", {
      expiresIn: "1h",
    });
    res.status(200).json({ result, token });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const oldUser = await User.findOne({ email: email });
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: oldUser.email, id: oldUser._id },
      "secret",
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json(err);
  }
};
