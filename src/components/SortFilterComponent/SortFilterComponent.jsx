import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import colors from "../../assets/values/colors";
import pngImages from "../../assets/images/png";
const options = [
  // {
  //   label: "Sort By",
  //   icon: pngImages.arrowDown,
  //   value: "sort",
  // },
  {
    label: "Filter",
    icon: pngImages.filterIcon,
    value: "filter",
  },
  {
    label: "Clear Filter",
    icon: null,
    value: "clear",
  },
];
const SortFilterComponent = ({
  option = null,
  onPress = null,
  limit = null,
  isClear = false,
  isModal = false,
}) => {
  return (
    // <FlatList
    <View>
      <View style={flatStyles.sortContainer}>
        <FlatList
          contentContainerStyle={{
            height: "100%",
            justifyContent: "flex-start",
          }}
          data={isClear ? options : options.slice(0, 1)}
          horizontal
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  if (onPress) {
                    onPress(item?.value);
                  }
                }}
                style={[
                  flatStyles.sortBtn,
                  {
                    borderWidth:
                      item.value === "filter" && isClear && !isModal ? 1.3 : 1,
                    borderColor:
                      item.value === "filter" && isClear && !isModal
                        ? "#313036"
                        : colors.border.grey,
                    backgroundColor:
                      item.value === "filter" && isClear && !isModal
                        ? "rgba(49, 48, 54, 0.1)"
                        : colors.primary.color1,
                  },
                ]}
              >
                <Text
                  style={[
                    flatStyles.sortBtnTxt,
                    {
                      color:
                        option == item?.value
                          ? colors.primary.color1
                          : colors.primary.color2,
                    },
                  ]}
                >
                  {item?.label}
                </Text>
                {item?.icon ? (
                  <Image
                    resizeMode="contain"
                    style={[
                      flatStyles.img,
                      {
                        tintColor:
                          option == item?.value
                            ? colors.primary.color1
                            : colors.primary.color2,
                      },
                    ]}
                    source={item?.icon}
                  />
                ) : null}
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};

const flatStyles = StyleSheet.create({
  sortBtn: {
    height: "100%",
    width: 110,
    borderRadius: 8,
    borderWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginRight: 10,
  },
  sortContainer: {
    height: 40,
  },
  sortBtnTxt: {
    fontWeight: "500",
  },
  img: {
    height: 18,
    width: 18,
    marginLeft: 5,
  },
});
export default SortFilterComponent;
