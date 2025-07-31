import SearchPage from './search';

export default function Home() {
  return <SearchPage />;
  // pages/index.tsx
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '../styles/globals.module.css'

type Product = {
  name: string
  sku: string
  box: string
  location: string
}

const sampleData: Product[] = [
  { name: 'mesh layered scrunch- black', sku: 'SK-', box: 'b5-3', location: '4층' },
  { name: '화이트 티셔츠', sku: 'TP-01234', box: 'B1-1', location: '1열 1층' },
  { name: '블랙 원피스', sku: 'DR-01999', box: 'B3-2', location: '3열 2층' },
  { name: '연보라 니트탑', sku: 'TP-04601', box: 'B2-1', location: '2열 1층' },
]

export default function Home() {
  const router = useRouter()
  const [accessAllowed, setAccessAllowed] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [results, setResults] = useState<Product[]>([])

  useEffect(() => {
    const key = router.query.key
    if (key === 'onlyme123') {
      setAccessAllowed(true)
    }
  }, [router.query])

  if (!accessAllowed) {
    return (
      <div className={styles.container}>
        🚫 QR로 접속한 사람만 볼 수 있습니다. <br />
        주소에 <code>?key=onlyme123</code> 이 포함되어야 해요.
      </div>
    )
  }

  const handleSearch = () => {
    const filtered = sampleData.filter((item) =>
      item.name.includes(keyword) ||
      item.sku.includes(keyword) ||
      item.box.includes(keyword)
    )
    setResults(filtered)
  }

  return (
    <>
      <Head>
        <title>재고 검색</title>
      </Head>
      <div className={styles.container}>
        <h1>📦 재고 검색</h1>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="제품명, SKU, 박스번호 입력"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button onClick={handleSearch}>검색</button>
        </div>
        <ul className={styles.resultList}>
          {results.length === 0 ? (
            <p className={styles.empty}>🔎 검색 결과 없음</p>
          ) : (
            results.map((item, i) => (
              <li key={i} className={styles.resultCard}>
                <strong>{item.name}</strong> <br />
                SKU: {item.sku} <br />
                📦 박스: {item.box} <br />
                📍 위치: {item.location}
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  )
}
