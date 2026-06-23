import os
import json

json_dir = r"f:\Repositories\Medex\data\applied_anatomy"
for file in os.listdir(json_dir):
    if file.endswith(".json") and file != "graph_index.json":
        path = os.path.join(json_dir, file)
        try:
            with open(path, "r", encoding="utf-8") as f:
                json.load(f)
        except json.JSONDecodeError as e:
            print(f"File {file} has JSON error: {e}")
            # Print the offending lines around the error
            with open(path, "r", encoding="utf-8") as f:
                lines = f.readlines()
            start = max(0, e.lineno - 5)
            end = min(len(lines), e.lineno + 5)
            print(f"Offending lines ({start+1} to {end}):")
            for idx in range(start, end):
                print(f"  {idx+1}: {lines[idx].strip()}")
