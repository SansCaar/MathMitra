"use client";

import axios from "axios";
import { ChevronLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

const TitleSection = () => {

  const router = useRouter();
  const params = useParams();
  const slug = params.question_id;
  const [title, setTitle] = useState<string>("fetching playground title...");

  useEffect(() => {
    let title = "";
    (async () => {
      try {
        let t =
          (await axios.post(`/api/questions/viewOne`, {
            questionId: slug,
          }))?.data.body

          title = t?.question ?? "Playground";
      } catch (err) {
        title = "Playground";
      }
      setTitle(title);
    })();
  }, [slug]);

  return (
    <div className="flex gap-1 items-center mt-2.5 ml-2.5 text-gray-600 absolute top-2.5 left-2.5">
      <ChevronLeft onClick={() => router.back()} />
      <h1 className="text-md font-medium">
        <Latex>
        {title}
        </Latex>
      </h1>
    </div>
  );
};
export default TitleSection;
