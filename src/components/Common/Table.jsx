import './Table.css';

// Table컴포넌트는 열의 제목들이 배열로 입력되면 제목들을 th태그로 만듬
// children 자식태그들을 표시함.
const Table = ({ headings, children }) => {
  return (
    <table className="common_table">
      <thead>
        <tr>
          {headings.map((item, index) => (
            <th key={index}>{item}</th>
          ))}
        </tr>
      </thead>
      {children}
    </table>
  );
};

export default Table;
