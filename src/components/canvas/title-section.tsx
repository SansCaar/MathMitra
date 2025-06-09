"use client";

import axios from "axios";
import { ChevronLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const TitleSection = () => {
  const params = useParams();
  const slug = params.question_id;

  useEffect(() => {
  }, [slug]);

  return (
    <div className="flex gap-1 items-center mt-2.5 ml-2.5 text-gray-600">
      <ChevronLeft />
      <h1 className="text-md font-medium">Hello This is a dummy title</h1>
    </div>
  );
};
export default TitleSection;
