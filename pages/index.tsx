import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type Product = {
  name: string;
  sku: string;
  box: string;
  location: string;
};

// 샘플 데이터 (필요 시 확장 가능)
const sampleData: Product[] = [
  { name: 'mesh layered scrunch- black', sku: 'SK-0001', box: 'B5-3', location: '4층' },
  { name: '화이트 티셔츠', sku: 'TP-01234', box: 'B1-1', location: '1열 1층' },
  { name: '블랙 원피스', sku: 'DR-01999', box: 'B3-2', location: '3열 2층' },
  { name: '연보라 니트탑', sku: 'TP-04601', box: 'B2-1', location: '2열 1층' },
];

export default function Home() {
  const router = useRouter();

  const [accessAllowed, setAccessAllowed] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    const key = router.query.key;
    if (key === 'onlyme123') {
      setAccessAllowed(true);
    }
  }, [router.query]);

  if (!accessAllowed) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px', fontSize: '18px' }}>
        🚫 QR로 접속한 사람만 볼 수 있습니다.
        <br />
        주소에 <code>?key=onlyme123</code> 이 포함되어야 해요.
      </div>
    );
  }

  const handleSearch = () => {
    const filtered = sampleData.filter((item) =>
      item.name.includes(keyword) || item.sku.includes(keyword) || item.box.includes(keyword)
    );
    setResults(filtered);
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px' }}>📦 재고 검색</h1>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        <input
          type="text"
          placeholder="제품명, SKU, 박스번호 입력"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{
            flex: 1,
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: '10px 16px',
            fontSize: '16px',
            backgroundColor: '#333',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          검색
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {results.length === 0 ? (
          <p style={{ color: '#888' }}>🔍 검색 결과가 없습니다.</p>
        ) : (
          results.map((item, i) => (
            <li
              key={i}
              style={{
                backgroundColor: '#f8f8f8',
                padding: '12px',
                marginBottom: '10px',
                borderRadius: '6px',
                border: '1px solid #ddd',
              }}
            >
              <div style={{ fontWeight: 'bold' }}>{item.name}</div>
              <div>SKU: {item.sku}</div>
              <div>박스: {item.box}</div>
              <div>위치: {item.location}</div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
