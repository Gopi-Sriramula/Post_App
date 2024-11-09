import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import urls, { ApiStatus } from "./urls";
import fetchData2 from "./fetchData2";
import { Spin } from "antd";

const PostsList = function () {
  const { apiStatus, data } = useSelector((state) => state.c);
  const dispatch = useDispatch();
  useEffect(() => {
    (async function () {
      dispatch({
        type: "postslist",
        payload: { apiStatus: ApiStatus.pending, data: null },
      });
      const httpConfig = {
        url: urls.postsList,
        method: "GET",
      };
      const { success, data } = await dispatch(fetchData2(httpConfig));
      if (success) {
        dispatch({
          type: "postslist",
          payload: { apiStatus: ApiStatus.success, data: data },
        });
      } else {
        dispatch({
          type: "postslist",
          payload: { apiStatus: ApiStatus.error, data: null },
        });
      }
    })();
  }, []);
  if (apiStatus === "init" || apiStatus === ApiStatus.pending) {
    return (
      <div className="spin">
        <Spin size="large" />
      </div>
    );
  }
  return (
    <div className="posts">
      {data !== null && data.map((item) => <Post item={item} key={item._id} />)}
    </div>
  );
};
const Post = function ({ item }) {
  const [state, setState] = useState(false);
  const { apiStatus, id, data } = useSelector((state) => state.d);
  const dispatch = useDispatch();
  const onClick = async function () {
    setState(!state);
    if (item._id !== id && !state) {
      console.log(1);
      dispatch({
        type: "comments",
        payload: { apiStatus: ApiStatus.pending, id: undefined, data: null },
      });
      const httpConfig = {
        url: urls.commentsList,
        method: "GET",
        params: { postId: item._id },
      };
      const { success, data } = await dispatch(fetchData2(httpConfig));
      if (success) {
        dispatch({
          type: "comments",
          payload: {
            apiStatus: ApiStatus.success,
            id: item._id,
            data: data.comments,
          },
        });
      } else {
        dispatch({
          type: "comments",
          payload: { apiStatus: ApiStatus.error, id: undefined, data: null },
        });
      }
    }
  };
  return (
    <div className="post">
      <h2>{item.title}</h2>
      <p>{item.content}</p>
      <div className="likesComments">
        <div>
          <span className="material-icons">thumb_up</span>
          <span>{item.likesCount}</span>
        </div>
        <div>
          <span className="material-icons" onClick={onClick}>
            comment
          </span>
          <span>{item.commentsCount}</span>
        </div>
      </div>
      {state && (
        <div>
          {data === null || !data[0] ? <h2>No Comments</h2> : <h2>Comments</h2>}
        </div>
      )}
    </div>
  );
};
export default PostsList;
