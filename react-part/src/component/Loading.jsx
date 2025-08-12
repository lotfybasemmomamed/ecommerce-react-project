


export default function Loading({
  size = 48,
  border = 5,
  color = "#FFF",
  duration = "1s",
}) {
  const cssVars = {
    "--loader-size": `${size}px`,
    "--loader-border": `${border}px`,
    "--loader-color": color,
    "--loader-duration": duration,
  };

  return (
    <>
      <span className="loader" style={cssVars} aria-hidden="true" />
      <style>{`
        .loader {
          width: var(--loader-size);
          height: var(--loader-size);
          border: var(--loader-border) solid var(--loader-color);
          border-bottom-color: transparent;
          border-radius: 50%;
          display: inline-block;
          box-sizing: border-box;
          animation: rotation var(--loader-duration) linear infinite;
        }

        @keyframes rotation {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
