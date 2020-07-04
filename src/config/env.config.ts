export default () => ({
  env: process.env.NODE_ENV || 'production',
  port: parseInt(process.env.PORT, 10) || 8000,
})
