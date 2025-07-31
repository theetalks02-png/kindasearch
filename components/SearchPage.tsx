// components/SearchPage.tsx

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type Product = {
  name: string;
  sku: string;
  box: string;
  location: string;
};

// 샘플 데이터 (나중에 엑셀 연동 시 이 부분만 교체)
const sampleData: Product[] = [
  { name: 'mesh layered scrunch- black', sku: 'SK-0001', box: 'B5-3', location: '4층' },
  { name: '화이트 티셔츠',        sku: 'TP-01234', box: 'B1-1', location: '1열 1층' },
  { name: '블랙 원피스',          sku: 'DR-01999', box: 'B3-2', location: '3열 2층' },
  { name: '연보라 니트탑',        sku: 'TP-04601', box: 'B2-1', location: '2열 1층' },
];

export default function SearchPage() {
  const router = useRouter();
  const [accessAllowed, setAccessAllowed] = useState(false);
  const [keyword, setKeyword]       = useState('');
  const [results, setResults]       = useState<Product[]>([]);

  // QR 인증 키 체크
  useEffect(() => {
    if (router.query.key === 'onlyme123') setAccessAllowed(true);
  }, [router.query]);

  // 인증 없으면 차단 메시지
  if (!accessAllowed) {
    return (
      <div style={{ textAlign: 'center', marginTop: 100, fontSize: 18 }}>
        🚫 QR로 접속한 사람만 볼 수 있습니다.<br/>
        주소에 <code>?key=onlyme123</code> 이 포함되어야 해요.
      </div>
    );
  }

  // 검색 처리
  const handleSearch = () => {
    const filtered = sampleData.filter(item =>
      [item.name, item.sku, item.box]
        .some(field => field.toLowerCase().includes(keyword.trim().toLowerCase()))
    );
    setResults(filtered);
  };

  return (
    <div style={{
      fontFamily: 'sans-serif',
      padding: '40px 20px',
      maxWidth: 600,
      margin: '0 auto',
      textAlign: 'center',
    }}>
      {/* 로고 */}
      <div style={{ marginBottom: 20 }}>
        <img src="/logo.png" alt="KINDABABY Logo" style={{ height: 40 }} />
      </div>

      {/* 제목 */}
      <h1 style={{
        fontSize: 26,
        fontWeight: 'bold',
        margin: '16px 0 24px'
      }}>
        📦 재고 검색
      </h1>

      {/* 검색창 */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        <input
          type="text"
          placeholder="제품명, SKU, 박스번호 입력"
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          style={{
            flex: 1,
            padding: 10,
            fontSize: 16,
            border: '1px solid #ccc',
            borderRadius: 4,
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: '10px 16px',
            fontSize: 16,
            backgroundColor: '#222',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          검색
        </button>
      </div>

      {/* 결과 리스트 */}
      <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left' }}>
        {results.length === 0
          ? <p style={{ color: '#888' }}>🔎 검색 결과가 없습니다.</p>
          : results.map((item, i) => (
              <li key={i} style={{
                background: '#f9f9f9',
                padding: '14px 16px',
                borderRadius: 6,
                marginBottom: 10,
                border: '1px solid #ddd',
                boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
              }}>
                <div style={{ fontWeight: 'bold', marginBottom: 4 }}>
                  {item.name}
                </div>
                <div>SKU: {item.sku}</div>
                <div>박스: {item.box}</div>
                <div>위치: {item.location}</div>
              </li>
            ))
        }
      </ul>
    </div>
  );
}
