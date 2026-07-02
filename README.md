# MongoDB-project

פרויקט תרגול שאילתות ב-MongoDB. הפרויקט מחולק לשני חלקים.

## קבצים

- `01-students-queries.js` — חלק 1: שאילתות על אוסף התלמידות (find, projection, update, delete).
- `02-recipes-aggregation.js` — חלק 2: תרגול Aggregation על אוסף המתכונים (match, group, addFields, unwind, sort, limit, avg, count).

## איך מריצים

צריך שיהיה מותקן [MongoDB](https://www.mongodb.com/try/download/community) ו-[mongosh](https://www.mongodb.com/try/download/shell).

הרצה מהטרמינל:

```bash
mongosh < 01-students-queries.js
mongosh < 02-recipes-aggregation.js
```

או: פותחים `mongosh`, ומדביקים את הפקודות מהקובץ אחת אחרי השנייה.

כל קובץ מנקה את האוסף בתחילתו (`drop`) ומכניס נתוני דוגמה, כך שאפשר להריץ אותו שוב ושוב בלי כפילויות.

## חלק 1 — תלמידות (מסד נתונים `test`, אוסף `students`)

כל תלמידה: `name`, `class`, `finalMark`, `phone`, `subject` (מקצוע).

1. יצירת מסד הנתונים `test` והכנסת נתונים.
2. 2 התלמידות הראשונות עם ציון מעל 90 — `find` + `limit`.
3. תלמידות שהטלפון מתחיל ב-`05331` — `find` עם Regex `/^05331/`.
4. שמות בלבד של תלמידות עם ציון בין 80 ל-95 — `find` עם projection.
5. תלמידות עם ציון מתחת 70 ומקצוע הנדסאים/אדריכלות — `$in`.
6. שם + ציון של כולן, מסודר בסדר עולה — `sort`.
7. עדכון נתונים.
8. הוספת 6% לתלמידות שקיבלו 50 — `updateMany` + `$mul`.
9. מחיקת תלמידות הנדסאים עם ציון מתחת 50 — `deleteMany`.
10. חיפוש לפי מקצוע = הוראה.
11. הוספת 10% לציון של כל תלמידות הנדסאים — `updateMany` + `$mul`.

## חלק 2 — Aggregation על מתכונים (אוסף `recipes`)

כל מתכון: `name`, `category`, `prepTime`, `rating`, `ingredients` (מערך).

1. מתכונים בקטגוריה `Italian` — `$match`.
2. מתכונים עם זמן הכנה מעל 30 דקות, מקובצים לפי קטגוריה — `$match` + `$group`.
3. הוספת שדה שמחשב את אורך רשימת המרכיבים — `$addFields` + `$size`.
4. פישוט רשימת המרכיבים — `$unwind`.
5. מתכונים עם ציון מעל 4.0, 3 הגבוהים ביותר — `$match` + `$sort` + `$limit`.
6. ממוצע זמן הכנה לפי קטגוריה — `$group` + `$avg`.
7. מספר מתכונים לפי קטגוריה — `$group` + `$sum`.
