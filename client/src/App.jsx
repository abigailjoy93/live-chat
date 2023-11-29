import "./App.css";
import Home from "./pages/Home/Home";
import ChatApp from "./pages/ChatApp/ChatApp";
import Profile from "./pages/Profile/Profile";
import Join from "./pages/Join/Join";
import { useState, useEffect } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import io from "socket.io-client";
import Auth from "./utils/auth";

const socket = io.connect("http://localhost:3001");

const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // Check if the username is authenticated
    const token = localStorage.getItem("id_token");
    if (token) {
      const authenticatedUser = Auth.getUserFromToken(token);
      setUsername(authenticatedUser.data.username);
    }
  }, []);

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                username={username}
                setUsername={setUsername}
                socket={socket}
              />
            }
          />
          <Route
            path="/chatapp"
            element={
              <ChatApp
                username={username}
                setUsername={setUsername}
                socket={socket}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                username={username}
                setUsername={setUsername}
                socket={socket}
              />
            }
          />
          <Route
            path="/join"
            element={
              <Join
                username={username}
                setUsername={setUsername}
                socket={socket}
              />
            }
          />
        </Routes>
      </div>
      <Header />
      <Footer />
    </ApolloProvider>
  );
}

export default App;
