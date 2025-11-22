export interface SignUpDto {
  id?: number;
  isDoctor?: boolean;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;

  phone: string;               // must be 10–11 digits (validation done backend)
  email: string;               // must be valid email

  specialization?: string;
  gender?: string;
  address?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;

  yearsOfExperience?: number;  // must be 0–70 backend validation
  dateOfBirth?: string;        // should be ISO string: "2025-11-21"
}
