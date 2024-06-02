import { useCallback, useEffect, useState } from "react";
import "./App.css";
const host = process.env.REACT_APP_FILES_HOST;

function App() {
  const [currentPath, setCurrentPath] = useState([]);

  const [dirSrc, setDirSrc] = useState([]);
  const [imageSrc, setImageSrc] = useState([]);

  const getimagesSrc = useCallback(async () => {
    if (!host) return { dir: [], img: [] };
    let path = currentPath.join("/");
    if (path[path.length - 1] !== "/") {
      path += "/";
    }
    const url = `${host}/${path}`;
    const res = await fetch(url);
    if (!res.ok) {
      return { dir: [], img: [] };
    }
    const htmlString = await res.text();

    const parser = new DOMParser();

    const doc = parser.parseFromString(htmlString, "text/html");

    const anchors = doc.querySelectorAll("a");

    const srcList = Array.from(anchors)
      .map((anchor) => {
        const href = anchor.getAttribute("href");

        if (!href) return null;
        if (currentPath.length === 0 && href === "../") return null;
        const isAsset = href.includes(".") && href !== "../";
        return {
          type: isAsset ? "img" : "dir",
          uri: href,
        };
      })
      .filter(Boolean);
    const srcDict = srcList.reduce(
      (dict, src) => {
        if (src.type === "img") {
          dict.img.push(url + src.uri);
        }
        if (src.type === "dir") {
          dict.dir.push(src.uri);
        }
        return dict;
      },
      { img: [], dir: [] }
    );

    return srcDict;
  }, [currentPath]);

  useEffect(() => {
    const handleAsync = async () => {
      const data = await getimagesSrc();
      setDirSrc(data.dir);
      setImageSrc(data.img);
    };
    handleAsync();
  }, [getimagesSrc]);

  return (
    <div className="App">
      <div className="path-container">
        <h1>{currentPath.join("/")}</h1>
      </div>
      <div className="dir-container">
        {dirSrc.map((src, i) => {
          return (
            <button
              key={i}
              onClick={() => {
                if (src === "../") {
                  setCurrentPath((prevState) => {
                    return [...prevState.slice(0, -1)];
                  });
                } else {
                  setCurrentPath((prevState) => {
                    return [...prevState, src];
                  });
                }
              }}
            >
              {src}
            </button>
          );
        })}
      </div>
      <div className="img-container">
        {imageSrc.map((src, i) => {
          return <img alt="" key={i} src={src} />;
        })}
      </div>
    </div>
  );
}

export default App;
