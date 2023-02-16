import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "@/mutations/clientMutation";
import { GET_CLIENTS } from "@/queries/clientQueries";
import { FC } from "react";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface Props {
  client: Client;
}

interface GetClientsResponse {
  clients: Client[];
}

const ClientRow: FC<Props> = ({ client }) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },
    //refetchQueries:[{query: GET_CLIENTS}],
    update(cache, { data: { deleteClient } }) {
      const response = cache.readQuery<GetClientsResponse>({
        query: GET_CLIENTS,
      });
      if (response) {
        const { clients } = response;
        cache.writeQuery({
          query: GET_CLIENTS,
          data: {
            clients: clients.filter((client) => client.id !== deleteClient.id),
          },
        });
      }
    },
  });

  const handdleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    deleteClient();
  };

  return (
    <tr>
      <td className="border p-2">{client.name}</td>
      <td className="border p-2">{client.email}</td>
      <td className="border p-2">{client.phone}</td>
      <td className="border p-2 bg-red-700">
        <button className="w-10 p-2" onClick={handdleClick}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};
export default ClientRow;
