const handleLoad = () => {
  let currentUserData, commentsData;

  if (typeof window !== "undefined" && window.localStorage) {
    if (
      !localStorage.getItem("currentUser") &&
      !localStorage.getItem("comments")
    ) {
      const res = require("../data/data.json");
      localStorage.setItem("currentUser", JSON.stringify(res.currentUser));
      localStorage.setItem("comments", JSON.stringify(res.comments));
    }
    currentUserData = JSON.parse(localStorage.getItem("currentUser") ?? "{}");
    commentsData = JSON.parse(localStorage.getItem("comments") ?? "{}");
  }

  return { currentUserData, commentsData };
};

export default handleLoad;
