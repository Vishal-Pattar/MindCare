import React from "react";
import { Link } from "react-router-dom";
import "./Team.css";
import avatar from "../../assets/avatar.png";
import profile1 from "../../assets/profile/Vishal-Pattar.png";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const teamData = [
  {
    id: 1,
    image: profile1,
    name: "Vishal Pattar",
    role: "Team Lead",
    socials: [
      {
        id: 1,
        icon: <FaLinkedin />,
        link: "https://in.linkedin.com/",
      },
      {
        id: 2,
        icon: <FaGithub />,
        link: "https://github.com/",
      },
    ],
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia quod quae porro, incidunt ut magni perspiciatis earum illum officiis distinctio!",
  },
  {
    id: 2,
    image: avatar,
    name: "Bhaskar Dhuri",
    role: "App Developer",
    socials: [
      {
        id: 1,
        icon: <FaLinkedin />,
        link: "https://in.linkedin.com/",
      },
      {
        id: 2,
        icon: <FaGithub />,
        link: "https://github.com/",
      },
    ],
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia quod quae porro, incidunt ut magni perspiciatis earum illum officiis distinctio!",
  },
  {
    id: 3,
    image: avatar,
    name: "Tanishk Patil",
    role: "Machine Learning Developer",
    socials: [
      {
        id: 1,
        icon: <FaLinkedin />,
        link: "https://in.linkedin.com/",
      },
      {
        id: 2,
        icon: <FaGithub />,
        link: "https://github.com/",
      },
    ],
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia quod quae porro, incidunt ut magni perspiciatis earum illum officiis distinctio!",
  },
  {
    id: 4,
    image: avatar,
    name: "Amanullah Karel",
    role: "Document Lead",
    socials: [
      {
        id: 1,
        icon: <FaLinkedin />,
        link: "https://in.linkedin.com/",
      },
      {
        id: 2,
        icon: <FaGithub />,
        link: "https://github.com/",
      },
    ],
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia quod quae porro, incidunt ut magni perspiciatis earum illum officiis distinctio!",
  },
];

const Team = () => {
  const SocialHandler = (link) => {
    <Link to={link}></Link>;
  };
  return (
    <div className="team__container">
      <div className="team__title">Meet our Team</div>
      <div className="team__grid">
        {teamData.map((item) => (
          <div key={item.id} className="team__item">
            <img className="team__image" src={item.image} alt={item.name} />
            <span className="team__name">{item.name}</span>
            <span className="team__role">{item.role}</span>
            <p className="team__description">{item.description}</p>
            <div className="team__social">
              {item.socials.map((social) => (
                <span
                  key={social.id}
                  onClick={() => SocialHandler(social.link)}
                >
                  {social.icon}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
