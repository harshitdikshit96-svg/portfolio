import { colors } from "@/lib/colors";

export default function Blog() {
  return (
    <section
      data-screen-label="Blog"
      style={{ padding: "120px 0", textAlign: "center", animation: "fadeUp 0.25s ease both", minHeight: "40vh" }}
    >
      <div style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: 60, color: colors.borderLight, marginBottom: 20 }}>
        {"{ }"}
      </div>
      <h2 style={{ fontSize: 30, fontWeight: 600, margin: "0 0 10px" }}>Writing, soon.</h2>
      <p style={{ fontSize: 16, color: colors.textFainter }}>
        Notes on frontend performance, systems, and building on the side — coming to this space.
      </p>
    </section>
  );
}
