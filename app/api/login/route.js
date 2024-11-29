import clientPromise from "@/lib/middleware/mongoose";
import User from "@/lib/models/User";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request) {
  try {
    await clientPromise; // Ensure MongoDB is connected

    const { email, password } = await request.json();

    // Check if email and password are provided
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ error: "Invalid Credentials" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check the password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Respond with the token
    return new Response(
      JSON.stringify({ token, message: "Login successful" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error logging in:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
