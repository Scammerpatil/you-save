"use client";
import { SavedLink } from "@/types/link";
import { IconFolder } from "@tabler/icons-react";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const Categories = () => {
  const [links, setLinks] = useState<SavedLink[]>([]);
  const [folderNames, setFolderNames] = useState<string[]>([]);

  const fetchLinks = async () => {
    const res = await axios.get("/api/links/getAllLinks");
    setLinks(res.data.links);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  useEffect(() => {
    const uniqueFolders = Array.from(
      new Set(
        links
          .map((link) => link.folder)
          .filter((folder): folder is string => folder !== undefined)
      )
    );
    setFolderNames(uniqueFolders);
  }, [links]);

  return (
    <>
      <h1 className="text-4xl text-center font-bold uppercase mb-8">
        Categories
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {folderNames.length === 0 ? (
          <p className="text-lg text-base-content">No categories found</p>
        ) : (
          folderNames.map((folder) => (
            <Link
              href={`/user/categories/folder?folder=${folder}`}
              key={folder}
              className="btn btn-accent h-32 w-auto font-bold rounded m-2 flex items-center gap-2"
            >
              <IconFolder size={20} />
              {folder}
            </Link>
          ))
        )}
      </div>
    </>
  );
};

export default Categories;
