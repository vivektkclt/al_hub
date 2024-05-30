import { PermissionsAndroid } from "react-native";

export default async function (params = null) {
  await ReadSMSPermission();
}

async function ReadSMSPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("you can read messages");
    } else {
      console.log("message permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
}
