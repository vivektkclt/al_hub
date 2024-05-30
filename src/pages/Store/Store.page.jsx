import moment from "moment";
import { C } from "../../assets";
import { commonStyles } from "../../styles";
import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { navigator } from "../../routes/navigations";
import { storeStyles as styles } from "./Store.style";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-native-reanimated-carousel";
import getStoreOffers from "../../graphql/queries/getStoreOffers";
import { categorySlice } from "../../redux/slices/category.slice";
import { handleMapLinking, openUrl } from "../../utils/functions";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import getStoreDetails from "../../graphql/queries/getStoreDetails";
import GoogleReviewsByStore from "../../graphql/queries/getGoogleReviewByStore";
import SvgButton from "../../components/Buttons/SvgButton.component";
import getStoreServices from "../../graphql/queries/getStoreServices";
import TabButton from "../../components/TabButton/TabButton.component";
import HomeOfferCard from "../../components/OfferCard/HomeOfferCard.component";
import FullPageLoader from "../../components/Loaders/FullPageLoader.component";
import ServiceHeaderCard from "../../components/ServiceCard/ServiceHeaderCard.component";
import {
  Text,
  View,
  Platform,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  FbIcon,
  WebIcon,
  PhoneIcon,
  InstaIcon,
  LocationIcon,
  WhatsappIcon,
} from "../../assets/images";
import strings from "../../assets/values/strings";
import checkAndOpenCabApp from "../../utils/helpers/openCabApps";
import isCabRequired from "../../utils/helpers/isCabRequiredStore";
import pngImages from "../../assets/images/png";
import reArrangeDays from "../../utils/helpers/rearrangeWorkingDays";
import Collapsible from "react-native-collapsible";
import isStoreOpen from "../../utils/helpers/isStoreOpen";
import isAlwaysClosed from "../../utils/data/isAlwaysClosed";
import StoreBookingcomponent from "../../components/StoreBookingButton/Store.Booking.component";
import IconCard from "../../components/StoreIconCard/IconCard.component";
import ImageCarouselComponent from "../../components/StoreImageCarousel/ImageCarousel.Component";
import StoreHeaderComponent from "../../components/StoreHeader/StoreHeader.Component";
import StoreInfoButtonComponent from "../../components/StoreInfoButton/StoreInfoButton.Component";
import ServicePdfHeaderCard from "../../components/ServiceCard/ServicePdfHeaderCard";
import { useNetInfo } from "@react-native-community/netinfo";
import Offlinepage from "../OffilnePage/Offline.page";

const HEADER_IMAGE_WIDTH = C.measures.SCREEN_WIDTH;
const StorePage = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();

  const currentDay = moment().format("dddd")?.toLowerCase();
  var currentDate = new Date();
  const nextDay = moment(currentDate.getDate() + 1)
    .format("dddd")
    ?.toLowerCase();
  const {
    token: { access_token: token },
  } = useSelector((state) => state.user);

  const [serviceData, setServiceData] = useState([]);
  const [rating, setRating] = useState(null);
  const [pdfFile, setPdf] = useState([]);
  const [isCollapsed, setCollapsed] = useState(false);
  const { isConnected } = useNetInfo();
  const id = route?.params?.id;

  const context = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const { data, loading } = useQuery(getStoreDetails, {
    context,
    fetchPolicy: "cache-and-network",
    variables: {
      id,
    },
  });
  useQuery(GoogleReviewsByStore, {
    context,
    fetchPolicy: "cache-and-network",
    variables: {
      storeId: Number(id),
    },
    onCompleted: (data) => {
      if (data && data?.GoogleReviewsByStore) {
        setRating(data?.GoogleReviewsByStore?.rating || null);
      }
    },
    onError: (error) => {
      console.log("RATING_API_ERROR=", error);
    },
  });

  const { data: offerData, loading: offerLoading } = useQuery(getStoreOffers, {
    context,
    fetchPolicy: "cache-and-network",
    variables: {
      storeId: id,
    },
  });
  const { loading: servicesLoading } = useQuery(getStoreServices, {
    context,
    fetchPolicy: "cache-and-network",
    variables: {
      storeId: id,
    },
    onCompleted: (data) => {
      setServiceData((prev) =>
        data?.ServiceByStore?.map((service) => {
          const { serviceType, services, ...rest } = service;
          services.map((service) => {
            const { serviceFiles, ...rest } = service;
            service?.serviceFiles.length > 0 &&
              setPdf((prev) => {
                return [...prev, { pdf: serviceFiles, info: rest }];
              });
          });
          return {
            ...prev,
            ...{
              data: services.map((item) => {
                return { ...item, ...rest };
              }),
              title: serviceType,
            },
          };
        })
      );
    },
  });

  useEffect(() => {
    if (data) {
      dispatch(categorySlice.actions.chooseStore({ item: data }));
    }
  }, [data]);

  const latitude = data?.Store?.geoLocation?.latitude;
  const longitude = data?.Store?.geoLocation?.longitude;

  const fbUrl = data?.Store?.socialLinks?.find((link) => link?.name === "fb");
  const webUrl = data?.Store?.socialLinks?.find((link) => link?.name === "web");
  const instagramUrl = data?.Store?.socialLinks?.find(
    (link) => link?.name === "instagram"
  );

  const onFbHandler = () => openUrl(fbUrl?.link);
  const onWebHandler = () => openUrl(webUrl?.link);
  const onInstagramHandler = () => openUrl(instagramUrl?.link);
  const onShareFeedBackHandler = () => navigator.navigate("RatingPage");
  // const onCabHandler = () => {
  //   if (latitude || longitude) {
  //     const uberDeepLinkUrl = `uber://?action=setPickup&pickup=my_location&dropoff[latitude]=${latitude}&dropoff[longitude]=${longitude}`;
  //     const uberWebUrl = `https://m.uber.com/ul/?action=dropoff[latitude]=${latitude}&dropoff[longitude]=${longitude}`;
  //     Linking.canOpenURL(uberDeepLinkUrl).then(supported => {
  //       if (supported) {
  //         Linking.openURL(uberDeepLinkUrl);
  //       } else {
  //         Linking.openURL(uberWebUrl);
  //       }
  //     }).catch((err) => {});
  //   }
  // };
  const onMailHandler = () => {
    const url = `mailto:${data?.Store?.contacts?.mail}`;
    openUrl(url);
  };
  const onCallHandler = () => {
    let url = "";
    const number = data?.Store?.contacts?.mobile;
    if (Platform.OS === "android") {
      url = `tel:${number}`;
    } else {
      url = `telprompt:${number}`;
    }
    openUrl(url);
  };
  const openWhatsApp = () => {
    const number = data?.Store?.whatsappNumber;
    const url = `whatsapp://send?text=""&phone=${number}`;
    openUrl(url);
  };

  const onTabHandler = (tab) => {
    dispatch(categorySlice.actions.setStoreTab({ tab }));
    navigation.navigate("StoreDetailsPage", { option: data?.Store?.option });
  };
  const onPDFTabHandler = (tab, index) => {
    dispatch(categorySlice.actions.setStoreTab({ tab }));
    navigation.navigate("StoreDetailsPage", {
      option: data?.Store?.option,
      i: Number(index),
      image: data?.Store?.StoreImages[0]?.location,
    });
  };

  const onMapHandler = () => {
    if (latitude || longitude) {
      handleMapLinking(longitude, latitude);
    }
  };
  console.log(serviceData, "store data details");
  const workingHours = data?.Store?.workingHours
    ? reArrangeDays(data?.Store?.workingHours)
    : [];
  const openingTime = data?.Store?.workingHours
    ? data?.Store?.workingHours[currentDay]?.openingTime ?? undefined
    : undefined;
  const nxtOpeningTime = data?.Store?.workingHours
    ? data?.Store?.workingHours[nextDay]?.openingTime ?? undefined
    : undefined;
  const closingTime = data?.Store?.workingHours
    ? data?.Store?.workingHours[currentDay]?.closingTime ?? undefined
    : undefined;
  const isStoreOpened = isStoreOpen(openingTime, closingTime);
  const findOpeningTime = () => {
    if (new Date(openingTime) > new Date()) {
      return openingTime;
    } else {
      console.log("TESTTTTTTTTT", nxtOpeningTime);
      return nxtOpeningTime;
    }
  };

  const renderItem = () => <></>;

  const renderOfferCards = ({ item, index }) => {
    const onCardHandler = () => {
      dispatch(categorySlice.actions.setSelectedOffer({ offer: item }));
      navigator.navigate("OfferDetailsPage");
    };
    return (
      <HomeOfferCard
        priceType={item?.priceType || "percentage"}
        offerValue={item?.offerValue}
        title={item?.shortTitle}
        onCardHandler={onCardHandler}
        storeId={Number(id)}
        image={item?.OfferImage?.location}
      />
    );
  };

  const renderServiceCard = ({ item, index }) => (
    <ServiceHeaderCard
      data={item}
      onHandler={() => onTabHandler(C.strings.SERVICES)}
    />
  );
  const renderServicePDFHeader = ({ item, index }) => (
    <ServicePdfHeaderCard
      data={item}
      onHandler={() => onPDFTabHandler(C.strings.SERVICES, index)}
      image={data?.Store?.StoreImages[0]?.location}
    />
  );
  const renderHeader = () => (
    <>
      {/* {data?.Store?.averageReviewRating ? (
        <Rating
          max={5}
          iconWidth={30}
          iconHeight={30}
          editable={false}
          rating={data?.Store?.averageReviewRating}
          iconUnselected={require(`../../assets/images/png/rate-star.png`)}
          iconSelected={require(`../../assets/images/png/star-selected.png`)}
        />
      ) : null} */}
      <View style={{ flexDirection: "row" }}>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={[
            styles.titleTxt,
            // data?.Store?.averageReviewRating ? styles.mT10 : null,
          ]}
        >
          {data?.Store?.name}
        </Text>
        {rating ? (
          <View
            style={{
              flex: 1,
              height: C.measures.SCREEN_HEIGHT / 15,
            }}
          >
            <View style={styles.ratingContainer}>
              <Text
                style={{ fontWeight: "bold", fontSize: 10, color: "white" }}
              >
                {rating || 0}
              </Text>
              <Image style={styles.starIcon} source={pngImages.starSelected} />
            </View>
            <View style={styles.gIconContainer}>
              <Image style={styles.gIcon} source={pngImages.googleIcon} />
            </View>
          </View>
        ) : null}
      </View>
      <Text numberOfLines={4} ellipsizeMode="tail" style={styles.placeTxt}>
        {data?.Store?.location}
      </Text>
      <Text style={styles.descTxt}>{data?.Store?.description}</Text>
      {workingHours.length > 0 && !isAlwaysClosed(workingHours) ? (
        <>
          {isCollapsed ? null : (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
              onPress={() => setCollapsed(true)}
            >
              <>
                <View style={styles.storeTimeCard}>
                  {openingTime === undefined ||
                  closingTime === undefined ||
                  ((openingTime === "null" || openingTime === null) &&
                    (closingTime === "null" || closingTime === null)) ||
                  isStoreOpened == "off_day" ? (
                    <Text
                      style={[
                        styles.timing,
                        {
                          color: "red",
                          fontWeight: "400",
                        },
                      ]}
                    >
                      {strings.off_day}
                    </Text>
                  ) : (
                    <Text style={[styles.timing]}>
                      Hours :{" "}
                      <Text
                        style={{
                          color:
                            isStoreOpened == "Open" || isStoreOpened == "24hr"
                              ? "green"
                              : "red",
                          fontWeight: "400",
                        }}
                      >
                        {isStoreOpened == "24hr"
                          ? strings.open24Hrs
                          : isStoreOpened}
                      </Text>
                      {isStoreOpened !== "24hr" ? (
                        <Text style={{ fontWeight: "400", color: "black" }}>
                          {isStoreOpened == "Open"
                            ? `.Closes ${moment(closingTime, "HH:mm").format(
                                "h:mm A"
                              )}`
                            : `.Opens ${moment(
                                findOpeningTime(),
                                "HH:mm"
                              ).format("h:mm A")}`}
                        </Text>
                      ) : null}
                    </Text>
                  )}
                </View>
              </>
              <Image
                style={{ width: 22, height: 22, marginLeft: 25 }}
                source={pngImages.filledArrowDown}
              />
            </TouchableOpacity>
          )}
        </>
      ) : null}
      <Collapsible collapsed={!isCollapsed}>
        <TouchableOpacity
          style={{ marginTop: 15 }}
          activeOpacity={0.8}
          onPress={() => {
            setCollapsed(false);
          }}
        >
          {workingHours.map((item, index) => {
            let isOpen = isStoreOpen(
              item?.hours?.openingTime,
              item?.hours?.closingTime
            );
            return (
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 10,
                }}
              >
                <View style={{ flex: 0.8 }}>
                  <Text style={styles.timing}>
                    {index === 0 ? "Hours : " : " "}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 3,
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={[styles.timing, { flex: 1.2, fontSize: 15 }]}
                  >{`${item?.day}`}</Text>
                  <Text
                    style={[
                      styles.timing,
                      {
                        flex: 1.8,
                        fontSize: 15,
                        color:
                          isOpen === "24hr"
                            ? "green"
                            : isOpen === "off_day"
                            ? "red"
                            : "black",
                      },
                    ]}
                  >
                    {isOpen !== "off_day" ? (
                      <Text>
                        {isOpen !== "24hr"
                          ? `${moment(item?.hours?.openingTime, "HH:mm").format(
                              "hh:mm A"
                            )} - ${moment(
                              item?.hours?.closingTime,
                              "HH:mm"
                            ).format("hh:mm A")}`
                          : strings.open24Hrs}
                      </Text>
                    ) : (
                      strings.off_day
                    )}
                  </Text>
                </View>
                <View style={{ flex: 0.3 }}>
                  {index == 0 ? (
                    <Image
                      style={{
                        width: 22,
                        height: 22,
                        transform: [{ rotate: "-90deg" }],
                      }}
                      source={pngImages.filledArrowDown}
                    />
                  ) : null}
                </View>
              </View>
            );
          })}
        </TouchableOpacity>
      </Collapsible>
      <View style={[commonStyles.align.rowBetween, styles.mb]}>
        {data?.Store?.contacts?.mobile ? (
          <IconCard
            height={55}
            icon={<PhoneIcon />}
            onIconHandler={onCallHandler}
          />
        ) : null}
        {data?.Store?.whatsappNumber ? (
          <IconCard
            height={55}
            icon={<WhatsappIcon />}
            onIconHandler={openWhatsApp}
          />
        ) : null}
        {data?.Store?.location ? (
          <IconCard
            height={55}
            icon={<LocationIcon />}
            onIconHandler={onMapHandler}
          />
        ) : null}
      </View>
      <View style={[commonStyles.align.rowBetween, styles.mb]}>
        {fbUrl?.link ? (
          <IconCard height={45} icon={<FbIcon />} onIconHandler={onFbHandler} />
        ) : null}
        {instagramUrl?.link ? (
          <IconCard
            height={45}
            icon={<InstaIcon />}
            onIconHandler={onInstagramHandler}
          />
        ) : null}
        {webUrl?.link ? (
          <IconCard
            height={45}
            icon={<WebIcon />}
            onIconHandler={onWebHandler}
          />
        ) : null}
      </View>

      {data && (
        <StoreBookingcomponent
          data={{
            data: data?.Store?.categories,
            name: data?.Store?.name,
            hours: data?.Store?.workingHours,
            id: data?.Store?.id,
          }}
        />
      )}
      {/*  <IconCard
        height={45}
        text={"Book a table"}
        onIconHandler={() => {
          console.log(data?.Store, "mark");
          navigation.navigate("TableBookingPage", {
            name: data?.Store?.name,
            hours: data?.Store?.workingHours,
            id: data?.Store?.id,
            images: images,
          });
        }}
      /> */}
      {offerData?.OffersByStore?.length > 0 ? (
        <>
          <Text
            style={[
              styles.titleTxt,
              styles.txtMed,
              styles.mb,
              { marginBottom: 0, marginTop: 10 },
            ]}
          >
            Deals for you
          </Text>
          <Carousel
            // loop
            // autoPlay
            height={190}
            width={HEADER_IMAGE_WIDTH}
            renderItem={renderOfferCards}
            scrollAnimationDuration={1000}
            data={offerData?.OffersByStore}
          />
        </>
      ) : null}
      {data?.Store?.features?.length > 0 ? (
        <>
          <Text style={(styles.titleTxt, styles.txtMed)}>Features</Text>
          <View style={commonStyles.align.fWrap}>
            {data?.Store?.features?.map((feature) => (
              <View key={feature} style={styles.featureCard}>
                <View style={styles.circle} />
                <Text style={styles.txtDark}>{feature}</Text>
              </View>
            ))}
          </View>
        </>
      ) : null}
      {latitude || longitude ? (
        <>
          <View style={styles.titleContainer}>
            <StoreInfoButtonComponent />
            {isCabRequired(data?.Store?.categories) ? (
              <TouchableOpacity
                onPress={() =>
                  checkAndOpenCabApp({
                    longitude: longitude,
                    latitude: latitude,
                  })
                }
                style={styles.bookCabBtn}
              >
                <Text style={styles.cabBtnTxt}>{strings.BOOK_CAB}</Text>
              </TouchableOpacity>
            ) : null}
          </View>
          <TouchableOpacity onPress={onMapHandler}>
            <MapView
              style={styles.map}
              scrollEnabled={false}
              onPress={onMapHandler}
              provider={MapView.PROVIDER_GOOGLE}
              initialRegion={{
                longitude: longitude,
                latitude: latitude,
                latitudeDelta: 0.0422,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{
                  longitude: longitude,
                  latitude: latitude,
                }}
              />
            </MapView>
            {/* <IconCard
              height={40}
              onIconHandler={onCabHandler}
              iconStyle={styles.bookNowBtn}
              icon={<Text style={styles.whiteTxt}>Book a Cab</Text>}
            /> */}
          </TouchableOpacity>
        </>
      ) : null}
      {serviceData?.length > 0 ? (
        <View style={styles.mt20}>
          <Text style={[styles.titleTxt, styles.txtMed, styles.mb]}>
            {data?.Store?.option ?? C.strings.SERVICES}
          </Text>
          {pdfFile.length > 0 ? (
            <FlatList
              horizontal
              data={pdfFile}
              renderItem={renderServicePDFHeader}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, idx) => String(idx)}
            />
          ) : (
            <FlatList
              horizontal
              data={serviceData}
              renderItem={renderServiceCard}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, idx) => String(idx)}
            />
          )}

          <TouchableOpacity
            onPress={() => onTabHandler(C.strings.SERVICES)}
            style={styles.moreBtn}
          >
            <Text style={styles.txtMed}>View More</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <SvgButton
        height={55}
        btnStyle={styles.mt20}
        onBtnHandler={onShareFeedBackHandler}
        placeholder={C.strings.SHARE_FEEDBACK}
      />
    </>
  );

  return (
    <>
      {!isConnected && !data && !offerData && serviceData.length === 0 ? (
        <>
          <Offlinepage />
          <StoreHeaderComponent
            id={Number(id)}
            data={data?.Store?.isFavorite}
            name={data?.Store?.name}
          />
        </>
      ) : (
        <View style={[commonStyles.align.flex1, styles.bg]}>
          {loading || offerLoading || servicesLoading ? (
            <FullPageLoader />
          ) : (
            <>
              <ImageCarouselComponent data={data?.Store?.StoreImages} />
              <StoreHeaderComponent
                id={Number(id)}
                data={data?.Store?.isFavorite}
                name={data?.Store?.name}
              />
              <View style={styles.overViewCard}>
                <TabButton
                  hideBtm
                  isActive
                  isDisabled
                  placeHolder={C.strings.OVER_VIEW}
                />
                <TabButton
                  placeHolder={C.strings.OFFERS}
                  onTabHandler={() => onTabHandler(C.strings.OFFERS)}
                />
                <TabButton
                  placeHolder={data?.Store?.option ?? C.strings.SERVICES}
                  onTabHandler={() => onTabHandler(C.strings.SERVICES)}
                />
                <TabButton
                  placeHolder={C.strings.REVIEWS}
                  onTabHandler={() => onTabHandler(C.strings.REVIEWS)}
                />
              </View>
              <FlatList
                data={[]}
                renderItem={renderItem}
                ListHeaderComponent={renderHeader}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, idx) => String(idx)}
                contentContainerStyle={styles.scrollStyle}
              />
            </>
          )}
        </View>
      )}
    </>
  );
};

export default StorePage;
