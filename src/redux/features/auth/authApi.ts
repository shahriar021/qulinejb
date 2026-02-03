import { baseApi } from "../../createdApi/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginData) => {
        return {
          url: "/auth/login",

          method: "POST",
          body: loginData,
        };
      },
    }),

    // sign up as user
    signUpUser: builder.mutation({
      query: (userBody) => {
        return {
          url: "/auth/signup",
          method: "POST",
          body: userBody,
        };
      },
    }),

    // sign up as brand
    signUpBrand: builder.mutation({
      query: (formData) => {
        return {
          url: "/auth/signup",
          method: "POST",
          body: formData,
        };
      },
    }),

    forgetPassword: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/forget_password",
          method: "POST",
          body: data,
        };
      },
    }),

    otpVerify: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/verify_otp",
          method: "POST",
          body: data,
        };
      },
    }),

    resetPassword: builder.mutation({
      query: ({ info, atoken }) => {
        return {
          url: "/auth/reset_password",
          method: "PUT",
          headers: {
            Authorization: `Bearer ${atoken}`,
          },
          body: info.data,
        };
      },
    }),

    updatePassword: builder.mutation({
      query: ({ token, body }) => {
        return {
          url: `auth/update_password`,
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body,
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpUserMutation,
  useForgetPasswordMutation,
  useOtpVerifyMutation,
  useResetPasswordMutation,
  useSignUpBrandMutation,
  useUpdatePasswordMutation,
} = authApi;
