import Head from "next/head";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaTwitter } from "react-icons/fa";
import { LiaBasketballBallSolid } from "react-icons/lia";
import { GrLinkedinOption } from "react-icons/gr";
import { BiDownload } from "react-icons/bi";
import { FaGithub } from "react-icons/fa6";
import { GoArrowUpRight } from "react-icons/go";
import Spinner from "@/components/Spinner"; // assuming it's a default export
import { MdWorkHistory } from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa6";
import Typewriter from "typewriter-effect";

export default function Home() {


  const [activeIndex, setActiveIndex] = useState(0); // default first item

  const handleHover = (index) => {
    setActiveIndex(index);
  };

  const handleMouseOut = () => {
    setActiveIndex(0); // reset to first item or -1 if you want none active
  };


  // services data
  const services = [
    {
      title: "Data Science",
      description:
        "Transform raw data into actionable insights. I design intelligent pipelines and dashboards using Python, Pandas, and visualization tools to support data-driven decisions."
    },
    {
      title: "Data Analyst",
      description:
        "Uncover patterns and trends in complex data. I analyze and visualize data using SQL, Excel, and BI tools to help organizations make smarter decisions."
    },
    {
      title: "Machine Learning",
      description:
        "Develop predictive models and automation systems using scikit-learn, TensorFlow, and PyTorch—optimizing performance with advanced model tuning."
    },
    {
      title: "Artificial Intelligence",
      description:
        "Build intelligent AI-powered systems such as chatbots, recommenders, and smart applications using AI APIs, cloud services, and NLP techniques."
    },
    {
      title: "Generative AI",
      description:
        "Leverage large language models to create generative applications using OpenAI, Hugging Face, and LangChain for content generation, automation, and chat interfaces."
    },
    {
      title: "Agentic AI",
      description:
        "Design autonomous AI agents capable of planning, decision-making, and self-improvement using frameworks like Auto-GPT, BabyAGI, and ReAct."
    }
  ];

  const [loading, setLoading] = useState(true);
  const [alldata, setAlldata] = useState([]);
  const [allwork, setAllwork] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectResponse = await fetch('/api/projects?slug=${slug}');
        const blogsResponse = await fetch('/api/blogs');

        if (!projectResponse.ok) {
          throw new Error(`Failed to fetch projects: ${projectResponse.statusText}`);
        }
        if (!blogsResponse.ok) {
          throw new Error(`Failed to fetch blogs: ${blogsResponse.statusText}`);
        }

        const projectData = await projectResponse.json();
        const blogsData = await blogsResponse.json();

        console.log("Project Data:", projectData);
        console.log("Blogs Data:", blogsData);

        // ✅ Update both states
        setAlldata(projectData);
        setAllwork(blogsData); // <-- This was missing

      } catch (error) {
        console.error("Error Fetching Data", error);
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
      setFilteredProjects([]); // Fallback to an empty array
    }
  }, [selectedCategory, alldata]);

  // Function to handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };


    const [showCursor, setShowCursor] = useState(true);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500); // Blink every 500ms
      return () => clearInterval(interval);
    }, []);



  return (
    <>
      <Head>
        <title>Talha - Personal Portfolio</title>
        <meta name="description" content="Talha - Personal Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" type="/img/logo1.png" href="/img/mee.png" />
      </Head>

      {/* Hero Section */}
      <section className="hero">

        {/* Intro SVG Text Animation */}
        <div className="intro_text">
          <svg viewBox="0 0 1320 300">
            <text x="50%" y="50%" textAnchor="middle" className="animate-stroke">
              HI
            </text>
          </svg>
        </div>

        {/* Main Content Container */}
        <div className="container flex flex-sb">

          {/* Left Content */}
          <div className="flex w-100">
            <div className="heroinfoleft">
              <span className="hero_sb_title" data-aos="fade-right">I am Talha Saleem</span>
              <h1 className="hero_title">
                Data Scientist +{' '}
                <span
                  className="typed-text"
                  
                >
                  {/* Typewriter Effect */}
                 
                  <Typewriter
                    options={{
                      strings: [
                        'Instructor',
                        'Artificial Intelligence',
                        'Web Developer',
                        'Data Analyst',
                        'Machine Learning Engineer',
                        'Generative AI',
                        'Agentic AI',
                      ],
                      
                      autoStart: true,
                      loop: true,
                      deleteSpeed: 40,
                      delay: 80,
                      cursor: '', // Disable built-in cursor
                    }}
                    
                  /> 
                 
                </span>
              </h1>
              <div className="hero_img_box heroimgbox">
                <img src="/img/mee.png" alt="coder" />
              </div>

              

              {/* Resume Button & Social Icons */}
              <div className="hero_btn_box" data-aos="fade-up">
                <Link href="/img/resume.pdf"
                  className="download_cv"
                  target="_blank"
                  rel="noopener noreferrer">
                  Download CV <BiDownload />
                </Link>

               

                <ul className="hero_social">
                  <li>
                    <a href="https://x.com/" target="_blank" rel="noopener noreferrer" data-aos="fade-right">
                      <FaTwitter />
                    </a>
                  </li>
                  <li>
                    <a href="https://medium.com/@talhasaleemahmed" target="_blank" rel="noopener noreferrer"  data-aos="fade-right">
                      <LiaBasketballBallSolid />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/talha-saleem-ahmad-69b83821/" target="_blank" rel="noopener noreferrer" data-aos="fade-left">
                      <GrLinkedinOption />
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/TalhaSaleem02" target="_blank" rel="noopener noreferrer" data-aos="fade-left">
                      <FaGithub />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="heroimageright" data-aos="fade-right">
            <div className="hero_img_box">
              <img src="/img/mee.png" alt="profile" />
            </div>
          </div>
        </div>

        {/* Fun Facts Section */}
        <div className="container">
          <div className="funfect_area flex justify-between flex-wrap gap-6 w-full">
            <div className="funfect_item" data-aos='fade-right'>
              <h3>5+</h3>
              <h4>
                Years of <br />
                Experience
              </h4>
            </div>

            <div className="funfect_item" data-aos='fade-right'>
              <h3>20+</h3>
              <h4>
                Projects <br />
                Completed
              </h4>
            </div>

            <div className="funfect_item" data-aos='fade-left'>
              <h3>12</h3>
              <h4>
                Open Source <br />
                Libraries
              </h4>
            </div>

            <div className="funfect_item" data-aos='fade-left'>
              <h3>100+</h3>
              <h4>
                Worldwide <br />
                Students
              </h4>
            </div>
          </div>
        </div>

      </section>

      {/* Services Section */}
      <section className="services" data-aos="fade-up">
        <div className="container">
          <div className="services_titles">
            <h2>My Expertise</h2>
            <span
                  className="typed-text"
                  
                >
                  {/* Typewriter Effect */}
                 
                  <Typewriter
                    options={{
                      strings: [
                        `"Be bold enough to pursue what you’re not fully ready for, always deliver more than expected, embrace experimentation to fuel innovation, and never forget — those who dare to think differently are the ones who truly change the world."`
                      ],
                      
                      autoStart: true,
                      loop: true,
                      deleteSpeed: 50,
                      delay: 100,
                      cursor: '', // Disable built-in cursor
                    }}
                    
                  /> 
                 
                </span>
          </div>

          <div className="services_menu" data-aos="fade-down">
            {services.map((service, index) => (
              <div
                key={index}
                className={`services_item ${activeIndex === index ? 'sactive' : ''}`}
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={handleMouseOut}
              >
                <div className="left_s_box" data-aos="fade-right">
                  <span>0{index + 1}</span>
                  <h3>{service.title}</h3>
                </div>

                <div className="right_s_box" data-aos="fade-left">
                  <p>{service.description}</p>
                </div>

                <GoArrowUpRight />
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Projects */}
      <section className="projects" data-aos="fade-up">
        <div className="container">
          {/* Title & Description */}
          <div className="project_titles">
            <h2>My Recent Works</h2>
            <p>
              A journey through innovation — each project is a reflection of curiosity, creativity, and the relentless drive to turn complex problems into simple, impactful solutions.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="project_buttons" data-aos="fade-down">
            <button
              className={selectedCategory === 'All' ? 'active' : ''}
              onClick={() => setSelectedCategory('All')}
            >
              All
            </button>
            <button
              className={selectedCategory === 'FullStack Web Development' ? 'active' : ''}
              onClick={() => setSelectedCategory('FullStack Web Development')}
            >
              Web Dev
            </button>
            <button
              className={selectedCategory === 'Data Analyst' ? 'active' : ''}
              onClick={() => setSelectedCategory('Data Analyst')}
            >
              Analyst
            </button>
            <button
              className={selectedCategory === 'Data Science' ? 'active' : ''}
              onClick={() => setSelectedCategory('Data Science')}
            >
              Data Science
            </button>
            <button
              className={selectedCategory === 'Machine Learning' ? 'active' : ''}
              onClick={() => setSelectedCategory('Machine Learning')}
            >
              ML
            </button>
            <button
              className={selectedCategory === 'Artificial Intelligence Saas' ? 'active' : ''}
              onClick={() => setSelectedCategory('Artificial Intelligence Saas')}
            >
              AI
            </button>
          </div>

          {/* Project Cards */}
          <div className="projects_cards">
            {!loading ? (
              filteredProjects.length === 0 ? (
                <h1>No Project Found</h1>
              ) : (
                filteredProjects.slice(0, 4).map((pro) => (
                  <Link href={`/projects/${pro.slug}`} key={pro._id} className="procard">
                    <div className="proimgbox">
                      <img src={pro.images[0]} alt={pro.title} />
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
      </section>

      {/* Experience study */}
      <section className="exstudy">

        <div className="container flex flex-left flex-sb">



          {/* Experience Section */}
          <div className="experience" data-aos="fade-right">
            <div className="experience_title flex gap-1">
              <MdWorkHistory />
              <h2>My Experience</h2>
            </div>

            <div className="exper_cards">

            <div className="exper_card" data-aos="fade-right">
                <span>Present</span>
                <h3>Instructor</h3>
                <p>InnovatiCS, USA</p>
                <p>Programming, AI, ML, GenAI, Agentic AI</p>
              </div>

              <div className="exper_card" data-aos="fade-right">
                <span>2023 - 2024 </span>
                <h3>Lecturer in Computing</h3>
                <p>Gloucestershire College UK</p>
                
              </div>

              <div className="exper_card" data-aos="fade-right">
                <span>2023</span>
                <h3>Computer Science Instructor</h3>
                <p>Frobel Independent School London</p>
               
              </div>

             

              <div className="exper_card" data-aos="fade-right">
                <span>2020 - 2022</span>
                <h3>Full Stack Web Developer</h3>
                <p>BitClan Software House, Lahore</p>
                <p>Next.js, Node.js, React.js, WordPress, Shopify, Sanity.io, dashboards</p>
              </div>

              <div className="exper_card" data-aos="fade-right">
                <span>2019</span>
                <h3>Web Developer</h3>
                <p>Dev Beans Software House, Lahore</p>
                <p>MEAN Stack & WordPress. Swyft Logistics web app</p>
              </div>

              <div className="exper_card" data-aos="fade-right">
                <span>2018</span>
                <h3>Genomic Research Assistant</h3>
                <p>Decode Genomics</p>
                <p>PCR & Genomic data analysis with Galaxy platform (NGS)</p>
              </div>

             

            </div>
          </div>

          {/* Education Section */}
          <div className="education" data-aos="fade-left">
            <div className="experience_title flex gap-1">
              <FaUserGraduate />
              <h2>My Education</h2>
            </div>

            <div className="exper_cards">

              <div className="exper_card" data-aos="fade-left">
                <span>2023</span>
                <h3>MSc: Applied Data Science</h3>
                <p>University of Essex, UK</p>
               
              </div>

              <div className="exper_card" data-aos="fade-left">
                <span>2018</span>
                <h3>Advance Diploma in Software Technology</h3>
                <p>Pakistan</p>
                
              </div>

              <div className="exper_card"  data-aos="fade-left">
                <span>[2015]</span>
                <h3>MSc: Biotechnology and Informatics</h3>
                <p>Norwegian University of Science and Technology, Norway</p>
                
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}

      <section className="myskills" data-aos="fade-up">
        <div className="container">
          <div className="myskills_title">
            <h2>My Skills</h2>
            <p>
              I put your ideas and your wishes in the form of a unique project that inspires you.
            </p>
          </div>

          {/* Web Development */}
          <h3
            className="text-center"
            style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #3b82f6, #06b6d4, #6366f1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Web Development
          </h3>
         
            <div className="myskils_cards" data-aos="fade-left">
              {[
                ["HTML5", "https://www.vectorlogo.zone/logos/w3_html5/w3_html5-icon.svg"],
                ["CSS3", "https://www.vectorlogo.zone/logos/w3_css/w3_css-icon.svg"],
                ["JavaScript", "https://www.vectorlogo.zone/logos/javascript/javascript-icon.svg"],
                ["React", "https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg"],
                ["Next.js", "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg"],
                ["MongoDB", "https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg"],
                ["Express.js", "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png"],
                ["Angular", "https://angular.io/assets/images/logos/angular/angular.svg"],
                ["Node.js", "https://nodejs.org/static/images/logo.svg"]
              ].map(([name, url]) => (
                <div className="mys_card" key={name}>
                  <div className="mys_inner">
                    <img src={url} alt={name} style={{ maxHeight: '60px', objectFit: 'contain' }} />
                  </div>
                  <p className="text-center">{name}</p>
                </div>
              ))}
            </div>
         

          {/* Data Science, AI & ML */}
          <h3 className="text-center"
            style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #3b82f6, #06b6d4, #6366f1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Data Science, AI & ML</h3>
         
            <div className="myskils_cards" data-aos="fade-right">
              {[
                ["Python", "https://www.vectorlogo.zone/logos/python/python-icon.svg"],
                ["NumPy", "https://upload.wikimedia.org/wikipedia/commons/3/31/NumPy_logo_2020.svg"],
                ["Pandas", "https://pandas.pydata.org/static/img/pandas_mark.svg"],
                ["Scikit-learn", "https://scikit-learn.org/stable/_static/scikit-learn-logo-small.png"],
                ["PyTorch", "https://pytorch.org/assets/images/pytorch-logo.png"],
                ["TensorFlow", "https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg"],
                ["Keras", "https://upload.wikimedia.org/wikipedia/commons/a/ae/Keras_logo.svg"],
                ["Matplotlib", "https://matplotlib.org/_static/images/logo2.svg"],
                ["Seaborn", "https://seaborn.pydata.org/_static/logo-wide-lightbg.svg"],
                ["Hugging Face", "https://huggingface.co/front/assets/huggingface_logo-noborder.svg"],
                ["Agentic AI", "https://uploads-ssl.webflow.com/63ed4e1c49f6f6f7e7aa886e/64876077f6e7e109c4b9288f_logo.png"]
              ].map(([name, url]) => (
                <div className="mys_card" key={name}>
                  <div className="mys_inner">
                    <img src={url} alt={name} style={{ maxHeight: '60px', objectFit: 'contain' }} />
                  </div>
                  <p className="text-center">{name}</p>
                </div>
              ))}
            </div>
          

          {/* Data Analyst */}
          <h3 className="text-center"
            style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #3b82f6, #06b6d4, #6366f1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Data Analyst</h3>
          
            <div className="myskils_cards" data-aos="fade-up">
              {[
                ["RStudio", "https://www.rstudio.com/wp-content/uploads/2018/10/RStudio-Logo-Flat.png"],
                ["MySQL", "https://www.vectorlogo.zone/logos/mysql/mysql-official.svg"],
                ["Excel", "https://cdn-icons-png.flaticon.com/512/732/732220.png"],
                ["Power BI", "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg"],
                ["Tableau", "https://www.vectorlogo.zone/logos/tableau/tableau-icon.svg"]
              ].map(([name, url]) => (
                <div className="mys_card" key={name}>
                  <div className="mys_inner">
                    <img src={url} alt={name} style={{ maxHeight: '60px', objectFit: 'contain' }} />
                  </div>
                  <p className="text-center">{name}</p>
                </div>
              ))}
            </div>
         

          {/* Biotechnology */}
          <h3 className="text-center"
            style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #3b82f6, #06b6d4, #6366f1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Biotechnology</h3>
          
            <div className="myskils_cards" data-aos="fade-down">
              {[
                ["Genetics", "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/DNA_chemical_structure.svg/250px-DNA_chemical_structure.svg.png"],
                ["Cell Biology", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Animal_cell_cycle-en.svg/500px-Animal_cell_cycle-en.svg.png"],
                ["Bioinformatics", "https://en.wikipedia.org/wiki/Bioinformatics#/media/File:1kqf_opm.png"],
                ["Enzyme Engineering", "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Master_Mix_with_Primers_form_PCR.jpg/250px-Master_Mix_with_Primers_form_PCR.jpg"],
                ["Molecular Biology", "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/197-Zika_Virus-ZikaVirus.tif/lossy-page1-220px-197-Zika_Virus-ZikaVirus.tif.jpg"],
                ["Protein Purification", "https://en.wikipedia.org/wiki/Protein#/media/File:Domain_organisation_of_EVH_proteins.png"],
                ["Tissue Culture", "https://en.wikipedia.org/wiki/Plant_tissue_culture#/media/File:Plant_Tissue_culture.jpg"]
              ].map(([name, url]) => (
                <div className="mys_card" key={name}>
                  <div className="mys_inner">
                    <img src={url} alt={name} style={{ maxHeight: '100px', objectFit: 'contain' }} />
                  </div>
                  <p className="text-center">{name}</p>
                </div>
              ))}
            </div>
         
        </div>
      </section>




      {/* Recent Blogs */}
      <section className="recentblogs" data-aos="fade-up">
        <div className="container">
          <div className="myskills_title">
            <h2>Recent Blogs</h2>
            <p>
              Dive into insights, explore emerging tech, and uncover lessons from real-world projects — one blog at a time, fueling curiosity and continuous learning.
            </p>
          </div>

          {/* Enable horizontal scrolling */}
          <div className="recent_blogs" style={{ display: 'flex', overflowX: 'auto', gap: '1rem', padding: '1rem 0' }}>
            {allwork
              ?.filter(blog => blog.images?.[0]) // Remove blogs with no image
              .slice(0, 6) // Limit display
              .map((blog) => (
                <Link href={`https://talha-portfolio-woad.vercel.app/blogs`} key={blog._id} className="re_blog" style={{ minWidth: '300px' }}>
                  <div className="re_blogimg">
                    <img
                      src={blog.images[0]}
                      alt={blog.title}
                    />
                  </div>

                  <div className="re_bloginfo">
                    <span>{blog.createdAt?.slice(0, 10)}</span>
                    <p>{blog.category?.[0]}</p>
                    <h2>{blog.title}</h2>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
