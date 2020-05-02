import keys from '../constants/apikeys';
const Parse = require("parse/node");


export function parseInit() {
  console.log('parseInit() APP_ID: ' + keys.APP_ID)
  Parse.serverURL = "https://notifyme.back4app.io"; // This is your Server URL
  Parse.initialize(
    keys.APP_ID,
    keys.JS_KEY,
  );
}

// parse response
// {"username":"test","email":"example@google.com","name":"web_user",
// "confirmPassword":"qwerty","RunCount":1,"createdAt":"2020-04-30T11:06:44.869Z",
// "sessionToken":"r:b8447633f8bf4348d611eadd442b7a6e",
// "updatedAt":"2020-04-30T11:06:44.869Z","objectId":"dNvDWX46ws"}
export function userSignUp({ username, email, password }, callback) {
  const user = new Parse.User();
  user.set("email", email);
  user.set("name", "web_user");
  user.set("confirmPassword", password);
  user.set("RunCount", 1);
  user.set("password", password);

  if (username === null) {
    console.log('parse userSignUp() signIn tread')
    user
      .signIn()
      .then((user) => {
        callback(user.toJSON());
        console.log("User logged in: ", user.get("sessionToken"));
      })
      .catch((error) => {
        callback(error.message);
      });

  } else {
    console.log('parse userSignUp() signUp tread')
    user.set("username", username);
    user
      .signUp()
      .then((user) => {
        callback(user.toJSON());
        console.log("User signed up: ", user.get("sessionToken"));
      })
      .catch((error) => {
        callback(error.message);
      });
  }
}
