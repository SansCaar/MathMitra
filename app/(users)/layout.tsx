'use client'

import { TeacherHeader } from "@components/teacher/teacher-header";
import { UserAtom } from "@src/atoms/UserAtom";
import { useAtomValue } from "jotai";

interface TeacherLayoutProps {
  children: React.ReactNode;
}
const layout = ({children}:TeacherLayoutProps) => {

  const user =useAtomValue(UserAtom);

  if(!user) window.location.href="/auth/login";

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
