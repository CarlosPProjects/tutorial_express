import { FC } from "react";
import Link from "next/link";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface Project {
  id: string;
  name: string;
  status: string;
}

interface Props {
  project: Project;
}

const ProjectCard: FC<Props> = ({ project }) => {
  return (
    <div className="flex flex-col justify-between p-2 border rounded-md gap-4">
      <div className="flex flex-row gap-4 justify-center items-center">
        <h5 className="text-2xl w-32"> {project.name} </h5>

        <Link
          href={`/projects/[id]`}
          as={`/projects/${project.id}`}
          className="p-1 rounded-md hover:bg-gray-400"
        >
          view
        </Link>
      </div>
      <p className=" text-sm">
        Status: <strong>{project.status}</strong>
      </p>
    </div>
  );
};
export default ProjectCard;
