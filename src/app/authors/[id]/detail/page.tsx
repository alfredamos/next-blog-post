import DetailPostCardButtons from "@/components/DetailPostCardButtons";
import Card from "@/components/Card";
import {getAuthorId} from "@/app/actions/author.action";
import {Author} from "@prisma/client";
import {CustomError} from "@/utils/customError.util";

export default async function GetAuthorByIdPage({params}:{params: Promise<{id: string}>}) {
    console.log("In detail-author", await params)
    const {id} = await params;

    const {author : currentAuthor, error} = await getAuthorId(id);

    if (error){
        return <div className="h-dvh flex justify-center items-center"><h1 className="font-bold p-10 bg-red-200 ring-1 ring-red-200 rounded-lg shadow-lg">{(error as CustomError)?.message}</h1></div>
    }

    const author = currentAuthor as Author;

    return (
        <Card name={author.name} address={author.address} image={author.image} path="authors" >
            <DetailPostCardButtons id={id} isAddButton={false} isEditButton={true} path="authors"/>
        </Card>

    );
}