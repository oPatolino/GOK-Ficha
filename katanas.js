document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.ataque-dado, .ataque-bonus').forEach(select => {
        select.addEventListener('change', atualizarResultadoAtaque);
    });

    document.querySelectorAll('.gerar-ataque').forEach(button => {
        button.addEventListener('click', () => {
            const katanaDiv = button.closest('.katana');
            atualizarResultadoAtaque.call(katanaDiv);
        });
    });
});

function atualizarResultadoAtaque() {
    const katanaDiv = this.closest('.katana') || this;
    const dadoSelect = katanaDiv.querySelector('.ataque-dado');
    const bonusSelect = katanaDiv.querySelector('.ataque-bonus');
    const resultadoDiv = katanaDiv.querySelector('.resultado-ataque');

    const tipoDado = dadoSelect.value;
    const bonus = parseInt(bonusSelect.value, 10);

    let resultadoDado;
    switch (tipoDado) {
        case 'd4':
            resultadoDado = Math.floor(Math.random() * 4) + 1;
            break;
        case 'd6':
            resultadoDado = Math.floor(Math.random() * 6) + 1;
            break;
        case 'd8':
            resultadoDado = Math.floor(Math.random() * 8) + 1;
            break;
        case 'd10':
            resultadoDado = Math.floor(Math.random() * 10) + 1;
            break;
        case 'd12':
            resultadoDado = Math.floor(Math.random() * 12) + 1;
            break;
        case 'd20':
            resultadoDado = Math.floor(Math.random() * 20) + 1;
            break;
        default:
            resultadoDado = 0;
    }

    const resultadoFinal = resultadoDado + bonus;
    resultadoDiv.textContent = `Resultado: ${resultadoDado} + ${bonus} = ${resultadoFinal}`;
}

function salvar() {
    const katanas = [];
    document.querySelectorAll('.katana').forEach((katanaDiv) => {
        const katana = {
            nome: katanaDiv.querySelector('.katana-name').value,
            raridade: katanaDiv.querySelector('.katana-raridade').value,
            minerio: katanaDiv.querySelector('.katana-minerio').value,
            ataqueDado: katanaDiv.querySelector('.ataque-dado').value,
            ataqueBonus: katanaDiv.querySelector('.ataque-bonus').value,
            durabilidadeMax: katanaDiv.querySelector('.durabilidade-max').value,
            durabilidadeAtual: katanaDiv.querySelector('.durabilidade-atual').value
        };
        katanas.push(katana);
    });
    localStorage.setItem('katas', JSON.stringify(katanas));
    alert('Dados salvos com sucesso!');
}

function carregar() {
    const katanas = JSON.parse(localStorage.getItem('katas'));
    if (katanas) {
        document.querySelectorAll('.katana').forEach((katanaDiv, index) => {
            if (index < katanas.length) {
                const katana = katanas[index];
                katanaDiv.querySelector('.katana-name').value = katana.nome;
                katanaDiv.querySelector('.katana-raridade').value = katana.raridade;
                katanaDiv.querySelector('.katana-minerio').value = katana.minerio;
                katanaDiv.querySelector('.ataque-dado').value = katana.ataqueDado;
                katanaDiv.querySelector('.ataque-bonus').value = katana.ataqueBonus;
                katanaDiv.querySelector('.durabilidade-max').value = katana.durabilidadeMax;
                katanaDiv.querySelector('.durabilidade-atual').value = katana.durabilidadeAtual;
                katanaDiv.querySelector('.resultado-ataque').textContent = ''; // Limpar resultado ao carregar
            }
        });
        alert('Dados carregados com sucesso!');
    } else {
        alert('Nenhum dado encontrado para carregar.');
    }
}

function limpar() {
    if (confirm('Você tem certeza que deseja limpar todos os dados?')) {
        localStorage.removeItem('katas');
        document.querySelectorAll('.katana').forEach((katanaDiv) => {
            katanaDiv.querySelector('.katana-name').value = '';
            katanaDiv.querySelector('.katana-raridade').value = 'comum';
            katanaDiv.querySelector('.katana-minerio').value = 'ferro';
            katanaDiv.querySelector('.ataque-dado').value = 'd6';
            katanaDiv.querySelector('.ataque-bonus').value = '3';
            katanaDiv.querySelector('.durabilidade-max').value = '';
            katanaDiv.querySelector('.durabilidade-atual').value = '';
            katanaDiv.querySelector('.resultado-ataque').textContent = ''; // Limpar resultado ao limpar
        });
        alert('Dados limpos com sucesso!');
    }
}

