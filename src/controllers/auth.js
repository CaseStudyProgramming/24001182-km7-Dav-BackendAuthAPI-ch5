// src/controllers/auth.js

const JSONbig = require("json-bigint")({ storeAsString: true });
const { z } = require("zod");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { imageUpload } = require("../utils/images-kit");

const prisma = new PrismaClient();

// Validasi menggunakan Zod
const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  profile_picture: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// Register
exports.register = async (req, res) => {
  const validationResult = registerSchema.safeParse(req.body);
  if (!validationResult.success) {
    return res.status(400).json({ errors: validationResult.error.errors });
  }

  const { name, email, password } = validationResult.data;

  try {
    // Cek apakah email sudah terdaftar
    const existingUser = await prisma.users.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "Email is already registered." });
    }

    let profilePictureUrl = null;
    if (req.files && req.files.profile_picture) {
      profilePictureUrl = await imageUpload(req.files.profile_picture);
    }

    // Hash password dan buat user baru
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
        profile_picture: profilePictureUrl,
        role_id: 2,
      },
    });

    delete newUser.password;

    const userResponse = {
      id: newUser.id.toString(),
      name: newUser.name,
      email: newUser.email,
      profile_picture: newUser.profile_picture,
      role_id: newUser.role_id,
    };

    res.setHeader("Content-Type", "application/json");
    res.send(
      JSONbig.stringify({
        message: "User registered successfully",
        user: userResponse,
      })
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred during registration." });
  }
};

// Login
exports.login = async (req, res) => {
  const validationResult = loginSchema.safeParse(req.body);
  if (!validationResult.success) {
    return res.status(400).json({ errors: validationResult.error.errors });
  }

  const { email, password } = validationResult.data;

  try {
    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined.");
      return res.status(500).json({ message: "Internal server error." });
    }

    const token = jwt.sign(
      { id: user.id.toString(), role_id: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.setHeader("Content-Type", "application/json");
    res.send(
      JSONbig.stringify({
        message: "Login successful",
        token,
        role_id: user.role_id,
      })
    );
  } catch (error) {
    console.error("Error during login:", error.message);
    return res.status(500).json({ message: "An error occurred during login." });
  }
};

// Get Profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // User ID
    const user = await prisma.users.findUnique({
      where: { id: BigInt(userId) },
      select: {
        id: true,
        name: true,
        email: true,
        profile_picture: true,
        role_id: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Convert id to string to ensure consistency in JSONbig.stringify response
    user.id = user.id.toString();

    res.setHeader("Content-Type", "application/json");
    res.send(
      JSONbig.stringify({
        message: "Profile retrieved successfully",
        user,
      })
    );
  } catch (error) {
    console.error("Error retrieving profile:", error.message);
    return res
      .status(500)
      .json({ message: "An error occurred while retrieving the profile." });
  }
};
