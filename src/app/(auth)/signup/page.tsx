import SignupForm from "@/app/(auth)/signup/SignupForm";

export default function SignupPage() {

    return (
        <SignupForm signup={{
            name: "",
            email: "",
            phone: "",
            image: "",
            gender: "Male",
            address: "",
            dateOfBirth: "",
            password: "",
            confirmPassword: "",
        }}/>
    );
}