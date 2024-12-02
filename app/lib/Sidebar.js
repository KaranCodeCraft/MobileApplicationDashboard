export default function Sidebar() {
    return (
        <div className="bg-white text-blue-800 w-64 h-full fixed top-0 left-0 transform transition-transform duration-300 ease-in-out md:translate-x-0 -translate-x-full md:relative md:h-auto">
            <div className="flex flex-col h-full">
                <div className="p-4 text-lg font-bold border-b border-blue-300">
                    MenuBar
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <a href="#" className="block p-2 rounded hover:bg-blue-100">
                        Students
                    </a>
                    <a href="#" className="block p-2 rounded hover:bg-blue-100">
                        Notification
                    </a>
                    <a href="#" className="block p-2 rounded hover:bg-blue-100">
                        Marsheet Upload
                    </a>
                    <a href="#" className="block p-2 rounded hover:bg-blue-100">
                        Users
                    </a>
                </nav>
            </div>
        </div>
    );
}