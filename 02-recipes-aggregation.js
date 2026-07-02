// =============================================================
//  תרגול Aggregation ב-MongoDB  |  חלק 2 - מתכונים (recipes)
//  איך מריצים:  mongosh < 02-recipes-aggregation.js
//  הנחיה מהמטלה: לעשות 5 מתוך 7 - כאן פתורות כל ה-7 (אפשר לבחור).
// =============================================================

use("test");

// מנקים ומכניסים נתוני דוגמה
db.recipes.drop();

db.recipes.insertMany([
  { name: "Spaghetti Carbonara", category: "Italian", prepTime: 25, rating: 4.7, ingredients: ["pasta", "eggs", "bacon", "parmesan", "pepper"] },
  { name: "Margherita Pizza",    category: "Italian", prepTime: 40, rating: 4.8, ingredients: ["dough", "tomato", "mozzarella", "basil"] },
  { name: "Lasagna",             category: "Italian", prepTime: 60, rating: 4.5, ingredients: ["pasta", "beef", "tomato", "cheese", "bechamel"] },
  { name: "Sushi Rolls",         category: "Japanese", prepTime: 50, rating: 4.9, ingredients: ["rice", "nori", "salmon", "avocado"] },
  { name: "Ramen",               category: "Japanese", prepTime: 35, rating: 4.2, ingredients: ["noodles", "broth", "egg", "pork"] },
  { name: "Tacos",               category: "Mexican", prepTime: 20, rating: 4.3, ingredients: ["tortilla", "beef", "cheese", "salsa"] },
  { name: "Guacamole",           category: "Mexican", prepTime: 10, rating: 3.9, ingredients: ["avocado", "lime", "onion", "cilantro"] },
  { name: "Greek Salad",         category: "Greek",   prepTime: 15, rating: 4.1, ingredients: ["cucumber", "tomato", "feta", "olives"] }
]);

print("=== נתונים הוכנסו בהצלחה ===");


// ---- שאלה 1: כל המתכונים בקטגוריה "Italian" ----
print("\n--- שאלה 1: מתכונים בקטגוריה Italian ---");
printjson(
  db.recipes.aggregate([
    { $match: { category: "Italian" } }
  ]).toArray()
);


// ---- שאלה 2: מתכונים עם זמן הכנה מעל 30 דקות, מקובצים לפי קטגוריה ----
print("\n--- שאלה 2: זמן הכנה מעל 30 דקות, מקובץ לפי קטגוריה ---");
printjson(
  db.recipes.aggregate([
    { $match: { prepTime: { $gt: 30 } } },
    { $group: {
        _id: "$category",
        recipes: { $push: "$name" },
        count: { $sum: 1 }
    } }
  ]).toArray()
);


// ---- שאלה 3: שדה חדש שמחשב את אורך רשימת המרכיבים ----
print("\n--- שאלה 3: הוספת שדה ingredientsCount ---");
printjson(
  db.recipes.aggregate([
    { $addFields: { ingredientsCount: { $size: "$ingredients" } } }
  ]).toArray()
);


// ---- שאלה 4: פישוט רשימת המרכיבים - כל מרכיב כאובייקט נפרד (unwind) ----
print("\n--- שאלה 4: unwind על ingredients ---");
printjson(
  db.recipes.aggregate([
    { $unwind: "$ingredients" }
  ]).toArray()
);


// ---- שאלה 5: מתכונים עם ציון מעל 4.0, מסודרים לפי ציון, 3 הגבוהים ביותר ----
print("\n--- שאלה 5: 3 המתכונים המדורגים ביותר מעל 4.0 ---");
printjson(
  db.recipes.aggregate([
    { $match: { rating: { $gt: 4.0 } } },
    { $sort: { rating: -1 } },
    { $limit: 3 }
  ]).toArray()
);


// ---- שאלה 6: ממוצע זמן ההכנה לכל קטגוריה ----
print("\n--- שאלה 6: ממוצע זמן הכנה לפי קטגוריה ---");
printjson(
  db.recipes.aggregate([
    { $group: {
        _id: "$category",
        avgPrepTime: { $avg: "$prepTime" }
    } }
  ]).toArray()
);


// ---- שאלה 7: ספירת מספר המתכונים בכל קטגוריה ----
print("\n--- שאלה 7: מספר מתכונים לפי קטגוריה ---");
printjson(
  db.recipes.aggregate([
    { $group: {
        _id: "$category",
        count: { $sum: 1 }
    } }
  ]).toArray()
);
