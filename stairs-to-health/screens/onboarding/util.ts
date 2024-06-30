import { z } from "zod";

export const onboardingFormInitValue = {
  name: "",
  phone_number: "",
  district: "",
};

export const formSchema = z.object({
  name: z.string().min(1, "অনুগ্রহ করে নামটি প্রদান করুন"),
  phone_number: z
    .string()
    .min(1, "অনুগ্রহ করে সঠিক মোবাইল নম্বর প্রদান করুন।")
    .regex(
      /^(?:\+?88)?01[3-9]\d{8}$/,
      "অনুগ্রহ করে সঠিক মোবাইল নম্বর প্রদান করুন।"
    ),
  district: z.object({
    value: z.string().min(1, "অনুগ্রহ করে জেলা নির্বাচন করুন"),
    label: z.string().min(1, "অনুগ্রহ করে জেলা নির্বাচন করুন"),
  }),
});
