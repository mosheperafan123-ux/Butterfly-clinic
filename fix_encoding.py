import os
import re

# Directory with HTML files
directory = r"c:\Users\Rafael\Documents\Pagina buterfly prima"

# Replacement mapping for double-encoded UTF-8
replacements = {
    'Ã±': 'ñ', 'Ã©': 'é', 'Ã­': 'í', 'Ã³': 'ó', 'Ãº': 'ú', 
    'Ã¡': 'á', 'Ã': 'Á', 'Ã‰': 'É', 'Ã"': 'Ó', 'Ãš': 'Ú',
    'Â°': '°', 'Â¿': '¿', 'Â©': '©', 'Â®': '®',
    'â€"': '–', 'â€"': '—', 'â€œ': '"', 'â€': '"',
    'Ã¼': 'ü', 'Ã': 'Ü', 'Ã¶': 'ö', 'Ã¤': 'ä',
}

# Files to fix
html_files = ['servicios.html', 'nosotros.html', 'contacto.html', 'turismo.html', 'casos-exito.html']

for filename in html_files:
    filepath = os.path.join(directory, filename)
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8', errors='replace') as f:
            content = f.read()
        
        # Apply replacements
        for wrong, correct in replacements.items():
            content = content.replace(wrong, correct)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"Fixed: {filename}")
    else:
        print(f"Not found: {filename}")

print("Done!")
