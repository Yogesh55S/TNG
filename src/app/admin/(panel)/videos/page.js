import ConfirmButton from "@/components/admin/ConfirmButton";
import Notice from "@/components/admin/Notice";
import { getServices, getVideos } from "@/lib/content";
import { deleteVideo, saveVideo } from "../../actions";

const ERRORS = {
  url: "That link can't be played. Use an https link from YouTube or Vimeo, or a direct .mp4 or .webm file.",
  fields: "Please add the customer name and quote.",
};

function VideoFields({ video, services }) {
  const key = video?.id || "new";
  return (
    <>
      <div className="row one"><div>
        <label htmlFor={`url-${key}`}>Video link</label>
        <input id={`url-${key}`} name="url" type="url" defaultValue={video?.url} required placeholder="https://www.youtube.com/watch?v=..." />
      </div></div>
      <div className="row">
        <div>
          <label htmlFor={`name-${key}`}>Customer name</label>
          <input id={`name-${key}`} name="name" defaultValue={video?.name} required maxLength={80} />
        </div>
        <div>
          <label htmlFor={`service-${key}`}>Service used</label>
          <select id={`service-${key}`} name="service" defaultValue={video?.service}>
            {services.map((s) => (
              <option key={s.id}>{s.title}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="row one"><div>
        <label htmlFor={`quote-${key}`}>Short quote from the video</label>
        <input id={`quote-${key}`} name="quote" defaultValue={video?.quote} required maxLength={300} />
      </div></div>
    </>
  );
}

export default async function VideosAdminPage({ searchParams }) {
  const [videos, services] = await Promise.all([getVideos(), getServices()]);
  return (
    <>
      <h1 className="adm-title">Video Reviews</h1>
      <p className="adm-sub">Paste a video link. The home page section appears once there is at least one video.</p>
      <Notice saved={searchParams.saved} error={ERRORS[searchParams.error]} />
      <form className="adm-card" action={saveVideo}>
        <h2>Add a video</h2>
        <VideoFields services={services} />
        <button className="btn btn-primary">Add Video</button>
      </form>
      {videos.map((video) => (
        <div className="adm-card" key={video.id}>
          <h2>{video.name}</h2>
          <form action={saveVideo}>
            <input type="hidden" name="id" value={video.id} />
            <VideoFields video={video} services={services} />
            <button className="btn btn-primary btn-sm">Save Video</button>
          </form>
          <form action={deleteVideo} style={{ marginTop: 10 }}>
            <input type="hidden" name="id" value={video.id} />
            <ConfirmButton message="Remove this video from the website?">Delete Video</ConfirmButton>
          </form>
        </div>
      ))}
    </>
  );
}
