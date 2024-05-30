import React, { Suspense } from "react";

export const withIconSuspense = (Icon, FallBackUi) => {
  return () => {
    return (
      <Suspense fallback={<FallBackUi />}>
        <Icon />
      </Suspense>
    );
  };
};

export const FallBackUi = () => {
  return null;
};
