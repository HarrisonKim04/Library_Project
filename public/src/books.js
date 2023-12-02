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

//Helper function to find account by id number
function findAccount(accounts, id) {
  return accounts.find((account) => account.id === id);
}
//Helper function to combine the data from borrow and account details
function combineData(borrow, account) {
  return {...borrow, ...account};
}
//Helper function to find the list of borrowers up to 10
function getBorrowersForBook(book,accounts) {
  return book.borrows.reduce((listOfBorrowers, borrow) => {
    if (listOfBorrowers.length < 10) {
      const account = findAccount(accounts, borrow.id);
      const accountBookDetails = combineData(borrow, account);
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
