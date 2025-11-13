import Link from "next/link";
import AuthAndAdminMenu from "@/app/AuthAndAdminMenu";


const Navbar = () => {

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/posts" className="py-2 px-4 text-sm font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition duration-300">
                            Blog
                        </Link>
                    </div>
            <AuthAndAdminMenu />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
