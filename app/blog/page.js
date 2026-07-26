import Blog from "@/components/sections/Blog";

export const metadata = {
  title: "Blog",
  description: "Notes on frontend performance, systems, and building on the side — coming soon from Harshit Dixit.",
  alternates: { canonical: "/blog" },
};

export default function Page() {
  return <Blog />;
}
