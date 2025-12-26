const vscode = require('vscode');
const os = require('os');
const { exec } = require('child_process');

// Функция для получения имени пользователя
function getUsername() {
    return new Promise((resolve) => {
        // Сначала пробуем получить из Git
        exec('git config user.name', (gitError, gitName) => {
            if (!gitError && gitName.trim()) {
                resolve(gitName.trim());
                return;
            }
            
            // Если Git не настроен, берем имя системы
            const systemUser = os.userInfo().username || 'друг';
            resolve(systemUser);
        });
    });
}

// Функция активации плагина
async function activate() {
    console.log('Personal Greeter активирован!');
    
    // Получаем имя пользователя
    const username = await getUsername();
    
    // Показываем персонализированное приветствие
    vscode.window.showInformationMessage(`Привет, ${username}! Добро пожаловать в VS Code!`);
}

// Функция деактивации
function deactivate() {
    console.log('Personal Greeter деактивирован');
}

// Экспортируем функции
module.exports = {
    activate,
    deactivate
};
