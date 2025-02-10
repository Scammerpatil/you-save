"use client";
import axios, { AxiosResponse } from "axios";
import { Eye, EyeOff, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { User } from "@/types/user";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
    profileImage: "",
    phone: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB");
        return;
      }
      const formData = new FormData();
      formData.append("file", file as Blob);
      const imageResponse = axios.post("/api/helper/upload-img", formData);
      toast.promise(imageResponse, {
        loading: "Uploading Image...",
        success: (data: AxiosResponse) => {
          setUser({
            ...user,
            profileImage: data.data.data.url,
          });
          return "Image Uploaded Successfully";
        },
        error: (err: unknown) => {
          if (axios.isAxiosError(err) && err.response) {
            return `This just happened: ${err.response.data.error}`;
          }
          return "An unknown error occurred";
        },
      });
    }
  };

  // Handle Submit
  const handleSubmit = () => {
    if (
      user.name === "" ||
      user.email === "" ||
      user.password === "" ||
      user.profileImage === "" ||
      user.phone === ""
    ) {
      toast.error("All fields are required");
      return;
    }
    const response = axios.post("/api/auth/signup", { user });
    toast
      .promise(response, {
        loading: "Creating Account...",
        success: (res: AxiosResponse) => {
          router.push("/signin");
          return res.data.message;
        },
        error: (res: unknown) => {
          return res.response.data.message;
        },
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex items-center justify-center my-3 px-24">
      <section className="relative z-10 overflow-hidden w-full">
        <h3 className="mb-3 text-center text-2xl font-bold sm:text-3xl">
          Create your account
        </h3>
        <p className="text-center">Your data is secured with us.</p>
        <div className="px-12 py-5 mt-3 border border-base-content rounded-xl space-y-4">
          {/* Full Name */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Full Name</span>
            </div>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              placeholder="Enter your full name"
              className="input input-bordered w-full"
            />
          </label>
          {/* Email */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter your Email"
              className="input input-bordered w-full"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Phone No.</span>
            </div>
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
              placeholder="Enter your phone number"
              className="input input-bordered w-full"
            />
          </label>
          {/* Profile Image Url */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Upload Your Nice Photo</span>
            </div>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              accept="image/* .png .jpeg .jpg"
              onChange={handleProfileImageChange}
            />
          </label>

          {/* Password */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={user.password}
                onChange={(e) =>
                  setUser({
                    ...user,
                    password: e.target.value,
                  })
                }
                className="input input-bordered w-full"
                placeholder="Enter Password"
                required
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-base-content"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
          </label>

          {/* Sign UP Protocol */}
          <div className="mb-6">
            <button className="btn btn-primary w-full" onClick={handleSubmit}>
              Sign up
            </button>
          </div>
          <p className="text-center text-base font-medium text-body-color">
            Already using You-Save?{" "}
            <Link className="text-primary hover:underline" href="/signin">
              Sign in
            </Link>
          </p>
          <div className="absolute left-0 top-0 z-[-1]">
            <svg
              width="1440"
              height="969"
              viewBox="0 0 1440 969"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_95:1005"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="1440"
                height="969"
              >
                <rect width="1440" height="969" fill="#090E34" />
              </mask>
              <g mask="url(#mask0_95:1005)">
                <path
                  opacity="0.1"
                  d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                  fill="url(#paint0_linear_95:1005)"
                />
                <path
                  opacity="0.1"
                  d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                  fill="url(#paint1_linear_95:1005)"
                />
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_95:1005"
                  x1="1178.4"
                  y1="151.853"
                  x2="780.959"
                  y2="453.581"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="currentColor" />
                  <stop offset="1" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_95:1005"
                  x1="160.5"
                  y1="220"
                  x2="1099.45"
                  y2="1192.04"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="currentColor" />
                  <stop offset="1" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
};
export default SignUpPage;
