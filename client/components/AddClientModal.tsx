import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "@/mutations/clientMutation";
import { GET_CLIENTS } from "@/queries/clientQueries";
import Clients from "./Clients";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface GetClientsResponse {
  clients: Client[];
}

const AddClientModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: { addClient } }) {
      const response = cache.readQuery<GetClientsResponse>({
        query: GET_CLIENTS,
      });

      if (response) {
        const { clients } = response;
        cache.writeQuery({
          query: GET_CLIENTS,
          data: { clients: [...clients, addClient] },
        });
      }
    },
  });

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (name === "" || email === "" || phone === "") {
      return alert("Please fill in all fields.");
    }

    addClient({ variables: { name, email, phone } });

    setName("");
    setEmail("");
    setPhone("");
    setIsOpen(false);
  };

  return (
    <>
      <button
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex flex-row items-center"
        onClick={handleOpenModal}
      >
        <FaUser className="mr-2" />
        <div>Add Client</div>
      </button>
      {isOpen && (
        <div className="fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <div className="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <div>
              <div className="mx-auto flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">
                  Añadir Cliente
                </h2>
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                  onClick={handleCloseModal}
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <form className="px-8 py-6" onSubmit={onSubmit}>
                <div>
                  <label
                    htmlFor="nombre"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    id="nombre"
                    type="text"
                    className="w-full px-3 py-2 mt-2 text-gray-300 border border-gray-300 rounded-lg"
                    placeholder="Nombre del cliente"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mt-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full px-3 py-2 mt-2 text-gray-300 border border-gray-300 rounded-lg"
                    placeholder="Email del cliente"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mt-6">
                  <label
                    htmlFor="telefono"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Teléfono
                  </label>
                  <input
                    id="telefono"
                    type="tel"
                    className="w-full px-3 py-2 mt-2 text-gray-300 border border-gray-300 rounded-lg"
                    placeholder="Teléfono del cliente"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
                  >
                    Guardar Cliente
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddClientModal;
