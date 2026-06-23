import re

input_path = r"f:\Repositories\Medex\all_learning_objectives.txt"
output_path = r"f:\Repositories\Medex\extracted_learning_objectives.md"

with open(input_path, "r", encoding="utf-8") as f:
    text = f.read()

# We want to match codes like:
# IT_AM 1.1, BT_GS 1.12, AT_PO 2.3, SS_PA 1.27, BT_PO 1.82a, etc.
# Pattern: (IT|BT|AT|SS)_[A-Z]{2,3}\s*\d+(\.\d+)?[a-z]?
pattern = re.compile(r"\b((?:IT|BT|AT|SS)_[A-Z]{2,3}\s*\d+(?:\.\d+)?[a-z]?)\b")

lines = text.split("\n")
objectives = []
current_obj = None

for line in lines:
    match = pattern.search(line)
    if match:
        if current_obj:
            objectives.append(current_obj)
        code = match.group(1)
        # Extract the text after the code
        start_idx = line.find(code) + len(code)
        obj_text = line[start_idx:].strip()
        current_obj = {"code": code, "text": obj_text}
    elif current_obj:
        # Check if the line is a continuation of the objective
        stripped = line.strip()
        # Avoid page headers, footers, and metadata
        if stripped and not stripped.startswith("===") and not "Anaesthesia training program" in line and not "learning outcome" in line.lower() and not "Role Assessment" in line:
            current_obj["text"] += " " + stripped

if current_obj:
    objectives.append(current_obj)

print(f"Found {len(objectives)} learning objectives in the text.")

# Write the objectives to a markdown file
with open(output_path, "w", encoding="utf-8") as f:
    f.write("# ANZCA Curriculum Learning Objectives\n\n")
    f.write(f"Extracted {len(objectives)} learning objectives from v1.14 of the curriculum.\n\n")
    f.write("| Code | Learning Objective |\n")
    f.write("| :--- | :--- |\n")
    for obj in objectives:
        # Clean double spaces and formatting
        clean_text = re.sub(r"\s+", " ", obj["text"]).strip()
        # Escape pipe symbols for markdown table compatibility
        clean_text = clean_text.replace("|", "\\|")
        f.write(f"| `{obj['code']}` | {clean_text} |\n")

print(f"Wrote structured objectives to {output_path}")
