import { connect } from "mongoose";

export const ConnectMongoose = async () => {
  await connect("mongodb+srv://hospe:hospe@hospe-dev.vyrdq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
};
