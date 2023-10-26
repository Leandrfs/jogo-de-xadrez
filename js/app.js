const board = document.getElementById('board');
const squares = [];
let selectedPiece = null;
let currentPlayer = 'white'; // Comece com o jogador branco

// Função para criar peças
function createPiece(type, color) {
  const piece = document.createElement('div');
  piece.className = 'piece';
  piece.textContent = type;
  piece.dataset.color = color;
  piece.dataset.type = type;
  return piece;
}

// Função para reproduzir o efeito sonoro de movimento
function playMoveSound() {
  const moveSound = document.getElementById('moveSound');
  moveSound.currentTime = 0; // Reiniciar o áudio se já estiver tocando
  moveSound.play();
}

// Função para reproduzir o efeito sonoro de captura
function playCaptureSound() {
  const captureSound = document.getElementById('captureSound');
  captureSound.currentTime = 0;
  captureSound.play();
}

// Função para criar o tabuleiro e as peças iniciais
function createBoard() {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement('div');
      square.className = 'square ' + ((row + col) % 2 ? 'black' : 'white');
      square.dataset.row = row;
      square.dataset.col = col;
      squares.push(square);
      board.appendChild(square);

      // Adicione as peças iniciais
      if (row === 0 || row === 7) {
        const pieceTypes = ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'];
        const pieceColor = row === 0 ? 'black' : 'white';
        const piece = createPiece(pieceTypes[col], pieceColor);
        square.appendChild(piece);
      } else if (row === 1 || row === 6) {
        const pieceType = '♙';
        const pieceColor = row === 1 ? 'black' : 'white';
        const piece = createPiece(pieceType, pieceColor);
        square.appendChild(piece);
      }

      square.addEventListener('click', () => {
        const piece = square.querySelector('.piece');

        // Verifique se é a vez do jogador atual e se há uma peça selecionada
        if (piece && piece.dataset.color === currentPlayer && selectedPiece === null) {
          selectedPiece = piece;
        } else if (selectedPiece && (!piece || piece.dataset.color !== currentPlayer)) {
          movePiece(selectedPiece.parentElement, square);
          selectedPiece = null;
          currentPlayer = currentPlayer === 'white' ? 'black' : 'white'; // Alterne o jogador
        } else {
          selectedPiece = null;
        }
      });
    }
  }
}

// Função para mover as peças
function movePiece(fromSquare, toSquare) {
  const piece = fromSquare.querySelector('.piece');

  // Verifica se a peça está sendo movida para uma casa com uma peça inimiga (captura)
  if (toSquare.children.length > 0) {
    const capturedPiece = toSquare.querySelector('.piece');
    capturedPiece.classList.add('captured');
    playCaptureSound(); // Reproduz o efeito sonoro de captura
    setTimeout(() => {
      capturedPiece.remove(); // Remove a peça capturada após um intervalo de tempo
    }, 500); // Tempo em milissegundos
  } else {
    playMoveSound(); // Reproduz o efeito sonoro de movimento
  }

  toSquare.appendChild(piece);
}

// Função para reiniciar o tabuleiro
function resetBoard() {
  board.innerHTML = '';
  squares.length = 0;
  createBoard();
  currentPlayer = 'white';
}

// Adicione o evento de clique para o botão de reiniciar
const resetButton = document.getElementById('resetButton');

resetButton.addEventListener('click', () => {
  resetBoard();
});

// Chame a função para criar o tabuleiro e as peças iniciais
createBoard();
