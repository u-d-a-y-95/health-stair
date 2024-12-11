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
  data: UserData;
}

export interface ContextValue extends AppState {
  updateAppData: (data: UserData) => void;
}
