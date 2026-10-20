/* Имитация базы данных на localStorage */
const DB_KEY = 'cloud_kitchen_db_v1';

const defaultDB = {
  users: [
    { login: 'admin', password: 'admin123', fio: 'Администратор', phone: '', email: '' }
  ],
  dishes: [
    { id: 1, name: 'Бургер классический', category: 'Бургеры', price: 450, cost: 210 },
    { id: 2, name: 'Паста карбонара', category: 'Паста', price: 520, cost: 240 },
    { id: 3, name: 'Салат Цезарь', category: 'Салаты', price: 390, cost: 160 },
    { id: 4, name: 'Суп Том Ям', category: 'Супы', price: 480, cost: 220 }
  ],
  ingredients: [
    { id: 1, name: 'Булочка для бургера', unit: 'шт', price: 25 },
    { id: 2, name: 'Куриное филе', unit: 'кг', price: 380 },
    { id: 3, name: 'Сливки 33%', unit: 'л', price: 320 },
    { id: 4, name: 'Пармезан', unit: 'кг', price: 1200 }
  ],
  staff: [
    { id: 1, fio: 'Иванов Иван', position: 'Повар', orders: 120, efficiency: 92 },
    { id: 2, fio: 'Петрова Анна', position: 'Повар', orders: 98, efficiency: 88 },
    { id: 3, fio: 'Сидоров Пётр', position: 'Курьер', orders: 145, efficiency: 95 }
  ],
  discounts: [
    { id: 1, name: 'Скидка 10% на первый заказ', type: 'percent', value: 10, active: true },
    { id: 2, name: 'Фиксированная скидка 100 ₽', type: 'fixed', value: 100, active: true },
    { id: 3, name: 'Промо "Летнее меню"', type: 'percent', value: 15, active: false }
  ],
  sales: []
};

function generateSales(db){
  const dishes = db.dishes;
  const sales = [];
  let id = 1;
  const today = new Date();
  for (let d = 0; d < 30; d++){
    const day = new Date(today);
    day.setDate(today.getDate() - d);
    const count = 1 + Math.floor(Math.random() * 4);
    for (let i = 0; i < count; i++){
      const dish = dishes[Math.floor(Math.random() * dishes.length)];
      const qty = 1 + Math.floor(Math.random() * 3);
      const sum = dish.price * qty;
      const cost = dish.cost * qty;
      sales.push({
        id: id++,
        date: day.toISOString().slice(0, 10),
        dishId: dish.id,
        dishName: dish.name,
        qty,
        sum,
        cost,
        profit: sum - cost
      });
    }
  }
  return sales;
}

function loadDB(){
  let db;
  try{
    db = JSON.parse(localStorage.getItem(DB_KEY));
  }catch(e){ db = null; }
  if (!db || !db.users){
    db = JSON.parse(JSON.stringify(defaultDB));
    db.sales = generateSales(db);
    saveDB(db);
  }
  return db;
}
function saveDB(db){
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

let DB = loadDB();
