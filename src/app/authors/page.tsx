import {getAllAuthors} from "@/app/actions/author.action";
import {adminUserUtil} from "@/utils/adminUser.util";
//import Image from "next/image";
import Link from "next/link";
//import {redirect} from "next/navigation";
import SearchAuthors from "@/components/SearchAuthors";

export default async function GetAllAuthorsPage({searchParams}:{searchParams: Promise<{query?: string}>}) {
    //----> Check for admin privilege.
    const isAdmin = await adminUserUtil();
    console.log("In all-authors-page", isAdmin);
    if (!isAdmin) {
        return <h1 className="flex justify-center items-center bg-white p-4">You are not permitted to view or perform any action on this page!</h1>
    }

    //----> Get the search params, if there are any.
    const {query} = await searchParams;

    const authors = await getAllAuthors(query);


    return (
        <div className="overflow-x-auto bg-white m-6 shadow-inner rounded mx-4 p-3">
            <SearchAuthors path="/authors"/>
            <table className="table table-zebra border-1 border-gray-200 p-3">
                <thead className="text-gray-200 text-xl bg-gray-500">
                <tr className="">
                    {/*<th>Image</th>*/}
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Gender</th>
                    <th>Birthday</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {authors?.map((author) => {
                    return (
                        <tr key={author.id} className="text-base text-black">
                            {/*<td>*/}
                            {/*    <Image*/}
                            {/*        src={author.image}*/}
                            {/*        alt={author.name}*/}
                            {/*        width={80}*/}
                            {/*        height={80}*/}
                            {/*        className="aspect-square object-cover w-20 h-auto"*/}
                            {/*        priority*/}
                            {/*    />*/}
                            {/*</td>*/}
                            <td className="px-4">{author.name}</td>
                            <td className="px-4">{author.email}</td>
                            <td className="px-4">{author.phone}</td>
                            <td className="px-4">{author.gender}</td>
                            <td className="px-4">{author.dateOfBirth.toLocaleDateString()}</td>
                            <td className="flex justify-between items-center">
                                <Link href={`/authors/${author.id}/edit`} className="bg-zinc-200 text-indigo-900 hover:text-zinc-200 hover:bg-indigo-900 py-1 px-2 text-sm rounded-lg flex justify-center items-center text-muted font-semibold m-2">Edit</Link>

                                <Link href={`/authors/${author.id}/delete`} className="bg-zinc-200 text-rose-900 hover:text-zinc-200 hover:bg-rose-900 py-1 px-2 text-sm rounded-lg flex justify-center items-center text-muted font-semibold m-2">Delete</Link>

                                <Link href={`/authors/${author.id}/detail`} className="bg-zinc-200 text-green-900 hover:text-zinc-200 hover:bg-green-900 py-1 px-2 text-sm rounded-lg flex justify-center items-center text-muted font-semibold m-2">Detail</Link>
                            </td>

                        </tr>
                    );
                })}
                </tbody>
            </table>
            <div className="flex items-center justify-end my-8">
                <Link
                    href="/pizzas/new"
                    className="bg-indigo-500 text-indigo-100 px-12 py-4 rounded-lg uppercase font-bold"
                >
                    Add Pizza
                </Link>
            </div>
        </div>

    );
}