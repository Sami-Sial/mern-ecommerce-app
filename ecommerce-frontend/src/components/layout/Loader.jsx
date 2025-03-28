import CircularProgress from "@mui/material/CircularProgress";
const Loader = () => {
  return (
    <>
      <div
        style={{
          top: "50vh",
          left: "48vw",
          position: "absolute",
        }}
      >
        <CircularProgress color="secondary" />
      </div>
    </>
  );
};

export default Loader;
