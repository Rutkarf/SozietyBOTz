const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const config = require('../src/config');

async function backupDatabase() {
  try {
    await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const collections = await mongoose.connection.db.listCollections().toArray();
    const backupDir = path.join(__dirname, '../backups');

    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir);
    }

    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const backupPath = path.join(backupDir, `backup_${timestamp}.json`);

    const backup = {};

    for (const collection of collections) {
      const documents = await mongoose.connection.db.collection(collection.name).find().toArray();
      backup[collection.name] = documents;
    }

    fs.writeFileSync(backupPath, JSON.stringify(backup, null, 2));

    console.log(`Sauvegarde de la base de données créée : ${backupPath}`);
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de la base de données :', error);
  } finally {
    await mongoose.connection.close();
  }
}

backupDatabase();
