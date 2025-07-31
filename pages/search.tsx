import Image from "next/image";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type Product = {
  name: string;
  sku: string;
  box: string;
  location: string;
};

const sampleData: Product[] = [
  { name: 'mesh layered scrunch- black', sku: 'SK-', box: 'b5-3', location: '4층 ' },
  { name: '화이트 티셔츠', sku: 'TP-01234', box: 'B1-1', location: '1열 1층' },
  { name: '블랙 원피스', sku: 'DR-01999', box: 'B3-2', location: '3열 2층' },
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
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      {/* ✅ 로고 삽입 */}
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <Image
          src="/logo.png"
          alt="KINDABABY 로고"
          width={200}
          height={50}
        />
      </div>

      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>🔍 재고 검색</h1>
      <input
        type="text"
        placeholder="제품명, SKU, 박스번호 입력"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        style={{
          padding: '8px',
          fontSize: '16px',
          width: '300px',
          marginRight: '8px',
          border: '1px solid #ccc',
        }}
      />
      <button
        onClick={handleSearch}
        style={{
          padding: '8px 16px',
          fontSize: '16px',
          backgroundColor: '#222',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        검색
      </button>

      <ul style={{ marginTop: '2rem' }}>
        {results.length === 0 ? (
          <p style={{ color: '#888' }}>🔎 검색 결과 없음</p>
        ) : (
          results.map((item, i) => (
            <li key={i} style={{ marginBottom: '1rem' }}>
              <strong>{item.name}</strong> <br />
              SKU: {item.sku} | 박스: {item.box} | 위치: {item.location}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

