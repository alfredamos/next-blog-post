
export default async function GetAuthorByIdPage({params}:{params: Promise<{id: string}>}) {
    console.log("In detail-author", await params)
    const {id} = await params;

    return (
        <h1>Fetch author with id : {id}</h1>
    );
}