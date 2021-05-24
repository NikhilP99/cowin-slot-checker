def main():
    from datetime import date
    import requests
    import json
    from smtplib import SMTP,SMTP_SSL
    today = date.today()
    d1 = today.strftime("%d-%m-%Y")
    headers = {'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"', 'sec-ch-ua-mobile': '?0', 'upgrade-insecure-requests': '1', 'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36', 'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9', 'sec-fetch-site': 'none', 'sec-fetch-mode': 'navigate', 'sec-fetch-user': '?1', 'sec-fetch-dest': 'document', 'accept-encoding': 'gzip, deflate, br', 'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8'}
    url='https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=97&date='+d1
    page=requests.get(url,headers=headers)
    
    dd=json.loads(page.text)
    clist=list(dd["centers"])
    dtm=[]
    for x in clist:
        for y in x["sessions"]:
            if y["min_age_limit"]==18 and y["vaccine"]=="COVAXIN" and y["available_capacity"]>0:
                dtm.append(x["name"]+" "+y["date"])

    msg=""
    for z in dtm:
        msg=msg+z+"\n"
    if msg=="":
        return "No slots"
    msga="from: cowin notif <testaiims@kushexp.heliohost.org>\nto:kushal.kant2012@gmail.com\nsubject:slots for 18+ available\r\n"+msg
    msga1="from: cowin notif <testaiims@kushexp.heliohost.org>\nto:kavitakant2010@gmail.com\nsubject:slots for 18+ available\r\n"+msg    
    s=SMTP_SSL('mail.kushexp.heliohost.org','465')
    s.login('testaiims@kushexp.heliohost.org','kushal123')
    from_addr='cowin notif <testaiims@kushexp.heliohost.org>'
    to_addr=['kushal.kant2012@gmail.com']
    
    s.sendmail(from_addr, to_addr, msga)

    s.quit()       

    return msg



