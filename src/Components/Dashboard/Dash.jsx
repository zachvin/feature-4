import React, { useEffect, useState } from "react";
import Nav from "../Shared/Nav";
import { sendInput } from "./InputService";
import DashForm from "./DashForm";
import { readUser } from "../Auth/AuthService";
import { getUserHistory, appendUserHistory } from "../Services/history";

const Dash = () => {
  // dictionary structure in case other datatypes are supported later
  const [input, setInput] = useState({
    input: "",
  });

  // flags in the state to watch for add/remove updates
  const [apiData, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // array for storing history
  const [history, setHistory] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);

  useEffect(() => {
    getUserHistory().then((loadedHistory) => {
      loadedHistory.forEach((element) => {
        const next = {
          model_id: element.get("model_id"),
          input: element.get("input"),
          response: element.get("output"),
          time: new Date(element.get("time")).toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
        };
        setHistory((prev) => [next, ...prev]);
      });
      setIsLoadingHistory(false);
    });
  }, []);

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value,
    });
  };

  // do API message here
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const url = "http://34.70.192.108:80/predict";

      const response = await sendInput(url, input);

      setHistory([
        {
          model_id: "sentiment-analysis",
          input: input.text,
          response: response,
          time: new Date(Date.now()).toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
        },
        ...history,
      ]);
      setApiData(response);

      appendUserHistory("sentiment-analysis", Date.now(), input.text, response);
    } catch (err) {
      console.error("API Error in component:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // user block
  // submission block
  // history block?

  return (
    <>
      <Nav />
      <section className="grid grid-cols-2 gap-2 w-3/4 h-3/4 mx-auto mt-64 text-gray-900">
        <div className="flex justify-around border border-gray-300 bg-white rounded-xl shadow-lg p-16">
          <div className="w-1/3">
            <h3 className="text-xl">Welcome,</h3>
            <h1 className="text-4xl font-bold">
              {readUser().get("firstName")}
            </h1>
            <br />
            <p className="text-lg text-gray-500">{readUser().get("email")}</p>
          </div>
          <div className="w-2/3"></div>
        </div>
        <div className="flex justify-around items-start border border-gray-300 bg-white rounded-xl shadow-lg p-16">
          <DashForm onSubmit={onSubmitHandler} onChange={onChangeHandler} />
          <div>
            <h2 className="text-2xl font-medium">Network output:</h2>
            {isLoading && <p>Loading...</p>}

            {error && (
              <p className="text-red-600 text-xl font-bold">
                Error: {error.message}
              </p>
            )}

            {apiData && !isLoading && (
              <p className="text-green-900 text-xl font-bold block p-4 bg-green-200 rounded-lg">
                {apiData}
              </p>
            )}
          </div>
        </div>
        <div className="border border-gray-300 bg-white rounded-xl shadow-lg p-16 col-span-2">
          <h3 className="text-xl mb-4">History</h3>
          <div>
            <div className="flex justify-between font-bold text-gray-500 text-sm gap-4">
              <p className="block w-1/4">Submission data</p>
              <p className="block w-1/2">Input</p>
              <p className="block w-1/4">Output</p>
            </div>
            {isLoadingHistory ? (
              <p className="mt-4">Loading history...</p>
            ) : (
              history.map((item, index) => (
                <div
                  key={index}
                  className="flex border-y-1 justify-between gap-4 border-gray-300 py-2 -mt-[1px]"
                >
                  <p className="text-md w-1/4 flex">
                    {item.model_id}
                    <span className="text-sm self-center ml-2">
                      {item.time}
                    </span>
                  </p>
                  <p className="block w-1/2">{item.input}</p>
                  <p className="block w-1/4">{item.response}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Dash;
