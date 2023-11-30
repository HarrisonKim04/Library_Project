function findAccountById(accounts, id) {
  const findAccount = accounts.find((account) => account.id === id);
  return findAccount;
}

function sortAccountsByLastName(accounts) {
  const sortAccounts = accounts.sort((accountA, accountB) => accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1);
  return sortAccounts
}

function getTotalNumberOfBorrows(account, books) {
  let getTotalNumber = books.reduce((total, book) => {
    book.borrows.forEach((borrow) => {
      if (borrow.id === account.id) {
        total += 1;
      }
    });
    return total;
  }, 0);

  return getTotalNumber;
}

function getBooksPossessedByAccount(account, books, authors) {
  const checkedBooks = books.filter((book) => 
    book.borrows.some((borrow) => borrow.id === account.id && !borrow.returned)
  );
  
  const checkedOutDetails = checkedBooks.map((book) => {
    const specificAuthor = authors.find((author) => author.id === book.authorId);
    return {
      ...book, author: specificAuthor,
    };
  });
  return checkedOutDetails;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
