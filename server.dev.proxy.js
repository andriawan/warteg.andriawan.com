
module.exports = {
  '/api': {
    secure: false,
    changeOrigin:true,
    cookieDomainRewrite: "localhost:4200",
    target: "http://localhost:4000" ,

    /** @type {import('express').Handler } */
    bypass: ( req , res ) => {
      // console.log('DIMANA INI')
      // // req.set
      // console.log(req.headers)
      // console.log(req.cookies)
      
      res.setHeader('X-Header-Test', 'Test-Modify-Header-Response');
    },
  },
  '/uploads': {
    secure: false,
    changeOrigin:true,
    cookieDomainRewrite: "localhost:4200",
    target: "http://localhost:4000" ,
  },
}