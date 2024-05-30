import React from "react";
import { C } from "../../../assets";
import { useState, useRef } from "react";
import { useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import loaderData from "../../../utils/data/loaderData";
import { FlatList, SectionList, StyleSheet, Text, View } from "react-native";
import getStoreServices from "../../../graphql/queries/getStoreServices";
import SkeltonLoader from "../../../components/Loaders/SkeltonLoader.component";
import ServiceCard from "../../../components/ServiceCard/ServiceCard.component";
import StoreLoaderCard from "../../../components/StoreCard/StoreLoaderCard.component";
import EmptyComponent from "../../../components/NoDataContainer/EmptyComponent.component";
import ServiceHeaderCard from "../../../components/ServiceCard/ServiceHeaderCard.component";
import PdfViewer from "./PdfViewer";
import ServicePdfHeaderCard from "../../../components/ServiceCard/ServicePdfHeaderCard";
import { useRoute } from "@react-navigation/native";

const renderLoader = () => <StoreLoaderCard height={120} />;
const renderServiceFooter = () => <View style={styles.line} />;
const renderItem = ({ item, index }) => <ServiceCard key={index} data={item} />;
const renderTopLoader = () => <SkeltonLoader style={styles.topCardLoader} />;

const StoreDetailServicesPage = () => {
  const route = useRoute();
  const { option, i, image } = route?.params;
  console.log(i, option, "index and options");
  const {
    token: { access_token: token },
  } = useSelector((state) => state.user);
  const { selectedStore } = useSelector((state) => state.category);
  const storeId = selectedStore?.Store?.id;

  const scrollRef = useRef();
  const [loader, setLoader] = useState(false);
  const [serviceData, setServiceData] = useState([]);
  const [pdfFile, setPdf] = useState([]);
  const [index, setIndex] = useState(i || 0);
  const filterData = (data) => {
    const tempArr = [];
    for (const item of data) {
      tempArr?.push({
        data: item?.services,
        title: item?.serviceType,
      });
    }
    setServiceData(tempArr);
    setLoader(false);
  };

  const { data, loading, error } = useQuery(getStoreServices, {
    variables: {
      storeId,
    },
    fetchPolicy: "cache-and-network",
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
    onCompleted: (data) => {
      setLoader(true);

      setServiceData((prev) =>
        data?.ServiceByStore?.map((service) => {
          const { serviceType, services, ...rest } = service;
          services.map((service) => {
            const { serviceFiles, ...rest } = service;
            service?.serviceFiles.length > 0 &&
              setPdf((prev) => {
                return [...prev, { pdf: serviceFiles, info: rest }];
              });
          });
          return {
            ...prev,
            ...{
              data: services.map((item) => {
                return { ...item, ...rest };
              }),
              title: serviceType,
            },
          };
        })
      );
      setLoader(false);
      /*   if (data?.ServiceByStore?.length > 0) {
        setLoader(true);
        console.log(data?.ServiceByStore, "DATA_______");
        const firstPdfFile = getFirstPdfFile(data?.ServiceByStore);
        setPdf(firstPdfFile);
        filterData(data?.ServiceByStore);
      } */
    },
  });

  const getFirstPdfFile = (data) => {
    const firstServices = data?.[0]?.services;

    if (Array.isArray(firstServices)) {
      const pdfFile = firstServices.find(
        (service) => service.pdfFile !== null
      )?.pdfFile;
      return pdfFile || null;
    }

    return null;
  };

  const onHeaderCardHandler = (index) => {
    console.log(index, "index in header handler");
    scrollRef?.current?.scrollToLocation({
      sectionIndex: index,
      itemIndex: 0,
    });
  };
  const onPDFHeaderCardHandler = (index) => {
    setIndex(Number(index));
  };

  const renderEmpty = () => (
    <EmptyComponent
      viewStyle={styles.emptyStyle}
      title={`No ${option ?? "Services"}`}
      desc={`Behind the scenes, crafting something special. Stay tuned for updates!`}
      // desc={`We're Working Behind the scenes.\n ${
      //   option ?? "Services"
      // } will be added soon..`}
    />
  );

  const renderServiceHeader = ({ item, index }) => (
    <ServiceHeaderCard
      data={item}
      onHandler={() => onHeaderCardHandler(index)}
    />
  );
  const renderServicePDFHeader = ({ item, index }) => (
    <ServicePdfHeaderCard
      data={item}
      onHandler={() => onPDFHeaderCardHandler(index)}
      image={image}
    />
  );

  const renderHeaderCards = () => (
    <>
      {loading || loader ? (
        <FlatList
          horizontal
          bounces={false}
          data={loaderData}
          renderItem={renderTopLoader}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.headerList}
          keyExtractor={(item, index) => String(index)}
        />
      ) : pdfFile.length > 0 ? (
        <>
          <FlatList
            horizontal
            bounces={false}
            data={pdfFile}
            renderItem={renderServicePDFHeader}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.headerList}
            keyExtractor={(item, index) => String(index)}
          />
          {renderServiceFooter()}
        </>
      ) : serviceData.length > 0 ? (
        <>
          <FlatList
            horizontal
            bounces={false}
            data={serviceData}
            renderItem={renderServiceHeader}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.headerList}
            keyExtractor={(item, index) => String(index)}
          />
          {renderServiceFooter()}
        </>
      ) : (
        <></>
      )}
    </>
  );

  return (
    <View style={[styles.mainView]}>
      <>
        {renderHeaderCards()}
        {loading || loader ? (
          <FlatList
            data={loaderData}
            renderItem={renderLoader}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listStyle}
            keyExtractor={(item, index) => String(index)}
          />
        ) : pdfFile?.length > 0 ? (
          <PdfViewer data={pdfFile} index={index} />
        ) : (
          <SectionList
            stickySectionHeadersEnabled
            ref={scrollRef}
            sections={serviceData}
            renderItem={renderItem}
            ListEmptyComponent={renderEmpty}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listStyle}
            keyExtractor={(item, index) => String(index)}
            renderSectionHeader={({ section: { title } }) => (
              <View
                style={{
                  width: "100%",
                  height: 30,
                  backgroundColor: C.colors.primary.color1,
                }}
              >
                <Text style={styles.header}>{title}</Text>
              </View>
            )}
            ListFooterComponent={<View style={styles.pb} />}
          />
        )}
      </>
    </View>
  );
};

export default StoreDetailServicesPage;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: C.colors.primary.color1,
  },
  listStyle: {
    padding: 10,
  },
  emptyStyle: {
    marginTop: 200,
  },
  headerList: {
    padding: 15,
  },
  topCardLoader: {
    height: 80,
    width: 100,
    marginRight: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  line: {
    marginBottom: 5,
    borderBottomWidth: 0.5,
    width: C.measures.SCREEN_WIDTH,
    borderColor: C.colors.border.grey,
  },
  pb: {
    paddingBottom: 500,
  },
});
