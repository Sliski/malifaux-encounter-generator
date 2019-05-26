import ls from 'local-storage';
import io from 'socket.io-client';
import { API_URL } from './config';

const beta = ls.get('betaUser');
export const socket = beta ? io(API_URL) : undefined;

// socket.io
export function joinRoom(room) {
  socket.emit('joinRoom', room);
}

export function leaveRoom(room) {
  socket.emit('leaveRoom', room);
}

// rest api
export function setSocket(onSuccess) {
  if (!beta) return;
  fetch(`${API_URL}/set-socket/${socket.id}`, { credentials: 'include' })
    .then(response => response.json()).then(onSuccess);
}

export function currentUser(onSuccess) {
  if (!beta) return;
  fetch(`${API_URL}/current-user`, { credentials: 'include' })
    .then(response => response.json()).then(onSuccess);
}

export function signOut(onSuccess) {
  if (!beta) return;
  fetch(`${API_URL}/sign-out`, { credentials: 'include' })
    .then(response => response.text()).then(onSuccess);
}

export function createGame(encounterId, multiplayer, onSuccess) {
  if (!beta) return;
  fetch(`${API_URL}/create-game/${encounterId}/${multiplayer}`, { credentials: 'include' })
    .then(response => response.json()).then(onSuccess);
}

export function joinGame(gameId, onSuccess) {
  if (!beta) return;
  fetch(`${API_URL}/join-game/${gameId}`, { credentials: 'include' })
    .then(response => response.json()).then(onSuccess);
}

export function chooseSchemes(gameId, schemes, onSuccess) {
  if (!beta) return;
  fetch(`${API_URL}/choose-schemes`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify({ gameId, schemes: JSON.stringify(schemes) }),
  })
    .then(response => response.json()).then(onSuccess);
}

export function startRound(gameId, round, onSuccess) {
  if (!beta) return;
  fetch(`${API_URL}/start-round/${gameId}/${round}`, { credentials: 'include' })
    .then(response => response.json()).then(onSuccess);
}

export function scoreStrategy(gameId, score, onSuccess) {
  if (!beta) return;
  fetch(`${API_URL}/score-strategy/${gameId}/${score}`, { credentials: 'include' })
    .then(response => response.json()).then(onSuccess);
}

export function revealScheme(gameId, schemeId, onSuccess) {
  if (!beta) return;
  fetch(`${API_URL}/reveal-scheme/${gameId}/${schemeId}`, { credentials: 'include' })
    .then(response => response.json()).then(onSuccess);
}

export function scoreScheme(gameId, schemeId, score, onSuccess) {
  if (!beta) return;
  fetch(`${API_URL}/score-scheme/${gameId}/${schemeId}/${score}`, { credentials: 'include' })
    .then(response => response.json()).then(onSuccess);
}

export function loadAppState(gameId, onSuccess) {
  if (!beta) return;
  fetch(`${API_URL}/load-app-state/${gameId}`, { credentials: 'include' })
    .then(response => response.json()).then(onSuccess);
}

export function endGame(gameId, onSuccess) {
  if (!beta) return;
  fetch(`${API_URL}/end-game/${gameId}`, { credentials: 'include' })
    .then(response => response.json()).then(onSuccess);
}
