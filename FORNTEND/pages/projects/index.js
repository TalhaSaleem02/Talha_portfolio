import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { GoArrowUpRight } from "react-icons/go";
import Spinner from "@/components/Spinner";

export default function Projects() {
  const [alldata, setAlldata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/projects?slug=${slug}");
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setAlldata(data);
      } catch (error) {
        console.error("Error fetching project data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (Array.isArray(alldata)) {
      if (selectedCategory === "All") {
        setFilteredProjects(alldata.filter((pro) => pro.status === "Published"));
      } else {
        setFilteredProjects(
          alldata.filter(
            (pro) =>
              pro.status === "Published" &&
              pro.projectCategory?.[0] === selectedCategory
          )
        );
      }
    } else {
      console.error("alldata is not an array:", alldata);
      setFilteredProjects([]);
    }
  }, [selectedCategory, alldata]);

  return (
    <>
      <Head>
        <title> Talha - Projects</title>
      </Head>
      <div className="projectpage">
        <div className="projects">
          <div className="container">
            <div className="project_titles">
              <h2>My Recent Works</h2>
              <p>
                We put your ideas and thus your wishes in the form of a unique
                web project that inspires you and your customers.
              </p>
            </div>

            {/* Project Filter Buttons */}
            <div className="project_buttons" data-aos="fade-up">
              {["All", "Web Dev", "Data Analyst", "Data Science", "Machine Learning", "Artificial Intelligence Saas"].map(
                (category) => (
                  <button
                    key={category}
                    className={selectedCategory === category ? "active" : ""}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                )
              )}
            </div>

            {/* Project Cards */}
            <div className="projects_cards" data-aos="fade-down">
              {!loading ? (
                filteredProjects.length === 0 ? (
                  <h1>No Project Found</h1>
                ) : (
                  filteredProjects.map((pro) => (
                    <Link href={`/projects/${pro.slug}`} key={pro._id} className="procard">
                      <div className="proimgbox">
                        <img src={pro.images?.[0]} alt={pro.title} />
                      </div>
                      <div className="procontentbox">
                        <h2>{pro.title}</h2>
                        <GoArrowUpRight />
                      </div>
                    </Link>
                  ))
                )
              ) : (
                <div className="flex flex-center wh_100">
                  <Spinner />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
