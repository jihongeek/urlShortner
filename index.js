const express = require('express');
// require로 임포트
const fs = require('fs');
console.log('starting app...')

let urls = JSON.parse(fs.readFileSync('url.json','utf-8'));

function registerCode(code, url) {
    urls[code] = url;
    fs.writeFileSync('url.json',JSON.stringify(urls))
}

const app = express();
const router = express.Router();

router.post('/register', (req,res) => {
    const code = req.body.code;
    const url  = req.body.url;
    console.log(req)
    registerCode(code,url);
    res.send('end!');
});

router.get('/:code', (req,res) => {
    if (!(req.params.code in urls)) {
        return res.status('404').send("없어요.")
    }
    res.redirect(urls[req.params.code])
});

app.use(express.json())
app.use(router); // 앱에 라우터 추가
app.listen(4000, () => {
    console.log("서버, 시작, 성공적")
});
