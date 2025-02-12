"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const SavedLinksPage = () => {
  const [links, setLinks] = useState([]);
  const fetchLinks = async () => {
    const res = await axios.get("/api/links/getAllLinks");
    setLinks(res.data.links);
  };
  useEffect(() => {
    fetchLinks();
  }, []);
  return (
    <div className="w-full h-full ">
      <h1 className="text-4xl text-center">Saved Links</h1>
      {links.length === 0 ? (
        <h1 className="text-2xl text-center">No Links Saved</h1>
      ) : (
        <div className="flex flex-col items-center">
          {links.map((link) => (
            <div
              key={link._id}
              className="w-1/2 p-4 my-4 bg-base-300 rounded-lg shadow-lg"
            >
              <video src={link.url}>
                Your browser does not support the video tag
              </video>
              <h1 className="text-xl font-semibold text-base-content">
                {link.title}
              </h1>
              <a href={link.url} className="text-primary">
                {link.url}
              </a>
              Date Saved: {new Date(link.savedAt).toDateString()}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default SavedLinksPage;
