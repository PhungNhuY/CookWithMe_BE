function createOTP(){
    length = 6;
    otp = "";
    for(let i=0;i<length;i++){
        let x = Math.floor((Math.random() * 10));
        otp+= x.toString();
    }
    return otp;
}

module.exports = createOTP;