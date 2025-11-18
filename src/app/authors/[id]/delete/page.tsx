
export default async function DeleteAuthorByIdPage({params}:{params: Promise<{id: string}>}) {
    console.log("In delete-author", await params)
    const {id} = await params;

    return (
        <h1>Delete author with id : {id}</h1>
    );
}