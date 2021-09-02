module.exports = mongoose => {
    const Session = mongoose.model(
        "session",
        mongoose.Schema({
            userId: String,
            sessionId : String
        })
    );
    return Session;
}