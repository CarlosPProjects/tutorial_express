import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import ClientInfo from "@/components/ClientInfo";

const GET_PROJECT = gql`
  query getProject($id: ID!) {
    project(id: $id) {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;

const ProjectPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong</p>;

  const { project } = data;

  return (
    <>
      {!loading && !error && (
        <div className="mx-auto w-1/3 border rounded-md p-5">
          <Link
            href={"/"}
            className="w-full inline-block px-2 rounded-md underline text-end"
          >
            Back
          </Link>
          <h1 className="text-3xl font-medium"> {project.name} </h1>
          <p> {project.description} </p>
          <h5 className="mt-2 text-xl font-medium">Project Status</h5>
          <p className="">{project.status} </p>

          <ClientInfo client={project.client} />
        </div>
      )}
    </>
  );
};

export default ProjectPage;
