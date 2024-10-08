const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    /* await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }); */
    await mongoose.connect(process.env.DB_URL);
    console.info('DB online');
  } catch (error) {
    console.error(error);
    throw new Error('Error al inicializar BD');
  }
};

module.exports = { dbConnection };
