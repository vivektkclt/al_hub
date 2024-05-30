import { C } from "../../assets";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Rating from "react-native-easy-rating";
import { withHeader } from "../../hoc/withHeader";
import { ratingStyles as styles } from "./Rating.style";
import { showMessage } from "react-native-flash-message";
import addReview from "../../graphql/mutations/addReview";
import useMediaHandler from "../../hooks/useMediaHandler";
import { useLazyQuery, useMutation } from "@apollo/client";
import claimOffer from "../../graphql/mutations/claimOffer";
import getSignedUrl from "../../graphql/queries/getSignedUrl";
import getStoreReview from "../../graphql/queries/getStoreReview";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import getOfferDetails from "../../graphql/queries/getOfferDetails";
import SvgButton from "../../components/Buttons/SvgButton.component";
import { CameraIcon, CamIcon, CloseIcon } from "../../assets/images";
import submitReviewImage from "../../graphql/mutations/submitReviewImage";
import {
  View,
  Text,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";

const HeaderComponent = () => {
  const { goBack } = useNavigation();
  return (
    <View style={styles.headerView}>
      <TouchableOpacity onPress={goBack} style={styles.closeIcon}>
        <CloseIcon />
      </TouchableOpacity>
    </View>
  );
};

const BodyComponent = () => {
  const route = useRoute();
  const { goBack } = useNavigation();
  const { bottom } = useSafeAreaInsets();
  const { chooseFile, captureImage, onClearMedia, onRemoveImage } =
    useMediaHandler({
      isChooseSingle: false,
    });

  const offerId = route?.params?.offerId;
  const {
    token: { access_token: token },
  } = useSelector((state) => state.user);
  const { media } = useSelector((state) => state.media);
  const { selectedStore } = useSelector((state) => state.category);
  const storeId = selectedStore?.Store?.id;
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const context = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const [
    onAddReviewFn,
    { data: addReviewData, error: addReviewError, loading: addReviewLoading },
  ] = useMutation(addReview);
  const [
    onClaimOfferFun,
    {
      data: claimOfferData,
      error: claimOfferError,
      loading: claimOfferLoading,
    },
  ] = useMutation(claimOffer);
  const [
    onAddReviewImageFn,
    {
      data: addReviewImgData,
      error: addReviewImgError,
      loading: addReviewImgLoading,
    },
  ] = useMutation(submitReviewImage);
  const [
    onGetPreSignedUrl,
    { data: preSignedData, error: preSignedError, loading: preSignedLoading },
  ] = useLazyQuery(getSignedUrl);

  const onRatingSUccess = () => {
    showMessage({
      type: "success",
      message: "Added rating successfully",
    });
    goBack();
  };

  const onSubmitHandler = async () => {
    if (rating === 0) {
      showMessage({
        message: "Please choose a rating",
        type: "danger",
      });
      return;
    }
    await onAddReviewFn({
      context,
      fetchPolicy: "network-only",
      variables: {
        ReviewInput: {
          rating,
          storeId,
          description: review,
        },
      },
      onError: (e) => {
        const error = `${e}`.split(":").reverse()[0];
        showMessage({
          type: "danger",
          message: error,
        });
      },
      onCompleted: async (data) => {
        console.log(data, "after review");
        if (offerId) {
          await onClaimOfferFun({
            context,
            fetchPolicy: "network-only",
            variables: {
              storeId,
              offerId,
            },
            refetchQueries: () => [
              {
                context,
                query: getOfferDetails,
                fetchPolicy: "network-only",
                variables: {
                  storeId,
                  offerId,
                },
              },
            ],
            onError: (err) => {
              console.log(err);
            },
          });
        }
        if (data?.AddReview && media?.length > 0) {
          const reviewId = data?.AddReview?.id;
          const files = [];
          media.map((item) =>
            files.push({
              fileType: item.fileType,
              fileName: item?.fileName,
            })
          );
          await onGetPreSignedUrl({
            context,
            fetchPolicy: "network-only",
            variables: {
              files,
              reviewId,
            },
            onCompleted: async (data) => {
              const filesMeta = data?.GetReviewImagesSignedUrls?.filesMeta;
              if (filesMeta) {
                const res = await Promise.all(
                  media.map(async (file, index) => {
                    const URL = filesMeta[index]?.signedUrl;
                    const uri = file?.uri;
                    const imgResponse = await fetch(uri);
                    const imgBlob = await imgResponse.blob();

                    const response = await fetch(URL, {
                      method: "PUT",
                      headers: {
                        "Content-Type": "application/octet-stream",
                      },
                      body: imgBlob,
                    })
                      .then((res) => res.status)
                      .catch((err) => {
                        showMessage({
                          type: "danger",
                          message: "Image upload failed",
                        });
                        return;
                      });
                    return response;
                  })
                );
                if (res) {
                  onAddReviewImageFn({
                    context,
                    fetchPolicy: "network-only",
                    variables: {
                      reviewId,
                      filesMeta,
                    },
                    onCompleted: () => {
                      onRatingSUccess();
                    },
                    onError: () => {
                      showMessage({
                        type: "danger",
                        message: "Image upload failed",
                      });
                      return;
                    },
                    refetchQueries: () => [
                      {
                        context,
                        query: getStoreReview,
                        fetchPolicy: "cache-and-network",
                        variables: {
                          storeId,
                        },
                      },
                    ],
                  });
                }
              }
            },
          });
        } else onRatingSUccess();
      },
      refetchQueries: () => [
        {
          context,
          query: getStoreReview,
          fetchPolicy: "cache-and-network",
          variables: {
            storeId,
          },
        },
      ],
    });
  };

  const onChangeText = (text) => setReview(text);
  return (
    <View style={styles.parent}>
      <Text style={styles.topTxt}>{C.strings.RATE_EXP}</Text>
      <Rating
        max={5}
        iconWidth={30}
        iconHeight={30}
        rating={rating}
        onRate={setRating}
        iconUnselected={require(`../../assets/images/png/rate-star.png`)}
        iconSelected={require(`../../assets/images/png/star-selected.png`)}
      />
      <View style={styles.spacer} />
      <Text style={styles.txtMiddle}>{C.strings.TELL_MORE}</Text>
      <TextInput
        multiline
        value={review}
        numberOfLines={6}
        autoCorrect={false}
        returnKeyType={"done"}
        autoCapitalize={"none"}
        allowFontScaling={false}
        style={styles.inputStyle}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitHandler}
        placeholder={C.strings.WRITE_UR_REVIEW}
        placeholderTextColor={C.colors.text.secondary}
      />
      <Text style={styles.txtMiddle}>{C.strings.ADD_PIC}</Text>
      <TouchableOpacity onPress={captureImage} style={styles.borderBtn}>
        <CamIcon />
      </TouchableOpacity>
      <SvgButton
        showBg
        height={45}
        width={"94%"}
        onBtnHandler={onSubmitHandler}
        placeholder={C.strings.SUBMIT_REVIEW}
        btnStyle={[
          styles.bottomBtn,
          { bottom: Platform.OS === "ios" ? bottom : bottom + 15 },
        ]}
      />
    </View>
  );
};

const RatingPage = withHeader({ HeaderComponent, BodyComponent });

export default RatingPage;
