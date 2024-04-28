import React, { createContext, useState } from 'react';
import { SignupValidation } from '@/lib/validations';
import { z } from 'zod';

type UserData = z.infer<typeof SignupValidation>;

export const SignupContext = createContext<{
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}>({
  userData: {
    email: "",
    name: "",
    password: "",
    username: ""
  },
  setUserData: () => {}
});

export function SignupProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<UserData>({
    email: "",
    name: "",
    password: "",
    username: ""
  });

  return (
    <SignupContext.Provider value={{ userData, setUserData }}>
      {children}
    </SignupContext.Provider>
  );
}
