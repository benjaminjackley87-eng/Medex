import os

files_to_fix = [
    r"f:\Repositories\Medex\data\applied_anatomy\clinical_fundamentals_01.json",
    r"f:\Repositories\Medex\data\applied_anatomy\phys_git_01.json",
    r"f:\Repositories\Medex\data\applied_anatomy\cell_git_01.json"
]

for filepath in files_to_fix:
    if os.path.exists(filepath):
        # Open with binary or read raw content
        with open(filepath, "rb") as f:
            data = f.read()
        
        # Replace \x08eta with b"\\\\beta"
        data = data.replace(b"\x08eta", b"\\\\beta")
        data = data.replace(b"\x08", b"\\\\b") # general backspace escape fallback
        
        # Replace unescaped \% (which is b"\\%") with b"%"
        data = data.replace(b"\\%", b"%")
        data = data.replace(b"\\pm", b"\\\\pm")
        data = data.replace(b"\\Phi", b"\\\\Phi")
        
        with open(filepath, "wb") as f:
            f.write(data)
        
        print(f"Fixed binary escapes in {filepath}")
