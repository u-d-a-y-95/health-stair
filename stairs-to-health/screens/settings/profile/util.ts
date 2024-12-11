import axios from "axios";
import { z } from "zod";

export const formInitValue = {
  name: "",
  phone_number: "",
  district: "",
  subdistrict: "",
  date_of_birth: "",
  gender: "",
};

export const formSchema = z.object({
  name: z
    .string()
    .min(1, "অনুগ্রহ করে নামটি প্রদান করুন")
    .optional()
    .or(z.literal("")),
  phone_number: z
    .string()
    .regex(
      /^(?:\+?88)?01[3-9]\d{8}$/,
      "অনুগ্রহ করে সঠিক মোবাইল নম্বর প্রদান করুন।"
    )
    .optional()
    .or(z.literal("")), // Allow empty strings
  district: z
    .object({
      value: z.string().min(1, "অনুগ্রহ করে জেলা নির্বাচন করুন"),
      label: z.string().min(1, "অনুগ্রহ করে জেলা নির্বাচন করুন"),
    })
    .optional()
    .or(z.literal(null)), // Allow null or undefined
  subdistrict: z
    .object({
      value: z.string().min(1, "অনুগ্রহ করে উপজেলা নির্বাচন করুন"),
      label: z.string().min(1, "অনুগ্রহ করে উপজেলা নির্বাচন করুন"),
    })
    .optional()
    .or(z.literal(null)),
  gender: z
    .union([
      z.object({
        value: z.string(),
        label: z.string(),
      }),
      z.string(),
    ])
    .optional()
    .or(z.literal(null)),
  date_of_birth: z.union([z.date(), z.string()]).optional().or(z.literal(null)),
});

export const saveData = async (payload, setOnboarding, cb) => {
  try {
    const response = await axios.post(
      "https://healthstairs.seracnetwork.net/saveUser",
      payload
    );

    setOnboarding({
      ...response.data.user,
    });
  } catch (error) {
    setOnboarding({
      ...payload,
    });
  } finally {
    cb();
  }
};
