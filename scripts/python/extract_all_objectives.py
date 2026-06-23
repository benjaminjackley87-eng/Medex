import pypdf

pdf_path = r"f:\Repositories\Medex\2026 HEY_Anaesthesia training program curriculum_v1.14_Final.pdf"
reader = pypdf.PdfReader(pdf_path)

out_path = r"f:\Repositories\Medex\all_learning_objectives.txt"
print(f"Extracting pages from page 21 (index 20) to the end ({len(reader.pages)})")

with open(out_path, "w", encoding="utf-8") as f:
    for idx in range(20, len(reader.pages)):
        f.write(f"=== PAGE {idx + 1} ===\n")
        text = reader.pages[idx].extract_text()
        if text:
            f.write(text)
        f.write("\n\n")

print("Done! Extracted all pages to all_learning_objectives.txt")
