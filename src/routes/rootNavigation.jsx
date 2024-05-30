import React, { useState } from "react";
import { setTopLevelNavigator } from "./navigations";
import { RootAuthNavigation } from "./rootAuthNavigation";
import { RootHomeNavigation } from "./rootHomeNavigation";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  LazyStorePage,
  LazySplashPage,
  LazyRatingPage,
  LazyMyOffersPage,
  LazyEditProfilePage,
  LazyOfferDetailsPage,
  LazyStoreDetailsPage,
  LazyChooseLocationPage,
  LazyBookingDetailsPage,
  LazyBookingStatusPage,
  LazyTableBookingPage,
  LazyTableBookingConfirmPage,
  LazyHistoryTypeSelector,
  LazyTableBookingHistory,
  LazyTableBookingStatus,
} from "./lazyPages";
import Tour from "../pages/TourScreen/Tour.page";
import BookingSuccess from "../pages/Booking/BookingSuccess";
import BookingConfirm from "../pages/bookingConfirm/BookingConfirm";
import History from "../pages/History/history";
import Offlinepage from "../pages/OffilnePage/Offline.page";
const RootStack = createStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer ref={setTopLevelNavigator}>
      <RootStack.Navigator
        initialRouteName="InitialPage"
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
      >
        <RootStack.Screen name="InitialPage" component={LazySplashPage} />
        <RootStack.Screen
          name="AuthNavigation"
          component={RootAuthNavigation}
        />
        <RootStack.Screen
          name="HomeNavigation"
          component={RootHomeNavigation}
        />
        <RootStack.Screen name="HomeTour" component={Tour} />
        <RootStack.Screen
          name="EditProfilePage"
          component={LazyEditProfilePage}
        />
        <RootStack.Screen name="StorePage" component={LazyStorePage} />
        <RootStack.Screen name="MyOffersPage" component={LazyMyOffersPage} />
        <RootStack.Screen
          name="OfferDetailsPage"
          component={LazyOfferDetailsPage}
        />
        <RootStack.Screen name="BookSuccess" component={BookingSuccess} />
        <RootStack.Screen name="BookingConfirm" component={BookingConfirm} />
        <RootStack.Screen
          name="BookingDetails"
          component={LazyBookingDetailsPage}
        />
        <RootStack.Screen
          name="BookingStatus"
          component={LazyBookingStatusPage}
        />
        <RootStack.Screen
          name="StoreDetailsPage"
          component={LazyStoreDetailsPage}
        />
        <RootStack.Screen name="History" component={History} />
        <RootStack.Screen name="RatingPage" component={LazyRatingPage} />
        <RootStack.Screen
          name="HistorySelector"
          component={LazyHistoryTypeSelector}
        />
        <RootStack.Screen
          name="TableBookingHistory"
          component={LazyTableBookingHistory}
        />
        <RootStack.Screen
          name="TableBookingPage"
          component={LazyTableBookingPage}
        />
        <RootStack.Screen
          name="TableBookingConfirmPage"
          component={LazyTableBookingConfirmPage}
        />
        <RootStack.Screen
          name="TableBookingStatus"
          component={LazyTableBookingStatus}
        />
        <RootStack.Screen
          name="ChooseLocationPage"
          component={LazyChooseLocationPage}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export { RootNavigation };
