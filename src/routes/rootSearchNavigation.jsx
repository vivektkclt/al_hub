import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LazyCategoryDetailsPage, LazySearchPage } from "./lazyPages";

const RootStack = createStackNavigator();

const RootSearchNavigation = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="SearchPage"
    >
      <RootStack.Screen name="SearchPage" component={LazySearchPage} />
      <RootStack.Screen
        name="CategoryDetailsPage"
        component={LazyCategoryDetailsPage}
      />
    </RootStack.Navigator>
  );
};

export { RootSearchNavigation };
