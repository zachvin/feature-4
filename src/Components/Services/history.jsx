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
