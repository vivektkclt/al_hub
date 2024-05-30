import { C } from "../../assets";
import { commonStyles } from "../../styles";
import { useMutation } from "@apollo/client";
import React, { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import SvgButton from "../Buttons/SvgButton.component";
import { showMessage } from "react-native-flash-message";
import { offerSlice } from "../../redux/slices/offer.slice";
import radeemOffer from "../../graphql/mutations/radeemOffer";
import getOfferDetails from "../../graphql/queries/getOfferDetails";
import SmoothPinCodeInput from "../TextInput/SmoothPinCodeInput.component";

const RadeemModal = ({ onModalDismiss }) => {
  const dispacth = useDispatch();
  const {
    token: { access_token: token },
  } = useSelector((state) => state.user);
  const { selectedStore, selectedOffer } = useSelector(
    (state) => state.category
  );
  const offerId = selectedOffer?.id;
  const storeId = selectedStore?.Store?.id;
  const context = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const pinInput = useRef(null);
  const [offerPin, setPin] = useState("");
  const [isRadeem, setIsRadeem] = useState(true);

  const [
    onRadeemofferFun,
    {
      data: radeemOfferData,
      error: radeemOfferError,
      loading: radeemOfferLoading,
    },
  ] = useMutation(radeemOffer);
  console.log(radeemOfferError);
  const onRadeem = async () => {
    await onRadeemofferFun({
      context,
      fetchPolicy: "network-only",
      variables: {
        offerPin,
        storeId,
        offerId,
      },
      onCompleted: (data) => {
        dispacth(
          offerSlice.actions.setRadeemCode({
            code: data?.RedeemOffer?.redemptionCode,
          })
        );
      },
      refetchQueries: () => [
        {
          query: getOfferDetails,
          variables: {
            storeId,
            offerId,
          },
          fetchPolicy: "network-only",
          context: {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        },
      ],
      onError: (e) => {
        onModalDismiss();
        const error = `${e}`.split(":").reverse()[0];
        showMessage({
          type: "danger",
          message: error,
        });
      },
    });
  };

  const onRadeemHandler = () => {
    onRadeem();
    setIsRadeem(false);
  };

  return (
    <View style={[commonStyles.modalStyles.curveView, styles.modalStyle]}>
      {radeemOfferLoading ? (
        <Text style={{ color: C.colors.text.black }}>Loading</Text>
      ) : isRadeem ? (
        <>
          <Text style={styles.txtUp}>{C.strings.ENTER_CODE}</Text>
          <SmoothPinCodeInput
            value={offerPin}
            ref={pinInput}
            codeLength={4}
            editable={true}
            autoFocus={true}
            cellSpacing={40}
            containerStyle={styles.container}
            textStyle={styles.customTextStyle}
            cellStyle={styles.customInputStyle}
            onTextChange={(code) => setPin(code)}
            cellStyleFocused={styles.customCellStyleFocused}
          />
          <Text style={styles.txtSm}>{C.strings.ENTER_CODE_DESC}</Text>
          <SvgButton
            showBg
            height={45}
            width={250}
            btnStyle={styles.btn}
            onBtnHandler={onRadeemHandler}
            placeholder={C.strings.REDEEM_OFFER}
          />
        </>
      ) : (
        <>
          <Text style={styles.txtUp}>{C.strings.REDEEM_SHARE_DESC}</Text>
          <View style={styles.radeemView}>
            <Text style={styles.radeemTxt}>
              {radeemOfferData?.RedeemOffer?.redemptionCode}
            </Text>
          </View>
          <SvgButton
            showBg
            height={45}
            width={250}
            btnStyle={styles.btn}
            placeholder={C.strings.DONE}
            onBtnHandler={onModalDismiss}
          />
        </>
      )}
    </View>
  );
};

export default RadeemModal;

const styles = StyleSheet.create({
  modalStyle: {
    paddingTop: 30,
    alignItems: "center",
  },
  txtUp: {
    fontSize: 16,
    maxWidth: "90%",
    fontWeight: "600",
    textAlign: "center",
    color: C.colors.text.black,
    textTransform: "uppercase",
  },
  txtSm: {
    fontSize: 12,
    marginTop: 15,
    fontWeight: "600",
    color: C.colors.text.black,
  },
  btn: {
    marginTop: 25,
  },
  container: {
    marginTop: 20,
    marginBottom: 10,
    alignSelf: "center",
  },
  customTextStyle: {
    fontSize: 18,
    fontWeight: "bold",
    color: C.colors.text.black,
  },
  customInputStyle: {
    borderRadius: 5,
    backgroundColor: C.colors.primary.primary2,
  },
  customCellStyleFocused: {
    borderWidth: 0.5,
    borderColor: C.colors.border.drkGrey,
    backgroundColor: C.colors.primary.primary2,
  },
  radeemView: {
    padding: 10,
    marginTop: 15,
    paddingLeft: 25,
    paddingRight: 25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: C.measures.BORDER_RADIUS,
    backgroundColor: C.colors.primary.primary2,
  },
  radeemTxt: {
    fontSize: 20,
    letterSpacing: 2,
    fontWeight: "600",
    color: C.colors.text.black,
  },
});
