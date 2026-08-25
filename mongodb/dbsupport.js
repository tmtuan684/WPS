function getConnString(db) {
    return `mongodb+srv://tuantran24:Blessed@cluster0.lberqlg.mongodb.net/${db}?appName=cluster0`;
}

module.exports = { getConnString };