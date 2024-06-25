"use client";

import Link from "next/link";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function VerifyEmailPage() {
//   const router = useRouter();
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifiedEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken=window.location.search.split("=")[1]
   setToken(urlToken || "")
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifiedEmail();
    }
  }, [token]);

  return <div>
    <h1>{token? `${token}`:""}</h1>
    {verified ? "Email verified!" : error ? "Error verifying email." : "Verifying..."}</div>;
}

export default VerifyEmailPage;
