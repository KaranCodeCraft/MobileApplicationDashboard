"use server";
import StudentTable from "@/app/lib/StudentTable";
import SignupForm from "@/app/signUp/page";
import Modal from "@/app/ui/Modal";
import clientPromise from "@/lib/middleware/mongoose";
import Student from "@/lib/models/Student";


export default async function Students() {
  let data = null; // Initialize data to null

  try {
    await clientPromise;

    // Fetch students from the database
    const students = await Student.find();

    // If students are found, format the data
    if (students.length > 0) {
      data = students.map((student) => ({
        _id: student._id.toString(), // Convert ObjectId to string
        name: student.name,
        enrollmentNumber: student.enrollmentNumber,
        dob: student.dob,
        aadharNumber: student.aadharNumber,
        createdAt: student.createdAt.toISOString(), // Convert Date to ISO string
      }));
    }
  } catch (error) {
    console.error("Error fetching students:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

 

  // Render the page with student data
  return (
      <div className="overflow-y-auto min-h-72">
        <Modal heading={"Add student"} content={<SignupForm/>}/>
      <h1>Student List</h1>
      <div className="items-end">

      <StudentTable data={data} />
      </div>
    </div>
  );
}