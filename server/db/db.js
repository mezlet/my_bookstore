export const addBooks = (model, data) => {
  return model
    .create({ ...data })
    .then(response => {
      return response.dataValues;
    })
    .catch(error => {
      return { error };
    });
};

export const getBooks = async model => {
  try {
    const books = await model.findAll();
    return books;
  } catch (error) {
    return { error };
  }
};


export const getBookById = async (model, id) => {
  return model
    .findOne({ where: { id } })
    .then(response => {
      return response;
    })
    .catch(error => {
      return { error };
    });
};

export const editBook = async (model, data, id, done) => {

  const book = await model.findOne({ where: { id } });
  if (!book) {
    return {message: 'Book not found.'}
  }

  const updatedBook = await model.update(
    {
        ...data
    },
    { returning: true, where: { id}}
  );

  return updatedBook ? updatedBook : false;
};


export const deleteBook = async model => {
  try {
    const deletebook = await model.destroy();
    return deletebook;
  } catch (error) {
    return error;
  }
};
