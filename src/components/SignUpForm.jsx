"use client";
import { FaQuestionCircle } from "react-icons/fa";
import { genderOptions } from "../../constants/index";
import { useEffect, useState } from "react";
import Validation from "./Validation.js";
import { useRouter } from "next/navigation";
import CalendarSelector from "./CalendarSelector";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    surname: "",
    email: "",
    password: "",
    gender: "",
    day: 1,
    month: "January",
    year: 2024,
  });

  const [errors, setErrors] = useState({});
  const [data, setData] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (Object.keys(errors).length === 0 && data) {
      router.push("/home");
    }
  }, [errors]);

  const onChangeHandler = (event) => {
    setFormData(() => ({
      ...formData,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setErrors(Validation(formData));
    setData(true);
  };

  return (
    <>
      <div className="border border-gray-500 rounded-xl p-3">
        <div className="border-b-2 border-gray-200">
          <h1 className="text-3xl font-extrabold">Sign Up</h1>
          <p className="text-base text-gray-500 mt-[-4px] mb-2">
            It's quick and easy.
          </p>
        </div>

        <div className="pt-4">
          <form autoComplete="off">
            <div className="grid grid-cols-2 gap-3 ">
              <input
                type="text"
                name="firstname"
                placeholder="First name"
                className={`input ${
                  errors.firstname && "border-2 border-red-500"
                }`}
                value={formData.firstname}
                onChange={onChangeHandler}
              />

              <input
                type="text"
                name="surname"
                placeholder="Surname"
                className={`input ${
                  errors.surname && "border-2 border-red-500"
                }`}
                value={formData.surname}
                onChange={onChangeHandler}
              />
            </div>
            <div className="mt-3">
              <input
                type="text"
                placeholder="Mobile number or email address"
                name="email"
                className="input w-full"
                value={formData.email}
                autoComplete="email"
                onChange={onChangeHandler}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="mt-3">
              <input
                type="password"
                name="password"
                placeholder="New password"
                className="input w-full"
                value={formData.password}
                autoComplete="new-password"
                onChange={onChangeHandler}
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <div className="my-3 text-gray-500">
              <label className="flex items-center gap-1 text-sm">
                Date of birth
                <FaQuestionCircle width={15} />
              </label>
              <CalendarSelector
                setFormData={setFormData}
                formData={formData}
              />

              <div className="my-3 text-gray-500">
                <label
                  className="flex items-center gap-1 text-sm"
                  htmlFor="DOB"
                >
                  Gender
                  <FaQuestionCircle width={15} />
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {genderOptions.map((option) => (
                    <div
                      className="flex justify-between items-center input"
                      key={option.value}
                    >
                      <label htmlFor={option.value}>{option.label}</label>
                      <input
                        type="radio"
                        id={option.value}
                        name="gender"
                        value={option.value}
                        onChange={onChangeHandler}
                      />
                    </div>
                  ))}
                </div>
                {errors.gender && <p className="error">{errors.gender}</p>}
              </div>
              <div className="max-w-[440px] text-xs mb-6 ">
                <p className="mb-2">
                  People who use our service may have uploaded your contact
                  information to Facebook.
                  <a href="/" className="text-blue-400">
                    Learn more.
                  </a>
                </p>
                <p>
                  By clicking Sign Up, you agree to our
                  <a href="/" className="text-blue-400">
                    Terms, Privacy Policy
                  </a>
                  and
                  <a href="/" className="text-blue-400">
                    Cookies Policy.
                  </a>
                  You may receive SMS notifications from us and can opt out at
                  any time.
                </p>
              </div>

              <div className="flex justify-center">
                <button
                  className="text-white bg-green-600 px-16 py-2 rounded-lg font-bold justify-self-center"
                  onClick={onSubmitHandler}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
