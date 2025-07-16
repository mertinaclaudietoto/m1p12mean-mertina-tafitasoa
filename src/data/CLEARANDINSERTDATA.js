async function clearAndInsertData(models) {
  try {
    for (const { model, data } of models) {
      // await model.deleteMany({});
      await model.collection.drop();
      // console.log(model)
      await model.insertMany(data);
    }
  } catch (err) {
    console.error(
      "Error while deleting and inserting data:",
      err
    );
  }
}

module.exports = { clearAndInsertData };
