import React from "react";
import { withIconSuspense, FallBackUi } from "../../utils/lazyIcon";

const SearchIcon = withIconSuspense(
  React.lazy(() => import("./svg/search.svg")),
  FallBackUi
);

const VoiceIcon = withIconSuspense(
  React.lazy(() => import("./svg/voice.svg")),
  FallBackUi
);

const LocationIcon = withIconSuspense(
  React.lazy(() => import("./svg/location.svg")),
  FallBackUi
);

const LocationRedIcon = withIconSuspense(
  React.lazy(() => import("./svg/location-red.svg")),
  FallBackUi
);

const LocationBlackIcon = withIconSuspense(
  React.lazy(() => import("./svg/locationBlack.svg")),
  FallBackUi
);

const BackIcon = withIconSuspense(
  React.lazy(() => import("./svg/back.svg")),
  FallBackUi
);

const BackWhtIcon = withIconSuspense(
  React.lazy(() => import("./svg/back-wht.svg")),
  FallBackUi
);

const StarIcon = withIconSuspense(
  React.lazy(() => import("./svg/star.svg")),
  FallBackUi
);

const HeartIcon = withIconSuspense(
  React.lazy(() => import("./svg/heart.svg")),
  FallBackUi
);

const ArrowIcon = withIconSuspense(
  React.lazy(() => import("./svg/arrow.svg")),
  FallBackUi
);

const CameraIcon = withIconSuspense(
  React.lazy(() => import("./svg/camera.svg")),
  FallBackUi
);

const AlhubLogo = withIconSuspense(
  React.lazy(() => import("./svg/alhub.svg")),
  FallBackUi
);

const GoogleIcon = withIconSuspense(
  React.lazy(() => import("./svg/google.svg")),
  FallBackUi
);

const NoDataIcon = withIconSuspense(
  React.lazy(() => import("./svg/no-data.svg")),
  FallBackUi
);

const AppleIcon = withIconSuspense(
  React.lazy(() => import("./svg/apple.svg")),
  FallBackUi
);

const ShareCard = withIconSuspense(
  React.lazy(() => import("./svg/share-card.svg")),
  FallBackUi
);

const FbIcon = withIconSuspense(
  React.lazy(() => import("./svg/fb.svg")),
  FallBackUi
);

const InstaIcon = withIconSuspense(
  React.lazy(() => import("./svg/insta.svg")),
  FallBackUi
);

const WebIcon = withIconSuspense(
  React.lazy(() => import("./svg/web.svg")),
  FallBackUi
);

const ForwadIcon = withIconSuspense(
  React.lazy(() => import("./svg/forward.svg")),
  FallBackUi
);

const PhoneIcon = withIconSuspense(
  React.lazy(() => import("./svg/phone.svg")),
  FallBackUi
);

const CloseIcon = withIconSuspense(
  React.lazy(() => import("./svg/close.svg")),
  FallBackUi
);

const FavIcon = withIconSuspense(
  React.lazy(() => import("./svg/fav.svg")),
  FallBackUi
);

const NoFavIcon = withIconSuspense(
  React.lazy(() => import("./svg/no-fav.svg")),
  FallBackUi
);

const CamIcon = withIconSuspense(
  React.lazy(() => import("./svg/cam.svg")),
  FallBackUi
);

const CategoryIcon = withIconSuspense(
  React.lazy(() => import("./svg/category.svg")),
  FallBackUi
);

const CategoryFocusedIcon = withIconSuspense(
  React.lazy(() => import("./svg/category-focused.svg")),
  FallBackUi
);

const HomeIcon = withIconSuspense(
  React.lazy(() => import("./svg/home.svg")),
  FallBackUi
);

const HomeFocusedIcon = withIconSuspense(
  React.lazy(() => import("./svg/home-focused.svg")),
  FallBackUi
);

const SearchHomeIcon = withIconSuspense(
  React.lazy(() => import("./svg/search-icon.svg")),
  FallBackUi
);

const SearchHomeFocusedIcon = withIconSuspense(
  React.lazy(() => import("./svg/search-icon-focused.svg")),
  FallBackUi
);

const LoveIcon = withIconSuspense(
  React.lazy(() => import("./svg/love.svg")),
  FallBackUi
);

const LoveFocusedIcon = withIconSuspense(
  React.lazy(() => import("./svg/love-focused.svg")),
  FallBackUi
);

const ProfileFocusedIcon = withIconSuspense(
  React.lazy(() => import("./svg/user-focused.svg")),
  FallBackUi
);

const ProfileIcon = withIconSuspense(
  React.lazy(() => import("./svg/user.svg")),
  FallBackUi
);

const OfferIcon = withIconSuspense(
  React.lazy(() => import("./svg/offer.svg")),
  FallBackUi
);

const DeleteIcon = withIconSuspense(
  React.lazy(() => import("./svg/delete.svg")),
  FallBackUi
);

const AlhubSpalshLogo = withIconSuspense(
  React.lazy(() => import("./svg/splash.svg")),
  FallBackUi
);

const ShareIcon = withIconSuspense(
  React.lazy(() => import("./svg/share.svg")),
  FallBackUi
);

const LocateIcon = withIconSuspense(
  React.lazy(() => import("./svg/current-location.svg")),
  FallBackUi
);

const WhatsappIcon = withIconSuspense(
  React.lazy(() => import("./svg/whatsapp.svg")),
  FallBackUi
);

export {
  FbIcon,
  WebIcon,
  CamIcon,
  FavIcon,
  StarIcon,
  BackIcon,
  HomeIcon,
  LoveIcon,
  ShareIcon,
  VoiceIcon,
  HeartIcon,
  AlhubLogo,
  ArrowIcon,
  AppleIcon,
  ShareCard,
  InstaIcon,
  PhoneIcon,
  NoFavIcon,
  OfferIcon,
  CloseIcon,
  NoDataIcon,
  LocateIcon,
  SearchIcon,
  CameraIcon,
  GoogleIcon,
  ForwadIcon,
  DeleteIcon,
  ProfileIcon,
  BackWhtIcon,
  CategoryIcon,
  LocationIcon,
  WhatsappIcon,
  SearchHomeIcon,
  LocationRedIcon,
  AlhubSpalshLogo,
  LoveFocusedIcon,
  HomeFocusedIcon,
  LocationBlackIcon,
  ProfileFocusedIcon,
  CategoryFocusedIcon,
  SearchHomeFocusedIcon,
};
