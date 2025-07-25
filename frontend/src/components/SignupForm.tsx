import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRegisterMutation } from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "../styles/AuthForm.css";

// Updated validation schema with confirmPassword field
const validationSchema = yup.object({
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Minimum 5 chars are required")
    .max(16, "Maximum 16 chars allowed"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

type FormData = yup.InferType<typeof validationSchema>;

export function SignupForm() {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    try {
      await registerUser(data).unwrap();
      toast.success("User registered successfully!");
      navigate("/login");
    } catch (error: any) {
      const validationError =
        error?.data?.data?.errors?.[0]?.msg || error?.data?.message;
      toast.error(validationError || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <p className="title">Sign Up</p>
      <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Email Field */}
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register("email")}
            aria-invalid={!!errors.email}
            autoComplete="username"
            placeholder="Enter your email"
            className={errors.email ? "input-error" : ""}
          />
          {errors.email && (
            <small role="alert" className="error-text">
              {errors.email.message}
            </small>
          )}
        </div>

        {/* Password Field */}
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register("password")}
            aria-invalid={!!errors.password}
            autoComplete="new-password"
            placeholder="Enter your password"
            className={errors.password ? "input-error" : ""}
          />
          {errors.password && (
            <small role="alert" className="error-text">
              {errors.password.message}
            </small>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            aria-invalid={!!errors.confirmPassword}
            autoComplete="new-password"
            placeholder="Confirm your password"
            className={errors.confirmPassword ? "input-error" : ""}
          />
          {errors.confirmPassword && (
            <small role="alert" className="error-text">
              {errors.confirmPassword.message}
            </small>
          )}
        </div>

        <button className="sign" type="submit" disabled={!isValid || isLoading}>
          {isLoading ? "Signing up..." : "Sign up"}
        </button>
      </form>

      <div className="social-message">
        <div className="line"></div>
        <p className="message">Sign up with social accounts</p>
        <div className="line"></div>
      </div>

      <div className="social-icons">
        <button aria-label="Sign up with Google" className="icon">
          {/* Google SVG */}
        </button>
        <button aria-label="Sign up with Twitter" className="icon">
          {/* Twitter SVG */}
        </button>
        <button aria-label="Sign up with GitHub" className="icon">
          {/* GitHub SVG */}
        </button>
      </div>

      <p className="signup">
        Already have an account?{" "}
        <a href="/login" className="">
          Login
        </a>
      </p>
    </div>
  );
}
