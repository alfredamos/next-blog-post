import Form from "next/form"

type Prop = {
    path: string;
}

export default function SearchAuthors({path}: Prop) {
    return (
        <Form action={path}>
            <div className="flex justify-between items-center mb-5 mt-5 w-3/4 mx-auto">
                <input
                    type="search"
                    name="query"
                    className="border-solid border-2 border-gray-300  focus:border-solid focus:border-indigo-600 focus:outline-none text-black w-full rounded-lg p-3"
                />
                <button className="bg-blue-900 hover:bg-rose-700 text-blue-200 text-lg font-bold py-3 px-8 rounded-lg mx-4 uppercase">
                    Search
                </button>
            </div>
        </Form>
    );
}