import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag } from 'lucide-react';
import { listProducts } from '../api.js';

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f0f2f5',
    fontFamily: 'Arial'
  },

  header: {
    background: '#fff',
    borderBottom: '1px solid #e5e7eb',
    padding: '1rem 2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  headerTitle: {
    margin: 0,
    fontSize: '1.1rem',
    color: '#333',
  },

  headerLink: {
    color: '#666',
    textDecoration: 'none',
    fontSize: '0.875rem',
  },

  content: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '2rem',
  },

  pageTitle: {
    margin: '0 0 1.25rem',
    color: '#333',
  },

  toolbar: {
    display: 'flex',
    gap: '0.75rem',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
  },

  searchWrap: {
    position: 'relative',
    flex: 1,
    minWidth: '200px',
  },

  searchIcon: {
    position: 'absolute',
    left: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#999',
    pointerEvents: 'none',
  },

  searchInput: {
    width: '100%',
    padding: '0.5rem 0.75rem 0.5rem 34px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '0.875rem',
    boxSizing: 'border-box',
  },

  select: {
    padding: '0.5rem 0.75rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '0.875rem',
    background: '#fff',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '1rem',
  },

  card: {
    background: '#fff',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    overflow: 'hidden',
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
  },

  cardImg: {
    height: '140px',
    background: '#f3f4f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  cardImgEl: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  cardBody: {
    padding: '0.75rem',
  },

  cardName: {
    margin: '0 0 0.25rem',
    fontWeight: 600,
    fontSize: '0.9rem',
    color: '#333',
  },

  cardDesc: {
    margin: '0 0 0.4rem',
    fontSize: '0.78rem',
    color: '#888',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },

  cardPrice: {
    margin: '0 0 2px',
    color: '#4f46e5',
    fontWeight: 700,
  },

  stockIn: {
    margin: 0,
    fontSize: '0.75rem',
    color: '#16a34a',
  },

  stockOut: {
    margin: 0,
    fontSize: '0.75rem',
    color: '#dc2626',
  },

  loading: {
    color: '#888',
  },

  empty: {
    color: '#888',
  },
};

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [sortBy, setSortBy]     = useState('default');

  useEffect(() => {
    listProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  const filtered = products
    .filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.description || '').toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'price-asc')  return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name')       return a.name.localeCompare(b.name);
      return a.id - b.id;
    });

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Catálogo de Produtos</h1>
        <Link to="/" style={styles.headerLink}>Início</Link>
      </header>

      <div style={styles.content}>
        <h2 style={styles.pageTitle}>Produtos</h2>

        <div style={styles.toolbar}>
          <div style={styles.searchWrap}>
            <span style={styles.searchIcon}><Search size={15} /></span>
            <input
              style={styles.searchInput}
              type="text"
              placeholder="Buscar produto..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select style={styles.select} value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="default">Ordenar por padrão</option>
            <option value="price-asc">Menor preço</option>
            <option value="price-desc">Maior preço</option>
            <option value="name">Nome A–Z</option>
          </select>
        </div>

        {loading && <p style={styles.loading}>Carregando...</p>}
        {!loading && filtered.length === 0 && <p style={styles.empty}>Nenhum produto encontrado.</p>}

        <div style={styles.grid}>
          {filtered.map(p => (
            <Link key={p.id} to={`/produto/${p.id}`} style={styles.card}>
              <div style={styles.cardImg}>
                {p.image
                  ? <img src={`/uploads/${p.image}`} alt={p.name} style={styles.cardImgEl} />
                  : <ShoppingBag size={32} color="#ccc" />
                }
              </div>
              <div style={styles.cardBody}>
                <p style={styles.cardName}>{p.name}</p>
                {p.description && <p style={styles.cardDesc}>{p.description}</p>}
                <p style={styles.cardPrice}>R$ {p.price.toFixed(2)}</p>
                <p style={p.stock > 0 ? styles.stockIn : styles.stockOut}>
                  {p.stock > 0 ? `${p.stock} em estoque` : 'Esgotado'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}