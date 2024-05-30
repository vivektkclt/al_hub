import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  LazyAccountRegisterPage,
  LazyLoginPage,
  LazyMobileRegisterPage,
  LazyOnBoardingPage,
} from "./lazyPages";

const RootStack = createStackNavigator();

const RootAuthNavigation = () => {
  return (
    <RootStack.Navigator
      initialRouteName="LoginPage"
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name="OnBoardingPage" component={LazyOnBoardingPage} />
      <RootStack.Screen name="LoginPage" component={LazyLoginPage} />
      <RootStack.Screen
        name="MobileRegisterPage"
        component={LazyMobileRegisterPage}
      />
      <RootStack.Screen
        name="AccountRegisterPage"
        component={LazyAccountRegisterPage}
      />
    </RootStack.Navigator>
  );
};

export { RootAuthNavigation };
