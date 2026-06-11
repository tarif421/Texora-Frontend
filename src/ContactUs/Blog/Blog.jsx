import React, { useState } from "react";
import { FaArrowRight, FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

const blogPosts = [
  {
    id: 1,
    title: "How Automation is Shaping the Future of Garment Factories",
    excerpt: "Explore how AI and IoT tools are optimizing supply chains, reducing waste, and boosting production efficiency in modern textile industries.",
    category: "Technology",
    date: "June 10, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1558442086-8ea19a79cd4d?q=80&w=800&auto=format&fit=crop",
    author: {
      name: "Tariful Hasan",
      role: "Tech Lead",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"
    },
    featured: true,
  },
  {
    id: 2,
    title: "Sustainable Fashion: Moving Towards Eco-Friendly Textiles",
    excerpt: "Consumers are demanding transparency. Learn how factories can transition to organic materials and sustainable manufacturing practices.",
    category: "Sustainability",
    date: "June 08, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop",
    author: {
      name: "Sarah Jenkins",
      role: "Sustainability Analyst",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
    },
    featured: false,
  },
  {
    id: 3,
    title: "Optimizing Supply Chain with Real-Time Data Tracking",
    excerpt: "Delayed shipments and material shortages can cost millions. Discover how real-time tracking software solves inventory bottlenecks.",
    category: "Management",
    date: "June 05, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&auto=format&fit=crop",
    author: {
      name: "Rahman Ali",
      role: "Operations Expert",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
    },
    featured: false,
  },
  {
    id: 4,
    title: "The Impact of Fast Fashion on Global Garment Manufacturing",
    excerpt: "An in-depth analysis of production pressure, labor dynamics, and the technological adaptation needed to survive the fast-fashion wave.",
    category: "Industry Trends",
    date: "May 28, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=600&auto=format&fit=crop",
    author: {
      name: "M. Ahmed",
      role: "Industry Researcher",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"
    },
    featured: false,
  }
];

const categories = ["All", "Technology", "Sustainability", "Management", "Industry Trends"];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const showFeatured = activeCategory === "All" && searchQuery === "" && featuredPost;

  const displayPosts = showFeatured 
    ? filteredPosts.filter(post => post.id !== featuredPost.id)
    : filteredPosts;

  return (
    <div className=" min-h-screen text-gray-800 font-sans antialiased">
      
      {/* Header Section */}
      <header className="bg-[#1e2238] text-white py-12 px-4 sm:py-20 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-[#c6cbec] uppercase bg-white/10 px-3 py-1 rounded-full">
            Texora Insights
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif mt-4 mb-4 leading-tight">
            The Textile & Apparel Blog
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-[#c6cbec] max-w-2xl mx-auto leading-relaxed px-2">
            Stay updated with the latest trends, technological advancements, and sustainable strategies shaping the garment manufacturing ecosystem.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-md mx-auto relative border rounded-2xl px-2 sm:px-0">
            <FiSearch className="absolute left-6 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-md transition-all text-sm sm:text-base"
            />
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Category Tabs (Responsive Scroll for Mobile, Center for Desktop) */}
        <div className="flex overflow-x-auto sm:overflow-x-visible sm:flex-wrap items-center sm:justify-center gap-2 mb-8 sm:mb-12 border-b border-gray-200 pb-4 sm:pb-6 scrollbar-none snap-x whitespace-nowrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 snap-center ${
                activeCategory === category
                  ? "bg-[#1e2238] text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {showFeatured && (
          <section className="mb-12 sm:mb-16">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-400 mb-4 sm:mb-6">
              Featured Article
            </h2>
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-4 items-stretch border border-gray-100 hover:shadow-xl transition-all duration-300">
              
              {/* Image Column */}
              <div className="h-56 sm:h-72 md:h-80 lg:h-full lg:col-span-6 relative overflow-hidden group">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-[#1e2238] text-white text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  {featuredPost.category}
                </span>
              </div>

              {/* Content Column */}
              <div className="p-5 sm:p-8 lg:p-10 lg:col-span-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-[11px] sm:text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1"><FaRegCalendarAlt /> {featuredPost.date}</span>
                    <span className="flex items-center gap-1"><FaRegClock /> {featuredPost.readTime}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-gray-900 mb-3 sm:mb-4 hover:text-[#1e2238] cursor-pointer transition leading-snug">
                    {featuredPost.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm lg:text-base mb-6 leading-relaxed line-clamp-3 lg:line-clamp-none">
                    {featuredPost.excerpt}
                  </p>
                </div>
                
                {/* Author Info */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-4 sm:pt-6 mt-4">
                  <div className="flex items-center gap-3">
                    <img src={featuredPost.author.avatar} alt={featuredPost.author.name} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"/>
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-900">{featuredPost.author.name}</h4>
                      <p className="text-[10px] sm:text-xs text-gray-500">{featuredPost.author.role}</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1e2238] hover:gap-2.5 transition-all">
                    Read Article <FaArrowRight className="text-xs" />
                  </button>
                </div>
              </div>

            </div>
          </section>
        )}

        {/* Blog Grid Section */}
        <section>
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-400 mb-4 sm:mb-6">
            {showFeatured ? "Recent Articles" : `${activeCategory} Articles`}
          </h2>

          {displayPosts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-inner border border-gray-100 px-4">
              <p className="text-gray-500 text-sm sm:text-base">No articles found matching your criteria.</p>
            </div>
          ) : (
            // Responsive Grid Layout: 1 col on Mobile, 2 on Tablet, 3 on Desktop
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {displayPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 flex flex-col justify-between transition-all duration-300">
                  <div>
                    {/* Card Image */}
                    <div className="h-44 sm:h-48 relative overflow-hidden group">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                      <span className="absolute top-3 left-3 bg-[#1e2238]/90 text-white text-[10px] font-semibold px-2.5 py-1 rounded-md uppercase tracking-wider backdrop-blur-sm">
                        {post.category}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 sm:p-5">
                      <div className="flex items-center gap-3 text-[11px] text-gray-400 mb-2">
                        <span className="flex items-center gap-1"><FaRegCalendarAlt /> {post.date}</span>
                        <span className="flex items-center gap-1"><FaRegClock /> {post.readTime}</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 font-serif mb-2 line-clamp-2 hover:text-[#1e2238] cursor-pointer transition leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer / Author */}
                  <div className="p-4 sm:p-5 border-t border-gray-50 bg-gray-50/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={post.author.avatar} alt={post.author.name} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover"/>
                      <div>
                        <h4 className="text-[11px] sm:text-xs font-semibold text-gray-900">{post.author.name}</h4>
                        <p className="text-[10px] text-gray-500">{post.author.role}</p>
                      </div>
                    </div>
                    <button className="text-xs font-bold text-[#1e2238] hover:underline flex items-center gap-1">
                      Read More <FaArrowRight className="text-[10px]" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Newsletter / CTA Section */}
        <section className="mt-16 sm:mt-24 bg-gradient-to-br from-[#1e2238] to-[#2d3354] rounded-2xl p-6 sm:p-10 lg:p-12 text-center text-white relative overflow-hidden shadow-lg">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold mb-2 sm:mb-3">Never Miss an Industry Update</h3>
            <p className="text-[#c6cbec] text-xs sm:text-sm lg:text-base mb-6 max-w-md mx-auto px-2">
              Subscribe to Texora's weekly newsletter and get curated content on apparel manufacturing tech directly to your inbox.
            </p>
            {/* Form layout changes from block to row at 'sm' breakpoint */}
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto px-2 sm:px-0">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                required
                className="flex-1 px-4 py-2.5 sm:py-3 rounded-xl text-gray-900 text-xs sm:text-sm focus:outline-none w-full"
              />
              <button type="submit" className="bg-white text-[#1e2238] hover:bg-gray-100 font-bold px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm transition shadow-md w-full sm:w-auto whitespace-nowrap">
                Subscribe Now
              </button>
            </form>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Blog;