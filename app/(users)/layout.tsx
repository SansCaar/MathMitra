'use client'

import { TeacherHeader } from "@components/teacher/teacher-header";
import { useEffect, useState } from "react";

interface TeacherLayoutProps {
  children: React.ReactNode;
}
const layout = ({children}:TeacherLayoutProps) => {
const [user, setUser] = useState<any>(null);
  const checkLocalStorage = async () => {
    const user = localStorage.getItem("user");
    console.log(user);
    if (!user) {
      window.location.href = "/auth/login";
      return
      }
    setUser(JSON.parse(user));
    }
  useEffect(() => {
    checkLocalStorage();
  }, []);
    


  return (
    <div className="min-h-screen bg-slate-50">
      <TeacherHeader
        teacherName={user?.name || ''}
        teacherEmail={user?.email || ''}
      />
      {children}
    </div>
  )
}

export default layout
