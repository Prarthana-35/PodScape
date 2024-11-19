import React, { useEffect, useState, useRef } from "react";
import {jwtDecode} from "jwt-decode"; // Ensure correct import without braces
import { UserContext } from "./contexts/UserContext";
import Header from "./components/Header";
import Episode from "./components/Episode";
import "./App.css"; // Add custom CSS

function App() {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [data, setData] = useState([]);
  const signInButton = useRef();

  const handleCallBack = (res) => {
    const user = jwtDecode(res.credential);
    setUser(user);
    setLoggedIn(true);
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "619625737993-s2jn448qt4108k9dbau48j24qru314eq.apps.googleusercontent.com",
      callback: handleCallBack,
    });
    google.accounts.id.renderButton(signInButton.current, {
      theme: "outline",
      size: "large",
    });
  }, [loggedIn]);

  const rssFeed = "https://cdn.atp.fm/rss/public?azrdcc1z";
  useEffect(() => {
    fetch(rssFeed)
      .then((res) => res.text())
      .then((str) => {
        const parser = new window.DOMParser();
        const data = parser.parseFromString(str, "text/xml");
        const itemList = data.querySelectorAll("item");

        const items = [];
        itemList.forEach((el) => {
          items.push({
            title: el.querySelector("title").textContent,
            pubDate: new Date(
              el.querySelector("pubDate").textContent
            ).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
            mp3: el.querySelector("enclosure").getAttribute("url"),
            link: el.querySelector("link").textContent,
          });
        });
        setData(items);
      });
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <div className="app">
        <Header
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          signInButton={signInButton}
        />
        {loggedIn ? (
          <div className="podcast-container">
            <h2 className="podcast-title">Accidental Tech Podcast</h2>
            {data.map((ep, i) => (
              <Episode
                key={i}
                title={ep.title}
                pubDate={ep.pubDate}
                link={ep.link}
                mp3={ep.mp3}
              />
            ))}
          </div>
        ) : (
          <div className="welcome-message">
            <h3>Sign in to enjoy the podcast experience!</h3>
          </div>
        )}
      </div>
    </UserContext.Provider>
  );
}

export default App;
