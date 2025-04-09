import Parse from "parse";
import { readUser } from "../Auth/AuthService";

// Get history associated with user
export const getUserHistory = () => {
  const History = Parse.Object.extend("history");
  const query = new Parse.Query(History);

  const userPointer = new Parse.Object("_User");
  userPointer.id = readUser().id; // Set the objectId

  query.equalTo("user", userPointer);
  return query.find().then((result) => {
    return result;
  });
};

// Append history associated with user
export async function appendUserHistory(model_id, time, input, output) {
  const History = Parse.Object.extend("history");

  const historyUpdate = new History();

  const userPointer = new Parse.Object("_User");
  userPointer.id = readUser().id; // Set the objectId

  historyUpdate.set({
    user: userPointer,
    model_id: model_id,
    time: time,
    input: input,
    output: output,
  });

  await historyUpdate.save();
  return;
}

export async function deleteUserHistory(id, history, setHistory) {
  setHistory(history.filter((item) => item.id !== id)); // Remove the deleted history from local storage

  try {
    // Remove deleted history from database
    const HistoryToDelete = Parse.Object.extend("history");
    const item = new HistoryToDelete();
    item.id = id;
    await item.destroy();
  } catch (err) {
    console.error("Bad delete in component:", err);
  }
}
