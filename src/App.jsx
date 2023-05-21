import axios from "axios";
import { useRef, useState } from "react";
import { youtube_parser } from "./utils";

function App() {
  const inputUrlRef = useRef();
  const [urlResult, setUrlResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const youtubeID = youtube_parser(inputUrlRef.current.value);

    const options = {
      method: "GET",
      url: "https://ytstream-download-youtube-videos.p.rapidapi.com/dl",
      params: { id: youtubeID },
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
        "X-RapidAPI-Host": "ytstream-download-youtube-videos.p.rapidapi.com",
      },
    };
    axios(options)
      .then((res) => setUrlResult(res.data.formats[2].url))
      .catch((err) => console.log(err));

    inputUrlRef.current.value = "";
  };

  return (
    <div className="app">
      <span className="logo">
        youtube2mp4 by{" "}
        <a
          href="https://erhanpolat.net"
          style={{ textDecoration: "none", color: "white" }}
        >
          erhan polat
        </a>
      </span>
      <section className="content">
        <h1 className="content_title">YouTube Video İndirici</h1>
        <p className="content_description">
          Saniyeler içinde YouTube videolarını indir!
        </p>
        <p className="content_description" style={{fontSize: 15}}>
          (Şu anlık sadece 720p çözünürlük için hizmet verebiliyoruz.)
        </p>

        <form onSubmit={handleSubmit} className="form">
          <input
            ref={inputUrlRef}
            placeholder="Video linkini yapıştır..."
            className="form_input"
            type="text"
          />
          <button type="submit" className="form_button">
            Ara
          </button>
        </form>

        {urlResult ? (
          <a
            target="_blank"
            rel="noreferrer"
            href={urlResult}
            className="download_btn"
          >
            720p indir
          </a>
        ) : (
          ""
        )}
      </section>
    </div>
  );
}

export default App;
