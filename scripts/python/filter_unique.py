import re

input_path = r"f:\Repositories\Medex\extracted_learning_objectives.md"
output_path = r"f:\Repositories\Medex\unique_learning_objectives.md"

with open(input_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

header = lines[:4]
table_rows = lines[4:]

unique_objs = {}
for row in table_rows:
    match = re.match(r"^\|\s*`([^`]+)`\s*\|\s*(.*)\s*\|$", row.strip())
    if match:
        code = match.group(1).strip()
        text = match.group(2).strip()
        
        # Standardize the code naming (e.g. spaces)
        std_code = re.sub(r"\s+", " ", code).upper()
        
        # If code already exists, keep the longer description or first one
        if std_code not in unique_objs or len(text) > len(unique_objs[std_code]):
            unique_objs[std_code] = text

print(f"Total unique objectives: {len(unique_objs)}")

# Sort by code name
sorted_codes = sorted(unique_objs.keys())

with open(output_path, "w", encoding="utf-8") as f:
    f.write("# Unique ANZCA Curriculum Learning Objectives\n\n")
    f.write(f"Found {len(unique_objs)} unique learning objectives.\n\n")
    f.write("| Code | Learning Objective |\n")
    f.write("| :--- | :--- |\n")
    for code in sorted_codes:
        f.write(f"| `{code}` | {unique_objs[code]} |\n")

print(f"Wrote unique objectives to {output_path}")
