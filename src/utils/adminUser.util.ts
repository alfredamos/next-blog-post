"use server"

import {Role} from "@prisma/client";
import {getLoggedInUserInfo} from "@/lib/getLoggedInUser";

export async function adminUserUtil(){
    //----> Get the user info.
    const {role} = await getLoggedInUserInfo();

    //----> Check for admin privilege.
    const isAdmin = role === Role.Admin;

    console.log("In adminUser, admin", isAdmin);

    //----> Not admin.
    if (!isAdmin) {
        return false
    }

    //----> Is admin.
    return true
}