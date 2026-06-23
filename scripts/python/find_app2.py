with open(r"f:\Repositories\Medex\primary_exam_study_guide.txt", "r", encoding="utf-8") as f:
    text = f.read()

import re
match = re.search(r"Appendix\s+(Two|2)", text, re.IGNORECASE)
if match:
    print("Found Appendix 2 at position:", match.start())
    print(text[match.start():match.start()+1500])
else:
    print("Appendix 2 not found by regex!")
    # Let's print the first 2000 characters of the file
    print("First 1500 chars of file:")
    print(text[:1500])
