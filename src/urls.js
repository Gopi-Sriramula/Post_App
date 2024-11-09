const baseUrl = "https://node-auth-jwt-w78c.onrender.com";
const urls = {
    login:`${baseUrl}/auth/login`,
    signup:`${baseUrl}/auth/signup`,
    userInfo:`${baseUrl}/user/info`,
    postsList:`${baseUrl}/post/all`,
    commentsList:`${baseUrl}/post/comments`,
    createPost:`${baseUrl}/post/create`,
    suggestionsList:`${baseUrl}/user/suggestions`,
    followersList:`${baseUrl}/user/followers`,
    followingsList:`${baseUrl}/user/following`,
    follow:`${baseUrl}/user/follow`,
    unfollow:`${baseUrl}/user/unfollow`
}
export default urls;
export const ApiStatus = {
    pending:"pending",
    success:"success",
    error:"error",
}