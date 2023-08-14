import "./Main.css";
import Button from "./Button";
import { useState } from "react";
import moment from "moment/moment";
import { Wrap } from "./Wrap";

export default function Main({
  setTitle,
  isOpen,
  setIsOpen,
  isLogged,
  posts,
  interests,
  filtered,
  setFiltered,
  search,
  active,
  loggedUser,
  commentSectionOpen,
  setCommentSectionOpen,
  savedPosts,
  setSavedPosts,
  savedPostsFiltered,
  setSavedPostsFiltered,
}) {
  return (
    <main className="main">
      <>
        <Aside
          setTitle={setTitle}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          interests={interests}
          filtered={filtered}
          setFiltered={setFiltered}
          isLogged={isLogged}
          setSavedPostsFiltered={setSavedPostsFiltered}
        />
      </>
      <Feed
        posts={posts}
        filtered={filtered}
        isLogged={isLogged}
        search={search}
        active={active}
        loggedUser={loggedUser}
        commentSectionOpen={commentSectionOpen}
        setCommentSectionOpen={setCommentSectionOpen}
        savedPosts={savedPosts}
        setSavedPosts={setSavedPosts}
        savedPostsFiltered={savedPostsFiltered}
      />
    </main>
  );
}

function Feed({
  posts,
  filtered,
  isLogged,
  search,
  active,
  loggedUser,
  commentSectionOpen,
  setCommentSectionOpen,
  savedPosts,
  setSavedPosts,
  savedPostsFiltered,
}) {
  return (
    <div className="feed">
      {savedPostsFiltered
        ? savedPosts
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.title.toLowerCase().includes(search);
            })
            .map((post) => (
              <Article
                post={post}
                key={post.id}
                isLogged={isLogged}
                loggedUser={loggedUser}
                commentSectionOpen={commentSectionOpen}
                setCommentSectionOpen={setCommentSectionOpen}
                savedPosts={savedPosts}
                setSavedPosts={setSavedPosts}
              />
            ))
        : filtered
        ? posts
            .filter((el) => el.interests.includes(filtered))
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.title.toLowerCase().includes(search);
            })
            .map((post) => (
              <Article
                post={post}
                key={post.id}
                isLogged={isLogged}
                loggedUser={loggedUser}
                commentSectionOpen={commentSectionOpen}
                setCommentSectionOpen={setCommentSectionOpen}
                savedPosts={savedPosts}
                setSavedPosts={setSavedPosts}
              />
            ))
        : posts
            .sort((a, b) => b[active] - a[active])
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.title.toLowerCase().includes(search);
            })
            .map((post) => (
              <Article
                post={post}
                key={post.id}
                isLogged={isLogged}
                loggedUser={loggedUser}
                setCommentSectionOpen={setCommentSectionOpen}
                commentSectionOpen={commentSectionOpen}
                savedPosts={savedPosts}
                setSavedPosts={setSavedPosts}
              />
            ))}
    </div>
  );
}

function Article({
  post,
  isLogged,
  loggedUser,
  commentSectionOpen,
  setCommentSectionOpen,
  setSavedPosts,
  savedPosts,
}) {
  const [upVote, setUpVote] = useState(post.upVoteCount);
  const [downVote, setDownVote] = useState(post.downVoteCount);
  const [upVotePainted, setUpVotePainted] = useState(false);
  const [downVotePainted, setDownVotePainted] = useState(false);
  const [savedPostPainted, setSavedPostPainted] = useState(false);

  function handleUpVote() {
    if (isLogged) {
      setUpVote(upVotePainted ? upVote - 1 : upVote + 1);
      setUpVotePainted(!upVotePainted);
      if (downVotePainted) {
        setDownVotePainted(!downVotePainted);
        setDownVote(downVote - 1);
      }
    } else alert("Please Login!");
  }

  function handleDownVote() {
    if (isLogged) {
      setDownVote(downVotePainted ? downVote - 1 : downVote + 1);
      setDownVotePainted(!downVotePainted);
      if (upVotePainted) {
        setUpVotePainted(!upVotePainted);
        setUpVote(upVote - 1);
      }
    } else alert("Please Login!");
  }

  function handleOpenComments() {
    if (isLogged) {
      setCommentSectionOpen((prev) => !prev);
    } else alert("Please Login!");
  }

  function handleSavePost() {
    if (isLogged) {
      if (!savedPosts.map((item) => item.title).includes(post.title)) {
        setSavedPosts((prev) => [
          ...prev,
          {
            title: post.title,
            interests: [...post.interests],
            creationTs: post.creationTs,
            images: {
              image700: { url: post.images.image700.url },
            },
            upVoteCount: upVote,
            downVoteCount: downVote,
            commentsCount: post.commentsCount,
            id: post.id,
          },
        ]);
        console.log(savedPosts);
      } else {
        setSavedPosts((prev) => prev.filter((item) => item.id !== post.id));
        console.log(savedPosts);
      }
    } else alert("Please Login!");
    setSavedPostPainted((prev) => !prev);
  }

  return (
    <article className="article">
      <div className="article-category">
        <span className="categories">
          {post.interests.map((interest, i) => (
            <span className="category" key={i}>
              {interest}
            </span>
          ))}
        </span>
        <span>{moment.unix(post.creationTs).format("MM/DD/YYYY hh:mm A")}</span>
      </div>
      <p className="article-title">{post.title}</p>
      <div className="article-img">
        <img src={post.images.image700.url} alt={post.title} />
      </div>
      <div className="article-action">
        <div className="vote-and-comment">
          <div className="up-vote">
            <Button clickCallback={() => handleUpVote()}>
              <span
                className={`material-symbols-outlined ${
                  upVotePainted && isLogged ? "voted" : ""
                }`}
              >
                shift
              </span>
            </Button>
            <p className="vote-count">{upVote}</p>
          </div>
          <div className="down-vote">
            <Button clickCallback={() => handleDownVote()}>
              <span
                className={`material-symbols-outlined ${
                  downVotePainted && isLogged ? "voted" : ""
                }`}
              >
                shift
              </span>
            </Button>
            <p className="vote-count">{downVote}</p>
          </div>
          <Button
            type={"chat-bubble"}
            clickCallback={() => handleOpenComments()}
          >
            <span className="material-symbols-outlined">chat_bubble</span>
          </Button>
          <Button
            type={`bookmark ${savedPostPainted && isLogged ? "voted" : ""}`}
            clickCallback={() => handleSavePost()}
          >
            <span className="material-symbols-outlined">bookmark</span>
          </Button>
        </div>
        <div className="social-media">
          <ion-icon name="logo-whatsapp"></ion-icon>
          <ion-icon name="logo-facebook"></ion-icon>
          <div className="share-post">
            <ion-icon name="share-outline"></ion-icon>
            <p className="share">Share</p>
          </div>
        </div>
      </div>
      {commentSectionOpen && <Comments loggedUser={loggedUser} />}
    </article>
  );
}

function Comments({ loggedUser }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentIndex, setCommentIndex] = useState(null);

  function handleSumbitComment(e) {
    e.preventDefault();

    if (commentIndex !== null) {
      let commentsCopy = comments;
      commentsCopy.forEach((comm, i) => {
        if (i === commentIndex) {
          commentsCopy[i].text = comment;
        }
      });

      setComments(commentsCopy);
      setCommentIndex(null);
      setComment("");
      return;
    }

    setComments((comments) => [
      ...comments,
      { text: comment, date: moment().format("MMMM Do YYYY, h:mm:ss a") },
    ]);
    setComment("");
  }

  function handleDeleteComment(text) {
    setComments((comments) =>
      comments.filter((comment) => comment.text !== text)
    );
  }

  function handleEdit(text) {
    comments.map((comment, i) => {
      if (comment.text === text) {
        setComment(text);
        setCommentIndex(i);
      }
      return comment;
    });
  }

  return (
    <div className="article-comment-section">
      <form onSubmit={handleSumbitComment}>
        <input
          type="text"
          placeholder="Leave a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </form>
      <ul className="comments">
        {comments
          .map((comment, i) => (
            <Comment
              key={i}
              comments={comments}
              onDeleteComment={handleDeleteComment}
              comment={comment}
              onEdit={handleEdit}
              loggedUser={loggedUser}
            />
          ))
          .sort(() => -1)}
      </ul>
    </div>
  );
}

function Comment({ comment, onDeleteComment, onEdit, loggedUser }) {
  return (
    <li>
      <div className="username">
        <span className="username-logo">{`${loggedUser.fullName[0]} ${
          loggedUser.fullName.split(" ")[1][0]
        }`}</span>
        <span className="username-name">{loggedUser.fullName}</span>
      </div>
      <div className="comment-body">
        <p>{comment.text}</p>
        <div className="comment-details">
          <div className="comment-time">{comment.date}</div>
          <div className="comment-action">
            <Button type="edit" clickCallback={() => onEdit(comment.text)}>
              <ion-icon name="create-outline"></ion-icon>
            </Button>
            <Button
              type="remove"
              clickCallback={() => onDeleteComment(comment.text)}
            >
              <ion-icon name="trash-outline"></ion-icon>
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
}

function Aside({
  setTitle,
  isOpen,
  setIsOpen,
  interests,
  filtered,
  setFiltered,
  setSavedPostsFiltered,
}) {
  const [pinned, setPinned] = useState([]);
  const [activePin, setActivePin] = useState(null);

  function addPinned(item) {
    setPinned([...new Set([...pinned, item])]);
    setActivePin(item);
  }

  function deletePinned(item) {
    setPinned(pinned.filter((el) => el !== item));
    if (activePin === item) setActivePin(null);
  }

  function handleFilter(interest) {
    setFiltered(interest);
    setSavedPostsFiltered(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTitle(`9GAG - ${interest}`);
  }
  return isOpen ? (
    <Wrap
      onClickOutside={() => setIsOpen(false)}
      show={isOpen}
      type="wrap-interests"
    >
      <div className="menu">
        <div className="interests">
          {pinned.length ? (
            <div>
              <h3 className="interests-title">Pinned Interests</h3>
              <ul className="intrests-list">
                {pinned.map((interest) => (
                  <li
                    className={`intrests-item ${
                      filtered === interest.value ? "active-filter" : ""
                    }`}
                    key={interest.value}
                  >
                    <div>
                      <ion-icon name={interest.icon}></ion-icon>
                      <Button
                        clickCallback={() => handleFilter(interest.value)}
                      >
                        <span>{interest.title}</span>
                      </Button>
                    </div>
                    <Button clickCallback={() => deletePinned(interest)}>
                      <span className="material-symbols-outlined active-pin">
                        push_pin
                      </span>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <div>
            <h3 className="interests-title">Interests</h3>
            <ul className="intrests-list">
              {interests.map((interest) => (
                <li
                  className={`intrests-item ${
                    filtered === interest.value ? "active-filter" : ""
                  }`}
                  key={interest.value}
                >
                  <div>
                    <ion-icon name={interest.icon}></ion-icon>
                    <Button clickCallback={() => handleFilter(interest.value)}>
                      <span>{interest.title}</span>
                    </Button>
                  </div>
                  <Button clickCallback={() => addPinned(interest)}>
                    <span
                      className={`material-symbols-outlined ${
                        pinned.includes(interest) ? "active-pin" : ""
                      }`}
                    >
                      push_pin
                    </span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Wrap>
  ) : null;
}
