import Header from "./components/Header";
import Main from "./components/Main";
import { useState, useEffect } from "react";

const initialAccounts = [
  {
    fullName: "Catalin Lucut",
    username: "catalinlucut",
    password: "1234",
  },
];

export default function App() {
  const [title, setTitle] = useState("9GAG-BestFunny Memes");
  const [isOpen, setIsOpen] = useState(false);
  const [usernameLog, setUsernameLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [posts, setPosts] = useState([]);
  const [interests, setInterests] = useState([]);
  const [filtered, setFiltered] = useState("");
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("commentsCount");
  const [accounts, setAccounts] = useState(initialAccounts);
  const [loggedUser, setLoggedUser] = useState({});
  const [commentSectionOpen, setCommentSectionOpen] = useState(false);
  const [savedPosts, setSavedPosts] = useState([]);
  const [savedPostsFiltered, setSavedPostsFiltered] = useState(false);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    fetch("https://run.mocky.io/v3/ad5132b3-bb1c-49f4-b624-095f03f7b738")
      .then((respons) => respons.json())
      .then((data) => setInterests(data));
  }, []);

  useEffect(() => {
    fetch("https://run.mocky.io/v3/f300fe5a-f797-46e6-ab5e-00731ed017c4")
      .then((respons) => respons.json())
      .then((data) => {
        setPosts(data.data.posts);
      })
      .catch((error) => console.log(error));
  }, []);

  function handleOpenMenu() {
    setIsOpen(!isOpen);
  }
  console.log(posts);
  return (
    <>
      <Header
        setTitle={setTitle}
        isOpen={isOpen}
        onOpenMenu={handleOpenMenu}
        usernameLog={usernameLog}
        setUsernameLog={setUsernameLog}
        passwordLog={passwordLog}
        setPasswordLog={setPasswordLog}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        isLogged={isLogged}
        setIsLogged={setIsLogged}
        interests={interests}
        search={search}
        setSearch={setSearch}
        filtered={filtered}
        setFiltered={setFiltered}
        posts={posts}
        setPosts={setPosts}
        setActive={setActive}
        accounts={accounts}
        setAccounts={setAccounts}
        setLoggedUser={setLoggedUser}
        loggedUser={loggedUser}
        setCommentSectionOpen={setCommentSectionOpen}
        setSavedPostsFiltered={setSavedPostsFiltered}
      />
      <Main
        setTitle={setTitle}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isLogged={isLogged}
        posts={posts}
        interests={interests}
        filtered={filtered}
        setFiltered={setFiltered}
        search={search}
        active={active}
        loggedUser={loggedUser}
        commentSectionOpen={commentSectionOpen}
        setCommentSectionOpen={setCommentSectionOpen}
        savedPosts={savedPosts}
        setSavedPosts={setSavedPosts}
        savedPostsFiltered={savedPostsFiltered}
        setSavedPostsFiltered={setSavedPostsFiltered}
      />
    </>
  );
}
