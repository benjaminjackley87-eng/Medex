import re

path = r"f:\Repositories\Medex\primary_exam_study_guide.txt"
with open(path, "r", encoding="utf-8") as f:
    lines = f.readlines()

print("Analyzing Study Guide:")
for idx, line in enumerate(lines):
    if line.strip().isupper() and len(line.strip()) > 3:
        print(f"Line {idx+1}: {line.strip()}")
    elif "physiology" in line.lower() and len(line.strip()) < 80 and ("syllabus" in line.lower() or "study" in line.lower() or "learning" in line.lower() or "section" in line.lower()):
         print(f"Line {idx+1} (Physiology keyword): {line.strip()}")
    elif "anatomy" in line.lower() and len(line.strip()) < 80 and ("syllabus" in line.lower() or "study" in line.lower() or "learning" in line.lower() or "section" in line.lower()):
         print(f"Line {idx+1} (Anatomy keyword): {line.strip()}")
