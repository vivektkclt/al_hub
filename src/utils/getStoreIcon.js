const getStoreIcon = (data, image = "image") => {
  // Use findIndex to find the index of the first object with classification 'image'.
  const index = data?.StoreImages.findIndex(
    (item) => item.classification === image
  );

  // Use the found index to get the location of the first image or the first object.
  const result =
    index !== -1
      ? data?.StoreImages[index].location
      : data?.StoreImages.length > 0
      ? data?.StoreImages[0].location
      : null;
  return result;
};
export default getStoreIcon;
