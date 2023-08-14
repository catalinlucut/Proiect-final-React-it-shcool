import Button from "./Button";
import "./LoggedIn.css";
import { Wrap } from "./Wrap";

export function LoggedIn({
  setTitle,
  setIsLogged,
  loggedInMenuOpen,
  setLoggedInMenuOpen,
  setCommentSectionOpen,
  loggedUser,
  setSavedPostsFiltered,
  setFiltered,

  setActiveHome,
  setActiveTop,
  setActiveTrending,
  setActiveFresh,
}) {
  function handleLogOut() {
    setIsLogged((isLogged) => !isLogged);
    setLoggedInMenuOpen(false);
    setCommentSectionOpen(false);
    setSavedPostsFiltered(false);
  }

  function handleSavedPosts() {
    setSavedPostsFiltered(true);
    setLoggedInMenuOpen(false);
    setFiltered("");
    setTitle("9GAG - Saved Posts");
    setActiveHome(false);
    setActiveTop(false);
    setActiveTrending(false);
    setActiveFresh(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return (
    <Wrap
      onClickOutside={() => setLoggedInMenuOpen(false)}
      show={loggedInMenuOpen}
      type="wrap-logged-in"
    >
      <div className="logged-in-container">
        <h3>{loggedUser.fullName}</h3>
        <Button type="save-post" clickCallback={() => handleSavedPosts()}>
          Saved Posts
        </Button>
        <Button type="log-out" clickCallback={() => handleLogOut()}>
          Log out
        </Button>
      </div>
    </Wrap>
  );
}
