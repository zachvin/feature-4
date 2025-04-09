import React from "react";

const HistoryItem = ({ item, deleteUserHistory, history, setHistory }) => {
  async function onDelete() {
    deleteUserHistory(item.id, history, setHistory);
  }
  return (
    <div
      key={item.id}
      className="flex relative border-y-1 justify-between gap-4 border-gray-300 py-2 -mt-[1px]"
    >
      <p className="text-md w-1/4 flex">
        {item.model_id}
        <span className="text-sm self-center ml-2">{item.time}</span>
      </p>
      <p className="block w-1/2">{item.input}</p>
      <p className="block w-1/4">{item.response}</p>
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute stroke-gray-400 fill-gray-300 hover:stroke-red-400 hover:fill-red-300 w-[25px] hover:cursor-pointer right-4 top-1/2 -translate-y-1/2"
        onClick={onDelete}
      >
        <path
          d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default HistoryItem;
