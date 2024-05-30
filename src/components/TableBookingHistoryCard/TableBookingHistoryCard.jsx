import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  Modal,
} from "react-native";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import getStoreById from "../../graphql/queries/getStoreById";
import { useEffect } from "react";
import { historyCardStyle as styles } from "./HistoryCard.style";
import pngImages from "../../assets/images/png";
import updateABooking from "../../graphql/mutations/cancellTableBooking";
import { getStoreTableSlot } from "../../graphql/queries/getStoreTableSlotDetails";
import TableBookingStatus from "../TableBookingStatus/TableBookingStatus";
import useAlert from "../CustomAlert/CustomAlert";
const TableBookingHistoryCard = ({ item, refetch, showError, activeTab }) => {
  const baseurl = "https://alhub-app-images.s3.ap-south-1.amazonaws.com/";
  const [confirmCancell, setConfirmCancell] = useState(false);
  const { showAlert, hideAlert, AlertModal } = useAlert();
  const [showDetails, setShowDetails] = useState(false);
  const [props, setProps] = useState({});
  const date = new Date(item?.bookingDate);
  const final = new Intl.DateTimeFormat("en-us", {
    day: "2-digit",
    month: "short",
  });
  const d = final.format(date);

  const {
    token: { access_token: token },
  } = useSelector((state) => state.user);

  const context = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const convertFromRailwayTime = () => {
    let ft = item?.fromTime?.split(":");
    let tt = item?.toTime?.split(":");

    const fromTime = `${
      Number(ft[0]) > 0 && Number(ft[0]) <= 12
        ? ft[0]
        : String(Math.abs(Number(ft[0]) - 12))
    }:${ft[1]} ${Number(ft[0]) > 0 && Number(ft[0]) <= 12 ? "AM" : "PM"}`;
    const toTime = `${
      Number(tt[0]) > 0 && Number(tt[0]) <= 12
        ? tt[0]
        : String(Math.abs(Number(tt[0]) - 12))
    }:${tt[1]} ${Number(tt[0]) > 0 && Number(tt[0]) <= 12 ? "AM" : "PM"}`;
    return { fromTime, toTime };
  };

  const {
    data: slotData,
    error: slotFetchErr,
    loading: fetchingSlotDetails,
  } = useQuery(getStoreTableSlot, {
    context,
    fetchPolicy: "network-only",
    variables: {
      storeTableSlotId: Number(item?.storeTableSlotId),
    },
    onCompleted: (response) => {
      GetStoreById({
        variables: {
          storeId: Number(response?.StoreTableSlot?.storeTable?.storeId),
        },
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  useEffect(() => {
    if (activeTab === 1 || item?.status === "cancelled") return;
    setProps({
      props: {
        data: {
          id: item?.id,
          bookingDate: item?.bookingDate,
          status: item?.status,
          numberOfGuests: item?.numberOfGuests,
          tableNumber: item?.storeTable?.tableNumber,
          fromTime: item?.fromTime,
          toTime: item?.toTime,
          storeName: item?.toTime,
        },
      },
    });
  }, [activeTab, item]);
  const [GetStoreById, { data, loading, error }] = useLazyQuery(getStoreById, {
    context,
    fetchPolicy: "network-only",
    variables: {
      storeId: Number(item?.storeTable?.storeId),
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const [UpdateTableBooking] = useMutation(updateABooking, {
    context,
    fetchPolicy: "network-only",
    variables: {
      updateTableBooking: {
        id: item?.id,
        status: `${"cancelled"}`,
      },
    },
    onCompleted: (response) => {
      console.log(response, "ssss");
      refetch({ message: "booking cancelled successfully", status: "success" });
    },
    onError: (err) => {
      console.log(err);
      showError({ message: "something went wrong", status: "error" });
    },
  });

  const fnShowDetails = () => {
    setShowDetails(true);
  };
  const fnHideDetails = () => {
    setShowDetails(false);
  };
  const fnShowAlert = () => {
    showAlert({
      title: "Confirm",
      msg: "Are you sure you want to cancel creating your account?",
      confirmButtonText: "Confirm",
      onConfirm: UpdateTableBooking,
      onCancel: hideAlert,
    });
  };
  return (
    <>
      {AlertModal}
      <Modal
        animationType="fade"
        collapsable
        visible={showDetails}
        onRequestClose={fnHideDetails}
        children={
          <TableBookingStatus close={fnHideDetails} props={props?.props} />
        }
      />
      <Pressable
        // onPress={() => setOpenModal(true)}
        style={[styles.cardViewDescription]}
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
          <View style={styles.DescriptionRow}>
            <Image style={styles.ImageIcon} source={pngImages.shopIcon} />
            <Text style={[styles.norTexSty, styles.comFonSty]}>
              {data?.Store?.name}{" "}
            </Text>
          </View>
          <View style={styles.DescriptionRow}>
            <Image
              style={styles.ImageIcon}
              source={require("../../assets/images/calendarIcon.png")}
            />
            <Text style={[styles.norTexSty, styles.comFonSty]}>{d} </Text>
          </View>
          <View style={styles.DescriptionRow}>
            <Image
              style={styles.ImageIcon}
              source={require("../../assets/images/clock.png")}
            />
            <Text style={[styles.norTexSty, styles.comFonSty]}>
              {convertFromRailwayTime().fromTime}
              {" to "}
              {convertFromRailwayTime().toTime}
            </Text>
          </View>
          <View style={styles.DescriptionRow}>
            <Image style={styles.ImageIcon} source={pngImages.accountIcon} />
            <Text style={[styles.norTexSty, styles.comFonSty]}>
              {item?.numberOfGuests}{" "}
            </Text>
          </View>
          <View style={styles.buttondiv}>
            {activeTab === 0 ? (
              <View style={styles.bottomview}>
                <TouchableOpacity
                  onPress={fnShowAlert}
                  style={styles.innerButtonRight}
                >
                  <Text style={styles.innerButtonRight.text}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={fnShowDetails}
                  style={styles.innerButton}
                >
                  <Text style={styles.innerButtonRight.text}>Details</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.bottomview}>
                <TouchableOpacity
                  onPress={() => setConfirmCancell(true)}
                  style={styles.innerButtonRight}
                  disabled={item?.status === "cancelled"}
                >
                  <Text style={styles.innerButtonRight.text}>Expired</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Pressable>
    </>
  );
};

export default TableBookingHistoryCard;
