import { useParams } from "react-router-dom";

export default function ProjectDetail() {
  const { id } = useParams();
  
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Project: {id} - Coming in Task 5</h1>
      </div>
    </div>
  );
}
