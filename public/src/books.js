function findAuthorById(authors, id) {
  const findAuthor = authors.find((author) => author.id === id);
  return findAuthor;
}

function findBookById(books, id) {
  const findBook = books.find((book) => book.id === id);
  return findBook;
}

function partitionBooksByBorrowedStatus(books) {
  const checkedOut = books.filter((book) => book.borrows.some((borrow) => !borrow.returned));
  const checkedIn = books.filter((book) => !book.borrows.some((borrow) => !borrow.returned));
  return [checkedOut, checkedIn];
}

function getBorrowersForBook(book, accounts) {
  return book.borrows.reduce((listOfBorrowers, borrow) => {
    if (listOfBorrowers.length < 10) {
      const account = accounts.find((account) => account.id === borrow.id);
      const accountBookDetails = {...borrow, ...account}
      listOfBorrowers.push(accountBookDetails);
    }
    return listOfBorrowers;
  }, []);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
