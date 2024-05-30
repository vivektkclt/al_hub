import { useMutation } from "@apollo/client";
import claimOffer from "../graphql/mutations/claimOffer";
import { useDispatch, useSelector } from "react-redux";
import { modalSlice } from "../redux/slices/modal.slice";
import getOfferDetails from "../graphql/queries/getOfferDetails";

export const useClaimOffer = ({ offerId, storeId }) => {
  const dispatch = useDispatch();
  const onRadeemHandler = async () => {
    dispatch(modalSlice.actions.showRadeemModal());
  };
  const {
    token: { access_token: token },
  } = useSelector((state) => state.user);
  const context = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const [fnClaimOffer, { loading: claimingOffer }] = useMutation(claimOffer);
  const redeem = async () => {
    await fnClaimOffer({
      fetchPolicy: "network-only",
      context,
      variables: { storeId, offerId },
      onCompleted: async () => {
        dispatch(modalSlice.actions.showRadeemModal());
      },
      refetchQueries: () => [
        {
          context,
          query: getOfferDetails,
          fetchPolicy: "network-only",
          variables: {
            storeId,
            offerId,
          },
        },
      ],
      onError: (err) => {
        console.log(err, "error claiming code");
        setError(err);
      },
    });
  };
  return { redeem };
};
