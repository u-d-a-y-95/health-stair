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
import { formSchema, formInitValue, saveData } from "./util";
import { UDatePicker } from "@/components/uComponents/uDatePicker";
import { useEffect, useState } from "react";
import { getPayload } from "@/utils";

export const Profile = () => {
  const [subdistrict, setSubdistrict] = useState([]);
  const { data, updateAppData } = useAppContext();
  const {
    reset,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: formInitValue,
    resolver: zodResolver(formSchema),
    reValidateMode: "onBlur",
  });

  useEffect(() => {
    const district =
      districts.find((item) => item.value === data.district) || null;
    reset(
      {
        ...data,
        district: district,
        subdistrict: district
          ? district.subdistrict.find((item) => item.value === data.subdistrict)
          : null,
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
    await saveData(payload, updateAppData, () => {
      ToastAndroid.show("Data is save successfully!", ToastAndroid.SHORT);
    });
  };

  return (
    <SafeScreen styles={[{ paddingHorizontal: 0, flex: 1 }]}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView
          style={{
            flex: 1,
            flexGrow: 1,
            paddingHorizontal: ws(10),
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
                    onChange={(v) => {
                      setSubdistrict(v.subdistrict);
                      onChange({
                        label: v.label,
                        value: v.value,
                      });
                      setValue("subdistrict", null);
                    }}
                    value={value}
                  />
                </>
              )}
            />
            <Controller
              name="subdistrict"
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <USelect
                    label="আপনার উপজেলা নির্বাচন করুন"
                    data={subdistrict}
                    onChange={onChange}
                    value={value}
                    disable={!getValues("district")}
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
                সংরক্ষণ করুন
              </UButton>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeScreen>
  );
};
