"use client";
import { useParams } from "next/navigation";

const EditCoursePage = () => {
  const params = useParams();
  const { id } = params;
  return <div>Edit Course {id}</div>;
};
export default EditCoursePage;
