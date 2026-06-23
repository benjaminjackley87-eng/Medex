import os

files_to_fix = [
    r"f:\Repositories\Medex\data\applied_anatomy\clinical_fundamentals_01.json",
    r"f:\Repositories\Medex\data\applied_anatomy\phys_git_01.json",
    r"f:\Repositories\Medex\data\applied_anatomy\cell_git_01.json"
]

replacements = [
    (r"\alpha", r"\\alpha"),
    (r"\beta", r"\\beta"),
    (r"\Phi", r"\\Phi"),
    (r"\approx", r"\\approx"),
    (r"\text", r"\\text"),
    (r"\rightleftharpoons", r"\\rightleftharpoons"),
    (r"\right", r"\\right"),
    (r"\left", r"\\left"),
    (r"\text", r"\\text"),
    (r"\frac", r"\\frac"),
    (r"\times", r"\\times")
]

for filepath in files_to_fix:
    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        
        # We need to be careful: if a character is already escaped (e.g. \\alpha), don't double escape it.
        # So we look for backslashes that are NOT preceded by a backslash.
        # But a simple way is to replace double backslashes with placeholders, do single replacements, and convert back.
        # Or even simpler, in Python we can read and write the string representation properly.
        # Let's do raw replacement of exact strings:
        for old, new in replacements:
            # Only replace if old is preceded by a single backslash (not double)
            # A simple regex can do this: (?<!\\)\old
            # For simplicity, let's replace double backslashes with a temp token first
            content = content.replace("\\\\", "DOUBLE_BACKSLASH_PLACEHOLDER")
            content = content.replace(old, new)
            content = content.replace("DOUBLE_BACKSLASH_PLACEHOLDER", "\\\\")
        
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Fixed escapes in {filepath}")
