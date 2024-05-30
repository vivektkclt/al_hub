import {
  FlatList,
  StatusBar,
  SafeAreaView,
  BackHandler,
  View,
  Dimensions,
  RefreshControl,
} from "react-native";

import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import HistoryHeader from "../../components/HistoryHeader.jsx/HistoryHeader";
import { useQuery } from "@apollo/client";
import LottieView from "lottie-react-native";
import { useEffect } from "react";
import Popup from "../../components/BookingCancelPopup/Popup";
import CustomHeader from "../../components/Headers/CustomHeader.component";
import { withHeader } from "../../hoc/withHeader";
import getTableBookingByUser from "../../graphql/queries/getTableBookingByUser";
import EmptyComponent from "../../components/NoDataContainer/EmptyComponent.component";
import TableBookingHistoryCard from "../../components/TableBookingHistoryCard/TableBookingHistoryCard";
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
const HeaderComponent = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const props = route?.params;

  useEffect(() => {
    const backAction = () => {
      props?.storeId
        ? navigation.navigate("StorePage", { id: Number(props?.storeId) })
        : navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  const navigate = () => {
    props?.storeId
      ? navigation.navigate("StorePage", { id: Number(props?.storeId) })
      : navigation.goBack();
  };

  return <CustomHeader isCustonNav={navigate} title={"back"} hideShadow />;
};
const BodyComponent = () => {
  const {
    user,
    token: { access_token: token },
  } = useSelector((state) => state.user);
  const [activeTab, setactiveTab] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [showCancelStatus, setShowCancelStatus] = useState(false);
  const [popupProps, setPopupProps] = useState();
  const [dateArray, setDateArray] = useState([]);
  const today = new Date();

  const context = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const { loading, refetch, networkStatus } = useQuery(getTableBookingByUser, {
    context,
    fetchPolicy: "cache-and-network",
    variables: {
      userId: Number(user.id),
    },
    onCompleted: (data) => {
      console.log(data?.getBookingsByUserId);
      setBookings(
        data?.getBookingsByUserId?.filter((item) => {
          console.log(
            today.toISOString(),
            item?.bookingDate,
            today.toISOString().slice(0, 10) < item?.bookingDate,
            "booking date"
          );
          if (today.toISOString().slice(0, 10) !== item?.bookingDate) {
            if (
              today.toISOString().slice(0, 10) < item?.bookingDate &&
              item?.status === "booked"
            ) {
              setDateArray((prev) => {
                return [...prev, item?.bookingDate];
              });
              console.log(item, "item added from top");
              return true;
            } else return false;
          } else if (today.toISOString().slice(0, 10) === item?.bookingDate) {
            if (
              today.toTimeString().slice(0, 8) < item?.fromTime &&
              item?.status === "booked"
            ) {
              setDateArray((prev) => {
                return [...prev, item?.bookingDate];
              });
              return true;
            }
            return false;
          }
        })
      );
      setPastBookings(
        data?.getBookingsByUserId?.filter((item) => {
          if (today.toISOString().slice(0, 10) !== item?.bookingDate) {
            return (
              today.toISOString().slice(0, 10) > item?.bookingDate ||
              item?.status === "cancelled"
            );
          } else if (today.toISOString().slice(0, 10) === item?.bookingDate) {
            return (
              today.toTimeString().slice(0, 10) > item?.bookingDate ||
              item?.status === "cancelled"
            );
          }
        })
      );
    },
  });

  const refetchAfterCancel = async (data) => {
    await refetch();
    setShowCancelStatus(true);
    setPopupProps(data);
  };
  const showCancellerror = (data) => {
    setShowCancelStatus(true);
    setPopupProps(data);
  };
  const hidePopup = async () => {
    setShowCancelStatus(false);
    setPopupProps({});
  };
  return (
    <>
      {loading && bookings.length === 0 ? (
        <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
          <HistoryHeader props={activeTab} />
          <LottieView
            source={require("../../assets/animation/loading.json")}
            style={{
              width: "100%",
              transform: [{ scaleX: 1.06 }, { scaleY: 1.06 }],
              top: 15,
              position: "absolute",
            }}
            autoPlay
            loop
          />
        </SafeAreaView>
      ) : (
        <>
          <HistoryHeader props={activeTab} onClick={(i) => setactiveTab(i)} />
          <View
            style={{
              flexDirection: "row",
              transform: [
                { translateX: -activeTab * Dimensions.get("screen").width },
              ],
              width: 2 * Dimensions.get("screen").width,
            }}
          >
            <FlatList
              contentContainerStyle={{
                paddingBottom: 160,
                width: Dimensions.get("screen").width,
              }}
              refreshControl={
                <RefreshControl refreshing={loading} onRefresh={refetch} />
              }
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => (
                <EmptyComponent
                  viewStyle={{ top: "100%" }}
                  title={"Sorry"}
                  desc={"No Active Bookings Found"}
                />
              )}
              data={bookings}
              renderItem={({ item, index }) => (
                <TableBookingHistoryCard
                  key={index}
                  activeTab={activeTab}
                  refetch={(data) => refetchAfterCancel(data)}
                  item={item}
                  showError={(data) => showCancellerror(data)}
                />
              )}
            />
            <FlatList
              contentContainerStyle={{
                paddingBottom: 160,
                width: Dimensions.get("screen").width,
              }}
              activeTab={activeTab}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => (
                <EmptyComponent
                  viewStyle={{ top: "100%" }}
                  title={"Sorry"}
                  desc={"nothing here"}
                />
              )}
              data={pastBookings}
              renderItem={({ item, index }) => (
                <TableBookingHistoryCard key={index} item={item} />
              )}
            />
          </View>
        </>
      )}

      {showCancelStatus && (
        <Popup
          showPopup={showCancelStatus}
          setShowPopup={hidePopup}
          props={popupProps}
        />
      )}
      <StatusBar />
    </>
  );
};

export default TableBookingHistory = withHeader({
  BodyComponent,
  HeaderComponent,
});

/*  <View style={{ position: "absolute", top: 50 }}>
        <Pressable
          onPress={() => {
            setShowCancelStatus((prev) => !prev);
          }}
        >
          <Text>aaa</Text>
        </Pressable>
      </View> */
