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

    console.log("ownerCheckOrAdmin, userIdOnResource : ", userIdOnResource);
    console.log("ownerCheckOrAdmin, userIdOnContext : ", userId);
    console.log("ownerCheckOrAdmin, isSameId : ", isSameId);
    console.log("ownerCheckOrAdmin, isAdmin : ", isAdmin);

    //----> Not same id and not admin.
    if (!isSameId && !isAdmin) {
        return false;
    }

    //----> Is either admin or owner.
    return true;

}

function checkSameId(userIdOne: string, userIdTwo: string) {
    return userIdOne.normalize() === userIdTwo.normalize();
}