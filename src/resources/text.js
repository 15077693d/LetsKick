const authentication = {
    HamburgerMenu: {
        map: {
            en: 'MAP',
            tc: '地圖'
        },
        language: {
            en: '繁體中文',
            tc: 'English'
        },
        logout: {
            en: 'LOGOUT',
            tc: '登岀'
        }
    },
    AuthCard: { 
        "null-district":{
            en:"Please select district for your better user experience.",
            tc:"請選擇區域以提高你的用户體驗。"
        },
        emailSent:{
            en: "We have sent you an e-mail containing your password reset link...",
            tc: "請查看您電郵地址的收件匣並重設密碼..."
        },
        "auth/internal-error":{
            en:"We're sorry, an internal error occurred. Please try agian.",
            tc:"很抱歉，系統發生問題。請重新嘗試。"
        },
        "auth/username-already-in-use":{
            en:"Username is already taken. Please enter a new username.",
            tc:"這個用戶名稱已經有人使用，請試別的名稱。"
        },
        "auth/email-already-in-use":{
            en:"The email address is already in use by another account.",
            tc:"此電子郵件地址已有人使用。"
        },
        "auth/user-not-found":{
            en:"There is no user record corresponding to this identifier.",
            tc:"此電子郵件地址未有註冊。"
        },
        "auth/wrong-password":{
            en:"The password is invalid or user signed up by Facebook/Google.",
            tc:'密碼錯誤 或 用戶使用Facebook/Google註冊。'
        },
        login: {
            en: "LOGIN",
            tc: "登入"
        },
        signup: {
            en: "SIGNUP",
            tc: "註冊"
        },
        email: {
            en: "Email",
            tc: "電郵地址"
        },
        password: {
            en: "Password",
            tc: "密碼"
        },
        forgotPassword: {
            en: "Forgot Password?",
            tc: "忘記密碼？"
        },
        username: {
            en: "User Name",
            tc: "用户名稱"
        },
        questionDistrict: {
            en: "What district are you from?",
            tc: "您住係邊一區咖？"
        },
        questionPitch: {
            en: "Where do you play soccer usually?",
            tc: "您平時去開邊度踢波咖？"
        },
        search: {
            en: "Search ...",
            tc: "輸入搜尋 ..."
        },
        district: {
            en: ["Central & Western", "Eastern", "Southern",
                "Wan Chai", "Kowloon City", "Kwun Tong",
                "Sham Shui Po", "Wong Tai Sin", "Yau Tsim Mong",
                "Islands", "Kwai Tsing", "North",
                "Sai Kung", "Sha Tin", "Tai Po",
                "Tsuen Wan", "Tuen Mun", "Yuen Long"],
            tc: ["中西區", "東區", "南區",
                "灣仔", "九龍城", "觀塘",
                "深水埗", "黃大仙", "油尖旺",
                "離島", "葵青", "北區",
                "西貢", "沙田", "大埔",
                "荃灣", "屯門", "元朗"]
        },
        emailQuestion: {
            en: "Enter your registered email address",
            tc: "請輸入您已經註冊的電郵地址"
        },
        back:{
            en:"back",
            tc:"返回"
        }
    },
    subTitle: {
        en: (action) => action === "signup" ? "Or Signup with" : "Or Login with",
        tc: (action) => action === "signup" ? "使用其它註冊方法" : "使用其它登入方法"
    },
    welcome: {
        en: "Hello!",
        tc: "您好！"
    },

}
export { authentication };