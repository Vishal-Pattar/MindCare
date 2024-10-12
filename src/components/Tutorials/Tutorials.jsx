import React, { useState } from "react";
import "./Tutorials.css";

const tutorialsData = [
  {
    title: "React Basics",
    type: "Frontend",
    description: "Learn the basics of React, including JSX and components.",
    videoUrl: "https://www.youtube.com/embed/FinZ6IdnwVY",
  },
  {
    title: "Advanced JavaScript",
    type: "Programming",
    description: "Deep dive into advanced JavaScript concepts.",
    videoUrl: "https://www.youtube.com/embed/Oe421EPjeBE",
  },
  {
    title: "Python for Beginners",
    type: "Programming",
    description:
      "Get started with Python programming. Learn basic syntax and concepts.",
    videoUrl: "https://www.youtube.com/embed/_uQrJ0TkZlc",
  },
  {
    title: "Java Full Course",
    type: "Programming",
    description: "Comprehensive Java programming tutorial for beginners.",
    videoUrl: "https://www.youtube.com/embed/grEKMHGYyns",
  },
  {
    title: "Kubernetes Tutorial for Beginners",
    type: "DevOps",
    description: "Learn the basics of Kubernetes and container orchestration.",
    videoUrl: "https://www.youtube.com/embed/X48VuDVv0do",
  },
  {
    title: "Docker Crash Course",
    type: "DevOps",
    description: "Introduction to Docker, containers, and microservices.",
    videoUrl: "https://www.youtube.com/embed/3c-iBn73dDE",
  },
  {
    title: "GitHub for Beginners",
    type: "Version Control",
    description:
      "Learn how to use Git and GitHub for version control and collaboration.",
    videoUrl: "https://www.youtube.com/embed/RGOj5yH7evk",
  },
  {
    title: "Node.js Crash Course",
    type: "Backend",
    description: "Learn Node.js, Express, and how to build APIs.",
    videoUrl: "https://www.youtube.com/embed/Oe421EPjeBE",
  },
  {
    title: "C++ Programming Full Course",
    type: "Programming",
    description: "Learn C++ programming from beginner to advanced.",
    videoUrl: "https://www.youtube.com/embed/vLnPwxZdW4Y",
  },
  {
    title: "Introduction to Machine Learning with Python",
    type: "Machine Learning",
    description: "Learn the basics of Machine Learning using Python.",
    videoUrl: "https://www.youtube.com/embed/7eh4d6sabA0",
  },
  {
    title: "Kubernetes Advanced Tutorial",
    type: "DevOps",
    description:
      "Dive deeper into Kubernetes with advanced orchestration techniques.",
    videoUrl: "https://www.youtube.com/embed/X48VuDVv0do",
  },
  {
    title: "Git & GitHub Crash Course",
    type: "Version Control",
    description:
      "Master Git and GitHub workflows for effective version control.",
    videoUrl: "https://www.youtube.com/embed/SWYqp7iY_Tc",
  },
  {
    title: "JavaScript ES6+ Features",
    type: "Programming",
    description: "Learn modern JavaScript (ES6+) features and syntax.",
    videoUrl: "https://www.youtube.com/embed/NCwa_xi0Uuc",
  },
  {
    title: "React Hooks in Depth",
    type: "Frontend",
    description: "Understand React hooks and how to use them effectively.",
    videoUrl: "https://www.youtube.com/embed/dpw9EHDh2bM",
  },
];

const Tutorials = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter tutorials based on the search query (case-insensitive)
  const filteredTutorials = tutorialsData.filter((tutorial) =>
    tutorial.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="tutorials__container">
      <div className="tutorials__header">
        <div>Tutorials</div>
        <input
          type="text"
          className="tutorials__search"
          placeholder="Search tutorials..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="tutorials__list">
        {filteredTutorials.length > 0 ? (
          filteredTutorials.map((tutorial, index) => (
            <div key={index} className="tutorials__item">
              <h2>{tutorial.title}</h2>
              <p>
                <strong>Type:</strong> {tutorial.type}
              </p>
              <div className="tutorials__video">
                <iframe
                  src={tutorial.videoUrl}
                  title={tutorial.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <p>{tutorial.description}</p>
            </div>
          ))
        ) : (
          <p>No tutorials found for "{searchQuery}".</p>
        )}
      </div>
    </div>
  );
};

export default Tutorials;
