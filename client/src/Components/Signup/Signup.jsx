import { Lock, Mail, User, Eye, EyeClosed } from "lucide-react";
import useStore from "../../store/useStore";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { signupSchema } from "../../Schema/Schema";
import logo from "../../assets/google.png";
import Loading from "../Loading/Loading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const { theme } = useStore();

  const [hide, setHide] = useState(true);
  const [hideConfirm, setHideConfirm] = useState(true);
  const [passwordTests, setPasswordTests] = useState({
    lengthTest: false,
    uppercaseTest: false,
    lowercaseTest: false,
    numberTest: false,
    specialTest: false,
  });
  const [confirmPasswordMatch, setConfirmPasswordMatch] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setErrorMessage("");
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await axios.post("http://localhost:5500/api/v1/auth/sign-up", values);

        setTimeout(() => {
          formik.resetForm();
          navigate("/sign-in");
        }, 2000);

        setIsSubmitting(false);
      } catch (error) {
        let msg = "Signup failed. Please try again.";
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          msg = error.response.data.message;
        }
        setErrorMessage(msg);
        setIsSubmitting(false);
      }
    },
  });

  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    formik;

  // Password validation checks
  useEffect(() => {
    const { password } = values;
    setPasswordTests({
      lengthTest: password.length >= 8,
      uppercaseTest: /[A-Z]/.test(password),
      lowercaseTest: /[a-z]/.test(password),
      numberTest: /\d/.test(password),
      specialTest: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  }, [values.password]);

  // Confirm password match check
  useEffect(() => {
    setConfirmPasswordMatch(
      values.password === values.confirmPassword && values.password !== ""
    );
  }, [values.password, values.confirmPassword]);

  const allTestsPassed =
    passwordTests.lengthTest &&
    passwordTests.uppercaseTest &&
    passwordTests.lowercaseTest &&
    passwordTests.numberTest &&
    passwordTests.specialTest;

  return (
    <div
      className={`min-h-screen flex items-center font-text justify-center p-4 pt-40 pb-20 transition-colors duration-300 ${
        theme === "light" ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div
        className={`w-full max-w-md p-8 rounded-xl shadow-lg transition-all duration-300 ${
          theme === "light"
            ? "bg-gray-800 text-gray-100"
            : "bg-white text-gray-900"
        }`}
      >
        <h2
          className={`text-2xl font-bold mb-6 text-center ${
            theme === "light" ? "text-indigo-400" : "text-indigo-600"
          }`}
        >
          Create Account
        </h2>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-lg bg-rose-100 text-rose-700 text-sm text-center">
            {errorMessage}
          </div>
        )}

        <form
          className="space-y-3 md:space-y-6"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          {/* Full Name Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <div
              className={`flex items-center rounded-lg border px-3 py-3 ${
                errors.fullName && touched.fullName
                  ? "border-rose-500"
                  : theme === "light"
                  ? "border-gray-700"
                  : "border-gray-300"
              } ${theme === "light" ? "bg-gray-700" : "bg-gray-100"}`}
            >
              <User className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              <input
                name="fullName"
                type="text"
                className={`w-full bg-transparent outline-none text-xs md:text-sm ${
                  theme === "light"
                    ? "placeholder-gray-400"
                    : "placeholder-gray-500"
                }`}
                placeholder="Abebe Kebede"
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {errors.fullName && touched.fullName && (
              <p className="mt-1 text-xs md:text-sm text-rose-500">
                {errors.fullName}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <div
              className={`flex items-center rounded-lg border px-3 py-3 ${
                errors.email && touched.email
                  ? "border-rose-500"
                  : theme === "light"
                  ? "border-gray-700"
                  : "border-gray-300"
              } ${theme === "light" ? "bg-gray-700" : "bg-gray-100"}`}
            >
              <Mail className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              <input
                name="email"
                type="email"
                className={`w-full bg-transparent outline-none text-xs md:text-sm ${
                  theme === "light"
                    ? "placeholder-gray-400"
                    : "placeholder-gray-500"
                }`}
                placeholder="example@domain.com"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {errors.email && touched.email && (
              <p className="mt-1 text-xs md:text-sm text-rose-500">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div
              className={`flex items-center rounded-lg border px-3 py-3 ${
                errors.password && touched.password
                  ? "border-rose-500"
                  : theme === "light"
                  ? "border-gray-700"
                  : "border-gray-300"
              } ${theme === "light" ? "bg-gray-700" : "bg-gray-100"}`}
            >
              <Lock className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              <input
                name="password"
                type={hide ? "password" : "text"}
                className={`w-full bg-transparent outline-none text-xs md:text-sm ${
                  theme === "light"
                    ? "placeholder-gray-400"
                    : "placeholder-gray-500"
                }`}
                placeholder="••••••••"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <button
                type="button"
                onClick={() => setHide(!hide)}
                className="ml-2 focus:outline-none"
              >
                {hide ? (
                  <EyeClosed className="w-4 h-4 md:w-5 md:h-5 cursor-pointer" />
                ) : (
                  <Eye className="w-4 h-4 md:w-5 md:h-5 cursor-pointer" />
                )}
              </button>
            </div>
            {errors.password && touched.password && (
              <p className="mt-1 text-xs md:text-sm text-rose-500">
                {errors.password}
              </p>
            )}

            {values.password && !allTestsPassed && !confirmPasswordMatch && (
              <div className="mt-2 ml-2 text-xs">
                <p className="mb-1">Password must contain:</p>
                <ul className="space-y-1">
                  <li
                    className={`flex items-center ${
                      passwordTests.lengthTest
                        ? "text-green-500"
                        : theme === "light"
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  >
                    {passwordTests.lengthTest ? "✓" : "•"} At least 8 characters
                  </li>
                  <li
                    className={`flex items-center ${
                      passwordTests.uppercaseTest
                        ? "text-green-500"
                        : theme === "light"
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  >
                    {passwordTests.uppercaseTest ? "✓" : "•"} Uppercase letter
                  </li>
                  <li
                    className={`flex items-center ${
                      passwordTests.lowercaseTest
                        ? "text-green-500"
                        : theme === "light"
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  >
                    {passwordTests.lowercaseTest ? "✓" : "•"} Lowercase letter
                  </li>
                  <li
                    className={`flex items-center ${
                      passwordTests.numberTest
                        ? "text-green-500"
                        : theme === "light"
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  >
                    {passwordTests.numberTest ? "✓" : "•"} Number
                  </li>
                  <li
                    className={`flex items-center ${
                      passwordTests.specialTest
                        ? "text-green-500"
                        : theme === "light"
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  >
                    {passwordTests.specialTest ? "✓" : "•"} Special character
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <div
              className={`flex items-center rounded-lg border px-3 py-3 ${
                errors.confirmPassword && touched.confirmPassword
                  ? "border-rose-500"
                  : theme === "light"
                  ? "border-gray-700"
                  : "border-gray-300"
              } ${theme === "light" ? "bg-gray-700" : "bg-gray-100"}`}
            >
              <Lock className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              <input
                name="confirmPassword"
                type={hideConfirm ? "password" : "text"}
                className={`w-full bg-transparent outline-none text-xs md:text-sm ${
                  theme === "light"
                    ? "placeholder-gray-400"
                    : "placeholder-gray-500"
                }`}
                placeholder="••••••••"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <button
                type="button"
                onClick={() => setHideConfirm(!hideConfirm)}
                className="ml-2 focus:outline-none"
              >
                {hideConfirm ? (
                  <EyeClosed className="w-4 h-4 md:w-5 md:h-5 cursor-pointer" />
                ) : (
                  <Eye className="w-4 h-4 md:w-5 md:h-5 cursor-pointer" />
                )}
              </button>
            </div>
            {errors.confirmPassword && touched.confirmPassword && (
              <p className="mt-1 text-xs md:text-sm text-rose-500">
                {errors.confirmPassword}
              </p>
            )}
            {!errors.confirmPassword &&
              values.confirmPassword &&
              !confirmPasswordMatch && (
                <p className="mt-1 text-sm text-rose-500">
                  Passwords do not match
                </p>
              )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 mt-10 rounded-lg text-xs md:text-sm transition-colors ${
              theme === "light"
                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                : "bg-indigo-500 hover:bg-indigo-600 text-white"
            } ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <Loading />
                Creating Account...
              </span>
            ) : (
              <span>Create Account</span>
            )}
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div
                className={`w-full border-t ${
                  theme === "light" ? "border-gray-700" : "border-gray-300"
                }`}
              ></div>
            </div>
            <div className="relative flex justify-center text-xs md:text-sm">
              <span
                className={`px-2 ${
                  theme === "light"
                    ? "bg-gray-800 text-gray-400"
                    : "bg-white text-gray-500"
                }`}
              >
                OR
              </span>
            </div>
          </div>

          {/* Continue with Google Button */}
          <button
            type="button"
            className={`w-full py-3 px-4 rounded-lg text-xs md:text-sm flex items-center cursor-pointer justify-center gap-3 border transition-colors mb-4 ${
              theme === "light"
                ? "bg-gray-700 border-gray-600 hover:bg-gray-600 text-white"
                : "bg-white border-gray-300 hover:bg-gray-50 text-gray-700"
            }`}
          >
            <img
              src={logo}
              alt="google logo"
              className="w-4 h-4 md:w-5 md:h-5"
            />
            Continue with Google
          </button>
        </form>

        <div className="mt-10 md:mt-6 text-center">
          <p
            className={`text-xs md:text-sm ${
              theme === "light" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Already have an account?{" "}
            <Link
              to="/sign-in"
              className={`font-medium ${
                theme === "light" ? "text-indigo-400" : "text-indigo-600"
              } hover:underline`}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
