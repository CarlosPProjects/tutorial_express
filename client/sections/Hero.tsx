import AddClientModal from "@/components/AddClientModal";
import Clients from "@/components/Clients";
import Projects from "@/components/Projects";

const Hero = () => {
  return (
    <div>
      <AddClientModal />
      <Projects />
      <Clients />
    </div>
  );
};
export default Hero;
