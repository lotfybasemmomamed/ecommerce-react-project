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
      <div className="loader-overlay">
        <span className="loader" style={cssVars} aria-hidden="true" />
      </div>

      <style>{`
        .loader-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.1); 
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999; 
        }

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
