import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LazyCategoriesPage, LazyCategoryDetailsPage } from "./lazyPages";

const RootStack = createStackNavigator();

const RootCategoryNavigation = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="CategoriesPage"
    >
      <RootStack.Screen name="CategoriesPage" component={LazyCategoriesPage} />
      <RootStack.Screen
        name="CategoryDetailsPage"
        component={LazyCategoryDetailsPage}
      />
    </RootStack.Navigator>
  );
};

export { RootCategoryNavigation };
