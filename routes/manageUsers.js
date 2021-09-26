const router = require ('express').Router();
const UserModel = require('../model/usermodel');


//Method To Render Manage Users Page
router.get('/', (req, res) => {
    UserModel.find((err, users) => {
        if (err)
            throw err;
        else
            res.render('manageUsers/index', { users: users });
    });

});

// render create page
router.get('/add',(req,res)=>{
    res.render('manageUsers/add');
});

//router to add details
router.post('/add',(req,res)=>{
    let newUser = new UserModel(req.body);
    newUser.save((err)=>{
        if(err)
            throw err;
        else
            res.redirect('/manageUsers/');
    });
});

//router to render edit page
router.get('/edit/:userId', (req,res) =>{
    UserModel.findOne({_id: req.params.userId},(err,user)=>{
        if(err)
            throw err;
        else
            res.render('manageUsers/edit',{user: user});
    });
});

//router to edit details
router.post('/edit',(req,res)=>{
    UserModel.findOneAndUpdate({ _id: req.body._id }, { $set: req.body }, (err) => {
        if(err)
            throw err;
        else
            res.redirect('/manageUsers/')
    });
});

//router to delete record
router.get('/delete/:userId', (req, res)=>{
    UserModel.findOneAndDelete({_id: req.params.userId}, (err)=>{
        if(err)
            throw err;
        else
            res.redirect('/manageUsers/');
    });
});


module.exports = router;