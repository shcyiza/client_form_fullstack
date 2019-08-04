function generateDigitToken(length) {
    var result           = '';
    var characters       = '0123456789';
    var charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports = {generateDigitToken}