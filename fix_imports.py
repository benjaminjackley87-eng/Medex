with open("src/pages/StudyHubView.tsx", "r") as f:
    content = f.read()

content = content.replace("import { motion, AnimatePresence } from 'motion/react';\\n", "")

with open("src/pages/StudyHubView.tsx", "w") as f:
    f.write(content)
