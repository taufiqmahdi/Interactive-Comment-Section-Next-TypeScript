const handleRemove = (props: string) => {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.removeItem(props);
  }
};

export default handleRemove;
