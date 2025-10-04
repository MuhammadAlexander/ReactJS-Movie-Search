function Button({ children, ...props }: any) {
  return (
    <button className="bg-slate-500 text-cyan-300" {...props}>
      {children}
    </button>
  );
}
export default Button;
