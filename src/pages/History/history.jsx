import {
  Text,
  View,
  FlatList,
  StatusBar,
  Pressable,
  SafeAreaView,
  BackHandler,
  Button,
  Dimensions,
} from "react-native";
import HistoryCard from "../../components/HistoryCard/HistoryCard";
import { useSelector } from "react-redux";
import { BackIcon } from "../../assets/images";
import { useState } from "react";
import { historyStyle as style } from "./history.style";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import HistoryHeader from "../../components/HistoryHeader.jsx/HistoryHeader";
import getSlotBookingByUser from "../../graphql/queries/getSlotBookingByUser";
import { useQuery } from "@apollo/client";
import LottieView from "lottie-react-native";
import { useEffect } from "react";

import Popup from "../../components/BookingCancelPopup/Popup";
import CustomHeader from "../../components/Headers/CustomHeader.component";
import { withHeader } from "../../hoc/withHeader";
import EmptyComponent from "../../components/NoDataContainer/EmptyComponent.component";
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
  const [bookings, setBookings] = useState();
  const [pastBookings, setPastBookings] = useState();
  const [showCancelStatus, setShowCancelStatus] = useState(false);
  const [popupProps, setPopupProps] = useState();
  const today = new Date();

  const context = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const { loading, refetch, networkStatus } = useQuery(getSlotBookingByUser, {
    context,
    fetchPolicy: "cache-and-network",
    variables: {
      userId: Number(user.id),
    },
    onCompleted: (data) => {
      console.log(data, "datatata");
      setBookings(
        data?.SlotBookingByUser?.filter((item) => {
          if (
            today.toISOString().slice(0, 10) !==
            item?.clinicSlots[0]?.date.slice(0, 10)
          ) {
            return (
              item.status === "booked" &&
              today.toISOString().slice(0, 10) <
                item?.clinicSlots[0]?.date.slice(0, 10)
            );
          } else if (
            today.toISOString().slice(0, 10) ===
            item?.clinicSlots[0]?.date.slice(0, 10)
          ) {
            return (
              item.status === "booked" &&
              today.toTimeString().slice(0, 8) < item?.clinicSlots[0]?.timeSlots
            );
          }
        })
      );
      setPastBookings(
        data?.SlotBookingByUser?.filter((item) => {
          if (
            today.toISOString().slice(0, 10) !==
            item?.clinicSlots[0]?.date.slice(0, 10)
          ) {
            return (
              today.toISOString().slice(0, 10) >
                item?.clinicSlots[0]?.date.slice(0, 10) ||
              item?.status === "cancelled"
            );
          } else if (
            today.toISOString().slice(0, 10) ===
            item?.clinicSlots[0]?.date.slice(0, 10)
          ) {
            return (
              today.toTimeString().slice(0, 8) >
                item?.clinicSlots[0]?.timeSlots || item.status === "cancelled"
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
    await sleep(600);
    setPopupProps({});
  };
  return (
    <>
      {loading && !bookings ? (
        <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
          <HistoryHeader props={0} />
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
        <FlatList
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
          stickyHeaderHiddenOnScroll
          ListEmptyComponent={() => (
            <EmptyComponent
              viewStyle={{ top: "20%" }}
              title={"Sorry"}
              desc={"No Active Bookings Found"}
            />
          )}
          ListHeaderComponent={() => (
            <HistoryHeader props={activeTab} onClick={(i) => setactiveTab(i)} />
          )}
          data={activeTab === 0 ? bookings : pastBookings}
          renderItem={({ item, index }) => (
            <>
              {
                <HistoryCard
                  key={index}
                  refetch={(data) => refetchAfterCancel(data)}
                  item={item}
                  activeTab={activeTab}
                  showError={(data) => showCancellerror(data)}
                />
              }
            </>
          )}
        />
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

export default History = withHeader({ BodyComponent, HeaderComponent });

/*  <View style={{ position: "absolute", top: 50 }}>
        <Pressable
          onPress={() => {
            setShowCancelStatus((prev) => !prev);
          }}
        >
          <Text>aaa</Text>
        </Pressable>
      </View> */
