export type InputType = {
    id: number;
    name: string;
    type: "text" | "email" | "tel" | "password"; // Assuming these are the supported types
    errorMessage: string;
    label: string;
    pattern?: string; // Optional pattern property
    autoComplete?: string; // Optional autoComplete property
    required: boolean;
  }
export const inputsNewUser: InputType[] = [
    {
      id: 1,
      name: "name",
      type: "text",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Name",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "surname",
      type: "text",
      errorMessage: "Username should be 3-16 characters!",
      label: "Username",
      pattern: "^.{3,16}$",
      required: true,
    },
    {
      id: 3,
      name: "email",
      type: "email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 4,
      name: "phone",
      type: "tel",
      errorMessage: "It should be a valid phone!",
      label: "Phone",
      required: true,
    },
    {
      id: 5,
      name: "password",
      type: "password",
      errorMessage:
        "Password must contain number, one uppercase and lowercase letter, and at least 8 or more characters!",
      label: "Password",
      pattern: "(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z]).{8,}",
      autoComplete: "on",
      required: true,
    },
  ];