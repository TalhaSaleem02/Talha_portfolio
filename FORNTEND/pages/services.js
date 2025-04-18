import Head from "next/head";
import Image from "next/image";

export default function Services() {
  return (
    <>
      <Head>
        <title>Talha - Services</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" type="/img/logo1.png" href="/img/mee.png" />
      </Head>

      <div className="servicespage">
        {/* Header Section */}
        <div className="topservices" data-aos="fade-up">
          <div className="container">
            <h2>Talha Services</h2>
            <p className="breadcrumb">Home <span>&gt;</span> Services</p>
          </div>
        </div>

        {/* Services Content */}
        <div className="centerservices">
          <div className="container">
            <div className="services-grid">

              {/* Machine Learning Solutions */}
              <div className="csservice" data-aos="fade-down">
                <span className="service-number">@1</span>
                <div className="service-header">
                  <h2>Machine Learning Solutions</h2>
                  <div className="service-icon">
                   
                  </div>
                </div>
                <ul className="service-features">
                  <li>Predictive modeling & analytics</li>
                  <li>Custom algorithm development</li>
                  <li>Time-series forecasting</li>
                  <li>Recommendation systems</li>
                  <li>Model optimization & tuning</li>
                </ul>
                <p className="service-description">
                  End-to-end machine learning solutions leveraging cutting-edge algorithms and frameworks.
                </p>
                <p><strong>Consultancy:</strong> Design, architecture & optimization strategies</p>
                <p><strong>Teaching:</strong> ML foundations, hands-on model building</p>
              </div>

              {/* Data Strategy & Analytics */}
              <div className="csservice" data-aos="fade-up">
                <span className="service-number">@2</span>
                <div className="service-header">
                  <h2>Data Strategy & Analytics</h2>
                  <div className="service-icon">
                   
                  </div>
                </div>
                <ul className="service-features">
                  <li>Data pipeline architecture</li>
                  <li>Business intelligence solutions</li>
                  <li>Advanced data visualization</li>
                  <li>Big Data solutions</li>
                  <li>Data governance frameworks</li>
                </ul>
                <p className="service-description">
                  Comprehensive data strategy development and implementation for data-driven organizations.
                </p>
                <p><strong>Consultancy:</strong> Architecture audits, BI tool integrations</p>
                <p><strong>Teaching:</strong> Data strategy, dashboarding, analytics</p>
              </div>

              {/* AI Consulting */}
              <div className="csservice" data-aos="fade-up">
                <span className="service-number">@3</span>
                <div className="service-header">
                  <h2>AI Consulting</h2>
                  <div className="service-icon">
                    
                  </div>
                </div>
                <ul className="service-features">
                  <li>AI strategy development</li>
                  <li>Technology stack selection</li>
                  <li>Proof of Concept development</li>
                  <li>AI implementation roadmap</li>
                  <li>ROI analysis for AI projects</li>
                </ul>
                <p className="service-description">
                  Strategic AI consulting services to maximize business value from artificial intelligence.
                </p>
                <p><strong>Consultancy:</strong> Project scoping, stack guidance, AI planning</p>
                <p><strong>Teaching:</strong> Intro to AI for businesses & PMs</p>
              </div>

              {/* Model Deployment & MLOps */}
              <div className="csservice" data-aos="fade-up">
                <span className="service-number">@4</span>
                <div className="service-header">
                  <h2>Model Deployment & MLOps</h2>
                  <div className="service-icon">
                    
                  </div>
                </div>
                <ul className="service-features">
                  <li>Cloud deployment (AWS/GCP/Azure)</li>
                  <li>CI/CD for machine learning</li>
                  <li>Model monitoring & maintenance</li>
                  <li>Scalable inference systems</li>
                  <li>Automated retraining pipelines</li>
                </ul>
                <p className="service-description">
                  Production-grade machine learning operations and cloud deployment solutions.
                </p>
                <p><strong>Consultancy:</strong> MLOps lifecycle, tooling & scaling</p>
                <p><strong>Teaching:</strong> Deploy ML with Docker, FastAPI, cloud</p>
              </div>

              {/* Biotechnology */}
              <div className="csservice" data-aos="fade-up">
                <span className="service-number">@5</span>
                <div className="service-header">
                  <h2>Biotechnology Solutions</h2>
                  <div className="service-icon">
                   
                  </div>
                </div>
                <ul className="service-features">
                  <li>Bioinformatics analysis</li>
                  <li>Genomic data modeling</li>
                  <li>AI for drug discovery</li>
                  <li>Healthcare data systems</li>
                  <li>Omics data pipelines</li>
                </ul>
                <p className="service-description">
                  Empowering biotech with AI and data-driven insights for research, diagnostics, and innovation.
                </p>
                <p><strong>Consultancy:</strong> Biotech data pipelines, AI-assisted research</p>
                <p><strong>Teaching:</strong> Intro to bioinformatics, genomics & ML in biotech</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
