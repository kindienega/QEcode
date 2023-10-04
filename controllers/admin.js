const Authority = require('../models/authorities');
module.exports.index = (req, res)=>{
    req.render('admin/admin')
}

module.exports.renderSignupForm = (req, res)=>{
    res.render('admin/admin')
}

module.exports.adminSignup = async(req, res, next) =>{
    try{
        const {username,role,email,firstname,lastname,password}=req.body
        // const auth=await Admin.findOne({username})
        // if(auth){
           const admin=new Authority({firstname,lastname,username,role:"admin",email})
           const registeredAdmin=await Authority.register(admin,password)
           req.login(registeredAdmin,err=>{
              if(err) return next(err)
              req.flash('success',`welcome ${username}`)
              res.redirect('/')
          })
    }catch(e){
        req.flash('error',e.message)
        res.redirect('/admin/signup')
    }
}
module.exports.renderLoginForm = (req, res)=>{
    res.render('admin/login')

}

module.exports.adminLogin=(req,res)=>{
    const redirectUrl=req.session.returnTo || '/'
    delete req.session.returnTo
    // console.log(req.user.role)
    req.flash('success','welcome back')
    res.redirect(redirectUrl)

 }