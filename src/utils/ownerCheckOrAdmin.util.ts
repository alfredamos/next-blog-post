"use server"

import {Role} from "@prisma/client";
import {getLoggedInUserInfo} from "@/lib/getLoggedInUser";

export async function ownerCheckOrAdmin(userIdOnResource: string) {
    //----> Get the user info.
    const {id: userId, role} = await getLoggedInUserInfo();

    //----> Check for same userid.
    const isSameId = checkSameId(userId, userIdOnResource);

    //----> Check for admin privilege.
    const isAdmin = role === Role.Admin;

    //----> Not same id and not admin.
    if (!isSameId && !isAdmin) {
        return false;
    }
    console.log("ownerCheckOrAdmin", userId, isAdmin);
    //----> Is either admin or owner.
    return true;

}

function checkSameId(userIdOne: string, userIdTwo: string) {
    return userIdOne.normalize() === userIdTwo.normalize();
}