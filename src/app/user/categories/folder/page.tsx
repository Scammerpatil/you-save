"use client";
import { SavedLink } from "@/types/link";
import { IconTrash } from "@tabler/icons-react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Folder = () => {
  const searchParams = useSearchParams();
  const folder = searchParams.get("folder");
  const [links, setLinks] = useState<SavedLink[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");

  const fetchLinks = async () => {
    const res = await axios.get("/api/links/getLinksByFolder?folder=" + folder);
    const sortedLinks = res.data.links.sort((a: SavedLink, b: SavedLink) =>
      sortOrder === "latest"
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    setLinks(sortedLinks);
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

  useEffect(() => {
    fetchLinks();
  }, [sortOrder]);
  const filteredLinks = links.filter((link) => {
    const matchesSearch =
      link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.url.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });
  const getYouTubeThumbnail = (url: string) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([^?&]+)/
    );
    return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : "";
  };

  return (
    <>
      <h1 className="text-4xl text-center font-bold uppercase mb-8">
        {folder}
      </h1>
      <div className="flex flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search by title or URL..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input input-primary input-bordered w-full"
        />
        <button
          className="btn btn-primary"
          onClick={() =>
            setSortOrder(sortOrder === "latest" ? "oldest" : "latest")
          }
        >
          Sort: {sortOrder === "latest" ? "Newest First" : "Oldest First"}
        </button>
      </div>
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
    </>
  );
};
export default Folder;
