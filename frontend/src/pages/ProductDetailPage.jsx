import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Package } from 'lucide-react';
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
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },

  content: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem',
  },

  card: {
    background: '#fff',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    overflow: 'hidden',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
  },

  imgBox: {
    background: '#f3f4f6',
    minHeight: '280px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  info: {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },

  name: {
    margin: 0,
    fontSize: '1.4rem',
    color: '#222',
  },

  description: {
    margin: 0,
    color: '#666',
    lineHeight: 1.6,
    fontSize: '0.9rem',
  },

  price: {
    margin: 0,
    fontSize: '1.6rem',
    fontWeight: 700,
    color: '#4f46e5',
  },

  stockIn: {
    margin: 0,
    fontSize: '0.875rem',
    color: '#16a34a',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },

  stockOut: {
    margin: 0,
    fontSize: '0.875rem',
    color: '#dc2626',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },

  relatedSection: {
    marginTop: '2rem',
  },

  relatedTitle: {
    margin: '0 0 1rem',
    color: '#333',
    fontSize: '1rem',
  },

  relatedGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    gap: '0.75rem',
  },

  relCard: {
    background: '#fff',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    overflow: 'hidden',
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
  },

  relImg: {
    height: '100px',
    background: '#f3f4f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  relImgEl: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  relBody: {
    padding: '0.5rem 0.75rem',
  },

  relName: {
    margin: '0 0 2px',
    fontSize: '0.82rem',
    fontWeight: 600,
    color: '#333',
  },

  relPrice: {
    margin: 0,
    fontSize: '0.85rem',
    color: '#4f46e5',
    fontWeight: 700,
  },

  loading: {
    color: '#888',
  },

  notFound: {
    textAlign: 'center',
    padding: '3rem 0',
  },

  notFoundText: {
    color: '#888',
    marginBottom: '0.5rem',
  },

  notFoundLink: {
    color: '#4f46e5',
  },
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listProducts().then(all => {
      setProduct(all.find(p => String(p.id) === String(id)) || null);
      setRelated(all.filter(p => String(p.id) !== String(id)).slice(0, 4));
    }).finally(() => setLoading(false));
  }, [id]);

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.headerTitle}>Catálogo de Produtos</h1>
        <Link to="/produtos" style={styles.headerLink}>
          <ArrowLeft size={15} /> Voltar
        </Link>
      </header>

      <div style={styles.content}>
        {loading && <p style={styles.loading}>Carregando...</p>}

        {!loading && !product && (
          <div style={styles.notFound}>
            <p style={styles.notFoundText}>Produto não encontrado.</p>
            <Link to="/produtos" style={styles.notFoundLink}>Ver todos os produtos</Link>
          </div>
        )}

        {product && (
          <>
            <div style={styles.card}>
              <div style={styles.imgBox}>
                {product.image
                  ? <img src={`/uploads/${product.image}`} alt={product.name} style={styles.img} />
                  : <ShoppingBag size={60} color="#ccc" />
                }
              </div>
              <div style={styles.info}>
                <h2 style={styles.name}>{product.name}</h2>
                {product.description && <p style={styles.description}>{product.description}</p>}
                <p style={styles.price}>R$ {product.price.toFixed(2)}</p>
                <p style={product.stock > 0 ? styles.stockIn : styles.stockOut}>
                  <Package size={15} />
                  {product.stock > 0 ? `${product.stock} unidades disponíveis` : 'Produto esgotado'}
                </p>
              </div>
            </div>

            {related.length > 0 && (
              <div style={styles.relatedSection}>
                <h3 style={styles.relatedTitle}>Outros produtos</h3>
                <div style={styles.relatedGrid}>
                  {related.map(p => (
                    <Link key={p.id} to={`/produto/${p.id}`} style={styles.relCard}>
                      <div style={styles.relImg}>
                        {p.image
                          ? <img src={`/uploads/${p.image}`} alt={p.name} style={styles.relImgEl} />
                          : <ShoppingBag size={24} color="#ccc" />
                        }
                      </div>
                      <div style={styles.relBody}>
                        <p style={styles.relName}>{p.name}</p>
                        <p style={styles.relPrice}>R$ {p.price.toFixed(2)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}