import Link from "next/link";
import AdjustBlogTextContent from "@/app/authors/[id]/detail/AdjustBlogTextContent";

export default async function GetAuthorByIdPage({params}:{params: Promise<{id: string}>}) {
    console.log("In detail-author", await params)
    const {id} = await params;

    return (
        <article className="bg-zinc-100 shadow-3xl max-w-md mx-auto grid grid-rows-4 gap-4 mt-12 rounded-lg prose lg:prose-xl overflow-auto my-10">
            {/*This container will have 3 columns and 4 rows */}
            <div> <h1 className="text-center py-2 font-bold">Title</h1></div>
            <hr/>
            <div className="flex flex-wrap gap-12 px-4 semi-bold">
                <figure>
                    {/*<img src="pic_trulli.jpg" alt="Trulli, typical housing from Puglia, Italy" style="width:100%">*/}
                    <figcaption>Photo</figcaption>
                </figure>
                <span>Name</span>
            </div>
            <hr/>
            <AdjustBlogTextContent content="This paragraph contains a very long word that should wrap: pneumonoultramicroscopicsilicovolcanoconiosis.This paragraph contains a very long word that should wrap: pneumonoultramicroscopicsilicovolcanoconiosis.This paragraph contains a very long word that should wrap: pneumonoultramicroscopicsilicovolcanoconiosis."/>
            <hr/>
            <div className="flex justify-between items-center px-4 py-6">
                <Link href={`/authors/${id}/edit`} className="bg-zinc-100 text-indigo-900 hover:text-zinc-100 hover:bg-indigo-900 hover:border-100 border-2 border-indigo-900 px-4 py-2 font-bold rounded-md">Edit</Link>
                <Link href={`/authors/${id}/delete`} className="bg-zinc-100 text-rose-900 hover:text-zinc-100 hover:bg-rose-900 hover:border-100 border-2 border-rose-900 px-4 py-2 font-bold rounded-md">Delete</Link>
            </div>

        </article>

    );
}