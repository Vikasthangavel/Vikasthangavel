import os
import glob

def test_read():
    parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    components_path = os.path.join(parent_dir, "src", "components", "*.jsx")
    files = glob.glob(components_path)
    
    print(f"Found {len(files)} files")
    for f in files:
        print(os.path.basename(f))
        
    content = ""
    for f in files:
        with open(f, "r", encoding="utf-8") as file:
            content += file.read() + "\n\n"
    print(f"Total content length: {len(content)}")

if __name__ == "__main__":
    test_read()
