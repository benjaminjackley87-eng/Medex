import re

path = r"f:\Repositories\Medex\data\applied_anatomy\clinical_fundamentals_01.json"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Let's clean up the Faraday's law portion:
# Replace any amount of backslashes before Phi with exactly two: \\Phi
content = re.sub(r'\\+Phi', r'\\\\Phi', content)
content = re.sub(r'\\+alpha', r'\\\\alpha', content)
content = re.sub(r'\\+beta', r'\\\\beta', content)
content = re.sub(r'\\+pm', r'\\\\pm', content)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("Cleaned up clinical_fundamentals_01.json math escapes")
