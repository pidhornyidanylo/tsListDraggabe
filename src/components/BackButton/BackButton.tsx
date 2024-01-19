import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      sx={{ position: "fixed", top: "170px", left: "535px" }}
      onClick={() => {
        navigate("/");
      }}
      variant="contained"
    >
      Back
    </Button>
  );
};

export default BackButton;
