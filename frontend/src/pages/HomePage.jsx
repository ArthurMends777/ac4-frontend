import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
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
    color: '#4f46e5',
    textDecoration: 'none',
    fontSize: '0.875rem',
  },

  hero: {
    background: '#4f46e5',
    color: '#fff',
    padding: '3rem 2rem',
    textAlign: 'center',
  },

  heroTitle: {
    margin: '0 0 0.5rem',
    fontSize: '1.8rem',
  },

  heroSub: {
    margin: '0 0 1.5rem',
    opacity: 0.85,
    fontSize: '1rem',
  },

  heroCta: {
    display: 'inline-block',
    background: '#fff',
    color: '#4f46e5',
    padding: '0.6rem 1.5rem',
    borderRadius: '4px',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: '0.95rem',
  },

  content: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '2rem',
  },

  sectionTitle: {
    margin: '0 0 1rem',
    color: '#333',
    fontSize: '1rem',
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

  cardPrice: {
    margin: 0,
    color: '#4f46e5',
    fontWeight: 700,
  },

  loading: {
    color: '#888',
  },
};

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    listProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Catálogo de Produtos</h1>
        <Link to="/produtos" style={styles.headerLink}>Ver todos os produtos</Link>
      </header>

      <div style={styles.hero}>
        <h2 style={styles.heroTitle}>Bem-vindo ao catálogo</h2>
        <p style={styles.heroSub}>Encontre os melhores produtos com os melhores preços.</p>
        <Link to="/produtos" style={styles.heroCta}>Ver produtos</Link>
      </div>

      <div style={styles.content}>
        <h2 style={styles.sectionTitle}>Produtos em destaque</h2>

        {loading && <p style={styles.loading}>Carregando...</p>}

        <div style={styles.grid}>
          {products.slice(0, 4).map(p => (
            <Link key={p.id} to={`/produto/${p.id}`} style={styles.card}>
              <div style={styles.cardImg}>
                {p.image
                  ? <img src={`/uploads/${p.image}`} alt={p.name} style={styles.cardImgEl} />
                  : <ShoppingBag size={32} color="#ccc" />
                }
              </div>
              <div style={styles.cardBody}>
                <p style={styles.cardName}>{p.name}</p>
                <p style={styles.cardPrice}>R$ {p.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}