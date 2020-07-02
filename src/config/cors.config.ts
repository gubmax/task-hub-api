export default {
  origin: [
    /(http|https):\/\/localhost/,
  ],
  methods: 'GET, POST, HEAD, OPTIONS',
  preflightContinue: false,
  optionsSuccessStatus: 204,
}
