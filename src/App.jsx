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

    document.getElementById(
      "video_embed"
    ).src = `https://youtube.com/embed/${youtubeID}`;
  };

  return (
    <div className="app">
      <span className="logo">
        youtube2mp4 by erhan polat
      </span>
      <section className="content">
        <h1 className="content_title">YouTube Video İndirici</h1>
        <h2 className="content_description">
          Saniyeler içinde YouTube videolarını indir!
        </h2>
        <p className="content_description" style={{ fontSize: 15 }}>
          (Şu anlık sadece 720p indirme yapabiliyoruz.)
        </p>
        <p>
          Ses olarak mı lazım? 
          <a style={{color: "yellow"}} href="https://yt2mp3.erhanpolat.net"> MP3 İndirme servisini </a> 
          kullanabilirsiniz.
        </p>

        <form onSubmit={handleSubmit} className="form">
          <input
            ref={inputUrlRef}
            placeholder="Video linkini yapıştır..."
            className="form_input"
            type="text"
          />
          <button type="submit" className="form_button">
            Dönüştür
          </button>
        </form>

        <iframe
          id="video_embed"
          width="600"
          height="400"
          src=""
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
          style={{ marginBottom: "50px" }}
        ></iframe>

        {urlResult ? (
          <a
            target="_blank"
            rel="noreferrer"
            href={urlResult}
            className="btn btn-success download_btn"
            style={{ marginBottom: "50px", width: "590px" }}
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
