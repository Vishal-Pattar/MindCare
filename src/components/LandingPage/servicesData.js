import { FaBloggerB, FaChalkboardTeacher } from "react-icons/fa";
import { BiHelpCircle } from "react-icons/bi";
import { TbBrandBlogger } from "react-icons/tb";


const servicesData = [
  {
    icon: <TbBrandBlogger />,
    title: "Blogs",
    description:
      "Explore insightful blogs written by experts, providing valuable knowledge and updates about the latest trends and best practices.",
    buttonText: "Read Blogs",
    link: "/blogs",
  },
  {
    icon: <FaChalkboardTeacher />,
    title: "Tutorials",
    description:
      "Step-by-step tutorials to help you understand and implement concepts with practical guidance and examples.",
    buttonText: "Start Learning",
    link: "/tutorials",
  },
  {
    icon: <BiHelpCircle />,
    title: "FAQs",
    description:
      "Find answers to frequently asked questions to clear your doubts and enhance your understanding of our model.",
    buttonText: "View FAQs",
    link: "/faqs",
  },
];

export default servicesData;
