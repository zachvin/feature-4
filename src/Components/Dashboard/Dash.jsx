import React, { useEffect, useState } from "react";
import Nav from "../Shared/Nav";
import { sendInput } from "./InputService";
import DashForm from "./DashForm";
import { readUser } from "../Auth/AuthService";
import {
  getUserHistory,
  appendUserHistory,
  deleteUserHistory,
} from "../Services/history";
import HistoryItem from "./HistoryItem";
import ModelDropdown from "./ModelDropdown";
import Parse from "parse";

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

  const [models, setModels] = useState([]);
  const [loadingModels, setLoadingModels] = useState(true);

  const fetchModels = async () => {
    setLoadingModels(true);
    try {
      const DockerModel = Parse.Object.extend("DockerModel");
      const query = new Parse.Query(DockerModel);
      query.descending("createdAt");
      const results = await query.find();
      setModels(results);
    } catch (err) {
      console.error("Error fetching marketplace models:", err.message);
    }
    setLoadingModels(false);
  };

  useEffect(() => {
    fetchModels();
  }, []);

  useEffect(() => {
    getUserHistory().then((loadedHistory) => {
      // reset history to being empty on page load because strict mode makes this
      // run twice which doubles the history array I guess that's considered helpful
      setHistory([]);
      loadedHistory.forEach((element) => {
        const next = {
          model: element.get("model"),
          input: element.get("input"),
          response: element.get("output"),
          time: new Date(element.get("time")).toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          id: element.id,
        };
        setHistory((prev) => [next, ...prev]);
      });
      setIsLoadingHistory(false);
    });
  }, []);

  const [currentIp, setCurrentIp] = useState(0);
  const [currentEndpoint, setCurrentEndpoint] = useState("/predict");
  const [currentModel, setCurrentModel] = useState(null);

  const onSelect = (modelName) => {
    // get model
    console.log(modelName);
    const currentModel = models.find((model) => model.get("name") == modelName);
    setCurrentModel(currentModel);
    setCurrentIp(currentModel.get("ip"));
    setCurrentEndpoint(currentModel.get("endpoint"));
  };

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
      const url = `http://${currentIp}:80${currentEndpoint}`;
      console.log(url);

      const response = await sendInput(url, input);
      const modelName = currentModel.get("name");

      setHistory([
        {
          model: modelName,
          input: JSON.stringify(input),
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
      setApiData(JSON.stringify(response));

      appendUserHistory(modelName, Date.now(), JSON.stringify(input), response);
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
      <section className="grid grid-cols-3 gap-2 w-3/4 h-3/4 mx-auto mt-32 text-gray-900">
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
        <div className="flex gap-16 items-start border border-gray-300 bg-white rounded-xl shadow-lg p-16 col-span-2">
          {/* SELECT NETWORK TO USE */}
          <div>
            <h2 className="text-xl font-bold mb-1">1. Select a network</h2>
            <ModelDropdown
              models={models}
              loading={loadingModels}
              onSelect={onSelect}
            />
            <DashForm
              onSubmit={onSubmitHandler}
              onChange={onChangeHandler}
              fields={currentModel?.get("inputs")} // TODO this isn't the right variable but has the right idea
            />
          </div>
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

            {!apiData && !isLoading && (
              <p className="text-gray-500 text-md block">
                Network output will appear here.
              </p>
            )}
          </div>
        </div>
        <div className="border border-gray-300 bg-white rounded-xl shadow-lg p-16 col-span-3">
          <h3 className="text-xl mb-4">History</h3>
          <div>
            <div className="flex justify-between font-bold text-gray-500 text-sm gap-4">
              <p className="block w-1/4">Submission data</p>
              <p className="block w-1/2">Input</p>
              <p className="block w-1/4">Output</p>
            </div>
            {isLoadingHistory ? (
              <p className="mt-4">Loading history...</p>
            ) : history.length > 0 ? (
              history.map((item, index) => (
                <HistoryItem
                  item={item}
                  key={index}
                  deleteUserHistory={deleteUserHistory}
                  history={history}
                  setHistory={setHistory}
                />
              ))
            ) : (
              <p className="mt-4">No history</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Dash;
