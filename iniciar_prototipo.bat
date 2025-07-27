@echo off
echo ========================================
echo    PROTOTIPO DE NUMEROLOGIA v1.0
echo ========================================
echo.

REM Verifica se Python esta instalado
python --version >nul 2>&1
if errorlevel 1 (
    echo ERRO: Python nao encontrado!
    echo.
    echo Por favor, instale o Python primeiro:
    echo https://www.python.org/downloads/
    echo.
    echo Certifique-se de marcar "Add Python to PATH" durante a instalacao.
    echo.
    pause
    exit /b 1
)

REM Verifica se os arquivos necessarios existem
if not exist "index.html" (
    echo ERRO: Arquivo index.html nao encontrado!
    echo Certifique-se de que todos os arquivos estao na mesma pasta.
    pause
    exit /b 1
)

if not exist "chatbot.html" (
    echo ERRO: Arquivo chatbot.html nao encontrado!
    echo Certifique-se de que todos os arquivos estao na mesma pasta.
    pause
    exit /b 1
)

echo ✓ Python encontrado
echo ✓ Arquivos verificados
echo.
echo Iniciando servidor local na porta 8000...

REM Inicia o servidor HTTP em background
start /min cmd /c "python -m http.server 8000 && pause"

REM Aguarda o servidor inicializar
timeout /t 4 /nobreak >nul

echo ✓ Servidor iniciado
echo.
echo Abrindo navegador...

REM Abre o navegador com a pagina do chatbot
start http://localhost:8000/chatbot.html

echo.
echo ========================================
echo         PROTOTIPO FUNCIONANDO!
echo ========================================
echo.
echo 🌐 URLs disponiveis:
echo   • Chatbot interativo: http://localhost:8000/chatbot.html
echo   • Artigo completo:    http://localhost:8000/index.html
echo.
echo 🛑 Para parar o servidor:
echo   • Feche a janela do servidor (minimizada)
echo   • Ou pressione Ctrl+C na janela do servidor
echo.
echo 📁 Arquivos inclusos:
echo   • index.html (artigo principal)
echo   • chatbot.html (interface do bot)
echo   • chatbot.css (estilos)
echo   • chatbot.js (funcionalidade)
echo   • numerologia.js (calculos)
echo   • iniciar_prototipo.bat (este arquivo)
echo.
echo Pressione qualquer tecla para fechar esta janela...
pause >nul
