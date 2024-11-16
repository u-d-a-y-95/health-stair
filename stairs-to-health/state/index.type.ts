export interface UserData {
  id?: string;
  name: string;
  phone_number: string;
  gender?: string;
  date_of_birth?: string;
  district: string;
  subdistrict: string;
  blood_group?: string;
  deviceId?: string;
  isSync?: boolean;
}

export interface AppState {
  isloading: boolean;
  isOnBoarded: boolean;
  data: UserData;
}

export interface ContextValue extends AppState {
  setOnboarding: (data: UserData) => void;
  setSync: (value: boolean) => void;
}
