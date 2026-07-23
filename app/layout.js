import "./globals.css";

const title = "Harshit Dixit — Freelance Technical Consultant & Web Solutions Architect";
const description =
  "Five-plus years shipping frontend and full-stack systems for large consumer platforms. Now taking on select freelance and consulting work.";

export const metadata = {
  metadataBase: new URL("https://www.harshitcreates.in"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://www.harshitcreates.in",
    siteName: "harshit.dev",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
