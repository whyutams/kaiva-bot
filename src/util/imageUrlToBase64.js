const axios = require('axios');

module.exports = async function imageToBase64(url) {
    try {
        const response = await axios.get(url, {
            responseType: 'arraybuffer'
        });
        return "data:image/png;base64,"+Buffer.from(response.data, 'binary').toString('base64');
    } catch (error) {
        console.error(`Failed to convert image to Base64: ${error.message}`);
        return null;
    }
};