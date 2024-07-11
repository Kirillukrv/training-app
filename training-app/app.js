const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const morgan = require('morgan');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const workoutRoutes = require('./routes/workoutRoutes');
const { logger } = require('./middlewares/logger');
const errorMiddleware = require('./middlewares/errorMiddleware');

dotenv.config();

const app = express();


app.use(express.json());
app.use(morgan('dev', { stream: logger.stream }));

app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: "main"}));
app.set('view engine', 'hbs');

const PORT = process.env.PORT || 3000;
const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

console.log('Connecting to DB:', DB);


const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Training Management API',
      version: '1.0.0',
      description: 'API for training management system',
    },
  },
  apis: ['./routes/*.js'], 
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/workouts', workoutRoutes);


app.use(errorMiddleware);

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('DB connection successful'))
  .catch((err) => console.log('DB connection error:', err));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});




