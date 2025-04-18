import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";
import Spinner from "@/components/Spinner";

export default function Gallery() {
  const { alldata, loading } = useFetchData("/api/courses");

  return (
    <>
      <Head>
        <title>Talha - Classroom</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="shortcut icon"
          type="image/png"
          href="/img/mee.png"
        />
      </Head>

      <div className="gallerypage">
        <div className="container">
          <div className="gallerytopsec">
            <div className="topphonesec">
              <div className="lefttitlesec" data-aos="fade-left">
                <h4>Welcome</h4>
                <h1>
                  Talha <br /> Classroom
                </h1>
                <Link href="/gallery#galleryimages">
                  <button className="view-button">VIEW MORE</button>
                </Link>
              </div>

              <div className="rightimgsec" data-aos="fade-right">
                <img
                  src="/img/pic.png"
                  alt="Main project showcase"
                  className="featured-image"
                />

                <div className="r_img_top" data-aos="fade-right">
                  <img
                    src="/img/artificial-intelligence-classroom.jpg"
                    alt="Secondary showcase"
                    className="featured-image"
                  />

                  <img
                    src="/img/pic2.jpg"
                    alt="Additional showcase"
                    className="featured-image"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className="gallerybtmphotos"
            id="galleryvideos"
            data-aos="fade-up"
          >
            <div className="container">
              <div className="gbtmtitles text-center">
                <h3>
                  <span>Video Learning</span>
                </h3>
                <h2>
                  <span>Never Stop Learning</span> <br />
                </h2>
              </div>

              <div className="gallery_image_grid">
                {loading ? (
                  <Spinner />
                ) : alldata && alldata.length > 0 ? (
                  alldata.map((course) => (
                    <div className="image-item" key={course._id}>
                      {course.videos && course.videos.length > 0 ? (
                        <video
                          src={course.videos[0]}
                          controls
                          width="100%"
                          style={{ borderRadius: "10px" }}
                        />
                      ) : (
                        <p>No video available.</p>
                      )}
                      <div className="galeryimgiteminfo">
                        <h2>{course.title}</h2>
                        <p>by {course.instructor || "Vbm coder"}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No video courses found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
