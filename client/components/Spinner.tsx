const Spinner = () => {
  return (
    <div className="flex justify-center">
      <div className="border" role={"status"}>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
export default Spinner;
