// Função para gerar resultados de dados
function rollDice(sides) {
    const quantity = parseInt(document.getElementById(`d${sides}-quantity`).value, 10);
    const resultsContainer = document.getElementById(`d${sides}-results`);
    resultsContainer.innerHTML = ''; // Limpa os resultados anteriores

    for (let i = 0; i < quantity; i++) {
        const result = Math.floor(Math.random() * sides) + 1;
        const resultElement = document.createElement('div');
        resultElement.textContent = `D${sides} Roll ${i + 1}: ${result}`;
        resultsContainer.appendChild(resultElement);
    }
}

// Função para calcular e atualizar o SG
function updateSG() {
    const touch = parseInt(document.getElementById('touch-current').value, 10);
    const hearing = parseInt(document.getElementById('hearing-current').value, 10);
    const vision = parseInt(document.getElementById('vision-current').value, 10);

    if (!isNaN(touch) && !isNaN(hearing) && !isNaN(vision)) {
        const sg = Math.floor((touch + hearing + vision) / 3);
        document.getElementById('luck-current').value = sg;
    }
}

// Função para salvar os dados no localStorage
function saveData() {
    const data = {
        name: document.getElementById('name').value,
        race: document.getElementById('race').value,
        origin: document.getElementById('origin').value,
        coins: document.getElementById('coins').value,
        level: document.getElementById('level').value,
        xp: document.getElementById('xp').value,
        attributes: {
            agility: document.getElementById('agility-current').value,
            agilityBonus: document.getElementById('agility-bonus').value,
            strength: document.getElementById('strength-current').value,
            strengthBonus: document.getElementById('strength-bonus').value,
            intellect: document.getElementById('intellect-current').value,
            intellectBonus: document.getElementById('intellect-bonus').value,
            maxHealth: document.getElementById('max-health').value,
            currentHealth: document.getElementById('current-health').value,
            maxStamina: document.getElementById('max-stamina').value,
            currentStamina: document.getElementById('current-stamina').value
        },
        senses: {
            touch: document.getElementById('touch-current').value,
            hearing: document.getElementById('hearing-current').value,
            vision: document.getElementById('vision-current').value
        },
        combat: {
            physicalResistance: document.getElementById('physical-resistance-current').value,
            physicalResistanceBonus: document.getElementById('physical-resistance-bonus').value,
            magicalResistance: document.getElementById('magical-resistance-current').value,
            magicalResistanceBonus: document.getElementById('magical-resistance-bonus').value,
            physicalEfficiency: document.getElementById('physical-efficiency-current').value,
            physicalEfficiencyBonus: document.getElementById('physical-efficiency-bonus').value,
            magicalEfficiency: document.getElementById('magical-efficiency-current').value,
            magicalEfficiencyBonus: document.getElementById('magical-efficiency-bonus').value,
            speed: document.getElementById('speed-current').value,
            speedBonus: document.getElementById('speed-bonus').value
        }
    };
    localStorage.setItem('characterData', JSON.stringify(data));
}

// Função para carregar os dados do localStorage
function loadData() {
    const data = JSON.parse(localStorage.getItem('characterData'));

    if (data) {
        document.getElementById('name').value = data.name;
        document.getElementById('race').value = data.race;
        document.getElementById('origin').value = data.origin;
        document.getElementById('coins').value = data.coins;
        document.getElementById('level').value = data.level;
        document.getElementById('xp').value = data.xp;
        
        // Preenchendo os atributos
        document.getElementById('agility-current').value = data.attributes.agility;
        document.getElementById('agility-bonus').value = data.attributes.agilityBonus;
        document.getElementById('strength-current').value = data.attributes.strength;
        document.getElementById('strength-bonus').value = data.attributes.strengthBonus;
        document.getElementById('intellect-current').value = data.attributes.intellect;
        document.getElementById('intellect-bonus').value = data.attributes.intellectBonus;
        document.getElementById('max-health').value = data.attributes.maxHealth;
        document.getElementById('current-health').value = data.attributes.currentHealth;
        document.getElementById('max-stamina').value = data.attributes.maxStamina;
        document.getElementById('current-stamina').value = data.attributes.currentStamina;
        
        // Preenchendo os sentidos
        document.getElementById('touch-current').value = data.senses.touch;
        document.getElementById('hearing-current').value = data.senses.hearing;
        document.getElementById('vision-current').value = data.senses.vision;
        
        // Preenchendo os status de combate
        document.getElementById('physical-resistance-current').value = data.combat.physicalResistance;
        document.getElementById('physical-resistance-bonus').value = data.combat.physicalResistanceBonus;
        document.getElementById('magical-resistance-current').value = data.combat.magicalResistance;
        document.getElementById('magical-resistance-bonus').value = data.combat.magicalResistanceBonus;
        document.getElementById('physical-efficiency-current').value = data.combat.physicalEfficiency;
        document.getElementById('physical-efficiency-bonus').value = data.combat.physicalEfficiencyBonus;
        document.getElementById('magical-efficiency-current').value = data.combat.magicalEfficiency;
        document.getElementById('magical-efficiency-bonus').value = data.combat.magicalEfficiencyBonus;
        document.getElementById('speed-current').value = data.combat.speed;
        document.getElementById('speed-bonus').value = data.combat.speedBonus;

        // Atualiza o SG
        updateSG();
    }
}

// Função para limpar os dados
function clearData() {
    document.querySelectorAll('input, select').forEach(el => {
        el.value = '';
    });
    document.getElementById('luck-current').value = '0';
    document.querySelectorAll('#d6-results, #d8-results, #d10-results, #d12-results, #d20-results').forEach(el => {
        el.innerHTML = '';
    });
}

// Adiciona eventos de mudança para atualizar o SG em tempo real
document.querySelectorAll('#touch-current, #hearing-current, #vision-current').forEach(el => {
    el.addEventListener('input', updateSG);
});