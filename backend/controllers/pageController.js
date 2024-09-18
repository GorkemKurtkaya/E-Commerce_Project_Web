const getIndexPage = (req, res) => {
    console.log("index page",req.user);

    res.render('index',{
        link:"index"
    });
}

// const getAboutPage = (req, res) => {
//     res.render('about',{
//         link:"about"
    
//     });
// }

const getRegisterPage = (req, res) => {
    res.render('signup',{
        link:"signup"
    });
}

const getLoginPage = (req, res) => {
    res.render('login',{
        link:"login"
    });
}

const getLogout = (req, res) => {
    // JWT çerezini temizle
    res.cookie("jwt", "", {
        maxAge: 0, // Çerezi hemen sil
        httpOnly: true, // Çerezi yalnızca HTTP istekleri üzerinden erişilebilir kılar
        path: '/', // Çerezin geçerli olduğu yol
        sameSite: 'Lax' // Güvenlik için, cross-site isteklerde kullanılabilir
    });

    // Başarılı yanıt gönder
    res.status(200).json({
        succeeded: true,
        message: "Logged out successfully"
    });
};


export {getIndexPage,getRegisterPage,getLoginPage,getLogout};