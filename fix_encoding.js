const fs = require('fs');
const path = require('path');

const directory = 'c:\\Users\\Rafael\\Documents\\Pagina buterfly prima';

const replacements = {
    'Ã±': 'ñ', 'Ã©': 'é', 'Ã­': 'í', 'Ã³': 'ó', 'Ãº': 'ú',
    'Ã¡': 'á', 'Ã‰': 'É', 'Ã"': 'Ó', 'Ãš': 'Ú', 'Ã': 'Á',
    'Â°': '°', 'Â¿': '¿', 'Â©': '©', 'Â®': '®',
    'Ã¼': 'ü', 'Ã¶': 'ö', 'Ã¤': 'ä',
    // Fix corrupted emojis - replace with simple text alternatives
    'ðŸŽ': '💎', 'âœ¨': '✨', 'ðŸŒ¸': '🌸', 'ðŸ‰': '💉',
    'ðŸ§´': '🧴', 'ðŸ¦‹': '🦋', 'ðŸ¸': '💸', 'ðŸŒŸ': '🌟',
    'ðŸ"·': '📷', 'ðŸ"˜': '📘', 'ðŸ"º': '📺', 'ðŸ§µ': '🧵',
    'ðŸ©¸': '🩸', 'ðŸ§': '💧', 'ðŸ"±': '📱', 'ðŸ"': '📍',
    'ðŸ"ž': '📞', 'âœ‰ï¸': '✉️', 'ðŸ§–': '🧖', 'âš¡': '⚡',
    'ðŸ"¥': '🔥'
};

const files = ['servicios.html', 'nosotros.html', 'contacto.html', 'turismo.html', 'casos-exito.html', 'index.html'];

files.forEach(file => {
    const filepath = path.join(directory, file);
    if (fs.existsSync(filepath)) {
        let content = fs.readFileSync(filepath, 'utf8');
        for (const [wrong, correct] of Object.entries(replacements)) {
            content = content.split(wrong).join(correct);
        }
        fs.writeFileSync(filepath, content, 'utf8');
        console.log('Fixed:', file);
    }
});

console.log('Done!');
