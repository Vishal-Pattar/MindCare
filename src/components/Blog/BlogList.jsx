// BlogList.js

import React from "react";
import { Link } from "react-router-dom";
import { blogData } from "./blogData";
import "./Blog.css";

const BlogList = () => {
  // Create a copy of blogData and sort it by date descending
  const sortedBlogs = [...blogData].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });

  return (
    <div className="blog-list__container">
      <div className="blog-list__header">Blogs</div>
      <div className="blog-list__grid">
        {sortedBlogs.map((blog) => {
          // Format the date to a readable format, e.g., "July 20, 2023"
          const formattedDate = new Date(blog.date).toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          );

          return (
            <div key={blog.id} className="blog-list__item">
              <div className="blog-list__image">
                <img src={blog.imageUrl} alt={blog.title} />
                <div className="blog-list__category">{blog.category}</div>
              </div>
              <h2>{blog.title}</h2>
              <p className="blog-list__description">{blog.description}</p>
              <div className="blog-list__footer">
                <p className="blog-list__date">{formattedDate}</p>
                <Link to={`/blogs/${blog.id}`} className="blog-list__read-more">
                  Read More
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlogList;
