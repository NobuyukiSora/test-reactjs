// pages/index.tsx
"use client";
import React from "react";
import "./styles.css";

import { useEffect, useState } from "react";
import { Alert, Button } from "@mui/material";

interface Data {
  id: number;
  name: string;
}

export default function TestScreen() {
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  async function fetchData(api: string) {
    setLoading(true);
  
    try {
      const response = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ /*payload*/ }),
        credentials: 'include' 
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      setData(result);
      console.log('response: ', result);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unknown error occurred.');
      }
      console.error('Fetch error: ', error);
    } finally {
      setLoading(false);
    }
  }

  const loadingComponent =  () => {
    if (loading) {
      return (
        <div className="alert">
          <Alert severity="info" >{'Loading'}</Alert>
        </div>
      )
    }
  }

  const errorMassageComponenet = () => {
    if (errorMessage) {
      return (
        <div className="error">
          <Alert severity="info" >{errorMessage}</Alert>
        </div>
      )
    }
  }

  return (
    <div className="screen">
      <h1 className="text-black">Data sharepoint xls</h1>
      <div className="flex flex-row justify-between my-10">
      <Button variant="contained" style={{margin: 5}} onClick={() => fetchData("http://127.0.0.1:8000/sharepoint/read_action_1")}>
      Action 1</Button>
        <Button variant="contained" style={{margin: 5}} onClick={() => fetchData("http://127.0.0.1:8000/sharepoint/read_action_2")}>
          Action 2
        </Button>
      </div>
      {errorMassageComponenet()}
      {loadingComponent()}
      <p></p>
    </div>
  );
}
