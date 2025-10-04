function Image({ children, ...props }: any) {
  return <img src={children} alt="" {...props} />;
}
export default Image;
