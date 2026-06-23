import os
import json
import re

json_dir = r"f:\Repositories\Medex\data\applied_anatomy"
objectives_path = r"f:\Repositories\Medex\unique_learning_objectives.md"

# Load the JSON files and index their contents
json_contents = {}
for filename in os.listdir(json_dir):
    if filename.endswith(".json"):
        path = os.path.join(json_dir, filename)
        with open(path, "r", encoding="utf-8") as f:
            try:
                data = json.load(f)
                # Serialize the whole JSON as lowercase text for easy keyword matching
                json_contents[filename] = json.dumps(data).lower()
            except Exception as e:
                print(f"Error reading {filename}: {e}")

# Parse the unique learning objectives
objectives = []
with open(objectives_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

for row in lines[5:]:
    match = re.match(r"^\|\s*`([^`]+)`\s*\|\s*(.*)\s*\|$", row.strip())
    if match:
        code = match.group(1).strip()
        text = match.group(2).strip()
        objectives.append({"code": code, "text": text})

print(f"Loaded {len(objectives)} objectives and {len(json_contents)} database files.")

# Match each objective against our database
covered_count = 0
uncovered = []
mapping_stats = {file: 0 for file in json_contents.keys()}

# Basic keyword extraction helper
def extract_keywords(text):
    # Lowercase, remove symbols, extract words with len >= 4
    words = re.findall(r"\b[a-zA-Z]{4,}\b", text.lower())
    # Exclude common stop words
    stopwords = {"describe", "discuss", "outline", "explain", "evaluate", "particular", "including", "clinical", "anaesthesia", "patient", "management", "appropriate", "associated", "potential", "common", "select", "identify"}
    return [w for w in words if w not in stopwords]

for obj in objectives:
    text_lower = obj["text"].lower()
    keywords = extract_keywords(obj["text"])
    
    # Try to find a matching JSON file
    matched_files = []
    for filename, content in json_contents.items():
        # A simple heuristic: if a high percentage of unique keywords match the file content
        if not keywords:
            continue
        matches = [kw for kw in keywords if kw in content]
        match_ratio = len(matches) / len(keywords)
        
        # If we have very specific keywords matching (or high ratio)
        if match_ratio >= 0.6:
            matched_files.append((filename, match_ratio))
            
    if matched_files:
        covered_count += 1
        # Track which file matched best
        best_match = max(matched_files, key=lambda x: x[1])[0]
        mapping_stats[best_match] += 1
    else:
        uncovered.append(obj)

print(f"Gap Analysis Summary:")
print(f"Covered: {covered_count} / {len(objectives)} ({covered_count/len(objectives)*100:.1f}%)")
print(f"Uncovered: {len(uncovered)} / {len(objectives)} ({len(uncovered)/len(objectives)*100:.1f}%)")

print("\nDatabase File Match Counts:")
for file, count in sorted(mapping_stats.items(), key=lambda x: x[1], reverse=True):
    print(f" - {file}: matches {count} objectives")

# Group uncovered by prefix to see where the biggest gaps are
gaps_by_prefix = {}
for obj in uncovered:
    prefix = obj["code"].split(" ")[0]
    gaps_by_prefix[prefix] = gaps_by_prefix.get(prefix, 0) + 1

print("\nGaps by Curriculum Section:")
for prefix, count in sorted(gaps_by_prefix.items(), key=lambda x: x[1], reverse=True):
    print(f" - {prefix}: {count} uncovered objectives")

# Write some sample uncovered objectives to a gap analysis report
gap_report_path = r"f:\Repositories\Medex\gap_analysis_report.md"
with open(gap_report_path, "w", encoding="utf-8") as f:
    f.write("# Medex ANZCA Curriculum Gap Analysis Report\n\n")
    f.write(f"Matched **{covered_count}** objectives against the current database. Found **{len(uncovered)}** objectives without significant keyword overlap in the database.\n\n")
    
    f.write("## Major Gaps by Prefix\n\n")
    f.write("| Prefix | Section Description | Gap Count |\n")
    f.write("| :--- | :--- | :--- |\n")
    # Mapping prefixes to human readable sections
    prefix_map = {
        "SS_IC": "SSU Intensive Care",
        "AT_SQ": "Advanced Safety and Quality",
        "SS_PA": "SSU Paediatric Anaesthesia",
        "SS_OB": "SSU Obstetric Anaesthesia",
        "AT_RT": "Advanced Resuscitation, Trauma, Crisis",
        "BT_SQ": "Basic Safety and Quality",
        "AT_PO": "Advanced Perioperative Medicine",
        "SS_GG": "SSU General, Urology, Gynae, Endoscopy",
        "BT_PM": "Basic Pain Medicine",
        "AT_PM": "Advanced Pain Medicine",
        "SS_CS": "SSU Cardiac Surgery & Interventional Cardiology",
        "SS_NS": "SSU Neurosurgery & Neuroradiology",
        "SS_OR": "SSU Orthopaedic Surgery",
        "SS_VS": "SSU Vascular Surgery",
        "SS_HN": "SSU Head, Neck, ENT, Dental, ECT",
        "SS_PB": "SSU Plastic, Reconstructive & Burns",
        "AT_RA": "Advanced Regional & Local Anaesthesia",
        "SS_TS": "SSU Thoracic Surgery",
        "SS_OP": "SSU Ophthalmic Procedures"
    }
    for prefix, count in sorted(gaps_by_prefix.items(), key=lambda x: x[1], reverse=True):
        desc = prefix_map.get(prefix, "Other Section")
        f.write(f"| `{prefix}` | {desc} | {count} |\n")
        
    f.write("\n## Sample Uncovered Objectives\n\n")
    for prefix in sorted(gaps_by_prefix.keys())[:10]:
        f.write(f"### Section `{prefix}` ({prefix_map.get(prefix, 'Other')})\n\n")
        section_uncovered = [o for o in uncovered if o["code"].startswith(prefix)]
        for o in section_uncovered[:5]:
            f.write(f"- **`{o['code']}`**: {o['text']}\n")
        f.write("\n")

print(f"\nWrote detailed gap report to {gap_report_path}")
