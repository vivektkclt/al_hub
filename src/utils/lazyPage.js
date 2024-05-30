import React, { Suspense } from "react";
import FullPageLoader from "../components/Loaders/FullPageLoader.component";

export const withPageSuspense = (Component, PageFallBackUi) => {
  return (props) => {
    return (
      <Suspense fallback={<PageFallBackUi />}>
        <Component {...props} />
      </Suspense>
    );
  };
};

export const PageFallBackUi = () => <FullPageLoader />;
