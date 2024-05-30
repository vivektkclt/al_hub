import { C } from "../../assets";
import { commonStyles } from "../../styles";
import slides from "../../utils/data/slides";
import { navigator } from "../../routes/navigations";
import React, { useCallback, useRef, useState } from "react";
import { onBoardingStyle as styles } from "./OnBoarding.style";
import SvgButton from "../../components/Buttons/SvgButton.component";
import { View, Text, FlatList, Animated, TouchableOpacity } from "react-native";
import OnBoardingPaginator from "../../components/Paginator/OnBoardingPaginator";
import OnBoardingCard from "../../components/OnBoardingCard/OnBoardingCard.component";
import CustomStatusBar from "../../components/StatusBar/CustomStatusBar.component";

const renderItem = ({ item, index }) => (
  <OnBoardingCard data={item} index={index} />
);

const OnBoardingPage = () => {
  const [isEnd, setIsEnd] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;
  const onBtnHandler = () => navigator.navigate("LoginPage");
  const onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
    setIsEnd(viewableItems[0]?.index === 2 ? true : false);
  }, []);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 60,
  };

  return (
    <>
      <CustomStatusBar backgroundColor={C.colors.primary.color2} />
      <View style={[commonStyles.align.flex1, styles.mainView]}>
        <FlatList
          horizontal
          data={slides}
          pagingEnabled
          bounces={false}
          renderItem={renderItem}
          viewabilityConfig={viewabilityConfig}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          onViewableItemsChanged={onViewableItemsChanged}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
        />
        <View style={styles.bottomView}>
          <OnBoardingPaginator data={slides} scrollX={scrollX} />
          {!isEnd ? (
            <TouchableOpacity onPress={onBtnHandler}>
              <Text style={styles.txtWht}>{C.strings.SKIP}</Text>
            </TouchableOpacity>
          ) : (
            <SvgButton
              isWhite
              height={40}
              width={150}
              onBtnHandler={onBtnHandler}
              placeholder={C.strings.DONE}
              // btnStyle={}
            />
          )}
        </View>
      </View>
    </>
  );
};

export default OnBoardingPage;
