import React from "react";

type BlogPost = {
  id: number;
  category: string;
  image: string;
  date: string;
  title: string;
  description: string;
  author: string;
  comments: number;
};

const blogPosts: BlogPost[] = [
  {
    id: 1,
    category: "Auto Repair",
    image: "/blog1.jpg",
    date: "13 Oct 2022",
    title: "BUYING CHEAP USED TRANSMISSIONS ISN’T AS RISKY AS YOU THINK",
    description:
      "Bilmälvakt treskade i nibel den mobilmissbruk deren jyn nöning osk heterostik i rel ultran.",
    author: "sinan",
    comments: 3,
  },
  {
    id: 2,
    category: "Automotive Tips",
    image: "/blog2.jpg",
    date: "13 Oct 2022",
    title: "DOES TOYOTA REALLY MAKE THE MOST RELIABLE ENGINES?",
    description:
      "Bilmälvakt treskade i nibel den mobilmissbruk deren jyn nöning osk heterostik i rel ultran.",
    author: "sinan",
    comments: 3,
  },
  {
    id: 3,
    category: "Auto Parts",
    image: "/blog3.jpg",
    date: "13 Oct 2022",
    title: "SIGNS YOUR CAR NEEDS A NEW AC COMPRESSOR",
    description:
      "Bilmälvakt treskade i nibel den mobilmissbruk deren jyn nöning osk heterostik i rel ultran.",
    author: "sinan",
    comments: 3,
  },
  {
    id: 4,
    category: "Car Engines",
    image: "/blog4.jpg",
    date: "13 Oct 2022",
    title: "HOW TO FIND A QUALITY USED ENGINE FOR SALE",
    description:
      "Bilmälvakt treskade i nibel den mobilmissbruk deren jyn nöning osk heterostik i rel ultran.",
    author: "sinan",
    comments: 3,
  },
];

export default function OurLatestNews() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-6">
          <h2 className="text-xl font-bold text-red-500">Our Latest News</h2>
          <span className="text-sm text-gray-400">
          Don't miss out on this week's deals          
          </span>
           </div>
        <button className="text-red-600 font-semibold hover:text-red-800">
          View All →
        </button>
      </div>
      <div className="border-b border-red-500 mb-8" />

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogPosts.map((post: BlogPost) => (
          <div
            key={post.id}
            className="group bg-white rounded-lg shadow overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
          >
            <div className="relative">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded transition-colors duration-300 group-hover:bg-red-700">
                {post.category}
              </span>
            </div>

            <div className="p-4">
              <p className="text-gray-400 text-xs mb-1">{post.date}</p>
              <h3 className="text-sm font-semibold mb-2 group-hover:text-red-600 transition-colors duration-300">
                {post.title}
              </h3>
              <p className="text-gray-500 text-sm mb-4">{post.description}</p>

              <div className="flex justify-between text-gray-400 text-xs">
                <span>
                  by{" "}
                  <span className="font-semibold text-gray-600">{post.author}</span>
                </span>
                <span>{post.comments} comments</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
