import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">
        Welcome to SGTU Mobile Application Dashboard
      </h1>
      <div className="flex gap-5">
        <Link href="/signUp"><button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
          Sign Up
        </button></Link>
        <Link href="/login"><button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
          Login
        </button></Link>
      </div>
    </main>
  );
}
