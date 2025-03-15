import userModel from "../Models/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
const signUp = async (req, res) => {
  try {
    const { username, email, password, address } = req.body;
    // check the Length of username field
    if (username.length < 5) {
      return res.status(400).json({
        success: false,
        msg: "UserName must be greater than 4 letters",
      });
    }
    //check the existingUser
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, msg: "This Email is Already Taken" });
    }
    //check password Length
    if (password.length < 5) {
      return res.status(400).json({
        success: false,
        msg: "Password must be greater than 4 letters",
      });
    }
    //new User Added
    const userAdded = await userModel.create({
      username,
      email,
      password,
      address,
    });
    res
      .status(200)
      .json({ msg: "Registered Successfully", success: true, userAdded });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Internal Server Error",
    });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check existingUser
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        msg: "This Email does not exist. Please register first.",
      });
    }

    // Compare the password
    const matchPassword = await bcryptjs.compare(
      password,
      existingUser.password
    );
    if (!matchPassword) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid Credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: existingUser._id,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );

    // Respond with success if the password matches
    res.status(200).json({
      role: existingUser.role,
      msg: "Login Successfully",
      success: true,
      id: existingUser._id,
      user: {
        username: existingUser.username,
        email: existingUser.email,
        address: existingUser.address,
        id: existingUser._id,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

// get-user-information
const getUserInformation = async (req, res) => {
  try {
    const { id } = req.headers;
    const data = await userModel.findById(id).select("-password");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};
//update address
const updateAddress = async (req, res) => {
  try {
    const { id } = req.headers;
    const { address } = req.body;
    const updateAddress = await userModel.findByIdAndUpdate(id, {
      address: address,
    });
    if (updateAddress) {
      res
        .status(200)
        .json({ success: true, msg: "Address Updated Successfully" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

export { signUp, signIn, getUserInformation, updateAddress };
