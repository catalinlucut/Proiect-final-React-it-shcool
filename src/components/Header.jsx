import { useState } from "react";
import Button from "./Button";
import "./Header.css";
import { Login } from "./Login";
import { Register } from "./Register";
import { LoggedIn } from "./LoggedIn";
import { Post } from "./Post";
import { Search } from "./Search";

export default function Header({
  setTitle,
  onOpenMenu,
  usernameLog,
  setUsernameLog,
  passwordLog,
  setPasswordLog,
  isLogged,
  setIsLogged,
  interests,
  setSearch,
  setPosts,
  setActive,
  filtered,
  setFiltered,
  search,
  accounts,
  setAccounts,
  setLoggedUser,
  loggedUser,
  setCommentSectionOpen,
  setSavedPostsFiltered,
}) {
  const [currentFrom, setCurrentForm] = useState("login");
  const [loginMenuOpen, setLoginMenuOpen] = useState(false);
  const [loggedInMenuOpen, setLoggedInMenuOpen] = useState(false);
  const [postMenuOpen, setPostMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const [activeHome, setActiveHome] = useState(true);
  const [activeTop, setActiveTop] = useState(false);
  const [activeTrending, setActiveTrending] = useState(false);
  const [activeFresh, setActiveFresh] = useState(false);

  function toggleForm(formName) {
    setCurrentForm(formName);
  }

  return (
    <header className="header">
      <Logo onOpenMenu={onOpenMenu} />
      <NavBar
        activeHome={activeHome}
        setActiveHome={setActiveHome}
        activeTop={activeTop}
        setActiveTop={setActiveTop}
        activeTrending={activeTrending}
        setActiveTrending={setActiveTrending}
        activeFresh={activeFresh}
        setActiveFresh={setActiveFresh}
        setTitle={setTitle}
        filtered={filtered}
        setFiltered={setFiltered}
        setActive={setActive}
        setSavedPostsFiltered={setSavedPostsFiltered}
      />
      <Action
        setLoginMenuOpen={setLoginMenuOpen}
        loginMenuOpen={loginMenuOpen}
        isLogged={isLogged}
        setIsLogged={setIsLogged}
        loggedInMenuOpen={loggedInMenuOpen}
        setLoggedInMenuOpen={setLoggedInMenuOpen}
        setPostMenuOpen={setPostMenuOpen}
        setSearchOpen={setSearchOpen}
        accounts={accounts}
        loggedUser={loggedUser}
      />
      {loginMenuOpen &&
        (currentFrom === "login" ? (
          <Login
            loginMenuOpen={loginMenuOpen}
            setLoginMenuOpen={setLoginMenuOpen}
            onFormSwitch={toggleForm}
            usernameLog={usernameLog}
            setUsernameLog={setUsernameLog}
            passwordLog={passwordLog}
            setPasswordLog={setPasswordLog}
            setIsLogged={setIsLogged}
            accounts={accounts}
            setLoggedUser={setLoggedUser}
          />
        ) : (
          <Register
            onFormSwitch={toggleForm}
            setAccounts={setAccounts}
            loginMenuOpen={loginMenuOpen}
            setLoginMenuOpen={setLoginMenuOpen}
          />
        ))}
      {loggedInMenuOpen && (
        <LoggedIn
          setTitle={setTitle}
          isLogged={isLogged}
          setIsLogged={setIsLogged}
          loggedInMenuOpen={loggedInMenuOpen}
          setLoggedInMenuOpen={setLoggedInMenuOpen}
          setCommentSectionOpen={setCommentSectionOpen}
          loggedUser={loggedUser}
          setSavedPostsFiltered={setSavedPostsFiltered}
          setFiltered={setFiltered}
          setActiveHome={setActiveHome}
          setActiveTop={setActiveTop}
          setActiveTrending={setActiveTrending}
          setActiveFresh={setActiveFresh}
        />
      )}
      {postMenuOpen && (
        <Post
          interests={interests}
          setPosts={setPosts}
          setPostMenuOpen={setPostMenuOpen}
          postMenuOpen={postMenuOpen}
        />
      )}
      {searchOpen && (
        <Search
          setSearch={setSearch}
          search={search}
          searchOpen={searchOpen}
          setSearchOpen={setSearchOpen}
        />
      )}
    </header>
  );
}

function Logo({ onOpenMenu }) {
  return (
    <div className="logo">
      <Button clickCallback={onOpenMenu}>
        <ion-icon className="hamburger-menu" name="menu-outline"></ion-icon>
      </Button>

      <img
        src="https://1000logos.net/wp-content/uploads/2016/10/9gag-logo.jpg"
        alt="9gag logo"
      />
    </div>
  );
}

function NavBar({
  filtered,
  setFiltered,
  setActive,
  setSavedPostsFiltered,
  setTitle,

  activeHome,
  setActiveHome,
  activeTop,
  setActiveTop,
  activeTrending,
  setActiveTrending,
  activeFresh,
  setActiveFresh,
}) {
  function handleHome() {
    setFiltered("");
    setActiveHome(true);
    setActiveTop(false);
    setActiveTrending(false);
    setActiveFresh(false);
    setActive("commentsCount");
    setSavedPostsFiltered(false);
    setTitle("9GAG - Home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function handleTop() {
    setFiltered("");
    setActiveHome(false);
    setActiveTop(true);
    setActiveTrending(false);
    setActiveFresh(false);
    setActive("upVoteCount");
    setSavedPostsFiltered(false);
    setTitle("9GAG - Top");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function handleTrending() {
    setFiltered("");
    setActiveHome(false);
    setActiveTop(false);
    setActiveTrending(true);
    setActiveFresh(false);
    setActive("totalVoteCount");
    setSavedPostsFiltered(false);
    setTitle("9GAG - Trading");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function handleFresh() {
    setFiltered("");
    setActiveHome(false);
    setActiveTop(false);
    setActiveTrending(false);
    setActiveFresh(true);
    setActive("creationTs");
    setSavedPostsFiltered(false);
    setTitle("9GAG - Fresh");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return (
    <nav className="nav-bar">
      <ul className="nav-list">
        <li>
          <Button
            type={`btn ${activeHome && !filtered ? "btn-active" : ""}`}
            clickCallback={() => handleHome()}
          >
            Home
          </Button>
        </li>
        <li>
          <Button
            type={`btn ${activeTop && !filtered ? "btn-active" : ""}`}
            clickCallback={() => handleTop()}
          >
            Top
          </Button>
        </li>
        <li>
          <Button
            type={`btn ${activeTrending && !filtered ? "btn-active" : ""}`}
            clickCallback={() => handleTrending()}
          >
            Trending
          </Button>
        </li>
        <li>
          <Button
            type={`btn ${activeFresh && !filtered ? "btn-active" : ""}`}
            clickCallback={() => handleFresh()}
          >
            Fresh
          </Button>
        </li>
      </ul>
    </nav>
  );
}

function Action({
  setLoginMenuOpen,
  loginMenuOpen,
  isLogged,
  loggedInMenuOpen,
  setLoggedInMenuOpen,
  setPostMenuOpen,
  setSearchOpen,
  loggedUser,
}) {
  function handleOpenLoginMenu() {
    setLoginMenuOpen(!loginMenuOpen);
    setSearchOpen(false);
  }
  function handleOpenLoggedInMenu() {
    setLoggedInMenuOpen(!loggedInMenuOpen);
    setSearchOpen(false);
    setPostMenuOpen(false);
  }
  function handleOpenPostMenu() {
    setPostMenuOpen((prev) => !prev);
    setSearchOpen(false);
    setLoggedInMenuOpen(false);
  }

  function handleOpenSearch() {
    setSearchOpen((prev) => !prev);
    setLoginMenuOpen(false);
    setLoggedInMenuOpen(false);
    setPostMenuOpen(false);
  }
  return (
    <div className="action">
      <Button clickCallback={() => handleOpenSearch()}>
        <ion-icon name="search-outline"></ion-icon>
      </Button>
      {!isLogged ? (
        <Button clickCallback={() => handleOpenLoginMenu()}>
          <span className="log-in">Log in</span>
        </Button>
      ) : (
        <Button
          type="open-logged-in"
          clickCallback={() => handleOpenLoggedInMenu()}
        >{`${loggedUser.fullName[0]}${
          loggedUser.fullName.split(" ")[1][0]
        }`}</Button>
      )}
      {isLogged && (
        <Button type="post" clickCallback={() => handleOpenPostMenu()}>
          Post
        </Button>
      )}
    </div>
  );
}
