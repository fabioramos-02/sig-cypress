// cypress/support/utils.ts

/**
 * Função para gerar texto Lorem Ipsum com N caracteres
 * @param {number} numCaracteres - Número de caracteres desejados
 * @returns {string} Texto Lorem Ipsum com o número exato de caracteres
 */
export const gerarLoremIpsum = (numCaracteres) => {
    const textoBase = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit..."; // Texto base
    let resultado = "";
    // Repete o texto base até atingir ou ultrapassar o número de caracteres desejado
    while (resultado.length < numCaracteres) {
        resultado += textoBase;
    }

    // Retorna exatamente os N caracteres, garantindo que o texto não ultrapasse o limite
    return resultado.substring(0, numCaracteres); 
};
