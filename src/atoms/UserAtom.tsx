import { atom, useSetAtom } from "jotai";
import { atomWithStorage} from "jotai/utils";

export type TUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  classes: string[];
};

export type TMyClassesAtom = {
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


export const fetchClasses = async ({userId, role="teacher", setMyClasses}:{userId:string,role?:string, setMyClasses: any}) => {
  try {
    const response = await fetch("/api/classes/fetchClasses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({  userId, role}),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch classes");
    }
    const data = await response.json();
    console.log(data);
    setMyClasses(data.data);
  } catch (error) {
    console.error("Error fetching classes:", error);
    return [];
  }
};


export const MyClassesAtom =atomWithStorage<TMyClassesAtom| null>("myClasses", null);

export const UserAtom = atomWithStorage<TUser | null>("user", null);


