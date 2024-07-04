import axios from "axios";
import { z } from "zod";

export const formInitValue = {
  name: "",
  phone_number: "",
  district: "",
  date_of_birth: "",
  gender: "",
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
  gender: z.union([
    z.object({
      value: z.string(),
      label: z.string(),
    }),
    z.string().optional(),
  ]),
  date_of_birth: z.union([z.date(), z.string().optional()]),
});

export const saveData = async (payload, setOnboarding, cb) => {
  try {
    const response = await axios.post(
      "http://healthstairs.seracnetwork.net/saveUser",
      payload
    );

    setOnboarding({
      ...response.data.user,
      isSync: true,
    });
  } catch (error) {
    setOnboarding({
      ...payload,
      isSync: false,
    });
  } finally {
    cb();
  }
};
