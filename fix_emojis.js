const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\Rafael\\Documents\\Pagina buterfly prima';
const files = ['index.html', 'servicios.html', 'nosotros.html', 'turismo.html', 'casos-exito.html'];

files.forEach(file => {
    const fp = path.join(dir, file);
    if (fs.existsSync(fp)) {
        let c = fs.readFileSync(fp, 'utf8');

        // Remove corrupted emojis patterns - just delete them
        c = c.replace(/ð[Ÿ][^\s<]{0,10}/g, '');
        c = c.replace(/âœ[^\s<]{0,5}/g, '');
        c = c.replace(/âš[^\s<]{0,5}/g, '');
        c = c.replace(/â€[^\s<]{0,3}/g, '•');

        fs.writeFileSync(fp, c, 'utf8');
        console.log('Fixed:', file);
    }
});

console.log('Done!');
