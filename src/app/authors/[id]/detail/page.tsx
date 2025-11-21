import DetailPostCardButtons from "@/components/DetailPostCardButtons";
import Card from "@/components/Card";
import {getAuthorId} from "@/app/actions/author.action";

export default async function GetAuthorByIdPage({params}:{params: Promise<{id: string}>}) {
    console.log("In detail-author", await params)
    const {id} = await params;

    const author = await getAuthorId(id);

    return (
        <Card name={author.name} address={author.address} image={author.image} path="authors" >
            <DetailPostCardButtons id={id} isAddButton={false} isEditButton={true} path="authors"/>
        </Card>

    );
}