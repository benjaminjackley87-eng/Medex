with open(r"f:\Repositories\Medex\primary_exam_study_guide.txt", "r", encoding="utf-8") as f:
    text = f.read()

# Let's search for lines that look like list headers or headings
import re
lines = text.split("\n")
app2_started = False
for idx, line in enumerate(lines):
    if "Appendix Two - Study Guide" in line or "Appendix two" in line:
        app2_started = True
    if app2_started:
        # Check if it looks like a major header or section
        stripped = line.strip()
        if re.match(r"^\d+\.\s+", stripped):
            print(f"Line {idx+1}: {stripped}")
        elif re.match(r"^[a-z]\.\s+", stripped):
            # Print sublevel
            print(f"  Line {idx+1}: {stripped}")
        elif re.match(r"^[i|v|x]+\.\s+", stripped):
            # Print sub-sublevel
            print(f"    Line {idx+1}: {stripped}")
