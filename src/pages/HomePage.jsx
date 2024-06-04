import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../common/Cookie";
import { removeCookie } from "./../common/Cookie";
import { useEffect } from "react";
import { useState } from "react";

function HomePage() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (getCookie("accessToken")) setIsLogin(true);
  }, [isLogin]);

  return (
    <main>
      {!isLogin ? (
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          로그인
        </button>
      ) : (
        <button
          onClick={() => {
            removeCookie("accessToken");
            setIsLogin(false);
          }}
        >
          로그아웃
        </button>
      )}
      <button
        onClick={() => {
          navigate("/join");
        }}
      >
        회원가입
      </button>
    </main>
  );
}

export default HomePage;
