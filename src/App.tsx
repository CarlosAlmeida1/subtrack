import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { NewSubscription } from "./pages/NewSubscription";
import { Home } from "./pages/Home";
import type { Subscription } from "./types/subscription";

export function App() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const navigate = useNavigate();
  // Função para adicionar uma assinatura real vinda do formulário
  const handleAddSubscription = (newSub: Omit<Subscription, 'id'>) => {
    const subscriptionWithId = {
      ...newSub,
      id: crypto.randomUUID(),
    };
    setSubscriptions([...subscriptions, subscriptionWithId]);
    navigate("/"); // Volta para a home após salvar
  };

  const removeSubscription = (id: string) => {
    setSubscriptions(subscriptions.filter(sub => sub.id !== id));
  };

  return (
    <Routes>
      <Route 
        path="/" 
        element={<Home subscriptions={subscriptions} onDelete={removeSubscription} />} 
      />
      <Route 
        path="/novo" 
        element={<NewSubscription onSave={handleAddSubscription} />} 
      />
    </Routes>
  );
}