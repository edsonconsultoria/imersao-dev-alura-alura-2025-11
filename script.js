document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.querySelector('.card-container');
    let linguagens = []; // Array para armazenar os dados das linguagens

    // Função para renderizar os cards na tela
    const renderizarCards = (dados) => {
        cardContainer.innerHTML = ''; // Limpa o container antes de adicionar novos cards
        dados.forEach(linguagem => {
            const card = document.createElement('article');
            card.className = 'card';
            card.innerHTML = `
                <h2>${linguagem.nome}</h2>
                <p>${linguagem.data_criacao}</p>
                <p>${linguagem.descricao}</p>
                <a href="${linguagem.link}" target="_blank" rel="noopener noreferrer">Documentação</a>
            `;
            cardContainer.appendChild(card);
        });
    };

    // Função para buscar os dados do JSON
    const carregarLinguagens = async () => {
        try {
            const response = await fetch('data.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            linguagens = await response.json();
            renderizarCards(linguagens);
        } catch (error) {
            console.error("Não foi possível carregar os dados das linguagens:", error);
            cardContainer.innerHTML = '<p>Erro ao carregar as informações.</p>';
        }
    };

    // Função de busca (chamada pelo botão no HTML)
    window.iniciarBusca = () => {
        const termoBusca = document.querySelector('header input').value.toLowerCase();
        const resultado = linguagens.filter(linguagem => 
            linguagem.nome.toLowerCase().includes(termoBusca)
        );
        renderizarCards(resultado);
    };

    // Carrega os dados iniciais quando a página é carregada
    carregarLinguagens();
});