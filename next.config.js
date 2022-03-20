module.exports = {
  async rewrites() {
    return [
      { source: "/surah/:path*", destination: "/surah/:path*" },
      { source: "/verse/:path*", destination: "/verse/:path*" },
      { source: "/:path*", destination: "/api/:path*" },
    ];
  },
};
