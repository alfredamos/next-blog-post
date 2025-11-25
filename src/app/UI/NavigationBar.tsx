import Link from "next/link";
import AuthAndAdminMenu from "@/app/UI/AuthAndAdminMenu";


const Navbar = () => {

    return (
        <nav className="bg-white shadow-md sticky top-0 bg-background z-10">
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
