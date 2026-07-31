from pathlib import Path
from pprint import pprint
import json

current_dir = Path(__file__).parent

json_path = current_dir / "document.json"

with open(json_path, "r", encoding="utf-8") as f:
    document = json.load(f)

children = document["body"]["children"]

for child in children[20:30]:
    pprint(child)
    typeOfchild = child['$ref'].split('/')[1]
    refNumber = int(child['$ref'].split('/')[2])
    print('child type - ',typeOfchild)
    print('refNumber - ',refNumber)
    if typeOfchild == 'texts':
        print('content - ',document[typeOfchild][refNumber]['text'])
    

    print("-" * 40)