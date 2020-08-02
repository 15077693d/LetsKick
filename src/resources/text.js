const hamburgerMenu= {
        welcome: {
            en: "Hello!",
            tc: "您好！"
        },
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
    }

const pitches = {
    right:{en:"Swipe Right",tc:"輕掃右面"},
    kick:{en:"Waiting for a Match Now",tc:"我想齊人踢波啊！"},
    left:{en:"Swipe left",tc:"輕掃左面"},
    chat:{en:"Chatting with Kickers",tc:"同下波友傾下計先。"}
}

const authentication = {
    AuthCard: { 
        "null-pitches":{
            en:"Please select one pitch at least for your better user experience.",
            tc:"請選擇最少一個球場以提高你的用户體驗。"
        },
        "null-district":{
            en:"Please select district for your better user experience.",
            tc:"請選擇區域以提高你的用户體驗。"
        },
        emailSent:{
            en: "We have sent you an e-mail containing your password reset link...",
            tc: "請查看您電郵地址的收件匣並重設密碼..."
        },
        "auth/invalid-email":{
            en:"The email address is invaild.",
            tc:"此電子郵件地址格式不正確。"
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
        username: {
            en: "User Name",
            tc: "用户名稱"
        },
        search: {
            en: "Search ...",
            tc: "輸入搜尋 ..."
        },
        forgotPassword: {
            en: "Forgot Password?",
            tc: "忘記密碼？"
        },
        back:{
            en:"back",
            tc:"返回"
        }
    },
    subTitle: {
        en: (action) => action === "signup" ? "Or Signup with" : "Or Login with",
        tc: (action) => action === "signup" ? "使用其它註冊方法" : "使用其它登入方法"
    }
}

const cardInput = {
    username: {
        en: "User Name",
        tc: "用户名稱"
    },
    email: {
        en: "Email",
        tc: "電郵地址"
    },
    password: {
        en: "Password",
        tc: "密碼"
    },
    forgotPasswordEmail: {
        en: "Enter your registered email address",
        tc: "請輸入您已經註冊的電郵地址"
    },
    questionDistrict: {
        en: "What district are you from?",
        tc: "您住係邊一區咖？"
    },
    questionPitch: {
        en: "Where do you play soccer usually?",
        tc: "您平時去開邊度踢波咖？"
    },
}

const districtSelect = {
    favourite:{
        en:"My Favourite",
        tc:"我的球場"
    },
    district: {
        en: {"00000":"Central & Western", "00001":"Eastern", "00002":"Southern",
            "00003":"Wan Chai", "00004":"Kowloon City", "00005":"Kwun Tong",
            "00006":"Sham Shui Po", "00007":"Wong Tai Sin", "00008":"Yau Tsim Mong",
            "00009":"Islands", "00010":"Kwai Tsing", "00011":"North",
            "00012":"Sai Kung", "00013":"Sha Tin", "00014":"Tai Po",
            "00015":"Tsuen Wan", "00016":"Tuen Mun", "00017":"Yuen Long"},
        tc: {"00000":"中西區", "00001":"東區", "00002":"南區",
            "00003":"灣仔", "00004":"九龍城", "00005":"觀塘",
            "00006":"深水埗", "00007":"黃大仙", "00008":"油尖旺",
            "00009":"離島", "00010":"葵青", "00011":"北區",
            "00012":"西貢", "00013":"沙田", "00014":"大埔",
            "00015":"荃灣", "00016":"屯門", "00017":"元朗"}
    },
}

export { authentication,districtSelect,hamburgerMenu,cardInput,pitches};