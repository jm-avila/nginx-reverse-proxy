export function Navigation({ autoPlay, updateAutoPlay, dirSrc, updatePath }) {
  return (
    <div className="dir-container">
      <button onClick={updateAutoPlay}>{autoPlay ? "List" : "Autoplay"}</button>
      {dirSrc.map((src, i) => {
        return (
          <button key={i} onClick={() => updatePath(src)}>
            {src}
          </button>
        );
      })}
    </div>
  );
}
