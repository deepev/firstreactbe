import app from './app';
import config from './src/config/config';
import connectDB from './src/config/db';

app.listen(config.PORT, async() => {
    console.log(`Backend server is runnig on port ${config.PORT}`),
    await connectDB();
}
);
