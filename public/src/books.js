function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const borrowedBooks = [];
  const returnedBooks = [];

  for (const book of books) {
    // Check if there's at least one active borrow for the book
    const isBorrowed = book.borrows.some((borrow) => !borrow.returned);

    // Add the book to the appropriate array based on borrowed status

    //     if (isBorrowed) {
    //       borrowedBooks.push(book);
    //     } else {
    //       returnedBooks.push(book);
    //     }
    isBorrowed ? borrowedBooks.push(book) : returnedBooks.push(book);
  }
  return [borrowedBooks, returnedBooks];
}

function getBorrowersForBook(book, accounts) {
  //iterate over each borrow in the borrows [] of books
  const allBorrowers = book.borrows.map((borrow) => {
    // destructures the borrow obj
    const { id, returned } = borrow;
    //find the maching id in the acc and returend
    const account = accounts.find((acc) => acc.id === id);
    return { ...account, returned };
  });
  //containing only the first 10 elements of all Borrowers
  const limitedBorrowers = allBorrowers.slice(0, 10);
  return limitedBorrowers;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
