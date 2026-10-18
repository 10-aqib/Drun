import re
import os

with open(r"c:\Users\aqibk\Drun\src\data\products.ts", "r", encoding="utf-8") as f:
    text = f.read()

ids = re.findall(r'id:\s*"(drun-\d+)"', text)
print(f"Total products found in products.ts: {len(ids)}")
print("Product IDs:", ids)
