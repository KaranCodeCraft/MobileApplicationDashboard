import clientPromise from "@/lib/middleware/mongoose";
import Student from "@/lib/models/Student";
import jwt from "jsonwebtoken";


const secret = process.env.JWT_SECRET;

export async function GET(request) {
    try {
      await clientPromise;
      const authHeader = request.headers.get("Authorization");

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return new Response(JSON.stringify({ error: "Invalid Request" }), {
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

    const registeredById = decoded.id;

    // Fetch only the students registered by the current user
    const students = await Student.find({ registeredBy: registeredById });

    // If no students found for this user
    if (students.length === 0) {
      return new Response(
        JSON.stringify({ message: "No students registered by you" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Return the list of students
    return new Response(JSON.stringify({ students }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
    } catch (error) {
        console.error("Error fetching students:", error);
        return new Response(
          JSON.stringify({ error: "An unexpected error occurred" }),
          { status: 500, headers: { "Content-Type": "application/json" }}
        );
    }
}
export async function POST(request) {
  try {
    await clientPromise;

    const body = await request.json();

    const authHeader = request.headers.get("Authorization");
    // console.log(authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Invalid Request" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const token = authHeader.split(" ")[1];


    let decoded;

    try {

      decoded = jwt.verify(token, secret);
      
    } catch (error) {
      return new Response(
        JSON.stringify({ error: "Access Denied" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }


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
    const newStudent = new Student({
      name,
      enrollmentNumber,
      dob,
      aadharNumber,
      registeredBy: decoded.id, // Use the user ID from the decoded token
    });

    // Save the student
    await newStudent.save();

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

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return new Response(JSON.stringify({ error: errors.join(", ") }), {
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