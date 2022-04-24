const allowedOrigins = [
    'https://www.howdoyoulikeyoursalmon.com',
    'http://127.0.0.1:5500',
    'http://localhost:3500',
    'http://localhost:3000' 
]; //added 3000 to connect using axios

module.exports = allowedOrigins;

//this tells the browser that the content of these pages are accessible to certain origins.