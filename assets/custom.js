console.log("ALIVE!")

const timeDifference = new Date() - new Date('2026-09-08T23:59:59Z'); 
const elapsedHours   = Math.floor(timeDifference / (1000 * 60 * 60));

x = document.getElementById("bigRedBanner");
x.innerText =  "THE CITY OF MEDICINE HAT/MHT STILL HAS NOT RENEWED THE CERTIFICATE ON THEIR SITE FOR " + elapsedHours + " HOURS!\n"
x.innerHTML += "This is a mirrored copy of the <a href='https://myride.mhtransit.ca/'>original website</a> with HTTPS working. It is not the official site.";
x.innerHTML += "<br />When the certificate is renewed on the main site, this mirror should automatically redirect within 15 minutes.";
x.innerHTML += "<br />Learn why HSTS and certificate renewal is important and being adopted: <a href='https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security'>LINK</a>.";
x.innerHTML += "<br /><img src='assets/bannergraphic.png' style='width: 50px;'></img>";
x.innerHTML += "<hr>";
x.innerHTML += "Mirror by g0 - <a href='https://tech.beyondgone.xyz'>homepage</a>";
x.innerHTML += "Source code for this site is public for review: <a href='https://github.com/TEMPJitterBugger/WebsiteCode'>LINK</a>."

document.getElementById("search_spec_stop_header").remove();
document.getElementById("search_spec_stop_con").remove();
document.getElementsByClassName("style-or")[0].remove();