import "./globals.css";

export const metadata = {
  title: "Harshit Dixit — Freelance Technical Consultant & Web Solutions Architect",
  description:
    "Five-plus years shipping frontend and full-stack systems for large consumer platforms. Now taking on select freelance and consulting work.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
