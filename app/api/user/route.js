import clientPromise from "@/lib/middleware/mongoose";
import User from "@/lib/models/User";

export async function POST(request) {
  try {
    await clientPromise; // Ensure MongoDB is connected

    const body = await request.json();

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

    // Handle MongoDB duplicate key error (11000)
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyValue)[0]; // Field that caused duplication (e.g. 'id')
      const duplicateValue = error.keyValue[duplicateField]; // The duplicate value (e.g. '7')

      return new Response(
        JSON.stringify({
          error: `Duplicate value '${duplicateValue}' found for field '${duplicateField}'. Please use a unique value.`,
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
