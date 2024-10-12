import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { blogData } from "./blogData";
import { blogContent } from "./blogContent";
import "./Blog.css";
import { useAlert } from "../../context/AlertContext";
import Markdown from "markdown-to-jsx";

const BlogDetail = () => {
  const { id } = useParams();
  const data = blogData.find((b) => b.id === parseInt(id));
  const content = blogContent.find((b) => b.id === parseInt(id));
  const { addAlert } = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    if (!data) {
      addAlert(
        "Sorry, the blog you are looking for does not exist",
        "error",
        "center"
      );
      setTimeout(() => {
        navigate("/blogs");
      }, 5000);
    }
  }, [data, addAlert, navigate]);

  if (!data) {
    return null;
  }

  const formattedDate = new Date(data.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="blog-detail__container">
      <div className="blog-detail__content">
        <div className="blog-detail__image">
          <img src={data.imageUrl} alt={data.title} />
        </div>
        <div className="blog-detail__date">{formattedDate}</div>{" "}
        <h1>{data.title}</h1>
        <p className="blog-detail__category">
          <strong>Category:</strong> {data.category}
        </p>
        <p>
          <Markdown>{content.content}</Markdown>
        </p>
      </div>
    </div>
  );
};

export default BlogDetail;
