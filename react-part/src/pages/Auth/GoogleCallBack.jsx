import React, { useEffect } from "react";
import { googleCallBack } from "../../apis/AuthApiS";
import { useLocation } from "react-router-dom";
import Cookies from "universal-cookie";

function GoogleCallBack() {
  const location = useLocation();
  const cookie = new Cookies();
  async function googleCall() {
    try {
      const res = await googleCallBack(location.search);
      cookie.set("Bearer", res.data.access_token, {
        path: "/",
      });
      console.log("res google call back is", res);
    } catch (err) {
      console.log("err google call back", err);
    }
  }
  useEffect(() => {
    googleCall();
  }, []);
  return (
    <div>
      <h1>hello ya fanan</h1>
    </div>
  );
}

export default GoogleCallBack;
