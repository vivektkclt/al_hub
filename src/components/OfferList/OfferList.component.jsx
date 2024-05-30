import React from "react";
import { C } from "../../assets";
import { FlatList, View } from "react-native";
import loaderData from "../../utils/data/loaderData";
import OfferCard from "../OfferCard/OfferCard.component";
import { offerListStyle as styles } from "./OfferList.style";
import StoreLoaderCard from "../StoreCard/StoreLoaderCard.component";
import EmptyComponent from "../NoDataContainer/EmptyComponent.component";

const renderLoader = () => <StoreLoaderCard height={120} />;
const renderItem = ({ item, index }) => <OfferCard data={item} />;
const renderEmpty = () => (
  <EmptyComponent
    title={C.strings.NO_OFFERS}
    viewStyle={styles.emptyStyle}
    desc={C.strings.NO_OFFER_DESC}
  />
);

const OfferList = ({ route, loading, data }) => (
  <View style={styles.mainView}>
    {loading ? (
      <FlatList
        data={loaderData}
        renderItem={renderLoader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listStyle}
        keyExtractor={(item) => item?.id.toString()}
      />
    ) : (
      <FlatList
        data={data}
        bounces={false}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listStyle}
        keyExtractor={(item) => item?.id.toString()}
      />
    )}
  </View>
);

export default OfferList;
