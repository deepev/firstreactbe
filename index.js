const app = require('./app');
const config = require('./src/config/config');

app.listen(config.PORT, async () => {
    console.log(`Backend server is runnig on port ${config.PORT}`);
});
