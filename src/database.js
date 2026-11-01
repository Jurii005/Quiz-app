// database.js
// Acts as our database using localStorage (persists even after refresh/close).
// In a real production app, this logic would live on a server connected to
// MySQL/MongoDB. Here we simulate it entirely in the browser for learning purposes.

const USERS_KEY = "quizapp_users";
const RESULTS_KEY = "quizapp_results";
const CURRENT_USER_KEY = "quizapp_currentUser";
const LAST_ATTEMPT_KEY = "quizapp_lastAttempt";

// Safe read: returns the fallback if the key is missing or the JSON is corrupt
function read(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch {
        return fallback;
    }
}

function write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// ---------- Setup default accounts (runs once) ----------
function initDB() {
    if (!localStorage.getItem(USERS_KEY)) {
        write(USERS_KEY, [
            { username: "admin", password: "admin123", role: "admin" },
            { username: "testuser", password: "test123", role: "user" },
        ]);
    }
    if (!localStorage.getItem(RESULTS_KEY)) {
        write(RESULTS_KEY, []);
    }
}
initDB();

// ---------- User Management ----------
export function getAllUsers() {
    return read(USERS_KEY, []);
}

export function registerUser(username, password) {
    const users = getAllUsers();
    if (users.find((u) => u.username === username)) {
        return { success: false, message: "Username already taken" };
    }
    users.push({ username, password, role: "user" });
    write(USERS_KEY, users);
    return { success: true };
}

export function loginUser(username, password) {
    const found = getAllUsers().find(
        (u) => u.username === username && u.password === password
    );
    if (!found) return { success: false, message: "Invalid credentials" };

    // Never keep the password in the "current user" session record
    const sessionUser = { username: found.username, role: found.role };
    write(CURRENT_USER_KEY, sessionUser);
    return { success: true, user: sessionUser };
}

export function logoutUser() {
    localStorage.removeItem(CURRENT_USER_KEY);
}

export function getCurrentUser() {
    return read(CURRENT_USER_KEY, null);
}

// ---------- Results Management ----------
export function saveResult(resultObj) {
    const results = read(RESULTS_KEY, []);
    results.push(resultObj);
    write(RESULTS_KEY, results);
}

export function getResultsForUser(username) {
    return read(RESULTS_KEY, []).filter((r) => r.username === username);
}

export function getAllResults() {
    return read(RESULTS_KEY, []);
}

// ---------- Last Attempt (used to pass data to Result/Review pages) ----------
export function saveLastAttempt(attempt) {
    write(LAST_ATTEMPT_KEY, attempt);
}

export function getLastAttempt() {
    return read(LAST_ATTEMPT_KEY, null);
}
