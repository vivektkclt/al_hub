import React from "react";
import { C } from "../../assets";
import { View, Text, Platform } from "react-native";
import { commonStyles } from "../../styles";
import { withHeader } from "../../hoc/withHeader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import StoreDetailOfferPage from "./pages/StoreDetailOffer.page";
import { StoreDetailStyle as styles } from "./StoreDetails.style";
import { categorySlice } from "../../redux/slices/category.slice";
import StoreDetailReviewsPage from "./pages/StoreDetailReviews.page";
import StoreDetailServicesPage from "./pages/StoreDetailServices.page";
import TabButton from "../../components/TabButton/TabButton.component";
import CustomHeader from "../../components/Headers/CustomHeader.component";

const HeaderComponent = () => {
  const { selectedStore } = useSelector((state) => state.category);
  return <CustomHeader isBack hideShadow title={selectedStore?.Store?.name} />;
};

const CustomTab = ({ option }) => {
  const dispatch = useDispatch();
  const { goBack } = useNavigation();
  const { storeTab } = useSelector((state) => state.category);
  const onChooseTab = (tab) => {
    dispatch(categorySlice.actions.setStoreTab({ tab }));
  };
  const onChooseOverView = () => {
    onChooseTab(C.strings.OVER_VIEW);
    goBack();
  };
  return (
    <View style={[commonStyles.align.rowEvenly, styles.tab]}>
      <TabButton
        onTabHandler={onChooseOverView}
        placeHolder={C.strings.OVER_VIEW}
        isActive={storeTab === C.strings.OVER_VIEW ? true : false}
      />
      <TabButton
        placeHolder={C.strings.OFFERS}
        onTabHandler={() => onChooseTab(C.strings.OFFERS)}
        isActive={storeTab === C.strings.OFFERS ? true : false}
      />
      <TabButton
        placeHolder={option ?? C.strings.SERVICES}
        onTabHandler={() => onChooseTab(C.strings.SERVICES)}
        isActive={storeTab === C.strings.SERVICES ? true : false}
      />
      <TabButton
        placeHolder={C.strings.REVIEWS}
        onTabHandler={() => onChooseTab(C.strings.REVIEWS)}
        isActive={storeTab === C.strings.REVIEWS ? true : false}
      />
    </View>
  );
};

const BodyComponent = () => {
  const route = useRoute();
  const option = route?.params?.option;
  const { storeTab } = useSelector((state) => state.category);
  return (
    <View>
      <CustomTab option={option} />
      {storeTab === C.strings.OFFERS ? (
        <StoreDetailOfferPage />
      ) : storeTab === C.strings.SERVICES ? (
        <StoreDetailServicesPage option={option} />
      ) : storeTab === C.strings.REVIEWS ? (
        <StoreDetailReviewsPage />
      ) : (
        <Text style={{ color: C.colors.text.black }}>
          {"Please choose a tab"}
        </Text>
      )}
    </View>
  );
};

const StoreDetailsPage = withHeader({ HeaderComponent, BodyComponent });

export default StoreDetailsPage;
