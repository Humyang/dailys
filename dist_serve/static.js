var app = require('koa')()
var serve = require('koa-static');
// app.use(function *(next){
    // this.set('Cache-Control', 'no-cache');
    // yield* next
// })
// app.use(serve('../dist'));
app.use(function*(next){
    yield serve(__dirname+'./../dist',{maxage:3153600000})
})
app.listen(8200);

console.log('listening on port 8200');