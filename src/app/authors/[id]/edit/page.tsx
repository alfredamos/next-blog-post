
export default async function EditAuthorByIdPage({params}:{params: Promise<{id: string}>}) {
    console.log("In edit-author", await params)
    const {id} = await params;

    return (
        <h1>Edit author with id : {id}</h1>
    );
}