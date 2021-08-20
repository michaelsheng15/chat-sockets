const generateMessage = (text) =>{
    return {
        text, createdAt: new Date().getTime()
    }
}

const generateLocation = (url) => {
    return {
        url: url,
        createdAt: new Date().getTime()
    }
}

module.exports = {generateMessage, generateLocation}