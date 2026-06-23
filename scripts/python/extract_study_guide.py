import pypdf

pdf_path = r"f:\Repositories\Medex\2026 HEY_Anaesthesia training program curriculum_v1.14_Final.pdf"
reader = pypdf.PdfReader(pdf_path)

out_path = r"f:\Repositories\Medex\primary_exam_study_guide.txt"
with open(out_path, "w", encoding="utf-8") as f:
    for idx in range(234, min(349, len(reader.pages))):
        f.write(f"--- PAGE {idx + 1} ---\n")
        text = reader.pages[idx].extract_text()
        if text:
            f.write(text)
        f.write("\n\n")

print("Wrote study guide pages to primary_exam_study_guide.txt")
