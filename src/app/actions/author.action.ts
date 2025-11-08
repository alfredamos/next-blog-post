"use server"

import {Author} from "@prisma/client";
import {authorModel} from "@/models/author.model";

export async function deleteAuthorId(id: string){
    //----> Delete the author with given id.
    return await authorModel.deleteAuthorById(id);
}

export async function editAuthorId(id: string, authorToEdit: Author){
    //----> Edit the author with given id.
    return await authorModel.editAuthorById(id, authorToEdit);
}

export async function getAuthorId(id: string){
    //----> Fetch the author with given id.
    return await authorModel.getAuthorById(id);
}

export async function getAllAuthors(){
    //----> Fetch all authors from db.
    return await authorModel.getAllAuthors();
}