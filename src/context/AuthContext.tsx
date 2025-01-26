"use client";

import { createContext, useContext, useState } from "react";

type UserType = {
  email: string;
  isVerified: boolean;
  name: string;
  isAdmin: boolean;
  password: string;
  __v: boolean;
  _id: string;
};

type CreateTaskContextType = {
  // task: any[];
  // setTask: (e: any) => void;
  user: UserType | null;
  setUser: (e: UserType | null) => void;
};

// export type taskType = {
//   createdAt: string;
//   createdBy: string;
//   isComplete: boolean;
//   task: string;
//   updatedAt: string;
//   __v: boolean;
//   _id: string;
// };

const AuthContextProvider = createContext<CreateTaskContextType | null>(null);

export function AuthContext({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const [task, setTask] = useState<taskType[] | []>([]);
  const [user, setUser] = useState<UserType | null>(null);

  return (
    // <CreateTaskContext.Provider value={{ task, setTask, user, setUser }}>
    <AuthContextProvider.Provider value={{ user, setUser }}>

      {children}
    </AuthContextProvider.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContextProvider);
