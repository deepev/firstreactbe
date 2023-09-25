import app from './app';
import config from './src/config/config';

app.listen(config.PORT, async () => {
    console.log(`Backend server is runnig on port ${config.PORT}`);
});
