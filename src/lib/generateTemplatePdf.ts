import jsPDF from "jspdf";

interface TemplateData {
  title: string;
  body: string[];
}

export function generateTemplatePdf(template: TemplateData) {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 60;
  const usableWidth = pageWidth - margin * 2;
  let y = 60;

  const addText = (
    text: string,
    fontSize: number,
    style: "normal" | "bold" | "italic" = "normal",
    spacing = 6
  ) => {
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", style);
    const lines = doc.splitTextToSize(text, usableWidth);
    for (const line of lines) {
      if (y > 720) {
        doc.addPage();
        y = 60;
      }
      doc.text(line, margin, y);
      y += fontSize + spacing;
    }
  };

  // Header
  addText(template.title, 16, "bold", 8);
  y += 10;
  addText("Justice With A Cause — Tenant Resource Template", 9, "italic", 4);
  y += 4;
  doc.setDrawColor(180);
  doc.line(margin, y, pageWidth - margin, y);
  y += 20;

  // Date placeholder
  addText(`Date: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`, 11, "normal", 4);
  y += 12;

  // Body paragraphs
  for (const paragraph of template.body) {
    if (paragraph.startsWith("##")) {
      y += 6;
      addText(paragraph.replace("## ", ""), 12, "bold", 4);
      y += 4;
    } else if (paragraph === "---") {
      y += 8;
    } else {
      addText(paragraph, 11, "normal", 4);
      y += 4;
    }
  }

  // Footer
  y += 20;
  doc.setDrawColor(180);
  doc.line(margin, y, pageWidth - margin, y);
  y += 14;
  doc.setFontSize(8);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(120);
  doc.text(
    "This template is for informational purposes only and does not constitute legal advice.",
    margin,
    y
  );
  y += 12;
  doc.text(
    "For specific legal guidance, consult with a licensed attorney. Provided by Justice With A Cause.",
    margin,
    y
  );

  doc.save(`${template.title.replace(/\s+/g, "_")}.pdf`);
}
