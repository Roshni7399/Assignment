
const config = {
    local: {
        DB:{
            HOST: "127.0.0.1",
            PORT: "27017",
            DATABASE: "Mongoprg",
            MONGOOSE:{
                useUnifinedTopology: true,
                useNewUrlParser: true
            },
            UserName: "",
            Password: ""
        },
        PORTNO : 8989,
        EMAIL:{
            host:"smtp.gmail.com",
            port:465,
            user:"zalkesuyesh108@gmail.com",
            pass:"nmtqccniuwpuzckm"

    },
       
    },

    staging: {
        DB:{
            HOST: "172.10.1.3",
            PORT: "27017",
            DATABASE: "roshnimanmode",
            MONGOOSE:{
                useUndifinedTopology: true,
                useNewUrlParser: true
            },
            UserName: "roshnimanmode",
            Password: "roshnimanmode45"
        },
        PORTNO : 8989,
        EMAIL : {
            host:"smtp.gmail.com",
            port:465,
            user:"zalkesuyesh108@gmail.com",
            pass:"nmtqccniuwpuzckm"
        }
    },
}
export const get = function get (env){
    return config[env];
}