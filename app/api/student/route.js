import clientPromise from "@/lib/middleware/mongoose";
import Student from "@/lib/models/Student";

export async function POST(request) {
  try {
    await clientPromise; // Ensure MongoDB is connected

    const body = await request.json();

    // Validate input fields
    const { name, enrollmentNumber, dob, aadharNumber } = body;
    if (!name || !enrollmentNumber || !dob || !aadharNumber) {
      return new Response(
        JSON.stringify({
          error:
            "All fields are required: name, enrollmentNumber, dob, aadharNumber",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create a new student
    const newStudent = await Student.create({
      name,
      enrollmentNumber,
      dob,
      aadharNumber,
    });

    // Respond with success
    return new Response(
      JSON.stringify({
        message: "Student registered successfully",
        student: newStudent,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error registering student:", error);

    // Handle duplicate key errors
    if (error.message.includes("Duplicate value")) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Log full error for debugging and respond with generic error
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
