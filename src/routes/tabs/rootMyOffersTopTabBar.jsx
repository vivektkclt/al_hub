import React from "react";
import { C } from "../../assets";
import { View, Text, StyleSheet } from "react-native";
import OfferList from "../../components/OfferList/OfferList.component";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

const RootMyOffersTopTabBar = () => (
  <Tab.Navigator
    style={styles.wFull}
    initialRouteName="ActiveOffer"
    screenOptions={{
      lazy: true,
      swipeEnabled: true,
      tabBarIndicatorStyle: {
        height: 0,
        backgroundColor: C.colors.primary.color1,
      },
    }}
  >
    <Tab.Screen
      name="ActiveOffer"
      component={OfferList}
      initialParams={{ status: "active" }}
      options={{
        tabBarLabel: ({ color, focused }) => (
          <>
            <Text
              style={[styles.barTxt, focused ? styles.clrBlck : styles.clrGrey]}
            >
              {C.strings.ACTIVE_OFFER}
            </Text>
            {focused && <View style={styles.barIndicator} />}
          </>
        ),
      }}
    />
    <Tab.Screen
      name="RadeemedOffer"
      component={OfferList}
      initialParams={{ status: "radeemed" }}
      options={{
        tabBarLabel: ({ color, focused }) => (
          <>
            <Text
              style={[styles.barTxt, focused ? styles.clrBlck : styles.clrGrey]}
            >
              {C.strings.REDEEMED_OFFER}
            </Text>
            {focused && <View style={styles.barIndicator} />}
          </>
        ),
      }}
    />
  </Tab.Navigator>
);

export default RootMyOffersTopTabBar;

const styles = StyleSheet.create({
  wFull: {
    width: "100%",
  },
  barTxt: {
    fontSize: 16,
    fontWeight: "600",
  },
  clrBlck: {
    color: C.colors.primary.color2,
  },
  clrGrey: {
    color: C.colors.text.secondary,
  },
  barIndicator: {
    height: 7,
    marginTop: 3,
    borderRadius: 90,
    backgroundColor: C.colors.primary.color2,
  },
});
