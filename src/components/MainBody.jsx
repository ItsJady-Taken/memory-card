function Body({ children }) {
  if (children) {
    return <main>{children}</main>;
  }
  return;
}

export default Body;
