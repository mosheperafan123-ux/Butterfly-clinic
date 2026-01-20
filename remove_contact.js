const fs = require('fs');
const path = require('path');

const directory = 'c:\\Users\\Rafael\\Documents\\Pagina buterfly prima';

const files = ['index.html', 'servicios.html', 'nosotros.html', 'turismo.html', 'casos-exito.html'];

files.forEach(file => {
    const filepath = path.join(directory, file);
    if (fs.existsSync(filepath)) {
        let content = fs.readFileSync(filepath, 'utf8');

        // Remove nav link to contacto
        content = content.replace(/<li><a href="contacto\.html" class="nav-link">Contacto<\/a><\/li>\s*/g, '');

        // Remove footer link to contacto
        content = content.replace(/<li><a href="contacto\.html">Contacto<\/a><\/li>\s*/g, '');

        // Update CTA buttons pointing to contacto.html to point to WhatsApp instead
        content = content.replace(/<a href="contacto\.html" class="btn btn-secondary btn-lg">\s*Contáctanos\s*<\/a>/g,
            '<a href="https://wa.me/573001234567?text=Hola,%20necesito%20información" class="btn btn-secondary btn-lg" target="_blank">WhatsApp</a>');

        content = content.replace(/<a href="contacto\.html" class="btn btn-secondary btn-lg">\s*Más Información\s*<\/a>/g,
            '<a href="servicios.html" class="btn btn-secondary btn-lg">Ver Servicios</a>');

        fs.writeFileSync(filepath, content, 'utf8');
        console.log('Updated:', file);
    }
});

console.log('Done!');
