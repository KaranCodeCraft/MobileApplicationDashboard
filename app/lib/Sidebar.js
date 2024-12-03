"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const pathname = usePathname();
    return (
        <div className="bg-white text-blue-800 min-w-60 h-full fixed top-0 left-0 transform transition-transform duration-300 ease-in-out md:translate-x-0 -translate-x-full md:relative md:h-auto px-1">
            <div className="flex flex-col h-full">
                <Link href="/home" className={`p-4 text-lg font-bold border-b border-blue-300 ${pathname === '/home' ? 'bg-blue-100' : ''}`}>
                    <svg className="inline-block w-6 h-6 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m-4 4h16a2 2 0 002-2V10a2 2 0 00-.586-1.414l-8-8a2 2 0 00-2.828 0l-8 8A2 2 0 002 10v10a2 2 0 002 2z"></path>
                    </svg>
                    Dashboard
                </Link>
                <nav className="flex-1 p-2 space-y-2">
                    <Link href="/student" className={`block p-2 rounded hover:bg-blue-100 transition-colors duration-200 ${pathname === '/student' ? 'bg-blue-100' : ''}`}>
                        <svg className="inline-block w-6 h-6 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422A12.083 12.083 0 0118 20.5c0 1.38-.56 2.63-1.464 3.536A5.002 5.002 0 0112 24a5.002 5.002 0 01-4.536-2.964A5.002 5.002 0 016 20.5c0-1.38.56-2.63 1.464-3.536A12.083 12.083 0 0112 14z"></path>
                        </svg>
                        Students
                    </Link>
                    <Link href="#" className={`block p-2 rounded hover:bg-blue-100 transition-colors duration-200 ${pathname === '#' ? 'bg-blue-100' : ''}`}>
                        <svg className="inline-block w-6 h-6 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8z"></path>
                        </svg>
                        Notification
                    </Link>
                    <Link href="#" className={`block p-2 rounded hover:bg-blue-100 transition-colors duration-200 ${pathname === '#' ? 'bg-blue-100' : ''}`}>
                        <svg className="inline-block w-6 h-6 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Marsheet Upload
                    </Link>
                    <Link href="/user" className={`block p-2 rounded hover:bg-blue-100 transition-colors duration-200 ${pathname === '/user' ? 'bg-blue-100' : ''}`}>
                        <svg className="inline-block w-6 h-6 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A4.992 4.992 0 0112 15a4.992 4.992 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21v-2a4 4 0 00-3-3.87"></path>
                        </svg>
                        Users
                    </Link>
                </nav>
            </div>
        </div>
    );
}