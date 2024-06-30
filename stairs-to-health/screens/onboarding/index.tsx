import { SafeScreen } from "@/components/safeScreen";
import { UButton } from "@/components/uComponents/uButton";
import { UInput } from "@/components/uComponents/uInput";
import { USelect } from "@/components/uComponents/uSelect";
import { UText } from "@/components/uComponents/uText";
import { districts } from "@/data";
import { SCREEN_HEIGHT, hs, ws } from "@/utils/sizes";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, View } from "react-native";
import { formSchema, onboardingFormInitValue } from "./util";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useAppContext } from "@/state";
import { useAppTheme } from "@/hooks/useAppTheme";
import * as Application from "expo-application";
import axios from "axios";
export const Onboarding = () => {
  const { Colors } = useAppTheme();
  const { setOnboarding } = useAppContext();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: onboardingFormInitValue,
    resolver: zodResolver(formSchema),
  });

  const submitHandler = async (values: typeof onboardingFormInitValue) => {
    const payload = {
      ...values,
      deviceId: Application.getAndroidId(),
    };
    try {
      const response = await axios.post(
        "http://healthstairs.seracnetwork.net/saveUser",
        {
          ...payload,
          district: (
            payload.district as unknown as { label: string; value: string }
          ).value,
        }
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
      router.replace("/");
    }
  };

  return (
    <SafeScreen styles={[{ paddingHorizontal: 0 }]}>
      <View
        style={{
          backgroundColor: Colors.primary,
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            height: SCREEN_HEIGHT > 750 ? "50%" : "40%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <UText
            size="xl"
            weight="bold"
            align="center"
            styles={{ color: "white" }}
          >
            স্বাস্থ্যসিঁড়িতে স্বাগতম
          </UText>
        </View>
        <KeyboardAvoidingView
          style={{
            flex: 1,
            flexGrow: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              marginTop: hs(16),
              padding: ws(20),
              backgroundColor: "white",
              gap: hs(15),
            }}
          >
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, value } }) => (
                <UInput
                  label="আপনার নাম দিন"
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
                  label="আপনার মোবাইল নম্বর দিন"
                  keyboardType="phone-pad"
                  onChangeText={onChange}
                  value={value}
                  error={errors.phone_number && errors.phone_number.message}
                />
              )}
            />
            <Controller
              name="district"
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <USelect
                    label="আপনার জেলা নির্বাচন করুন"
                    data={districts}
                    onSelect={onChange}
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
      </View>
    </SafeScreen>
  );
};
