import About from "@/components/sections/About";

export const metadata = {
  title: "About",
  description:
    "Harshit Dixit — frontend-leaning software engineer from IIIT Lucknow with five-plus years building consumer web products at Acko and Bigbasket, now freelancing.",
  alternates: { canonical: "/about" },
};

export default function Page() {
  return <About />;
}
