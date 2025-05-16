"use client";

import { useEffect } from "react";
import axios from "axios";
import LandingPage from "@/components/landingpage";

export default function Home() {
  useEffect(() => {
    const pingBackend = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
        // console.log("Pinging backend at:", API_URL);

        await axios.get(API_URL, {
          withCredentials: true
        });

        // console.log("Backend ping successful at:", new Date().toISOString());
      } catch (err) {
        // console.error("Backend ping failed:", err);
      }
    };

    pingBackend();

    const intervalId = setInterval(pingBackend, 14 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return <LandingPage />;
}