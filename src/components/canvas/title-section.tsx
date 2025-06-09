"use client";

import axios from "axios";
import { ChevronLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const TitleSection = () => {
  const params = useParams();
  const slug = params.question_id;
  const [title, setTitle] = useState<string>("fetching playground title...");

  useEffect(() => {
    let title = "";
    (async () => {
      try {
        title =
          (await axios.post(`/api/questions/viewOne`, {
            questionId: slug,
          })) ?? "Playground";
        console.log(title);
      } catch (err) {
        title = "Playground";
      }
      setTitle(title);
    })();
  }, [slug]);

  return (
    <div className="flex gap-1 items-center mt-2.5 ml-2.5 text-gray-600">
      <ChevronLeft />
      <h1 className="text-md font-medium">{title}</h1>
    </div>
  );
};
export default TitleSection;
