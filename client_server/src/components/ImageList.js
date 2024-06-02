export function ImageList({ imageSrc }) {
  return (
    <div className="img-container">
      {imageSrc.map((src, i) => {
        return <img alt="" key={i} src={src} />;
      })}
    </div>
  );
}
