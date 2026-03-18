import { Link } from 'react-router-dom';
import styles from './Home.module.scss'; // Criaremos este arquivo a seguir
import type { Subscription } from '../types/subscription';
import { SubscriptionCard } from '../components';

interface Props {
  subscriptions: Subscription[];
  onDelete: (id: string) => void;
}

export function Home({ subscriptions, onDelete }: Props) {
  const totalMonthly = subscriptions.reduce((acc, current) => acc + current.price, 0);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>Meus Gastos 💳</h1>
          <p>Você está gastando <span>R$ {totalMonthly.toFixed(2)}</span> por mês.</p>
        </div>
        
        <Link to="/novo" className={styles.addButton}>
          + Nova Assinatura
        </Link>
      </header>

      <main className={styles.list}>
        {subscriptions.length === 0 ? (
          <div className={styles.empty}>
            <p>Nenhuma assinatura encontrada.</p>
            <small>Clique no botão acima para adicionar a primeira!</small>
          </div>
        ) : (
          subscriptions.map(sub => (
            <SubscriptionCard 
              key={sub.id} 
              data={sub} 
              onDelete={onDelete} 
            />
          ))
        )}
      </main>
    </div>
  );
}