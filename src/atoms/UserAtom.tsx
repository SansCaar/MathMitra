import { atom, useSetAtom } from "jotai";

type TUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  classes: string[];
};

type TMyClassesAtom = {
  id: string;
  name: string;
  subject: string;
  section: string;
  description: string;
  classCode: string;
  teacherId: string;
  studentId: string[];
  studentCount: number;
  assignmentsCount: number;
}[];


export const fetchUser = async ({userId,role, setUser}: {userId:string, setUser:any, role:string}) => {
  try {
    const response = await fetch("/api/users/fetchUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, role }),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    const data = await response.json();
    setUser(data.data);
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};


const fetchClasses = async ({userId, setMyClasses}:{userId:string, setMyClasses: any}) => {
  try {
    const response = await fetch("/api/classes/fetchClasses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId}),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch classes");
    }
    const data = await response.json();
    setMyClasses(data.data);
  } catch (error) {
    console.error("Error fetching classes:", error);
    return [];
  }
};


export const MyClassesAtom = atom<TMyClassesAtom| null>(null);

export const UserAtom = atom<TUser | null>(null);


