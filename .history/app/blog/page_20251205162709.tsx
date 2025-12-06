"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface BlogPost {
  _id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  category: string;
  author: {
    name: string;
    id?: string;
  };
  tags?: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"a-z" | "z-a" | "oldest" | "newest">(
    "newest"
  );
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/blog?published=true");
      const data = await response.json();
      if (data.success) {
        setPosts(data.posts);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (type: "a-z" | "z-a" | "oldest" | "newest") => {
    setSortBy(type);
    setCurrentPage(1); // Reset to first page when sorting
    const sortedPosts = [...posts];

    switch (type) {
      case "a-z":
        sortedPosts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "z-a":
        sortedPosts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "oldest":
        sortedPosts.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "newest":
        sortedPosts.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }

    setPosts(sortedPosts);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-[#876A5C] text-lg">Loading blog posts...</div>
      </div>
    );
  }

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calcular paginación
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Banner */}
      

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar - Sort & Filter */}
          <aside className="w-full lg:w-72 lg:flex-shrink-0">
            <div className="bg-[#77d4ff] rounded-2xl p-6 lg:sticky lg:top-6">
              {/* Search */}
              <div className="relative mb-6">
                <Input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1); // Reset to first page when searching
                  }}
                  className="pl-10 bg-white border-none rounded-lg"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>

              {/* Sort By */}
              <div>
                <h3 className="text-slate-900 font-semibold text-lg mb-4">
                  Sort By
                </h3>
                <div className="flex flex-wrap gap-3 lg:flex-col lg:space-y-3 lg:gap-0">
                  <button
                    onClick={() => handleSort("a-z")}
                    className={`flex items-center gap-2 text-slate-900 hover:text-slate-700 transition-colors cursor-pointer ${
                      sortBy === "a-z" ? "font-semibold" : ""
                    }`}
                  >
                    <span className="text-xl">•</span> A - Z
                  </button>
                  <button
                    onClick={() => handleSort("z-a")}
                    className={`flex items-center gap-2 text-slate-900 hover:text-slate-700 transition-colors cursor-pointer ${
                      sortBy === "z-a" ? "font-semibold" : ""
                    }`}
                  >
                    <span className="text-xl">•</span> Z - A
                  </button>
                  <button
                    onClick={() => handleSort("oldest")}
                    className={`flex items-center gap-2 text-slate-900 hover:text-slate-700 transition-colors cursor-pointer ${
                      sortBy === "oldest" ? "font-semibold" : ""
                    }`}
                  >
                    <span className="text-xl">•</span> Oldest
                  </button>
                  <button
                    onClick={() => handleSort("newest")}
                    className={`flex items-center gap-2 text-slate-900 hover:text-slate-700 transition-colors cursor-pointer ${
                      sortBy === "newest" ? "font-semibold" : ""
                    }`}
                  >
                    <span className="text-xl">•</span> Newest
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Blog Posts Grid */}
          <main className="flex-1">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:max-w-4xl lg:mx-auto">
              {currentPosts.length > 0 ? (
                currentPosts.map((post) => (
                  <Link
                    key={post._id}
                    href={`/blog/${post._id}`}
                    className="group block cursor-pointer"
                  >
                    <article className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full max-w-md lg:max-w-md mx-auto w-full pointer-events-auto">
                      {/* Image */}
                      <div className="relative h-48 bg-gray-200 flex-shrink-0">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          unoptimized
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                          }}
                        />
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-grow">
                        {/* Date */}
                        <p className="text-sm text-gray-500 mb-2 uppercase tracking-wider">
                          {formatDate(post.createdAt)}
                        </p>

                        {/* Title */}
                        <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#876A5C] transition-colors line-clamp-2">
                          {post.title}
                        </h2>

                        {/* Description */}
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                          {post.description}
                        </p>
                      </div>
                    </article>
                  </Link>
                ))
              ) : (
                <div className="col-span-2 text-center py-12 text-gray-500">
                  No blog posts found.
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            {filteredPosts.length > postsPerPage && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-[#77d4ff] text-slate-900 hover:bg-[#5fc7ff] disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors font-medium cursor-pointer"
                >
                  Previous
                </button>

                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded-lg transition-colors font-medium cursor-pointer ${
                          currentPage === page
                            ? "bg-[#77d4ff] text-slate-900"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg bg-[#77d4ff] text-slate-900 hover:bg-[#5fc7ff] disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors font-medium cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
