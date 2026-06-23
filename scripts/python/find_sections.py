with open(r"f:\Repositories\Medex\primary_exam_study_guide.txt", "r", encoding="utf-8") as f:
    text = f.read()

# Let's search for "Anatomy" and "Physiology" in the text
import re
matches = re.finditer(r"(anatomy|physiology|pharmacology)", text, re.IGNORECASE)
for m in matches:
    start = max(0, m.start() - 100)
    end = min(len(text), m.end() + 100)
    print(f"Match '{m.group(0)}' at char {m.start()}:\n{text[start:end]}\n{'-'*40}")
