
class Database {
    // Stub: diagnostics saving is now handled elsewhere (e.g., Postgres)
    async saveEmailToDiagnostics(recipient, subject, body) {
        // No-op
        return Promise.resolve();
    }
    async close() {
        return Promise.resolve();
    }
}

module.exports = new Database();
