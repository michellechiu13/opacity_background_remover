// 安全性漏洞
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // 硬編碼的憑證
  password: 'password123',  // 硬編碼的密碼
  database: 'test_db'
});

// SQL 注入漏洞
app.get('/users', (req, res) => {
  const query = `SELECT * FROM users WHERE id = ${req.query.id}`; // 未經處理的參數
  connection.query(query);
});

// 程式碼異味(Code Smell)
function complexFunction() {
  let result = 0;
  // 巢狀迴圈，複雜度過高
  for(let i = 0; i < 10; i++) {
    for(let j = 0; j < 10; j++) {
      for(let k = 0; k < 10; k++) {
        result += i + j + k;
      }
    }
  }
  return result;
}

// 重複程式碼
function validateUser1() {
  if (user.name === '') return false;
  if (user.age < 0) return false;
  if (user.email === '') return false;
  return true;
}

function validateUser2() {
  if (user.name === '') return false;  // 重複的驗證邏輯
  if (user.age < 0) return false;
  if (user.email === '') return false;
  return true;
}

// 未使用的變數
const unusedVariable = "This will cause a warning";

// 缺乏單元測試覆蓋率
function untested() {
  // 這個函數沒有對應的測試
  return "No test coverage";
}

// 記憶體洩漏風險
let globalArray = [];
function memoryLeak() {
  setInterval(() => {
    globalArray.push(new Array(10000));
  }, 1000);
}
