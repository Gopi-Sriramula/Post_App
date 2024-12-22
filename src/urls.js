const baseUrl = "https://node-auth-jwt-w78c.onrender.com";
export const urls = {
     login:`${baseUrl}/auth/login`,
     signup:`${baseUrl}/auth/signup`,
     userInfo:`${baseUrl}/user/info`,
     posts:`${baseUrl}/post/all`,
     createPost:`${baseUrl}/post/create`,
     commentsList:`${baseUrl}/post/comments`,
     suggestions:`${baseUrl}/user/suggestions`,
     followers:`${baseUrl}/user/followers`,
     followings:`${baseUrl}/user/following`,
     follow:`${baseUrl}/user/follow`,
     unfollow:`${baseUrl}/user/unfollow`,
}
export const status = {
     init:"init",
     pending:"pending",
     success:"success",
     error:"error",
};
