path = r"f:\Repositories\Medex\data\applied_anatomy\clinical_fundamentals_01.json"
with open(path, "r", encoding="utf-8") as f:
    text = f.read()

# Let's inspect character index 7695 and surrounding 100 characters
start = max(0, 7695 - 50)
end = min(len(text), 7695 + 50)
print("Context around 7695:")
print(repr(text[start:end]))
print("Char at 7695:", repr(text[7695]))
