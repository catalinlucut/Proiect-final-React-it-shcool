import "./Post.css";
import Button from "./Button";
import Multiselect from "multiselect-react-dropdown";
import { useState } from "react";
import moment from "moment/moment";
import { Wrap } from "./Wrap";

export function Post({ interests, setPosts, setPostMenuOpen, postMenuOpen }) {
  const [postInterests, setPostInterests] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostUrl, setNewPostUrl] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setPosts((posts) => [
      ...posts,
      {
        title: newPostTitle,
        interests: [...postInterests],
        creationTs: moment().unix(),
        images: {
          image700: { url: newPostUrl },
        },
        upVoteCount: 0,
        downVoteCount: 0,
        commentsCount: Date.now(),
        id: `${Date.now()}`,
      },
    ]);
    setPostMenuOpen(false);
  }

  function onSelect(selectedList, selectedItem) {
    setPostInterests((interests) => [...interests, selectedItem.value]);
  }

  function onRemove() {}
  console.log(interests);

  return (
    <Wrap
      onClickOutside={() => setPostMenuOpen(false)}
      show={postMenuOpen}
      type="wrap-post"
    >
      <form className="post-form" onSubmit={handleSubmit}>
        <div>
          <h4>What's the title?</h4>
          <input
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
          />
        </div>
        <div>
          <h4>Select interests</h4>
          <Multiselect
            options={interests} // Options to display in the dropdown
            // selectedValues={interests[0]} // Preselected value to persist in dropdown
            onSelect={onSelect} // Function will trigger on select event
            onRemove={onRemove} // Function will trigger on remove event
            displayValue="value" // Property name to display in the dropdown options
          />
          {/* <select
          name="select"
          required
          multiple="true"
          multiselect-search="true"
        >
          {interests.map((interest, i) => (
            <option>{interest.title}</option>
          ))}
        </select> */}
        </div>
        <div>
          <h4>Provide an image url</h4>
          <input
            value={newPostUrl}
            onChange={(e) => setNewPostUrl(e.target.value)}
          />
        </div>
        <Button type="submit" clickCallback={(e) => e}>
          Submit Post
        </Button>
      </form>
    </Wrap>
  );
}
