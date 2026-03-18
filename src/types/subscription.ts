export interface Subscription {
    id: string
    name: string
    price: number
    category: 'Streaming' | "Saúde" | "Educação" | "Outros"
    date: string
}