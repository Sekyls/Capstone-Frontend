import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/Footer";

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState("story");

  const teamMembers = [
    {
      name: "Dennis Sekyi Opoku",
      role: "Founder & CEO",
      image: "/images/DI.jpg",
      description:
        "Former chef with a passion for making quality food accessible to everyone.",
    },
    {
      name: "Konadu Belinda",
      role: "Head of Partnerships",
      description:
        "Connecting with the best local restaurants to bring variety to your table.",
      image: "/images/Abena-06.jpg",
    },
    {
      name: "Osei Asante Caleb",
      image: "/images/C3.jpg",
      role: "Head of Operations",
      description:
        "Logistics expert ensuring your food arrives fresh and on time.",
    },
  ];

  const coreValues = [
    {
      title: "Quality",
      icon: "🏆",
      description:
        "We partner only with restaurants that meet our high standards for ingredients and preparation.",
    },
    {
      title: "Speed",
      icon: "⚡",
      description:
        "Our optimized delivery network ensures your food arrives hot and fresh, every time.",
    },
    {
      title: "Community",
      icon: "🤝",
      description:
        "We support local businesses and give back to the communities we serve.",
    },
    {
      title: "Sustainability",
      icon: "🌱",
      description: "Eco-friendly packaging and carbon-offset delivery options.",
    },
  ];

  const stats = [
    { value: "500+", label: "Restaurant Partners" },
    { value: "50,000+", label: "Monthly Orders" },
    { value: "25+", label: "Cities Served" },
    { value: "99%", label: "Satisfaction Rate" },
  ];

  return (
    <div className="min-vh-100 bg-light">
      {/* Hero Section */}
      <section
        className=" text-white py-5"
        style={{
          background:
            "linear-gradient(to right, var(--bs-warning), var(--bs-danger))",
        }}
      >
        <div className="container mx-auto text-center">
          <h1 className="display-3 fw-bold mb-4">Redefining Food Delivery</h1>
          <p className="fs-4 mb-5">
            We're on a mission to bring amazing restaurant experiences to your
            doorstep.
          </p>
          <button className="btn btn-light text-danger px-5 py-3 fw-bold">
            Join Our Journey
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container my-5 py-5">
        <div
          className="card  border-light"
          style={{
            borderRadius: "20px",
            boxShadow: "0px 4px 8px rgba(201, 117, 15, 0.7)",
          }}
        >
          <div className="card-body">
            <div className="row row-cols-1 row-cols-md-4 g-4 text-center">
              {stats.map((stat, index) => (
                <div key={index} className="col">
                  <p className="fs-3 fw-bold text-warning text-center">
                    {stat.value}
                  </p>
                  <p className="text-muted lead fw-bold">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="container py-5">
        <div className="d-flex justify-content-center border-bottom pb-3 mb-4">
          {["story", "values", "team"].map((tab) => (
            <button
              key={tab}
              className={`btn btn-link px-3 py-2 mx-2 fs-5 fw-bold ${
                activeTab === tab
                  ? "text-warning border-bottom border-3 custom-bottom-border "
                  : "text-muted"
              }`}
              style={{ textDecoration: "none" }}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "story"
                ? "Our Story"
                : tab === "values"
                ? "Our Values"
                : "Our Team"}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "story" && (
            <motion.div
              key="tab-story"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
            >
              <div className="row">
                <div className="col-lg-6">
                  <img
                    src="https://images.unsplash.com/photo-1621241441637-ea2d3f59db32?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Founding Story"
                    className="img-fluid rounded shadow-sm"
                  />
                </div>
                <div className="col-lg-6 d-grid align-items-center align-content-center text-center">
                  <h3 className="fs-2 fw-bold mb-4 text-dark">
                    How It All Started
                  </h3>
                  <p className="text-muted mb-4 ">
                    Founded in 2020, our journey began when our Dennis Sekyi
                    Opoku experienced firsthand the challenges of getting
                    quality restaurant food delivered quickly and reliably.
                  </p>
                  <p className="text-muted">
                    What started as a small operation with just three
                    restaurants in one neighborhood has grown into a network of
                    hundreds of partners across multiple cities.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "values" && (
            <motion.div
              key="tab-values"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
            >
              <div className="row row-cols-1 row-cols-md-2 g-4">
                {coreValues.map((value, index) => (
                  <div key={index} className="col">
                    <div className="card shadow-sm h-100">
                      <div className="card-body text-center">
                        <div className="fs-2 mb-3">{value.icon}</div>
                        <h5 className="card-title fw-bold">{value.title}</h5>
                        <p className="card-text text-muted">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "team" && (
            <motion.div
              key="tab-team"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
            >
              <div className="row row-cols-1 row-cols-md-3 g-4">
                {teamMembers.map((member, index) => (
                  <div key={index} className="col">
                    <div
                      className="card "
                      style={{
                        borderRadius: "50px",
                        boxShadow: "0 4px 8px rgba(34, 31, 31, 0.5)",
                      }}
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        className="card-img-top img-fluid"
                        style={{
                          objectFit: "cover",
                          height: "500px",
                          borderRadius: "40px",
                        }}
                      />
                      <div className="card-body text-center">
                        <h5 className="card-title text-dark">{member.name}</h5>
                        <p className="card-text text-warning fw-bold">
                          {member.role}
                        </p>
                        <p className="text-muted">{member.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Testimonial Section */}
      <section className="bg-gradient text-white py-5">
        <div className="container text-center">
          <h2 className="fs-3 fw-bold mb-4 text-success">
            What Our Customers Say
          </h2>
          <div className="bg-white text-dark p-5 rounded shadow-sm">
            <p className="fs-4 fst-italic mb-4">
              "This delivery app has completely changed how I experience food
              from my favorite restaurants. Fast, reliable, and the food always
              arrives hot!"
            </p>
            <div className="d-flex justify-content-center align-items-center">
              <img
                src="/images/N1.jpg"
                alt="Nancy Opoku Woraewaa"
                className="rounded-circle me-3"
                width="80"
                height="90"
              />
              <div>
                <p className="fw-bold mb-0">Nancy Opoku Woraewaa</p>
                <p className="text-muted small">Loyal Customer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="container py-5 text-center">
        <h2 className="fs-2 fw-bold mb-4">Join Our Food Revolution</h2>
        <p className="fs-5 text-muted mb-5">
          Whether you're a restaurant looking to expand your reach or a delivery
          driver seeking flexible opportunities, we'd love to hear from you!
        </p>
        <div>
          <button className="btn btn-warning btn-lg me-3 text-light fw-bold">
            Partner With Us
          </button>
          <button className="btn btn-primary btn-lg fw-bold">
            Join Our Fleet
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutPage;
