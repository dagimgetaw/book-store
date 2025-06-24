import useStore from "../../store/useStore";
import { Lock, Mail, Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "../../Schema/Schema";
import logo from "../../assets/google.png";
import Loading from "../Loading/Loading";

export default function Signin() {
  const { theme } = useStore();

  const [hide, setHide] = useState(true);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log(values);
        setSubmitting(false);
      } catch (error) {
        setErrorMessage(error.message);
        setSubmitting(false);
      }
    },
  });

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    isSubmitting,
  } = formik;

  return (
    <div
      className={`min-h-screen flex items-center font-text justify-center p-4 transition-colors duration-300 ${
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
          Welcome Back
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit} autoComplete="off">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <div
              className={`flex items-center rounded-lg border px-3 py-2 ${
                errors.email && touched.email
                  ? "border-rose-500"
                  : theme === "light"
                  ? "border-gray-700"
                  : "border-gray-300"
              } ${theme === "light" ? "bg-gray-700" : "bg-gray-100"}`}
            >
              <Mail className="w-5 h-5 mr-2" />
              <input
                name="email"
                type="email"
                className={`w-full bg-transparent outline-none text-sm ${
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
              <p className="mt-1 text-sm text-rose-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div
              className={`flex items-center rounded-lg border px-3 py-2 ${
                errors.password && touched.password
                  ? "border-rose-500"
                  : theme === "light"
                  ? "border-gray-700"
                  : "border-gray-300"
              } ${theme === "light" ? "bg-gray-700" : "bg-gray-100"}`}
            >
              <Lock className="w-5 h-5 mr-2" />
              <input
                name="password"
                type={hide ? "password" : "text"}
                className={`w-full bg-transparent outline-none text-sm ${
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
                  <EyeClosed className="w-5 h-5 cursor-pointer" />
                ) : (
                  <Eye className="w-5 h-5 cursor-pointer" />
                )}
              </button>
            </div>
            {errors.password && touched.password && (
              <p className="mt-1 text-sm text-rose-500">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-base transition-colors ${
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
                Signing In...
              </span>
            ) : (
              <span>Sign In</span>
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
            <div className="relative flex justify-center text-sm">
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
            className={`w-full py-3 px-4 rounded-lg font-medium flex items-center cursor-pointer justify-center gap-3 border transition-colors mb-4 ${
              theme === "light"
                ? "bg-gray-700 border-gray-600 hover:bg-gray-600 text-white"
                : "bg-white border-gray-300 hover:bg-gray-50 text-gray-700"
            }`}
          >
            <img src={logo} alt="google logo" className="w-5 h-5" />
            Continue with Google
          </button>

          {/* Forgot Password Link */}
          <div className="text-center mt-4">
            <Link
              to="/forgot-password"
              className={`text-sm font-medium ${
                theme === "light"
                  ? "text-indigo-400 hover:text-indigo-300"
                  : "text-indigo-600 hover:text-indigo-500"
              }`}
            >
              Forgot Password?
            </Link>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p
            className={`text-sm ${
              theme === "light" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Don't have an account?{" "}
            <Link
              to="/sign-up"
              className={`font-medium ${
                theme === "light" ? "text-indigo-400" : "text-indigo-600"
              } hover:underline`}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
