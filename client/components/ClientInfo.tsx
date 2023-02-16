import { FaEnvelope, FaPhone, FaIdBadge } from "react-icons/fa";
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

const ClientInfo: FC<Props> = ({ client }) => {
  return (
    <>
      <h5 className="text-xl mt-5 font-medium">Client Information</h5>
      <ul className="flex flex-col gap-2 mt-2">
        <li className="flex flex-row items-center gap-2">
          {" "}
          <FaIdBadge /> {client.name}{" "}
        </li>
        <li className="flex flex-row items-center gap-2">
          {" "}
          <FaEnvelope /> {client.email}{" "}
        </li>
        <li className="flex flex-row items-center gap-2">
          {" "}
          <FaPhone /> {client.phone}{" "}
        </li>
      </ul>
    </>
  );
};
export default ClientInfo;
