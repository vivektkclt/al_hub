const isCabRequired = (categories: any = []) => {
  console.log(categories, "STORE_DATA=====Categories");
  return !categories.some(
    (category) => category.id === 18 || category.id === 24
  );
};

export default isCabRequired;
