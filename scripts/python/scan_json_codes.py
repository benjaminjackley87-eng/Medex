import os
import json
import re

directory = r"f:\Repositories\Medex\data\applied_anatomy"
json_files = [f for f in os.listdir(directory) if f.endswith(".json")]

print(f"Scanning {len(json_files)} JSON files for curriculum codes...")

# Patterns to find code like BT_PO 1.9 or BT_GS 1.1
code_pattern = re.compile(r"\b(BT|IT|AT|SS)_[A-Z]{2,3}\s*\d+(\.\d+)?\b", re.IGNORECASE)

matches_found = 0
for file in json_files:
    path = os.path.join(directory, file)
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    
    codes = code_pattern.findall(content)
    if codes:
        print(f"File {file}: found {len(codes)} code matches")
        matches_found += len(codes)

print(f"Total matches found: {matches_found}")
