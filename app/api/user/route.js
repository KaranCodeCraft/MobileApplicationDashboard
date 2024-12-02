import clientPromise from "@/lib/middleware/mongoose";
import User from "@/lib/models/User";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;


export async function POST(request) {
  try {
    await clientPromise;

    const body = await request.json();

    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Access Denied" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const token = authHeader.split(" ")[1];

        let decoded;

        try {
          decoded = jwt.verify(token, secret);
        } catch (error) {          
          return new Response(JSON.stringify({ error: "Access Denied" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
          });
        }

        const { name, id, role, email, password } = body;
        if (!id || !role || !name || !email || !password) {
          return new Response(
            JSON.stringify({
              error:
                "All fields are required",
            }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }

    // Create a new user instance
    const newUser = new User(body);
    await newUser.save(); // Save the new user

    // Success response
    return new Response(JSON.stringify(newUser), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating user:", error);


    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyValue)[0]; 
      const duplicateValue = error.keyValue[duplicateField]; 

      return new Response(
        JSON.stringify({
          error: `${duplicateField.toLocaleUpperCase()} "${duplicateValue}" Already exists.`,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return new Response(JSON.stringify({ error: errors.join(", ") }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Handle generic errors
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
