import koaRouter from 'koa-router';

const router = module.exports = new koaRouter();

router.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.state = err.status || 500;
    await ctx.render('error.ejs', { error: err.message });
  }
});

router.get('/', async ctx => {
  await ctx.render('index.ejs', { message: 'Hello Koa!' });
});

router.post('/ping', async ctx => {
  ctx.body = 'pong';
});

router.all('/boom', async ctx => {
  ctx.throw(400, 'BOOM');
});
