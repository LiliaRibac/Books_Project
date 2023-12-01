function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  /* let count =0;
  
  for(const book of books){
   //we are cheking if is at least one book borrow && if the book is currently borrowed   
    if(book.borrows.length > 0 && !book.borrows[0].returned)
      // it incremented by 1 for each book that meets the criteria / and the is returend
      count++
  }
  return count 
  
*/
  let count = books.reduce((count, book) => {
    const isBorrowed = book.borrows.some((borrow) => !borrow.returned);
    return count + (isBorrowed ? 1 : 0);
  }, 0);
  return count;
}

function getMostCommonGenres(books) {
  //    count each genre
  const genreCounts = books.reduce((counts, book) => {
    const { genre } = book;
    counts[genre] = (counts[genre] || 0) + 1;
    return counts;
  }, {});

  const genreArray = [];
  // converting genre {} into an []
  for (const genre in genreCounts) {
    if (genreCounts.hasOwnProperty(genre)) {
      genreArray.push({ name: genre, count: genreCounts[genre] });
    }
  }
  // sorting the genre [] by coiunting descedent order
  genreArray.sort((a, b) => b.count - a.count);
  //extract the top five from the sorted []
  const mostCommonGenres = genreArray.slice(0, 5);
  return mostCommonGenres;
}

function getMostPopularBooks(books) {
  //cont the borrow for each book name and count
  const borrowBooks = books.map((book) => ({
    name: book.title,
    count: book.borrows.length,
  }));

  // sorted in descending order based on the count and extract the top 5
  borrowBooks.sort((a, b) => b.count - a.count);
  return borrowBooks.slice(0, 5);
}

function getAuthorById(authorId, authors) {
  return authors.find((author) => author.id === authorId);
}

function getMostPopularAuthors(books, authors) {
  return books
    .map((book) => {
      const author = authors.find((author) => author.id === book.authorId);
      return {
        name: `${author.name.first} ${author.name.last}`,
        count: book.borrows.length,
      };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}
// Modified getMostPopularAuthors using the helper function
function getMostPopularAuthors1(books, authors) {
  // Step 1: Create an Author Borrow Counts Object
  const authorBorrowCounts = {};

  books.forEach((book) => {
    const authorId = book.authorId;
    const borrowCount = book.borrows.length;

    if (authorBorrowCounts[authorId]) {
      authorBorrowCounts[authorId] += borrowCount;
    } else {
      authorBorrowCounts[authorId] = borrowCount;
    }
  });

  // Step 2: Sort Authors by Borrow Count
  const sortedAuthors = Object.entries(authorBorrowCounts)
    .map(([authorId, borrowCount]) => ({
      authorId,
      borrowCount,
    }))
    .sort((a, b) => b.borrowCount - a.borrowCount); // Sort authors by borrow count

  // Step 3: Return the Top N Most Popular Authors in the specified order
  const topAuthors = sortedAuthors.slice(0, 5);
  // console.log(topAuthors)
  // Step 4: Map author IDs to author objects using the helper function
  const topAuthorObjects = topAuthors.map((author) => {
    const authorObject = getAuthorById(Number(author.authorId), authors);

    return {
      name: `${authorObject.name.first} ${authorObject.name.last}`, // assuming authorObject.name is a string
      count: author.borrowCount,
    };
  });

  return topAuthorObjects;
}

// Helper function to get author object by ID
function getAuthorById(authorId, authors) {
  return authors.find((author) => author.id === authorId);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
