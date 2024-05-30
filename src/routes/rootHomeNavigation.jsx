import React from "react";
import { C } from "../assets";
import { navigator } from "./navigations";
import { RootCategoryNavigation } from "./rootCategoryNavigation";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import {
  LazyHomePage,
  LazySearchPage,
  LazyProfilePage,
  LazyFavouritesPage,
  LazyCategoryDetailsPage,
} from "./lazyPages";
import {
  LoveIcon,
  HomeIcon,
  ProfileIcon,
  CategoryIcon,
  SearchHomeIcon,
  LoveFocusedIcon,
  HomeFocusedIcon,
  ProfileFocusedIcon,
  CategoryFocusedIcon,
  SearchHomeFocusedIcon,
} from "../assets/images";
import { RootSearchNavigation } from "./rootSearchNavigation";

const Tab = AnimatedTabBarNavigator();

const tabBarAppearance = {
  shadow: true,
  floating: true,
  dotSize: "small",
  dotCornerRadius: 100,
  whenActiveShow: "icon-only",
  tabButtonLayout: "horizontal",
  whenInactiveShow: "icon-only",
};

const tabBarOptions = {
  keyboardHidesTabBar: true,
  activeTintColor: C.colors.primary.color1,
  inactiveTintColor: C.colors.primary.color1,
  activeBackgroundColor: C.colors.primary.color,
};

const RootHomeNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomePage"
      appearance={tabBarAppearance}
      tabBarOptions={tabBarOptions}
    >
      <Tab.Screen
        name="HomePage"
        component={LazyHomePage}
        options={{
          tabBarIcon: ({ size, color, focused }) => (
            <>{focused ? <HomeFocusedIcon /> : <HomeIcon />}</>
          ),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={RootCategoryNavigation}
        options={{
          tabBarIcon: ({ size, color, focused }) => (
            <>{focused ? <CategoryFocusedIcon /> : <CategoryIcon />}</>
          ),
        }}
        listeners={{
          tabPress: () => {
            navigator.navigate("CategoriesPage");
          },
        }}
      />
      <Tab.Screen
        name="SearchPage"
        component={RootSearchNavigation}
        options={{
          tabBarIcon: ({ size, color, focused }) => (
            <>{focused ? <SearchHomeFocusedIcon /> : <SearchHomeIcon />}</>
          ),
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={LazyFavouritesPage}
        options={{
          tabBarIcon: ({ size, color, focused }) => (
            <>{focused ? <LoveFocusedIcon /> : <LoveIcon />}</>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={LazyProfilePage}
        options={{
          tabBarIcon: ({ size, color, focused }) => (
            <>{focused ? <ProfileFocusedIcon /> : <ProfileIcon />}</>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export { RootHomeNavigation };
