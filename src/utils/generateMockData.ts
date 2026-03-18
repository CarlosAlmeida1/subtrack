import { fakerPT_BR as faker } from '@faker-js/faker';
import type { Subscription } from '../types/subscription';

export const generateRandomSubscription = (): Subscription => {
  return {
    id: faker.string.uuid(),
    name: faker.company.name(),
    price: Number(faker.commerce.price({ min: 10, max: 200 })),
    category: faker.helpers.arrayElement(['Streaming', 'Saúde', 'Educação', 'Outros']),
    date: faker.date.recent().toISOString().split('T')[0],
  };
};