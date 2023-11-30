function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  const booksBorrowed = books.filter((book) => book.borrows.some((borrow) => !borrow.returned));
  return booksBorrowed.length;
}

function getMostCommonGenres(books) {
  const numberOfBooks = {};
  books.forEach((book) => {
    if (book.genre) {
      numberOfBooks[book.genre] = (numberOfBooks[book.genre] || 0) + 1;
    }
  });

  const arrayBooks = Object.keys(numberOfBooks).map((genre) => ({
    name: genre,
    count: numberOfBooks[genre],
  }));

  arrayBooks.sort((genreA, genreB) => genreB.count - genreA.count);

  const topFive = [];
  for (let i = 0; i < 5; i++) {
    topFive.push(arrayBooks[i]);
  }
  return topFive;
}

function getMostPopularBooks(books) {
  const numberOfTimes = {};
  books.forEach((book) => {
    if (book.borrows.length > 0) {
      numberOfTimes[book.title] = book.borrows.length;
    }
  });

  const arrayPopular = Object.keys(numberOfTimes).map((title) => ({
    name: title,
    count: numberOfTimes[title],
  }));

  arrayPopular.sort((titleA, titleB) => titleB.count - titleA.count);

  const topFivePopular = [];
  for (let i = 0; i < 5; i++) {
    topFivePopular.push(arrayPopular[i]);
  }
  return topFivePopular;
}


function getMostPopularAuthors(books, authors) {
  const booksCountAuthor = {};
  books.forEach((book) => {
    const authorId = book.authorId;
    if (booksCountAuthor[authorId]) {
      booksCountAuthor[authorId] += book.borrows.length; 
    } else {
      booksCountAuthor[authorId] = book.borrows.length;
    }
  });
  const authorsArray = authors.map((author) => ({
    name: `${author.name.first} ${author.name.last}`,
    count: booksCountAuthor[author.id] || 0,
  }));

  const popularAuthors = authorsArray.sort((authorA, authorB) => authorB.count - authorA.count);

  const topFiveAuthors = [];
  for (let i = 0; i < 5; i++) {
    topFiveAuthors.push(popularAuthors[i]);
  }
  return topFiveAuthors;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
