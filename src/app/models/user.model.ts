export default class IUser {
  name?: string | null;
  email?: string | null;
  age?: string | null;
  password?: string | null;
  confirm_password?: string | null;
  phoneNumber?: string | null;
  dob?: Date | undefined;
  dateOfJoining?: Date | undefined;
  location?: string;
  designation?: string;
  department?: string;
  token: any;
}
