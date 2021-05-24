import axios from 'axios'
import {mail, constructEmail} from './mail'

const checkSlots = async () => {
    
    const headers = {
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
        'sec-ch-ua-mobile': '?0',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:88.0) Gecko/20100101 Firefox/88.0',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'sec-fetch-site': 'none',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-user': '?1',
        'sec-fetch-dest': 'document',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8'
    }

    let today = new Date()
    let date = today.toJSON().slice(0,10).split('-').reverse().join('-')
    let time = today.toLocaleTimeString();
    let url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByDistrict?district_id=" + process.env.DISTRICT + "&date=" + date
    
    console.log("Checking available slots: ", time)
    
    const res = await axios.get(url, {headers})

    if(!res || !res.data || !res.data.centers){
        console.log("Failed to fetch data")
        return null
    }

    var centers = res.data.centers 
    var available = []

    for(var i=0;i<centers.length;i++){
        let center = centers[i]
        let sessions = centers[i].sessions
        for(var j=0;j<sessions.length;j++){
            
            let {min_age_limit, available_capacity, vaccine, date} = sessions[j]

            if(min_age_limit==18 && available_capacity>1 && vaccine=='COVAXIN'){
                available.push({
                    name: center.name,
                    address: center.address,
                    pincode: center.pincode,
                    fees: center.fee_type,
                    available_capacity,
                    date: date
                })
            }
            
        }
    }

    if(available.length > 0){
        let body = constructEmail(available)
        mail(body)
    }else{
        console.log("No available slots \n\n\n")
    }

}

export default checkSlots