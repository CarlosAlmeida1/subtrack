import type { Subscription } from "../types/subscription"
import styles from "./SubscriptionCard.module.scss"

interface Props {
    data: Subscription
    onDelete: (id: string) => void
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
}

export function SubscriptionCard({data, onDelete}: Props){
    return (
        <div className={styles.card}>
            <div className={styles.info}>
                <h3>{data.name}</h3>
                <span>{data.category}</span>
                <p>Próximo pagamento: {formatDate(data.date)}</p>
                
            </div>
            <div className={styles.priceArea}>
                <p>R$ {data.price.toFixed(2)}</p>
                <button onClick={() => onDelete(data.id)}>
                    Excluir
                </button>
            </div>
        </div>
    
    )
}