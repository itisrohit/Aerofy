"use client";

import LandingPage from "@/components/landingpage";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const testApiConnection = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
      console.log("Using API URL:", API_URL);
      
      const response = await axios.get(`${API_URL}/users/me`, { 
        withCredentials: true 
      });
      
      console.log("API Response:", response.data);
      alert("API request successful! Check console for details.");
    } catch (err: any) {
      console.error("API Error:", err);
      setError(err.message || "Failed to connect to API");
      alert(`API Error: ${err.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        <Button 
          onClick={testApiConnection}
          disabled={loading}
          variant="outline"
          className="bg-white shadow-md"
        >
          {loading ? "Testing..." : "Test API Connection"}
        </Button>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
      <LandingPage />
    </>
  );
}