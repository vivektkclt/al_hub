import { useDispatch, useSelector } from "react-redux";
import { mediaSlice } from "../redux/slices/media.slice";
import { showMessage } from "react-native-flash-message";
import { PermissionsAndroid, Platform } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

let mediaOptions = {
  quality: 1,
  selectionLimit: 4,
  mediaType: "photo",
  includeBase64: true,
};

const useMediaHandler = ({ isChooseSingle }) => {
  const dispatch = useDispatch();
  const { media } = useSelector((state) => state.media);

  const onClearMedia = () => {
    dispatch(
      mediaSlice.actions.updateMedia({
        media: [],
      })
    );
  };

  if (isChooseSingle === true) {
    mediaOptions = {
      ...mediaOptions,
      selectionLimit: 1,
    };
  }

  const requestCameraPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            buttonPositive: "OK",
            buttonNegative: "Cancel",
            title: "Camera Permission",
            message: "App needs camera permission",
            buttonNeutral: "Ask Me Later",
          }
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        showMessage({
          message: err.message,
          type: "danger",
          position: "top",
        });
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            buttonPositive: "OK",
            buttonNegative: "Cancel",
            buttonNeutral: "Ask Me Later",
            message: "App needs write permission",
            title: "External Storage Write Permission",
          }
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        showMessage({
          message: err.message,
          type: "danger",
          position: "top",
        });
      }
      return false;
    } else return true;
  };

  const captureImage = async () => {
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (!isStoragePermitted) {
      showMessage({
        type: "danger",
        position: "top",
        message: "Permission not statisfied",
      });
      isStoragePermitted = await requestExternalWritePermission();
    }
    if (!isCameraPermitted) {
      showMessage({
        type: "danger",
        position: "top",
        message: "Please allow permission for camera to take picture",
      });
      isCameraPermitted = await requestCameraPermission();
    }
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(mediaOptions, (response) => {
        if (response.didCancel) {
          showMessage({
            type: "danger",
            position: "top",
            message: "Cancelled",
          });
          return;
        } else if (response.errorCode == "camera_unavailable") {
          showMessage({
            type: "danger",
            message: `Camera not available on device`,
          });
          return;
        } else if (response.errorCode == "permission") {
          showMessage({
            type: "danger",
            message: `Permission not satisfied`,
          });
          return;
        } else if (response.errorCode == "others") {
          showMessage({
            type: "danger",
            message: `${response.errorMessage}`,
          });
          return;
        }

        const imagesArr = [];
        if (response?.assets) {
          for (let i = 0; i < response?.assets?.length; i++) {
            if (response?.assets[i]?.base64) {
              imagesArr.push({
                uri: response?.assets[i]?.uri,
                base64: response?.assets[i]?.base64,
                fileType: response?.assets[i]?.type,
                fileName: response?.assets[i]?.fileName,
              });
            }
          }
        }
        if (imagesArr) {
          const imgLength = imagesArr?.length;
          dispatch(mediaSlice.actions.updateMedia({ media: imagesArr }));
          if (!isChooseSingle) {
            showMessage({
              type: "success",
              message: `${imgLength} images selected successfully`,
            });
          }
        }
      });
    }
  };

  const chooseFile = () => {
    launchImageLibrary(mediaOptions, (response) => {
      if (response.didCancel) {
        showMessage({
          type: "danger",
          message: "Cancelled",
        });
        return;
      } else if (response.errorCode == "camera_unavailable") {
        showMessage({
          type: "danger",
          message: `Camera not available on device`,
        });
        return;
      } else if (response.errorCode == "permission") {
        showMessage({
          type: "danger",
          message: `Permission not satisfied`,
        });
        return;
      } else if (response.errorCode == "others") {
        showMessage({
          type: "danger",
          message: `${response.errorMessage}`,
        });
        return;
      }

      const imagesArr = [];
      if (response?.assets) {
        for (let i = 0; i < response?.assets?.length; i++) {
          if (response?.assets[i]?.base64) {
            imagesArr.push({
              uri: response?.assets[i]?.uri,
              base64: response?.assets[i]?.base64,
              fileType: response?.assets[i]?.type,
              fileName: response?.assets[i]?.fileName,
            });
          }
        }
      }
      if (imagesArr) {
        const imgLength = imagesArr?.length;
        dispatch(mediaSlice.actions.updateMedia({ media: imagesArr }));
        if (!isChooseSingle) {
          showMessage({
            type: "success",
            message: `${imgLength} images selected successfully`,
          });
        }
      }
    });
  };

  const onRemoveImage = (selectedIndex) => {
    const newMedia = media.filter((item, index) => index !== selectedIndex);
    dispatch(mediaSlice.actions.updateMedia({ media: newMedia }));
    if (mediaIndex?.length === 0) {
      onClearMedia();
    }
  };

  return {
    chooseFile,
    captureImage,
    onClearMedia,
    onRemoveImage,
  };
};

export default useMediaHandler;
