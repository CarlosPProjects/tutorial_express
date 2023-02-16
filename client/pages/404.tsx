import { FaExclamationTriangle } from "react-icons/fa";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center mt-4 gap-2">
      <FaExclamationTriangle className="text-red-600" size={50} />
      <h1>404</h1>
      <p>Sorry, this page does not exist</p>
      <Link href={"/"} className="p-2 rounded-md bg-gray-500">
        Go back
      </Link>
    </div>
  );
};
export default NotFound;
