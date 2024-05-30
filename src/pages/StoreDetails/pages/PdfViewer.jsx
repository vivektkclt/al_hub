import {
  View,
  Dimensions,
  ScrollView,
  Pressable,
  Text,
  Modal,
} from "react-native";
import React, { useState } from "react";
import Pdf from "react-native-pdf";
import { C } from "../../../assets";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PdfFile = ({ data, isBase64 = true, set }) => {
  console.log(data, "pdf");
  const s = {
    uri: data[0]?.location,
    cache: true,
  };
  return (
    <View
      //onPress={set}
      style={{
        width: "100%",
        alignItems: "flex-start",
        justifyContent: "center",
        height: Dimensions.get("window").height,
      }}
    >
      <Pdf
        trustAllCerts={false}
        source={s}
        onLoadComplete={(numberOfPages, { height }, tableContents) => {
          console.log(`Number of pages: ${numberOfPages}`);
          console.log(`height: ${height}`, tableContents);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
        onPressLink={(uri) => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={{
          width: "100%",
          height: Dimensions.get("window").height,
          backgroundColor: C.colors.primary.color1,
          alignSelf: "flex-start",
          paddingBottom: 240,
        }}
      />
    </View>
  );
};

/* const DetailedPdf = ({ data, set }) => {
  const { top } = useSafeAreaInsets();
  const [show, setShow] = useState(true);
  const [page, setPage] = useState(1);
  const s = {
    uri: data?.location,
  };
  return (
    <>
      <View
        style={{
          flex: 1,
          width: "100%",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <Pdf
          trustAllCerts={false}
          source={s}
          onLoadComplete={(numberOfPages, { height }, tableContents) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
            setPage((prev) => {
              console.log(prev, page, "aaaa");
              if (prev < page) {
                console.log(prev, page, "aaaa");
                setShow(false);
              }
              if (prev > page) {
                console.log(prev, page, "bbbb");
                setShow(true);
              }
              return page;
            });
          }}
          onError={(error) => {
            console.log(error);
          }}
          onPressLink={(uri) => {
            console.log(`Link pressed: ${uri}`);
          }}
          onPageSingleTap={() => {
            setShow((prev) => !prev);
          }}
          style={{
            flex: 1,
            width: "100%",
            minHeight: Dimensions.get("window").height,
            backgroundColor: C.colors.primary.color1,
          }}
        />
      </View>
      {show && (
        <View
          style={{
            padding: 10,
            position: "absolute",
            bottom: 0,
            width: "100%",
          }}
        >
          <Pressable
            onPress={set}
            style={{
              width: "100%",
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              padding: 10,

              backgroundColor: "black",
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "white" }}>close</Text>
          </Pressable>
        </View>
      )}
    </>
  );
}; */

const PdfViewer = ({ data, index = 0 }) => {
  const SCREEN_WIDTH = C.measures.SCREEN_WIDTH;
  const VIEW_WIDTH = SCREEN_WIDTH * data?.length;
  console.log(data?.length, "pdf data");
  return (
    <>
      <ScrollView
        contentContainerStyle={{
          width: VIEW_WIDTH,
          flexDirection: "row",
          transform: [{ translateX: -SCREEN_WIDTH * index }],
        }}
      >
        {data?.map((file) => {
          return (
            <View style={{ width: SCREEN_WIDTH }}>
              <PdfFile data={file?.pdf} />
            </View>
          );
        })}
      </ScrollView>
    </>
  );
};

export default PdfViewer;
