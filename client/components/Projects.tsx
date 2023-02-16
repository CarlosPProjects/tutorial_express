import Spinner from "./Spinner";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "@/queries/projectQueries";
import ProjectCard from "./ProjectCard";

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
  client: Client[];
}

const Projects = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {data.projects.length > 0 ? (
        <div className="flex flex-row gap-4 m-4">
          {data.projects.map((project: Project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p>No Projects</p>
      )}
    </>
  );
};
export default Projects;
