import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Subscription } from "../types/subscription";
import styles from './NewSubscription.module.scss';

interface Props {
  onSave: (data: Omit<Subscription, 'id'>) => void;
}

export function NewSubscription({ onSave }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    category: 'Streaming' as Subscription['category'],
    date: new Date().toISOString().split('T')[0] // Data de hoje como padrão
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || formData.price <= 0) return setError("Preencha os campos corretamente!");
    
    onSave(formData);
    navigate('/');
  };

  return (
    <main data-testid="new-subscription" className={styles.main}>
      <h2>Nova Assinatura</h2>
      <form onSubmit={handleSubmit} noValidate className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="name">Nome do serviço</label>
          <input 
            id="name"
            className={styles.input}
            type="text" 
            placeholder="Ex: Netflix, Spotify..."
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            required
            autoFocus
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="price">Preço mensal (R$)</label>
          <input 
            id="price"
            className={styles.input}
            type="number" 
            step="0.01" 
            min="0.01"
            placeholder="0,00"
            value={formData.price || ''}
            onChange={e => setFormData({...formData, price: Number(e.target.value)})}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="category">Categoria</label>
          <select 
            id="category"
            className={styles.input} 
            value={formData.category} 
            onChange={e => setFormData({...formData, category: e.target.value as any})}
          >
            <option value="Streaming">Streaming</option>
            <option value="Educação">Educação</option>
            <option value="Saúde">Saúde</option>
            <option value="Outros">Outros</option>
          </select>
        </div>
          <button className={styles.button} type="submit">Salvar assinatura</button>
          <Link to="/" className={styles.cancelButton}>Cancelar</Link>
          {error && <p className={styles.error}>{error}</p>}
      </form>
    </main>
  );
}