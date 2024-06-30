import { SafeScreen } from "@/components/safeScreen";
import { UButton } from "@/components/uComponents/uButton";
import { UInput } from "@/components/uComponents/uInput";
import { USelect } from "@/components/uComponents/uSelect";
import { districts, genders } from "@/data";
import { hs, ws } from "@/utils/sizes";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  ScrollView,
  ToastAndroid,
  View,
} from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppContext } from "@/state";
import * as Application from "expo-application";
import axios from "axios";
import { formSchema, formInitValue } from "./util";
import { UDatePicker } from "@/components/uComponents/uDatePicker";
import { useEffect } from "react";
import { getPayload } from "@/utils";

export const Profile = () => {
  const { setOnboarding, data } = useAppContext();
  const {
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: formInitValue,
    resolver: zodResolver(formSchema),
    reValidateMode: "onBlur",
  });

  useEffect(() => {
    reset(
      {
        ...data,
        district: districts.find((item) => item.value === data.district) || "",
        gender: genders.find((item) => item.value === data.gender) || "",
        date_of_birth: data.date_of_birth || "",
      },
      { keepValues: false, keepDefaultValues: true }
    );
  }, [data]);

  const submitHandler = async (values: typeof formInitValue) => {
    const payload = {
      ...getPayload(values),
      deviceId: Application.getAndroidId(),
    };
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
      ToastAndroid.show("Date is save successfully!", ToastAndroid.SHORT);
    }
  };
  return (
    <SafeScreen styles={[{ paddingHorizontal: 0, flex: 1 }]}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView
          style={{
            flex: 1,
            flexGrow: 1,
            paddingHorizontal: ws(20),
          }}
        >
          <View
            style={{
              flex: 1,
              gap: hs(15),
            }}
          >
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, value } }) => (
                <UInput
                  label="নাম"
                  onChangeText={onChange}
                  value={value}
                  error={errors.name && errors.name.message}
                />
              )}
            />
            <Controller
              name="phone_number"
              control={control}
              render={({ field: { onChange, value } }) => (
                <UInput
                  label="মোবাইল"
                  keyboardType="phone-pad"
                  onChangeText={onChange}
                  value={value}
                  error={errors.phone_number && errors.phone_number.message}
                />
              )}
            />
            <Controller
              name="date_of_birth"
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <UDatePicker
                    label="জন্ম তারিখ"
                    value={value}
                    onChange={onChange}
                  />
                </>
              )}
            />
            <Controller
              name="district"
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <USelect
                    label="জেলা"
                    data={districts}
                    onChange={onChange}
                    value={value}
                  />
                </>
              )}
            />
            <Controller
              name="gender"
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <USelect
                    label="লিঙ্গ"
                    data={genders}
                    onChange={onChange}
                    value={value}
                  />
                </>
              )}
            />
            <View>
              <UButton onPress={handleSubmit(submitHandler)}>
                সংরক্ষ করুন
              </UButton>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeScreen>
  );
};
