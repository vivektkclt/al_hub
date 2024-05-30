import React from "react";
import config from "./env";
import "react-native-reanimated";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import { createHttpLink } from "apollo-link-http";
import FlashMessage from "react-native-flash-message";
import { RootNavigation } from "./routes/rootNavigation";
import { MultiAPILink } from "@habx/apollo-multi-endpoint-link";
import {
  ApolloLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import Offlinepage from "./pages/OffilnePage/Offline.page";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Initialize Apollo Client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    new MultiAPILink({
      endpoints: {
        stores: config.STORES_URL,
        category: config.CATEGORY_URL,
      },
      createHttpLink: () => createHttpLink(),
    }),
  ]),
  connectToDevTools: true,
});

const App = () => {
  return (
    <>
      <SafeAreaProvider>
        <ApolloProvider client={client}>
          <Provider store={store}>
            <RootNavigation />
          </Provider>
        </ApolloProvider>
        <FlashMessage position="top" />
      </SafeAreaProvider>
    </>
  );
};

export default App;
