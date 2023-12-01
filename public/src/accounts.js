function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.slice().sort((accountA, accountB) => {
    // here we wille extract and convert last names to lowercase for case-insensitive comparison
    const lastNameA = accountA.name.last.toLowerCase();
    const lastNameB = accountB.name.last.toLowerCase();

    //     compare last name
    if (lastNameA < lastNameB) {
      return -1; // Return a negative value to indicate accountA should come before accountB
    } else if (lastNameA > lastNameB) {
      return 1; // Return a positive value to indicate accountA should come after accountB
    } else {
      return 0; // Return 0 if last names are equal
    }
  });
}

function getTotalNumberOfBorrows(account, books) {
  // extract the accountId from data
  const accountId = account.id;
  //count the nr.of books beeing barrows from the spesific account
  const totalBooks = books.reduce((acc, curr) => {
    //Check if the Id appars in the barrows [] for the curr book
    const barrwBook = curr.borrows.filter(
      (borrow) => borrow.id === accountId
    ).length;
    //adding the barrwBook to the acc
    return acc + barrwBook;
  }, 0);
  return totalBooks;
}

function getBooksPossessedByAccount(account, books, authors) {
  //Extract the accountId from data
  const accountId = account.id;

  //   filter books based on borrow status an account ID
  const borrowBooks = books.filter((book) => {
    const bookIsBorrow = book.borrows.some(
      (borrow) => borrow.id === accountId && !borrow.returned
    );
    return bookIsBorrow;
  });

  //Find author information to each borrowed book
  const booksWithAuthors = borrowBooks.map((book) => {
    //Find the author
    const author = authors.find((author) => author.id === book.authorId);
    return { ...book, author };
  });
  return booksWithAuthors;
}
module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
