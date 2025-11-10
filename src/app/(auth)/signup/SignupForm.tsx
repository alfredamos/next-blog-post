import Form from "next/form";
import {signupUser} from "@/app/actions/auth.action";
import {SignupUser} from "@/validations/auth.validation";

type Props = {
    signup: SignupUser;
}

export default function SignupForm({ signup }: Props) {
    return (
        <div className="bg-white shadow-xlg w-1/2 mx-auto mt-10 px-4 border border-gray-900 rounded-lg">
            <Form action={signupUser}>
                <h2 className="px-6 mb-3">Registration Form</h2>
                <div className="mb-3 px-6">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Your name in full"
                        defaultValue={signup?.name}
                        className="border border-slate-100 rounded-sm px-1"
                    />
                </div>
                <div className="mb-3 px-6">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Your email address"
                        defaultValue={signup?.email}
                        className="border border-slate-100 rounded-sm px-1"
                    />
                </div>
                <div className="mb-3 px-6">
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        id="phone"
                        placeholder="Your phone number"
                        defaultValue={signup?.phone}
                        className="border border-slate-100 rounded-sm px-1"
                    />
                </div>
                <div className="mb-3 px-6">
                    <label htmlFor="image">Image</label>
                    <input
                        type="text"
                        name="image"
                        id="image"
                        placeholder="Load your image path"
                        defaultValue={signup?.image}
                        className="border border-slate-100 rounded-sm px-1"
                    />
                </div>
                <div className="mb-3 px-6">
                    <label htmlFor="dateOfBirth">Birth Date</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        id="dateOfBirth"
                        placeholder="Your birth date"
                        defaultValue={signup?.dateOfBirth}
                        className="border border-slate-100 rounded-sm px-1 w-full"
                    />
                </div>
                <div className="mb-3 px-6">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your Password"
                        name="password"
                        id="password"
                        defaultValue={signup?.password}
                        className="border border-slate-100 rounded-sm px-1 text-muted px-1"
                    />
                </div>
                <div className="mb-3 px-6">
                    <label htmlFor="confirPassword">Confirm Password</label>
                    <input
                        type="password"
                        placeholder="Confirm your Password"
                        name="confirmPassword"
                        id="confirmPassword"
                        defaultValue={signup?.confirmPassword}
                        className="border border-slate-100 rounded-sm px-1 text-muted px-1"
                    />
                </div>
                <div className="mb-3 px-6">
                    <label htmlFor="gender">Gender</label>
                    <select
                        name="gender"
                        id="gender"
                        defaultValue={signup?.gender}
                        className="border border-slate-100 rounded-sm px-1 text-muted px-1 w-full"
                    >
                        <option value="">Enter Your Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className="mb-3 px-6">
                    <label htmlFor="address">Address</label>
                    <textarea
                        placeholder="Your address"
                        name="address"
                        id="address"
                        defaultValue={signup?.address}
                        className="border border-slate-100 rounded-sm px-1 text-muted px-1 w-full"
                    />
                </div>
                <div className="px-6 mb-3 flex justify-between items-center">
                    <button type="submit" className="border border-slate-900 rounded-sm px-2 py-1 hover:bg-slate-900 hover:text-slate-100">Signup</button>
                    <button type="button" className="border border-slate-900 rounded-sm px-2 py-1 hover:bg-yellow-900 hover:text-yellow-100">Back</button>
                </div>
            </Form>
        </div>
    )
}