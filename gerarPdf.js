const fs = require('fs');
const PDFDocument = require('pdfkit');

function gerarPdfGrande() {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream('arquivo-maior-que-3mb.pdf');
    doc.pipe(stream);

    // Adiciona conteúdo repetido para aumentar o tamanho do arquivo
    const textoGrande = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(5000); // Aumente o número para gerar mais conteúdo
    
    for (let i = 0; i < 5000; i++) {
        doc.text(textoGrande, {
            width: 410,
            align: 'left'
        });
    }

    doc.end();
}

gerarPdfGrande();
