var koa = require('koa')
var app = new koa();
var serve = require('koa-static');
const path = require('path');
const render = require('koa-ejs');
render(app, {
    root: path.join(__dirname+'./../dist'),
    layout: false,
    viewExt: 'html',
    cache: false,
    debug: false
  });
var koaRouter = require('koa-router')

const router = new koaRouter();
router.get('*',async function (ctx,next) {
    // debugger
    if(ctx.URL.pathname.indexOf('.')!="-1"){
        await next()
    }else{
        await ctx.render('index')
    }
    
},serve(__dirname+'./../dist',{maxage:3153600000}))
app.use(router.routes()).use(router.allowedMethods());

app.listen(8200);

console.log('listening on port 8200');


// var koa = require('koa')
// var serve = require('koa-static');
// var app = new koa();
// // app.use(function *(next){
//     // this.set('Cache-Control', 'no-cache');
//     // yield* next
// // })
// // app.use(serve('../dist'));
// app.use(function*(next){
//     yield serve(__dirname+'./../dist',{maxage:3153600000})
// })
// app.listen(8200);

// console.log('listening on port 8200');
