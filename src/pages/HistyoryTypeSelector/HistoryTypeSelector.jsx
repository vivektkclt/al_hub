import { View, Text, Pressable } from "react-native";
import React from "react";
import CustomHeader from "../../components/Headers/CustomHeader.component";
import { withHeader } from "../../hoc/withHeader";
import ProfileNavigateCard from "../../components/ProfileNavigateCard/ProfileNavigateCard.component";
import { useNavigation } from "@react-navigation/native";

const HeaderComponent = () => {
  return <CustomHeader isBack />;
};

const BodyComponent = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <ProfileNavigateCard
        placeholder={"Slot Bookings"}
        onCardHandler={() => navigation.navigate("History")}
      />
      <ProfileNavigateCard
        placeholder={"Table Bookings"}
        onCardHandler={() => navigation.navigate("TableBookingHistory")}
      />
    </View>
  );
};

export default HistoryTypeSelector = withHeader({
  HeaderComponent,
  BodyComponent,
});
