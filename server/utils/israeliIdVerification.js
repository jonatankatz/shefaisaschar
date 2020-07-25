function israeliIdVerification(tz) {
        var tot = 0;
        for (i=0; i<8; i++)
            {
             var   x = (((i%2)+1)*tz.charAt(i));
                if (x > 9)
                    {
                    x =x.toString();
                    x=parseInt(x.charAt(0))+parseInt(x.charAt(1))
                    }
            tot += x;
            }
        
    if ((tot+parseInt(tz.charAt(8)))%10 == 0) {
        return true;
    } else {return false;}
}

module.exports = israeliIdVerification