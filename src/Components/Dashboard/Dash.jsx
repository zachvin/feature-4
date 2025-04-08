import React, { useEffect, useState } from "react";
import Nav from "../Shared/Nav";
import { sendInput } from "./InputService";
import DashForm from "./DashForm";

const Dash = () => {
  // dictionary structure in case other datatypes are supported later
  const [input, setInput] = useState({
    input: "",
  });

  // flags in the state to watch for add/remove updates
  const [apiData, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onChangeHandler = (e) => {
    e.preventDefault();
    console.log(e.target);
    const { name, value } = e.target;
    console.log(value);

    setInput({
      ...input,
      [name]: value,
    });
  };

  // do API message here
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("submitted: ", e.target);

    setIsLoading(true);

    try {
      const url = "http://34.70.192.108:80/predict";
      // const url = "http://127.0.0.1:8000/predict";
      const message = {
        input: input,
        // timestamp: Date.now(),
      };

      const response = await sendInput(url, input);
      setApiData(response);
    } catch (err) {
      console.error("API Error in component:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Nav />
      <section className="flex flex-col items-center justify-center w-screen h-screen text-gray-900">
        <h1 className="text-4xl my-16">Dashboard</h1>
        <DashForm onSubmit={onSubmitHandler} onChange={onChangeHandler} />
        <div className="my-8 w-1/3 flex flex-col items-start">
          <h2 className="text-2xl font-medium">Network output</h2>
          {isLoading && <p>Loading...</p>}

          {error && <p style={{ color: "red" }}>Error: {error.message}</p>}

          {apiData && !isLoading && <p>{apiData}</p>}
        </div>
      </section>
    </>
  );
};

export default Dash;
