import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function JoinPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
    nickname: "",
  });
  const [validUsername, setValidUsername] = useState("");
  const [validPassword, setValidPassword] = useState("");
  const [validNickname, setValidNickname] = useState("");
  const [duplicateUsername, setDuplicateUsername] = useState(true);
  const [duplicateNickname, setDuplicateNickname] = useState(true);

  const handleChange = async (e) => {
    const { id, value } = e.target;
    setUser({ ...user, [id]: value });
  };

  const join = async () => {
    if (!user.username || !user.nickname) {
      alert("아이디와 닉네임은 필수 입력 값입니다.");
      return;
    }

    if (duplicateUsername) {
      alert("아이디 중복체크 부탁드립니다.");
      return;
    }

    if (duplicateNickname) {
      alert("닉네임 중복체크 부탁드립니다.");
      return;
    }

    let flag = true;

    setValidPassword("");

    const response = await axios.post("/api/auth/join/check", user);
    if (!response.data.ok) {
      for (const key of Object.keys(response.data.validatorResult)) {
        if (key === "valid_password") {
          setValidPassword(response.data.validatorResult.valid_password);
          flag = false;
        }
      }
    }

    if (flag) {
      await axios.post("/api/auth/join", user).then((res) => {
        if (res.data) {
          alert("회원가입 성공!!");
          navigate("/");
        } else {
          console.log(res.data);
          alert("회원가입 실패!!");
        }
      });
    }
  };

  const duplicateUsernameCheck = async () => {
    let flag = true;

    setValidUsername("");

    const response = await axios.post("/api/auth/join/check", user);
    if (!response.data.ok) {
      for (const key of Object.keys(response.data.validatorResult)) {
        if (key === "valid_username") {
          setValidUsername(response.data.validatorResult.valid_username);
          flag = false;
        }
      }
    }

    if (flag) {
      try {
        const response = await axios.get(
          `/api/auth/join/username/${user.username}`
        );
        alert(response.data);
        setDuplicateUsername(false);
      } catch (e) {
        alert(e.response.data);
        setDuplicateUsername(true);
      }
    }
  };

  const duplicateNicknameCheck = async () => {
    let flag = true;

    setValidNickname("");

    const response = await axios.post("/api/auth/join/check", user);
    if (!response.data.ok) {
      for (const key of Object.keys(response.data.validatorResult)) {
        if (key === "valid_nickname") {
          setValidNickname(response.data.validatorResult.valid_nickname);
          flag = false;
        }
      }
    }

    if (flag) {
      try {
        const response = await axios.get(
          `/api/auth/join/nickname/${user.nickname}`
        );
        alert(response.data);
        setDuplicateNickname(false);
      } catch (e) {
        alert(e.response.data);
        setDuplicateNickname(true);
      }
    }
  };

  useEffect(() => {
    setDuplicateUsername(true);
  }, [user.username]);

  useEffect(() => {
    setDuplicateNickname(true);
  }, [user.nickname]);

  return (
    <main>
      <fieldset>
        <input
          type="text"
          placeholder="아이디"
          id="username"
          onChange={handleChange}
        />
        <button onClick={duplicateUsernameCheck}>중복</button>
      </fieldset>
      <div className="validation">{validUsername}</div>

      <fieldset>
        <input
          type="text"
          placeholder="닉네임"
          id="nickname"
          onChange={handleChange}
        />
        <button onClick={duplicateNicknameCheck}>중복</button>
      </fieldset>
      <div>{validNickname}</div>

      <fieldset>
        <input
          type="password"
          placeholder="비밀번호"
          id="password"
          onChange={handleChange}
        />
      </fieldset>
      <div>{validPassword}</div>

      <fieldset>
        <button onClick={join}>회원가입</button>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          목록
        </button>
      </fieldset>
    </main>
  );
}
