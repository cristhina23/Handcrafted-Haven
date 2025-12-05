"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Calendar,
  User,
  Tag,
  X,
  Mail,
  MapPin,
  Link as LinkIcon,
} from "lucide-react";

interface BlogPost {
  _id: string;
  title: string;
  description: string;
  content: string;
  image: string;
  additionalImages?: string[];
  category: string;
  author: {
    name: string;
    id?: string;
  };
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("");
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>(
    []
  );
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (params.id) {
      fetchPost(params.id as string);
    }
  }, [params.id]);

  // Extract table of contents from content
  useEffect(() => {
    if (post && contentRef.current) {
      const headings = contentRef.current.querySelectorAll("h2, h3");
      const toc: TableOfContentsItem[] = [];

      headings.forEach((heading, index) => {
        const id = `section-${index}`;
        heading.id = id;
        toc.push({
          id,
          text: heading.textContent || "",
          level: heading.tagName === "H2" ? 2 : 3,
        });
      });

      setTableOfContents(toc);
    }
  }, [post]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const headings = document.querySelectorAll("h2[id], h3[id]");
      let currentSection = "";

      headings.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 150) {
          currentSection = heading.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [post]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Remove previous highlight
      document.querySelectorAll("h2[id], h3[id]").forEach((el) => {
        el.classList.remove("highlight-section");
      });

      // Add highlight to target
      element.classList.add("highlight-section");

      // Scroll to element
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Remove highlight after animation
      setTimeout(() => {
        element.classList.remove("highlight-section");
      }, 2000);
    }
  };

  const fetchPost = async (id: string) => {
    try {
      const response = await fetch(`/api/blog/${id}`);
      const data = await response.json();
      if (data.success) {
        // Enhance content with styled quotes and callouts
        let enhancedContent = data.post.content;

        // Style blockquotes (using [\s\S] instead of . with s flag)
        enhancedContent = enhancedContent.replace(
          /<blockquote>([\s\S]*?)<\/blockquote>/g,
          '<blockquote class="border-l-4 border-[#77d4ff] bg-blue-50 pl-6 pr-4 py-4 my-6 italic text-gray-700 rounded-r-lg">' +
            "$1</blockquote>"
        );

        setPost({ ...data.post, content: enhancedContent });
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-[#876A5C] text-lg">Loading...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">
          Blog post not found
        </h1>
        <button
          onClick={() => router.push("/blog")}
          className="text-[#876A5C] hover:underline"
        >
          Back to blog
        </button>
      </div>
    );
  }

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .highlight-section {
            animation: highlightFade 2s ease-in-out;
            background: linear-gradient(90deg, rgba(119, 212, 255, 0.2) 0%, transparent 100%);
            padding-left: 1rem;
            margin-left: -1rem;
            border-radius: 0.5rem;
          }

          @keyframes highlightFade {
            0% {
              background: linear-gradient(90deg, rgba(119, 212, 255, 0.4) 0%, transparent 100%);
            }
            100% {
              background: linear-gradient(90deg, rgba(119, 212, 255, 0) 0%, transparent 100%);
            }
          }
        `,
        }}
      />

      <div className="min-h-screen bg-white">
        {/* Lightbox */}
        {lightboxImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setLightboxImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
              onClick={() => setLightboxImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <div className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center">
              <img
                src={lightboxImage}
                alt="Lightbox image"
                className="max-w-full max-h-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        )}

        {/* Header Banner */}
        <div className="bg-[#77d4ff] py-3 text-center">
          <p className="text-slate-900 text-sm">
            Every purchase helps an artisan thrive • Together we&apos;ve
            supported 250+ small creators
          </p>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Back Button */}
          <button
            onClick={() => router.push("/blog")}
            className="flex items-center gap-2 text-[#876A5C] hover:text-[#6d5449] mb-6 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Blog
          </button>

          <div className="flex gap-8">
            {/* Main Content */}
            <div className="flex-1 max-w-4xl">
              {/* Hero Image */}
              <div
                className="relative h-96 rounded-xl overflow-hidden mb-8 shadow-lg cursor-pointer"
                onClick={() => setLightboxImage(post.image)}
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  priority
                  unoptimized
                />
              </div>

              {/* Meta Information */}
              <div className="flex flex-wrap gap-6 mb-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.createdAt)}
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author.name}
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  {post.category}
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight tracking-tight">
                {post.title}
              </h1>

              {/* Description */}
              <div className="bg-gradient-to-r from-blue-50 to-transparent border-l-4 border-[#77d4ff] pl-6 pr-4 py-4 mb-8 rounded-r-lg">
                <p className="text-xl text-gray-700 leading-relaxed italic font-medium">
                  {post.description}
                </p>
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[#77d4ff] text-slate-900 rounded-full text-sm font-medium hover:bg-[#5fc7ff] transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Content with improved typography */}
              <div
                ref={contentRef}
                className="prose prose-xl max-w-none 
                prose-headings:text-slate-900 prose-headings:tracking-tight prose-headings:font-black
                prose-h2:text-5xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:leading-tight prose-h2:scroll-mt-24 prose-h2:font-black
                prose-h3:text-4xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:scroll-mt-24 prose-h3:font-black
                prose-p:text-gray-800 prose-p:leading-[1.9] prose-p:mb-6 prose-p:text-xl prose-p:font-normal
                prose-strong:text-slate-900 prose-strong:font-extrabold
                prose-a:text-[#77d4ff] prose-a:no-underline hover:prose-a:underline prose-a:font-semibold
                prose-ul:my-6 prose-li:my-2 prose-li:text-gray-800 prose-li:text-lg
                prose-img:rounded-lg prose-img:shadow-md
                [&_h2]:transition-all [&_h2]:duration-300
                [&_h3]:transition-all [&_h3]:duration-300"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Additional Images Gallery */}
              {post.additionalImages && post.additionalImages.length > 0 && (
                <div className="my-12">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">
                    Gallery
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {post.additionalImages.map((img, index) => (
                      <div
                        key={index}
                        className="relative h-64 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer group bg-gray-100"
                        onClick={() => setLightboxImage(img)}
                      >
                        <img
                          src={img}
                          alt={`${post.title} - Image ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Author Card */}
              <div className="my-12 bg-gradient-to-br from-blue-50 to-white border border-gray-200 rounded-xl p-8 shadow-sm">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 rounded-full bg-[#77d4ff] flex items-center justify-center text-3xl font-bold text-slate-900 flex-shrink-0">
                    {post.author.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                      About {post.author.name}
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {post.author.name} is a passionate artisan dedicated to
                      creating beautiful handcrafted pieces. With years of
                      experience and a deep love for traditional crafts, they
                      bring unique stories and exceptional quality to every
                      creation.
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span>contact@handcrafthaven.com</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>Handcraft Haven Studio</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-12 pt-8 border-t border-gray-200 flex justify-between items-center">
                <button
                  onClick={() => router.push("/blog")}
                  className="bg-[#77d4ff] text-slate-900 px-6 py-3 rounded-lg hover:bg-[#5fc7ff] transition-colors font-medium cursor-pointer"
                >
                  Read More Articles
                </button>
                <div className="text-sm text-gray-500">
                  Last updated: {formatDate(post.updatedAt)}
                </div>
              </div>
            </div>

            {/* Table of Contents - Sidebar */}
            {tableOfContents.length > 0 && (
              <aside className="hidden xl:block w-64 flex-shrink-0">
                <div className="sticky top-24">
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <LinkIcon className="w-5 h-5" />
                      Table of Contents
                    </h3>
                    <nav className="space-y-2">
                      {tableOfContents.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => scrollToSection(item.id)}
                          className={`block w-full text-left text-sm transition-colors cursor-pointer ${
                            item.level === 3 ? "pl-4" : ""
                          } ${
                            activeSection === item.id
                              ? "text-[#77d4ff] font-semibold"
                              : "text-gray-600 hover:text-slate-900"
                          }`}
                        >
                          {item.text}
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
