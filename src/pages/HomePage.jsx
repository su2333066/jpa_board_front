import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/login");
        }}
      >
        로그인
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/join");
        }}
      >
        회원가입
      </Button>
    </div>
  );
}

export default HomePage;
