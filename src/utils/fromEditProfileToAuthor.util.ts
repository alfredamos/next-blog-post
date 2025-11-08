import {EditUserProfile} from "@/validations/auth.validation";

export function fromEditProfileToAuthorUtil(req: EditUserProfile, userId: string){
   return {
       name: req.name,
       email: req.email,
       phone: req.phone,
       address: req.address,
       gender: req.gender,
       image: req.image,
       dateOfBirth: new Date(req.dateOfBirth),
       age: new Date().getFullYear() - new Date(req.dateOfBirth).getFullYear(),
       userId

   }
}