export function handleSave() {
  if (typeof window !== "undefined" && window.localStorage) {
    if (
      !localStorage.getItem("currentUser") &&
      !localStorage.getItem("comments")
    ) {
      const res = require("../data/data.json");
      localStorage.setItem("currentUser", JSON.stringify(res.currentUser));
      localStorage.setItem("comments", JSON.stringify(res.comments));
    }
  }
}
