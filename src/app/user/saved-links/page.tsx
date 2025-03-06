"use client";
import { SavedLink } from "@/types/link";
import { categoryOptions, platformOptions } from "@/utils/Constants";
import { IconFolder, IconTrash } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SavedLinksPage = () => {
  const [links, setLinks] = useState<SavedLink[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");
  const [folder, setFolder] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("");

  const fetchLinks = async () => {
    const res = await axios.get("/api/links/getAllLinks");
    const sortedLinks = res.data.links.sort((a: SavedLink, b: SavedLink) =>
      sortOrder === "latest"
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    setLinks(sortedLinks);
  };

  useEffect(() => {
    fetchLinks();
  }, [sortOrder]);

  const getYouTubeThumbnail = (url: string) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([^?&]+)/
    );
    return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : "";
  };

  const filteredLinks = links.filter((link) => {
    const matchesSearch =
      link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.url.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = selectedPlatform
      ? link.platform.toUpperCase() === selectedPlatform
      : true;
    const matchesFolder = selectedFolder
      ? link.category === selectedFolder
      : true;
    return matchesSearch && matchesPlatform && matchesFolder;
  });

  const handleUpdateFolder = async (id: string, folder: string) => {
    if (!id || !folder) return toast.error("Folder name cannot be empty");
    const formattedFolder = folder.charAt(0).toUpperCase() + folder.slice(1);
    try {
      await axios.put(
        `/api/links/updateFolder?id=${id}&folderName=${formattedFolder}`
      );
      toast.success("Folder updated successfully");
      fetchLinks();
    } catch {
      toast.error("Failed to update folder");
    }
  };

  const handleDeleteLink = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this link?")) return;
    try {
      await axios.delete(`/api/links/delete?id=${id}`);
      toast.success("Link deleted successfully");
      fetchLinks();
    } catch {
      toast.error("Failed to delete link");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl text-center font-bold uppercase mb-8">
        Saved Links
      </h1>

      {/* Search & Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search by title or URL..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input input-primary input-bordered w-full"
        />
        <select
          className="select select-primary w-full"
          onChange={(e) => setSelectedPlatform(e.target.value)}
          value={selectedPlatform}
        >
          <option value="">All Platforms</option>
          {platformOptions.map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>
        <select
          className="select select-primary w-full"
          onChange={(e) => setSelectedFolder(e.target.value)}
          value={selectedFolder}
        >
          <option value="">All Categories</option>
          {categoryOptions.map((folder) => (
            <option key={folder} value={folder}>
              {folder}
            </option>
          ))}
        </select>
        <button
          className="btn btn-primary"
          onClick={() =>
            setSortOrder(sortOrder === "latest" ? "oldest" : "latest")
          }
        >
          Sort: {sortOrder === "latest" ? "Newest First" : "Oldest First"}
        </button>
      </div>

      {/* Links Grid */}
      {filteredLinks.length === 0 ? (
        <h1 className="text-2xl text-center text-base-content mt-6">
          No Links Saved
        </h1>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredLinks.map((link) => (
            <div
              key={link._id || link.url}
              className="p-6 bg-base-300 rounded-xl shadow-md flex flex-col justify-evenly"
            >
              <img
                src={
                  link.platform.toLowerCase() === "youtube"
                    ? getYouTubeThumbnail(link.url)
                    : `/platform-logos/${link.platform.toLowerCase()}.png`
                }
                alt={link.platform}
                className="rounded-lg mb-4 h-32 w-full object-contain"
              />
              <h1 className="text-lg font-semibold">{link.title}</h1>
              <a href={link.url} className="text-primary break-words">
                {link.url}
              </a>
              <p className="text-sm text-base-content/50">
                Date Saved: {new Date(link.createdAt).toDateString()}
              </p>
              <div className="mt-3 flex gap-2">
                <input
                  type="text"
                  placeholder="Enter folder name..."
                  value={link.folder}
                  className="input input-primary input-bordered flex-1"
                  onChange={(e) => setFolder(e.target.value)}
                />
                <button
                  className="btn btn-primary btn-outline"
                  onClick={() => handleUpdateFolder(link._id!, folder)}
                >
                  <IconFolder size={18} />
                </button>
              </div>
              <button
                className="btn btn-error mt-3 w-full"
                onClick={() => handleDeleteLink(link._id!)}
              >
                <IconTrash size={18} /> Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedLinksPage;
