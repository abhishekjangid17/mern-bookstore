const BookCard = ({ book }) => {
    return (
      <div style={{
        border: '1px solid #ccc',
        padding: '1rem',
        width: '200px',
        borderRadius: '8px'
      }}>
        <img src={book.image} alt={book.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
        <h3>{book.title}</h3>
        <p><b>Author:</b> {book.author}</p>
        <p><b>Price:</b> ₹{book.price}</p>
        <p>{book.category}</p>
      </div>
    );
  };
  
  export default BookCard;
  