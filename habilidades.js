document.addEventListener('DOMContentLoaded', () => {
    const addAbilityButton = document.getElementById('add-ability');
    const abilityContainer = document.getElementById('ability-container');
    const saveButton = document.getElementById('save-button');
    const loadButton = document.getElementById('load-button');
    const clearButton = document.getElementById('clear-button');

    addAbilityButton.addEventListener('click', () => {
        const template = document.getElementById('ability-template').content.cloneNode(true);
        const abilityDiv = template.querySelector('.ability');

        abilityDiv.querySelector('.generate-damage').addEventListener('click', () => generateDamage(abilityDiv));
        abilityDiv.querySelector('.remove-ability').addEventListener('click', () => removeAbility(abilityDiv));

        abilityContainer.appendChild(abilityDiv);
    });

    saveButton.addEventListener('click', () => saveAbilities());
    loadButton.addEventListener('click', () => loadAbilities());
    clearButton.addEventListener('click', () => clearAbilities());

    function generateDamage(abilityDiv) {
        const damageSelect = abilityDiv.querySelector('.damage');
        const quantitySelect = abilityDiv.querySelector('.quantity');
        const bonusSelect = abilityDiv.querySelector('.bonus');
        const resultDiv = abilityDiv.querySelector('.damage-result');

        const damageType = damageSelect.value;
        const quantity = parseInt(quantitySelect.value);
        const bonus = parseInt(bonusSelect.value);
        const results = [];

        for (let i = 0; i < quantity; i++) {
            const roll = Math.floor(Math.random() * parseInt(damageType.substring(1))) + 1;
            results.push(roll);
        }

        const totalDamage = results.reduce((acc, roll) => acc + roll, 0) + bonus;
        resultDiv.innerHTML = `Dano: ${results.join(', ')} (Total: ${totalDamage})`;
    }

    function removeAbility(abilityDiv) {
        abilityDiv.remove();
    }

    function saveAbilities() {
        const abilities = [];
        document.querySelectorAll('.ability').forEach(ability => {
            abilities.push({
                name: ability.querySelector('.name').value,
                damage: ability.querySelector('.damage').value,
                quantity: ability.querySelector('.quantity').value,
                bonus: ability.querySelector('.bonus').value,
                stamina: ability.querySelector('.stamina').value,
                level: ability.querySelector('.level').value,
                element: ability.querySelector('.element').value,
                effects: ability.querySelector('.effects').value,
                range: ability.querySelector('.range').value
            });
        });
        localStorage.setItem('abilities', JSON.stringify(abilities));
    }

    function loadAbilities() {
        const abilities = JSON.parse(localStorage.getItem('abilities') || '[]');
        abilityContainer.querySelectorAll('.ability').forEach(ability => ability.remove());

        abilities.forEach(ability => {
            const template = document.getElementById('ability-template').content.cloneNode(true);
            const abilityDiv = template.querySelector('.ability');

            abilityDiv.querySelector('.name').value = ability.name;
            abilityDiv.querySelector('.damage').value = ability.damage;
            abilityDiv.querySelector('.quantity').value = ability.quantity;
            abilityDiv.querySelector('.bonus').value = ability.bonus;
            abilityDiv.querySelector('.stamina').value = ability.stamina;
            abilityDiv.querySelector('.level').value = ability.level;
            abilityDiv.querySelector('.element').value = ability.element;
            abilityDiv.querySelector('.effects').value = ability.effects;
            abilityDiv.querySelector('.range').value = ability.range;

            abilityDiv.querySelector('.generate-damage').addEventListener('click', () => generateDamage(abilityDiv));
            abilityDiv.querySelector('.remove-ability').addEventListener('click', () => removeAbility(abilityDiv));

            abilityContainer.appendChild(abilityDiv);
        });
    }

    function clearAbilities() {
        abilityContainer.querySelectorAll('.ability').forEach(ability => ability.remove());
        localStorage.removeItem('abilities');
    }
});