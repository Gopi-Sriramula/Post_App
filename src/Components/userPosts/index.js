import React, { useEffect, useState } from "react";
import { status, urls } from "../../Urls";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { commentsData, postsData } from "../../store";
import { fetchData } from "../../Functions/fetchData";
function Posts() {
  const dispatch = useDispatch();
  const bool = useSelector((state) => state.b.bool);
  const { ApiStatus, data } = useSelector((state) => state.c);
  useEffect(() => {
    if (bool) {
      (async function () {
        const httpsConfig = {
          url: urls.posts,
          method: "GET",
        };
        dispatch(postsData({ status: status.pending, data: null }));
        const { success, data } = await fetchData(httpsConfig);
        dispatch(
          postsData({
            status: success ? status.success : status.error,
            data: success ? data.data : null,
          })
        );
      })();
    }
  }, [bool]);
  if (ApiStatus === status.init || ApiStatus === status.pending) {
    return <h3>Loading...</h3>;
  }
  return (
    <div className="posts">
      {data.map((item) => {
        return (
          <Comments item={item} key={item._id}/>
        );
      })}
    </div>
  );
}
const Comments = function ({item}) {
  const dispatch = useDispatch();
  const postId = useSelector(state=>state.d.data[item._id])
  const [state,setState] = useState(false);
  const onClick = async function(){
    setState(!state);
    if(item._id!==postId?.postId){
      console.log(1)
      const httpsConfig = {
        url:urls.commentsList,
        method:"GET",
        params:{postId:item._id},
      }
      dispatch(commentsData({postId:item._id,ApiStatus:status.pending,data:null}))
      const {success,data} = await fetchData(httpsConfig);
      if(success){
        dispatch(commentsData({postId:item._id,data,ApiStatus:status.success,data:data.data.comments}))
      }
    }
  }
  return (
    <div className="postData" key={item._id}>
      <h2>{item.title}</h2>
      <p>{item.content}</p>
      <div className="postActions">
        <div>
          <span className="material-icons" onClick={onClick}>comment</span>
          <span>{item.commentsCount}</span>
        </div>
        <div>
          <span className="material-icons">thumb_up</span>
          <span>{item.likesCount}</span>
        </div>
      </div>
      {(state && postId?.postId===item._id) && (postId?.data?.length>0?<h2>Comments</h2>:<h2>No Comments</h2>)}
    </div>
  );
};
export default Posts;
