// src/styles/formStyles.js

const formStyles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 'calc(100vh - 80px)',
    },
    form: {
      width: '100%',
      maxWidth: '400px',
      padding: '2rem',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      borderRadius: '10px',
      background: '#fff',
    },
    title: {
      textAlign: 'center',
      marginBottom: '1.5rem',
    },
    input: {
      width: '100%',
      padding: '0.8rem',
      margin: '0.5rem 0',
      border: '1px solid #ddd',
      borderRadius: '6px',
      fontSize: '1rem',
    },
    button: {
      width: '100%',
      padding: '0.8rem',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      fontSize: '1rem',
      cursor: 'pointer',
      marginTop: '1rem',
    }
  };
  
  export default formStyles;
  