// import SQLite from "react-native-sqlite-storage";

// const DB_NAME = "LocationDatabase";
// const DB_VERSION = "1.0";
// const DB_DISPLAY_NAME = "Location Database";
// const DB_SIZE = 200000;

// const initDatabase = () => {
//   return SQLite.openDatabase(
//     {
//       name: DB_NAME,
//       location: "default",
//       createFromLocation: "~www/LocationDatabase.db",
//     },
//     () => {},
//     (error) => {
//       console.error("Error opening the database:", error);
//     }
//   );
// };

// const isDatabasePresent = async () => {
//   return new Promise((resolve, reject) => {
//     const db = initDatabase();

//     db.transaction(
//       (tx) => {
//         tx.executeSql(
//           "SELECT name FROM sqlite_master WHERE type='table' AND name='Coordinates'",
//           [],
//           (_, resultSet) => {
//             resolve(resultSet.rows.length > 0);
//           },
//           (_, error) => {
//             console.error("Error checking for table:", error);
//             reject(error);
//           }
//         );
//       },
//       (error) => {
//         console.error("Transaction error:", error);
//         reject(error);
//       }
//     );
//   });
// };

// const setupDatabaseTable = () => {
//   const db = initDatabase();

//   db.transaction(
//     (tx) => {
//       tx.executeSql(
//         `
//         CREATE TABLE IF NOT EXISTS Coordinates (
//           id INTEGER PRIMARY KEY AUTOINCREMENT,
//           latitude REAL,
//           longitude REAL
//         )
//         `,
//         [],
//         () => {
//           console.log("Coordinates table created successfully.");
//         },
//         (_, error) => {
//           console.error("Error creating Coordinates table:", error);
//         }
//       );
//     },
//     (error) => {
//       console.error("Transaction error:", error);
//     }
//   );
// };

// export { initDatabase, isDatabasePresent, setupDatabaseTable };
