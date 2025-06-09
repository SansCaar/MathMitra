import { TeacherHeader } from "@components/teacher/teacher-header";

interface TeacherLayoutProps {
  children: React.ReactNode;
}
const layout = ({ children }: TeacherLayoutProps) => {
  const teacherData = {
    id: " 1323",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@school.edu",
  };
  return (
    <div className="min-h-screen bg-slate-50">
      <TeacherHeader
        teacherName={teacherData.name}
        teacherEmail={teacherData.email}
      />
      {children}
    </div>
  );
};

export default layout;
