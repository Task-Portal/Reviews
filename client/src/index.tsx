import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import ErrorBoundary from "./components/ErrorBoundary";
import ReactModal from "react-modal";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "bootstrap/dist/css/bootstrap.min.css";

// console.log("gql url", process.env.REACT_APP_GQL_URL);
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  credentials: "include",
  cache: new InMemoryCache({
    resultCaching: false,
  }),
});

ReactDOM.render(
  <Provider store={configureStore()}>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ErrorBoundary>{[<App key="App" />]}</ErrorBoundary>
      </ApolloProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

ReactModal.setAppElement("#root");
