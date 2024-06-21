let showItem = false;

const items = [
    { name: 'スニッカーズ', rank: 'A', points: 4 },
    { name: 'たらたらしてんじゃね～よ', rank: 'A', points: 4 },
    { name: 'よっちゃんいか', rank: 'A', points: 4 },
    { name: 'ヤングドーナツ', rank: 'A', points: 4 },
    { name: 'フルーツの森', rank: 'B', points: 3 },
    { name: 'ベビースター', rank: 'B', points: 3 },
    { name: 'ガブリチュウ メロン、カラフル', rank: 'B', points: 3 },
    { name: 'サワーペーパーキャンディ', rank: 'B', points: 3 },
    { name: 'ポテトフライ', rank: 'B', points: 3 },
    { name: 'コーラグミ', rank: 'C', points: 2 },
    { name: 'ガブリチュウ グレープ、コーラ、ラムネ', rank: 'C', points: 2 },
    { name: 'おっとっと', rank: 'C', points: 2 },
    { name: 'ボーロ', rank: 'C', points: 2 },
    { name: 'もろこし輪太郎', rank: 'C', points: 2 },
    { name: 'キャベツ太郎', rank: 'C', points: 2 },
    { name: '玉葱さん太郎', rank: 'C', points: 2 },
    { name: '餅太郎', rank: 'D', points: 1 },
    { name: '蒲焼さん太郎', rank: 'D', points: 1 },
    { name: '焼肉さん太郎', rank: 'D', points: 1 },
    { name: 'とり焼きさん太郎', rank: 'D', points: 1 },
    { name: 'ワサビのり太郎', rank: 'D', points: 1 },
    { name: 'ラムネ', rank: 'D', points: 1 },
    { name: 'チーズおやつ', rank: 'D', points: 1 },
    { name: 'カルパス', rank: 'D', points: 1 },
    { name: 'うまい棒', rank: 'D', points: 1 },
    { name: 'スルメ板', rank: 'D', points: 1 }
];

let selectedItems = [];
let totalPoints = 0;
let totalItems = 0;

function showItemBoolean() {
    showItem = true;
    const showButton = document.getElementById('showButton');
    showButton.classList.add(`noVisible`);
    const resetButton = document.getElementById('resetButton');
    resetButton.classList.remove(`noVisible`);
    showItems();
    return;
};

function showItems() {
    if(!showItem) return;
    const chipCount = parseInt(document.getElementById('chipCount').value);
    const itemsContainer = document.getElementById('items');
    itemsContainer.innerHTML = '';

    if (chipCount >= 2) {
        const availableItems = items.filter(item => item.points <= (chipCount - totalPoints));
        availableItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('item');
            itemElement.textContent = `${item.name}`;
            const selectButton = document.createElement('button');
            selectButton.textContent = '選択';
            selectButton.onclick = () => selectItem(item, chipCount);
            itemElement.appendChild(selectButton);
            itemsContainer.appendChild(itemElement);
        });
    } else {
        itemsContainer.innerHTML = '<p>ランクDから2個選べます:</p>';
        const rankDItems = items.filter(item => item.rank === 'D');
        rankDItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('item');
            itemElement.textContent = `${item.name} (ランク: ${item.rank}, ポイント: ${item.points})`;
            const selectButton = document.createElement('button');
            selectButton.textContent = '選択';
            selectButton.onclick = () => selectItem(item, chipCount);
            itemElement.appendChild(selectButton);
            itemsContainer.appendChild(itemElement);
        });
    }
}

function selectItem(item, chipCount) {
    if (chipCount >= 2) {
        if (totalItems >= 5 || totalPoints + item.points > 20 || totalPoints + item.points > chipCount) {
            alert('最大で20ポイント分、5個、または保持チップの枚数を超える選択はできません。');
            return;
        }
    } else {
        if (totalItems >= 2 || totalPoints + item.points > 1) {
            const itemsContainer = document.getElementById('items');
            itemsContainer.innerHTML = '';
            return;
        }
    }

    selectedItems.push(item);
    totalPoints += item.points;
    totalItems += 1;

    updateSelectedItems();
    showItems();
}

function updateSelectedItems() {
    const selectedList = document.getElementById('selectedList');
    selectedList.innerHTML = '';
    selectedItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} (ランク: ${item.rank}, ポイント: ${item.points})`;
        selectedList.appendChild(listItem);
    });

    document.getElementById('totalPoints').textContent = totalPoints;
    document.getElementById('totalItems').textContent = totalItems;
}

function resetSelection() {
    selectedItems = [];
    totalPoints = 0;
    totalItems = 0;
    const showButton = document.getElementById('showButton');
    showButton.classList.remove(`noVisible`);
    const resetButton = document.getElementById('resetButton');
    resetButton.classList.add(`noVisible`);

    showItem = false;
    document.getElementById('chipCount').value = 0;
    updateSelectedItems();
    const itemsContainer = document.getElementById('items');
    itemsContainer.innerHTML = '';
}
//ok
