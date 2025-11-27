import {getAllUsers} from "@/app/actions/user.action";
import {adminUserUtil} from "@/utils/adminUser.util";
import SearchAuthors from "@/components/SearchAuthors";
import Link from "next/link";
import Image from "next/image";
import {CustomError} from "@/utils/customError.util";

export default async function AllUsersPage({searchParams}:{searchParams: Promise<{query?: string}>}){
    //----> Check for admin privilege.
    const isAdmin = await adminUserUtil();

    if (!isAdmin) {
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg">You are not permitted to view or perform any action on this page!</h1></div>
    }

    //----> Get the search query.
    const {query} = await searchParams;

    const{users, error} = await getAllUsers(query);

    if (error){
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg">{(error as CustomError)?.message}</h1></div>
    }

    return (
        <div className="overflow-x-auto bg-white m-6 shadow-inner rounded mx-4 p-3">
            <SearchAuthors path="/users"/>
            <table className="table table-zebra border-1 border-gray-200 p-3 mx-auto">
                <thead className="text-gray-200 text-xl bg-gray-500">
                <tr className="">
                    <th>Image</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users?.map((user) => {
                    return (
                        <tr key={user.id} className="text-base text-black">
                            <td>
                                <Image
                                    src={user.image}
                                    alt={user.name}
                                    width={80}
                                    height={80}
                                    className="aspect-square object-cover w-30 h-auto"
                                    priority
                                />
                            </td>
                            <td className="px-4">{user.name}</td>
                            <td className="px-4">{user.email}</td>
                            <td className="flex justify-between items-center">
                                <Link href={`/users/${user.id}/delete`} className="bg-zinc-200 text-rose-900 hover:text-zinc-200 hover:bg-rose-900 py-1 px-2 text-sm rounded-lg flex justify-center items-center text-muted font-semibold m-2">Delete</Link>

                                <Link href={`/users/${user.id}/detail`} className="bg-zinc-200 text-green-900 hover:text-zinc-200 hover:bg-green-900 py-1 px-2 text-sm rounded-lg flex justify-center items-center text-muted font-semibold m-2">Detail</Link>
                            </td>

                        </tr>
                    );
                })}
                </tbody>
            </table>
            <div className="flex items-center justify-end my-8">

            </div>
        </div>
    );
}