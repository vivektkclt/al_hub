import React from "react";
import { withPageSuspense, PageFallBackUi } from "../utils/lazyPage";

const LazyHomePage = withPageSuspense(
  React.lazy(() => import("../pages/Home/Home.page")),
  PageFallBackUi
);

const LazyCategoriesPage = withPageSuspense(
  React.lazy(() => import("../pages/Categories/Categories.page")),
  PageFallBackUi
);

const LazySplashPage = withPageSuspense(
  React.lazy(() => import("../pages/Splash/Splash.page")),
  PageFallBackUi
);

const LazySearchPage = withPageSuspense(
  React.lazy(() => import("../pages/Search/Search.page")),
  PageFallBackUi
);

const LazyProfilePage = withPageSuspense(
  React.lazy(() => import("../pages/Profile/Profile.page")),
  PageFallBackUi
);

const LazyFavouritesPage = withPageSuspense(
  React.lazy(() => import("../pages/Favourites/Favourites.page")),
  PageFallBackUi
);

const LazyEditProfilePage = withPageSuspense(
  React.lazy(() => import("../pages/EditProfile/EditProfile.page")),
  PageFallBackUi
);

const LazyCategoryDetailsPage = withPageSuspense(
  React.lazy(() => import("../pages/CategoryDetails/CategoryDetails.page")),
  PageFallBackUi
);

const LazyStorePage = withPageSuspense(
  React.lazy(() => import("../pages/Store/Store.page")),
  PageFallBackUi
);

const LazyOnBoardingPage = withPageSuspense(
  React.lazy(() => import("../pages/OnBoarding/OnBoarding.page")),
  PageFallBackUi
);

const LazyLoginPage = withPageSuspense(
  React.lazy(() => import("../pages/Login/Login.page")),
  PageFallBackUi
);

const LazyMobileRegisterPage = withPageSuspense(
  React.lazy(() => import("../pages/MobileRegisterPage/MobileRegister.Page")),
  PageFallBackUi
);
const LazyAccountRegisterPage = withPageSuspense(
  React.lazy(() => import("../pages/AccountRegister/AccountRegister.Page")),
  PageFallBackUi
);
const LazyMyOffersPage = withPageSuspense(
  React.lazy(() => import("../pages/MyOffers/MyOffers.page")),
  PageFallBackUi
);

const LazyOfferDetailsPage = withPageSuspense(
  React.lazy(() => import("../pages/OfferDetails/OfferDetails.page")),
  PageFallBackUi
);

const LazyStoreDetailsPage = withPageSuspense(
  React.lazy(() => import("../pages/StoreDetails/StoreDetails.page")),
  PageFallBackUi
);

const LazyRatingPage = withPageSuspense(
  React.lazy(() => import("../pages/Rating/Rating.page")),
  PageFallBackUi
);
const LazyBookSuccess = withPageSuspense(
  React.lazy(() => import("../pages/Booking/BookingSuccess")),
  PageFallBackUi
);

const LazyChooseLocationPage = withPageSuspense(
  React.lazy(() => import("../pages/ChooseLocation/ChooseLocation.page")),
  PageFallBackUi
);

const LazyBookingDetailsPage = withPageSuspense(
  React.lazy(() => import("../pages/BookingDetails/BookingDetails")),
  PageFallBackUi
);
const LazyBookingStatusPage = withPageSuspense(
  React.lazy(() => import("../pages/BookingStatus/BookingStatus")),
  PageFallBackUi
);
const LazyTableBookingPage = withPageSuspense(
  React.lazy(() => import("../pages/TableBookingPage/TableBooking.page")),
  PageFallBackUi
);
const LazyTableBookingConfirmPage = withPageSuspense(
  React.lazy(() =>
    import("../pages/TableBookingConfirm/TableBookingConfirm.page")
  ),
  PageFallBackUi
);
const LazyHistoryTypeSelector = withPageSuspense(
  React.lazy(() => import("../pages/HistyoryTypeSelector/HistoryTypeSelector")),
  PageFallBackUi
);
const LazyTableBookingHistory = withPageSuspense(
  React.lazy(() => import("../pages/TableBookingHistory/TableBookingHistory")),
  PageFallBackUi
);
const LazyTableBookingStatus = withPageSuspense(
  React.lazy(() => import("../pages/TableBookingStatus/TableBookingStatus")),
  PageFallBackUi
);
export {
  LazyHomePage,
  LazyLoginPage,
  LazyStorePage,
  LazySearchPage,
  LazyRatingPage,
  LazySplashPage,
  LazyProfilePage,
  LazyMyOffersPage,
  LazyCategoriesPage,
  LazyFavouritesPage,
  LazyOnBoardingPage,
  LazyEditProfilePage,
  LazyStoreDetailsPage,
  LazyOfferDetailsPage,
  LazyChooseLocationPage,
  LazyCategoryDetailsPage,
  LazyBookSuccess,
  LazyBookingDetailsPage,
  LazyBookingStatusPage,
  LazyTableBookingPage,
  LazyTableBookingConfirmPage,
  LazyHistoryTypeSelector,
  LazyTableBookingHistory,
  LazyTableBookingStatus,
  LazyAccountRegisterPage,
  LazyMobileRegisterPage,
};
