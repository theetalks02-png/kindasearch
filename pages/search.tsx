import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';

type Product = {
  name: string;
  sku: string;
  box: string;
  location: string;
};

// 샘플 데이터 (나중에 엑셀에서 가져올 예정)
const sampleData: Product[] = [
  { name: 'mesh layered scrunch- black', sku: 'SK-', box: 'b5-3', location: '4층' },
  { name: 'mesh layered scrunch- white', sku: 'TP-01234', box: 'b5-3', location: '4층' },
  { name: 'mesh layered scrunch- brown', sku: 'DR-01999', box: 'b5-3', location: '4층' },
  { name: '연보라 니트탑', sku: 'TP-04601', box: 'B2-1', location: '2열 1층' },
];

export default function SearchPage() {
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

  // 인증 안된 경우
  if (!accessAllowed) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px', fontSize: '18px' }}>
        🚫 QR로 접속한 사람만 볼 수 있습니다.
        <br />
        주소에 <code>?key=onlyme123</code> 이 포함되어야 해요.
      </div>
    );
  }

  // 검색 처리 함수
  const handleSearch = () => {
    const filtered = sampleData.filter((item) =>
      item.name.includes(keyword) ||
      item.sku.includes(keyword) ||
      item.box.includes(keyword)
    );
    setResults(filtered);
  };

  return (
    <div
      style={{
        padding: '2rem',
        fontFamily: 'sans-serif',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Image src="/logo.png" alt="KINDABABY 로고" width={200} height={40} priority />
      </div>

      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '1rem' }}>🔍 재고 검색</h1>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
        <input
          type="text"
          placeholder="제품명, SKU, 박스번호 입력"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            flex: 1,
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: '10px 16px',
            fontSize: '16px',
            backgroundColor: '#222',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          검색
        </button>
      </div>

      <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
        {results.length === 0 ? (
          <p style={{ color: '#888' }}>🔎 검색 결과 없음</p>
        ) : (
          results.map((item, i) => (
            <li
              key={i}
              style={{
                background: '#f9f9f9',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1rem',
                border: '1px solid #ddd',
              }}
            >
              <strong>{item.name}</strong> <br />
              <span>SKU: {item.sku}</span> <br />
              <span>📦 박스: {item.box} | 위치: {item.location}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
