"use client";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

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
        error: (err: any) => {
          return `This just happened: ${err.response.data.error}`;
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
        success: () => {
          router.push("/login");
          return "Account Created Successfully";
        },
        error: (res: any) => {
          return res.response.data.message;
        },
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex justify-center items-center w-full bg-base-200 px-5 py-5 h-[calc(100vh-5rem)]">
      <div className="xl:max-w-7xl bg-base-100 drop-shadow-xl border border-base-content/20 w-full rounded-md flex justify-between items-stretch px-5 xl:px-5 py-5">
        <div className="sm:w-[60%] lg:w-[50%] bg-cover bg-center items-center justify-center hidden md:flex ">
          <img src="login.png" alt="login" className="h-[500px]" />
        </div>
        <div className="mx-auto w-full lg:w-1/2 flex flex-col items-center justify-center md:p-10 md:py-0">
          <h1 className="text-center text-2xl sm:text-3xl font-semibold text-primary">
            Create Account
          </h1>
          <div className="w-full mt-5 sm:mt-8">
            <div className="mx-auto w-full sm:max-w-md md:max-w-lg flex flex-col gap-5">
              <input
                type="text"
                placeholder="Enter Your Full Name"
                className="input input-bordered input-primary w-full text-base-content placeholder:text-base-content/70"
                value={user.name}
                onChange={(e) => {
                  setUser({ ...user, name: e.target.value });
                }}
              />
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Enter Your Phone Number"
                  className="input input-bordered input-primary w-full text-base-content placeholder:text-base-content/70"
                  value={user.phone}
                  onChange={(e) => {
                    setUser({ ...user, phone: e.target.value });
                  }}
                />
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="input input-bordered input-primary w-full text-base-content placeholder:text-base-content/70"
                  value={user.email}
                  onChange={(e) => {
                    setUser({ ...user, email: e.target.value });
                  }}
                />
              </div>
              <input
                type="file"
                className="file-input w-full input-primary input-bordered"
                accept="image/*"
                onChange={(e) => {
                  handleProfileImageChange(
                    e as unknown as React.ChangeEvent<HTMLInputElement>
                  );
                }}
              />
              <label className="input input-primary input-bordered flex items-center gap-2">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Your Password"
                  className="w-full text-base-content placeholder:text-base-content/70"
                  value={user.password}
                  onChange={(e) => {
                    setUser({ ...user, password: e.target.value });
                  }}
                />
                {showPassword ? (
                  <IconEyeOff
                    size={20}
                    className="cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <IconEye
                    size={20}
                    className="cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </label>
              <div className="flex items-center gap-1.5  justify-start pl-2">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <input type="checkbox" className="checkbox" />
                  </label>
                </div>
                <h3 className="flex items-center whitespace-nowrap text-base text-base-content">
                  I agree to the
                  <span className="text-primary">&nbsp;Terms</span>
                  &nbsp;and
                  <span className="text-primary">&nbsp;Privacy Policy</span>.
                </h3>
              </div>
              <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center items-center">
                <button
                  className="btn btn-outline btn-primary btn-block max-w-[200px]"
                  onClick={handleSubmit}
                >
                  Sign Up
                </button>
              </div>
              <p className="text-center mt-3 text-base text-base-content">
                Already have an account?{" "}
                <span
                  className="text-primary cursor-pointer"
                  onClick={() => router.push("/login")}
                >
                  Login
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUpPage;
