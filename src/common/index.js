const backendDomain = "http://localhost:8080"

const SummaryApi = {
    signUP : {
        url : `${backendDomain}/api/signup`,
        method: "POST"
    },

    signIn : {
        url: `${backendDomain}/api/signin`,
        method: "POST"
    },

    current_user : {
        url: `${backendDomain}/api/user-details`,
        method: "GET"
    },

    logout_user :{
        url: `${backendDomain}/api/userLogout`,
        method: "GET"
    },
    

   
}

export default SummaryApi;


//http://localhost:8080/api/signup
//http://localhost:8080/api/signin