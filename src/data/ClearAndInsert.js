const mongoose = require('mongoose');

async function clearAndInsertData(models) {
  try {
    for (const { model, data } of models) {
      await model.deleteMany({}); 
      console.log(`Données de la collection ${model.modelName} supprimées.`);
      await model.insertMany(data);
      console.log(`Données de la collection ${model.modelName} insérées.`);
    }
  } catch (err) {
    console.error('Erreur lors de la suppression et insertion des données:', err);
  }
}

module.exports = { clearAndInsertData };
