import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  Modal,
} from "react-native";
import { historyCardStyle as styles } from "./HistoryCard.style";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useMutation, useQuery } from "@apollo/client";
import getStoreById from "../../graphql/queries/getStoreById";
import updateABooking from "../../graphql/mutations/cancellSlots";
import { useEffect } from "react";
import BookingStatus from "../BookingStatus/BookingStatus";
import useAlert from "../CustomAlert/CustomAlert";
import { C } from "../../assets";

const HistoryCard = ({ activeTab, item, refetch, showError }) => {
  const baseurl = "https://alhub-app-images.s3.ap-south-1.amazonaws.com/";
  const [showDetails, setShowDetails] = useState(false);
  const [props, setProps] = useState({});
  const { showAlert, hideAlert, AlertModal } = useAlert();
  console.log(item?.clinicSlots[0]?.date, "item");
  const date = item?.clinicSlots[0]?.date
    ? new Date(item?.clinicSlots[0]?.date)
    : null;
  const final = new Intl.DateTimeFormat("en-us", {
    day: "2-digit",
    month: "short",
  });
  const d = date ? final.format(date) : "date unavailable";

  const {
    token: { access_token: token },
  } = useSelector((state) => state.user);

  const context = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const {
    data,
    loading: loadingStores,
    error,
  } = useQuery(getStoreById, {
    context,
    fetchPolicy: "cache-and-network",
    variables: {
      storeId: Number(item?.clinicSlots[0]?.storeId),
    },
  });

  const [UpdateABooking, { loading }] = useMutation(updateABooking, {
    context,
    fetchPolicy: "network-only",
    variables: {
      updateSlotBooking: {
        id: Number(item?.id),
        status: "cancelled",
      },
    },
    onCompleted: (response) => {
      if (response?.UpdateABooking?.status !== "cancelled") {
        showError({ message: "something went wrong", status: "error" });
        return;
      }
      refetch({ message: "booking cancelled successfully", status: "success" });
    },
    onError: () => {
      showError({ message: "something went wrong", status: "error" });
    },
  });

  const fnShowAlert = () => {
    showAlert({
      title: "Confirm",
      msg: "Are you sure you want to cancel creating your account?",
      confirmButtonText: "Confirm",
      onConfirm: UpdateABooking,
      onCancel: hideAlert,
    });
  };

  useEffect(() => {
    if (activeTab === 1 || item?.status === "cancelled") return;
    setProps({
      props: {
        data: {
          id: item?.id,
          status: item?.status,
          bookingFor: item?.bookingFor,
          phoneNumber: item?.phoneNumber,
          reasonForVisit: item?.reasonForVisit,
          notes: item?.notes,
          clinicSlots: item?.clinicSlots,
          fullName: item?.fullName,
        },
      },
    });
  }, [activeTab, item]);
  return (
    <>
      {AlertModal}
      <Modal
        animationType="fade"
        collapsable
        visible={showDetails}
        onRequestClose={() => setShowDetails(false)}
        children={
          <BookingStatus
            close={() => setShowDetails(false)}
            props={props.props}
          />
        }
      />
      <Pressable
        // onPress={() => setOpenModal(true)}
        style={styles.cardViewDescription}
      >
        <Image
          source={
            data?.Store?.StoreImages[0]?.key
              ? {
                  uri: baseurl + `${data?.Store?.StoreImages[0]?.key}`,
                }
              : require("../../assets/images/defaultStoreBanner.png")
          }
          style={styles.Image}
        />
        <View style={styles.Description}>
          <Text numberOfLines={1} style={[styles.StoreName]}>
            {data?.Store?.name || C.strings.NOT_AVAILABLE}{" "}
          </Text>
          <View style={styles.DescriptionRow}>
            <Image
              style={styles.ImageIcon}
              source={require("../../assets/images/clock.png")}
            />
            <Text style={[styles.norTexSty, styles.comFonSty, { width: 110 }]}>
              {d} - {item?.clinicSlots[0]?.timeSlots.slice(0, 5) || ""}{" "}
            </Text>
          </View>
          <View style={styles.buttondiv}>
            {activeTab == 0 ? (
              <View style={styles.bottomview}>
                {/* <TouchableOpacity style={styles.innerButton}>
                  <Text style={styles.innerButtonTxt}>Reschedule</Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                  onPress={fnShowAlert}
                  style={styles.innerButtonRight}
                >
                  <Text style={styles.innerButtonRight.text}>
                    {C.strings.CANCEL}
                  </Text>
                </TouchableOpacity>
                <Pressable
                  style={[styles.DetailsBtn]}
                  onPress={() => setShowDetails(true)}
                >
                  <Text style={[styles.detailsBtnText]}>
                    {C.strings.DETAILS}
                  </Text>
                </Pressable>
              </View>
            ) : (
              <View style={styles.innerButtonRight}>
                <Text style={[styles.innerButtonRight.text]}>
                  {item.status + " "}
                </Text>
              </View>
            )}
          </View>
        </View>
      </Pressable>
    </>
  );
};

export default HistoryCard;
