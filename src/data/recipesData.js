// Static seed data for the app. "source: built-in" recipes are read-only.
// Categories (11, comfortably over the required 10):
export const CATEGORIES = [
  'Italian',
  'Mexican',
  'Chinese',
  'Indian',
  'Japanese',
  'Thai',
  'American',
  'Mediterranean',
  'French',
  'Greek',
  'Breakfast',
];

let idCounter = 1;
const id = () => String(idCounter++);

const img = (seed) => `https://picsum.photos/seed/${seed}/500/350`;

export const INITIAL_RECIPES = [
  // Italian
  {
    id: id(), name: 'Spaghetti Carbonara', category: 'Italian', image: img('carbonara'),
    prepTime: '20 min', servings: 2, calories: 650, difficulty: 'Easy', source: 'built-in',
    ingredients: ['200g spaghetti', '100g pancetta', '2 large eggs', '50g Parmesan cheese', 'Black pepper'],
    instructions: ['Boil spaghetti until al dente.', 'Fry pancetta until crisp.', 'Whisk eggs with Parmesan.', 'Toss hot pasta with pancetta, then egg mixture off heat.', 'Season with black pepper and serve.'],
  },
  {
    id: id(), name: 'Margherita Pizza', category: 'Italian', image: img('margherita'),
    prepTime: '40 min', servings: 4, calories: 800, difficulty: 'Medium', source: 'built-in',
    ingredients: ['Pizza dough', 'Tomato sauce', 'Fresh mozzarella', 'Fresh basil', 'Olive oil'],
    instructions: ['Preheat oven to 250°C.', 'Roll out dough and spread sauce.', 'Top with mozzarella.', 'Bake 10-12 minutes.', 'Garnish with basil and olive oil.'],
  },
  // Mexican
  {
    id: id(), name: 'Chicken Tacos', category: 'Mexican', image: img('tacos'),
    prepTime: '25 min', servings: 3, calories: 520, difficulty: 'Easy', source: 'built-in',
    ingredients: ['300g chicken breast', 'Taco seasoning', 'Corn tortillas', 'Lettuce', 'Salsa'],
    instructions: ['Season and cook chicken until done.', 'Slice chicken thinly.', 'Warm tortillas.', 'Assemble tacos with lettuce and salsa.'],
  },
  {
    id: id(), name: 'Beef Burrito', category: 'Mexican', image: img('burrito'),
    prepTime: '30 min', servings: 2, calories: 700, difficulty: 'Medium', source: 'built-in',
    ingredients: ['250g ground beef', 'Rice', 'Black beans', 'Cheese', 'Large tortillas'],
    instructions: ['Cook beef with spices.', 'Warm rice and beans.', 'Layer filling on tortilla.', 'Roll tightly and toast seam-side down.'],
  },
  // Chinese
  {
    id: id(), name: 'Kung Pao Chicken', category: 'Chinese', image: img('kungpao'),
    prepTime: '30 min', servings: 3, calories: 560, difficulty: 'Medium', source: 'built-in',
    ingredients: ['300g chicken thigh', 'Peanuts', 'Dried chilies', 'Soy sauce', 'Scallions'],
    instructions: ['Marinate diced chicken in soy sauce.', 'Stir-fry chicken until browned.', 'Add chilies and peanuts.', 'Toss with sauce and scallions.'],
  },
  {
    id: id(), name: 'Vegetable Fried Rice', category: 'Chinese', image: img('friedrice'),
    prepTime: '20 min', servings: 3, calories: 450, difficulty: 'Easy', source: 'built-in',
    ingredients: ['3 cups cooked rice', 'Mixed vegetables', '2 eggs', 'Soy sauce', 'Sesame oil'],
    instructions: ['Scramble eggs and set aside.', 'Stir-fry vegetables.', 'Add rice and soy sauce.', 'Fold in eggs and sesame oil.'],
  },
  // Indian
  {
    id: id(), name: 'Butter Chicken', category: 'Indian', image: img('butterchicken'),
    prepTime: '45 min', servings: 4, calories: 620, difficulty: 'Medium', source: 'built-in',
    ingredients: ['500g chicken', 'Tomato puree', 'Butter', 'Cream', 'Garam masala'],
    instructions: ['Marinate and grill chicken.', 'Simmer tomato puree with butter and spices.', 'Add cream.', 'Combine chicken with sauce and simmer.'],
  },
  {
    id: id(), name: 'Chana Masala', category: 'Indian', image: img('chanamasala'),
    prepTime: '35 min', servings: 4, calories: 400, difficulty: 'Easy', source: 'built-in',
    ingredients: ['2 cups chickpeas', 'Onion', 'Tomato', 'Ginger-garlic paste', 'Garam masala'],
    instructions: ['Sauté onions until golden.', 'Add ginger-garlic paste and tomato.', 'Add chickpeas and spices.', 'Simmer 15 minutes.'],
  },
  // Japanese
  {
    id: id(), name: 'Chicken Teriyaki', category: 'Japanese', image: img('teriyaki'),
    prepTime: '25 min', servings: 2, calories: 500, difficulty: 'Easy', source: 'built-in',
    ingredients: ['2 chicken thighs', 'Soy sauce', 'Mirin', 'Sugar', 'Sesame seeds'],
    instructions: ['Pan-sear chicken skin-side down.', 'Mix soy sauce, mirin, and sugar.', 'Add sauce to pan and glaze chicken.', 'Slice and sprinkle sesame seeds.'],
  },
  {
    id: id(), name: 'Vegetable Sushi Rolls', category: 'Japanese', image: img('sushi'),
    prepTime: '40 min', servings: 3, calories: 350, difficulty: 'Hard', source: 'built-in',
    ingredients: ['Sushi rice', 'Nori sheets', 'Cucumber', 'Avocado', 'Carrot'],
    instructions: ['Cook and season sushi rice.', 'Lay rice on nori.', 'Add vegetable strips and roll tightly.', 'Slice into pieces.'],
  },
  // Thai
  {
    id: id(), name: 'Pad Thai', category: 'Thai', image: img('padthai'),
    prepTime: '30 min', servings: 3, calories: 550, difficulty: 'Medium', source: 'built-in',
    ingredients: ['Rice noodles', 'Shrimp or tofu', 'Egg', 'Bean sprouts', 'Tamarind sauce'],
    instructions: ['Soak noodles until soft.', 'Stir-fry protein and egg.', 'Add noodles and sauce.', 'Toss in bean sprouts and serve.'],
  },
  {
    id: id(), name: 'Green Curry', category: 'Thai', image: img('greencurry'),
    prepTime: '35 min', servings: 4, calories: 480, difficulty: 'Medium', source: 'built-in',
    ingredients: ['Green curry paste', 'Coconut milk', 'Chicken or vegetables', 'Thai basil', 'Fish sauce'],
    instructions: ['Fry curry paste until fragrant.', 'Add coconut milk and simmer.', 'Add chicken/vegetables and cook through.', 'Stir in basil and fish sauce.'],
  },
  // American
  {
    id: id(), name: 'Classic Cheeseburger', category: 'American', image: img('cheeseburger'),
    prepTime: '20 min', servings: 2, calories: 750, difficulty: 'Easy', source: 'built-in',
    ingredients: ['2 beef patties', 'Cheddar cheese', 'Burger buns', 'Lettuce', 'Tomato'],
    instructions: ['Season and grill patties.', 'Melt cheese on top.', 'Toast buns.', 'Assemble burger with toppings.'],
  },
  {
    id: id(), name: 'BBQ Pulled Pork', category: 'American', image: img('pulledpork'),
    prepTime: '4 hr', servings: 6, calories: 600, difficulty: 'Hard', source: 'built-in',
    ingredients: ['1.5kg pork shoulder', 'BBQ sauce', 'Brown sugar', 'Paprika', 'Buns'],
    instructions: ['Rub pork with spices.', 'Slow-cook until tender (3-4 hrs).', 'Shred meat with forks.', 'Mix with BBQ sauce and serve on buns.'],
  },
  // Mediterranean
  {
    id: id(), name: 'Greek Salad', category: 'Mediterranean', image: img('greeksalad'),
    prepTime: '15 min', servings: 2, calories: 300, difficulty: 'Easy', source: 'built-in',
    ingredients: ['Cucumber', 'Tomato', 'Red onion', 'Feta cheese', 'Kalamata olives'],
    instructions: ['Chop vegetables.', 'Combine in a bowl with olives and feta.', 'Drizzle olive oil and oregano.', 'Toss gently and serve.'],
  },
  {
    id: id(), name: 'Falafel Wrap', category: 'Mediterranean', image: img('falafel'),
    prepTime: '35 min', servings: 3, calories: 480, difficulty: 'Medium', source: 'built-in',
    ingredients: ['Chickpeas', 'Garlic', 'Cumin', 'Pita bread', 'Tahini sauce'],
    instructions: ['Blend chickpeas with garlic and spices.', 'Form into balls and fry until crisp.', 'Warm pita bread.', 'Fill with falafel and tahini sauce.'],
  },
  // French
  {
    id: id(), name: 'Ratatouille', category: 'French', image: img('ratatouille'),
    prepTime: '50 min', servings: 4, calories: 250, difficulty: 'Medium', source: 'built-in',
    ingredients: ['Eggplant', 'Zucchini', 'Bell pepper', 'Tomato', 'Herbes de Provence'],
    instructions: ['Slice all vegetables thinly.', 'Layer in a baking dish.', 'Drizzle olive oil and herbs.', 'Bake at 190°C for 40 minutes.'],
  },
  {
    id: id(), name: 'Croque Monsieur', category: 'French', image: img('croque'),
    prepTime: '20 min', servings: 2, calories: 550, difficulty: 'Easy', source: 'built-in',
    ingredients: ['Bread slices', 'Ham', 'Gruyère cheese', 'Butter', 'Bechamel sauce'],
    instructions: ['Spread bechamel on bread.', 'Layer ham and cheese.', 'Top with more cheese.', 'Grill until golden and bubbly.'],
  },
  // Greek
  {
    id: id(), name: 'Moussaka', category: 'Greek', image: img('moussaka'),
    prepTime: '1 hr 15 min', servings: 6, calories: 620, difficulty: 'Hard', source: 'built-in',
    ingredients: ['Eggplant', 'Ground lamb', 'Tomato sauce', 'Bechamel sauce', 'Parmesan'],
    instructions: ['Fry eggplant slices.', 'Cook lamb with tomato sauce.', 'Layer eggplant, meat, and bechamel.', 'Bake at 180°C for 45 minutes.'],
  },
  {
    id: id(), name: 'Tzatziki with Pita', category: 'Greek', image: img('tzatziki'),
    prepTime: '15 min', servings: 4, calories: 220, difficulty: 'Easy', source: 'built-in',
    ingredients: ['Greek yogurt', 'Cucumber', 'Garlic', 'Dill', 'Pita bread'],
    instructions: ['Grate and drain cucumber.', 'Mix with yogurt, garlic, and dill.', 'Chill for 10 minutes.', 'Serve with warm pita.'],
  },
  // Breakfast
  {
    id: id(), name: 'Fluffy Pancakes', category: 'Breakfast', image: img('pancakes'),
    prepTime: '20 min', servings: 3, calories: 420, difficulty: 'Easy', source: 'built-in',
    ingredients: ['Flour', 'Milk', 'Egg', 'Baking powder', 'Maple syrup'],
    instructions: ['Mix dry ingredients.', 'Whisk in milk and egg.', 'Cook spoonfuls of batter on a griddle.', 'Serve with maple syrup.'],
  },
  {
    id: id(), name: 'Avocado Toast', category: 'Breakfast', image: img('avocadotoast'),
    prepTime: '10 min', servings: 1, calories: 300, difficulty: 'Easy', source: 'built-in',
    ingredients: ['Sourdough bread', 'Avocado', 'Lemon juice', 'Chili flakes', 'Salt'],
    instructions: ['Toast the bread.', 'Mash avocado with lemon and salt.', 'Spread on toast.', 'Top with chili flakes.'],
  },
];
